# Handoff

## Snapshot

Date: 2026-08-24

Final release decision: Batch 11 is COMPLETE for the implemented local release
scope. External production deployment and account-owned verification remain pending
with exact status recorded below.

## Redesign replan

- `style-reference.html` and `07-visual-spec-reference.md` are now the mandatory
  visual sources of truth. The site changes from light-only to dark-only; no theme
  switcher is permitted.
- Batch 6 was replaced with four redesign batches (6–9). The former release tasks
  remain in Batch 10, so SITE-061 cannot close before the release work is explicitly
  verified.
- `#788191` is the accessible tertiary text token. Solid primary controls use
  `#4A67E5` with white text; these are the approved WCAG AA refinements.
- Batch 6 is complete after SITE-088, Batch 7 is complete after SITE-093, Batch 8
  is complete after SITE-097, Batch 9 is complete after SITE-103, Batch 10 is
  complete after SITE-061 and Batch 11 is complete after SITE-105. Every implementation task consulted both visual source
  files and preserved public copy, routes and API behavior.
- Each gate must run the complete project suite, capture desktop/tablet/mobile
  screenshots, update current-state docs and archive only after 100% closure.

## Prior implementation snapshot

Batch 4 is complete after the SITE-044 accumulated gate. Batch 5 development
hardening is complete through the sequential remediation chain; SITE-050 through
SITE-055, SITE-062 through SITE-080 and SITE-059 are COMPLETE after the
accumulated local gate. Batch 6 is complete after SITE-088; SITE-084 through
SITE-088 are archived COMPLETE. The
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
- SITE-082 added the production deploy workflow and remote compose release:
  selective service updates, first-launch deployment from the server-owned
  `.env`, Docker health checks,
  public smoke tests, rollback support and post-smoke removal of replaced
  images. Production `.env` and server access remain external inputs and are
  never committed.
- The production compose was simplified to consume the existing server Traefik
  over the external `traffic_net` network. It no longer configures a Traefik
  service, certificate resolver, security middleware or catch-all host rules:
  `ivan.hubko.me` goes to frontend, `/api/*` goes to the contact API, and
  primary-host unknown paths keep the Nginx 404. The catch-all host redirect is
  now intended for the server Traefik compose.
- The final local verification completed with `12 PASS`, `0 DEFERRED` and
  `0 FAIL`, including both Docker image builds and the local production
  compose/runtime check.
- Batch 6 visual review captured the dark reference, six public routes and 404
  at 1440x960, 768x1024 and 390x844. All 24 generated PNG artifacts are ignored
  by Git; live-route overflow checks passed. Live dark styling remains the
  explicit Batch 7–9 implementation scope, not an unreported Batch 6 deferral.
- SITE-084 through SITE-088 were marked COMPLETE and archived after the full
  gate. Batch 7 then closed after SITE-093 with 12 PASS, 0 DEFERRED and 0 FAIL,
  production verification at 23 PASS, and responsive visual evidence at all three
-  required viewports. SITE-089 through SITE-093 are archived COMPLETE.
- SITE-094 through SITE-096 completed the homepage rollout. SITE-097 then closed
  Batch 8 with 14 PASS, 0 DEFERRED and 0 FAIL, production verification at 23 PASS,
  and responsive visual evidence for the reference, homepage, all four case studies,
  CV and branded 404 at 1440x960, 768x1024 and 390x844. Manual DOM review confirmed
  section order, focus treatment, text-only About and no overflow. The side-by-side
  artifact is `apps/frontend/artifacts/visual-review/batch-8-side-by-side--desktop-1440x960.png`.
  SITE-094 through SITE-097 are archived COMPLETE.
- SITE-098 through SITE-102 rolled the dark system across the secondary routes,
  static brand surfaces and responsive layouts. SITE-103 then closed Batch 9 with
  12 PASS, 0 DEFERRED and 0 FAIL, production verification at 23 PASS, quality-gate
  scans passing, and complete visual evidence at 1440px, 768px and 390px. SITE-098
  through SITE-103 are archived COMPLETE. Batch 10 is closed by the final evidence
  below.

## Batch 10 final evidence

- SITE-061 closed Batch 10 with the complete command suite at 12 PASS, 0 DEFERRED
  and 0 FAIL, production-like verification at 23 PASS, quality-gate scans passing,
  and responsive visual evidence for the reference, six public routes and branded
  404. SITE-060, SITE-081, SITE-082, SITE-083 and SITE-061 are archived COMPLETE.
- SITE-105 closed Batch 11 with progressive reveal motion, reduced-motion support
  and route-scoped scroll progress. The complete root gate passed with 12 PASS,
  0 DEFERRED and 0 FAIL; production verification passed 23 assertions; responsive
  visual evidence covered all required routes and widths; SITE-104, SITE-106,
  SITE-107, SITE-108, SITE-109 and SITE-105 are archived COMPLETE.

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

- The final photo remains intentionally deferred; the approved text-only About
  section is the current implementation.
- Engineering Approach uses the approved themes from `docs/00–02`; no separate
  philosophy source is required.
- Current scope was implementation and local verification only. GitHub Actions/GHCR
  publication and VPS execution remain external inputs. The deploy workflow expects
  `DEPLOY_HOST`, `DEPLOY_USER`, `DEPLOY_SSH_PRIVATE_KEY` and `DEPLOY_PATH`.
  `DEPLOY_PORT` is optional. If GHCR is private, `GHCR_READ_TOKEN` belongs in
  GitHub Secrets; CD passes it to the remote pull/rollback command through
  SSH using a temporary Docker config and does not store it in the server
  `.env`.
  The full contract is in `scripts/deploy/README.md`.
- GA4 Measurement ID and Search Console verification are not present in this
  workspace; analytics remains configurable and local event verification is deferred
  until the user-owned ID is supplied.
- Production mail credentials, live DNS/HTTPS/Traefik behavior and external
  security-header/redirect responses are not available from this workspace.
- Local Docker and Playwright verification passed for routes, responsive width,
  overflow, keyboard focus, form validation, metadata and contact persistence.

## Important safety notes

- Source docs contain restricted Case 4 terms for internal authoring. Never copy
  them into public source, metadata, generated assets or bundles.
- Do not publish the unverified proxy savings figure.
- Do not touch unrelated files in the parent Git working tree.

## Next action

No local implementation task remains. Supply the listed external release inputs and
run the controlled deployment/release verification when production launch is ready.
