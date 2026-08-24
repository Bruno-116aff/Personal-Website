# SITE-091 — Rebuild shared primitives and technology presentation

- Batch: 7
- Area: shared primitives
- State: COMPLETE
- Depends on: SITE-090

## Goal

Centralize the reference’s button, card, metric, section-intro, tag and dense
technology-list patterns so every route inherits the same visual decisions.

## Non-goals

- Do not rewrite factual arrays or case-study copy.
- Do not introduce bordered pill walls, shadows or hover transforms.

## Targeted context

- docs/style-reference.html
- docs/07-visual-spec-reference.md
- apps/frontend/src/components/primitives.tsx
- apps/frontend/src/styles/index.css
- apps/frontend/src/content/home.ts

## Work

- Give all controls the reference radius, padding, borders, primary/secondary states
  and accessible focus behavior.
- Make cards surface-only, with subtle background/border hover changes only where
  interactive; preserve the quiet Case 4 modifier.
- Restrict flat mono tags to sparse hero/CV metadata.
- Add a semantic middle-dot technology-list primitive for dense expertise, work and
  case-study arrays; retain accessible list semantics and labels.

## Acceptance criteria

- No shared primitive uses a light token, shadow or transform lift.
- Dense technology groups are not rendered as individual bordered pills.
- Existing component consumers typecheck without duplicated route styling.

## Focused checks

- Frontend typecheck and primitive smoke build.
- Hero/work/technology section screenshots.

## Batch 7 gate finalization

SITE-093 completed the full foundation gate at 100% on 2026-08-24. Shared controls,
surface-only cards, semantic technology lists and dark interaction patterns are
closed across all generated routes.

## Evidence

- Rebuilt the shared Tag, Button, Card, Metric and SectionIntro styling against
  the dark reference tokens; interactive cards now change only border/background,
  and no shared primitive uses a light token, shadow or lift transform.
- Added the semantic `TechnologyList` (`ul`/`li`) primitive with accessible labels
  and decorative middle-dot separators. Dense homepage capability, work, expertise,
  case-study technology and CV skill arrays now use it; sparse hero/CV metadata
  remains on `Tag`.
- `npm.cmd run typecheck` (from `apps/frontend`) — PASS.
- `npm.cmd run build` (from `apps/frontend`) — PASS; Vite production build completed
  with 41 modules transformed.
- Browser smoke screenshots for hero, work and technology sections passed at
  1440×1200 and 390×844. Verified 15 labeled technology lists, semantic `ul`/`li`
  structure, reference radius/surface treatment, no shadow/transform lift and no
  horizontal overflow at the mobile viewport.
