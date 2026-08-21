---
name: commit-changes
description: Create small independently reviewable commits for the Ivan Hubko personal site from Git data only. Use only when the user explicitly asks to commit or save changes.
---

# Commit Changes

Use Git as the only source of change context. Do not open project docs or task
history while grouping commits.

1. Inspect git status --short, then narrow name-status, stat and numstat diffs.
2. Separate this requested setup or task from unrelated parent-repository changes.
3. Plan a commit map before staging. Group by one reviewable intent such as agent
   tooling, task documentation, visual system or application behavior.
4. More than 20 files, 500 changed text lines or more than one top-level area is
   presumed to need splitting. Explain any necessary exception.
5. Stage explicit paths or hunks only. Never use git add . or git add -A.
6. Run git diff --cached --check, stat and a narrow cached diff for each group.
7. Use a subject like docs(agent): align workflow with personal site, with a
   lowercase imperative description no longer than 72 characters.
8. Do not amend, rebase, push, create branches or include AI attribution unless
   explicitly requested.
9. Finish with git status --short and recent commits.

Preserve all unrelated working-tree changes and report them. A commit request does
not authorize deployment or external publishing.
