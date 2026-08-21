# SITE-024 — Close Batch 2 visual system and homepage

- Batch: 2
- Area: batch gate
- State: COMPLETE
- Depends on: SITE-020, SITE-021, SITE-022, SITE-023
- Gate type: mandatory full batch verification

## Goal

Verify the complete homepage and visual system and close Batch 2 at 100%.

## Full gate

- npm run typecheck
- npm run build
- npm run verify
- npm run verify:frontend
- npm run verify:content
- Run full responsive visual evidence at phone, tablet and desktop widths.
- Check contrast, keyboard flow, focus, reduced motion, overflow and first-scroll clarity.
- Reconcile visible homepage facts against docs/00 through docs/04.

## Acceptance criteria

- All homepage sections are present and use shared tokens/components.
- Public copy passes factual, NDA and banned-language checks.
- The first scroll communicates the approved positioning and impact.
- No visual or accessibility issue remains in the Batch 2 scope.

## Failure policy

The batch remains open until every failure is fixed or an exact external blocker is
documented; a focused check cannot close this batch.

## Gate result

- PASS: `npm.cmd run typecheck`, `npm.cmd run build`, `npm.cmd run verify`,
  `npm.cmd run verify:frontend`, `npm.cmd run verify:content` and
  `npm.cmd run verify:meta`.
- PASS: Playwright walkthrough at 390px, 768px and 1440px: homepage content is
  visible without horizontal overflow; the first screen states the approved role,
  Node.js/TypeScript and automation positioning; no new console errors occur.
  Keyboard review confirms the visible 3px focus outline, working skip link,
  semantic form labels/required controls and keyboard-skipped honeypot. The
  reduced-motion rule removes non-essential transitions.
- PASS: all six prerendered route directories load and hydrate directly without
  console errors; generated HTML, public-content, restricted-term and secret
  scans pass. `git diff --check` passes.
- FIXED: prerendering now uses hydratable SSR markup and normalizes trailing
  route slashes, removing React hydration failures discovered during this gate.
- DEFERRED: `npm.cmd run verify:production` exits DEFERRED because there is no
  deployment output or VPS/DNS access. Canonical no-trailing-slash route behavior
  must be verified with the static-hosting rules in SITE-054. The quality-gates
  scanner also cannot execute in this Cyrillic workspace path; equivalent targeted
  `rg` scans pass.
- COMPLETE: Batch 2 has passed every available scope-owned check. Production
  verification remains a deferred launch check owned by the later SITE-054 task;
  it does not block this visual-system and homepage batch.
