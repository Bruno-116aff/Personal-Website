# SITE-033 — Author the Unified Platform case

- Batch: 3
- Area: case study
- State: READY
- Depends on: SITE-030

## Goal

Publish the consolidation and architecture-maturity story without inventing a
financial result.

## Targeted context

- docs/01-content-facts.md
- docs/02-copywriting-guidelines.md
- docs/00-brand-brief.md

## Work

- Write all eight standard case-study sections.
- Lead with cross-system reconciliation and operational control.
- Explain the modular-monolith to microservices transition as a scope-driven decision.
- Add only approved supporting-system context and the architecture-humility lesson.

## Acceptance criteria

- No dollar impact is claimed for this case except approved supporting-service data.
- The monolith-to-microservices story does not imply microservices were the default.
- The standard confidentiality sentence is present.
- Every system detail is generalized to the approved level.

## Focused checks

- Review public source against approved facts and metrics.
- npm run build.

## Deferred batch gate

SITE-039 runs the complete content, NDA, metadata and human review gate.
