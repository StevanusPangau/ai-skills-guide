# AI Skills Guide

[![Live](https://img.shields.io/badge/live-skills.stevanuspangau.cloud-f97316)](https://skills.stevanuspangau.cloud)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

[English](./README.md) · **Bahasa Indonesia**

Referensi interaktif **multi-koleksi** untuk skill pengembangan software berbasis AI agent: koleksi per praktisi, workflow, konsep, dan bundle skill Hermes yang bisa langsung dipasang.

**Live:** https://skills.stevanuspangau.cloud

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

Ringkasan yang tersedia hari ini (jumlah/pin berubah seiring koleksi bertumbuh):

| Koleksi | Route | Upstream | Katalog | Bundle Hermes |
|---|---|---|---|---|
| Matt Pocock — AI Coding Skills | [`/mattpocock`](https://skills.stevanuspangau.cloud/mattpocock) | [mattpocock/skills](https://github.com/mattpocock/skills) `v1.1.0` | 22 | `skills/hermes/` (22) |
| Emil Kowalski — Design Engineering Skills | [`/emilkowalski`](https://skills.stevanuspangau.cloud/emilkowalski) | [emilkowalski/skills](https://github.com/emilkowalski/skills) pin `6bf24434…` | 6 | Upstream via skills.sh |
| David Ondrej — Personal Agent Skills | [`/davidondrej`](https://skills.stevanuspangau.cloud/davidondrej) | [davidondrej/skills](https://github.com/davidondrej/skills) pin `2f70c586…` | 28 (+ compat/risk) | `skills/davidondrej/` first-wave 9 |

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
