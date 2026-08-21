# SITE-002 — Establish persistent project context

- Batch: 0
- Area: project context
- State: IMPLEMENTED_PENDING_GATE
- Depends on: none

## Goal

Make the project understandable across sessions without relying on chat history.

## Scope

Create and maintain:

- docs/PROJECT_STATUS.md
- docs/HANDOFF.md
- docs/DESIGN_SYSTEM.md
- docs/ARCHITECTURE.md
- docs/DECISIONS.md

## Acceptance criteria

- Status identifies the current phase, batch and next action.
- Handoff contains a resume recipe and external inputs.
- Design system distinguishes approved direction from implementation details.
- Architecture states routes, rendering, content boundaries and deployment.
- Decisions record durable choices without duplicating the full specification.

## Focused checks

- Manual review of all five context files completed.

## Deferred batch gate

Check links and ensure no document claims that unimplemented code is complete.
