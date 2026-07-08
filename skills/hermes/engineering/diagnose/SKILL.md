---
name: diagnose
description: "Disciplined diagnosis loop for hard bugs and performance"
version: 1.0.0
author: Matt Pocock (adapted for Hermes)
license: MIT
platforms: [macos, linux, windows]
metadata:
  hermes:
    tags: [debugging, diagnosis, feedback-loop]
    category: engineering
---
# Diagnose

A discipline for hard bugs. **Skip phases only when explicitly justified.**

When exploring the codebase, use the project's domain glossary to get a
clear mental model of the relevant modules, and check ADRs in the area
you're touching.

## Phase 1 — Build a Feedback Loop

**This is the skill.** Everything else is mechanical. If you have a fast,
deterministic, agent-runnable pass/fail signal for the bug, you will find
the cause. If you don't, no amount of staring at code will help.

Spend disproportionate effort here. **Be aggressive. Be creative. Refuse to
give up.**

### Ways to construct one — try in roughly this order

1. **Failing test** at whatever seam reaches the bug — unit, integration,
e2e.
2. **Curl / HTTP script** against a running dev server.
3. **CLI invocation** with a fixture input, diffing stdout against a
known-good snapshot.
4. **Browser snapshot** via Playwright / Puppeteer — drives the UI, asserts
on DOM/console/network.
5. **Replay a captured trace.** Save a real request/payload/event log;
replay it through the code path in isolation.
6. **Throwaway harness.** Minimal subset of the system that exercises the
bug code path with a single call.
7. **Property / fuzz loop.** If the bug is "sometimes wrong output," run
1000 random inputs and look for the failure mode.
8. **Bisection harness.** Automate "boot at state X, check, repeat" so you
can `git bisect run` it.
9. **Differential loop.** Run same input through old vs new version, diff
outputs.

### Iterate on the loop itself

Once you have a loop, ask:

- Can I make it **faster**? (Skip unrelated init, narrow scope.)
- Can I make the **signal sharper**? (Assert on specific symptom, not
"didn't crash.")
- Can I make it more **deterministic**? (Pin time, seed RNG, isolate
filesystem.)

A 30-second flaky loop is barely better than no loop. A 2-second
deterministic loop is a debugging superpower.

### Non-deterministic bugs

The goal is not a clean repro but a **higher reproduction rate**. Loop 100×,
parallelise, add stress, narrow timing windows. A 50%-flake bug is
debuggable; 1% is not — keep raising the rate.

### When you genuinely cannot build a loop

Stop and say so explicitly. List what you tried. Ask the user for: (a)
access to the reproducing environment, (b) a captured artifact (HAR file,
log dump, core dump), or (c) permission to add temporary production
instrumentation. **Do not** proceed to hypothesise without a loop.

## Phase 2 — Reproduce

... (61 more lines)