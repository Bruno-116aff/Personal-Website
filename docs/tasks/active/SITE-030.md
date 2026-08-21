# SITE-030 — Create the case-study content model and layout

- Batch: 3
- Area: case-study template
- State: READY
- Depends on: SITE-024

## Goal

Create one reusable case-study template backed by separate structured content.

## Targeted context

- docs/01-content-facts.md
- docs/02-copywriting-guidelines.md
- docs/ARCHITECTURE.md

## Work

- Define typed case-study data.
- Implement Context, Problem, Constraints, Approach, Architecture, Technology,
  Result and Engineering Lessons sections.
- Add standardized confidentiality wording to every case.
- Add descriptive previous/next and homepage links.

## Acceptance criteria

- Layout is content-driven, not duplicated per route.
- Architecture is plain-language text flow.
- Technologies and metrics are case-specific and supported.
- All four cases can render without special sensitive-case hacks.

## Focused checks

- npm run typecheck
- Render a fixture case and inspect generated HTML.

## Deferred batch gate

Full content/NDA gate over all case routes.
