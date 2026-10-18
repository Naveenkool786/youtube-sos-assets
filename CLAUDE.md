# Project Context for Claude Code

## Who I Am
**Naveen Kool** — Founder/Owner of a stealth-stage QMS SaaS startup for the apparel/garment supply chain.
Email: naveenkool786@gmail.com

## What We're Building
A **three-party Quality Management System (QMS)** platform connecting:
- **Brands** (buyers like Zara, H&M, Nike)
- **Factories** (manufacturers)
- **3rd Party Inspection Companies** (SGS, Bureau Veritas, Intertek)

## The Master Blueprint
**👉 ALWAYS READ `docs/qms-blueprint.md` FIRST** when starting any new session.

That document is the single source of truth. It contains:
- All 12 topic decisions (Data Model, Standards, Workflows, Notifications, Mobile, Offline, Analytics, Reporting, Animated Scenes, Integrations, Billing, i18n)
- 190 database entities
- 33 roles across 4 portals
- Technology stack decisions
- 12–15 month build roadmap
- 17-person team plan
- Risks and open questions

## Key Locked Decisions (Quick Reference)
- **Industry**: Apparel/Garment (first vertical)
- **Tenancy**: Shared SaaS, tenant-isolated
- **Stack**: Node.js (NestJS) + PostgreSQL + Snowflake + React/Next.js + React Native + AWS (4 regions)
- **Pricing**: Brand-sponsored (Option D) + Stripe Billing
- **Launch languages**: 8 (EN, ZH, BN, VI, HI, TR, ES, PT-BR)
- **Mobile**: React Native, iOS + Android, shared kiosks with PIN
- **Offline window**: 48 hours strict, SQLCipher encrypted
- **Scene tech**: Hybrid Rive + PixiJS + Three.js
- **AI features**: Anomaly detection + Claude photo classifier + NL querying

## Status
- ✅ Blueprint v1.0 locked (October 2026)
- ⏳ Pre-build phase — pitch deck, CTO hire, anchor customer, seed round next

## Working Rules
- **Confidential**: This project is pre-launch and stealth. Treat all content as CONFIDENTIAL.
- **Don't rewrite the blueprint without explicit permission** — propose changes first.
- **Match blueprint decisions** when writing code, specs, or docs.
- **Branch**: Default dev branch is `claude/analyze-image-design-CAts6` until further notice.
- **Attribution**: Standard Co-Authored-By in commits is fine.

## Context on This Repo
This repo (`youtube-sos-assets`) was originally for YouTube content assets but is being repurposed as the planning/doc home for the QMS platform. Core engineering repo doesn't exist yet.

## Open Questions I Still Need to Answer
1. Funding path (bootstrap vs seed)
2. CTO hire vs co-founder CTO
3. Anchor customer identification
4. Legal entity structure
5. Product/company name
6. Office vs remote strategy
7. Advisor board recruitment

## How to Help Me
- Treat me as the Founder/CEO — strategic + commercial lens, not just technical
- Push back honestly on bad ideas
- Give me reality checks on scope, cost, timeline
- When I ask open questions, use `AskUserQuestion` with 2–4 structured options
- Always flag risks explicitly
- Keep sensitive materials off public services unless I approve
