# Batch Plan

The project has eleven sequential batches. A batch contains small,
independently reviewable implementation tasks and ends with one mandatory
batch-gate task. The gate task is always the final task listed for that batch.

Normal tasks run focused checks and end in IMPLEMENTED_PENDING_GATE. A later
batch may start only after the preceding batch gate is COMPLETE. The final task
runs every available full project check, verifies all preceding task acceptance
criteria, and closes its batch only at 100%.

## Batch 0 — Process foundation

Tasks: SITE-001, SITE-002, SITE-003, SITE-004 (gate).

Goal: establish project instructions, persistent context, skills and task registry.
Gate: skill/context validation, registry consistency and repository diff checks.

## Batch 1 — Application foundation

Tasks: SITE-010, SITE-011, SITE-012, SITE-013, SITE-014 (gate).

Goal: create React/Vite/Tailwind project, prerender six routes, add semantic shell
and metadata plumbing.
Gate: all available typecheck, build, frontend, metadata and cross-cutting checks.

## Batch 2 — Visual system and homepage

Tasks: SITE-020, SITE-021, SITE-022, SITE-023, SITE-024 (gate).

Goal: implement the approved design system and complete the homepage in clear
content-sized slices.
Gate: all available tests, content checks, accessibility checks and full responsive
visual evidence.

## Batch 3 — Content routes

Tasks: SITE-030, SITE-031, SITE-032, SITE-033, SITE-034, SITE-035, SITE-039 (gate).

Goal: add a reusable case-study template, author each case independently, and
implement /cv.
Gate: all available tests, content/NDA checks, metadata checks and human checkpoint.

## Batch 4 — Contact integration

Tasks: SITE-040, SITE-041, SITE-044 (gate).

Goal: implement the NestJS endpoint and connect the accessible form with spam
protection and safe states.
Gate: all available API, frontend, build and end-to-end contact checks.

## Batch 5 — Development hardening and audit remediation

Tasks: SITE-050, SITE-051, SITE-052, SITE-053, SITE-054, SITE-055, SITE-062,
SITE-063, SITE-064, SITE-065, SITE-066, SITE-067, SITE-068, SITE-069, SITE-070,
SITE-071, SITE-072, SITE-073, SITE-074, SITE-075, SITE-076, SITE-077, SITE-078,
SITE-079, SITE-080, SITE-059 (gate).

Goal: finish development hardening, then resolve every issue found by the full audit as
one sequentially verifiable remediation chain.
Gate: SITE-059 runs every available local check, performs the final content/NDA
and architecture review, and records PASS/FAIL evidence for the whole batch.

## Batch 6 — Visual authority and verification foundation

Tasks: SITE-084, SITE-085, SITE-086, SITE-087, SITE-088 (gate).

Status: COMPLETE. SITE-088 closed the batch at 100% on 2026-08-24.

Goal: make the dark reference authoritative, reconcile all conflicting current
documents and create the visual/accessibility evidence contract before CSS changes.
Gate: full project suite, source-of-truth consistency review and reference artifact
inspection; archive only after every task is closed at 100%.

## Batch 7 — Dark foundation and shared UI

Tasks: SITE-089, SITE-090, SITE-091, SITE-092, SITE-093 (gate).

Status: COMPLETE. SITE-093 closed the batch at 100% on 2026-08-24.

Goal: implement dark tokens, local fonts, shell, primitives and shared interactive
states centrally before any route-specific rollout.
Gate: full project suite plus desktop/tablet/mobile shell and primitive evidence.

## Batch 8 — Homepage reference match

Tasks: SITE-094, SITE-095, SITE-096, SITE-097 (gate).

Status: COMPLETE. SITE-097 closed the batch at 100% on 2026-08-24.

Goal: make the homepage match the approved reference patterns while preserving all
approved copy, IA and contact behavior.
Gate: full project suite and side-by-side reference/homepage screenshot checkpoint.

## Batch 9 — Secondary routes and visual completion

Tasks: SITE-098, SITE-099, SITE-100, SITE-101, SITE-102, SITE-103 (gate).

Status: COMPLETE. SITE-103 closed the batch at 100% on 2026-08-24.

Goal: roll the system across four case studies, CV, 404 and static visual assets,
then resolve all route-level responsive and visual drift.
Gate: full project suite and complete desktop/tablet/mobile visual review of six
public routes plus the branded 404 page.

## Batch 10 — Release

Tasks: SITE-060, SITE-081, SITE-082, SITE-083, SITE-061 (gate).

Status: COMPLETE. SITE-061 closed the batch at 100% on 2026-08-24 for the local
release scope; external deployment/account-owned inputs remain explicitly deferred.

Goal: complete content/NDA review, CI/CD preparation and controlled production
release after the redesign is complete.
Gate: complete project verification, deployed visual review and external release
input verification.

## Batch 11 — Case-study presentation refinement

Tasks: SITE-104, SITE-106, SITE-107, SITE-105 (gate).

Status: IN_PROGRESS. SITE-105 is the deferred full verification gate.

Goal: remove decorative numeric prefixes from case-study page labels while
preserving the deliberate `01–04` order in homepage Featured Work.

## Gate policy

A gate task cannot be completed with a focused check alone. It must run every
available full project check, record PASS/DEFERRED/FAIL evidence, resolve all
in-scope failures, and prove 100% closure before the batch is marked COMPLETE.
A missing user-owned value is recorded explicitly and never replaced by a guess.

Every redesign gate, and the final release gate after it, must:

1. Confirm every earlier batch task is `IMPLEMENTED_PENDING_GATE` or `COMPLETE`.
2. Re-read `AGENTS.md`, `docs/style-reference.html`,
   `docs/07-visual-spec-reference.md` and the batch-relevant source documents.
3. Run all available commands: `npm run typecheck`, `npm run test`, `npm run build`,
   `npm --prefix apps/frontend run lint`, `npm run format:check`,
   `npm run verify:frontend`, `npm run verify:accessibility`,
   `npm run verify:performance`, `npm run verify:content`, `npm run verify:meta`,
   `npm run verify:deployment`, `npm run verify:production`,
   `npm --prefix apps/frontend run verify:visual` and `npm run verify`.
4. Inspect desktop (1440px), tablet (768px) and mobile (390px) visual evidence for
   the reference and every route included in the batch.
5. Fix only in-batch defects, rerun focused checks, then rerun the complete gate.
6. Update `PROJECT_STATUS.md`, `HANDOFF.md`, `ACTIVE.md` and this registry; mark all
   batch tasks COMPLETE and move their task files to `docs/tasks/archive`.
