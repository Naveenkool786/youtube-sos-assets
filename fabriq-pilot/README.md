# FABRIQ Pilot — Deployable QMS Prototype

**Status:** Build-verified, ready for Supabase + Vercel deployment  
**Stack:** Next.js 15 + Supabase (Postgres + Auth) + Tailwind + Claude AI

## What's Included

| Route | Description |
|---|---|
| `/login` | Magic link + Google OAuth login |
| `/` | Auto-routes to correct dashboard by role |
| `/brand/dashboard` | Brand portal — PO table, KPIs, CoQ |
| `/factory/dashboard` | Factory portal — PO list, defect stats |
| `/inspector/dashboard` | Inspector portal — inspection schedule |
| `/api/ai/chat` | AI assistant (Claude Haiku) |
| `/logout` | Sign out |

## Deploy in 3 Steps

### Step 1: Supabase (15 min)

1. Go to [supabase.com](https://supabase.com) → New project → name it `fabriq-pilot`
2. In **SQL Editor**, run these files in order:
   - `supabase/schema.sql` — creates all tables
   - `supabase/policies.sql` — row-level security
   - `supabase/seed.sql` — sample data (2 brands, 3 factories, 5 POs)
3. Go to **Storage** → create buckets: `defect-photos`, `inspection-reports`
4. Go to **Settings → API** → copy your **Project URL** and **anon key**

### Step 2: Vercel (10 min)

1. Push this folder to a new GitHub repo (or deploy from this monorepo's subfolder)
2. Go to [vercel.com](https://vercel.com) → Import → select your repo
3. Set **Root Directory** to `fabriq-pilot` (if deploying from this monorepo)
4. Add these **Environment Variables**:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   SUPABASE_SERVICE_ROLE_KEY=eyJ...
   ANTHROPIC_API_KEY=sk-ant-...
   NEXT_PUBLIC_SITE_URL=https://your-app.vercel.app
   ```
5. Deploy — takes ~2 minutes

### Step 3: Connect Auth

1. Back in Supabase → **Authentication → URL Configuration**
2. Set **Site URL** to your Vercel URL
3. Add Vercel URL to **Redirect URLs**
4. Sign up with your email → check inbox for magic link → you're in

## Cost

- **Supabase free tier**: 500MB DB, 1GB storage, 50K auth users
- **Vercel free tier**: 100GB bandwidth, serverless functions
- **Anthropic API**: ~$0.001/query with Haiku
- **Total at pilot scale**: $0-25/month

## Architecture

- Auth: Supabase magic link (email OTP) + Google OAuth
- RLS: Multi-tenant isolation at database level (brand/factory/inspector)
- AI: Server-side Claude Haiku via `/api/ai/chat` route
- PWA: Installable on mobile via manifest.json
- Middleware: Auth guard on all routes except `/login` and `/auth/callback`
