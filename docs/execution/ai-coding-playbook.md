# AI Coding Playbook — Build the QMS Platform Yourself

**CONFIDENTIAL — Founder's Build-It-Yourself Guide**

| Field | Value |
|---|---|
| Version | v1.0 |
| Date | 2026-10-18 |
| Audience | Founder (non-engineer or part-engineer) building with AI coding tools |
| Goal | Take Prototype v1 → real production QMS without hiring a team first |
| Realistic timeline | MVP in 60-90 days, pilot-ready in 4-6 months |

---

## 1. Reality Check — What's Possible with AI Coding Tools in 2026

### What AI Coding Tools CAN Do (Realistically)
- ✅ Generate 70-90% of code you need
- ✅ Build CRUD apps + dashboards very fast
- ✅ Scaffold entire codebases in minutes
- ✅ Debug errors with your help
- ✅ Write tests, migrations, API routes
- ✅ Deploy to Vercel/Supabase in hours
- ✅ Build mobile apps (React Native) with same patterns
- ✅ Review code for bugs you'd miss

### What AI Coding Tools CANNOT Do (Yet)
- ❌ Make product decisions for you
- ❌ Understand your customers without explicit specs
- ❌ Handle complex cross-system state (SAP + Centric integrations)
- ❌ Replace a senior engineer's architectural judgment
- ❌ Debug production-level distributed system issues
- ❌ Handle enterprise security audits (SOC 2) without expert review
- ❌ Build truly novel algorithms (QA scoring systems need validation)

### The Realistic Trajectory

| Phase | What You Build | AI Can Do | Timeline |
|---|---|---|---|
| **Phase 1 — MVP** | Single-tenant web app, basic workflows | **90% AI, 10% you** | 30-60 days |
| **Phase 2 — Enhanced MVP** | Multi-tenant, mobile companion, offline | **70% AI, 30% you** | 60-120 days |
| **Phase 3 — Production** | SOC 2 ready, integrations, scale | **50% AI, 50% hired engineers** | 6-12 months |

**Honest assessment:** You can get to a **working pilot MVP solo** with AI tools. You cannot get to **production-ready SaaS** solo. Plan for CTO hire by Phase 3.

---

## 2. The AI Coding Tool Landscape (2026)

### Tier 1: Full-Stack App Builders (good for Phase 1)

| Tool | Best For | Cost | Verdict |
|---|---|---|---|
| **Lovable** (lovable.dev) | Fast full-stack apps with Supabase backend | $20-100/mo | 🏆 Best for your MVP |
| **Bolt.new** (StackBlitz) | Prototype → production transition | $20-50/mo | Strong alternative |
| **Replit Agent** | Full dev environment + AI | $25-100/mo | Good if you want IDE in browser |
| **v0.dev** (Vercel) | UI components + layouts | $20-200/mo | Best for UI, not full stack |

### Tier 2: AI-Assisted IDEs (for Phase 2 enhancement)

| Tool | Best For | Cost | Verdict |
|---|---|---|---|
| **Cursor** | Daily coding, large codebases | $20/mo | 🏆 Industry standard |
| **Claude Code (CLI)** | Agentic coding in terminal | API usage | 🏆 Best for complex refactors |
| **GitHub Copilot** | In-editor autocomplete | $10-39/mo | Good complement, not primary |
| **Windsurf** (Codeium) | Alt to Cursor | Free - $20/mo | Growing fast |
| **Zed** | Fast editor with AI | Free - $20/mo | Mac-focused |

### Tier 3: Backend-as-a-Service (what you'll host on)

| Service | What It Is | Cost | Verdict |
|---|---|---|---|
| **Supabase** | Postgres + Auth + Storage + Realtime + Edge Functions | Free - $25/mo start | 🏆 Perfect for MVP |
| **Clerk** | Auth with magic links, SSO, orgs | Free - $25/mo + usage | Better auth UX than Supabase |
| **Vercel** | Hosting + edge functions | Free - $20/mo | 🏆 Deploy target |
| **Resend** | Email sending | Free - $20/mo | Clean API, great DX |
| **Stripe** | Payments + billing | Pay per transaction | Industry standard |
| **UploadThing** | File uploads | Free - $20/mo | Easy S3 wrapper |
| **PostHog** | Analytics + session replay | Free - $450/mo | Great free tier |

### Recommended Starter Stack for QMS

```
Frontend:  Next.js 15 (App Router) + TypeScript + Tailwind + shadcn/ui
Backend:   Supabase (Postgres + Auth + Storage + Realtime)
Email:     Resend
File:      Supabase Storage OR UploadThing
Payments:  Stripe (Phase 2+)
Deploy:    Vercel
Mobile:    Expo (React Native) — same codebase patterns
AI:        Anthropic Claude API (defect classifier, NL querying)
```

**Why this stack:**
- ✅ Lovable/Bolt generate this stack natively
- ✅ Cursor/Claude Code work beautifully on Next.js + TS
- ✅ Supabase + Vercel = $0-50/mo until real traction
- ✅ Easy to hand over to a hired CTO (standard stack)
- ✅ Matches the blueprint's technology decisions

---

## 3. The 3-Phase Build Plan

### Phase 1 — MVP (Days 1-60)

**Goal:** Replace Prototype v1 with a multi-user web app pilot customers can actually use together.

**Scope (what's IN):**
- Multi-tenant auth (Brands + Factories + 3Ps as separate accounts)
- PO lifecycle workflow (end-to-end)
- Inspection execution (web + mobile-responsive)
- Defect logging with photo upload
- NCR → CAPA workflow (basic)
- CoQ dashboard (live-calculated)
- 3-persona dashboards
- Email notifications (via Resend)
- Deployed to Vercel + Supabase

**Scope (what's OUT):**
- Live Factory Floor Twin
- Advanced analytics / anomaly detection
- Mobile apps (iOS/Android — web mobile only for now)
- SAP / Centric / EDI integrations
- SSO / SCIM
- Multi-language (English only)
- Multi-region (US only)
- Offline capability
- AQL automation beyond basic lookup

**Build approach:**
- **Weeks 1-3:** Use **Lovable** to generate the full app from a detailed spec
- **Weeks 4-6:** Switch to **Cursor + Claude Code** to refine, add polish, deploy
- **Weeks 7-8:** Pilot customer feedback loop + bug fixes

### Phase 2 — Enhanced MVP (Days 61-120)

**Goal:** Add mobile companion + more sophisticated workflows for 10-20 paying customers.

**Scope added:**
- React Native (Expo) mobile app for Field Inspectors
- Offline inspection + sync
- Advanced CoQ analytics
- SSO (via Clerk or WorkOS)
- Email + Slack notifications
- Scheduled reports
- Basic AI defect classifier (Claude API)
- Simple SAP export (CSV)

**Build approach:**
- **Primary tool:** Cursor + Claude Code
- **Mobile:** Expo + React Native (Lovable + Bolt now support)
- **Days 61-80:** Mobile app for Inspector persona
- **Days 81-100:** SSO + offline sync + analytics
- **Days 101-120:** AI features + polish

### Phase 3 — Production SaaS (Days 121-365)

**Goal:** Enterprise-ready platform. Requires hiring humans. AI tools reduce workload but can't replace team.

**Scope added:**
- Multi-region deployment (US + EU + India + Singapore)
- SOC 2 Type I certification process
- Full integrations (SAP, Centric, SPS Commerce EDI)
- i18n (8 languages)
- Live Factory Floor Twin (PixiJS)
- Billing + Stripe + usage metering
- 24/7 monitoring + on-call
- Enterprise support SLAs
- Snowflake data warehouse

**Reality:** This is where you MUST hire 5-15 engineers. AI tools support, don't replace them.

---

## 4. Phase 1 Deep-Dive — Your First 60 Days

### Day 1-7: Specification + Setup

Before you write any prompt, you need a specification. Use the blueprint docs you already have.

**Deliverables for Week 1:**
- [ ] Create accounts: Supabase, Vercel, GitHub, Lovable (or Bolt), Claude Pro
- [ ] Install locally: Node.js 20+, Cursor, Git, GitHub CLI
- [ ] Reserve domain + set up DNS (even temp subdomain works)
- [ ] Write a focused Phase 1 spec document (use template below)

### Phase 1 Specification Template

Create `docs/specs/phase-1-mvp-spec.md`:

```markdown
# Phase 1 MVP Specification

## In-Scope Features
- Multi-tenant auth: Brand, Factory, 3P personas
- PO lifecycle: draft → sent → accepted → in_production → 
  ready_for_inspection → passed/failed → shipped → delivered
- Inspection: book → scheduled → in_progress → submitted → passed/failed
- Defect logging with severity (critical/major/minor) and zone
- NCR → CAPA basic workflow
- Role-based dashboards (3 personas)
- Email notifications on state changes
- Mobile-responsive (phone browser works)

## Explicit Out-of-Scope
- Native mobile apps
- Offline capability
- SAP/Centric/EDI integrations
- SSO (use Supabase Auth email+password + magic link only)
- Multi-language
- Multi-region
- Advanced analytics
- Live Floor Twin

## Technical Stack
- Next.js 15 (App Router) + TypeScript + Tailwind
- Supabase (Postgres with RLS + Auth + Storage)
- Deployed to Vercel
- Resend for email

## Database Schema (initial)
[Paste the Topic A data model from blueprint — simplified to ~30 tables]

## User Workflows (end-to-end)
[Paste the Topic C state machines — simplified]

## Design System
- Primary: #4f46e5 (indigo)
- Secondary: #8b5cf6 (purple)
- Success: #10b981, Warning: #f59e0b, Danger: #ef4444
- Font: Inter via Google Fonts
- Rounded corners: 8-12px
- Shadows: subtle (match prototype v1)
```

### Day 8-21: Generate Core App with Lovable

**Step-by-step:**

1. **Go to lovable.dev**
2. **Start a new project** named `qms-mvp`
3. **First prompt** (paste this verbatim):

```
Build a multi-tenant QMS (Quality Management System) web app for the 
apparel industry. Three user personas: Brand (buyer), Factory 
(manufacturer), and 3P Inspector (quality verifier).

Core features:
- Supabase Auth with email+password + magic link
- Multi-tenant: each user belongs to one organization
- Each organization has type: 'brand' | 'factory' | 'inspector'

Database tables needed:
1. organizations (id, name, type, country, created_at)
2. users (standard Supabase auth, extended with role, org_id, name)
3. styles (id, org_id/brand, code, name, category)
4. factories (id, org_id, name, country, city)
5. purchase_orders (id, number, brand_id, factory_id, style_id, 
   qty, state, created_at, due_date)
6. inspections (id, po_id, type, state, aql_level, inspector_id, 
   created_at)
7. defects (id, inspection_id, category, zone, severity, count, 
   created_at)
8. ncrs (id, po_id, inspection_id, severity, description, state, 
   created_at)
9. coq_entries (id, org_id, category, subcategory, amount, 
   po_id?, created_at)

PO states: draft, sent, accepted, in_production, 
  ready_for_inspection, passed, failed, shipped, delivered
Inspection states: scheduled, in_progress, submitted, passed, failed
NCR states: raised, acknowledged, resolved

Use Row-Level Security (RLS) policies so:
- Brands see only their own POs
- Factories see POs assigned to them
- Inspectors see only inspections they're assigned to
- Each party sees inspections/NCRs linked to their POs

UI: Clean modern SaaS design. Primary color #4f46e5 (indigo). 
Use Tailwind + shadcn/ui components. Mobile-responsive.

Build pages:
- /login (sign in with email)
- /onboarding (pick org type on first login)
- /dashboard (role-specific view)
- /pos (list with filters by state)
- /pos/[id] (detail with inspections + NCRs)
- /pos/new (create PO form, Brands only)
- /inspections
- /inspections/[id] (detail with defect logging)
- /ncrs
- /coq (dashboard with donut chart)

Start by generating the Supabase schema with RLS policies, then 
build the UI pages in order.
```

4. **Lovable will generate the schema + initial pages**
5. **Iterate** with follow-up prompts like:
   - "Add a Kanban board for POs with drag-to-change-state"
   - "Add email notifications when a PO changes state (use Resend)"
   - "Add photo upload to defects (use Supabase Storage)"

6. **When you hit limits** (Lovable gets confused on complex features), export to GitHub and switch to Cursor.

### Day 22-35: Refine with Cursor + Claude Code

Export your Lovable project to GitHub. Clone locally. Open in Cursor.

**Daily workflow:**
1. Open Cursor in the project folder
2. Use **Cmd+K** to make changes with Claude Sonnet (or Haiku for simple)
3. Use **Cmd+L** for chat-style conversations about the code
4. Use **Composer** (Cmd+I) for multi-file changes
5. Commit after every meaningful change

**Example prompts in Cursor:**

> "Add a notification bell icon in the top nav that shows unread 
> notification count. Clicking it opens a dropdown with recent 
> notifications. Store notifications in a new `notifications` 
> table with: id, user_id, title, body, link, read_at, created_at."

> "Add a 'Book Inspection' button on PO detail page that only 
> shows when state is 'ready_for_inspection' and the user is 
> factory role. Clicking creates an inspection in state 'scheduled' 
> and assigns it to an available inspector."

> "The CoQ donut chart should animate when values change. Also 
> add a '+ Add Entry' button that opens a modal form."

### Day 36-45: Deploy + Pilot Setup

- [ ] Deploy to Vercel (connect GitHub repo, automatic deploys on push)
- [ ] Set up custom domain (buy via Namecheap or similar; $10/yr)
- [ ] Set up Supabase production project (separate from dev)
- [ ] Set up Resend for transactional emails
- [ ] Smoke-test all workflows end-to-end
- [ ] Create seed data script for easy demo (optional)
- [ ] Record a 5-minute demo video (Loom or similar)

### Day 46-60: First Pilot Customer

- Onboard 1 pilot customer (your best discovery contact)
- Daily check-ins first week
- Weekly check-ins second week
- Fix bugs as they report
- Collect feature requests (don't build them yet)

---

## 5. Prompting Patterns That Work

### Pattern 1: Specification-First Prompting

❌ **Bad:** "Make the dashboard better"

✅ **Good:**
```
Update the Brand dashboard at /dashboard with these specific changes:
1. Add a 4th KPI card for "CoQ YTD" (calculate from coq_entries 
   table, sum all amounts for current year)
2. Make the KPI cards clickable — Open NCRs card links to /ncrs, 
   PO count links to /pos
3. Add a "Recent Activity" feed on the right showing last 10 
   state changes across POs, inspections, NCRs
4. Keep existing supplier scorecard table
Use the existing design system; don't change colors.
```

### Pattern 2: Context-Loading

Start sessions with:
> "Here's the data model for context: [paste schema]. The main 
> workflows are: [paste state machines]. Now I want to add..."

AI performs 10× better with explicit context than inferring from code.

### Pattern 3: Incremental Changes

❌ **Bad:** "Rewrite the inspection flow"

✅ **Good:** Break it into 5 prompts:
1. "First, add the sample calculation logic in /lib/aql.ts"
2. "Now update the Inspection form to call this function on state change"
3. "Next, add the pass/fail verdict display"
4. "Then wire up the Submit button to transition state"
5. "Finally, add the email notification trigger"

### Pattern 4: Tell AI What NOT to Change

> "Add tests for /lib/aql.ts. DO NOT modify any files in /app, 
> /components, or /lib/supabase."

Prevents AI from "helpfully" refactoring unrelated code.

### Pattern 5: Request Review Before Shipping

> "Before I commit this, review the changes you just made. Look 
> for: SQL injection risks, missing RLS policies, infinite loops, 
> race conditions, and missing error handling. Report any findings."

### Pattern 6: Use Reference Implementations

> "I want a drag-and-drop Kanban board. Reference: 
> https://github.com/vercel/platforms Build it the same way but 
> for our PO state model."

AI handles concrete references much better than abstract descriptions.

### Pattern 7: Explicit File Paths

❌ **Bad:** "Add validation to the form"

✅ **Good:** "Add Zod validation to the schema in 
`/lib/schemas/po.ts`. Then use it in `/app/pos/new/page.tsx` with 
react-hook-form's zodResolver."

---

## 6. Database Schema — Starter for Supabase

Save as `supabase/migrations/001_initial.sql` and run via Supabase CLI or dashboard.

```sql
-- Organizations
create type org_type as enum ('brand', 'factory', 'inspector');
create table organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type org_type not null,
  country text,
  city text,
  created_at timestamptz default now()
);

-- Users extended profile (links to auth.users)
create table user_profiles (
  id uuid primary key references auth.users on delete cascade,
  name text,
  org_id uuid references organizations on delete set null,
  role text default 'member',
  created_at timestamptz default now()
);

-- Styles (Brand-only)
create table styles (
  id uuid primary key default gen_random_uuid(),
  brand_id uuid references organizations on delete cascade,
  code text not null,
  name text not null,
  category text,
  created_at timestamptz default now()
);

-- Party relationships (Brand ↔ Factory ↔ 3P)
create table party_relationships (
  id uuid primary key default gen_random_uuid(),
  from_org uuid references organizations on delete cascade,
  to_org uuid references organizations on delete cascade,
  type text, -- 'brand_factory', 'brand_3p', 'factory_3p'
  status text default 'active',
  created_at timestamptz default now(),
  unique(from_org, to_org, type)
);

-- Purchase Orders
create type po_state as enum (
  'draft', 'sent', 'accepted', 'in_production', 
  'ready_for_inspection', 'passed', 'failed', 'shipped', 'delivered'
);
create table purchase_orders (
  id uuid primary key default gen_random_uuid(),
  number text unique not null,
  brand_id uuid references organizations on delete cascade,
  factory_id uuid references organizations on delete cascade,
  style_id uuid references styles,
  qty int not null,
  state po_state default 'draft',
  due_date date,
  created_by uuid references auth.users,
  created_at timestamptz default now()
);

-- Inspections
create type insp_state as enum (
  'scheduled', 'in_progress', 'submitted', 'passed', 'failed'
);
create table inspections (
  id uuid primary key default gen_random_uuid(),
  po_id uuid references purchase_orders on delete cascade,
  type text not null, -- 'fabric', 'inline', 'final', etc.
  state insp_state default 'scheduled',
  aql_level text default 'II',
  aql_major numeric default 2.5,
  aql_minor numeric default 4.0,
  inspector_id uuid references auth.users,
  created_at timestamptz default now()
);

-- Defects
create type severity as enum ('critical', 'major', 'minor');
create table defects (
  id uuid primary key default gen_random_uuid(),
  inspection_id uuid references inspections on delete cascade,
  category text not null,
  zone text,
  severity severity not null,
  count int default 1,
  photo_url text,
  created_at timestamptz default now()
);

-- NCRs
create type ncr_state as enum ('raised', 'acknowledged', 'investigating', 'resolved');
create table ncrs (
  id uuid primary key default gen_random_uuid(),
  po_id uuid references purchase_orders on delete cascade,
  inspection_id uuid references inspections,
  severity severity not null,
  description text,
  state ncr_state default 'raised',
  raised_by uuid references auth.users,
  created_at timestamptz default now()
);

-- CoQ entries
create type coq_category as enum ('prevention', 'appraisal', 'internal_failure', 'external_failure');
create table coq_entries (
  id uuid primary key default gen_random_uuid(),
  org_id uuid references organizations on delete cascade,
  category coq_category not null,
  subcategory text,
  amount numeric not null,
  po_id uuid references purchase_orders,
  created_at timestamptz default now()
);

-- Notifications
create table notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade,
  title text not null,
  body text,
  link text,
  read_at timestamptz,
  created_at timestamptz default now()
);

-- Enable RLS on all tables
alter table organizations enable row level security;
alter table user_profiles enable row level security;
alter table styles enable row level security;
alter table purchase_orders enable row level security;
alter table inspections enable row level security;
alter table defects enable row level security;
alter table ncrs enable row level security;
alter table coq_entries enable row level security;
alter table notifications enable row level security;

-- Example RLS policy: users can only see POs for their org
create policy "Users see own org POs"
on purchase_orders for select
using (
  brand_id in (select org_id from user_profiles where id = auth.uid())
  or factory_id in (select org_id from user_profiles where id = auth.uid())
);
```

**Have AI help write the remaining RLS policies.** They're tedious but critical.

---

## 7. Auth Setup — Supabase Auth

### Simplest approach for MVP

```ts
// /lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr';
export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
```

```ts
// /app/login/page.tsx
'use client';
import { supabase } from '@/lib/supabase/client';

export default function Login() {
  const sendLink = async (email: string) => {
    await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/dashboard` }
    });
    alert('Check your email for the magic link!');
  };
  // ... form UI
}
```

**That's it for MVP.** Magic link login = no passwords to manage, no reset flows, no bcrypt. Supabase handles everything.

**When to upgrade:** When your first enterprise customer asks for SSO, switch to Clerk or WorkOS.

---

## 8. Deployment — Vercel

### One-time setup
1. Push code to GitHub (private repo)
2. Go to vercel.com → Import Git Repository
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (server-only)
   - `RESEND_API_KEY`
4. Set custom domain (buy via Vercel or external)
5. Done — every git push auto-deploys

### Preview deployments
Every PR gets a unique URL. Great for showing pilot customers specific features.

---

## 9. Common AI Coding Mistakes (And How to Avoid Them)

### Mistake 1: Letting AI "Simplify" Existing Code
AI loves to refactor. One day it decides your state management is too complex and rewrites it. Suddenly nothing works.

**Fix:** Always say "DO NOT modify existing files unless I explicitly ask." Use git branches for experiments.

### Mistake 2: Hallucinated APIs
AI sometimes invents functions that don't exist (e.g., `supabase.auth.magicLink()` instead of `signInWithOtp`).

**Fix:** Always ask AI to verify against docs. Run the code immediately after generation.

### Mistake 3: Missing Error Handling
AI generates happy-path code. Edge cases get silent failures.

**Fix:** Prompt: "Add error handling and user-facing error messages for every failure mode."

### Mistake 4: Insecure Patterns
AI will cheerfully put API keys in client-side code, miss RLS policies, allow SQL injection.

**Fix:** Dedicated security pass prompts: "Review this file for security issues. Check for: exposed secrets, missing RLS, SQL injection, XSS."

### Mistake 5: Test Coverage Lies
AI generates tests that pass. Doesn't mean they test anything meaningful.

**Fix:** Actually read the tests. Add mutation testing. Ask AI to write failing tests first (TDD).

### Mistake 6: Scope Creep via "Helpful" Features
Ask AI to add a date picker. It adds date pickers, timezone handling, i18n, recurring dates, and a calendar sync.

**Fix:** Be explicit about scope boundaries. "Add ONLY a date picker. No timezone handling needed."

### Mistake 7: Framework Version Mismatches
AI sometimes generates React 18 code in a React 19 project. Or Next.js Pages Router code in App Router project.

**Fix:** Tell AI versions upfront: "This is Next.js 15 App Router, React 19, TypeScript 5.6. Use server components where appropriate."

### Mistake 8: Database Migration Chaos
AI generates "fix" migrations that drop columns, break foreign keys, lose data.

**Fix:** Review every migration manually. Test on a staging database. NEVER let AI auto-run migrations in production.

### Mistake 9: Accumulating Technical Debt Fast
AI gets you to "working" very fast. Six months later, your codebase is a tangle.

**Fix:** Weekly cleanup prompts: "Identify technical debt in this codebase. Prioritize top 3 items to fix next week."

### Mistake 10: Over-Engineering
AI sometimes adds Redux, Zustand, GraphQL, microservices to a simple CRUD app.

**Fix:** Explicitly state simplicity preference: "Use the simplest possible solution. Avoid new dependencies unless necessary."

---

## 10. When to STOP Using AI and Hire Humans

AI tools break down at certain complexity thresholds. Hire humans for:

| Challenge | Why AI Fails | Who to Hire |
|---|---|---|
| **Multi-tenant SaaS at scale** | Tenant isolation bugs are catastrophic; need expert eye | Senior backend engineer |
| **Mobile offline sync (CRDTs)** | AI doesn't understand distributed state deeply | Mobile systems engineer |
| **SAP/Enterprise integrations** | Each install is unique; needs domain experience | Integration consultant/engineer |
| **SOC 2 compliance** | AI doesn't know your actual security posture | Fractional CISO or compliance firm |
| **Database at > 1M rows** | Query optimization + indexing requires judgment | DBA or senior backend |
| **Real-time systems (WebSockets, PixiJS twin)** | AI generates fragile real-time code | Full-stack engineer with games/trading background |
| **AI/ML production** | Model deployment, drift monitoring, A/B testing | ML engineer |
| **Mobile app approval + rollout** | App store nuances, phased rollout, codepush | Mobile engineer |

**Rule of thumb:** AI tools can get you to **$500k ARR**. Hiring is required for the next 10x.

---

## 11. Monthly Tooling Cost Budget

### Phase 1 (Months 1-3)
| Tool | Cost/mo |
|---|---|
| Lovable (or Bolt) | $20-50 |
| Cursor Pro | $20 |
| Claude Pro | $20 |
| Supabase Free tier | $0 |
| Vercel Hobby | $0 |
| Resend Free tier | $0 |
| Domain | $1 (annualized) |
| **Total** | **~$70/mo** |

### Phase 2 (Months 4-6)
| Tool | Cost/mo |
|---|---|
| Previous tools | $70 |
| Supabase Pro | $25 |
| Vercel Pro | $20 |
| Expo Pro (for mobile builds) | $29 |
| Clerk (if needed for SSO) | $25 |
| Claude API (defect classifier) | $20-100 |
| **Total** | **~$190-270/mo** |

### Phase 3 (Months 7+) — Scaling with team
Costs ramp with team hiring + infrastructure (see financial model doc).

---

## 12. First-Week Project — Replace Prototype v1 with Real App

### Monday — Setup
- [ ] Create Lovable account
- [ ] Create Supabase project
- [ ] Create GitHub repo
- [ ] Install Cursor + Claude Code CLI
- [ ] Write Phase 1 spec document

### Tuesday — Generate
- [ ] Paste the master prompt into Lovable (from Section 4)
- [ ] Review generated schema; apply to Supabase
- [ ] Iterate 3-5 times on UI issues

### Wednesday — Export + Setup Local Dev
- [ ] Export Lovable project to GitHub
- [ ] Clone locally; `pnpm install`
- [ ] Set environment variables
- [ ] Run `pnpm dev`; verify locally

### Thursday — First Workflow
- [ ] Test: sign up as Brand, create a PO
- [ ] Switch user: sign up as Factory, accept PO
- [ ] Fix any bugs with Cursor
- [ ] Commit each change

### Friday — Deploy + Share
- [ ] Deploy to Vercel
- [ ] Buy domain, set up DNS
- [ ] Share with 1 pilot customer for first look
- [ ] Weekly review (what shipped, what broke, next week's priority)

---

## 13. Blueprint-to-Code Mapping Guide

Your blueprint has 190 entities. You can't build all of them in Phase 1. Here's the prioritization:

### Phase 1 Essential (30 entities)
From Topic A, Domains 1-5:
- Tenant, Organization, User, Role (4)
- Style, BOM (simplified) (2)
- PurchaseOrder, POLine (2)
- InspectionBooking, Inspection, Defect, DefectCategory, GarmentZone (5)
- NCR, CAPA (simplified) (2)
- Attachment, Comment, Notification (3)
+ supporting enums/types

### Phase 2 Add (30 more entities)
- Audit, AuditFinding, Certification (3)
- Document, DocumentVersion (2)
- LabTestRequest, LabTestResult (2)
- CoQEntry, CoQRule, CoQSnapshot (3)
- TrainingCourse, TrainingRecord (2)
+ Mobile sync tables (OutboxItem, UploadQueue)
+ Integration tables

### Phase 3+ Add Remaining (130 entities)
- Full workflow metadata (StateTransition, SLAConfig, Escalation)
- Full standards library
- Full notification/template system
- Analytics tables
- Billing + usage metering

**Rule:** If you can't explain why Phase 1 needs an entity in 1 sentence to a pilot customer, defer it.

---

## 14. Example Detailed Prompts for Hard Parts

### Prompt: AQL Sampling Logic

```
I need an AQL (Acceptable Quality Level) calculation function based on 
ISO 2859-1 Level II.

Create /lib/aql.ts with:

export type AQLResult = {
  sampleSize: number;
  codeLatter: string;
  acceptCriticalMax: number;
  acceptMajorMax: number;
  acceptMinorMax: number;
};

export function calculateAQL(
  lotSize: number,
  majorAQL: number = 2.5,
  minorAQL: number = 4.0
): AQLResult;

Use the standard ISO 2859-1 Level II lookup table. Return accept 
numbers for Critical (always 0), Major (based on majorAQL), and 
Minor (based on minorAQL).

Reference table:
- Lot size 2-15 → code A, sample 2
- Lot size 16-25 → code B, sample 3
- ... (complete the full table)

Include unit tests in /lib/__tests__/aql.test.ts covering 5 common 
lot sizes.
```

### Prompt: Multi-Tenant RLS Policy

```
I need Row-Level Security policies for the inspections table that 
enforce:

1. Users from the Brand organization can read inspections for POs 
   where brand_id = their org
2. Users from the Factory organization can read inspections for POs 
   where factory_id = their org
3. Inspectors can read inspections where inspector_id = their user_id
4. Only Inspectors can INSERT inspections (via book-inspection flow)
5. Only Inspectors can UPDATE their own inspections' state
6. Only Brand users can UPDATE state to 'passed' or 'failed'

Write these as Supabase RLS policies. Include a test SQL file that 
inserts test data and runs assertions to verify the policies work.
```

---

## 15. Monthly Health Checks (Do These)

### Every Monday Morning
- [ ] Pull latest from GitHub
- [ ] Review Vercel deployments (any failures?)
- [ ] Check Supabase database size + API usage
- [ ] Review error logs (Sentry or Vercel Analytics)
- [ ] Any pilot customer messages overnight?

### Every Friday Afternoon
- [ ] Commit outstanding work
- [ ] Deploy if ready
- [ ] Update your pipeline tracker
- [ ] Write weekly update email to advisors
- [ ] Review this week's AI tool costs

### Every Month-End
- [ ] Backup database (Supabase does this but verify)
- [ ] Rotate exposed secrets (if any)
- [ ] Review package security updates (`pnpm audit`)
- [ ] Measure page load times (should be < 2s)
- [ ] Review AI tool spend vs value delivered

---

## 16. The AI Coding Mindset Shift

### Old mindset (traditional dev)
- Write code → test → debug → ship (long cycles)
- "I need to learn Python/React first"
- "I need to understand every line"
- "I'll build it right the first time"

### AI coding mindset (what you need)
- Specify → generate → review → deploy (short cycles)
- "I need to specify clearly"
- "I need to understand what to trust vs verify"
- "I'll iterate on something working today"

### The 80/20 of Your Time
- **60%** writing clear specifications
- **20%** reviewing AI-generated code
- **10%** fixing AI mistakes
- **10%** reading AI tool docs

NOT:
- 90% writing code yourself

### What You Must Learn Yourself (Non-Negotiable)
- Basic SQL (for debugging Supabase queries)
- Basic React mental model (components, props, state)
- Basic Git (commit, push, branch, revert)
- How HTTP + REST works (requests, status codes)
- How auth works (sessions, cookies, tokens)
- How to read error messages

### What You Can Delegate to AI (Freely)
- Writing boilerplate
- Styling with Tailwind
- Form validation
- API endpoint scaffolding
- Database queries
- Component composition
- Test scaffolding

---

## 17. The Realistic 6-Month Progression

### Month 1
- Prototype v1 (localStorage) replaced by Supabase-backed MVP
- 1 pilot customer onboarded
- Deployed to Vercel

### Month 2  
- Workflows polished based on pilot feedback
- Email notifications live
- 2nd pilot customer onboarded

### Month 3
- Mobile companion (Expo React Native) for Inspector role
- AI defect classifier integrated
- 3-5 pilot customers paying tokens

### Month 4
- First paying customer at $500-2k/mo
- Advanced CoQ analytics
- Basic SAP CSV export

### Month 5
- Hire first engineer (via CTO or directly)
- Begin SOC 2 prep
- Multi-region planning

### Month 6
- 5-10 paying customers
- Series A conversations begin
- Platform solidifying for real scale

---

## 18. Your Monday Morning Starter

Open this document. Scroll to **Section 4 — Day 1-7**. Pick ONE task. Do it before 11 AM.

Not all of them. ONE.

Monday evening, report back to me (or your accountability partner).

Repeat for 60 days.

---

## 19. The Honest Truth

**You CAN build this with AI tools.** Many solo founders have shipped $1M+ ARR SaaS platforms using Cursor + Supabase + Vercel in 2026. The stack is proven.

**You CANNOT skip the hard parts.** No AI will do your pilot customer sales, your blueprint decisions, your pricing strategy, your NCR workflow design, your industry conversations.

**The best outcome:** You build a working MVP in 60 days, prove 2-3 pilot customers love it, raise seed round, hire your CTO, scale from there.

**The worst outcome:** You spend 6 months in "AI chat loops" without shipping. The symptom: more code, same output. The cure: ship something crappy weekly, learn, iterate.

---

## 20. Resources — Bookmark These

### Documentation
- [Supabase Docs](https://supabase.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Vercel Docs](https://vercel.com/docs)
- [Resend Docs](https://resend.com/docs)
- [Anthropic Claude API Docs](https://docs.anthropic.com)

### Learning
- [Build a SaaS with Next.js + Supabase](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs)
- [Theo's YouTube channel](https://youtube.com/@t3dotgg) — modern web dev
- [Lee Robinson](https://leerob.io) — Vercel VP, great Next.js tutorials
- [Josh Tried Coding](https://youtube.com/@joshtriedcoding) — modern SaaS patterns

### Communities
- Lovable Discord
- Cursor Community
- Supabase Discord
- Build in Public on Twitter/X (hashtag #buildinpublic)
- Indie Hackers (indiehackers.com)

### Reference Codebases to Study
- [Vercel/platforms](https://github.com/vercel/platforms) — multi-tenant Next.js
- [Supabase/examples](https://github.com/supabase/supabase/tree/master/examples) — RLS patterns
- [Make Me a Hacker News](https://github.com/vercel/next.js/tree/canary/examples) — Next.js examples
- [T3 Stack](https://create.t3.gg) — Next.js + tRPC + Prisma starter

---

**End of AI Coding Playbook v1.0**

*The tools don't matter. The specification matters. The willingness to ship ugly code and iterate matters. The customer feedback matters. Open Lovable or Cursor Monday morning. Specify. Generate. Deploy. Repeat.*
