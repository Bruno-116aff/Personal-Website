# SITE-021 — Build the homepage positioning sections

- Batch: 2
- Area: homepage top
- State: COMPLETE
- Depends on: SITE-020

## Goal

Implement the first-scroll experience: Hero, Impact Strip, What I Do and Featured
Work.

## Targeted context

- docs/00-brand-brief.md
- docs/01-content-facts.md
- docs/03-site-structure-and-domains.md
- docs/DESIGN_SYSTEM.md

## Work

- Use the approved positioning and brand promise.
- Use only approved Impact Strip metrics.
- Add four work teasers in the required order with descriptive links.
- Keep Case 4 last and visually quieter.

## Acceptance criteria

- A non-technical reader understands role, stack, location and impact in one scroll.
- No banned marketing phrases, invented claims or unsupported numbers appear.
- No skill bars or first-screen logo wall exists.

## Focused checks

- npm run typecheck
- Search public source for banned phrases and unsupported placeholder copy.

## Deferred batch gate

Content and responsive visual gate.

## Implementation note

- Replaced the homepage placeholder with the Hero, Impact Strip, What I Do and
  Featured Work sections in the approved order.
- Added source-separated homepage copy and data in `src/content/home.ts`.
- Used only approved positioning, metrics and four case-study teasers; links use
  descriptive labels, and Account Automation remains last with quieter styling.
- Focused evidence: `npm.cmd run typecheck`, `npm.cmd run build`,
  `npm.cmd run verify:content`, generated homepage HTML review and
  `git diff --check` passed.
- Deferred: Batch 2 content and responsive visual gate remains for SITE-024.
