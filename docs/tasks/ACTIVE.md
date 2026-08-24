# Active Tasks

Updated: 2026-08-24

States: READY, IN_PROGRESS, IMPLEMENTED_PENDING_GATE, COMPLETE, BLOCKED.

Every batch ends with a dedicated gate task. A later batch may begin only after the
previous batch gate is COMPLETE. Normal tasks use focused checks and become
IMPLEMENTED_PENDING_GATE; only a gate may archive and mark its batch COMPLETE.

| ID | Batch | Area | State | Depends on | Task file |
| --- | --- | --- | --- | --- | --- |
| SITE-110 | 12 | shell/layout polish | IMPLEMENTED_PENDING_GATE | Batch 11 gate COMPLETE | [SITE-110.md](active/SITE-110.md) |
| SITE-111 | 12 | batch gate / shell layout | READY | SITE-110 | [SITE-111.md](active/SITE-111.md) |

Batch 0 through Batch 11 are COMPLETE and archived. External deployment
and account-owned launch verification remain listed in the SITE-061 final evidence
as deferred inputs.
