# SITE-060 — Run content and NDA release review

- Batch: 10
- Area: release content
- State: COMPLETE
- Depends on: SITE-103

## Goal

Perform the mandatory human content checkpoint before launch.

## Targeted context

- docs/style-reference.html
- docs/07-visual-spec-reference.md
- docs/01-content-facts.md
- docs/02-copywriting-guidelines.md
- docs/03-site-structure-and-domains.md

## Work

- Read complete public homepage, four cases and /cv.
- Check every number, date, title, technology and link.
- Search banned marketing and Case 4 terms across public output.
- Treat `docs/00–02` as the authoritative source for the Engineering Approach
  themes; no separate philosophy document is required.
- Record approval issues in a batch report; do not silently fix facts by guessing.

## Acceptance criteria

- Public copy is English only and interview-defensible.
- All four cases use the standard confidentiality sentence.
- Case 4 passes a second NDA-focused read.
- No unsupported claim or fake placeholder remains.

## Focused checks

- `npm.cmd run verify:content` from `apps/frontend` — PASS; public content scan
  verified 34 files.
- Public-source `rg` scan — PASS; no Cyrillic, banned marketing language,
  Case 4 restricted terms, placeholder markers or unverified `$15–20K` claim
  found in public source or generated output.
- Human review — PASS: homepage, all four case studies and `/cv` were reviewed
  against the targeted source-of-truth documents. Career dates and titles,
  technologies, vetted numbers, approved contact links, route order and
  metadata claims are interview-defensible. All four cases use the exact
  standard confidentiality sentence; Case 4 received a second NDA-focused
  read and contains only the approved engineering framing.
- Generated-route checklist — PASS: six expected public routes are present;
  each case contains the standard confidentiality sentence exactly once.
- No approval issues or in-scope content fixes remain.

## Deferred batch gate

SITE-061 runs the complete final release verification after the redesign batches.
