# SITE-031 — Author the Infrastructure Reliability case

- Batch: 3
- Area: case study
- State: READY
- Depends on: SITE-030

## Goal

Publish the Infrastructure Reliability case as a factual infrastructure and
failover story.

## Targeted context

- docs/01-content-facts.md
- docs/02-copywriting-guidelines.md
- docs/00-brand-brief.md

## Work

- Write all eight standard case-study sections.
- Explain hardware-aware failover, worker responsibilities and safe access-control context.
- Use only the direct $3–4K/year proxy line-item reduction and qualitative reliability impact.
- Adapt the infrastructure engineering lesson.

## Acceptance criteria

- No $15–20K/year figure appears.
- All numbers and technologies are supported by docs/01.
- The standard confidentiality sentence is present.
- The page gives technical signal without revealing an unnecessary threat model.

## Focused checks

- Review public source against approved numbers and banned phrases.
- npm run build.

## Deferred batch gate

SITE-039 runs the complete content, NDA, metadata and human review gate.
