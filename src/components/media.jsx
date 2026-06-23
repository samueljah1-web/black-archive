import React, { useState } from "react";
import { BeninMask, NdStripe, NdDiamond } from "./icons";
import { Btn, Pill, AuthorRing, BookCover } from "./ui";
import { F } from "../styles/theme";

/* ── Book Reader ── */
export function BookReader({ book, onClose, T }) {
  const embed = book.iaId ? `https://archive.org/stream/${book.iaId}?ui=embed#page/n0/mode/2up` : null;
  const localPdf = book.localDataUrl || null;
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
      ) : localPdf ? (
        <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "6px 18px", background: T.bg2, borderBottom: `1px solid ${T.border}`, fontSize: 10, color: T.txt3, fontFamily: F.body }}>
            📖 Local PDF — <span style={{ color: T.ndY }}>{book.title}</span>
          </div>
          <embed src={localPdf} type="application/pdf" style={{ flex: 1, width: "100%", border: "none", minHeight: 0 }} />
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

/* ── Map Viewer ── */
export function MapViewer({ map, onClose, T }) {
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
export function BookCard({ book, saved, dlSt, onSave, onDownload, onRead, T }) {
  const canRead = book.iaId || book.localDataUrl;
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
        {canRead && <Btn v="primary" onClick={() => onRead(book)} T={T} sm>📖 Read Here</Btn>}
        {book.downloadUrl && <Btn v="green" onClick={() => onDownload(book)} T={T} sm>↓ PDF</Btn>}
        {book.readUrl && <Btn href={book.readUrl} T={T} sm>↗ Source</Btn>}
        {!saved ? <Btn onClick={() => onSave(book)} T={T} sm>+ Save</Btn> : <Pill label="Saved ✓" color="green" T={T} />}
        {dlSt === "downloaded" && <Pill label="Downloaded ✓" color="green" T={T} />}
      </div>
    </div>
  );
}

/* ── Map Card ── */
export function MapCard({ map, saved, onSave, onView, T }) {
  const [imgOk, setImgOk] = useState(true);
  return (
    <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 10, overflow: "hidden", boxShadow: T.shadow }}>
      <div style={{ height: 160, background: T.bg3, overflow: "hidden", position: "relative", cursor: "pointer" }} onClick={() => onView(map)}>
        {imgOk
          ? <img src={map.thumb} alt={map.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={() => setImgOk(false)} />
          : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: T.txt3, fontFamily: F.body, fontSize: 12, flexDirection: "column", gap: 8 }}><span style={{ fontSize: 32 }}>🗺</span>{map.title}</div>}
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
