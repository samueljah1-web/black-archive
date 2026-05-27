// Google Drive JWT authentication for service account delegation
// Generates a short-lived access token to impersonate a Gmail user
export async function getAccessToken(serviceEmail, privateKey, delegateUser) {
  const header = { alg: 'RS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const claim = {
    iss: serviceEmail,
    sub: delegateUser,
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

  // Sign with RSA-SHA256 using the private key
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
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });

  const data = await r.json();
  if (!data.access_token) {
    throw new Error(`OAuth failed: ${data.error} — ${data.error_description}`);
  }
  return data.access_token;
}
