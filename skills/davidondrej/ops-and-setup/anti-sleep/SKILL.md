---
name: anti-sleep
description: Use when the user says "don't let my mac sleep", "keep the screen on", "anti-sleep", "caffeinate", or wants the machine awake overnight or during a long build. Keeps a Mac awake with the built-in macOS caffeinate command, for a set duration or while a process runs.
version: 1.0.0
author: Stevanus Pangau
license: MIT
platforms: [macos]
metadata:
  hermes:
    tags: [macos, caffeinate, power, ops]
    related_skills: []
---

# Anti-Sleep (macOS caffeinate)

Adapted from David Ondrej's `anti-sleep` (MIT). Keep the Mac awake using the
built-in `caffeinate` command. No install needed.

## When to Use

- User wants the Mac to stay awake for a duration or during a long build/run.
- Don't use on Linux/Windows — this wraps a macOS-only binary (skill is `platforms: [macos]`).

## Quick start — the standard command

```bash
caffeinate -d -i -t 7200    # screen on + no idle sleep, for 2 hours
```

Duration is `-t <seconds>`: 2h = 7200, 7h = 25200, overnight (9h) = 32400.

## Aggressiveness levels

| Flags | Effect |
|---|---|
| `-i` | prevents idle **system** sleep only (screen may still dim/lock) |
| `-d` | prevents **display** sleep (screen stays on) |
| `-d -i` | **default choice** — screen on + system awake |
| `-d -i -s` | `-s` also prevents sleep semantics; only works on AC power |
| `-u -t 1` | simulates user activity — wakes the display right now |

Default to `-d -i -t <seconds>` unless the user says otherwise.

## Tie to a process instead of a timer

```bash
caffeinate -d -i -w <PID>     # stays awake until that process exits (great for builds)
caffeinate -i npm run build   # wraps a command; exits when the command finishes
```

## Run it without blocking

Run `caffeinate` as a background process (Hermes `terminal` with `background=true`),
never in your foreground shell. It prints nothing and holds the prompt, so it looks
"stuck" — it isn't.

## Verify and monitor

```bash
pgrep -fl caffeinate                 # is it running? shows exact flags
ps -o etime= -p <PID>                # how long it's been running
pmset -g assertions | grep -i deny   # confirm sleep assertions are active
```

**Expiry:** with `-t` it exits silently when time runs out — no notification. If the
user asks "is it still on?" after hours, check `pgrep` first; it may have expired.

## Keyboard backlight

`caffeinate` cannot keep the keyboard backlight on (separate inactivity timer, no
CLI on Apple Silicon). Fix is manual, one-time: System Settings > Keyboard > "Turn
keyboard backlight off after inactivity" > Never.

## Stop early

```bash
pkill -f "caffeinate -d -i"    # or kill the background process
```

## Verification Checklist

- [ ] `pgrep -fl caffeinate` shows the process with the expected flags.
- [ ] Reported the PID, the flags, and the wall-clock expiry time to the user.
- [ ] `caffeinate` is running in the background, not blocking the foreground shell.
