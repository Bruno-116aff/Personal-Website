# SITE-035 — Implement the primary CV route

- Batch: 3
- Area: CV route
- State: READY
- Depends on: SITE-030

## Goal

Create /cv as the primary indexable CV page with the same positioning and only
approved factual claims.

## Targeted context

- docs/01-content-facts.md
- docs/03-site-structure-and-domains.md
- docs/04-tech-spec.md
- docs/02-copywriting-guidelines.md

## Work

- Add the CV layout and complete route content.
- Include education only at CV/footer-level context.
- Add route metadata and navigation back to Work and Contact.
- Preserve /cv as the primary indexable CV location.

## Acceptance criteria

- Generated /cv HTML is meaningful without client JavaScript.
- Dates, titles, skills and education match docs/01.
- No unsupported claim from a legacy CV is imported.
- Canonical/indexing behavior follows docs/03.

## Focused checks

- npm run build.
- Inspect generated /cv HTML and metadata.

## Deferred batch gate

SITE-039 runs the complete content, metadata and responsive gate.
