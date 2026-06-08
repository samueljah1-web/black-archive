import React, { useState } from "react";
import { Btn } from "./ui";
import { callAI } from "../utils/archive";
import { F } from "../styles/theme";

function KeyInput({ providerId, name, hint, settings, saveSettings, T }) {
  const [showKey, setShowKey] = useState(false);
  const key = (settings.apiKeys && settings.apiKeys[providerId]) || "";
  return (
    <div style={{ marginBottom: 9 }}>
      <div style={{ fontSize: 9, color: T.txt2, fontFamily: F.body, marginBottom: 3, display: "flex", justifyContent: "space-between" }}>
        <span>{name} Key</span>
        {key && <span style={{ color: T.ok, fontSize: 8 }}>{showKey ? "visible" : "••••"}</span>}
      </div>
      <div style={{ display: "flex", gap: 4 }}>
        <input type={showKey ? "text" : "password"} value={key} onChange={e => { const newKeys = { ...(settings.apiKeys || {}), [providerId]: e.target.value }; saveSettings({ apiKeys: newKeys }); }} placeholder={hint} style={{ flex: 1, padding: "7px 10px", background: T.bg1, border: `1px solid ${T.border}`, borderRadius: 5, color: T.txt0, fontSize: 11, fontFamily: "monospace", outline: "none" }} />
        <button onClick={() => setShowKey(s => !s)} style={{ padding: "5px 8px", background: "none", border: `1px solid ${T.border}`, borderRadius: 5, color: T.txt3, cursor: "pointer", fontSize: 11, fontFamily: F.body }}>{showKey ? "🙈" : "👁"}</button>
      </div>
    </div>
  );
}

export function SettingsScreen({ T }) {
  const [settings, setSettings] = useState(() => {
    try { return JSON.parse(localStorage.getItem('ai-settings') || '{"provider":"anthropic","model":"claude-sonnet-4-20250514","apiKeys":{}}'); } catch { return { provider: "anthropic", model: "claude-sonnet-4-20250514", apiKeys: {} }; }
  });
  const [testResult, setTestResult] = useState(null);
  const [testing, setTesting] = useState(false);
  const providers = [
    { id: "anthropic", name: "Anthropic Claude", models: ["claude-sonnet-4-20250514", "claude-opus-4-20250514", "claude-3-5-sonnet-20241022", "claude-3-opus-20240229", "claude-3-haiku-20240307"] },
    { id: "openai", name: "OpenAI", models: ["gpt-4.1", "gpt-4o", "gpt-4.1-mini", "gpt-4-turbo", "o4-mini", "o3"] },
    { id: "google", name: "Google Gemini", models: ["gemini-2.5-pro", "gemini-2.5-flash", "gemini-1.5-pro", "gemini-1.5-flash"] },
    { id: "mistral", name: "Mistral AI", models: ["mistral-large-latest", "mistral-medium-latest", "mistral-small-latest"] },
    { id: "deepseek", name: "DeepSeek", models: ["deepseek-chat", "deepseek-reasoner", "deepseek-v4-pro"] },
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
          <div style={{ fontSize: 10, color: T.txt3, fontFamily: F.body, marginBottom: 10 }}>🔐 Your API Keys (stored in your browser only):</div>
          <KeyInput providerId="anthropic" name="Anthropic" hint="sk-ant-..." settings={settings} saveSettings={saveSettings} T={T} />
          <KeyInput providerId="openai" name="OpenAI" hint="sk-..." settings={settings} saveSettings={saveSettings} T={T} />
          <KeyInput providerId="google" name="Google Gemini" hint="AIza..." settings={settings} saveSettings={saveSettings} T={T} />
          <KeyInput providerId="mistral" name="Mistral" hint="..." settings={settings} saveSettings={saveSettings} T={T} />
          <KeyInput providerId="deepseek" name="DeepSeek" hint="sk-..." settings={settings} saveSettings={saveSettings} T={T} />
          <div style={{ fontSize: 8, color: T.txt3, fontFamily: F.body, marginTop: 10, lineHeight: 1.5 }}>
            Keys used for direct API fallback. On Vercel, the proxy handles calls so keys stay on the server. Leave empty if deploying with Vercel env vars.
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
