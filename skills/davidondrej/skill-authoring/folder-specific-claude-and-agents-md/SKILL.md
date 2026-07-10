---
name: folder-specific-claude-and-agents-md
description: Use when the user asks to create an AGENTS.md (or CLAUDE.md) for a specific folder, write folder instructions, or add agent-scoped context to a directory. Generates a focused, folder-scoped context file that future agents read for that directory.
version: 1.0.0
author: Stevanus Pangau
license: MIT
metadata:
  hermes:
    tags: [agents-md, context, documentation, skill-authoring]
    related_skills: []
---

# Folder-Scoped AGENTS.md Creation

Adapted from David Ondrej's `folder-specific-claude-and-agents-md` (MIT). Generate a
focused context file inside a target folder that gives any future agent the
folder-specific context a global/root context file doesn't cover.

Default to **`AGENTS.md`** (the cross-agent standard). If the project already uses
`CLAUDE.md` as its primary, create that and symlink `AGENTS.md → CLAUDE.md` (or vice
versa) so both resolve. Match whatever convention the repo already uses.

## When to Use

- User asks for a folder-scoped agent context file.
- Don't create one for a folder of static reference files — agents can read those on
  demand. Only create one when the folder has context needed across multiple sessions
  (active evolving work, specific conventions, ongoing decisions). If unsure, ask.

## Process

### 1. Confirm the target folder + that it deserves a file
Ask which folder (absolute path). Confirm it has cross-session context worth pinning.

### 2. Read every file in the folder IN FULL
Enumerate first (`ls -la`), then read every markdown, config, and key source file.
Do not skim — the user's later edits depend on you having full context.

### 3. Draft a bullet list of candidate content
Before writing, show the user a bullet list grouped by section so they react first.
Candidate sections (skip any that don't apply):

- **Purpose** — what this folder/project is, current state, key metrics
- **Essential Files** — one-line role for each important file; cross-folder refs via `@path/file.md`
- **Constraints (MUST NOT)** — explicit hard negatives; highest-ROI content
- **Conventions** — lingo, status markers, naming patterns, "usually do" patterns
- **Locked Decisions** — agreed + dated, must not re-litigate
- **Context** — history/authority that frames the work
- **How to work here** — collaboration style for this folder

### 4. Iterate with the user
Keep answers short. When the user edits the file, re-read it and flag contradictions,
typos, missing rules, or wrong categorization. Don't revert their edits unless asked.

### 5. Write the file
- Path: `<folder>/AGENTS.md` (or the repo's primary convention).
- One-line header explaining the file's purpose.
- If a subdirectory file and the parent already has one: open with `Apply the root context file first, then this file.`
- `##` section headers matching the approved sections. Short bullets over prose.
- Cross-folder references use `@relative/path/file.md` import syntax, not prose.
- Annotate heavy reference docs with `**Read when:**` triggers.

### 6. Create the symlink (only if the repo needs both names)
```bash
cd <folder> && ln -s AGENTS.md CLAUDE.md    # or reverse, matching repo convention
ls -la AGENTS.md CLAUDE.md
```

### 7. Commit only when asked
Do not stage or push unless the user says to.

## Rules

- **Never invent content.** Every bullet traces to something you read or the user said. No boilerplate.
- **Brevity wins.** Start tight; the user edits to make it shorter.
- **Folder-scoped only.** Don't duplicate the root context file (personality, global ports, dates).
- **No file trees or stack details the code already shows** — anything derivable from `ls`/`grep` rots and wastes tokens. Pin decisions, rules, and context, not structure.
- **Constraints vs Conventions.** Hard "MUST NOT" → Constraints. "Usually do X" → Conventions.
- **No absolute ALWAYS/NEVER without explicit exceptions.** "Never commit secrets EXCEPT `.env.example`" beats "never commit secrets."
- **Never auto-shorten the file.** Grow deliberately, prune manually.
- **Maintenance loop.** When the user corrects the agent on something this file should have prevented, add the rule immediately.
- **Symlink, not copy**, when both names are needed — edits must stay in sync.

## Verification Checklist

- [ ] File created only if the folder has genuine cross-session context.
- [ ] Every bullet traces to a real source (read file or user statement) — nothing invented.
- [ ] Constraints and Conventions are split; no unqualified absolute rules.
- [ ] No file trees / derivable structure dumped into the file.
- [ ] Symlink verified with `ls -la` if both `AGENTS.md` and `CLAUDE.md` are needed.
- [ ] Not committed unless the user asked.
