# SITE-013 — Add route metadata infrastructure

- Batch: 1
- Area: metadata
- State: READY
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
