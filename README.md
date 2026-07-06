# Panduan AI Skills — Matt Pocock Workflow

Panduan interaktif untuk 19 AI coding skills dari [Matt Pocock](https://github.com/mattpocock/skills). Situs ini menjelaskan alur kerja lengkap dari ide hingga ship, pola kerja, dan konsep kunci untuk pengembangan software berbasis AI agent.

🔗 **Live:** https://skills.stevanuspangau.cloud

## Fitur

- **Ringkasan alur** — main build chain (grill-with-docs → to-prd → to-issues → implement → code-review)
- **Diagram alur interaktif** — ide → ship, termasuk on-ramps (triage, improve-codebase-architecture)
- **Katalog 19 skills** — cari & filter, tiap skill punya halaman detail sendiri
- **Halaman detail per skill** — URL shareable (`/skills/tdd`), penjelasan lengkap: cara kerja, tanda berjalan benar, tips, dan skill yang cocok dipasangkan
- **Pola kerja & konsep kunci** — Smart Zone, context management, dsb.
- Dark mode, sidebar scroll-spy, Bahasa Indonesia

## Tech Stack

- **Vite** + **React 19** + **TypeScript** (strict)
- **TanStack Router** — file-based routing, type-safe, auto code-splitting (tetap static SPA)
- **Tailwind CSS v4** + **shadcn/ui** (base-nova / Base UI)
- **oxlint** untuk linting

## Menjalankan

```bash
npm install
npm run dev        # dev server (Vite + HMR)
npm run build      # tsc -b && vite build → dist/
npm run preview    # preview hasil build
npm run lint       # oxlint
```

## Struktur

```
src/
├── routes/                      # file-based routing (TanStack Router)
│   ├── __root.tsx               # layout shell (header + dark mode toggle)
│   ├── index.tsx                # /            → panduan lengkap (scroll page)
│   └── skills.$skillName.tsx    # /skills/:name → halaman detail per skill
├── router.tsx                   # konfigurasi router (type-safe)
├── routeTree.gen.ts             # auto-generated (jangan diedit)
├── types/skill.ts               # tipe Skill + helper (getOfficialTitle, dst.)
├── data/skills.ts               # data 19 skills
├── features/                    # komponen per domain
│   ├── overview / main-flow / workflows / concepts
│   └── skills/                  # skills-section, skill-card, skill-detail
├── components/
│   ├── layout/                  # sidebar
│   └── ui/                      # shadcn/ui (jangan diedit manual)
└── lib/                         # utils, hooks (useDocumentTitle)
```

## Deployment

Saat ini di-serve sebagai static build oleh **Caddy** (di VPS) dengan:
- Cloudflare mTLS origin pull (origin hanya bisa diakses via Cloudflare)
- SPA fallback (`try_files {path} /index.html`)
- Security headers (HSTS, nosniff, X-Frame DENY, dsb.)

Karena murni static, project ini juga siap di-deploy ke **Cloudflare Workers Static Assets** tanpa perubahan arsitektur — cukup tambah `wrangler.jsonc` dengan `not_found_handling: "single-page-application"`.

## Catatan

- Konten skill bersumber dari dokumentasi resmi Matt Pocock di aihero.dev.
- Ini **panduan referensi**, bukan repo skill itu sendiri. Untuk memakai skill-nya: `npx skills add mattpocock/skills -y -g`.
