# SITE-073 — Connect favicon and manifest assets

- Batch: 5
- Area: frontend metadata/assets
- State: COMPLETE
- Depends on: SITE-072

## Goal

Make the existing approved brand and favicon assets part of the deployed site.

## Non-goals

- Do not create a new logo system.
- Do not add dark mode or unrelated branding work.

## Work

- Copy or expose the favicon variants from the approved asset directory.
- Add favicon, Apple touch icon and web manifest links.
- Add a minimal manifest with the approved light theme.
- Verify the assets are present in `dist` and served by Nginx.

## Acceptance criteria

- Browser favicon resolves on all routes.
- Apple touch icon and manifest resolve with valid content.
- No broken asset references remain.
- Asset caching rules are appropriate and do not cache HTML incorrectly.

## Focused checks

- `npm run build`
- Inspect `dist` assets and generated HTML.
- Verify static asset URLs in a production-like server.

## Deferred batch gate

SITE-059 verifies asset responses through the final runtime.

## Implementation evidence

- Exposed all approved favicon variants in `public` and added favicon, Apple
  touch icon and manifest links to the HTML template used by every generated
  route.
- Added a light-only `site.webmanifest` with the approved theme/background
  colors and 192px/512px SVG icon entries.
- Added explicit Nginx locations for the manifest and favicon variants with
  valid MIME types, one-day public caching and no HTML cache policy changes.
- Extended deployment verification to require the asset files and Nginx
  routing markers.
- Focused checks passed: `npm run build`, `npm run verify:content`,
  `npm run verify:meta`, `npm run verify:deployment`, generated `dist` asset
  and HTML inspection, frontend Docker/Nginx image build and asset-serving
  smoke test (`200`, correct MIME/cache headers, `/` and `/cv` uncached), and
  `git diff --check`.
- Deferred to SITE-059: final asset response verification through the real
  VPS/Traefik stack and accumulated Batch 5 gate.
