# SITE-010 — Scaffold the frontend project

- Batch: 1
- Area: frontend scaffold
- State: COMPLETE
- Depends on: SITE-004

## Goal

Create the React + Vite + TypeScript + Tailwind foundation without adding
unapproved product features.

## Targeted context

- docs/04-tech-spec.md
- docs/ARCHITECTURE.md
- docs/DESIGN_SYSTEM.md
- AGENTS.md

## Work

- Add package.json and the Vite/TypeScript/Tailwind configuration.
- Add a minimal source entry and static asset conventions.
- Add environment configuration with safe placeholders.
- Add typecheck/build scripts and a minimal test/verification convention.

## Acceptance criteria

- Fresh install and typecheck succeed.
- A production build succeeds.
- No secrets or restricted source material enter public assets.
- The project remains light-theme only.

## Focused checks

- npm install
- npm run typecheck
- npm run build

## Deferred batch gate

npm run verify:frontend and npm run verify:meta.

## Implementation note

- Added the React/Vite/TypeScript/Tailwind project foundation, light-only global
  style entry, minimal accessible React entry point and static asset directories.
- Added `.env.example` with non-secret site, contact API and GA4 placeholders;
  no credentials or restricted source material were added.
- Added the documented npm verification command convention, with later-scope
  content, metadata and production checks explicitly reported as DEFERRED and
  returning a non-zero status until their owning tasks implement them.
- Focused evidence: `npm.cmd install`, `npm.cmd run typecheck` and
  `npm.cmd run build` passed on 2026-08-21; `git diff --check` passed.

## Batch finalization

- SITE-014 accumulated gate passed the available Batch 1 checks on 2026-08-21.
