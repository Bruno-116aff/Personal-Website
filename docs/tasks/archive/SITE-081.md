# SITE-081 — Build selective CI and immutable application images

- Batch: 10
- Area: CI / Docker artifacts
- State: COMPLETE
- Depends on: SITE-103

## Goal

Create a GitHub Actions CI pipeline that verifies only the affected application
when possible, verifies shared deployment contracts when infrastructure changes,
and builds/publishes immutable frontend and contact API images for successful
main-branch releases.

## Non-goals

- Do not deploy to the VPS from this task.
- Do not add production credentials or runtime `.env` files to Git.

## Targeted context

- docs/style-reference.html
- docs/07-visual-spec-reference.md
- docs/04-tech-spec.md
- docs/ARCHITECTURE.md
- infra/docker-compose.prod.yml

## Acceptance criteria

- Frontend-only changes do not rebuild or publish the contact API image.
- Contact-API-only changes do not rebuild or publish the frontend image.
- Shared infrastructure changes rebuild both images and verify both apps.
- Pull requests validate Docker builds without publishing images.
- Successful main-branch builds publish immutable `sha-<commit>` images to GHCR.
- CI never requires production runtime secrets for tests or Docker validation.

## Focused checks

- Workflow YAML inspection.
- Frontend and contact API checks.
- Docker image builds or equivalent CI execution.

## Implementation note

- Changed behavior: CI now detects frontend/contact API/shared changes, runs
  selective quality jobs, validates Dockerfiles on PRs and publishes immutable
  GHCR image references plus a release manifest on successful main builds.
- Evidence: workflow YAML inspection passed; frontend lint, typecheck/build,
  tests, accessibility, performance, content and metadata checks passed;
  contact API typecheck, tests and production build passed; `npm.cmd run
  format:check` and `npm.cmd run verify:deployment` passed; both local
  production Docker image builds passed without publishing.
- Deferred: GitHub-hosted execution and GHCR publication remain part of SITE-061;
  no production deployment was performed.

## Deferred batch gate

SITE-061 must run the complete repository verification and release review.
