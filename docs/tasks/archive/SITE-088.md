# SITE-088 — Close Batch 6 visual authority and verification foundation

- Batch: 6
- Area: batch gate / visual authority
- State: COMPLETE
- Depends on: SITE-084, SITE-085, SITE-086, SITE-087
- Gate type: mandatory full verification

## Goal

Close Batch 6 only when the dark visual authority, task registry and verification
contract are internally consistent and reproducible.

## Source-of-truth audit

Re-read AGENTS.md, `docs/style-reference.html`, `docs/07-visual-spec-reference.md`, docs/00, docs/04, docs/05,
DESIGN_SYSTEM, PROJECT_STATUS, HANDOFF, ACTIVE and BATCHES.

## Full gate

- Confirm all Batch 6 tasks are IMPLEMENTED_PENDING_GATE or COMPLETE.
- Run the complete gate protocol in `docs/tasks/BATCHES.md`.
- Inspect 1440px, 768px and 390px reference/route artifacts and record results.
- Resolve only Batch 6 failures, rerun focused checks, then rerun the full gate.
- Update current-state docs, mark Batch 6 tasks COMPLETE and archive their files.

## Acceptance criteria

- No stale `06`, light-only instruction or visual-source conflict remains.
- AA refinements and visual tooling are documented and executable.
- All gate evidence is PASS; no hidden deferred visual requirement remains.

## Gate evidence

- Batch 6 prerequisite review: SITE-084, SITE-085, SITE-086 and SITE-087 all
  reached IMPLEMENTED_PENDING_GATE before this gate; the complete authority chain
  and Batch 6 registry are consistent.
- Deterministic quality scans: frontend PASS (70 files / 6 scopes), public
  content PASS (57 files / 3 scopes) and production artifact PASS (29 files / 1
  scope). No banned marketing phrases, restricted Case 4 wording, TODO/Lorem
  content, or secret patterns were found.
- Full project gate: `npm run verify` PASS with 12 PASS, 0 DEFERRED and 0 FAIL.
  This includes typecheck, tests, build, lint, format, frontend,
  accessibility, performance, content, metadata, deployment and production
  verification. The production check passed 23 assertions with 0 deferred and
  0 failures after the local Docker engine became available.
- Visual gate: `npm run verify:visual` captured the dark reference, six public
  routes and 404 at 1440x960, 768x1024 and 390x844 (24 ignored PNG artifacts).
  The reference artifact renders the approved dark system; live route captures
  are readable and have no horizontal overflow at any live viewport. The
  reference HTML is a fixed artifact and its narrow mobile crop is not treated
  as a live-route overflow failure.
- The live dark visual rollout is explicitly scoped to Batches 7–9. It is not a
  deferred or hidden Batch 6 acceptance requirement; Batch 6 closes the
  authority, contract and evidence foundation without restyling live pages.
- Final source review found no stale deleted-06 instruction, light-only launch
  directive or conflicting visual source order. The 19 shared visual tokens and
  approved AA contrast pairs remain synchronized between the two mandatory
  visual sources.

## Finalization

Batch 6 is closed at 100%. SITE-084 through SITE-088 are marked COMPLETE and
their task files are archived. SITE-089 remains the next executable task.
