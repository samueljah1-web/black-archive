import React from "react";

export function BeninMask({ size = 44, T, glow = false }) {
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

export function NdStripe({ h = 4 }) {
  const s = ["#c0392b", "#1a3a8a", "#e8b800", "#1a6a2a", "#d4580a", "#e8dcc8", "#1a3a8a", "#c0392b", "#e8b800", "#1a6a2a", "#d4580a", "#c0392b", "#1a3a8a", "#e8b800", "#1a6a2a", "#e8dcc8", "#d4580a", "#1a3a8a", "#c0392b", "#e8b800"];
  return <div style={{ height: h, display: "flex", overflow: "hidden", flexShrink: 0 }}>{s.map((c, i) => <div key={i} style={{ flex: 1, background: c, opacity: i % 2 === 0 ? 1 : 0.7 }} />)}</div>;
}

export function NdDiamond({ s = 20, T }) {
  return (
    <svg width={s} height={s} viewBox="0 0 40 40" style={{ flexShrink: 0 }}>
      {[[2, 26, "#1a3a8a"], [6, 20, "#c0392b"], [10, 14, "#e8b800"], [14, 8, "#1a6a2a"], [17, 5, "#c0392b"]].map(([o, w, c], i) => (
        <rect key={i} x="20" y={o} width={w} height={w} rx="1" transform="rotate(45 20 20)" fill={c} opacity="0.9" />
      ))}
    </svg>
  );
}
