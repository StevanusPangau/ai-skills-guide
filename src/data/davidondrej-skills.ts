// Koleksi kedua: David Ondrej — davidondrej/skills.
//
// Snapshot sumber dipin ke commit SHA (rolling sanitized mirror, tidak ada
// tag/release). Setiap record menyertakan status kompatibilitas + rekomendasi
// bundle sehingga guide dapat memisahkan "ada di upstream" dari "aman/layak
// diinstall di Hermes". Katalog ini bersifat edukasional; adaptasi bundle
// Hermes dilakukan bertahap dan curated di fase berikutnya.
//
// Sumber: https://github.com/davidondrej/skills (MIT, Copyright 2026 David Ondrej)

export const DAVIDONDREJ_SOURCE_REPO = 'github.com/davidondrej/skills'
export const DAVIDONDREJ_SOURCE_SHA = '2f70c586205a20523a4caecbc701128a30554628'

export type DavidCategory =
  | 'agent-orchestration'
  | 'ops-and-setup'
  | 'research-and-web'
  | 'skill-authoring'
  | 'thinking-and-docs'

export type DavidInvocation = 'model' | 'manual'

// Seberapa portable skill ini untuk diadaptasi ke Hermes.
export type DavidCompatibility =
  | 'portable' // konsep netral-agent, adaptasi ringan
  | 'adapt' // berguna tapi butuh sanitasi path/model/dependency
  | 'agent-specific' // terikat Pi/Codex/tool tertentu
  | 'vendor-specific' // bergantung API/vendor berbayar
  | 'duplicate' // sudah ada padanannya di koleksi lain
  | 'draft' // belum matang / TODO

// Rekomendasi masuk-bundle Hermes.
export type DavidBundleStatus =
  | 'first-wave' // A — layak diadaptasi lebih dulu
  | 'optional' // B — perlu adapter besar / dependency / audit
  | 'catalog-only' // C — didokumentasikan, tidak masuk bundle default
  | 'reuse-existing' // D — pakai/ referensikan skill yang sudah ada

export type DavidRisk = 'low' | 'medium' | 'high'

export type DavidSkill = {
  /** Nama skill upstream (folder = frontmatter name). */
  name: string
  category: DavidCategory
  invocation: DavidInvocation
  compatibility: DavidCompatibility
  bundleStatus: DavidBundleStatus
  risk: DavidRisk
  /** Ringkasan faithful dari deskripsi frontmatter upstream (Bahasa Indonesia). */
  description: string
  /** Path relatif SKILL.md di repo sumber, untuk permalink. */
  sourcePath: string
  /** Prasyarat runtime / tool yang harus tersedia (omit jika kosong). */
  prerequisites?: string[]
  /** Dependency ke skill/tool/repo lain (omit jika kosong). */
  dependencies?: string[]
  /** Catatan adaptasi Hermes atau alasan status. */
  adaptationNotes: string
}

// Urutan: dikelompokkan per kategori upstream, first-wave (A) lebih dulu di
// tiap kelompok agar prev/next terasa natural. Urutan array = urutan prev/next.
export const davidondrejSkills: DavidSkill[] = [
  // ── Agent Orchestration ─────────────────────────────────────────────
  {
    name: 'agent-self-scheduling',
    category: 'agent-orchestration',
    invocation: 'model',
    compatibility: 'adapt',
    bundleStatus: 'first-wave',
    risk: 'low',
    description:
      'Membuat AI agent berjalan terjadwal, loop, atau interval — cron, heartbeat, cek autonomous berulang. Membedakan external clock (Claude Code, Codex, Pi) vs scheduler bawaan Hermes.',
    sourcePath: 'skills/agent-orchestration/agent-self-scheduling/SKILL.md',
    adaptationNotes:
      'Gunakan cronjob/CLI Hermes aktual sesuai docs terbaru; jangan salin contoh command mentah antar-agent.',
  },
  {
    name: 'goal-loop',
    category: 'agent-orchestration',
    invocation: 'model',
    compatibility: 'adapt',
    bundleStatus: 'first-wave',
    risk: 'low',
    description:
      'Menjelaskan dan menulis instruksi efektif untuk fitur /goal — loop agent yang self-checking (plan → act → test → review → iterate) di Codex, Claude Code, dan Hermes.',
    sourcePath: 'skills/agent-orchestration/goal-loop/SKILL.md',
    adaptationNotes:
      'Selaraskan dengan completion contract /goal Hermes terbaru; luruskan klaim auth universal antar-agent.',
  },
  {
    name: 'codex-subagent',
    category: 'agent-orchestration',
    invocation: 'manual',
    compatibility: 'agent-specific',
    bundleStatus: 'optional',
    risk: 'medium',
    description:
      'Menjalankan OpenAI Codex CLI sebagai subagent untuk mendelegasikan task coding self-contained, second opinion, atau verifikasi independen.',
    sourcePath: 'skills/agent-orchestration/codex-subagent/SKILL.md',
    prerequisites: ['Codex CLI', 'auth ChatGPT (langganan, tanpa API key)'],
    dependencies: ['codex'],
    adaptationNotes:
      'Hardcode model/reasoning/flag; harus pakai config user dan docs Codex terbaru. Overlap dengan skill Codex existing.',
  },
  {
    name: 'handoff',
    category: 'agent-orchestration',
    invocation: 'manual',
    compatibility: 'adapt',
    bundleStatus: 'optional',
    risk: 'low',
    description:
      'Memadatkan percakapan saat ini menjadi satu pesan handoff detail (apa yang terjadi, mengapa, dan sisa kerja) dalam code block agar bisa di-paste ke session baru.',
    sourcePath: 'skills/agent-orchestration/handoff/SKILL.md',
    adaptationNotes:
      'Collision nama dengan Matt /handoff. Metodologi berbeda (lebih status-oriented). Install sebagai david-handoff bila kedua versi dipasang.',
  },
  {
    name: 'cmux',
    category: 'agent-orchestration',
    invocation: 'model',
    compatibility: 'agent-specific',
    bundleStatus: 'optional',
    risk: 'medium',
    description:
      'Referensi operasi cmux: workspace/pane, I/O capture, delegasi antar-agent, browser automation. macOS 14+.',
    sourcePath: 'skills/agent-orchestration/cmux/SKILL.md',
    prerequisites: ['macOS 14+', 'cmux (GPL-3.0-or-later / komersial)'],
    dependencies: ['cmux'],
    adaptationNotes:
      'Berisi install + sudo, menunjuk references/socket-api.md yang tidak ada di snapshot, dan ada duplikasi section. Audit ke repo cmux resmi sebelum adaptasi.',
  },
  {
    name: 'run-deep-swe',
    category: 'agent-orchestration',
    invocation: 'manual',
    compatibility: 'vendor-specific',
    bundleStatus: 'optional',
    risk: 'medium',
    description:
      'Menilai model AI pada benchmark coding-agent DeepSWE via OpenRouter API — eval reproducible, single-task/subset/full 113-task, plus submission leaderboard.',
    sourcePath: 'skills/agent-orchestration/run-deep-swe/SKILL.md',
    prerequisites: ['Docker/Modal', 'OpenRouter API key (berbayar)'],
    dependencies: ['mini-swe-agent', 'datacurve-ai/deep-swe (Apache-2.0)'],
    adaptationNotes:
      'Butuh spend cap + approval. Model/CLI berubah; placeholder email leaderboard.',
  },
  {
    name: 'fable-safe-prompt',
    category: 'agent-orchestration',
    invocation: 'manual',
    compatibility: 'adapt',
    bundleStatus: 'catalog-only',
    risk: 'high',
    description:
      'Menulis ulang prompt agar tidak memicu classifier keamanan server-side Claude Fable 5 (guardrail cyber/bio yang memaksa route ke Opus atau mengembalikan refusal).',
    sourcePath: 'skills/agent-orchestration/fable-safe-prompt/SKILL.md',
    adaptationNotes:
      'Framing utamanya mengurangi deteksi classifier; time-sensitive, model-specific, berpotensi memfasilitasi guardrail evasion.',
  },

  // ── Ops and Setup ───────────────────────────────────────────────────
  {
    name: 'anti-sleep',
    category: 'ops-and-setup',
    invocation: 'model',
    compatibility: 'portable',
    bundleStatus: 'first-wave',
    risk: 'low',
    description:
      'Menjaga MacBook tetap terjaga dengan caffeinate macOS — mencegah sleep, dimming layar, atau keduanya, untuk durasi tertentu atau selama sebuah proses berjalan.',
    sourcePath: 'skills/ops-and-setup/anti-sleep/SKILL.md',
    prerequisites: ['macOS'],
    adaptationNotes:
      'Native macOS caffeinate, sudah ada verifikasi. Tambahkan platforms: [macos]; kelola lifecycle background lewat process tool.',
  },
  {
    name: 'setup-help',
    category: 'ops-and-setup',
    invocation: 'manual',
    compatibility: 'portable',
    bundleStatus: 'first-wave',
    risk: 'low',
    description:
      'Memandu user setup apa pun langkah demi langkah — memberi satu current step, lalu selalu menampilkan seluruh sisa langkah setelah tiap respons.',
    sourcePath: 'skills/ops-and-setup/setup-help/SKILL.md',
    adaptationNotes: 'Process primitive jelas; satu langkah aktif, sisanya selalu ditampilkan ulang.',
  },
  {
    name: 'cyber-audit',
    category: 'ops-and-setup',
    invocation: 'manual',
    compatibility: 'adapt',
    bundleStatus: 'optional',
    risk: 'medium',
    description:
      'Audit paparan read-only pada Mac (dan project ~/Documents/code) terhadap CVE, breach, malicious package, atau advisory keamanan, lalu menulis report terstruktur.',
    sourcePath: 'skills/ops-and-setup/cyber-audit/SKILL.md',
    prerequisites: ['macOS'],
    adaptationNotes:
      'Hardcode Mac David, ~/Documents/code, folder report, dan contoh report yang tidak ada. Adaptasi ke scope user-selected + report path netral.',
  },
  {
    name: 'pi-custom-model',
    category: 'ops-and-setup',
    invocation: 'manual',
    compatibility: 'agent-specific',
    bundleStatus: 'catalog-only',
    risk: 'medium',
    description:
      'Mendaftarkan model custom/varian (mis. slug OpenRouter :nitro/:floor/:exacto) di Pi Agent agar bisa dijadikan default global.',
    sourcePath: 'skills/ops-and-setup/pi-custom-model/SKILL.md',
    prerequisites: ['Pi Agent'],
    dependencies: ['pi'],
    adaptationNotes:
      'Mengubah config/auth registry global Pi. Dokumentasikan sebagai skill ekosistem Pi saja.',
  },

  // ── Research and Web ────────────────────────────────────────────────
  {
    name: 'research-prompt',
    category: 'research-and-web',
    invocation: 'model',
    compatibility: 'portable',
    bundleStatus: 'first-wave',
    risk: 'low',
    description:
      'Menulis prompt Deep Research satu paragraf untuk diberikan ke peneliti manusia atau AI deep-research — konteks lengkap, sub-pertanyaan bernomor, dan format output per temuan.',
    sourcePath: 'skills/research-and-web/research-prompt/SKILL.md',
    adaptationNotes:
      'Process primitive kuat. Jadikan provider-neutral; DeepAPI cukup jadi execution path opsional.',
  },
  {
    name: 'browser-harness',
    category: 'research-and-web',
    invocation: 'model',
    compatibility: 'adapt',
    bundleStatus: 'optional',
    risk: 'high',
    description:
      'Kontrol browser langsung via CDP untuk otomasi, scraping, testing, atau interaksi halaman web. Terhubung ke Chrome user yang sedang berjalan.',
    sourcePath: 'skills/research-and-web/browser-harness/SKILL.md',
    prerequisites: ['Chrome', 'browser-harness (MIT)'],
    dependencies: ['browser-use/browser-harness'],
    adaptationNotes:
      'Pakai browser login aktif (cookie), cloud profile berbayar, dan banyak file yang tidak ikut snapshot (agent-workspace/, interaction-skills/). Wajib consent + allowlist target.',
  },
  {
    name: 'deep-research',
    category: 'research-and-web',
    invocation: 'manual',
    compatibility: 'vendor-specific',
    bundleStatus: 'optional',
    risk: 'medium',
    description:
      'Menjalankan query deep research bersumber via DeepAPI (POST /v1/research/deep), membangun prompt riguros lalu menyimpan report markdown bersitasi.',
    sourcePath: 'skills/research-and-web/deep-research/SKILL.md',
    prerequisites: ['DEEPAPI_API_KEY (berbayar)'],
    dependencies: ['deepapi'],
    adaptationNotes:
      'DeepAPI-only, membaca key dari .zshrc. Overlap dengan tool research/web Hermes. Secret via required_environment_variables; jangan scrape shell config.',
  },
  {
    name: 'online-shopping',
    category: 'research-and-web',
    invocation: 'model',
    compatibility: 'vendor-specific',
    bundleStatus: 'optional',
    risk: 'medium',
    description:
      'Riset pembelian online dengan DeepAPI — cek harga wajar, deal terbaik, tempat beli, dan kepercayaan toko. Riset saja, tidak pernah melakukan order.',
    sourcePath: 'skills/research-and-web/online-shopping/SKILL.md',
    prerequisites: ['DEEPAPI_API_KEY (berbayar)'],
    dependencies: ['deepapi'],
    adaptationNotes:
      'DeepAPI/Fable-specific, bukan fokus utama guide software engineering.',
  },
  {
    name: 'youtube-transcript',
    category: 'research-and-web',
    invocation: 'model',
    compatibility: 'adapt',
    bundleStatus: 'optional',
    risk: 'low',
    description:
      'Mengambil transkrip video YouTube — fetch/extract/download caption. Jalur utama DeepAPI, fallback lokal yt-dlp.',
    sourcePath: 'skills/research-and-web/youtube-transcript/SKILL.md',
    prerequisites: ['yt-dlp (fallback)', 'DEEPAPI_API_KEY (jalur utama)'],
    dependencies: ['deepapi', 'yt-dlp'],
    adaptationNotes:
      'Overlap dengan skill Hermes youtube-content. Membaca secret dari shell config + hardcode output naming. Bandingkan kualitas skill existing dulu.',
  },
  {
    name: 'deepapi',
    category: 'research-and-web',
    invocation: 'model',
    compatibility: 'vendor-specific',
    bundleStatus: 'catalog-only',
    risk: 'high',
    description:
      'Manual API DeepAPI untuk scraping, email, dan generasi gambar — banyak endpoint berbayar.',
    sourcePath: 'skills/research-and-web/deepapi/SKILL.md',
    prerequisites: [
      'DEEPAPI_API_KEY (berbayar)',
      'DEEPAPI_API_BASE_URL (opsional override)',
    ],
    adaptationNotes:
      'Manual 628 baris, endpoint berbayar, dan self-update yang menyuruh skill overwrite dirinya dari URL vendor (risiko supply-chain). Jika perlu, pin version + hapus self-update.',
  },
  {
    name: 'pi-web-search',
    category: 'research-and-web',
    invocation: 'model',
    compatibility: 'agent-specific',
    bundleStatus: 'catalog-only',
    risk: 'low',
    description:
      'HANYA untuk Pi Agent — cara Pi mengakses web via package pi-web-access (search, fetch URL/PDF/YouTube/GitHub).',
    sourcePath: 'skills/research-and-web/pi-web-search/SKILL.md',
    prerequisites: ['Pi Agent'],
    dependencies: ['pi', 'pi-web-access'],
    adaptationNotes: 'Hermes sudah punya web tools — jangan port sebagai skill Hermes.',
  },

  // ── Skill Authoring ─────────────────────────────────────────────────
  {
    name: 'effective-agent-skills',
    category: 'skill-authoring',
    invocation: 'model',
    compatibility: 'portable',
    bundleStatus: 'first-wave',
    risk: 'low',
    description:
      'Cara menulis agent skill yang efektif — anatomi, progressive disclosure, design pattern, anti-pattern, testing, dan security. Dibaca saat membuat/mengedit/mereview SKILL.md.',
    sourcePath: 'skills/skill-authoring/effective-agent-skills/SKILL.md',
    adaptationNotes:
      'Overlap dengan Matt writing-great-skills dan hermes-agent-skill-authoring lokal; tampilkan sebagai perbandingan, bukan pengganti source of truth Hermes. Luruskan klaim disable-model-invocation.',
  },
  {
    name: 'folder-specific-claude-and-agents-md',
    category: 'skill-authoring',
    invocation: 'model',
    compatibility: 'adapt',
    bundleStatus: 'first-wave',
    risk: 'low',
    description:
      'Membuat CLAUDE.md khusus (+ symlink AGENTS.md) di dalam folder tertentu untuk memberi konteks folder-scoped ke agent berikutnya.',
    sourcePath: 'skills/skill-authoring/folder-specific-claude-and-agents-md/SKILL.md',
    adaptationNotes:
      'Adaptasi agar AGENTS.md/CLAUDE.md mengikuti target agent/repo, bukan wajib CLAUDE-first + symlink. Reference library/claude-code/*.md hilang di snapshot.',
  },
  {
    name: 'distribute-skill-to-all-agents',
    category: 'skill-authoring',
    invocation: 'model',
    compatibility: 'agent-specific',
    bundleStatus: 'catalog-only',
    risk: 'high',
    description:
      'Mendistribusikan skill ke 4 folder skill agent (Codex, Claude Code, Pi, Hermes) agar semua agent melihatnya — mencakup layout symlink.',
    sourcePath: 'skills/skill-authoring/distribute-skill-to-all-agents/SKILL.md',
    adaptationNotes:
      'Sangat personal: asumsi struktur symlink David, copy ke ~/.hermes, rsync --delete, removal destruktif. Tulis ulang dari nol bila diperlukan, bukan adaptasi verbatim.',
  },
  {
    name: 'push-skill-to-github',
    category: 'skill-authoring',
    invocation: 'model',
    compatibility: 'agent-specific',
    bundleStatus: 'catalog-only',
    risk: 'high',
    description:
      'Commit dan push perubahan skill ke repo GitHub privat user (root ~/.agents) — staging, commit, push, dan cleanup pane cmux.',
    sourcePath: 'skills/skill-authoring/push-skill-to-github/SKILL.md',
    prerequisites: ['cmux', 'repo ~/.agents'],
    dependencies: ['cmux'],
    adaptationNotes:
      'Workflow privat David (~/.agents → mirror publik), cmux, auto stage/commit/push.',
  },

  // ── Thinking and Docs ───────────────────────────────────────────────
  {
    name: 'brain-to-docs',
    category: 'thinking-and-docs',
    invocation: 'model',
    compatibility: 'adapt',
    bundleStatus: 'first-wave',
    risk: 'low',
    description:
      'Mengekstrak visi, keputusan, dan preferensi project dari kepala user ke dokumentasi jelas (README + ADR) lewat loop tanya-jawab bolak-balik.',
    sourcePath: 'skills/thinking-and-docs/brain-to-docs/SKILL.md',
    adaptationNotes:
      'Tambahkan confirmation gate untuk ADR; jangan buat ADR otomatis tiap jawaban tanpa approval.',
  },
  {
    name: 'level-up',
    category: 'thinking-and-docs',
    invocation: 'manual',
    compatibility: 'adapt',
    bundleStatus: 'first-wave',
    risk: 'low',
    description:
      'Mengukur pengetahuan teknis + produk user lewat 7 pertanyaan adaptif, mencatat jawaban verbatim dengan rating jujur, lalu menumbuhkan learning plan dari gap yang ditemukan.',
    sourcePath: 'skills/thinking-and-docs/level-up/SKILL.md',
    adaptationNotes:
      'Ganti david-knowledge.md, asumsi "user tidak menulis code", dan wording profile-specific menjadi generic/configurable.',
  },
  {
    name: 'prompt-me',
    category: 'thinking-and-docs',
    invocation: 'model',
    compatibility: 'draft',
    bundleStatus: 'catalog-only',
    risk: 'low',
    description:
      'Memberi user pertanyaan terarah untuk menggali isi kepalanya soal project — sisa kerja, yang dihindari, yang penting, yang tidak.',
    sourcePath: 'skills/thinking-and-docs/prompt-me/SKILL.md',
    adaptationNotes:
      '14 baris, tanpa workflow lengkap. Overlap dengan Matt grilling/grill-me.',
  },
  {
    name: 'read-all-adrs',
    category: 'thinking-and-docs',
    invocation: 'manual',
    compatibility: 'draft',
    bundleStatus: 'catalog-only',
    risk: 'low',
    description:
      'Membaca setiap file ADR markdown di folder docs/adr/ project agar punya konteks penuh atas keputusan lampau. Hanya dipanggil eksplisit.',
    sourcePath: 'skills/thinking-and-docs/read-all-adrs/SKILL.md',
    adaptationNotes:
      'Profanity di body. Hanya perintah baca semua file tanpa process/verification bernilai tambah.',
  },
  {
    name: 'short',
    category: 'thinking-and-docs',
    invocation: 'manual',
    compatibility: 'adapt',
    bundleStatus: 'catalog-only',
    risk: 'low',
    description:
      'Skill manual yang memaksa agent memadatkan jawabannya — buang filler, sederhanakan kata, pangkas panjang, pertahankan substansi.',
    sourcePath: 'skills/thinking-and-docs/short/SKILL.md',
    adaptationNotes:
      'Style-only utility satu baris. Per effective-agent-skills, variasi style sebaiknya jadi preference/system prompt, bukan skill.',
  },
  {
    name: 'teach',
    category: 'thinking-and-docs',
    invocation: 'manual',
    compatibility: 'duplicate',
    bundleStatus: 'reuse-existing',
    risk: 'low',
    description:
      'Mengajari user skill atau konsep baru dalam workspace ini. Nyaris identik dengan Matt /teach dan secara eksplisit mengkredit Matt sebagai sumber.',
    sourcePath: 'skills/thinking-and-docs/teach/SKILL.md',
    adaptationNotes:
      'Duplikat/fork Matt /teach. Di koleksi David tampilkan sebagai adaptasi + dokumentasikan delta.',
  },
]

export const davidCategoryLabels: Record<DavidCategory, string> = {
  'agent-orchestration': 'Agent Orchestration',
  'ops-and-setup': 'Ops & Setup',
  'research-and-web': 'Research & Web',
  'skill-authoring': 'Skill Authoring',
  'thinking-and-docs': 'Thinking & Docs',
}

export function davidSourceUrl(sourcePath: string): string {
  return `https://github.com/davidondrej/skills/blob/${DAVIDONDREJ_SOURCE_SHA}/${sourcePath}`
}
