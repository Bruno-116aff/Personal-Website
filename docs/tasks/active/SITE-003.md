# SITE-003 — Create the small-task batch registry

- Batch: 0
- Area: task registry
- State: IMPLEMENTED_PENDING_GATE
- Depends on: SITE-001

## Goal

Create a predictable task registry so related small tasks can be implemented
consecutively and finalized once per batch.

## Scope

- Create docs/tasks/ACTIVE.md.
- Create docs/tasks/BATCHES.md.
- Create one active task file per implementation unit.
- Define dependency and state conventions.

## Acceptance criteria

- Every active task has a unique SITE-NNN ID and a batch.
- Each task has goal, scope, acceptance criteria, focused checks and deferred gate.
- Dependencies do not form an unexplained cycle.
- Batch 0 is pending its first explicit gate; Batch 1 remains blocked until
  SITE-004 is COMPLETE.

## Focused checks

- Registry and task-file cross-reference review completed.

## Deferred batch gate

Validate every ACTIVE.md row points to an existing task file.
