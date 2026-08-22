# SITE-065 — Complete Article structured data

- Batch: 5
- Area: SEO structured data
- State: COMPLETE
- Depends on: SITE-064

## Goal

Bring case-study JSON-LD into alignment with the route specification while using
only verified site publication metadata.

## Non-goals

- Do not invent project dates.
- Do not add unsupported author, company or business claims.

## Work

- Add verified `datePublished` and `dateModified` values for each case page, or
  update the governing document if those fields are intentionally optional.
- Add stable Person identity linkage and `mainEntityOfPage` where appropriate.
- Keep image, headline, canonical URL and author consistent per route.
- Extend metadata verification to assert the chosen contract.

## Acceptance criteria

- All four Article documents satisfy the approved schema contract.
- Dates describe the public page, not confidential project history.
- JSON-LD remains valid and contains no restricted Case 4 material.
- `npm run verify:meta` fails on missing or inconsistent structured data.

## Focused checks

- `npm run build`
- `npm run verify:meta`
- Inspect all four generated JSON-LD blocks.

## Deferred batch gate

SITE-059 performs the final metadata and content reconciliation.

## Implementation evidence

- Updated the governing structured-data contract in `docs/03` so
  `datePublished` and `dateModified` remain optional until verified public page
  dates exist; confidential project dates are explicitly excluded.
- Added stable `Person @id` linkage and `mainEntityOfPage` to all four Article
  JSON-LD documents. Article headline, canonical URL, image and author remain
  route-consistent.
- Extended `verify:meta` to validate the Article contract on all four case pages,
  including stable author identity, main entity, image and the intentional
  absence of unverified dates. Homepage Person identity is checked against the
  same stable ID.
- Focused checks passed: `npm run build`, `npm run verify:meta`, inspection of
  all four generated Article JSON-LD blocks and `git diff --check`.
- Deferred to SITE-059: final metadata/content reconciliation after the full
  Batch 5 changes.
