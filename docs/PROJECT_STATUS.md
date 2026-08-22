# Project Status

## Current phase

Development hardening.

Batch 5 development hardening is complete; the sequential remediation work
through SITE-080 and the SITE-059 local gate have passed. Batch 6 is active,
with SITE-081 and SITE-082 implemented pending gate, and SITE-083 adding the
branded 404 fallback. The repository now contains the React/Vite/TypeScript/Tailwind
source, six public prerendered routes, a static 404 fallback, semantic shell,
route metadata API, four approved case studies, a CV route and verification
scripts.

## Current decision

Build a polished English-only personal site for Ivan Hubko with:

- React + Vite + TypeScript;
- Tailwind;
- build-time prerendering for six known routes;
- content separated from presentation;
- a small NestJS contact endpoint on Ivan's existing infrastructure;
- local Docker-compatible runtime;
- light theme, restrained blue accent and product-like technical minimalism.

## Current batch

Batch 6 — release preparation.

Batch 0 through Batch 5 are COMPLETE after their full local batch gates. The
sequential audit-remediation chain SITE-062 through SITE-080 and SITE-059 have
passed the accumulated development checks.

## Completed

- Read and reconciled docs/00-brand-brief.md through docs/05-task-breakdown-for-codex.md.
- Replaced the inherited cross-project AGENTS.md with personal-site rules.
- Adapted project-workflow, quality-gates and commit-changes skills.
- Added persistent project context and batch/task conventions.
- Audited task scope and dependencies; split oversized work into independent tasks.
- Added seven mandatory batch-gate tasks; the active registry now contains only
  the two Batch 6 tasks, with 50 completed task files archived separately.
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
  frontend checks pass; it is IMPLEMENTED_PENDING_GATE.
- SITE-081 and SITE-082 implement selective CI, immutable GHCR image publishing,
  release manifests, first-launch deployment from the server-owned `.env`,
  health/smoke checks and rollback helpers. Both are IMPLEMENTED_PENDING_GATE.
- Production routing now assumes the separately managed server Traefik from
  `traffic_net`: frontend labels serve `ivan.hubko.me`, `/api/*` routes to the
  contact API, unknown primary-host paths remain Nginx 404s, and the server
  Traefik compose owns the catch-all redirect for all other hosts.

## Current scope boundary

This batch covers implementation and local verification only. GitHub Actions,
GHCR permissions, VPS SSH access, production `.env`, DNS and Traefik remain
external release inputs and have not been executed from this workspace.

## Audit remediation plan

The 2026-08-22 repository audit found verification false-green behavior, stale
current-state documentation, missing Engineering Approach content, incomplete
structured data, route/content duplication, deployment hardening gaps and several
frontend polish issues. The focused remediation chain is implemented, including
compiled-runtime validation for development and local Playwright browser
verification. Local Docker and Playwright evidence are available. Batch 5 is now
closed after its local gate.

## Next action

Run SITE-061 as the explicit full gate after the content review and record the
GitHub/VPS external inputs required for the first release.
