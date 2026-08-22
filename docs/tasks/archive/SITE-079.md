# SITE-079 — Resolve the contact delivery contract

- Batch: 5
- Area: technical documentation
- State: COMPLETE
- Depends on: SITE-078

## Goal

Make the contact delivery contract unambiguous: persist accepted submissions in
SQLite for manual processing and do not add automated notifications.

## Non-goals

- Do not expose a public read endpoint or add an admin UI.

## Work

- Update the technical, architecture, README and task documentation to describe
  SQLite persistence for manual processing.
- Keep `gubko360@gmail.com` as the direct `mailto:` destination.

## Acceptance criteria

- Active documents consistently describe SQLite persistence as the only form
  submission backend behavior.
- Contact acceptance criteria match persistence and manual processing.
- No automated mail provider configuration is added.
- The dev command exercises the compiled NestJS runtime so validation metadata is
  not lost.

## Focused checks

- Search docs for contact acceptance text.
- Review `docs/03`, `docs/04`, `docs/05` in precedence order.
- `git diff --check`

## Deferred batch gate

SITE-059 confirms contact behavior and documentation alignment.

## Implementation evidence

- Updated `docs/04-tech-spec.md`, `docs/05-task-breakdown-for-codex.md`,
  `docs/ARCHITECTURE.md`, README and active task notes to match the API.
- Changed `start:dev` to build and run `dist/main.js`, preserving Nest validation
  metadata in local development.
- Focused checks: contact API typecheck, tests and build; full gates remain
  deferred to SITE-059.
- Deferred to SITE-059: final contact behavior verification and accumulated Batch
  5 gate.
