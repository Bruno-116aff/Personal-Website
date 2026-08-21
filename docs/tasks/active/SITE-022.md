# SITE-022 — Build Career, Expertise and About

- Batch: 2
- Area: homepage career context
- State: READY
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
