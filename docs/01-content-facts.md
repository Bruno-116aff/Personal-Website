# Content Facts & Source Material

Source of truth for every factual claim on the site. Codex/copywriter should not
invent numbers, dates, or achievements beyond what's here. Where a number is
marked "do not publish exact figure," use qualitative framing instead — this is
a deliberate decision, not a gap to fill in.

## Identity
- Name: Ivan Hubko
- Location: Limassol, Cyprus. Open to remote, hybrid, relocation.
- Email (current, use on launch): gubko360@gmail.com
- Email (future, migrate later — don't wait for this): ivan@hubko.me
- LinkedIn (use this one, don't show raw URL — button only):
  https://www.linkedin.com/in/ivan-hubko-5a635b245
- Telegram: @Ivan_devs
- GitHub: `https://github.com/Bruno-116aff` is the approved public profile. It is
  currently empty (private/company repos only historically), so show the link in
  Contact without implying an active public contribution history. No "pinned
  repos" widget.
- Photo: Ivan supplied the final local photo for the About section. Use it with
  a proper aspect ratio and meaningful alt text.

## Career timeline (show honestly, no smoothing)
- 2021 (Sep–Feb 2022): Fiverr/Upwork, Frontend Web Developer, freelance — first
  commercial experience, landing pages, JS/HTML/CSS.
- 2022 (Mar 2022–Mar 2023): Alpha Tech, Full Stack Developer (remote) — frontend-heavy,
  some server-side/API/DB work, PHP + JS.
- 2023 (Mar–Sep 2023): PS Simple Traffic, Frontend Developer — joined building
  internal React/TS applications, gradually expanded into backend/infra as the
  team grew.
- 2023–2024 (Oct 2023–Dec 2024): PS Simple Traffic, Backend Developer / Team Lead —
  primary focus shift to backend, led a frontend team of 3, co-built core platform
  architecture with another backend engineer, took ownership of deployment/infra.
- 2025–present: PS Simple Traffic, Tech Lead / Senior Backend Developer — owns
  backend technical direction, architecture decisions, supported team growth to
  a peak of 8 developers, remains hands-on in code.

Total: 5 years commercial experience, 3+ years backend-focused.

Company name **PS Simple Traffic** can be used openly — it is not NDA-restricted
itself. What's restricted is *internal implementation detail* (see per-case rules
below), not the employer's name or the general domain (AdTech / marketing
automation).

## Technical skills (from CV — use for the "Technical Expertise" section)
- Languages: TypeScript, JavaScript (ES6+), SQL, PHP
- Backend: Node.js, Express.js, NestJS, REST APIs, WebSocket, Webhooks, background
  processing, schedulers, worker processes
- Architecture: system design, modular monoliths, microservices, service-oriented
  architecture, event-driven architecture, controller-service-repository pattern
- Messaging/async: BullMQ, Redis queues, Kafka, RabbitMQ, job scheduling, retries,
  failure handling, persisted processing state
- Data: MySQL, PostgreSQL, Redis, schema design, transactions, query optimization,
  indexing, caching
- Integrations: REST, WebSocket, webhooks, third-party APIs (Meta/Facebook Graph
  API, Cloudflare API, payment/financial APIs, Telegram integrations)
- Auth/security: JWT, access/refresh tokens, httpOnly cookies, session management,
  RBAC, CORS, TLS/HTTPS, API validation
- Cloud/infra: AWS, Google Cloud, Cloudflare, Docker, Docker Compose, Linux/Ubuntu,
  Nginx, Apache2, Traefik, PM2, Portainer, reverse proxies, DNS, TLS
- CI/CD: GitHub Actions, automated deployment, Git
- Reliability: structured logging, centralized error handling, monitoring, health
  checks, failure recovery, production troubleshooting
- Frontend (shown as width, not identity): React, TypeScript, Vite, MUI, HTML5/CSS3
- AI-assisted engineering: Cursor, Claude Code, OpenAI Codex — mention briefly as
  a working-style note, not a headline skill

## Education
LPVFP, Sep 2016 – Jun 2019, Secondary Education, Mathematics. Minor detail — include
in CV/footer context only, not a homepage feature.

---

## CASE STUDIES — priority order for the site

Site shows **4 case studies**. Two additional smaller systems (short-link service,
security/access improvements) are folded in as supporting bullets rather than
standalone pages — see notes at the bottom.

Order on homepage (first = strongest / safest / most impressive to lead with):
1. Infrastructure Reliability (proxy/modem network)
2. Operations Automation (server/domain provisioning)
3. Unified Platform (CRM + monolith→microservices)
4. Large-Scale Account Automation (heavily filtered — see rules)

---

### CASE 1 — Infrastructure Reliability (proxy/modem network)
**Publish freely — no NDA sensitivity, this is pure infrastructure engineering.**

Raw material (Ivan's own words, translated/condensed):
The company and its partners/clients relied heavily on mobile proxies, which were
expensive and frequently unstable/dropped. Ivan built a worker service, deployed on
a dedicated Ubuntu machine, that connected to a hub of USB modems (SIM cards, each
modem wired to a rooftop antenna). The worker controlled ports/network state,
could remotely reset a modem's IP, auto-configured newly inserted modems, and
reported live status back to the central CRM (which handled all management/config).
Proxies were exposed externally through a tunnel + static IP; each physical proxy
could be assigned to up to 3 users (best balance for throughput). Each user got a
domain-based endpoint — they never saw the real underlying IP, all routing was
abstracted. If a proxy/modem failed, traffic was automatically rerouted to another
modem. The company ran 20 modems, covering internal use, partners, and limited
resale to clients. System was designed to support multiple worker stations and
unlimited modems, but scope stayed at one station since this was built purely for
internal need, not as a product.

**Verified numbers:**
- Cost: ~800 UAH/month per line → ~200 UAH/month after the system (≈$390/mo →
  ≈$97/mo at ~41 UAH/$), direct proxy line-item savings ≈ **$3.5K/year**.
- CV's "$15–20K/year" figure includes *indirect* losses (failed campaigns, downtime,
  investigation time from unstable third-party providers) that cannot be
  reconstructed precisely. **Do not publish $15-20K as a hard number.**
  Preferred framing: state the direct/verifiable cost reduction ($3-4K/year on the
  proxy line item) as a number, and describe the reliability improvement
  ("eliminated recurring failures from unstable third-party providers," "zero
  proxy-related outages since deployment") as a qualitative claim, not a dollar
  figure.
- 20 physical modems, up to 3 concurrent users per proxy.

**Also introduced (fold in as a supporting line, not separate case):** private
network access control / reduced internal exposure to company systems (this is
the "Case 6" security material from the source CV — do not explain what was being
protected against, just state the capability).

---

### CASE 2 — Operations Automation (server/domain provisioning pipeline)
**Publish freely — pure orchestration engineering, no sensitive business detail.**

Raw material: Marketing operators ("baiers") regularly needed fast test
deployments — new server in a specific location, domain attached, traffic flow
configured for the campaign. Previously this required a dedicated person manually
working through a checklist (provision server, point domain, configure flow,
verify access) — slow and error-prone. Ivan automated the entire pipeline: the
operator selects a product + location in the CRM, and everything else happens
automatically with cross-checks.

Flow (safe to describe in architecture detail):
1. Order submitted → job dropped into a RabbitMQ queue.
2. A worker picks it up, checks required access/prerequisites via API.
3. Multiple parallel tasks queued: (a) provision a new server via cloud provider
   API (DigitalOcean and AWS were both used) and push SSH cert + config + content;
   (b) select the best available domain factoring in rotation and "cooldown"
   history, attach it to the server, issue a TLS cert.
4. A separate service reads the chosen domain and configures the right traffic
   flow for the order, verifying the destination endpoint is reachable.
5. On success, a notification service posts a confirmation to Telegram.
6. Cloudflare used for domain proxying. (Note: the specific traffic-tracking/attribution
   system used internally is not to be named or described — refer to it only as
   "an internal tracking system" if it needs to be mentioned at all.)

**Verified numbers:**
- Time: **1–3 hours → ~15 minutes** per request.
- Removed the need for a dedicated manual operational role.
- **~$7K/year** direct savings (role cost) — this figure is defensible, publish as-is.
- Near-zero manual processing errors after automation.

---

### CASE 3 — Unified Platform (internal CRM + monolith→microservices migration)
**Publish freely, qualitative framing (no dollar figure — none is defensible).**

Raw material: Company tooling was fragmented — separate systems for account
management, traffic control/config, payments, domain management; orders came in
via Telegram with no central record. Ivan led consolidation into one CRM,
covering proxy management, account management, traffic, and — critically —
cross-system reconciliation: comparing what the ad platform reported served,
what actually reached the destination, and what was spent in the payment system,
all in one place instead of manually cross-referencing three disconnected
systems. Team/access management was also centralized — onboarding/offboarding
went from manually granting/revoking access across many tools to one action;
the platform could also halt all traffic/accounts company-wide with a single
control in a risk scenario. Originally built on Node.js/Express as a modular
monolith; as scope grew, Ivan led a rewrite to NestJS with a microservices
architecture.

**What to publish:**
- Consolidation of previously fragmented systems into one operational platform.
- Cross-system reconciliation as the standout technical detail — ad-platform
  reported metrics vs. actual delivered traffic vs. actual spend, unified in one
  view instead of manual cross-referencing. This is the single best "senior
  thinking" detail in this case — lead with it.
- Migration from modular monolith (Node/Express) to microservices (NestJS) as
  the system grew — good architecture-maturity story.
- One-click team onboarding/offboarding and one-click company-wide traffic halt
  as examples of operational control built into the platform.
- **No dollar figure for this case.** Frame impact as: fewer disconnected
  systems, fewer manual cross-checks, faster incident response, centralized
  control.

**Supporting systems to fold in as a short bullet list at the end of this case
(not separate cases):**
- Domain management system — buy/manage domains via API without logging into
  provider dashboards directly.
- Internal task manager with automation triggers (e.g., a "card attach" task
  auto-completing itself).
- One-click financial/accounting report export.
- Short-link/domain redirect service (see note below) — can be mentioned here
  instead of as its own case if a 4-case structure is preferred; confirm final
  placement during build.

---

### CASE 4 — Large-Scale Account Automation (state/lifecycle management)
**HEAVY FILTERING REQUIRED. Read this section carefully before writing a word
of copy for this case.**

Raw material (internal only — DO NOT expose the details below on the site):
The company operated a large pool of purchased social media accounts used to run
advertising traffic and to post comments/engagement to make campaigns look
organic. Manual "warming" of accounts (visiting profiles, adding friends, liking,
commenting) was extremely time-consuming, error-prone (people forgetting to stop
spend, accounts dying from too-frequent manual logins), and the underlying goal
was to keep accounts from being detected/banned by the platform. Ivan built a
system using Playwright + RabbitMQ + MySQL/Redis that tracked account state and
performed scheduled warming activity automatically. Hardware was constrained (one
server could hold ~5 concurrent Playwright sessions), so a scheduling algorithm
was built to guarantee each account got ~30 min of activity per 48 hours across
the whole pool — plus a browser extension so that operators' own natural login
time (while managing campaigns) counted toward an account's activity quota too,
with browser state snapshots synced back to the CRM. This reduced account
loss/ban rate from ~20%/month to ~4%/month. The system also included a
risk-monitoring circuit breaker: if an account/campaign showed signs of going
into loss, a Telegram alert fired and spend was auto-halted after 3 minutes if
not addressed — this repeatedly prevented significant losses. Also automated:
per-account payment card provisioning/top-up (previously fully manual, requiring
a manager to physically attach and fund cards), budget request/approval flow
(operator requests in CRM, manager approves with one click, auto-funds), a
multi-account traffic comparison dashboard, and a bulk-comment tool letting an
operator run templated or generated comments with custom like counts across many
accounts via one action (accounts selected automatically by an eligibility
algorithm based on geo/timing/rest state) instead of manually logging into 10+
accounts to post one comment each.

**What is SAFE to publish (engineering framing only):**
- "Built a lifecycle-management system for a large pool of operational accounts —
  automated scheduling under tight hardware constraints, health monitoring, and
  state synchronization across manual and automated activity."
- The scheduling-algorithm problem is genuinely interesting and safe to describe
  in engineering terms: fixed number of concurrent execution slots (resource
  constraint), need to guarantee every entity in a large pool gets a minimum
  amount of processing time within a rolling window — this is a legitimate
  distributed-scheduling problem, describable without ever saying what the
  "activity" was for.
- Risk-monitoring circuit breaker: "automatic anomaly detection with a
  fail-safe that halts spend within minutes if a controlled process starts
  trending into loss" — this is a great, generically-impressive reliability
  pattern. Publish this framing.
- Payment automation: card provisioning + budget approval workflow — safe,
  frame as "automated budget request/approval and funding workflow, replacing a
  fully manual per-account process."
- Bulk-action tooling with an eligibility algorithm — safe to mention as
  "templated bulk operations across accounts, with automatic eligibility
  selection" — do NOT specify these are comments/likes/social engagement.

**What must NEVER appear on the site, in any form, in any language:**
- The words "farm"/"фарм", "warming"/accounts being warmed to avoid detection
- Any mention of fake comments, fake likes, or simulating engagement
- Any mention of purchased/bought accounts
- Any mention of ban/detection evasion, or that the system existed to avoid a
  platform's anti-fraud detection
- The 20%→4% figure phrased as "ban rate" or "detection rate" — if used at all,
  phrase only as "reduced operational account attrition by roughly 5x" with no
  further explanation of what "attrition" means

**Numbers:** No dollar figure for this case — none is defensible without
disclosing the company's revenue/cost structure, which we are not doing. If a
number is used at all, use the relative multiple ("~5x reduction in account
attrition") not an absolute dollar amount.

**Placement:** deliberately last of the four, not the hero case, precisely
because even the filtered version invites a follow-up question ("what kind of
accounts / what activity") that the other three cases don't. If in doubt about
a specific sentence in this case, cut it rather than risk it — the other 3 cases
carry the site.

---

## Supporting system not built as a standalone case
**Short-link & domain redirect service** — simple redirect worker (comparable to
a self-hosted TinyURL), spun up per-request via CRM, gives the company its own
branded short domains instead of paying a third party. Serves real users to the
target landing page; serves link-preview bots (Telegram/Discord/etc.) proper
Open Graph meta (image/title/description) for the shared link — this is standard
practice, not something to hedge about. Improved click-through/traffic quality by
~8%. Savings: ~$4K/year (replaced paid third-party shortener) + ~$2K/year from
reselling the capability to partners/clients (~$6K/year combined) — both figures
are direct and defensible, publish as-is. Fold this into Case 3 (Unified Platform)
as a supporting bullet, or give it a short paragraph on its own — final call
during build, not worth its own full case-study page.

## Testimonials
None exist yet. Ivan has people he could ask. **Do not build a testimonials
section for launch.** If 1-2 come in before launch, add as a small quote block —
don't block launch waiting for them, and don't fabricate placeholders.

## Numbers summary table (for Impact Strip — use only these, no others)
| Metric | Value | Confidence |
|---|---|---|
| Years commercial experience | 5 (3+ backend-focused) | Solid |
| Peak engineering team led | 8 developers | Solid |
| Operations Automation time savings | 1–3h → ~15min | Solid |
| Operations Automation cost savings | ~$7K/year | Solid |
| Short-link service savings | ~$6K/year combined | Solid |
| Infrastructure proxy cost reduction | ~$3.5K/year (direct line item) | Solid — use this, not the larger indirect figure |
| Account attrition reduction | ~5x (20%→4%) | Use relative multiple only, no dollar figure, no explanation of "attrition" |
| Operational accounts under management | 500+ | Solid |
