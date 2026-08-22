# SITE-052 — Harden accessibility

- Batch: 5
- Area: accessibility
- State: COMPLETE
- Depends on: SITE-044

## Goal

Close the explicit WCAG 2.2 AA-oriented accessibility gaps without mixing this work
with performance optimization.

## Targeted context

- docs/04-tech-spec.md
- docs/00-brand-brief.md
- docs/DESIGN_SYSTEM.md
- docs/03-site-structure-and-domains.md

## Work

- Verify contrast, heading hierarchy, landmarks, skip link and semantic controls.
- Verify keyboard navigation, focus visibility, zoom and form status messages.
- Verify meaningful alt text and decorative-image treatment.
- Verify reduced-motion behaviour and no color-only information.

## Acceptance criteria

- Every public route has one H1 and logical H2/H3 nesting.
- Navigation and contact form are usable without a mouse.
- Focus states and required contrast are visible.
- No accessibility issue is hidden by visual styling.

## Focused checks

- Run the accessibility scanner/audit available in the project.
- Manual keyboard walkthrough of all interactive routes.

## Deferred batch gate

SITE-059 runs all project checks and the final responsive/accessibility evidence.

## Implementation evidence

- Added `npm run verify:accessibility`, a generated-route audit covering one H1,
  ordered heading levels, named navigation, main and skip landmarks, image alt
  requirements, form ARIA status/error wiring, focus styling, reduced motion and
  WCAG AA contrast pairs.
- Removed the contact honeypot from the accessibility tree, added keyboard
  `:focus-within` context for interactive cards and strengthened photo-slot text
  contrast on the muted surface.
- Focused checks passed: `npm.cmd run build` and
  `npm.cmd run verify:accessibility` (six generated routes).
- Local Playwright verification covered keyboard traversal and responsive
  interaction; 200% zoom, reduced-motion verification on every route and live
  production remain deferred to SITE-059.
