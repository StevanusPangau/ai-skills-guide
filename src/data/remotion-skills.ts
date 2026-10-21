import type { BilingualString, BilingualList } from '@/types/skill'

// Verified 2026-10-19 against remotion-dev/skills @ 039e8a2fc78b67efc228d5645367838b85818a1c
// (@remotion/skills package.json version 4.0.537). GitHub reports no license and there is no
// LICENSE file at this pin — do not claim MIT or any other license.

export const REMOTION_SOURCE_REPO = 'github.com/remotion-dev/skills'
export const REMOTION_SOURCE_SHA = '039e8a2fc78b67efc228d5645367838b85818a1c'
export const SOURCE_REPO = REMOTION_SOURCE_REPO
export const SOURCE_SHA = REMOTION_SOURCE_SHA

/** Category labels shared by the catalog filter chips and skill pages. */
export const REMOTION_CATEGORIES = [
  { label: 'Router', value: 'router' },
  { label: 'Project', value: 'project' },
  { label: 'Authoring', value: 'authoring' },
  { label: 'Preview & Render', value: 'preview-render' },
  { label: 'Product', value: 'product' },
]

export type RichSkill = {
  name: string
  category: string
  invocation: 'user' | 'model'
  description: BilingualString
  detailedDescription: BilingualString
  useWhen: BilingualList
  avoidWhen: BilingualList
  howItWorks: BilingualList
  coreRules: BilingualList
  tips: BilingualList
  pairsWellWith: string[]
  sourcePath: string
  spotlight?: {
    title: BilingualString
    body: BilingualString
  }
}

export const remotionSkills: RichSkill[] = [
  {
    name: 'remotion-best-practices',
    category: 'router',
    invocation: 'model',
    description: {
      id: 'Router resmi untuk semua skill Remotion: memilih skill mana yang harus dimuat saat membuat, mengedit, merender, atau meng-upgrade video.',
      en: 'Official router for every Remotion skill: decides which skill to load when creating, editing, rendering, or upgrading a video.',
    },
    detailedDescription: {
      id: 'Skill router yang mencakup seluruh skill Remotion lain. Saat pengguna meminta membuat video baru, tulis markup React Remotion, buka preview, render, caption, peta, multimedia Mediabunny, interaktivitas Studio, SaaS, dokumentasi API, atau upgrade, skill ini mengarahkan agent untuk memuat skill khusus yang relevan. Aturan utamanya: jangan merender video secara default — buka Studio dulu (`npx remotion studio`); `--no-open` hanya untuk agent dengan browser in-app, lalu buka URL yang dicetak. Render hanya jika permintaan sangat eksplisit (mis. "Render the video", "Export", "Give me the MP4"). Versi skill di frontmatter: 4.0.537.',
      en: 'Router skill that encompasses every other Remotion skill. When the user asks to create a new video, write Remotion React markup, open a preview, render, caption, map, use Mediabunny multimedia, Studio interactivity, SaaS, API docs, or upgrade, this skill steers the agent to load the matching specialist skill. Core rule: do not render a video by default — open Studio first (`npx remotion studio`); `--no-open` is for agents with an in-app browser, then open the printed URL. Render only when the ask is very explicit (e.g. "Render the video", "Export", "Give me the MP4"). Skill frontmatter version: 4.0.537.',
    },
    useWhen: {
      id: [
        'Belum jelas skill Remotion mana yang harus dimuat untuk permintaan saat ini.',
        'Pengguna meminta membuat, mengedit, merender, atau meng-upgrade proyek Remotion secara umum.',
        'Perlu keputusan apakah membuka Studio atau menjalankan render CLI.',
      ],
      en: [
        'It is unclear which Remotion skill should be loaded for the current request.',
        'The user asks generally to create, edit, render, or upgrade a Remotion project.',
        'You need to decide whether to open Studio or run a CLI render.',
      ],
    },
    avoidWhen: {
      id: [
        'Sudah jelas skill khusus yang dibutuhkan (mis. langsung `/remotion-markup` atau `/remotion-captions`).',
        'Tugas di luar ekosistem Remotion.',
      ],
      en: [
        'The needed specialist skill is already clear (e.g. `/remotion-markup` or `/remotion-captions` directly).',
        'Work outside the Remotion ecosystem.',
      ],
    },
    howItWorks: {
      id: [
        'Membaca permintaan pengguna dan memetakannya ke skill khusus (create, markup, maps, multimedia, interactivity, studio, render, captions, saas, docs, upgrade).',
        'Saat proyek sudah bisa dijalankan, memulai Studio dan membuka preview sebelum membangun atau mengedit composition.',
        'Menahan render CLI kecuali permintaan sangat eksplisit; menyarankan UI render di preview bila lebih intuitif.',
      ],
      en: [
        'Reads the user request and maps it to a specialist skill (create, markup, maps, multimedia, interactivity, studio, render, captions, saas, docs, upgrade).',
        'As soon as the project can run, starts Studio and opens the preview before building or editing the composition.',
        'Withholds CLI rendering unless the ask is very explicit; prefers the preview render UI when that is more intuitive.',
      ],
    },
    coreRules: {
      id: [
        'Jangan merender video secara default; buka Studio dulu dengan `npx remotion studio`.',
        'Untuk agent dengan browser in-app, boleh `npx remotion studio --no-open`, lalu buka URL yang dicetak dan verifikasi preview composition.',
        'Pertahankan perubahan pengguna di luar percakapan; jangan menimpa edit yang mengejutkan tanpa konfirmasi.',
      ],
      en: [
        'Do not render a video by default; open Studio first with `npx remotion studio`.',
        'For agents with an in-app browser, `npx remotion studio --no-open` is allowed, then open the printed URL and verify the composition preview.',
        'Preserve user changes made outside the conversation; do not overwrite surprising edits without confirmation.',
      ],
    },
    tips: {
      id: [
        'Kunjungi composition spesifik lewat `/[composition-id]`, misalnya `http://localhost:3000/MapAnimation`.',
        'Studio mendukung WebMCP tools.',
      ],
      en: [
        'Visit a specific composition via `/[composition-id]`, for example `http://localhost:3000/MapAnimation`.',
        'Studio supports WebMCP tools.',
      ],
    },
    pairsWellWith: [
      'remotion-create',
      'remotion-markup',
      'remotion-studio',
      'remotion-render',
      'remotion-docs',
    ],
    spotlight: {
      title: {
        id: 'Studio dulu, render belakangan',
        en: 'Studio first, render later',
      },
      body: {
        id: 'Permintaan "buat video" berarti preview interaktif, bukan MP4. Mulai `npx remotion studio` segera setelah proyek bisa dijalankan, biarkan tetap terbuka saat mengedit, dan baru jalankan `npx remotion render` jika pengguna secara eksplisit meminta export.',
        en: 'A "make a video" ask means an interactive preview, not an MP4. Start `npx remotion studio` as soon as the project can run, keep it open while editing, and only run `npx remotion render` when the user explicitly asks to export.',
      },
    },
    sourcePath: 'skills/remotion-best-practices/SKILL.md',
  },
  {
    name: 'remotion-create',
    category: 'project',
    invocation: 'user',
    description: {
      id: 'Scaffold proyek Remotion baru atau composition baru, lalu buka Studio sebelum menulis markup.',
      en: 'Scaffold a new Remotion project or composition, then open Studio before writing markup.',
    },
    detailedDescription: {
      id: 'Instruksi membuat proyek dan composition Remotion baru. Memeriksa folder saat ini (termasuk file tersembunyi), scaffold dengan `npx create-video@latest --yes --blank --no-tailwind` di folder kosong (setelah membersihkan hanya metadata OS seperti `.DS_Store`) atau ke subfolder jika folder berisi konten bermakna, lalu `npm i`. Segera setelah proyek bisa dijalankan, buka Remotion Studio sebelum menulis atau mengubah composition. Markup mengikuti Remotion Markup Best Practices dan aturan layout video; timeline klip mengikuti video editing; multi-scene mengikuti guidance multi-scene; interaktivitas mengikuti Remotion Interactivity. Tailwind hanya jika diminta lewat `tailwind.md`.',
      en: 'Instructions for creating a new Remotion project and composition. Inspects the current folder (including hidden files), scaffolds with `npx create-video@latest --yes --blank --no-tailwind` into an empty folder (after removing only disposable OS metadata such as `.DS_Store`) or into a subfolder when the folder has meaningful contents, then `npm i`. As soon as the project can run, open Remotion Studio before writing or changing the composition. Markup follows Remotion Markup Best Practices and video layout rules; clip timelines follow video editing; multi-scene videos follow multi-scene guidance; interactivity follows Remotion Interactivity. Tailwind only when requested via `tailwind.md`.',
    },
    useWhen: {
      id: [
        'Pengguna meminta membuat, scaffold, atau membangun video/composition Remotion baru.',
        'Belum ada proyek Remotion dan perlu `create-video`.',
        'Perlu membuka preview sebelum menulis scene.',
      ],
      en: [
        'The user asks to make, scaffold, or build a new Remotion video or composition.',
        'No Remotion project exists yet and `create-video` is needed.',
        'A preview should open before writing scenes.',
      ],
    },
    avoidWhen: {
      id: [
        'Proyek Remotion sudah ada dan tugasnya hanya mengedit markup (gunakan remotion-markup).',
        'Hanya butuh upgrade paket (gunakan remotion-upgrade).',
      ],
      en: [
        'A Remotion project already exists and the task is only editing markup (use remotion-markup).',
        'Only package upgrades are needed (use remotion-upgrade).',
      ],
    },
    howItWorks: {
      id: [
        'Memastikan Node.js dan Git terpasang, lalu memeriksa isi folder termasuk file tersembunyi.',
        'Scaffold blank tanpa Tailwind: di `.` jika kosong, atau ke subfolder `my-video` jika folder berisi konten bermakna; jangan anggap `.env` atau `.git` sebagai disposable.',
        'Menjalankan `npm i`, membuka Studio, lalu menambah React markup mengikuti skill markup/layout/compositions.',
      ],
      en: [
        'Ensures Node.js and Git are installed, then inspects folder contents including hidden files.',
        'Scaffolds a blank project without Tailwind: into `.` when empty, or into a `my-video` subfolder when meaningful contents exist; do not treat `.env` or `.git` as disposable.',
        'Runs `npm i`, opens Studio, then adds React markup following the markup/layout/compositions skills.',
      ],
    },
    coreRules: {
      id: [
        'Buka Studio segera setelah scaffold dan install, sebelum menulis composition.',
        '`create-video` menolak folder non-kosong — hapus hanya metadata OS disposable, bukan file bermakna.',
        'Setelah selesai, follow-up memakai remotion-best-practices.',
      ],
      en: [
        'Open Studio immediately after scaffolding and installing, before writing the composition.',
        '`create-video` rejects non-empty folders — remove only disposable OS metadata, not meaningful files.',
        'After finishing, follow-up prompts use remotion-best-practices.',
      ],
    },
    tips: {
      id: [
        'Untuk 1080px-wide: headline utama ~84px, supporting text penting ~44px; jaga safe area ~80px dari sisi dan ~100px dari atas/bawah.',
        'Jika video adalah timeline klip video/audio, beri setiap klip yang harus diedit mandiri node JSX-nya sendiri.',
      ],
      en: [
        'For 1080px-wide videos: main headline ~84px, important supporting text ~44px; keep a safe area ~80px from the sides and ~100px from top/bottom.',
        'If the video is a timeline of video/audio clips, give every independently editable clip its own authored JSX node.',
      ],
    },
    pairsWellWith: [
      'remotion-studio',
      'remotion-markup',
      'remotion-interactivity',
      'remotion-best-practices',
    ],
    sourcePath: 'skills/remotion-create/SKILL.md',
  },
  {
    name: 'remotion-docs',
    category: 'project',
    invocation: 'user',
    description: {
      id: 'Mencari dokumentasi Remotion lewat Algolia dan mengambil halaman sebagai Markdown dengan suffix `.md`.',
      en: 'Search Remotion documentation via Algolia and fetch pages as Markdown with the `.md` suffix.',
    },
    detailedDescription: {
      id: 'Skill untuk menemukan dan membaca dokumentasi Remotion terkini sebelum mengimplementasikan API. Mencari lewat Algolia Search API (index `remotion`), memilih URL relevan dari hasil, lalu mengambil sumber Markdown dengan menambahkan `.md` ke URL docs (mis. `https://www.remotion.dev/docs/use-video-config.md`). Alur kerja: search → pilih URL → fetch `.md` → implement berdasarkan docs terkini, bukan pengetahuan API yang dihafal.',
      en: 'Skill for discovering and reading current Remotion documentation before implementing APIs. Searches via the Algolia Search API (index `remotion`), picks relevant URLs from hits, then fetches Markdown sources by appending `.md` to docs URLs (e.g. `https://www.remotion.dev/docs/use-video-config.md`). Workflow: search → pick URL(s) → fetch `.md` → implement from current docs rather than memorized API knowledge.',
    },
    useWhen: {
      id: [
        'Perlu referensi API, props komponen, atau panduan paket Remotion terkini.',
        'Akan mengimplementasikan fitur seperti Lambda, Sequence, atau useVideoConfig dan ingin sumber docs resmi.',
      ],
      en: [
        'You need current Remotion API references, component props, or package guides.',
        'You are about to implement features such as Lambda, Sequence, or useVideoConfig and want official docs.',
      ],
    },
    avoidWhen: {
      id: [
        'Aturan praktik sudah cukup dari skill markup/studio/render tanpa lookup API.',
        'Topik di luar dokumentasi Remotion.',
      ],
      en: [
        'Practice rules from markup/studio/render skills already suffice without an API lookup.',
        'Topics outside Remotion documentation.',
      ],
    },
    howItWorks: {
      id: [
        'POST ke Algolia indexes/*/queries dengan indexName `remotion` dan query pencarian.',
        'Membaca field `url` dari setiap hit.',
        'Mengambil halaman dengan menambahkan `.md` ke URL untuk menghemat token.',
      ],
      en: [
        'POSTs to Algolia indexes/*/queries with indexName `remotion` and the search query.',
        'Reads the `url` field from each hit.',
        'Fetches each page by appending `.md` to the URL to save tokens.',
      ],
    },
    coreRules: {
      id: [
        'Implementasikan dari dokumentasi yang baru diambil, bukan dari API yang diingat.',
        'Jika skill ini tidak relevan, muat remotion-best-practices sebagai gantinya.',
      ],
      en: [
        'Implement from freshly fetched documentation, not from memorized APIs.',
        'If this skill is not relevant, load remotion-best-practices instead.',
      ],
    },
    tips: {
      id: [
        'Contoh URL Markdown: `https://www.remotion.dev/docs/sequence.md` dan `https://www.remotion.dev/docs/lambda/rendermediaonlambda.md`.',
        'Batasi `hitsPerPage` (mis. 10) dan ambil atribut hierarchy untuk memilah hasil.',
      ],
      en: [
        'Example Markdown URLs: `https://www.remotion.dev/docs/sequence.md` and `https://www.remotion.dev/docs/lambda/rendermediaonlambda.md`.',
        'Limit `hitsPerPage` (e.g. 10) and retrieve hierarchy attributes to triage hits.',
      ],
    },
    pairsWellWith: ['remotion-best-practices', 'remotion-saas', 'remotion-upgrade'],
    sourcePath: 'skills/remotion-docs/SKILL.md',
  },
  {
    name: 'remotion-upgrade',
    category: 'project',
    invocation: 'user',
    description: {
      id: 'Meng-upgrade Remotion, paket terkait, Mediabunny yang kompatibel, dan Remotion Agent Skills yang terpasang.',
      en: 'Upgrade Remotion, related packages, compatible Mediabunny packages, and installed Remotion Agent Skills.',
    },
    detailedDescription: {
      id: 'Skill upgrade resmi. Memeriksa manifest dan lockfile untuk package manager/workspaces. Jika `@remotion/cli` tersedia secara lokal, jalankan `npx remotion upgrade` (juga memperbarui skill Remotion lokal) dan lewati upgrade manual. Jika CLI tidak ada: ambil versi stabil terbaru dengan `npm view remotion version`, upgrade semua `remotion` dan `@remotion/*` ke versi exact yang sama, selaraskan paket auxiliar seperti `zod`, `mediabunny`, dan `@huggingface/transformers` dengan `npm view @remotion/studio@<version> dependencies`, lalu update lockfile. Tanpa CLI, update skill dengan `npx skills update remotion-best-practices remotion-captions remotion-create remotion-docs remotion-interactivity remotion-maps remotion-markup remotion-multimedia remotion-render remotion-saas remotion-studio remotion-upgrade --yes`. Verifikasi dengan diff dan opsional `npx remotion versions`.',
      en: 'Official upgrade skill. Inspects manifests and the lockfile for the package manager/workspaces. If `@remotion/cli` is locally available, run `npx remotion upgrade` (also updates local Remotion skills) and skip the manual path. Without the CLI: get the latest stable version via `npm view remotion version`, upgrade every `remotion` and `@remotion/*` dependency to that exact version, align auxiliaries such as `zod`, `mediabunny`, and `@huggingface/transformers` using `npm view @remotion/studio@<version> dependencies`, then refresh the lockfile. Without the CLI, update skills with `npx skills update remotion-best-practices remotion-captions remotion-create remotion-docs remotion-interactivity remotion-maps remotion-markup remotion-multimedia remotion-render remotion-saas remotion-studio remotion-upgrade --yes`. Verify via the diff and optionally `npx remotion versions`.',
    },
    useWhen: {
      id: [
        'Pengguna meminta upgrade Remotion atau paket `@remotion/*`.',
        'Perlu menyelaraskan Mediabunny / transformers dengan versi Studio target.',
        'Skill Remotion lokal perlu diperbarui bersama paket.',
      ],
      en: [
        'The user asks to upgrade Remotion or `@remotion/*` packages.',
        'Mediabunny / transformers need aligning with the target Studio version.',
        'Local Remotion skills should be updated alongside packages.',
      ],
    },
    avoidWhen: {
      id: [
        'Proyek baru yang belum punya dependensi Remotion (gunakan remotion-create).',
        'Hanya butuh lookup API tanpa mengubah versi (gunakan remotion-docs).',
      ],
      en: [
        'A brand-new project with no Remotion dependencies yet (use remotion-create).',
        'Only an API lookup is needed without changing versions (use remotion-docs).',
      ],
    },
    howItWorks: {
      id: [
        'Menginspeksi manifest/lockfile dan mempertahankan perubahan yang tidak terkait.',
        'Memilih jalur `npx remotion upgrade` bila CLI lokal ada; jika tidak, upgrade manual ke satu versi exact.',
        'Memperbarui skill terpasang dan mereview diff agar semua paket Remotion satu versi.',
      ],
      en: [
        'Inspects the manifest/lockfile and preserves unrelated changes.',
        'Chooses `npx remotion upgrade` when the local CLI exists; otherwise upgrades manually to one exact version.',
        'Updates installed skills and reviews the diff so all Remotion packages share one version.',
      ],
    },
    coreRules: {
      id: [
        'Semua paket `remotion` / `@remotion/*` harus memakai satu versi exact yang sama.',
        'Gunakan versi `mediabunny` dari dependencies `@remotion/studio` juga untuk `@mediabunny/*` yang terpasang.',
        'Pertahankan konvensi workspace/catalog proyek saat mengubah dependency sections.',
      ],
      en: [
        'Every `remotion` / `@remotion/*` package must share the same exact version.',
        'Use the `mediabunny` version from `@remotion/studio` dependencies for installed `@mediabunny/*` packages too.',
        'Preserve the project workspace/catalog conventions when editing dependency sections.',
      ],
    },
    tips: {
      id: [
        'Changelog ada di https://github.com/remotion-dev/remotion/releases untuk merangkum perubahan setelah upgrade.',
        'Jika CLI tersedia, `npx remotion versions` adalah cek tambahan yang berguna.',
      ],
      en: [
        'Changelogs live at https://github.com/remotion-dev/remotion/releases for summarizing changes after the upgrade.',
        'When the CLI is available, `npx remotion versions` is a useful extra check.',
      ],
    },
    pairsWellWith: ['remotion-docs', 'remotion-best-practices', 'remotion-create'],
    sourcePath: 'skills/remotion-upgrade/SKILL.md',
  },
  {
    name: 'remotion-markup',
    category: 'authoring',
    invocation: 'user',
    description: {
      id: 'Praktik terbaik menulis React markup Remotion: frame clock, interpolate, assets, media, effects, dan sequencing.',
      en: 'Best practices for writing Remotion React markup: frame clock, interpolate, assets, media, effects, and sequencing.',
    },
    detailedDescription: {
      id: 'Panduan menulis Remotion React Markup. Di dalam composition/scene, ambil `fps` dari `useVideoConfig()` untuk semua konversi detik-ke-frame termasuk `from`, `trimBefore`, dan `durationInFrames`, dan biarkan ekspresi di node JSX (mis. `trimBefore={4 * fps}`). Animasi digarap dengan `useCurrentFrame()` dan `interpolate()`; CSS `transition`/`animation` dan kelas animasi Tailwind tidak merender dengan benar dan harus direfaktor. Prefer properti CSS `scale`, `translate`, `rotate` daripada string `transform`; biarkan `interpolate()` inline di `style`; untuk `scale` gunakan `output: "perceptual-scale"`. Assets di `public/` dengan `staticFile()`. Video/Audio dari `@remotion/media`; gambar dengan `CanvasImage`; GIF/APNG/WebP/AVIF animasi dengan `AnimatedImage` (`@remotion/gif` jika bukan Chrome). Paket baru lewat `npx remotion add`. Buka Studio untuk cek visual.',
      en: 'Guidance for writing Remotion React Markup. Inside a composition or scene, take `fps` from `useVideoConfig()` for all seconds-to-frames math including `from`, `trimBefore`, and `durationInFrames`, and keep the expression on the JSX node (e.g. `trimBefore={4 * fps}`). Drive animation with `useCurrentFrame()` and `interpolate()`; CSS `transition`/`animation` and Tailwind animation classes do not render correctly and must be refactored. Prefer CSS `scale`, `translate`, `rotate` over a `transform` string; keep `interpolate()` inline in `style`; for `scale` use `output: "perceptual-scale"`. Assets live in `public/` via `staticFile()`. Video/Audio come from `@remotion/media`; images use `CanvasImage`; animated GIF/APNG/WebP/AVIF use `AnimatedImage` (`@remotion/gif` when not using Chrome). Add packages with `npx remotion add`. Open Studio for visual checks.',
    },
    useWhen: {
      id: [
        'Menulis atau merefaktor composition, animasi, layout, tipografi, media, atau efek Remotion.',
        'Perlu menempatkan assets, Video/Audio, gambar, atau GIF tersinkron timeline.',
        'Menerapkan effects built-in, color correction, sequencing, atau multi-scene.',
      ],
      en: [
        'Writing or refactoring Remotion compositions, animations, layout, typography, media, or effects.',
        'Placing assets, Video/Audio, images, or timeline-synced GIFs.',
        'Applying built-in effects, color correction, sequencing, or multi-scene structure.',
      ],
    },
    avoidWhen: {
      id: [
        'Hanya perlu membuka preview atau render tanpa mengubah markup (studio/render).',
        'Fokus utamanya struktur editable Studio / schema (gunakan remotion-interactivity).',
      ],
      en: [
        'Only opening preview or rendering without changing markup (studio/render).',
        'The main focus is Studio-editable structure / schema (use remotion-interactivity).',
      ],
    },
    howItWorks: {
      id: [
        'Mendorong animasi berbasis frame dengan `useCurrentFrame()` + `interpolate()` dan easing `Easing.bezier` / `Easing.spring`.',
        'Menjaga timing props berbasis `fps` langsung di JSX agar Studio bisa mengeditnya.',
        'Memilih komponen media/effects yang tepat dan membuka Studio (serta connected compositions) untuk verifikasi visual.',
      ],
      en: [
        'Drives frame-based animation with `useCurrentFrame()` + `interpolate()` and `Easing.bezier` / `Easing.spring`.',
        'Keeps fps-based timing props directly on JSX so Studio can edit them.',
        'Picks the right media/effects components and opens Studio (plus connected compositions) for visual verification.',
      ],
    },
    coreRules: {
      id: [
        'CSS transition, CSS animation, dan kelas animasi Tailwind tidak merender — tulis ulang dengan `interpolate()`.',
        'Prefer `scale` / `translate` / `rotate`; untuk scale set `output: \'perceptual-scale\'`; jangan ekstrak hasil interpolate ke variabel jika ingin tetap editable.',
        'Jangan menimpa perubahan pengguna di luar percakapan tanpa konfirmasi.',
      ],
      en: [
        'CSS transition, CSS animation, and Tailwind animation classes do not render — rewrite them with `interpolate()`.',
        'Prefer `scale` / `translate` / `rotate`; for scale set `output: \'perceptual-scale\'`; do not extract interpolate results into variables when they should stay editable.',
        'Do not overwrite user changes made outside the conversation without confirmation.',
      ],
    },
    tips: {
      id: [
        'Pasang paket dengan `npx remotion add @remotion/media` (juga untuk `@remotion/*`, `mediabunny`, `zod`, `@huggingface/transformers`).',
        'Ordinary HTML / `Interactive.*` / `AbsoluteFill` / `Sequence` tidak menerima `effects` langsung — bungkus dengan `HtmlInCanvas` bila perlu post-process.',
      ],
      en: [
        'Install packages with `npx remotion add @remotion/media` (also for `@remotion/*`, `mediabunny`, `zod`, `@huggingface/transformers`).',
        'Ordinary HTML / `Interactive.*` / `AbsoluteFill` / `Sequence` do not accept `effects` directly — wrap with `HtmlInCanvas` when post-processing is needed.',
      ],
    },
    pairsWellWith: [
      'remotion-interactivity',
      'remotion-maps',
      'remotion-captions',
      'remotion-multimedia',
      'remotion-studio',
    ],
    spotlight: {
      title: {
        id: 'Frame clock, bukan CSS animation',
        en: 'Frame clock, not CSS animation',
      },
      body: {
        id: 'Remotion merender frame demi frame. Opacity fade 2 detik ditulis `interpolate(frame, [0, 2 * fps], [0, 1], { extrapolateLeft: \'clamp\', extrapolateRight: \'clamp\' })` dengan `fps` dari `useVideoConfig()`. Transisi CSS dan kelas `animate-*` Tailwind tidak ikut ter-render ke video.',
        en: 'Remotion renders frame by frame. A 2-second opacity fade is `interpolate(frame, [0, 2 * fps], [0, 1], { extrapolateLeft: \'clamp\', extrapolateRight: \'clamp\' })` with `fps` from `useVideoConfig()`. CSS transitions and Tailwind `animate-*` classes do not render into the video.',
      },
    },
    sourcePath: 'skills/remotion-markup/SKILL.md',
  },
  {
    name: 'remotion-interactivity',
    category: 'authoring',
    invocation: 'user',
    description: {
      id: 'Menyusun markup Remotion agar elemen bisa dipilih, dipindah, di-trim, dan di-style secara interaktif di Studio.',
      en: 'Structure Remotion markup so elements can be selected, moved, trimmed, and styled interactively in Studio.',
    },
    detailedDescription: {
      id: 'Studio mengedit node JSX yang menjadi item timeline. Susun kode di sekitar unit yang harus bisa dipilih/dipindah/di-trim/di-style secara mandiri; nilai editable tetap inline. Schema field menentukan props yang bisa dibaca/diedit di call site (string, number, boolean, color, enum, array, asset, font-*, transform types, captions, hidden, dll.). Buat elemen interaktif dengan `Interactive.Div` (dan sibling); `Img` sudah interaktif. Teks tetap inline jika sekali pakai; beri `name` deskriptif hardcoded. Style harus objek plain inline — tanpa spread, konstanta, atau math di luar `interpolate()`. Animasi: `interpolate()` inline pada properti; input range boleh memakai `durationInFrames`/`fps`/`width`/`height` dari `useVideoConfig()`; untuk scale gunakan `output: \'perceptual-scale\'`. Metadata composition (`id`, `width`, `height`, `fps`, `durationInFrames`, `defaultProps`) tetap inline.',
      en: 'Studio edits the JSX nodes that become timeline items. Structure code around units the user should select/move/trim/style independently; keep editable values inline. Schema fields define props Studio can read/edit at the call site (string, number, boolean, color, enum, array, asset, font-*, transform types, captions, hidden, etc.). Make elements interactive with `Interactive.Div` (and siblings); `Img` is already interactive. Keep one-off text inline; give hardcoded descriptive `name`s. Styles must be plain inline objects — no spreading, constants, or math outside `interpolate()`. Animations: inline `interpolate()` on the property; input ranges may use `durationInFrames`/`fps`/`width`/`height` from `useVideoConfig()`; for scale use `output: \'perceptual-scale\'`. Composition metadata (`id`, `width`, `height`, `fps`, `durationInFrames`, `defaultProps`) stays inline.',
    },
    useWhen: {
      id: [
        'Elemen tidak bisa dipilih atau diedit seperti yang diharapkan di Studio.',
        'Perlu schema props, Interactive wrappers, atau keyframe editable.',
        'Menulis composition yang `defaultProps`-nya harus bisa disimpan balik ke kode.',
      ],
      en: [
        'Elements are not selectable or editable as expected in Studio.',
        'You need prop schemas, Interactive wrappers, or editable keyframes.',
        'Authoring a composition whose `defaultProps` should save back to code.',
      ],
    },
    avoidWhen: {
      id: [
        'Hanya butuh aturan animasi/media tanpa concern editability Studio (gunakan remotion-markup).',
        'Membangun aplikasi SaaS Player di luar Studio (gunakan remotion-saas).',
      ],
      en: [
        'You only need animation/media rules without Studio editability concerns (use remotion-markup).',
        'Building a SaaS Player app outside Studio (use remotion-saas).',
      ],
    },
    howItWorks: {
      id: [
        'Memilih editing units dan boundary track/timing sebelum menulis hierarki markup.',
        'Mengekspos content dan appearance per-instance lewat schema; `Interactive.create()` sudah menambah translate/scale/rotate/opacity.',
        'Menulis style dan `interpolate()` inline agar Studio bisa menstandardisasi dan men-keyframe nilai.',
      ],
      en: [
        'Chooses editing units and track/timing boundaries before writing the markup hierarchy.',
        'Exposes per-instance content and appearance via schema; `Interactive.create()` already adds translate/scale/rotate/opacity.',
        'Writes styles and `interpolate()` inline so Studio can standardize and keyframe values.',
      ],
    },
    coreRules: {
      id: [
        'Dilarang style non-inline, object spread, referensi konstanta, atau math di luar `interpolate()` pada style interaktif.',
        'Jangan menambah field schema untuk `style.translate` / `scale` / `rotate` / `transformOrigin` / `opacity` — sudah otomatis.',
        '`defaultProps` harus object literal inline pada `<Composition>` / `<Still>` tanpa type assertion.',
      ],
      en: [
        'No non-inline styles, object spreads, constant references, or math outside `interpolate()` on interactive styles.',
        'Do not add schema fields for `style.translate` / `scale` / `rotate` / `transformOrigin` / `opacity` — they are automatic.',
        '`defaultProps` must be an inline object literal on `<Composition>` / `<Still>` with no type assertions.',
      ],
    },
    tips: {
      id: [
        'Sebarkan fragment built-in: `Interactive.textSchema`, `backgroundSchema`, `borderRadiusSchema`, `borderSchema`, `captionsSchema`, `childrenSchema`.',
        'Path SVG editable: `Interactive.Path` + `interpolatePaths()` dari `@remotion/paths` (pasang dengan `bunx remotion add @remotion/paths`).',
      ],
      en: [
        'Spread built-in fragments: `Interactive.textSchema`, `backgroundSchema`, `borderRadiusSchema`, `borderSchema`, `captionsSchema`, `childrenSchema`.',
        'Editable SVG paths: `Interactive.Path` + `interpolatePaths()` from `@remotion/paths` (install with `bunx remotion add @remotion/paths`).',
      ],
    },
    pairsWellWith: ['remotion-markup', 'remotion-studio', 'remotion-create'],
    sourcePath: 'skills/remotion-interactivity/SKILL.md',
  },
  {
    name: 'remotion-maps',
    category: 'authoring',
    invocation: 'user',
    description: {
      id: 'Animasi peta di Remotion: pilih tepat satu teknik — static map, Mapbox, MapLibre, MapTiler, atau CesiumJS.',
      en: 'Map animations in Remotion: choose exactly one technique — static map, Mapbox, MapLibre, MapTiler, or CesiumJS.',
    },
    detailedDescription: {
      id: 'Skill peta Remotion. Pilih tepat satu teknik sesuai shot yang diinginkan, lalu muat hanya `TECHNIQUE.md` teknik itu — setiap direktori teknik mandiri. Static map: ambil citra satelit, pasang di `<Img>`, animasikan di atasnya. Mapbox: butuh API key, style bagus default, globe saat zoom out, bangunan 3D (mis. Eiffel). MapLibre: tanpa API key, gratis penuh, tanpa bangunan 3D. MapTiler: anotasi di atas fitur geografis (border, sungai, label). CesiumJS: flythrough terrain/gunung dengan perspektif "flight simulator".',
      en: 'Remotion maps skill. Choose exactly one technique for the intended shot, then load only that technique\'s `TECHNIQUE.md` — each technique directory is self-contained. Static map: grab a satellite image, mount it in `<Img>`, animate on top. Mapbox: needs an API key, nicer default styles, round globe when zoomed out, 3D buildings (e.g. Eiffel Tower). MapLibre: no API key, fully free, no 3D buildings. MapTiler: annotations on geographic features (borders, rivers, labels). CesiumJS: terrain/mountain flythroughs with a "flight simulator" perspective.',
    },
    useWhen: {
      id: [
        'Membuat animasi rute, marker, explainer geografis, atau flyover 3D.',
        'Memilih antara static map, Mapbox, MapLibre, MapTiler, atau CesiumJS.',
      ],
      en: [
        'Building route animations, markers, geographic explainers, or 3D flyovers.',
        'Choosing among static map, Mapbox, MapLibre, MapTiler, or CesiumJS.',
      ],
    },
    avoidWhen: {
      id: [
        'Video tanpa konten peta/geografis.',
        'Hanya butuh metadata multimedia file (gunakan remotion-multimedia).',
      ],
      en: [
        'Videos without map/geographic content.',
        'Only file multimedia metadata is needed (use remotion-multimedia).',
      ],
    },
    howItWorks: {
      id: [
        'Menentukan shot yang diinginkan lalu memilih tepat satu teknik.',
        'Memuat hanya `TECHNIQUE.md` teknik tersebut beserta referensi/assets-nya.',
        'Mengintegrasikan hasil ke composition Remotion bersama skill markup.',
      ],
      en: [
        'Determines the intended shot then picks exactly one technique.',
        'Loads only that technique\'s `TECHNIQUE.md` plus its references/assets.',
        'Integrates the result into a Remotion composition alongside the markup skill.',
      ],
    },
    coreRules: {
      id: [
        'Pilih tepat satu teknik — jangan mencampur directory teknik.',
        'Setiap teknik boleh dihapus tanpa merusak yang lain; muat hanya yang dipakai.',
      ],
      en: [
        'Choose exactly one technique — do not mix technique directories.',
        'Each technique may be removed without breaking the others; load only what you use.',
      ],
    },
    tips: {
      id: [
        'MapLibre cocok jika tidak ingin API key; Mapbox jika butuh globe/3D buildings default.',
        'CesiumJS untuk flythrough gunung; MapTiler bila anotasi border/sungai/label penting.',
      ],
      en: [
        'MapLibre fits when you want no API key; Mapbox when you need globe/default 3D buildings.',
        'CesiumJS for mountain flythroughs; MapTiler when border/river/label annotations matter.',
      ],
    },
    pairsWellWith: ['remotion-markup', 'remotion-best-practices', 'remotion-studio'],
    sourcePath: 'skills/remotion-maps/SKILL.md',
  },
  {
    name: 'remotion-multimedia',
    category: 'authoring',
    invocation: 'user',
    description: {
      id: 'Menangani multimedia di browser dengan Mediabunny: durasi audio, dimensi video, dan durasi video.',
      en: 'Browser multimedia with Mediabunny: audio duration, video dimensions, and video duration.',
    },
    detailedDescription: {
      id: 'Skill tentang Mediabunny untuk tugas multimedia di browser (bukan editor video umum). Ringkas kemampuan lewat https://mediabunny.dev/llms.txt. Panduan sibling: mendapatkan durasi audio (`input.computeDuration()` dengan `UrlSource` / `FilePathSource` / `BlobSource`), dimensi video (`getPrimaryVideoTrack()` → `displayWidth`/`displayHeight`), dan durasi video. Di Remotion, bungkus path `public/` dengan `staticFile()`. Di Node/Bun, pakai `FilePathSource` dan `input.dispose()` setelah selesai.',
      en: 'Skill about Mediabunny for browser multimedia tasks (not a general video editor). Compact capability overview at https://mediabunny.dev/llms.txt. Sibling guides cover audio duration (`input.computeDuration()` with `UrlSource` / `FilePathSource` / `BlobSource`), video dimensions (`getPrimaryVideoTrack()` → `displayWidth`/`displayHeight`), and video duration. In Remotion, wrap `public/` paths with `staticFile()`. In Node/Bun, use `FilePathSource` and call `input.dispose()` when done.',
    },
    useWhen: {
      id: [
        'Perlu durasi audio/video atau dimensi video dari file di browser, Node, atau Bun.',
        'Menghitung metadata sebelum `calculateMetadata` atau sequencing.',
      ],
      en: [
        'You need audio/video duration or video dimensions from a file in browser, Node, or Bun.',
        'Computing metadata before `calculateMetadata` or sequencing.',
      ],
    },
    avoidWhen: {
      id: [
        'Editing timeline video umum atau efek visual (gunakan remotion-markup).',
        'Transcribe captions (gunakan remotion-captions).',
      ],
      en: [
        'General video timeline editing or visual effects (use remotion-markup).',
        'Transcribing captions (use remotion-captions).',
      ],
    },
    howItWorks: {
      id: [
        'Membuat `Input` Mediabunny dengan `ALL_FORMATS` dan source yang sesuai (URL, path, atau Blob).',
        'Memanggil `computeDuration()` atau membaca track video primer untuk dimensi display.',
        'Mengembalikan angka detik atau `{ width, height }` untuk dipakai composition.',
      ],
      en: [
        'Creates a Mediabunny `Input` with `ALL_FORMATS` and the matching source (URL, path, or Blob).',
        'Calls `computeDuration()` or reads the primary video track for display dimensions.',
        'Returns seconds or `{ width, height }` for composition use.',
      ],
    },
    coreRules: {
      id: [
        'Ini skill metadata Mediabunny — bukan pengganti markup/render Remotion.',
        'Untuk file di `public/`, selalu `staticFile(...)` sebelum dioper ke helper.',
      ],
      en: [
        'This is a Mediabunny metadata skill — not a substitute for Remotion markup/render.',
        'For files in `public/`, always `staticFile(...)` before passing into helpers.',
      ],
    },
    tips: {
      id: [
        'File dari `<input type="file">` / drag-drop: pakai `BlobSource`.',
        'Overview kemampuan: https://mediabunny.dev/llms.txt',
      ],
      en: [
        'Files from `<input type="file">` / drag-drop: use `BlobSource`.',
        'Capability overview: https://mediabunny.dev/llms.txt',
      ],
    },
    pairsWellWith: ['remotion-markup', 'remotion-captions', 'remotion-create'],
    sourcePath: 'skills/remotion-multimedia/SKILL.md',
  },
  {
    name: 'remotion-captions',
    category: 'authoring',
    invocation: 'user',
    description: {
      id: 'Transkripsi, tampilan, dan import caption Remotion dalam tipe `Caption` JSON (`@remotion/captions`).',
      en: 'Remotion caption transcription, display, and import using the `Caption` JSON type (`@remotion/captions`).',
    },
    detailedDescription: {
      id: 'Semua caption diproses sebagai JSON bertipe `Caption` dari `@remotion/captions` (`text`, `startMs`, `endMs`, `timestampMs`, `confidence`, opsional `pageBreakAfter`). Generate: `@remotion/whisper-webgpu` + Mediabunny untuk decode waveform 16kHz mono; model default English `small.en`; bahasa lain pakai model multilingual (mis. `small`) dengan opsi `language` — deteksi otomatis tidak didukung. Display: pasang `@remotion/captions`, salin elemen Basic Captions, inline array `captions` pada prop (bukan variabel) agar Caption editor bisa write-back; jaga video+caption dalam `<Sequence>` / `TransitionSeries.Sequence` yang sama dengan `trimBefore`/`durationInFrames`/`playbackRate` di parent bersama. Import `.srt` lewat `parseSrt()`. Setelah selesai, muat remotion-best-practices dan buka Studio.',
      en: 'All captions are processed as JSON using the `Caption` type from `@remotion/captions` (`text`, `startMs`, `endMs`, `timestampMs`, `confidence`, optional `pageBreakAfter`). Generate: `@remotion/whisper-webgpu` plus Mediabunny to decode a 16kHz mono waveform; default English model `small.en`; other languages use a multilingual model (e.g. `small`) with a `language` option — automatic language detection is unsupported. Display: install `@remotion/captions`, copy the Basic Captions element, inline the `captions` array on the prop (not a variable) so the Caption editor can write back; keep video+captions in the same `<Sequence>` / `TransitionSeries.Sequence` with `trimBefore`/`durationInFrames`/`playbackRate` on the shared parent. Import `.srt` via `parseSrt()`. Afterwards, load remotion-best-practices and open Studio.',
    },
    useWhen: {
      id: [
        'Menghasilkan subtitle dari audio/video, menampilkannya, atau mengimpor file `.srt`.',
        'Menyusun caption agar ikut trim/speed clip di timeline.',
      ],
      en: [
        'Generating subtitles from audio/video, displaying them, or importing a `.srt` file.',
        'Structuring captions so they follow clip trim/speed on the timeline.',
      ],
    },
    avoidWhen: {
      id: [
        'Hanya butuh durasi/dimensi file tanpa caption (gunakan remotion-multimedia).',
        'Tidak ada kebutuhan subtitle/caption.',
      ],
      en: [
        'Only file duration/dimensions are needed without captions (use remotion-multimedia).',
        'No subtitle/caption work is required.',
      ],
    },
    howItWorks: {
      id: [
        'Transcribe per file sumber; timestamp relatif ke awal file sumber (termasuk bagian yang di-trim).',
        'Menulis `Caption[]` ke JSON lalu meng-inline-kannya ke prop `captions` Basic Captions.',
        'Untuk `.srt`: `fetch(staticFile(...))` + `parseSrt({ input: text })`.',
      ],
      en: [
        'Transcribes each source file; timestamps stay relative to that source file start (including trimmed portions).',
        'Writes `Caption[]` to JSON then inlines it into the Basic Captions `captions` prop.',
        'For `.srt`: `fetch(staticFile(...))` + `parseSrt({ input: text })`.',
      ],
    },
    coreRules: {
      id: [
        'Jangan flatten banyak transcript menjadi timestamp composition-wide; jangan menambah composition offset saat transcribe.',
        '`captions={captions}` lewat variabel menghilangkan array sumber untuk Caption editor — inline literal.',
        'GPU kompatibel diperlukan untuk Whisper WebGPU; ONNX Runtime tidak bekerja di Linux arm64.',
      ],
      en: [
        'Do not flatten multiple transcripts into composition-wide timestamps; do not add composition offsets while transcribing.',
        'Passing `captions={captions}` via a variable leaves no source array for the Caption editor — inline the literal.',
        'A compatible GPU is required for Whisper WebGPU; ONNX Runtime does not work on Linux arm64.',
      ],
    },
    tips: {
      id: [
        'Pasang paket dengan `npx remotion add @remotion/whisper-webgpu @huggingface/transformers mediabunny @mediabunny/server` dan `@remotion/captions`.',
        'Di browser, pakai `resampleTo16Khz({ file })` alih-alih pipeline Mediabunny Node.',
      ],
      en: [
        'Install with `npx remotion add @remotion/whisper-webgpu @huggingface/transformers mediabunny @mediabunny/server` and `@remotion/captions`.',
        'In the browser, use `resampleTo16Khz({ file })` instead of the Node Mediabunny pipeline.',
      ],
    },
    pairsWellWith: [
      'remotion-markup',
      'remotion-multimedia',
      'remotion-studio',
      'remotion-best-practices',
    ],
    sourcePath: 'skills/remotion-captions/SKILL.md',
  },
  {
    name: 'remotion-studio',
    category: 'preview-render',
    invocation: 'user',
    description: {
      id: 'Menjalankan Remotion Studio untuk preview interaktif sebelum dan selama mengedit composition.',
      en: 'Run Remotion Studio for an interactive preview before and while editing a composition.',
    },
    detailedDescription: {
      id: 'Saat membuat atau mengedit video, mulai Studio dan buka preview segera setelah proyek bisa dijalankan, sebelum membangun composition; biarkan tetap terbuka. Di Cursor, jalankan tanpa `--no-open` agar browser terbuka otomatis: `npx remotion studio`. Di agent lain dengan browser in-app, boleh `npx remotion studio --no-open`, lalu buka URL yang dicetak dan verifikasi Studio serta preview composition. Jika Studio sudah terbuka, URL dicetak dan perintah exit; jika belum, proses long-running dimulai. Flag berguna: `--log=<level>`, `--port=<number>`, `--force-new`.',
      en: 'When creating or editing a video, start Studio and open its preview as soon as the project can run, before building the composition; keep it open. In Cursor, run without `--no-open` so the browser opens automatically: `npx remotion studio`. In other agents with an in-app browser, `npx remotion studio --no-open` is fine, then open the printed URL and verify Studio plus the composition preview. If Studio is already open, the URL is printed and the command exits; otherwise a long-running process starts. Useful flags: `--log=<level>`, `--port=<number>`, `--force-new`.',
    },
    useWhen: {
      id: [
        'Perlu preview visual saat membuat atau mengedit video.',
        'Agent harus membuka atau me-refocus Studio di browser / in-app browser.',
      ],
      en: [
        'A visual preview is needed while creating or editing a video.',
        'The agent must open or refocus Studio in the browser / in-app browser.',
      ],
    },
    avoidWhen: {
      id: [
        'Pengguna secara eksplisit hanya meminta file render/export (gunakan remotion-render).',
        'Proyek belum bisa dijalankan sama sekali (selesaikan create/install dulu).',
      ],
      en: [
        'The user explicitly only wants a rendered/exported file (use remotion-render).',
        'The project cannot run at all yet (finish create/install first).',
      ],
    },
    howItWorks: {
      id: [
        'Menjalankan `npx remotion studio` (atau dengan `--no-open` bila browser in-app akan dipakai).',
        'Membaca URL yang dicetak; membuka/memverifikasi preview composition.',
        'Menjaga proses tetap hidup selama sesi edit.',
      ],
      en: [
        'Runs `npx remotion studio` (or with `--no-open` when an in-app browser will be used).',
        'Reads the printed URL; opens/verifies the composition preview.',
        'Keeps the process alive for the edit session.',
      ],
    },
    coreRules: {
      id: [
        'Jangan memakai `--no-open` jika URL tidak bisa dibuka di in-app browser.',
        'Buka Studio sebelum membangun composition, bukan setelah selesai.',
      ],
      en: [
        'Do not use `--no-open` if the URL cannot be opened in the in-app browser.',
        'Open Studio before building the composition, not after finishing.',
      ],
    },
    tips: {
      id: [
        '`--force-new` memulai instance Studio lain meski satu sudah berjalan untuk proyek/port yang sama.',
        '`--port` meminta port tertentu; tanpa itu Remotion mencari port bebas.',
      ],
      en: [
        '`--force-new` starts another Studio instance even when one is already running for the same project/port.',
        '`--port` requests a specific port; otherwise Remotion finds a free one.',
      ],
    },
    pairsWellWith: ['remotion-create', 'remotion-markup', 'remotion-render'],
    sourcePath: 'skills/remotion-studio/SKILL.md',
  },
  {
    name: 'remotion-render',
    category: 'preview-render',
    invocation: 'user',
    description: {
      id: 'Menjalankan render video atau still lewat CLI Remotion, termasuk opsi frame dan video transparan.',
      en: 'Invoke Remotion CLI renders for videos or stills, including frame ranges and transparent outputs.',
    },
    detailedDescription: {
      id: 'Strategi render: `npx remotion render` untuk video (opsi lengkap di docs CLI render) dan `npx remotion still` untuk still. Untuk beberapa frame sebagai gambar dalam satu panggilan: `npx remotion render [composition-id] out/frames --frames=0,30,90 --image-format=png`. Video transparan: ProRes (`--image-format=png --pixel-format=yuva444p10le --codec=prores --prores-profile=4444`) untuk NLE, atau WebM VP9 (`--pixel-format=yuva420p --codec=vp9`) untuk browser; bisa juga lewat `Config` di `remotion.config.ts` atau `calculateMetadata` defaults.',
      en: 'Render strategy: `npx remotion render` for video (full options in the CLI render docs) and `npx remotion still` for stills. To render several frames as images in one call: `npx remotion render [composition-id] out/frames --frames=0,30,90 --image-format=png`. Transparent video: ProRes (`--image-format=png --pixel-format=yuva444p10le --codec=prores --prores-profile=4444`) for NLEs, or WebM VP9 (`--pixel-format=yuva420p --codec=vp9`) for browsers; also configurable via `Config` in `remotion.config.ts` or `calculateMetadata` defaults.',
    },
    useWhen: {
      id: [
        'Pengguna secara eksplisit meminta render, export, atau MP4/still.',
        'Perlu mengekspor frame tertentu sebagai PNG atau output transparan.',
      ],
      en: [
        'The user explicitly asks to render, export, or produce an MP4/still.',
        'Exporting specific frames as PNGs or a transparent output is required.',
      ],
    },
    avoidWhen: {
      id: [
        'Pengguna hanya bilang "buat video" tanpa meminta export — buka Studio dulu.',
        'Render programatik di SaaS/Lambda (lihat remotion-saas).',
      ],
      en: [
        'The user only says "make a video" without asking to export — open Studio first.',
        'Programmatic SaaS/Lambda rendering (see remotion-saas).',
      ],
    },
    howItWorks: {
      id: [
        'Memilih `render` vs `still` vs `--frames` sesuai keluaran yang diminta.',
        'Menyetel codec/pixel-format untuk transparansi bila diperlukan.',
        'Menulis output ke path yang diminta pengguna.',
      ],
      en: [
        'Chooses `render` vs `still` vs `--frames` for the requested output.',
        'Sets codec/pixel-format for transparency when needed.',
        'Writes output to the path the user requested.',
      ],
    },
    coreRules: {
      id: [
        'Hanya render jika permintaan sangat eksplisit; preview punya UI render yang lebih intuitif.',
        'Ikuti flag resmi docs CLI — jangan mengarang flag.',
      ],
      en: [
        'Render only when the ask is very explicit; the preview has a more intuitive render UI.',
        'Follow official CLI docs flags — do not invent flags.',
      ],
    },
    tips: {
      id: [
        'ProRes 4444 cocok untuk impor ke software editing; VP9 WebM untuk playback browser.',
        'Setelah mengubah default di `remotion.config.ts`, restart Studio.',
      ],
      en: [
        'ProRes 4444 suits importing into editing software; VP9 WebM suits browser playback.',
        'After changing defaults in `remotion.config.ts`, restart Studio.',
      ],
    },
    pairsWellWith: ['remotion-studio', 'remotion-saas', 'remotion-best-practices'],
    sourcePath: 'skills/remotion-render/SKILL.md',
  },
  {
    name: 'remotion-saas',
    category: 'product',
    invocation: 'user',
    description: {
      id: 'Membangun aplikasi berbasis Remotion: template framework, `<Player>`, dan pilihan render (Lambda, Vercel, Node, Cloudflare).',
      en: 'Build Remotion-powered apps: framework templates, `<Player>`, and render options (Lambda, Vercel, Node, Cloudflare).',
    },
    detailedDescription: {
      id: 'Remotion bisa dipakai untuk form sederhana yang terhubung ke render hingga video editor kompleks. Pilih template/framework: Next.js (Lambda default), Vercel Sandbox template, React Router 7 (Lambda default), Express render server (Node). Sematkan preview dengan `<Player>` dari `@remotion/player` (`component`, `durationInFrames`, `compositionWidth`/`Height`, `fps`, `controls`). Rendering programatik: bandingkan opsi SSR; Node APIs untuk server long-running; Remotion Lambda sebagai jalur tercepat/scalable (`npx remotion add @remotion/lambda`, setup role/credentials `.env`, deploy function+site, cek quotas); Vercel Sandbox jika deploy ke Vercel; GitHub Actions / Azure / Cloudflare Containers hanya jika diminta. Juga ada panduan Vue, Angular, dan Svelte di docs Remotion.',
      en: 'Remotion can power anything from a simple form hooked to a render to a complex video editor. Choose a template/framework: Next.js (Lambda default), Vercel Sandbox template, React Router 7 (Lambda default), Express render server (Node). Embed previews with `<Player>` from `@remotion/player` (`component`, `durationInFrames`, `compositionWidth`/`Height`, `fps`, `controls`). Programmatic rendering: compare SSR options; Node APIs for long-running servers; Remotion Lambda as the fastest/scalable path (`npx remotion add @remotion/lambda`, set up roles/credentials in `.env`, deploy function+site, check quotas); Vercel Sandbox when deploying to Vercel; GitHub Actions / Azure / Cloudflare Containers only when requested. Vue, Angular, and Svelte guides also exist in Remotion docs.',
    },
    useWhen: {
      id: [
        'Membangun produk/SaaS yang merender video Remotion atau menyematkan Player.',
        'Memilih template Next.js, React Router, Vercel, atau Express render server.',
        'Mengintegrasikan Remotion ke Vue, Angular, atau Svelte.',
      ],
      en: [
        'Building a product/SaaS that renders Remotion videos or embeds the Player.',
        'Choosing a Next.js, React Router, Vercel, or Express render-server template.',
        'Integrating Remotion into Vue, Angular, or Svelte.',
      ],
    },
    avoidWhen: {
      id: [
        'Satu kali export lokal dari proyek Studio (gunakan remotion-render / remotion-studio).',
        'Hanya menulis composition tanpa lapisan aplikasi.',
      ],
      en: [
        'One-off local exports from a Studio project (use remotion-render / remotion-studio).',
        'Only writing a composition without an application layer.',
      ],
    },
    howItWorks: {
      id: [
        'Memilih template/framework atau brownfield installation sesuai stack pengguna.',
        'Menyematkan `<Player>` untuk preview interaktif di React.',
        'Memilih jalur render (Lambda, Vercel, Node, dll.) dan mengikuti checklist setup docs.',
      ],
      en: [
        'Picks a template/framework or brownfield installation for the user\'s stack.',
        'Embeds `<Player>` for interactive React previews.',
        'Chooses a render path (Lambda, Vercel, Node, etc.) and follows the docs setup checklist.',
      ],
    },
    coreRules: {
      id: [
        'Jangan minta pengguna menempel rahasia AWS ke chat; simpan di `.env` (`REMOTION_AWS_ACCESS_KEY_ID` / `REMOTION_AWS_SECRET_ACCESS_KEY`).',
        'Function Lambda terikat versi Remotion — redeploy setelah upgrade; redeploy site setelah mengubah source.',
        'Untuk one-off renders, `npx remotion render` atau Studio lebih cocok daripada SSR.',
      ],
      en: [
        'Never ask the user to paste AWS secrets into chat; store them in `.env` (`REMOTION_AWS_ACCESS_KEY_ID` / `REMOTION_AWS_SECRET_ACCESS_KEY`).',
        'Lambda functions are bound to the Remotion version — redeploy after upgrades; redeploy the site after source changes.',
        'For one-off renders, `npx remotion render` or Studio suits better than SSR.',
      ],
    },
    tips: {
      id: [
        'Jika metadata dinamis, selaraskan props Player secara manual atau pakai ulang logika `calculateMetadata()` composition.',
        'Sebelum production Lambda: rate limiting, auth, cost controls, privacy output, cleanup, dan reporting error/progress.',
      ],
      en: [
        'When metadata is dynamic, sync Player props manually or reuse the composition\'s `calculateMetadata()` logic.',
        'Before Lambda production: rate limiting, auth, cost controls, output privacy, cleanup, and progress/error reporting.',
      ],
    },
    pairsWellWith: ['remotion-render', 'remotion-docs', 'remotion-create'],
    spotlight: {
      title: {
        id: 'Player + jalur render',
        en: 'Player + render path',
      },
      body: {
        id: 'SaaS Remotion biasanya menyematkan `@remotion/player` untuk preview di app React, lalu memilih backend render (sering Lambda atau Vercel Sandbox) lewat template resmi. Satu kali `npx remotion render` lokal bukan arsitektur produk.',
        en: 'Remotion SaaS apps typically embed `@remotion/player` for in-app React previews, then pick a render backend (often Lambda or Vercel Sandbox) via official templates. A local one-off `npx remotion render` is not a product architecture.',
      },
    },
    sourcePath: 'skills/remotion-saas/SKILL.md',
  },
]
