# SITE-034 — Author the Account Automation case

- Batch: 3
- Area: case study / NDA-sensitive
- State: READY
- Depends on: SITE-030

## Goal

Publish the fourth case exclusively through the approved engineering framing.

## Targeted context

- docs/01-content-facts.md
- docs/02-copywriting-guidelines.md
- AGENTS.md

## Work

- Write all eight standard case-study sections using only safe lifecycle,
  scheduling, health-monitoring, state-synchronization, circuit-breaker, budget
  workflow and eligibility language.
- Keep the resource-constrained scheduling problem central.
- Use the relative attrition result only if needed.
- Adapt the resource-scarcity engineering lesson.

## Acceptance criteria

- The case remains fourth everywhere.
- No prohibited Case 4 terms/details appear in copy, metadata or asset text.
- No dollar result or unsafe causal explanation is included.
- The standard confidentiality sentence is present.

## Focused checks

- Run a public-source restricted-term search on this route and its metadata input.
- npm run build.

## Deferred batch gate

SITE-039 performs a mandatory second NDA-focused human read before Batch 3 closes.
