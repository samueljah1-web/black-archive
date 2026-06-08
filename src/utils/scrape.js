/* ── Scraping engine per content type ── */
import { TOPIC_KW } from "../data/content";

export async function scrapeBooks(topic, limit = 6) {
  const q = TOPIC_KW[topic] || topic;
  const errors = [];
  const [ia, ol] = await Promise.allSettled([
    fetch(`https://archive.org/advancedsearch.php?q=${encodeURIComponent(q)}+AND+mediatype:texts&fl=identifier,title,creator,description,date&rows=${limit}&output=json&sort=downloads+desc`)
      .then(r => { if (!r.ok) throw new Error(`IA returned ${r.status}`); return r.json(); })
      .then(d => (d.response?.docs || []).filter(b => b.identifier && b.title).map(b => ({ id: `ia-${b.identifier}`, title: b.title, author: Array.isArray(b.creator) ? b.creator[0] : b.creator || "Unknown", year: b.date?.slice(0, 4) || "—", description: String(b.description || "").slice(0, 200), subjects: [], iaId: b.identifier, coverId: null, editions: 1, source: "Internet Archive", readUrl: `https://archive.org/details/${b.identifier}`, downloadUrl: `https://archive.org/download/${b.identifier}/${b.identifier}.pdf` })))
      .catch(e => { errors.push(`Internet Archive: ${e.message}`); return []; }),
    fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(q)}&limit=${limit}&fields=key,title,author_name,first_publish_year,subject,ia,cover_i,edition_count`)
      .then(r => { if (!r.ok) throw new Error(`OpenLibrary returned ${r.status}`); return r.json(); })
      .then(d => (d.docs || []).filter(b => b.title).map(b => ({ id: b.key, title: b.title, author: (b.author_name || []).join(", ") || "Unknown", year: b.first_publish_year || "—", subjects: (b.subject || []).slice(0, 3), iaId: b.ia?.[0] || null, coverId: b.cover_i || null, editions: b.edition_count || 1, source: "Open Library", readUrl: b.ia?.[0] ? `https://archive.org/details/${b.ia[0]}` : `https://openlibrary.org${b.key}`, downloadUrl: b.ia?.[0] ? `https://archive.org/download/${b.ia[0]}/${b.ia[0]}.pdf` : null })))
      .catch(e => { errors.push(`OpenLibrary: ${e.message}`); return []; }),
  ]);
  const iaBooks = ia.status === "fulfilled" ? ia.value : [];
  const olBooks = ol.status === "fulfilled" ? ol.value : [];
  return { books: [...iaBooks, ...olBooks].slice(0, 8), errors };
}

export async function scrapeImages(topic, limit = 6) {
  const q = `${TOPIC_KW[topic] || topic} Africa`;
  const results = [];
  try {
    const r1 = await fetch(`https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(q)}&srnamespace=6&srlimit=${limit}&format=json&origin=*`);
    const d1 = await r1.json();
    const titles = (d1.query?.search || []).map(i => i.title);
    if (titles.length) {
      const r2 = await fetch(`https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(titles.slice(0, 6).join("|"))}&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=400&format=json&origin=*`);
      const d2 = await r2.json();
      Object.values(d2.query?.pages || {}).forEach(p => {
        const url = p.imageinfo?.[0]?.thumburl || p.imageinfo?.[0]?.url;
        if (url && !url.includes(".svg") && !url.includes(".ogg") && !url.includes(".webm")) {
          results.push({ id: `wm-${p.pageid}`, title: p.title?.replace("File:", "").replace(/\.[^.]+$/, ""), src: url, source: "Wikimedia Commons", description: (p.imageinfo?.[0]?.extmetadata?.ImageDescription?.value || "").replace(/<[^>]*>/g, "").slice(0, 200) || `Image related to ${topic}`, topics: [topic], valid: true });
        }
      });
    }
  } catch (e) {}
  try {
    const r3 = await fetch(`https://api.europeana.eu/record/v2/search.json?wskey=api2demo&query=${encodeURIComponent(q)}&rows=${limit}&profile=minimal&media=true&thumbnail=true&type=IMAGE`);
    const d3 = await r3.json();
    (d3.items || []).filter(i => i.edmPreview?.[0] && !i.edmPreview[0].includes(".svg")).forEach(item => {
      results.push({ id: `eu-${item.id?.replace(/\//g, "-")}`, title: Array.isArray(item.title) ? item.title[0] : item.title || "Europeana Item", src: item.edmPreview[0], source: "Europeana", description: `European cultural heritage collection item related to ${topic}.`, topics: [topic], link: `https://www.europeana.eu/item${item.id}`, valid: true });
    });
  } catch (e) {}
  return results.filter(i => i.src && i.src.startsWith("http")).slice(0, 8);
}

export async function scrapeLinks(topic, limit = 5) {
  const results = [];
  try {
    const q = encodeURIComponent(TOPIC_KW[topic] || topic);
    const r = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${q}&srlimit=${limit}&format=json&origin=*`);
    const d = await r.json();
    (d.query?.search || []).forEach(item => {
      if (item.title && item.pageid) {
        results.push({ id: `wiki-${item.pageid}`, title: item.title, url: `https://en.wikipedia.org/wiki/${encodeURIComponent(item.title.replace(/ /g, "_"))}`, domain: "en.wikipedia.org", description: item.snippet?.replace(/<[^>]*>/g, "") || "", category: "Encyclopedia", topic });
      }
    });
  } catch (e) {}
  return results.filter(l => l.url && l.title).slice(0, limit);
}
