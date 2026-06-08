/* ── FONTS ── */
const _fl = document.createElement("link");
_fl.rel = "stylesheet";
_fl.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap";
document.head.appendChild(_fl);
export const F = { display: "'Cormorant Garamond',serif", body: "'DM Sans',sans-serif" };

export const DARK = {
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

export const LIGHT = {
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
