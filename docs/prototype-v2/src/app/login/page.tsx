'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: err } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (err) {
      setError(err.message);
      setLoading(false);
    } else {
      setSent(true);
      setLoading(false);
    }
  }

  async function handleGoogle() {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6" style={{ background: '#FAF7F1' }}>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border" style={{ borderColor: '#E6DFCF' }}>
        {/* Brand */}
        <div className="flex items-center gap-2 mb-8">
          <svg viewBox="0 0 30 30" className="w-7 h-7" style={{ color: '#0F4238' }}>
            <rect x="3" y="3" width="24" height="24" rx="6" fill="currentColor" opacity="0.08" />
            <path d="M7 10 L15 6 L23 10 L15 14 Z" fill="currentColor" opacity="0.9" />
            <path d="M7 15 L15 11 L23 15 L15 19 Z" fill="currentColor" opacity="0.6" />
            <path d="M7 20 L15 16 L23 20 L15 24 Z" fill="currentColor" opacity="0.3" />
          </svg>
          <span className="font-serif text-2xl" style={{ color: '#171A17' }}>Weftly</span>
        </div>

        {!sent ? (
          <>
            <h1 className="font-serif text-3xl mb-2" style={{ color: '#171A17' }}>Sign in</h1>
            <p className="text-sm mb-6" style={{ color: '#5A635C' }}>
              We'll email you a magic link. No password required.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1" style={{ color: '#171A17' }}>
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
                  style={{ borderColor: '#DED3BC', background: '#FFF' }}
                />
              </div>

              {error && (
                <div className="text-sm p-3 rounded-lg" style={{ background: '#F3E2D4', color: '#C67952' }}>
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-full font-semibold text-sm transition disabled:opacity-50"
                style={{ background: '#0F4238', color: '#FFF' }}
              >
                {loading ? 'Sending…' : 'Send magic link'}
              </button>
            </form>

            <div className="my-6 flex items-center gap-3">
              <div className="flex-1 h-px" style={{ background: '#E6DFCF' }} />
              <span className="text-xs uppercase tracking-wider" style={{ color: '#5A635C' }}>or</span>
              <div className="flex-1 h-px" style={{ background: '#E6DFCF' }} />
            </div>

            <button
              onClick={handleGoogle}
              className="w-full py-3 rounded-full font-semibold text-sm border transition hover:bg-gray-50"
              style={{ borderColor: '#E6DFCF', color: '#171A17', background: '#FFF' }}
            >
              Continue with Google
            </button>
          </>
        ) : (
          <>
            <h1 className="font-serif text-3xl mb-2" style={{ color: '#171A17' }}>Check your inbox</h1>
            <p className="text-sm mb-6" style={{ color: '#5A635C' }}>
              We sent a magic link to <strong>{email}</strong>. Click it to sign in.
            </p>
            <button
              onClick={() => { setSent(false); setEmail(''); }}
              className="text-sm underline"
              style={{ color: '#0F4238' }}
            >
              Use a different email
            </button>
          </>
        )}

        <p className="mt-8 text-xs text-center" style={{ color: '#5A635C' }}>
          By signing in, you agree to Weftly's confidentiality terms.
        </p>
      </div>
    </main>
  );
}
