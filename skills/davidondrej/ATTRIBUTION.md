# Attribution

The skills in this directory are adapted from [davidondrej/skills](https://github.com/davidondrej/skills) by David Ondrej.

## License

Original work: MIT License, Copyright (c) 2026 David Ondrej

Adaptations: MIT License, Copyright (c) 2026 Stevanus Pangau

## Scope

This is a **curated first wave** of 9 skills, not the full 28-skill upstream
collection. Selection favors skills with high methodological value and low
dependency/portability risk. Vendor-specific, agent-specific, draft, duplicate,
and guardrail-evasion skills from upstream are intentionally excluded from this
bundle (they remain documented in the guide's catalog).

## Changes from Original

- Added Hermes Agent YAML frontmatter (`version`, `author`, `license`, `platforms`, `metadata.hermes`).
- Removed `disable-model-invocation` / `user-invocable` fields (not processed by Hermes).
- Removed personal path assumptions (e.g. `notes/learning/david-knowledge.md` → configurable path; `~/Documents/...`), personal persona wording, and the "user does not write code" assumption.
- Replaced external-agent / tool-specific references (Claude Code, Codex, Pi, cmux) with Hermes equivalents (`hermes cron`, `/goal` completion contracts, `terminal`/`process`, `delegate_task`) or generic wording.
- Removed references to upstream support files not present in the source snapshot (e.g. `library/claude-code/*`).
- Adapted `folder-specific` skill to be `AGENTS.md`-first (cross-agent standard) rather than `CLAUDE.md`-first.
- Added a confirmation gate before creating ADRs in `brain-to-docs`.

## Nested Provenance

Some skills document third-party tools. Where relevant, consult the tool's own
license before copying its material:

- browser-harness — MIT (browser-use/browser-harness)
- cmux — GPL-3.0-or-later / commercial (manaflow-ai/cmux)
- DeepSWE / Pier — Apache-2.0 (datacurve-ai)

These tools are referenced, not vendored, in this bundle.

## Original Repository

- Source: https://github.com/davidondrej/skills
- Pinned commit: `2f70c586205a20523a4caecbc701128a30554628`
- License: MIT
- Author: David Ondrej (@davidondrej)
