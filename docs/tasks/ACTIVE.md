# Active Tasks

Updated: 2026-08-24

States: READY, IN_PROGRESS, IMPLEMENTED_PENDING_GATE, COMPLETE, BLOCKED.

Every batch ends with a dedicated gate task. A later batch may begin only after the
previous batch gate is COMPLETE. Normal tasks use focused checks and become
IMPLEMENTED_PENDING_GATE; only a gate may archive and mark its batch COMPLETE.

| ID | Batch | Area | State | Depends on | Task file |
| --- | --- | --- | --- | --- | --- |
| SITE-104 | 11 | case-study presentation | IMPLEMENTED_PENDING_GATE | — | [SITE-104](active/SITE-104.md) |
| SITE-106 | 11 | case-study presentation | IMPLEMENTED_PENDING_GATE | SITE-104 | [SITE-106](active/SITE-106.md) |
| SITE-107 | 11 | case-study presentation | IMPLEMENTED_PENDING_GATE | SITE-104, SITE-106 | [SITE-107](active/SITE-107.md) |
| SITE-108 | 11 | homepage contact | IMPLEMENTED_PENDING_GATE | — | [SITE-108](active/SITE-108.md) |
| SITE-105 | 11 | batch gate / presentation refinement | READY | SITE-104, SITE-106, SITE-107, SITE-108 | [SITE-105](active/SITE-105.md) |

Batch 0 through Batch 10 are COMPLETE and archived. Batch 11 contains the active
case-study presentation refinement and its deferred full gate. External deployment
and account-owned launch verification remain listed in the SITE-061 final evidence
as deferred inputs.
