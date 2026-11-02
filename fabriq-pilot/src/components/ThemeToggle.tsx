'use client';

import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('fabriq-theme') as 'light' | 'dark' | null;
      if (stored) {
        setTheme(stored);
        document.documentElement.setAttribute('data-theme', stored);
      }
    } catch {}
  }, []);

  function toggle(value: 'light' | 'dark' | 'system') {
    setTheme(value);
    if (value === 'system') {
      document.documentElement.removeAttribute('data-theme');
      try { localStorage.removeItem('fabriq-theme'); } catch {}
    } else {
      document.documentElement.setAttribute('data-theme', value);
      try { localStorage.setItem('fabriq-theme', value); } catch {}
    }
  }

  return (
    <div className="flex gap-2">
      {(['light', 'dark', 'system'] as const).map((opt) => (
        <button
          key={opt}
          onClick={() => toggle(opt)}
          className="btn btn-sm"
          style={{
            background: theme === opt ? 'var(--primary)' : 'var(--surface-elev)',
            color: theme === opt ? '#fff' : 'var(--text-muted)',
            border: `1px solid ${theme === opt ? 'var(--primary)' : 'var(--border)'}`,
          }}
        >
          {opt === 'light' ? '☀️ Light' : opt === 'dark' ? '🌙 Dark' : '🖥️ System'}
        </button>
      ))}
    </div>
  );
}
