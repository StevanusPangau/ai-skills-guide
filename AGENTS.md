# AGENTS.md

## Commands

- Requires Node.js 20+ and npm. `package-lock.json` is canonical; never add `bun.lock`.
- Develop: `npm run dev`.
- Verify all changes: `npm run lint && npm run build`. No test runner or formatter script exists.
- `npm run build` intentionally generates SEO artifacts, then runs Paraglide codegen, `tsc -b`, and Vite. Do not remove or reorder these prerequisites: TypeScript imports generated `src/paraglide/*`.
- Deploy only when requested: `npm run deploy` builds, then runs authenticated `wrangler deploy`.

## Generated Files

- Never hand-edit `src/paraglide/*` or `src/routeTree.gen.ts`.
- Edit translations in both `messages/id.json` and `messages/en.json`; keep key sets identical. Base locale is Indonesian.
- TanStack Router generates its route tree from `src/routes/`. In `vite.config.ts`, router plugin must remain before React plugin.
- Never hand-edit `public/sitemap.xml`, `public/robots.txt`, or `public/llms.txt`; `npm run seo:generate` rebuilds them from the skill data modules.

## Repository Shape

- `src/` is client-only React SPA.
- Skills are installed universally via the standard `npx skills@latest add` CLI (`skills.sh`).
- Collection registry is `src/data/collections.ts`. Collection content spans data, routes, and feature UI.

## Project Conventions

- Import generated messages as `import { m } from '@/paraglide/messages.js'`; locale switching reloads page, so mount-stable localized section arrays are intentional.
- Tailwind v4 config lives in `src/index.css`; no `tailwind.config` exists. shadcn settings live in `components.json` (`base-rhea`, Remix Icon).
- Deployment is Cloudflare static assets only: no Worker script. SPA fallback is configured in `wrangler.jsonc`; security headers live in `public/_headers`.
- UI shell is bilingual; long skill prose is mainly Indonesian with English technical terms. Match surrounding collection copy.

## Adding or Updating Skills

- Add or update a skill in its collection data module under `src/data/`; keep its name/slug unique within that collection and update the matching `*-skills-meta.ts` count when one exists.
- Every new user-visible string must exist in both `messages/id.json` and `messages/en.json`; keep both key sets complete before building.
- When adding a collection, register it in `src/data/collections.ts`, add its route and metadata, and add its data-file/URL-prefix mapping to `scripts/generate-seo-artifacts.mjs`.
- Keep source provenance accurate: upstream repository, pinned version/SHA, source path, author attribution, and license must reflect the material actually presented. Never imply this guide is the canonical upstream source.
- Skill detail pages need a unique descriptive title and description through `useDocumentTitle`/`usePageMetadata`, one visible `<h1>`, crawlable internal links, and a valid canonical path. Do not add keyword stuffing or unsupported FAQ/schema claims.
- After a skill or collection change, run `npm run seo:generate`; confirm its canonical URL appears once in `public/sitemap.xml` and `public/llms.txt`, then run `npm run lint && npm run build`.
- Keep SEO proportional for an open-source guide: prioritize accurate content, crawlability, metadata, attribution, and generated discovery files. Do not add SSR, analytics, IndexNow keys, or complex SEO infrastructure without an explicit project need.
