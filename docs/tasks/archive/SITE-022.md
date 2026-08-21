# SITE-022 — Build Career, Expertise and About

- Batch: 2
- Area: homepage career context
- State: COMPLETE
- Depends on: SITE-020

## Goal

Implement the honest career timeline, grouped technical expertise and concise About
section, including the approved development photo slot.

## Targeted context

- docs/00-brand-brief.md
- docs/01-content-facts.md
- docs/02-copywriting-guidelines.md
- docs/DESIGN_SYSTEM.md

## Work

- Render the exact career timeline, dates and titles from content facts.
- Group technical expertise without skill percentages or logo walls.
- Keep frontend and AI-assisted tooling as supporting breadth.
- Add concise career-relevant About copy and a sized neutral photo slot.

## Acceptance criteria

- All timeline data matches docs/01 exactly.
- The visual hierarchy keeps backend leadership as the primary identity.
- The photo slot has explicit dimensions and non-final placeholder treatment.
- No invented Engineering Philosophy principles, testimonials or public GitHub URL.

## Focused checks

- npm run typecheck.
- Search changed public copy for dates, titles and banned phrases.

## Deferred batch gate

SITE-024 runs the full homepage accessibility, content and visual gate.

## Implementation note

- Added the exact five-entry career timeline from content facts, with explicit
  periods, employers, roles and factual summaries.
- Added grouped backend-first technical expertise; frontend and AI-assisted
  tooling are isolated as supporting breadth without percentages or logos.
- Added concise About copy for Limassol, Cyprus, work preferences and the
  frontend-to-backend career path.
- Added a neutral, non-final photo slot with explicit 22rem maximum width and
  4:5 aspect ratio; no public GitHub URL or invented philosophy was added.
- Focused evidence: `npm.cmd run typecheck`, `npm.cmd run build`,
  `npm.cmd run verify:content` and `git diff --check` passed. Targeted review
  confirmed the documented dates/titles and absence of banned phrases.
- Deferred: SITE-024 homepage accessibility, content and responsive visual gate.
