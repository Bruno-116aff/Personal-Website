# SITE-039 — Close Batch 3 content routes

- Batch: 3
- Area: batch gate
- State: READY
- Depends on: SITE-030, SITE-031, SITE-032, SITE-033, SITE-034, SITE-035
- Gate type: mandatory full batch verification

## Goal

Verify the four case studies and /cv together and close Batch 3 at 100%.

## Full gate

- npm run typecheck
- npm run build
- npm run verify
- npm run verify:content
- npm run verify:meta
- Inspect generated HTML, metadata and JSON-LD for every public route.
- Perform the complete human content checkpoint and a second Case 4 NDA read.
- Reconcile all content against docs/00 through docs/05.

## Acceptance criteria

- Each case uses the standard template and confidentiality sentence.
- Every public claim, number, date and technology is approved by docs/01.
- Case 4 prohibited details do not appear in any public output.
- /cv claims and canonical behavior are correct.
- No unresolved content, NDA, route or metadata issue remains.

## Failure policy

A content or NDA concern is launch-blocking for this batch. It cannot be downgraded
to a warning or deferred to a later visual task.
