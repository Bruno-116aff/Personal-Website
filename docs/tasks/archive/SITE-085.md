# SITE-085 — Make the dark reference authoritative in project instructions

- Batch: 6
- Area: visual authority
- State: COMPLETE
- Depends on: SITE-084

## Goal

Make the approved dark-only direction unambiguous without changing positioning,
public content, routes, NDA constraints or launch scope.

## Non-goals

- Do not implement CSS or modify application components.
- Do not add a theme switcher or a light alternative.

## Targeted context

- docs/style-reference.html
- docs/07-visual-spec-reference.md
- AGENTS.md
- docs/00-brand-brief.md
- docs/DECISIONS.md

## Work

- Require both visual sources for every redesign task and define their precedence.
- Replace former light-only visual language with dark-only/no-switcher language.
- Keep `00` authoritative for positioning and non-overridden hard constraints.
- Record the durable dark-only decision in `DECISIONS.md`.

## Acceptance criteria

- No instruction can direct an implementer toward a light launch design.
- The visual source order is explicit and does not weaken fact/NDA precedence.
- No product invariant other than visual direction changes.

## Focused checks

- `rg` scan for contradictory visual directives in the targeted documents.

## Implementation note

- Changed behavior: redesign instructions now require both visual reference
  sources, define their visual precedence, preserve `00-brand-brief.md` for
  positioning and hard constraints, and explicitly protect factual, NDA, route,
  metadata, API and security authority.
- Evidence: focused `rg` scan found only approved dark-only/no-switcher language;
  `DECISIONS.md` D-011 records the durable dark-only decision; scoped diff review
  found no frontend, content, route or API changes.
- Deferred: SITE-088 must re-read the complete authority chain and close Batch 6.

## Deferred batch gate

SITE-088 re-reads the complete authority chain and closes Batch 6.
