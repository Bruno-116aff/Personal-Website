# SITE-083 — Add branded 404 route and fallback handling

- Batch: 10
- Area: frontend routing / deployment
- State: COMPLETE
- Depends on: SITE-103

## Goal

Create a polished, navigable 404 page and configure the static frontend to serve
it with HTTP status 404 for unknown paths.

## Non-goals

- Do not add a new public content route to the sitemap.
- Do not change the approved primary navigation or add a second language.
- Do not alter the existing known-route page content.

## Targeted context

- docs/style-reference.html
- docs/07-visual-spec-reference.md
- docs/03-site-structure-and-domains.md
- apps/frontend/src/App.tsx
- apps/frontend/nginx.conf

## Acceptance criteria

- Unknown paths render a distinct branded 404 page with one H1 and useful links
  to home, work, about, contact and CV through the existing navigation model.
- The page is statically generated as `dist/404.html`, carries `noindex, follow`
  metadata, and is excluded from the sitemap.
- Nginx serves the page as a fallback with HTTP 404 while preserving known route
  handling and trailing-slash redirects.
- Focused route, build, metadata and content checks pass.
- Current-state documentation records the new fallback behavior and task result.

## Focused checks

- From `apps/frontend`: `npm.cmd run typecheck`
- From `apps/frontend`: `npm.cmd run test`
- From `apps/frontend`: `npm.cmd run build`
- From `apps/frontend`: `npm.cmd run verify:meta`
- From `apps/frontend`: `npm.cmd run verify:content`
- Static Nginx and generated `dist/404.html` inspection.

## Deferred batch gate

SITE-061 must run the complete repository verification and release review.

## Implementation note

- Changed behavior: unknown primary-host paths now render the shared-shell 404
  page with recovery links and retain HTTP status 404 through Nginx.
- Evidence: `npm.cmd run typecheck`, `npm.cmd run test`, `npm.cmd run build`,
  `npm.cmd run verify:meta` and `npm.cmd run verify:content` pass from
  `apps/frontend`; generated `dist/404.html` and Nginx static inspection pass
  with one H1, recovery links to home/work/about/contact/CV, `noindex, follow`,
  sitemap exclusion, known-route handling and trailing-slash redirects.
- Deferred: full repository and release gate remains SITE-061.
