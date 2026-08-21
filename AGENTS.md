# AGENTS.md — Ivan Hubko personal site

This is the repository-wide instruction entry point for Codex in this project.
The public product is an English-only personal website for Ivan Hubko, positioned
as a Senior Backend Engineer & Tech Lead.

## Source of truth

Read only the context relevant to the current task:

- `docs/00-brand-brief.md` — positioning, audience, tone and visual direction.
- `docs/01-content-facts.md` — factual claims, dates, metrics, technologies and
  Case 4 confidentiality boundaries.
- `docs/02-copywriting-guidelines.md` — public copy and case-study structure.
- `docs/03-site-structure-and-domains.md` — routes, navigation and domain rules.
- `docs/04-tech-spec.md` — stack, rendering, hosting, accessibility and security.
- `docs/DESIGN_SYSTEM.md` — approved visual direction and reusable UI decisions.
- `docs/ARCHITECTURE.md` — target project structure and runtime contracts.
- `docs/PROJECT_STATUS.md` — current phase and decisions.
- `docs/HANDOFF.md` — the latest session-to-session continuation note.
- `docs/tasks/ACTIVE.md` and the linked task file — current task scope only.

Do not treat chat history as the source of truth. When a decision changes, update
the appropriate current-state document in the same task or batch finalization.
Do not load `docs/tasks/archive` unless the user explicitly asks for history.

When documents overlap, use this precedence:

1. `00-brand-brief.md` for positioning and visual constraints.
2. `01-content-facts.md` for all public factual claims and NDA boundaries.
3. `02-copywriting-guidelines.md` for copy structure and voice.
4. `03-site-structure-and-domains.md` for routes and canonical behavior.
5. `04-tech-spec.md` for implementation constraints.
6. `05-task-breakdown-for-codex.md` for launch phases and checkpoints.
7. Current-state files for what has actually been implemented.

## Product invariants

- Public copy is English only.
- Position Ivan as `Senior Backend Engineer & Tech Lead`.
- Never invent facts, numbers, dates, employers, technologies, project details,
  testimonials or public URLs.
- Never publish internal Case 4 details beyond the explicitly safe engineering
  framing in `docs/01-content-facts.md`. Treat metadata, JSON-LD, OG images,
  generated HTML and client bundles as public copy too.
- Do not publish the unverified `$15–20K/year` proxy figure.
- Do not add dark mode, blog/CMS, testimonials, live chat, calendar booking or a
  Russian version during this launch.
- Keep case-study content separate from layout and component code.
- Never put secrets, mail credentials, analytics IDs or deployment tokens in Git.
- Preserve unrelated working-tree changes. Never reset, checkout, stash or delete
  user work without explicit permission.
- Do not commit or push unless the user explicitly requests it.

## Development workflow

Work in small tracked tasks grouped into batches.

- `READY` means the task may be started.
- `IN_PROGRESS` means one agent is actively implementing it.
- `IMPLEMENTED_PENDING_GATE` means focused checks passed and the task is waiting
  for the batch gate.
- `COMPLETE` means the batch gate passed and the task was finalized.
- `BLOCKED` requires an exact external blocker in the task note.

During implementation, run only focused checks for the changed behavior. Do not
run full visual, production, Docker or cross-project gates after every small task.
Several related tasks may be completed in one session. At the end of a batch, the
last task in that batch is the dedicated batch-gate task. It must run all available
project tests and checks for the accumulated batch, fix in-scope failures, verify
the batch is closed at 100%, and only then mark the batch tasks complete. The user
may invoke `finalize` / `full audit` / `release gate` to start that gate explicitly.

Do not mark a task `COMPLETE` before its batch gate. `IMPLEMENTED_PENDING_GATE`
is a valid dependency for the next implementation task in the same batch or a
declared dependent batch.

## Verification contract

Use the smallest relevant check while implementing. Once the application exists,
the expected top-level commands are:

- `npm run typecheck`
- `npm run build`
- `npm run verify:frontend`
- `npm run verify:content`
- `npm run verify:meta`
- `npm run verify:production`
- `npm run verify` for the final cross-cutting gate

These commands must be created by the scaffolding tasks before they are invoked.
Never claim a check passed when the command or required environment is missing;
record it as deferred or blocked with evidence.

For public-content changes, manually check banned marketing phrases, unsupported
numbers, career dates/titles, and all Case 4 prohibited wording. Do not scan the
source-of-truth docs as public copy: those docs intentionally contain restricted
source material.

## External inputs that must remain explicit

The real GitHub URL, Engineering Philosophy source, final photo, production mail
credentials, GA4 Measurement ID, Search Console verification data and production
DNS/VPS access are user-owned inputs. Keep placeholders configurable and list any
missing input in `docs/HANDOFF.md`; never guess.

## Skills

- Use `$project-workflow` for tracked task start/finish, planning and batch
  finalization.
- Use `$quality-gates` for explicit frontend/content/production audits; it must not
  change behavior while auditing.
- Use `$commit-changes` only after an explicit commit request.
