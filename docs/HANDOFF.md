# Handoff

## Snapshot

Date: 2026-08-22

Batch 4 is complete after the SITE-044 accumulated gate. Batch 5 development
hardening is complete through the sequential remediation chain; SITE-050 through
SITE-055, SITE-062 through SITE-080 and SITE-059 are COMPLETE after the
accumulated local gate. SITE-083 is implemented pending the Batch 6 gate. The
repository has the application foundation, shared visual system, complete
homepage, four approved case-study routes, a CV route and a branded 404
fallback. The approved
documentation remains the source of truth for product, content, NDA boundaries,
routes and technical constraints.

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
- The 2026-08-22 full audit added the sequential Batch 5 remediation chain
  SITE-062 through SITE-080. The compiled production API validates requests,
  the dev command runs the compiled runtime, and SITE-059 passed the final local
  full-audit gate.
- SITE-083 added a prerendered `dist/404.html`, `noindex, follow` metadata, a
  shared-shell 404 page with recovery navigation, and the Nginx internal
  `error_page 404` fallback. Frontend typecheck, tests, build, metadata and
  content checks pass from `apps/frontend`.
- SITE-081 added selective GitHub Actions CI for the frontend and contact API,
  repository-wide checks, production verification and immutable GHCR image
  publishing with a release manifest.
- SITE-082 added the production deploy workflow and remote release helpers:
  selective service updates, first-launch deployment from the server-owned
  `.env`, Docker health checks,
  public smoke tests and rollback support. Production `.env` and server
  access remain external inputs and are never committed.
- The production compose was simplified to consume the existing server Traefik
  over the external `traffic_net` network. It no longer configures a Traefik
  service, certificate resolver, security middleware or catch-all host rules:
  `ivan.hubko.me` goes to frontend, `/api/*` goes to the contact API, and
  primary-host unknown paths keep the Nginx 404. The catch-all host redirect is
  now intended for the server Traefik compose.
- The final local verification completed with `12 PASS`, `0 DEFERRED` and
  `0 FAIL`, including both Docker image builds and the local production
  compose/runtime check.

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

- GitHub URL, final photo and GA4 Measurement ID are configured locally.
- Engineering Approach uses the approved themes from `docs/00–02`; no separate
  philosophy source is required.
- Current scope is implementation and local verification only. GitHub Actions
  and VPS execution are still external inputs. The deploy workflow expects
  `DEPLOY_HOST`, `DEPLOY_USER`, `DEPLOY_SSH_PRIVATE_KEY`, `DEPLOY_PATH` and,
  for a private GHCR, `GHCR_READ_TOKEN`. The production `.env` must already
  exist at `$DEPLOY_PATH/.env`; the workflow does not upload or overwrite it.
  The full contract is in `scripts/deploy/README.md`.
- Local Playwright checks passed for routes, responsive width, overflow,
  keyboard focus, form validation and configured GitHub/GA4/photo output.
- Local Docker and Playwright verification are the applicable runtime checks for
  this batch.

## Important safety notes

- Source docs contain restricted Case 4 terms for internal authoring. Never copy
  them into public source, metadata, generated assets or bundles.
- Do not publish the unverified proxy savings figure.
- Do not touch unrelated files in the parent Git working tree.

## Next action

Finish the remaining content review, then run SITE-061. The final gate should
review the committed workflows, configure the GitHub/VPS secrets and perform
the first controlled deployment when those external inputs are available.
SITE-081, SITE-082 and SITE-083 remain IMPLEMENTED_PENDING_GATE until that
full gate closes the batch.
