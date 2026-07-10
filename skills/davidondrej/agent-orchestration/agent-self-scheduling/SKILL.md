---
name: agent-self-scheduling
description: Use when the user wants an agent to run on a schedule, loop, or interval — "run every N minutes", "schedule a task", "run on a loop", "heartbeat", recurring autonomous checks. Covers Hermes' built-in scheduler and the external-clock fallback for one-shot agents.
version: 1.0.0
author: Stevanus Pangau
license: MIT
metadata:
  hermes:
    tags: [scheduling, cron, automation, agent-orchestration, heartbeat]
    related_skills: [goal-loop]
---

# Agent Self-Scheduling

Adapted from David Ondrej's `agent-self-scheduling` (MIT). First question: does the
runtime have a built-in scheduler (Hermes → use it) or do you own the clock
(one-shot CLIs → wrap in an external clock)?

Universal floor: cron is 1-minute minimum (5-field expression, no seconds). For
sub-minute cadence use a `while …; sleep N; done` loop or an event hook. Never put
an LLM on a tight timer.

## When to Use

- User asks to run something every N minutes/hours, on a cron schedule, once after a delay, or on a loop.
- User wants a heartbeat / recurring autonomous check.
- Don't use for: a single task that runs once now (just run it), or persistent
  goal-directed iteration within one session (see `goal-loop`).

## Hermes built-in scheduler (preferred here)

Hermes' gateway ticks every 60s and runs due jobs in fresh, isolated sessions.
Each run is a fresh session, so the prompt must carry all context. Verify current
syntax against Hermes docs before relying on flags.

```bash
hermes gateway install                                   # user-level; --system survives reboot
hermes cron create "every 1h" "summarize new emails and report"
hermes cron create "0 9 * * *" "post daily standup"      # cron expression
hermes cron create "30m" "one-shot reminder in 30 min"   # one-shot delay
hermes cron list                                          # confirm job + next_run
```

Hermes-specific capabilities worth using:

- **Zero-token mode** — run a script and deliver its stdout verbatim; ideal for
  watchdogs that stay silent when nothing is due.
- **Chaining** — pipe one job's output into the next as context.
- **Loop safety** — scheduled sessions cannot create more cron jobs. Never schedule
  a job from inside a scheduled job.

Prefer the `cronjob` tool or `hermes cron` CLI over hand-rolled clocks when running
inside Hermes.

## External-clock fallback (one-shot CLI agents)

When the agent runs once and exits (no built-in scheduler), wrap it in a clock:

```bash
# cron (>= 1 min floor)
*/10 * * * * cd /path/to/project && <agent-cmd> "check X and report" >> ~/agent.log 2>&1
# launchd/systemd timer — survives reboot, better logging
# sub-minute or no cron available:
while true; do <agent-cmd> "check X"; sleep 30; done
```

Gotchas that break unattended runs:

- **Permission prompts hang forever.** Pass the runtime's non-interactive / allowed-tools flags, or the run blocks.
- **Use structured output** (JSON) so the wrapper parses results deterministically.
- **One-shot runs are amnesiac.** Persist state to a file the next run reads, or use the runtime's resume flag.

## Heartbeat pattern

One fast recurring tick gates many slower per-task checks: the tick reads a task
list + per-task `last_run` timestamps and only acts on tasks that are due. In
Hermes, use a recurring job in zero-token mode when nothing is due. Define
active-hours and stay silent when nothing is due — no empty noise.

## Verification Checklist

- [ ] Hermes: `hermes cron list` shows the job with a sane `next_run`; a run-now confirms delivery.
- [ ] External clock: the log file grows after one interval, or a manual run exits 0 with clean output.
- [ ] Non-interactive/permission flags are present (the #1 silent failure is a hung permission prompt).
- [ ] Heartbeat: a nothing-due tick stays silent.
- [ ] No cron job is scheduled from inside a scheduled Hermes session.
