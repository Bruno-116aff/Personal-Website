# SITE-013 — Add route metadata infrastructure

- Batch: 1
- Area: metadata
- State: COMPLETE
- Depends on: SITE-011

## Goal

Create one metadata API for titles, descriptions, canonical URLs, OG/Twitter cards
and structured-data hooks.

## Targeted context

- docs/02-copywriting-guidelines.md
- docs/03-site-structure-and-domains.md
- docs/ARCHITECTURE.md

## Work

- Define metadata per known route.
- Generate self-referencing canonical URLs on ivan.hubko.me.
- Keep GitHub sameAs configurable and omitted until the real URL exists.
- Ensure metadata is present in generated HTML.

## Acceptance criteria

- Every route has a unique title and meta description.
- Canonicals never point to a redirecting host.
- No invented dates, GitHub URL or analytics ID is emitted.

## Focused checks

- npm run build
- Inspect generated head output.

## Deferred batch gate

npm run verify:meta.

## Implementation note

- Added `src/lib/metadata.ts` as the route metadata API for unique titles,
  descriptions, self-referencing canonicals, OG/Twitter cards and structured
  data hooks.
- Wired metadata into the Vite prerender step so all six generated HTML files
  contain route-specific head output.
- Added optional `VITE_GITHUB_URL`, `VITE_LINKEDIN_URL` and
  `VITE_OG_IMAGE_URL` placeholders. Empty values are omitted; no GitHub URL,
  dates or analytics ID are emitted by default.
- Focused evidence: `npm.cmd run typecheck`, `npm.cmd run build`, generated
  head inspection for all six routes and `git diff --check` passed on
  2026-08-21.

## Batch finalization

- SITE-014 metadata verification passed for all six generated routes on
  2026-08-21.
