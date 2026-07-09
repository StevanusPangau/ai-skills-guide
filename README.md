# AI Skills Guide

Interactive guide for 22 AI coding skills by [Matt Pocock](https://github.com/mattpocock/skills) (aligned with v1.1 release). This site explains the complete workflow from idea to ship, work patterns, and key concepts for AI agent-based software development.

🔗 **Live:** https://skills.stevanuspangau.cloud

> **Language:** Guide content is written in Indonesian (technical terms kept in English). The UI supports language switching (Indonesian + English).

## Features

- **Flow summary** — main build chain (grill-with-docs → to-spec → to-tickets → implement → code-review)
- **Interactive flow diagram** — idea → ship, including on-ramps (triage, improve-codebase-architecture, wayfinder)
- **Catalog of 22 skills** — search & filter, each skill has its own detail page
- **Skill detail pages** — shareable URLs (`/skills/tdd`), full explanation: how it works, signs it's working, tips, and skills that pair well
- **Work patterns & key concepts** — Smart Zone, context management, etc.
- Dark mode, sidebar scroll-spy, responsive

## Tech Stack

- **Vite** + **React 19** + **TypeScript** (strict)
- **TanStack Router** — file-based routing, type-safe, auto code-splitting (remains a static SPA)
- **Tailwind CSS v4** + **shadcn/ui** (Base UI)
- **oxlint** for linting

## Getting Started

Prerequisites: **Node.js 20+** (or Bun). Examples below use npm.

```bash
npm install
npm run dev        # dev server (Vite + HMR)
npm run build      # paraglide compile + tsc -b + vite build → dist/
npm run preview    # preview built output
npm run lint       # oxlint
```

## Project Structure

```
src/
├── routes/                      # file-based routing (TanStack Router)
│   ├── __root.tsx               # layout shell (header + dark mode toggle)
│   ├── index.tsx                # /            → full guide (scroll page)
│   └── skills.$skillName.tsx    # /skills/:name → skill detail page
├── router.tsx                   # router configuration (type-safe)
├── routeTree.gen.ts             # auto-generated (do not edit)
├── types/skill.ts               # Skill type + helpers (getOfficialTitle, etc.)
├── data/skills.ts               # data for 22 skills
├── features/                    # domain components
│   ├── overview / main-flow / workflows / concepts
│   └── skills/                  # skills-section, skill-card, skill-detail
├── components/
│   ├── layout/                  # sidebar
│   └── ui/                      # shadcn/ui (do not edit manually)
└── lib/                         # utils, hooks (useDocumentTitle)
```

## Deployment

This project is deployed to **Cloudflare Workers** (static assets) using the config in [`wrangler.jsonc`](./wrangler.jsonc). Since it's a purely client-rendered SPA, there's no Worker script — assets are served directly from Cloudflare's edge (zero billable Worker invocations).

```bash
npx wrangler login        # one-time (OAuth to Cloudflare account)
npm run deploy            # build + wrangler deploy
```

Configuration details:

- `not_found_handling: "single-page-application"` — all unknown routes rewrite to `/index.html` (200), so deep-links like `/skills/tdd` work on refresh.
- [`public/_headers`](./public/_headers) — security headers (HSTS, nosniff, X-Frame DENY, Referrer-Policy, Permissions-Policy) + immutable caching for `/assets/*`.
- [`public/.well-known/security.txt`](./public/.well-known/security.txt) — security disclosure contact.

Custom domain (`skills.stevanuspangau.cloud`) is configured via **Workers → Settings → Domains & Routes** in the Cloudflare dashboard.

> Since this is a pure SPA, the project is also portable to Netlify (`/* /index.html 200`), Vercel, or any static server (nginx: `try_files $uri /index.html;`).

## Credits

- Skill content is sourced from the official **Matt Pocock** documentation — repo [mattpocock/skills](https://github.com/mattpocock/skills) and [aihero.dev](https://aihero.dev).
- This is a **reference guide**, not the skill repo itself. To use the skills:
  ```bash
  npx skills add mattpocock/skills -y -g
  ```

## License

Site code is released under the [MIT](./LICENSE) license. Descriptive skill content references the work of Matt Pocock — respect the license/attribution of the original source when reusing.
