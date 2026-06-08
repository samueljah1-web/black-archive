import React, { useState, useEffect, useRef } from "react";
import { BeninMask } from "./icons";
import { F } from "../styles/theme";

/* ── Pill ── */
export function Pill({ label, color = "gold", T }) {
  const configs = { gold: { bg: T.pillBg, bd: T.pillBd, tx: T.pillTx }, green: { bg: `${T.ndG}25`, bd: T.ok, tx: T.ok }, red: { bg: `${T.ndR}18`, bd: T.err, tx: T.err }, blue: { bg: `${T.ndB}20`, bd: T.ndB, tx: T.ndB } };
  const { bg, bd, tx } = configs[color] || configs.gold;
  return <span style={{ display: "inline-flex", alignItems: "center", padding: "3px 10px", background: bg, border: `1px solid ${bd}`, borderRadius: 20, fontSize: 9, letterSpacing: "1.5px", textTransform: "uppercase", color: tx, fontFamily: F.body, marginRight: 5, marginTop: 4, whiteSpace: "nowrap" }}>{label}</span>;
}

/* ── Button ── */
export function Btn({ children, onClick, v = "ghost", sm = false, T, href, disabled = false }) {
  const styles = {
    primary: { background: disabled ? T.bg3 : T.btnP, color: disabled ? T.txt3 : T.btnPTx, border: "none" },
    green: { background: `${T.ndG}20`, border: `1px solid ${T.ok}`, color: T.ok },
    ghost: { background: "transparent", border: `1px solid ${T.border}`, color: T.txt2 },
  };
  const s = { ...styles[v] || styles.ghost, padding: sm ? "5px 11px" : "8px 16px", borderRadius: 4, cursor: disabled ? "not-allowed" : "pointer", fontFamily: F.body, fontWeight: 500, fontSize: sm ? 9 : 10, letterSpacing: "0.8px", textTransform: "uppercase", transition: "all 0.15s", display: "inline-flex", alignItems: "center", gap: 5, whiteSpace: "nowrap" };
  if (href) return <a href={href} target="_blank" rel="noreferrer"><button style={s}>{children}</button></a>;
  return <button onClick={onClick} style={s} disabled={disabled}>{children}</button>;
}

/* ── Author Ring ── */
export function AuthorRing({ name, size = 40, T }) {
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

/* ── Book Cover ── */
export function BookCover({ book, size = 52, T }) {
  return (
    <div style={{ width: size, minWidth: size, height: size * 1.4, background: `linear-gradient(160deg,${T.ndB}40,${T.bg3})`, border: `1px solid ${T.border}`, borderRadius: 4, overflow: "hidden", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {book.coverId ? <img src={`https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg`} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => e.target.style.display = "none"} />
        : <BeninMask size={size * 0.48} T={T} />}
    </div>
  );
}
