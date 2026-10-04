# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Interactive multi-collection reference SPA for AI-agent coding skills: landing + per-collection guides (overview, flow diagram, catalog, workflows, concepts, install). It ships no skill files of its own; each collection documents an upstream repo.

Client-rendered only; deployed as static assets to Cloudflare Workers (no Worker script).

## Commands

```bash
npm run dev        # vite dev server
npm run build      # paraglide compile → tsc -b → vite build (→ dist/)
npm run lint       # oxlint
npm run preview    # preview built dist/
npm run deploy     # build + wrangler deploy (Cloudflare auth required)
```

No test runner is configured. Verify with `npm run lint && npm run build`.

Package manager is **npm** (`package-lock.json` is canonical). `bun.lock` is gitignored — never commit it.

## Build order matters

`build` runs `paraglide-js compile` **before** `tsc`. Paraglide generates `src/paraglide/*` from `messages/*.json`; tsc fails if those don't exist. Don't reorder. `src/paraglide/*` and `src/routeTree.gen.ts` are generated — never hand-edit.

## Architecture

**Routing** — TanStack Router file-based routes in `src/routes/`. The router plugin (vite.config.ts) auto-generates `routeTree.gen.ts` and must load before the React plugin. `__root.tsx` holds the header/nav/theme/locale shell; each collection gets a top-level route (`mattpocock.tsx`, `davidondrej.tsx`) plus deep-link skill pages (`*.skills.$skillName.tsx`).

**Skill detail pages** — every `*.skills.$skillName.tsx` route is a thin wrapper around the shared `src/features/skill-page/` (`SkillPage`). A route maps its data record to a `SkillView` (`adapters.ts` for the rich bilingual shape, `adapters-special.ts` for mattpocock/davidondrej/emilkowalski) and supplies the install block. Each skill gets a deterministic accent colour + glyph (`identity.ts`) and sections only render when the data has them, so richer records give richer pages. Don't copy a route per collection or add per-collection page chrome; extend `SkillView` instead. Strings live in `skillpage_*` messages.

**Collection pattern** — each collection is a self-contained slice:
- data: `src/data/<collection>-skills.ts` (skill records) — registered in `src/data/collections.ts`
- UI: `src/features/<collection>/` (or shared `src/features/*` for mattpocock, the original collection)
- provenance: the data file's `*_SOURCE_REPO` / `*_SOURCE_SHA` (a real, verified upstream commit) and per-skill `sourcePath`

Adding a collection = new data record set + `*-skills-meta.ts` count + routes + features dir + a row in `collections.ts` + a mapping in `scripts/generate-seo-artifacts.mjs`.

**i18n (Paraglide)** — base locale `id`, plus `en`. Source strings live in `messages/id.json` + `messages/en.json`; **keep key sets in sync**. Import via `import { m } from '@/paraglide/messages.js'` and call `m.key_name()`. Locale switch (`__root.tsx`) does a full `window.location.reload()`.

**Styling** — Tailwind CSS v4 (via `@tailwindcss/vite`, config in `src/index.css`, no tailwind.config). shadcn/ui components in `src/components/ui/` (style `base-rhea`, remixicon). `@/` aliases `src/`.

**Flow diagrams** — `@xyflow/react` in `src/features/flow/`.

## Conventions

- UI copy is bilingual; skill data files mix Indonesian prose with English technical terms — match the existing file when editing.
- Keep diffs collection-scoped. Update the collection's data file **and** its `*-skills-meta.ts` count together; `npm run seo:generate` fails if they disagree.
- When syncing, pin a real upstream commit SHA (never `main`), re-verify claims against upstream `SKILL.md`, and never invent numbers, benchmarks, APIs, or licenses. `pairsWellWith`/`related` must resolve within the same collection.
- oxlint enforces `react/rules-of-hooks`; `only-export-components` is relaxed for `src/routes/**` and `src/components/ui/**`.
