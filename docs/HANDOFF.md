# Handoff

## Snapshot

Date: 2026-08-21

Batch 4 is complete after the SITE-044 accumulated gate. The repository now has
the application foundation, shared visual system, complete homepage, four
approved case-study routes and a CV route. The approved documentation remains the
source of truth for product, content, NDA boundaries, routes and technical
constraints.

## What changed in this session

- Root agent instructions now describe the Ivan Hubko personal site.
- Local workflow skills now support small tasks grouped into batches.
- Full verification is reserved for explicit batch finalization.
- Quality gates are site-oriented and read-only.
- Persistent status, handoff, design-system, architecture, decision and task
  registry files have been established.
- The Batch 0 gate SITE-004 passed all available checks; SITE-001 through
  SITE-004 were marked COMPLETE and archived.
- Batch 1 added the frontend scaffold, six static routes, semantic shell,
  metadata API and content/meta verification scripts.
- Batch 1 gate SITE-014 passed all available checks: typecheck, build, frontend,
  content, metadata, static shell and hard-refresh route checks.
- SITE-010 through SITE-014 were marked COMPLETE and archived.
- Batch 2 added the light visual foundation, reusable primitives, complete
  homepage sections and accessible contact form shell.
- SITE-024 fixed prerender hydration, passed full responsive Playwright evidence
  and marked SITE-020 through SITE-024 COMPLETE and archived.
- Batch 3 added the reusable case-study layout, four approved case studies and
  the CV route. SITE-039 passed the accumulated typecheck, build, frontend,
  content and metadata gates, generated-route and JSON-LD inspection, and the
  Case 4 NDA review; SITE-030 through SITE-035 and SITE-039 are COMPLETE and
  archived.
- Batch 4 added a NestJS contact endpoint and connected the accessible form.
  Valid submissions are stored in server-side SQLite for manual processing; the
  API rejects invalid input, the honeypot and rate-limit excesses. SITE-044
  passed API/UI tests, typechecks, builds, public-content/meta verification and
  a local HTTP-to-SQLite persistence check. SITE-040, SITE-041 and SITE-044 are
  COMPLETE and archived.

## Resume recipe

1. Read AGENTS.md.
2. Read docs/PROJECT_STATUS.md, this file and docs/tasks/ACTIVE.md.
3. Read only the active task file and its listed source documents.
4. Implement one or more related tasks without widening their scope.
5. Run focused checks only.
6. Mark tasks IMPLEMENTED_PENDING_GATE with evidence.
7. Run the final gate task only after all preceding tasks in that batch are ready;
   it must run all available project checks and prove 100% closure.

## Current open inputs

- GitHub URL is missing.
- Engineering Philosophy source is missing.
- Photo is intentionally not blocking development; use the approved neutral slot.
- VPS/Docker/Traefik and DNS access are not available in the repository.
- Interactive browser runtime is unavailable in the current environment; static
  shell evidence is recorded, but keyboard walkthrough remains deferred.

## Important safety notes

- Source docs contain restricted Case 4 terms for internal authoring. Never copy
  them into public source, metadata, generated assets or bundles.
- Do not publish the unverified proxy savings figure.
- Do not touch unrelated files in the parent Git working tree.

## Next action

Start SITE-050, the Batch 5 SEO/social assets task.
