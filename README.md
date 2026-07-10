# AI Skills Guide

[![Live](https://img.shields.io/badge/live-skills.stevanuspangau.cloud-f97316)](https://skills.stevanuspangau.cloud)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

Interactive **multi-collection** reference for AI-agent software-development skills: practitioner collections, workflows, concepts, and installable Hermes skill bundles.

**Live:** https://skills.stevanuspangau.cloud

> UI shell: **Indonesian** (base) + **English**. Long skill copy is mostly Indonesian; technical terms stay English.

## What this repo is

A growing catalog of skill **collections** (one practitioner or upstream repo each), not a single-author skill dump.

| Product | Path | Purpose |
|---|---|---|
| **Guide SPA** | `src/` | Landing, per-collection guides, diagrams, search/filter, skill detail |
| **Hermes bundles** | `skills/<collection>/` | Adapted installable `SKILL.md` files per collection |

Each collection has its own route, data model, optional Hermes bundle, and upstream attribution. Collections are added over time — the landing page lists what is available now and leaves room for more.

This is a **reference guide + adapted bundles**, not a replacement for upstream. Prefer each upstream repo for the latest source skills.

## Current collections

Snapshot of what ships today (counts/pins change as collections grow):

| Collection | Route | Upstream | Catalog | Hermes bundle |
|---|---|---|---|---|
| Matt Pocock — AI Coding Skills | [`/mattpocock`](https://skills.stevanuspangau.cloud/mattpocock) | [mattpocock/skills](https://github.com/mattpocock/skills) `v1.1.0` | 22 | `skills/hermes/` (22) |
| David Ondrej — Personal Agent Skills | [`/davidondrej`](https://skills.stevanuspangau.cloud/davidondrej) | [davidondrej/skills](https://github.com/davidondrej/skills) pin `2f70c586…` | 28 (+ compat/risk) | `skills/davidondrej/` first-wave 9 |

Some collections document upstream more broadly than they ship as a Hermes first-wave. Per-collection pages and `skills/*/UPSTREAM.md` / `ATTRIBUTION.md` (when present) are the source of truth for pins and scope.

## Features

- Multi-collection landing (available now + room for future collections)
- Shared collection shell: overview, interactive flow, catalog, workflows, concepts, install
- Modal skill catalog; deep-link skill pages secondary
- Dark mode, responsive layout, bilingual UI
- Install paths: **Hermes** (this repo’s bundles) · **other agents** via [skills.sh](https://skills.sh/) using each collection’s upstream

## Tech stack

Vite 8 · React 19 · TypeScript · TanStack Router · Tailwind CSS v4 · shadcn/ui · Paraglide JS · `@xyflow/react` · oxlint · Cloudflare Workers (static assets)

## Getting started

**Requires:** Node.js **20+**. Canonical package manager: **npm** (`package-lock.json`). Do not commit `bun.lock`.

```bash
git clone https://github.com/StevanusPangau/ai-skills-guide.git
cd ai-skills-guide
npm install
npm run dev
```

```bash
npm run build      # paraglide + tsc + vite → dist/
npm run preview
npm run lint
npm run deploy     # build + wrangler deploy (Cloudflare auth required)
```

## Install skills

Prefer the **Installation** section on each collection page — commands and bundle scope differ per collection.

### skills.sh (most agents)

Point at the **upstream** skill repo for that collection, for example:

```bash
npx skills@latest add <owner/repo>
npx skills@latest add <owner/repo> --skill <name>
```

Browse: https://skills.sh/

### Hermes Agent (adapted bundles in this repo)

Bundles live under `skills/<collection>/`. Use the live site install section or [Hermes docs](https://hermes-agent.nousresearch.com/docs) for current `hermes skills` commands (CLI surface changes across releases).

## Project structure

```text
messages/                 # i18n source (id, en)
project.inlang/           # Paraglide project (settings.json)
public/                   # static assets, _headers, security.txt
skills/                   # one subdirectory per Hermes-adapted collection
src/routes/               # landing + per-collection routes + skill deep links
src/data/                 # collections registry + per-collection skill records
src/features/             # shared shell + per-collection UI
src/components/           # layout, install helpers, shadcn/ui
```

Generated — do not hand-edit: `src/routeTree.gen.ts`, `src/paraglide/*`.

New collections typically add: a `src/data/*` record set, routes under `src/routes/`, features under `src/features/`, optional `skills/<name>/`, and a row in `src/data/collections.ts`.

## Deployment

**Cloudflare Workers** static assets only (`wrangler.jsonc`, no Worker script).

```bash
npx wrangler login
npm run deploy
```

SPA fallback is enabled so deep links work on refresh. Security headers live in [`public/_headers`](./public/_headers). Portable to any static host with SPA fallback.

## Contributing

PRs welcome for the guide shell, new collections, and Hermes adaptations.

1. Keep diffs small and **collection-scoped**.
2. Skill changes that ship in a bundle: update that collection’s guide data **and** `skills/<collection>/**/SKILL.md`.
3. Keep `messages/id.json` and `messages/en.json` key sets in sync.
4. Run `npm run lint && npm run build` before opening a PR.
5. No secrets, personal absolute paths, or dual lockfiles (`bun.lock`).
6. Preserve upstream attribution (`ATTRIBUTION.md` / `UPSTREAM.md` when the collection has a pin).

History: [`CHANGELOG.md`](./CHANGELOG.md) ([Keep a Changelog](https://keepachangelog.com/)).

## Credits & license

Skill content belongs to each collection’s **upstream authors**. This site adapts and documents; it does not claim ownership of upstream material.

Per-collection attribution lives next to each bundle (e.g. `skills/*/ATTRIBUTION.md`). Always respect the upstream license when reusing skill text.

Site code © 2026 Stevanus Pangau — [MIT](./LICENSE).

## Security

Report vulnerabilities via [`public/.well-known/security.txt`](./public/.well-known/security.txt). Prefer private disclosure over public issues for sensitive reports.
