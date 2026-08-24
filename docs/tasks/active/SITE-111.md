# SITE-111 — Batch 12 shell/layout verification gate

- Batch: 12
- Area: batch gate / shell layout
- State: READY
- Depends on: SITE-110

## Goal

Verify the accumulated Batch 12 shell change across the complete local project
suite and close the batch only when all available checks and responsive evidence
pass.

## Non-goals

- Do not introduce new visual or behavioral changes during the gate unless they
  directly fix an in-scope Batch 12 failure.
- Do not change public copy, routes, metadata, motion or deployment behavior.

## Targeted source

- `AGENTS.md`
- `docs/style-reference.html`
- `docs/07-visual-spec-reference.md`
- `apps/frontend/src/styles/index.css`
- `docs/tasks/ACTIVE.md`

## Acceptance criteria

- SITE-110 is `IMPLEMENTED_PENDING_GATE` with focused evidence.
- All available root and frontend checks required by the repository pass, with
  missing or external-only checks recorded explicitly as deferred.
- Responsive evidence confirms header bounds, navigation usability and no
  horizontal overflow at 1440px, 768px and 390px.
- Batch 12 reaches 100% closure and current-state docs are updated before tasks
  are archived.

## Full gate checks

- `npm.cmd run typecheck`
- `npm.cmd run test`
- `npm.cmd run build`
- `npm.cmd run lint`
- `npm.cmd run format:check`
- `npm.cmd run verify:frontend`
- `npm.cmd run verify:accessibility`
- `npm.cmd run verify:performance`
- `npm.cmd run verify:content`
- `npm.cmd run verify:meta`
- `npm.cmd run verify:deployment`
- `npm.cmd run verify:production`
- `npm.cmd --prefix apps/frontend run verify:visual`
- `npm.cmd run verify`

## External inputs or blockers

Production deployment/account-owned values remain outside this local gate and must
be recorded as deferred according to the existing project status.
