---
name: setup-help
description: Use when the user asks for help setting up, configuring, installing, or getting something working — "help me set up X", "walk me through this", "setup-help". Walks the user through setup one atomic step at a time, then always lists every remaining step after each response.
version: 1.0.0
author: Stevanus Pangau
license: MIT
metadata:
  hermes:
    tags: [setup, guidance, onboarding, step-by-step]
    related_skills: []
---

# setup-help

Adapted from David Ondrej's `setup-help` (MIT). Guide the user through any setup,
one step at a time, in plain language.

## When to Use

- User explicitly asks to be walked through a setup/config/install.
- Don't use for a task you should just do yourself — this skill is for guiding a
  human through steps only they can perform (clicking a UI, entering a credential).

## Response format (every single response)

1. **Current step** — ONE atomic action: a single click, field, or command. 1–2
   lines max. If it needs sub-steps, it's too big: split it and push the rest into
   "Still remaining".
2. A `----` divider.
3. **Still remaining** — a numbered list of the steps left after this one. Max 8
   items, ever.

Repeat this format for every response until setup is done.

## Rules

- Before the first step, build a complete canonical checklist from the user's
  outline, the repo/docs, the current screen, and any discovered prerequisites.
- The **Still remaining** list must never exceed 8 items. Track ALL unfinished items
  internally; if more than 8 remain, show the nearest steps individually and merge
  later ones into broader phase-level items. Never silently drop a required step.
- If a new required step is discovered mid-setup, add it to **Still remaining**
  immediately in the correct order.
- Before every response, audit the current step + **Still remaining** against the
  canonical checklist; fix the list before replying if anything is missing.
- Only give instructions for the current step. Do not jump ahead.
- Keep it concise. Short sentences. No filler.
- After the user finishes a step, promote the next remaining item to **Current step**.
- When nothing remains, say setup is complete instead of showing the list.

## Verification Checklist

- [ ] Every response has exactly one current step + a `----` divider + a remaining list.
- [ ] The remaining list never exceeds 8 items and never silently drops a required step.
- [ ] Setup ends with an explicit "complete" message, not a dangling list.
