# SITE-010 — Scaffold the frontend project

- Batch: 1
- Area: frontend scaffold
- State: READY
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
