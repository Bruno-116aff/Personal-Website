# SITE-011 — Add prerendered route generation

- Batch: 1
- Area: prerender/routes
- State: READY
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
