# SITE-050 — Finish SEO, structured data and social assets

- Batch: 5
- Area: SEO/social
- State: COMPLETE
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
- Include the owner-supplied GitHub URL in the homepage `sameAs` data.

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

## Implementation evidence

- Added route-specific OG/Twitter images and generated six 1200×630 PNG assets.
- Generated `robots.txt` and `sitemap.xml` during the production build, including
  `/cv` as an indexable primary route.
- Homepage schema provides `WebSite` and `Person`; approved LinkedIn and the
  configured GitHub URL appear in `sameAs`. Case-study `Article`
  schema uses no unverified publication or modification dates.
- Focused checks passed: `npm.cmd run build`, `npm.cmd run verify:meta`, generated
  HTML/JSON-LD inspection, sitemap/robots inspection and PNG dimension inspection.
- Deferred to SITE-059: repeat the accumulated metadata verification after all
  Batch 5 changes. Deferred to deployment access: HTTP verification that the
  production host serves the sitemap, robots file and share assets.
