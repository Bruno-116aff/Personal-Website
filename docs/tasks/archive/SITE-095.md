# SITE-095 — Rebuild homepage capability and work systems

- Batch: 8
- Area: homepage work
- State: COMPLETE
- Depends on: SITE-094

## Goal

Turn homepage cards into the reference’s connected systems grid without changing
case-study order, copy or destinations.

## Non-goals

- Do not add or remove work items, capabilities or technologies.
- Do not expose any new Case 4 detail.

## Targeted context

- docs/style-reference.html
- docs/07-visual-spec-reference.md
- apps/frontend/src/App.tsx
- apps/frontend/src/content/home.ts
- docs/01-content-facts.md

## Work

- Apply connected work-grid container border, 1px separators, 36px desktop padding,
  numbered order, quiet background hover and link-arrow micro-interaction.
- Preserve all four cards and Case 4 as fourth/visually quieter but accessible.
- Restyle capability groups with shared surface patterns and semantic technology lists.

## Acceptance criteria

- Work cards are one connected grid, never isolated shadow cards.
- Case ordering, labels, links and public facts remain unchanged.
- Hover/focus is calm, keyboard-visible and independent of transform/scale.

## Focused checks

- Route-manifest tests and frontend typecheck.
- Homepage work/capability screenshots.

## Deferred batch gate

SITE-097 performs the homepage visual checkpoint and full gate.

## Implementation evidence

- Rebuilt the homepage work cards as one connected bordered grid with 1px
  separators, 36px desktop padding and preserved 01–04 ordering.
- Kept Case 4 fourth and visually quieter while making it keyboard-focusable;
  hover/focus uses calm background treatment with no transform or scale.
- Preserved all four public cards, labels, destinations and approved summaries;
  capability technologies remain semantic lists with shared surface styling.
- Added the reference link-arrow gap/translation micro-interaction.
- Focused checks passed: route-manifest tests (4/4), `npm run typecheck:frontend`,
  and homepage work/capability screenshots at 1440px, 768px and 390px with no
  horizontal overflow.
- Batch gate evidence: SITE-097 passed the complete Batch 8 gate on 2026-08-24;
  Batch 8 closed at 100% with no deferred work.
