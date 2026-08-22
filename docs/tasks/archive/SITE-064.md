# SITE-064 — Add the Engineering Approach section

- Batch: 5
- Area: homepage content
- State: COMPLETE
- Depends on: SITE-063

## Goal

Add the required Engineering Approach section without inventing an attributed
philosophy or claiming that the missing original source was reviewed.

## Non-goals

- Do not create five fabricated principles.
- Do not add a blog, testimonials or unrelated personal-brand content.

## Work

- Add structured, reviewable approach copy in the content layer.
- Render the section between Career Story and Technical Expertise or in the
  approved homepage order.
- Use only defensible themes from the brand and copy guidelines: reliable
  automation, production ownership, explicit trade-offs and recoverable systems.
- Use `docs/00–02` as the authoritative source for the Engineering Approach themes.

## Acceptance criteria

- Homepage contains a visible, semantic Engineering Approach section.
- Copy is English-only and interview-defensible.
- No banned marketing phrase or unsupported claim appears.
- Section is included in prerendered HTML and has correct heading order.

## Focused checks

- `npm run verify:content`
- `npm run verify:accessibility`
- `npm run build`

## Deferred batch gate

SITE-059 performs the final human content and source-of-truth review.

## Implementation evidence

- Added structured `engineeringApproach` content in `apps/frontend/src/content/home.ts`
  with four reviewable themes: starting from manual failure, recoverable failure
  handling, explicit architecture trade-offs and production ownership.
- Rendered a semantic `Engineering Approach` section between Career Story and
  Technical Expertise, with four accessible article cards and responsive layout.
- The section uses the approved defensible themes from `docs/00–02` and does not
  claim attribution to a separate philosophy document.
- Focused checks passed: `npm run build`, `npm run verify:content`,
  `npm run verify:accessibility`, prerendered homepage heading inspection and
  `git diff --check`.
- Deferred to SITE-059: final human content and source-of-truth review after the
  accumulated Batch 5 changes.
