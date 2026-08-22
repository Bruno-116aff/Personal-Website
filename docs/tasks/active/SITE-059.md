# SITE-059 — Close Batch 5 launch hardening

- Batch: 5
- Area: batch gate
- State: BLOCKED
- Depends on: SITE-050, SITE-051, SITE-052, SITE-053, SITE-054, SITE-055
- Gate type: mandatory full batch verification

## Goal

Verify every launch-hardening concern together and close Batch 5 at 100%.

## Full gate

- npm run typecheck
- npm run build
- npm run verify
- npm run verify:content
- npm run verify:meta
- npm run verify:production when production-like output is available.
- Run full responsive evidence, accessibility review and performance checks.
- Inspect Docker/Traefik responses for HTTPS and all required security headers.
- Verify configured analytics events fire once each.
- Reconcile all hardening work against docs/00 through docs/05.

## Acceptance criteria

- No hardening area is merely source-configured without required response evidence.
- No secret or restricted source material is present in build output.
- Metadata, redirects, headers, share assets and analytics are coherent.
- Every unavailable user-owned input has an explicit owner and launch decision.

## Failure policy

The batch remains open until every available check passes. A missing credential,
DNS access or analytics account cannot be silently treated as a successful check.

## Gate evidence

The accumulated Batch 5 gate was executed after all six implementation tasks
reached `IMPLEMENTED_PENDING_GATE`.

PASS:

- `npm.cmd run typecheck` and `npm.cmd run typecheck:contact-api`.
- `npm.cmd run test:contact-api` (5 tests) and `npm.cmd run test:contact-form`
  (3 tests).
- `npm.cmd run build` and `npm.cmd run verify:frontend`.
- `npm.cmd run verify:accessibility`, `npm.cmd run verify:performance`,
  `npm.cmd run verify:content`, `npm.cmd run verify:meta` and
  `npm.cmd run verify:deployment`.
- `npm.cmd run verify` (the command reports production verification as deferred).
- Quality-gates frontend, content and production scans found no matches.
- `docker compose --env-file .env.example build` passed with the documented
  non-BuildKit fallback; both frontend and contact API images built.
- Local production-like runtime evidence passed: all six public routes,
  `robots.txt`, `sitemap.xml` and a share image returned `200`; trailing-slash
  and unknown-path redirects returned `301` with host-preserving relative
  locations; the contact API returned `201` with the configured CORS origin.
- Fixed Nginx redirects to disable internal-port absolute URLs and added a
  deployment-verifier regression marker for `absolute_redirect off;`.

DEFERRED / BLOCKED:

- `npm.cmd run verify:production` intentionally exits `2` with
  `DEFERRED: production verification is owned by a later implementation task.`
  The repository has no VPS, DNS, Traefik certificate resolver or production
  endpoint, so real HTTPS responses and HSTS/CSP/security headers cannot be
  verified.
- The GA4 Measurement ID/account is user-owned and absent; live browser event
  delivery cannot be verified. Manual browser walkthroughs for keyboard,
  reduced-motion, zoom and responsive behavior are also unavailable here.
- SMTP delivery is not part of the current launch contract; local API
  persistence and validation were verified instead.

Batch 5 remains open. Re-run SITE-059 after the VPS/DNS/Traefik and GA4 inputs
are supplied, then close the batch only after every deferred check is PASS.
