# SITE-032 — Author the Operations Automation case

- Batch: 3
- Area: case study
- State: COMPLETE
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

## Implementation note

- Authored the Operations Automation content in the shared case-study model:
  validation, RabbitMQ-backed independently retryable tasks, parallel
  provisioning, destination verification and Telegram confirmation.
- The internal tracking dependency is generalized; the published outcomes use
  only the approved `1–3h → ~15m`, `~$7K/year` and near-zero manual-error facts.
- Focused evidence: `npm.cmd run build` passed. Generated case HTML contains all
  eight sections, the standard confidentiality sentence, approved metrics and
  descriptive previous/next navigation. Source and generated HTML were checked
  for internal tracking product names and restricted phrases; no matches found.
- Deferred: SITE-039 must run the complete content, NDA, metadata and human
  review gate after all Batch 3 routes are authored.
