# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [v1.2.0] - 2026-07-10

### Added
- **David Ondrej collection** — educational catalog of 28 personal agent skills (`/davidondrej`), with compatibility / bundle / risk metadata and a curated Hermes first-wave subset
- **Hermes first-wave bundle** under `skills/davidondrej/` (9 skills): agent-self-scheduling, goal-loop, anti-sleep, setup-help, research-prompt, effective-agent-skills, folder-specific-claude-and-agents-md, brain-to-docs, level-up — plus `skills.sh.json`, `ATTRIBUTION.md`, and pinned `UPSTREAM.md` (SHA `2f70c586…`)
- **Collection shell parity** — shared reusable sidebar, hero (linked source repo + version/SHA pin + stats), overview, workflows, concepts, and installation for both Matt and David
- **React Flow guide diagrams** (`@xyflow/react`) — document-like interactive main path (fixed zoom, no mini-map chrome); shared `src/features/flow/*`
- **Modal skill catalog** — bordered ScrollArea cards + Dialog detail (risk/compat/bundle only inside modal); full-page skill routes remain secondary deep links
- **skills.sh install UX** — non-Hermes install via `npx skills@latest add <owner/repo>` (+ per-skill `--skill`); shared `CodeBlock`, `CopyButton`, `SkillInstallBlock`
- shadcn/ui **Dialog** primitive
- Matt source pin constants (`MATTPOCOCK_SOURCE_*`) next to catalog data
- README rewrite for multi-collection product + OSS sections

### Changed
- Matt overview / main-flow / skills section aligned to the multi-collection shell (hero pin, React Flow path, modal catalog)
- Installation section: Hermes tap/install kept; Planned stubs for other agents replaced by a single skills.sh path
- Header locale control shows plain `ID` / `EN` text (muted header colors) instead of a globe icon
- Catalog card chrome: neutral borders only (no colored left accents)
- Matt guide copy polish: `itsWorkingIf` rewritten as observable signals; internal history noise trimmed from a few long descriptions
- `.gitignore` hardened for public OSS: env/secrets, Wrangler local state, caches, agent editor dirs, and dual Bun lockfiles (`bun.lock` / `bun.lockb`); npm `package-lock.json` stays canonical

### Dependencies
- Added `@xyflow/react` for interactive guide flows

## [v1.1.0] - 2026-07-09

### Added
- **Skill: wayfinder** — plan large work (>1 agent session) as a shared map of investigation tickets on the issue tracker
- **Skill: implement** — main flow endpoint: build a ticket/spec with TDD + code-review
- **Skill: resolving-merge-conflicts** — resolve git merge/rebase conflicts by understanding original intent of each side
- **Skill: setup-matt-pocock-skills** — one-time repo setup (issue tracker, triage labels, domain docs) + 5 support files
- Upstream support files for bundle (LOGIC.md, UI.md, scripts/, CONTEXT-FORMAT.md, ADR-FORMAT.md, etc.) — fixes pre-existing broken links

### Changed
- **Rename: to-prd → to-spec** — "spec" as the single through-line term (not PRD), aligned with upstream v1.1
- **Rename: to-issues → to-tickets** — merged from /to-plan + /to-issues; "tickets" is more tracker-agnostic
- **Main flow** updated: `grill-with-docs → to-spec → to-tickets → implement → code-review`
- **tdd**: Refactor removed from the Red→Green loop, moved to code-review phase (AFK-friendly)
- **to-tickets**: blocking edges, frontier concept, expand–contract pattern for wide refactors
- **code-review**: description aligned (2-axis parallel review + Fowler smell baseline)
- All 22 SKILL.md bodies regenerated identical to upstream v1.1 (Hermes frontmatter preserved)
- Skill count updated: 19 → 22 across UI, i18n (id + en), README, package.json
- Workflow count: 5 → 7
- Sidebar, overview, main-flow diagram, and workflows component aligned

### Removed
- **Skill: design-an-interface** (deprecated upstream)
- **Skill: qa** (deprecated upstream)
- **Skill: request-refactor-plan** (deprecated upstream)
- **Skill: ubiquitous-language** (deprecated upstream, replaced by /grill-with-docs + /domain-modeling)
- **Skill: zoom-out** (orphan, not present in upstream)
- **Skill: diagnose** (duplicate of diagnosing-bugs)

## [v1.0.0] - 2026-07-06

### Added
- Interactive guide for 19 AI coding skills by Matt Pocock
- Main build chain: grill-with-docs → to-prd → to-issues → implement → code-review
- Interactive flow diagram (idea → ship) with on-ramps (triage, improve-codebase-architecture)
- Catalog of 19 skills with individual detail pages (shareable URL `/skills/:name`)
- 7 workflow patterns with explanations
- Key concepts: Smart Zone, Deep vs Shallow Modules, Vertical Slices, AFK vs HITL, Seams, Leading Words, Context Hygiene
- Internationalization (i18n) — Indonesian + English via Paraglide JS
- Dark mode + toggle
- Responsive design with sidebar scroll-spy
- SKILL.md bundle (adapted for Hermes Agent) for each skill
- Deployed to Cloudflare Workers (static SPA)
- Security headers, SPA fallback routing, immutable asset caching

[Unreleased]: https://github.com/StevanusPangau/ai-skills-guide/compare/v1.2.0...HEAD
[v1.2.0]: https://github.com/StevanusPangau/ai-skills-guide/compare/v1.1.0...v1.2.0
[v1.1.0]: https://github.com/StevanusPangau/ai-skills-guide/compare/v1.0.0...v1.1.0
[v1.0.0]: https://github.com/StevanusPangau/ai-skills-guide/releases/tag/v1.0.0
