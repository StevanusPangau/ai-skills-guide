---
name: brain-to-docs
description: Use when the user wants to extract project vision, decisions, and preferences from their head into clear documentation (README + ADRs) through a back-and-forth Q&A loop. Triggers on "brain-to-docs", "build out the docs", "extract the vision", "let's document this project".
version: 1.0.0
author: Stevanus Pangau
license: MIT
metadata:
  hermes:
    tags: [documentation, adr, readme, interview, thinking-and-docs]
    related_skills: []
---

# brain-to-docs

Adapted from David Ondrej's `brain-to-docs` (MIT). Extract the user's taste,
judgment, vision, preferences, and decisions into clear, concise markdown docs.
README holds the vision; `docs/adr/` holds the decisions.

## When to Use

- User wants to turn what's in their head into project docs through Q&A.
- Don't use for one-off doc edits — this is an iterative extraction loop.

## The loop

1. **Check docs first, every time.** Read `docs/adr/` and `README.md` before doing
   anything — other agents and people add/edit them constantly.
2. **Ask 5 different questions** in plain text (never a questions UI) — default 5
   unless the user asks for a different number. Make them high-variety: a wide
   spectrum of angles, not all the same type. If the user asks for a specific focus
   area, follow it. The user answers whichever they find most useful.
3. **Update docs after every answer.** README updates apply directly. For a decision
   that warrants an ADR, **propose it first and get the user's explicit approval
   before creating the ADR file** — ADRs are durable and shouldn't be created
   silently. Once approved, write it.
4. Repeat until the user says "we're done" (or similar).

## Rules

- All answers and responses must be VERY CONCISE — short sentences, plain language.
- ADRs: short, numbered `NNNN-slug.md`, with Status + Context + Decision + Consequences.
- README: vision only. Decisions go in ADRs.
- Don't challenge the user's thinking unless they ask, or they're making a severe mistake.
- An ADR captures a decision only when it is hard to reverse, surprising without
  context, and involves a real trade-off. Minor choices update the README or nothing.

## Verification Checklist

- [ ] `docs/adr/` and `README.md` were read before the first question.
- [ ] Questions were plain text, high-variety, and asked one batch at a time.
- [ ] No ADR file was created without explicit user approval.
- [ ] README carries vision; decisions live in numbered ADRs.
