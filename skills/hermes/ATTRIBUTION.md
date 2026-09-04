# Attribution

The skills in this directory are adapted from [mattpocock/skills](https://github.com/mattpocock/skills) by Matt Pocock.

## Upstream Release & Commit

- Pinned upstream release: `v1.2.3`
- Commit SHA: `6acc160e4e0cd062dbbbd7a1b26ae92855edf07e`

## License

Original work: MIT License, Copyright (c) 2026 Matt Pocock

Adaptations: MIT License, Copyright (c) 2026 Stevanus Pangau

## Changes from Original

- Added Hermes Agent YAML frontmatter (`metadata.hermes`, tags, category, version, platforms)
- Replaced Claude Code specific references (sub-agent API, hooks) with Hermes equivalents (`delegate_task`, `terminal`, `hermes cron`, etc.)
- Removed `disable-model-invocation` field where appropriate (not processed by Hermes)
- Synchronized suite to upstream v1.2.3: 25 total skills (including new `wizard`, `to-questionnaire`, `wait-what`, and evolution of `writing-great-skills` into `writing-for-agents`).
- Minor wording adjustments for cross-platform agent compatibility.

## Original Repository

- Source: https://github.com/mattpocock/skills
- License: MIT
- Author: Matt Pocock (@mattpocock)
