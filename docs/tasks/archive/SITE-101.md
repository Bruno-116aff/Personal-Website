# SITE-101 — Update static brand surfaces for the dark system

- Batch: 9
- Area: static visual assets
- State: COMPLETE
- Depends on: SITE-100

## Goal

Align public share images, manifest colors and any contrast-sensitive static brand
surface with the approved dark palette while preserving all existing metadata facts.

## Non-goals

- Do not change titles, descriptions, canonical URLs, structured-data claims or icons
  without a contrast/compatibility need.
- Do not generate new public claims or use an external image service at runtime.

## Targeted context

- docs/style-reference.html
- docs/07-visual-spec-reference.md
- apps/frontend/src/lib/metadata.ts
- apps/frontend/public/site.webmanifest
- apps/frontend/public/images/share

## Work

- Regenerate the existing 1200×630 share-image set using graphite surfaces, approved
  indigo/control colors and unchanged route-specific title text.
- Update manifest and document theme colors to the dark base.
- Inspect favicon/mark contrast and change only if a required surface makes it fail.

## Acceptance criteria

- Every existing share asset remains present, non-empty, correctly dimensioned and
  referenced by unchanged metadata logic.
- Static assets contain no unsupported public fact or restricted Case 4 detail.
- Browser chrome/PWA surfaces do not flash white under the dark system.

## Focused checks

- Metadata and performance verifiers.
- Static asset existence/dimension inspection.

## Deferred batch gate

SITE-103 performs the complete secondary-route gate.

## Evidence

- Regenerated all six existing 1200x630 share images with the approved dark palette,
  self-hosted typography, subtle system motif and unchanged route-specific text.
- Preserved metadata logic and asset path references; no unsupported public facts or
  restricted Case 4 details were added.
- Updated public favicon surfaces from the legacy dark fill to approved accent-text
  contrast on dark browser/PWA surfaces. Manifest and document theme colors were
  already `#0A0B0F` and remain unchanged.
- Focused checks passed: `npm.cmd run verify:meta` and
  `npm.cmd run verify:performance`.
- Static asset inspection passed: all six PNGs exist, are non-empty and are
  1200x630; all seven public favicon SVGs now use `#8AA0FF`.
- Deferred: SITE-103 batch gate for the complete secondary-route review.
