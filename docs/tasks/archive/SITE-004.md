# SITE-004 — Close Batch 0 process foundation

- Batch: 0
- Area: batch gate
- State: COMPLETE
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

## Gate evidence

- 2026-08-21: PASS — all three local project skills passed the skill-creator validator.
- 2026-08-21: PASS — AGENTS.md, source-of-truth files, persistent context and local skill references exist.
- 2026-08-21: PASS — ACTIVE.md has 32 unique rows, valid task links, required sections, acyclic dependencies and seven final gates.
- 2026-08-21: PASS — no inherited product paths or commands were found in active project instructions; git diff --check passed.
- 2026-08-21: DEFERRED — npm run typecheck, build and verification scripts; package.json is not present before Batch 1 scaffolding.
