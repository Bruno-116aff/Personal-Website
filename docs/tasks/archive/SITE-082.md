# SITE-082 — Prepare selective CD, first launch and rollback

- Batch: 10
- Area: CD / production operations
- State: COMPLETE
- Depends on: SITE-081

## Goal

Prepare a production deployment workflow and server-side release helpers that can
start the stack on a prepared deploy directory, update only the changed service,
wait for health, run external smoke checks and roll back to the previous images.

## Non-goals

- Do not execute a real VPS deployment in this task.
- Do not commit the production `.env`, SSH keys, registry tokens or live credentials.

## Targeted context

- docs/style-reference.html
- docs/07-visual-spec-reference.md
- docs/04-tech-spec.md
- docs/ARCHITECTURE.md
- infra/docker-compose.prod.yml

## Acceptance criteria

- CD leaves the server-owned compose and production `.env` at `$DEPLOY_PATH`
  untouched; it passes only image references over SSH.
- First launch prepares SQLite storage, pulls both required images and starts both
  services through the external Traefik network.
- Frontend-only and contact-API-only releases use `--no-deps` and do not recreate
  the other service.
- Health checks, public smoke checks and a previous-image rollback path exist.
- Replaced images are removed only after deployment and public smoke checks pass;
  rollback state is then cleared.
- Missing first-launch inputs fail with an actionable message.

## Focused checks

- Shell-script syntax and static safety review.
- Production Compose config with a generated non-secret fixture environment.
- First-launch/selective-release decision-path review.

## Implementation note

- Changed behavior: CD consumes the CI manifest, uses the prepared server compose,
  supports first launch, selective `--no-deps` service updates, health and public
  smoke checks, previous-image rollback and post-smoke removal of replaced images.
- Evidence: POSIX shell syntax check passed in a container; production Compose
  config accepted a generated non-secret fixture environment; CD first-launch,
  selective-release, health, smoke, rollback and cleanup decision paths passed
  static safety review; `npm.cmd run verify:production` passed with 23 checks,
  including local image builds, direct routes, public assets, CORS and SQLite
  persistence after API restart. No production deployment was performed.
- Deferred: GitHub secrets, GHCR permissions and actual VPS/DNS/Traefik execution
  remain external release inputs for SITE-061.

## Deferred batch gate

SITE-061 must perform the final production-readiness review and record external
VPS/DNS/Traefik verification as either passed or explicitly deferred.
