# SITE-069 — Centralize site-origin configuration

- Batch: 5
- Area: build configuration
- State: COMPLETE
- Depends on: SITE-068

## Goal

Resolve the mismatch where `VITE_SITE_URL` is documented but canonical origin is
hardcoded in multiple modules.

## Non-goals

- Do not change the canonical production host without an explicit product decision.

## Work

- Choose one validated origin configuration source.
- Use it for canonical URLs, sitemap, OG/Twitter image URLs and Person schema.
- Remove unused environment declarations or make them functional.
- Add validation for malformed/non-HTTPS production origins.

## Acceptance criteria

- No duplicated hardcoded site origin remains.
- Build output is internally consistent for the configured origin.
- Default production origin remains `https://ivan.hubko.me`.
- Tests cover empty and invalid configuration behavior.

## Focused checks

- `npm run typecheck`
- `npm run build`
- `npm run verify:meta`

## Deferred batch gate

SITE-059 confirms canonical and redirect behavior in production-like responses.

## Implementation evidence

- Added `apps/frontend/src/lib/site-config.ts` as the single validated site-origin
  resolver. Empty configuration falls back to `https://ivan.hubko.me`; malformed,
  credentialed, path-bearing and non-HTTPS production values are rejected. HTTP
  is allowed only for explicit localhost development configuration.
- Wired `VITE_SITE_URL` through Vite, metadata, canonical/OG/Twitter URLs, Person
  schema, sitemap, Docker build args and generated discovery files. Removed the
  duplicated production origin from the HTML template and metadata verifier.
- Added four focused resolver tests covering empty, valid HTTPS, localhost
  development and invalid/non-HTTPS configuration behavior.
- Focused checks passed: `npm run typecheck`, `npm run test`, `npm run build`,
  `npm run verify:meta`, and a custom-origin build/metadata check with
  `VITE_SITE_URL=https://preview.example.com`.
- Deferred to SITE-059: final canonical and redirect verification through the
  production Docker/Nginx/Traefik runtime.
