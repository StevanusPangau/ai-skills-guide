# AI Skills Guide

Panduan interaktif untuk 22 AI coding skills dari [Matt Pocock](https://github.com/mattpocock/skills) (selaras dengan rilis v1.1). Situs ini menjelaskan alur kerja lengkap dari ide hingga ship, pola kerja, dan konsep kunci untuk pengembangan software berbasis AI agent.

🔗 **Live:** https://skills.stevanuspangau.cloud

> **Bahasa:** Konten panduan ditulis dalam Bahasa Indonesia (istilah teknis dipertahankan dalam Bahasa Inggris).

## Fitur

- **Ringkasan alur** — main build chain (grill-with-docs → to-spec → to-tickets → implement → code-review)
- **Diagram alur interaktif** — ide → ship, termasuk on-ramps (triage, improve-codebase-architecture, wayfinder)
- **Katalog 22 skills** — cari & filter, tiap skill punya halaman detail sendiri
- **Halaman detail per skill** — URL shareable (`/skills/tdd`), penjelasan lengkap: cara kerja, tanda berjalan benar, tips, dan skill yang cocok dipasangkan
- **Pola kerja & konsep kunci** — Smart Zone, context management, dsb.
- Dark mode, sidebar scroll-spy, responsif

## Tech Stack

- **Vite** + **React 19** + **TypeScript** (strict)
- **TanStack Router** — file-based routing, type-safe, auto code-splitting (tetap static SPA)
- **Tailwind CSS v4** + **shadcn/ui** (Base UI)
- **oxlint** untuk linting

## Menjalankan

Prasyarat: **Node.js 20+** (atau Bun). Contoh berikut memakai npm.

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
├── data/skills.ts               # data 22 skills
├── features/                    # komponen per domain
│   ├── overview / main-flow / workflows / concepts
│   └── skills/                  # skills-section, skill-card, skill-detail
├── components/
│   ├── layout/                  # sidebar
│   └── ui/                      # shadcn/ui (jangan diedit manual)
└── lib/                         # utils, hooks (useDocumentTitle)
```

## Deployment

Project ini di-deploy ke **Cloudflare Workers** (static assets), pakai config di [`wrangler.jsonc`](./wrangler.jsonc). Karena murni client-rendered SPA, tak ada Worker script — assets di-serve langsung dari edge Cloudflare (zero billable Worker invocation).

```bash
npx wrangler login        # sekali saja (OAuth ke akun Cloudflare)
npm run deploy            # build + wrangler deploy
```

Detail config:

- `not_found_handling: "single-page-application"` — semua route tak dikenal di-rewrite ke `/index.html` (200), jadi deep-link `/skills/tdd` jalan saat di-refresh.
- [`public/_headers`](./public/_headers) — security headers (HSTS, nosniff, X-Frame DENY, Referrer-Policy, Permissions-Policy) + caching immutable untuk `/assets/*`.
- [`public/.well-known/security.txt`](./public/.well-known/security.txt) — kontak security disclosure.

Custom domain (`skills.stevanuspangau.cloud`) dipasang lewat **Workers → Settings → Domains & Routes** di dashboard Cloudflare.

> Karena SPA murni, project juga portable ke Netlify (`/* /index.html 200`), Vercel, atau static server lain (nginx: `try_files $uri /index.html;`).

## Kredit

- Konten skill bersumber dari dokumentasi resmi **Matt Pocock** — repo [mattpocock/skills](https://github.com/mattpocock/skills) dan [aihero.dev](https://aihero.dev).
- Ini **panduan referensi**, bukan repo skill itu sendiri. Untuk memakai skill-nya:
  ```bash
  npx skills add mattpocock/skills -y -g
  ```

## Lisensi

Kode situs ini dirilis di bawah lisensi [MIT](./LICENSE). Konten deskriptif skill mengacu pada karya Matt Pocock — hormati lisensi/atribusi sumber aslinya saat menggunakan ulang.
