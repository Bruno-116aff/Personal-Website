# Contact API

This directory contains the NestJS backend service for the personal site. The
service accepts contact-form submissions and stores them in server-side SQLite
for manual processing.

## Runtime contract

- `POST /contact` accepts a validated contact submission.
- `GET /health` reports liveness for the container and load balancer.
- `GET /health/ready` reports service readiness.
- The internal notification module sends accepted contact submissions to
  Telegram when configured; it exposes no HTTP route.
- The public `/api/contact` path is routed by Traefik and stripped to `/contact`.
- The service applies validation, sanitization, honeypot protection and rate
  limiting before persistence.
- The service has no public read endpoint for stored submissions.
- SQLite data lives outside the image and is mounted as a persistent volume.

## Current infrastructure constraint

SQLite is the only database and persistence technology used by this service.
Redis, PostgreSQL, MySQL, message brokers and other external storage systems are
not part of the current architecture. Do not add them speculatively. Any move
to another persistence or coordination system requires a separate architecture
decision and documentation update.

Telegram notifications use only `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`
from the server runtime environment. Both must be configured together in
production. If both are absent, local development keeps notifications disabled.
The contact is saved to SQLite before notification delivery is attempted, and a
Telegram failure is logged without changing the successful contact response.

## Resource and solution principles

- Keep the service memory-efficient and minimize its runtime footprint.
- Prefer the smallest solution that satisfies the actual requirement.
- Avoid unnecessary dependencies, background processes, caches and duplicated
  in-memory state.
- Bound every in-memory collection and clean up temporary state deterministically.
- Choose the best practical compromise between capability, memory, CPU, image
  size, operational complexity and reliability.
- Do not add infrastructure merely for theoretical scale. Complexity must be
  justified by a demonstrated need.
- Resource savings must not weaken validation, security, data integrity or
  observability.

## Performance budget

Every HTTP route must meet a **p95 latency of 300 ms or less** under normal
production load and must have a hard timeout of **1 second**. Measure this at
the service boundary, excluding client rendering and external network latency.
Database access, validation and all other work performed by the service are
included in this budget.

## Configuration

Runtime configuration is provided only through environment variables. Every
required value must be validated at startup; the service must fail fast with a
clear configuration error when a value is missing or invalid.

## Route testing

Every HTTP route must have both unit tests for its behavior and integration tests
for its HTTP contract, including validation, status codes and relevant
middleware behavior.

## Architecture

The service uses NestJS modules and dependency injection. Dependencies point
inward toward abstractions and shared infrastructure:

```text
HTTP request
    -> Controller
    -> Service
    -> Repository abstraction
    -> SQLite persistence
    -> best-effort Telegram notification
```

Controllers are transport adapters. They must remain thin and must not contain
business rules or direct database access. Services own use-case behavior.
Repositories own persistence details and are consumed through interfaces or DI
tokens where substitution is useful.

## Directory conventions

The following is the target structure for this service and all future backend
modules:

```text
apps/contact-api/
  src/
    core/
      config/
      database/
        tests/
      limiter/
      logger/
        # shared AppLogger
      errors/
        tests/
      health/
        tests/
    modules/                       # all business modules live here
      <module>/
        <module>.module.ts
        <module>.controller.ts     # one controller, only for HTTP modules
        <module>.service.ts        # one service
        <module>.repository.ts    # one repository
        dto/                       # always a directory
        controllers/               # only when there are multiple controllers
        services/                  # only when there are multiple services
        repositories/              # only when there are multiple repositories
        tests/                     # tests stay inside their module
          <module>.service.spec.ts
          <module>.repository.spec.ts
```

Rules:

1. Every business capability is isolated in a NestJS module.
2. Every business module lives under `src/modules/`.
3. `controller`, `service` and `repository` stay in the module root when there
   is exactly one of them.
4. When a module has two or more controllers, services or repositories, the
   corresponding plural directory is introduced.
5. DTOs always live in `dto/`, even when a module currently has only one DTO.
6. Tests live in a separate `tests/` directory inside the module and mirror the
   module's source tree and file responsibilities.
7. Cross-cutting infrastructure belongs in `src/core/` and is reused through
   DI. It must not depend on business modules.
8. Runtime configuration belongs in `src/core/config/`.
9. SQLite connections, schema creation and persistence implementations belong in
   `src/core/database/`.
10. Modules interact with persistence only through repository contracts and DI;
    module code must not instantiate SQLite or contain SQL.
11. Structured logging belongs in `src/core/logger/`; application services use
    the shared `AppLogger` through DI.
12. Safe global error handling belongs in `src/core/errors/`.
13. Liveness/readiness endpoints belong in `src/core/health/`; container
    healthchecks use liveness.
14. The rate limiter is a core capability, not contact-form business logic. New
    modules reuse the core limiter instead of implementing another local one.
15. Configuration, logging, error handling and health/readiness checks follow the
    same `core/` rule when they are shared by multiple modules.
16. SQLite is the current and only persistence backend. Repositories must keep
    its usage isolated behind the repository boundary.
17. SQLite SQL and storage details belong only to `core/database/`. Module-level
    repositories expose contracts or adapters and must not contain SQLite
    implementation details.
18. Modules may depend on `core` and their own abstractions; `core` must never
    import a business module.
19. External integrations such as Telegram notifications belong in their own
    module under `src/modules/`; modules without HTTP behavior have no
    controller or route.
20. Telegram credentials are environment-only and must never be committed or
    logged. Non-critical notifications use a bounded timeout and do not block
    the contact response after SQLite persistence succeeds.

## Adding a module

When adding a new capability:

1. Create a new directory under `src/modules/` with its own NestJS module.
2. Put the first controller, service and repository in that module's root.
3. Create `dto/` immediately and keep all request/response DTOs there.
4. Reuse shared capabilities from `core/` through DI.
5. Add tests under the matching path in the module's `tests/` directory.
6. Keep transport, business logic and persistence responsibilities separate.

The current contact module follows this convention at
`src/modules/contact/`: its DTO is in `dto/`, its tests are in the module's
`tests/` directory, its repository is a persistence contract only, and the
configuration, SQLite implementation and reusable rate limiter are in
`src/core/`. The internal `src/modules/notification/` module has no controller;
it sends persisted contact submissions to Telegram through a DI contract.

## Verification

From the repository root:

```powershell
npm run typecheck:contact-api
npm run test:contact-api
npm --prefix apps/contact-api run build
```

The service must start with required environment variables validated at boot.
Production data must remain on the mounted volume and must never be committed
to Git.
