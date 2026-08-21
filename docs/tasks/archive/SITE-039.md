# SITE-039 — Close Batch 3 content routes

- Batch: 3
- Area: batch gate
- State: COMPLETE
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

## Gate result

- PASS: `npm run typecheck`, `npm run build`, `npm run verify:frontend`,
  `npm run verify:content`, `npm run verify:meta`, and `npm run verify`.
- PASS: every generated route has the expected semantic shell, metadata and
  JSON-LD type; each case has the standard sections and confidentiality sentence.
- PASS: the final content review reconciled public claims with the approved
  facts and found no prohibited Case 4 wording in source or generated output.
- DEFERRED: `npm run verify:production` requires deployment output and external
  VPS/DNS access. It remains owned by the later Batch 5 production scope.

Batch 3 is closed at 100% for its accumulated content-route scope.
