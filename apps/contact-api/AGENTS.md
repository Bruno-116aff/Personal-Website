# Contact API server rules

These instructions apply to `apps/contact-api` and all future backend modules
created inside this service.

## Architecture

- Use NestJS modular architecture and dependency injection.
- All business modules must live under `src/modules/`. Do not place a business
  module directly under `src/`.
- Keep memory usage and the runtime footprint as small as practical.
- Prefer optimal, lightweight solutions over feature-heavy infrastructure.
- Choose the best compromise between capabilities, memory, CPU, image size and
  operational complexity.
- Avoid unnecessary dependencies, caches, background workers and duplicated
  in-memory state. Bound and clean up any in-memory collection.
- Do not add infrastructure for hypothetical scale; require a demonstrated need
  and an explicit architecture decision.
- Never trade away security, validation, data integrity or observability solely
  to save resources.
- Every HTTP route must meet a p95 latency of 300 ms or less under normal
  production load and must have a hard timeout of 1 second. Include validation,
  database access and service work in the measurement; exclude client rendering
  and external network latency.
- Runtime configuration must come only from environment variables. Validate all
  required values at startup and fail fast when a value is missing or invalid.
- Every HTTP route must have both unit tests for its behavior and integration
  tests for its HTTP contract, including validation, status codes and relevant
  middleware behavior.
- Keep controllers thin; business logic belongs in services and persistence
  details belong in repositories.
- A module may contain one controller, service and repository directly in its
  root.
- When there are multiple controllers, services or repositories, move that kind
  into the corresponding plural directory.
- Keep every DTO in a module-level `dto/` directory, even when there is only one.
- Keep module tests in a separate `tests/` directory inside that module. The test
  tree must mirror the source file structure and responsibilities.

## Shared core

- Put reusable cross-cutting capabilities in `src/core/`.
- Keep runtime configuration in `src/core/config/`.
- Keep SQLite connections, schema creation and persistence implementations in
  `src/core/database/`.
- Keep structured logging in `src/core/logger/` and inject `AppLogger` into
  application services; do not instantiate ad hoc loggers in modules.
- Keep global safe error handling in `src/core/errors/`.
- Keep liveness/readiness endpoints in `src/core/health/`; Docker healthchecks
  must use the liveness endpoint.
- Keep external notification integrations in their own module under
  `src/modules/`. A notification module may have no controller or HTTP route.
- Telegram credentials must come only from `TELEGRAM_BOT_TOKEN` and
  `TELEGRAM_CHAT_ID` environment variables. Never commit their values or log
  them. In production both values are required; local runs may keep Telegram
  disabled by leaving both unset.
- Implement the rate limiter once in `core` and reuse it through DI. Do not add
  feature-specific limiter implementations.
- Use the same `core` boundary for shared configuration, structured logging,
  error handling and health/readiness checks.
- Shared core code must not depend on business modules.

## Dependency boundaries

- SQLite is the only database and persistence technology currently allowed in
  this service. Do not introduce Redis, PostgreSQL, MySQL, a message broker or
  another external storage system without a separate architecture decision.
- SQLite SQL and storage details belong only to `core/database/`.
- Module-level repositories expose contracts or adapters; they must not contain
  SQLite implementation details.
- Modules use repository contracts and DI; they must not instantiate SQLite or
  access the database implementation directly.
- Services use repository abstractions and must not access the database directly.
- Controllers must not contain business rules or direct persistence calls.
- Contact persistence must complete before a notification is attempted. A
  Telegram failure must be logged and must not turn a successfully persisted
  contact submission into an HTTP failure.
- External notification calls must be bounded by a timeout and must not be
  awaited in the contact HTTP response path when they are non-critical.
- Preserve module boundaries and do not introduce a shared database dependency
  between business modules without an explicit architecture decision.

## Module layout

```text
src/
  core/
    config/
    database/
      tests/
    limiter/
    logger/
    errors/
    health/
  modules/
    <module>/
      <module>.module.ts
      <module>.controller.ts     # only when the module exposes HTTP routes
      <module>.service.ts
      <module>.repository.ts
      dto/
      tests/
        <module>.service.spec.ts
        <module>.repository.spec.ts
```

When a module grows, introduce `controllers/`, `services/` or `repositories/`
only for the category that has multiple files. Do not create empty structural
directories in advance.

## Adding a module

1. Create a new directory under `src/modules/` with its own NestJS module.
2. Put the first controller, service and repository in the module root.
3. Create `dto/` immediately and keep all request/response DTOs there.
4. Create the module's `tests/` directory and mirror the source structure.
5. Reuse shared capabilities from `core/` through DI.
6. Keep transport, business logic and persistence responsibilities separate.

Notification modules are internal adapters. They live under `src/modules/`,
do not create controllers or routes unless a separate HTTP requirement exists,
and expose a DI contract to the modules that use them.

Detailed runtime and verification notes are in `README.md`.
