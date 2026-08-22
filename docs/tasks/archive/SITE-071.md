# SITE-071 — Build a minimal production API image

- Batch: 5
- Area: Docker runtime
- State: COMPLETE
- Depends on: SITE-070

## Goal

Reduce the contact API production image and run compiled JavaScript with only
runtime dependencies.

## Non-goals

- Do not change the NestJS API contract.
- Do not remove tests or local development dependencies from the source project.

## Work

- Add a TypeScript build output for the API.
- Use a multi-stage Dockerfile.
- Install devDependencies only in the build stage.
- Run the runtime image as a non-root user with `node dist/main.js`.
- Add a healthcheck or documented liveness endpoint.

## Acceptance criteria

- Runtime image contains no unnecessary compiler/tooling dependencies.
- Container starts successfully as non-root.
- Native `better-sqlite3` works in the runtime image.
- Contact persistence and API tests still pass.

## Focused checks

- `npm run typecheck:contact-api`
- `npm run test:contact-api`
- Docker image build and startup when Docker is available.

## Deferred batch gate

SITE-059 verifies the final image and runtime behavior.

## Implementation evidence

- Added `tsconfig.build.json` and an API `build` script that emits compiled
  JavaScript to `dist`; production `start` now runs `node dist/main.js`, while
  `start:dev` preserves the source-based local development workflow.
- Replaced the single-stage API image with a multi-stage build. Compiler tools
  and devDependencies exist only in the build stage; the runtime stage copies
  only compiled output and pruned production dependencies, runs as `node`, and
  declares a Docker HTTP healthcheck.
- Updated the development Compose command and deployment verification markers
  for the compiled runtime contract.
- Focused checks passed: `npm run typecheck:contact-api`,
  `npm run test:contact-api` (5/5), API TypeScript build,
  `npm run verify:deployment`, `git diff --check`, Docker image build,
  runtime dependency/native `better-sqlite3` smoke test, non-root container
  startup, accepted contact submission, healthy Docker healthcheck and SQLite
  persistence check.
- Deferred to SITE-059: accumulated Batch 5 gate and final verification through
  the real VPS/Traefik deployment.
