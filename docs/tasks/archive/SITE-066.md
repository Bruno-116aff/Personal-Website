# SITE-066 — Replace the production verification stub

- Batch: 5
- Area: production-like verification
- State: COMPLETE
- Depends on: SITE-065

## Goal

Create an actionable production-like verification path so production readiness is
tested against built containers/runtime, not only source configuration.

## Non-goals

- Do not mark real DNS, TLS, Traefik or GA4 as verified without access.
- Do not mark real DNS, TLS or Traefik as verified without access.

## Work

- Replace the unconditional deferred script with a real local production-like gate.
- Verify direct route responses, trailing-slash behavior, unknown-route redirects,
  robots, sitemap, share assets, contact API status/CORS and security headers when available.
- Keep unavailable external checks as explicit DEFERRED records.
- Document the exact command and required environment values.

## Acceptance criteria

- The gate can pass against a local production-like runtime.
- It fails on broken routes, headers, assets or contact behavior.
- It distinguishes local runtime evidence from static evidence.
- No external access is silently replaced with a local PASS.

## Focused checks

- Build images/runtime when Docker is available.
- Run the production-like verification command.
- Inspect its PASS/DEFERRED/FAIL output.

## Deferred batch gate

SITE-059 reruns the local gate and records the accumulated local evidence.

## Implementation evidence

- Replaced the unconditional `verify:production` stub with
  `scripts/verify-production.ts`. When Docker is available it builds the
  frontend and contact API production images, starts temporary local containers,
  and removes them and their images after the run.
- The local production-like gate verifies all six direct routes, trailing-slash
  redirects, unknown-route redirect, robots, sitemap, share asset, contact API
  CORS preflight, valid POST response and configured runtime behavior. It reports
  local runtime results separately from static evidence.
- Local runtime evidence passed with `PASS: 23`, `DEFERRED: 0`, `FAIL: 0`.
- Documented `npm run verify:production`, local default ports and the
  `PRODUCTION_VERIFY_FRONTEND_URL` / `PRODUCTION_VERIFY_CONTACT_API_URL`
  override in README.
- Focused checks passed: `npm run build`, `npm run verify:production`,
  `npm run verify:deployment` and `git diff --check`.
- Deferred to SITE-059: rerun the full accumulated local gate after all Batch 5
  tasks are complete.
