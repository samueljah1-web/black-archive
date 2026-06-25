export default async function handler(req, res) {
  const envVal = process.env.GDRIVE_SA_JSON || '';
  let debug = {
    envVarExists: !!process.env.GDRIVE_SA_JSON,
    envVarLength: envVal.length,
    startsWith: envVal.substring(0, 50),
    envVarStartsWithBrace: envVal.startsWith('{'),
    hasPrivateKeyInValue: envVal.includes('PRIVATE KEY'),
  };

  // Try to parse
  try {
    const parsed = JSON.parse(envVal);
    debug.parsed = true;
    debug.parsedPrivateKeyId = parsed.private_key_id;
    debug.parsedPrivateKeyLength = (parsed.private_key || '').length;
    debug.parsedPrivateKeyStartsWith = (parsed.private_key || '').substring(0, 40);
    debug.hasRealNewlines = (parsed.private_key || '').includes('\n');
    debug.hasEscapedNewlines = (parsed.private_key || '').includes('\\n');

    // Try signing
    try {
      const { createSign } = await import('crypto');
      const signer = createSign('RSA-SHA256');
      signer.update('test');
      const sig = signer.sign(parsed.private_key.replace(/\\n/g, '\n'), 'base64');
      debug.signingSucceeded = true;
      debug.signaturePreview = sig.substring(0, 20);
    } catch (e) {
      debug.signingError = e.message;
      // Try without replace
      try {
        const { createSign } = await import('crypto');
        const s2 = createSign('RSA-SHA256');
        s2.update('test');
        const sig2 = s2.sign(parsed.private_key, 'base64');
        debug.signingWithoutReplaceSucceeded = true;
      } catch (e2) {
        debug.signingWithoutReplaceError = e2.message;
      }
    }

    // Try creating key object
    try {
      const { createPrivateKey } = await import('crypto');
      const key = createPrivateKey(parsed.private_key);
      debug.createPrivateKeySucceeded = true;
      debug.keyType = key.type;
      debug.keyAsymmetricKeyType = key.asymmetricKeyType;
    } catch (e) {
      debug.createPrivateKeyError = e.message;
    }

  } catch (e) {
    debug.parseError = e.message;
  }

  res.status(200).json(debug);
}
