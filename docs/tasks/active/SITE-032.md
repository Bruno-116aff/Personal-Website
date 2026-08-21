# SITE-032 — Author the Operations Automation case

- Batch: 3
- Area: case study
- State: READY
- Depends on: SITE-030

## Goal

Publish the server/domain provisioning case as a clear orchestration and
recoverability story.

## Targeted context

- docs/01-content-facts.md
- docs/02-copywriting-guidelines.md
- docs/00-brand-brief.md

## Work

- Write all eight standard case-study sections.
- Explain the queue, validation, parallel provisioning, verification and notification flow.
- Use only the approved 1–3 hours to ~15 minutes and ~$7K/year results.
- Generalize the internal tracking system and adapt the idempotency lesson.

## Acceptance criteria

- No internal tracking product or proprietary identifier is named.
- All metrics and technologies are supported by docs/01.
- The standard confidentiality sentence is present.
- The architecture explains decisions, not a technology inventory.

## Focused checks

- Review public source against approved metrics and restricted terms.
- npm run build.

## Deferred batch gate

SITE-039 runs the complete content, NDA, metadata and human review gate.
