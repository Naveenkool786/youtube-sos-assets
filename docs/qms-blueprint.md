# QMS Platform — Product Blueprint

**CONFIDENTIAL — Do Not Distribute Without Signed NDA**

---

| Field | Value |
|---|---|
| Document version | v1.0 |
| Date | 2026-10-18 |
| Author | Naveen Kool (Founder) |
| Status | Decisions locked — ready for engineering kickoff |
| Audience | Co-founders, prospective CTO, dev team leads, enterprise prospects (post-NDA) |

---

## 0. Executive Summary

A **multi-tenant, three-party Quality Management System (QMS) SaaS platform** for the apparel/garment supply chain. The platform connects three organization types — **Brands**, **Factories**, and **3rd-Party Inspection Companies** — into one data-sharing workflow, replacing fragmented email + Excel + legacy tools.

### Differentiators
- **Three-party native** — not a Brand-only or Factory-only tool
- **Visual-first** — Live Factory Floor Twin + animated training scenes (inspired by the viral "Cost of Quality" factory image)
- **Mobile-offline first** — Field Inspectors can work in disconnected factories for 48 hours
- **AI-augmented** — Claude-powered defect classification, natural-language analytics, anomaly detection
- **Enterprise-grade from day 1** — 4 data residency regions, 8 languages, SSO/SCIM, PAdES-signed reports

### Scale targets
| Metric | V1 Target | Year 3 |
|---|---|---|
| Brand tenants | 75 | 500 |
| Factory tenants | 500 | 5,000 |
| 3P tenants | 30 | 150 |
| Annual Recurring Revenue | $3.6M | $25M |
| Team | 17 people | 60–80 people |

### Investment thesis
- **TAM:** Global apparel industry = $1.5T; QA/QC software spend = ~$2–3B/yr growing double-digit
- **Fragmented market** — ETQ, MasterControl are generic; Qualio, Greenlight Guru are life-sciences; nothing is apparel-native + three-party
- **Timing** — Post-COVID brands demand supply-chain visibility; sustainability pressure; AI inflection

---

## Table of Contents

1. [Ecosystem & Portals](#1-ecosystem--portals)
2. [Org Chart & Roles](#2-org-chart--roles)
3. [Topic A — Data Model](#3-topic-a--data-model--entities)
4. [Topic B — Inspection Standards](#4-topic-b--inspection-standards)
5. [Topic C — Workflow State Machines](#5-topic-c--workflow-state-machines)
6. [Topic D — Notifications & Escalations](#6-topic-d--notifications--escalations)
7. [Topic E — Mobile vs Web Scope](#7-topic-e--mobile-vs-web-scope)
8. [Topic F — Offline Capability](#8-topic-f--offline-capability)
9. [Topic G — Analytics & KPIs](#9-topic-g--analytics--kpis)
10. [Topic H — Reporting & Export](#10-topic-h--reporting--export)
11. [Topic I — Animated Scenes](#11-topic-i--animated-scenes)
12. [Topic J — Integrations](#12-topic-j--integrations)
13. [Topic K — Billing & Pricing](#13-topic-k--billing--pricing)
14. [Topic L — Internationalization](#14-topic-l--internationalization)
15. [Technology Stack Summary](#15-technology-stack-summary)
16. [Build Roadmap](#16-build-roadmap)
17. [Team & Hiring Plan](#17-team--hiring-plan)
18. [Risks & Mitigations](#18-risks--mitigations)
19. [Open Questions & Next Steps](#19-open-questions--next-steps)

---

## 1. Ecosystem & Portals

### The Four-Party Ecosystem

```
                    ┌─────────────────────┐
                    │  PLATFORM / SaaS    │  ← Owner (Founder)
                    │  (Super Admin)      │
                    └──────────┬──────────┘
                               │ provisions tenants
         ┌─────────────────────┼─────────────────────┐
         ▼                     ▼                     ▼
   ┌───────────┐         ┌───────────┐         ┌───────────┐
   │  BRAND    │◄────────│  FACTORY  │────────►│ 3P INSPECT│
   │  Tenant   │  orders │  Tenant   │ submits │  Tenant   │
   └───────────┘         └───────────┘         └───────────┘
      (buyer)              (maker)              (verifier)
```

Each party = separate **tenant** with its own users, data, dashboards. They share Orders, Inspections, NCRs, CAPAs via controlled handoffs. Hard tenant isolation enforced at database row-level.

---

## 2. Org Chart & Roles

### Portal 1 — Platform (SaaS Operator)
```
Super Admin
├── Billing Manager
├── Customer Success Lead
│   └── Onboarding Specialist
└── Support Engineer
```

### Portal 2 — Brand
```
Brand Admin (Head of Quality / QA Director)
├── Sourcing Manager
│   └── Merchandiser
├── Quality Manager
│   ├── Quality Engineer
│   └── Technical Designer
├── Compliance Manager
│   └── Sustainability Officer
└── Viewer (Executive / Finance)
```

### Portal 3 — Factory
```
Factory Admin (General Manager / Plant Head)
├── Production Manager
│   ├── Line Supervisor
│   └── Line Operator (shared kiosk access)
├── Quality Head (Internal QA)
│   ├── Fabric Inspector
│   ├── Inline QC Inspector
│   ├── Final QC Inspector
│   └── Lab Technician
├── Planning Manager (PPC)
├── Warehouse / Store Keeper
└── HR & Compliance Officer
```

### Portal 4 — 3rd Party Inspection Company
```
3P Admin (Country Manager)
├── Operations Manager
│   ├── Scheduler / Coordinator
│   └── Field Inspector (mobile-first)
├── Technical Manager
│   └── Lab Analyst
└── Report Reviewer / QA
```

### Role Totals
| Portal | Roles |
|---|---|
| Platform | 5 |
| Brand | 9 |
| Factory | 12 |
| 3P | 7 |
| **Total** | **33 distinct roles** |

### Permission Model
- **Role-Based Access Control (RBAC)** — roles above
- **Attribute-Based rules (ABAC)** — e.g., inspector-on-this-PO only
- **4-eyes principle** — critical actions (close CAPA, approve 3P report, re-open NCR) require 2 users
- **Tenant isolation** — hard, row-level
- **Impersonation audit** — Platform Super Admin can view-as-user (logged, consent-based)

---

## 3. Topic A — Data Model & Entities

### Locked Decisions

| Decision | Choice |
|---|---|
| Style ownership | Brand-only (strict); Factory can only view assigned Styles |
| Defect granularity | POM/zone-level (collar, hem, side-seam, etc.) |
| Multi-brand factory | One Factory tenant, data walled per Brand relationship |
| CoQ data entry | Hybrid — rules auto-generate, authorized users can override |

### 9 Entity Domains

1. **Tenancy & Identity** (10 entities): Tenant, Organization, Facility, User, Role, Permission, UserRoleAssignment, AuditLog, Session, PartyRelationship
2. **Product & Spec** (10): Brand, Season, Style, TechPack, Measurement, Colorway, SizeScale, BOM, BOMItem, MaterialSupplier
3. **Orders & Production** (11): PurchaseOrder, POLine, ProductionOrder, Line, Operator, Operation, FabricRoll, CutLay, PackingList, Carton, Shipment
4. **Inspection** (12 incl. GarmentZone): InspectionBooking, InspectionAssignment, Inspection, FabricInspection, InlineInspection, FinalInspection, Defect, DefectCategory, GarmentZone, MeasurementResult, InspectionReport, InspectionEvidence
5. **NCR & CAPA** (5): NCR, NCRAttachment, CAPA, CAPAStep, RootCauseAnalysis
6. **Audits & Compliance** (8): AuditStandard, AuditTemplate, AuditQuestion, Audit, AuditResponse, AuditFinding, AuditScorecard, Certification
7. **Documents & Training** (7): Document, DocumentVersion, DocumentAcknowledgement, TrainingCourse, TrainingSession, TrainingRecord, CompetencyMatrix
8. **Lab Testing** (5): LabTestStandard, LabTestRequest, LabTestSample, LabTestResult, LabTestReport
9. **Cost of Quality** (3): CoQEntry, CoQRule, CoQSnapshot

### Cross-Cutting
- Multi-tenancy (every row has `tenant_id` + row-level security)
- Soft delete (`deleted_at`)
- Audit trail (trigger-based)
- Versioning (TechPacks, BOMs, Documents, Standards)
- i18n translation tables
- Polymorphic attachments & comments
- Notification engine
- Per-tenant numbering sequences

### Visual Relationship Map
```
Tenant → Organization → Facility → Line → Operator
                     → User → Role (perms)

Brand ──────── PO ──────── Factory
                │
                ├─ Style ─ TechPack ─ BOM ─ Colorway
                ├─ ProductionOrder ─ CutLay ─ FabricRoll
                ├─ InspectionBooking → Inspection → Defects → Report
                │                                   │
                │                                   └─ triggers NCR → CAPA
                ├─ LabTestRequest → LabTestResult → LabTestReport
                └─ PackingList → Carton → Shipment

Factory ─── Audit (by 3P or Brand) ─── Findings → CAPA
Factory ─── Certification
Factory ─── Document → Version → Acknowledgement
Factory ─── TrainingCourse → Session → Record

ANY event with $$ → CoQEntry → daily CoQSnapshot → dashboard
```

**Total Topic A entities: 71 → 75 (incl. 4 cross-cutting)**

---

## 4. Topic B — Inspection Standards

### Locked Decisions

| Decision | Choice |
|---|---|
| Fabric inspection systems | All four (4-point, 10-point, Graniteville, Dallas) |
| Standards override hierarchy | 3-tier (Platform → Brand → Style) |
| Lab test standards | Extended 30+ (full AATCC + ISO + ASTM catalog) |
| Defect taxonomy | Per-Brand custom + Platform baseline |

### AQL Sampling (ISO 2859-1 / ANSI Z1.4)
- All Inspection Levels: S-1 to S-4, I, II, III
- All AQL values: 0.065 to 10.0
- Single, Double, Multiple sampling plans
- Normal / Tightened / Reduced severity switching
- Three defect severity classes: Critical (AQL 0), Major (2.5 typical), Minor (4.0 typical)

### Fabric Inspection Systems
- **4-Point** (default, ~80% market share)
- **10-Point** (legacy US mills)
- **Graniteville** (niche)
- **Dallas** (niche)

Each system has its own scoring engine, point formula, and report template.

### Measurement Tolerance
- Global default, Brand standard, Style-specific, Size-progressive policies
- Within/warning/out-of-tolerance thresholds
- Auto-fail inspection if too many POMs out of tolerance

### Inspection Types Supported
Fabric, Trim, PPM, Pilot Run, Inline/DUPRO, End-of-Line, Final Random (FRI), Pre-Shipment (PSI), Container Loading (CLC), Lab Testing

### Lab Standards Library (30+ pre-seeded)
AATCC 61, 8, 16, 135, 81; ISO 105-C06, 105-X12, 105-B02, 5077, 13934, 13936, 12945, 3071, 14184, 14362; ASTM D5034, D434, D4970; CPSIA, EN 71-3, CPSC-CH-E1002, 16 CFR 1615/1616 — and more.

### Social Compliance Audits
BSCI, SA8000, WRAP, Sedex SMETA, Higg FEM/FSLM, ISO 9001/14001, GOTS, OEKO-TEX Standard 100

### Added Entities
FabricInspectionSystem, FabricDefectScoringRule, QualityStandardLevel, AQLPlan, MeasurementToleranceTable, BrandQualityProfile, StyleQualityProfile (+ StandardsResolver service)

**Running total: 82 entities**

---

## 5. Topic C — Workflow State Machines

### Locked Decisions

| Decision | Choice |
|---|---|
| SLA strictness | **Hard** — auto-reject/auto-fail on breach (with 10% grace period + extensions + holiday calendar) |
| NCR re-open | Brand Quality Mgr only, with written reason |
| CAPA effectiveness | **Automatic** re-check from defect data (30-day window) |
| NCR disputes | Escalate to Brand Compliance Mgr (Brand decides) |

### 9 State Machines

#### PO Lifecycle
`DRAFT → SENT_TO_FACTORY → ACCEPTED → IN_PRODUCTION → READY_FOR_INSPECTION → INSPECTION_PASSED/FAILED → SHIPPED → DELIVERED → CLOSED`

#### Inspection Booking → Execution
`REQUESTED → ASSIGNED → CONFIRMED → IN_PROGRESS → DRAFT_REPORT → UNDER_REVIEW → APPROVED → PUBLISHED`

#### NCR
`RAISED → ACKNOWLEDGED → INVESTIGATION → CAPA_SUBMITTED → VERIFYING → CLOSED` (with DISPUTED, ESCALATED, VOIDED branches)

#### CAPA
`DRAFT → IN_REVIEW → APPROVED → IN_EXECUTION → VERIFICATION → EFFECTIVE` (with ON_HOLD, OVERDUE, NOT_EFFECTIVE)

#### Audit
`PLANNED → SCHEDULED → IN_PROGRESS → FINDINGS_RECORDED → REPORT_ISSUED → REMEDIATION → CERTIFICATE_ISSUED → SURVEILLANCE`

#### Document / SOP
`DRAFT → IN_REVIEW → APPROVED → PUBLISHED → ACKNOWLEDGED → EFFECTIVE → SUPERSEDED → OBSOLETE`

#### Lab Test Request
`REQUESTED → SAMPLE_SENT → RECEIVED → IN_TESTING → RESULT_READY → REPORT_ISSUED → INVOICED`

#### Shipment
`READY → BOOKED → PICKED_UP → IN_TRANSIT → ARRIVED → CLEARED → DELIVERED`

### Cross-cutting rules
- No skipping states
- All transitions log actor + timestamp
- State-based permissions
- SLA breach triggers escalation
- Reverse transitions require 4-eyes
- System auto-transitions logged as "actor = System"
- Soft lock on in-flight entities (e.g., PO in IN_PRODUCTION can't have BOM edited)

### Added Entities
StateTransition, SLAConfig, SLABreachEvent, SLAExtension, HolidayCalendar, DisputeCase, ReopenRequest

**Running total: 89 entities**

---

## 6. Topic D — Notifications & Escalations

### Locked Decisions

| Decision | Choice |
|---|---|
| V1 channels | **Email + Push only** (WhatsApp/SMS deferred to Phase 2) |
| Preference control | Individual users + admin-enforced minimums |
| Escalation aggression | **Aggressive** — CC leadership early, within SLA |
| Email content | **Deep link only** — no sensitive data in email body |

### Event Catalog
~55 events across PO, Inspection, NCR, CAPA, Audit, Document, Lab Test, SLA, System

### Channel Defaults
| Priority | Channels |
|---|---|
| Low | In-app only |
| Normal | In-app + Email |
| High | In-app + Email + Push |
| Critical | All (bypasses quiet hours) |

### Escalation Ladders (Aggressive)
- **High priority**: T+0 primary + manager + dept head → T+30% re-ping → T+70% CC VP → T+SLA breach + Tenant Admin
- **Critical**: T+0 everyone up to VP → T+1h re-ping → T+4h external escalation

### Digest Options
Instant / Hourly / Morning (9am local) / Weekly summary (Mon 8am)

### Quiet Hours
Default 10pm–7am local time; Critical bypasses. Weekend + holiday calendar honored.

### Templates
~55 events × ~5 channels × 8 locales = ~2,200 template cells, maintained in Lokalise

### Added Entities
EventCatalog, NotificationTemplate, NotificationRecipientRule, EscalationLadder, EscalationState, NotificationPreference, NotificationDelivery, DigestSchedule, ChannelProvider, DeliveryFailureLog, AdminNotificationPolicy

**Running total: 100 entities**

---

## 7. Topic E — Mobile vs Web Scope

### Locked Decisions

| Decision | Choice |
|---|---|
| Mobile tech stack | **React Native** + React Web (shared TypeScript design system + business logic) |
| OS targets | **iOS + Android** from day 1 |
| Operator access | **Shared kiosks with PIN login** |
| Distribution | **Public app stores** (App Store + Play Store) + CodePush for hotfixes |

### Monorepo Structure
```
qms-platform/
├── apps/
│   ├── web/              # React + Next.js (all portals)
│   ├── mobile/           # React Native (iOS + Android)
│   └── api/              # Node.js backend (NestJS)
├── packages/
│   ├── shared/           # TypeScript types, validation
│   ├── ui/               # Design system (web + RN tokens)
│   ├── business-logic/   # QMS rules (AQL calc, scoring, workflows)
│   └── api-client/       # Generated SDK (OpenAPI)
└── seeds/                # Reference data (standards, defects)
```

### Mobile-first Roles (6)
Field Inspector, Fabric Inspector, Inline QC, Final QC, Line Supervisor, Warehouse

### Mobile-companion Roles (12)
All other hands-on roles get mobile app for notifications + urgent approvals

### Web-only Roles (8)
Analysts, designers, finance, support, admin console users

### Kiosk Mode Specifics
- iOS Guided Access / Android Lock Task Mode
- Multi-user PIN login
- 10-sec idle → PIN re-prompt
- Fast-switch between operators
- Session context logged to signed-in operator

### Added Entities
Device, DeviceEnrollment, KioskSession, OperatorPIN, AppVersionPolicy, FeatureFlag, PushSubscription

**Running total: 107 entities**

---

## 8. Topic F — Offline Capability

### Locked Decisions

| Decision | Choice |
|---|---|
| Offline window | **48 hours** strict guarantee |
| Photo retention | Delete originals after ACK; keep compressed thumbnail 7 days |
| Conflict resolution | **Fully automatic** (server wins; user shown read-only history) |
| Device encryption | **SQLCipher + biometric unlock** |

### Fully Offline Workflows
Field Inspection execution, Fabric Inspection (4-point), Inline QC, Final AQL, Barcode scan + lookup, SOP viewing + ack, Photo capture + annotation, Draft NCR creation

### On-Device Storage
- SQLite via WatermelonDB (lazy, observable)
- SQLCipher (AES-256) encryption
- Keys in iOS Keychain / Android Keystore
- Biometric unlock
- Target footprint: 1–3 GB per Field Inspector

### Sync Architecture
Hybrid Push + Pull with CRDT-friendly log; triggers on foreground, reconnect, 2-min interval, pull-to-refresh, submit, background opportunistic

### Media Upload Pipeline
- WebP compression on-device (Q=75, 1920px long edge)
- Chunked S3 multipart upload (5 MB chunks)
- Resumable with 5-attempt backoff
- Virus scan + EXIF strip + CDN distribution server-side

### Sync Status UX
🟢 Synced / 🟡 Syncing / 🔵 Offline N queued / 🔴 Failed / ⚫ Stale > 48h

### 48h Hard Cap
At 48h offline → blocking banner: "Please connect before starting a new inspection"

### Added Entities
OutboxItem, UploadQueue, SyncLog, LocalCache, BiometricUnlock (device); SyncSession, SyncConflict, UploadReceipt, DeviceStorageSnapshot, ArchivedDraft (server)

**Running total: 115 entities**

---

## 9. Topic G — Analytics & KPIs

### Locked Decisions

| Decision | Choice |
|---|---|
| Analytics stack | **Postgres (OLTP) + Snowflake/BigQuery (OLAP)** |
| Predictive / AI in v1 | **All three**: Anomaly detection + Claude photo classifier + NL querying |
| Freshness tiers | Real-time ops / hourly exec / daily benchmarks |
| Raw export | **Dashboards only** — no raw CSV/API export |

### Dashboards per Persona
- **Brand Executive**: CoQ gauges, supplier scorecard, shipment map, season performance
- **Brand Quality Mgr**: open NCRs, CAPA effectiveness, defect Pareto, inspection pipeline
- **Brand Compliance Mgr**: audit heatmap, cert expiry, social compliance score
- **Factory Admin**: PO kanban, defect rate, CAPA aging, line efficiency, CoQ
- **Factory Quality Head**: today's inspections, rolling defect rate, rejected lots, operator skill
- **3P Ops Mgr**: inspector utilization, bookings funnel, turnaround time, SLA compliance
- **Field Inspector (mobile)**: today's assignments, pending uploads, weekly quota
- **Platform Super Admin**: tenants, MRR, system health, churn risk

### Core KPIs
Quality: Defect Rate, DPHU, RFT, First Pass Yield, Rework Rate, AQL Pass Rate, Fabric 4-pt avg
Operational: Inspection Lead Time, NCR Resolution, CAPA Cycle Time, SLA Compliance
CoQ: CoQ as % of revenue, Prevention Investment Ratio, External Failure per Order, CoQ Trend
Compliance: Supplier Audit Pass Rate, Critical Findings, Cert Validity, SOP Ack Rate

### Drill-Down Hierarchy
CoQ → Category → Factory → Style → Defect → Line → Shift → Inspection → Individual Defect

### Predictive AI Features
1. **Anomaly detection** — statistical (z-score / IQR) alerts on defect rate spikes
2. **Claude photo classifier** — ML suggestion for defect categorization, always confirmed by inspector
3. **Natural language querying** — text-to-SQL (beta), tenant-scoped guardrails, read-only

### Alert Engine
User-defined thresholds → events flow into Topic D notification system

### Added Entities
MetricDefinition, DashboardLayout, Widget, AlertRule, AlertEvent, SavedView, AnalyticsExport, BenchmarkPool (Phase 2), PredictionModel, PredictionResult, AnomalyEvent, NLQQuery

**Running total: 127 entities**

---

## 10. Topic H — Reporting & Export

### Locked Decisions

| Decision | Choice |
|---|---|
| PDF stack | **Puppeteer** (headless Chrome) |
| Digital signing | **All 3P inspection + audit reports signed with PAdES** |
| Delivery methods | **Email+link + SFTP + S3 cross-account + Webhook+API** (all four) |
| Default retention | **7 years** (S3 lifecycle: Standard → IA → Glacier) |

### Report Categories
- **Operational**: Fabric, Inline, Final, PSI, Container Loading, Lab Test, NCR, CAPA, Audit, Certificate
- **Summary**: Weekly Quality, Monthly Supplier Scorecard, Quarterly CoQ, Season Review, Annual Compliance
- **Ad-hoc**: PO Status, Defect Analysis, Factory Performance, Investigation

### Template System
3-tier inheritance: PlatformDefault → BrandTemplate → PORequirement. Visual editor for Brand Admins; HTML/Handlebars for advanced.

### PDF Generation
Puppeteer worker pool (2–20 autoscaling), Chrome containers, 60s timeout, Redis+BullMQ queue, PAdES post-processing

### Digital Signatures
PAdES-compliant via Timestamp Authority (GlobalSign or DigiCert) — RFC 3161 timestamps, PKI certificates, HSM key management

### Watermarks
Public / Internal / Confidential / Restricted; dynamic per-viewer watermarks for leak tracing; signed URLs with 24h expiry

### Retention Tiers
S3 Standard (0–90d) → S3 Infrequent Access (91d–2yr) → S3 Glacier Deep Archive (2yr+); legal hold capability

### Added Entities
ReportTemplate, ReportTemplateVersion, ReportInstance, ReportSubscription, ReportDelivery, ReportSignature, ReportAccessLog, ReportVerification, RetentionPolicy, LegalHold

**Running total: 137 entities**

---

## 11. Topic I — Animated Scenes

### Locked Decisions

| Decision | Choice |
|---|---|
| Scene tech | **Hybrid: Rive + PixiJS + Three.js** |
| Live Floor Twin in v1 | **Yes — flagship feature** |
| Training scenes in v1 | **3 flagship** (AQL + 4-Point + CoQ) |
| Authoring | **Platform team only** (centralized quality) |

### V1 Scene Deliverables

| Scene | Tech | Target |
|---|---|---|
| **CoQ Hero** (interactive) | Rive | Marketing + exec dashboards |
| **AQL Sampling Walkthrough** | Rive | Field Inspector training |
| **4-Point Fabric Inspection** | Rive | Fabric Inspector training |
| **Live Factory Floor Twin** | PixiJS | Factory Admin + Brand Executive dashboards |
| **3D Garment Defect Viewer** | Three.js (R3F) | QA defect heatmap |

### Character Library
7 base characters (Fabric Inspector, Sewing Operator, Line Supervisor, QC Inspector, Field Inspector, Executive, Customer) × ethnicity + uniform variants; stylized 2.5D semi-realistic style (no uncanny valley)

### Live Floor Twin
- Factory data via WebSocket (10-sec updates)
- PixiJS scene: lines as sprites, operators as moving dots (anonymized), defect bubbles, status lights
- 60 FPS target on tablet (30 FPS min)
- Zoom levels: factory → section → single line

### CoQ Hero Scene
Split-screen (Prevention / Failure), live-data ticker, hover tooltips, scrubbable timeline, auto-play narrated mode

### Added Entities
Scene, SceneAsset, SceneTemplate, SceneInstance, CharacterLibrary, AnimationClip, SceneUsageAnalytics, TrainingSceneCompletion

**Running total: 145 entities**

---

## 12. Topic J — Integrations

### Locked Decisions

| Decision | Choice |
|---|---|
| V1 must-haves | **ALL FOUR**: API+Webhooks + SSO+SCIM + Slack+Teams + ERP(SAP)+PLM(Centric) |
| ERP/PLM delivery | **Pre-built connectors** (we build and maintain) |
| EDI | **V1 via SPS Commerce / TrueCommerce partner** |
| Zapier app | **Yes in v1** |

### Public API
- REST + OpenAPI 3.1 + versioned (`/v1/`)
- Rate limited per tenant
- Idempotency keys
- Cursor pagination
- Auto-generated SDKs (TS, Python, Java)

### Auth Methods
API Key, OAuth 2.0 (client credentials + user authorization), Personal Access Token

### Webhooks
~55 subscribable events, HMAC-SHA256 signatures, 6-retry backoff, dead-letter queue

### SSO
SAML 2.0 + OIDC + SCIM 2.0; JIT provisioning; role mapping; MFA inheritance. **Vendor: WorkOS** for fast enterprise readiness.

### V1 Integration Build List
| Integration | Weeks |
|---|---|
| Public REST API + OpenAPI | 4 |
| Webhooks | 2 |
| SSO (SAML + OIDC) | 3 |
| SCIM 2.0 | 2 |
| Slack app | 3 |
| Teams app | 3 |
| SAP S/4HANA connector | 6–8 |
| Centric PLM connector | 4–6 |
| SPS Commerce EDI | 3–4 |
| Zapier app | 2 |
| **Total** | **~30 weeks** |

### Integration Governance
Per-tenant rate limits, health dashboards, audit logs, IP allowlisting, mTLS for enterprise

### Added Entities
Integration, IntegrationConfig, IntegrationCredential, FieldMapping, SyncJob, SyncRun, WebhookEndpoint, WebhookDelivery, APIKey, APIKeyUsage, OAuthApp, OAuthToken, SSOProvider, SCIMEndpoint, EDIPartner, EDIMessage

**Running total: 161 entities**

---

## 13. Topic K — Billing & Pricing

### Locked Decisions

| Decision | Choice |
|---|---|
| Pricing model | **Brand-sponsored + per-party upgrade (Option D)** |
| Billing engine | **Stripe Billing** (migrate to Metronome/Lago at ~$2M ARR) |
| GTM | **Both** — self-serve + sales-led |
| Factory sponsored tier | **Full feature access** incl. Live Floor Twin + scenes |

### Pricing Table

| Tier | Price / mo | Includes |
|---|---|---|
| **Brand Starter** | $499 | 10 users, 50 POs/mo, 5 Factory invites, basic reports |
| **Brand Growth** | $2,499 | 50 users, 200 POs/mo, unlimited Factory invites, all core |
| **Brand Enterprise** | Custom $5–50k | Unlimited everything, SSO/SCIM, custom integrations, CSM |
| **Factory Free (sponsored)** | $0 | Full participation under Brand sponsorship |
| **Factory Pro** | $299 | Cross-brand dashboard, own CoQ, custom reports |
| **Factory Multi-Brand** | $999 | Unlimited brands, BI exports, dedicated support |
| **3P Starter** | $299 base + $5/insp | Up to 100 inspections included |
| **3P Growth** | $999 base + $3/insp | Up to 500 inspections included |
| **3P Enterprise** | Custom | Negotiated volume pricing |

Annual prepay: 15% off list. Multi-year: 20–25% off (enterprise).

### Add-ons
SAP ERP connector ($2k/mo + $20k impl), Centric PLM ($1.5k/mo + $15k impl), EDI ($500/mo per partner), Custom animated scene ($5–15k), Custom report template ($2.5k), Dedicated CSM ($3k/mo), 24/7 Premium support ($1.5k/mo), Snowflake data share ($2k/mo), Extra storage ($100/mo per TB), Extended retention ($200/mo per year added)

### Free Trial
30 days, Brand Growth plan features, up to 5 users, 20 POs, CSM onboarding call, no credit card required

### Payment Methods
Credit card (Stripe), ACH, SEPA, wire, invoice/Net 30 (enterprise), PO-based billing

### Currencies & Tax
14 currencies at launch (USD, EUR, GBP, INR, BDT, VND, CNY, HKD, SGD, JPY, AUD, CAD, BRL, MXN); Stripe Tax (SMB) + Avalara (enterprise)

### Year 1 ARR Target: ~$3.6M
- 5 Enterprise Brands × $20k/mo = $1.2M
- 20 Growth Brands × $2,499/mo = $600k
- 50 Starter Brands × $499/mo = $300k
- 100 Factories Pro × $299/mo = $360k
- 30 3Ps avg × ($999 + 300×$3) = $680k
- Add-ons & services = $500k

### Added Entities
Plan, PlanFeature, Subscription, SubscriptionItem, UsageEvent, UsageSnapshot, BillingPeriodSummary, Invoice, InvoiceLineItem, Payment, PaymentMethod, PromoCode, Discount, Credit, Dunning, TaxRate, TaxExemption, Contract, PriceOverride

**Running total: 180 entities**

---

## 14. Topic L — Internationalization

### Locked Decisions

| Decision | Choice |
|---|---|
| V1 languages | **All 8** (EN, ZH, BN, VI, HI, TR, ES, PT-BR) |
| Data residency | **US + EU + India + Singapore** at launch |
| Unit preference | Tenant default + user override |
| RTL support | **Build RTL-ready in v1** (Arabic/Hebrew content Phase 2) |

### 8 V1 Languages
English, Mandarin (zh-CN), Bengali (bn-BD), Vietnamese (vi-VN), Hindi (hi-IN), Turkish (tr-TR), Spanish (es), Portuguese (pt-BR)

### Translation Operations
- **Lokalise** as TMS; GitHub Action CI pipeline
- ~$50k initial translation + ~$80–100k/year ongoing
- In-locale QA reviewer per language (contractor)
- ICU MessageFormat for pluralization/gender
- Translation memory + glossary (QMS terms: AQL, DUPRO, 4-point, NCR, CAPA)

### 14 Currencies & Tax
Covered in Topic K

### Units of Measure
- Metric default, Imperial for US users
- Fabric-specific: GSM (universal), oz/yd² (US), points per 100 sq yds / sq m²
- Stored as SI units, converted at display

### Time & Date
- UTC storage everywhere
- `Intl.DateTimeFormat` for display
- Per-user timezone preference
- Factory-vs-Brand different TZ shown both in critical UI

### Address, Phone, Name Formatting
Per-country address formats; E.164 phone storage with libphonenumber validation; separate given/family/display name fields

### Data Residency Regions (4)
- **US (Virginia)** — AWS us-east-1
- **EU (Frankfurt)** — AWS eu-central-1
- **India (Mumbai)** — AWS ap-south-1
- **Singapore** — AWS ap-southeast-1

Each region: full Postgres + Snowflake + S3 + EKS/ECS + Puppeteer + monitoring. **Terraform IaC mandatory.**

### Regulatory
GDPR (EU), CCPA/CPRA (California), LGPD (Brazil), PIPL (China future), India DPDP Act, Singapore PDPA

### Fonts
Noto Sans family: CJK, Bengali, Devanagari, Arabic, Thai; subset per locale; variable fonts where available; preload critical scripts

### Added Entities
Locale, Translation, UserLocalePreference, TenantLocaleDefault, DataResidencyRegion, CountryRegulation, LocalizedTemplate, FXRate, FXRateHistory, AddressFormat

**Final entity total: 190 entities**

---

## 15. Technology Stack Summary

### Frontend
- **Web**: React 18+ + Next.js 15 + TypeScript + Tailwind CSS + shadcn/ui
- **Mobile**: React Native (New Architecture) + Expo SDK 54+
- **Design system**: Shared tokens (web + mobile)
- **Animation**: Rive + PixiJS + Three.js (React Three Fiber)
- **State**: React Query (server state) + Zustand (client state)
- **Offline**: WatermelonDB + SQLCipher
- **Forms**: react-hook-form + Zod validation

### Backend
- **API**: Node.js + NestJS + TypeScript
- **Database**: PostgreSQL 16+ (OLTP) with row-level security
- **Warehouse**: Snowflake (OLAP) — streaming via Debezium + Kafka
- **Cache**: Redis
- **Search**: Elasticsearch (optional for defect/document search)
- **Queue**: BullMQ (Redis) for background jobs
- **File storage**: AWS S3 with lifecycle policies
- **PDF**: Puppeteer workers (containerized)
- **AI**: Anthropic Claude API (classification, NL querying) with prompt caching

### Infrastructure
- **Cloud**: AWS (primary), multi-region (4 regions)
- **IaC**: Terraform
- **Containers**: Docker + Kubernetes (EKS) or ECS Fargate
- **CDN**: CloudFront
- **Monitoring**: Datadog or Grafana + Prometheus
- **Logging**: OpenSearch / CloudWatch
- **Secrets**: AWS Secrets Manager + Vault
- **CI/CD**: GitHub Actions

### Third-party Services
- **Auth / SSO**: WorkOS
- **Billing**: Stripe → migrate to Metronome / Lago at ~$2M ARR
- **Tax**: Stripe Tax + Avalara (enterprise)
- **Email**: SendGrid or Postmark
- **Push**: FCM (Android) + APNs (iOS)
- **SMS (future)**: Twilio
- **i18n TMS**: Lokalise
- **Error tracking**: Sentry
- **Analytics**: PostHog (product analytics)
- **Status page**: Statuspage.io or Better Stack
- **EDI VAN**: SPS Commerce
- **Timestamp Authority**: GlobalSign (PAdES signing)

---

## 16. Build Roadmap

### V1 Timeline: 12–15 months

#### Months 1–3: Foundation
- Monorepo setup, CI/CD, IaC for 4 regions
- Auth + Tenancy + Users + Roles
- Core data model: 1-tier Brand/Factory/3P
- Public API foundation
- SSO + SCIM (WorkOS)
- Basic web portal shells per party

#### Months 4–6: Core Workflows
- PO lifecycle (Topic C)
- Inspection booking + execution
- NCR + CAPA
- Document / SOP control
- Audit module
- Lab testing
- Reference data seeding (standards, defects, lab tests)
- Mobile app alpha (RN)

#### Months 7–9: Visibility + Intelligence
- Analytics dashboards (hourly refresh)
- CoQ engine
- Reporting (Puppeteer) + PAdES signing
- Notifications engine (Email + Push)
- Live Factory Floor Twin (PixiJS)
- First 3 animated scenes (Rive)
- Anomaly detection
- Offline mode (Topic F)

#### Months 10–12: Enterprise + Integrations
- SAP connector
- Centric PLM connector
- SPS Commerce EDI
- Slack + Teams apps
- Zapier app
- Snowflake data warehouse pipeline
- Claude photo classifier
- NL querying (beta)
- Full 8-language rollout
- Multi-region launch (US + EU + India + SG)

#### Months 13–15: Hardening + GTM
- Billing (Stripe)
- Full dunning + enterprise invoicing
- Public beta → GA launch
- Security audit (SOC 2 Type 1 start)
- First 10 paying tenants onboarded
- Documentation + Help Center

### Post-launch Phase 2 (Months 16+)
- WhatsApp notifications (SE Asia priority)
- Arabic / Hebrew RTL content
- Additional PLM/ERP connectors
- Benchmarking (opt-in cross-tenant)
- Marketplace (3P services, pre-built integrations)
- Advanced AI (predictive CoQ, auto-CAPA generation)
- No-code scene editor

---

## 17. Team & Hiring Plan

### V1 Team: 17 people

| Role | FTE | Rationale |
|---|---|---|
| **Founder / CEO** (You) | 1 | Vision, GTM, fundraising |
| CTO (hired month 1) | 1 | Architecture + hiring + culture |
| Backend engineers | 2 | NestJS, PostgreSQL, API |
| Web frontend engineers | 2 | React, Next.js, dashboards |
| Mobile engineers (RN) | 2 | iOS + Android, offline |
| Integration engineers | 2 | SAP, PLM, EDI, SSO |
| Full-stack engineer (billing/admin) | 1 | Stripe, admin console |
| DevOps / SRE | 1 | Multi-region infra, Terraform |
| QA engineer (automation + mobile) | 1 | Detox, Playwright, chaos tests |
| **Motion designer** (Rive + AE) | 1 | Scenes + micro-animations |
| **Product designer** (UX/UI) | 1 | Design system, portals |
| **Product manager** | 1 | Roadmap, specs, stakeholder mgmt |
| **Domain SME** (ex-garment QA) | 1 | Industry credibility, standards |
| **Customer success / onboarding** | 1 | Enterprise onboarding, support |

**Later additions (Months 10+):**
- Sales (2 — enterprise AE + SMB AE)
- Marketing (1)
- 3D artist (0.5)
- Legal / compliance (external counsel)

### Burn rate (approximate)
- US-based: $17 people × avg $120k loaded = $2M/yr
- Hybrid (US leadership + India/EU engineering): ~$1–1.2M/yr
- Infra + tooling + legal + translations: $300–500k/yr
- **Total year 1 burn: $1.5–2.5M**
- **18-month runway target: $3–5M seed round**

---

## 18. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| **Enterprise sales cycles longer than expected** | High | High | Dual GTM: SMB self-serve for cash flow + enterprise land-expand |
| **Brand-sponsored model: Factory adoption drops** | Medium | High | Dedicated Factory onboarding team; delight features; CSM support |
| **SAP connector v1 painful** | High | Medium | Price as professional services add-on; charge for pain |
| **Alert fatigue from aggressive escalation** | High | Medium | Prominent "mute 2h" button; strong in-app Priority Queue |
| **Multi-region infra costs eat margin** | Medium | High | Per-tier resource ceilings; monitor unit economics quarterly |
| **Hard SLAs cause legitimate work to fail** | Medium | High | 10% grace period; SLA extensions; holiday calendar |
| **48h offline too short for remote Vietnam/Bangladesh** | Medium | Medium | Temporary offline-extension admin tool |
| **CAPA auto-effectiveness check needs 6+ months data** | High | Low | Manual backup verification in year 1 |
| **Snowflake cost without revenue** | Medium | High | Negotiate startup credits; consider ClickHouse Cloud alternative |
| **NL querying hallucinates SQL** | High | High | Beta label, read-only, tenant-scoped, logged, kill-switch |
| **Rive vendor risk** | Low | Medium | Keep source files; Lottie fallback export |
| **App Store rejection delays** | Medium | Medium | CodePush/EAS for JS hotfixes; TestFlight beta pipeline |
| **China PIPL / India DPDP compliance evolving** | High | Medium | Local counsel on retainer; monitor regulations |
| **Translation debt as features ship** | High | Medium | "No feature ships without translations" rule; fallback to English |
| **Puppeteer memory leaks** | Medium | Medium | Fresh browser context per render; hourly worker recycle |
| **Field inspector loses biometric → data loss** | Low | High | Strong user education; mandatory sync before biometric changes |
| **Enterprise SSO outage = customers can't log in** | Low | Critical | Graceful degradation; status page; break-glass admin access |

---

## 19. Open Questions & Next Steps

### Open Questions
1. **Funding path**: Bootstrap, friends & family, or seed round from day 1?
2. **CTO vs Co-founder CTO**: Hire or recruit as equity co-founder?
3. **First anchor customer**: Do you have a Brand pilot committed, or is customer discovery still needed?
4. **Office / remote**: Fully remote, hybrid, or office in one hub?
5. **Legal entity**: Delaware C-corp (US funding), India PLC (local), Singapore (APAC)?
6. **Brand name**: Do you have a product name/domain locked?
7. **Advisor board**: Any industry veterans (ex-SGS, ex-Nike QA, ex-garment supply chain) you want to recruit?

### Immediate Next Steps (next 30 days)
1. ✅ Blueprint locked (this document)
2. ⏳ NDA templates finalized (lawyer review)
3. ⏳ Pitch deck v1 (10 slides) based on this blueprint
4. ⏳ Financial model (5-year projection, unit economics)
5. ⏳ Customer discovery interviews (10–20 brand QA heads, 10 factory GMs, 5 3P ops managers)
6. ⏳ Technical hiring plan + CTO candidate shortlist
7. ⏳ Legal entity setup
8. ⏳ Trademark + domain reservation

### Next Steps (30–90 days)
- Secure first anchor customer or LOI
- Close pre-seed or seed round
- Hire CTO + first 3–5 engineers
- Start v1 build

---

## Appendix A — Entity Count Summary

| Topic | Entities | Running Total |
|---|---|---|
| A — Data Model | 75 | 75 |
| B — Standards | +7 | 82 |
| C — State Machines | +7 | 89 |
| D — Notifications | +11 | 100 |
| E — Mobile vs Web | +7 | 107 |
| F — Offline | +8 | 115 |
| G — Analytics | +12 | 127 |
| H — Reporting | +10 | 137 |
| I — Animated Scenes | +8 | 145 |
| J — Integrations | +16 | 161 |
| K — Billing | +19 | 180 |
| L — i18n | +10 | **190** |

---

## Appendix B — Blueprint Decision Log

Every decision locked during the planning conversation is referenced in its topic section above. All decisions reviewable + revisable at next quarterly blueprint review.

---

## Appendix C — Glossary

- **AQL**: Acceptable Quality Level (ISO 2859-1 sampling standard)
- **BOM**: Bill of Materials
- **CAPA**: Corrective and Preventive Action
- **CoQ**: Cost of Quality
- **DPHU**: Defects Per Hundred Units
- **DUPRO**: During-Production Inspection (inline QC)
- **EDI**: Electronic Data Interchange
- **FRI**: Final Random Inspection
- **LIMS**: Laboratory Information Management System
- **MES**: Manufacturing Execution System
- **NCR**: Non-Conformance Report
- **OLAP / OLTP**: Online Analytical / Transaction Processing
- **PAdES**: PDF Advanced Electronic Signatures
- **PLM**: Product Lifecycle Management
- **POM**: Point of Measure
- **PPM**: Pre-Production Meeting
- **PSI**: Pre-Shipment Inspection
- **QMS**: Quality Management System
- **RBAC / ABAC**: Role / Attribute Based Access Control
- **RFT**: Right First Time
- **SCIM**: System for Cross-domain Identity Management
- **SLA**: Service Level Agreement
- **SOP**: Standard Operating Procedure
- **TMS**: Translation Management System
- **TSA**: Timestamp Authority

---

**End of Blueprint v1.0**

*Prepared confidentially for the Founder. Distribution restricted; share only under signed NDA.*
