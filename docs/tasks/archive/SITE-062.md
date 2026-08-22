# SITE-062 — Make the root verification gate truthful

- Batch: 5
- Area: verification orchestration
- State: COMPLETE
- Depends on: SITE-050, SITE-051, SITE-052, SITE-053, SITE-054, SITE-055

## Goal

Make `npm run verify` represent the complete local verification contract instead
of passing while accessibility, performance and production checks are omitted or
reported as successful deferred work.

## Non-goals

- Do not pretend that missing VPS, DNS, GA4 or live-browser inputs are available.
- Do not change application behavior.

## Work

- Include accessibility and performance checks in the aggregate verification path.
- Separate static, production-like and local-production results.
- Make deferred checks produce an explicit non-success status with actionable text.
- Keep a documented command for checks that are intentionally unavailable locally.

## Acceptance criteria

- A failing sub-check fails the aggregate command.
- A deferred production check cannot be mistaken for PASS.
- The command output names the exact missing external input.
- Existing passing typecheck, tests, build, content, metadata and deployment checks remain passing.

## Focused checks

- `npm run verify`
- Each individual `verify:*` command
- `git diff --check`

## Deferred batch gate

SITE-059 reruns the complete verification set and confirms that no check is
silently skipped.

## Implementation evidence

- Added the root verification orchestrator with separate `STATIC`,
  `PRODUCTION-LIKE` and `LOCAL-PRODUCTION` sections. It runs typecheck, tests,
  build, frontend, accessibility, performance, content, metadata, deployment
  and production verification without short-circuiting after the first result.
- Local production output is checked separately from static verification and
  returns a non-zero status on local failures.
- Focused checks passed: `node --check` for verification scripts, `npm run
  typecheck`, `npm run test`, `npm run build`, `npm run verify:frontend`,
  `npm run verify:accessibility`, `npm run verify:performance`, `npm run
  verify:content`, `npm run verify:meta`, `npm run verify:deployment` and `git
  diff --check`.
- `npm run verify:production` verifies the local production-like runtime.
- Deferred to SITE-059: rerun the accumulated Batch 5 gate and confirm the
  complete verification report after all remediation tasks are implemented.
