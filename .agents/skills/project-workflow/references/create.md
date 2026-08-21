# Create a task

Before writing:

1. Inspect docs/tasks/ACTIVE.md and related source.
2. Choose a unique SITE-NNN ID and a batch.
3. Keep one coherent behavior per task; split work that can be independently verified.
4. State dependencies using current repository facts.

Each task file under docs/tasks/active must contain:

- ID, title, batch, area and state.
- Goal and non-goals.
- At most five targeted files/documents to read.
- Behavior-level steps.
- Acceptance criteria.
- Focused checks for the task.
- A separately labeled deferred batch gate.
- External inputs or blockers, if any.

Keep task files concise. Add the index row to docs/tasks/ACTIVE.md in the same change.
