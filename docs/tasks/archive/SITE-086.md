# SITE-086 — Finalize the accessible dark visual specification

- Batch: 6
- Area: visual specification
- State: COMPLETE
- Depends on: SITE-085

## Goal

Keep the rendered reference and written specification synchronized, standalone and
WCAG AA-safe before implementation begins.

## Non-goals

- Do not modify live frontend styles.
- Do not change copy, route behavior or metadata claims.

## Targeted context

- docs/style-reference.html
- docs/07-visual-spec-reference.md
- docs/04-tech-spec.md
- docs/05-task-breakdown-for-codex.md
- docs/DESIGN_SYSTEM.md

## Work

- Remove all links to deleted `06-visual-redesign-dark.md`.
- Set tertiary text to `#788191`; add control blue `#4A67E5` and hover `#405FD5`.
- State that white button text uses the control token, not brand accent `#5B78F6`.
- State that the About section is text-only and its current public photo must go.
- Require self-hosted WOFF2, metric overrides and `font-display: optional`.

## Acceptance criteria

- The two visual source files agree on every token and primary-button treatment.
- Public normal text/control pairs meet AA, including secondary/tertiary text.
- Technical and launch docs contain no obsolete light-only or deleted-06 instruction.

## Focused checks

- Token equality and stale-reference `rg` scan.
- Deterministic contrast calculation for all approved public text/control pairs.

## Implementation note

- Changed behavior: the dark visual specification now mirrors all reference
  tokens, states the AA-safe public text/control pairs and primary-button rule,
  documents the text-only About boundary, and defines the self-hosted WOFF2,
  metric-override and `font-display: optional` production contract. Launch docs
  no longer direct implementers to the former light foundation or a photo
  placeholder.
- Evidence: 19 tokens are equal across both visual sources; stale-reference and
  obsolete-directive scans pass; deterministic contrast ratios pass at 4.60:1 or
  higher for approved normal-text/control pairs.
- Deferred: SITE-088 must perform the complete documentation and verification
  review for Batch 6.

## Deferred batch gate

SITE-088 performs the complete documentation and verification review.
