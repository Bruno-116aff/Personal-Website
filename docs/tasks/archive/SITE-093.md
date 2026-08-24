# SITE-093 — Close Batch 7 dark shared foundation

- Batch: 7
- Area: batch gate / foundations
- State: COMPLETE
- Depends on: SITE-089, SITE-090, SITE-091, SITE-092
- Gate type: mandatory full verification

## Goal

Close the token, font, shell and primitive foundation before homepage-specific work.

## Source-of-truth audit

Re-read AGENTS.md, `docs/style-reference.html`, `docs/07-visual-spec-reference.md`, DESIGN_SYSTEM, `04`, `03` and the
four Batch 7 task files.

## Full gate

- Confirm every Batch 7 implementation task is ready for gate.
- Run the complete gate protocol in `docs/tasks/BATCHES.md`.
- Inspect shell, primitive and contact screenshots at all three target widths.
- Correct only Batch 7 defects, repeat the full suite, update current-state docs and
  archive Batch 7 after 100% closure.

## Acceptance criteria

- Dark tokens, local fonts and all shared controls are reference-aligned.
- No remote font, contrast regression, missing focus state or old light token ships.
- All full checks and visual evidence pass.

## Evidence

- SITE-089, SITE-090, SITE-091 and SITE-092 were all `IMPLEMENTED_PENDING_GATE`
  before finalization; all four now satisfy their acceptance criteria.
- Full project suite: `npm.cmd run typecheck`, `npm.cmd run test`,
  `npm.cmd run build`, frontend lint, format check, frontend verification,
  accessibility, performance, content, metadata, deployment, production and
  cross-cutting `npm.cmd run verify` — PASS. Cross-cutting summary: 12 PASS,
  0 DEFERRED, 0 FAIL; production summary: 23 PASS, 0 DEFERRED, 0 FAIL.
- Visual verification captured the reference, six public routes and branded 404 at
  1440×960, 768×1024 and 390×844. Manual shell, primitives and contact review at
  all three widths passed with no clipping or horizontal overflow.
- Quality-gates scans passed for `apps/frontend/src` and `apps/frontend/dist`.
  The broad `apps/frontend` scan reports only the existing `console.log` calls in
  verification scripts; those are scanner false positives outside public runtime
  code and were not changed in this visual-foundation gate.
- Source-of-truth audit re-read AGENTS.md, the dark reference, visual spec,
  DESIGN_SYSTEM, technical/domain contracts and all four Batch 7 task files.
- Batch 7 is closed at 100%; current-state docs and task registry are updated and
  the five Batch 7 task files are archived.
