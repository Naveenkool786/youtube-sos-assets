import { createServerSupabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = await createServerSupabase();
  await supabase.auth.signOut();
  return NextResponse.redirect(new URL('/login', process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'));
}
