# SITE-014 — Close Batch 1 application foundation

- Batch: 1
- Area: batch gate
- State: READY
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
