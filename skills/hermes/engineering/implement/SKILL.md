---
name: implement
description: "Implement a piece of work based on a spec or set of tickets."
version: 1.1.0
author: Matt Pocock (adapted for Hermes)
license: MIT
platforms: [macos, linux, windows]
metadata:
  hermes:
    tags: [implementation, coding, tdd]
    category: engineering
---

Implement the work described by the user in the spec or tickets.

Use /tdd where possible, at pre-agreed seams.

Run typechecking regularly, single test files regularly, and the full test suite once at the end.

Once done, use /code-review to review the work.

Commit your work to the current branch.
