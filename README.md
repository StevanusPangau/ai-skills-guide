# AI Skills Guide

[![Live](https://img.shields.io/badge/live-skills.stevanuspangau.dev-f97316)](https://skills.stevanuspangau.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

**English** · [Bahasa Indonesia](./README.id.md)

Interactive **multi-collection** reference for AI-agent software-development skills: practitioner collections, workflows, concepts, and install instructions.

**Live:** https://skills.stevanuspangau.dev

> UI shell: **Indonesian** (base) + **English**. Long skill copy is mostly Indonesian; technical terms stay English.

## What this repo is

A growing catalog of skill **collections** (one practitioner or upstream repo each), not a single-author skill dump.

| Product | Path | Purpose |
|---|---|---|
| **Guide SPA** | `src/` | Landing, per-collection guides, diagrams, search/filter, skill detail |

Each collection has its own route, data model, and upstream attribution. Collections are added over time — the landing page lists what is available now and leaves room for more.

This is a **reference guide**, not a replacement for upstream. It ships no skill files of its own; install from each upstream repo. Prefer each upstream repo for the latest source skills.

## Current collections

Snapshot of what ships today (270+ skills across 15 collections):

| Collection | Route | Upstream | Catalog | Install |
|---|---|---|---|---|
| Matt Pocock — AI Coding Skills | [`/mattpocock`](https://skills.stevanuspangau.dev/mattpocock) | [mattpocock/skills](https://github.com/mattpocock/skills) `v1.2.3+` (`d81f3a1…`) | 27 | Upstream (skills.sh / plugin) |
| Emil Kowalski — Design Engineering Skills | [`/emilkowalski`](https://skills.stevanuspangau.dev/emilkowalski) | [emilkowalski/skills](https://github.com/emilkowalski/skills) pin `e8a175d…` | 14 | Upstream (skills.sh / plugin) |
| David Ondrej — Personal Agent Skills | [`/davidondrej`](https://skills.stevanuspangau.dev/davidondrej) | [davidondrej/skills](https://github.com/davidondrej/skills) pin `88a3d7c…` | 57 | Upstream via skills.sh |
| Jakub Krehel — UI & Design Engineering | [`/jakubkrehel`](https://skills.stevanuspangau.dev/jakubkrehel) | [jakubkrehel/skills](https://github.com/jakubkrehel/skills) pin `267330e…` | 11 | Upstream (skills.sh / plugin) |
| Brooklyn — Autonomous Engineering & PR | [`/brooklyn`](https://skills.stevanuspangau.dev/brooklyn) | [OutThisLife/brooklyn-skills](https://github.com/OutThisLife/brooklyn-skills) | 22 | Upstream (copy / `external_dirs`) |
| Jesse Vincent — Agentic SDLC & Superpowers | [`/superpowers`](https://skills.stevanuspangau.dev/superpowers) | [obra/superpowers](https://github.com/obra/superpowers) | 15 | Upstream plugin per harness |
| Official Vercel Agent Skills | [`/vercel`](https://skills.stevanuspangau.dev/vercel) | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | 9 | Upstream via skills.sh |
| Official Anthropic Agent Skills | [`/anthropic`](https://skills.stevanuspangau.dev/anthropic) | [anthropics/skills](https://github.com/anthropics/skills) | 19 | Upstream via skills.sh |
| Official Cloudflare Edge Skills | [`/cloudflare`](https://skills.stevanuspangau.dev/cloudflare) | [cloudflare/skills](https://github.com/cloudflare/skills) | 16 | Upstream via skills.sh |
| Official Supabase Postgres Skills | [`/supabase`](https://skills.stevanuspangau.dev/supabase) | [supabase/agent-skills](https://github.com/supabase/agent-skills) | 2 | Upstream via skills.sh |
| Official Prisma ORM v7 Skills | [`/prisma`](https://skills.stevanuspangau.dev/prisma) | [prisma/skills](https://github.com/prisma/skills) | 8 | Upstream via skills.sh |
| TanStack Community Skills (not affiliated with TanStack) | [`/tanstack`](https://skills.stevanuspangau.dev/tanstack) | [tanstack-skills/tanstack-skills](https://github.com/tanstack-skills/tanstack-skills) | 14 | Upstream / TanStack Intent |
| Official Expo & EAS Mobile Skills | [`/expo`](https://skills.stevanuspangau.dev/expo) | [expo/skills](https://github.com/expo/skills) | 25 | Upstream via skills.sh |
| Official GreenSock (GSAP) Motion Skills | [`/gsap`](https://skills.stevanuspangau.dev/gsap) | [greensock/gsap-skills](https://github.com/greensock/gsap-skills) | 8 | Upstream via skills.sh |
| Impeccable Design System by Paul Bakaus | [`/impeccable`](https://skills.stevanuspangau.dev/impeccable) | [pbakaus/impeccable](https://github.com/pbakaus/impeccable) | 25 commands | `npx impeccable install` |

Each collection data file records the upstream repository and the pinned commit its content was verified against. Always prefer upstream for the latest skills.

## Features

- Multi-collection landing (available now + room for future collections)
- Shared collection shell: overview, interactive flow, catalog, workflows, concepts, install
- Modal skill catalog; deep-link skill pages secondary
- Dark mode, responsive layout, bilingual UI
- Install paths: per-collection commands (skills.sh, plugin marketplace, or the upstream installer) taken from each upstream README

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

Prefer the **Installation** section on each collection page — commands differ per collection.

### skills.sh (most agents)

Point at the **upstream** skill repo for that collection, for example:

```bash
npx skills@latest add <owner/repo>
npx skills@latest add <owner/repo> --skill <name>
```

Browse: https://skills.sh/

## Project structure

```text
messages/                 # i18n source (id, en)
project.inlang/           # Paraglide project (settings.json)
public/                   # static assets, _headers, security.txt
src/routes/               # landing + per-collection routes + skill deep links
src/data/                 # collections registry + per-collection skill records
src/features/             # shared shell + per-collection UI
src/components/           # layout, install helpers, shadcn/ui
```

Generated — do not hand-edit: `src/routeTree.gen.ts`, `src/paraglide/*`.

New collections typically add: a `src/data/*` record set, routes under `src/routes/`, features under `src/features/`, and a row in `src/data/collections.ts`.

## Deployment

**Cloudflare Workers** static assets only (`wrangler.jsonc`, no Worker script).

```bash
npx wrangler login
npm run deploy
```

SPA fallback is enabled so deep links work on refresh. Security headers live in [`public/_headers`](./public/_headers). Portable to any static host with SPA fallback.

## Contributing

PRs welcome for the guide shell, new collections, and upstream syncs.

1. Keep diffs small and **collection-scoped**.
2. Skill changes: update that collection’s data file **and** its `*-skills-meta.ts` count, then run `npm run seo:generate` (it fails if a count and the data disagree).
3. Keep `messages/id.json` and `messages/en.json` key sets in sync.
4. Run `npm run lint && npm run build` before opening a PR.
5. No secrets, personal absolute paths, or dual lockfiles (`bun.lock`).
6. Keep provenance accurate: upstream repo, a real pinned commit SHA, per-skill source paths, and license. Verify claims against the upstream `SKILL.md`; never invent numbers or benchmarks.

History: [`CHANGELOG.md`](./CHANGELOG.md) ([Keep a Changelog](https://keepachangelog.com/)).

## Credits & license

Skill content belongs to each collection’s **upstream authors**. This site summarizes and documents; it does not claim ownership of upstream material.

Each collection page and data file names its upstream repo, pinned commit, and license. Licenses differ per collection (for example, only some Anthropic skills are Apache-2.0; the document skills are proprietary), so always respect the upstream license when reusing skill text.

Site code © 2026 Stevanus Pangau — [MIT](./LICENSE).

## Security

Report vulnerabilities via [`public/.well-known/security.txt`](./public/.well-known/security.txt). Prefer private disclosure over public issues for sensitive reports.
