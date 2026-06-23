/* ── AI helper — multi-provider support ── */
export async function callAI(system, user, provider = null, model = null) {
  const settings = JSON.parse(localStorage.getItem('ai-settings') || '{"provider":"anthropic","model":"claude-sonnet-4-20250514","apiKeys":{}}');
  const finalProvider = provider || settings.provider;
  const finalModel = model || settings.model;

  // Try Vercel serverless proxy first
  try {
    const res = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        provider: finalProvider,
        model: finalModel,
        messages: [{ role: 'user', content: user }],
        system: system
      })
    });
    if (res.ok) {
      const data = await res.json();
      if (data.text) return data.text;
    }
  } catch (e) {
    console.log('Vercel proxy unavailable, trying direct API…');
  }

  // Fallback: direct API call using user-provided keys (local dev)
  const apiKey = settings.apiKeys?.[finalProvider];
  if (!apiKey) return "No API key configured. Add your key in Settings.";

  const providerUrls = {
    anthropic: 'https://api.anthropic.com/v1/messages',
    openai: 'https://api.openai.com/v1/chat/completions',
    google: 'https://generativelanguage.googleapis.com/v1/models/' + finalModel + ':generateContent',
    mistral: 'https://api.mistral.ai/v1/chat/completions',
    deepseek: 'https://api.deepseek.com/chat/completions'
  };

  try {
    let url = providerUrls[finalProvider];
    let headers = { 'Content-Type': 'application/json' };
    let body = {};

    if (finalProvider === 'anthropic') {
      headers['x-api-key'] = apiKey;
      headers['anthropic-version'] = '2023-06-01';
      body = { model: finalModel, system, messages: [{ role: 'user', content: user }], max_tokens: 1000 };
    } else if (finalProvider === 'openai') {
      headers['Authorization'] = 'Bearer ' + apiKey;
      body = { model: finalModel, messages: [{ role: 'system', content: system }, { role: 'user', content: user }], max_tokens: 1000 };
    } else if (finalProvider === 'google') {
      url = url + '?key=' + apiKey;
      body = { contents: [{ parts: [{ text: system + '\n\n' + user }] }] };
    } else if (finalProvider === 'mistral') {
      headers['Authorization'] = 'Bearer ' + apiKey;
      body = { model: finalModel, messages: [{ role: 'system', content: system }, { role: 'user', content: user }], max_tokens: 1000 };
    } else if (finalProvider === 'deepseek') {
      headers['Authorization'] = 'Bearer ' + apiKey;
      body = { model: finalModel, messages: [{ role: 'system', content: system }, { role: 'user', content: user }], max_tokens: 1000 };
    } else {
      return 'Provider "' + finalProvider + '" not supported for direct API.';
    }

    const res = await fetch(url, { method: 'POST', headers, body: JSON.stringify(body) });
    const data = await res.json();

    if (finalProvider === 'anthropic') return data.content?.[0]?.text || "No response.";
    if (finalProvider === 'google') return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";
    return data.choices?.[0]?.message?.content || "No response.";
  } catch (e) {
    console.error('Direct AI call failed:', e);
    return 'Connection error: ' + (e.message || 'Could not reach API') + '. Check your key.';
  }
}

/* ── Catalogue context helpers ── */
export function getSavedCatalogue() {
  const saved = { books: [], images: [], links: [], maps: [], videos: [], notes: [] };
  try {
    const books = JSON.parse(localStorage.getItem('ba-cat-v3') || '[]');
    saved.books = books.map(b => ({ id: b.id, title: b.title, author: b.author, year: b.year, topic: b._topic || b.topic, type: 'book' }));
  } catch (e) {}
  try {
    const images = JSON.parse(localStorage.getItem('ba-saved-images-v2') || '[]');
    saved.images = images.map(i => ({ id: i.id, title: i.title, source: i.source, topics: i.topics || [], type: 'image' }));
  } catch (e) {}
  try {
    const links = JSON.parse(localStorage.getItem('ba-links-saved-v2') || '[]');
    saved.links = links.map(l => ({ id: l.id, title: l.title, url: l.url, category: l.category, type: 'link' }));
  } catch (e) {}
  try {
    const maps = JSON.parse(localStorage.getItem('ba-maps-v2') || '[]');
    saved.maps = maps.map(m => ({ id: m.id, title: m.title, year: m.year, source: m.source, type: 'map' }));
  } catch (e) {}
  try {
    const videos = JSON.parse(localStorage.getItem('ba-vid-saved-v2') || '[]');
    saved.videos = videos.map(v => ({ id: v.id, title: v.title, channel: v.channel, topics: v.topics || [], type: 'video' }));
  } catch (e) {}
  try {
    const notes = JSON.parse(localStorage.getItem('ba-notes-v3') || '[]');
    saved.notes = notes.map(n => ({ id: n.id, topic: n.topic, text: n.text.slice(0, 200), date: n.date, type: 'note' }));
  } catch (e) {}
  const topicsSet = new Set();
  saved.books.forEach(b => b.topic && topicsSet.add(b.topic));
  saved.images.forEach(i => i.topics?.forEach(t => topicsSet.add(t)));
  saved.videos.forEach(v => v.topics?.forEach(t => topicsSet.add(t)));
  saved.notes.forEach(n => n.topic && topicsSet.add(n.topic));
  return {
    ...saved,
    totalItems: saved.books.length + saved.images.length + saved.links.length + saved.maps.length + saved.videos.length + saved.notes.length,
    uniqueTopics: Array.from(topicsSet),
    summary: `You have ${saved.books.length} books, ${saved.images.length} images, ${saved.links.length} links, ${saved.maps.length} maps, ${saved.videos.length} videos, and ${saved.notes.length} notes in your archive. Topics include: ${Array.from(topicsSet).slice(0, 10).join(', ')}${topicsSet.size > 10 ? '...' : ''}`
  };
}

export function formatCatalogueForAI(catalogue) {
  let context = `USER'S SAVED CATALOGUE:\n`;
  if (catalogue.books.length > 0) {
    context += `\n📚 BOOKS (${catalogue.books.length}):\n`;
    catalogue.books.slice(0, 15).forEach(b => { context += `  - "${b.title}" by ${b.author} (${b.year})${b.topic ? ` [Topic: ${b.topic}]` : ''}\n`; });
    if (catalogue.books.length > 15) context += `  ... and ${catalogue.books.length - 15} more\n`;
  }
  if (catalogue.images.length > 0) {
    context += `\n🖼 IMAGES (${catalogue.images.length}):\n`;
    catalogue.images.slice(0, 10).forEach(i => { context += `  - ${i.title} [${i.topics?.join(', ') || 'no topic'}]\n`; });
  }
  if (catalogue.links.length > 0) {
    context += `\n🔗 LINKS (${catalogue.links.length}):\n`;
    catalogue.links.slice(0, 10).forEach(l => { context += `  - ${l.title} (${l.category || 'General'})\n`; });
  }
  if (catalogue.notes.length > 0) {
    context += `\n✍ NOTES (${catalogue.notes.length}):\n`;
    catalogue.notes.slice(0, 8).forEach(n => { context += `  - [${n.topic || 'General'}]: "${n.text.slice(0, 80)}..."\n`; });
  }
  context += `\n${catalogue.summary}`;
  return context;
}

/* ── Search within scraped/curated content ── */
export function searchLocal(query, { books, images, links, maps, videos }) {
  if (!query?.trim()) return { books: [], images: [], links: [], maps: [], videos: [] };
  const q = query.toLowerCase();
  const match = item => {
    const text = `${item.title || ""} ${item.description || item.author || ""} ${(item.subjects || item.topics || []).join(" ")} ${item.source || ""} ${item.category || ""}`.toLowerCase();
    return q.split(" ").some(w => w.length > 2 && text.includes(w));
  };
  return {
    books: books.filter(match),
    images: images.filter(match),
    links: links.filter(match),
    maps: maps.filter(match),
    videos: videos.filter(match),
  };
}
