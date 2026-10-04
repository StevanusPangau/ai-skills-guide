// Koleksi kedua: David Ondrej — davidondrej/skills.
//
// Snapshot sumber dipin ke commit SHA yang diverifikasi pada 2026-10-03
// (HEAD 88a3d7c7, rolling sanitized mirror, tidak ada tag/release; 57 SKILL.md).
// Setiap record menyertakan status kompatibilitas + tingkat risiko sehingga
// guide dapat memisahkan "ada di upstream" dari "cocok dipakai di stack Anda".
// Katalog ini edukatif: guide ini tidak mengirim bundle skill sendiri; install
// langsung dari upstream lewat skills.sh.
//
// Sumber: https://github.com/davidondrej/skills (MIT, Copyright 2026 David Ondrej)

export const DAVIDONDREJ_SOURCE_REPO = 'github.com/davidondrej/skills'
export const DAVIDONDREJ_SOURCE_SHA = '88a3d7c7c3d2c16f542baea0ed40e0db5fb3f4a0'

export type DavidCategory =
  | 'agent-orchestration'
  | 'ops-and-setup'
  | 'research-and-web'
  | 'skill-authoring'
  | 'thinking-and-docs'

// 'manual' = frontmatter upstream memuat `disable-model-invocation: true`.
export type DavidInvocation = 'model' | 'manual'

// Seberapa portable skill ini di luar stack asli David.
export type DavidCompatibility =
  | 'portable' // konsep netral-agent, bisa dipakai apa adanya
  | 'adapt' // berguna tapi butuh sanitasi path/placeholder/platform
  | 'agent-specific' // terikat agent/app/tool tertentu (BB, cmux, Codex, dll.)
  | 'vendor-specific' // bergantung API/vendor (mis. DeepAPI)
  | 'duplicate' // sudah ada padanannya di koleksi lain
  | 'draft' // belum matang / TODO

export type DavidRisk = 'low' | 'medium' | 'high'

export type DavidSkill = {
  /** Nama skill upstream (folder = frontmatter name). */
  name: string
  category: DavidCategory
  invocation: DavidInvocation
  compatibility: DavidCompatibility
  risk: DavidRisk
  /** Ringkasan faithful dari SKILL.md upstream (Bahasa Indonesia). */
  description: string
  /** Path relatif SKILL.md di repo sumber, untuk permalink. */
  sourcePath: string
  /** Prasyarat runtime / tool yang harus tersedia (omit jika kosong). */
  prerequisites?: string[]
  /** Dependency ke skill/tool/repo lain (omit jika kosong). */
  dependencies?: string[]
  /** Catatan kehati-hatian / alasan status kompatibilitas & risiko. */
  notes: string
}

// Urutan: dikelompokkan per kategori upstream. Urutan array = urutan prev/next.
export const davidondrejSkills: DavidSkill[] = [
  // ── Agent Orchestration ─────────────────────────────────────────────
  {
    name: 'goal-loop',
    category: 'agent-orchestration',
    invocation: 'model',
    compatibility: 'portable',
    risk: 'low',
    description:
      'Menyusun prompt /goal dan menjelaskan loop agent persisten (plan → act → test → review → iterate, alias "Ralph loop") untuk goal, run autonomous, monitoring, dan troubleshooting. Setiap goal wajib punya kontrak 4 bagian: Objective, Constraints, Validation command, dan Stop condition.',
    sourcePath: 'skills/agent-orchestration/goal-loop/SKILL.md',
    notes:
      'Sengaja runtime-agnostic: cek dukungan goal, feature flag, auth, dan limit di agent yang dipakai, jangan menyalin syarat satu agent ke agent lain. Output hanya isi kontrak (tanpa awalan /goal), tidak boleh menyuruh membuat ADR baru, dan wajib melarang reward-hacking (menghapus/melemahkan test).',
  },
  {
    name: 'handoff',
    category: 'agent-orchestration',
    invocation: 'manual',
    compatibility: 'portable',
    risk: 'low',
    description:
      'Menangkap konteks session untuk agent baru: tujuan, kondisi saat ini (DONE / PARTIAL / NOT STARTED), keputusan beserta alasannya, jebakan dan jalan buntu. Menulis state, bukan perintah. Hasilnya satu code block, juga disimpan ke $TMPDIR/handoff-<acak>.md (atau HANDOFF.md bila diminta) dan path absolutnya dilaporkan.',
    sourcePath: 'skills/agent-orchestration/handoff/SKILL.md',
    notes:
      'Nama sama dengan /handoff di koleksi Matt Pocock, tetapi isinya berbeda (template status-oriented + file output). Rahasia dan PII tidak boleh ikut: sebut lokasi kredensial, bukan nilainya.',
  },
  {
    name: 'codex-subagent',
    category: 'agent-orchestration',
    invocation: 'manual',
    compatibility: 'agent-specific',
    risk: 'medium',
    description:
      'Menjalankan OpenAI Codex CLI (codex exec) sebagai subagent untuk task coding self-contained, kerja paralel, second opinion, atau verifikasi independen. Memakai auth langganan ChatGPT, tanpa API key.',
    sourcePath: 'skills/agent-orchestration/codex-subagent/SKILL.md',
    prerequisites: ['Codex CLI', 'login ChatGPT (langganan, tanpa API key)'],
    dependencies: ['codex'],
    notes:
      'Model dan reasoning di-hardcode (gpt-5.6-sol, effort high), sandbox workspace-write, dan </dev/null wajib saat stdin bukan terminal. Tidak boleh memakai --dangerously-bypass-approvals-and-sandbox. Sesuaikan dengan konfigurasi Codex Anda.',
  },
  {
    name: 'git-worktree',
    category: 'agent-orchestration',
    invocation: 'manual',
    compatibility: 'portable',
    risk: 'low',
    description:
      'Memakai Git worktree untuk mengisolasi task coding paralel: satu task = satu worktree = satu session agent, checkout utama tetap di main. Mencakup bootstrap (salin .env, install dependency lokal, port, hook), merge satu per satu, dan cleanup.',
    sourcePath: 'skills/agent-orchestration/git-worktree/SKILL.md',
    notes:
      'Berisi bagian khusus Cursor (/worktree, /apply-worktree, .cursor/worktrees.json). Jangan symlink .env atau node_modules dari checkout utama; hapus worktree hanya setelah commit aman karena perubahan yang belum di-commit hilang.',
  },
  {
    name: 'fable-review',
    category: 'agent-orchestration',
    invocation: 'manual',
    compatibility: 'agent-specific',
    risk: 'low',
    description:
      'Meluncurkan code review independen memakai Fable 5.1 Extra High lewat Claude Code dan harness terpilih, lalu mengembalikan hasilnya verbatim. Brief review netral (tanpa mengarahkan ke dugaan bug) dan review-only tanpa mengubah file.',
    sourcePath: 'skills/agent-orchestration/fable-review/SKILL.md',
    dependencies: ['harness peluncur agent (mis. bb)', 'akses model Fable'],
    notes:
      'Bergantung pada harness dan model spesifik; model/effort yang tidak tersedia dilaporkan sebagai blocker, tidak pernah di-downgrade diam-diam. Idle atau timeout bukan tanda review selesai.',
  },
  {
    name: 'gpt-review',
    category: 'agent-orchestration',
    invocation: 'manual',
    compatibility: 'agent-specific',
    risk: 'low',
    description:
      'Meluncurkan code review independen memakai GPT-6 Astra Extra High lewat Codex yang dikoordinasi harness review terkonfigurasi, lalu mengembalikan hasilnya verbatim. Pola brief dan aturan hasilnya sama dengan fable-review.',
    sourcePath: 'skills/agent-orchestration/gpt-review/SKILL.md',
    dependencies: ['Codex', 'harness review terkonfigurasi'],
    notes:
      'Terikat pada harness dan model tertentu; review-only, tidak mengubah file.',
  },
  {
    name: 'total-review',
    category: 'agent-orchestration',
    invocation: 'manual',
    compatibility: 'agent-specific',
    risk: 'medium',
    description:
      'Menjalankan fable-review dan gpt-review paralel sebagai dua thread bb, menunggu keduanya selesai, lalu menggabungkan dan men-deduplikasi temuan menjadi shortlist bernomor ([both]/[fable]/[gpt]) untuk disetujui user. Setelah disetujui: perbaiki, commit, dan push.',
    sourcePath: 'skills/agent-orchestration/total-review/SKILL.md',
    dependencies: ['fable-review', 'gpt-review', 'nagent', 'bb-cli'],
    notes:
      'Tidak pernah memperbaiki sebelum shortlist disetujui. Setelah persetujuan skill ini melakukan stage, commit, dan push ke GitHub, jadi jalankan hanya bila alur ship itu memang diinginkan.',
  },
  {
    name: 'fable-safe-prompt',
    category: 'agent-orchestration',
    invocation: 'manual',
    compatibility: 'vendor-specific',
    risk: 'medium',
    description:
      'Membuat edit minimal pada prompt untuk mengurangi refusal false-positive dari Fable. Hanya mengedit teks di dalam tag <prompt>, menargetkan kategori classifier cyber, bio/chem, dan reasoning_extraction, dan mengembalikan prompt utuh plus daftar kalimat yang diubah.',
    sourcePath: 'skills/agent-orchestration/fable-safe-prompt/SKILL.md',
    notes:
      'Penerimaan tidak dijamin. Aturan upstream: jangan mengarang otorisasi atau menyamarkan niat berbahaya, jangan melabel ulang pekerjaan ofensif sebagai defensif, dan tandai kalimat yang tidak punya padanan jinak. Untuk pekerjaan sah yang tidak didukung Fable, disarankan Opus 4.8 atau Mythos terverifikasi. Time-sensitive dan model-specific.',
  },
  {
    name: 'cmux',
    category: 'agent-orchestration',
    invocation: 'model',
    compatibility: 'agent-specific',
    risk: 'medium',
    description:
      'Mengontrol aplikasi terminal macOS cmux: workspace, pane, surface, browser, notifikasi, settings, dan hook. Dipakai hanya bila user menyebut cmux secara eksplisit; baca sebelum menjalankan perintah cmux apa pun.',
    sourcePath: 'skills/agent-orchestration/cmux/SKILL.md',
    prerequisites: ['macOS 14+', 'cmux'],
    dependencies: ['cmux'],
    notes:
      'Aturan inti: jangkar ke CMUX_WORKSPACE_ID milik pemanggil, pakai ref berawalan atau UUID, --focus false, jangan kirim input ke surface yang bukan milik Anda, dan jangan menambahkan 2>/dev/null. Referensi tambahan ada di references/advanced.md dan references/viewers.md; langkah install dengan sudo ada di advanced.md, bukan di SKILL.md.',
  },
  {
    name: 'herdr',
    category: 'agent-orchestration',
    invocation: 'model',
    compatibility: 'agent-specific',
    risk: 'medium',
    description:
      'Mengoperasikan dan mengoordinasikan AI agent di workspace Herdr di Ghostty: inspect, kirim pesan, tunggu, dan baca pane lewat CLI/socket lokal. Tidak berlaku untuk cmux atau sesi terminal biasa.',
    sourcePath: 'skills/agent-orchestration/herdr/SKILL.md',
    prerequisites: ['Herdr', 'Ghostty', 'agent berjalan di dalam Herdr (HERDR_ENV=1)'],
    dependencies: ['herdr'],
    notes:
      'Selalu tambahkan --session <nama>, jangan menebak pane ID, pisahkan send-text dan Enter untuk composer TUI, dan jangan menutup atau mengubah pane yang bukan Anda buat. Gunakan session bernama (bukan default) untuk eksperimen berisiko.',
  },
  {
    name: 'bb-cli',
    category: 'agent-orchestration',
    invocation: 'model',
    compatibility: 'agent-specific',
    risk: 'low',
    description:
      'Mengontrol CLI bb: inspect dan kelola thread, environment, project, machine, provider, skill, plugin, setting, dan terminal. Mulai dari bb status --json, lalu baca referensi yang relevan saja.',
    sourcePath: 'skills/agent-orchestration/bb-cli/SKILL.md',
    prerequisites: ['bb (BB app)'],
    dependencies: ['bb'],
    notes:
      'Jangan inspect atau mengirim pesan ke thread lain kecuali diminta eksplisit. Resolve nama/ID dengan list atau show sebelum mutasi, dan pakai --yes hanya untuk perintah destruktif yang sudah dikonfirmasi.',
  },
  {
    name: 'bb-plugins',
    category: 'agent-orchestration',
    invocation: 'model',
    compatibility: 'agent-specific',
    risk: 'medium',
    description:
      'Membangun, memasang, dan men-debug plugin bb (paket TypeScript): panel sidebar, subcommand CLI, agent tool, tema, provider. Untuk menjalankan thread dan CLI inti, gunakan bb-cli.',
    sourcePath: 'skills/agent-orchestration/bb-plugins/SKILL.md',
    prerequisites: ['bb (BB app)'],
    dependencies: ['bb', 'bb-cli'],
    notes:
      'Plugin bersifat full-trust (kode server berjalan in-process; UI app tidak di-sandbox), jadi tinjau source plugin pihak ketiga sebelum install. Simpan kredensial di setting secret: true.',
  },
  {
    name: 'nagent',
    category: 'agent-orchestration',
    invocation: 'model',
    compatibility: 'agent-specific',
    risk: 'medium',
    description:
      'Meluncurkan thread worker bb baru dengan project, model, worktree, dan task brief yang tepat (bb thread spawn). Default Codex gpt-5.6-sol reasoning high, service tier fast; pilihan eksplisit user menimpa default. Termasuk pengecekan permission mode dan keamanan billing untuk Pi Agent.',
    sourcePath: 'skills/agent-orchestration/nagent/SKILL.md',
    prerequisites: ['bb (BB app)'],
    dependencies: ['bb', 'bb-cli'],
    notes:
      'Worker investigasi/build default ke permission mode full (tanpa sandbox), dan child tidak boleh melebihi mode parent. Jangan mengganti route inference (mis. langganan ChatGPT vs OpenRouter) tanpa persetujuan karena billing berbeda.',
  },
  {
    name: 'larp-detector',
    category: 'agent-orchestration',
    invocation: 'model',
    compatibility: 'portable',
    risk: 'low',
    description:
      'Review skeptis terhadap kontribusi luar di repo publik: menilai asal dan niat sebuah PR atau issue (bug nyata yang dialami user, atau sekadar "kontribusi" demi nama, atau masalah halusinasi LLM yang tidak akan terjadi) sebelum memutuskan.',
    sourcePath: 'skills/agent-orchestration/larp-detector/SKILL.md',
    notes:
      'Skill pendek berbasis prompt dengan sudut pandang pemilik repo. Menggunakan AI coding agent bukan red flag; yang dinilai adalah niat dan taste di balik kontribusi.',
  },
  {
    name: 'new-grok-bot',
    category: 'agent-orchestration',
    invocation: 'manual',
    compatibility: 'vendor-specific',
    risk: 'low',
    description:
      'Merancang peran Grok Bot dan menulis prompt setup-nya. Menerapkan unit-of-work test 8 kriteria, mengajukan maksimal lima pertanyaan satu per satu (opsi A-D), lalu menghasilkan satu prompt paragraf per Bot dalam code block.',
    sourcePath: 'skills/agent-orchestration/new-grok-bot/SKILL.md',
    notes:
      'Konteks produk Grok Bots di dalam skill ditandai "last verified 2026-08-30" dan bisa usang. Bot berbagi satu cloud computer, jadi bukan batas keamanan.',
  },
  {
    name: 'reset-cursor-acp',
    category: 'agent-orchestration',
    invocation: 'manual',
    compatibility: 'adapt',
    risk: 'low',
    description:
      'Mereset thread Cursor ACP yang macet dan memuat ulang konfigurasinya: menghentikan thread, membersihkan proses cursor-agent acp yatim, dan mengecek versi/login CLI. Berisi daftar penyebab umum (login kedaluwarsa, permission menggantung, MCP tingkat tim).',
    sourcePath: 'skills/agent-orchestration/reset-cursor-acp/SKILL.md',
    prerequisites: ['cursor-agent'],
    notes:
      'Ditulis sebagai template dengan placeholder (<chat-system>, <chat-cli>, <reset-script>) yang harus diisi sesuai sistem Anda. Jangan menjalankan pkill -f cursor-agent secara membabi buta karena mematikan semua thread Cursor.',
  },
  {
    name: 'self-archive',
    category: 'agent-orchestration',
    invocation: 'model',
    compatibility: 'agent-specific',
    risk: 'low',
    description:
      'Mengarsipkan thread Cloudroom saat ini dan melepas runtime-nya: kirim ringkasan penutup, jalankan cloudroom thread archive --self, lalu thread stop --self. Hanya bertindak atas permintaan eksplisit.',
    sourcePath: 'skills/agent-orchestration/self-archive/SKILL.md',
    dependencies: ['cloudroom (atau bb)'],
    notes:
      'Tidak pernah memakai thread delete. Undo dengan thread unarchive. Di BB, ganti cloudroom dengan bb.',
  },

  // ── Ops and Setup ───────────────────────────────────────────────────
  {
    name: 'anti-sleep',
    category: 'ops-and-setup',
    invocation: 'manual',
    compatibility: 'adapt',
    risk: 'low',
    description:
      'Menjaga Mac tetap terjaga untuk durasi tertentu atau selama sebuah proses berjalan. Memakai launcher bawaan scripts/anti-sleep.sh yang membuat LaunchAgent sekali-pakai dengan caffeinate; flag default -d -i (jaga layar dan cegah idle sleep).',
    sourcePath: 'skills/ops-and-setup/anti-sleep/SKILL.md',
    prerequisites: ['macOS'],
    notes:
      'Aturan: tidak pernah menjalankan caffeinate dengan & / nohup / disown / launchctl submit, dan sesi lama otomatis dihentikan tanpa konfirmasi saat durasi baru diminta. Sukses hanya dilaporkan bila verify mengembalikan STATUS=running dan ASSERTIONS=active.',
  },
  {
    name: 'setup-help',
    category: 'ops-and-setup',
    invocation: 'manual',
    compatibility: 'portable',
    risk: 'low',
    description:
      'Memandu setup apa pun satu langkah demi satu langkah: tiap respons berisi satu current step, pembatas, lalu daftar "Still remaining" (maksimal 8 item, hanya headline).',
    sourcePath: 'skills/ops-and-setup/setup-help/SKILL.md',
    notes:
      'Daftar langkah kanonis disusun dulu dan diaudit tiap respons; langkah baru yang ditemukan di tengah jalan langsung ditambahkan. Bila tidak ada yang tersisa, nyatakan setup selesai.',
  },
  {
    name: 'boat',
    category: 'ops-and-setup',
    invocation: 'model',
    compatibility: 'vendor-specific',
    risk: 'medium',
    description:
      'Mengelola cloud sandbox Boat (boat.dev, sebelumnya Box by Ascii) lewat API, CLI, dan SSH: provisioning, environment, secret, template, snapshot, stop/resume/fork, serta menjalankan BB dan coding agent di Boat.',
    sourcePath: 'skills/ops-and-setup/boat/SKILL.md',
    prerequisites: ['BOAT_API_KEY'],
    dependencies: ['boat CLI (opsional)'],
    notes:
      'Muat key dari environment atau file kredensial proyek yang di-gitignore; jangan mencetak kredensial atau mengeksekusi installer remote secara buta. Verifikasi akun dan sandbox sebelum membuat resource agar tidak duplikat.',
  },
  {
    name: 'create-readonly-db-role',
    category: 'ops-and-setup',
    invocation: 'manual',
    compatibility: 'adapt',
    risk: 'medium',
    description:
      'Menyiapkan akses PostgreSQL read-only untuk agent: role SELECT-only dengan denylist tabel secret/PII, default_transaction_read_only dan statement_timeout, serta langkah verifikasi dan skill penggunaan lokal proyek.',
    sourcePath: 'skills/ops-and-setup/create-readonly-db-role/SKILL.md',
    prerequisites: ['PostgreSQL (mis. Supabase)', 'psql'],
    notes:
      'SQL, nama role, grant, dan timeout adalah contoh untuk diadaptasi, bukan konfigurasi produksi. Agent tidak pernah menjalankan DDL produksi: manusia yang menerapkan SQL dan menyimpan password di password manager. Periksa kebijakan RLS.',
  },
  {
    name: 'cua-driver',
    category: 'ops-and-setup',
    invocation: 'model',
    compatibility: 'agent-specific',
    risk: 'high',
    description:
      'Memakai Cua Driver untuk tugas desktop atau browser yang sulit lewat Bash/API atau bila user ingin interaksi GUI: uji aplikasi, reproduksi bug visual, isi form, screenshot, rekaman demo. Siklus observe → act → verify dengan accessibility tree dan screenshot.',
    sourcePath: 'skills/ops-and-setup/cua-driver/SKILL.md',
    prerequisites: ['cua-driver', 'izin Accessibility (dan Screen Recording untuk screenshot)'],
    dependencies: ['cua-driver'],
    notes:
      'Kontrol host tidak di-sandbox dan konten desktop yang dikirim ke model cloud keluar dari mesin. Tidak pernah memicu prompt izin otomatis; bukan pengganti OpenAI Codex Computer Use atau riset web.',
  },
  {
    name: 'github-outside-sandbox',
    category: 'ops-and-setup',
    invocation: 'model',
    compatibility: 'adapt',
    risk: 'medium',
    description:
      'Menjalankan perintah Git dan GitHub CLI di host bila sandbox memblokir auth Keychain, jaringan, atau penulisan .git (gh auth, operasi repo/PR, index.lock). Hanya mengatur konteks eksekusi, mengikuti mekanisme eskalasi resmi harness.',
    sourcePath: 'skills/ops-and-setup/github-outside-sandbox/SKILL.md',
    prerequisites: ['gh', 'git'],
    notes:
      'Contoh eskalasi memakai istilah Codex (sandbox_permissions: require_escalated, prefix_rule). Jangan memakai shell wrapper, menyalin kredensial, atau prefix approval yang luas untuk menembus sandbox.',
  },
  {
    name: 'global-agent-guardrails',
    category: 'ops-and-setup',
    invocation: 'model',
    compatibility: 'adapt',
    risk: 'medium',
    description:
      'Mengonfigurasi guard bersama terhadap perintah shell katastrofik di agent AI lokal: satu file pola (POSIX ERE) memberi makan hook bersama dan adapter native per agent (OpenCode, Pi, Hermes, Droid). Mencakup menambah/menyetel pola dan menjalankan test-guard.sh.',
    sourcePath: 'skills/ops-and-setup/global-agent-guardrails/SKILL.md',
    dependencies: ['hooks/deny-dangerous.sh', 'hooks/test-guard.sh'],
    notes:
      'Melindungi dari kecelakaan, bukan agent jahat (perintah yang di-obfuscate bisa lolos). Upstream juga menyertakan direktori hooks/ dengan deny-dangerous.sh dan test-guard.sh. Blokir hanya perintah katastrofik; jangan over-blocking.',
  },
  {
    name: 'openrouter',
    category: 'ops-and-setup',
    invocation: 'model',
    compatibility: 'vendor-specific',
    risk: 'low',
    description:
      'Merancang, membangun, men-debug, dan mengoptimalkan integrasi API OpenRouter: model, reasoning, routing, media, tool, structured output, biaya, performa. Mewajibkan reasoning eksplisit, batas output, deadline, dan batas biaya, dengan lima file referensi.',
    sourcePath: 'skills/ops-and-setup/openrouter/SKILL.md',
    prerequisites: ['akun/API key OpenRouter'],
    notes:
      'Verifikasi ID model dan kapabilitas lewat models API, jangan mengarang. HTTP 200 bukan keberhasilan aplikasi; periksa finish reason dan skema. reasoning.exclude hanya menyembunyikan reasoning, tidak mematikannya.',
  },
  {
    name: 'persistent-localhost',
    category: 'ops-and-setup',
    invocation: 'model',
    compatibility: 'adapt',
    risk: 'low',
    description:
      'Mengelola dev server, API, dan proses lokal persisten di sebuah port lewat macOS LaunchAgents agar tetap hidup setelah shell keluar dan restart saat crash. Satu skrip (scripts/persistent-localhost.sh) untuk start, status, restart, logs, stop.',
    sourcePath: 'skills/ops-and-setup/persistent-localhost/SKILL.md',
    prerequisites: ['macOS (launchd)', 'watchexec (opsional, untuk --watch)'],
    notes:
      'Berjalan sebagai com.persistent-localhost.<nama> di domain gui; KeepAlive hanya saat crash dengan throttle 5 detik. Tidak memakai launchctl load/start/stop yang deprecated atau pkill luas.',
  },
  {
    name: 'prompt-for-others',
    category: 'ops-and-setup',
    invocation: 'manual',
    compatibility: 'portable',
    risk: 'low',
    description:
      'Menulis satu prompt paragraf yang bisa diberikan ke AI agent rekan tim tanpa konteks chat untuk menerapkan perbaikan, upgrade, atau perubahan setup. Urutan wajib: Goal, Context, Steps, Verify, Stop rule, Report back.',
    sourcePath: 'skills/ops-and-setup/prompt-for-others/SKILL.md',
    notes:
      'Uji perbaikan di mesin user dulu; jangan menyertakan perintah yang belum diuji, secret, token, atau URL privat. Satu paragraf saja; jika butuh dua, perbaikannya terlalu besar.',
  },
  {
    name: 'rename-process',
    category: 'ops-and-setup',
    invocation: 'model',
    compatibility: 'adapt',
    risk: 'medium',
    description:
      'Mengoordinasikan rename atau pemindahan project/repo yang melibatkan Git, BB, service, atau banyak mesin sambil menjaga pekerjaan dan histori. Tidak mencakup rename file, simbol kode, atau judul thread biasa.',
    sourcePath: 'skills/ops-and-setup/rename-process/SKILL.md',
    notes:
      'Pakai satu koordinator di luar direktori yang di-rename, ubah hanya sistem yang terdampak, rename direktori nyata di tempat (jangan clone ulang), dan verifikasi workflow tool di path baru, bukan sekadar keberadaan file.',
  },
  {
    name: 'repo-sync',
    category: 'ops-and-setup',
    invocation: 'manual',
    compatibility: 'vendor-specific',
    risk: 'medium',
    description:
      'Mengelola sinkronisasi Git otomatis di macOS dengan repo-sync untuk repo bersama (dokumen tim, catatan, skill): setelah 60 detik tanpa edit lokal, commit perubahan, rebase, dan push; cek remote tiap 60 detik. Hanya branch default yang disinkronkan.',
    sourcePath: 'skills/ops-and-setup/repo-sync/SKILL.md',
    prerequisites: ['macOS', 'Homebrew', 'repo-sync (cask vectal-labs/tap/repo-sync)'],
    dependencies: ['repo-sync'],
    notes:
      'Permintaan sync repo tertentu berarti mengotorisasi commit dan push otomatis, termasuk perubahan staged. Tidak untuk proyek software kompleks atau workflow pull request.',
  },
  {
    name: 'risky-changes',
    category: 'ops-and-setup',
    invocation: 'model',
    compatibility: 'portable',
    risk: 'low',
    description:
      'Memverifikasi asumsi sebelum mengimplementasi perubahan besar atau berisiko pada API, data provider, billing, pricing, kuota, atau default: daftar asumsi, riset sebelum implementasi, ukur perilaku nyata (10-20+ kasus realistis), lalu bandingkan sebelum/sesudah.',
    sourcePath: 'skills/ops-and-setup/risky-changes/SKILL.md',
    notes:
      'Tes memeriksa kebenaran kode; riset dan pengukuran live memeriksa apakah perubahan berguna. Jangan ship selama asumsi material belum terverifikasi.',
  },

  // ── Research and Web ────────────────────────────────────────────────
  {
    name: 'browser-harness',
    category: 'research-and-web',
    invocation: 'model',
    compatibility: 'adapt',
    risk: 'high',
    description:
      'Kontrol browser langsung via CDP untuk otomasi, scraping, testing, atau interaksi halaman web. Terhubung ke Chrome user yang sedang berjalan; navigasi pertama selalu new_tab(url), bukan goto_url.',
    sourcePath: 'skills/research-and-web/browser-harness/SKILL.md',
    prerequisites: ['Chrome', 'browser-harness (MIT)'],
    dependencies: ['browser-use/browser-harness'],
    notes:
      'Memakai browser yang sedang login (cookie), jadi wajib consent dan allowlist target. Skill menyarankan DeepAPI scrape untuk konten tanpa interaksi. Rujukan agent-workspace/ dan interaction-skills/ tidak ikut dikirim (hanya references/install.md); path ~/Developer/browser-harness dan ~/.hermes/skills/ di-hardcode, dan beberapa section (Hermes integration, authenticated extraction) muncul dua kali. Domain skills komunitas hanya aktif dengan BH_DOMAIN_SKILLS=1.',
  },
  {
    name: 'browser-use',
    category: 'research-and-web',
    invocation: 'model',
    compatibility: 'adapt',
    risk: 'high',
    description:
      'Kontrol browser langsung via CDP untuk interaksi web: otomasi, scraping, testing, screenshot, dan pekerjaan situs/aplikasi. Dipanggil lewat CLI browser-use dengan heredoc; tidak dipakai bila cukup satu permintaan HTTP biasa.',
    sourcePath: 'skills/research-and-web/browser-use/SKILL.md',
    prerequisites: ['browser-use CLI', 'Chrome'],
    dependencies: ['browser-use'],
    notes:
      'Varian lain dari browser-harness dengan metadata install (uv) dan LICENSE.md sendiri; sama-sama memakai browser yang sedang login, jadi perlakukan dengan consent dan allowlist. Domain skills nonaktif kecuali BH_DOMAIN_SKILLS=1.',
  },
  {
    name: 'deep-research',
    category: 'research-and-web',
    invocation: 'manual',
    compatibility: 'vendor-specific',
    risk: 'medium',
    description:
      'Menjalankan deep research via DeepAPI (POST /v1/research/deep) dan menyimpan report Markdown bersitasi. Satu panggilan mengembalikan jawaban bersitasi (target 700-1.120 kata); query maksimal 4000 karakter, maxCostUsd minimum "0.35" dengan default "0.70".',
    sourcePath: 'skills/research-and-web/deep-research/SKILL.md',
    prerequisites: ['API key DeepAPI (berbayar)'],
    dependencies: ['deepapi'],
    notes:
      'Key dibaca dari environment atau secret store (jangan pernah source ~/.zshrc, bisa memutus shell). Retry harus memakai Idempotency-Key yang sama; tanyakan user sebelum menaikkan batas biaya. Skill ini masih menyuruh "mengikuti skill research-prompt" yang sudah tidak ada di upstream.',
  },
  {
    name: 'deep-scrape',
    category: 'research-and-web',
    invocation: 'model',
    compatibility: 'vendor-specific',
    risk: 'medium',
    description:
      'Membangun dossier JSON bersumber tentang orang, perusahaan, atau topik dengan DeepAPI (POST /v1/scrape/deep): profil, prospek, due diligence vendor, riset pelanggan. Untuk rekomendasi gunakan deep-research.',
    sourcePath: 'skills/research-and-web/deep-scrape/SKILL.md',
    prerequisites: ['API key DeepAPI dengan scope scrape:deep (berbayar)'],
    dependencies: ['deepapi'],
    notes:
      'query maksimal 500 karakter, maxCostUsd default "0.50" dan maksimum "5.00" per request, dryRun: true untuk pratinjau credit hold. Hanya field terdokumentasi yang dikirim; kontrak live ada di GET /v1/capabilities.',
  },
  {
    name: 'deepapi',
    category: 'research-and-web',
    invocation: 'model',
    compatibility: 'vendor-specific',
    risk: 'high',
    description:
      'Memakai DeepAPI untuk semua pencarian web, deep research, dan scraping (website, LinkedIn, GitHub, X/Twitter, YouTube, Instagram) sebagai pengganti tool search/fetch/browser bawaan; juga navigasi dan aksi di situs publik, kirim email aman, dan generate gambar. SKILL.md 88 baris plus references/ (browse-web, deep-research, generate-image, manage-agent-state, scraping, send-email, seo).',
    sourcePath: 'skills/research-and-web/deepapi/SKILL.md',
    prerequisites: [
      'API key DeepAPI (berbayar)',
      'DEEPAPI_API_BASE_URL (opsional override)',
    ],
    notes:
      'Skill ini managed (metadata deepapi-managed, version, fingerprint) dan diperbarui oleh updater lokal harian ~/.deepapi/update-skill.sh. Skill menegaskan untuk tidak mengunduh lalu mengeksekusi updater secara langsung dan hanya memperbarui dari deepapi.co. Banyak endpoint berbayar; tinjau updater sebelum mengaktifkannya.',
  },
  {
    name: 'domain-checker',
    category: 'research-and-web',
    invocation: 'manual',
    compatibility: 'portable',
    risk: 'low',
    description:
      'Memeriksa registrasi domain secara batch lewat RDAP publik tanpa key atau login, memakai scripts/check_domains.py (Python 3). Status: REGISTERED, NOT_FOUND, UNAVAILABLE, UNKNOWN, INVALID.',
    sourcePath: 'skills/research-and-web/domain-checker/SKILL.md',
    prerequisites: ['Python 3'],
    notes:
      'NOT_FOUND bukan jaminan bisa dibeli (reservasi, aturan registrasi, atau harga premium). Hanya domain langsung di bawah TLD (bukan .co.uk); konkurensi dibatasi 4. Gunakan registrar untuk ketersediaan akhir.',
  },
  {
    name: 'fireflies-transcript',
    category: 'research-and-web',
    invocation: 'manual',
    compatibility: 'vendor-specific',
    risk: 'low',
    description:
      'Mengambil transkrip rapat Fireflies.ai mentah lewat GraphQL (read-only): cari ID meeting, lalu tarik transkrip. Untuk YouTube gunakan youtube-transcript.',
    sourcePath: 'skills/research-and-web/fireflies-transcript/SKILL.md',
    prerequisites: ['API key Fireflies.ai', 'curl', 'jq'],
    notes:
      'Filter transcripts(title:) bersifat exact-match, jadi daftar meeting terbaru lalu grep lokal. date dalam epoch milidetik. Skill youtube-transcript yang dirujuk tidak ada di snapshot ini.',
  },
  {
    name: 'online-shopping',
    category: 'research-and-web',
    invocation: 'model',
    compatibility: 'vendor-specific',
    risk: 'medium',
    description:
      'Riset pembelian online dengan DeepAPI: harga wajar, deal, tempat beli, kepercayaan toko, dan penghematan pajak checkout yang legal (pengingat VAT/reverse-charge). Riset saja, tidak pernah melakukan order atau memasukkan data pembayaran/alamat. Fable 5 model yang disarankan.',
    sourcePath: 'skills/research-and-web/online-shopping/SKILL.md',
    prerequisites: ['API key DeepAPI (berbayar)'],
    dependencies: ['deepapi'],
    notes:
      'Diinvokasi otomatis untuk pembelian online (jangan tambahkan disable-model-invocation). Bukan fokus utama guide software engineering.',
  },
  {
    name: 'varied-search',
    category: 'research-and-web',
    invocation: 'model',
    compatibility: 'vendor-specific',
    risk: 'low',
    description:
      'Meneliti sebuah topik lintas web, GitHub, dan X/Twitter dengan DeepAPI (5 pencarian web cepat, 5 scrape GitHub, 5 scrape Twitter) lalu menulis laporan Markdown ringkas.',
    sourcePath: 'skills/research-and-web/varied-search/SKILL.md',
    prerequisites: ['API key DeepAPI (berbayar)'],
    dependencies: ['deepapi'],
    notes:
      'Skill sangat pendek (delapan baris): hanya instruksi prompt tanpa detail endpoint; bergantung pada skill deepapi.',
  },
  {
    name: 'who-is-this',
    category: 'research-and-web',
    invocation: 'manual',
    compatibility: 'vendor-specific',
    risk: 'medium',
    description:
      'Meneliti rekam jejak publik seseorang dan memberi penilaian kredibilitas singkat via DeepAPI: X, LinkedIn, GitHub, deep research, lalu ringkasan maksimal 100 kata dengan arketipe (builder, operator, researcher, grifter, dst.).',
    sourcePath: 'skills/research-and-web/who-is-this/SKILL.md',
    prerequisites: ['API key DeepAPI (berbayar)'],
    dependencies: ['deepapi'],
    notes:
      'Memproses data pribadi orang; verifikasi identitas dulu dan jangan menebak. Angka klaim sendiri diberi label "their claim", hanya yang terverifikasi diberi label "verified".',
  },

  // ── Skill Authoring ─────────────────────────────────────────────────
  {
    name: 'effective-agent-skills',
    category: 'skill-authoring',
    invocation: 'model',
    compatibility: 'portable',
    risk: 'low',
    description:
      'Menulis, mereview, dan men-debug agent skill: anatomi SKILL.md, progressive disclosure (~100 token per skill di level discovery), design pattern, anti-pattern, testing, komposisi, checklist keamanan, dan checklist ship.',
    sourcePath: 'skills/skill-authoring/effective-agent-skills/SKILL.md',
    notes:
      'Menegaskan bahwa disable-model-invocation bukan bagian spesifikasi inti Agent Skills, melainkan ekstensi klien (Claude Code, VS Code/Copilot). Tumpang tindih dengan writing-for-agents di koleksi Matt Pocock.',
  },
  {
    name: 'distribute-skill-to-all-agents',
    category: 'skill-authoring',
    invocation: 'model',
    compatibility: 'agent-specific',
    risk: 'high',
    description:
      'Mendistribusikan skill global ke lima lokasi agar semua agent melihatnya: Codex (~/.agents/skills/ kanonis), Claude Code dan Pi (symlink), Hermes (~/.hermes/skills/, salinan terpisah), dan Cursor (~/.cursor/skills/, satu symlink per skill, jangan skills-cursor/). Diakhiri verifikasi byte count di kelima lokasi.',
    sourcePath: 'skills/skill-authoring/distribute-skill-to-all-agents/SKILL.md',
    notes:
      'Sangat spesifik pada tata letak mesin David (symlink dan salin ke ~/.hermes). Bila ~/.claude/skills adalah direktori nyata atau salinan Cursor berbeda, skill meminta konfirmasi sebelum menyentuh.',
  },
  {
    name: 'push-skills',
    category: 'skill-authoring',
    invocation: 'manual',
    compatibility: 'agent-specific',
    risk: 'high',
    description:
      'Mendorong skill dan AGENTS.md global ke repo privat lalu memverifikasi mirror publik. Run /push-skills selalu mencakup perubahan AGENTS.md global kecuali dikecualikan, dan melaporkannya terpisah dari publikasi skill.',
    sourcePath: 'skills/skill-authoring/push-skills/SKILL.md',
    dependencies: ['distribute-skill-to-all-agents', 'publish-skill'],
    notes:
      'Workflow privat David (repo privat dengan mirror publik ter-sanitasi). Hanya commit atau push bila user meminta; mengedit skill bukan izin untuk mempublikasikan. Pengganti push-skill-to-github yang sudah dihapus upstream, dengan scope berbeda.',
  },

  // ── Thinking and Docs ───────────────────────────────────────────────
  {
    name: 'adr-verbatim',
    category: 'thinking-and-docs',
    invocation: 'model',
    compatibility: 'portable',
    risk: 'low',
    description:
      'Mencatat ADR ringkas yang mempertahankan makna keputusan user tanpa noise percakapan: ekstrak keputusan, ambil nomor berikutnya di folder ADR proyek, tulis ADR pendek (Status: accepted), periksa tiap pernyataan terhadap keputusan, tampilkan path dan isinya.',
    sourcePath: 'skills/thinking-and-docs/adr-verbatim/SKILL.md',
    notes:
      'Tidak menambahkan syarat atau saran agent yang tidak disetujui. Ikuti penomoran dan nama file ADR yang sudah ada (mis. docs/adr/0042-slug.md).',
  },
  {
    name: 'ask-then-build',
    category: 'thinking-and-docs',
    invocation: 'model',
    compatibility: 'portable',
    risk: 'low',
    description:
      'Menjernihkan fitur, perubahan, atau refactor lewat pertanyaan dahulu, lalu menulis prompt build untuk agent lain. Fase 1: 3-6 pertanyaan paling non-obvious, satu per satu dengan opsi A-D dan pilihan yang disarankan; fase 2: prompt build.',
    sourcePath: 'skills/thinking-and-docs/ask-then-build/SKILL.md',
    notes:
      'Layout pertanyaan dan opsi dipisah baris kosong karena renderer Markdown (termasuk bb) menggabungkan newline tunggal.',
  },
  {
    name: 'before-building',
    category: 'thinking-and-docs',
    invocation: 'manual',
    compatibility: 'portable',
    risk: 'low',
    description:
      'Begitu user mengusulkan sebuah build, langsung (tanpa membaca file atau memakai tool) mengangkat 1-3 pilihan penting yang tersembunyi di ide itu, masing-masing dengan opsi singkat dan rekomendasi gut, lalu berhenti dan menunggu jawaban.',
    sourcePath: 'skills/thinking-and-docs/before-building/SKILL.md',
    notes:
      'Skill empat belas baris berbasis prompt; hanya jawaban dari gut tanpa riset. Bisa juga dipanggil dengan /before-building.',
  },
  {
    name: 'decisions',
    category: 'thinking-and-docs',
    invocation: 'manual',
    compatibility: 'portable',
    risk: 'low',
    description:
      'Meminta agent mendaftar semua keputusan penting yang ia ambil selama pekerjaan ini dan belum yakin benar, beserta alternatif yang belum dipertimbangkan. Singkat dan dalam bahasa sederhana; keputusan yang sudah optimal tidak dicantumkan.',
    sourcePath: 'skills/thinking-and-docs/decisions/SKILL.md',
    notes: 'Skill pendek berbasis prompt, hanya untuk dipanggil manual dengan /decisions.',
  },
  {
    name: 'file-tree',
    category: 'thinking-and-docs',
    invocation: 'manual',
    compatibility: 'portable',
    risk: 'low',
    description:
      'Mencetak file tree ringkas dari topik yang sedang dibahas di dalam code block: hanya struktur tingkat tinggi, folder utama saja, tidak membanjiri.',
    sourcePath: 'skills/thinking-and-docs/file-tree/SKILL.md',
    notes: 'Skill sembilan baris, dipanggil manual ("file-tree").',
  },
  {
    name: 'image-prompt',
    category: 'thinking-and-docs',
    invocation: 'model',
    compatibility: 'portable',
    risk: 'low',
    description:
      'Menulis empat variasi prompt yang berbeda untuk model gambar apa pun (gambar, thumbnail, banner, logo, ilustrasi). Tepat 4 varian, tiap varian satu paragraf di code block bertipe text, diakhiri --ar 1:1 kecuali rasio lain diminta. Hanya teks prompt.',
    sourcePath: 'skills/thinking-and-docs/image-prompt/SKILL.md',
    notes:
      'Flag --ar adalah flag aspect-ratio Midjourney yang tidak berbahaya di model lain. Tidak ada komentar atau pertanyaan setelah prompt.',
  },
  {
    name: 'keep-track',
    category: 'thinking-and-docs',
    invocation: 'model',
    compatibility: 'portable',
    risk: 'low',
    description:
      'Membahas satu topik pada satu waktu dan menambahkan, di akhir tiap respons, pemisah --- plus daftar topik atau keputusan terbuka yang tersisa. Item baru hanya ditambah atas permintaan/persetujuan user; "next" tidak mengizinkan memperluas antrean.',
    sourcePath: 'skills/thinking-and-docs/keep-track/SKILL.md',
    notes: 'Skill sepuluh baris berbasis prompt.',
  },
  {
    name: 'read-all-adrs',
    category: 'thinking-and-docs',
    invocation: 'manual',
    compatibility: 'draft',
    risk: 'low',
    description:
      'Membaca setiap file ADR markdown di folder docs/adr/ proyek agar punya konteks penuh atas keputusan lampau. Hanya dipanggil eksplisit.',
    sourcePath: 'skills/thinking-and-docs/read-all-adrs/SKILL.md',
    notes:
      'Masih memuat komentar TODO(David) ("write the strong wording here") dan bahasa kasar di body. Hanya perintah baca semua file tanpa proses atau verifikasi tambahan.',
  },
  {
    name: 'remind',
    category: 'thinking-and-docs',
    invocation: 'manual',
    compatibility: 'portable',
    risk: 'low',
    description:
      'Menulis ulang respons terakhir agar lebih sederhana dan pendek dalam bahasa Inggris sederhana, diawali TLDR 3-5 kalimat tentang percakapan sejauh ini dan pengulangan prompt pertama user. Dipanggil manual dengan /remind.',
    sourcePath: 'skills/thinking-and-docs/remind/SKILL.md',
    notes: 'Skill pendek berbasis prompt.',
  },
  {
    name: 'rename',
    category: 'thinking-and-docs',
    invocation: 'manual',
    compatibility: 'portable',
    risk: 'low',
    description:
      'Mengganti nama thread atau session saat ini menjadi 2-5 kata deskriptif huruf kecil yang relevan dengan hal utama yang sedang dikerjakan. Dipanggil manual ("rename", "rename this").',
    sourcePath: 'skills/thinking-and-docs/rename/SKILL.md',
    notes: 'Skill delapan baris. Berbeda dengan rename-process, yang menangani rename project/repo.',
  },
  {
    name: 'save-idea',
    category: 'thinking-and-docs',
    invocation: 'model',
    compatibility: 'adapt',
    risk: 'medium',
    description:
      'Menyimpan ide, observasi, topik konten, proyek, dan keyakinan ke repo ide lewat awalan (video:, topic:, observation:, marketing:, startup:, mini:, article:, atau tanpa awalan untuk convictions), memberi nomor entri berikutnya, lalu commit, push, dan konfirmasi.',
    sourcePath: 'skills/thinking-and-docs/save-idea/SKILL.md',
    prerequisites: ['repo ide dengan file seperti VIDEO-IDEAS.md, TOPICS.md, CONVICTIONS.md'],
    notes:
      'Terikat pada struktur repo ide David dan melakukan commit dan push otomatis. Menambah ke backlog ide, bukan pengingat atau task. Jangan menomori ulang atau mengedit entri lama.',
  },
  {
    name: 'signal-from-expert',
    category: 'thinking-and-docs',
    invocation: 'manual',
    compatibility: 'vendor-specific',
    risk: 'medium',
    description:
      'Membandingkan catatan user dengan karya seorang ahli pada satu topik, mengembalikan kutipan persis yang relevan, lokasi sumber, dan setidaknya satu celah dalam pemikiran user. Butuh corpus, nama ahli, dan topik; scraping lewat DeepAPI setelah user menyetujui daftar sumber.',
    sourcePath: 'skills/thinking-and-docs/signal-from-expert/SKILL.md',
    prerequisites: ['API key DeepAPI (berbayar)', 'Python 3 (scripts/fetch-sources.py)'],
    dependencies: ['deepapi'],
    notes:
      'Menunggu persetujuan ("go?") sebelum scraping dan menyimpan halaman ke <repo>/essays/<slug-ahli>/.',
  },
  {
    name: 'stop-overthinking',
    category: 'thinking-and-docs',
    invocation: 'manual',
    compatibility: 'portable',
    risk: 'low',
    description:
      'Menghentikan overthinking dan memaksa keputusan praktis yang singkat: tunjukkan hanya masalah kritis atau serius, jika tidak katakan boleh lanjut, lalu beri langkah berikutnya, berpikir seperti entrepreneur praktis.',
    sourcePath: 'skills/thinking-and-docs/stop-overthinking/SKILL.md',
    notes: 'Skill pendek berbasis prompt, dipanggil manual.',
  },
  {
    name: 'teach',
    category: 'thinking-and-docs',
    invocation: 'manual',
    compatibility: 'duplicate',
    risk: 'low',
    description:
      'Mengajari user skill atau konsep baru dalam workspace ini sebagai permintaan stateful lintas session: MISSION.md, reference/*.html, dan pelajaran. Respons chat harus sangat ringkas; materi ada di dokumen pelajaran. Mengkredit versi asli oleh Matt Pocock.',
    sourcePath: 'skills/thinking-and-docs/teach/SKILL.md',
    notes:
      'Fork dari /teach Matt Pocock ("Original version created by Matt Pocock"); lihat skill teach di koleksi Matt untuk perbandingan.',
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
