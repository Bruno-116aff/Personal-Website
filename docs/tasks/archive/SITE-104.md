# SITE-104 — Remove case-study subsection numbering

- Batch: 11
- Area: case-study presentation
- State: COMPLETE
- Depends on: none

## Goal

Remove decorative numeric prefixes from case-study page labels while preserving
the deliberate `01–04` ordering in the homepage Featured Work cards.

## Non-goals

- Do not change case-study content, route order, navigation or metadata.
- Do not remove the Featured Work card numbering on the homepage.

## Targeted source

- `apps/frontend/src/layouts/CaseStudyLayout.tsx`
- `apps/frontend/src/App.tsx`
- `docs/style-reference.html`
- `docs/07-visual-spec-reference.md`

## Behavior steps

1. Render the case-study hero label without a case number.
2. Render each case-study subsection with its label but without a numeric prefix.
3. Keep homepage Featured Work numbering sourced from the card index.

## Acceptance criteria

- Case-study pages contain no numeric case or subsection labels.
- Featured Work cards still render `01`, `02`, `03`, `04` in homepage order.
- Case-study headings and all existing content remain unchanged.

## Focused checks

- `npm --prefix apps/frontend run typecheck`
- `npm --prefix apps/frontend run build`
- `npm --prefix apps/frontend run lint`
- Source/output inspection confirms case-study labels are unnumbered and Featured Work retains its index.

## Deferred batch gate

SITE-105 will run the complete Batch 11 verification and close the batch.

## Evidence

- Updated `CaseStudyLayout` so the case-study hero and all eight subsection labels
  render `Case study` without numeric prefixes.
- Preserved homepage Featured Work numbering in `App.tsx`, where the cards still
  render `String(index + 1).padStart(2, '0')`.
- `npm.cmd --prefix apps/frontend run typecheck` passed.
- `npm.cmd --prefix apps/frontend run build` passed and generated all six public
  route artifacts.
- `npm.cmd --prefix apps/frontend run lint` passed.
- Generated infrastructure-reliability HTML contains unnumbered case labels and
  no matching `01–08 / Case study` or `Case study / 01–04` labels.
- Full Batch 11 gate deferred to SITE-105.
