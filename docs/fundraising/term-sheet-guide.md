# Term Sheet Negotiation Deep-Dive

**CONFIDENTIAL — Founder's Negotiation Reference**

| Field | Value |
|---|---|
| Version | v1.0 |
| Date | 2026-10-18 |
| Purpose | Decode investor term sheets and negotiate the ones you'll receive |
| Companion doc | `docs/fundraising/investor-target-list.md` |
| Legal disclaimer | NOT legal advice. Always hire a startup lawyer before signing. |

---

## ⚠️ Read This First

A term sheet is a 1-3 page document that outlines investor terms before formal legal docs are drafted. It is **non-binding on most provisions** but **morally binding** — reneging after signing kills your reputation in the ecosystem.

**Signing the wrong term sheet** = 10% of your company gone, control rights ceded, or future rounds blocked. Lawyers cost $5-15k and prevent $500k+ mistakes.

**Signing the RIGHT term sheet** = your co-founder for the next decade.

Read this doc before you receive your first term sheet. Then re-read when one arrives.

---

## 1. The Two Instrument Types

### Type A: SAFE (Simple Agreement for Future Equity)
**Most common for seed in 2026.**

**What it is:** You get money NOW. Investor gets equity LATER (at your next priced round, usually Series A), at a discount or capped valuation.

**Pros:**
- Fast (1-2 weeks to close)
- Cheap (standard Y Combinator template, $500-2k legal)
- No board seat required
- No dilution calculated until Series A

**Cons:**
- Can create "stacked" cap table confusion
- Post-money SAFEs dilute founders more than you think
- Multiple SAFEs = complex conversion math

**When to use:** Seed round under $5M, no lead investor required, speed > precision.

### Type B: Priced Round (Convertible Preferred Stock)
**Standard for Series A and some seeds.**

**What it is:** Investor buys preferred stock at a specific valuation NOW. You know exactly what % they own.

**Pros:**
- Crystal clear ownership
- Lead investor + others set the terms
- Full legal protection

**Cons:**
- Slower (4-8 weeks)
- More expensive ($15-30k legal both sides)
- More terms to negotiate
- Board seat usually required

**When to use:** Series A+, large seeds ($5M+), when institutional lead is signing.

---

## 2. SAFE Deep-Dive (Y Combinator Template)

### The 4 flavors of YC SAFE

| SAFE Type | Valuation Cap | Discount | When to Use |
|---|---|---|---|
| **Cap, no discount** | ✅ Yes | ❌ No | Most common seed |
| **Discount, no cap** | ❌ No | ✅ Yes | Early angels, uncertain valuation |
| **Cap AND discount** | ✅ Yes | ✅ Yes | Investor-friendly, you give up more |
| **MFN (Most Favored Nation)** | — | — | Early angels wanting cheapest terms |

### Post-money vs Pre-money SAFE — THIS MATTERS

**Pre-money SAFE** (older, 2013-2018 style):
- Investor's % only known after Series A
- Founder dilution is unpredictable
- Favored founders more

**Post-money SAFE** (YC 2018 onwards, current standard):
- Investor's % known at SAFE signing
- Founder dilution is explicit upfront
- Favored investors more

### Example: Post-money SAFE Dilution Math

You raise **$500k on a $10M post-money SAFE cap**.
- Investor gets: $500k / $10M = **5% of your company (post-cap)**
- Your dilution: 5% immediately when SAFE converts

Compare: Pre-money SAFE $500k on $10M pre-money cap would give investor ~4.76% depending on subsequent round.

**Rule:** 2026 standard = Post-money SAFE. Negotiate the cap, not the type.

### The 3 Numbers That Matter in a SAFE

1. **Valuation cap** — the maximum valuation at which SAFE converts
2. **Discount** — % off the next round's price (common: 20%)
3. **MFN clause** — "if you give better terms to future SAFE holders, I get them too"

### Negotiating SAFE Terms

| Investor Says | Mean | Push Back |
|---|---|---|
| "$10M cap" | They value you at ~$10M post | Counter with $12-15M if traction supports |
| "25% discount" | They want 25% off next round | Counter with 20% (standard) |
| "No cap, 30% discount" | Fairly founder-friendly | Accept if you believe in a huge Series A |
| "MFN only, no cap" | They want best future terms | Accept — most founder-friendly structure |

### Standard SAFE Mistakes

- ❌ **Signing multiple SAFEs with wildly different caps** — causes confusion and resentment
- ❌ **Not tracking SAFE total** — easy to accidentally give away 40% at Series A
- ❌ **Side letters or verbal promises** — nothing is real unless written
- ❌ **Pre-money SAFEs in 2026** — demand post-money for everyone's clarity

---

## 3. Priced Round Term Sheet — The 20 Clauses That Matter

### Economic Terms (money)

#### 1. **Pre-money Valuation**
What they're valuing your company at BEFORE their investment.
- Seed typical: $10-25M pre-money
- Series A typical: $20-80M pre-money

**Red flag:** < $5M pre-money unless pre-product and pre-team.

#### 2. **Investment Amount**
How much they're investing.
- Seed typical: $500k-$5M
- Series A typical: $5M-20M

#### 3. **Post-money Valuation**
Pre-money + investment = post-money.
Example: $15M pre + $5M investment = $20M post.

#### 4. **Investor Ownership %**
Investment / Post-money = investor %.
Example: $5M / $20M = **25% ownership**.

**Red flag:** > 25% for any single seed investor.

#### 5. **Option Pool**
Reserved equity for future employees. Comes OUT of your pre-money (not theirs).

**Common ask:** 10-15% post-money pool.

**Negotiation:** "Shadow pool" math — the pool dilutes YOU, not them.

Example impact:
- $15M pre, $5M investment, 10% post-money option pool
- Real pre-money (your value): $12M (not $15M)
- Your effective dilution: higher than you think

**Pushback:** "We agree to 10% pool, but calculated AFTER the round, not before."

### Dividend + Liquidation Preference

#### 6. **Dividend Preference**
Investor gets dividends before founders.

**Standard:** Non-cumulative, 6-8% (basically never paid in reality).

**Red flag:** Cumulative dividends compound = silent dilution.

#### 7. **Liquidation Preference**
What investor gets in acquisition/dissolution BEFORE founders.

**Standard:** 1× non-participating.
- Non-participating: Investor picks preferred payout OR share pro-rata
- Participating ("double-dip"): Investor gets preferred PLUS share pro-rata

**Red flags:**
- ❌ **2× or 3× preference** — unusual at seed; be very wary
- ❌ **Participating preferred** — "double dip"; investor gets 2× total
- ❌ **Full ratchet anti-dilution** — nuclear option; destroys founder equity if down round

**My rule:** 1× non-participating OR walk.

### Governance Terms (control)

#### 8. **Board of Directors**
Who sits on the board. Typical seed:
- 1 founder (you)
- 1 investor (lead)
- 1 independent (mutual pick)

**Red flags:**
- ❌ Investor-controlled board at seed (2+ investors on 3-person board)
- ❌ No independent director path
- ❌ Observer rights for too many investors (board meetings become unwieldy)

#### 9. **Board Observers**
Non-voting attendees. Common for smaller investors.

**Standard:** OK for 1-2 lead backup investors.

**Red flag:** 5+ observers = unmanageable board meetings.

#### 10. **Protective Provisions**
Things that require investor approval. Includes:
- Issue new equity above threshold
- Sell the company
- Change articles of incorporation
- Take on debt above threshold
- Change executive compensation

**Standard list:** 6-10 items.

**Red flags:**
- ❌ Hire/fire CEO requires investor approval at seed (unusual)
- ❌ Budget approval line-by-line (micromanagement)
- ❌ Veto on hiring any VP (unusual)

#### 11. **Voting Rights**
How much power each share has.

**Standard:** 1 share = 1 vote.

**Red flag:** Super-voting shares for investors.

### Rights Terms

#### 12. **Pro-rata Rights**
Investor can maintain their % in future rounds by investing more.

**Standard:** All investors get it; most important for lead.

**Note:** You can offer "major investor" tier (invest $X+ to get pro-rata).

#### 13. **Right of First Refusal (ROFR)**
Investor gets first dibs if existing shareholder tries to sell.

**Standard:** Yes for investors on common stock sales.

#### 14. **Co-sale Rights (Tag-along)**
If founder sells, investor can sell proportionally too.

**Standard:** Yes, protects investors.

#### 15. **Drag-along Rights**
If majority shareholders agree to acquisition, minority must go along.

**Standard:** Yes, prevents hold-outs blocking exits.

#### 16. **Information Rights**
Investors receive monthly/quarterly reports.

**Standard:** Yes for all investors above threshold ($100k+).

**Negotiation:** Minor investors get quarterly; major get monthly.

### Anti-Dilution Terms

#### 17. **Anti-dilution Protection**
Protects investor if you raise next round at LOWER valuation.

**3 types:**
- **Full ratchet** — investor's price repriced to lower round's price. ❌ Nuclear.
- **Weighted average (broad-based)** — standard, fair.
- **Weighted average (narrow-based)** — slightly worse for founders.

**Standard:** Weighted average broad-based.

**Red flag:** ❌ Full ratchet is a DEAL BREAKER.

### Founder Terms

#### 18. **Founder Vesting**
Your own equity vests over time.

**Standard:** 4-year vest, 1-year cliff, from legal signing date.

**Negotiation:**
- Credit for time already worked (6-12 months common)
- Acceleration on acquisition (single or double trigger)

**Red flag:** No credit for prior time + full re-vest = investor is taking advantage.

#### 19. **Acceleration on Change of Control**
What happens to vesting at acquisition.

**Single trigger:** Vest at acquisition (founder-friendly, rare).
**Double trigger:** Vest if acquired AND you're terminated (standard).

**Push for:** Double trigger with 1-2 year acceleration.

#### 20. **Non-compete + IP Assignment**
Investor requires you to assign IP + not compete.

**Standard:** IP assignment yes. Non-compete limited to apparel QMS space.

**Red flag:** Broad non-compete (any software, any industry) = bad.

---

## 4. The "Standard Seed Term Sheet" You Should Expect

For a $3-5M seed at $20-25M post-money, here's what GOOD looks like:

```
INVESTMENT TERMS
- Amount: $3-5M
- Pre-money: $15-20M  
- Post-money: $20-25M
- Instrument: Series Seed Preferred Stock
- Option pool: 10-15% post-money (standard)

ECONOMICS
- Liquidation preference: 1× non-participating
- Dividend: 6-8% non-cumulative (never paid in practice)
- Anti-dilution: Weighted average broad-based

GOVERNANCE
- Board: 1 founder + 1 lead investor + 1 independent (3 total)
- Observer rights: 1-2 next-largest investors
- Protective provisions: Standard (6-10 items)

RIGHTS
- Pro-rata: Yes for major investors (>$500k check)
- ROFR: Yes
- Co-sale: Yes
- Drag-along: Yes
- Information: Monthly to major, quarterly to all

FOUNDER
- Vesting: 4 yr, 1 yr cliff, credit for 6-12 months already worked
- Acceleration: Double trigger (12 months)
- IP: Full assignment
- Non-compete: Apparel QMS space only, 1 year post-departure

MISC
- Legal fees: Investor pays up to $20-40k
- MFN: Standard for early SAFE holders
- Closing: 30-60 days from signing
```

If a term sheet matches this, it's **investor-friendly but fair**. Sign it with lawyer review.

---

## 5. The Red Flag Catalog (DO NOT SIGN)

### Economic Red Flags
- ❌ > 25% for a single seed investor
- ❌ 2× or 3× liquidation preference
- ❌ Participating preferred (double dip)
- ❌ Cumulative dividends > 8%
- ❌ Pre-money option pool math that silently dilutes founders beyond 15%

### Control Red Flags
- ❌ Investor-majority board at seed
- ❌ CEO hire/fire requires investor approval
- ❌ Supermajority (>80%) required for ordinary decisions
- ❌ Veto on any hire or budget line

### Dilution Red Flags
- ❌ Full ratchet anti-dilution
- ❌ Weighted average "narrow-based"
- ❌ Anti-dilution with no triggers (always on)

### Founder Red Flags
- ❌ 100% unvested (no credit for prior work)
- ❌ No acceleration on acquisition
- ❌ Broad non-compete (any software, any industry)
- ❌ Clawback provisions on founder equity

### Process Red Flags
- ❌ "Sign in 48 hours or we withdraw" (manufactured urgency)
- ❌ No lawyer review time allowed
- ❌ Side letters that contradict main terms
- ❌ Terms not negotiable at all
- ❌ Confidentiality that prevents discussing with other investors
- ❌ Exclusivity that extends beyond diligence period

---

## 6. The Negotiation Playbook

### Rule 1: Have Multiple Term Sheets
A single term sheet = you have no leverage. 2-3 term sheets = you have options.

**Even if one is much better,** having competitors makes the lead investor sharpen their offer.

### Rule 2: Negotiate Governance BEFORE Economics
If you fight for valuation and lose on board control, you've lost. Protect:
1. Board composition
2. Protective provisions scope
3. Acceleration terms
4. Founder equity vesting

### Rule 3: Use Lawyer as Buffer
Say: "My lawyer says we can't accept [bad term]." Transfers blame to lawyer, protects relationship.

### Rule 4: Benchmark Against YC Series Seed
YC publishes standard Series Seed docs (free, open-source). Anchor against these.

If an investor's term sheet differs materially from YC standard, ask: "Why?"

### Rule 5: Know Your BATNA
BATNA = Best Alternative to Negotiated Agreement.

Options if this deal falls through:
- Raise less (angels only)
- Bootstrap for 6 more months (prove more)
- Different investor
- Delay 1 quarter

If you know your BATNA, you negotiate from strength. If this is your only option, you'll sign anything.

### Rule 6: Negotiate Only 3-5 Items
If you try to change every clause, investor loses patience. Pick:
- Top 1-2 economic terms
- Top 1-2 governance terms  
- Top 1-2 founder terms

Accept the rest if they're standard.

### Rule 7: Don't Signal Desperation
- Don't say "I need to close by [date]"
- Don't share your runway publicly
- Don't tell investor they're your only option

Even if they are.

### Rule 8: Get Everything in Writing
"We'll figure it out later" = you lose.
Memorialize every verbal agreement in email or term sheet addendum.

---

## 7. Specific Negotiation Scripts

### Script 1: Negotiating Valuation Up

> "We appreciate the offer at $12M pre-money. Based on our pipeline — 20 discovery interviews completed, 5 hot leads, prototype demonstrating three-party workflow, and strong signals from [Brand X] — we're seeing valuations in the $18-22M range from other interested parties. We'd like to anchor at $18M pre-money. Walk me through your valuation framework; we may be able to find common ground."

### Script 2: Pushing Back on Liquidation Preference

> "The 2× participating liquidation preference is unusual at seed. YC's standard is 1× non-participating. Our other term sheets are all at 1×. We can't accept 2× — it would signal to future investors that we're a weak deal. We can accept 1× non-participating; is that something you can accommodate?"

### Script 3: Negotiating Board Composition

> "We're comfortable with a 3-person board: 1 lead investor seat, 1 founder (me), 1 independent that we both agree on. The independent will be experienced in [vertical SaaS/apparel supply chain]. We cannot accept 2 investor seats on a 3-person board — that's an institutional-governance structure for a seed-stage company."

### Script 4: Protecting Founder Equity

> "Full re-vesting of founder equity doesn't account for the 18 months of work I've put into this already — the blueprint, prototype, customer discovery, hiring pipeline. We're asking for 12 months of credit (equivalent to 25% vested at closing), with the remaining 75% vesting over 36 months with a 1-year cliff. This is standard for founders who've shipped before raising."

### Script 5: Removing an Unacceptable Clause

> "The broad non-compete clause (any software, any industry, 2 years) is overbroad. We need to limit it to apparel QMS and competing products specifically, with a 1-year post-departure window. This is standard founder protection."

### Script 6: Saying No Gracefully

> "Thank you for the offer. After careful consideration, we've decided to go with a different term sheet. The reasons are [governance/economics/fit]. We'd love to stay in touch for future rounds and would appreciate the chance to update you on milestones over the coming months."

---

## 8. Comparing Multiple Term Sheets

When you have 2-3 offers, use this comparison matrix:

| Dimension | Offer A | Offer B | Offer C | Weight (1-5) |
|---|---|---|---|---|
| Pre-money valuation | $15M | $18M | $20M | 4 |
| Investment amount | $4M | $3M | $5M | 3 |
| Dilution after pool | 23% | 20% | 24% | 4 |
| Liquidation preference | 1× | 1× | 1.5× | 3 |
| Participating? | No | No | No | 5 |
| Board composition | 1+1+1 | 1+2+1 | 1+1+1 | 5 |
| Pro-rata | Standard | Standard | Standard | 3 |
| Anti-dilution | WA broad | WA broad | Full ratchet | 5 |
| Founder vesting credit | 6 mo | 12 mo | 0 mo | 5 |
| Lead investor quality | Tier 2 | Tier 1 | Tier 2 | 5 |
| Partner specifically | Great | Good | OK | 5 |
| Portfolio synergy | Low | High | Medium | 3 |
| Decision timeline | 30 days | 60 days | 20 days | 2 |
| **Weighted score** | — | — | — | — |

### The Hidden Factors (Weight Heavily)

1. **Partner quality** — your relationship with ONE person matters more than firm brand
2. **Follow-on capability** — can they lead Series A? Pro-rata is meaningless if they can't write bigger checks
3. **Portfolio synergy** — have they invested in supply chain / SaaS adjacent?
4. **References from current portfolio founders** — ask 3 founders in their portfolio: "What's it like to have them as an investor?"
5. **Your gut** — if something feels off, trust it

---

## 9. The Lawyer Selection Guide

### What a startup lawyer does for your term sheet

- Reviews every clause (worth $500 vs $5k mistakes)
- Negotiates specific points with investor's counsel
- Drafts final legal docs (Preferred Stock, Charter, etc.)
- Advises on cap table + option pool math
- Flags red flags you'd miss

### Who to hire

**Tier 1 (Expensive, high value for Series A+):**
- Cooley LLP
- Latham & Watkins
- Gunderson Dettmer
- Wilson Sonsini (WSGR)
- Orrick

**Cost:** $20-50k for seed round legal work

**Tier 2 (Practical for seed):**
- Fenwick & West
- Perkins Coie
- Morgan Lewis
- Mintz
- Local firms with startup practices

**Cost:** $5-15k for seed round legal work

**Tier 3 (DIY-friendly):**
- Clerky.com legal (built-in docs)
- Stripe Atlas lawyers (via Atlas product)
- Vanilla "fixed fee" packages ($2-5k)

**For seed:** Tier 2 is sweet spot. For Series A+: Upgrade to Tier 1.

### Avoid

- ❌ General practice lawyers (not startup-specific)
- ❌ Lawyers your investor recommends (conflict of interest)
- ❌ Lawyers who've never done a venture round
- ❌ Lawyers who won't quote a flat fee

### The First Call Agenda

1. Share term sheet + round summary
2. Ask: "What are your top 3 concerns?"
3. Ask: "What's your fee structure?" (flat fee vs hourly)
4. Ask: "Who else at the firm will work on this?" (want partner-level)
5. Ask: "How many seed rounds have you closed in last 12 months?"
6. Red flag: lawyer wants to "overhaul" standard terms — unnecessary cost

---

## 10. Due Diligence — What Happens Between Term Sheet and Close

Once you sign a term sheet, there's typically **30-60 days** of due diligence before money hits your account.

### What investor's lawyer will ask for

**Corporate**
- Certificate of Incorporation
- Bylaws
- Board resolutions
- Cap table (clean + current)
- Stock purchase agreements for all equity issuances
- 83(b) elections filed
- All stock option grants
- Any outstanding warrants, SAFEs, convertibles

**Financial**
- Historical financials (if any)
- Projection model
- Bank statements last 6 months
- Any debt
- Revenue details (customers, contracts)

**Contracts**
- Customer contracts / LOIs
- Vendor contracts (any material commitments)
- Office lease
- Any licenses
- Open source licenses used (software audit)

**IP**
- IP assignments from founders + contractors
- Patent applications
- Trademark filings
- Any IP disputes

**Employment**
- Employment agreements for key people
- Offer letters
- Confidentiality agreements
- Advisor agreements
- Any employment disputes

**Litigation**
- Any pending or threatened lawsuits
- Any regulatory issues
- Any claims by former employees

**Compliance**
- Data privacy policies
- Terms of Service
- Security practices (SOC 2 roadmap)

### How to prepare

Build this ALL into a data room BEFORE first term sheet. Section 11 of `investor-target-list.md` has the structure.

**If you can't produce documents fast, investors doubt you.** Fast diligence = closed deal.

---

## 11. The Decision Framework — Say Yes/No

When you have a term sheet in hand, ask yourself:

### Economic Questions
- [ ] Does the valuation reflect current market comps?
- [ ] Can we live with this dilution for next round?
- [ ] Are liquidation preference terms standard (1× non-participating)?
- [ ] Is anti-dilution weighted-average broad-based?
- [ ] Is option pool math fair?

### Control Questions
- [ ] Is board composition balanced?
- [ ] Are protective provisions reasonable scope?
- [ ] Can I still hire/fire C-suite without investor approval?
- [ ] Can we sell the company without supermajority investor approval?

### Partner Questions
- [ ] Do I want this specific partner on my board for 7+ years?
- [ ] Have I checked references from 3+ portfolio founders?
- [ ] Will they add value beyond money (intros, expertise)?
- [ ] Can they lead or support my Series A?
- [ ] Do we communicate well?

### Process Questions
- [ ] Is the closing timeline realistic?
- [ ] Are legal fee commitments clear?
- [ ] Is there appropriate time for diligence?
- [ ] Any manufactured urgency pressure?

### Gut Check
- [ ] Would I be proud to tell other founders I signed this?
- [ ] Does this partnership feel like a 7-year marriage?
- [ ] Any part of this term sheet makes me uncomfortable?

**If > 3 red flags → walk.**
**If gut says no → trust it.**
**If all greens → sign + celebrate.**

---

## 12. Common Founder Mistakes

### Mistake 1: Signing First Term Sheet
Without competition, you negotiate blind.

**Fix:** Run a tight 60-day process to generate 2-3 term sheets.

### Mistake 2: Taking Highest Valuation
Highest valuation often has worst terms (preference stack, control, dilution).

**Fix:** Look at effective dilution after pool + liquidation stack, not headline valuation.

### Mistake 3: Not Reading Fine Print
Term sheet is 2 pages. Legal docs are 100 pages. Terms get added.

**Fix:** Read every clause with lawyer BEFORE signing legal docs.

### Mistake 4: Over-Negotiating
Trying to change every clause makes you look difficult. Lead investor walks.

**Fix:** Pick 3-5 items to negotiate. Accept the rest.

### Mistake 5: Fighting on Wrong Terms
Fighting hard on dividends (never paid) while ceding on anti-dilution (critical).

**Fix:** Rank clauses by impact. Fight for the top 5.

### Mistake 6: No Reference Checks on Investor
Investors do due diligence on you. You should do same on them.

**Fix:** Call 3 portfolio founders. Ask: "Would you take their money again?"

### Mistake 7: Hiding Issues
Don't disclose a conflict? Investor finds out later = trust destroyed.

**Fix:** Disclose everything proactively. Builds trust that pays off for years.

### Mistake 8: Rushing Legal
Investor pushes to "close by Friday." Legal gets sloppy. Mistakes compound.

**Fix:** Insist on reasonable timeline. 30 days from term sheet to close is normal.

### Mistake 9: Not Involving Co-founder
If you have co-founder, they must agree. Hidden disagreements explode later.

**Fix:** All major decisions include co-founder in writing.

### Mistake 10: Signing Without Lawyer
"To save $10k, I'll just read it myself."

**Fix:** NEVER. The $5-15k saves 100× that in future problems.

---

## 13. After Signing — The 30 Days Before Close

### Week 1: Legal Docs Drafted
- Investor's lawyer sends Preferred Stock Purchase Agreement, Investor Rights Agreement, Voting Agreement, Charter amendment
- Your lawyer reviews within 48 hours
- Flag any changes from term sheet

### Week 2-3: Diligence Deep Dive
- Investor team visits your office OR extensive video calls
- References from your team, customers, advisors
- Final financial model review
- Legal docs negotiated clause-by-clause

### Week 4: Closing
- Final docs signed via DocuSign
- Wire transfer initiated
- Money hits your bank account
- Public announcement (optional)
- Board meeting #1 scheduled

### What to do in parallel
- Prepare cap table update
- Prepare 90-day plan presentation for first board meeting
- Line up CTO offer (if hiring)
- Set up weekly investor update email

---

## 14. Standard Anti-Patterns Investors Use (Watch For)

### "Everyone else is at these terms"
**Translation:** They want you to think you have no leverage.
**Response:** "Other investors we're talking to have different terms. Let's discuss what we actually want."

### "This is standard for 2026 seed"
**Translation:** They're hoping you don't know the market.
**Response:** Anchor against YC Series Seed docs (publicly available).

### "We'd need to see 2× that for pro-rata"
**Translation:** They want you to think pro-rata is contested.
**Response:** Pro-rata for lead investors is standard. Non-negotiable.

### "Board seat is non-negotiable for us"
**Translation:** They want control.
**Response:** "We can do observer only for your investment size" OR "1 seat with you specifically, not a firm swap right"

### "We can close in 2 weeks if you move fast"
**Translation:** Manufactured urgency to prevent competition.
**Response:** "We need 30 days for proper diligence; otherwise we both regret it."

### "Our full partnership is excited"
**Translation:** They've not actually brought it to partnership vote.
**Response:** "Great — when can I meet the rest of the partners?"

### "Legal is already drafted"
**Translation:** They want you to feel locked in.
**Response:** "We'll have our lawyer review before signing."

---

## 15. The One-Page Term Sheet Analysis Tool

When you receive a term sheet, fill this out within 24 hours:

```markdown
# Term Sheet Analysis — [Investor Name]
Date received: ___
Next step by date: ___

## ECONOMICS (1-5 fit score)
- Pre-money: $___ (score: __)
- Investment: $___ (score: __)
- Dilution post pool: __% (score: __)
- Liquidation preference: ___ (red/yellow/green)
- Anti-dilution: ___ (red/yellow/green)

## GOVERNANCE (1-5 fit score)
- Board composition: ___ (score: __)
- Protective provisions: ___ (score: __)
- Pro-rata rights: ___ (score: __)

## FOUNDER TERMS (1-5 fit score)
- Vesting + prior credit: ___ (score: __)
- Acceleration: ___ (score: __)
- Non-compete scope: ___ (score: __)

## PARTNER QUALITY (1-5)
- Partner-founder fit: ___
- Firm reputation: ___
- Portfolio synergy: ___

## RED FLAGS (count them)
[ ] 2x+ liquidation preference
[ ] Participating preferred
[ ] Full ratchet anti-dilution
[ ] Investor-majority board
[ ] Broad non-compete
[ ] No prior vesting credit
[ ] Manufactured urgency
[ ] Terms not negotiable

Total red flags: ___

## MY DECISION
- First reaction: Yes / No / Negotiate
- Lawyer feedback: ___
- Top 3 negotiation items: ___
- Walk-away triggers: ___
- Timeline to respond: ___
```

---

## 16. Resources + Templates

### Free templates
- [YC Standard SAFEs](https://www.ycombinator.com/documents) — download and compare
- [YC Series Seed](https://github.com/ycombinator/series-seed-docs) — open-source priced round docs
- [NVCA Model Documents](https://nvca.org/model-legal-documents/) — National Venture Capital Association standards
- [SeriesSeed.com](https://seriesseed.com) — alternative open-source

### Learning
- *Venture Deals* by Brad Feld + Jason Mendelson — the canonical book
- *The Lean VC Playbook* — tactical for founders
- *StrictlyVC* newsletter — current market terms

### Communities
- Twitter #seedfunding, follow Jason Lemkin, Harry Stebbings
- SaaStr community
- Y Combinator Startup School (free)

### Benchmarking data
- [Carta State of Private Markets](https://carta.com/state-of-private-markets/)
- [AngelList Valuation Trends](https://angel.co/blog)
- [Pitchbook VC data] (paid)

---

## 17. Your Monday Morning Checklist

Before you take any investor meeting that could result in a term sheet:

- [ ] Legal entity formed (SAFE won't work otherwise)
- [ ] Cap table clean + current
- [ ] Lawyer selected and briefed
- [ ] 83(b) elections filed
- [ ] Data room assembled (per Section 10)
- [ ] Reference list prepared
- [ ] This document re-read
- [ ] YC SAFE + Series Seed templates reviewed
- [ ] 2-3 investor processes running in parallel (never 1)

---

## 18. The Honest Truth About Your First Term Sheet

**You will probably accept worse terms than ideal.** First-time founders usually give up 2-5% more than they should. That's OK.

**What matters:**
- Did you sign with the RIGHT partner?
- Does the structure allow a successful Series A?
- Did you avoid any killer red flags?
- Do you still have majority control + decision-making?

**What doesn't matter as much:**
- $18M vs $22M pre-money (small difference)
- 20% vs 25% discount on SAFE (minor)
- 1-year vs 2-year non-compete (negotiable later)

**The deal that kills you** is one with great economics but bad partner, OR mediocre economics with full ratchet anti-dilution.

---

## 19. If You Only Remember One Thing

**Three non-negotiables:**
1. **1× non-participating liquidation preference** (not 2×, not participating)
2. **Weighted average broad-based anti-dilution** (not full ratchet)
3. **Reasonable board composition** (not investor-majority at seed)

Everything else is negotiable or standard. These three are deal-breakers.

---

## 20. Final Decision Flow

```
Term Sheet Received
       │
       ▼
Does it have ANY of the 3 killer red flags?
   (2× preference, full ratchet, investor-majority board)
       │
   ┌───┴───┐
   YES     NO
   │       │
   ▼       ▼
WALK     Fill out analysis tool
         │
         ▼
Does it match "standard seed" template (Section 4)?
         │
     ┌───┴───┐
     YES     NO
     │       │
     ▼       ▼
   Sign    Negotiate top 3-5 items
   (after    │
   lawyer    ▼
   review)   Does investor budge?
             │
         ┌───┴───┐
         YES     NO
         │       │
         ▼       ▼
       Sign    Walk if deal-breaker
               Sign if cosmetic
```

---

**End of Term Sheet Negotiation Guide v1.0**

*A term sheet is a 7-year contract disguised as a 2-page summary. Read every word. Hire a lawyer. Negotiate the 3-5 things that matter. Then sign and go build.*
