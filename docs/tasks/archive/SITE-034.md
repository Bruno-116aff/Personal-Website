# SITE-034 — Author the Account Automation case

- Batch: 3
- Area: case study / NDA-sensitive
- State: COMPLETE
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

## Implementation note

- Authored the Account Automation case exclusively with the approved lifecycle,
  fixed-capacity scheduling, health-monitoring, state-synchronization,
  circuit-breaker, budget-workflow and eligibility framing.
- The case is fourth in route, case-study and homepage work order. It contains
  no attrition figure, dollar claim, unsafe causal explanation or tooling detail
  beyond the approved framing.
- Focused evidence: `npm.cmd run build` passed. Generated HTML contains all eight
  sections, the standard confidentiality sentence and descriptive previous
  navigation. The selected case source, its metadata input and generated HTML
  were checked for every prohibited Case 4 term/detail, Playwright and dollar
  claims; no matches were found.
- Deferred: SITE-039 must perform the complete content, metadata and mandatory
  second NDA-focused human review before Batch 3 closes.
