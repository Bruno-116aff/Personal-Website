# SITE-115 — Apply server architecture conventions

- ID: SITE-115
- Title: Apply server architecture conventions
- Batch: 14
- Area: Server architecture
- State: IMPLEMENTED_PENDING_GATE
- Depends on: Batch 13 COMPLETE

## Goal

Record and apply the agreed NestJS module, DI, core infrastructure, DTO,
repository and mirrored test conventions to the current service, including the
shared logger, error handling, health endpoints and internal Telegram
notification module.

## Non-goals

- Do not add dependencies or unrelated runtime capabilities beyond the requested
  internal contact notification.
- Do not change validation, persistence or rate-limit behavior.
- Do not create integration tests in this structural refactor; the existing
  integration-test gap remains explicitly deferred.

## Targeted files

- `apps/contact-api/src/modules/contact`
- `apps/contact-api/src/core/config`
- `apps/contact-api/src/core/database`
- `apps/contact-api/src/core/errors`
- `apps/contact-api/src/core/health`
- `apps/contact-api/src/core/limiter`
- `apps/contact-api/src/core/logger`
- `apps/contact-api/src/modules/notification`
- `apps/contact-api/src/core/config/telegram.config.ts`
- `infra/docker-compose.dev.yml`
- `infra/docker-compose.prod.yml`
- `.env.example`
- `apps/contact-api/package.json`
- `apps/contact-api/AGENTS.md`
- `apps/contact-api/README.md`

## Acceptance criteria

- DTO, limiter, database, logger, error and health files follow the documented
  locations.
- Existing imports and test discovery continue to work.
- Health endpoints and error responses are safe and documented.
- Notification has no route, uses environment-only Telegram credentials, sends
  only after SQLite persistence and cannot fail the contact HTTP response.
- No new dependency is introduced.

## Focused checks

- Inspect the structural diff for consistency with the current contact API.
- Run `npm run typecheck:contact-api`.
- Run `npm run test:contact-api`.
- Run `npm --prefix apps/contact-api run build`.

## Deferred batch gate

SITE-116 must run the available repository checks and close Batch 14 before this
task is marked COMPLETE.

## Completion note

Applied the service-local structure: the contact module lives under
`src/modules/contact/`, its DTO and tests stay inside the module, configuration
moved to `src/core/config/`, SQLite persistence and its test moved to
`src/core/database/`, and the reusable rate limiter remains in
`src/core/limiter/`. The module repository now exposes only the persistence
contract. Focused checks:
`npm run typecheck:contact-api` passed; `npm run test:contact-api` passed with
16 tests; `npm --prefix apps/contact-api run build` passed; deployment
verification passed; and `git diff --check` passed. The latest production-like
verification was deferred because no reachable Docker daemon was available;
there were 0 failures. The integration-test requirement remains deferred
because no existing integration test was present and this task does not create
new test behavior. Batch 14 gate remains deferred to SITE-116.
