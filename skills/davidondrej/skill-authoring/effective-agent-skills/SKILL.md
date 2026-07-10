---
name: effective-agent-skills
description: Use when a skill (Agent Skill / SKILL.md) is being created, edited, reviewed, or debugged — "create a skill", "new skill", "improve a skill", "why isn't my skill triggering". A complete guide to skill anatomy, progressive disclosure, design patterns, anti-patterns, testing, and security.
version: 1.0.0
author: Stevanus Pangau
license: MIT
metadata:
  hermes:
    tags: [skills, authoring, progressive-disclosure, design-patterns, skill-md]
    related_skills: []
---

# Agent Skills: A Complete Guide

Adapted from David Ondrej's `effective-agent-skills` (MIT). A consolidated reference
on what agent skills are, how they work, and how to write effective ones. For
Hermes-specific in-repo authoring mechanics (validator, categories, commit flow),
also see the built-in `hermes-agent-skill-authoring` skill — this skill is the
vendor-neutral design theory.

## When to Use

- Creating, editing, reviewing, or debugging any `SKILL.md`.
- A skill isn't triggering and you need to diagnose why.
- Don't use as a substitute for the runtime's own authoring docs when the question
  is about that runtime's validator or directory layout.

## 1. What agent skills are

A folder with a `SKILL.md` (YAML frontmatter + markdown), plus optional `scripts/`,
`references/`, and `assets/` loaded on demand. Skills are an open standard
(agentskills.io) adopted across many agent products; one skill works across
compatible agents.

## 2. Progressive disclosure — the architectural core

Three-stage loading:

- **Level 1 — Discovery (~100 tokens, always in context):** only `name` + `description` are injected at startup. The agent knows the skill exists and when it applies.
- **Level 2 — Activation (<5,000 tokens, on match):** the full `SKILL.md` body loads when the request matches the description.
- **Level 3 — Execution (unbounded, on demand):** referenced files/scripts load only when needed.

Bundled content has no practical limit because files don't consume tokens until
accessed.

## 3. SKILL.md anatomy

```markdown
---
name: skill-name
description: What this skill does AND when to use it. Include trigger phrases.
---

# Skill Name
## Quick start        [minimal working example]
## Workflow           [step-by-step procedure with checklists]
## Output format      [what to expect back]
## Advanced           [link to references/ for rare detail]
```

Frontmatter constraints:

- `name` is lowercase, hyphens only, 1–64 chars, and **matches the parent folder name**.
- Avoid `<` and `>` in frontmatter (they can inject into the system prompt).
- Invalid YAML silently prevents loading.
- **Never put `: ` (colon+space) inside an unquoted `description`.** Strict YAML parsers reject it. Single-quote the whole value and double inner apostrophes if you need a mid-sentence colon.

Note on manual-only invocation: some clients honor a `disable-model-invocation` field
to make a skill manual-only. **Hermes does not process this field** (nor
`user-invocable`) — its skill loader reads `name`, `description`, `platforms`,
requirements, and `metadata.hermes`. In Hermes, control invocation via a focused,
non-trigger-heavy description or the enable/disable config, not that field. Don't
rely on it for portability.

## 4. Two design philosophies

- **Pattern A — Capability primitives (tool wrappers):** thin wrapper over a
  deterministic CLI/script. Logic in code; SKILL.md teaches invocation. 30–80 lines,
  mostly command examples. Use when the bottleneck is "the agent can't do X".
- **Pattern B — Process primitives (cognitive disciplines):** encode a methodology
  (TDD, code review, debugging loops). Pure prompt engineering. Use when the
  bottleneck is "the agent's process/output quality is bad".

A mature setup uses both.

## 5. How to write effective skills — do this

- **Description as routing contract.** It's the only thing seen before loading. Include what + when + a differentiator vs related skills. Never summarize the full workflow in the description — the agent will follow the summary and skip loading the body. Describe *what* and *when*, never *how*.
- **Keep SKILL.md lean.** Past a certain length you're encoding logic that belongs in a script or reference file.
- **Bash-first, prose-second.** Concrete command examples with inline comments beat prose.
- **Push determinism into code.** Anything fragile/repetitive → script. Markdown only for judgment.
- **Match strictness to fragility.** Loose heuristics when many approaches are valid; templates when there's a preferred pattern; exact scripts/strict steps when the workflow is fragile.
- **Build validation loops.** State an explicit verify → fix → re-verify loop. This is the single biggest output-quality win.
- **State-check before action.** "First check if X is configured: [command]. If not: [setup]."
- **Just-in-time loading with explicit pointers.** Tell the agent exactly when to read each referenced file.
- **Keep references one level deep.** Never chain SKILL.md → a.md → b.md → c.md.
- **Compose primitives, don't bundle workflows.** One skill = one capability or one discipline.
- **Cite established principles** (TDD, DDD, red-green-refactor) when your skill encodes them.

## 6. Anti-patterns — don't

- Don't re-teach what the model already knows (no language tutorials, no "what is git").
- Don't include human-facing docs (README/CHANGELOG/INSTALL) inside the skill folder.
- Don't write vague descriptions ("a helpful skill for documents").
- Don't bundle library code — install via package manager instead.
- Don't write monolithic mega-skills (design+plan+implement+test+deploy = a framework, not a skill).
- Don't assume the agent will infer — be explicit about steps that matter.
- Don't write style-only variants — tone/format tweaks belong in preferences/system prompt.
- Don't ignore failure modes — document what failure looks like and what to do.
- Don't include time-sensitive info ("as of Q4 2024…") — fetch live or omit.
- Don't use absolute paths — always relative, forward slashes.
- Don't trust unfamiliar skills — audit `scripts/` for network calls, hidden instructions, typosquatted names; pin to a version/commit.

## 7. Authoring workflow

1. Identify the gap (where the agent consistently fails or needs re-prompting).
2. Decide the pattern (capability vs process primitive).
3. Draft the description first (what + when + differentiator).
4. Write the smallest body that works; add only when testing reveals gaps.
5. Move detail to `references/` once SKILL.md grows too long.
6. Test triggering (does it fire without being named?) → fix the description if not.
7. Test execution (invoke explicitly) → fix the body if output is wrong.
8. Adversarial test: have another session ask "what edge cases break this?".
9. Version control — treat skills as code.

## 8. Testing and debugging

- **Routing fails → description problem.** Add specific trigger phrases.
- **Execution fails → body problem.** Add explicit steps, examples, validation.
- Skills snapshot at session start; edits need a restart to take effect.
- Test against the weakest model you'll deploy on — strong models forgive vague skills.

## Verification Checklist

- [ ] Frontmatter `name` matches folder; description has what + when + differentiator + trigger phrases.
- [ ] No human-facing docs, no time-sensitive info, relative paths only.
- [ ] A validation loop is documented; output format documented if structured.
- [ ] Skill does one thing and composes cleanly with related skills.
- [ ] Tested for both correct triggering and correct execution.
