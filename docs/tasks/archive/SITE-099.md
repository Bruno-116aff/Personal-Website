# SITE-099 — Roll out dark system to the CV route

- Batch: 9
- Area: CV route
- State: COMPLETE
- Depends on: SITE-098

## Goal

Make `/cv` use the approved dark visual language while retaining its existing content,
semantic structure and recruiter-oriented clarity.

## Non-goals

- Do not alter CV facts, experience order, education or CTA destinations.
- Do not turn dense skills back into pill walls.

## Targeted context

- docs/style-reference.html
- docs/07-visual-spec-reference.md
- apps/frontend/src/layouts/CvLayout.tsx
- apps/frontend/src/content/cv.ts
- docs/01-content-facts.md

## Work

- Restyle CV hero, metadata, timeline, skill groups and education using shared dark
  tokens, typography, hairlines and technology-list pattern.
- Preserve one-H1 hierarchy, named navigation and accessible link/button treatment.
- Test long location/availability text and skill lists at mobile width.

## Acceptance criteria

- CV reads as the same design system as homepage and case studies.
- Public facts and route metadata remain unchanged.
- No card shadow, bordered skill-pill wall or light token remains.

## Focused checks

- Frontend typecheck and accessibility verifier.
- CV screenshots at all target widths.

## Deferred batch gate

SITE-103 performs the complete secondary-route gate.

## Evidence

- Rolled the CV route onto the shared dark system: reference typography, mono
  metadata, hero tags, hairline timeline/section rhythm and dot-separated
  technology lists.
- Removed bordered skill-group surfaces so dense skills remain readable without a
  pill wall; preserved one H1, named CV navigation, CTA destinations and all
  public CV facts.
- Focused checks passed: `npm.cmd run typecheck:frontend` and
  `npm.cmd run verify:accessibility`.
- Visual verifier passed the CV route at 1440px, 768px and 390px with no server
  errors or horizontal overflow.
- Deferred: SITE-103 batch gate for the complete secondary-route review.
