# SITE-004 — Close Batch 0 process foundation

- Batch: 0
- Area: batch gate
- State: READY
- Depends on: SITE-001, SITE-002, SITE-003
- Gate type: mandatory full batch verification

## Goal

Verify the complete process foundation and close Batch 0 only at 100%.

## Full gate

- Validate every local skill with the skill-creator validator.
- Verify all AGENTS, skill references and persistent-context links.
- Verify every ACTIVE.md row points to an existing task file.
- Verify seven batches exist and each has a final gate task.
- Search the active project instructions for inherited product paths or commands.
- Run git diff --check.

## Acceptance criteria

- Every Batch 0 task has evidence.
- No unresolved process inconsistency remains.
- All Batch 0 tasks are marked COMPLETE only after these checks pass.
- PROJECT_STATUS.md and HANDOFF.md record the closed batch and next action.

## Failure policy

Any failed or unavailable check keeps Batch 0 open. Record the exact issue and
do not mark the batch complete.
