# Project Status

## Current phase

Process foundation / pre-implementation.

The repository currently contains the approved product documentation and agent
workflow files. Application source, package scripts and deployment files have not
been created yet.

## Current decision

Build a polished English-only personal site for Ivan Hubko with:

- React + Vite + TypeScript;
- Tailwind;
- build-time prerendering for six known routes;
- content separated from presentation;
- a small NestJS contact endpoint on Ivan's existing infrastructure;
- Docker + Traefik deployment;
- light theme, restrained blue accent and product-like technical minimalism.

## Current batch

Batch 0 вЂ” project process and implementation foundation.

Active tasks are listed in docs/tasks/ACTIVE.md. Batch 0 now ends with the
mandatory SITE-004 full batch gate. The plan contains seven batches and every
batch has its own final gate task. No implementation task is in progress yet.

## Completed

- Read and reconciled docs/00-brand-brief.md through docs/05-task-breakdown-for-codex.md.
- Replaced the inherited cross-project AGENTS.md with personal-site rules.
- Adapted project-workflow, quality-gates and commit-changes skills.
- Added persistent project context and batch/task conventions.
- Audited task scope and dependencies; split oversized work into independent tasks.
- Added seven mandatory batch-gate tasks; the registry contains 32 tasks total.

## Known external inputs

- Real public GitHub URL.
- Original Engineering Philosophy source, if it exists.
- Final personal photo.
- Production mail credentials and mail provider convention.
- GA4 Measurement ID.
- Search Console verification data.
- VPS, Docker/Traefik and DNS access.

These must stay configurable or explicitly blocked; never guess them.

## Next action

Start SITE-001, then implement the remaining Batch 0 foundation tasks in one
session. Run the Batch 0 gate only when the user explicitly requests finalization.
