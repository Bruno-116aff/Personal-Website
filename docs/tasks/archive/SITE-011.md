# SITE-011 — Add prerendered route generation

- Batch: 1
- Area: prerender/routes
- State: COMPLETE
- Depends on: SITE-010

## Goal

Generate meaningful HTML for all six known routes at build time.

## Targeted context

- docs/03-site-structure-and-domains.md
- docs/04-tech-spec.md
- docs/ARCHITECTURE.md

## Work

- Define the six canonical route entries.
- Add a Vite-compatible build-time prerender step.
- Ensure direct navigation and hard refresh resolve each route in static hosting.
- Keep route content available without client-side JavaScript.

## Acceptance criteria

- All six routes produce output.
- Generated HTML contains primary page content.
- Unknown-route redirect behaviour is deferred to the Traefik deployment task.
- No Next.js or unnecessary runtime framework is introduced.

## Focused checks

- npm run build
- Inspect generated HTML for each route.

## Deferred batch gate

Full frontend route and prerender audit.

## Implementation note

- Added the six canonical route entries in `src/routes.ts` and route-aware
  rendering in the shared React entry.
- Added a Vite build plugin that writes each route to a static
  `dist/**/index.html`, while preserving client hydration for enhancements.
- Unknown-route redirect behavior remains deferred to the Traefik deployment
  task; no Next.js or additional runtime framework was introduced.
- Focused evidence: `npm.cmd run build`, `npm.cmd run typecheck`, inspection of
  all six generated HTML files, and `git diff --check` passed on 2026-08-21.

## Batch finalization

- SITE-014 accumulated route and hard-refresh checks passed for all six routes
  on 2026-08-21.
