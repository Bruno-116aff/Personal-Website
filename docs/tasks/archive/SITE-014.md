# SITE-014 — Close Batch 1 application foundation

- Batch: 1
- Area: batch gate
- State: COMPLETE
- Depends on: SITE-010, SITE-011, SITE-012, SITE-013
- Gate type: mandatory full batch verification

## Goal

Verify the accumulated frontend foundation and close Batch 1 only at 100%.

## Full gate

- npm run typecheck
- npm run build
- npm run verify:frontend
- npm run verify:meta
- npm run verify
- Inspect generated HTML for all six routes and hard-refresh behavior.
- Check shell keyboard flow, landmarks, focus and reduced motion.

## Acceptance criteria

- Every Batch 1 task acceptance criterion is verified.
- All six routes contain meaningful prerendered HTML and correct head metadata.
- No in-scope failure or deferred required check remains unexplained.
- Batch 1 tasks are closed together only after the full gate passes.

## Failure policy

Fix in-scope failures and rerun the complete gate. A partial build or focused test
does not close the batch.

## Finalization evidence — 2026-08-21

- PASS: `npm.cmd run typecheck`, `npm.cmd run build`,
  `npm.cmd run verify:frontend`, `npm.cmd run verify:content`,
  `npm.cmd run verify:meta` and aggregate `npm.cmd run verify`.
- PASS: quality-gates frontend/content/production deterministic scanners.
- PASS: all six generated routes contain meaningful HTML, shell landmarks,
  one H1, route metadata and self-referencing canonicals.
- PASS: Vite preview direct GET/hard-refresh checks for `/`, four work routes
  and `/cv` returned HTTP 200 with shell and metadata.
- PASS: static shell audit for semantic links, homepage anchors, focus styles,
  reduced-motion handling and responsive containment.
- DEFERRED: interactive keyboard walkthrough because the browser runtime is not
  available in the current environment; static keyboard/focus evidence passed.
- DEFERRED: `npm run verify:production` because deployment output and external
  VPS/DNS access do not exist yet. Aggregate `npm run verify` reports this
  explicitly and passes all available checks.
