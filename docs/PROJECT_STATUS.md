# Project Status

## Current phase

Launch hardening.

Batch 3 content routes are complete. The repository now contains the
React/Vite/TypeScript/Tailwind source, six-route prerendering, semantic shell,
route metadata API, four approved case studies, a CV route and verification
scripts.

## Current decision

Build a polished English-only personal site for Ivan Hubko with:

- React + Vite + TypeScript;
- Tailwind;
- build-time prerendering for six known routes;
- content separated from presentation;
- a small NestJS contact endpoint on Ivan's existing infrastructure;
- Docker + Traefik deployment;
- light theme, restrained blue accent and product-like technical minimalism.

## Current batch

Batch 5 — launch hardening.

Batch 0 through Batch 4 are COMPLETE after their full batch gates. Active tasks
are listed in docs/tasks/ACTIVE.md. The plan contains seven batches and every
batch has its own final gate task.

## Completed

- Read and reconciled docs/00-brand-brief.md through docs/05-task-breakdown-for-codex.md.
- Replaced the inherited cross-project AGENTS.md with personal-site rules.
- Adapted project-workflow, quality-gates and commit-changes skills.
- Added persistent project context and batch/task conventions.
- Audited task scope and dependencies; split oversized work into independent tasks.
- Added seven mandatory batch-gate tasks; the registry contains 32 tasks total.
- Closed Batch 0 at 100% available-check coverage; SITE-001 through SITE-004 are archived.
- Created the Batch 1 React/Vite/Tailwind foundation, six prerendered routes,
  semantic shell and route metadata infrastructure.
- Closed Batch 1 with SITE-014: all available typecheck, build, frontend,
  content and metadata checks passed; production deployment and interactive
  browser walkthrough remain explicitly deferred due unavailable external
  inputs/runtime.
- Closed Batch 2 with SITE-024: the shared visual system and homepage passed
  typecheck, build, content, metadata, responsive Playwright and keyboard/focus
  checks. Production deployment verification remains a later scoped task.
- Closed Batch 3 with SITE-039: the four case studies and CV route passed
  typecheck, build, frontend, content and metadata checks, generated-route and
  JSON-LD inspection, and the final public-content and Case 4 NDA review.
  Production deployment verification remains explicitly deferred to Batch 5.
- Closed Batch 4 with SITE-044: the contact form and NestJS endpoint passed the
  full API/frontend gate. Submissions are validated, rate-limited and persisted
  to a server-side SQLite database for manual processing; SMTP delivery is not
  part of launch. A local HTTP submission was verified against a physical SQLite
  file. Deployment verification remains deferred to Batch 5.

## Known external inputs

- Real public GitHub URL.
- Original Engineering Philosophy source, if it exists.
- Final personal photo.
- GA4 Measurement ID.
- Search Console verification data.
- VPS, Docker/Traefik and DNS access.

These must stay configurable or explicitly blocked; never guess them.

## Next action

Start SITE-050, the SEO/social assets task.
