# SITE-020 — Implement the visual foundation

- Batch: 2
- Area: design system
- State: READY
- Depends on: SITE-014

## Goal

Turn the approved design direction into reusable tokens and primitives.

## Targeted context

- docs/00-brand-brief.md
- docs/DESIGN_SYSTEM.md
- docs/04-tech-spec.md

## Work

- Select Inter or Geist and a permitted mono font.
- Define light-theme colors, type scale, spacing, container and prose measure.
- Verify accent/text contrast.
- Add reusable tag, section intro, card, button, prose and metric primitives.
- Update DESIGN_SYSTEM.md with implemented values.

## Acceptance criteria

- No dark-mode code path exists.
- Mono is limited to labels, metrics, technologies and code-like fragments.
- Focus and reduced-motion styles are present.
- Tokens are reused by shared components.

## Focused checks

- npm run typecheck
- Manual contrast and narrow-width review.

## Deferred batch gate

Full responsive visual review.
