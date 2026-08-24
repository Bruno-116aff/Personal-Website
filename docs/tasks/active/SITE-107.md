# SITE-107 — Verify Unified Platform section transition

- Batch: 11
- Area: case-study presentation
- State: IMPLEMENTED_PENDING_GATE
- Depends on: SITE-104, SITE-106

## Goal

Check the Unified Platform Context → Problem transition at the required
responsive widths and fix any confirmed overlap or duplicated rendering.

## Non-goals

- Do not change case-study copy, section order, route behavior or metadata.
- Do not alter unrelated case-study spacing or shared visual tokens.

## Targeted source

- `apps/frontend/src/layouts/CaseStudyLayout.tsx`
- `apps/frontend/src/components/primitives.tsx`
- `apps/frontend/src/styles/index.css`
- `apps/frontend/src/content/case-studies.ts`
- `apps/frontend/scripts/verify-visual.ts`

## Behavior steps

1. Inspect the rendered Unified Platform route at desktop, tablet and mobile widths.
2. Compare the Context section bounds, divider and Problem section bounds in the DOM.
3. Fix only a confirmed overlap, duplicate layer or invalid spacing rule.
4. Recheck all case-study routes for regressions.

## Acceptance criteria

- The Context → Problem transition has no overlapping or duplicated text at any
  required viewport.
- Unified Platform content appears exactly once and remains in the approved order.
- Other case-study routes remain visually and structurally unchanged.

## Focused checks

- `npm --prefix apps/frontend run verify:visual`
- `npm --prefix apps/frontend run typecheck`
- `npm --prefix apps/frontend run build`
- `npm --prefix apps/frontend run lint`
- Targeted screenshot/DOM inspection of Unified Platform at 1440px, 768px and 390px.

## Deferred batch gate

SITE-105 will run the complete Batch 11 verification after SITE-107 is
implementation-ready.

## Evidence

- Visual review passed for all public routes at 1440px, 768px and 390px.
- Unified Platform screenshots show a single Context block, one divider and a
  separate Problem block with no visible text duplication.
- DOM inspection reports one paragraph in Context and one paragraph in Problem;
  the Context section bottom and Problem section top meet exactly at the divider
  with no overlap at all three viewport widths.
- Computed layout inspection found normal static positioning, visible overflow,
  no transform and full opacity on both sections.
- No code change was required; the suspected defect was not reproducible.
- Preview process started for inspection was stopped; its port is free.
- Full Batch 11 gate deferred to SITE-105.
