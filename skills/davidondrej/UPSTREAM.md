# Upstream Sync

- Owner/repo: `davidondrej/skills`
- Pinned commit (baseline for this bundle): `2f70c586205a20523a4caecbc701128a30554628`
- Sync date: 2026-07-10
- Upstream branch tracked: `main` (rolling sanitized mirror; no tags/releases)

## Sync discipline

1. Sync only to a specific pinned commit SHA, never to a moving `main`.
2. Diff the full skill tree (additions, removals, renames, support files), not just `SKILL.md` names — upstream inventory has shifted between 27–31 skills across a few days.
3. Re-check personal-assumption sanitation and nested license/provenance on every sync.
4. Human review before adopting upstream changes. Do not auto-fetch-and-overwrite adapted skills.

## Bundled subset (first wave, 9 of 28)

| Skill | Upstream category |
|---|---|
| agent-self-scheduling | agent-orchestration |
| goal-loop | agent-orchestration |
| anti-sleep | ops-and-setup |
| setup-help | ops-and-setup |
| research-prompt | research-and-web |
| effective-agent-skills | skill-authoring |
| folder-specific-claude-and-agents-md | skill-authoring |
| brain-to-docs | thinking-and-docs |
| level-up | thinking-and-docs |

The remaining 19 upstream skills are documented in the guide catalog
(`src/data/davidondrej-skills.ts`) with compatibility/bundle status but are not
adapted into this bundle.
