# SITE-059 — Close Batch 5 launch hardening

- Batch: 5
- Area: batch gate
- State: READY
- Depends on: SITE-050, SITE-051, SITE-052, SITE-053, SITE-054
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
