# SITE-067 — Consolidate career and skill content

- Batch: 5
- Area: content architecture
- State: COMPLETE
- Depends on: SITE-066

## Goal

Remove duplicated career and expertise data so homepage and CV cannot drift apart.

## Non-goals

- Do not change approved facts, titles, dates or technologies.
- Do not expose restricted source material.

## Work

- Create one canonical career/skills content source.
- Derive homepage summaries and CV detail views from that source.
- Keep presentation-specific labels and grouping in view adapters only.
- Add a consistency test for shared career facts.

## Acceptance criteria

- Career dates, employers and roles have one factual source.
- Homepage and CV render the same approved facts.
- Supporting breadth and AI-assisted tooling remain secondary.
- Existing content and metadata checks pass.

## Focused checks

- `npm run typecheck`
- `npm run test`
- `npm run verify:content`

## Deferred batch gate

SITE-059 performs the final factual review against `docs/01-content-facts.md`.

## Implementation evidence

- Added canonical career and skill facts to `apps/frontend/src/content/profile.ts`.
  The homepage and CV now consume view adapters from that source instead of
  maintaining separate timeline and technology copies.
- Kept presentation-specific labels/grouping in `career.ts` and `cv.ts`; the
  approved supporting breadth and AI-assisted tooling remain secondary in both
  views.
- Added `profile.spec.ts` and wired it into the frontend test script. It verifies
  identical career facts and complete canonical skill coverage for homepage and
  CV adapters.
- Focused checks passed: `npm run typecheck`, `npm run test`,
  `npm run verify:content`, `npm run build`, `npm run verify:meta`,
  `npm run verify:accessibility` and `git diff --check`.
- Deferred to SITE-059: final factual reconciliation against
  `docs/01-content-facts.md` after the accumulated Batch 5 changes.
