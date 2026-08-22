# SITE-068 — Create one route manifest

- Batch: 5
- Area: route architecture
- State: COMPLETE
- Depends on: SITE-067

## Goal

Remove route-list duplication across React routing, metadata, sitemap, checks and
server configuration where generation is safe.

## Non-goals

- Do not change the six approved public routes.
- Do not hide explicit Nginx/Traefik routing rules that need human review.

## Work

- Define a typed route manifest with path, page kind, title key and public status.
- Derive prerendering, sitemap, metadata checks and route test lists from it.
- Keep server-specific redirect rules explicit but validate them against the manifest.
- Add a test that detects missing or extra public routes.

## Acceptance criteria

- Adding/removing a public route has one application-level source of truth.
- All six current routes still generate correctly.
- Sitemap, canonical URLs and metadata remain aligned.
- Unknown-route behavior remains an explicit redirect, not an accidental fallback.

## Focused checks

- `npm run build`
- `npm run verify:meta`
- Direct inspection of all generated route files.

## Deferred batch gate

SITE-059 verifies route behavior against the final Docker/Nginx runtime.

## Implementation evidence

- Added a typed six-route manifest in `apps/frontend/src/routes.ts` with path,
  page kind, title key and public status. Prerendering and sitemap generation
  now use its public routes, while metadata definitions resolve through the
  manifest title keys.
- Derived metadata, accessibility, performance and production route checks from
  the manifest. Kept explicit Nginx route rules and added manifest-aligned
  deployment validation for their locations, files and trailing-slash redirects.
- Added `routes.spec.ts` to detect duplicate, missing or extra public routes and
  verify that every manifest route has metadata and a generated file path.
- Focused checks passed: `npm run typecheck`, `npm run build`, `npm run test`,
  `npm run verify:meta`, `npm run verify:accessibility`,
  `npm run verify:performance`, `npm run verify:deployment` and
  `git diff --check`. Production-like verification passed 20 checks with 0
  failures and no deferred runtime checks.
- Deferred to SITE-059: final accumulated route/runtime verification through the
  production Docker/Nginx/Traefik gate.
