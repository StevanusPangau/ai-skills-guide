# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **Official Vercel Agent Skills collection (9 skills)** — `vercel-labs/agent-skills` (MIT): React/Next.js performance rules, composition patterns, React Native, view transitions, deployment, and cost audits, with guide, concepts, install, flow diagram, and bilingual detail pages.
- **Official Anthropic Skills collection (19 skills)** — `anthropics/skills` (Copyright Anthropic PBC, All rights reserved; guide summarizes only, install from upstream): document creation (docx, pdf, pptx, xlsx), design & brand (frontend-design, canvas-design, brand-guidelines, theme-factory, algorithmic-art), agent development (skill-creator, mcp-builder, claude-api, webapp-testing, web-artifacts-builder), and writing & comms (doc-coauthoring, internal-comms, slack-gif-creator, discernment-nudge, academy-guide), with guide, concepts, install, flow diagram, and bilingual detail pages.
- **Official Cloudflare Skills collection (13 skills)** — `cloudflare/skills` (Apache-2.0): Workers platform (workers-best-practices, wrangler, cloudflare, web-perf), stateful compute (durable-objects, agents-sdk, sandbox-next, sandbox-stable, sandbox-migrate-to-next), Zero Trust & security (cloudflare-one, cloudflare-one-migrations, turnstile-spin), and messaging (cloudflare-email-service), with guide, concepts, install, flow diagram, and bilingual detail pages. Note: `nextjs-on-cloudflare` excluded (removed upstream).

## [v1.5.0] - 2026-09-04

### Added
- **Global Command Palette & Quick Search (`Cmd+K` / `Ctrl+K`)** — Instant full-text search indexed across all 100+ skills from 6 creators (Matt Pocock, David Ondrej, Emil Kowalski, Jakub Krehel, Brooklyn, Superpowers), featuring keyboard navigation (Up/Down/Enter/Escape) and direct routing to skill detail pages.
- **"Copy as Agent Prompt" Feature** — Added `CopyAgentRuleButton` on all skill detail pages, enabling engineers to copy formatted system prompt directives (Description, When to Apply, Core Invariants, Execution Workflow) directly into `.cursorrules`, `CLAUDE.md`, or Hermes Agent session prompts.
- **Dedicated Skill Detail Routes (46 new routes)** — Standalone detail pages for Jakub Krehel (`/jakubkrehel/skills/$skillName`), Brooklyn (`/brooklyn/skills/$skillName`), and Superpowers (`/superpowers/skills/$skillName`) matching the concise high-signal pattern of Matt Pocock.
- **Key Concepts Visual Sections** — Concentric Radius Law & Optical Balance (Jakub), Git Worktree Isolation & PR Publication Hygiene (Brooklyn), and SDD Coordinator vs Worker Separation (Superpowers).
- **Official Installation Guides** — Dedicated installation sections (`#installation`) for Jakub Krehel, Brooklyn, and Superpowers with universal one-click CLI commands (`skills.sh`).
- **Jakub Krehel collection** (`/jakubkrehel`) — 11 UI & Design Engineering skills (`better-ui`, `better-typography`, `better-colors`, `better-accessibility`, `better-layout`, `better-writing`, `better-interface`, `break`, `explain-interface`, `interface-review`, `variant`) from `jakubkrehel/skills` (Interfaces.dev)
- **Interactive Micro-Details Lab** — Interactive calculator for mathematical concentric border radius ($R_{inner} = R_{outer} - Padding$) and live optical alignment centering on asymmetric controls
- **Brooklyn collection** (`/brooklyn`) — 21 autonomous engineering and PR lifecycle skills (`cpr`, `babysit`, `work`, `no-tropes`, `pr-ready`, `stacked-pr`, `pr-triage`, `ticket-ship`, `clean`, `visual-verify`, `runtime-debug`) from `OutThisLife/brooklyn-skills`
- **AI Tropes & PR Linter Sandbox** — Live demonstration of `/no-tropes` eliminating synthetic AI buzzwords (delve, tapestry, robust, landscape) into human-grade technical prose, paired with the one-pass `/cpr` pipeline
- **Superpowers collection** (`/superpowers`) — 14 agentic SDLC skills (`subagent-driven-development`, `brainstorming`, `writing-plans`, `executing-plans`, `dispatching-parallel-agents`, `test-driven-development`, `systematic-debugging`, `using-git-worktrees`) from `obra/superpowers` (281k+ stars)
- **Subagent-Driven Development (SDD) Simulator** — 5-phase interactive workflow visualization and modular plan task ledger proving how coordinator agents stay in the Smart Zone by delegating to fresh single-task subagents
- **Archify HD Pipeline Diagram** — Standalone interactive showcase diagram (`public/diagrams/mattpocock-pipeline.html`) for Matt Pocock's idea-to-ship pipeline, passing 9/9 quality checks
- **Phase Boundaries Decision Tree** in Matt Pocock concepts, supporting 5-tier transition protocol (Continue, /clear, /handoff, Subagent, /compact)
- **Workflows 8 & 9** in Matt Pocock workflows: Human-in-the-Loop Barrier (`/wizard`) and External Stakeholder Decision Mining (`/to-questionnaire`)
- **Matt Pocock v1.2.3 sync** — upgraded skill count from 22 to 25 (`wizard`, `to-questionnaire`, `wait-what`, and migration from `writing-great-skills` to `writing-for-agents`)

### Changed
- Collections hub (`/collections`) expanded to 6 available collections with localized descriptions and metadata tags
- Streamlined all collection installation guides to standard universal CLI `npx skills@latest add <repo>` (`skills.sh`)
- Emil Kowalski Interactive Preview upgraded with genuine Apple gesture physics, spring momentum projection, rubber-band boundary resistance, and custom bezier curves (0.16, 1, 0.3, 1)

### Removed
- Removed legacy vendored `skills/` directory (`skills/hermes/` and `skills/davidondrej/`), reducing repository bloat by ~4,600 lines and maintaining clean client SPA architecture

## [v1.4.0] - 2026-07-21

### Added
- **Emil Kowalski collection** (`/emilkowalski`) — bilingual guide to six design-engineering and motion skills from `emilkowalski/skills`, pinned to commit `6bf24434…`, with nested skill detail routes and official skills.sh installation
- **Interactive Preview Lab** — per-skill before/after demos for popover polish, gesture physics, animation vocabulary, motion-opportunity filtering, diff review, and audit-to-plan workflows; supports pointer, keyboard, replay/reset, and reduced motion
- **Emil author branding** — self-hosted X profile avatar and `@emilkowalski` links across collection surfaces

### Changed
- Collection sidebar starts directly with section navigation; removed descriptive subtitle from Matt, David, and Emil guides
- Emil guide labels, categories, invocation modes, preview controls, and skill navigation are localized in Indonesian and English
- Emil source metadata, support-file links, output contracts, and read-only boundaries document upstream behavior more precisely

### Fixed
- Mobile sidebar content is no longer keyboard-focusable while the drawer is closed
- Skill install heading level and Emil detail/list/navigation semantics are accessible and mobile-safe
- Emil catalog cards retain full block borders after list-semantics markup

## [v1.3.0] - 2026-07-17

### Added
- **Collections hub** (`/collections`) — dedicated catalog page listing every skill collection (rank, author, source, skill count) with primary nav pointing at Collections instead of each guide
- **Skill detail “On this page” TOC** — sticky right-rail section nav for Matt and David skill pages, with hash links, scroll-spy, and native smooth scroll that respects `prefers-reduced-motion`
- **Shared in-page scroll helpers** (`src/lib/scroll-to-section.ts`, `src/lib/motion.ts`) — TanStack Router hash update without router scroll, then one native `scrollIntoView` (avoids scroll-restoration races)
- **Collection guide shell** (`CollectionGuideLayout`) — shared sidebar + mobile FAB + main column for Matt and David guide routes
- **Author branding** — self-hosted avatars (`public/avatars/*`), `AuthorAvatar`, and `XHandleLink` on collection overviews / landing cards
- **Landing polish** — skills.sh-inspired `SkillsGuideWordmark` (Fira Mono), “Try it now” install command, and richer collections preview
- **Filter chips** — accessible pressed-state chips for skill catalog filters; Matt filters also cover user- vs model-invoked
- **Accessibility basics** — skip-to-main link, primary/section/filter nav labels, dialog close label (i18n), external-link aria helper, copy-button live region, focus-visible rings on header controls
- **Safe-area CSS utilities** for fixed chrome on notched devices
- **Skill count meta modules** (`skills-meta.ts`, `davidondrej-skills-meta.ts`) so collection listings do not pull full skill catalogs
- **Animation plans** under `plans/` (skill-detail TOC smooth-scroll plan marked DONE)

### Changed
- Header brand mark uses the app icon; nav simplified to Home + Collections
- Theme defaults to **dark**; boot script in `index.html` applies stored theme before paint (no light/dark FOUC); `theme-color` meta stays in sync (`#252525` / `#ffffff`)
- PWA manifest theme/background colors aligned to the dark identity
- Router enables scroll restoration with `instant` behavior; in-page section jumps opt out and scroll natively
- Skill detail layouts: section `id`s, prev/next + back navigation copy, not-found strings (id + en)
- Catalog UI uses `FilterChip`; filter labels moved into i18n messages
- Dialog close control always present with localized sr-only label; popup content can scroll when tall
- `@xyflow/react` styles imported from the flow canvas chunk only (not global CSS)
- Indonesian home label: “Beranda”; assorted a11y/i18n strings for both locales
- `.gitignore` also ignores `.agents` and `skills-lock.json`

### Fixed
- In-page sidebar / TOC clicks no longer fight TanStack scroll restoration (smooth scroll works reliably)
- Reduced-motion users get instant jumps and shortened transitions/animations site-wide
- Copy-to-clipboard feedback announced to assistive tech via `aria-live`

### Dependencies
- Added `@fontsource/fira-mono` for the landing wordmark

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

[Unreleased]: https://github.com/StevanusPangau/ai-skills-guide/compare/v1.5.0...HEAD
[v1.5.0]: https://github.com/StevanusPangau/ai-skills-guide/compare/v1.4.0...v1.5.0
[v1.4.0]: https://github.com/StevanusPangau/ai-skills-guide/compare/v1.3.0...v1.4.0
[v1.3.0]: https://github.com/StevanusPangau/ai-skills-guide/compare/v1.2.0...v1.3.0
[v1.2.0]: https://github.com/StevanusPangau/ai-skills-guide/compare/v1.1.0...v1.2.0
[v1.1.0]: https://github.com/StevanusPangau/ai-skills-guide/compare/v1.0.0...v1.1.0
[v1.0.0]: https://github.com/StevanusPangau/ai-skills-guide/releases/tag/v1.0.0
