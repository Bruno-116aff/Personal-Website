# SITE-084 — Validate and activate the redesign work registry

- Batch: 6
- Area: workflow / registry
- State: COMPLETE
- Depends on: SITE-059

## Goal

Validate that Batches 6–9 and Batch 10 form one executable sequence and that no
former light-release task can close before the redesign.

## Non-goals

- Do not change frontend, API, content or deployment behavior.
- Do not alter archived task files.

## Targeted context

- docs/style-reference.html
- docs/07-visual-spec-reference.md
- docs/tasks/ACTIVE.md
- docs/tasks/BATCHES.md
- docs/PROJECT_STATUS.md

## Work

- Reconcile every ACTIVE row, active task-file header, dependency and batch number.
- Confirm SITE-060, SITE-081, SITE-082, SITE-083 and SITE-061 are Batch 10 work.
- Confirm SITE-081 and SITE-082 preserve their IMPLEMENTED_PENDING_GATE evidence.
- Confirm the gates SITE-088, SITE-093, SITE-097, SITE-103 and SITE-061 are last
  in their batches and that all dependency edges are sequential.

## Acceptance criteria

- The registry contains no active Batch 6 release task or contradictory task state.
- SITE-084 through SITE-103 have unique IDs, one coherent scope each and a gate.
- The next executable task is SITE-084 only.

## Focused checks

- `rg` audit of task IDs, batch numbers, states and dependencies.
- Review the documentation-only diff for unrelated changes.

## Implementation note

- Changed behavior: the redesign registry is active as one sequential Batch 6–10
  chain; the active index and task headers agree on IDs, batches, states,
  dependencies and gate positions.
- Evidence: the focused `rg`/registry audit found no duplicate IDs, missing task
  files or header/index mismatches; Batch 10 release tasks retain their existing
  `IMPLEMENTED_PENDING_GATE` evidence.
- Deferred: SITE-088 must run the full Batch 6 verification and archival process.

## Deferred batch gate

SITE-088 performs the full Batch 6 verification and archival process.
