---
name: qa
description: "Interactive QA session where user reports bugs or issues"
version: 1.0.0
author: Matt Pocock (adapted for Hermes)
license: MIT
platforms: [macos, linux, windows]
metadata:
  hermes:
    tags: [qa, bugs, issues, testing]
    category: engineering
---
# QA Session

Run an interactive QA session. The user describes problems they're
encountering. You clarify, explore the codebase for context, and file GitHub
issues that are durable, user-focused, and use the project's domain
language.

## For each issue the user raises

### 1. Listen and lightly clarify

Let the user describe the problem in their own words. Ask **at most 2-3
short clarifying questions** focused on:

- What they expected vs what actually happened
- Steps to reproduce (if not obvious)
- Whether it's consistent or intermittent

Do NOT over-interview. If the description is clear enough to file, move on.

### 2. Explore the codebase in the background

While talking to the user, kick off a `delegate_task` subagent in the
background to understand the relevant area. The goal is NOT to find a fix —
it's to:

- Learn the domain language used in that area (check UBIQUITOUS_LANGUAGE.md)
- Understand what the feature is supposed to do
- Identify the user-facing behavior boundary

This context helps you write a better issue — but the issue itself should
NOT reference specific files, line numbers, or internal implementation
details.

### 3. Assess scope: single issue or breakdown?

Before filing, decide whether this is a **single issue** or needs to be
**broken down** into multiple issues.

Break down when:

- The fix spans multiple independent areas (e.g. "the form validation is
wrong AND the success message is missing AND the redirect is broken")
- There are clearly separable concerns that different people could work on
in parallel
- The user describes something that has multiple distinct failure modes or
symptoms

Keep as a single issue when:

- It's one behavior that's wrong in one place
- The symptoms are all caused by the same root behavior

### 4. File the GitHub issue(s)

Create issues with `gh issue create`. Do NOT ask the user to review first —
just file and share URLs.


... (81 more lines)