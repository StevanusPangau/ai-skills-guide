---
name: goal-loop
description: Use when the user mentions `/goal`, "goal loop", "Ralph loop", wants to kick off a long-running autonomous agent run, asks how to write a goal prompt, or wants a one-paragraph goal instruction drafted. Explains the persistent self-checking loop (plan → act → test → review → iterate) and how to write an effective goal contract.
version: 1.0.0
author: Stevanus Pangau
license: MIT
metadata:
  hermes:
    tags: [goal, autonomous, agent-loop, contract, agent-orchestration]
    related_skills: [agent-self-scheduling]
---

# Agent `/goal` Loop

Adapted from David Ondrej's `goal-loop` (MIT).

## What `/goal` is

`/goal` turns a prompt into a **persistent agent** looping `plan → act → test →
review → iterate` until a verifiable stop condition is met, the user pauses, or the
turn budget runs out. When a turn ends but the goal isn't met, the agent
**auto-continues** instead of waiting for input. In Hermes a lightweight judge model
checks after each turn whether the goal is satisfied.

**Not:** a budget command, a safety boundary, "run forever", or a replacement for a
plan. It is a contract enforcer with a verification loop.

## When to Use

Use only when **all three** hold:

1. Task is >30 min of mechanical work.
2. There's a **verifiable stop condition** (tests pass, coverage hit, build green, eval ≥ X).
3. Repo is agent-ready (working build, decent tests, `AGENTS.md` present).

Good fits: migrations, coverage lifts, TDD feature builds, refactors with contract
tests, prompt/eval optimization, bug-repro-then-fix.

Bad fits: exploratory work, vague "improve this", anything without a "done"
definition, production credentials, destructive shared-infra ops.

## The completion contract (every goal needs this)

Hermes formalizes the goal contract with these fields — a bare `/goal <text>` works,
but a contract makes the judge decide `done` only on concrete evidence:

1. **Objective / outcome** — one sentence, one concrete end state.
2. **Constraints** — what must NOT change (public API, files, libs, conventions).
3. **Verification** — the exact command/artifact that proves the outcome (`pytest -q`, build exit 0).
4. **Boundaries** — which files/dirs/tools are in scope.
5. **Stop condition** — verifiable: "stop when X passes" OR "when further changes need human/product input".

In Hermes: `/goal draft <intent>` expands a one-liner into a full contract for
review; or write `field: value` lines inline (`verify:`, `constraints:`,
`boundaries:`, `stop when:`). Use `/goal show` to review, `/subgoal <text>` to add
criteria mid-loop.

## Writing a goal contract (the core deliverable)

When the user wants a quick goal instruction, emit a structured markdown block, one
line per contract item. **Do not prefix with `/goal`** — the user adds the slash
command. Template:

```
**Objective:** <one-sentence outcome>
**Read first:** <files / PLAN.md / issue>
**Constraints:** <what not to change; libs; conventions>
**Verify:** `<exact command>` after each change
**Boundaries:** <dirs/tools in scope>
**Stop when:** <verifiable condition>, OR when further changes require human/product input
```

### Writing rules

- **One objective, one stop condition.** Not a backlog.
- **Forbid reward-hacking explicitly:** "Do not delete, skip, weaken, or narrow tests to make the goal pass." Otherwise the agent games the stop condition.
- **Forbid scope creep:** "Do not refactor unrelated code. Do not add dependencies."
- Use **literal strings** for paths, commands, issue numbers.
- Keep the objective compact (Hermes/Codex cap it around 4,000 chars). If longer, point the goal at a `PLAN.md` file.
- **Never instruct the agent to create new ADRs** — ADRs require the user's explicit approval.

### Meta-prompting trick (highest leverage)

Hand-written goals under-specify. Ask a second session (with the codebase loaded) to
inspect the repo, surface hidden assumptions/edge cases, and emit the contract block.
In Hermes, `/goal draft <intent>` does this inline via the judge model. Still supply
the raw materials (files to read, constraints, the verification command) so the
drafted goal is grounded.

## Controlling a running goal (Hermes)

| Command | Effect |
|---|---|
| `/goal` or `/goal status` | Current goal, status, turns used, latest judge reason |
| `/goal pause` / `/goal resume` | Freeze / unfreeze the loop |
| `/goal clear` | Drop the goal |
| `/goal <new>` | Replace the current goal |
| `/subgoal <text>` | Append a criterion the judge must also satisfy |
| `/goal wait <pid>` | Park the loop on a background process; auto-resume on exit |

A user message always preempts the loop. Setting a new goal requires `/stop` first
mid-run.

## When a goal drifts

- **Minor drift:** type a correction — it folds in and continues.
- **Loose objective:** `/goal pause`, read status, then `/goal <tighter version>`. Don't pile instructions on a vague goal.
- **Bad mess:** `/goal clear`, `git status`/`git stash`, rewrite with the meta-prompting trick, restart.

Don't let a drifting goal keep running "to see where it goes" — tokens burn and
diffs compound.

## Verification Checklist

- [ ] Contract has one objective, one verifiable stop condition, and an exact verify command.
- [ ] Reward-hacking and scope-creep are explicitly forbidden.
- [ ] No instruction to create ADRs without user approval.
- [ ] Paths/commands are literal strings.
- [ ] Diff is reviewed before merging — long autonomy means more code to validate, not less.

## Mental model

`/goal` is a **contract enforcer with a verification loop**, not a "run forever"
button. Stop writing prompts; start writing specifications with stop conditions.
