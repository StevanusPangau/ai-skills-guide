import type { BilingualString, BilingualList } from '@/types/skill'

// Verified against pbakaus/impeccable @ dea6cff23c21791a471d87da120f8ae13e6261a7
// (2026-10-05; skill release 4.5.0, package 4.1.0; Apache-2.0). Checked 2026-10-05.
// Upstream ships ONE user-invocable skill, `impeccable` (skill/SKILL.src.md), invoked as
// `/impeccable <command> [target]`. Each record below is a COMMAND of that skill (24 commands
// from the upstream Commands table, plus the `doctor` maintenance verb), not a separate skill.
// Categories follow the upstream table: build, evaluate, refine, enhance, fix, iterate
// (+ maintenance for doctor). sourcePath points at the command's reference playbook.
export const IMPECCABLE_SOURCE_REPO = 'github.com/pbakaus/impeccable'
export const IMPECCABLE_SOURCE_SHA = 'dea6cff23c21791a471d87da120f8ae13e6261a7'
export const SOURCE_REPO = IMPECCABLE_SOURCE_REPO
export const SOURCE_SHA = IMPECCABLE_SOURCE_SHA
/** The single upstream skill name that every command below belongs to. */
export const IMPECCABLE_SKILL_NAME = 'impeccable'
/** Upstream path of the one real SKILL file. */
export const IMPECCABLE_SKILL_PATH = 'skill/SKILL.src.md'

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

export const impeccableSkills: RichSkill[] = [
  {
    name: 'craft',
    category: 'build',
    invocation: 'user',
    description: {
      id: 'Alias deprecated untuk permintaan biasa membuat tampilan baru. Tidak menambah setup, wawancara, atau perilaku apa pun: permintaan seperti "buat fitur ini" atau "redesign layar ini" memakai alur yang sama.',
      en: 'A deprecated alias for an ordinary request to make new visual work. It adds no setup, interview or behavior: natural requests like "build this feature" or "redesign this screen" use the same flow.',
    },
    detailedDescription: {
      id: '`/impeccable craft [feature]` hanya alias kompatibilitas. Routing normal SKILL.md berlaku: PRODUCT.md yang belum ada dibuat lewat `init`, lalu alur new-work menentukan otoritas visual, dunia visual dan konsep, implementasi, dan penutup. Pengguna tidak perlu diberi tahu bahwa mereka harus memanggil `craft`. README upstream masih menyebutnya sebagai alur "shape-then-build".',
      en: '`/impeccable craft [feature]` is only a compatibility alias. SKILL.md\'s normal routing applies: a missing PRODUCT.md is created through `init`, then the new-work flow decides visual authority, world and concept, implementation and finish. Users should not be told they must invoke `craft`. The upstream README still describes it as the "shape-then-build" flow.',
    },
    useWhen: {
      id: [
        'Anda sudah terbiasa dengan `/impeccable craft` dan ingin membangun fitur atau halaman baru.',
        'Kata kunci lama di dokumentasi atau skrip tim masih memakai `craft`.',
      ],
      en: [
        'You are used to `/impeccable craft` and want to build a new feature or page.',
        'Older docs or team scripts still use `craft`.',
      ],
    },
    avoidWhen: {
      id: [
        'Mengharapkan perilaku khusus: alias ini tidak punya setup, checkpoint, tool, atau aturan kualitas sendiri.',
        'Merencanakan UX sebelum kode — gunakan `shape`.',
      ],
      en: [
        'Expecting special behavior: the alias has no setup, checkpoint, tool or quality behavior of its own.',
        'Planning UX before code — use `shape`.',
      ],
    },
    howItWorks: {
      id: [
        'Permintaan diperlakukan sebagai pekerjaan visual baru biasa dengan routing SKILL.md.',
        'PRODUCT.md yang belum ada dibuat lewat `init`; lalu `new-work.md` memilih visual authority, world, dan konsep.',
        'Implementasi dan penutup mengikuti craft floor dan verifikasi terbatas (batched).',
      ],
      en: [
        'The request is treated as ordinary new visual work under SKILL.md routing.',
        'A missing PRODUCT.md is created through `init`; then `new-work.md` decides visual authority, world and concept.',
        'Implementation and finish follow the craft floor and bounded (batched) verification.',
      ],
    },
    coreRules: {
      id: [
        'Jangan memberi tahu pengguna bahwa mereka harus memanggil `craft`.',
        'Tidak menambah setup, wawancara, checkpoint, tool, atau perilaku kualitas apa pun.',
      ],
      en: [
        'Do not tell users they need to invoke `craft`.',
        'It adds no setup, interview, checkpoint, tool or quality behavior.',
      ],
    },
    tips: {
      id: [
        'Permintaan alami ("buat landing page", "redesign hero") sudah cukup — tanpa kata `craft`.',
        'Perintah `teach` juga alias, untuk `init`.',
      ],
      en: [
        'Natural requests ("make a landing page", "redo this hero") are enough — no `craft` keyword needed.',
        '`teach` is also an alias, for `init`.',
      ],
    },
    pairsWellWith: ['shape', 'init'],
    spotlight: {
      title: {
        id: 'Alias, Bukan Fitur',
        en: 'An Alias, Not a Feature',
      },
      body: {
        id: 'Satu-satunya tugas `craft` adalah kompatibilitas: ia menunjuk ke alur new-work biasa. Tabel perintah upstream menandainya "Deprecated alias for an ordinary new-work request".',
        en: 'The only job of `craft` is compatibility: it points at the ordinary new-work flow. The upstream command table marks it "Deprecated alias for an ordinary new-work request".',
      },
    },
    sourcePath: 'skill/reference/craft.md',
  },
  {
    name: 'shape',
    category: 'build',
    invocation: 'user',
    description: {
      id: 'Rencanakan UX dan UI sebelum kode: wawancara discovery multi-ronde yang wajib, probe visual bila tersedia, lalu brief desain yang dikonfirmasi pengguna.',
      en: 'Plan UX and UI before code: a required multi-round discovery interview, visual probes when available, and a user-confirmed design brief.',
    },
    detailedDescription: {
      id: '`/impeccable shape [feature]` menemukan apa yang harus dibuat dan bagaimana cara kerjanya, lalu mengembalikan brief tanpa kode. Fase 1: wawancara (ronde 1 tentang tujuan, orang, dan hasil; ronde 2 hanya untuk keputusan material: konten, state, fidelity, batasan). Fase 2: arah desain lewat new-work bila permukaan baru. Fase 3: brief terkecil yang berguna (job & audience, outcome & proof, arah terpilih, scope, state & rentang, interaksi & layout, constraint). Shape tidak pernah menulis kode.',
      en: '`/impeccable shape [feature]` discovers what should be made and how it should work, then returns a brief without code. Phase 1: interview (round 1 on purpose, people and outcome; round 2 only for material decisions: content, states, fidelity, constraints). Phase 2: design direction via new-work for new surfaces. Phase 3: the smallest useful brief (job & audience, outcome & proof, selected direction, scope, states & ranges, interaction & layout, constraints). Shape never writes code.',
    },
    useWhen: {
      id: [
        'Fitur atau layar baru yang belum jelas bentuknya dan perlu direncanakan dulu.',
        'Ingin brief yang dikonfirmasi sebelum implementasi dimulai.',
      ],
      en: [
        'A new feature or screen whose shape is unclear and needs planning first.',
        'Wanting a confirmed brief before implementation starts.',
      ],
    },
    avoidWhen: {
      id: [
        'Perubahan kecil pada UI yang sudah ada — langsung gunakan command refinement yang sesuai.',
        'Meminta nilai CSS atau "jalur estetika" kalengan: new-work yang memegang pilihan dunia visual dan konsep.',
      ],
      en: [
        'Small changes to existing UI — go straight to the matching refinement command.',
        'Asking for CSS values or canned aesthetic lanes: new-work owns the visual-world and concept choices.',
      ],
    },
    howItWorks: {
      id: [
        'Wawancara: dua-tiga pertanyaan terkait per ronde, satu ronde default; prompt yang jarang butuh minimal satu ronde jawaban.',
        'Untuk permukaan baru atau ekspansi brand, ikuti new-work (visual authority, world workshop, pilihan konsep) lalu kembali sebelum kontrak dan implementasi.',
        'Tulis brief dan minta konfirmasi eksplisit atau satu ronde koreksi, lalu berhenti.',
      ],
      en: [
        'Interview: two or three related questions per round, one round by default; a sparse prompt needs at least one answer round.',
        'For new surfaces or brand expansion, follow new-work (visual authority, world workshop, concept choice) and return before the contract and implementation.',
        'Write the brief and ask for explicit confirmation or one correction round, then stop.',
      ],
    },
    coreRules: {
      id: [
        'Jangan menulis kode atau memilih arah visual pada Fase 1.',
        'Jangan membuang pertanyaan sebagai kuesioner, mengulang fakta yang sudah pasti, atau mengubah fakta jelas menjadi menu.',
        'Tanpa manusia atau mekanisme jawaban, tandai asumsi dengan jelas, kembalikan brief, dan berhenti.',
      ],
      en: [
        'Do not write code or choose visual direction in Phase 1.',
        'Never dump a questionnaire, repeat settled facts, or turn obvious facts into menus.',
        'With no human or answer mechanism, mark assumptions plainly, return the brief, and stop.',
      ],
    },
    tips: {
      id: [
        'Brief tugas yang sudah jelas cukup tiga sampai lima poin; struktur penuh hanya untuk perencanaan ambigu atau multi-layar.',
        'Contoh: `/impeccable shape checkout redesign`.',
      ],
      en: [
        'A settled task needs only three to five bullets; use the full structure only for ambiguous or multi-screen planning.',
        'Example: `/impeccable shape checkout redesign`.',
      ],
    },
    pairsWellWith: ['init', 'craft', 'document'],
    spotlight: {
      title: {
        id: 'Rencana yang Dikonfirmasi, Tanpa Kode',
        en: 'A Confirmed Brief, No Code',
      },
      body: {
        id: 'Shape adalah satu-satunya command Build yang secara eksplisit tidak pernah menghasilkan kode atau kontrak arah: ia mengakhiri pekerjaan dengan brief yang dikonfirmasi, lalu implementasi dilakukan oleh alur lain.',
        en: 'Shape is the one Build command that explicitly never writes code or a direction contract: it ends with a confirmed brief, and implementation happens in another flow.',
      },
    },
    sourcePath: 'skill/reference/shape.md',
  },
  {
    name: 'init',
    category: 'build',
    invocation: 'user',
    description: {
      id: 'Pengaturan sekali per proyek: wawancara kebenaran produk yang tahan lama (pengguna, tujuan, batasan, suara) dan tulis PRODUCT.md. Tidak menulis DESIGN.md dan tidak memilih dunia visual.',
      en: 'One-time per-project setup: interviews for durable product truth (users, purpose, constraints, voice) and writes PRODUCT.md. It does not write DESIGN.md and does not choose a visual world.',
    },
    detailedDescription: {
      id: '`/impeccable init` menjelajahi proyek, mewawancarai hanya celah material, dan menulis PRODUCT.md (kebenaran produk yang tahan lama, termasuk `## Platform`: web, ios, android, atau adaptive). Proyek web yang bisa dijalankan juga dapat menerima `.impeccable/live/config.json`; init menanyakan sekali jalur build (`comp` atau `code`) bila ada image generation, lalu merekomendasikan command berikutnya. DESIGN.md dibuat oleh `document` (kode yang ada) atau new-work (dunia visual baru), bukan init.',
      en: '`/impeccable init` explores the project, interviews only for material gaps, and writes PRODUCT.md (durable product truth, including `## Platform`: web, ios, android or adaptive). A runnable web project may also get `.impeccable/live/config.json`; init asks once about the build path (`comp` or `code`) where image generation exists, then recommends next commands. DESIGN.md is produced by `document` (existing code) or new-work (a new visual world), not by init.',
    },
    useWhen: {
      id: [
        'Memulai proyek baru dengan Impeccable — jalankan `/impeccable init` sekali, sebelum command lain.',
        'PRODUCT.md usang atau hilang: perbarui pengetahuan produk yang sudah basi tanpa membuka ulang field yang terkonfirmasi.',
      ],
      en: [
        'Starting a new project with Impeccable — run `/impeccable init` once, before other commands.',
        'PRODUCT.md is stale or missing: refresh outdated product knowledge without reopening confirmed fields.',
      ],
    },
    avoidWhen: {
      id: [
        'Menanyakan arah estetika, warna, tipografi, atau referensi visual saat init — itu bukan wilayah init.',
        'Berharap init menulis DESIGN.md: upstream menyatakan init tidak menulisnya dan tidak menawarkannya.',
      ],
      en: [
        'Asking about aesthetic direction, colors, typography or visual references during init — that is not init\'s job.',
        'Expecting init to write DESIGN.md: upstream says init does not write it and never offers it.',
      ],
    },
    howItWorks: {
      id: [
        'Muat state saat ini lewat `impeccable context`: tidak ada PRODUCT.md → jelajahi, wawancara, tulis; ada → tanya apa yang basi atau hilang.',
        'Jelajahi proyek (docs, package/config, fitur, rute, aset, sinyal platform/aksesibilitas) dan bentuk hipotesis platform: web, ios, android, adaptive.',
        'Wawancara maksimal tiga pertanyaan per ronde, wajib satu ronde jawaban nyata sebelum menulis PRODUCT.md baru; tulis hanya fakta terkonfirmasi.',
      ],
      en: [
        'Load current state via `impeccable context`: no PRODUCT.md → explore, interview, write; exists → ask what is stale or missing.',
        'Explore the project (docs, package/config, features, routes, assets, platform/accessibility signals) and form a platform hypothesis: web, ios, android or adaptive.',
        'Interview with at most three questions per round and one real answer round before writing a new PRODUCT.md; write only confirmed facts.',
      ],
    },
    coreRules: {
      id: [
        'Jangan menimpa file yang ada secara diam-diam, dan jangan menawarkan DESIGN.md selama init.',
        'Yang masuk PRODUCT.md: pengguna, tujuan, posisi, batasan, istilah, bukti, platform, aksesibilitas. Yang tidak: palet, tipografi, komponen, konsep halaman, mode pengunjung.',
        'Jangan mengarang testimoni, pelanggan, benchmark, harga, atau klaim lisensi.',
      ],
      en: [
        'Never silently overwrite an existing file, and never offer DESIGN.md during init.',
        'PRODUCT.md holds users, purpose, positioning, constraints, terminology, evidence, platform, accessibility. It does not hold palettes, typography, components, page concepts or visitor mode.',
        'Never invent testimonials, customers, benchmarks, pricing or licensing claims.',
      ],
    },
    tips: {
      id: [
        'Quick start upstream: `npx impeccable install`, lalu `/impeccable init` di dalam alat AI Anda.',
        '`teach` adalah alias untuk `init`.',
      ],
      en: [
        'Upstream quick start: `npx impeccable install`, then `/impeccable init` inside your AI coding tool.',
        '`teach` is an alias for `init`.',
      ],
    },
    pairsWellWith: ['document', 'shape', 'doctor'],
    spotlight: {
      title: {
        id: 'PRODUCT.md Dulu, Visual Kemudian',
        en: 'Product Truth First, Visuals Later',
      },
      body: {
        id: 'Setiap command lain membaca konteks proyek sebelum bekerja. Init hanya mencatat kebenaran produk yang tahan lama; mode pengunjung dan arah visual dipilih nanti per permukaan, dan dunia visual dicatat terpisah di DESIGN.md.',
        en: 'Every other command reads project context before working. Init records only durable product truth; visitor mode and visual direction are chosen later per surface, and the visual world is recorded separately in DESIGN.md.',
      },
    },
    sourcePath: 'skill/reference/init.md',
  },
  {
    name: 'document',
    category: 'build',
    invocation: 'user',
    description: {
      id: 'Hasilkan DESIGN.md di root proyek yang menangkap sistem desain visual saat ini (warna, tipografi, spacing, radius, komponen) dalam format Google Stitch DESIGN.md agar agent tetap on-brand.',
      en: 'Generate a root DESIGN.md that captures the current visual design system (colors, typography, spacing, radii, components) in the Google Stitch DESIGN.md format so agents stay on-brand.',
    },
    detailedDescription: {
      id: '`/impeccable document` mengekstrak token dari kode, lalu meminta pengguna mengonfirmasi bahasa deskriptif untuk atmosfer dan karakter warna. Output mengikuti spesifikasi DESIGN.md: frontmatter YAML token yang bisa dibaca mesin (colors, typography, rounded, spacing, components dengan referensi `{path.to.token}`) diikuti hingga delapan bagian markdown berurutan. Token bersifat normatif; prosa memberi konteks cara memakainya.',
      en: '`/impeccable document` extracts tokens from code, then asks the user to confirm descriptive language for atmosphere and color character. Output follows the DESIGN.md spec: machine-readable YAML token frontmatter (colors, typography, rounded, spacing, components with `{path.to.token}` references) followed by up to eight markdown sections in a fixed order. Tokens are normative; prose gives context for applying them.',
    },
    useWhen: {
      id: [
        'Proyek sudah punya kode UI dan Anda butuh spesifikasi visual yang bisa diikuti agent agar tetap on-brand.',
        'Mencatat dunia visual incumbent tanpa menggantinya.',
      ],
      en: [
        'The project already has UI code and you need a visual spec an agent can follow to stay on-brand.',
        'Recording an incumbent visual world without replacing it.',
      ],
    },
    avoidWhen: {
      id: [
        'Mengganti identitas visual: dunia visual baru dibuat di new-work, bukan di sini.',
        'Mengisi token yang tidak benar-benar dipakai proyek — tiap entri frontmatter harus sesuai token nyata.',
      ],
      en: [
        'Replacing the visual identity: a new visual world is created in new-work, not here.',
        'Filling in tokens the project does not actually use — every frontmatter entry must correspond to a real token.',
      ],
    },
    howItWorks: {
      id: [
        'Ekstrak warna, tipografi, spacing, radius, dan pola komponen dari kodebase.',
        'Minta pengguna mengonfirmasi bahasa deskriptif untuk atmosfer dan karakter warna.',
        'Tulis DESIGN.md (dengan sidecar `.impeccable/design.json`) sesuai format spesifikasi: token di frontmatter, prosa dalam bagian berurutan.',
      ],
      en: [
        'Extract colors, typography, spacing, radii and component patterns from the codebase.',
        'Ask the user to confirm descriptive language for atmosphere and color character.',
        'Write DESIGN.md (with the `.impeccable/design.json` sidecar) per the spec format: tokens in frontmatter, prose in ordered sections.',
      ],
    },
    coreRules: {
      id: [
        'Token bersifat normatif, prosa memberi konteks; referensi token memakai `{colors.primary}` dan primitif tidak boleh saling mereferensi.',
        'Jaga frontmatter tetap ringkas: satu entri per token yang benar-benar dipakai.',
      ],
      en: [
        'Tokens are normative and prose gives context; token refs use `{colors.primary}` and primitives may not reference each other.',
        'Keep the frontmatter tight: one entry per token the project actually uses.',
      ],
    },
    tips: {
      id: [
        'Jalankan `document` setelah `init` untuk proyek yang sudah punya UI; `doctor` dapat merutekan ke sini bila DESIGN.md tampak menyimpang dari kode.',
        'Frontmatter divalidasi oleh linter Stitch dan dipakai panel live untuk merender tile.',
      ],
      en: [
        'Run `document` after `init` for projects that already have UI; `doctor` can route here when DESIGN.md seems to drift from the code.',
        'The frontmatter is validated by Stitch\'s linter and used by the live panel to render tiles.',
      ],
    },
    pairsWellWith: ['init', 'extract', 'doctor'],
    spotlight: {
      title: {
        id: 'Format Google Stitch DESIGN.md',
        en: 'The Google Stitch DESIGN.md Format',
      },
      body: {
        id: 'DESIGN.md mengikuti spesifikasi resmi DESIGN.md (frontmatter token YAML + bagian markdown berurutan), sehingga kompatibel dengan tool lain yang memahami format Stitch — bukan format privat Impeccable.',
        en: 'DESIGN.md follows the official DESIGN.md spec (YAML token frontmatter + ordered markdown sections), so it is compatible with other tools that understand the Stitch format — not a private Impeccable format.',
      },
    },
    sourcePath: 'skill/reference/document.md',
  },
  {
    name: 'extract',
    category: 'build',
    invocation: 'user',
    description: {
      id: 'Tarik komponen, pola, dan design token yang dapat dipakai ulang ke dalam sistem desain, dan konsolidasikan pemakaian yang berulang.',
      en: 'Pull reusable components, patterns and design tokens into the design system and consolidate repeated usage.',
    },
    detailedDescription: {
      id: '`/impeccable extract [target]` menemukan sistem desain atau pustaka komponen yang ada, mengidentifikasi pola berulang (komponen yang dipakai 3+ kali, nilai hard-coded, variasi tak konsisten, pola komposisi, tipe style, pola animasi), merencanakan ekstraksi (komponen, token, varian, penamaan, jalur migrasi), membangun versi reusable yang lebih baik, lalu memigrasikan pemakaian lama. Jika sistem desain belum ada, jangan membuatnya dulu: tanya preferensi lokasi dan struktur.',
      en: '`/impeccable extract [target]` finds the existing design system or component library, identifies repeated patterns (components used 3+ times, hard-coded values, inconsistent variations, composition patterns, type styles, animation patterns), plans the extraction (components, tokens, variants, naming, migration path), builds better reusable versions, then migrates existing uses. If no design system exists, do not create one yet: ask about preferred location and structure.',
    },
    useWhen: {
      id: [
        'Kodebase mengalami drift: pola serupa diimplementasikan berulang dan Anda ingin kembali ke sistem yang konsisten.',
        'Mengubah nilai hard-coded (warna, spacing, tipografi, bayangan) menjadi token.',
      ],
      en: [
        'The codebase has drifted: similar patterns are implemented repeatedly and you want to return to a consistent system.',
        'Turning hard-coded values (colors, spacing, typography, shadows) into tokens.',
      ],
    },
    avoidWhen: {
      id: [
        'Mengekstrak sesuatu yang dipakai kurang dari tiga kali dengan maksud sama — abstraksi prematur lebih buruk daripada duplikasi.',
        'Membuat sistem desain baru tanpa bertanya lebih dulu bila belum ada.',
      ],
      en: [
        'Extracting something used fewer than three times with the same intent — premature abstraction is worse than duplication.',
        'Creating a new design system without asking first when none exists.',
      ],
    },
    howItWorks: {
      id: [
        'Temukan sistem desain atau direktori UI bersama beserta konvensi penamaan dan struktur token.',
        'Cari peluang ekstraksi di area target, nilai dengan aturan 3+ pemakaian, lalu rencanakan komponen, token, varian, dan jalur migrasi.',
        'Bangun versi reusable (API props jelas, aksesibilitas bawaan, dokumentasi) lalu migrasikan pemakaian lama.',
      ],
      en: [
        'Find the design system or shared UI directory with its naming conventions and token structure.',
        'Look for extraction opportunities in the target area, judge them with the 3+ uses rule, then plan components, tokens, variants and migration path.',
        'Build the reusable versions (clear props API, built-in accessibility, documentation) and migrate existing uses.',
      ],
    },
    coreRules: {
      id: [
        'Sistem desain tumbuh bertahap: ekstrak yang jelas dapat dipakai ulang sekarang, bukan semua yang mungkin suatu hari.',
        'Nama komponen, token, dan prop mengikuti pola yang sudah ada.',
      ],
      en: [
        'Design systems grow incrementally: extract what is clearly reusable now, not everything that might someday be.',
        'Component, token and prop names follow existing patterns.',
      ],
    },
    tips: {
      id: [
        'Pisahkan token primitif dari semantik, dan dokumentasikan kapan tiap token dipakai.',
        'Jalankan `document` setelahnya agar DESIGN.md mencerminkan sistem hasil ekstraksi.',
      ],
      en: [
        'Separate primitive from semantic tokens and document when each token is used.',
        'Run `document` afterwards so DESIGN.md reflects the extracted system.',
      ],
    },
    pairsWellWith: ['document', 'polish', 'layout'],
    spotlight: {
      title: {
        id: 'Aturan Tiga Pemakaian',
        en: 'The Rule of Three',
      },
      body: {
        id: 'Hanya ekstrak pola yang dipakai 3+ kali dengan maksud yang sama; upstream menyatakan abstraksi prematur lebih buruk daripada duplikasi.',
        en: 'Only extract patterns used 3+ times with the same intent; upstream states premature abstraction is worse than duplication.',
      },
    },
    sourcePath: 'skill/reference/extract.md',
  },
  {
    name: 'critique',
    category: 'evaluate',
    invocation: 'user',
    description: {
      id: 'Tinjauan desain dari sisi UX: hierarki visual, arsitektur informasi, cognitive load, dan kualitas keseluruhan dengan skor heuristik, tes persona, dan deteksi anti-pattern otomatis.',
      en: 'A UX design review: visual hierarchy, information architecture, cognitive load and overall quality with heuristic scoring, persona testing and automated anti-pattern detection.',
    },
    detailedDescription: {
      id: '`/impeccable critique [target]` menentukan satu target yang stabil, menjalankan dua asesmen independen — A: tinjauan desain (spesifisitas desain, skor 10 heuristik Nielsen 0-4, cognitive load, perjalanan emosi, red flag persona) dan B: bukti detector/browser — lalu menyintesis laporan, menyimpan snapshot di `.impeccable/critique/`, dan bertanya apa yang akan diperbaiki berikutnya. A dan B wajib berjalan sebagai dua sub-agent terisolasi bila tersedia; jika tidak, laporan diawali banner DEGRADED.',
      en: '`/impeccable critique [target]` resolves one stable target, runs two independent assessments — A: design review (design specificity, Nielsen\'s 10 heuristics scored 0-4, cognitive load, emotional journey, persona red flags) and B: detector/browser evidence — then synthesizes a report, persists a snapshot under `.impeccable/critique/`, and asks what to improve next. A and B must run as two isolated sub-agents when available; otherwise the report starts with a DEGRADED banner.',
    },
    useWhen: {
      id: [
        'Meminta review, kritik, evaluasi, atau umpan balik atas desain atau komponen.',
        'Sebelum `polish`: snapshot critique dapat menjadi salah satu input pass polish.',
      ],
      en: [
        'Asking to review, critique, evaluate or give feedback on a design or component.',
        'Before `polish`: a critique snapshot can be one input to the polish pass.',
      ],
    },
    avoidWhen: {
      id: [
        'Pemeriksaan teknis terukur (aksesibilitas, performa, responsif) — gunakan `audit`.',
        'Langsung memperbaiki: critique menghasilkan laporan dan pertanyaan, bukan perubahan kode.',
      ],
      en: [
        'Measurable technical checks (accessibility, performance, responsive) — use `audit`.',
        'Fixing straight away: critique produces a report and questions, not code changes.',
      ],
    },
    howItWorks: {
      id: [
        'Resolusikan target ke path file atau URL konkret (utamakan path sumber daripada URL dev server).',
        'Jalankan Asesmen A dan B terisolasi; A selesai dulu sebelum temuan detector masuk ke konteks sintesis agar tidak menjangkarkan penilaian.',
        'Susun laporan (Design Health Score, verdict spesifisitas, isu prioritas, red flag persona, pertanyaan), simpan snapshot, lalu ajukan pertanyaan terarah sebagai hal TERAKHIR.',
      ],
      en: [
        'Resolve the target to a concrete file path or URL (prefer a source path over a dev-server URL).',
        'Run Assessments A and B in isolation; A finishes before detector findings enter the synthesis context so they do not anchor judgment.',
        'Compose the report (Design Health Score, specificity verdict, priority issues, persona red flags, questions), persist the snapshot, then ask targeted questions as the LAST thing.',
      ],
    },
    coreRules: {
      id: [
        'Kedua asesmen wajib; detector yang dilewati membuat critique gagal kecuali `impeccable detect` hilang atau crash setelah percobaan nyata.',
        'Target yang bisa dilihat wajib diperiksa di browser bila tersedia; jangan mengklaim overlay terlihat bila injeksi skrip gagal.',
        'Laporan tanpa pertanyaan terarah atau baris `Questions skipped: <alasan>` adalah run yang tidak lengkap.',
      ],
      en: [
        'Both assessments are required; a skipped detector fails the critique unless `impeccable detect` is missing or crashes after a real attempt.',
        'Viewable targets require browser inspection when available; do not claim an overlay exists unless script injection succeeded.',
        'A run that ends with neither targeted questions nor a `Questions skipped: <reason>` line is incomplete.',
      ],
    },
    tips: {
      id: [
        'Contoh: `/impeccable critique landing`.',
        '`.impeccable/critique/ignore.md` adalah satu-satunya input run sebelumnya yang dipakai critique; temuan yang cocok dibuang diam-diam.',
      ],
      en: [
        'Example: `/impeccable critique landing`.',
        '`.impeccable/critique/ignore.md` is the only prior-run input critique consumes; matching findings are dropped silently.',
      ],
    },
    pairsWellWith: ['audit', 'polish', 'distill'],
    spotlight: {
      title: {
        id: 'Dua Asesmen Terisolasi',
        en: 'Two Isolated Assessments',
      },
      body: {
        id: 'Critique dirancang agar penilaian desain tidak dijangkarkan oleh output detector: dua sub-agent terpisah yang tidak saling melihat hasil. Berjalan inline hanya sebagai mode terdegradasi yang harus diumumkan dengan banner di baris pertama.',
        en: 'Critique is designed so design judgment is not anchored by detector output: two separate sub-agents that do not see each other\'s results. Running inline is only a degraded mode that must be announced with a banner on the first line.',
      },
    },
    sourcePath: 'skill/reference/critique.md',
  },
  {
    name: 'audit',
    category: 'evaluate',
    invocation: 'user',
    description: {
      id: 'Pemeriksaan kualitas teknis di lima dimensi (aksesibilitas, performa, theming, responsif, anti-pattern) dengan skor 0-4, tingkat keparahan P0-P3, dan rencana tindakan. Hanya mendokumentasikan, tidak memperbaiki. Khusus web.',
      en: 'Technical quality checks across five dimensions (accessibility, performance, theming, responsive, anti-patterns) with 0-4 scores, P0-P3 severity and an action plan. Documents, does not fix. Web only.',
    },
    detailedDescription: {
      id: '`/impeccable audit [area]` adalah audit level kode, bukan kritik desain: memeriksa apa yang terukur dan terverifikasi di implementasi. Tiap dimensi diberi skor 0-4; setiap isu ditandai P0 (memblokir), P1 (besar, termasuk pelanggaran WCAG AA), P2 (minor), atau P3 (polish) beserta lokasi, kategori, dampak, standar, rekomendasi, dan command yang disarankan. Mengakhiri dengan urutan command yang direkomendasikan, `polish` terakhir. Proyek native (ios/android/adaptive) dirutekan ke `audit.native.md`.',
      en: '`/impeccable audit [area]` is a code-level audit, not a design critique: it checks what is measurable and verifiable in the implementation. Each dimension is scored 0-4; every issue is tagged P0 (blocking), P1 (major, incl. WCAG AA violations), P2 (minor) or P3 (polish) with location, category, impact, standard, recommendation and a suggested command. It ends with a prioritized command sequence, `polish` last. Native projects (ios/android/adaptive) route to `audit.native.md`.',
    },
    useWhen: {
      id: [
        'Meminta pemeriksaan aksesibilitas, audit performa, atau tinjauan kualitas teknis.',
        'Menetapkan baseline sebelum memperbaiki, dan mengaudit ulang untuk melihat skor membaik.',
      ],
      en: [
        'Asking for an accessibility check, performance audit or technical quality review.',
        'Establishing a baseline before fixing, and re-auditing to see the score improve.',
      ],
    },
    avoidWhen: {
      id: [
        'Mengharapkan perbaikan: audit tidak memperbaiki isu, hanya mendokumentasikannya untuk command lain.',
        'Penilaian estetika/UX — gunakan `critique`; proyek native memakai varian `audit.native.md`.',
      ],
      en: [
        'Expecting fixes: audit does not fix issues, it documents them for other commands.',
        'Aesthetic/UX judgment — use `critique`; native projects use the `audit.native.md` variant.',
      ],
    },
    howItWorks: {
      id: [
        'Pindai lima dimensi dan beri skor 0-4: aksesibilitas, performa, theming, responsif, dan anti-pattern.',
        'Tandai tiap isu P0-P3 dengan lokasi, kategori, dampak, standar WCAG bila relevan, rekomendasi, dan command yang disarankan.',
        'Rangkum pola sistemik dan temuan positif, lalu urutkan command yang direkomendasikan (P0 dulu, `polish` terakhir).',
      ],
      en: [
        'Scan the five dimensions and score 0-4: accessibility, performance, theming, responsive design, and anti-patterns.',
        'Tag every issue P0-P3 with location, category, impact, WCAG standard if applicable, recommendation and suggested command.',
        'Summarize systemic patterns and positive findings, then list recommended commands (P0 first, `polish` last).',
      ],
    },
    coreRules: {
      id: [
        'Jangan melaporkan isu tanpa menjelaskan dampaknya, dan jangan memberi rekomendasi generik.',
        'Prioritaskan: tidak semua bisa P0, dan terlalu banyak P3 menimbulkan noise.',
        'Jangan melaporkan false positive tanpa verifikasi, dan jangan lewatkan temuan positif.',
      ],
      en: [
        'Never report issues without explaining impact, and never give generic recommendations.',
        'Prioritize: everything cannot be P0, and too many P3 issues create noise.',
        'Do not report false positives without verification, and do not skip positive findings.',
      ],
    },
    tips: {
      id: [
        'Contoh: `/impeccable audit blog`; jalankan ulang setelah perbaikan untuk melihat skor naik.',
        'Skor aksesibilitas 4 berarti WCAG AA terpenuhi penuh; AAA (7:1) hanya disebut sebagai catatan.',
      ],
      en: [
        'Example: `/impeccable audit blog`; re-run after fixes to see the score improve.',
        'An accessibility score of 4 means WCAG AA fully met; AAA (7:1) is mentioned only as a note.',
      ],
    },
    pairsWellWith: ['critique', 'harden', 'polish'],
    spotlight: {
      title: {
        id: 'Audit Teknis, Bukan Kritik Desain',
        en: 'A Technical Audit, Not a Design Critique',
      },
      body: {
        id: 'Audit memeriksa apa yang terukur di kode, dengan skor 0-4 per dimensi dan keparahan P0-P3, lalu menyerahkan perbaikan ke command lain. Ia dipasangkan dengan 61 aturan detector deterministik milik Impeccable untuk sisi anti-pattern.',
        en: 'Audit checks what is measurable in code, with 0-4 scores per dimension and P0-P3 severity, then hands fixes to other commands. It pairs with Impeccable\'s 61 deterministic detector rules for the anti-pattern side.',
      },
    },
    sourcePath: 'skill/reference/audit.md',
  },
  {
    name: 'polish',
    category: 'refine',
    invocation: 'user',
    description: {
      id: 'Pass kualitas akhir sebelum rilis: penyelarasan dengan sistem desain, konsistensi, spacing, state, dan detail mikro. Penghalusan, bukan redesign terselubung.',
      en: 'A final quality pass before shipping: design-system alignment, consistency, spacing, states and micro-details. Refinement, never a concealed redesign.',
    },
    detailedDescription: {
      id: '`/impeccable polish [target]` menjaga dunia visual, konten, dan perilaku incumbent. Langkah: pahami sistem (DESIGN.md, token, komponen) dan klasifikasikan tiap drift (token hilang, implementasi sekali-pakai, ketidakcocokan konseptual, cacat lokal); kumpulkan bukti dengan memakai fitur di ukuran representatif; triase cacat fungsional sebelum kosmetik; perbaiki di tingkat paling sempit yang benar. Hasil detector hanyalah bukti cacat, bukan bukti kualitas. Bila konsepnya salah, katakan dan rekomendasikan redesign atau `bolder`.',
      en: '`/impeccable polish [target]` preserves the incumbent visual world, content and behavior. Steps: understand the system (DESIGN.md, tokens, components) and classify each drift (missing token, one-off implementation, conceptual mismatch, local defect); gather evidence by using the feature at representative sizes; triage functional defects before cosmetic ones; fix at the narrowest correct level. A detector result is defect evidence, not proof of quality. If the concept itself is wrong, say so and recommend redesign or `bolder`.',
    },
    useWhen: {
      id: [
        'Menjelang rilis: sentuhan akhir, tinjauan pra-peluncuran, atau "ada yang terasa off".',
        'Setelah `critique` atau `audit`: tutup temuannya dengan pass polish.',
      ],
      en: [
        'Before shipping: finishing touches, pre-launch review, or "something looks off".',
        'After `critique` or `audit`: close out their findings with a polish pass.',
      ],
    },
    avoidWhen: {
      id: [
        'Menyelundupkan penggantian konsep: bila dunia visualnya salah, rekomendasikan redesign atau `bolder`.',
        'Menganggap hasil detector bersih sebagai bukti kualitas.',
      ],
      en: [
        'Smuggling in a replacement concept: if the world is wrong, recommend redesign or `bolder`.',
        'Treating a clean detector result as proof of quality.',
      ],
    },
    howItWorks: {
      id: [
        'Baca DESIGN.md dan token/komponen representatif; klasifikasikan setiap drift sebelum memperbaikinya.',
        'Gunakan fitur sendiri di ukuran representatif (desktop dan mobile di web; kelas perangkat nyata di native) dan pertimbangkan snapshot critique terakhir bila ada.',
        'Triase: pisahkan cacat fungsional dari kosmetik dan perbaiki berurutan.',
      ],
      en: [
        'Read DESIGN.md and representative tokens/components; classify each drift before fixing it.',
        'Use the feature yourself at representative sizes (desktop and mobile on web; shipped device classes on native) and consider the latest critique snapshot if one exists.',
        'Triage: separate functional defects from cosmetic ones and fix in order.',
      ],
    },
    coreRules: {
      id: [
        'Polish adalah penghalusan: pertahankan dunia visual, konten, perilaku, dan segala sesuatu di luar scope.',
        'Perbaiki penyebab di tingkat paling sempit yang benar; tanya bila prinsip sistem yang mengikat tidak bisa disimpulkan.',
      ],
      en: [
        'Polish is refinement: preserve the visual world, content, behavior and everything outside scope.',
        'Fix the cause at the narrowest correct level; ask when a binding system principle cannot be inferred.',
      ],
    },
    tips: {
      id: [
        'Contoh: `/impeccable polish settings`.',
        '`bolder` menyerahkan ke polish untuk pass akhir ketika targetnya sudah bertahan sendiri.',
      ],
      en: [
        'Example: `/impeccable polish settings`.',
        '`bolder` hands off to polish for the final pass once the target holds its own.',
      ],
    },
    pairsWellWith: ['audit', 'critique', 'layout'],
    spotlight: {
      title: {
        id: 'Penghalusan, Bukan Redesain Terselubung',
        en: 'Refinement, Not Concealed Redesign',
      },
      body: {
        id: 'Polish menjaga identitas yang ada. Bila konsepnya sendiri salah, skill menyuruh mengatakannya dan merekomendasikan redesign atau `bolder`, bukan menyelinapkan dunia pengganti lewat "polish".',
        en: 'Polish preserves the existing identity. If the concept itself is wrong, the skill says to say so and recommend redesign or `bolder`, rather than sneaking in a replacement world through "polish".',
      },
    },
    sourcePath: 'skill/reference/polish.md',
  },
  {
    name: 'bolder',
    category: 'refine',
    invocation: 'user',
    description: {
      id: 'Perkuat satu bagian yang aman atau hambar agar lebih berkarakter, dengan memperkuat apa yang sudah dimiliki sistem, bukan membangun ulang.',
      en: 'Amplify one safe or bland part to give it more character, by turning up what the system already owns rather than rebuilding.',
    },
    detailedDescription: {
      id: '`/impeccable bolder [target]` adalah permintaan amplifikasi yang hampir selalu dibatasi pada sesuatu yang sudah ada. "Scope is sovereign": hanya sentuh target; jangan restyle tetangga atau menambah warna, font, radius, bayangan, atau primitif sistem baru. Cari mengapa bagian itu terbaca datar dibanding halaman lain, amplifikasi motif dan skala tipe milik sistem, komitmen pada satu langkah tegas lalu redamkan sekelilingnya, dan beri ritme sendiri. Uji skeleton: tanpa teks, apakah struktur masih menyampaikan perannya?',
      en: '`/impeccable bolder [target]` is an amplification request almost always scoped to something that already exists. "Scope is sovereign": touch only the target; do not restyle neighbors or add colors, fonts, radii, shadows or system primitives. Find why the part reads flat next to the rest of the page, amplify the system\'s own motif and type scale, commit to one decisive move then quiet everything around it, and give it its own rhythm. The skeleton test: with the copy stripped out, does the structure still say what the section is?',
    },
    useWhen: {
      id: [
        'Desain terasa hambar, generik, terlalu aman, atau tanpa kepribadian, dan satu bagian perlu lebih berdampak.',
        'Menonjolkan satu bagian halaman sebagai puncak dalam scroll.',
      ],
      en: [
        'A design feels bland, generic, too safe or lacks personality, and one part needs more impact.',
        'Making one part of a page a peak in the scroll.',
      ],
    },
    avoidWhen: {
      id: [
        'Ketika arah desain sedang diputuskan: "bolder" saat ronde arah terbuka dimiliki oleh new-work, bukan command ini.',
        'Mengubah klaim konten atau menambah primitif sistem baru tanpa diminta.',
      ],
      en: [
        'While a direction decision is open: "bolder" said during an open direction round belongs to new-work, not this command.',
        'Changing content claims or adding new system primitives unasked.',
      ],
    },
    howItWorks: {
      id: [
        'Pelajari apa yang sudah dilakukan sisa halaman yang tidak dilakukan bagian ini: tipe display, perangkat struktural, motif, kepadatan.',
        'Amplifikasi apa yang sudah dimiliki sistem; komitmen pada satu langkah tegas lalu redamkan sekelilingnya.',
        'Verifikasi: segala sesuatu di luar target tidak berubah dan tidak ada warna/font/primitif baru.',
      ],
      en: [
        'Study what the rest of the page does that this section does not: display type, structural devices, motif, density.',
        'Amplify what the system already owns; commit to one decisive move, then quiet everything around it.',
        'Verify: everything outside the target is unchanged and no new color, font or primitive appeared.',
      ],
    },
    coreRules: {
      id: [
        '"Everything else stays" adalah instruksi harfiah.',
        'Jaga konten tetap benar: klaim yang ada adalah bagian dari scope; tanya bila bukti nyata dibutuhkan tetapi tidak ada.',
        'Jika semua elemen menjadi lebih keras, bagian itu justru lebih datar.',
      ],
      en: [
        '"Everything else stays" is a literal instruction.',
        'Keep content true: existing claims are part of scope; ask if real evidence is essential but absent.',
        'If every element got louder, the section got flatter.',
      ],
    },
    tips: {
      id: [
        'Hasil akhir harus tampak seperti brand yang sama yang lebih yakin, bukan brand yang berbeda.',
        'Pasangan kebalikannya adalah `quieter`.',
      ],
      en: [
        'The result should look like the same brand, only more sure of itself.',
        'Its inverse is `quieter`.',
      ],
    },
    pairsWellWith: ['quieter', 'polish', 'colorize'],
    spotlight: {
      title: {
        id: 'Scope Itu Berdaulat',
        en: 'Scope Is Sovereign',
      },
      body: {
        id: 'Instruksi "yang lain tetap" dibaca secara harfiah: bolder hanya menyentuh target yang disebut dan tidak menambah warna, font, radius, atau primitif sistem baru. Kekuatan datang dari memperkuat apa yang sistem sudah miliki.',
        en: '"Everything else stays" is read literally: bolder touches only the named target and adds no new colors, fonts, radii or system primitives. Strength comes from turning up what the system already owns.',
      },
    },
    sourcePath: 'skill/reference/bolder.md',
  },
  {
    name: 'quieter',
    category: 'refine',
    invocation: 'user',
    description: {
      id: 'Turunkan intensitas desain yang terlalu keras atau berlebihan tanpa kehilangan kepribadian atau menjadi generik.',
      en: 'Tone down designs that are too loud or overstimulating without losing personality or becoming generic.',
    },
    detailedDescription: {
      id: '`/impeccable quieter [target]` bergantung pada mode pengunjung: untuk Persuade + Experience berarti palet lebih terkendali, lebih banyak ruang, dan udara tipografi (drama dikurangi, POV tetap); untuk Operate + Read berarti mengurangi noise visual (aksen latar, card lebih datar, warna dan gerak lebih sedikit). Menilai sumber intensitas (saturasi, kontras ekstrem, bobot visual, animasi, kompleksitas, skala), menyusun strategi, lalu menerapkan dengan hati-hati. "Quieter" bukan membosankan: pikirkan mewah, bukan malas.',
      en: '`/impeccable quieter [target]` depends on visitor mode: for Persuade + Experience it means a more restrained palette, more whitespace and typographic air (drama reduced, POV kept); for Operate + Read it means less visual noise (fewer background accents, flatter cards, less color and motion). It assesses intensity sources (saturation, contrast extremes, visual weight, animation, complexity, scale), plans a strategy, then applies it carefully. "Quieter" does not mean boring: think luxury, not laziness.',
    },
    useWhen: {
      id: [
        'Desain terasa terlalu bold, keras, overwhelming, agresif, atau norak, dan Anda ingin estetika lebih tenang dan halus.',
        'Alat atau UI baca yang harus lebih menghilang ke dalam tugas.',
      ],
      en: [
        'A design feels too bold, loud, overwhelming, aggressive or garish and you want a calmer, more refined aesthetic.',
        'A tool or reading UI that should disappear more fully into the task.',
      ],
    },
    avoidWhen: {
      id: [
        'Konteks yang memang butuh energi (beberapa audiens atau tujuan pemasaran).',
        'Membuang ide yang bagus atau pesan inti: tanya bila konteks tidak jelas.',
      ],
      en: [
        'Contexts that genuinely need energy (some audiences or marketing purposes).',
        'Throwing away good ideas or the core message: ask when context is unclear.',
      ],
    },
    howItWorks: {
      id: [
        'Identifikasi sumber intensitas: saturasi warna, kontras ekstrem, bobot visual, animasi berlebih, kompleksitas, skala.',
        'Pahami konteks (pemasaran vs alat vs bacaan, audiens, apa yang bekerja, pesan inti).',
        'Rencanakan pendekatan warna dan hierarki (sedikit elemen tetap bold, sisanya mundur), lalu terapkan.',
      ],
      en: [
        'Identify intensity sources: color saturation, contrast extremes, visual weight, excess animation, complexity, scale.',
        'Understand context (marketing vs tool vs reading, audience, what works, the core message).',
        'Plan the color and hierarchy approach (very few elements stay bold, the rest recede), then apply.',
      ],
    },
    coreRules: {
      id: [
        'Kurangi intensitas sambil mempertahankan dampak dan kepribadian.',
        'Jangan menebak konteks yang tidak jelas dari kodebase; tanyakan.',
      ],
      en: [
        'Reduce intensity while maintaining impact and personality.',
        'Do not guess unclear context from the codebase; ask.',
      ],
    },
    tips: {
      id: [
        'Mengurangi bayangan/glow berat dan menurunkan saturasi adalah dua pengungkit utama.',
        'Pasangan kebalikannya adalah `bolder`.',
      ],
      en: [
        'Reducing heavy shadows/glows and lowering saturation are two main levers.',
        'Its inverse is `bolder`.',
      ],
    },
    pairsWellWith: ['bolder', 'distill', 'polish'],
    spotlight: {
      title: {
        id: 'Tenang Itu Lebih Sulit daripada Bold',
        en: 'Quiet Is Harder Than Bold',
      },
      body: {
        id: 'Pembuka reference-nya: "Quiet design is harder than bold design. Subtlety needs precision." Command ini bergantung pada mode pengunjung: Persuade/Experience dikurangi dramanya, Operate/Read dikurangi noise-nya.',
        en: 'The reference opens: "Quiet design is harder than bold design. Subtlety needs precision." It depends on visitor mode: Persuade/Experience reduces drama, Operate/Read reduces noise.',
      },
    },
    sourcePath: 'skill/reference/quieter.md',
  },
  {
    name: 'distill',
    category: 'refine',
    invocation: 'user',
    description: {
      id: 'Pangkas desain ke esensinya: buang elemen redundan, informasi berulang, dekorasi, dan kompleksitas kosmetik yang tidak pantas ada.',
      en: 'Strip a design to its essence: remove redundant elements, repeated information, decorative noise and cosmetic complexity that does not earn its place.',
    },
    detailedDescription: {
      id: '`/impeccable distill [target]` menilai sumber kompleksitas (terlalu banyak elemen, variasi berlebihan, information overload, noise visual, hierarki membingungkan, feature creep), menemukan esensi (satu tujuan utama pengguna; apa yang benar-benar perlu; apa yang bisa dihapus, disembunyikan, atau digabung), merencanakan pengeditan tegas (tujuan inti, elemen esensial, progressive disclosure, konsolidasi), lalu menyederhanakan. Menyederhanakan bukan menghapus fitur, melainkan menghapus hambatan antara pengguna dan tujuannya.',
      en: '`/impeccable distill [target]` assesses complexity sources (too many elements, excessive variation, information overload, visual noise, confusing hierarchy, feature creep), finds the essence (the one primary user goal; what is necessary; what can be removed, hidden or combined), plans a ruthless edit (core purpose, essential elements, progressive disclosure, consolidation), then simplifies. Simplicity is not about removing features, it is about removing obstacles between users and their goals.',
    },
    useWhen: {
      id: [
        'Meminta menyederhanakan, merapikan, mengurangi noise, menghapus elemen, atau membuat UI lebih bersih dan fokus.',
        'Halaman dengan banyak tombol bersaing, info berulang, atau pilihan berlebih.',
      ],
      en: [
        'Asking to simplify, declutter, reduce noise, remove elements or make a UI cleaner and more focused.',
        'A page with competing buttons, repeated information or too many options.',
      ],
    },
    avoidWhen: {
      id: [
        'Mengurangi fitur secara membabi buta: setiap elemen harus dibenarkan keberadaannya, bukan dihapus sembarangan.',
        'Kebutuhan untuk menurunkan intensitas visual saja — gunakan `quieter`.',
      ],
      en: [
        'Blindly cutting features: every element must justify its existence, not be removed arbitrarily.',
        'Needing only lower visual intensity — use `quieter`.',
      ],
    },
    howItWorks: {
      id: [
        'Identifikasi sumber kompleksitas dan tanyakan: apa satu tujuan utama pengguna, apa yang benar-benar perlu vs sekadar bagus ada?',
        'Rencanakan: tujuan inti, elemen esensial, progressive disclosure, dan peluang konsolidasi.',
        'Sederhanakan desain dan verifikasi tujuan utama masih terselesaikan.',
      ],
      en: [
        'Identify complexity sources and ask: what is the one primary user goal, what is necessary vs nice-to-have?',
        'Plan: core purpose, essential elements, progressive disclosure, consolidation opportunities.',
        'Simplify the design and verify the primary goal is still achieved.',
      ],
    },
    coreRules: {
      id: [
        'Simplifikasi sulit: berani berkata tidak pada ide bagus demi eksekusi yang hebat.',
        'Jangan menebak bila tujuan atau esensi tidak jelas dari kodebase; tanyakan.',
      ],
      en: [
        'Simplification is hard: say no to good ideas to make room for great execution.',
        'Do not guess when the goal or essence is unclear from the codebase; ask.',
      ],
    },
    tips: {
      id: [
        'Tanyakan "20% apa yang memberi 80% nilai?"',
        'Sembunyikan apa yang bisa menunggu lewat progressive disclosure alih-alih menghapusnya.',
      ],
      en: [
        'Ask "what is the 20% that delivers 80% of value?"',
        'Hide what can wait via progressive disclosure instead of deleting it.',
      ],
    },
    pairsWellWith: ['quieter', 'critique', 'polish'],
    spotlight: {
      title: {
        id: 'Setiap Elemen Harus Membenarkan Keberadaannya',
        en: 'Every Element Must Justify Itself',
      },
      body: {
        id: 'Distill diposisikan sebagai pengeditan tegas: simplicity bukan tentang membuang fitur, melainkan menyingkirkan hambatan antara pengguna dan tujuan mereka.',
        en: 'Distill is framed as ruthless editing: simplicity is not about removing features, it is about removing obstacles between users and their goals.',
      },
    },
    sourcePath: 'skill/reference/distill.md',
  },
  {
    name: 'harden',
    category: 'refine',
    invocation: 'user',
    description: {
      id: 'Buat antarmuka siap produksi: error handling, i18n, text overflow, edge case, dan ketahanan terhadap data dunia nyata.',
      en: 'Make interfaces production-ready: error handling, i18n, text overflow, edge cases and resilience under real-world data.',
    },
    detailedDescription: {
      id: '`/impeccable harden [target]` menguji antarmuka dengan input, error, bahasa, dan kondisi jaringan nyata: input ekstrem (teks sangat panjang/pendek, karakter khusus, emoji, RTL, angka besar, 1000+ item, tanpa data), skenario error (offline, lambat, timeout, error API 400/401/403/404/500, validasi, izin, rate limiting, operasi bersamaan), dan internasionalisasi (terjemahan lebih panjang, misalnya Jerman sering ~30% lebih panjang, RTL, CJK, format tanggal/angka/mata uang).',
      en: '`/impeccable harden [target]` tests the interface against real inputs, errors, languages and network conditions: extreme inputs (very long/short text, special characters, emoji, RTL, large numbers, 1000+ items, no data), error scenarios (offline, slow, timeout, API errors 400/401/403/404/500, validation, permissions, rate limiting, concurrent operations), and internationalization (longer translations, e.g. German is often ~30% longer, RTL, CJK, date/number/currency formats).',
    },
    useWhen: {
      id: [
        'Meminta hardening, siap produksi, penanganan edge case, state error, atau perbaikan overflow dan i18n.',
        'Antarmuka yang hanya bekerja dengan data sempurna.',
      ],
      en: [
        'Asking to harden, make production-ready, handle edge cases, add error states, or fix overflow and i18n issues.',
        'An interface that only works with perfect data.',
      ],
    },
    avoidWhen: {
      id: [
        'Pekerjaan tampilan murni tanpa sisi input/error — tidak ada yang perlu di-harden.',
        'Mengganti desain: hardening menjaga tampilan dan menambah ketahanan.',
      ],
      en: [
        'Purely visual work with no input or error side — there is nothing to harden.',
        'Redesigning: hardening keeps the look and adds resilience.',
      ],
    },
    howItWorks: {
      id: [
        'Uji dengan input ekstrem: teks sangat panjang, kosong, karakter khusus, banyak item, tanpa data.',
        'Uji skenario error: kegagalan jaringan, error API, validasi, izin, rate limiting.',
        'Uji internasionalisasi: terjemahan panjang, RTL, set karakter, format tanggal/angka/mata uang.',
      ],
      en: [
        'Test with extreme inputs: very long text, empty, special characters, many items, no data.',
        'Test error scenarios: network failures, API errors, validation, permissions, rate limiting.',
        'Test internationalization: long translations, RTL, character sets, date/number/currency formats.',
      ],
    },
    coreRules: {
      id: [
        'Desain yang hanya bekerja dengan data sempurna belum siap produksi.',
        'Tangani state kosong, error, dan loading secara eksplisit, bukan hanya jalur bahagia.',
      ],
      en: [
        'Designs that only work with perfect data are not production-ready.',
        'Handle empty, error and loading states explicitly, not just the happy path.',
      ],
    },
    tips: {
      id: [
        'Contoh: `/impeccable harden checkout`.',
        'Sisakan ruang untuk terjemahan yang lebih panjang daripada bahasa sumber.',
      ],
      en: [
        'Example: `/impeccable harden checkout`.',
        'Leave room for translations that are longer than the source language.',
      ],
    },
    pairsWellWith: ['audit', 'adapt', 'clarify'],
    spotlight: {
      title: {
        id: 'Data Nyata, Bukan Data Sempurna',
        en: 'Real Data, Not Perfect Data',
      },
      body: {
        id: 'Pembukanya tegas: "Designs that only work with perfect data aren\'t production-ready." Harden memaksa pengujian pada input ekstrem, error jaringan/API, dan variasi bahasa.',
        en: 'Its opener is blunt: "Designs that only work with perfect data aren\'t production-ready." Harden forces testing against extreme inputs, network/API errors and language variation.',
      },
    },
    sourcePath: 'skill/reference/harden.md',
  },
  {
    name: 'onboard',
    category: 'refine',
    invocation: 'user',
    description: {
      id: 'Rancang alur onboarding, pengalaman first-run, dan empty state yang membawa pengguna baru ke nilai produk secepat mungkin.',
      en: 'Design onboarding flows, first-run experiences and empty states that get new users to value as fast as possible.',
    },
    detailedDescription: {
      id: '`/impeccable onboard [target]` bukan pengintaian kodebase: ini desain UX untuk pengguna akhir. Tugas onboarding bukan mengajarkan seluruh produk, melainkan membawa orang ke momen yang membuktikan produk layak waktunya (aha moment). Mencakup welcome screen, pengaturan akun, progressive disclosure, tooltip kontekstual, pengumuman fitur, empty state, dan momen aktivasi. Mulai dari tantangan, pengguna (level pengalaman, motivasi, waktu), dan definisi sukses.',
      en: '`/impeccable onboard [target]` is not codebase reconnaissance: it is UX design for end users. Onboarding\'s job is not to teach the whole product but to get people to the moment that proves it is worth their time (the aha moment). Covers welcome screens, account setup, progressive disclosure, contextual tooltips, feature announcements, empty states and activation moments. It starts from the challenge, the users (experience level, motivation, time) and a definition of success.',
    },
    useWhen: {
      id: [
        'Pengguna pertama kali, alur getting-started, empty state, aktivasi, atau aha moment yang perlu dirancang.',
        'Pengguna drop off atau bingung di awal pemakaian.',
      ],
      en: [
        'First-time users, getting-started flows, empty states, activation or an aha moment that needs designing.',
        'Users drop off or get confused early in use.',
      ],
    },
    avoidWhen: {
      id: [
        'Memetakan kodebase atau memeriksa stack proyek — itu bukan tugas onboard (untuk konteks proyek gunakan `init`).',
        'Mengajarkan semua yang mungkin: onboarding harus membawa ke nilai secepat mungkin.',
      ],
      en: [
        'Mapping the codebase or inspecting the project stack — that is not onboard (for project context use `init`).',
        'Teaching everything possible: onboarding should get to value as quickly as possible.',
      ],
    },
    howItWorks: {
      id: [
        'Identifikasi tantangan: apa yang ingin dicapai pengguna, di mana mereka macet, dan apa aha moment-nya.',
        'Pahami pengguna: level pengalaman, motivasi, komitmen waktu, dan alternatif yang mereka kenal.',
        'Definisikan sukses: minimum yang perlu dipelajari, aksi kunci (proyek pertama, undangan pertama), dan cara mengukur keberhasilan.',
      ],
      en: [
        'Identify the challenge: what users want to accomplish, where they get stuck, and what the aha moment is.',
        'Understand users: experience level, motivation, time commitment, and alternatives they know.',
        'Define success: the minimum to learn, the key action (first project, first invite) and how to know it worked.',
      ],
    },
    coreRules: {
      id: [
        'Onboarding harus membawa pengguna ke nilai secepat mungkin, bukan mengajarkan semuanya.',
        'Konteks tambahan yang dibutuhkan: aha moment yang diinginkan dan level pengalaman pengguna.',
      ],
      en: [
        'Onboarding should get users to value as quickly as possible, not teach everything.',
        'Additional context needed: the aha moment you want users to reach and users\' experience level.',
      ],
    },
    tips: {
      id: [
        'Gunakan progressive disclosure dan tooltip kontekstual alih-alih tur panjang di awal.',
        'Perlakukan empty state sebagai bagian dari onboarding.',
      ],
      en: [
        'Use progressive disclosure and contextual tooltips instead of a long upfront tour.',
        'Treat empty states as part of onboarding.',
      ],
    },
    pairsWellWith: ['clarify', 'delight', 'harden'],
    spotlight: {
      title: {
        id: 'UX untuk Pengguna Baru, Bukan Recon Kodebase',
        en: 'End-User UX, Not Codebase Recon',
      },
      body: {
        id: 'Di upstream, onboard merancang alur first-run, empty state, dan jalur aktivasi bagi pengguna baru produk. Ia tidak memetakan komponen atau dependency proyek.',
        en: 'Upstream onboard designs first-run flows, empty states and activation paths for a product\'s new users. It does not map a project\'s components or dependencies.',
      },
    },
    sourcePath: 'skill/reference/onboard.md',
  },
  {
    name: 'animate',
    category: 'enhance',
    invocation: 'user',
    description: {
      id: 'Tambahkan gerak yang bertujuan: menjelaskan state, hubungan, dan hierarki, atau satu momen yang layak diciptakan. Dekorasi tanpa tujuan adalah utang animasi.',
      en: 'Add purposeful motion that explains state, relationship and hierarchy, or creates one authored moment the surface has earned. Decoration without purpose is animation debt.',
    },
    detailedDescription: {
      id: '`/impeccable animate [target]` menyesuaikan gerak dengan mode pengunjung (Persuade/Experience boleh membawa suara; Operate/Read untuk umpan balik, state, kontinuitas, tanpa choreography saat load; native mengikuti Motion di ios.md/android.md termasuk Reduce Motion). Langkah: temukan pekerjaan gerak (mengakui aksi, membuat perubahan state/spasial terbaca, menjaga kontinuitas, mengarahkan perhatian, mewujudkan dunia visual), tulis motion thesis singkat (momen fokus, kontinuitas) sebelum implementasi.',
      en: '`/impeccable animate [target]` fits motion to visitor mode (Persuade/Experience may carry the voice; Operate/Read serve feedback, state and continuity with no page-load choreography; native follows the Motion section of ios.md/android.md including Reduce Motion). Steps: find motion\'s job (acknowledge an action, make state or spatial change legible, preserve continuity, direct attention, embody the visual world), then write a short motion thesis (focal moment, continuity) before implementing.',
    },
    useWhen: {
      id: [
        'Menambah animasi, transisi, micro-interaction, efek hover, atau membuat UI terasa lebih hidup.',
        'Perubahan state atau layout yang butuh kontinuitas agar terbaca.',
      ],
      en: [
        'Adding animation, transitions, micro-interactions, hover effects or making the UI feel more alive.',
        'State or layout changes that need continuity to read.',
      ],
    },
    avoidWhen: {
      id: [
        'Menganimasikan area statis hanya karena ada.',
        'Membuat pengguna menunggu koreografi saat load di UI Operate/Read; di native jangan pakai tooling web.',
      ],
      en: [
        'Animating a static area merely because it exists.',
        'Making users wait through page-load choreography in Operate/Read UI; on native, do not use web tooling.',
      ],
    },
    howItWorks: {
      id: [
        'Periksa bahasa gerak yang ada, state interaksi, perangkat target, dan anggaran performa.',
        'Temukan hanya tempat di mana gerak mengakui aksi, menjelaskan perubahan, menjaga kontinuitas, atau mengarahkan perhatian.',
        'Tulis motion thesis singkat sebelum implementasi.',
      ],
      en: [
        'Inspect the existing motion language, interaction states, target devices and performance budget.',
        'Find only the places where motion acknowledges an action, explains a change, preserves continuity or directs attention.',
        'Write a short motion thesis before implementing.',
      ],
    },
    coreRules: {
      id: [
        'Gerak harus menjelaskan state, hubungan, atau hierarki; jika tidak, itu utang animasi.',
        'Hormati Reduce Motion platform dan anggaran performa.',
      ],
      en: [
        'Motion must explain state, relationship or hierarchy; otherwise it is animation debt.',
        'Respect the platform\'s Reduce Motion behavior and the performance budget.',
      ],
    },
    tips: {
      id: [
        'Utamakan satu urutan fokus yang direhearsal daripada reveal berulang di setiap section (Persuade/Experience).',
        'Konteks tambahan: batasan performa.',
      ],
      en: [
        'Prefer one rehearsed focal sequence over repeated section reveals (Persuade/Experience).',
        'Additional context: performance constraints.',
      ],
    },
    pairsWellWith: ['delight', 'overdrive', 'optimize'],
    spotlight: {
      title: {
        id: 'Motion Thesis Sebelum Kode',
        en: 'A Motion Thesis Before Code',
      },
      body: {
        id: 'Sebelum menulis animasi, tulis rencana pendek: momen fokus dan kontinuitas yang perlu dijelaskan. Gerak tanpa hubungan ke hierarki, state, konten, atau dunia visual dianggap utang.',
        en: 'Before writing animation, write a short plan: the focal moment and the continuity that needs explaining. Motion without a relationship to hierarchy, state, content or the visual world counts as debt.',
      },
    },
    sourcePath: 'skill/reference/animate.md',
  },
  {
    name: 'colorize',
    category: 'enhance',
    invocation: 'user',
    description: {
      id: 'Tambahkan warna strategis pada antarmuka yang monokromatik atau abu-abu: warna sebagai hierarki, makna, dan atmosfer. Kontras mengikuti lantai WCAG AA.',
      en: 'Add strategic color to monochromatic or gray interfaces: color as hierarchy, meaning and atmosphere. Contrast follows the WCAG AA floor.',
    },
    detailedDescription: {
      id: '`/impeccable colorize [target]` memperkenalkan warna tanpa mengganti dunia visual atau komitmen brand. Mode pengunjung menentukan peran: Persuade/Experience boleh menguasai wilayah luas; Operate/Read memakai warna untuk aksi, seleksi, status, wayfinding, dan hierarki baca. Audit dulu (warna brand terkonfirmasi, peran permukaan/teks/aksi/semantik, tempat grayscale mengaburkan hierarki, kegagalan kontras), tentukan strategi (temperatur emosional, relasi dominan, rentang kontras, dosis warna), bangun peran bukan kumpulan swatch. Kontras: teks body 4.5:1, teks besar 3:1, kontrol/ikon/fokus 3:1 (WCAG AA).',
      en: '`/impeccable colorize [target]` introduces color without replacing the visual world or brand commitments. Visitor mode sets the role: Persuade/Experience may own large regions; Operate/Read use color for action, selection, status, wayfinding and reading hierarchy. Audit first (confirmed brand colors, surface/text/action/semantic roles, where grayscale obscures hierarchy, contrast failures), choose a strategy (emotional temperature, dominant relationship, contrast range, color dosage), build roles not a bag of swatches. Contrast: body text 4.5:1, large text 3:1, controls/icons/focus 3:1 (WCAG AA).',
    },
    useWhen: {
      id: [
        'Desain terlihat abu-abu, kusam, kurang hangat, atau butuh palet lebih hidup dan ekspresif.',
        'Grayscale mengaburkan hierarki atau state.',
      ],
      en: [
        'A design looks gray, dull, lacks warmth, or needs a more vibrant, expressive palette.',
        'Grayscale obscures hierarchy or state.',
      ],
    },
    avoidWhen: {
      id: [
        'Membutuhkan identitas baru: gunakan new-work (colorize tidak mengganti dunia visual).',
        'Mengandalkan warna saja untuk menyampaikan informasi: tambahkan teks, bentuk, ikon, atau posisi.',
      ],
      en: [
        'Needing a new identity: use new-work (colorize does not replace the visual world).',
        'Relying on color alone to convey information: add text, shape, iconography or position.',
      ],
    },
    howItWorks: {
      id: [
        'Baca DESIGN.md, token, aset, tema, dan state; identifikasi warna brand dan peran warna saat ini.',
        'Namai strategi: temperatur emosional, relasi dominan, rentang kontras, dan dosis warna sebelum mengedit.',
        'Verifikasi pasangan foreground/background yang dihitung, termasuk state interaktif, overlay, teks di atas gambar, konten disabled, dan kedua tema.',
      ],
      en: [
        'Read DESIGN.md, tokens, assets, themes and states; identify brand colors and current color roles.',
        'Name the strategy: emotional temperature, dominant relationship, contrast range and color dosage before editing.',
        'Verify computed foreground/background pairs, including interactive states, overlays, text on images, disabled content and both themes.',
      ],
    },
    coreRules: {
      id: [
        'Kontras minimum WCAG AA: teks body 4.5:1, teks besar 3:1, kontrol/ikon/fokus 3:1.',
        'Pertahankan komitmen brand dan konvensi semantik yang sudah terkonfirmasi.',
        'Saat menurunkan ramp OKLCH, variasikan lightness dan kurangi chroma di dekat putih dan hitam.',
      ],
      en: [
        'WCAG AA minimums: body text 4.5:1, large text 3:1, controls/icons/focus indicators 3:1.',
        'Preserve confirmed brand commitments and semantic conventions.',
        'When deriving OKLCH ramps, vary lightness and reduce chroma near white and black.',
      ],
    },
    tips: {
      id: [
        'Simulasikan defisiensi penglihatan warna umum; jangan hanya mengandalkan mata.',
        'Konteks tambahan: warna brand yang ada.',
      ],
      en: [
        'Simulate common color-vision deficiencies; do not rely on eyesight alone.',
        'Additional context: existing brand colors.',
      ],
    },
    pairsWellWith: ['bolder', 'typeset', 'audit'],
    spotlight: {
      title: {
        id: 'Peran, Bukan Tumpukan Swatch',
        en: 'Roles, Not a Bag of Swatches',
      },
      body: {
        id: 'Colorize membangun peran warna (permukaan, teks, aksi, semantik) dengan strategi yang dinamai, bukan menambah warna acak. Lantai kontrasnya adalah WCAG AA, bukan AAA.',
        en: 'Colorize builds color roles (surface, text, action, semantic) with a named strategy, rather than sprinkling colors. Its contrast floor is WCAG AA, not AAA.',
      },
    },
    sourcePath: 'skill/reference/colorize.md',
  },
  {
    name: 'typeset',
    category: 'enhance',
    invocation: 'user',
    description: {
      id: 'Perbaiki tipografi di dalam dunia visual yang ada: pilihan font, hierarki, ukuran, bobot, dan keterbacaan, lewat dua asesmen terisolasi (tipografis dan pemindaian mekanis).',
      en: 'Improve typography inside the established visual world: font choices, hierarchy, sizing, weight and readability, via two isolated assessments (typographic and mechanical scan).',
    },
    detailedDescription: {
      id: '`/impeccable typeset [target]` mempertahankan keluarga font yang sudah dikonfirmasi dan memperbaiki pemakaiannya; mengganti tipografi yang menciptakan identitas baru dirutekan lewat new-work dan DESIGN.md diperbarui. Asesmen tipografis menjawab dengan bukti file/selector/nilai komputasi: otoritas & kecocokan, hierarki, skala & konsistensi, membaca (ukuran baris 45–75 karakter, line height, tracking), stres (judul panjang, lokalisasi, zoom, fallback), dan pengiriman font. Pemindaian mekanis: `impeccable detect --json --scope type`.',
      en: '`/impeccable typeset [target]` keeps confirmed font families and improves their use; replacing typography in a way that creates a new identity routes through new-work and updates DESIGN.md. The typographic assessment answers with file/selector/computed-value evidence: authority and fit, hierarchy, scale and consistency, reading (45–75 character measure, line height, tracking), stress (long headings, localization, zoom, fallback) and delivery. Mechanical scan: `impeccable detect --json --scope type`.',
    },
    useWhen: {
      id: [
        'Membahas font, tipe, keterbacaan, hierarki teks, ukuran yang terasa salah, atau tipografi yang lebih sengaja.',
        'Hierarki heading/body/label/metadata sulit dibedakan sekilas.',
      ],
      en: [
        'Fonts, type, readability, text hierarchy, sizing that looks off, or more intentional typography.',
        'Heading, body, label and metadata roles are hard to tell apart at a glance.',
      ],
    },
    avoidWhen: {
      id: [
        'Mengganti identitas tipografis tanpa diminta.',
        'Menganggap pemindaian bersih sebagai bukti tipografi yang baik: itu hanya lantai.',
      ],
      en: [
        'Replacing the typographic identity unasked.',
        'Treating a clean scan as proof of good typography: it is only a floor.',
      ],
    },
    howItWorks: {
      id: [
        'Jalankan dua asesmen independen (sub-agent bila ada): tipografis dan pemindaian mekanis `detect --scope type`; jangan biarkan detector menjangkarkan penilaian.',
        'Periksa juga nilai font dinamis atau arbitrer yang tidak bisa diinterpretasi detector.',
        'Sintesis kedua asesmen sebelum mengedit, catat apa yang masing-masing tangkap sendiri.',
      ],
      en: [
        'Run two independent assessments (sub-agents if available): typographic and the mechanical `detect --scope type` scan; do not let the detector anchor judgment.',
        'Also inspect dynamic or arbitrary font values the detector cannot interpret.',
        'Synthesize both assessments before editing, noting what each caught alone.',
      ],
    },
    coreRules: {
      id: [
        'Operate/Read: stabilitas, scanability, dan measure lebih dulu; satu keluarga yang di-tune dengan skala peran tetap sering sudah tepat.',
        'Teks body dijaga dalam measure 45–75 karakter; line height dan tracking disetel sesuai face, lebar, bahasa, dan permukaan.',
        'Hanya muat aset font yang dipakai; hindari teks tak terlihat dan reflow mengganggu.',
      ],
      en: [
        'Operate/Read: stability, scanability and measure first; a single well-tuned family with a fixed role scale is often right.',
        'Keep body copy within a 45–75 character measure; tune line height and tracking to the face, width, language and surface.',
        'Load only used font assets; avoid invisible text and disruptive reflow.',
      ],
    },
    tips: {
      id: [
        'Native mengikuti ios.md atau android.md, termasuk scaling dan aksesibilitas platform.',
        'Uji judul panjang, ekspansi lokalisasi, zoom, container sempit, dan weight yang hilang.',
      ],
      en: [
        'Native follows ios.md or android.md, including platform scaling and accessibility.',
        'Test long headings, localization expansion, zoom, narrow containers and missing weights.',
      ],
    },
    pairsWellWith: ['colorize', 'layout', 'polish'],
    spotlight: {
      title: {
        id: 'Ukuran Baris 45–75 Karakter',
        en: 'A 45–75 Character Measure',
      },
      body: {
        id: 'Untuk bacaan, typeset menjaga body copy dalam 45–75 karakter per baris dan menyetel line height dan tracking sesuai face dan lebarnya, bukan mengikuti satu angka line-height tetap.',
        en: 'For reading, typeset keeps body copy within 45–75 characters per line and tunes line height and tracking to the face and width, rather than following one fixed line-height number.',
      },
    },
    sourcePath: 'skill/reference/typeset.md',
  },
  {
    name: 'layout',
    category: 'enhance',
    invocation: 'user',
    description: {
      id: 'Perbaiki layout, spacing, dan ritme visual: ubah prioritas produk menjadi urutan baca, pengelompokan, ritme, dan ruang yang bisa dipakai.',
      en: 'Fix layout, spacing and visual rhythm: turn product priority into reading order, grouping, rhythm and usable space.',
    },
    detailedDescription: {
      id: '`/impeccable layout [target]` mendiagnosis masalah struktural sebelum memindahkan kotak. Dua asesmen terisolasi: asesmen layout (urutan baca lewat squint test, pengelompokan, ritme, struktur/topologi, kepadatan, adaptasi di berbagai state/viewport termasuk urutan DOM & fokus, kasus ekstrem) dan pemindaian mekanis `impeccable detect --json --scope layout`. Pertahankan dunia visual; layout mengubah struktur di dalamnya.',
      en: '`/impeccable layout [target]` diagnoses the structural problem before moving boxes. Two isolated assessments: a layout assessment (reading order via the squint test, grouping, rhythm, structure/topology, density, adaptation across states/viewports including DOM and focus order, extremes) and a mechanical scan `impeccable detect --json --scope layout`. Preserve the visual world; layout changes structure inside it.',
    },
    useWhen: {
      id: [
        'Layout terasa off, spacing tidak konsisten, hierarki lemah, UI sesak, masalah alignment, atau komposisi lebih baik.',
        'Grid yang monoton atau card yang dipakai sebagai wadah malas.',
      ],
      en: [
        'Layout feels off, spacing is inconsistent, hierarchy is weak, the UI is crowded, alignment issues, or better composition is wanted.',
        'Monotonous grids or cards used as a lazy container.',
      ],
    },
    avoidWhen: {
      id: [
        'Mengganti identitas visual: itu wilayah new-work.',
        'Memperbaiki hanya sebagian gejala tanpa mendiagnosis akar masalah struktural.',
      ],
      en: [
        'Replacing the visual identity: that belongs to new-work.',
        'Patching symptoms without diagnosing the structural root cause.',
      ],
    },
    howItWorks: {
      id: [
        'Squint test: dengan detail diburamkan, apakah elemen primer, sekunder, dan kelompok utama masih terbaca berurutan?',
        'Periksa pengelompokan (kedekatan vs container yang menutupi proximity lemah), ritme (interval ketat dan lega), dan kepadatan sesuai mode pengunjung.',
        'Periksa adaptasi sempit/menengah/lebar/zoom/lokalisasi, dan ekstrem (konten panjang, empty state, overlay, safe area, target sentuh kecil).',
      ],
      en: [
        'Squint test: with detail blurred, can you still identify the primary element, secondary element and major groups in order?',
        'Check grouping (proximity vs containers compensating for weak proximity), rhythm (tight and generous intervals) and density per visitor mode.',
        'Check adaptation at narrow/intermediate/wide/zoomed/localized states, and extremes (long content, empty states, overlays, safe areas, small touch targets).',
      ],
    },
    coreRules: {
      id: [
        'Operate/Read: struktur yang dapat diprediksi, kepadatan stabil, dan linearitas yang bisa dinavigasi adalah affordance.',
        'Urutan DOM dan fokus harus sejalan dengan urutan visual.',
      ],
      en: [
        'Operate/Read: predictable structure, stable density and navigable linearity are affordances.',
        'DOM and focus order must agree with the visual order.',
      ],
    },
    tips: {
      id: [
        'Native mengikuti ios.md atau android.md untuk navigasi, inset, adaptasi, dan target sentuh.',
        'Card dengan ikon + heading + teks berukuran sama bukan struktur halaman.',
      ],
      en: [
        'Native follows ios.md or android.md for navigation, insets, adaptation and touch targets.',
        'Same-size icon + heading + text cards are not a page structure.',
      ],
    },
    pairsWellWith: ['typeset', 'polish', 'adapt'],
    spotlight: {
      title: {
        id: 'Diagnosis Struktural Sebelum Memindahkan Kotak',
        en: 'Structural Diagnosis Before Moving Boxes',
      },
      body: {
        id: 'Layout memulai dari squint test dan pertanyaan tentang urutan baca, pengelompokan, dan ritme; hasil pemindaian `detect --scope layout` hanya menjadi bukti pendamping.',
        en: 'Layout starts from the squint test and questions about reading order, grouping and rhythm; the `detect --scope layout` scan is only supporting evidence.',
      },
    },
    sourcePath: 'skill/reference/layout.md',
  },
  {
    name: 'delight',
    category: 'enhance',
    invocation: 'user',
    description: {
      id: 'Tambahkan momen yang berkesan di saat yang pantas: karakter produk yang terungkap lewat interaksi berguna, respons manusiawi, atau detail yang dipertimbangkan.',
      en: 'Add memorable moments where they are earned: product character revealed through a useful interaction, a humane response or a considered detail.',
    },
    detailedDescription: {
      id: '`/impeccable delight [target]` bukan lapisan whimsy generik. Cari peluang (usaha yang layak diakui, penantian yang bisa informatif, empty/first-use state, momen error/recovery yang butuh empati, interaksi yang responsnya bisa mengekspresikan brand, kapabilitas yang menyenangkan untuk ditemukan), lalu tentukan satu delight thesis. Persuade/Experience: kepribadian dapat mengalir lewat suara, komposisi, gerak; Operate/Read: konsentrasikan delight pada momen bermakna (pemakaian pertama, selesai, pemulihan, penguasaan).',
      en: '`/impeccable delight [target]` is not a layer of generic whimsy. Look for opportunities (effort worth acknowledging, waiting that can become informative, empty/first-use states, error/recovery moments needing empathy, interactions whose response could express the brand, capabilities people might enjoy discovering), then define one delight thesis. Persuade/Experience: personality may run through voice, composition and motion; Operate/Read: concentrate delight at meaningful moments (first use, completion, recovery, mastery).',
    },
    useWhen: {
      id: [
        'Meminta polish, kepribadian, micro-interaction, atau membuat antarmuka terasa menyenangkan dan berkesan.',
        'Momen penyelesaian, pemulihan, atau penguasaan yang layak diakui.',
      ],
      en: [
        'Asking for polish, personality, micro-interactions, or making an interface feel fun and memorable.',
        'Completion, recovery or mastery moments that deserve acknowledgement.',
      ],
    },
    avoidWhen: {
      id: [
        'Membuat perayaan untuk klik biasa.',
        'Menimpa keandalan: di Operate/Read, kehandalan yang membawa sisanya.',
      ],
      en: [
        'Manufacturing a celebration for an ordinary click.',
        'Overriding reliability: in Operate/Read, reliability carries everything else.',
      ],
    },
    howItWorks: {
      id: [
        'Periksa target, DESIGN.md, suara produk, frekuensi pemakaian, dan konteks emosional.',
        'Cari peluang yang layak (usaha, penantian, empty state, error/recovery, respons yang bisa mengekspresikan brand).',
        'Tentukan satu delight thesis lalu implementasikan.',
      ],
      en: [
        'Inspect the target, DESIGN.md, product voice, frequency of use and emotional context.',
        'Find opportunities that are earned (effort, waiting, empty state, error/recovery, responses that express the brand).',
        'Define one delight thesis, then implement.',
      ],
    },
    coreRules: {
      id: [
        'Delight adalah karakter produk yang terungkap lewat sesuatu yang berguna, bukan hiasan.',
        'Tanyakan bila jangkauan emosional brand atau taruhannya tidak bisa disimpulkan.',
      ],
      en: [
        'Delight is product character revealed through something useful, not decoration.',
        'Ask when the brand\'s emotional range or the stakes cannot be inferred.',
      ],
    },
    tips: {
      id: [
        'Konteks tambahan: jangkauan emosional brand.',
        'Pasangkan dengan `animate` untuk gerak yang mengekspresikan karakter.',
      ],
      en: [
        'Additional context: the brand\'s emotional range.',
        'Pair with `animate` for motion that expresses character.',
      ],
    },
    pairsWellWith: ['animate', 'onboard', 'overdrive'],
    spotlight: {
      title: {
        id: 'Karakter Produk, Bukan Whimsy Generik',
        en: 'Product Character, Not Generic Whimsy',
      },
      body: {
        id: 'Delight di sini berarti respons yang dipikirkan (copy, ilustrasi, bunyi, haptik, gerak) di momen yang pantas, bukan lapisan hiasan; ia tidak dijelaskan sebagai pegas atau efek hover.',
        en: 'Delight here means a considered response (copy, illustration, sound, haptics, motion) at an earned moment, not a decorative layer; it is not described in terms of springs or hover effects.',
      },
    },
    sourcePath: 'skill/reference/delight.md',
  },
  {
    name: 'overdrive',
    category: 'enhance',
    invocation: 'user',
    description: {
      id: 'Dorong antarmuka melampaui batas konvensional dengan implementasi yang ambisius secara teknis — setelah mengusulkan 2-3 arah dan mendapat pilihan pengguna.',
      en: 'Push interfaces past conventional limits with technically ambitious implementations — after proposing 2-3 directions and getting the user\'s pick.',
    },
    detailedDescription: {
      id: '`/impeccable overdrive [target]` memakai kekuatan penuh browser agar bagian antarmuka apa pun terasa luar biasa: bukan hanya efek visual, tetapi misalnya tabel yang menangani sejuta baris atau dialog yang bermorfosis dari pemicunya. Konteks menentukan arti "luar biasa". Command ini paling berpotensi salah arah, jadi WAJIB mengusulkan 2-3 arah (teknik, tingkat ambisi, pendekatan estetika, dengan trade-off), mendapat pilihan pengguna sebelum menulis kode, lalu memakai otomasi browser untuk melihat dan mengiterasi hasilnya.',
      en: '`/impeccable overdrive [target]` uses the full power of the browser to make any part of an interface feel extraordinary: not just visual effects, but e.g. a table that handles a million rows or a dialog that morphs from its trigger. Context determines what "extraordinary" means. It has the highest potential to misfire, so it MUST propose 2-3 directions (techniques, ambition levels, aesthetic approaches, with trade-offs), get the user\'s pick before writing code, then use browser automation to preview and iterate.',
    },
    useWhen: {
      id: [
        'Ingin membuat orang terkesan, all-out, atau membuat sesuatu yang terasa luar biasa secara teknis.',
        'Ada momen yang layak mendapat shader, spring physics, scroll-driven reveal, atau animasi 60fps.',
      ],
      en: [
        'Wanting to wow, go all-out, or make something that feels technically extraordinary.',
        'A moment that deserves shaders, spring physics, scroll-driven reveals or 60fps animations.',
      ],
    },
    avoidWhen: {
      id: [
        'Langsung mengimplementasi tanpa mengusulkan arah dan menunggu pilihan pengguna.',
        'Efek yang tidak sesuai konteks (sistem partikel di halaman settings): konteks menentukan artinya.',
      ],
      en: [
        'Jumping straight into implementation without proposing directions and waiting for the user\'s pick.',
        'Effects out of context (a particle system on a settings page): context determines the meaning.',
      ],
    },
    howItWorks: {
      id: [
        'Pikirkan 2-3 arah berbeda (teknik, ambisi, estetika) dan jelaskan hasil dan trade-off tiap arah (dukungan browser, performa, kompleksitas).',
        'Dapatkan pilihan pengguna sebelum menulis kode; lanjutkan hanya dengan arah yang dikonfirmasi.',
        'Iterasi dengan otomasi browser: efek ambisius hampir tidak pernah berhasil di percobaan pertama.',
      ],
      en: [
        'Think through 2-3 different directions (technique, ambition, aesthetic) and describe each one\'s result and trade-offs (browser support, performance, complexity).',
        'Get the user\'s pick before writing code; proceed only with the confirmed direction.',
        'Iterate with browser automation: ambitious effects almost never work on the first try.',
      ],
    },
    coreRules: {
      id: [
        'Wajib mengusulkan sebelum membangun; melewati langkah ini berisiko membuat sesuatu yang memalukan dan harus dibuang.',
        'Wajib memakai otomasi browser untuk memverifikasi hasil; jangan berasumsi efeknya terlihat benar.',
      ],
      en: [
        'Proposing before building is required; skipping it risks building something embarrassing that must be thrown away.',
        'Browser automation is required to verify results; never assume the effect looks right.',
      ],
    },
    tips: {
      id: [
        'Reference-nya membuka dengan banner "OVERDRIVE" saat command dijalankan.',
        'Settings page dengan simpan optimistis instan dan transisi halus bisa lebih mengesankan daripada efek mencolok.',
      ],
      en: [
        'The reference opens with an "OVERDRIVE" banner when the command runs.',
        'A settings page with instant optimistic saves and smooth transitions can be more impressive than flashy effects.',
      ],
    },
    pairsWellWith: ['animate', 'delight', 'optimize'],
    spotlight: {
      title: {
        id: 'Usulkan Dulu, Bangun Kemudian',
        en: 'Propose First, Build Second',
      },
      body: {
        id: 'Overdrive adalah command dengan potensi salah arah tertinggi, sehingga skill mewajibkan 2-3 arah dengan trade-off dan pilihan pengguna sebelum satu baris kode ditulis.',
        en: 'Overdrive has the highest potential to misfire, so the skill requires 2-3 directions with trade-offs and the user\'s pick before a single line of code is written.',
      },
    },
    sourcePath: 'skill/reference/overdrive.md',
  },
  {
    name: 'clarify',
    category: 'fix',
    invocation: 'user',
    description: {
      id: 'Perbaiki teks UX yang membingungkan: label, microcopy, pesan error, dan instruksi, agar pengguna paham apa yang terjadi, apa yang penting, dan apa yang harus dilakukan.',
      en: 'Fix unclear UX text: labels, microcopy, error messages and instructions, so users understand what happened, what matters and what to do next.',
    },
    detailedDescription: {
      id: '`/impeccable clarify [target]` menulis ulang teks antarmuka dengan mempertahankan makna faktual, terminologi produk, dan suara brand. Audit seluruh jalur interaksi (bukan string terisolasi): kata benda/kerja ambigu, jargon, label dan state yang kabur, konsekuensi/pemulihan yang hilang, terminologi tak konsisten, teks berulang, teks yang pecah di lebar nyata atau terjemahan, dan nada yang mengabaikan stres/risiko/urgensi. Tetapkan hierarki pesan per state: satu fakta yang dibutuhkan sekarang, aksi berikutnya, konteks pendukung.',
      en: '`/impeccable clarify [target]` rewrites interface text while preserving factual meaning, product terminology and brand voice. Audit the whole interaction path (not isolated strings): ambiguous nouns/verbs, jargon, vague labels and states, missing consequences/recovery, inconsistent terminology, redundant text, text that breaks at realistic widths or in translation, and tone that ignores stress, risk or urgency. Set a message hierarchy per state: the one fact needed now, the next action, supporting context.',
    },
    useWhen: {
      id: [
        'Teks membingungkan, label tidak jelas, pesan error buruk, instruksi sulit diikuti, atau butuh UX writing lebih baik.',
        'Mengganti pesan error yang tidak menyebut masalah dan cara pulih.',
      ],
      en: [
        'Confusing text, unclear labels, bad error messages, hard-to-follow instructions, or better UX writing.',
        'Replacing error messages that name neither the problem nor the recovery.',
      ],
    },
    avoidWhen: {
      id: [
        'Mengubah klaim faktual, makna hukum, atau istilah domain tanpa bertanya.',
        'Menulis ulang string terisolasi tanpa membaca seluruh jalur interaksi.',
      ],
      en: [
        'Changing factual claims, legal meaning or domain-specific terms without asking.',
        'Rewriting isolated strings without reading the whole interaction path.',
      ],
    },
    howItWorks: {
      id: [
        'Audit bahasa seluruh jalur interaksi dan simpulkan audiens dan tugas dari konteks produk dan UI di sekitarnya.',
        'Tetapkan hierarki pesan per state: fakta utama, aksi berikutnya, konteks pendukung.',
        'Tulis ulang dengan terminologi dan kapitalisasi konsisten, dan periksa pada lebar dan terjemahan realistis.',
      ],
      en: [
        'Audit the language of the whole interaction path and infer audience and task from product context and surrounding UI.',
        'Set the message hierarchy per state: the key fact, the next action, supporting context.',
        'Rewrite with consistent terminology and capitalization, and check at realistic widths and in translation.',
      ],
    },
    coreRules: {
      id: [
        'Pertahankan makna faktual, terminologi produk, dan suara brand.',
        'Kontrol menamai aksinya; error menamai masalah dan pemulihan.',
      ],
      en: [
        'Preserve factual meaning, product terminology and brand voice.',
        'Controls name their action; errors name the problem and the recovery.',
      ],
    },
    tips: {
      id: [
        'Konteks tambahan: pengetahuan audiens dan keadaan emosional.',
        'Hapus heading, intro, helper text, dan konfirmasi yang redundan.',
      ],
      en: [
        'Additional context: audience knowledge and emotional state.',
        'Remove redundant headings, intros, helper text and confirmations.',
      ],
    },
    pairsWellWith: ['onboard', 'harden', 'polish'],
    spotlight: {
      title: {
        id: 'Baca Jalur, Bukan String',
        en: 'Read the Path, Not the String',
      },
      body: {
        id: 'Clarify mengaudit seluruh jalur interaksi dan menyusun hierarki pesan (satu fakta sekarang, aksi berikutnya, konteks) agar teks tidak hanya bagus sendiri tetapi tepat untuk state dan nada situasinya.',
        en: 'Clarify audits the entire interaction path and builds a message hierarchy (one fact now, next action, context) so text is not only good alone but right for the state and tone of the situation.',
      },
    },
    sourcePath: 'skill/reference/clarify.md',
  },
  {
    name: 'adapt',
    category: 'fix',
    invocation: 'user',
    description: {
      id: 'Adaptasikan desain ke ukuran layar, perangkat, konteks, atau platform lain — bukan sekadar menskalakan, melainkan memikirkan ulang pengalaman untuk konteks baru. Khusus web (termasuk mobile web).',
      en: 'Adapt a design to other screen sizes, devices, contexts or platforms — not just scaling, but rethinking the experience for the new context. Web only (including mobile web).',
    },
    detailedDescription: {
      id: '`/impeccable adapt [target] [context]` menilai tantangan adaptasi: konteks sumber (apa asumsinya: layar besar, mouse, koneksi cepat?) dan konteks target (perangkat, metode input, batasan layar, koneksi, konteks pemakaian, ekspektasi pengguna). Mengimplementasi breakpoint, layout fluid, dan target sentuh. Proyek native (ios/android/adaptive) dirutekan ke `adapt.native.md`.',
      en: '`/impeccable adapt [target] [context]` assesses the adaptation challenge: the source context (what assumptions: big screen, mouse, fast connection?) and the target context (device, input method, screen constraints, connection, usage context, user expectations). Implements breakpoints, fluid layouts and touch targets. Native projects (ios/android/adaptive) route to `adapt.native.md`.',
    },
    useWhen: {
      id: [
        'Membahas responsive design, layout mobile, breakpoint, adaptasi viewport, atau kompatibilitas lintas perangkat.',
        'Desain dibuat untuk desktop dan perlu dipikirkan ulang untuk sentuhan, layar kecil, atau cetak.',
      ],
      en: [
        'Responsive design, mobile layouts, breakpoints, viewport adaptation or cross-device compatibility.',
        'A design made for desktop that needs rethinking for touch, small screens or print.',
      ],
    },
    avoidWhen: {
      id: [
        'Proyek native: gunakan varian `adapt.native.md` (command ini khusus web).',
        'Menganggap adaptasi sebagai penskalaan.',
      ],
      en: [
        'Native projects: use the `adapt.native.md` variant (this command is web only).',
        'Treating adaptation as scaling.',
      ],
    },
    howItWorks: {
      id: [
        'Identifikasi konteks sumber: dirancang untuk apa, asumsi apa (layar besar, mouse, koneksi cepat), apa yang sudah bekerja.',
        'Pahami konteks target: perangkat, input, batasan layar, koneksi, konteks pemakaian, ekspektasi platform.',
        'Implementasikan adaptasi (breakpoint, layout fluid, target sentuh) dengan mempertimbangkan tantangan yang diidentifikasi.',
      ],
      en: [
        'Identify the source context: what it was designed for, what assumptions (large screen, mouse, fast connection), what already works.',
        'Understand the target context: device, input method, screen constraints, connection, usage context, platform expectations.',
        'Implement the adaptation (breakpoints, fluid layouts, touch targets) addressing the identified challenges.',
      ],
    },
    coreRules: {
      id: [
        'Adaptasi berarti memikirkan ulang pengalaman, bukan menskalakan.',
        'Konteks tambahan: platform/perangkat target dan konteks pemakaian.',
      ],
      en: [
        'Adaptation means rethinking the experience, not scaling.',
        'Additional context: target platforms/devices and usage contexts.',
      ],
    },
    tips: {
      id: [
        'Contoh argumen: `[target] [context (mobile, tablet, print...)]`.',
        'Pertimbangkan koneksi lambat dan offline, bukan hanya ukuran layar.',
      ],
      en: [
        'Example arguments: `[target] [context (mobile, tablet, print...)]`.',
        'Consider slow connections and offline, not just screen size.',
      ],
    },
    pairsWellWith: ['layout', 'harden', 'optimize'],
    spotlight: {
      title: {
        id: 'Bukan Penskalaan',
        en: 'Not Scaling',
      },
      body: {
        id: 'Jebakannya: memperlakukan adaptasi sebagai penskalaan. Pekerjaannya memikirkan ulang pengalaman untuk konteks baru, dengan varian terpisah untuk platform native.',
        en: 'The trap is treating adaptation as scaling. The job is rethinking the experience for the new context, with a separate variant for native platforms.',
      },
    },
    sourcePath: 'skill/reference/adapt.md',
  },
  {
    name: 'optimize',
    category: 'fix',
    invocation: 'user',
    description: {
      id: 'Diagnosis dan perbaiki performa UI: kecepatan load, rendering, animasi, gambar, dan ukuran bundle, dengan mengukur sebelum dan sesudah. Berpatokan pada Core Web Vitals.',
      en: 'Diagnose and fix UI performance: loading speed, rendering, animations, images and bundle size, measured before and after. Anchored on Core Web Vitals.',
    },
    detailedDescription: {
      id: '`/impeccable optimize [target]` menemukan bottleneck sebenarnya untuk antarmuka INI, memperbaikinya, lalu mengukur. Ukur dulu keadaan sekarang (Core Web Vitals LCP/INP/CLS, waktu load, ukuran bundle, performa runtime, jaringan), identifikasi bottleneck (apa yang lambat, penyebabnya, seberapa buruk, siapa terdampak), lalu susun strategi sistematis. Jangan mengoptimalkan apa yang tidak lambat.',
      en: '`/impeccable optimize [target]` finds the actual bottleneck for THIS interface, fixes it, then measures. Measure the current state first (Core Web Vitals LCP/INP/CLS, load time, bundle size, runtime performance, network), identify bottlenecks (what is slow, why, how bad, who is affected), then build a systematic strategy. Do not optimize what is not slow.',
    },
    useWhen: {
      id: [
        'Menyebut lambat, patah-patah, performa, ukuran bundle, waktu load, atau ingin pengalaman lebih cepat dan halus.',
        'Skor Core Web Vitals (LCP, INP, CLS) buruk.',
      ],
      en: [
        'Mentions slow, laggy, janky, performance, bundle size, load time, or wants a faster, smoother experience.',
        'Poor Core Web Vitals scores (LCP, INP, CLS).',
      ],
    },
    avoidWhen: {
      id: [
        'Optimasi prematur: ukur sebelum dan sesudah, dan jangan optimalkan yang tidak lambat.',
        'Menjanjikan hasil yang dijamin: reference menekankan mengukur, bukan klaim pasti.',
      ],
      en: [
        'Premature optimization: measure before and after, and do not optimize what is not slow.',
        'Promising guaranteed results: the reference stresses measuring, not absolute claims.',
      ],
    },
    howItWorks: {
      id: [
        'Ukur keadaan saat ini: Core Web Vitals, waktu load, ukuran bundle, performa runtime, jaringan.',
        'Identifikasi bottleneck: apa yang lambat (load awal, interaksi, animasi), penyebabnya, seberapa parah, siapa yang terdampak.',
        'Terapkan perbaikan di area yang relevan (loading, rendering, animasi, gambar, bundle) lalu ukur ulang.',
      ],
      en: [
        'Measure the current state: Core Web Vitals, load time, bundle size, runtime performance, network.',
        'Identify bottlenecks: what is slow (initial load, interactions, animations), why, how bad, who is affected.',
        'Apply fixes in the relevant area (loading, rendering, animation, images, bundle) then re-measure.',
      ],
    },
    coreRules: {
      id: [
        'Performa adalah fitur: identifikasi bottleneck sebenarnya untuk antarmuka ini, perbaiki, lalu ukur.',
        'Ukur sebelum dan sesudah; optimasi prematur membuang waktu.',
      ],
      en: [
        'Performance is a feature: identify the actual bottleneck for this interface, fix it, then measure.',
        'Measure before and after; premature optimization wastes time.',
      ],
    },
    tips: {
      id: [
        'Pisahkan apakah masalahnya load awal, interaksi, atau animasi sebelum memilih perbaikan.',
        '`audit` juga memeriksa dimensi performa jika Anda butuh laporan terukur lebih dulu.',
      ],
      en: [
        'Separate whether the issue is initial load, interactions or animations before choosing a fix.',
        '`audit` also checks the performance dimension if you need a measured report first.',
      ],
    },
    pairsWellWith: ['audit', 'animate', 'adapt'],
    spotlight: {
      title: {
        id: 'Ukur, Perbaiki, Ukur Lagi',
        en: 'Measure, Fix, Measure Again',
      },
      body: {
        id: '"Performance is a feature" — tetapi jangan mengoptimalkan yang tidak lambat. Command ini berpatokan pada Core Web Vitals dan pengukuran sebelum/sesudah, bukan klaim jaminan seperti "pasti zero CLS".',
        en: '"Performance is a feature" — but do not optimize what is not slow. The command is anchored on Core Web Vitals and before/after measurement, not guarantee claims like "always zero CLS".',
      },
    },
    sourcePath: 'skill/reference/optimize.md',
  },
  {
    name: 'live',
    category: 'iterate',
    invocation: 'user',
    description: {
      id: 'Mode varian visual interaktif: pilih elemen di browser, pilih aksi desain, dan dapatkan varian HTML+CSS buatan AI yang di-hot-swap lewat HMR dev server. Khusus web dan checkout lokal.',
      en: 'Interactive visual variant mode: select elements in the browser, pick a design action, and get AI-generated HTML+CSS variants hot-swapped via the dev server\'s HMR. Web and local checkout only.',
    },
    detailedDescription: {
      id: '`/impeccable live` membutuhkan dev server dengan HMR (Vite, Next.js, Bun, dsb.) atau file HTML statis yang terbuka di browser, dan checkout lokal: injeksi ke situs produksi (termasuk HTTPS) tidak didukung, dan jangan menonaktifkan keamanan browser atau melemahkan CSP. Kontraknya berurutan: boot (`impeccable live`), buka URL app, poll event (`generate`, `steer`, `accept`, `discard`, `exit`), dan balas. Jurnal sesi di `.impeccable/live/sessions/` adalah acuan kanonis, dan `impeccable live-resume` memulihkan sesi. Untuk inspeksi produksi gunakan `impeccable detect <url>` atau ekstensi browser.',
      en: '`/impeccable live` needs a dev server with HMR (Vite, Next.js, Bun, etc.) or a static HTML file open in the browser, and a local checkout: injection into deployed production sites (including HTTPS) is unsupported, and you must not disable browser security or weaken CSP. The contract is ordered: boot (`impeccable live`), open the app URL, poll events (`generate`, `steer`, `accept`, `discard`, `exit`) and reply. The session journal under `.impeccable/live/sessions/` is canonical, and `impeccable live-resume` recovers a session. For production inspection use `impeccable detect <url>` or the browser extension.',
    },
    useWhen: {
      id: [
        'Bereksperimen visual dengan alternatif desain secara real time di browser pada proyek lokal.',
        'Memilih elemen langsung di halaman dan meminta varian dari aksi desain.',
      ],
      en: [
        'Visually experimenting with design alternatives in real time in the browser on a local project.',
        'Picking elements directly on the page and requesting variants from a design action.',
      ],
    },
    avoidWhen: {
      id: [
        'Situs produksi yang sudah di-deploy: live mode hanya untuk checkout lokal; gunakan `detect <url>` untuk inspeksi.',
        'Proyek native: live mode berbasis overlay browser, tidak punya padanan native.',
      ],
      en: [
        'Deployed production sites: live mode is for local checkouts only; use `detect <url>` to inspect.',
        'Native projects: live mode is a browser overlay with no native equivalent.',
      ],
    },
    howItWorks: {
      id: [
        'Boot: `impeccable live` (atau `--target <path>` di monorepo), lalu buka URL app yang menyajikan `pageFile` (bukan `serverPort`).',
        'Poll tanpa henti dengan `impeccable live-poll` (timeout panjang default) dan tangani tiap event: `generate`, `steer`, `accept`/`discard`, `exit`.',
        'Pada `generate`: muat referensi aksi, kirim varian, `--reply done`, lalu poll lagi; overlay pratinjau adalah kanal verifikasinya.',
      ],
      en: [
        'Boot: `impeccable live` (or `--target <path>` in a monorepo), then open the app URL that serves `pageFile` (not `serverPort`).',
        'Poll continuously with `impeccable live-poll` (long default timeout) and handle each event: `generate`, `steer`, `accept`/`discard`, `exit`.',
        'On `generate`: load the action reference, deliver variants, `--reply done`, then poll again; the overlay preview is the verification channel.',
      ],
    },
    coreRules: {
      id: [
        'Jalankan langkah berurutan tanpa melompati atau mengubah urutan; `_instructions` pada output tool adalah langkah berikutnya yang otoritatif.',
        'Gunakan live mode hanya di proyek yang Anda percaya untuk dijalankan lokal: menerapkan edit copy menjalankan skrip `impeccable:manual-edit-validate` (bila ada) di shell dengan izin Anda.',
      ],
      en: [
        'Execute steps in order with none skipped or reordered; the `_instructions` field in tool output is the authoritative next step.',
        'Use live mode only in projects you trust to run locally: applying copy edits runs the optional `impeccable:manual-edit-validate` script in a shell with your permissions.',
      ],
    },
    tips: {
      id: [
        'Bila port default sibuk, kemungkinan app sudah berjalan: periksa URL default sebelum memulai server kedua.',
        'Untuk permintaan yang menyebut elemen dan arah sekaligus, gunakan `generate`.',
      ],
      en: [
        'If the default port is busy the app is very likely already running: probe the default URL before spawning a second server.',
        'For requests naming an element and a direction together, use `generate`.',
      ],
    },
    pairsWellWith: ['generate', 'bolder', 'polish'],
    spotlight: {
      title: {
        id: 'Hot-Swap via HMR, Hanya Lokal',
        en: 'Hot-Swap via HMR, Local Only',
      },
      body: {
        id: 'Varian diterapkan lewat HMR dev server Anda sehingga hasilnya terlihat langsung di halaman asli. Menyuntikkan helper ke situs produksi tidak didukung; untuk produksi gunakan detector atau ekstensi browser.',
        en: 'Variants are applied through your dev server\'s HMR so results show up on the real page. Injecting the helper into production sites is unsupported; for production use the detector or the browser extension.',
      },
    },
    sourcePath: 'skill/reference/live.md',
  },
  {
    name: 'generate',
    category: 'iterate',
    invocation: 'user',
    description: {
      id: 'Jalur cepat ke live mode: sebutkan elemen, arah, dan jumlah dalam satu kalimat, lalu putar varian di browser Anda tanpa memilih elemen manual. Khusus web.',
      en: 'The fast lane into live mode: name an element, a direction and a count in one sentence, then cycle through variants in your browser with no manual element picking. Web only.',
    },
    detailedDescription: {
      id: '`/impeccable generate [n] [action] [element]` menyalakan helper live, menemukan elemen bernama di halaman terbuka, menggulir dan menyorotinya, lalu mengirim N varian pada arah yang diminta. Parse permintaan: angka = jumlah (default 3, maksimal 8); kata arah dipetakan ke kosakata aksi live (bolder, quieter, distill, polish, typeset, colorize, layout, adapt, animate, delight, overdrive, atau `impeccable` dengan wording pengguna sebagai prompt); deskripsi elemen diresolusikan ke selector. Contoh: "generate 3 bold variants of the pricing cards".',
      en: '`/impeccable generate [n] [action] [element]` boots the live helper, finds the named element on the open page, scrolls to and selects it, then delivers N variants in the requested direction. It parses the request: a number = the count (default 3, max 8); direction wording maps to the live action vocabulary (bolder, quieter, distill, polish, typeset, colorize, layout, adapt, animate, delight, overdrive, or `impeccable` with the user\'s wording as the prompt); the element description resolves to a selector. Example: "generate 3 bold variants of the pricing cards".',
    },
    useWhen: {
      id: [
        'Permintaan yang menyebut elemen dan arah sekaligus, mis. "generate 3 bold variants of the pricing cards".',
        'Ingin varian/alternatif tanpa memilih elemen secara manual di overlay.',
      ],
      en: [
        'A request that names an element and a direction, e.g. "generate 3 bold variants of the pricing cards".',
        'Wanting variants or alternatives without picking the element manually in the overlay.',
      ],
    },
    avoidWhen: {
      id: [
        'Proyek native: live mode tidak punya padanan native; tolak dan tawarkan `bolder` atau `quieter` pada source.',
        'Menjalankan init/document atau menanyakan PRODUCT.md/DESIGN.md di dalam command ini; tawarkan `init` satu baris setelah sesi bila konteks hilang.',
      ],
      en: [
        'Native projects: live mode has no native equivalent; decline and offer `bolder` or `quieter` on the source.',
        'Running init/document or asking for PRODUCT.md/DESIGN.md inside this command; offer `init` in one line after the session if context is missing.',
      ],
    },
    howItWorks: {
      id: [
        'Parse: jumlah (default 3, maks 8), arah → aksi dari kosakata live, deskripsi elemen.',
        'Gunakan ulang halaman yang sudah ditampilkan harness dan mulai sesi; satu perintah menyalakan helper, menggulir, memilih elemen, dan memicu Go.',
        'Rencanakan, tulis, dan terima varian lewat kontrak live yang sama.',
      ],
      en: [
        'Parse: count (default 3, max 8), direction → an action from the live vocabulary, element description.',
        'Reuse the page the harness already shows and start the session; one command boots the helper, scrolls, selects the element and fires Go.',
        'Plan, write and accept the variants through the same live contract.',
      ],
    },
    coreRules: {
      id: [
        'Jangan menulis wrapper varian sendiri atau mengarang session id: id sesi hanya dibuat oleh browser (8 karakter hex, saat Go).',
        'Jangan bertindak atas temuan hook selama penanda live ada di file, dan jangan restyle varian demi menyenangkan hook.',
        'Wording tanpa arah ("better", "improve", "variants" saja): tanyakan satu pertanyaan dengan menawarkan kosakata.',
      ],
      en: [
        'Never hand-write a variants wrapper or invent a session id: only the browser mints session ids (8 hex characters, at Go).',
        'Do not act on hook findings while live markers are in the file, and do not restyle variants to appease them.',
        'Wording that names no direction ("better", "improve", just "variants"): ask one question offering the vocabulary.',
      ],
    },
    tips: {
      id: [
        'Jumlah dibatasi protokol hingga 8.',
        'Wording yang membawa intent tanpa kosakata ("terasa seperti bank", "lebih premium") dipetakan ke `impeccable` dengan wording sebagai prompt.',
      ],
      en: [
        'The protocol caps count at 8.',
        'Wording carrying intent with no vocabulary word ("make it feel like a bank", "more premium") maps to `impeccable` with the wording as the prompt.',
      ],
    },
    pairsWellWith: ['live', 'bolder', 'quieter'],
    spotlight: {
      title: {
        id: 'Satu Kalimat, Beberapa Varian',
        en: 'One Sentence, Several Variants',
      },
      body: {
        id: 'Generate memangkas waktu plumbing, bukan pekerjaan desainnya: satu perintah memulai sesi di halaman yang sudah tampil, dan varian tetap direncanakan, ditulis, dan diterima persis seperti pada live mode.',
        en: 'Generate saves plumbing time, not design work: one command starts the session around the page already on screen, and variants are still planned, written and accepted exactly as in live mode.',
      },
    },
    sourcePath: 'skill/reference/generate.md',
  },
  {
    name: 'doctor',
    category: 'maintenance',
    invocation: 'user',
    description: {
      id: 'Laporkan dan perbaiki drift antara artefak Impeccable proyek (PRODUCT.md, DESIGN.md + `.impeccable/design.json`, config, surface brief, hook desain) dan apa yang dibaca versi terpasang. Ini maintenance, bukan desain.',
      en: 'Report and repair drift between this project\'s Impeccable artifacts (PRODUCT.md, DESIGN.md + `.impeccable/design.json`, config, surface briefs, the design hook) and what the installed version reads. This is maintenance, not design.',
    },
    detailedDescription: {
      id: '`/impeccable doctor` adalah verb maintenance (bukan salah satu dari 24 command desain di tabel upstream). Ia membedakan tiga jenis drift: versi tool (`npx impeccable update`), schema drift (mekanis, sebagian besar diperbaiki di sini), dan truth drift (kode berubah dan dokumen tidak lagi akurat; `document` memiliki DESIGN.md dan `init` memiliki PRODUCT.md). Jalankan `impeccable doctor --json`; temuan bersifat `auto` (diterapkan dengan `doctor --fix`), `mention`, atau `route` (nama command yang menutup celah). Jangan mendesain ulang apa pun.',
      en: '`/impeccable doctor` is a maintenance verb (not one of the 24 design commands in the upstream table). It separates three kinds of drift: tool version (`npx impeccable update`), schema drift (mechanical, mostly repaired here) and truth drift (the code moved on and the document no longer describes it; `document` owns DESIGN.md and `init` owns PRODUCT.md). Run `impeccable doctor --json`; findings are `auto` (applied with `doctor --fix`), `mention` or `route` (names the command that closes the gap). It never redesigns anything.',
    },
    useWhen: {
      id: [
        'Menanyakan apa yang usang, kedaluwarsa, atau perlu disegarkan di artefak Impeccable proyek.',
        'Setelah memperbarui Impeccable: periksa apakah PRODUCT.md, DESIGN.md, atau config masih sesuai versi terpasang.',
      ],
      en: [
        'Asking what is out of date, stale or needs refreshing in the project\'s Impeccable artifacts.',
        'After updating Impeccable: check whether PRODUCT.md, DESIGN.md or config still match the installed version.',
      ],
    },
    avoidWhen: {
      id: [
        'Mendiagnosis CSS, z-index, atau layout proyek — doctor tidak memeriksa kode UI Anda.',
        'Memperbaiki drift sebagai efek samping tugas desain: temuan hanya dilaporkan kecuali pengguna meminta (kecuali yang bertanda `auto`).',
      ],
      en: [
        'Diagnosing the project\'s CSS, z-index or layout — doctor does not inspect your UI code.',
        'Repairing drift as a side effect of a design task: findings are reported, not acted on, unless the user asks (except `auto` ones).',
      ],
    },
    howItWorks: {
      id: [
        'Jalankan `impeccable doctor --json` (tambahkan `--target <path>` di monorepo) dan baca `findings` (id, artifact, path, severity, summary, fix).',
        'Tindak per severity: `auto` → jalankan `doctor --fix` sekali; `mention` → sebut dengan perbaikan yang ditawarkan; `route` → sebut command dan celah yang ditutupnya.',
        'Jangan overclaim truth drift: jumlah commit sejak DESIGN.md diedit bukan bukti kontradiksi.',
      ],
      en: [
        'Run `impeccable doctor --json` (add `--target <path>` in a monorepo) and read `findings` (id, artifact, path, severity, summary, fix).',
        'Act by severity: `auto` → run `doctor --fix` once; `mention` → state with the offered fix; `route` → name the command and the gap it closes.',
        'Do not overclaim truth drift: a commit count since DESIGN.md was last edited is not proof of contradiction.',
      ],
    },
    coreRules: {
      id: [
        'Ini maintenance, bukan desain: jangan mendesain ulang, jangan membuka file di luar yang disebut laporan, dan jangan menjalankan command lain sebagai efek samping.',
        'Field deprecated (mis. `## Register`) dianggap tidak ada untuk semua keputusan berikutnya, apa pun nilainya.',
      ],
      en: [
        'This is maintenance, not design: do not redesign anything, do not open files outside those the report names, and do not run any other command as a side effect.',
        'A deprecated field (e.g. `## Register`) is treated as absent for every later decision, whatever value it holds.',
      ],
    },
    tips: {
      id: [
        '`impeccable context` melaporkan subset murah temuan ini saat sesi mulai (maks sekali seminggu per proyek); matikan dengan `"stalenessCheck": false` di `.impeccable/config.json`.',
        'Di monorepo, gunakan tabel `workspaces` untuk melihat app mana yang punya konteks sendiri, mewarisi, atau tidak ada.',
      ],
      en: [
        '`impeccable context` reports the cheap subset of these findings at session start (at most weekly per project); silence it with `"stalenessCheck": false` in `.impeccable/config.json`.',
        'In a monorepo, use the `workspaces` table to see which apps carry their own context, inherit, or have none.',
      ],
    },
    pairsWellWith: ['init', 'document'],
    spotlight: {
      title: {
        id: 'Perawatan Artefak, Bukan Debug CSS',
        en: 'Artifact Upkeep, Not CSS Debugging',
      },
      body: {
        id: 'Doctor memeriksa file milik Impeccable (PRODUCT.md, DESIGN.md, config, surface brief, hook) terhadap apa yang dibaca versi terpasang. Ia tidak menyentuh CSS atau layout proyek Anda.',
        en: 'Doctor checks Impeccable\'s own files (PRODUCT.md, DESIGN.md, config, surface briefs, hook) against what the installed version reads. It does not touch your project\'s CSS or layout.',
      },
    },
    sourcePath: 'skill/reference/doctor.md',
  },
]
