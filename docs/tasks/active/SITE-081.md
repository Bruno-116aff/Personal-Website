# SITE-081 — Build selective CI and immutable application images

- Batch: 6
- Area: CI / Docker artifacts
- State: IMPLEMENTED_PENDING_GATE
- Depends on: SITE-059

## Goal

Create a GitHub Actions CI pipeline that verifies only the affected application
when possible, verifies shared deployment contracts when infrastructure changes,
and builds/publishes immutable frontend and contact API images for successful
main-branch releases.

## Non-goals

- Do not deploy to the VPS from this task.
- Do not add production credentials or runtime `.env` files to Git.

## Targeted context

- docs/04-tech-spec.md
- docs/ARCHITECTURE.md
- package.json
- infra/docker-compose.prod.yml
- apps/frontend/Dockerfile

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
- Evidence: `npm run verify`, `npm run format:check`, both local production Docker
  image builds and `npm run verify:deployment` pass.
- Deferred: GitHub-hosted execution and GHCR publication remain part of SITE-061;
  no production deployment was performed.

## Deferred batch gate

SITE-061 must run the complete repository verification and release review.
