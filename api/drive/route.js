// Vercel serverless proxy for Google Drive API
// Add GDRIVE_SERVICE_ACCOUNT_EMAIL and GDRIVE_PRIVATE_KEY to Vercel env vars
// Or use GDRIVE_ACCESS_TOKEN for delegated user auth
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { action } = req.query; // listFiles, getFile, upload, delete

  const serviceEmail = process.env.GDRIVE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GDRIVE_PRIVATE_KEY;
  const delegateUser = 'samueljah1@gmail.com'; // impersonate this user

  // If no service account configured, return mock/fallback for dev
  if (!serviceEmail || !privateKey) {
    if (action === 'listFiles') {
      return res.status(200).json({ files: [], hint: 'Set GDRIVE_SERVICE_ACCOUNT_EMAIL and GDRIVE_PRIVATE_KEY in Vercel env to enable Drive.' });
    }
    return res.status(200).json({ error: 'Drive not configured' });
  }

  try {
    // Get an access token using JWT auth (service account impersonating user)
    const { getAccessToken } = await import('./auth.js');
    const accessToken = await getAccessToken(serviceEmail, privateKey, delegateUser);

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
        const q = query
          ? `name contains '${query.replace(/'/g, "\\'")}' and trashed=false`
          : 'trashed=false';
        const params = new URLSearchParams({
          q,
          pageSize: String(pageSize),
          fields: 'files(id,name,mimeType,size,modifiedTime,owners(displayName)),nextPageToken',
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

        // For PDFs, redirect to the download URL
        const r = await fetch(`${DRIVE_API}/files/${fileId}?fields=id,name,mimeType,size,webViewLink,modifiedTime`, { headers });
        const meta = await r.json();

        if (meta.mimeType === 'application/pdf') {
          // Return a signed download link
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

        // Upload via multipart or simple upload
        const metadata = {
          name,
          mimeType: mimeType || 'application/pdf',
          parents: req.query.folderId ? [req.query.folderId] : [],
        };

        // If req.body is raw bytes (for direct upload from browser)
        const isMultipart = req.headers['content-type']?.includes('multipart');
        let uploadBody;
        let uploadHeaders = { Authorization: `Bearer ${accessToken}` };

        if (isMultipart) {
          // Forward the multipart body as-is
          uploadBody = req;
          uploadHeaders['Content-Type'] = req.headers['content-type'];
        } else {
          // Simple upload — body is the file bytes
          const boundary = 'drive_boundary_42';
          const bodyParts = [
            `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(metadata)}\r\n`,
            `--${boundary}\r\nContent-Type: ${mimeType || 'application/pdf'}\r\n\r\n`,
          ];
          // Read raw body bytes
          const chunks = [];
          for await (const chunk of req) chunks.push(chunk);
          const fileBuffer = Buffer.concat(chunks);
          bodyParts.push(fileBuffer.toString('base64'));
          bodyParts.push(`\r\n--${boundary}--`);
          uploadBody = bodyParts.join('');
          uploadHeaders['Content-Type'] = `multipart/related; boundary=${boundary}`;
        }

        const r = await fetch(`${DRIVE_API}/files?uploadType=multipart`, {
          method: 'POST',
          headers: uploadHeaders,
          body: uploadBody,
        });
        const data = await r.json();
        return res.status(r.status).json(data);
      }

      case 'delete': {
        const fileId = req.query.fileId;
        if (!fileId) return res.status(400).json({ error: 'Missing fileId' });
        await fetch(`${DRIVE_API}/files/${fileId}`, {
          method: 'DELETE',
          headers,
        });
        return res.status(200).json({ success: true });
      }

      case 'search': {
        const q = req.query.q;
        if (!q) return res.status(400).json({ error: 'Missing search query' });
        const params = new URLSearchParams({
          q: `name contains '${q.replace(/'/g, "\\'")}' and trashed=false and mimeType='application/pdf'`,
          fields: 'files(id,name,mimeType,size,modifiedTime,owners(displayName))',
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

export const config = {
  api: {
    bodyParser: false, // Handle raw upload bodies
  },
};
