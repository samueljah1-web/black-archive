// Vercel serverless proxy for Google Drive API
// Uses a service account JSON key file placed at black-archive-sa.json
// Add GDRIVE_SA_JSON to Vercel env vars (the entire service account JSON as a single string)
// Or place black-archive-sa.json in the project root
import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { action } = req.query;

  let saEmail, privateKey, projectId;

  // Try env var first (set in Vercel dashboard), then local file
  if (process.env.GDRIVE_SA_JSON) {
    try {
      const sa = JSON.parse(process.env.GDRIVE_SA_JSON);
      saEmail = sa.client_email;
      privateKey = sa.private_key;
      projectId = sa.project_id;
    } catch (e) {
      return res.status(500).json({ error: 'GDRIVE_SA_JSON env var is not valid JSON' });
    }
  } else {
    // Try local file (dev mode)
    try {
      const filePath = path.join(process.cwd(), 'black-archive-sa.json');
      const raw = await fs.readFile(filePath, 'utf-8');
      const sa = JSON.parse(raw);
      saEmail = sa.client_email;
      privateKey = sa.private_key;
      projectId = sa.project_id;
    } catch (e) {
      return res.status(200).json({ files: [], hint: 'Place black-archive-sa.json in project root or set GDRIVE_SA_JSON env var.' });
    }
  }

  // The shared folder ID for The Black Archive
  const ROOT_FOLDER_ID = '1LO8IHu6qPv3katxDZ7K7BN_HoWTDbbBS';

  try {
    const accessToken = await getAccessToken(saEmail, privateKey);
    const DRIVE_API = 'https://www.googleapis.com/drive/v3';
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };

    switch (action) {
      case 'listFiles': {
        const query = req.query.query || '';
        const pageSize = req.query.pageSize || 50;
        const pageToken = req.query.pageToken || '';
        // Only list files in the shared Archive folder
        let q = `'${ROOT_FOLDER_ID}' in parents and trashed=false`;
        if (query) {
          q += ` and name contains '${query.replace(/'/g, "\\'")}'`;
        }
        const params = new URLSearchParams({
          q,
          pageSize: String(pageSize),
          fields: 'files(id,name,mimeType,size,modifiedTime),nextPageToken',
          orderBy: 'modifiedTime desc',
          ...(pageToken && { pageToken }),
        });
        const r = await fetch(`${DRIVE_API}/files?${params}`, { headers });
        const data = await r.json();
        return res.status(200).json(data);
      }

      case 'getFile': {
        const fileId = req.query.fileId;
        if (!fileId) return res.status(400).json({ error: 'Missing fileId' });
        const r = await fetch(`${DRIVE_API}/files/${fileId}?fields=id,name,mimeType,size,webViewLink,modifiedTime`, { headers });
        const meta = await r.json();
        if (meta.mimeType === 'application/pdf') {
          const dl = await fetch(`${DRIVE_API}/files/${fileId}?alt=media`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          const blob = await dl.arrayBuffer();
          res.setHeader('Content-Type', 'application/pdf');
          res.setHeader('Content-Disposition', `inline; filename="${meta.name}"`);
          res.setHeader('Content-Length', blob.byteLength);
          return res.status(200).send(Buffer.from(blob));
        }
        return res.status(200).json(meta);
      }

      case 'upload': {
        if (req.method !== 'POST') return res.status(405).json({ error: 'POST required' });
        const { name, mimeType } = req.query;
        if (!name) return res.status(400).json({ error: 'Missing filename' });
        const metadata = {
          name,
          mimeType: mimeType || 'application/pdf',
          parents: [ROOT_FOLDER_ID],
        };
        const boundary = 'drive_boundary_42';
        const bodyParts = [
          `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(metadata)}\r\n`,
          `--${boundary}\r\nContent-Type: ${mimeType || 'application/pdf'}\r\n\r\n`,
        ];
        const chunks = [];
        for await (const chunk of req) chunks.push(chunk);
        const fileBuffer = Buffer.concat(chunks);
        bodyParts.push(fileBuffer.toString('base64'));
        bodyParts.push(`\r\n--${boundary}--`);
        const uploadBody = bodyParts.join('');
        const r = await fetch(`${DRIVE_API}/files?uploadType=multipart`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': `multipart/related; boundary=${boundary}`,
          },
          body: uploadBody,
        });
        const data = await r.json();
        return res.status(r.status).json(data);
      }

      case 'delete': {
        const fileId = req.query.fileId;
        if (!fileId) return res.status(400).json({ error: 'Missing fileId' });
        await fetch(`${DRIVE_API}/files/${fileId}`, { method: 'DELETE', headers });
        return res.status(200).json({ success: true });
      }

      case 'search': {
        const q = req.query.q;
        if (!q) return res.status(400).json({ error: 'Missing search query' });
        const params = new URLSearchParams({
          q: `'${ROOT_FOLDER_ID}' in parents and name contains '${q.replace(/'/g, "\\'")}' and mimeType='application/pdf'`,
          fields: 'files(id,name,mimeType,size,modifiedTime)',
          orderBy: 'modifiedTime desc',
        });
        const r = await fetch(`${DRIVE_API}/files?${params}`, { headers });
        const data = await r.json();
        return res.status(200).json(data);
      }

      default:
        return res.status(400).json({ error: `Unknown action: ${action}` });
    }
  } catch (e) {
    console.error('Drive API error:', e);
    return res.status(500).json({ error: e.message || 'Internal error' });
  }
}

async function getAccessToken(saEmail, privateKey) {
  const header = { alg: 'RS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const claim = {
    iss: saEmail,
    scope: 'https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  };
  const b64url = (obj) =>
    Buffer.from(JSON.stringify(obj))
      .toString('base64')
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  const payload = `${b64url(header)}.${b64url(claim)}`;
  const { createSign } = await import('crypto');
  const signer = createSign('RSA-SHA256');
  signer.update(payload);
  const signature = signer
    .sign(privateKey.replace(/\\n/g, '\n'), 'base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
  const jwt = `${payload}.${signature}`;
  const r = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: jwt }),
  });
  const data = await r.json();
  if (!data.access_token) {
    throw new Error(`OAuth failed: ${data.error} — ${data.error_description}`);
  }
  return data.access_token;
}

export const config = {
  api: {
    bodyParser: false,
  },
};
