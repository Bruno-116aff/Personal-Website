# SITE-090 — Rebuild the dark semantic shell and navigation

- Batch: 7
- Area: shell / navigation
- State: COMPLETE
- Depends on: SITE-089

## Goal

Apply the reference nav, IH mark, global links, focus treatment and footer rhythm to
the existing semantic shell.

## Non-goals

- Do not change navigation destinations, analytics events or route behavior.
- Do not add dropdowns, icons libraries or animated navigation.

## Targeted context

- docs/style-reference.html
- docs/07-visual-spec-reference.md
- apps/frontend/src/components/SiteShell.tsx
- apps/frontend/src/styles/index.css
- docs/03-site-structure-and-domains.md

## Work

- Match reference header border, spacing, mark size, link hierarchy and CV arrow.
- Keep skip-to-content, named nav landmark, current-page state and cross-route anchors.
- Implement visible indigo focus treatment and reduced-motion-safe 150ms interactions.
- Make 390px navigation wrap intentionally without clipping or horizontal scrolling.

## Acceptance criteria

- Header/footer render consistently on home, cases, CV and 404.
- Keyboard focus and current-page semantics remain visible and correct.
- No shell control relies on hover, transform lift or light surface styling.

## Focused checks

- Frontend typecheck.
- Shell screenshots at desktop and mobile widths.

## Evidence

- `npm.cmd run typecheck` — passed.
- Shell screenshot — passed at 1440px desktop and 390px mobile after loading the live local app.
- Browser shell check — passed: semantic navigation/main/footer landmarks, home `aria-current`, indigo skip-link focus, and no horizontal overflow at 390px.

## Batch 7 gate finalization

SITE-093 completed the full foundation gate at 100% on 2026-08-24. Shell landmarks,
focus treatment, navigation semantics and responsive header/footer behavior are
closed across all generated routes.
