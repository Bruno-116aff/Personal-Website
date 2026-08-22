# SITE-080 — Add repository onboarding and automated quality tooling

- Batch: 5
- Area: repository quality
- State: COMPLETE
- Depends on: SITE-079

## Goal

Make the repository reproducible for a new session and enforce the quality gates
automatically.

## Non-goals

- Do not add unrelated deployment or product features.
- Do not commit secrets, credentials or user-owned production values.

## Work

- Add a concise README covering architecture, local setup, env values, commands,
  contact persistence and production prerequisites.
- Add ESLint and Prettier configuration with scripts and CI-safe defaults.
- Add a CI workflow for install, typecheck, tests, build and static verification.
- Document that the current verification scope is local production/browser checks.

## Acceptance criteria

- A new contributor can run the documented local checks.
- CI runs the same truthful aggregate checks as local development.
- Formatting/linting produces actionable failures.
- README describes the current local development scope accurately.

## Focused checks

- Fresh install using both app lockfiles.
- `npm run typecheck`
- `npm run test`
- `npm run verify`
- Run lint and format checks.

## Deferred batch gate

SITE-059 runs the final aggregate gate including CI configuration review.

## Implementation evidence

- Added a concise repository README covering the two-app architecture, lockfile-based local setup, environment values, commands, SQLite contact persistence, production prerequisites and the external inputs required for live/browser verification.
- Added frontend-owned ESLint flat configuration and Prettier configuration/scripts with CI-safe defaults; root scripts now expose `lint`, `format`, and `format:check`, and aggregate verification includes lint and format checks.
- Added `.github/workflows/quality.yml`, which installs both app lockfiles with `npm ci`, runs typecheck, tests, build and `npm run verify -- --skip-live`.
- Focused checks passed: fresh `npm ci --prefix apps/frontend`, fresh `npm ci --prefix apps/contact-api`, `npm run typecheck`, `npm run test`, `npm run build`, `npm run lint`, `npm run format:check`, `npm run verify -- --skip-live` (11 PASS, 0 FAIL), and `git diff --check`.
- `npm run verify` passed all local static and production-like checks (12 aggregate PASS plus 23 production-like PASS).
- Deferred to SITE-059: accumulated Batch 5 gate and CI configuration review.
