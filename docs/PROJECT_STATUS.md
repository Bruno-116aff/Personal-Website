# Project Status

## Current phase

The final public copy implementation is complete; Batch 13 is COMPLETE by
explicit user confirmation after the copy, metadata, production and visual
checks. External production launch inputs remain explicitly pending.

Batch 5 development hardening is complete. Batch 9 replaced the approved light
visual foundation with the dark reference implementation in `style-reference.html`
and `07-visual-spec-reference.md`. The repository already
contains the React/Vite/TypeScript/Tailwind source, six public prerendered routes,
a static 404 fallback, semantic shell, route metadata API, four approved case
studies, a CV route and verification scripts.

## Current decision

Build a polished English-only personal site for Ivan Hubko with:

- React + Vite + TypeScript;
- Tailwind;
- build-time prerendering for six known routes;
- content separated from presentation;
- a small NestJS contact endpoint on Ivan's existing infrastructure;
- local Docker-compatible runtime;
- dark-only graphite theme, restrained indigo accent and product-like technical
  minimalism defined by the visual reference.

## Current batch

Batch 13 — final copy specification COMPLETE. SITE-112 through SITE-114 are
archived after explicit user confirmation.

Batch 0 through Batch 11 are COMPLETE after their full local batch gates. Batch 12
is COMPLETE by explicit user confirmation. External
deployment and account-owned verification are not represented as completed local
work.

## Completed

- Read and reconciled docs/00-brand-brief.md through docs/05-task-breakdown-for-codex.md.
- Replaced the inherited cross-project AGENTS.md with personal-site rules.
- Adapted project-workflow, quality-gates and commit-changes skills.
- Added persistent project context and batch/task conventions.
- Audited task scope and dependencies; split oversized work into independent tasks.
- Added seven mandatory batch-gate tasks; the active registry now contains the
  Batch 9–10 work, with Batch 6 through Batch 8 task files archived separately.
- Closed Batch 0 at 100% available-check coverage; SITE-001 through SITE-004 are archived.
- Created the Batch 1 React/Vite/Tailwind foundation, six prerendered routes,
  semantic shell and route metadata infrastructure.
- Closed Batch 1 with SITE-014: all available typecheck, build, frontend,
  content, metadata and local runtime checks passed.
- Closed Batch 2 with SITE-024: the shared visual system and homepage passed
  typecheck, build, content, metadata, responsive Playwright and keyboard/focus
  checks. External operations are outside the current development scope.
- Closed Batch 3 with SITE-039: the four case studies and CV route passed
  typecheck, build, frontend, content and metadata checks, generated-route and
  JSON-LD inspection, and the final public-content and Case 4 NDA review.
  Local development verification remained green.
- Closed Batch 4 with SITE-044: the contact form and NestJS endpoint passed the
  full API/frontend gate. The current contact contract validates, rate-limits
  and persists submissions in server-side SQLite for manual processing. A local
  HTTP submission was verified against a physical SQLite file.
- SITE-050 through SITE-055, SITE-062 through SITE-080 and SITE-059 are COMPLETE
  after the accumulated local gate.
- SITE-083 implements the branded not-found page, static `dist/404.html`,
  `noindex, follow` metadata and the Nginx HTTP 404 fallback. Its focused
  frontend checks pass; it is archived COMPLETE after the Batch 10 gate.
- Closed Batch 6 with SITE-088: the complete local suite passed with 12 PASS,
  0 DEFERRED and 0 FAIL; production verification passed 23 assertions, and
  visual review captured the reference, six public routes and 404 at all three
  required viewports with no live-route overflow. SITE-084 through SITE-088 are
  archived COMPLETE.
- Closed Batch 7 with SITE-093: the complete local suite passed with 12 PASS,
  0 DEFERRED and 0 FAIL, production verification passed 23 assertions, and
  responsive visual evidence plus manual shell, primitive and contact review
  passed at 1440px, 768px and 390px. SITE-089 through SITE-093 are archived
  COMPLETE.
- Closed Batch 8 with SITE-097: the complete gate protocol passed 14/14 commands
  with 0 DEFERRED and 0 FAIL; production verification passed 23 assertions, and
  responsive visual plus manual DOM evidence covered the reference, homepage,
  all four case studies, CV and branded 404 at 1440px, 768px and 390px. SITE-094
  through SITE-097 are archived COMPLETE.
- Closed Batch 9 with SITE-103: the complete gate protocol passed 12/12 commands
  with 0 DEFERRED and 0 FAIL; production verification passed 23 assertions,
  quality-gate frontend/content/production scans passed, and responsive visual
  evidence covered the reference, six public routes and branded 404 at 1440px,
  768px and 390px. SITE-098 through SITE-103 are archived COMPLETE.
- SITE-081 and SITE-082 implement selective CI, immutable GHCR image publishing,
  release manifests, first-launch deployment from the server-owned `.env`,
  health/smoke checks and rollback helpers. Both are archived COMPLETE after the
  Batch 10 gate.
- Production routing now assumes the separately managed server Traefik from
  `traffic_net`: frontend labels serve `ivan.hubko.me`, `/api/*` routes to the
  contact API, unknown primary-host paths remain Nginx 404s, and the server
  Traefik compose owns the catch-all redirect for all other hosts.
- Closed Batch 10 with SITE-061: the complete command suite passed with 12 PASS,
  0 DEFERRED and 0 FAIL; local production-like verification passed 23 assertions;
  quality-gate scans passed; and visual evidence covered the reference, six public
  routes and branded 404 at 1440px, 768px and 390px. SITE-060, SITE-081, SITE-082,
  SITE-083 and SITE-061 are archived COMPLETE.
- Closed Batch 11 with SITE-105: added progressive reveal motion, a reduced-motion
  safe fallback and a thin scroll-progress indicator for long Case Study/CV routes;
  the complete command suite passed with 12 PASS, 0 DEFERRED and 0 FAIL,
  production-like verification passed 23 assertions, and responsive visual review
  covered the reference, six public routes and branded 404 at 1440px, 768px and
  390px. SITE-104, SITE-106, SITE-107, SITE-108, SITE-109 and SITE-105 are archived
  COMPLETE.
- Closed Batch 12 with SITE-111: SITE-110 constrained the desktop shell header to
  the shared content container while preserving responsive navigation; the user
  confirmed both tasks were checked and complete.

## Current scope boundary

This batch covered implementation and local verification only. GitHub Actions/GHCR
publication, VPS SSH access, production `.env`, live DNS/HTTPS/Traefik, production
mail credentials, GA4 Measurement ID verification and Search Console verification
remain external release inputs and were not executed from this workspace. The final
photo remains intentionally deferred by the approved text-only About contract.

## Audit remediation plan

The 2026-08-22 repository audit found verification false-green behavior, stale
current-state documentation, missing Engineering Approach content, incomplete
structured data, route/content duplication, deployment hardening gaps and several
frontend polish issues. The focused remediation chain is implemented, including
compiled-runtime validation for development and local Playwright browser
verification. Local Docker and Playwright evidence are available. Batch 5 is now
closed after its local gate.

## Next action

The next operational step is to supply the listed external release inputs and
run the controlled deployment/release verification. The unrelated repository-wide
Impeccable formatting baseline remains recorded for future maintenance.
