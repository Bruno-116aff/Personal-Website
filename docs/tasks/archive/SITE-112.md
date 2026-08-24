# SITE-112 — Apply final copy to content model

- Batch: 13
- Area: content model / public copy
- State: COMPLETE
- Depends on: SITE-111

## Evidence

- Updated homepage, career/About, expertise/CV and all four case-study content objects.
- `npm.cmd --prefix apps/frontend run typecheck` — PASS.
- `npm.cmd --prefix apps/frontend run test -- --runInBand` — PASS.
- `npm.cmd --prefix apps/frontend run verify:content` — PASS.
- User confirmed all Batch 13 tasks were checked and requested closure.

## Goal

Apply the supplied final copy specification to homepage content, career/About,
technical expertise, CV data and all four case-study content objects.

## Non-goals

- Do not redesign the approved dark UI or change routes/API behavior.
- Do not publish restricted Case 4 business context or the unverified $15–20K figure.

## Targeted source

- `apps/frontend/src/content/home.ts`
- `apps/frontend/src/content/profile.ts`
- `apps/frontend/src/content/career.ts`
- `apps/frontend/src/content/cv.ts`
- `apps/frontend/src/content/case-studies.ts`

## Acceptance criteria

- Homepage hero, impact, capabilities, selected work, career, approach, expertise and About data match the supplied specification.
- CV data uses the approved positioning, experience and technical grouping without inventing claims.
- All four case studies use the supplied Context → Problem → Constraints → Approach → Architecture → Technology → Result → Engineering Lessons copy.
- Case 4 contains only the approved engineering framing and uses `~5x` attrition wording without explanation.
- Approved numbers appear only in their intended contexts.

## Focused checks

- `npm.cmd --prefix apps/frontend run typecheck`
- `npm.cmd --prefix apps/frontend run test -- --runInBand`
- `npm.cmd --prefix apps/frontend run verify:content`
