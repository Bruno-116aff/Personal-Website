# SITE-033 — Author the Unified Platform case

- Batch: 3
- Area: case study
- State: COMPLETE
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

## Implementation note

- Authored the Unified Platform content in the shared case-study model: system
  consolidation, cross-system reconciliation, centralized operational controls
  and approved supporting capabilities.
- The Node.js/Express modular monolith is presented as appropriate for the
  initial scope; the NestJS microservices rewrite is explained as a response to
  growing responsibilities and integration boundaries. No financial impact is
  claimed.
- Focused evidence: `npm.cmd run build` passed. Generated case HTML contains all
  eight sections, the standard confidentiality sentence, reconciliation,
  scope-driven architecture evolution and descriptive previous/next navigation.
  It was checked for dollar, revenue, profit, headcount-cost and restricted
  content claims; no matches were found.
- Deferred: SITE-039 must run the complete content, NDA, metadata and human
  review gate after all Batch 3 routes are authored.
