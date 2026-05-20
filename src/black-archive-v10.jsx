import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
/* ── FONTS ── */
const _fl = document.createElement("link");
_fl.rel = "stylesheet";
_fl.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap";
document.head.appendChild(_fl);
const F = { display: "'Cormorant Garamond',serif", body: "'DM Sans',sans-serif" };
/* ── THEMES ── */
const DARK = {
  bg0: "#080706", bg1: "#0f0e0c", bg2: "#161410", bg3: "#1e1b15",
  card: "#161410", border: "#2a2318",
  txt0: "#f2ead8", txt1: "#d4c8a8", txt2: "#a09070", txt3: "#5a5040",
  ndY: "#e8b800", ndYd: "#b88e00", ndR: "#c0392b", ndB: "#2a4aaa", ndG: "#1a6a2a", ndO: "#d4580a",
  ok: "#2a8a5a", okL: "#8affc8", err: "#c05050",
  navBg: "#0a0906", pillBg: "rgba(232,184,0,0.12)", pillBd: "#b88e00", pillTx: "#e8b800",
  shadow: "0 4px 24px rgba(0,0,0,0.45)",
  btnP: "linear-gradient(135deg,#e8b800,#d4580a)", btnPTx: "#080706",
  isDark: true,
};
const LIGHT = {
  bg0: "#f5f0e8", bg1: "#ffffff", bg2: "#faf7f0", bg3: "#f0ebe0",
  card: "#ffffff", border: "#e0d5c0",
  txt0: "#1a1208", txt1: "#3a3020", txt2: "#6a5a40", txt3: "#9a8a70",
  ndY: "#c8920a", ndYd: "#a87800", ndR: "#b03020", ndB: "#1a3a8a", ndG: "#1a5a2a", ndO: "#c44800",
  ok: "#1a6a3a", okL: "#0a4a2a", err: "#c05050",
  navBg: "#ffffff", pillBg: "rgba(200,146,10,0.1)", pillBd: "#c8920a", pillTx: "#9a6a00",
  shadow: "0 2px 16px rgba(0,0,0,0.09)",
  btnP: "linear-gradient(135deg,#c8920a,#c44800)", btnPTx: "#ffffff",
  isDark: false,
};
/* ── SVG COMPONENTS ── */
function BeninMask({ size = 44, T, glow = false }) {
  const c = T.txt0;
  return (
    <svg width={size} height={size * 1.3} viewBox="0 0 80 104" fill="none" style={glow ? { filter: `drop-shadow(0 0 10px ${T.ndY}70)` } : {}}>
      {[10, 18, 26, 34, 42, 50, 58, 66].map((x, i) => (<rect key={i} x={x} y={i % 2 === 0 ? 0 : 2} width="4.5" height={i % 2 === 0 ? 13 : 9} rx="2" fill={c} opacity={i % 2 === 0 ? "0.85" : "0.5"} />))}
      <rect x="6" y="11" width="68" height="6" rx="2.5" fill={c} opacity="0.4" />
      {Array.from({ length: 14 }).map((_, i) => (<circle key={i} cx={8 + i * 5} cy="21" r="2.2" fill={c} opacity="0.38" />))}
      <path d="M14 40 Q12 26 40 17 Q68 26 66 40 Q70 62 58 82 Q50 94 40 96 Q30 94 22 82 Q10 62 14 40Z" fill={c} opacity="0.1" stroke={c} strokeWidth="1" strokeOpacity="0.45" />
      <rect x="34" y="26" width="2.2" height="14" rx="1" fill={c} opacity="0.9" />
      <rect x="38.9" y="24" width="2.2" height="16" rx="1" fill={c} opacity="0.9" />
      <rect x="43.8" y="26" width="2.2" height="14" rx="1" fill={c} opacity="0.9" />
      <path d="M22 41 Q30 38 37 40" stroke={c} strokeWidth="1.3" fill="none" opacity="0.55" />
      <path d="M58 41 Q50 38 43 40" stroke={c} strokeWidth="1.3" fill="none" opacity="0.55" />
      <ellipse cx="29" cy="48" rx="6.5" ry="3.8" fill={c} opacity="0.82" />
      <ellipse cx="51" cy="48" rx="6.5" ry="3.8" fill={c} opacity="0.82" />
      <ellipse cx="29" cy="48" rx="2.8" ry="2" fill={T.bg0} opacity="1" />
      <ellipse cx="51" cy="48" rx="2.8" ry="2" fill={T.bg0} opacity="1" />
      <circle cx="30" cy="47.2" r="1" fill={c} opacity="1" />
      <circle cx="52" cy="47.2" r="1" fill={c} opacity="1" />
      <path d="M36 56 Q40 61 44 56" stroke={c} strokeWidth="1.4" fill="none" opacity="0.7" />
      <ellipse cx="34" cy="58" rx="2.5" ry="1.8" fill={c} opacity="0.3" />
      <ellipse cx="46" cy="58" rx="2.5" ry="1.8" fill={c} opacity="0.3" />
      <path d="M29 68 Q40 74 51 68" stroke={c} strokeWidth="1.7" fill="none" strokeLinecap="round" opacity="0.78" />
      <rect x="12" y="82" width="56" height="7" rx="3" fill={c} opacity="0.38" />
      {Array.from({ length: 11 }).map((_, i) => (<circle key={i} cx={15 + i * 5} cy="93" r="2.4" fill={c} opacity="0.5" />))}
      {Array.from({ length: 10 }).map((_, i) => (<circle key={i} cx={17.5 + i * 5} cy="101" r="1.8" fill={c} opacity="0.3" />))}
      <path d="M14 40 Q7 54 10 74 Q12 82 16 88" stroke={c} strokeWidth="1.2" fill="none" opacity="0.28" />
      <path d="M66 40 Q73 54 70 74 Q68 82 64 88" stroke={c} strokeWidth="1.2" fill="none" opacity="0.28" />
    </svg>
  );
}
function NdStripe({ h = 4 }) {
  const s = ["#c0392b", "#1a3a8a", "#e8b800", "#1a6a2a", "#d4580a", "#e8dcc8", "#1a3a8a", "#c0392b", "#e8b800", "#1a6a2a", "#d4580a", "#c0392b", "#1a3a8a", "#e8b800", "#1a6a2a", "#e8dcc8", "#d4580a", "#1a3a8a", "#c0392b", "#e8b800"];
  return <div style={{ height: h, display: "flex", overflow: "hidden", flexShrink: 0 }}>{s.map((c, i) => <div key={i} style={{ flex: 1, background: c, opacity: i % 2 === 0 ? 1 : 0.7 }} />)}</div>;
}
function NdDiamond({ s = 20, T }) {
  return (
    <svg width={s} height={s} viewBox="0 0 40 40" style={{ flexShrink: 0 }}>
      {[[2, 26, "#1a3a8a"], [6, 20, "#c0392b"], [10, 14, "#e8b800"], [14, 8, "#1a6a2a"], [17, 5, "#c0392b"]].map(([o, w, c], i) => (
        <rect key={i} x="20" y={o} width={w} height={w} rx="1" transform="rotate(45 20 20)" fill={c} opacity="0.9" />
      ))}
    </svg>
  );
}
/* ── STATIC DATA ── */
const TOPICS = ["Kongo Cosmology", "Kemetian / Ancient Egypt", "Ancient Ethiopia", "Tartaria & Pre-colonial Civilizations", "Gallic Empire", "Nubia & Kush", "Yoruba Tradition & Ifá", "Dogon Astronomy", "Vodou & Diaspora Spirituality", "Atlantic (Ethiopian) Sea History", "African Psychology & Ubuntu", "Malian Empire", "Carthage & North Africa", "Dravidian Connections", "Indigenous Americas & African Contact", "Moorish History", "Black Greeks & Mediterranean Africa", "Zulu Cosmology", "African Mythology & Oral Tradition", "Pan-African Philosophy"];
const TOPIC_KW = {
  "Kongo Cosmology": "Kongo cosmology BaKongo Dikenga Africa spiritual",
  "Kemetian / Ancient Egypt": "ancient Egypt Kemet African civilization Nile pharaoh",
  "Ancient Ethiopia": "ancient Ethiopia Axum Aksum African kingdom Lalibela",
  "Tartaria & Pre-colonial Civilizations": "pre-colonial Africa Tartaria civilization history ancient",
  "Gallic Empire": "Gallic Empire African Moors ancient history Rome",
  "Nubia & Kush": "Nubia Kush Meroe ancient Africa kingdom pyramids",
  "Yoruba Tradition & Ifá": "Yoruba Ifa divination Nigeria West Africa Orishas",
  "Dogon Astronomy": "Dogon Mali astronomy Sirius Africa star knowledge",
  "Vodou & Diaspora Spirituality": "Vodou Voodoo African diaspora Haiti spirituality Lwa",
  "Atlantic (Ethiopian) Sea History": "Ethiopian Sea Atlantic Ocean African history cartography",
  "African Psychology & Ubuntu": "Ubuntu African philosophy psychology humanist Bantu",
  "Malian Empire": "Mali Empire Mansa Musa West Africa medieval Timbuktu",
  "Carthage & North Africa": "Carthage North Africa ancient Hannibal Phoenician Berber",
  "Dravidian Connections": "Dravidian Africa India ancient connections diaspora Tamil",
  "Indigenous Americas & African Contact": "African pre-Columbian Americas Olmec contact Van Sertima",
  "Moorish History": "Moors Moorish Spain Al-Andalus African Islamic civilization",
  "Black Greeks & Mediterranean Africa": "Black Greeks African Mediterranean ancient history Libya",
  "Zulu Cosmology": "Zulu cosmology South Africa Bantu spirituality Nguni",
  "African Mythology & Oral Tradition": "African mythology oral tradition folklore griot",
  "Pan-African Philosophy": "Pan-African philosophy Garvey Diop Nkrumah consciousness",
};
const OLD_MAPS = [
  { id: "m1", title: "Mappa Mundi — Africa Centred", year: "c.1300", source: "Hereford Cathedral", description: "Medieval world map showing Africa prominently at centre, predating Eurocentric cartography. One of the largest surviving medieval maps in the world.", thumb: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Hereford-Karte.jpg/600px-Hereford-Karte.jpg", link: "https://en.wikipedia.org/wiki/Hereford_Mappa_Mundi", topics: ["Atlantic (Ethiopian) Sea History"] },
  { id: "m2", title: "Catalan Atlas — West Africa & Mansa Musa", year: "1375", source: "Bibliothèque Nationale de France", description: "Shows Mansa Musa of Mali seated on his throne holding a gold nugget — one of the first accurate depictions of Sub-Saharan Africa. Created by Abraham Cresques.", thumb: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Catalan_Atlas_BNF_Sheet_6_Mansa_Musa.jpg/600px-Catalan_Atlas_BNF_Sheet_6_Mansa_Musa.jpg", link: "https://en.wikipedia.org/wiki/Catalan_Atlas", topics: ["Malian Empire", "Atlantic (Ethiopian) Sea History"] },
  { id: "m3", title: "Ptolemy's Geography — Africa", year: "c.150 AD", source: "British Library", description: "Claudius Ptolemy's map showing Ethiopia, Nile sources, and the Mountains of the Moon — remarkable accuracy for its era. Predates European exploration by over 1000 years.", thumb: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Ptolemy_World_Map.jpg/600px-Ptolemy_World_Map.jpg", link: "https://en.wikipedia.org/wiki/Ptolemy%27s_world_map", topics: ["Ancient Ethiopia", "Kemetian / Ancient Egypt"] },
  { id: "m4", title: "Ethiopian Sea — Mar Ethiopico", year: "1630", source: "National Maritime Museum", description: "Portuguese nautical chart explicitly labelling the Atlantic Ocean as 'Mar Ethiopico' — the Ethiopian Sea — before colonial renaming erased Africa's historical relationship with the Atlantic.", thumb: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Mediterranean_chart_Guillaume_Brouscon_1543.jpg/600px-Mediterranean_chart_Guillaume_Brouscon_1543.jpg", link: "https://en.wikipedia.org/wiki/Ethiopian_Ocean", topics: ["Atlantic (Ethiopian) Sea History"] },
  { id: "m5", title: "Al-Idrisi World Map — South Up", year: "1154", source: "Bodleian Library, Oxford", description: "Muslim cartographer Al-Idrisi's map drawn with South at the top, Africa dominant and detailed. Created for King Roger II of Sicily. Considered the most accurate map of its era.", thumb: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Al-Idrisi%27s_world_map.JPG/600px-Al-Idrisi%27s_world_map.JPG", link: "https://en.wikipedia.org/wiki/Tabula_Rogeriana", topics: ["Moorish History", "Malian Empire"] },
  { id: "m6", title: "Kingdom of Kongo — Portuguese Map", year: "1591", source: "Biblioteca Nacional de Portugal", description: "Early European rendering of the Kingdom of Kongo showing its sophisticated political geography, diplomatic relationships, and territorial extent — recognised as a sovereign state by the Portuguese crown.", thumb: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Kingdom_of_Kongo.png/600px-Kingdom_of_Kongo.png", link: "https://en.wikipedia.org/wiki/Kingdom_of_Kongo", topics: ["Kongo Cosmology"] },
  { id: "m7", title: "Africa — Fra Mauro Mappamundi", year: "1450", source: "Biblioteca Nazionale Marciana, Venice", description: "Fra Mauro's map showing detailed African geography including interior kingdoms, rivers and mountains that European explorers had not yet visited — suggesting African informants.", thumb: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Fra_Mauro_map_-_Ethiopian_ocean.jpg/600px-Fra_Mauro_map_-_Ethiopian_ocean.jpg", link: "https://en.wikipedia.org/wiki/Fra_Mauro_map", topics: ["Atlantic (Ethiopian) Sea History", "Ancient Ethiopia"] },
  { id: "m8", title: "Nubia & Kush — Ancient Map", year: "c.200 AD", source: "Wikimedia Commons", description: "Ancient cartographic rendering of Nubia and the Kingdom of Kush showing the Nile corridor civilisations that predated and influenced ancient Egypt.", thumb: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Meroe_Pyramids_23dec2006_08.jpg/400px-Meroe_Pyramids_23dec2006_08.jpg", link: "https://en.wikipedia.org/wiki/Kingdom_of_Kush", topics: ["Nubia & Kush", "Ancient Ethiopia"] },
];
const CURATED_IMAGES = [
  { id: "ci1", title: "The Benin Bronzes", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Benin_plaque_Horniman.jpg/400px-Benin_plaque_Horniman.jpg", source: "Horniman Museum", description: "16th century Benin Bronze plaques — among the finest metalwork ever produced. Looted by Britain in 1897.", topics: ["African Mythology & Oral Tradition"] },
  { id: "ci2", title: "Kongo Cosmogram — Dikenga dia Kongo", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/BaKongo_cosmogram.svg/400px-BaKongo_cosmogram.svg.png", source: "Wikimedia Commons", description: "The foundational cosmological diagram of Kongo philosophy — four moments of existence.", topics: ["Kongo Cosmology"] },
  { id: "ci3", title: "Great Sphinx of Giza", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Great_Sphinx_of_Giza_-_20080716a.jpg/400px-Great_Sphinx_of_Giza_-_20080716a.jpg", source: "Wikimedia Commons", description: "The Great Sphinx carved c.2500 BCE — evidence of the monumental civilisation of ancient Kemet.", topics: ["Kemetian / Ancient Egypt"] },
  { id: "ci4", title: "Mansa Musa — Catalan Atlas", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Catalan_Atlas_BNF_Sheet_6_Mansa_Musa.jpg/400px-Catalan_Atlas_BNF_Sheet_6_Mansa_Musa.jpg", source: "Bibliothèque Nationale de France", description: "1375 depiction of Mansa Musa of Mali — one of the wealthiest individuals in human history.", topics: ["Malian Empire"] },
  { id: "ci5", title: "Meroe Pyramids — Kingdom of Kush", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Meroe_Pyramids_23dec2006_08.jpg/400px-Meroe_Pyramids_23dec2006_08.jpg", source: "Wikimedia Commons", description: "Over 200 pyramids of Meroe — more than Egypt, built c.300 BCE–350 CE.", topics: ["Nubia & Kush", "Ancient Ethiopia"] },
  { id: "ci6", title: "Ndebele Beadwork", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Ndebele_woman.jpg/300px-Ndebele_woman.jpg", source: "Wikimedia Commons", description: "Traditional Ndebele geometric beadwork carrying cultural knowledge across generations.", topics: ["Zulu Cosmology", "African Mythology & Oral Tradition"] },
  { id: "ci7", title: "Lalibela Rock Churches — Ethiopia", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Bet_Giyorgis_01.jpg/400px-Bet_Giyorgis_01.jpg", source: "Wikimedia Commons", description: "12th century rock-hewn churches of Lalibela — carved entirely from solid rock, still in use today.", topics: ["Ancient Ethiopia"] },
  { id: "ci8", title: "Dogon Mask Ceremony", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Dogon_Mask_Dance_Tireli_mali_2006.jpg/400px-Dogon_Mask_Dance_Tireli_mali_2006.jpg", source: "Wikimedia Commons", description: "Dogon mask dance ceremony — encoding cosmological knowledge passed through generations.", topics: ["Dogon Astronomy", "African Mythology & Oral Tradition"] },
];
const CURATED_LINKS = [
  { id: "cl1", title: "BlackPast.org — Peer-Reviewed Black History", url: "https://www.blackpast.org", domain: "blackpast.org", description: "Encyclopaedia of Black history verified by Black academics — the closest thing to a Wikipedia for African and diasporal history.", category: "Encyclopedia" },
  { id: "cl2", title: "African Studies — Columbia University", url: "https://library.columbia.edu/libraries/global/africanstudies.html", domain: "columbia.edu", description: "Comprehensive academic resource guide for African studies.", category: "Academic" },
  { id: "cl3", title: "Internet Archive — African History Texts", url: "https://archive.org/search?query=african+history&mediatype=texts", domain: "archive.org", description: "Free digitised texts on African history, culture and philosophy.", category: "Archive" },
  { id: "cl4", title: "Schomburg Center for Research in Black Culture", url: "https://www.nypl.org/locations/schomburg", domain: "nypl.org", description: "World-leading research facility on the African diaspora.", category: "Library" },
  { id: "cl5", title: "Timbuktu Manuscripts Project", url: "https://www.tombouctoumanuscripts.org", domain: "tombouctoumanuscripts.org", description: "Over 700,000 manuscripts from Timbuktu — mathematics, astronomy, medicine from the 13th–17th centuries.", category: "Archive" },
  { id: "cl6", title: "Europeana — African Collections", url: "https://www.europeana.eu/en/search?query=africa", domain: "europeana.eu", description: "50+ million items from European cultural institutions including African collections with open API.", category: "Archive" },
  { id: "cl7", title: "Project MUSE — African Studies Journals", url: "https://muse.jhu.edu/browse/journals?tag=African+Studies", domain: "muse.jhu.edu", description: "Peer-reviewed African Studies journals from leading universities.", category: "Journals" },
  { id: "cl8", title: "African Union — Heritage Documents", url: "https://au.int/en/history", domain: "au.int", description: "Pan-African history, treaties, and cultural heritage documents.", category: "Institutional" },
];
const CURATED_VIDEOS = [
  { id: "v1", title: "Cheikh Anta Diop — African Origin of Civilization", youtubeId: "Dp6INufjLuE", channel: "Pan-African Alliance", description: "Diop's argument that ancient Egypt was a Black African civilisation and the cradle of world culture.", topics: ["Kemetian / Ancient Egypt"], duration: "48 min" },
  { id: "v2", title: "Ivan Van Sertima — They Came Before Columbus", youtubeId: "u2yL1ywDfS0", channel: "African History", description: "Evidence of African presence in the Americas centuries before Columbus.", topics: ["Indigenous Americas & African Contact"], duration: "55 min" },
  { id: "v3", title: "John Henrik Clarke — The African World", youtubeId: "SHD9SRjlXo8", channel: "BlackHistory", description: "Clarke's survey of African civilisations across time, deconstructing the colonial narrative.", topics: ["Pan-African Philosophy"], duration: "1 hr 12 min" },
  { id: "v4", title: "Kongo Cosmology & the Four Moments of the Sun", youtubeId: "6kLHr4jXcgo", channel: "Ancestral Voices", description: "Kongo cosmological thought, the Dikenga dia Kongo, and its survival in the African diaspora.", topics: ["Kongo Cosmology", "Vodou & Diaspora Spirituality"], duration: "38 min" },
  { id: "v5", title: "Dogon Astronomy — Sirius & African Star Knowledge", youtubeId: "XxX9TbMC0xg", channel: "Afrika Is Waking", description: "The remarkable astronomical knowledge of the Dogon people of Mali.", topics: ["Dogon Astronomy"], duration: "42 min" },
  { id: "v6", title: "Marimba Ani — Yurugu & European Cultural Thought", youtubeId: "RnNmBdKj2aM", channel: "Decolonial Studies", description: "Ani's landmark analysis of European cultural logic — asili, utamawazo, and utamaroho.", topics: ["African Psychology & Ubuntu"], duration: "1 hr 5 min" },
];
const KEY_AUTHORS = [
  { id: "diop", name: "Cheikh Anta Diop", dates: "1923–1986", origin: "Senegal", field: "Historian, Physicist, Anthropologist", legacy: "Established Africa as the origin of human civilisation and argued for the African roots of ancient Egypt. Father of Afrocentrism.", works: ["Civilization or Barbarism", "The African Origin of Civilization", "Black Africa"], topics: ["Kemetian / Ancient Egypt", "Pan-African Philosophy"] },
  { id: "clarke", name: "John Henrik Clarke", dates: "1915–1998", origin: "USA", field: "Historian, Pan-African Scholar", legacy: "Pioneering historian who documented African and African-American history. Co-founder of the African Heritage Studies Association.", works: ["African World Revolution", "Christopher Columbus and the Afrikan Holocaust"], topics: ["Pan-African Philosophy", "Moorish History"] },
  { id: "ani", name: "Marimba Ani", dates: "1942–present", origin: "USA", field: "Anthropologist, Cultural Theorist", legacy: "Author of Yurugu — landmark critique of European cultural thought and its global impact.", works: ["Yurugu", "Let the Circle Be Unbroken"], topics: ["African Psychology & Ubuntu", "Pan-African Philosophy"] },
  { id: "sertima", name: "Ivan Van Sertima", dates: "1935–2009", origin: "Guyana", field: "Linguist, Anthropologist, Historian", legacy: "Demonstrated African presence in pre-Columbian Americas through linguistic and archaeological evidence.", works: ["They Came Before Columbus", "African Presence in Early Europe"], topics: ["Indigenous Americas & African Contact", "Kemetian / Ancient Egypt"] },
  { id: "fanon", name: "Frantz Fanon", dates: "1925–1961", origin: "Martinique", field: "Psychiatrist, Philosopher, Revolutionary", legacy: "Analysed the psychological effects of colonialism on the colonised. Foundational to decolonial theory.", works: ["The Wretched of the Earth", "Black Skin White Masks"], topics: ["African Psychology & Ubuntu", "Pan-African Philosophy"] },
  { id: "karenga", name: "Maulana Karenga", dates: "1941–present", origin: "USA", field: "Scholar, Cultural Activist", legacy: "Creator of Kwanzaa. Scholar of ancient Egyptian ethics and African cultural philosophy.", works: ["Maat: The Moral Ideal in Ancient Egypt", "Introduction to Black Studies"], topics: ["Kemetian / Ancient Egypt", "Yoruba Tradition & Ifá"] },
  { id: "obenga", name: "Théophile Obenga", dates: "1936–present", origin: "Republic of Congo", field: "Egyptologist, Linguist", legacy: "Proved genetic linguistic links between ancient Egyptian and sub-Saharan African languages at the 1974 Cairo Symposium.", works: ["Ancient Egypt and Black Africa", "African Philosophy"], topics: ["Kemetian / Ancient Egypt", "Kongo Cosmology"] },
  { id: "blyden", name: "Edward Wilmot Blyden", dates: "1832–1912", origin: "Virgin Islands / Liberia", field: "Scholar, Pan-African Pioneer", legacy: "One of the earliest advocates of Pan-Africanism and African cultural pride. Influenced Marcus Garvey.", works: ["Christianity, Islam and the Negro Race", "African Life and Customs"], topics: ["Pan-African Philosophy"] },
];
/* ════════════════════════════════════════
UNIFIED AI HELPER — multi-provider support
════════════════════════════════════════ */
async function callAI(system, user, provider = null, model = null) {
  const settings = JSON.parse(localStorage.getItem('ai-settings') || '{"provider":"anthropic","model":"claude-sonnet-4-20250514"}');
  const finalProvider = provider || settings.provider;
  const finalModel = model || settings.model;
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
    const data = await res.json();
    return data.text || "No response.";
  } catch (e) {
    console.error('AI call failed:', e);
    return "Connection error. Check your API settings.";
  }
}
/* ════════════════════════════════════════
SCRAPING ENGINE — per content type
════════════════════════════════════════ */
async function scrapeBooks(topic, limit = 6) {
  const q = TOPIC_KW[topic] || topic;
  const [ia, ol] = await Promise.allSettled([
    fetch(`https://archive.org/advancedsearch.php?q=${encodeURIComponent(q)}+AND+mediatype:texts&fl=identifier,title,creator,description,date&rows=${limit}&output=json&sort=downloads+desc`)
      .then(r => r.json()).then(d => (d.response?.docs || []).filter(b => b.identifier && b.title).map(b => ({ id: `ia-${b.identifier}`, title: b.title, author: Array.isArray(b.creator) ? b.creator[0] : b.creator || "Unknown", year: b.date?.slice(0, 4) || "—", description: String(b.description || "").slice(0, 200), subjects: [], iaId: b.identifier, coverId: null, editions: 1, source: "Internet Archive", readUrl: `https://archive.org/details/${b.identifier}`, downloadUrl: `https://archive.org/download/${b.identifier}/${b.identifier}.pdf` }))),
    fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(q)}&limit=${limit}&fields=key,title,author_name,first_publish_year,subject,ia,cover_i,edition_count`)
      .then(r => r.json()).then(d => (d.docs || []).filter(b => b.title).map(b => ({ id: b.key, title: b.title, author: (b.author_name || []).join(", ") || "Unknown", year: b.first_publish_year || "—", subjects: (b.subject || []).slice(0, 3), iaId: b.ia?.[0] || null, coverId: b.cover_i || null, editions: b.edition_count || 1, source: "Open Library", readUrl: b.ia?.[0] ? `https://archive.org/details/${b.ia[0]}` : `https://openlibrary.org${b.key}`, downloadUrl: b.ia?.[0] ? `https://archive.org/download/${b.ia[0]}/${b.ia[0]}.pdf` : null }))),
  ]);
  const iaBooks = ia.status === "fulfilled" ? ia.value : [];
  const olBooks = ol.status === "fulfilled" ? ol.value : [];
  return [...iaBooks, ...olBooks].slice(0, 8);
}
async function scrapeImages(topic, limit = 6) {
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
  } catch (e) { }
  try {
    const r3 = await fetch(`https://api.europeana.eu/record/v2/search.json?wskey=api2demo&query=${encodeURIComponent(q)}&rows=${limit}&profile=minimal&media=true&thumbnail=true&type=IMAGE`);
    const d3 = await r3.json();
    (d3.items || []).filter(i => i.edmPreview?.[0] && !i.edmPreview[0].includes(".svg")).forEach(item => {
      results.push({ id: `eu-${item.id?.replace(/\//g, "-")}`, title: Array.isArray(item.title) ? item.title[0] : item.title || "Europeana Item", src: item.edmPreview[0], source: `Europeana`, description: `European cultural heritage collection item related to ${topic}.`, topics: [topic], link: `https://www.europeana.eu/item${item.id}`, valid: true });
    });
  } catch (e) { }
  return results.filter(i => i.src && i.src.startsWith("http")).slice(0, 8);
}
async function scrapeLinks(topic, limit = 5) {
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
  } catch (e) { }
  return results.filter(l => l.url && l.title).slice(0, limit);
}
/* ── Search within scraped/curated content ── */
function searchLocal(query, { books, images, links, maps, videos }) {
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
/* ════════════════════════════════════════
SHARED UI ATOMS
════════════════════════════════════════ */
function Pill({ label, color = "gold", T }) {
  const configs = { gold: { bg: T.pillBg, bd: T.pillBd, tx: T.pillTx }, green: { bg: `${T.ndG}25`, bd: T.ok, tx: T.ok }, red: { bg: `${T.ndR}18`, bd: T.err, tx: T.err }, blue: { bg: `${T.ndB}20`, bd: T.ndB, tx: T.ndB } };
  const { bg, bd, tx } = configs[color] || configs.gold;
  return <span style={{ display: "inline-flex", alignItems: "center", padding: "3px 10px", background: bg, border: `1px solid ${bd}`, borderRadius: 20, fontSize: 9, letterSpacing: "1.5px", textTransform: "uppercase", color: tx, fontFamily: F.body, marginRight: 5, marginTop: 4, whiteSpace: "nowrap" }}>{label}</span>;
}
function Btn({ children, onClick, v = "ghost", sm = false, T, href, disabled = false }) {
  const styles = {
    primary: { background: disabled ? T.bg3 : T.btnP, color: disabled ? T.txt3 : T.btnPTx, border: "none" },
    green: { background: `${T.ndG}20`, border: `1px solid ${T.ok}`, color: T.ok },
    ghost: { background: "transparent", border: `1px solid ${T.border}`, color: T.txt2 },
  };
  const s = { ...styles[v] || styles.ghost, padding: sm ? "5px 11px" : "8px 16px", borderRadius: 4, cursor: disabled ? "not-allowed" : "pointer", fontFamily: F.body, fontWeight: 500, fontSize: sm ? 9 : 10, letterSpacing: "0.8px", textTransform: "uppercase", transition: "all 0.15s", display: "inline-flex", alignItems: "center", gap: 5, whiteSpace: "nowrap" };
  if (href) return <a href={href} target="_blank" rel="noreferrer"><button style={s}>{children}</button></a>;
  return <button onClick={onClick} style={s} disabled={disabled}>{children}</button>;
}
function AuthorRing({ name, size = 40, T }) {
  const [src, setSrc] = useState(null);
  const nameRef = useRef(name);
  useEffect(() => {
    if (!name || name === nameRef.current && src) return;
    nameRef.current = name;
    fetch(`https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(name)}&prop=pageimages&format=json&pithumbsize=200&origin=*`)
      .then(r => r.json()).then(d => setSrc(Object.values(d?.query?.pages || {})[0]?.thumbnail?.source || null)).catch(() => { });
  }, [name]);
  const ini = name?.split(" ").map(w => w[0]).slice(0, 2).join("") || "?";
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", overflow: "hidden", flexShrink: 0, border: `2px solid ${T.ndY}`, background: T.bg3, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {src ? <img src={src} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={() => setSrc(null)} />
        : <span style={{ fontSize: size * 0.3, color: T.ndY, fontFamily: F.display, fontWeight: 600 }}>{ini}</span>}
    </div>
  );
}
function BookCover({ book, size = 52, T }) {
  return (
    <div style={{ width: size, minWidth: size, height: size * 1.4, background: `linear-gradient(160deg,${T.ndB}40,${T.bg3})`, border: `1px solid ${T.border}`, borderRadius: 4, overflow: "hidden", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {book.coverId ? <img src={`https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg`} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => e.target.style.display = "none"} />
        : <BeninMask size={size * 0.48} T={T} />}
    </div>
  );
}
/* ── Book Reader ── */
function BookReader({ book, onClose, T }) {
  const embed = book.iaId ? `https://archive.org/stream/${book.iaId}?ui=embed#page/n0/mode/2up` : null;
  return (
    <div style={{ position: "fixed", inset: 0, background: T.isDark ? "rgba(4,3,2,0.98)" : "rgba(245,240,232,0.98)", zIndex: 3000, display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "10px 18px", background: T.card, borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
        <BeninMask size={26} T={T} glow />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, color: T.txt0, fontFamily: F.display, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{book.title}</div>
          <div style={{ fontSize: 10, color: T.txt2, fontFamily: F.body, fontStyle: "italic" }}>{book.author} · {book.year}</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {book.readUrl && <Btn href={book.readUrl} v="primary" T={T} sm>↗ Open Full</Btn>}
          <Btn onClick={onClose} T={T} sm>✕ Close</Btn>
        </div>
      </div>
      <NdStripe h={3} />
      {embed ? (
        <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "6px 18px", background: T.bg2, borderBottom: `1px solid ${T.border}`, fontSize: 10, color: T.txt3, fontFamily: F.body }}>
            📖 <span style={{ color: T.ndY }}>{book.title}</span> — If reader doesn't load, click ↗ Open Full above.
          </div>
          <iframe src={embed} style={{ flex: 1, width: "100%", border: "none", display: "block", minHeight: 0 }} title={book.title} allowFullScreen sandbox="allow-scripts allow-same-origin allow-popups allow-forms" />
        </div>
      ) : (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, padding: 40, textAlign: "center" }}>
          <BeninMask size={56} T={T} glow />
          <div style={{ fontSize: 18, color: T.txt0, fontFamily: F.display, fontWeight: 600 }}>{book.title}</div>
          <div style={{ fontSize: 12, color: T.txt2, fontFamily: F.body, maxWidth: 400, lineHeight: 1.7 }}>This text is not available for inline reading. Open it directly in Internet Archive or Open Library.</div>
          {book.readUrl && <Btn href={book.readUrl} v="primary" T={T}>↗ Open in Archive.org</Btn>}
        </div>
      )}
    </div>
  );
}
/* ── Map Viewer — inline ── */
function MapViewer({ map, onClose, T }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.96)", zIndex: 3000, display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "10px 18px", background: T.card, borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
        <span style={{ fontSize: 18 }}>🗺</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, color: T.txt0, fontFamily: F.display, fontWeight: 600 }}>{map.title}</div>
          <div style={{ fontSize: 10, color: T.txt2, fontFamily: F.body }}>{map.year} · {map.source}</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {map.link && <Btn href={map.link} v="primary" T={T} sm>↗ Full Source</Btn>}
          <Btn onClick={onClose} T={T} sm>✕ Close</Btn>
        </div>
      </div>
      <NdStripe h={3} />
      <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column", background: "#111" }}>
        <div style={{ flex: 1, overflow: "auto", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <img src={map.thumb} alt={map.title} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", borderRadius: 4, boxShadow: "0 4px 32px rgba(0,0,0,0.8)" }} onError={e => { e.target.style.display = "none"; }} />
        </div>
        <div style={{ padding: "14px 24px", background: T.card, borderTop: `1px solid ${T.border}`, display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 220 }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
              <Pill label={map.year} T={T} />
              <Pill label={map.source} color="blue" T={T} />
              {map.topics?.map(t => <Pill key={t} label={t} T={T} />)}
            </div>
            <div style={{ fontSize: 12.5, color: T.txt1, fontFamily: F.body, lineHeight: 1.7 }}>{map.description}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
/* ── Book Card ── */
function BookCard({ book, saved, dlSt, onSave, onDownload, onRead, T }) {
  return (
    <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 10, padding: "14px 16px", marginBottom: 10, boxShadow: T.shadow, borderLeft: `3px solid ${book.featured ? T.ndY : T.ndB}` }}>
      {book.featured && <div style={{ fontSize: 8, letterSpacing: 2, color: T.ndY, textTransform: "uppercase", fontFamily: F.body, marginBottom: 8, display: "flex", alignItems: "center", gap: 5 }}><NdDiamond s={10} T={T} /> Featured Work</div>}
      <div style={{ display: "flex", gap: 12, marginBottom: 10 }}>
        <BookCover book={book} size={46} T={T} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13.5, color: T.txt0, fontFamily: F.display, fontWeight: 600, lineHeight: 1.3, marginBottom: 5 }}>{book.title}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
            <AuthorRing name={book.author} size={26} T={T} />
            <div>
              <div style={{ fontSize: 11, color: T.ndY, fontFamily: F.body, fontWeight: 600 }}>{book.author}</div>
              <div style={{ fontSize: 9, color: T.txt3, fontFamily: F.body }}>{book.year} · {book.source || "Archive"}</div>
            </div>
          </div>
          {book.description && <div style={{ fontSize: 11, color: T.txt2, fontFamily: F.body, lineHeight: 1.6, fontStyle: "italic" }}>{book.description.slice(0, 140)}{book.description.length > 140 ? "…" : ""}</div>}
        </div>
      </div>
      {book.subjects?.length > 0 && <div style={{ marginBottom: 7 }}>{book.subjects.map(s => <Pill key={s} label={s} T={T} />)}</div>}
      <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
        {book.iaId && <Btn v="primary" onClick={() => onRead(book)} T={T} sm>📖 Read Here</Btn>}
        {book.downloadUrl && <Btn v="green" onClick={() => onDownload(book)} T={T} sm>↓ PDF</Btn>}
        {book.readUrl && <Btn href={book.readUrl} T={T} sm>↗ Source</Btn>}
        {!saved ? <Btn onClick={() => onSave(book)} T={T} sm>+ Save</Btn> : <Pill label="Saved" color="green" T={T} />}
        {dlSt === "downloaded" && <Pill label="Downloaded ✓" color="green" T={T} />}
      </div>
    </div>
  );
}
/* ── Map Card ── */
function MapCard({ map, saved, onSave, onView, T }) {
  const [imgOk, setImgOk] = useState(true);
  return (
    <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 10, overflow: "hidden", boxShadow: T.shadow }}>
      <div style={{ height: 160, background: T.bg3, overflow: "hidden", position: "relative", cursor: "pointer" }} onClick={() => onView(map)}>
        {imgOk
          ? <img src={map.thumb} alt={map.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={() => setImgOk(false)} />
          : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: T.txt3, fontFamily: F.body, fontSize: 12, flexDirection: "column", gap: 8 }}><span style={{ fontSize: 32 }}>🗺</span>{map.title}</div>}
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0)", transition: "background 0.2s" }} />
        <div style={{ position: "absolute", bottom: 8, left: 10 }}>
          <span style={{ background: "rgba(0,0,0,0.7)", color: "#fff", fontSize: 9, padding: "2px 8px", borderRadius: 12, fontFamily: F.body, letterSpacing: 1 }}>{map.year}</span>
        </div>
        <div style={{ position: "absolute", top: 8, right: 8 }}>
          <button onClick={e => { e.stopPropagation(); onSave(map); }} style={{ padding: "3px 9px", background: saved ? "#1a6a2a" : "rgba(0,0,0,0.65)", border: `1px solid ${saved ? "#2a8a5a" : "rgba(255,255,255,0.2)"}`, borderRadius: 20, color: saved ? "#8affc8" : "#fff", cursor: "pointer", fontSize: 9, fontFamily: F.body, letterSpacing: 1, textTransform: "uppercase" }}>
            {saved ? "✓" : "+ Save"}
          </button>
        </div>
      </div>
      <div style={{ padding: "12px 14px" }}>
        <div style={{ fontSize: 13, color: T.txt0, fontFamily: F.display, fontWeight: 600, marginBottom: 4, lineHeight: 1.3, cursor: "pointer" }} onClick={() => onView(map)}>{map.title}</div>
        <div style={{ fontSize: 11, color: T.txt2, fontFamily: F.body, lineHeight: 1.55, marginBottom: 8 }}>{map.description.slice(0, 120)}{map.description.length > 120 ? "…" : ""}</div>
        <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
          <Btn v="primary" onClick={() => onView(map)} T={T} sm>🔍 View Map</Btn>
          {map.link && <Btn href={map.link} T={T} sm>↗ Source</Btn>}
        </div>
      </div>
    </div>
  );
}
/* ════════════════════════════════════════
SIDEBAR — defined OUTSIDE App to prevent re-mount
════════════════════════════════════════ */
const NAV_ITEMS = [
  { id: "all", icon: "⌂", label: "Home" },
  { id: "deepdive", icon: "◈", label: "Deep Dive" },
  { id: "books", icon: "📚", label: "Books" },
  { id: "videos", icon: "▶", label: "Videos" },
  { id: "images", icon: "🖼", label: "Images" },
  { id: "links", icon: "🔗", label: "Links" },
  { id: "maps", icon: "🗺", label: "Maps" },
  { id: "authors", icon: "✦", label: "Authors" },
  { id: "notes", icon: "✍", label: "Notes" },
  { id: "settings", icon: "⚙", label: "Settings" }, // NEW
];
function Sidebar({ T, tab, setTab, topic, setTopic, dark, setDark, collapsed, setCollapsed }) {
  const W = collapsed ? 64 : 220;
  return (
    <div style={{ width: W, minWidth: W, height: "100vh", background: T.isDark ? "#0a0906" : "#ffffff", borderRight: `1px solid ${T.border}`, display: "flex", flexDirection: "column", position: "fixed", left: 0, top: 0, zIndex: 100, transition: "width 0.2s ease", overflow: "hidden" }}>
      {/* Logo */}
      <div style={{ padding: collapsed ? "16px 0" : "18px 16px 12px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 10, flexShrink: 0, justifyContent: collapsed ? "center" : "flex-start" }}>
        <div style={{ flexShrink: 0 }}><BeninMask size={28} T={T} glow /></div>
        {!collapsed && (
          <div>
            <div style={{ fontSize: 15, fontFamily: F.display, fontWeight: 600, letterSpacing: 2, lineHeight: 1.1, background: `linear-gradient(135deg,${T.ndB},${T.ndR},${T.ndY},${T.ndG},${T.ndR})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Yehuti</div>
            <div style={{ fontSize: 8, letterSpacing: 3, color: T.txt3, textTransform: "uppercase", fontFamily: F.body }}>The Black Archive</div>
          </div>
        )}
      </div>
      {/* Nav */}
      <nav style={{ flex: 1, overflowY: "auto", padding: "4px 0" }}>
        {NAV_ITEMS.map(n => {
          const active = tab === n.id;
          return (
            <button key={n.id} onClick={() => setTab(n.id)} style={{ display: "flex", alignItems: "center", gap: 11, width: "100%", padding: collapsed ? "10px 0" : "8px 14px", justifyContent: collapsed ? "center" : "flex-start", background: active ? (T.isDark ? `${T.ndY}14` : `${T.ndY}10`) : "transparent", border: "none", borderLeft: !collapsed && active ? `3px solid ${T.ndY}` : "3px solid transparent", borderRadius: collapsed ? 0 : "0 8px 8px 0", color: active ? T.ndY : T.txt2, cursor: "pointer", fontFamily: F.body, fontSize: 12.5, fontWeight: active ? 600 : 400, transition: "all 0.15s", marginRight: collapsed ? 0 : 6 }}>
              <span style={{ fontSize: 14, flexShrink: 0, opacity: active ? 1 : 0.65 }}>{n.icon}</span>
              {!collapsed && <span>{n.label}</span>}
            </button>
          );
        })}
      </nav>
      {/* Topics */}
      {!collapsed && (
        <div style={{ borderTop: `1px solid ${T.border}`, padding: "6px 0", maxHeight: 250, overflowY: "auto", flexShrink: 0 }}>
          <div style={{ fontSize: 8, letterSpacing: 3, color: T.txt3, textTransform: "uppercase", fontFamily: F.body, padding: "4px 14px 6px" }}>Topics</div>
          {TOPICS.map(t => (
            <button key={t} onClick={() => setTopic(topic === t ? null : t)} style={{ display: "block", width: "100%", textAlign: "left", padding: "5px 14px", background: topic === t ? `${T.ndY}10` : "transparent", border: "none", borderLeft: topic === t ? `2px solid ${T.ndY}` : "2px solid transparent", color: topic === t ? T.ndY : T.txt3, fontSize: 11, cursor: "pointer", fontFamily: F.body, lineHeight: 1.4, transition: "all 0.12s" }}>{t}</button>
          ))}
        </div>
      )}
      {/* Bottom */}
      <div style={{ borderTop: `1px solid ${T.border}`, padding: "10px 10px", display: "flex", alignItems: "center", flexShrink: 0, justifyContent: collapsed ? "center" : "space-between", gap: 6 }}>
        <button onClick={() => setDark(d => !d)} style={{ background: "transparent", border: `1px solid ${T.border}`, borderRadius: 6, padding: "5px 8px", color: T.txt2, cursor: "pointer", fontSize: 13, display: "flex", alignItems: "center", gap: 5 }}>
          {dark ? "☀" : "🌙"}{!collapsed && <span style={{ fontSize: 10, fontFamily: F.body }}>{dark ? "Light" : "Dark"}</span>}
        </button>
        <button onClick={() => setCollapsed(c => !c)} style={{ background: "transparent", border: `1px solid ${T.border}`, borderRadius: 6, padding: "5px 7px", color: T.txt3, cursor: "pointer", fontSize: 11 }}>
          {collapsed ? "▶" : "◀"}
        </button>
      </div>
    </div>
  );
}
/* ════════════════════════════════════════
SETTINGS SCREEN — NEW
════════════════════════════════════════ */
function SettingsScreen({ T }) {
  const [settings, setSettings] = useState(() => {
    try { return JSON.parse(localStorage.getItem('ai-settings') || '{"provider":"anthropic","model":"claude-sonnet-4-20250514"}'); } catch { return { provider: "anthropic", model: "claude-sonnet-4-20250514" }; }
  });
  const [testResult, setTestResult] = useState(null);
  const [testing, setTesting] = useState(false);
  const providers = [
    { id: "anthropic", name: "Anthropic Claude", models: ["claude-sonnet-4-20250514", "claude-3-5-sonnet-20241022", "claude-3-opus-20240229"] },
    { id: "openai", name: "OpenAI GPT", models: ["gpt-4o", "gpt-4-turbo", "gpt-4", "gpt-3.5-turbo"] },
    { id: "google", name: "Google Gemini", models: ["gemini-1.5-pro", "gemini-1.5-flash", "gemini-pro"] },
    { id: "mistral", name: "Mistral AI", models: ["mistral-large-latest", "mistral-medium", "mistral-small"] },
  ];
  const currentProvider = providers.find(p => p.id === settings.provider) || providers[0];
  const saveSettings = (newSettings) => {
    const merged = { ...settings, ...newSettings };
    setSettings(merged);
    localStorage.setItem('ai-settings', JSON.stringify(merged));
  };
  const testConnection = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      const result = await callAI('You are a test assistant. Reply with only "OK" if you can connect.', 'Test');
      setTestResult(result === "OK" ? "✓ Connection successful!" : `✓ Connected — Response: "${result.slice(0, 50)}${result.length > 50 ? '…' : ''}"`);
    } catch (e) {
      setTestResult(`✗ Error: ${e.message || 'Connection failed'}`);
    }
    setTesting(false);
  };
  return (
    <div>
      <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 10, padding: "20px 24px", marginBottom: 20, boxShadow: T.shadow }}>
        <div style={{ fontSize: 14, color: T.txt0, fontFamily: F.display, fontWeight: 600, marginBottom: 16 }}>⚙ AI Provider Settings</div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 11, color: T.txt3, fontFamily: F.body, display: "block", marginBottom: 6 }}>Provider</label>
          <select value={settings.provider} onChange={e => saveSettings({ provider: e.target.value, model: providers.find(p => p.id === e.target.value)?.models[0] })} style={{ width: "100%", padding: "10px 12px", background: T.bg2, border: `1px solid ${T.border}`, borderRadius: 6, color: T.txt0, fontFamily: F.body, fontSize: 13, outline: "none" }}>
            {providers.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 11, color: T.txt3, fontFamily: F.body, display: "block", marginBottom: 6 }}>Model</label>
          <select value={settings.model} onChange={e => saveSettings({ model: e.target.value })} style={{ width: "100%", padding: "10px 12px", background: T.bg2, border: `1px solid ${T.border}`, borderRadius: 6, color: T.txt0, fontFamily: F.body, fontSize: 13, outline: "none" }}>
            {currentProvider.models.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
        <div style={{ background: T.bg2, border: `1px dashed ${T.border}`, borderRadius: 8, padding: "14px 16px", marginBottom: 16 }}>
          <div style={{ fontSize: 10, color: T.txt3, fontFamily: F.body, marginBottom: 8 }}>🔐 API Keys are stored securely in Vercel environment variables:</div>
          <div style={{ fontSize: 9, color: T.txt2, fontFamily: F.body, lineHeight: 1.6 }}>
            • ANTHROPIC_API_KEY<br />
            • OPENAI_API_KEY<br />
            • GEMINI_API_KEY<br />
            • MISTRAL_API_KEY
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          <Btn v="primary" onClick={testConnection} disabled={testing} T={T}>{testing ? "Testing…" : "Test Connection"}</Btn>
          {testResult && <span style={{ fontSize: 11, color: testResult.startsWith("✓") ? T.ok : T.err, fontFamily: F.body }}>{testResult}</span>}
        </div>
      </div>
      <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 10, padding: "20px 24px", boxShadow: T.shadow }}>
        <div style={{ fontSize: 12, color: T.txt1, fontFamily: F.body, lineHeight: 1.7 }}>
          <span style={{ color: T.ndY, fontWeight: 600 }}>About AI Integration:</span> The Black Archive uses AI to power scholarly overviews (Deep Dive) and web research. All requests are routed through a secure serverless proxy that never exposes your API keys to the browser. Choose your preferred provider above — settings persist locally in your browser.
        </div>
      </div>
    </div>
  );
}
/* ════════════════════════════════════════
SCREENS
════════════════════════════════════════ */
/* ── Universal Search Results ── */
function AllScreen({ T, globalQuery, activeTopic, setTab, scrapedBooks, scrapedImages, scrapedLinks, onScrapeAll, scraping, scrapeProgress }) {
  const [aiResults, setAiResults] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const prevQuery = useRef("");
  const allBooks = useMemo(() => [...scrapedBooks], [scrapedBooks]);
  const allImages = useMemo(() => [...CURATED_IMAGES, ...scrapedImages], [scrapedImages]);
  const allLinks = useMemo(() => [...CURATED_LINKS, ...scrapedLinks], [scrapedLinks]);
  const allMaps = OLD_MAPS;
  const allVideos = CURATED_VIDEOS;
  const local = useMemo(() => searchLocal(globalQuery, { books: allBooks, images: allImages, links: allLinks, maps: allMaps, videos: allVideos }), [globalQuery, allBooks, allImages, allLinks]);
  useEffect(() => {
    if (!globalQuery?.trim() || globalQuery === prevQuery.current) return;
    prevQuery.current = globalQuery;
    setAiLoading(true);
    setAiResults(null);
    // UPDATED: use callAI instead of webSearch
    callAI('You are a decolonial research assistant. Search scholarly and culturally centred sources.', `Search for decolonial and Afrocentric scholarly sources about: "${globalQuery}". Summarise 4–6 key findings with sources, dates, and references. Focus on African and Black diasporal perspectives.`)
      .then(r => { setAiResults(r); setAiLoading(false); }).catch(() => setAiLoading(false));
  }, [globalQuery]);
  const hasQuery = globalQuery?.trim()?.length > 0;
  const totalResults = (local.books.length + local.images.length + local.links.length + local.maps.length + local.videos.length);
  const doneTopics = Object.keys(scrapedBooks.reduce((a, b) => { a[b._topic] = 1; return a; }, {})).length;
  return (
    <div>
      {/* Population engine */}
      <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 10, padding: "16px 20px", marginBottom: 20, boxShadow: T.shadow }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <NdDiamond s={18} T={T} />
            <div>
              <div style={{ fontSize: 13, color: T.txt0, fontFamily: F.display, fontWeight: 600 }}>Archive Population Engine</div>
              <div style={{ fontSize: 11, color: T.txt2, fontFamily: F.body, marginTop: 2 }}>Pulls books, images & links from Internet Archive, Europeana, Wikimedia, Wikipedia & Gallica across all 20 topics</div>
            </div>
          </div>
          <button onClick={onScrapeAll} disabled={scraping} style={{ padding: "9px 20px", background: scraping ? T.bg3 : T.btnP, border: `1px solid ${scraping ? T.border : "transparent"}`, borderRadius: 6, color: scraping ? T.txt3 : T.btnPTx, cursor: scraping ? "not-allowed" : "pointer", fontSize: 10, fontFamily: F.body, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", flexShrink: 0 }}>
            {scraping ? "Populating…" : "Populate All Topics"}
          </button>
        </div>
        {(scraping || scrapeProgress) && (
          <div style={{ marginTop: 12 }}>
            <div style={{ fontSize: 10, color: T.txt3, fontFamily: F.body, marginBottom: 5 }}>{scrapeProgress}</div>
            <div style={{ height: 5, background: T.bg3, borderRadius: 3, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${Math.min(100, Math.round((scrapedBooks.length / 160) * 100))}%`, background: T.btnP, borderRadius: 3, transition: "width 0.4s ease" }} />
            </div>
          </div>
        )}
        <div style={{ display: "flex", gap: 12, marginTop: 12, flexWrap: "wrap" }}>
          {[{ l: "Books", v: scrapedBooks.length, i: "📚" }, { l: "Images", v: scrapedImages.length, i: "🖼" }, { l: "Links", v: scrapedLinks.length, i: "🔗" }].map(({ l, v, i }) => (
            <div key={l} style={{ background: T.bg2, border: `1px solid ${T.border}`, borderRadius: 7, padding: "8px 14px", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 14 }}>{i}</span>
              <div>
                <div style={{ fontSize: 15, color: T.ndY, fontFamily: F.display, fontWeight: 600, lineHeight: 1 }}>{v}</div>
                <div style={{ fontSize: 8, color: T.txt3, fontFamily: F.body, letterSpacing: 2, textTransform: "uppercase" }}>{l}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Search results */}
      {hasQuery && (
        <div>
          <div style={{ fontSize: 11, color: T.txt2, fontFamily: F.body, marginBottom: 16 }}>
            Results for <span style={{ color: T.txt0, fontWeight: 600 }}>"{globalQuery}"</span> — {totalResults} local matches + AI research
          </div>
          {/* AI web results */}
          {aiLoading && <div style={{ color: T.ndY, fontStyle: "italic", fontSize: 13, padding: "16px 0", fontFamily: F.display }}>Searching the historical record for "{globalQuery}"…</div>}
          {aiResults && (
            <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 10, padding: "18px 20px", marginBottom: 20, boxShadow: T.shadow }}>
              <div style={{ fontSize: 9, letterSpacing: 3, color: T.ndY, textTransform: "uppercase", fontFamily: F.body, marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}><span>🔍</span> Web Research Results</div>
              <div style={{ fontSize: 13, color: T.txt1, fontFamily: F.body, lineHeight: 1.75, whiteSpace: "pre-wrap" }}>{aiResults}</div>
            </div>
          )}
          {/* Local matches by type */}
          {local.books.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <div style={{ fontSize: 10, color: T.txt3, fontFamily: F.body, letterSpacing: 2, textTransform: "uppercase" }}>📚 Books ({local.books.length})</div>
                <button onClick={() => setTab("books")} style={{ background: "none", border: "none", color: T.ndY, cursor: "pointer", fontSize: 10, fontFamily: F.body, letterSpacing: 1 }}>See all →</button>
              </div>
              {local.books.slice(0, 3).map(b => (
                <div key={b.id} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 8, padding: "10px 14px", marginBottom: 8, display: "flex", gap: 10, alignItems: "center", boxShadow: T.shadow }}>
                  <BookCover book={b} size={38} T={T} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12.5, color: T.txt0, fontFamily: F.display, fontWeight: 600, lineHeight: 1.3 }}>{b.title}</div>
                    <div style={{ fontSize: 10, color: T.ndY, fontFamily: F.body }}>{b.author} · {b.year}</div>
                  </div>
                  {b.readUrl && <Btn href={b.readUrl} T={T} sm>↗</Btn>}
                </div>
              ))}
            </div>
          )}
          {local.maps.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <div style={{ fontSize: 10, color: T.txt3, fontFamily: F.body, letterSpacing: 2, textTransform: "uppercase" }}>🗺 Maps ({local.maps.length})</div>
                <button onClick={() => setTab("maps")} style={{ background: "none", border: "none", color: T.ndY, cursor: "pointer", fontSize: 10, fontFamily: F.body, letterSpacing: 1 }}>See all →</button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 10 }}>
                {local.maps.slice(0, 4).map(m => (
                  <div key={m.id} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 8, overflow: "hidden", boxShadow: T.shadow }}>
                    <img src={m.thumb} alt={m.title} style={{ width: "100%", height: 100, objectFit: "cover", display: "block" }} onError={e => e.target.style.display = "none"} />
                    <div style={{ padding: "8px 10px" }}>
                      <div style={{ fontSize: 11.5, color: T.txt0, fontFamily: F.display, fontWeight: 600, lineHeight: 1.3 }}>{m.title}</div>
                      <div style={{ fontSize: 9, color: T.txt3, fontFamily: F.body, marginTop: 3 }}>{m.year}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {local.images.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <div style={{ fontSize: 10, color: T.txt3, fontFamily: F.body, letterSpacing: 2, textTransform: "uppercase" }}>🖼 Images ({local.images.length})</div>
                <button onClick={() => setTab("images")} style={{ background: "none", border: "none", color: T.ndY, cursor: "pointer", fontSize: 10, fontFamily: F.body, letterSpacing: 1 }}>See all →</button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(140px,1fr))", gap: 8 }}>
                {local.images.slice(0, 6).map(img => (
                  <div key={img.id} style={{ borderRadius: 8, overflow: "hidden", background: T.bg3 }}>
                    <img src={img.src} alt={img.title} style={{ width: "100%", height: 100, objectFit: "cover", display: "block" }} onError={e => e.target.parentElement.style.display = "none"} />
                  </div>
                ))}
              </div>
            </div>
          )}
          {local.links.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 10, color: T.txt3, fontFamily: F.body, letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>🔗 Links ({local.links.length})</div>
              {local.links.slice(0, 4).map(l => (
                <a key={l.id} href={l.url} target="_blank" rel="noreferrer" style={{ display: "block", background: T.card, border: `1px solid ${T.border}`, borderRadius: 8, padding: "10px 14px", marginBottom: 8, textDecoration: "none", boxShadow: T.shadow }}>
                  <div style={{ fontSize: 12.5, color: T.ndY, fontFamily: F.display, fontWeight: 600, marginBottom: 3 }}>{l.title}</div>
                  <div style={{ fontSize: 10, color: T.txt3, fontFamily: F.body }}>{l.domain}</div>
                </a>
              ))}
            </div>
          )}
          {totalResults === 0 && !aiLoading && <div style={{ textAlign: "center", padding: "30px 0", color: T.txt3, fontStyle: "italic", fontSize: 13, fontFamily: F.display }}>No local matches found. See AI research results above for web sources.</div>}
        </div>
      )}
      {/* Default home grid */}
      {!hasQuery && (
        <div>
          <div style={{ fontSize: 10, color: T.txt3, fontFamily: F.body, letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>Explore Topics</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 10 }}>
            {TOPICS.map(t => {
              const tBooks = scrapedBooks.filter(b => b._topic === t).length;
              const tImages = scrapedImages.filter(i => i.topics?.includes(t)).length;
              return (
                <button key={t} onClick={() => setTab("deepdive")} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 10, padding: "13px 15px", cursor: "pointer", textAlign: "left", boxShadow: T.shadow }}>
                  {(tBooks + tImages) > 0 && <div style={{ fontSize: 8, color: T.ok, fontFamily: F.body, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>✓ {tBooks + tImages} items</div>}
                  <div style={{ fontSize: 12.5, color: T.txt0, fontFamily: F.display, fontWeight: 600, lineHeight: 1.3 }}>{t}</div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
function DeepDiveScreen({ T, activeTopic, globalQuery }) {
  const [topic, setTopic] = useState(globalQuery || activeTopic || "");
  const [res, setRes] = useState(null); const [loading, setLoading] = useState(false); const prev = useRef(null);
  useEffect(() => { if (activeTopic && activeTopic !== prev.current) { setTopic(activeTopic); prev.current = activeTopic; } }, [activeTopic]);
  useEffect(() => { if (globalQuery && globalQuery !== prev.current) { setTopic(globalQuery); prev.current = globalQuery; } }, [globalQuery]);
  const SYS = `You are a decolonial scholar of African history, Black diasporal culture, mythology, cosmology and spirituality. Centre African voices and indigenous frameworks. Avoid Eurocentric bias. Write in a scholarly yet accessible tone with clear sections using headers.`;
  const run = async () => {
    if (!topic.trim()) return;
    setLoading(true); setRes(null);
    try {
      // UPDATED: use callAI instead of callClaude
      const result = await callAI(SYS, `Provide a deep, comprehensive scholarly overview of: "${topic}". Structure your response with clear sections covering: 1) Historical & geographical context, 2) Spiritual/cosmological significance, 3) Key figures and traditions, 4) Connections to the broader African and diasporal world, 5) Colonial distortions and indigenous corrections. Be specific, cite scholars, and centre African epistemologies.`);
      setRes(result);
    } catch { setRes("Request failed."); }
    setLoading(false);
  };
  useEffect(() => { if (globalQuery && globalQuery.trim() && globalQuery !== prev.current) { prev.current = globalQuery; run(); } }, [globalQuery]);
  return (
    <div>
      <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 10, padding: "16px 18px", marginBottom: 18, boxShadow: T.shadow }}>
        <div style={{ fontSize: 9, color: T.ndY, fontFamily: F.body, letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>Scholarly Exploration</div>
        <div style={{ display: "flex", gap: 0 }}>
          <input style={{ flex: 1, background: T.bg2, border: `1px solid ${T.border}`, borderRight: "none", borderRadius: "6px 0 0 6px", color: T.txt0, padding: "11px 15px", fontSize: 13, fontFamily: F.body, outline: "none" }} placeholder="e.g. Kongo cosmogram, colonization of Kush…" value={topic} onChange={e => setTopic(e.target.value)} onKeyDown={e => e.key === "Enter" && run()} />
          <button onClick={run} style={{ padding: "11px 20px", background: T.btnP, border: "none", borderRadius: "0 6px 6px 0", color: T.btnPTx, fontSize: 10, fontWeight: 700, cursor: "pointer", letterSpacing: "1px", textTransform: "uppercase", fontFamily: F.body, whiteSpace: "nowrap" }}>{loading ? "…" : "Explore"}</button>
        </div>
      </div>
      {loading && <div style={{ color: T.ndY, fontStyle: "italic", fontSize: 13, padding: "18px 0", fontFamily: F.display }}>Consulting the ancestors on "{topic}"…</div>}
      {res && (<div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 10, padding: "22px 24px", lineHeight: 1.85, fontSize: 13.5, color: T.txt1, fontFamily: F.body, boxShadow: T.shadow }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, paddingBottom: 12, borderBottom: `1px solid ${T.border}` }}>
          <NdDiamond s={16} T={T} /> <span style={{ fontSize: 9, letterSpacing: 2, color: T.ndY, textTransform: "uppercase", fontFamily: F.body }}>Scholarly Overview — {topic}</span>
        </div>
        <div style={{ whiteSpace: "pre-wrap" }}>{res}</div>
      </div>)}
      {!res && !loading && (<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 10 }}>
        {["Kongo Cosmogram", "Colonization & Kongo", "Dogon Star Knowledge", "Queen Idia of Benin", "Kemetian Spiritual Science", "Moors in Europe", "Vodou & Diaspora", "Ubuntu Philosophy", "Nile Valley Civilisations", "Ethiopian Sea History"].map(s => (
          <button key={s} onClick={() => { setTopic(s); setTimeout(run, 50); }} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 10, padding: "13px 15px", cursor: "pointer", textAlign: "left", boxShadow: T.shadow }}>
            <div style={{ fontSize: 8, color: T.ndY, fontFamily: F.body, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>Suggested</div>
            <div style={{ fontSize: 12, color: T.txt0, fontFamily: F.display, fontWeight: 600, lineHeight: 1.3 }}>{s}</div>
          </button>
        ))}
      </div>)}
    </div>
  );
}
function BooksScreen({ T, activeTopic, globalQuery, scrapedBooks, onScrapeBooks, scraping }) {
  const KEY = "ba-cat-v3";
  const [q, setQ] = useState(globalQuery || activeTopic || "");
  const [manualRes, setManualRes] = useState([]); const [searching, setSearching] = useState(false);
  const [dlSt, setDlSt] = useState({}); const [view, setView] = useState("browse"); const [reading, setReading] = useState(null);
  const [cat, setCat] = useState(() => { try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; } });
  useEffect(() => { if (globalQuery) setQ(globalQuery); }, [globalQuery]);
  useEffect(() => { if (activeTopic) setQ(activeTopic); }, [activeTopic]);
  const persist = u => { setCat(u); localStorage.setItem(KEY, JSON.stringify(u)); };
  const inCat = id => cat.some(b => b.id === id);
  const saveBook = book => { if (inCat(book.id)) return; persist([{ ...book, addedDate: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) }, ...cat]); };
  const tryDl = book => { const u = book.downloadUrl; if (u) { const a = document.createElement("a"); a.href = u; a.download = `${book.title}.pdf`; a.target = "_blank"; document.body.appendChild(a); a.click(); document.body.removeChild(a); setDlSt(s => ({ ...s, [book.id]: "downloaded" })); saveBook(book); } else { setDlSt(s => ({ ...s, [book.id]: "unavailable" })); } };
  const manualSearch = async () => {
    if (!q.trim()) return; setSearching(true); setManualRes([]);
    try {
      const r = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(q)}&limit=10&fields=key,title,author_name,first_publish_year,subject,ia,cover_i,edition_count`);
      const d = await r.json();
      setManualRes((d.docs || []).filter(b => b.title).map(b => ({ id: b.key, title: b.title, author: (b.author_name || []).join(", ") || "Unknown", year: b.first_publish_year || "—", subjects: (b.subject || []).slice(0, 3), iaId: b.ia?.[0] || null, coverId: b.cover_i || null, editions: b.edition_count || 1, source: "Open Library", readUrl: b.ia?.[0] ? `https://archive.org/details/${b.ia[0]}` : `https://openlibrary.org${b.key}`, downloadUrl: b.ia?.[0] ? `https://archive.org/download/${b.ia[0]}/${b.ia[0]}.pdf` : null })));
    } catch { }
    setSearching(false);
  };
  // Filter scraped by query/topic
  const browseable = useMemo(() => {
    let b = [...scrapedBooks];
    if (activeTopic) b = b.filter(bk => bk._topic === activeTopic);
    if (q && q.trim() && view === "browse") {
      const qq = q.toLowerCase();
      b = b.filter(bk => `${bk.title} ${bk.author} ${bk.description || ""}`.toLowerCase().includes(qq) || qq.split(" ").some(w => w.length > 2 && `${bk.title} ${bk.author}`.toLowerCase().includes(w)));
    }
    return b;
  }, [scrapedBooks, activeTopic, q, view]);
  const FEATURED = { id: "/works/OL2639765W", title: "Civilization or Barbarism", author: "Cheikh Anta Diop", year: 1991, subjects: ["African civilization", "Afrocentrism"], iaId: "civilizationorba0000diop", coverId: null, editions: 3, description: "Diop's landmark work establishing Africa as the cradle of civilisation.", featured: true, source: "Open Library", readUrl: "https://archive.org/details/civilizationorba0000diop", downloadUrl: "https://archive.org/download/civilizationorba0000diop/civilizationorba0000diop.pdf" };
  return (
    <>
      {reading && <BookReader book={reading} onClose={() => setReading(null)} T={T} />}
      <div>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
          <div style={{ fontSize: 10, letterSpacing: 3, color: T.txt3, textTransform: "uppercase", fontFamily: F.body }}>Books & Texts · {scrapedBooks.length} in archive</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {["browse", "search", "catalogue"].map(v => (
              <button key={v} onClick={() => setView(v)} style={{ padding: "5px 12px", background: view === v ? T.ndY : "transparent", border: `1px solid ${view === v ? T.ndY : T.border}`, borderRadius: 20, color: view === v ? T.bg0 : T.txt3, fontSize: 9, cursor: "pointer", letterSpacing: "1px", textTransform: "uppercase", fontFamily: F.body, fontWeight: view === v ? 600 : 400 }}>{v === "catalogue" ? `Saved (${cat.length})` : v.charAt(0).toUpperCase() + v.slice(1)}</button>
            ))}
            <button onClick={() => onScrapeBooks(activeTopic)} disabled={scraping} style={{ padding: "5px 12px", background: scraping ? T.bg3 : T.btnP, border: "none", borderRadius: 20, color: scraping ? T.txt3 : T.btnPTx, fontSize: 9, cursor: scraping ? "not-allowed" : "pointer", letterSpacing: "1px", textTransform: "uppercase", fontFamily: F.body, fontWeight: 600 }}>
              {scraping ? "…" : "⟳ Populate"}
            </button>
          </div>
        </div>
        {/* Browse — scraped content */}
        {view === "browse" && (
          <>
            <div style={{ display: "flex", gap: 0, marginBottom: 14 }}>
              <input style={{ flex: 1, background: T.bg2, border: `1px solid ${T.border}`, borderRight: "none", borderRadius: "6px 0 0 6px", color: T.txt0, padding: "10px 14px", fontSize: 13, fontFamily: F.body, outline: "none" }} placeholder={`Filter books${activeTopic ? ` in ${activeTopic}` : ""}…`} value={q} onChange={e => setQ(e.target.value)} />
              <div style={{ padding: "10px 14px", background: T.bg2, border: `1px solid ${T.border}`, borderLeft: "none", borderRadius: "0 6px 6px 0", color: T.txt3, fontSize: 12 }}>🔍</div>
            </div>
            <BookCard book={FEATURED} saved={inCat(FEATURED.id)} dlSt={dlSt[FEATURED.id]} onSave={saveBook} onDownload={tryDl} onRead={setReading} T={T} />
            {browseable.length > 0 && (
              <>
                <div style={{ fontSize: 9, color: T.ndY, fontFamily: F.body, letterSpacing: 2, textTransform: "uppercase", margin: "16px 0 10px" }}>✦ From the Archive — {browseable.length} texts</div>
                {browseable.map(b => <BookCard key={b.id} book={b} saved={inCat(b.id)} dlSt={dlSt[b.id]} onSave={saveBook} onDownload={tryDl} onRead={setReading} T={T} />)}
              </>
            )}
            {browseable.length === 0 && scrapedBooks.length === 0 && <div style={{ textAlign: "center", padding: "30px 0", color: T.txt3, fontStyle: "italic", fontSize: 12, fontFamily: F.display }}>Click ⟳ Populate to load books for {activeTopic || "all topics"}.</div>}
          </>
        )}
        {/* Search — Open Library */}
        {view === "search" && (
          <>
            <div style={{ display: "flex", gap: 0, marginBottom: 10 }}>
              <input style={{ flex: 1, background: T.bg2, border: `1px solid ${T.border}`, borderRight: "none", borderRadius: "6px 0 0 6px", color: T.txt0, padding: "11px 15px", fontSize: 13, fontFamily: F.body, outline: "none" }} placeholder='e.g. "Kongo", "Cheikh Anta Diop", "Pan-African"…' value={q} onChange={e => setQ(e.target.value)} onKeyDown={e => e.key === "Enter" && manualSearch()} />
              <button onClick={manualSearch} style={{ padding: "11px 20px", background: T.btnP, border: "none", borderRadius: "0 6px 6px 0", color: T.btnPTx, fontSize: 10, fontWeight: 700, cursor: "pointer", letterSpacing: "1px", textTransform: "uppercase", fontFamily: F.body, whiteSpace: "nowrap" }}>{searching ? "…" : "Search"}</button>
            </div>
            <div style={{ fontSize: 10, color: T.txt3, fontFamily: F.body, marginBottom: 14 }}>Searches Open Library & Internet Archive in real time</div>
            {searching && <div style={{ color: T.ndY, fontStyle: "italic", fontSize: 13, padding: "16px 0", fontFamily: F.display }}>Searching the archive…</div>}
            {manualRes.map(b => <BookCard key={b.id} book={b} saved={inCat(b.id)} dlSt={dlSt[b.id]} onSave={saveBook} onDownload={tryDl} onRead={setReading} T={T} />)}
            {!searching && manualRes.length === 0 && <div style={{ textAlign: "center", padding: "30px 0", color: T.txt3, fontStyle: "italic", fontSize: 12, fontFamily: F.display }}>Search for books by title, author or subject.</div>}
          </>
        )}
        {/* Catalogue */}
        {view === "catalogue" && (cat.length === 0
          ? <div style={{ textAlign: "center", padding: "50px 0", color: T.txt3, fontStyle: "italic", fontSize: 12, fontFamily: F.display }}>Your catalogue is empty.</div>
          : cat.map(b => (
            <div key={b.id} style={{ background: T.card, border: `1px solid ${T.border}`, borderLeft: `3px solid ${T.ok}`, borderRadius: 10, padding: "12px 16px", marginBottom: 9, boxShadow: T.shadow }}>
              <div style={{ display: "flex", gap: 10, marginBottom: 7 }}>
                <BookCover book={b} size={36} T={T} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ fontSize: 12.5, color: T.txt0, fontFamily: F.display, fontWeight: 600, flex: 1, marginRight: 8, lineHeight: 1.3 }}>{b.title}</div>
                    <button onClick={() => persist(cat.filter(x => x.id !== b.id))} style={{ background: "none", border: "none", color: T.txt3, cursor: "pointer", fontSize: 15 }}>×</button>
                  </div>
                  <div style={{ fontSize: 10, color: T.ndY, fontFamily: F.body, fontStyle: "italic", marginTop: 3 }}>{b.author} · {b.year}</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {b.iaId && <Btn v="primary" onClick={() => setReading(b)} T={T} sm>📖 Read</Btn>}
                {b.downloadUrl && <Btn v="green" href={b.downloadUrl} T={T} sm>↓ PDF</Btn>}
                {b.readUrl && <Btn href={b.readUrl} T={T} sm>↗ Open</Btn>}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
// Note: ImagesScreen, LinksScreen, MapsScreen, VideosScreen, AuthorsScreen, NotesScreen remain unchanged from v9
// For brevity, they are omitted here but should be copied from v9 with the same structure.
// In production, include the full components.
function ImagesScreen({ T, activeTopic, globalQuery, scrapedImages, onScrapeImages, scraping }) { /* ... v9 implementation ... */ return <div>Images placeholder</div>; }
function LinksScreen({ T, activeTopic, globalQuery, scrapedLinks, onScrapeLinks, scraping }) { /* ... v9 implementation ... */ return <div>Links placeholder</div>; }
function MapsScreen({ T, activeTopic, globalQuery }) { /* ... v9 implementation ... */ return <div>Maps placeholder</div>; }
function VideosScreen({ T, activeTopic, globalQuery }) { /* ... v9 implementation ... */ return <div>Videos placeholder</div>; }
function AuthorsScreen({ T, activeTopic, globalQuery }) { /* ... v9 implementation ... */ return <div>Authors placeholder</div>; }
function NotesScreen({ T, activeTopic }) { /* ... v9 implementation ... */ return <div>Notes placeholder</div>; }
/* ════════════════════════════════════════
ROOT APP
════════════════════════════════════════ */
export default function App() {
  const [dark, setDark] = useState(false);
  const TH = dark ? DARK : LIGHT;
  const [tab, setTab] = useState("all");
  const [topic, setTopic] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [globalQuery, setGlobalQuery] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  // ── Scraped content stores ──
  const [scrapedBooks, setScrapedBooks] = useState(() => { try { return JSON.parse(localStorage.getItem("ba9-books") || "[]"); } catch { return []; } });
  const [scrapedImages, setScrapedImages] = useState(() => { try { return JSON.parse(localStorage.getItem("ba9-images") || "[]"); } catch { return []; } });
  const [scrapedLinks, setScrapedLinks] = useState(() => { try { return JSON.parse(localStorage.getItem("ba9-links") || "[]"); } catch { return []; } });
  const [scraping, setScraping] = useState({ books: false, images: false, links: false, all: false });
  const [scrapeProgress, setScrapeProgress] = useState("");
  const saveBooks = useCallback(books => { setScrapedBooks(books); localStorage.setItem("ba9-books", JSON.stringify(books)); }, []);
  const saveImages = useCallback(images => { setScrapedImages(images); localStorage.setItem("ba9-images", JSON.stringify(images)); }, []);
  const saveLinks = useCallback(links => { setScrapedLinks(links); localStorage.setItem("ba9-links", JSON.stringify(links)); }, []);
  const doScrapeBooks = useCallback(async (topicFilter) => {
    setScraping(s => ({ ...s, books: true }));
    const topics = topicFilter ? [topicFilter] : TOPICS;
    const results = [];
    for (const t of topics) {
      setScrapeProgress(`Books: ${t}…`);
      const books = await scrapeBooks(t, 5);
      books.forEach(b => results.push({ ...b, _topic: t }));
      await new Promise(r => setTimeout(r, 200));
    }
    const deduped = results.filter((b, i, arr) => arr.findIndex(x => x.id === b.id) === i);
    saveBooks(topicFilter ? [...scrapedBooks.filter(b => b._topic !== topicFilter), ...deduped] : deduped);
    setScraping(s => ({ ...s, books: false }));
    setScrapeProgress("Books done!");
  }, [scrapedBooks, saveBooks]);
  const doScrapeImages = useCallback(async (topicFilter) => {
    setScraping(s => ({ ...s, images: true }));
    const topics = topicFilter ? [topicFilter] : TOPICS;
    const results = [];
    for (const t of topics) {
      setScrapeProgress(`Images: ${t}…`);
      const imgs = await scrapeImages(t, 4);
      imgs.forEach(i => results.push({ ...i, topics: [t] }));
      await new Promise(r => setTimeout(r, 300));
    }
    const deduped = results.filter((i, idx, arr) => arr.findIndex(x => x.id === i.id) === idx && i.src);
    saveImages(topicFilter ? [...scrapedImages.filter(i => !i.topics?.includes(topicFilter)), ...deduped] : deduped);
    setScraping(s => ({ ...s, images: false }));
    setScrapeProgress("Images done!");
  }, [scrapedImages, saveImages]);
  const doScrapeLinks = useCallback(async (topicFilter) => {
    setScraping(s => ({ ...s, links: true }));
    const topics = topicFilter ? [topicFilter] : TOPICS;
    const results = [];
    for (const t of topics) {
      setScrapeProgress(`Links: ${t}…`);
      const links = await scrapeLinks(t, 4);
      links.forEach(l => results.push({ ...l, _topic: t }));
      await new Promise(r => setTimeout(r, 200));
    }
    const deduped = results.filter((l, i, arr) => arr.findIndex(x => x.id === l.id) === i && l.url);
    saveLinks(topicFilter ? [...scrapedLinks.filter(l => l._topic !== topicFilter), ...deduped] : deduped);
    setScraping(s => ({ ...s, links: false }));
    setScrapeProgress("Links done!");
  }, [scrapedLinks, saveLinks]);
  const doScrapeAll = useCallback(async () => {
    setScraping(s => ({ ...s, all: true }));
    await doScrapeBooks(null);
    await doScrapeImages(null);
    await doScrapeLinks(null);
    setScraping(s => ({ ...s, all: false }));
    setScrapeProgress("All content populated!");
  }, [doScrapeBooks, doScrapeImages, doScrapeLinks]);
  const submitSearch = useCallback(() => {
    if (!searchInput.trim()) return;
    setGlobalQuery(searchInput);
    setTab("all");
  }, [searchInput]);
  const SB_W = sidebarCollapsed ? 64 : 220;
  const anyScraping = Object.values(scraping).some(Boolean);
  return (
    <div style={{ minHeight: "100vh", background: TH.bg0, color: TH.txt1, fontFamily: F.body, fontSize: 14, display: "flex", transition: "background 0.3s,color 0.3s" }}>
      {/* ── SIDEBAR ── */}
      <Sidebar T={TH} tab={tab} setTab={setTab} topic={topic} setTopic={setTopic} dark={dark} setDark={setDark} collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      {/* ── MAIN ── */}
      <div style={{ flex: 1, marginLeft: SB_W, display: "flex", flexDirection: "column", minWidth: 0, minHeight: "100vh", transition: "margin-left 0.2s ease" }}>
        {/* ── TOP BAR ── */}
        <div style={{ background: TH.isDark ? "#0a0906" : "#ffffff", borderBottom: `1px solid ${TH.border}`, padding: "0 20px", display: "flex", alignItems: "center", gap: 14, height: 56, flexShrink: 0, position: "sticky", top: 0, zIndex: 50, boxShadow: TH.shadow }}>
          {/* Left */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 100, flexShrink: 0 }}>
            <span style={{ fontSize: 15, opacity: 0.6 }}>{NAV_ITEMS.find(n => n.id === tab)?.icon}</span>
            <span style={{ fontSize: 13, color: TH.txt0, fontFamily: F.display, fontWeight: 600, whiteSpace: "nowrap" }}>{NAV_ITEMS.find(n => n.id === tab)?.label}</span>
            {topic && (
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ color: TH.txt3, fontSize: 11 }}>›</span>
                <span style={{ fontSize: 9, color: TH.ndY, fontFamily: F.body, background: TH.pillBg, border: `1px solid ${TH.pillBd}`, borderRadius: 20, padding: "2px 8px", whiteSpace: "nowrap", maxWidth: 120, overflow: "hidden", textOverflow: "ellipsis" }}>{topic}</span>
                <button onClick={() => setTopic(null)} style={{ background: "none", border: "none", color: TH.txt3, cursor: "pointer", fontSize: 13, lineHeight: 1, padding: 0 }}>×</button>
              </div>
            )}
          </div>
          {/* Centre — Search */}
          <div style={{ flex: 1, maxWidth: 560, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", background: TH.isDark ? "#161410" : "#ffffff", border: `1.5px solid ${globalQuery ? TH.ndY : TH.border}`, borderRadius: 28, padding: "0 6px 0 16px", boxShadow: globalQuery ? `0 0 0 2px ${TH.ndY}20` : TH.shadow, transition: "all 0.2s" }}>
              <input style={{ flex: 1, background: "transparent", border: "none", color: TH.txt0, padding: "10px 10px", fontSize: 14, fontFamily: F.body, outline: "none", minWidth: 0 }} placeholder="Search the archive… e.g. colonization in the Kongo" value={searchInput} onChange={e => setSearchInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter") submitSearch(); if (e.key === "Escape") { setSearchInput(""); setGlobalQuery(""); } }} />
              {searchInput && (
                <button onClick={() => { setSearchInput(""); setGlobalQuery(""); }} style={{ background: "none", border: "none", color: TH.txt3, cursor: "pointer", fontSize: 14, padding: "0 4px", lineHeight: 1 }}>×</button>
              )}
              <button onClick={submitSearch} style={{ background: TH.btnP, border: "none", borderRadius: 22, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, fontSize: 15, margin: "0 2px" }}>🔎</button>
            </div>
          </div>
          {/* Right */}
          <div style={{ width: 40, height: 4, borderRadius: 2, overflow: "hidden", flexShrink: 0 }}><NdStripe h={4} /></div>
        </div>
        <NdStripe h={3} />
        {/* ── CONTENT ── */}
        <div style={{ flex: 1, overflowY: "auto" }}>
          {/* Hero */}
          {tab === "all" && !globalQuery && (
            <div style={{ background: TH.isDark ? `linear-gradient(160deg,#1c1408 0%,${TH.bg0} 55%)` : `linear-gradient(160deg,#fff8ed 0%,${TH.bg0} 55%)`, padding: "32px 36px 24px", borderBottom: `1px solid ${TH.border}`, display: "flex", alignItems: "center", gap: 36, flexWrap: "wrap", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", right: 0, top: -20, fontSize: 200, opacity: 0.025, pointerEvents: "none", fontFamily: F.display, color: TH.ndY, lineHeight: 1 }}>𓂀</div>
              <div style={{ display: "flex", alignItems: "center", gap: 20, flexShrink: 0 }}>
                <BeninMask size={64} T={TH} glow />
                <div>
                  <div style={{ fontSize: 9, letterSpacing: 6, color: TH.txt3, textTransform: "uppercase", fontFamily: F.body, fontStyle: "italic", marginBottom: 7 }}>African & Black Diasporal Research Library</div>
                  <div style={{ fontSize: "clamp(36px,4vw,60px)", fontFamily: F.display, fontWeight: 300, letterSpacing: 5, lineHeight: 1, marginBottom: 5 }}>
                    <span style={{ color: TH.ndB }}>Y</span><span style={{ color: TH.ndR }}>e</span><span style={{ color: TH.ndY }}>h</span><span style={{ color: TH.ndB }}>u</span><span style={{ color: TH.ndG }}>t</span><span style={{ color: TH.ndR }}>i</span>
                  </div>
                  <div style={{ fontSize: 10, color: TH.txt3, fontFamily: F.body, fontStyle: "italic", letterSpacing: 1 }}>Named for Djehuti — keeper of divine knowledge</div>
                </div>
              </div>
              <div style={{ flex: 1, minWidth: 260, maxWidth: 460 }}>
                <div style={{ fontSize: 12, color: TH.txt2, fontFamily: F.body, lineHeight: 1.75, marginBottom: 10 }}>
                  <span style={{ color: TH.txt0, fontFamily: F.display, fontWeight: 600, fontSize: 13 }}>The Ancestral Archive</span> centres indigenous African scholarship, oral traditions, and primary cultural sources — approaching all subjects through a <span style={{ color: TH.ndY }}>decolonial framework</span>. Use the search bar above to search across all content.
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {["Cosmology", "Spirituality", "Mythology", "History", "Traditions", "Psychology", "Philosophy"].map(d => (<span key={d} style={{ fontSize: 8, letterSpacing: "2px", textTransform: "uppercase", color: TH.txt3, border: `1px solid ${TH.border}`, borderRadius: 20, padding: "2px 8px", fontFamily: F.body }}>{d}</span>))}
                </div>
              </div>
            </div>
          )}
          {/* Search banner */}
          {globalQuery && (
            <div style={{ padding: "10px 24px", background: TH.isDark ? "#0f0e0c" : "#fffdf7", borderBottom: `1px solid ${TH.border}`, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              <span style={{ fontSize: 12, color: TH.txt2, fontFamily: F.body }}>Search results for <span style={{ color: TH.txt0, fontWeight: 600 }}>"{globalQuery}"</span></span>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {NAV_ITEMS.filter(n => n.id !== "all" && n.id !== "notes").map(n => (
                  <button key={n.id} onClick={() => setTab(n.id)} style={{ padding: "3px 10px", background: tab === n.id ? TH.ndY : "transparent", border: `1px solid ${tab === n.id ? TH.ndY : TH.border}`, borderRadius: 20, color: tab === n.id ? TH.bg0 : TH.txt3, fontSize: 9, cursor: "pointer", fontFamily: F.body, letterSpacing: "0.5px", textTransform: "uppercase" }}>{n.icon} {n.label}</button>
                ))}
              </div>
              <button onClick={() => { setGlobalQuery(""); setSearchInput(""); }} style={{ marginLeft: "auto", background: "none", border: "none", color: TH.txt3, cursor: "pointer", fontSize: 11, fontFamily: F.body, textDecoration: "underline" }}>Clear search</button>
            </div>
          )}
          <div style={{ padding: "22px 28px 80px" }}>
            {tab === "all" && <AllScreen T={TH} globalQuery={globalQuery} activeTopic={topic} setTab={setTab} scrapedBooks={scrapedBooks} scrapedImages={scrapedImages} scrapedLinks={scrapedLinks} onScrapeAll={doScrapeAll} scraping={anyScraping} scrapeProgress={scrapeProgress} />}
            {tab === "deepdive" && <DeepDiveScreen T={TH} activeTopic={topic} globalQuery={globalQuery} />}
            {tab === "books" && <BooksScreen T={TH} activeTopic={topic} globalQuery={globalQuery} scrapedBooks={scrapedBooks} onScrapeBooks={doScrapeBooks} scraping={scraping.books} />}
            {tab === "videos" && <VideosScreen T={TH} activeTopic={topic} globalQuery={globalQuery} />}
            {tab === "images" && <ImagesScreen T={TH} activeTopic={topic} globalQuery={globalQuery} scrapedImages={scrapedImages} onScrapeImages={doScrapeImages} scraping={scraping.images} />}
            {tab === "links" && <LinksScreen T={TH} activeTopic={topic} globalQuery={globalQuery} scrapedLinks={scrapedLinks} onScrapeLinks={doScrapeLinks} scraping={scraping.links} />}
            {tab === "maps" && <MapsScreen T={TH} activeTopic={topic} globalQuery={globalQuery} />}
            {tab === "authors" && <AuthorsScreen T={TH} activeTopic={topic} globalQuery={globalQuery} />}
            {tab === "notes" && <NotesScreen T={TH} activeTopic={topic} />}
            {tab === "settings" && <SettingsScreen T={TH} />} {/* NEW */}
          </div>
        </div>
      </div>
    </div>
  );
}