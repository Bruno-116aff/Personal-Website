# Active Tasks

Updated: 2026-08-21

States: READY, IN_PROGRESS, IMPLEMENTED_PENDING_GATE, COMPLETE, BLOCKED.

Every batch ends with a dedicated gate task. Gate tasks are the only tasks that
may close a batch, and a later batch cannot begin until the prior gate is COMPLETE.

| ID | Batch | Area | State | Depends on | Task file |
| --- | --- | --- | --- | --- | --- |
| SITE-001 | 0 | agent rules | IMPLEMENTED_PENDING_GATE | — | active/SITE-001.md |
| SITE-002 | 0 | project context | IMPLEMENTED_PENDING_GATE | — | active/SITE-002.md |
| SITE-003 | 0 | task registry | IMPLEMENTED_PENDING_GATE | SITE-001 | active/SITE-003.md |
| SITE-004 | 0 | BATCH GATE | READY | SITE-001, SITE-002, SITE-003 | active/SITE-004.md |
| SITE-010 | 1 | frontend scaffold | READY | SITE-004 | active/SITE-010.md |
| SITE-011 | 1 | prerender/routes | READY | SITE-010 | active/SITE-011.md |
| SITE-012 | 1 | site shell | READY | SITE-010 | active/SITE-012.md |
| SITE-013 | 1 | metadata base | READY | SITE-011 | active/SITE-013.md |
| SITE-014 | 1 | BATCH GATE | READY | SITE-010, SITE-011, SITE-012, SITE-013 | active/SITE-014.md |
| SITE-020 | 2 | design system | READY | SITE-014 | active/SITE-020.md |
| SITE-021 | 2 | homepage top | READY | SITE-020 | active/SITE-021.md |
| SITE-022 | 2 | career/expertise/about | READY | SITE-020 | active/SITE-022.md |
| SITE-023 | 2 | contact section/form UI | READY | SITE-020 | active/SITE-023.md |
| SITE-024 | 2 | BATCH GATE | READY | SITE-020, SITE-021, SITE-022, SITE-023 | active/SITE-024.md |
| SITE-030 | 3 | case-study template | READY | SITE-024 | active/SITE-030.md |
| SITE-031 | 3 | infrastructure case | READY | SITE-030 | active/SITE-031.md |
| SITE-032 | 3 | operations case | READY | SITE-030 | active/SITE-032.md |
| SITE-033 | 3 | unified platform case | READY | SITE-030 | active/SITE-033.md |
| SITE-034 | 3 | account automation case | READY | SITE-030 | active/SITE-034.md |
| SITE-035 | 3 | CV route | READY | SITE-030 | active/SITE-035.md |
| SITE-039 | 3 | BATCH GATE | READY | SITE-030, SITE-031, SITE-032, SITE-033, SITE-034, SITE-035 | active/SITE-039.md |
| SITE-040 | 4 | contact API | READY | SITE-039 | active/SITE-040.md |
| SITE-041 | 4 | contact form integration | READY | SITE-023, SITE-040 | active/SITE-041.md |
| SITE-044 | 4 | BATCH GATE | READY | SITE-040, SITE-041 | active/SITE-044.md |
| SITE-050 | 5 | SEO/social assets | READY | SITE-044 | active/SITE-050.md |
| SITE-051 | 5 | analytics | READY | SITE-044 | active/SITE-051.md |
| SITE-052 | 5 | accessibility hardening | READY | SITE-044 | active/SITE-052.md |
| SITE-053 | 5 | performance hardening | READY | SITE-044 | active/SITE-053.md |
| SITE-054 | 5 | Docker/Traefik/security | READY | SITE-044 | active/SITE-054.md |
| SITE-059 | 5 | BATCH GATE | READY | SITE-050, SITE-051, SITE-052, SITE-053, SITE-054 | active/SITE-059.md |
| SITE-060 | 6 | content/NDA release review | READY | SITE-059 | active/SITE-060.md |
| SITE-061 | 6 | BATCH GATE / RELEASE | READY | SITE-060 | active/SITE-061.md |

The registry contains 32 tasks: 25 implementation/context tasks and 7 mandatory
batch gates. Tasks remain active until their gate has proved 100% closure.
