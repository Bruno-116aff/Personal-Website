# Finalize a batch

Use for the last task of a batch or an explicit full audit, finalize, release gate
or equivalent request.

1. Resolve the batch from docs/tasks/BATCHES.md and docs/tasks/ACTIVE.md.
2. Confirm every non-gate task in the batch is IMPLEMENTED_PENDING_GATE or COMPLETE.
   If not, stop and report the exact task IDs.
3. Aggregate the complete batch scope and dependencies before running expensive checks.
4. Run every available full test and verification command required by the current
   repository, not only the changed-task check. At minimum use:
   - npm run typecheck
   - npm run build
   - npm run verify
   - npm run verify:meta
   - npm run verify:content when public copy exists
   - npm run verify:production when deployment output exists
   - the full responsive/visual evidence required by the batch
   - skill/context validators for the process-foundation batch
5. If a command is not yet available because scaffolding has not created it, record
   DEFERRED with the exact missing command. Do not call DEFERRED a PASS.
6. On failure, fix only in-scope causes, use focused checks while iterating, then
   rerun the complete accumulated batch gate from step 4.
7. Verify 100% closure: no unresolved in-scope failure, no incomplete acceptance
   criterion, no missing task evidence, and no unreviewed external input hidden.
8. Only after 100% closure, mark every batch task COMPLETE, archive them without
   rewriting history, and update PROJECT_STATUS.md, HANDOFF.md and ACTIVE.md once.
9. Run npm run verify:meta after final documentation changes when that command exists.
10. Do not commit unless separately requested.

A missing user-owned value is not a reason to invent data. Record it as an explicit
launch input or blocker and keep implementation configurable. A blocked gate does
not close the batch.
