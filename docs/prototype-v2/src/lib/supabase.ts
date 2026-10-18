// Weftly — Supabase client setup (Next.js 15 App Router)
// Two clients: one for the browser, one for server components / route handlers.

import { createBrowserClient, createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { Database } from '@/types/database';

// -----------------------------------------------------------
// Browser client (use in client components / "use client")
// -----------------------------------------------------------
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}

// -----------------------------------------------------------
// Server client (use in server components, route handlers, server actions)
// -----------------------------------------------------------
export async function createServerSupabase() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Called from a server component — cookies cannot be set, which is fine.
            // The middleware will have refreshed the session on the server already.
          }
        },
      },
    },
  );
}

// -----------------------------------------------------------
// Service role client (server-side ONLY, bypasses RLS)
// Use ONLY in trusted server code (admin tasks, webhooks, cron jobs)
// -----------------------------------------------------------
export function createAdminClient() {
  const { createClient } = require('@supabase/supabase-js');
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );
}

// -----------------------------------------------------------
// Convenience: current user + profile in one call (server-side)
// -----------------------------------------------------------
export async function getCurrentUser() {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from('profiles')
    .select('*, tenant:tenants(*)')
    .eq('id', user.id)
    .single();

  return { user, profile };
}
