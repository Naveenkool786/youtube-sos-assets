# Weftly — Prototype v2 (Supabase + Next.js + Vercel)

**Status:** Deployment-ready starter kit · October 2026
**Target:** You, deploying this in ~2 hours to a real multi-user staging environment
**Prerequisites:** Supabase account (free), Vercel account (free), Node 20+, Git

---

## What this is

Prototype v1 (the HTML artifact) is great for showing friends but has limits:
- Data lives in each browser's localStorage — no multi-user sync
- No real auth, no permissions
- No photo uploads, no persistence
- Can't share real data between brand/factory/inspector

**Prototype v2 fixes all of that** using a modern production-grade stack:

| Layer | Tech | Why |
|---|---|---|
| Frontend | Next.js 15 (App Router) + Tailwind | Modern, fast, deployable in 1 click |
| Backend | Supabase (Postgres + Auth + Storage + Realtime) | Managed Postgres with RLS, auth, file uploads |
| Auth | Supabase Auth (magic link + Google OAuth) | No password management |
| Hosting | Vercel | Free for up to pilot customers |
| AI | Anthropic Claude Haiku 4.5 API | Same model as v1 |
| Mobile | Progressive Web App (install prompt on iOS/Android) | No app store needed yet |

**Cost at pilot scale (5-10 brands):** $0-25/month total.

---

## What's in this folder

```
docs/prototype-v2/
├── README.md                   ← You are here
├── package.json                ← Next.js dependencies
├── .env.example                ← Environment variables template
├── supabase/
│   ├── schema.sql              ← Full database schema (run this first)
│   ├── policies.sql            ← Row-level security policies
│   └── seed.sql                ← Sample data for testing
└── src/
    ├── lib/
    │   └── supabase.ts         ← Supabase client setup
    ├── types/
    │   └── database.ts         ← TypeScript types from schema
    ├── app/
    │   ├── login/page.tsx      ← Login page example
    │   └── brand/dashboard/page.tsx  ← Brand dashboard example
    └── components/
        └── AIAssistant.tsx     ← Floating AI chat (same pattern as v1)
```

---

## Phase 1 — Supabase setup (30 min)

### 1.1 Create a new Supabase project

1. Go to **https://supabase.com** → Sign in with GitHub
2. Click **"New project"**
3. Project name: `weftly-pilot`
4. Database password: Generate strong, save in password manager
5. Region: Choose closest to your target users (e.g., `ap-south-1` for India, `ap-southeast-1` for SE Asia)
6. Wait ~2 minutes for provisioning

### 1.2 Run the schema SQL

1. In your Supabase dashboard, go to **SQL Editor**
2. Click **"New query"**
3. Open `supabase/schema.sql` from this folder
4. Copy entire file → paste into SQL Editor → click **"Run"**
5. You should see "Success. No rows returned."

### 1.3 Apply RLS policies

1. New SQL query
2. Open `supabase/policies.sql`
3. Copy → paste → run
4. These enforce that brands only see their own data, factories only see POs assigned to them, etc.

### 1.4 Add sample data

1. New SQL query
2. Open `supabase/seed.sql`
3. Copy → paste → run

This creates:
- 2 sample brands (ActiveWave, Blueberry Threads)
- 3 sample factories (Dhaka Textiles, Hanoi Garments, Phnom Milan)
- 2 sample 3P firms (Bureau Veritas, boutique "QC Sentinel")
- 10 sample POs with inspections and defects

### 1.5 Set up Auth

1. Go to **Authentication → Providers**
2. Enable **Email** (magic link): already on by default
3. Enable **Google OAuth** (recommended):
   - Follow Supabase's Google OAuth guide
   - Add your production domain + `localhost:3000` to redirect URIs
4. Go to **Authentication → URL Configuration**
   - Site URL: `http://localhost:3000` (for now)
   - You'll change this to your Vercel URL in Phase 3

### 1.6 Set up Storage

1. Go to **Storage** → **New bucket**
2. Name: `defect-photos`
3. Public: **No** (RLS handles access)
4. Repeat for `inspection-reports` and `pos-attachments`

### 1.7 Grab your keys

Go to **Settings → API** and copy:
- **Project URL** (e.g., `https://xxx.supabase.co`)
- **anon public key** (long JWT)
- **service_role key** (keep secret — never expose to browser)

Save these for Phase 2.

---

## Phase 2 — Local Next.js setup (30 min)

### 2.1 Create a new Next.js project

```bash
# In a new terminal, in your dev folder
npx create-next-app@15.0.3 weftly-pilot \
  --typescript --tailwind --app --src-dir --no-eslint --import-alias "@/*"
cd weftly-pilot
```

### 2.2 Install dependencies

```bash
npm install @supabase/ssr @supabase/supabase-js @anthropic-ai/sdk lucide-react date-fns zod
npm install -D supabase
```

Then copy the `package.json` from this folder as a reference for exact versions.

### 2.3 Add environment variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...  # Server-side only, never NEXT_PUBLIC

ANTHROPIC_API_KEY=sk-ant-...         # Server-side only

# Optional (Phase 3)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 2.4 Copy the starter files

Copy from this folder into your new project's `src/`:

```
docs/prototype-v2/src/lib/supabase.ts         → src/lib/supabase.ts
docs/prototype-v2/src/types/database.ts       → src/types/database.ts
docs/prototype-v2/src/app/login/page.tsx      → src/app/login/page.tsx
docs/prototype-v2/src/app/brand/dashboard/page.tsx → src/app/brand/dashboard/page.tsx
docs/prototype-v2/src/components/AIAssistant.tsx → src/components/AIAssistant.tsx
```

### 2.5 Run locally

```bash
npm run dev
```

Open `http://localhost:3000/login`. Enter your email → check inbox for the magic link → sign in.

You should now see the Brand Dashboard with real data from Supabase.

---

## Phase 3 — Vercel deployment (30 min)

### 3.1 Push to GitHub

```bash
git init
git add .
git commit -m "Weftly pilot v2 — initial deployment"
```

Create a new private repo on GitHub called `weftly-pilot`:

```bash
git remote add origin git@github.com:yourname/weftly-pilot.git
git push -u origin main
```

### 3.2 Deploy to Vercel

1. Go to **https://vercel.com** → Add New → Project
2. Import your `weftly-pilot` repo
3. Framework: Next.js (auto-detected)
4. **Environment Variables:** Paste all the keys from `.env.local`
5. Click **Deploy**

Wait ~2 minutes. Vercel gives you a URL like `weftly-pilot.vercel.app`.

### 3.3 Update Supabase auth URLs

1. Back in Supabase → Authentication → URL Configuration
2. Change Site URL to your Vercel URL
3. Add Vercel URL to redirect URIs
4. If using Google OAuth, update the Google Console redirect URIs too

### 3.4 Test it

Open your Vercel URL. Sign in. You should see the full flow working.

---

## Phase 4 — Rest of the build (iterative, 2-6 weeks)

What's in the starter: Brand dashboard, login, AI assistant.

What you still need to build (in priority order):

### Must-have for pilot (Week 1-2)
- [ ] Factory portal — Dashboard, PO list, defect logger
- [ ] Inspector portal — AQL sampling flow, inspection report
- [ ] PO creation form (brand side)
- [ ] NCR workflow with state machine
- [ ] File upload for defect photos (Supabase Storage)

### Nice-to-have for pilot (Week 3-4)
- [ ] Email notifications (Resend / Supabase Edge Functions)
- [ ] Mobile PWA install prompt
- [ ] Offline mode (IndexedDB queue)
- [ ] Role-based nav (hide features by role)

### Launch polish (Week 5-6)
- [ ] Custom domain (`weftly.app`)
- [ ] Error monitoring (Sentry free tier)
- [ ] Analytics (Vercel Analytics free tier)
- [ ] Legal: Terms, Privacy, DPA

### Build it with AI
Reference `docs/execution/ai-coding-playbook.md` — it has prompts for every one of these features.

The pattern: Open Cursor or Claude Code, point it at this folder, give it one feature at a time, run `npm run dev` to verify, commit, push. Vercel auto-deploys.

---

## Architecture notes

### Why Supabase (not Firebase)?

- **Postgres underneath** — same database you'll scale to for production (Firebase locks you to Firestore)
- **Row-level security** — brand/factory/inspector separation enforced at DB level, not app layer
- **Realtime subscriptions** — defect logged in factory shows up on brand dashboard in <1 second
- **Open source** — if we outgrow Supabase, we migrate the Postgres cluster to self-hosted
- **Edge Functions in TypeScript** — same language as the frontend
- **Cheaper than Firebase at scale**

### Why Next.js App Router?

- Server components let the brand dashboard render HTML on the server with live data (fast first paint)
- API routes let us proxy Claude API calls so the key is never exposed
- Middleware handles auth redirects cleanly
- Vercel deployment is one-click

### Security model (RLS)

Every table has policies that enforce:
- Brand users see only POs where `brand_id = auth_user.brand_id`
- Factory users see only POs where `factory_id = auth_user.factory_id`
- Inspector users see only inspections where `inspection_firm_id = auth_user.firm_id`
- Everyone can see master data (defect codes, countries) — read-only

See `supabase/policies.sql` for the full list.

### AI assistant pattern

The AI button in the bottom-right opens a chat panel. Each query:
1. Frontend sends question + conversation history to `/api/ai/chat`
2. Server fetches relevant data from Supabase (recent POs, defects, inspections) based on the user's role
3. Server builds a system prompt including user context + data
4. Server calls `claude-haiku-4-5` via `@anthropic-ai/sdk`
5. Response streams back to the frontend

The key file is `src/components/AIAssistant.tsx` + the API route in `src/app/api/ai/chat/route.ts`.

---

## Common issues & fixes

### "Row-level security policy violation"
You're trying to insert/read data without an authenticated session that has the right `role` claim. Check that the user's `profiles` row exists with the right `tenant_type` + `tenant_id`.

### Magic link doesn't arrive
Check Supabase email rate limits. In production, switch to **Resend** or **SendGrid** as the auth email provider.

### Vercel build fails
Usually a TypeScript error that passed in local dev. Run `npm run build` locally first.

### "Could not connect to Supabase"
Double-check `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set in Vercel env vars AND redeployed after setting.

### AI assistant returns 429
You've hit Anthropic rate limits. Check your API dashboard. For pilot: single API key with 10 req/min is plenty.

---

## When you're ready for production

Prototype v2 is designed for **pilot customers**, not scale. Before launching to 100+ brands:

- [ ] Add proper error monitoring (Sentry)
- [ ] Set up DB backups (Supabase does daily, but configure point-in-time recovery)
- [ ] Load test the AI endpoint (consider streaming with SSE)
- [ ] Add Stripe billing (per `docs/qms-blueprint.md` Topic K)
- [ ] Set up SSO for enterprise brands (WorkOS)
- [ ] Move to the full tech stack in `docs/qms-blueprint.md` (NestJS backend, dedicated Snowflake warehouse, etc.)

Prototype v2 is a bridge — not the destination.

---

## Support

Stuck? Reference files:
- `docs/qms-blueprint.md` — Master architecture
- `docs/execution/ai-coding-playbook.md` — AI-assisted build prompts
- `docs/execution/90-day-roadmap.md` — Weekly execution plan

Email: naveenkool786@gmail.com

**Confidential · Pre-launch · Stealth**
