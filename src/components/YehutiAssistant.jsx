import React, { useState, useEffect, useRef } from "react";
import { callAI, getSavedCatalogue, formatCatalogueForAI } from "../utils/archive";
import { F } from "../styles/theme";

export function YehutiAssistant({ T, onClose, onNavigate }) {
  const [messages, setMessages] = useState(() => {
    try { return JSON.parse(localStorage.getItem('yehuti-chat-v1') || '[]'); } catch { return []; }
  });
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  useEffect(() => {
    localStorage.setItem('yehuti-chat-v1', JSON.stringify(messages));
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: 'user', content: input, timestamp: new Date().toISOString() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    const catalogue = getSavedCatalogue();
    const context = formatCatalogueForAI(catalogue);
    const systemPrompt = `You are Yehuti, the AI assistant for The Black Archive — a decolonial research platform. You help users explore their personal saved catalogue.
${context}
Your capabilities:
- Answer questions about saved books, images, links, maps, videos, notes
- Suggest related content from their archive
- Help them discover connections between topics
- Provide scholarly insights using decolonial frameworks
When users ask to "show me" specific items, respond with a JSON action like: 
{"action":"show","type":"books","filter":"Kongo"} or {"action":"show","type":"images","filter":"Egypt"}
Keep responses scholarly, warm, and concise. Centre African and diasporal perspectives.`;
    try {
      const response = await callAI(systemPrompt, input);
      const assistantMsg = { role: 'assistant', content: response, timestamp: new Date().toISOString() };
      setMessages(prev => [...prev, assistantMsg]);
      const actionMatch = response.match(/\{"action":"show"[^}]*\}/);
      if (actionMatch && onNavigate) {
        const action = JSON.parse(actionMatch[0]);
        if (action.type) onNavigate(action.type, action.filter);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.', timestamp: new Date().toISOString() }]);
    }
    setLoading(false);
  };
  const clearChat = () => { setMessages([]); localStorage.removeItem('yehuti-chat-v1'); };
  return (
    <div style={{ position: 'fixed', bottom: 20, right: 20, width: 380, height: 520, background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, boxShadow: '0 8px 32px rgba(0,0,0,0.3)', display: 'flex', flexDirection: 'column', zIndex: 2000, overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ padding: '12px 16px', background: T.isDark ? '#0a0906' : '#f5f0e8', borderBottom: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 20 }}>𓂀</span>
          <div>
            <div style={{ fontSize: 14, fontFamily: F.display, fontWeight: 600, color: T.txt0 }}>Yehuti Assistant</div>
            <div style={{ fontSize: 9, color: T.txt3 }}>Knows your saved archive</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <button onClick={clearChat} style={{ background: 'none', border: 'none', color: T.txt3, cursor: 'pointer', fontSize: 12 }} title="Clear chat">🗑</button>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: T.txt3, cursor: 'pointer', fontSize: 16 }}>×</button>
        </div>
      </div>
      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {messages.length === 0 && (
          <div style={{ textAlign: 'center', color: T.txt3, padding: '20px', fontSize: 12 }}>
            <p>📚 Ask me about your saved archive!</p>
            <p style={{ marginTop: 8, fontSize: 11 }}>Examples:<br />• "What books do I have on Kongo?"<br />• "Summarize my notes about Diop"<br />• "Show me saved images of ancient Egypt"</p>
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{ maxWidth: '80%', padding: '8px 12px', borderRadius: 12, background: msg.role === 'user' ? T.ndY : T.bg2, color: msg.role === 'user' ? T.bg0 : T.txt1, fontSize: 12, lineHeight: 1.5, fontFamily: F.body }}>
              {msg.content}
              {msg.image && <img src={msg.image} alt="Shared" style={{ maxWidth: '100%', maxHeight: 200, borderRadius: 8, marginTop: 6, display: 'block' }} />}
              <div style={{ fontSize: 8, color: T.txt3, marginTop: 4 }}>{new Date(msg.timestamp).toLocaleTimeString()}</div>
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{ padding: '8px 12px', borderRadius: 12, background: T.bg2, color: T.txt3, fontSize: 11 }}>Yehuti is thinking...</div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      {/* Input */}
      <div style={{ padding: '12px', borderTop: `1px solid ${T.border}`, display: 'flex', gap: 8, alignItems: 'flex-end' }}>
        <label style={{ padding: '8px 0', cursor: 'pointer', fontSize: 20, flexShrink: 0, lineHeight: 1 }} title="Attach image">
          <span>🖼</span>
          <input type="file" accept="image/*" style={{ display: 'none' }} onChange={e => {
            const file = e.target.files?.[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = ev => {
              setMessages(prev => [...prev, { role: 'user', content: '[Image shared]', image: ev.target.result, timestamp: new Date().toISOString() }]);
            };
            reader.readAsDataURL(file);
          }} />
        </label>
        <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()} placeholder="Ask about your saved archive..." style={{ flex: 1, padding: '10px 12px', background: T.bg2, border: `1px solid ${T.border}`, borderRadius: 20, color: T.txt0, fontSize: 12, fontFamily: F.body, outline: 'none' }} />
        <button onClick={sendMessage} disabled={loading} style={{ padding: '8px 16px', background: T.btnP, border: 'none', borderRadius: 20, color: T.btnPTx, cursor: loading ? 'not-allowed' : 'pointer', fontSize: 11, fontWeight: 600 }}>Send</button>
      </div>
    </div>
  );
}
