# SITE-075 — Harden tablet responsive layout

- Batch: 5
- Area: responsive UI
- State: COMPLETE
- Depends on: SITE-074

## Goal

Make intermediate tablet widths intentionally usable instead of relying on
accidental grid wrapping.

## Non-goals

- Do not redesign the page or add mobile navigation.

## Work

- Review impact, capability, work, expertise, case-result and contact grids.
- Add an appropriate intermediate breakpoint or fluid `minmax` strategy.
- Check long metric labels, navigation, tags, forms and case-study links.
- Avoid using global overflow hiding to conceal layout defects.

## Acceptance criteria

- No horizontal overflow or clipped focus state at 390px, 768px, 1024px or 1440px.
- Metrics and controls remain readable and operable.
- Long case-study copy wraps without breaking layout.
- Reduced-motion and keyboard behavior remain intact.

## Focused checks

- Production build.
- Browser/Playwright walkthrough when available.
- `npm run verify:accessibility`

## Deferred batch gate

SITE-059 performs the final responsive walkthrough.

## Implementation evidence

- Added an explicit tablet breakpoint at `max-width: 64rem`: impact and
  capability grids use two readable columns, while work, expertise and
  case-study result grids retain an intentional two-column layout.
- Balanced the tablet contact grid and made long contact values wrap safely;
  case-study navigation can wrap without clipping links or focus outlines.
- Removed global horizontal overflow hiding so layout defects are not masked;
  existing light-only, keyboard-focus and reduced-motion behavior remains
  intact.
- Focused checks passed: `npm run build`, `npm run verify:accessibility` for 6
  generated routes, responsive CSS assertions and `git diff --check`.
- Local Playwright walkthrough passed for mobile width and no horizontal
  overflow; SITE-059 remains the final supported-viewport review and accumulated
  Batch 5 gate.
