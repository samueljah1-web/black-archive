export const runtime = 'edge';

export async function POST(req) {
  const { provider, model, messages, system } = await req.json();

  const providers = {
    anthropic: {
      url: 'https://api.anthropic.com/v1/messages',
      headers: { 'x-api-key': process.env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01' },
      transform: (data) => data.content?.[0]?.text,
      body: () => ({ model: model || 'claude-sonnet-4-20250514', system, messages, max_tokens: 1000 })
    },
    openai: {
      url: 'https://api.openai.com/v1/chat/completions',
      headers: { 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` },
      transform: (data) => data.choices?.[0]?.message?.content,
      body: () => ({ model: model || 'gpt-4o', messages: [{ role: 'system', content: system }, ...messages], max_tokens: 1000 })
    },
    google: {
      url: `https://generativelanguage.googleapis.com/v1/models/${model || 'gemini-1.5-pro'}:generateContent?key=${process.env.GEMINI_API_KEY}`,
      headers: { 'Content-Type': 'application/json' },
      transform: (data) => data.candidates?.[0]?.content?.parts?.[0]?.text,
      body: () => ({ contents: [{ parts: [{ text: system + '\n\n' + messages.map(m => m.content).join('\n') }] }] })
    },
    mistral: {
      url: 'https://api.mistral.ai/v1/chat/completions',
      headers: { 'Authorization': `Bearer ${process.env.MISTRAL_API_KEY}` },
      transform: (data) => data.choices?.[0]?.message?.content,
      body: () => ({ model: model || 'mistral-large-latest', messages: [{ role: 'system', content: system }, ...messages], max_tokens: 1000 })
    }
  };

  const cfg = providers[provider];
  if (!cfg) return new Response(JSON.stringify({ error: 'Invalid provider' }), { status: 400 });

  try {
    const res = await fetch(cfg.url, {
      method: 'POST',
      headers: cfg.headers,
      body: JSON.stringify(cfg.body())
    });
    const data = await res.json();
    const text = cfg.transform(data);
    return new Response(JSON.stringify({ text }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message || 'Provider request failed' }), { status: 500 });
  }
}