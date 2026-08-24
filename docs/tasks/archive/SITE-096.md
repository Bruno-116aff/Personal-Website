# SITE-096 — Restyle remaining homepage sections and remove live photo

- Batch: 8
- Area: homepage remaining sections
- State: COMPLETE
- Depends on: SITE-095

## Goal

Complete homepage rollout for career, approach, expertise, About and Contact while
keeping the site text-only in About until a real photo is supplied.

## Non-goals

- Do not modify public copy, factual arrays, contact behavior or route anchors.
- Do not retain the current public About image at an accessible URL.

## Targeted context

- docs/style-reference.html
- docs/07-visual-spec-reference.md
- apps/frontend/src/App.tsx
- apps/frontend/src/content/career.ts
- apps/frontend/public/images/about/ivan-hubko.jpg

## Work

- Apply shared typography, whitespace, hairlines and dense dot-list treatment to
  career, approach and expertise sections.
- Remove About photo markup and remove `ivan-hubko.jpg` from public output; expand
  text-only About layout without inventing a replacement image.
- Finish Contact layout with the shared dark form/link states from SITE-092.

## Acceptance criteria

- Homepage contains every existing approved text section in its original order.
- No public About photo is emitted or copied into `dist`.
- All technology groups avoid bordered pill walls and remain readable on mobile.

## Focused checks

- Frontend build and content verifier.
- Homepage full-page and mobile contact screenshots.

## Deferred batch gate

SITE-097 performs the homepage visual checkpoint and full gate.

## Implementation evidence

- Restyled career, approach and expertise sections with the shared dark
  typography, whitespace, hairlines and dense dot-separated technology lists.
- Removed the About photo markup and deleted `public/images/about/ivan-hubko.jpg`;
  About is text-only with no replacement image.
- Preserved all homepage section order, approved copy, contact behavior and
  anchors; added the shared dark focus state for contact links.
- Focused checks passed: `npm run build:frontend`, `npm run verify:content`,
  homepage full-page desktop and mobile contact screenshots; no About image
  nodes or dist references and no horizontal overflow.
- Batch gate evidence: SITE-097 passed the complete Batch 8 gate on 2026-08-24;
  Batch 8 closed at 100% with no deferred work.
