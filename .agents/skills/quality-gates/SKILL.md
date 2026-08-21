---
name: quality-gates
description: Audit the Ivan Hubko personal site frontend, public content, metadata, accessibility and production readiness without changing behavior.
---

# Quality Gates

Use this skill only for an explicit audit or batch finalization. It is read-only:
report issues and evidence; do not implement fixes unless the user also asks for changes.

| Mode | Reference |
| --- | --- |
| frontend [route-or-path] | references/frontend.md |
| content | references/content.md |
| production | references/production.md |

Run the deterministic scanner first:

powershell -ExecutionPolicy Bypass -File .agents/skills/quality-gates/scripts/scan-project.ps1 -Mode <mode> -Target <optional-target>

Then inspect each reported match semantically. Report:

- PASS: checked and compliant.
- ISSUE: file, line, impact and exact correction.
- WARNING: risk requiring judgment.
- DEFERRED: command or environment is not available yet.

Do not scan source-of-truth docs as public content; they contain restricted case-study source material.
