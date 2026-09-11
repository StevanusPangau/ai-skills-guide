# AI Skills Guide

[![Live](https://img.shields.io/badge/live-skills.stevanuspangau.dev-f97316)](https://skills.stevanuspangau.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

[English](./README.md) · **Bahasa Indonesia**

Referensi interaktif **multi-koleksi** untuk skill pengembangan software berbasis AI agent: koleksi per praktisi, workflow, konsep, dan bundle skill Hermes yang bisa langsung dipasang.

**Live:** https://skills.stevanuspangau.dev

> Shell UI: **Indonesia** (base) + **English**. Sebagian besar isi skill berbahasa Indonesia; istilah teknis tetap dalam bahasa Inggris.

## Isi repo ini

Katalog yang terus bertumbuh berisi **koleksi** skill (satu praktisi atau repo upstream per koleksi), bukan kumpulan skill satu penulis saja.

| Produk | Path | Tujuan |
|---|---|---|
| **Guide SPA** | `src/` | Landing, panduan per-koleksi, diagram, cari/filter, detail skill |
| **Bundle Hermes** | `skills/<collection>/` | File `SKILL.md` hasil adaptasi yang bisa dipasang, per koleksi |

Tiap koleksi punya route, model data, bundle Hermes opsional, dan atribusi upstream sendiri. Koleksi ditambahkan seiring waktu — halaman landing menampilkan yang sudah tersedia sekarang dan menyisakan ruang untuk yang lain.

Ini adalah **panduan referensi + bundle adaptasi**, bukan pengganti upstream. Untuk skill sumber terbaru, selalu utamakan repo upstream masing-masing.

## Koleksi saat ini

Ringkasan yang tersedia hari ini (220+ skills di 15 koleksi):

| Koleksi | Route | Upstream | Katalog | Install Hermes / Agent |
|---|---|---|---|---|
| Matt Pocock — AI Coding Skills | [`/mattpocock`](https://skills.stevanuspangau.dev/mattpocock) | [mattpocock/skills](https://github.com/mattpocock/skills) `v1.2.3` | 25 | `skills/hermes/` (25) |
| Emil Kowalski — Design Engineering Skills | [`/emilkowalski`](https://skills.stevanuspangau.dev/emilkowalski) | [emilkowalski/skills](https://github.com/emilkowalski/skills) pin `6bf24434…` | 6 | Upstream via skills.sh |
| David Ondrej — Personal Agent Skills | [`/davidondrej`](https://skills.stevanuspangau.dev/davidondrej) | [davidondrej/skills](https://github.com/davidondrej/skills) pin `2f70c586…` | 28 | Upstream via skills.sh |
| Jakub Krehel — UI & Design Engineering | [`/jakubkrehel`](https://skills.stevanuspangau.dev/jakubkrehel) | [jakubkrehel/skills](https://github.com/jakubkrehel/skills) | 11 | Upstream via skills.sh |
| Brooklyn — Autonomous Engineering & PR | [`/brooklyn`](https://skills.stevanuspangau.dev/brooklyn) | [OutThisLife/brooklyn-skills](https://github.com/OutThisLife/brooklyn-skills) | 21 | Upstream via skills.sh |
| Jesse Vincent — Agentic SDLC & Superpowers | [`/superpowers`](https://skills.stevanuspangau.dev/superpowers) | [obra/superpowers](https://github.com/obra/superpowers) | 14 | Upstream via skills.sh |
| Official Vercel Agent Skills | [`/vercel`](https://skills.stevanuspangau.dev/vercel) | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | 9 | Upstream via skills.sh |
| Official Anthropic Agent Skills | [`/anthropic`](https://skills.stevanuspangau.dev/anthropic) | [anthropics/skills](https://github.com/anthropics/skills) | 19 | Upstream via skills.sh |
| Official Cloudflare Edge Skills | [`/cloudflare`](https://skills.stevanuspangau.dev/cloudflare) | [cloudflare/skills](https://github.com/cloudflare/skills) | 13 | Upstream via skills.sh |
| Official Supabase Postgres Skills | [`/supabase`](https://skills.stevanuspangau.dev/supabase) | [supabase/agent-skills](https://github.com/supabase/agent-skills) | 2 | Upstream via skills.sh |
| Official Prisma ORM v7 Skills | [`/prisma`](https://skills.stevanuspangau.dev/prisma) | [prisma/skills](https://github.com/prisma/skills) | 9 | Upstream via skills.sh |
| Official TanStack Framework Skills | [`/tanstack`](https://skills.stevanuspangau.dev/tanstack) | [tanstack-skills/tanstack-skills](https://github.com/tanstack-skills/tanstack-skills) | 14 | Upstream / npm Intent |
| Official Expo & EAS Mobile Skills | [`/expo`](https://skills.stevanuspangau.dev/expo) | [expo/skills](https://github.com/expo/skills) | 25 | Upstream via skills.sh |
| Official GreenSock (GSAP) Motion Skills | [`/gsap`](https://skills.stevanuspangau.dev/gsap) | [greensock/gsap-skills](https://github.com/greensock/gsap-skills) | 8 | Upstream via skills.sh |
| Impeccable Design System by Paul Bakaus | [`/impeccable`](https://skills.stevanuspangau.dev/impeccable) | [pbakaus/impeccable](https://github.com/pbakaus/impeccable) | 21 | Upstream via skills.sh |

Beberapa koleksi mendokumentasikan upstream lebih luas dari yang di-ship sebagai first-wave Hermes. Halaman per-koleksi dan `skills/*/UPSTREAM.md` / `ATTRIBUTION.md` (jika ada) adalah sumber kebenaran untuk pin dan cakupan.

## Fitur

- Landing multi-koleksi (tersedia sekarang + ruang untuk koleksi mendatang)
- Shell koleksi bersama: overview, flow interaktif, katalog, workflow, konsep, install
- Katalog skill modal; halaman skill deep-link sebagai sekunder
- Dark mode, layout responsif, UI bilingual
- Jalur install: **Hermes** (bundle di repo ini) · **agent lain** via [skills.sh](https://skills.sh/) memakai upstream tiap koleksi

## Tech stack

Vite 8 · React 19 · TypeScript · TanStack Router · Tailwind CSS v4 · shadcn/ui · Paraglide JS · `@xyflow/react` · oxlint · Cloudflare Workers (static assets)

## Memulai

**Butuh:** Node.js **20+**. Package manager kanonik: **npm** (`package-lock.json`). Jangan commit `bun.lock`.

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
npm run deploy     # build + wrangler deploy (butuh auth Cloudflare)
```

## Install skill

Utamakan bagian **Installation** di tiap halaman koleksi — perintah dan cakupan bundle berbeda per koleksi.

### skills.sh (kebanyakan agent)

Arahkan ke repo skill **upstream** koleksi tersebut, contoh:

```bash
npx skills@latest add <owner/repo>
npx skills@latest add <owner/repo> --skill <name>
```

Jelajahi: https://skills.sh/

### Hermes Agent (bundle adaptasi di repo ini)

Bundle ada di `skills/<collection>/`. Gunakan bagian install di situs live atau [dokumentasi Hermes](https://hermes-agent.nousresearch.com/docs) untuk perintah `hermes skills` terkini (CLI berubah antar rilis).

## Struktur proyek

```text
messages/                 # sumber i18n (id, en)
project.inlang/           # proyek Paraglide (settings.json)
public/                   # aset statis, _headers, security.txt
skills/                   # satu subdirektori per koleksi adaptasi Hermes
src/routes/               # landing + route per-koleksi + deep link skill
src/data/                 # registry koleksi + record skill per-koleksi
src/features/             # shell bersama + UI per-koleksi
src/components/           # layout, helper install, shadcn/ui
```

Generated — jangan diedit manual: `src/routeTree.gen.ts`, `src/paraglide/*`.

Koleksi baru umumnya menambah: satu set record `src/data/*`, route di `src/routes/`, fitur di `src/features/`, opsional `skills/<name>/`, dan satu baris di `src/data/collections.ts`.

## Deployment

**Cloudflare Workers** static assets saja (`wrangler.jsonc`, tanpa Worker script).

```bash
npx wrangler login
npm run deploy
```

SPA fallback aktif agar deep link tetap jalan saat refresh. Header keamanan ada di [`public/_headers`](./public/_headers). Portabel ke host statis mana pun yang mendukung SPA fallback.

## Kontribusi

PR diterima untuk shell guide, koleksi baru, dan adaptasi Hermes.

1. Jaga diff tetap kecil dan **berbasis koleksi**.
2. Perubahan skill yang ikut di-ship dalam bundle: perbarui data guide koleksi tersebut **dan** `skills/<collection>/**/SKILL.md`.
3. Jaga key set `messages/id.json` dan `messages/en.json` tetap sinkron.
4. Jalankan `npm run lint && npm run build` sebelum membuka PR.
5. Tanpa secret, path absolut personal, atau lockfile ganda (`bun.lock`).
6. Pertahankan atribusi upstream (`ATTRIBUTION.md` / `UPSTREAM.md` saat koleksi punya pin).

Riwayat: [`CHANGELOG.md`](./CHANGELOG.md) ([Keep a Changelog](https://keepachangelog.com/)).

## Kredit & lisensi

Isi skill adalah milik **penulis upstream** tiap koleksi. Situs ini mengadaptasi dan mendokumentasikan; tidak mengklaim kepemilikan atas materi upstream.

Atribusi per-koleksi ada di sebelah tiap bundle (mis. `skills/*/ATTRIBUTION.md`). Selalu hormati lisensi upstream saat menggunakan ulang teks skill.

Kode situs © 2026 Stevanus Pangau — [MIT](./LICENSE).

## Keamanan

Laporkan kerentanan via [`public/.well-known/security.txt`](./public/.well-known/security.txt). Utamakan disclosure privat daripada issue publik untuk laporan sensitif.
