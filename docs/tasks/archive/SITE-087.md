# SITE-087 — Establish visual evidence and dark-token verification

- Batch: 6
- Area: visual QA tooling
- State: COMPLETE
- Depends on: SITE-086

## Goal

Create repeatable local evidence for reference alignment, responsive behavior,
contrast and font-loading rules before route work starts.

## Non-goals

- Do not restyle pages in this task.
- Do not add a production dependency or remote font request.

## Targeted context

- docs/style-reference.html
- docs/07-visual-spec-reference.md
- apps/frontend/package.json
- apps/frontend/scripts/verify-accessibility.ts
- apps/frontend/scripts/verify-performance.ts

## Work

- Add a dev-only Playwright visual-review command that captures the reference and
  live routes at 1440×960, 768×1024 and 390×844 into ignored artifacts.
- Make the command fail on horizontal overflow and report every captured route.
- Update accessibility verification to assert the approved dark contrast pairs.
- Update performance verification to permit only expected local WOFF2 faces with
  `font-display: optional` and reject remote font URLs, old light tokens and excess
  client dependencies.

## Acceptance criteria

- A documented visual command captures the reference, six public routes and 404.
- Accessibility/performance checks express the new design contract, not old colors.
- Generated screenshots and browser downloads are not tracked by Git.

## Focused checks

- New visual-review command.
- Frontend accessibility and performance verifier commands.

## Implementation note

- Changed behavior: `verify:visual` now captures the dark reference, six public
  routes and a 404 at 1440x960, 768x1024 and 390x844, reports every target and
  fails live pages with horizontal overflow. Accessibility checks use the
  approved dark contrast pairs; performance checks enforce local optional WOFF2
  faces, reject remote fonts and arm obsolete-light-token/dependency checks.
- Evidence: `npm run verify:visual`, `npm run verify:accessibility` and
  `npm run verify:performance` pass; visual review generated 24 ignored PNG
  artifacts and reported all targets.
- Deferred: SITE-088 must run the full Batch 6 suite and validate the first
  visual artifact set.

## Deferred batch gate

SITE-088 runs the full Batch 6 suite and validates the first visual artifact set.
