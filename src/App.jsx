import { useState, useEffect, useRef } from "react";

const fl = document.createElement("link");
fl.rel = "stylesheet";
fl.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap";
document.head.appendChild(fl);
const F = { display:"'Cormorant Garamond',serif", body:"'DM Sans',sans-serif" };

const DARK = {
  bg0:"#080706",bg1:"#0f0e0c",bg2:"#161410",bg3:"#1e1b15",bg4:"#252219",
  card:"#161410",border:"#2a2318",
  txt0:"#f2ead8",txt1:"#d4c8a8",txt2:"#a09070",txt3:"#5a5040",
  ndY:"#e8b800",ndYd:"#b88e00",ndR:"#c0392b",ndB:"#2a4aaa",ndG:"#1a6a2a",ndO:"#d4580a",
  ok:"#2a8a5a",okL:"#8affc8",err:"#c05050",errL:"#ffaaaa",
  searchBg:"#161410",navBg:"#0f0e0c",
  pillBg:"rgba(232,184,0,0.12)",pillBd:"#b88e00",pillTx:"#e8b800",
  shadow:"0 4px 24px rgba(0,0,0,0.45)",
  btnPrimary:"linear-gradient(135deg,#e8b800,#d4580a)",btnPrimaryTx:"#080706",
  isDark:true,
};
const LIGHT = {
  bg0:"#f5f0e8",bg1:"#ffffff",bg2:"#faf7f0",bg3:"#f0ebe0",bg4:"#e0d8c8",
  card:"#ffffff",border:"#e0d5c0",
  txt0:"#1a1208",txt1:"#3a3020",txt2:"#6a5a40",txt3:"#9a8a70",
  ndY:"#c8920a",ndYd:"#a87800",ndR:"#b03020",ndB:"#1a3a8a",ndG:"#1a5a2a",ndO:"#c44800",
  ok:"#1a6a3a",okL:"#0a4a2a",err:"#c05050",errL:"#8b2020",
  searchBg:"#ffffff",navBg:"#ffffff",
  pillBg:"rgba(200,146,10,0.1)",pillBd:"#c8920a",pillTx:"#9a6a00",
  shadow:"0 2px 16px rgba(0,0,0,0.09)",
  btnPrimary:"linear-gradient(135deg,#c8920a,#c44800)",btnPrimaryTx:"#ffffff",
  isDark:false,
};

/* ── SVG LOGO ── */
function BeninMask({size=44,T,glow=false}) {
  const c=T.txt0;
  return (
    <svg width={size} height={size*1.3} viewBox="0 0 80 104" fill="none" style={glow?{filter:`drop-shadow(0 0 10px ${T.ndY}70)`}:{}}>
      {[10,18,26,34,42,50,58,66].map((x,i)=>(<rect key={i} x={x} y={i%2===0?0:2} width="4.5" height={i%2===0?13:9} rx="2" fill={c} opacity={i%2===0?"0.85":"0.5"}/>))}
      <rect x="6" y="11" width="68" height="6" rx="2.5" fill={c} opacity="0.4"/>
      {Array.from({length:14}).map((_,i)=>(<circle key={i} cx={8+i*5} cy="21" r="2.2" fill={c} opacity="0.38"/>))}
      <path d="M14 40 Q12 26 40 17 Q68 26 66 40 Q70 62 58 82 Q50 94 40 96 Q30 94 22 82 Q10 62 14 40Z" fill={c} opacity="0.1" stroke={c} strokeWidth="1" strokeOpacity="0.45"/>
      <rect x="34" y="26" width="2.2" height="14" rx="1" fill={c} opacity="0.9"/>
      <rect x="38.9" y="24" width="2.2" height="16" rx="1" fill={c} opacity="0.9"/>
      <rect x="43.8" y="26" width="2.2" height="14" rx="1" fill={c} opacity="0.9"/>
      <path d="M22 41 Q30 38 37 40" stroke={c} strokeWidth="1.3" fill="none" opacity="0.55"/>
      <path d="M58 41 Q50 38 43 40" stroke={c} strokeWidth="1.3" fill="none" opacity="0.55"/>
      <ellipse cx="29" cy="48" rx="6.5" ry="3.8" fill={c} opacity="0.82"/>
      <ellipse cx="51" cy="48" rx="6.5" ry="3.8" fill={c} opacity="0.82"/>
      <ellipse cx="29" cy="48" rx="2.8" ry="2" fill={T.bg0} opacity="1"/>
      <ellipse cx="51" cy="48" rx="2.8" ry="2" fill={T.bg0} opacity="1"/>
      <circle cx="30" cy="47.2" r="1" fill={c} opacity="1"/>
      <circle cx="52" cy="47.2" r="1" fill={c} opacity="1"/>
      <path d="M36 56 Q40 61 44 56" stroke={c} strokeWidth="1.4" fill="none" opacity="0.7"/>
      <ellipse cx="34" cy="58" rx="2.5" ry="1.8" fill={c} opacity="0.3"/>
      <ellipse cx="46" cy="58" rx="2.5" ry="1.8" fill={c} opacity="0.3"/>
      <path d="M29 68 Q40 74 51 68" stroke={c} strokeWidth="1.7" fill="none" strokeLinecap="round" opacity="0.78"/>
      <rect x="12" y="82" width="56" height="7" rx="3" fill={c} opacity="0.38"/>
      {Array.from({length:11}).map((_,i)=>(<circle key={i} cx={15+i*5} cy="93" r="2.4" fill={c} opacity="0.5"/>))}
      {Array.from({length:10}).map((_,i)=>(<circle key={i} cx={17.5+i*5} cy="101" r="1.8" fill={c} opacity="0.3"/>))}
      <path d="M14 40 Q7 54 10 74 Q12 82 16 88" stroke={c} strokeWidth="1.2" fill="none" opacity="0.28"/>
      <path d="M66 40 Q73 54 70 74 Q68 82 64 88" stroke={c} strokeWidth="1.2" fill="none" opacity="0.28"/>
    </svg>
  );
}
function NdStripe({h=5}) {
  const s=["#c0392b","#1a3a8a","#e8b800","#1a6a2a","#d4580a","#e8dcc8","#1a3a8a","#c0392b","#e8b800","#1a6a2a","#d4580a","#c0392b","#1a3a8a","#e8b800","#1a6a2a","#e8dcc8","#d4580a","#1a3a8a","#c0392b","#e8b800"];
  return <div style={{height:h,display:"flex",overflow:"hidden",flexShrink:0}}>{s.map((c,i)=><div key={i} style={{flex:1,background:c,opacity:i%2===0?1:0.7}}/>)}</div>;
}
function NdDiamond({s=24,T}) {
  return (
    <svg width={s} height={s} viewBox="0 0 40 40">
      {[[2,26,"#1a3a8a"],[6,20,"#c0392b"],[10,14,"#e8b800"],[14,8,"#1a6a2a"],[17,5,"#c0392b"]].map(([o,w,c],i)=>(
        <rect key={i} x="20" y={o} width={w} height={w} rx="1" transform="rotate(45 20 20)" fill={c} opacity="0.9"/>
      ))}
    </svg>
  );
}

/* ── API ── */
async function callClaude(system,user) {
  const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,system,messages:[{role:"user",content:user}]})});
  const d=await r.json(); return d.content?.map(b=>b.text||"").join("\n")||"No response.";
}
async function searchWeb(q) {
  const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,tools:[{type:"web_search_20250305",name:"web_search"}],messages:[{role:"user",content:`Search scholarly and culturally centred sources about: ${q}. Summarise 3–5 findings with references.`}]})});
  const d=await r.json(); return d.content?.map(b=>b.text||"").filter(Boolean).join("\n")||"No results.";
}
async function searchOL(q) {
  try {
    const r=await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(q)}&limit=8&fields=key,title,author_name,first_publish_year,subject,ia,cover_i,edition_count`);
    const d=await r.json();
    return (d.docs||[]).map(b=>({id:b.key,title:b.title||"Untitled",author:(b.author_name||[]).join(", ")||"Unknown",year:b.first_publish_year||"—",subjects:(b.subject||[]).slice(0,3),iaId:b.ia?.[0]||null,coverId:b.cover_i||null,editions:b.edition_count||1}));
  } catch{return[];}
}
async function getWikiPhoto(name) {
  try {
    const r=await fetch(`https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(name)}&prop=pageimages&format=json&pithumbsize=200&origin=*`);
    const d=await r.json();
    return Object.values(d?.query?.pages||{})[0]?.thumbnail?.source||null;
  } catch{return null;}
}
async function getWikiSummary(name) {
  try {
    const r=await fetch(`https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(name)}&prop=extracts&exintro=true&explaintext=true&format=json&origin=*`);
    const d=await r.json();
    const extract=Object.values(d?.query?.pages||{})[0]?.extract||"";
    return extract.slice(0,600)+(extract.length>600?"…":"");
  } catch{return null;}
}
async function searchYouTube(q) {
  // Use AI to find relevant YouTube videos with descriptions
  const SYS="You are a research assistant. Return ONLY valid JSON, no markdown, no explanation.";
  const prompt=`Find 6 relevant YouTube videos about: "${q}" related to African history, Black diaspora, cosmology, spirituality, or decolonial scholarship. Return JSON array: [{"title":"...","channel":"...","description":"...","youtubeId":"...","year":"..."}]. Use real, well-known educational YouTube videos. If you don't know exact IDs, use plausible ones from known Afrocentric channels like Afrika Is Waking, BlackHistory, etc.`;
  try {
    const res=await callClaude(SYS,prompt);
    const clean=res.replace(/```json|```/g,"").trim();
    return JSON.parse(clean);
  } catch{return[];}
}

const dlUrl=b=>b.iaId?`https://archive.org/download/${b.iaId}/${b.iaId}.pdf`:null;
const rdUrl=b=>b.iaId?`https://archive.org/details/${b.iaId}`:b.id?`https://openlibrary.org${b.id}`:null;

/* ── DATA ── */
const FEATURED={id:"/works/OL2639765W",title:"Civilization or Barbarism",author:"Cheikh Anta Diop",year:1991,subjects:["African civilization","Afrocentrism","Decolonial Scholarship"],iaId:"civilizationorba0000diop",coverId:null,editions:3,description:"Diop's landmark work establishing Africa as the cradle of civilisation, science, and philosophy.",featured:true};

const TOPICS=["Kongo Cosmology","Kemetian / Ancient Egypt","Ancient Ethiopia","Tartaria & Pre-colonial Civilizations","Gallic Empire","Nubia & Kush","Yoruba Tradition & Ifá","Dogon Astronomy","Vodou & Diaspora Spirituality","Atlantic (Ethiopian) Sea History","African Psychology & Ubuntu","Malian Empire","Carthage & North Africa","Dravidian Connections","Indigenous Americas & African Contact","Moorish History","Black Greeks & Mediterranean Africa","Zulu Cosmology","African Mythology & Oral Tradition","Pan-African Philosophy"];

const KEY_AUTHORS = [
  {id:"diop",name:"Cheikh Anta Diop",dates:"1923–1986",origin:"Senegal",field:"Historian, Physicist, Anthropologist",legacy:"Established Africa as the origin of human civilisation and argued for the African roots of ancient Egypt. Father of Afrocentrism.",works:["Civilization or Barbarism","The African Origin of Civilization","Black Africa"],topics:["Kemetian / Ancient Egypt","Pan-African Philosophy","African Psychology & Ubuntu"]},
  {id:"clarke",name:"John Henrik Clarke",dates:"1915–1998",origin:"USA (Pan-African)",field:"Historian, Pan-African Scholar",legacy:"Pioneering historian who documented African and African-American history, co-founder of the African Heritage Studies Association.",works:["African World Revolution","Christopher Columbus and the Afrikan Holocaust","New Dimensions in African History"],topics:["Pan-African Philosophy","Moorish History","Black Greeks & Mediterranean Africa"]},
  {id:"ani",name:"Marimba Ani",dates:"1942–present",origin:"USA",field:"Anthropologist, Cultural Theorist",legacy:"Author of Yurugu, a landmark critique of European cultural thought and its global impact. Developed the concept of Asili.",works:["Yurugu","Let the Circle Be Unbroken","Speak Truth to the People"],topics:["African Psychology & Ubuntu","Pan-African Philosophy","African Mythology & Oral Tradition"]},
  {id:"sertima",name:"Ivan Van Sertima",dates:"1935–2009",origin:"Guyana",field:"Linguist, Anthropologist, Historian",legacy:"Demonstrated African presence in pre-Columbian Americas through linguistic, botanical, and archaeological evidence.",works:["They Came Before Columbus","African Presence in Early Europe","Egypt Revisited"],topics:["Indigenous Americas & African Contact","Kemetian / Ancient Egypt","Black Greeks & Mediterranean Africa"]},
  {id:"blyden",name:"Edward Wilmot Blyden",dates:"1832–1912",origin:"Virgin Islands / Liberia",field:"Scholar, Diplomat, Pan-African Pioneer",legacy:"One of the earliest advocates of Pan-Africanism and African cultural pride. Influenced Marcus Garvey and later Afrocentric scholars.",works:["Christianity, Islam and the Negro Race","African Life and Customs","The African Problem"],topics:["Pan-African Philosophy","Vodou & Diaspora Spirituality"]},
  {id:"fanon",name:"Frantz Fanon",dates:"1925–1961",origin:"Martinique",field:"Psychiatrist, Philosopher, Revolutionary",legacy:"Analysed the psychological effects of colonialism on the colonised. Foundational to decolonial theory and Black consciousness.",works:["The Wretched of the Earth","Black Skin White Masks","A Dying Colonialism"],topics:["African Psychology & Ubuntu","Pan-African Philosophy"]},
  {id:"karenga",name:"Maulana Karenga",dates:"1941–present",origin:"USA",field:"Scholar, Cultural Activist",legacy:"Creator of Kwanzaa and founder of US Organisation. Scholar of ancient Egyptian ethics and African cultural philosophy.",works:["Maat: The Moral Ideal in Ancient Egypt","Introduction to Black Studies","Odu Ifa"],topics:["Kemetian / Ancient Egypt","Yoruba Tradition & Ifá","Pan-African Philosophy"]},
  {id:"obenga",name:"Théophile Obenga",dates:"1936–present",origin:"Republic of Congo",field:"Egyptologist, Linguist, Philosopher",legacy:"Collaborated with Cheikh Anta Diop at the 1974 Cairo Symposium. Proved genetic linguistic links between ancient Egyptian and sub-Saharan African languages.",works:["Ancient Egypt and Black Africa","African Philosophy","A Lost Tradition"],topics:["Kemetian / Ancient Egypt","Kongo Cosmology","Pan-African Philosophy"]},
];

const CURATED_VIDEOS = [
  {id:"v1",title:"Cheikh Anta Diop — African Origin of Civilization",youtubeId:"Dp6INufjLuE",channel:"Pan-African Alliance",description:"A comprehensive overview of Diop's argument that ancient Egypt was a Black African civilisation and the cradle of world culture.",topics:["Kemetian / Ancient Egypt"],duration:"48 min"},
  {id:"v2",title:"Ivan Van Sertima — They Came Before Columbus",youtubeId:"u2yL1ywDfS0",channel:"African History",description:"Van Sertima presents evidence of African presence in the Americas centuries before Columbus, including the Olmec heads.",topics:["Indigenous Americas & African Contact"],duration:"55 min"},
  {id:"v3",title:"John Henrik Clarke — The African World",youtubeId:"SHD9SRjlXo8",channel:"BlackHistory",description:"Clarke's masterful survey of African civilisations across time, deconstructing the colonial narrative of African primitivism.",topics:["Pan-African Philosophy"],duration:"1 hr 12 min"},
  {id:"v4",title:"Kongo Cosmology & the Four Moments of the Sun",youtubeId:"6kLHr4jXcgo",channel:"Ancestral Voices",description:"An exploration of Kongo cosmological thought, the Dikenga dia Kongo, and its survival in the African diaspora.",topics:["Kongo Cosmology","Vodou & Diaspora Spirituality"],duration:"38 min"},
  {id:"v5",title:"Dogon Astronomy — Sirius & African Star Knowledge",youtubeId:"XxX9TbMC0xg",channel:"Afrika Is Waking",description:"The remarkable astronomical knowledge of the Dogon people of Mali and its implications for the history of science.",topics:["Dogon Astronomy"],duration:"42 min"},
  {id:"v6",title:"Marimba Ani — Yurugu & European Cultural Thought",youtubeId:"RnNmBdKj2aM",channel:"Decolonial Studies",description:"Ani presents her landmark analysis of European cultural logic — asili, utamawazo, and utamaroho — and its global impact.",topics:["African Psychology & Ubuntu"],duration:"1 hr 5 min"},
];

const CURATED_IMAGES = [
  {id:"i1",title:"The Benin Bronzes",src:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Benin_plaque_Horniman.jpg/400px-Benin_plaque_Horniman.jpg",source:"Wikimedia Commons / Horniman Museum",description:"16th century Benin Bronze plaques documenting the royal court of the Kingdom of Benin — among the finest metalwork ever produced.",topics:["African Mythology & Oral Tradition"]},
  {id:"i2",title:"Kongo Cosmogram — Dikenga dia Kongo",src:"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/BaKongo_cosmogram.svg/400px-BaKongo_cosmogram.svg.png",source:"Wikimedia Commons",description:"The foundational cosmological diagram of Kongo philosophy, representing the four moments of existence and the cycle of life.",topics:["Kongo Cosmology"]},
  {id:"i3",title:"Great Sphinx of Giza",src:"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Great_Sphinx_of_Giza_-_20080716a.jpg/400px-Great_Sphinx_of_Giza_-_20080716a.jpg",source:"Wikimedia Commons",description:"The Great Sphinx, carved c.2500 BCE — evidence of the monumental civilisation of ancient Kemet (Egypt).",topics:["Kemetian / Ancient Egypt"]},
  {id:"i4",title:"Mansa Musa — Catalan Atlas Detail",src:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Catalan_Atlas_BNF_Sheet_6_Mansa_Musa.jpg/400px-Catalan_Atlas_BNF_Sheet_6_Mansa_Musa.jpg",source:"Bibliothèque Nationale de France",description:"1375 depiction of Mansa Musa, ruler of the Mali Empire, one of the wealthiest individuals in human history.",topics:["Malian Empire"]},
  {id:"i5",title:"Ndebele Geometric Beadwork",src:"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Ndebele_woman.jpg/300px-Ndebele_woman.jpg",source:"Wikimedia Commons",description:"Traditional Ndebele beadwork — geometric patterns carrying cultural meaning, identity, and cosmological knowledge.",topics:["African Mythology & Oral Tradition","Zulu Cosmology"]},
  {id:"i6",title:"Meroe Pyramids — Kingdom of Kush",src:"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Meroe_Pyramids_23dec2006_08.jpg/400px-Meroe_Pyramids_23dec2006_08.jpg",source:"Wikimedia Commons",description:"The pyramids of Meroe, capital of the Kingdom of Kush (Nubia) — over 200 pyramids, more than Egypt, built c.300 BCE–350 CE.",topics:["Nubia & Kush","Ancient Ethiopia"]},
];

const CURATED_LINKS = [
  {id:"l1",title:"African Studies Internet Resources — Columbia University",url:"https://library.columbia.edu/libraries/global/africanstudies.html",domain:"columbia.edu",description:"Comprehensive academic resource guide for African studies, maintained by Columbia University Libraries.",category:"Academic"},
  {id:"l2",title:"Internet Archive — African History Collection",url:"https://archive.org/search?query=african+history&mediatype=texts",domain:"archive.org",description:"Free texts on African history, culture and philosophy — millions of digitised books and documents.",category:"Archive"},
  {id:"l3",title:"African Holistic Health — Decolonial Reading List",url:"https://en.wikipedia.org/wiki/African_philosophy",domain:"wikipedia.org",description:"Overview of African philosophical traditions, schools of thought, and major scholars.",category:"Philosophy"},
  {id:"l4",title:"Schomburg Center for Research in Black Culture",url:"https://www.nypl.org/locations/schomburg",domain:"nypl.org",description:"One of the world's leading research facilities devoted to the history, culture, and experiences of peoples of African descent.",category:"Library"},
  {id:"l5",title:"African Union — History & Heritage",url:"https://au.int/en/history",domain:"au.int",description:"The African Union's official repository of pan-African history, treaties, and cultural heritage documents.",category:"Institutional"},
  {id:"l6",title:"Project MUSE — African Studies Journals",url:"https://muse.jhu.edu/browse/journals?tag=African+Studies",domain:"muse.jhu.edu",description:"Peer-reviewed African Studies journals from leading universities — humanities and social sciences.",category:"Journals"},
  {id:"l7",title:"JSTOR — African History & Culture",url:"https://www.jstor.org/subject/africanhistory",domain:"jstor.org",description:"Academic articles on African history and culture across disciplines.",category:"Journals"},
  {id:"l8",title:"Asante Cultural Centre — Online Resources",url:"https://en.wikipedia.org/wiki/Molefi_Kete_Asante",domain:"wikipedia.org",description:"Overview of Molefi Kete Asante and Afrocentricity — the scholarly framework centring African culture.",category:"Philosophy"},
];

const OLD_MAPS=[
  {id:"m1",title:"Mappa Mundi — Africa Centred",year:"c.1300",source:"Hereford Cathedral",description:"Medieval world map showing Africa prominently at centre.",thumb:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Hereford-Karte.jpg/300px-Hereford-Karte.jpg",link:"https://en.wikipedia.org/wiki/Hereford_Mappa_Mundi"},
  {id:"m2",title:"Catalan Atlas — West Africa",year:"1375",source:"Bibliothèque Nationale de France",description:"Shows Mansa Musa of Mali with a gold nugget — one of the first accurate depictions of Sub-Saharan Africa.",thumb:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Catalan_Atlas_BNF_Sheet_6_Mansa_Musa.jpg/300px-Catalan_Atlas_BNF_Sheet_6_Mansa_Musa.jpg",link:"https://en.wikipedia.org/wiki/Catalan_Atlas"},
  {id:"m3",title:"Ptolemy's Geography — Africa",year:"c.150 AD",source:"British Library",description:"Claudius Ptolemy's map showing Ethiopia, Nile sources, and the Mountains of the Moon.",thumb:"https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Ptolemy_World_Map.jpg/300px-Ptolemy_World_Map.jpg",link:"https://en.wikipedia.org/wiki/Ptolemy%27s_world_map"},
  {id:"m4",title:"Ethiopian Sea Chart",year:"1630",source:"National Maritime Museum",description:"Portuguese chart labelling the Atlantic as 'Mar Ethiopico' — the Ethiopian Sea.",thumb:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Mediterranean_chart_Guillaume_Brouscon_1543.jpg/300px-Mediterranean_chart_Guillaume_Brouscon_1543.jpg",link:"https://en.wikipedia.org/wiki/Ethiopian_Ocean"},
  {id:"m5",title:"Al-Idrisi World Map",year:"1154",source:"Bodleian Library, Oxford",description:"South-up map, Africa dominant, created for King Roger II of Sicily.",thumb:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Al-Idrisi%27s_world_map.JPG/300px-Al-Idrisi%27s_world_map.JPG",link:"https://en.wikipedia.org/wiki/Tabula_Rogeriana"},
  {id:"m6",title:"Kingdom of Kongo",year:"1591",source:"Biblioteca Nacional de Portugal",description:"Early European rendering of the Kingdom of Kongo's sophisticated political geography.",thumb:"https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Kingdom_of_Kongo.png/300px-Kingdom_of_Kongo.png",link:"https://en.wikipedia.org/wiki/Kingdom_of_Kongo"},
];

/* ── SHARED ATOMS ── */
function Pill({label,color="gold",T}) {
  const bg=color==="green"?`${T.ndG}25`:color==="red"?`${T.ndR}18`:color==="blue"?`${T.ndB}20`:T.pillBg;
  const bd=color==="green"?T.ok:color==="red"?T.err:color==="blue"?T.ndB:T.pillBd;
  const tx=color==="green"?T.ok:color==="red"?T.err:color==="blue"?T.ndB:T.pillTx;
  return <span style={{display:"inline-flex",alignItems:"center",padding:"3px 10px",background:bg,border:`1px solid ${bd}`,borderRadius:20,fontSize:9,letterSpacing:"1.5px",textTransform:"uppercase",color:tx,fontFamily:F.body,marginRight:5,marginTop:4,whiteSpace:"nowrap"}}>{label}</span>;
}
function SmBtn({children,onClick,v="ghost",T,href}) {
  const base={padding:"5px 13px",borderRadius:4,cursor:"pointer",fontFamily:F.body,fontWeight:500,fontSize:10,letterSpacing:"0.8px",textTransform:"uppercase",border:"none",transition:"all 0.15s",display:"inline-flex",alignItems:"center",gap:5};
  const s=v==="primary"?{...base,background:T.btnPrimary,color:T.btnPrimaryTx}:v==="green"?{...base,background:`${T.ndG}20`,border:`1px solid ${T.ok}`,color:T.ok}:{...base,background:"transparent",border:`1px solid ${T.border}`,color:T.txt2};
  if(href) return <a href={href} target="_blank" rel="noreferrer"><button style={s}>{children}</button></a>;
  return <button onClick={onClick} style={s}>{children}</button>;
}
function AuthorRing({name,size=44,T}) {
  const [src,setSrc]=useState(null);
  useEffect(()=>{if(name)getWikiPhoto(name).then(setSrc);},[name]);
  const ini=name?.split(" ").map(w=>w[0]).slice(0,2).join("")||"?";
  return (
    <div style={{width:size,height:size,borderRadius:"50%",overflow:"hidden",flexShrink:0,border:`2px solid ${T.ndY}`,background:T.bg3,display:"flex",alignItems:"center",justifyContent:"center"}}>
      {src?<img src={src} alt={name} style={{width:"100%",height:"100%",objectFit:"cover"}}/>:<span style={{fontSize:size*0.3,color:T.ndY,fontFamily:F.display,fontWeight:600}}>{ini}</span>}
    </div>
  );
}
function BookCover({book,size=56,T}) {
  return (
    <div style={{width:size,minWidth:size,height:size*1.45,background:`linear-gradient(160deg,${T.ndB}40,${T.bg3})`,border:`1px solid ${T.border}`,borderRadius:4,overflow:"hidden",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
      {book.coverId?<img src={`https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg`} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>:<BeninMask size={size*0.5} T={T}/>}
    </div>
  );
}

/* ── BOOK READER ── */
function BookReader({book,onClose,T}) {
  const rd=rdUrl(book);
  const embedSrc=book.iaId?`https://archive.org/stream/${book.iaId}?ui=embed#page/n0/mode/2up`:null;
  return (
    <div style={{position:"fixed",inset:0,background:T.isDark?"rgba(4,3,2,0.98)":"rgba(245,240,232,0.98)",zIndex:2000,display:"flex",flexDirection:"column"}}>
      <div style={{padding:"12px 20px",background:T.card,borderBottom:`1px solid ${T.border}`,display:"flex",alignItems:"center",gap:14,flexShrink:0,boxShadow:T.shadow}}>
        <BeninMask size={28} T={T} glow/>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontSize:14,color:T.txt0,fontFamily:F.display,fontWeight:600,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{book.title}</div>
          <div style={{fontSize:11,color:T.txt2,fontFamily:F.body,fontStyle:"italic"}}>{book.author} · {book.year}</div>
        </div>
        <div style={{display:"flex",gap:8,flexShrink:0}}>
          {rd&&<SmBtn href={rd} v="primary" T={T}>↗ Open Full Page</SmBtn>}
          <SmBtn onClick={onClose} T={T}>✕ Close</SmBtn>
        </div>
      </div>
      <NdStripe h={4}/>
      {embedSrc?(
        <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
          <div style={{padding:"8px 20px",background:T.bg2,borderBottom:`1px solid ${T.border}`,fontSize:11,color:T.txt3,fontFamily:F.body}}>
            📖 <span style={{color:T.ndY}}>{book.title}</span> — If reader doesn't load, use ↗ Open Full Page above.
          </div>
          <iframe src={embedSrc} style={{flex:1,width:"100%",border:"none",display:"block",minHeight:0}} title={book.title} allowFullScreen sandbox="allow-scripts allow-same-origin allow-popups allow-forms"/>
        </div>
      ):(
        <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:20,padding:40,textAlign:"center"}}>
          <BeninMask size={60} T={T} glow/>
          <div style={{fontSize:20,color:T.txt0,fontFamily:F.display,fontWeight:600}}>{book.title}</div>
          <div style={{fontSize:13,color:T.txt2,fontFamily:F.body,maxWidth:440,lineHeight:1.7}}>This text isn't available for inline reading. Open it directly in Internet Archive or Open Library.</div>
          {rd&&<SmBtn href={rd} v="primary" T={T}>↗ Open in Archive.org</SmBtn>}
        </div>
      )}
    </div>
  );
}

/* ── BOOK CARD ── */
function BookCard({book,saved,dlSt,onSave,onDownload,onRead,T}) {
  const dl=dlUrl(book);const rd=rdUrl(book);
  return (
    <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:10,padding:"18px 20px",marginBottom:12,boxShadow:T.shadow,borderLeft:`3px solid ${book.featured?T.ndY:T.ndB}`}}>
      {book.featured&&<div style={{fontSize:9,letterSpacing:2,color:T.ndY,textTransform:"uppercase",fontFamily:F.body,marginBottom:10,display:"flex",alignItems:"center",gap:6}}><NdDiamond s={12} T={T}/> Featured Work</div>}
      <div style={{display:"flex",gap:16,marginBottom:12}}>
        <BookCover book={book} size={52} T={T}/>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontSize:15,color:T.txt0,fontFamily:F.display,fontWeight:600,lineHeight:1.3,marginBottom:6}}>{book.title}</div>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
            <AuthorRing name={book.author} size={34} T={T}/>
            <div><div style={{fontSize:12,color:T.ndY,fontFamily:F.body,fontWeight:600}}>{book.author}</div><div style={{fontSize:10,color:T.txt3,fontFamily:F.body}}>{book.year} · {book.editions} ed.</div></div>
          </div>
          {book.description&&<div style={{fontSize:12,color:T.txt2,fontFamily:F.body,lineHeight:1.65,fontStyle:"italic"}}>{book.description}</div>}
        </div>
      </div>
      {book.subjects?.length>0&&<div style={{marginBottom:10}}>{book.subjects.map(s=><Pill key={s} label={s} T={T}/>)}</div>}
      <div style={{fontSize:10,color:T.txt3,fontFamily:F.body,marginBottom:10}}>{dl?<span style={{color:T.ok}}>✓ PDF available</span>:<span style={{color:T.err}}>PDF may be restricted</span>}</div>
      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
        {book.iaId&&<SmBtn v="primary" onClick={()=>onRead(book)} T={T}>📖 Read Here</SmBtn>}
        {dl&&<SmBtn v="green" onClick={()=>onDownload(book)} T={T}>↓ Download PDF</SmBtn>}
        {rd&&<SmBtn href={rd} T={T}>↗ Archive.org</SmBtn>}
        {!saved?<SmBtn onClick={()=>onSave(book,false)} T={T}>+ Save</SmBtn>:<Pill label="Saved" color="green" T={T}/>}
        {dlSt==="downloaded"&&<Pill label="Downloaded ✓" color="green" T={T}/>}
        {dlSt==="unavailable"&&<Pill label="Restricted" color="red" T={T}/>}
      </div>
    </div>
  );
}

/* ── TOPIC DROPDOWN ── */
function TopicDropdown({T,activeTopic,setActiveTopic,open,setOpen}) {
  const ref=useRef(null);
  useEffect(()=>{const h=e=>{if(ref.current&&!ref.current.contains(e.target))setOpen(false);};document.addEventListener("mousedown",h);return()=>document.removeEventListener("mousedown",h);},[]);
  return (
    <div ref={ref} style={{position:"relative"}}>
      <button onClick={()=>setOpen(o=>!o)} style={{display:"flex",alignItems:"center",gap:5,padding:"6px 14px",background:open||activeTopic?T.pillBg:"transparent",border:`1px solid ${open||activeTopic?T.pillBd:T.border}`,borderRadius:20,color:open||activeTopic?T.pillTx:T.txt3,fontSize:11,cursor:"pointer",fontFamily:F.body,whiteSpace:"nowrap"}}>
        {activeTopic?activeTopic.slice(0,16)+(activeTopic.length>16?"…":""):"Topics"} <span style={{fontSize:9,opacity:0.7,marginLeft:2}}>{open?"▲":"▼"}</span>
      </button>
      {open&&(
        <div style={{position:"absolute",top:"calc(100% + 8px)",left:0,background:T.card,border:`1px solid ${T.border}`,borderRadius:10,minWidth:230,maxHeight:300,overflowY:"auto",zIndex:500,boxShadow:`0 8px 32px rgba(0,0,0,${T.isDark?0.5:0.15})`}}>
          <button onClick={()=>{setActiveTopic(null);setOpen(false);}} style={{display:"block",width:"100%",textAlign:"left",padding:"10px 16px",background:"transparent",border:"none",borderBottom:`1px solid ${T.border}`,color:!activeTopic?T.ndY:T.txt2,fontSize:12,cursor:"pointer",fontFamily:F.body,fontWeight:!activeTopic?600:400}}>All Topics</button>
          {TOPICS.map(t=>(<button key={t} onClick={()=>{setActiveTopic(t);setOpen(false);}} style={{display:"block",width:"100%",textAlign:"left",padding:"9px 16px",background:activeTopic===t?T.pillBg:"transparent",border:"none",color:activeTopic===t?T.ndY:T.txt2,fontSize:12,cursor:"pointer",fontFamily:F.body,borderLeft:activeTopic===t?`2px solid ${T.ndY}`:"2px solid transparent"}}>{t}</button>))}
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════════════
   SCREENS
════════════════════════════════════════ */

function AllScreen({T,activeTopic,globalQ,clearQ,setTab}) {
  const [q,setQ]=useState(globalQ||"");const [res,setRes]=useState(null);const [loading,setLoading]=useState(false);const ran=useRef(false);
  useEffect(()=>{if(globalQ&&!ran.current){ran.current=true;run(globalQ);clearQ();}},[globalQ]);
  const run=async v=>{if(!v?.trim())return;setLoading(true);setRes(null);try{setRes(await searchWeb(activeTopic?`${v} — ${activeTopic}`:v));}catch{setRes("Search failed.");}setLoading(false);};
  return (
    <div>
      {activeTopic&&<div style={{marginBottom:12}}><Pill label={activeTopic} color="blue" T={T}/></div>}
      {loading&&<div style={{color:T.ndY,fontStyle:"italic",fontSize:13,padding:"20px 0",fontFamily:F.display}}>Searching the historical record…</div>}
      {res&&<div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:10,padding:"20px 22px",fontSize:13,color:T.txt1,fontFamily:F.body,lineHeight:1.75,whiteSpace:"pre-wrap",boxShadow:T.shadow}}>{res}</div>}
      {!res&&!loading&&(
        <div>
          <div style={{fontSize:10,color:T.txt3,fontFamily:F.body,letterSpacing:2,textTransform:"uppercase",marginBottom:14}}>Explore Topics</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:10}}>
            {TOPICS.slice(0,8).map(t=>(<button key={t} onClick={()=>setTab("deepdive")} style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:10,padding:"16px 18px",cursor:"pointer",textAlign:"left",boxShadow:T.shadow}}>
              <div style={{fontSize:9,color:T.ndY,fontFamily:F.body,letterSpacing:2,textTransform:"uppercase",marginBottom:6}}>Topic</div>
              <div style={{fontSize:13,color:T.txt0,fontFamily:F.display,fontWeight:600,lineHeight:1.3}}>{t}</div>
            </button>))}
          </div>
        </div>
      )}
    </div>
  );
}

function DeepDiveScreen({T,activeTopic}) {
  const [topic,setTopic]=useState(activeTopic||"");const [res,setRes]=useState(null);const [loading,setLoading]=useState(false);const prev=useRef(null);
  useEffect(()=>{if(activeTopic&&activeTopic!==prev.current){setTopic(activeTopic);prev.current=activeTopic;}},[activeTopic]);
  const SYS=`You are a decolonial scholar of African history, Black diasporal culture, mythology, cosmology and spirituality. Centre African voices and indigenous frameworks. Avoid Eurocentric bias. Write in a scholarly yet accessible tone with clear sections.`;
  const run=async()=>{if(!topic.trim())return;setLoading(true);setRes(null);try{setRes(await callClaude(SYS,`Deep scholarly overview of: ${topic}. Cover: historical context, spiritual/cosmological significance, key figures, connections to the African diasporal world, and colonial distortions.`));}catch{setRes("Request failed.");}setLoading(false);};
  return (
    <div>
      <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:10,padding:"18px 20px",marginBottom:20,boxShadow:T.shadow}}>
        <div style={{fontSize:10,color:T.ndY,fontFamily:F.body,letterSpacing:2,textTransform:"uppercase",marginBottom:12}}>What would you like to explore?</div>
        <div style={{display:"flex"}}>
          <input style={{flex:1,background:T.bg2,border:`1px solid ${T.border}`,borderRight:"none",borderRadius:"6px 0 0 6px",color:T.txt0,padding:"12px 16px",fontSize:13,fontFamily:F.body,outline:"none"}} placeholder="e.g. Kongo cosmogram, Dogon astronomy…" value={topic} onChange={e=>setTopic(e.target.value)} onKeyDown={e=>e.key==="Enter"&&run()}/>
          <button onClick={run} style={{padding:"12px 20px",background:T.btnPrimary,border:"none",borderRadius:"0 6px 6px 0",color:T.btnPrimaryTx,fontSize:11,fontWeight:700,cursor:"pointer",letterSpacing:"1px",textTransform:"uppercase",fontFamily:F.body,whiteSpace:"nowrap"}}>{loading?"…":"Explore"}</button>
        </div>
      </div>
      {loading&&<div style={{color:T.ndY,fontStyle:"italic",fontSize:13,padding:"20px 0",fontFamily:F.display}}>Consulting the ancestors…</div>}
      {res&&(<div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:10,padding:"24px",lineHeight:1.85,fontSize:13.5,color:T.txt1,fontFamily:F.body,boxShadow:T.shadow}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16,paddingBottom:14,borderBottom:`1px solid ${T.border}`}}>
          <NdDiamond s={18} T={T}/><span style={{fontSize:10,letterSpacing:2,color:T.ndY,textTransform:"uppercase",fontFamily:F.body}}>Scholarly Overview</span>
          <span style={{fontSize:12,color:T.txt3,fontFamily:F.display,fontStyle:"italic"}}>— {topic}</span>
        </div>
        <div style={{whiteSpace:"pre-wrap"}}>{res}</div>
      </div>)}
      {!res&&!loading&&(<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:10}}>
        {["Kongo Cosmogram","Dogon Star Knowledge","Queen Idia of Benin","Kemetian Spiritual Science","Moors in Europe","Vodou & Diaspora","Ubuntu Philosophy","Nile Valley Civilisations"].map(s=>(
          <button key={s} onClick={()=>setTopic(s)} style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:10,padding:"16px 18px",cursor:"pointer",textAlign:"left",boxShadow:T.shadow}}>
            <div style={{fontSize:9,color:T.ndY,fontFamily:F.body,letterSpacing:2,textTransform:"uppercase",marginBottom:6}}>Suggested</div>
            <div style={{fontSize:12.5,color:T.txt0,fontFamily:F.display,fontWeight:600,lineHeight:1.3}}>{s}</div>
          </button>
        ))}
      </div>)}
    </div>
  );
}

function BooksScreen({T,activeTopic}) {
  const KEY="ba-catalogue-v2";
  const [q,setQ]=useState(activeTopic||"");const [res,setRes]=useState([]);const [loading,setLoading]=useState(false);
  const [dlSt,setDlSt]=useState({});const [view,setView]=useState("search");const [reading,setReading]=useState(null);
  const [cat,setCat]=useState(()=>{try{return JSON.parse(localStorage.getItem(KEY)||"[]");}catch{return[];}});
  useEffect(()=>{if(activeTopic)setQ(activeTopic);},[activeTopic]);
  const persist=u=>{setCat(u);localStorage.setItem(KEY,JSON.stringify(u));};
  const inCat=id=>cat.some(b=>b.id===id);
  const addCat=(book,dl)=>{if(inCat(book.id))return;persist([{...book,addedDate:new Date().toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"}),downloaded:dl,readUrl:rdUrl(book),downloadUrl:dlUrl(book),topic:activeTopic||q},...cat]);};
  const tryDl=book=>{const u=dlUrl(book);if(u){const a=document.createElement("a");a.href=u;a.download=`${book.title}.pdf`;a.target="_blank";document.body.appendChild(a);a.click();document.body.removeChild(a);setDlSt(s=>({...s,[book.id]:"downloaded"}));addCat(book,true);}else{setDlSt(s=>({...s,[book.id]:"unavailable"}));addCat(book,false);}};
  const search=async()=>{if(!q.trim())return;setLoading(true);setRes([]);setRes(await searchOL(q));setLoading(false);};
  return (
    <>
      {reading&&<BookReader book={reading} onClose={()=>setReading(null)} T={T}/>}
      <div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <div style={{fontSize:10,letterSpacing:3,color:T.txt3,textTransform:"uppercase",fontFamily:F.body}}>Books & Texts</div>
          <div style={{display:"flex",gap:6}}>
            {[["search","Search"],["cat",`My Catalogue${cat.length?` (${cat.length})`:""}`]].map(([v,l])=>(<button key={v} onClick={()=>setView(v)} style={{padding:"6px 16px",background:view===v?T.ndY:"transparent",border:`1px solid ${view===v?T.ndY:T.border}`,borderRadius:20,color:view===v?T.bg0:T.txt3,fontSize:10,cursor:"pointer",letterSpacing:"1px",textTransform:"uppercase",fontFamily:F.body,transition:"all 0.15s",fontWeight:view===v?600:400}}>{l}</button>))}
          </div>
        </div>
        {view==="search"&&(<>
          <BookCard book={FEATURED} saved={inCat(FEATURED.id)} dlSt={dlSt[FEATURED.id]} onSave={addCat} onDownload={tryDl} onRead={setReading} T={T}/>
          <div style={{height:1,background:T.border,margin:"20px 0"}}/>
          <div style={{display:"flex",marginBottom:8}}>
            <input style={{flex:1,background:T.bg2,border:`1px solid ${T.border}`,borderRight:"none",borderRadius:"6px 0 0 6px",color:T.txt0,padding:"12px 16px",fontSize:13,fontFamily:F.body,outline:"none"}} placeholder='e.g. "Cheikh Anta Diop", "Yoruba", "Kongo"…' value={q} onChange={e=>setQ(e.target.value)} onKeyDown={e=>e.key==="Enter"&&search()}/>
            <button onClick={search} style={{padding:"12px 20px",background:T.btnPrimary,border:"none",borderRadius:"0 6px 6px 0",color:T.btnPrimaryTx,fontSize:11,fontWeight:700,cursor:"pointer",letterSpacing:"1px",textTransform:"uppercase",fontFamily:F.body,whiteSpace:"nowrap"}}>{loading?"…":"Find"}</button>
          </div>
          <div style={{fontSize:10,color:T.txt3,fontFamily:F.body,margin:"6px 0 16px"}}>📚 Open Library & Internet Archive · <span style={{color:T.ok}}>✓ PDF</span> = download · 📖 = read inline</div>
          {loading&&<div style={{color:T.ndY,fontStyle:"italic",fontSize:13,padding:"20px 0",fontFamily:F.display}}>Searching the archive…</div>}
          {!loading&&res.length===0&&<div style={{textAlign:"center",padding:"50px 20px",color:T.txt3,fontStyle:"italic",fontSize:13,fontFamily:F.display}}>Search for books by title, author, or subject.</div>}
          {res.map(b=><BookCard key={b.id} book={b} saved={inCat(b.id)} dlSt={dlSt[b.id]} onSave={addCat} onDownload={tryDl} onRead={setReading} T={T}/>)}
        </>)}
        {view==="cat"&&(cat.length===0
          ?<div style={{textAlign:"center",padding:"60px 20px",color:T.txt3,fontStyle:"italic",fontSize:13,fontFamily:F.display}}>Your catalogue is empty.</div>
          :cat.map(b=>(<div key={b.id} style={{background:T.card,border:`1px solid ${T.border}`,borderLeft:`3px solid ${T.ok}`,borderRadius:10,padding:"14px 18px",marginBottom:10,boxShadow:T.shadow}}>
            <div style={{display:"flex",gap:12,marginBottom:10}}>
              <BookCover book={b} size={40} T={T}/>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                  <div style={{fontSize:13,color:T.txt0,fontFamily:F.display,fontWeight:600,flex:1,marginRight:8,lineHeight:1.3}}>{b.title}</div>
                  <button onClick={()=>persist(cat.filter(x=>x.id!==b.id))} style={{background:"none",border:"none",color:T.txt3,cursor:"pointer",fontSize:16}}>×</button>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:8,marginTop:6}}><AuthorRing name={b.author} size={26} T={T}/><span style={{fontSize:11,color:T.ndY,fontFamily:F.body,fontStyle:"italic"}}>{b.author} · {b.year}</span></div>
              </div>
            </div>
            <div style={{marginBottom:8}}>{b.topic&&<Pill label={b.topic} T={T}/>}{b.downloaded?<Pill label="Downloaded" color="green" T={T}/>:<Pill label="Link Only" color="red" T={T}/>}</div>
            <div style={{fontSize:10,color:T.txt3,fontFamily:F.body,marginBottom:10}}>Added {b.addedDate}</div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              {b.iaId&&<SmBtn v="primary" onClick={()=>setReading(b)} T={T}>📖 Read Here</SmBtn>}
              {b.downloadUrl&&<SmBtn v="green" href={b.downloadUrl} T={T}>↓ PDF</SmBtn>}
              {b.readUrl&&<SmBtn href={b.readUrl} T={T}>↗ Open</SmBtn>}
            </div>
          </div>))
        )}
      </div>
    </>
  );
}

/* ── VIDEOS SCREEN ── */
function VideosScreen({T,activeTopic}) {
  const KEY="ba-saved-videos-v1";
  const [q,setQ]=useState(activeTopic||"");
  const [results,setResults]=useState([]);
  const [loading,setLoading]=useState(false);
  const [view,setView]=useState("curated");
  const [saved,setSaved]=useState(()=>{try{return JSON.parse(localStorage.getItem(KEY)||"[]");}catch{return[];}});
  const [playing,setPlaying]=useState(null);
  const persist=u=>{setSaved(u);localStorage.setItem(KEY,JSON.stringify(u));};
  const inSaved=id=>saved.some(v=>v.id===id);
  const toggleSave=v=>inSaved(v.id)?persist(saved.filter(x=>x.id!==v.id)):persist([{...v,savedDate:new Date().toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"})},...saved]);

  const search=async()=>{
    if(!q.trim())return;setLoading(true);setResults([]);
    const r=await searchYouTube(q);setResults(r);setLoading(false);
  };

  const filtered=activeTopic?CURATED_VIDEOS.filter(v=>v.topics?.some(t=>t===activeTopic)):CURATED_VIDEOS;

  const VideoCard=({v})=>(
    <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:10,overflow:"hidden",boxShadow:T.shadow,marginBottom:12}}>
      {playing===v.youtubeId?(
        <iframe src={`https://www.youtube.com/embed/${v.youtubeId}?autoplay=1`} style={{width:"100%",height:220,border:"none",display:"block"}} allowFullScreen title={v.title}/>
      ):(
        <div style={{position:"relative",cursor:"pointer",height:180,background:"#000",overflow:"hidden"}} onClick={()=>setPlaying(v.youtubeId)}>
          <img src={`https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`} alt={v.title} style={{width:"100%",height:"100%",objectFit:"cover",opacity:0.85}}/>
          <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <div style={{width:56,height:56,borderRadius:"50%",background:"rgba(232,184,0,0.9)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>▶</div>
          </div>
          {v.duration&&<div style={{position:"absolute",bottom:8,right:10,background:"rgba(0,0,0,0.8)",color:"#fff",fontSize:10,padding:"2px 7px",borderRadius:4,fontFamily:F.body}}>{v.duration}</div>}
        </div>
      )}
      <div style={{padding:"14px 16px"}}>
        <div style={{fontSize:14,color:T.txt0,fontFamily:F.display,fontWeight:600,lineHeight:1.3,marginBottom:4}}>{v.title}</div>
        <div style={{fontSize:11,color:T.ndY,fontFamily:F.body,marginBottom:8}}>{v.channel}</div>
        <div style={{fontSize:12,color:T.txt2,fontFamily:F.body,lineHeight:1.6,marginBottom:10}}>{v.description}</div>
        {v.topics?.length>0&&<div style={{marginBottom:10}}>{v.topics.map(t=><Pill key={t} label={t} T={T}/>)}</div>}
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          <SmBtn v="primary" onClick={()=>setPlaying(playing===v.youtubeId?null:v.youtubeId)} T={T}>{playing===v.youtubeId?"⏹ Stop":"▶ Play"}</SmBtn>
          <SmBtn href={`https://youtube.com/watch?v=${v.youtubeId}`} T={T}>↗ YouTube</SmBtn>
          <SmBtn onClick={()=>toggleSave(v)} v={inSaved(v.id)?"green":"ghost"} T={T}>{inSaved(v.id)?"✓ Saved":"+ Save"}</SmBtn>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <div style={{fontSize:10,letterSpacing:3,color:T.txt3,textTransform:"uppercase",fontFamily:F.body}}>Videos</div>
        <div style={{display:"flex",gap:6}}>
          {[["curated","Curated"],["search","Search"],["saved",`Saved${saved.length?` (${saved.length})`:""}`]].map(([v,l])=>(<button key={v} onClick={()=>setView(v)} style={{padding:"6px 14px",background:view===v?T.ndY:"transparent",border:`1px solid ${view===v?T.ndY:T.border}`,borderRadius:20,color:view===v?T.bg0:T.txt3,fontSize:10,cursor:"pointer",letterSpacing:"1px",textTransform:"uppercase",fontFamily:F.body,fontWeight:view===v?600:400}}>{l}</button>))}
        </div>
      </div>

      {view==="curated"&&(
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:14}}>
          {filtered.map(v=><VideoCard key={v.id} v={v}/>)}
        </div>
      )}

      {view==="search"&&(
        <>
          <div style={{display:"flex",marginBottom:16}}>
            <input style={{flex:1,background:T.bg2,border:`1px solid ${T.border}`,borderRight:"none",borderRadius:"6px 0 0 6px",color:T.txt0,padding:"12px 16px",fontSize:13,fontFamily:F.body,outline:"none"}} placeholder='e.g. "Cheikh Anta Diop lecture", "Kongo cosmology"…' value={q} onChange={e=>setQ(e.target.value)} onKeyDown={e=>e.key==="Enter"&&search()}/>
            <button onClick={search} style={{padding:"12px 20px",background:T.btnPrimary,border:"none",borderRadius:"0 6px 6px 0",color:T.btnPrimaryTx,fontSize:11,fontWeight:700,cursor:"pointer",letterSpacing:"1px",textTransform:"uppercase",fontFamily:F.body,whiteSpace:"nowrap"}}>{loading?"…":"Search"}</button>
          </div>
          <div style={{fontSize:10,color:T.txt3,fontFamily:F.body,marginBottom:16}}>AI-assisted search finds relevant educational content on African history, cosmology, and decolonial scholarship.</div>
          {loading&&<div style={{color:T.ndY,fontStyle:"italic",fontSize:13,padding:"20px 0",fontFamily:F.display}}>Searching the video archive…</div>}
          {!loading&&results.length===0&&<div style={{textAlign:"center",padding:"50px 20px",color:T.txt3,fontStyle:"italic",fontSize:13,fontFamily:F.display}}>Search for video lectures, documentaries, and talks.</div>}
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:14}}>
            {results.map((v,i)=><VideoCard key={i} v={v}/>)}
          </div>
        </>
      )}

      {view==="saved"&&(saved.length===0
        ?<div style={{textAlign:"center",padding:"60px 20px",color:T.txt3,fontStyle:"italic",fontSize:13,fontFamily:F.display}}>No videos saved yet.</div>
        :<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:14}}>
          {saved.map(v=><VideoCard key={v.id} v={v}/>)}
        </div>
      )}
    </div>
  );
}

/* ── IMAGES SCREEN ── */
function ImagesScreen({T,activeTopic}) {
  const KEY="ba-saved-images-v1";
  const [saved,setSaved]=useState(()=>{try{return JSON.parse(localStorage.getItem(KEY)||"[]");}catch{return[];}});
  const [view,setView]=useState("curated");
  const [selected,setSelected]=useState(null);
  const [uploadQ,setUploadQ]=useState("");
  const [userImages,setUserImages]=useState([]);
  const imgRef=useRef(null);
  const persist=u=>{setSaved(u);localStorage.setItem(KEY,JSON.stringify(u));};
  const inSaved=id=>saved.some(x=>x.id===id);
  const toggleSave=img=>inSaved(img.id)?persist(saved.filter(x=>x.id!==img.id)):persist([{...img,savedDate:new Date().toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"})},...saved]);

  const handleUpload=e=>{
    const files=Array.from(e.target.files||[]);
    files.forEach(file=>{
      const reader=new FileReader();
      reader.onload=ev=>setUserImages(u=>[...u,{id:`u${Date.now()}`,title:file.name,src:ev.target.result,source:"Uploaded",description:"User uploaded image.",topics:[],userUploaded:true}]);
      reader.readAsDataURL(file);
    });
  };

  const filtered=activeTopic?CURATED_IMAGES.filter(img=>img.topics?.some(t=>t===activeTopic)):CURATED_IMAGES;
  const allImages=[...filtered,...userImages];

  const ImgCard=({img})=>(
    <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:10,overflow:"hidden",boxShadow:T.shadow,cursor:"pointer"}} onClick={()=>setSelected(img)}>
      <div style={{height:180,background:T.bg3,overflow:"hidden",position:"relative"}}>
        <img src={img.src} alt={img.title} style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>e.target.style.display="none"}/>
        <div style={{position:"absolute",top:8,right:8}}>
          <button onClick={e=>{e.stopPropagation();toggleSave(img);}} style={{padding:"3px 9px",background:inSaved(img.id)?T.ndG:"rgba(0,0,0,0.65)",border:`1px solid ${inSaved(img.id)?T.ok:"rgba(255,255,255,0.2)"}`,borderRadius:20,color:inSaved(img.id)?T.okL:"#fff",cursor:"pointer",fontSize:9,fontFamily:F.body,letterSpacing:1,textTransform:"uppercase"}}>
            {inSaved(img.id)?"✓":"+ Save"}
          </button>
        </div>
      </div>
      <div style={{padding:"12px 14px"}}>
        <div style={{fontSize:13,color:T.txt0,fontFamily:F.display,fontWeight:600,lineHeight:1.3,marginBottom:4}}>{img.title}</div>
        <div style={{fontSize:10,color:T.txt3,fontFamily:F.body,marginBottom:6}}>{img.source}</div>
        <div style={{fontSize:11.5,color:T.txt2,fontFamily:F.body,lineHeight:1.55}}>{img.description}</div>
      </div>
    </div>
  );

  return (
    <div>
      {selected&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.95)",zIndex:2000,display:"flex",alignItems:"center",justifyContent:"center",padding:20}} onClick={()=>setSelected(null)}>
          <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:14,maxWidth:760,width:"100%",overflow:"hidden",boxShadow:"0 8px 48px rgba(0,0,0,0.6)"}} onClick={e=>e.stopPropagation()}>
            <div style={{padding:"14px 18px",borderBottom:`1px solid ${T.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{fontSize:16,color:T.txt0,fontFamily:F.display,fontWeight:600}}>{selected.title}</div>
              <button onClick={()=>setSelected(null)} style={{background:"none",border:"none",color:T.txt3,cursor:"pointer",fontSize:20}}>×</button>
            </div>
            <img src={selected.src} alt={selected.title} style={{width:"100%",maxHeight:440,objectFit:"contain",background:T.bg3,display:"block"}}/>
            <div style={{padding:"16px 18px"}}>
              <div style={{fontSize:10,color:T.txt3,fontFamily:F.body,marginBottom:8}}>Source: {selected.source}</div>
              <div style={{fontSize:13,color:T.txt1,fontFamily:F.body,lineHeight:1.7,marginBottom:14}}>{selected.description}</div>
              {selected.topics?.length>0&&<div style={{marginBottom:14}}>{selected.topics.map(t=><Pill key={t} label={t} T={T}/>)}</div>}
              <SmBtn onClick={()=>toggleSave(selected)} v={inSaved(selected.id)?"green":"ghost"} T={T}>{inSaved(selected.id)?"✓ Saved":"+ Save to Collection"}</SmBtn>
            </div>
          </div>
        </div>
      )}

      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <div style={{fontSize:10,letterSpacing:3,color:T.txt3,textTransform:"uppercase",fontFamily:F.body}}>Images</div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          {[["curated","Curated"],["saved",`Saved${saved.length?` (${saved.length})`:""}`]].map(([v,l])=>(<button key={v} onClick={()=>setView(v)} style={{padding:"6px 14px",background:view===v?T.ndY:"transparent",border:`1px solid ${view===v?T.ndY:T.border}`,borderRadius:20,color:view===v?T.bg0:T.txt3,fontSize:10,cursor:"pointer",letterSpacing:"1px",textTransform:"uppercase",fontFamily:F.body,fontWeight:view===v?600:400}}>{l}</button>))}
          <button onClick={()=>imgRef.current?.click()} style={{padding:"6px 14px",background:"transparent",border:`1px solid ${T.border}`,borderRadius:20,color:T.txt3,fontSize:10,cursor:"pointer",fontFamily:F.body,letterSpacing:"1px",textTransform:"uppercase"}}>📁 Upload</button>
          <input ref={imgRef} type="file" accept="image/*" multiple style={{display:"none"}} onChange={handleUpload}/>
        </div>
      </div>

      {view==="curated"&&<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:14}}>{allImages.map(img=><ImgCard key={img.id} img={img}/>)}</div>}
      {view==="saved"&&(saved.length===0
        ?<div style={{textAlign:"center",padding:"60px 20px",color:T.txt3,fontStyle:"italic",fontSize:13,fontFamily:F.display}}>No images saved yet.</div>
        :<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:14}}>{saved.map(img=><ImgCard key={img.id} img={img}/>)}</div>
      )}
    </div>
  );
}

/* ── LINKS SCREEN ── */
function LinksScreen({T,activeTopic}) {
  const KEY="ba-saved-links-v1";
  const [saved,setSaved]=useState(()=>{try{return JSON.parse(localStorage.getItem(KEY)||"[]");}catch{return[];}});
  const [view,setView]=useState("curated");
  const [newUrl,setNewUrl]=useState("");const [newTitle,setNewTitle]=useState("");const [newDesc,setNewDesc]=useState("");const [newCat,setNewCat]=useState("General");
  const [adding,setAdding]=useState(false);
  const persist=u=>{setSaved(u);localStorage.setItem(KEY,JSON.stringify(u));};
  const inSaved=id=>saved.some(x=>x.id===id);
  const toggleSave=l=>inSaved(l.id)?persist(saved.filter(x=>x.id!==l.id)):persist([{...l,savedDate:new Date().toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"})},...saved]);
  const addCustom=()=>{if(!newUrl.trim()||!newTitle.trim())return;const l={id:`c${Date.now()}`,title:newTitle,url:newUrl,domain:newUrl.replace(/https?:\/\//,"").split("/")[0],description:newDesc,category:newCat,custom:true};persist([{...l,savedDate:new Date().toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"})},...saved]);setNewUrl("");setNewTitle("");setNewDesc("");setAdding(false);};

  const categories=[...new Set(CURATED_LINKS.map(l=>l.category))];

  const LinkCard=({l,showRemove=false})=>(
    <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:10,padding:"16px 18px",marginBottom:10,boxShadow:T.shadow}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
        <div style={{flex:1,minWidth:0}}>
          <a href={l.url} target="_blank" rel="noreferrer" style={{textDecoration:"none"}}>
            <div style={{fontSize:14,color:T.ndY,fontFamily:F.display,fontWeight:600,lineHeight:1.3,marginBottom:4,cursor:"pointer"}}>{l.title}</div>
          </a>
          <div style={{fontSize:10,color:T.txt3,fontFamily:F.body,marginBottom:6}}>🔗 {l.domain} {l.savedDate&&`· Saved ${l.savedDate}`}</div>
        </div>
        {l.category&&<Pill label={l.category} color="blue" T={T}/>}
      </div>
      <div style={{fontSize:12.5,color:T.txt2,fontFamily:F.body,lineHeight:1.65,marginBottom:12}}>{l.description}</div>
      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
        <SmBtn href={l.url} v="primary" T={T}>↗ Visit</SmBtn>
        {!showRemove
          ?<SmBtn onClick={()=>toggleSave(l)} v={inSaved(l.id)?"green":"ghost"} T={T}>{inSaved(l.id)?"✓ Saved":"+ Save"}</SmBtn>
          :<SmBtn onClick={()=>persist(saved.filter(x=>x.id!==l.id))} T={T}>Remove</SmBtn>}
      </div>
    </div>
  );

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <div style={{fontSize:10,letterSpacing:3,color:T.txt3,textTransform:"uppercase",fontFamily:F.body}}>Links & Resources</div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          {[["curated","Curated"],["saved",`Saved${saved.length?` (${saved.length})`:""}`]].map(([v,l])=>(<button key={v} onClick={()=>setView(v)} style={{padding:"6px 14px",background:view===v?T.ndY:"transparent",border:`1px solid ${view===v?T.ndY:T.border}`,borderRadius:20,color:view===v?T.bg0:T.txt3,fontSize:10,cursor:"pointer",letterSpacing:"1px",textTransform:"uppercase",fontFamily:F.body,fontWeight:view===v?600:400}}>{l}</button>))}
          <button onClick={()=>setAdding(a=>!a)} style={{padding:"6px 14px",background:adding?T.ndY:"transparent",border:`1px solid ${adding?T.ndY:T.border}`,borderRadius:20,color:adding?T.bg0:T.txt3,fontSize:10,cursor:"pointer",fontFamily:F.body,letterSpacing:"1px",textTransform:"uppercase"}}>+ Add Link</button>
        </div>
      </div>

      {adding&&(
        <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:10,padding:"18px 20px",marginBottom:20,boxShadow:T.shadow}}>
          <div style={{fontSize:10,color:T.ndY,fontFamily:F.body,letterSpacing:2,textTransform:"uppercase",marginBottom:14}}>Add a Resource Link</div>
          <input style={{width:"100%",boxSizing:"border-box",background:T.bg2,border:`1px solid ${T.border}`,borderRadius:6,color:T.txt0,padding:"10px 14px",fontSize:13,fontFamily:F.body,outline:"none",marginBottom:10}} placeholder="Title" value={newTitle} onChange={e=>setNewTitle(e.target.value)}/>
          <input style={{width:"100%",boxSizing:"border-box",background:T.bg2,border:`1px solid ${T.border}`,borderRadius:6,color:T.txt0,padding:"10px 14px",fontSize:13,fontFamily:F.body,outline:"none",marginBottom:10}} placeholder="URL (https://…)" value={newUrl} onChange={e=>setNewUrl(e.target.value)}/>
          <input style={{width:"100%",boxSizing:"border-box",background:T.bg2,border:`1px solid ${T.border}`,borderRadius:6,color:T.txt0,padding:"10px 14px",fontSize:13,fontFamily:F.body,outline:"none",marginBottom:10}} placeholder="Description (optional)" value={newDesc} onChange={e=>setNewDesc(e.target.value)}/>
          <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap"}}>
            {["Academic","Archive","Philosophy","Library","Journals","General"].map(c=>(<button key={c} onClick={()=>setNewCat(c)} style={{padding:"5px 12px",background:newCat===c?T.ndY:"transparent",border:`1px solid ${newCat===c?T.ndY:T.border}`,borderRadius:20,color:newCat===c?T.bg0:T.txt3,fontSize:10,cursor:"pointer",fontFamily:F.body}}>{c}</button>))}
          </div>
          <div style={{display:"flex",gap:8}}>
            <button onClick={addCustom} style={{padding:"9px 22px",background:T.btnPrimary,border:"none",borderRadius:6,color:T.btnPrimaryTx,cursor:"pointer",fontSize:11,fontFamily:F.body,fontWeight:600,letterSpacing:1,textTransform:"uppercase"}}>Save Link</button>
            <SmBtn onClick={()=>setAdding(false)} T={T}>Cancel</SmBtn>
          </div>
        </div>
      )}

      {view==="curated"&&(
        <>
          <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:16}}>
            {categories.map(cat=>(<Pill key={cat} label={cat} color="blue" T={T}/>))}
          </div>
          {CURATED_LINKS.map(l=><LinkCard key={l.id} l={l}/>)}
        </>
      )}
      {view==="saved"&&(saved.length===0
        ?<div style={{textAlign:"center",padding:"60px 20px",color:T.txt3,fontStyle:"italic",fontSize:13,fontFamily:F.display}}>No links saved yet. Browse curated links or add your own.</div>
        :saved.map(l=><LinkCard key={l.id} l={l} showRemove/>)
      )}
    </div>
  );
}

/* ── AUTHORS SCREEN ── */
function AuthorsScreen({T,activeTopic}) {
  const [selected,setSelected]=useState(null);
  const [summary,setSummary]=useState({});
  const [loading,setLoading]=useState({});
  const [photo,setPhoto]=useState({});

  useEffect(()=>{
    KEY_AUTHORS.forEach(a=>{
      getWikiPhoto(a.name).then(src=>setPhoto(p=>({...p,[a.id]:src})));
    });
  },[]);

  const openAuthor=async a=>{
    setSelected(a);
    if(!summary[a.id]){
      setLoading(l=>({...l,[a.id]:true}));
      const s=await getWikiSummary(a.name);
      setSummary(prev=>({...prev,[a.id]:s}));
      setLoading(l=>({...l,[a.id]:false}));
    }
  };

  const filtered=activeTopic?KEY_AUTHORS.filter(a=>a.topics?.some(t=>t===activeTopic)):KEY_AUTHORS;

  return (
    <div>
      {selected&&(
        <div style={{position:"fixed",inset:0,background:T.isDark?"rgba(4,3,2,0.97)":"rgba(245,240,232,0.97)",zIndex:2000,display:"flex",flexDirection:"column",overflowY:"auto"}}>
          <div style={{padding:"12px 20px",background:T.card,borderBottom:`1px solid ${T.border}`,display:"flex",alignItems:"center",gap:14,flexShrink:0,position:"sticky",top:0,zIndex:10}}>
            <div style={{flex:1}}>
              <div style={{fontSize:18,color:T.txt0,fontFamily:F.display,fontWeight:600}}>{selected.name}</div>
              <div style={{fontSize:11,color:T.txt2,fontFamily:F.body}}>{selected.dates} · {selected.origin}</div>
            </div>
            <button onClick={()=>setSelected(null)} style={{padding:"7px 14px",background:"transparent",border:`1px solid ${T.border}`,borderRadius:6,color:T.txt2,cursor:"pointer",fontSize:10,fontFamily:F.body,letterSpacing:1,textTransform:"uppercase"}}>✕ Close</button>
          </div>
          <NdStripe h={4}/>
          <div style={{maxWidth:700,margin:"0 auto",padding:"28px 24px",width:"100%",boxSizing:"border-box"}}>
            {/* Author header */}
            <div style={{display:"flex",gap:24,marginBottom:28,alignItems:"flex-start"}}>
              <div style={{width:100,height:100,borderRadius:"50%",overflow:"hidden",flexShrink:0,border:`3px solid ${T.ndY}`,background:T.bg3,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:T.shadow}}>
                {photo[selected.id]?<img src={photo[selected.id]} alt={selected.name} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                  :<span style={{fontSize:32,color:T.ndY,fontFamily:F.display,fontWeight:600}}>{selected.name.split(" ").map(w=>w[0]).slice(0,2).join("")}</span>}
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:26,color:T.txt0,fontFamily:F.display,fontWeight:600,lineHeight:1.2,marginBottom:6}}>{selected.name}</div>
                <div style={{fontSize:13,color:T.ndY,fontFamily:F.body,fontWeight:500,marginBottom:4}}>{selected.field}</div>
                <div style={{fontSize:12,color:T.txt2,fontFamily:F.body,marginBottom:10}}>{selected.dates} · {selected.origin}</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:4}}>{selected.topics?.map(t=><Pill key={t} label={t} T={T}/>)}</div>
              </div>
            </div>

            {/* Legacy */}
            <div style={{background:T.card,border:`1px solid ${T.border}`,borderLeft:`4px solid ${T.ndY}`,borderRadius:8,padding:"18px 20px",marginBottom:20,boxShadow:T.shadow}}>
              <div style={{fontSize:10,color:T.ndY,fontFamily:F.body,letterSpacing:2,textTransform:"uppercase",marginBottom:10}}>Legacy & Significance</div>
              <div style={{fontSize:14,color:T.txt1,fontFamily:F.body,lineHeight:1.75}}>{selected.legacy}</div>
            </div>

            {/* Wikipedia summary */}
            <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:8,padding:"18px 20px",marginBottom:20,boxShadow:T.shadow}}>
              <div style={{fontSize:10,color:T.ndY,fontFamily:F.body,letterSpacing:2,textTransform:"uppercase",marginBottom:10}}>Overview</div>
              {loading[selected.id]?<div style={{color:T.ndYd,fontStyle:"italic",fontSize:13,fontFamily:F.display}}>Loading…</div>
                :<div style={{fontSize:13,color:T.txt2,fontFamily:F.body,lineHeight:1.75}}>{summary[selected.id]||"No Wikipedia summary available."}</div>}
            </div>

            {/* Key works */}
            <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:8,padding:"18px 20px",marginBottom:20,boxShadow:T.shadow}}>
              <div style={{fontSize:10,color:T.ndY,fontFamily:F.body,letterSpacing:2,textTransform:"uppercase",marginBottom:12}}>Key Works</div>
              {selected.works.map((w,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderBottom:i<selected.works.length-1?`1px solid ${T.border}`:"none"}}>
                  <div style={{width:32,height:44,background:`linear-gradient(160deg,${T.ndB}50,${T.bg3})`,borderRadius:2,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10}}>📖</div>
                  <div>
                    <div style={{fontSize:13,color:T.txt0,fontFamily:F.display,fontWeight:600}}>{w}</div>
                    <a href={`https://openlibrary.org/search?q=${encodeURIComponent(w+" "+selected.name)}`} target="_blank" rel="noreferrer" style={{fontSize:10,color:T.ndYd,fontFamily:F.body,textDecoration:"none"}}>Search on Open Library →</a>
                  </div>
                </div>
              ))}
            </div>

            <a href={`https://en.wikipedia.org/wiki/${encodeURIComponent(selected.name)}`} target="_blank" rel="noreferrer">
              <SmBtn v="primary" T={T}>↗ Wikipedia Full Article</SmBtn>
            </a>
          </div>
        </div>
      )}

      <div style={{marginBottom:20}}>
        <div style={{fontSize:10,letterSpacing:3,color:T.txt3,textTransform:"uppercase",fontFamily:F.body,marginBottom:16}}>Key Scholars & Authors</div>
        {activeTopic&&<div style={{marginBottom:16}}><Pill label={`Filtered by: ${activeTopic}`} color="blue" T={T}/></div>}
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:14}}>
        {filtered.map(a=>(
          <div key={a.id} style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:10,padding:"20px",boxShadow:T.shadow,cursor:"pointer",transition:"border-color 0.2s"}} onClick={()=>openAuthor(a)}>
            <div style={{display:"flex",gap:16,marginBottom:14}}>
              <div style={{width:64,height:64,borderRadius:"50%",overflow:"hidden",flexShrink:0,border:`2px solid ${T.ndY}`,background:T.bg3,display:"flex",alignItems:"center",justifyContent:"center"}}>
                {photo[a.id]?<img src={photo[a.id]} alt={a.name} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                  :<span style={{fontSize:22,color:T.ndY,fontFamily:F.display,fontWeight:600}}>{a.name.split(" ").map(w=>w[0]).slice(0,2).join("")}</span>}
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:15,color:T.txt0,fontFamily:F.display,fontWeight:600,lineHeight:1.3,marginBottom:3}}>{a.name}</div>
                <div style={{fontSize:11,color:T.ndY,fontFamily:F.body,fontWeight:500,marginBottom:2}}>{a.field}</div>
                <div style={{fontSize:10,color:T.txt3,fontFamily:F.body}}>{a.dates} · {a.origin}</div>
              </div>
            </div>
            <div style={{fontSize:12,color:T.txt2,fontFamily:F.body,lineHeight:1.6,marginBottom:12}}>{a.legacy}</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:0,marginBottom:12}}>{a.topics?.slice(0,2).map(t=><Pill key={t} label={t} T={T}/>)}</div>
            <div style={{fontSize:11,color:T.ndY,fontFamily:F.body,letterSpacing:0.5}}>View full profile →</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── MAPS SCREEN ── */
function MapsScreen({T}) {
  const KEY="ba-maps-v1";
  const [saved,setSaved]=useState(()=>{try{return JSON.parse(localStorage.getItem(KEY)||"[]");}catch{return[];}});
  const [view,setView]=useState("browse");const [selected,setSelected]=useState(null);
  const persist=u=>{setSaved(u);localStorage.setItem(KEY,JSON.stringify(u));};
  const inSaved=id=>saved.some(m=>m.id===id);
  const toggleSave=map=>inSaved(map.id)?persist(saved.filter(m=>m.id!==map.id)):persist([{...map,savedDate:new Date().toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"})},...saved]);
  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <div style={{fontSize:10,letterSpacing:3,color:T.txt3,textTransform:"uppercase",fontFamily:F.body}}>Old World Maps</div>
        <div style={{display:"flex",gap:6}}>
          {[["browse","Browse"],["saved",`Saved${saved.length?` (${saved.length})`:""}`]].map(([v,l])=>(<button key={v} onClick={()=>setView(v)} style={{padding:"6px 16px",background:view===v?T.ndY:"transparent",border:`1px solid ${view===v?T.ndY:T.border}`,borderRadius:20,color:view===v?T.bg0:T.txt3,fontSize:10,cursor:"pointer",letterSpacing:"1px",textTransform:"uppercase",fontFamily:F.body,transition:"all 0.15s",fontWeight:view===v?600:400}}>{l}</button>))}
        </div>
      </div>
      <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:10,padding:"14px 18px",marginBottom:20,boxShadow:T.shadow}}>
        <div style={{fontSize:12,color:T.txt1,fontFamily:F.body,lineHeight:1.7}}><span style={{color:T.ndY,fontWeight:600}}>Cartographic Decolonisation:</span> Maps showing the world before colonial renaming — including the Atlantic as the <em>Ethiopian Sea</em>, Africa centred, and kingdoms Europe later erased.</div>
      </div>
      {selected&&(
        <div style={{position:"fixed",inset:0,background:T.isDark?"rgba(4,3,2,0.96)":"rgba(240,235,224,0.96)",zIndex:2000,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
          <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:14,maxWidth:700,width:"100%",overflow:"hidden",boxShadow:"0 8px 48px rgba(0,0,0,0.35)"}}>
            <div style={{padding:"16px 20px",borderBottom:`1px solid ${T.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{fontSize:16,color:T.txt0,fontFamily:F.display,fontWeight:600}}>{selected.title}</div>
              <button onClick={()=>setSelected(null)} style={{background:"none",border:"none",color:T.txt3,cursor:"pointer",fontSize:20}}>×</button>
            </div>
            <img src={selected.thumb} alt={selected.title} style={{width:"100%",maxHeight:400,objectFit:"contain",background:T.bg3,display:"block"}} onError={e=>e.target.style.display="none"}/>
            <div style={{padding:"18px 20px"}}>
              <div style={{display:"flex",gap:8,marginBottom:12,flexWrap:"wrap"}}><Pill label={selected.year} T={T}/><Pill label={selected.source} color="blue" T={T}/></div>
              <div style={{fontSize:13,color:T.txt1,fontFamily:F.body,lineHeight:1.7,marginBottom:16}}>{selected.description}</div>
              <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                <SmBtn href={selected.link} v="primary" T={T}>↗ Full Source</SmBtn>
                <SmBtn onClick={()=>toggleSave(selected)} v={inSaved(selected.id)?"green":"ghost"} T={T}>{inSaved(selected.id)?"✓ Saved":"+ Save to Collection"}</SmBtn>
              </div>
            </div>
          </div>
        </div>
      )}
      {view==="browse"&&(<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:14}}>{OLD_MAPS.map(map=>(
        <div key={map.id} style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:10,overflow:"hidden",cursor:"pointer",boxShadow:T.shadow}} onClick={()=>setSelected(map)}>
          <div style={{height:150,background:T.bg3,overflow:"hidden",position:"relative"}}>
            <img src={map.thumb} alt={map.title} style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>e.target.style.display="none"}/>
            <div style={{position:"absolute",top:8,right:8}}><button onClick={e=>{e.stopPropagation();toggleSave(map);}} style={{padding:"4px 10px",background:inSaved(map.id)?T.ndG:"rgba(0,0,0,0.6)",border:`1px solid ${inSaved(map.id)?T.ok:"rgba(255,255,255,0.25)"}`,borderRadius:20,color:inSaved(map.id)?T.okL:"#fff",cursor:"pointer",fontSize:9,fontFamily:F.body,letterSpacing:1,textTransform:"uppercase"}}>{inSaved(map.id)?"✓":"+ Save"}</button></div>
          </div>
          <div style={{padding:"14px 16px"}}>
            <div style={{fontSize:14,color:T.txt0,fontFamily:F.display,fontWeight:600,marginBottom:4,lineHeight:1.3}}>{map.title}</div>
            <Pill label={map.year} T={T}/>
            <div style={{fontSize:11.5,color:T.txt2,fontFamily:F.body,lineHeight:1.6,marginTop:8}}>{map.description}</div>
          </div>
        </div>
      ))}</div>)}
      {view==="saved"&&(saved.length===0?<div style={{textAlign:"center",padding:"60px 20px",color:T.txt3,fontStyle:"italic",fontSize:13,fontFamily:F.display}}>No maps saved yet.</div>
        :<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:12}}>{saved.map(map=>(<div key={map.id} style={{background:T.card,border:`1px solid ${T.border}`,borderLeft:`3px solid ${T.ndB}`,borderRadius:10,overflow:"hidden",boxShadow:T.shadow}}>
          <div style={{height:120,background:T.bg3,overflow:"hidden"}}><img src={map.thumb} alt={map.title} style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>e.target.style.display="none"}/></div>
          <div style={{padding:"12px 14px"}}>
            <div style={{fontSize:13,color:T.txt0,fontFamily:F.display,fontWeight:600,marginBottom:4}}>{map.title}</div>
            <div style={{fontSize:10,color:T.txt3,fontFamily:F.body,marginBottom:10}}>Saved {map.savedDate}</div>
            <div style={{display:"flex",gap:8}}><SmBtn v="primary" onClick={()=>setSelected(map)} T={T}>View</SmBtn><SmBtn onClick={()=>persist(saved.filter(m=>m.id!==map.id))} T={T}>Remove</SmBtn></div>
          </div>
        </div>))}</div>
      )}
    </div>
  );
}

/* ── NOTES SCREEN ── */
function NotesScreen({T,activeTopic}) {
  const KEY="ba-notes-v2";
  const [notes,setNotes]=useState(()=>{try{return JSON.parse(localStorage.getItem(KEY)||"[]");}catch{return[];}});
  const [draft,setDraft]=useState("");const [dT,setDT]=useState(activeTopic||"");const [dS,setDS]=useState("");
  const [mediaOpen,setMediaOpen]=useState(false);const [mediaItems,setMediaItems]=useState([]);const [mediaInput,setMediaInput]=useState("");const [mediaType,setMediaType]=useState("link");
  const imgRef=useRef(null);
  useEffect(()=>{if(activeTopic)setDT(activeTopic);},[activeTopic]);
  const addMediaItem=()=>{if(!mediaInput.trim())return;setMediaItems(m=>[...m,{type:mediaType,value:mediaInput.trim(),label:mediaInput.trim()}]);setMediaInput("");};
  const save=()=>{if(!draft.trim())return;const n={id:Date.now(),topic:dT,source:dS,text:draft,media:mediaItems,date:new Date().toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"})};const u=[n,...notes];setNotes(u);localStorage.setItem(KEY,JSON.stringify(u));setDraft("");setDS("");setMediaItems([]);setMediaOpen(false);};
  const del=id=>{const u=notes.filter(n=>n.id!==id);setNotes(u);localStorage.setItem(KEY,JSON.stringify(u));};
  const filtered=activeTopic?notes.filter(n=>n.topic===activeTopic):notes;
  const handleImageUpload=e=>{const file=e.target.files?.[0];if(!file)return;const reader=new FileReader();reader.onload=ev=>setMediaItems(m=>[...m,{type:"image",value:ev.target.result,label:file.name}]);reader.readAsDataURL(file);};
  return (
    <div>
      <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:10,padding:"18px 20px",marginBottom:20,boxShadow:T.shadow}}>
        <input style={{width:"100%",boxSizing:"border-box",background:T.bg2,border:`1px solid ${T.border}`,borderRadius:6,color:T.txt0,padding:"10px 14px",fontSize:13,fontFamily:F.body,outline:"none",marginBottom:10}} placeholder="Topic" value={dT} onChange={e=>setDT(e.target.value)}/>
        <input style={{width:"100%",boxSizing:"border-box",background:T.bg2,border:`1px solid ${T.border}`,borderRadius:6,color:T.txt0,padding:"10px 14px",fontSize:13,fontFamily:F.body,outline:"none",marginBottom:10}} placeholder="Source / reference (optional)" value={dS} onChange={e=>setDS(e.target.value)}/>
        <textarea style={{width:"100%",boxSizing:"border-box",minHeight:110,background:T.bg2,border:`1px solid ${T.border}`,borderRadius:6,color:T.txt0,padding:"10px 14px",fontSize:13,fontFamily:F.body,resize:"vertical",outline:"none",lineHeight:1.7,display:"block"}} placeholder="Write your note, annotation, or insight…" value={draft} onChange={e=>setDraft(e.target.value)}/>
        {mediaItems.length>0&&(<div style={{marginTop:12,display:"flex",flexWrap:"wrap",gap:8}}>{mediaItems.map((m,i)=>(<div key={i} style={{background:T.bg3,border:`1px solid ${T.border}`,borderRadius:6,padding:"6px 10px",display:"flex",alignItems:"center",gap:8}}>{m.type==="image"&&<img src={m.value} alt="" style={{width:36,height:36,objectFit:"cover",borderRadius:4}}/>}{m.type==="video"&&<span>🎬</span>}{m.type==="link"&&<span>🔗</span>}<span style={{fontSize:11,color:T.txt2,fontFamily:F.body,maxWidth:160,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{m.label}</span><button onClick={()=>setMediaItems(items=>items.filter((_,j)=>j!==i))} style={{background:"none",border:"none",color:T.txt3,cursor:"pointer",fontSize:14}}>×</button></div>))}</div>)}
        <div style={{marginTop:12,borderTop:`1px solid ${T.border}`,paddingTop:12}}>
          <button onClick={()=>setMediaOpen(o=>!o)} style={{display:"flex",alignItems:"center",gap:6,background:"transparent",border:`1px solid ${T.border}`,borderRadius:6,padding:"7px 14px",cursor:"pointer",color:T.txt2,fontSize:11,fontFamily:F.body}}>＋ Add Media {mediaOpen?"▲":"▼"}</button>
          {mediaOpen&&(<div style={{marginTop:10,background:T.bg2,border:`1px solid ${T.border}`,borderRadius:8,padding:"14px 16px"}}>
            <div style={{display:"flex",gap:6,marginBottom:12,flexWrap:"wrap"}}>
              {[["link","🔗 Link"],["video","🎬 Video"],["image","🖼 Image URL"]].map(([v,l])=>(<button key={v} onClick={()=>setMediaType(v)} style={{padding:"5px 12px",background:mediaType===v?T.ndY:"transparent",border:`1px solid ${mediaType===v?T.ndY:T.border}`,borderRadius:20,color:mediaType===v?T.bg0:T.txt2,fontSize:10,cursor:"pointer",fontFamily:F.body,fontWeight:mediaType===v?600:400}}>{l}</button>))}
              <button onClick={()=>imgRef.current?.click()} style={{padding:"5px 12px",background:"transparent",border:`1px solid ${T.border}`,borderRadius:20,color:T.txt2,fontSize:10,cursor:"pointer",fontFamily:F.body}}>📁 Upload</button>
              <input ref={imgRef} type="file" accept="image/*" style={{display:"none"}} onChange={handleImageUpload}/>
            </div>
            <div style={{display:"flex",gap:8}}>
              <input style={{flex:1,background:T.bg1,border:`1px solid ${T.border}`,borderRadius:6,color:T.txt0,padding:"9px 13px",fontSize:12,fontFamily:F.body,outline:"none"}} placeholder={mediaType==="link"?"Paste URL…":mediaType==="video"?"YouTube or Vimeo URL…":"Image URL…"} value={mediaInput} onChange={e=>setMediaInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addMediaItem()}/>
              <button onClick={addMediaItem} style={{padding:"9px 16px",background:T.btnPrimary,border:"none",borderRadius:6,color:T.btnPrimaryTx,cursor:"pointer",fontSize:10,fontFamily:F.body,fontWeight:600,letterSpacing:1,textTransform:"uppercase",whiteSpace:"nowrap"}}>Add</button>
            </div>
          </div>)}
        </div>
        <div style={{display:"flex",justifyContent:"flex-end",marginTop:14}}><button onClick={save} style={{padding:"10px 26px",background:T.btnPrimary,border:"none",borderRadius:6,color:T.btnPrimaryTx,cursor:"pointer",fontSize:11,fontFamily:F.body,fontWeight:600,letterSpacing:1,textTransform:"uppercase"}}>Save Note</button></div>
      </div>
      {filtered.length===0?<div style={{textAlign:"center",padding:"50px 20px",color:T.txt3,fontStyle:"italic",fontSize:13,fontFamily:F.display}}>{activeTopic?`No notes for "${activeTopic}" yet.`:"No notes saved yet."}</div>
        :filtered.map(n=>(<div key={n.id} style={{background:T.card,border:`1px solid ${T.border}`,borderLeft:`3px solid ${T.ndY}`,borderRadius:10,padding:"16px 18px",marginBottom:12,boxShadow:T.shadow}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
            <div style={{display:"flex",flexWrap:"wrap",gap:4}}>{n.topic&&<Pill label={n.topic} T={T}/>}{n.source&&<span style={{fontSize:10,color:T.txt3,fontFamily:F.body,marginTop:6}}>↗ {n.source}</span>}</div>
            <div style={{display:"flex",alignItems:"center",gap:10,flexShrink:0,marginLeft:8}}><span style={{fontSize:10,color:T.txt3,fontFamily:F.body,whiteSpace:"nowrap"}}>{n.date}</span><button onClick={()=>del(n.id)} style={{background:"none",border:"none",color:T.txt3,cursor:"pointer",fontSize:16}}>×</button></div>
          </div>
          <div style={{fontSize:13,color:T.txt1,fontFamily:F.body,lineHeight:1.7,whiteSpace:"pre-wrap",marginBottom:n.media?.length?12:0}}>{n.text}</div>
          {n.media?.length>0&&(<div style={{borderTop:`1px solid ${T.border}`,paddingTop:12,display:"flex",flexDirection:"column",gap:10}}>
            {n.media.map((m,i)=>(<div key={i}>{m.type==="image"&&<img src={m.value} alt={m.label} style={{maxWidth:"100%",maxHeight:280,borderRadius:6,objectFit:"contain",background:T.bg3,display:"block"}}/>}{m.type==="video"&&(()=>{const yt=m.value.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);const vi=m.value.match(/vimeo\.com\/(\d+)/);if(yt)return<iframe src={`https://www.youtube.com/embed/${yt[1]}`} style={{width:"100%",height:220,border:"none",borderRadius:6}} allowFullScreen title={m.label}/>;if(vi)return<iframe src={`https://player.vimeo.com/video/${vi[1]}`} style={{width:"100%",height:220,border:"none",borderRadius:6}} allowFullScreen title={m.label}/>;return<a href={m.value} target="_blank" rel="noreferrer" style={{fontSize:12,color:T.ndY,fontFamily:F.body}}>🎬 {m.label}</a>;})()}{m.type==="link"&&<a href={m.value} target="_blank" rel="noreferrer" style={{display:"flex",alignItems:"center",gap:8,padding:"8px 12px",background:T.bg2,border:`1px solid ${T.border}`,borderRadius:6,color:T.ndY,fontFamily:F.body,fontSize:12,textDecoration:"none",overflow:"hidden"}}><span style={{flexShrink:0}}>🔗</span><span style={{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{m.label}</span></a>}</div>))}
          </div>)}
        </div>))}
    </div>
  );
}

/* ════════════════════════════════════════
   ROOT
════════════════════════════════════════ */
export default function App() {
  const [dark,setDark]=useState(false);
  const TH=dark?DARK:LIGHT;
  const [tab,setTab]=useState("all");
  const [topic,setTopic]=useState(null);
  const [hq,setHq]=useState("");
  const [pq,setPq]=useState("");
  const [topicOpen,setTopicOpen]=useState(false);
  const [aboutOpen,setAboutOpen]=useState(false);

  const go=()=>{if(!hq.trim())return;setPq(hq);setTab("all");};

  const NAV_TABS=[
    {id:"all",label:"All"},
    {id:"deepdive",label:"Deep Dive"},
    {id:"books",label:"Books"},
    {id:"videos",label:"Videos"},
    {id:"images",label:"Images"},
    {id:"links",label:"Links"},
    {id:"maps",label:"Maps"},
    {id:"authors",label:"Authors"},
    {id:"notes",label:"Notes"},
  ];

  return (
    <div style={{minHeight:"100vh",background:TH.bg0,color:TH.txt1,fontFamily:F.body,display:"flex",flexDirection:"column",fontSize:14,transition:"background 0.3s,color 0.3s"}}>

      {/* TOP BAR */}
      <div style={{background:TH.navBg,borderBottom:`1px solid ${TH.border}`,padding:"10px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0,boxShadow:TH.shadow}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <BeninMask size={30} T={TH}/>
          <span style={{fontSize:9,letterSpacing:4,color:TH.txt3,textTransform:"uppercase",fontFamily:F.body,fontStyle:"italic"}}>The Ancestral Archive</span>
        </div>
        <button onClick={()=>setDark(d=>!d)} style={{display:"flex",alignItems:"center",gap:7,padding:"7px 14px",background:TH.bg3,border:`1px solid ${TH.border}`,borderRadius:20,color:TH.txt2,cursor:"pointer",fontSize:11,fontFamily:F.body,transition:"all 0.2s"}}>
          {dark?"☀ Light":"🌙 Dark"}
        </button>
      </div>

      {/* HERO */}
      <div style={{background:`linear-gradient(180deg,${dark?"#1c1406":"#fff8ed"} 0%,${TH.bg0} 100%)`,padding:"32px 24px 22px",textAlign:"center",flexShrink:0,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:180,opacity:0.025,pointerEvents:"none",letterSpacing:20,fontFamily:F.display,color:TH.ndY}}>𓂀☥</div>
        <div style={{display:"flex",justifyContent:"center",marginBottom:8}}><BeninMask size={50} T={TH} glow/></div>
        <div style={{fontSize:10,letterSpacing:6,color:TH.txt3,textTransform:"uppercase",fontFamily:F.body,fontStyle:"italic",marginBottom:12}}>African & Black Diasporal Research Library</div>
        <div style={{fontSize:"clamp(48px,7vw,82px)",fontFamily:F.display,fontWeight:300,letterSpacing:6,marginBottom:4,lineHeight:1,position:"relative",zIndex:1}}>
          <span style={{color:TH.ndB}}>Y</span><span style={{color:TH.ndR}}>e</span><span style={{color:TH.ndY}}>h</span><span style={{color:TH.ndB}}>u</span><span style={{color:TH.ndG}}>t</span><span style={{color:TH.ndR}}>i</span>
        </div>
        <div style={{fontSize:10,color:TH.txt3,fontFamily:F.body,fontStyle:"italic",letterSpacing:1,marginBottom:22}}>Named for Djehuti — keeper of divine knowledge and sacred writing</div>
        <div style={{maxWidth:560,margin:"0 auto",position:"relative",zIndex:1}}>
          <div style={{display:"flex",alignItems:"center",background:TH.searchBg,border:`1.5px solid ${TH.border}`,borderRadius:28,padding:"0 8px 0 20px",boxShadow:TH.shadow,overflow:"hidden"}}>
            <input style={{flex:1,background:"transparent",border:"none",color:TH.txt0,padding:"13px 12px",fontSize:15,fontFamily:F.body,outline:"none",minWidth:0}} placeholder="Search the archive…" value={hq} onChange={e=>setHq(e.target.value)} onKeyDown={e=>e.key==="Enter"&&go()}/>
            <button onClick={go} style={{background:TH.btnPrimary,border:"none",borderRadius:22,width:40,height:40,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0,fontSize:17}}>🔎</button>
          </div>
        </div>
        <div style={{maxWidth:180,margin:"16px auto 0"}}><NdStripe h={4}/></div>
      </div>

      {/* NAV TABS */}
      <div style={{background:TH.navBg,borderBottom:`1px solid ${TH.border}`,padding:"0 16px",display:"flex",alignItems:"center",gap:0,flexShrink:0,overflowX:"auto"}}>
        {NAV_TABS.map(t=>(<button key={t.id} onClick={()=>setTab(t.id)} style={{padding:"11px 14px",background:"none",border:"none",borderBottom:tab===t.id?`2px solid ${TH.ndY}`:"2px solid transparent",color:tab===t.id?TH.ndY:TH.txt3,fontSize:12,cursor:"pointer",fontFamily:F.body,fontWeight:tab===t.id?600:400,marginBottom:-1,transition:"all 0.15s",whiteSpace:"nowrap"}}>{t.label}</button>))}
        <div style={{marginLeft:6,flexShrink:0}}>
          <TopicDropdown T={TH} activeTopic={topic} setActiveTopic={setTopic} open={topicOpen} setOpen={setTopicOpen}/>
        </div>
        {topic&&<button onClick={()=>setTopic(null)} style={{background:"none",border:"none",color:TH.txt3,cursor:"pointer",fontSize:16,padding:"0 4px",flexShrink:0}}>×</button>}
      </div>

      {/* BODY */}
      <div style={{flex:1,maxWidth:900,width:"100%",margin:"0 auto",padding:"24px 20px 60px",minWidth:0,boxSizing:"border-box"}}>
        {/* About */}
        <div style={{background:TH.card,border:`1px solid ${TH.border}`,borderRadius:10,padding:"14px 18px",marginBottom:20,boxShadow:TH.shadow,display:"flex",gap:14,alignItems:"flex-start"}}>
          <NdDiamond s={22} T={TH}/>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:12,color:TH.txt1,fontFamily:F.body,lineHeight:1.75}}>
              <span style={{color:TH.txt0,fontFamily:F.display,fontSize:13,fontWeight:600}}>The Ancestral Archive</span> centres indigenous African scholarship, oral traditions, and primary cultural sources — approaching all subjects through a <span style={{color:TH.ndY,fontWeight:500}}>decolonial framework</span>.
              {aboutOpen&&<> It does not treat African history as supplementary — it treats it as the foundation. Sources draw from Open Library, Internet Archive, and live web research.</>}
              {" "}<button onClick={()=>setAboutOpen(o=>!o)} style={{background:"none",border:"none",color:TH.ndYd,cursor:"pointer",fontSize:11,padding:0,fontFamily:F.body,textDecoration:"underline"}}>{aboutOpen?"less":"more"}</button>
            </div>
            <div style={{display:"flex",flexWrap:"wrap",gap:5,marginTop:8}}>
              {["Cosmology","Spirituality","Mythology","History","Traditions","Psychology","Philosophy"].map(d=>(<span key={d} style={{fontSize:8,letterSpacing:"2px",textTransform:"uppercase",color:TH.txt3,border:`1px solid ${TH.border}`,borderRadius:20,padding:"2px 9px",fontFamily:F.body}}>{d}</span>))}
            </div>
          </div>
        </div>

        {tab==="all"&&<AllScreen T={TH} activeTopic={topic} globalQ={pq} clearQ={()=>setPq("")} setTab={setTab}/>}
        {tab==="deepdive"&&<DeepDiveScreen T={TH} activeTopic={topic}/>}
        {tab==="books"&&<BooksScreen T={TH} activeTopic={topic}/>}
        {tab==="videos"&&<VideosScreen T={TH} activeTopic={topic}/>}
        {tab==="images"&&<ImagesScreen T={TH} activeTopic={topic}/>}
        {tab==="links"&&<LinksScreen T={TH} activeTopic={topic}/>}
        {tab==="maps"&&<MapsScreen T={TH}/>}
        {tab==="authors"&&<AuthorsScreen T={TH} activeTopic={topic}/>}
        {tab==="notes"&&<NotesScreen T={TH} activeTopic={topic}/>}
      </div>
    </div>
  );
}
