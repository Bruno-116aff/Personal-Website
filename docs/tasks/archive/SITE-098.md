# SITE-098 — Roll out dark system to all case-study routes

- Batch: 9
- Area: case-study routes
- State: COMPLETE
- Depends on: SITE-097

## Goal

Apply the shared dark system to the reusable case-study layout and verify all four
case routes without touching their approved engineering narrative.

## Non-goals

- Do not modify case-study data, metrics, technologies, confidentiality text or order.
- Do not add architecture diagrams or new case components.

## Targeted context

- docs/style-reference.html
- docs/07-visual-spec-reference.md
- apps/frontend/src/layouts/CaseStudyLayout.tsx
- apps/frontend/src/content/case-studies.ts
- docs/01-content-facts.md

## Work

- Apply reference typography, prose measure, section rhythm, hairline dividers,
  technology lists, result surfaces and navigation states.
- Keep all case structure semantic: one H1, logical H2/H3, ordered architecture and
  accessible case navigation.
- Preserve Case 4 as last and quieter through presentation only, never contrast loss.

## Acceptance criteria

- All four routes share one layout treatment with no route-specific CSS drift.
- Case 4 passes the existing NDA/public-content boundary unchanged.
- Long prose, result grids and navigation remain usable at all target widths.

## Focused checks

- Frontend typecheck, content verifier and metadata verifier.
- Case-route screenshots at 1440px, 768px and 390px.

## Deferred batch gate

SITE-103 performs the complete secondary-route gate.

## Evidence

- Reworked the shared case-study layout with reference typography, section rhythm,
  hairline dividers, semantic H2/H3 structure, connected result surfaces and
  accessible previous/next navigation.
- Preserved the four-route order and all case-study data, including the Case 4
  confidentiality note; Case 4 is quieter only through presentation.
- Focused checks passed: `npm.cmd run typecheck:frontend`,
  `npm.cmd run verify:content`, `npm.cmd run verify:meta`.
- Visual verifier passed all four case routes at 1440px, 768px and 390px with
  no server errors or horizontal overflow.
- Deferred: SITE-103 batch gate for the complete secondary-route review.
