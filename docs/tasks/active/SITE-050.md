# SITE-050 — Finish SEO, structured data and social assets

- Batch: 5
- Area: SEO/social
- State: READY
- Depends on: SITE-044

## Goal

Complete discoverability and share metadata for all public routes.

## Targeted context

- docs/01-content-facts.md
- docs/02-copywriting-guidelines.md
- docs/03-site-structure-and-domains.md
- docs/04-tech-spec.md

## Work

- Add homepage WebSite + Person JSON-LD.
- Add Article JSON-LD to all four case routes.
- Generate robots.txt, sitemap.xml and 1200x630 share assets.
- Verify title, description, canonical and OG/Twitter metadata per route.
- Omit GitHub sameAs until the real URL is supplied.

## Acceptance criteria

- Every route has unique valid metadata.
- Structured data contains no unsupported dates or URLs.
- Share assets resolve on the production host.
- /cv is the primary indexable CV route.

## Focused checks

- npm run build
- Inspect generated HTML and JSON-LD.

## Deferred batch gate

npm run verify:meta and production URL checks.
