# Active Tasks

Updated: 2026-08-22

States: READY, IN_PROGRESS, IMPLEMENTED_PENDING_GATE, COMPLETE, BLOCKED.

Every batch ends with a dedicated gate task. Gate tasks are the only tasks that
may close a batch, and a later batch cannot begin until the prior gate is COMPLETE.

| ID | Batch | Area | State | Depends on | Task file |
| --- | --- | --- | --- | --- | --- |
| SITE-060 | 6 | content/NDA release review | READY | SITE-059 | active/SITE-060.md |
| SITE-081 | 6 | CI quality and image publishing | IN_PROGRESS | SITE-059 | active/SITE-081.md |
| SITE-082 | 6 | CD preparation and first launch | READY | SITE-081 | active/SITE-082.md |
| SITE-083 | 6 | frontend routing / deployment | IMPLEMENTED_PENDING_GATE | SITE-059 | active/SITE-083.md |
| SITE-061 | 6 | BATCH GATE / RELEASE | READY | SITE-060, SITE-081, SITE-082, SITE-083 | active/SITE-061.md |

Batch 0 through Batch 5 are COMPLETE. The completed Batch 5 task files are
archived in docs/tasks/archive. Batch 6 contains the content review, CI/CD
preparation and branded 404 tasks awaiting the final local release gate.
