# AI Skills Guide

Panduan interaktif untuk 19 AI coding skills dari [Matt Pocock](https://github.com/mattpocock/skills). Situs ini menjelaskan alur kerja lengkap dari ide hingga ship, pola kerja, dan konsep kunci untuk pengembangan software berbasis AI agent.

🔗 **Live:** https://skills.stevanuspangau.cloud

> **Bahasa:** Konten panduan ditulis dalam Bahasa Indonesia (istilah teknis dipertahankan dalam Bahasa Inggris).

## Fitur

- **Ringkasan alur** — main build chain (grill-with-docs → to-prd → to-issues → implement → code-review)
- **Diagram alur interaktif** — ide → ship, termasuk on-ramps (triage, improve-codebase-architecture)
- **Katalog 19 skills** — cari & filter, tiap skill punya halaman detail sendiri
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

Project ini murni **static SPA** — hasil `npm run build` di folder `dist/` bisa di-host di mana saja: Cloudflare Pages/Workers, Netlify, Vercel, GitHub Pages, atau static file server apa pun.

Satu-satunya syarat: aktifkan **SPA fallback** (semua route yang tidak ketemu diarahkan ke `index.html`) agar deep-link seperti `/skills/tdd` berfungsi saat di-refresh. Contoh:

- **Cloudflare Workers/Pages** — set `not_found_handling: "single-page-application"`
- **Netlify** — redirect rule `/* /index.html 200`
- **nginx** — `try_files $uri /index.html;`

## Kredit

- Konten skill bersumber dari dokumentasi resmi **Matt Pocock** — repo [mattpocock/skills](https://github.com/mattpocock/skills) dan [aihero.dev](https://aihero.dev).
- Ini **panduan referensi**, bukan repo skill itu sendiri. Untuk memakai skill-nya:
  ```bash
  npx skills add mattpocock/skills -y -g
  ```

## Lisensi

Kode situs ini dirilis di bawah lisensi [MIT](./LICENSE). Konten deskriptif skill mengacu pada karya Matt Pocock — hormati lisensi/atribusi sumber aslinya saat menggunakan ulang.
