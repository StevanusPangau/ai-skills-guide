# AGENTS.md

## Commands

- Requires Node.js 20+ and npm. `package-lock.json` is canonical; never add `bun.lock`.
- Develop: `npm run dev`.
- Verify all changes: `npm run lint && npm run build`. No test runner or formatter script exists.
- `npm run build` intentionally runs Paraglide codegen before `tsc -b`, then Vite. Do not reorder it: TypeScript imports generated `src/paraglide/*`.
- Deploy only when requested: `npm run deploy` builds, then runs authenticated `wrangler deploy`.

## Generated Files

- Never hand-edit `src/paraglide/*` or `src/routeTree.gen.ts`.
- Edit translations in both `messages/id.json` and `messages/en.json`; keep key sets identical. Base locale is Indonesian.
- TanStack Router generates its route tree from `src/routes/`. In `vite.config.ts`, router plugin must remain before React plugin.

## Repository Shape

- `src/` is client-only React SPA; `skills/` contains separately installable adapted skill bundles.
- Collection registry is `src/data/collections.ts`. Collection content spans data, routes, feature UI, and optional bundle; keep collection changes scoped across those surfaces.
- Matt Pocock uses shared `src/features/*`, `src/data/skills.ts`, `/skills/$skillName`, and bundle `skills/hermes/`.
- David Ondrej uses `src/features/davidondrej/`, `src/data/davidondrej-skills.ts`, nested `/davidondrej/skills/$skillName`, and bundle `skills/davidondrej/`.
- A shipped skill-content change must update both guide data and corresponding `skills/**/SKILL.md`. Preserve bundle `ATTRIBUTION.md` / `UPSTREAM.md` pins and scope.

## Project Conventions

- Import generated messages as `import { m } from '@/paraglide/messages.js'`; locale switching reloads page, so mount-stable localized section arrays are intentional.
- Tailwind v4 config lives in `src/index.css`; no `tailwind.config` exists. shadcn settings live in `components.json` (`base-rhea`, Remix Icon).
- Deployment is Cloudflare static assets only: no Worker script. SPA fallback is configured in `wrangler.jsonc`; security headers live in `public/_headers`.
- UI shell is bilingual; long skill prose is mainly Indonesian with English technical terms. Match surrounding collection copy.
