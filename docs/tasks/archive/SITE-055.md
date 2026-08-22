# SITE-055 — Separate frontend and backend project boundaries

- Batch: 5
- Area: repository structure/tooling
- State: COMPLETE
- Depends on: SITE-044

## Goal

Move the frontend into `apps/frontend` and keep the contact API as an independent
application under `apps/contact-api`. Keep source behavior unchanged while
placing app-owned dependencies, build configuration and Dockerfiles inside the
respective app directories. Keep shared orchestration and development/production
Compose files at the repository root under `infra`.

## Non-goals

- Do not redesign or refactor frontend or backend source code.
- Do not change public copy, routes, API behavior or deployment semantics beyond
  path/context adjustments required by the new layout.

## Targeted context

- docs/ARCHITECTURE.md
- docs/PROJECT_STATUS.md
- docs/HANDOFF.md
- package.json
- infra/docker-compose.dev.yml
- infra/docker-compose.prod.yml
- package.json

## Work

- Create `apps/frontend` and move the current frontend source, public assets and
  frontend-owned configuration into it.
- Keep each app's package manifest, lockfile and Dockerfiles local to that app.
- Reduce the root package manifest to workspace orchestration and shared scripts.
- Move brand assets from `logo` into frontend-owned assets with stable names.
- Move deployment composition into `infra/docker-compose.dev.yml`,
  `infra/docker-compose.prod.yml` and the required build override.
- Update architecture/current-state documentation to describe the actual layout.

## Acceptance criteria

- The root contains no frontend source, Tailwind/Vite/PostCSS/TypeScript frontend
  config, app-owned dependency lockfile or root production Compose file.
- `apps/frontend` contains the unchanged frontend source plus its package/config/
  asset/Docker files; `apps/contact-api` contains its package/lock/Docker files.
- `infra` owns dev/prod/build Compose configuration and both app build contexts
  resolve from `../apps/...`.
- Root scripts can typecheck and build both apps through their local manifests.
- Existing public routes and contact API behavior remain unchanged.

## Focused checks

- `npm install --package-lock-only --ignore-scripts` in both apps.
- Root orchestration typecheck/build and app tests.
- `docker compose ... config --quiet` for dev and production configurations.
- `git diff --check` and generated-route/asset path inspection.

## Deferred batch gate

SITE-059 must run the accumulated Batch 5 checks and verify production-like
deployment behavior after this structural change.

## Implementation evidence

- Moved the frontend into `apps/frontend` with its source, public files, brand
  assets, package manifest, lockfile, Vite/Tailwind/PostCSS/TypeScript config,
  verification scripts and Dockerfiles.
- Kept `apps/contact-api` independent with its own lockfile, app-local Dockerfile
  and development Dockerfile; frontend and API source behavior was not changed.
- Reduced the root package manifest to orchestration and common checks. Moved
  development, production and build Compose definitions into `infra`.
- Replaced hidden Docker-managed application data volumes with explicit
  Compose-adjacent bind paths under `infra/data` for production and development.
- Focused checks passed: root typecheck, frontend/API tests, frontend build,
  content, metadata, accessibility, performance and deployment verification;
  dev/prod Compose config validation passed with the required certificate value.
- Deferred: full production-like Docker runtime remains part of SITE-059.
