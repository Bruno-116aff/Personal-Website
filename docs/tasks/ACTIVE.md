# Active Tasks

Updated: 2026-08-24

States: READY, IN_PROGRESS, IMPLEMENTED_PENDING_GATE, COMPLETE, BLOCKED.

Every batch ends with a dedicated gate task. A later batch may begin only after the
previous batch gate is COMPLETE. Normal tasks use focused checks and become
IMPLEMENTED_PENDING_GATE; only a gate may archive and mark its batch COMPLETE.

| ID | Batch | Area | State | Depends on | Task file |
| --- | --- | --- | --- | --- | --- |
Batch 0 through Batch 11 are COMPLETE after their full local batch gates. Batch 12
is COMPLETE by explicit user confirmation. Batch 13 is COMPLETE by explicit user
confirmation. External deployment
and account-owned launch verification remain listed in the SITE-061 final evidence
as deferred inputs.
