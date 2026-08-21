# Branch Mode

Use only when the user explicitly asks to isolate the requested changes in a
separate branch. A normal commit request stays on the current branch.

1. Inspect only Git state: current branch, `main`, merge base, status, and recent
   subjects. Derive a short unique `<type>/<kebab-topic>` name from the change.
2. Require `main` to be an ancestor of the current `HEAD`; otherwise stop before
   creating history and report the topology conflict.
3. Create the topic branch before the first commit. Put every requested commit
   on it and keep unrelated working-tree changes uncommitted.
4. Run the applicable verification before integration. Do not merge on failure.
5. Ensure the requested scope is fully committed. Then merge the topic branch
   into local `main` with `--no-ff` and subject
   `merge: <branch> <short purpose>`.
6. If unrelated changes prevent a safe checkout, use a temporary Git worktree
   for `main`; do not stash or move the user's changes. Remove only that temporary
   worktree after a successful merge.
7. Keep the topic branch after merging so its commits remain directly
   inspectable. Do not push or delete it unless separately requested.

Before reporting success, show the topic commits and confirm that `main`
contains the merge commit. On conflicts, abort the merge and preserve both the
topic branch and all working changes.
