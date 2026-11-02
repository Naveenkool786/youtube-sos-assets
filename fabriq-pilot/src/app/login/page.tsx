'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase-browser';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'password' | 'magic'>('password');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSignUp, setIsSignUp] = useState(false);

  async function handlePassword(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();

    if (isSignUp) {
      const { error: err } = await supabase.auth.signUp({ email, password });
      if (err) { setError(err.message); setLoading(false); return; }
      window.location.href = '/';
    } else {
      const { error: err } = await supabase.auth.signInWithPassword({ email, password });
      if (err) { setError(err.message); setLoading(false); return; }
      window.location.href = '/';
    }
  }

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error: err } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    if (err) { setError(err.message); setLoading(false); }
    else { setSent(true); setLoading(false); }
  }

  async function handleGoogle() {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6" style={{ background: 'var(--bg)' }}>
      <div className="w-full max-w-md card p-8 shadow-lg">
        <div className="flex items-center gap-2 mb-8">
          <svg viewBox="0 0 30 30" className="w-7 h-7" style={{ color: 'var(--primary)' }}>
            <rect x="3" y="3" width="24" height="24" rx="6" fill="currentColor" opacity="0.15" />
            <path d="M7 10 L15 6 L23 10 L15 14 Z" fill="currentColor" opacity="0.9" />
            <path d="M7 15 L15 11 L23 15 L15 19 Z" fill="currentColor" opacity="0.6" />
            <path d="M7 20 L15 16 L23 20 L15 24 Z" fill="currentColor" opacity="0.3" />
          </svg>
          <span className="font-semibold text-2xl" style={{ color: 'var(--text)' }}>FABRIQ</span>
        </div>

        {sent ? (
          <>
            <h1 className="text-2xl font-bold mb-2">Check your inbox</h1>
            <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
              We sent a magic link to <strong>{email}</strong>. Click it to sign in.
            </p>
            <button onClick={() => { setSent(false); setEmail(''); }} className="text-sm underline" style={{ color: 'var(--primary)' }}>
              Use a different email
            </button>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-2">
              {isSignUp ? 'Create account' : 'Sign in'}
            </h1>
            <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
              {mode === 'password' ? 'Enter your email and password.' : "We'll email you a magic link."}
            </p>

            <form onSubmit={mode === 'password' ? handlePassword : handleMagicLink} className="space-y-4">
              <div>
                <label htmlFor="email">Email address</label>
                <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com" />
              </div>

              {mode === 'password' && (
                <div>
                  <label htmlFor="password">Password</label>
                  <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••" minLength={6} />
                </div>
              )}

              {error && (
                <div className="text-sm p-3 rounded-lg" style={{ background: 'var(--danger-soft)', color: 'var(--danger)' }}>{error}</div>
              )}

              <button type="submit" disabled={loading} className="btn btn-primary w-full justify-center py-3 text-sm disabled:opacity-50">
                {loading ? 'Please wait…' : mode === 'password' ? (isSignUp ? 'Create account' : 'Sign in') : 'Send magic link'}
              </button>
            </form>

            {mode === 'password' && (
              <button onClick={() => setIsSignUp(!isSignUp)} className="w-full text-sm mt-3 underline" style={{ color: 'var(--primary)' }}>
                {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
              </button>
            )}

            <div className="my-5 flex items-center gap-3">
              <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
              <span className="text-xs uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>or</span>
              <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
            </div>

            <button onClick={() => setMode(mode === 'password' ? 'magic' : 'password')}
              className="w-full py-3 rounded-lg font-medium text-sm border transition hover:bg-slate-50 mb-3"
              style={{ borderColor: 'var(--border)', color: 'var(--text)' }}>
              {mode === 'password' ? 'Use magic link instead' : 'Use password instead'}
            </button>

            <button onClick={handleGoogle}
              className="w-full py-3 rounded-lg font-medium text-sm border transition hover:bg-slate-50"
              style={{ borderColor: 'var(--border)', color: 'var(--text)' }}>
              Continue with Google
            </button>
          </>
        )}

        <p className="mt-8 text-xs text-center" style={{ color: 'var(--text-muted)' }}>
          By signing in, you agree to FABRIQ&apos;s confidentiality terms.
        </p>
      </div>
    </main>
  );
}
