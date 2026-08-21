# SITE-035 — Implement the primary CV route

- Batch: 3
- Area: CV route
- State: COMPLETE
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

## Implementation note

- Added a separate typed CV content model and semantic `/cv` layout with the
  approved career history, technical expertise and CV-only education context.
  The layout links back to selected work and contact.
- `/cv` uses the existing unique metadata with canonical
  `https://ivan.hubko.me/cv` and `index, follow`. The supplied target/master CV
  files were used only as structural references; unsupported legacy claims and
  contact details were not imported.
- Focused evidence: `npm.cmd run build` passed. Generated `/cv` HTML contains
  the approved career history, skills, education, Work/Contact links, canonical
  and indexing metadata. Public source and generated HTML were checked for the
  unsupported proxy figure and restricted phrases; no matches were found.
- Deferred: SITE-039 must run the complete content, metadata and responsive
  batch gate after all Batch 3 routes are authored.
