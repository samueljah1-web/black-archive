import React from "react";
import { BeninMask } from "./icons";
import { F } from "../styles/theme";

export const NAV_ITEMS = [
  { id: "all", icon: "⌂", label: "Home" },
  { id: "deepdive", icon: "◈", label: "Deep Dive" },
  { id: "books", icon: "📚", label: "Books" },
  { id: "videos", icon: "▶", label: "Videos" },
  { id: "images", icon: "🖼", label: "Images" },
  { id: "links", icon: "🔗", label: "Links" },
  { id: "maps", icon: "🗺", label: "Maps" },
  { id: "authors", icon: "✦", label: "Authors" },
  { id: "notes", icon: "✍", label: "Notes" },
  { id: "drive", icon: "☁", label: "Drive" },
  { id: "settings", icon: "⚙", label: "Settings" },
];

export function Sidebar({ T, tab, setTab, topic, setTopic, dark, setDark, collapsed, setCollapsed, TOPICS }) {
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
