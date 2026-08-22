# Batch Plan

The project has exactly seven sequential batches. A batch contains small,
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

## Batch 5 — Launch hardening

Tasks: SITE-050, SITE-051, SITE-052, SITE-053, SITE-054, SITE-055, SITE-059 (gate).

Goal: finish SEO/social assets, analytics, accessibility, performance and
Docker/Traefik/security as separately verifiable concerns.
Gate: all available tests, SEO/content, production-like, responsive and security
checks.

## Batch 6 — Release

Tasks: SITE-060, SITE-061 (gate).

Goal: perform content/NDA, production and human launch review.
Gate: complete project verification against docs/00 through docs/05, plus live
walkthrough, domains, contact, analytics, security and redirects.

## Gate policy

A gate task cannot be completed with a focused check alone. It must run every
available full project check, record PASS/DEFERRED/FAIL evidence, resolve all
in-scope failures, and prove 100% closure before the batch is marked COMPLETE.
A missing user-owned value is recorded explicitly and never replaced by a guess.
