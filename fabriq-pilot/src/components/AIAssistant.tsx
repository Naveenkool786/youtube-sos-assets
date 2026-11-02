'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  async function send() {
    const q = input.trim();
    if (!q || loading) return;

    const newMessages: Message[] = [...messages, { role: 'user', content: q }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok) throw new Error(`AI error: ${res.status}`);
      const data = await res.json();
      setMessages([...newMessages, { role: 'assistant', content: data.reply }]);
    } catch {
      setMessages([
        ...newMessages,
        { role: 'assistant', content: "I couldn't reach the AI service right now. Try again in a moment." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open AI assistant"
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition z-30"
          style={{ background: 'var(--primary)', color: '#FFF' }}
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-3rem)] card shadow-2xl flex flex-col z-30" role="dialog" aria-label="AI assistant">
          <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: '1px solid var(--border)' }}>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold" style={{ background: 'var(--primary-soft)', color: 'var(--primary)' }}>AI</div>
              <div>
                <div className="font-semibold text-sm">FABRIQ Assistant</div>
                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Ask about your supply chain</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close" className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100" style={{ color: 'var(--text-muted)' }}>✕</button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar px-5 py-4 space-y-4" style={{ background: 'var(--bg)' }}>
            {messages.length === 0 && (
              <div className="text-center py-8">
                <p className="text-sm mb-3" style={{ color: 'var(--text-muted)' }}>Try asking…</p>
                <div className="space-y-2">
                  {['Show me our highest defect rates', 'Which factories had critical issues?', 'What is our Cost of Quality trend?', 'List open NCRs'].map((prompt) => (
                    <button key={prompt} onClick={() => setInput(prompt)}
                      className="block w-full px-3 py-2 text-left text-sm rounded-lg border transition hover:bg-white"
                      style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm ${m.role === 'user' ? 'rounded-br-sm' : 'rounded-bl-sm'}`}
                  style={{
                    background: m.role === 'user' ? 'var(--primary)' : 'var(--surface)',
                    color: m.role === 'user' ? '#FFF' : 'var(--text)',
                    border: m.role === 'assistant' ? '1px solid var(--border)' : 'none',
                    whiteSpace: 'pre-wrap',
                  }}>
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="px-4 py-2 rounded-2xl rounded-bl-sm text-sm" style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                  <span className="inline-flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--primary)' }} />
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--primary)', animationDelay: '0.2s' }} />
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--primary)', animationDelay: '0.4s' }} />
                  </span>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={(e) => { e.preventDefault(); send(); }} className="px-4 py-3 flex gap-2" style={{ borderTop: '1px solid var(--border)' }}>
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about defects, POs, NCRs…"
              className="flex-1 !rounded-full !px-4" disabled={loading} />
            <button type="submit" disabled={!input.trim() || loading} className="btn btn-primary btn-sm !rounded-full disabled:opacity-40">Send</button>
          </form>
        </div>
      )}
    </>
  );
}
