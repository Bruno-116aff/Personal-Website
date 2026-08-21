# Active Tasks

Updated: 2026-08-21

States: READY, IN_PROGRESS, IMPLEMENTED_PENDING_GATE, COMPLETE, BLOCKED.

Every batch ends with a dedicated gate task. Gate tasks are the only tasks that
may close a batch, and a later batch cannot begin until the prior gate is COMPLETE.

| ID | Batch | Area | State | Depends on | Task file |
| --- | --- | --- | --- | --- | --- |
| SITE-050 | 5 | SEO/social assets | IMPLEMENTED_PENDING_GATE | SITE-044 | active/SITE-050.md |
| SITE-051 | 5 | analytics | IMPLEMENTED_PENDING_GATE | SITE-044 | active/SITE-051.md |
| SITE-052 | 5 | accessibility hardening | IMPLEMENTED_PENDING_GATE | SITE-044 | active/SITE-052.md |
| SITE-053 | 5 | performance hardening | IMPLEMENTED_PENDING_GATE | SITE-044 | active/SITE-053.md |
| SITE-054 | 5 | Docker/Traefik/security | IMPLEMENTED_PENDING_GATE | SITE-044 | active/SITE-054.md |
| SITE-059 | 5 | BATCH GATE | BLOCKED | SITE-050, SITE-051, SITE-052, SITE-053, SITE-054 | active/SITE-059.md |
| SITE-060 | 6 | content/NDA release review | READY | SITE-059 | active/SITE-060.md |
| SITE-061 | 6 | BATCH GATE / RELEASE | READY | SITE-060 | active/SITE-061.md |

Batch 0 through Batch 4 are COMPLETE. SITE-001 through SITE-004,
SITE-010 through SITE-014, SITE-020 through SITE-024, and SITE-030 through
SITE-035 plus SITE-039 and SITE-040, SITE-041, SITE-044 are archived in
docs/tasks/archive. The active registry contains 8 tasks: 5 implementation/context
tasks and 3 mandatory batch gates.
