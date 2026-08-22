# SITE-070 — Make SQLite volume permissions deploy-safe

- Batch: 5
- Area: contact persistence/deployment
- State: COMPLETE
- Depends on: SITE-069

## Goal

Guarantee that the non-root contact API can write to the production bind-mounted
SQLite directory on a fresh host.

## Non-goals

- Do not expose a public read endpoint.
- Do not add an admin UI or public read endpoint.

## Work

- Define the host-directory creation and ownership procedure.
- Add a safe deploy check or entrypoint strategy for `/data` permissions.
- Verify SQLite database, WAL and SHM files remain writable after restart.
- Document backup and restore expectations for manual contact processing.

## Acceptance criteria

- Fresh production-like startup creates or uses a writable data directory as user `node`.
- A submission persists across API restart.
- Permissions do not require running the application as root.
- The deploy instructions identify the exact host path and owner.

## Focused checks

- Local production-like container startup.
- POST a valid contact request and restart the API.
- Verify database persistence and file ownership.

## Deferred batch gate

SITE-059 verifies the same behavior with the real VPS volume.

## Implementation evidence

- Added `infra/prepare-prod-data.sh`, which creates the exact production bind
  mount path `infra/data/prod/contact-api`, assigns owner `1000:1000` for the
  non-root `node` user and applies mode `770`.
- Documented first-start preparation plus directory-level backup/restore
  expectations in `README.md`; the API remains explicitly non-root and has no
  public read endpoint.
- Extended production-like verification to use a real temporary bind-mounted
  `/data` directory, prepare its ownership, submit a valid contact request,
  restart the API with the same volume, and verify persisted SQLite data plus
  writable database, WAL and SHM files. Deployment verification now checks the
  procedure, compose mount and non-root image contract.
- Focused checks passed: `npm run typecheck`, `npm run test`,
  `npm run verify:deployment`, `git diff --check`, and
  `npm run verify:production` with `PASS: 23`, `FAIL: 0`.
- Deferred to SITE-059: verification of the same volume behavior through the
  real VPS/Nginx/Traefik production stack.
