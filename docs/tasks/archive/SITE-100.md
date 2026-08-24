# SITE-100 — Restyle the branded 404 fallback

- Batch: 9
- Area: branded 404
- State: COMPLETE
- Depends on: SITE-099

## Goal

Bring the static 404 fallback into the approved dark system without changing HTTP,
indexing or recovery-navigation behavior.

## Non-goals

- Do not add a public route, sitemap entry or new copy scope.
- Do not weaken Nginx fallback handling or `noindex, follow` metadata.

## Targeted context

- docs/style-reference.html
- docs/07-visual-spec-reference.md
- apps/frontend/src/App.tsx
- apps/frontend/nginx.conf
- docs/03-site-structure-and-domains.md

## Work

- Replace the light/grid-heavy 404 visual with restrained dark surfaces, shared type,
  focus states and quiet systems signal treatment.
- Keep recovery links, one H1, shared shell, static `404.html` generation and HTTP
  404 behavior unchanged.

## Acceptance criteria

- 404 is visually coherent with the reference without competing with primary pages.
- Generated fallback remains non-indexable and navigable by keyboard.
- Known routes and redirect behavior remain unaffected.

## Focused checks

- Frontend build, metadata/content verification and generated `dist/404.html` review.
- 404 screenshots at desktop and mobile widths.

## Deferred batch gate

SITE-103 performs the complete secondary-route gate.

## Evidence

- Replaced the grid-heavy 404 visual with a restrained dark surface, quiet
  node/line signal, shared typography and reference focus treatment.
- Preserved the shared shell, one-H1 hierarchy, recovery destinations, static
  fallback generation, `noindex, follow` metadata and HTTP 404/Nginx behavior.
- Focused checks passed: `npm.cmd run build:frontend`,
  `npm.cmd run verify:content`, and `npm.cmd run verify:meta`.
- Generated `apps/frontend/dist/404.html` reviewed for `noindex, follow` and all
  recovery links.
- Visual verifier passed the branded fallback at 1440px, 768px and 390px with
  no server errors or horizontal overflow.
- Deferred: SITE-103 batch gate for the complete secondary-route review.
