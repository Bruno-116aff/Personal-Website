# SITE-024 — Close Batch 2 visual system and homepage

- Batch: 2
- Area: batch gate
- State: READY
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
