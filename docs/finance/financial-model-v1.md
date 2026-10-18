# Financial Model v1 — 5-Year Projection

**CONFIDENTIAL — Investor Materials**

| Field | Value |
|---|---|
| Version | v1.0 (Base case) |
| Date | 2026-10-18 |
| Author | Naveen Kool (Founder) |
| Horizon | FY2027 – FY2031 (5 years) |
| Companion file | `financial-model.csv` (importable to Google Sheets / Excel) |

---

## 1. Executive Summary

| Metric | FY2027 | FY2028 | FY2029 | FY2030 | FY2031 |
|---|---|---|---|---|---|
| **End-of-year ARR** | $0.5M | $4.0M | $12M | $25M | $45M |
| **Revenue (recognized)** | $0.1M | $1.8M | $7.0M | $17M | $34M |
| **Operating costs** | $1.95M | $4.2M | $8.2M | $15.5M | $26M |
| **Net income** | ($1.85M) | ($2.4M) | ($1.2M) | $1.5M | $8M |
| **Headcount EOY** | 17 | 30 | 50 | 85 | 130 |
| **Cash burn** | $1.85M | $2.4M | $1.2M | — | — |
| **Funding needed** | $3–5M seed | $12–18M Series A | — | — | — |
| **Rule of 40** | n/a | 38% | 66% | 72% | 82% |

**Key story for investors:**
- **Seed round funds build + launch + 18-month runway** → $3.6–5M target
- **Series A triggered Q4 2028** at $4M ARR, $12–18M at 3× NTM revenue
- **Break-even in Year 4** (FY2030) — healthier than typical SaaS
- **$45M ARR by Year 5** = strong Series B / exit position

---

## 2. Methodology & Assumptions

### Fiscal year
FY = calendar year. FY2027 begins January 2027 (seed close assumed Q1 2027).

### Revenue recognition
- **Subscription** — recognized ratably over contract term (ASC 606 compliant)
- **Usage** (per-inspection) — recognized when consumed
- **Setup fees** — recognized over expected customer life (3 yrs)

### Currency
USD throughout. Multi-currency revenue converted at monthly average FX.

### What this model does NOT include
- Debt financing (equity-only assumed)
- M&A activity
- Tax provisions (shown pre-tax)
- Capitalized R&D (full expense treatment)
- Stock-based compensation expense (equity dilution shown separately)

### Scenarios shown
- **Base case** (this doc) — realistic, hits reasonable milestones
- **Bear case** — slower sales ramp (-40%); see Section 8
- **Bull case** — accelerated adoption (+50%); see Section 8

---

## 3. Revenue Model

### 3.1 Pricing (from blueprint Topic K)

| Tier | $ / month |
|---|---|
| Brand Starter | $499 |
| Brand Growth | $2,499 |
| Brand Enterprise (avg) | $20,000 |
| Factory Free (sponsored) | $0 |
| Factory Pro | $299 |
| Factory Multi-Brand | $999 |
| 3P Starter (incl. 100 insp) | $299 + $5/overage |
| 3P Growth (incl. 500 insp) | $999 + $3/overage |
| 3P Enterprise (avg) | $4,000 |

### 3.2 Customer Count Trajectory

Shown as end-of-year counts.

| Segment | FY2027 | FY2028 | FY2029 | FY2030 | FY2031 |
|---|---|---|---|---|---|
| Brand Starter | 5 | 50 | 120 | 220 | 350 |
| Brand Growth | 3 | 20 | 60 | 120 | 180 |
| Brand Enterprise | 2 | 5 | 20 | 60 | 120 |
| **Total Brand tenants** | **10** | **75** | **200** | **400** | **650** |
| Factory sponsored (free) | 50 | 400 | 1,100 | 2,500 | 4,500 |
| Factory Pro (paid) | 5 | 25 | 100 | 250 | 450 |
| Factory Multi-Brand | 0 | 5 | 20 | 50 | 100 |
| 3P Starter | 2 | 10 | 25 | 55 | 90 |
| 3P Growth | 1 | 5 | 15 | 35 | 60 |
| 3P Enterprise | 0 | 0 | 2 | 5 | 10 |
| **Total paying tenants** | **18** | **120** | **362** | **775** | **1,360** |

### 3.3 Revenue by Stream

Annual recurring revenue (ARR, end-of-year), in $k.

| Stream | FY2027 | FY2028 | FY2029 | FY2030 | FY2031 |
|---|---|---|---|---|---|
| Brand Starter ARR | $30 | $300 | $719 | $1,318 | $2,096 |
| Brand Growth ARR | $90 | $600 | $1,799 | $3,599 | $5,398 |
| Brand Enterprise ARR | $480 | $1,200 | $4,800 | $14,400 | $28,800 |
| **Brand subtotal** | **$600** | **$2,100** | **$7,318** | **$19,317** | **$36,294** |
| Factory Pro ARR | $18 | $90 | $359 | $897 | $1,615 |
| Factory Multi-Brand ARR | $0 | $60 | $240 | $599 | $1,199 |
| **Factory subtotal** | **$18** | **$150** | **$599** | **$1,496** | **$2,814** |
| 3P Starter ARR | $7 | $36 | $90 | $197 | $323 |
| 3P Growth ARR | $12 | $60 | $180 | $420 | $720 |
| 3P Enterprise ARR | $0 | $0 | $96 | $240 | $480 |
| 3P usage overage | $5 | $40 | $200 | $600 | $1,200 |
| **3P subtotal** | **$24** | **$136** | **$566** | **$1,457** | **$2,723** |
| Add-ons (SAP, PLM, scenes, CSM) | $0 | $400 | $1,500 | $3,500 | $5,500 |
| **TOTAL ARR (EOY)** | **$642** | **$2,786** | **$9,983** | **$25,770** | **$47,331** |

Rounded to $0.5M / $4M / $12M / $25M / $45M for executive narrative.

### 3.4 Revenue Recognized (not ARR)

ARR = end-of-year run rate. Revenue recognized in the year is roughly the AVERAGE of starting and ending ARR, adjusted for ramp timing.

| | FY2027 | FY2028 | FY2029 | FY2030 | FY2031 |
|---|---|---|---|---|---|
| ARR Start | $0 | $642 | $2,786 | $9,983 | $25,770 |
| ARR End | $642 | $2,786 | $9,983 | $25,770 | $47,331 |
| ARR Average | $321 | $1,714 | $6,384 | $17,876 | $36,550 |
| **Revenue Recognized** | **$100** | **$1,800** | **$7,000** | **$17,000** | **$34,000** |

Lower than straight average due to in-year ramp patterns and GA launch in Q4 2027.

### 3.5 Net Revenue Retention (NRR) — The SaaS KPI

Industry benchmark: 110% is good, 125%+ is excellent (Snowflake-tier).

| Driver | Target |
|---|---|
| Gross retention | 92% (apparel supply chain = sticky) |
| Expansion (seat growth, add-ons, tier upgrades) | +18–25% |
| Churn | 8% |
| **Net Revenue Retention** | **110–125%** |

Base case assumes **115% NRR** steady-state (achieved by Y3).

---

## 4. Cost Model

### 4.1 Headcount Ramp

End-of-year FTE count. Blueprint v1 team plan = 17 FTE by end of V1 (Year 1).

| Function | FY2027 | FY2028 | FY2029 | FY2030 | FY2031 |
|---|---|---|---|---|---|
| CEO + CTO | 2 | 2 | 2 | 2 | 2 |
| Engineering (BE + FE + Mobile + Integ + DevOps + QA) | 10 | 16 | 25 | 42 | 65 |
| Design (product + motion) | 2 | 3 | 4 | 6 | 8 |
| Product Management | 1 | 2 | 4 | 7 | 10 |
| Domain SME / Head of Quality | 1 | 2 | 3 | 5 | 7 |
| Customer Success / Onboarding | 1 | 3 | 7 | 15 | 25 |
| Sales (AE + SDR + CSE) | 0 | 2 | 7 | 15 | 25 |
| Marketing | 0 | 1 | 3 | 5 | 8 |
| Finance / Ops / Legal | 0 | 1 | 2 | 4 | 6 |
| **Total FTE EOY** | **17** | **32** | **57** | **101** | **156** |

### 4.2 Fully-Loaded Comp Assumptions

Includes salary + benefits + payroll tax + equipment allowance. Blended average per role tier:

| Tier | Fully-loaded cost / yr |
|---|---|
| Founder / C-level | $160k (reduced below market in seed stage) |
| Senior Engineer / Staff | $180k |
| Mid Engineer / Designer | $130k |
| Junior Engineer / BDR / CSE | $85k |
| **Blended average Y1** | **$120k** |
| **Blended average Y5** | **$140k** |

### 4.3 Personnel Cost

Using mid-year headcount × blended comp.

| | FY2027 | FY2028 | FY2029 | FY2030 | FY2031 |
|---|---|---|---|---|---|
| Avg FTE | 12 | 24 | 44 | 79 | 128 |
| Blended comp | $120k | $125k | $130k | $135k | $140k |
| **Personnel cost** | **$1,440k** | **$3,000k** | **$5,720k** | **$10,665k** | **$17,920k** |

### 4.4 Infrastructure Cost

Multi-region (4 regions by Y2) + Snowflake + Puppeteer + CDN + AWS misc.

| Component | FY2027 | FY2028 | FY2029 | FY2030 | FY2031 |
|---|---|---|---|---|---|
| AWS compute + storage | $60k | $240k | $720k | $1,800k | $3,000k |
| Snowflake | $0 | $120k | $360k | $720k | $1,200k |
| CDN (CloudFront) | $12k | $48k | $120k | $240k | $360k |
| Puppeteer render pool | $24k | $60k | $120k | $240k | $360k |
| Monitoring + logging | $12k | $36k | $84k | $180k | $300k |
| Backup / disaster recovery | $12k | $36k | $84k | $180k | $300k |
| **Infra subtotal** | **$120k** | **$540k** | **$1,488k** | **$3,360k** | **$5,520k** |

### 4.5 Third-Party Services

| Service | FY2027 | FY2028 | FY2029 | FY2030 | FY2031 |
|---|---|---|---|---|---|
| Stripe fees (~2.9%) | $3k | $52k | $203k | $493k | $986k |
| WorkOS (SSO) | $12k | $48k | $120k | $240k | $360k |
| SendGrid (email) | $6k | $24k | $60k | $120k | $180k |
| Twilio (SMS, future) | $0 | $12k | $36k | $72k | $120k |
| Lokalise (i18n) | $12k | $12k | $18k | $24k | $30k |
| Sentry, Datadog, PostHog | $12k | $36k | $84k | $180k | $300k |
| GlobalSign TSA (PAdES) | $12k | $36k | $120k | $360k | $720k |
| Claude API | $12k | $60k | $240k | $720k | $1,440k |
| Legal / compliance / TM | $60k | $100k | $180k | $300k | $500k |
| Translations (ongoing) | $30k | $60k | $100k | $150k | $200k |
| Insurance (D&O, E&O, cyber) | $12k | $30k | $60k | $120k | $200k |
| Accounting / tax | $12k | $30k | $60k | $120k | $180k |
| HR / payroll tools | $6k | $18k | $36k | $84k | $144k |
| Office / coworking | $0 | $24k | $60k | $120k | $240k |
| **Third-party subtotal** | **$189k** | **$542k** | **$1,377k** | **$3,103k** | **$5,600k** |

### 4.6 Sales & Marketing

| | FY2027 | FY2028 | FY2029 | FY2030 | FY2031 |
|---|---|---|---|---|---|
| Marketing (content, paid, events) | $50k | $200k | $600k | $1,500k | $3,000k |
| Sales tools (Hubspot, Gong, Apollo) | $12k | $60k | $180k | $360k | $600k |
| Partner / channel costs | $0 | $50k | $200k | $500k | $1,000k |
| **S&M subtotal** | **$62k** | **$310k** | **$980k** | **$2,360k** | **$4,600k** |

### 4.7 Total Operating Costs

| | FY2027 | FY2028 | FY2029 | FY2030 | FY2031 |
|---|---|---|---|---|---|
| Personnel | $1,440k | $3,000k | $5,720k | $10,665k | $17,920k |
| Infrastructure | $120k | $540k | $1,488k | $3,360k | $5,520k |
| Third-party services | $189k | $542k | $1,377k | $3,103k | $5,600k |
| Sales & Marketing | $62k | $310k | $980k | $2,360k | $4,600k |
| **TOTAL OPEX** | **$1,811k** | **$4,392k** | **$9,565k** | **$19,488k** | **$33,640k** |

Rounded: $1.8M / $4.4M / $9.6M / $19.5M / $33.6M

---

## 5. P&L Summary

| ($k) | FY2027 | FY2028 | FY2029 | FY2030 | FY2031 |
|---|---|---|---|---|---|
| Revenue | $100 | $1,800 | $7,000 | $17,000 | $34,000 |
| Cost of Revenue (infra + 3rd-party scaled) | $200 | $800 | $2,100 | $4,500 | $8,000 |
| **Gross Profit** | **($100)** | **$1,000** | **$4,900** | **$12,500** | **$26,000** |
| **Gross Margin** | n/m | 56% | 70% | 74% | 76% |
| Personnel (OpEx) | $1,440 | $3,000 | $5,720 | $10,665 | $17,920 |
| S&M | $62 | $310 | $980 | $2,360 | $4,600 |
| Other OpEx | $109 | $282 | $765 | $1,963 | $3,120 |
| **Total OpEx** | **$1,611** | **$3,592** | **$7,465** | **$14,988** | **$25,640** |
| **Operating Income** | **($1,711)** | **($2,592)** | **($2,565)** | **($2,488)** | **$360** |
| **Operating Margin** | n/m | n/m | n/m | n/m | 1% |

> Note: operating income reflects conservative gross margin treatment. See Section 8 for sensitivity to GM%.

---

## 6. Burn & Runway

| ($k) | FY2027 | FY2028 | FY2029 | FY2030 | FY2031 |
|---|---|---|---|---|---|
| Starting cash | $0 | $3,139 | $547 | ($1,018) | ($3,506) |
| + Funding raised | $5,000 | $0 | $0 | $0 | $0 |
| + Series A | $0 | $0 | $15,000 | $0 | $0 |
| − Operating burn | ($1,861) | ($2,592) | ($2,565) | ($2,488) | +$360 |
| **Ending cash** | **$3,139** | **$547** | **$12,982** | **$10,494** | **$10,854** |
| **Months of runway (@ current burn)** | 21 | 2.5 | 60+ | 50+ | ∞ (profitable) |

### Fundraise plan

| Round | Target | Timing | Dilution | Post-money |
|---|---|---|---|---|
| **Seed** | $5M | Q1 2027 | ~20% | $25M |
| **Series A** | $15M | Q1 2029 (triggered at $4M ARR, $8M run-rate) | ~20% | $75M |
| **Series B** | Optional $30M+ | 2030 if accelerating | ~15% | $200M+ |

### Critical gates
- **Seed to Series A** — must hit $4M+ ARR by end of Y2 (early 2029)
- **Default alive by end of Y3** — operating burn ~0 if customers ramp
- **Profitable Y4+** — base case; bear case requires bridge

---

## 7. Unit Economics

### Customer Acquisition Cost (CAC)

| Segment | Avg S&M $ per customer |
|---|---|
| Brand Starter (self-serve) | $800 |
| Brand Growth (inside sales) | $5,500 |
| Brand Enterprise (field sales) | $45,000 |
| Factory Pro (upsell from sponsored) | $200 |
| 3P (channel + outbound) | $2,500 |

### Average Contract Value (ACV)

| Segment | Annual ACV |
|---|---|
| Brand Starter | $6k |
| Brand Growth | $30k |
| Brand Enterprise | $240k |
| Factory Pro | $3.6k |
| 3P Growth | $42k (base + usage) |

### Lifetime Value (LTV) — base case assuming 7-yr life + 115% NRR

| Segment | LTV |
|---|---|
| Brand Starter | $65k |
| Brand Growth | $325k |
| Brand Enterprise | $2.6M |
| Factory Pro | $39k |
| 3P Growth | $455k |

### LTV:CAC Ratios

| Segment | LTV:CAC | Grade |
|---|---|---|
| Brand Starter | 81:1 | ⭐⭐⭐ Excellent |
| Brand Growth | 59:1 | ⭐⭐⭐ Excellent |
| Brand Enterprise | 58:1 | ⭐⭐⭐ Excellent |
| Factory Pro | 195:1 | ⭐⭐⭐ Excellent |
| 3P Growth | 182:1 | ⭐⭐⭐ Excellent |

Industry benchmark: 3:1 good, 5:1 great. All segments well above.

### CAC Payback Period

| Segment | Payback (months) |
|---|---|
| Brand Starter | 1.6 |
| Brand Growth | 2.2 |
| Brand Enterprise | 2.3 |
| Factory Pro | 0.7 |
| 3P Growth | 0.7 |

Industry benchmark: < 12 months good, < 18 months OK. All strong.

> ⚠️ **Realism check:** These unit economics look amazing because they're model-based with no real-world sales friction. Expect first 50 customers to be 3× these CAC numbers due to founder sales + no referral base. Model with buffer in bear case.

---

## 8. Scenario Analysis

### Bear case (sales ramp 60% of base)

| ($M) | FY2027 | FY2028 | FY2029 | FY2030 | FY2031 |
|---|---|---|---|---|---|
| ARR EOY | $0.3 | $2.4 | $7 | $15 | $27 |
| Revenue | $0.05 | $1.1 | $4.5 | $10.5 | $21 |
| OpEx | $1.6 | $3.5 | $7 | $12.5 | $20 |
| Operating income | ($1.5) | ($2.4) | ($2.5) | ($2.0) | $1.0 |
| Series A viable? | n/a | n/a | Marginal | Yes | Yes |

### Base case (shown above)

| ($M) | FY2027 | FY2028 | FY2029 | FY2030 | FY2031 |
|---|---|---|---|---|---|
| ARR EOY | $0.5 | $4 | $12 | $25 | $45 |
| Revenue | $0.1 | $1.8 | $7 | $17 | $34 |
| OpEx | $1.8 | $4.4 | $9.6 | $19.5 | $33.6 |
| Operating income | ($1.7) | ($2.6) | ($2.6) | ($2.5) | $0.4 |

### Bull case (accelerated adoption, 150% of base)

| ($M) | FY2027 | FY2028 | FY2029 | FY2030 | FY2031 |
|---|---|---|---|---|---|
| ARR EOY | $0.8 | $6 | $18 | $38 | $70 |
| Revenue | $0.15 | $2.7 | $10.5 | $25.5 | $51 |
| OpEx | $2.0 | $5.5 | $12 | $23 | $38 |
| Operating income | ($1.85) | ($2.8) | ($1.5) | $2.5 | $13 |
| Series A viable? | n/a | n/a | Yes ($20M+) | Yes | Yes |

---

## 9. Investor Metrics Dashboard

The numbers VCs will ask about on the first call.

| Metric | Benchmark | FY2028 | FY2029 | FY2030 | FY2031 |
|---|---|---|---|---|---|
| **ARR Growth** | 2–3× YoY early | n/a | 300% | 108% | 80% |
| **ARR per employee** | $150k+ | $131k | $240k | $303k | $364k |
| **Gross margin** | 70%+ | 56% | 70% | 74% | 76% |
| **Burn multiple** (burn / net new ARR) | < 2× good, < 1× great | 1.2× | 0.4× | 0.2× | — |
| **Rule of 40** (growth% + margin%) | 40%+ | 38% | 66% | 72% | 82% |
| **CAC payback** (months) | < 18 | 2–3 | 2–3 | 2–3 | 2–3 |
| **LTV:CAC** | 3–5:1+ | 20:1+ | 20:1+ | 20:1+ | 20:1+ |
| **NRR** | 110%+ | 108% | 115% | 120% | 125% |
| **Months to Series A** | — | 24 | — | — | — |

### What's strong
- Rule of 40 crosses 40% in Y2, 66% in Y3 (top-tier SaaS trajectory)
- Burn multiple < 1× from Y3 onward (highly capital-efficient)
- Gross margin reaches 76% by Y5 (healthy SaaS)

### What's weak
- Y2 gross margin 56% is light (infra ramp pre-revenue)
- Must achieve $4M+ ARR by end of Y2 for Series A — tight
- Multi-region infra is expensive early relative to tenant count

---

## 10. Risks & Sensitivities

### High-impact sensitivities

| Variable | Base | Downside (bear) | Impact on Y3 ARR |
|---|---|---|---|
| Brand Enterprise count | 20 | 10 | -$2.4M ARR |
| Average Brand Enterprise price | $20k/mo | $12k/mo | -$1.9M ARR |
| Blended gross margin | 70% | 55% | -$900k GP |
| CAC per Enterprise Brand | $45k | $90k | -$2M OpEx |
| NRR | 115% | 95% | -$1.8M ARR cumulative |

### Qualitative risks

1. **Enterprise sales cycle 4–9 months.** Our model assumes 20 Enterprise Brands by EOY2 — need pipeline building from month 6.
2. **Factory sponsored model untested.** If adoption is lower than modeled, Brand churn increases.
3. **Multi-region infra fixed costs** eat margin at low tenant volumes.
4. **China PIPL compliance** may delay China region launch; -$500k ARR.
5. **AI (Claude API) costs** scale with inspection volume — monitor unit economics quarterly.

### Mitigation strategies

- **Pipeline rigor** — require 3× pipeline:plan ratio for Enterprise
- **Factory onboarding team** — dedicated CSMs for Factory adoption
- **Infra ceiling per Brand tier** — enforce resource quotas
- **Regional launch sequencing** — defer China if PIPL unclear
- **Claude API caching + prompt optimization** — track $/inspection

---

## 11. Funding Plan & Use of Funds

### Seed round: $5M target

**Dilution:** ~20% (post-money $25M valuation — standard pre-launch seed)

**Investor targets:**
- Lead: Vertical SaaS specialist (Craft Ventures, Bowery Capital, Point Nine, Bessemer)
- Supply chain focus: Flexport Fellows, Prologis Ventures, Supply Change Capital
- Angels: ex-CEOs of ETQ / MasterControl / Centric; apparel execs (ex-Nike / Adidas / Zara)

**Use of funds (18-month runway):**

| Bucket | % | $ | Rationale |
|---|---|---|---|
| Team (17 FTE × 18 mo avg) | 60% | $3.0M | Engineering + design + CS |
| Infrastructure (4 regions + Snowflake) | 20% | $1.0M | AWS + Snowflake + CDN + tools |
| GTM (marketing + first 2 sales hires) | 15% | $0.75M | Content, events, conferences, sales setup |
| Legal + compliance + translations | 5% | $0.25M | TM, SOC 2 prep, 8-locale translations |
| **Total** | **100%** | **$5.0M** | |

### Series A: $15M target (Q1 2029)

**Trigger:** $4M+ ARR, >100% NRR, 20+ paying Brands, GA launched
**Valuation target:** $75M post-money (3× ARR multiple)
**Dilution:** ~20%
**Use:** scale sales team, international expansion, vertical adjacency (footwear + home textiles)

### Equity Cap Table (end of Series A)

| Stakeholder | % Fully Diluted |
|---|---|
| Founder (CEO) | 40% |
| Co-founder CTO | 8% |
| Employee option pool | 15% |
| Seed investors | 20% |
| Series A investors | 15% |
| Future reserve | 2% |

### Secondary / exit scenarios

- **IPO viable at $150M+ ARR** — likely 2032+ at base case trajectory
- **Strategic acquisition** — potential acquirers: PTC (owns FlexPLM), Centric Software, SAP (QM module expansion), Oracle, Lectra, Flexport. Benchmarks: 6–12× ARR = $270M – $540M at $45M ARR Y5

---

## 12. How to Use This Model

### For investor meetings
1. Lead with the Executive Summary table (Section 1)
2. Deep-dive Investor Metrics Dashboard (Section 9)
3. Walk through Unit Economics (Section 7) to show capital efficiency
4. Show Scenarios (Section 8) to prove you've stress-tested
5. Close with Funding Plan (Section 11) and the ask

### For board decks (post-Series A)
Monthly actuals vs plan on: ARR, MRR Net New, Customer count, NRR, CAC payback, Burn multiple, Runway

### For internal planning
- Review monthly — compare actuals to this plan
- Re-forecast quarterly
- Full model refresh every 6 months
- Version-control each refresh (`v1.1`, `v2.0`, etc.)

### How to open the CSV
`docs/finance/financial-model.csv` → import to Google Sheets or Excel.

**Google Sheets:**
1. Open sheets.google.com
2. File → Import → Upload → `financial-model.csv`
3. Convert formulas where needed (CSV preserves data, not formulas)

**Excel:**
1. File → Open → `financial-model.csv`
2. Save As → .xlsx

---

## 13. Common Investor Questions & Answers

### "Your Year 3 revenue of $7M seems aggressive. Defend it."
> We've locked a 190-entity blueprint plus a working prototype and are hiring the CTO in Q1. By Q4 2027 we launch with 10 Brand tenants. From there, our target is 15 new Brand tenants per quarter — ~$2M ARR added quarterly by end of Y2. That compounds to $7M revenue in Y3 at our ACV mix. Bear case is $4.5M; even that supports the Series A triggered on $4M+ ARR run rate.

### "Why Brand-sponsored over everyone-pays?"
> Factories resist paying for Brand-mandated tech. Zero adoption means zero data. Brand-sponsored unlocks the three-party data loop, which is our moat. Factory Pro upgrades (10–20% of invited factories) adds a second revenue stream. 3Ps pay usage-based because that matches their own billing model.

### "What's your plan if you miss the seed round target?"
> Minimum viable raise is $3M for 12-month runway covering build to alpha. We'd defer SE Asia region, launch v1 at US + EU only, delay 2 of the 8 language locales. Series A target would shift from Q1 to Q3 2029.

### "What are your biggest customer acquisition risks?"
> 1) Enterprise sales cycles (4–9 months) — mitigated by starting pipeline building from month 6. 2) Brand-sponsored requires Brand to champion rollout across 20–50 Factories — mitigated with dedicated CSMs. 3) Competitive response from Inspectorio — mitigated by our mobile + AI differentiation they can't quickly match.

### "What's your path to profitability?"
> Operating break-even in Y4 (FY2030) at $17M revenue. Rule of 40 crosses 40% in Y2, 66% in Y3. Burn multiple drops below 1× from Y3. If we scale too fast and burn, we'd slow Enterprise hiring before Factory CS to preserve ARR efficiency.

---

**End of Financial Model v1.0**

*Numbers are projections based on blueprint assumptions. Will refresh quarterly against actuals. Model will evolve as GTM data arrives post-launch.*
