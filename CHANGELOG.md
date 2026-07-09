# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [v1.1.0] - 2026-07-09

### Added
- **Skill: wayfinder** — plan pekerjaan besar (>1 sesi agent) sebagai peta investigation tickets di issue tracker
- **Skill: implement** — endpoint main flow: kerjakan ticket/spec dengan TDD + code-review
- **Skill: resolving-merge-conflicts** — resolve konflik git merge/rebase berdasarkan intent asli tiap sisi
- **Skill: setup-matt-pocock-skills** — one-time repo setup (issue tracker, triage labels, domain docs) + 5 file pendukung
- File pendukung bundle upstream (LOGIC.md, UI.md, scripts/, CONTEXT-FORMAT.md, ADR-FORMAT.md, dll) — memperbaiki broken link pre-existing

### Changed
- **Rename: to-prd → to-spec** — "spec" sebagai through-line term tunggal (bukan PRD), selaras upstream v1.1
- **Rename: to-issues → to-tickets** — merge dari /to-plan + /to-issues; "tickets" lebih tracker-agnostic
- **Main flow** diperbarui: `grill-with-docs → to-spec → to-tickets → implement → code-review`
- **tdd**: Refactor dikeluarkan dari loop Red→Green, dipindah ke fase code-review (AFK-friendly)
- **to-tickets**: blocking edges, frontier concept, pola expand–contract untuk wide refactor
- **code-review**: deskripsi diselaraskan (2-axis parallel review + Fowler smell baseline)
- Semua 22 body SKILL.md di-regenerasi identik upstream v1.1 (frontmatter Hermes dipertahankan)
- Angka skill diperbarui: 19 → 22 di seluruh UI, i18n (id + en), README, package.json
- Jumlah pola kerja: 5 → 7
- Sidebar, overview, main-flow diagram, dan workflows component diselaraskan

### Removed
- **Skill: design-an-interface** (deprecated upstream)
- **Skill: qa** (deprecated upstream)
- **Skill: request-refactor-plan** (deprecated upstream)
- **Skill: ubiquitous-language** (deprecated upstream, digantikan /grill-with-docs + /domain-modeling)
- **Skill: zoom-out** (orphan, tidak ada di upstream)
- **Skill: diagnose** (duplikat dari diagnosing-bugs)

## [v1.0.0] - 2026-07-06

### Added
- Panduan interaktif 19 AI coding skills dari Matt Pocock
- Main build chain: grill-with-docs → to-prd → to-issues → implement → code-review
- Diagram alur interaktif (ide → ship) dengan on-ramps (triage, improve-codebase-architecture)
- Katalog 19 skills dengan halaman detail per skill (URL shareable `/skills/:name`)
- 7 pola kerja (workflows) dengan penjelasan
- Konsep kunci: Smart Zone, Deep vs Shallow Modules, Vertical Slices, AFK vs HITL, Seams, Leading Words, Context Hygiene
- Internationalization (i18n) — Bahasa Indonesia + English via Paraglide JS
- Dark mode + toggle
- Responsive design dengan sidebar scroll-spy
- Bundle SKILL.md (adapted for Hermes Agent) untuk tiap skill
- Deploy ke Cloudflare Workers (static SPA)
- Security headers, SPA fallback routing, immutable asset caching

[v1.1.0]: https://github.com/StevanusPangau/ai-skills-guide/compare/v1.0.0...v1.1.0
[v1.0.0]: https://github.com/StevanusPangau/ai-skills-guide/releases/tag/v1.0.0
