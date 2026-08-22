# SITE-063 — Repair quality-gate scanner scopes

- Batch: 5
- Area: audit tooling
- State: COMPLETE
- Depends on: SITE-062

## Goal

Make the quality-gates scanner inspect the real two-app repository layout.

## Non-goals

- Do not weaken banned-content or secret patterns.
- Do not scan internal source-of-truth documents as public content.

## Work

- Point frontend/content scans to `apps/frontend/src` and public files.
- Point production scans to `apps/frontend/dist`.
- Add contact-api source/config coverage where appropriate.
- Fail or clearly report when a requested scope contains no files.

## Acceptance criteria

- Default frontend and content scans find real files.
- Production scan inspects generated output.
- A clean scan reports PASS with file counts, not DEFERRED.
- Missing scopes remain explicit failures/deferred results with a reason.

## Focused checks

- Run all three quality-gate scanner modes.
- Compare scanner paths with `rg --files` output.
- `git diff --check`

## Deferred batch gate

SITE-059 reruns the scanners after the full batch build.

## Implementation evidence

- Updated the scanner defaults to inspect `apps/frontend/src`, frontend public
  files and `apps/frontend/index.html`; frontend mode also covers
  `apps/contact-api/src`, `package.json` and `tsconfig.json` for application
  source/config checks.
- Production mode now scans `apps/frontend/dist`. All scopes are counted before
  scanning, and missing or empty scopes fail explicitly with their path.
- Clean default scans passed: frontend verified 55 files across 6 scopes,
  content verified 42 files across 3 scopes, and production verified 19 files
  across 1 scope. The counts match `rg --files` output for every configured
  scope.
- A missing target was verified to fail with an explicit scope path and exit 1.
- `git diff --check` passed. Deferred to SITE-059: rerun all three scanners
  after the accumulated Batch 5 build.
