---
name: project-workflow
description: Manage the Ivan Hubko personal-site task lifecycle, including small implementation tasks, batch planning, focused checks, and explicit batch finalization.
---

# Project Workflow

Use this skill for project context, task planning/creation, task implementation,
task finishing, and explicit batch finalization.

| Operation | Reference |
| --- | --- |
| context | references/context.md |
| plan <request-or-task-id> | references/plan.md |
| create <request> | references/create.md |
| start <task-id> | references/start.md |
| finish <task-id> | references/finish.md |
| finalize [batch-or-task] | references/finalize.md |

Natural-language routing:

- “выполни SITE-…” starts one task, implements only its scope, then finishes it.
- “создай/распиши задачи” uses create or plan.
- “проверь весь батч”, “full audit”, “finalize” or “release gate” uses finalize.
- Ordinary implementation does not trigger the full release gate.
- The last task listed for every batch is its batch-gate task. Starting or finishing
  that task uses the finalize reference and runs the complete accumulated gate.

Core rules:

- Read AGENTS.md, docs/PROJECT_STATUS.md, docs/HANDOFF.md and
  docs/tasks/ACTIVE.md only as needed; do not load archives by default.
- A task is IMPLEMENTED_PENDING_GATE after focused checks pass. It becomes
  COMPLETE only during explicit batch finalization.
- A batch-gate task may not be completed with focused checks alone: it must run
  every available full test/check command for the batch and record 100% closure.
- Several small tasks may be implemented in one session and one batch.
- Preserve unrelated changes and never commit unless separately requested.
- Any dev server, browser/MCP service, watcher, container or other long-lived
  process started by the task must be tracked by PID/session and shut down before
  the task is reported complete. Verify that owned process trees and their ports
  are gone; never terminate pre-existing or unrelated user processes.
- Do not invent public content or override the source-of-truth order in AGENTS.md.
