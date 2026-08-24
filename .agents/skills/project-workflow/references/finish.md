# Finish one task

1. Inspect only the task scope and its diff amid unrelated changes. If this is the
   last task listed for its batch, use references/finalize.md instead.
2. Run the smallest focused checks that execute changed behavior.
3. Fix scoped failures; do not launch the full batch gate here.
4. Stop every dev server, watcher, browser/MCP service, container or other
   long-lived process started for the task. Verify its owned process tree and
   listening ports are gone; preserve unrelated pre-existing processes.
5. If checks pass, set the task and index row to IMPLEMENTED_PENDING_GATE.
6. Add a compact note listing changed behavior, focused evidence and deferred batch gates.
7. Set directly unblocked dependent tasks to READY when appropriate.
8. Do not update status/handoff or archive tasks until batch finalization.
9. Do not commit unless separately requested.
