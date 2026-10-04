// Superpowers — obra/superpowers.
// Disinkronkan dengan upstream v6.4.2 (HEAD 8ca22db, 2026-09-25, MIT, 15 skill)
// pada 2026-10-04. Konten tiap skill diturunkan dari SKILL.md upstream; label
// `invocation` adalah konvensi guide ini: seluruh skill upstream berformat
// 'Use when ...' dan dipicu otomatis lewat bootstrap using-superpowers
// (tidak ada disable-model-invocation).
import type { BilingualString, BilingualList } from '@/types/skill'

export const SUPERPOWERS_SOURCE_REPO = 'github.com/obra/superpowers'
export const SUPERPOWERS_SOURCE_SHA = '8ca22dba9a94f28898bbce59f2537ff4d87c747d'
export const SOURCE_REPO = SUPERPOWERS_SOURCE_REPO
export const SOURCE_SHA = SUPERPOWERS_SOURCE_SHA

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
}

export const superpowersSkills: RichSkill[] = [
  {
    name: "brainstorming",
    category: "architecture",
    invocation: "model",
    description: {
      id: "Wajib dipakai sebelum pekerjaan kreatif apa pun: klasifikasikan permintaan (Spike, Bounded, Architectural), gali maksud dan desain, dan dapatkan persetujuan sebelum implementasi.",
      en: "Must be used before any creative work: classify the request (Spike, Bounded, Architectural), explore intent and design, and get approval before implementation.",
    },
    detailedDescription: {
      id: "brainstorming mengubah ide menjadi desain dan spesifikasi lewat dialog kolaboratif. Sebelum pertanyaan pertama, agent mengklasifikasikan permintaan ke tiga jalur dan menyebutkannya keras-keras agar bisa dioverride: Spike (pertanyaan kelayakan, hasilnya jawaban, bukan kode yang disimpan), Bounded (perubahan terukur pada alur yang sudah ada di repo; desain singkat di chat) atau Architectural (proyek/subsistem baru atau perubahan struktur; spec tertulis lalu writing-plans). Bila ragu, ambil jalur yang lebih berat; jalur hanya bisa naik, tidak pernah turun di tengah jalan.",
      en: "brainstorming turns ideas into designs and specs through collaborative dialogue. Before the first question the agent classifies the request into three paths and says it out loud so it can be overridden: Spike (a feasibility question whose output is an answer, not code you keep), Bounded (a well-scoped change to a flow that already exists in the repo; short design in chat) or Architectural (new projects/subsystems or structural changes; a written spec then writing-plans). When in doubt it takes the heavier path; the path only ratchets up, never down mid-task.",
    },
    useWhen: {
      id: ["Sebelum pekerjaan kreatif apa pun: membuat fitur, membangun komponen, menambah fungsionalitas, atau mengubah perilaku.", "Permintaan masih kabur dan perlu dipahami maksud, kendala, dan kriteria suksesnya."],
      en: ["Before any creative work: creating features, building components, adding functionality, or modifying behavior.", "A request is still vague and its intent, constraints, and success criteria need pinning down."],
    },
    avoidWhen: {
      id: ["Tidak ada kondisi 'terlalu sederhana': perubahan kecil tetap mendapat desain singkat di chat dan persetujuan sebelum implementasi."],
      en: ["There is no 'too simple' exemption: even a small change gets a short chat design and approval before implementation."],
    },
    howItWorks: {
      id: ["Klasifikasikan dan umumkan jalur (Spike / Bounded / Architectural), lalu telusuri konteks proyek (read-only diperbolehkan).", "Temukan maksud: bila hilang, ajukan satu pertanyaan fokus tentang tujuan; tulis kembali pemahaman Anda agar bisa dikoreksi, memisahkan apa yang dikatakan dari asumsi.", "Jalur Architectural: tawarkan visual companion tepat waktu, ajukan 2-3 pendekatan dengan trade-off dan rekomendasi, presentasikan desain per bagian, tulis spec ke docs/superpowers/specs/YYYY-MM-DD-<topic>-design.md dan commit, spec self-review, minta user mereview spec, lalu panggil writing-plans.", "Jalur Bounded: pertanyaan klarifikasi satu per satu, desain singkat di chat, lalu BERHENTI sampai ada persetujuan eksplisit. Jalur Spike: pertanyaan + rencana probe 2-3 kalimat, anggukan, selidiki semurah mungkin, laporkan sebagai rekomendasi."],
      en: ["Classify and announce the path (Spike / Bounded / Architectural), then explore project context (read-only is allowed).", "Discover intent: when missing, ask one focused question about purpose; write back your understanding so it can be corrected, separating what was said from assumptions.", "Architectural path: offer the visual companion just-in-time, propose 2-3 approaches with trade-offs and a recommendation, present the design in sections, write the spec to docs/superpowers/specs/YYYY-MM-DD-<topic>-design.md and commit, spec self-review, ask the user to review the spec, then invoke writing-plans.", "Bounded path: clarifying questions one at a time, a short design in chat, then STOP until there is an explicit yes. Spike path: a 2-3 sentence question + probe plan, a nod, investigate as cheaply as correctness allows, report a recommendation."],
    },
    coreRules: {
      id: ["HARD-GATE: tidak ada tindakan implementasi (menulis kode produk, scaffolding, install dependency, memanggil skill implementasi) sebelum prasyarat jalur terpilih disetujui.", "Persetujuan berlaku untuk tahap yang benar-benar dipresentasikan; persetujuan ide bukan persetujuan artefak yang belum ada.", "Jalur Architectural: persetujuan desain percakapan hanya mengizinkan menulis spec; persetujuan spec tertulis hanya mengizinkan memanggil writing-plans."],
      en: ["HARD-GATE: no implementation action (writing product code, scaffolding, installing dependencies, invoking an implementation skill) before the selected path's prerequisites are approved.", "A reply approves the stage actually presented; approval of an idea is not approval of artifacts that do not exist yet.", "Architectural path: conversational design approval only permits writing the spec; written-spec approval only permits invoking writing-plans."],
    },
    tips: {
      id: ["Spike yang berhasil bukan izin menyimpan kodenya: itu permintaan baru yang harus diklasifikasikan ulang.", "Visual companion (opsional) ditawarkan hanya saat sebuah pertanyaan memang lebih jelas bila ditampilkan; ia memuat logo Prime Radiant dari situs mereka secara default (lihat README, bagian telemetry)."],
      en: ["A spike that works is not permission to keep its code: that is a new request to classify again.", "The (optional) visual companion is offered only when a question is clearer shown than described; by default it loads the Prime Radiant logo from their website (see the README telemetry section)."],
    },
    pairsWellWith: ["writing-plans", "using-git-worktrees"],
    sourcePath: "skills/brainstorming/SKILL.md",
  },
  {
    name: "diagnosing-superpowers",
    category: "engineering",
    invocation: "model",
    description: {
      id: "Mencari tahu mengapa sebuah session Superpowers berjalan salah (kerja berulang, rencana diabaikan, skill tidak aktif, terlalu lama/mahal) lewat transkrip, atau menyusun bundle laporan bug untuk maintainer. Ditambahkan di v6.4.1.",
      en: "Work out why a Superpowers session went wrong (repeated work, ignored plans, a skill that did not fire, too slow/expensive) from the transcripts, or build a bug-report bundle for the maintainers. Added in v6.4.1.",
    },
    detailedDescription: {
      id: "diagnosing-superpowers membaca transkrip session di disk dan melaporkan apa yang terjadi dengan bukti. Skill melaporkan, bukan mendiagnosis Superpowers: setiap temuan wajib mengutip path:line dan setiap angka harus berasal dari transkrip atau perintah yang dijalankan. Bisa untuk session saat ini atau lampau (id/path) di harness apa pun, dan bila diminta menyiapkan bundle bug report yang sudah di-scrub atau membuat GitHub issue.",
      en: "diagnosing-superpowers reads the session transcripts on disk and reports what happened with evidence. It reports; it does not diagnose Superpowers: every finding must cite path:line and every number must come from the transcript or a command it ran. It works on the current or a past session (by id/path) on any harness and, on request, prepares a scrubbed bug-report bundle or files a GitHub issue.",
    },
    useWhen: {
      id: ["Session salah jalan dan partner ingin tahu sebabnya: kerja berulang, rencana diabaikan, 'skill X tidak pernah aktif', 'terlalu lama', 'kenapa mahal'.", "Ingin membuat bug report untuk maintainer Superpowers."],
      en: ["A session went wrong and your partner wants to know why: repeated work, ignored plans, 'skill X never fired', 'it took too long', 'why is it so expensive'.", "You want to build a bug report for the Superpowers maintainers."],
    },
    avoidWhen: {
      id: ["Ingin agent menyatakan cacat pada sebuah skill atau mengusulkan perubahan: skill ini tidak pernah melakukannya, hanya melaporkan keterlibatan."],
      en: ["You want the agent to name a defect in a skill or propose a change: this skill never does that, it only reports involvement."],
    },
    howItWorks: {
      id: ["Problem intake: tanyakan satu pertanyaan sekali jalan sampai ada pernyataan masalah (session, rentang turn, yang diharapkan, yang terjadi, observabel yang dipedulikan).", "Locate: resolve path transkrip yang terverifikasi (references/session-discovery.md), buat folder kerja di ~/.superpowers/diagnosing-superpowers/<session-id>/, dan isi templates/case.md.", "Triage: dispatch analyst subagent paralel per dimensi (skill-timeline, plan-adherence, repeated-work, stumbles, quality-evidence, request-conflicts, cost-and-time); buang temuan tanpa path:line.", "Report: isi semua bagian templates/report.md. Opsional: cari/buat GitHub issue (hanya setelah teks disetujui), ekspor bundle yang di-scrub (skeleton/evidence/full) setelah diminta, cari session serupa."],
      en: ["Problem intake: ask one question at a time until there is a problem statement (session, turn range, what was expected, what happened, the observable they care about).", "Locate: resolve verified transcript paths (references/session-discovery.md), create a workspace at ~/.superpowers/diagnosing-superpowers/<session-id>/, and fill templates/case.md.", "Triage: dispatch parallel analyst subagents per dimension (skill-timeline, plan-adherence, repeated-work, stumbles, quality-evidence, request-conflicts, cost-and-time); discard findings without path:line.", "Report: fill every section of templates/report.md. Optionally search/file a GitHub issue (only after the text is approved), export a scrubbed bundle (skeleton/evidence/full) when asked, and find similar sessions."],
    },
    coreRules: {
      id: ["Read-only: tidak pernah mengubah, memindah, atau menghapus file session; patuhi references/context-safety.md karena satu baris transkrip bisa sebesar megabyte.", "Tidak ada diagnosis Superpowers: laporan hanya menyatakan keterlibatan dan berhenti, dan tidak ada nasihat untuk partner.", "Gerbang persetujuan: tidak ada arsip sebelum partner melihat scrub log dan daftar file; tidak ada issue/komentar sebelum teks persisnya disetujui. Scrubbing bisa melewatkan sesuatu: partner harus meninjau setiap file sebelum membagikan."],
      en: ["Read-only: never modify, move, or delete a session file; follow references/context-safety.md because one transcript line can be a megabyte.", "No Superpowers diagnosis: the report states involvement and stops, and gives no advice to the partner.", "Approval gates: no archive before the partner has seen the scrub log and file list; no issue/comment before they approve the exact text. Scrubbing can miss things: the partner must review every file before sharing."],
    },
    tips: {
      id: ["Bundle hanya dibuat atas permintaan; jika tujuannya bug report, katakan sekali bahwa bundle tersedia lalu tunggu.", "README upstream: cukup minta agent 'figure out what went wrong with superpowers in this session'."],
      en: ["A bundle is built only on request; if the goal was a bug report, say once that a bundle is available, then wait.", "Upstream README: just ask your agent to 'figure out what went wrong with superpowers in this session'."],
    },
    pairsWellWith: ["using-superpowers", "subagent-driven-development", "executing-plans"],
    sourcePath: "skills/diagnosing-superpowers/SKILL.md",
  },
  {
    name: "dispatching-parallel-agents",
    category: "architecture",
    invocation: "model",
    description: {
      id: "Dipakai saat menghadapi 2+ tugas independen yang bisa dikerjakan tanpa state bersama atau ketergantungan berurutan: satu agent per domain masalah, dispatch bersamaan.",
      en: "Use when facing 2+ independent tasks that can be worked on without shared state or sequential dependencies: one agent per problem domain, dispatched concurrently.",
    },
    detailedDescription: {
      id: "Saat ada beberapa kegagalan tak terkait (file tes, subsistem, atau bug berbeda), menyelidikinya berurutan membuang waktu. dispatching-parallel-agents mengelompokkan kegagalan menurut domain, memberi tiap agent scope, tujuan, batasan, dan output yang jelas, lalu men-dispatch semuanya dalam satu respons agar berjalan paralel. Tiap subagent tidak boleh mewarisi riwayat session Anda.",
      en: "When there are several unrelated failures (different test files, subsystems, or bugs), investigating them sequentially wastes time. dispatching-parallel-agents groups failures by domain, gives each agent a specific scope, goal, constraints, and expected output, and dispatches them all in one response so they run in parallel. Subagents must never inherit your session history.",
    },
    useWhen: {
      id: ["3+ file tes gagal dengan akar masalah berbeda.", "Beberapa subsistem rusak secara independen dan masing-masing bisa dipahami tanpa konteks yang lain."],
      en: ["3+ test files failing with different root causes.", "Multiple subsystems broken independently, each understandable without context from the others."],
    },
    avoidWhen: {
      id: ["Kegagalan saling terkait (memperbaiki satu bisa memperbaiki yang lain).", "Perlu memahami state sistem penuh, atau agent akan saling mengganggu (state bersama)."],
      en: ["The failures are related (fixing one might fix others).", "You need the full system state, or the agents would interfere with each other (shared state)."],
    },
    howItWorks: {
      id: ["Identifikasi domain independen dengan mengelompokkan kegagalan menurut apa yang rusak.", "Buat tugas agent yang terfokus: scope spesifik (satu file tes atau subsistem), tujuan jelas, batasan (jangan ubah kode lain), dan output yang diharapkan (ringkasan temuan dan perbaikan).", "Dispatch paralel: semua panggilan subagent dalam satu respons berjalan bersamaan; satu per respons berarti berurutan.", "Review dan integrasi: baca tiap ringkasan, pastikan perbaikan tidak bertabrakan, jalankan test suite penuh, lalu integrasikan."],
      en: ["Identify independent domains by grouping failures by what is broken.", "Create focused agent tasks: a specific scope (one test file or subsystem), a clear goal, constraints (do not change other code), and expected output (summary of findings and fixes).", "Dispatch in parallel: all subagent calls in one response run concurrently; one per response means sequential.", "Review and integrate: read each summary, verify the fixes do not conflict, run the full test suite, then integrate."],
    },
    coreRules: {
      id: ["Satu agent per domain masalah independen; biarkan bekerja bersamaan.", "Berikan konteks yang dibuat dengan presisi, bukan riwayat session Anda.", "Selalu verifikasi dengan test suite penuh setelah menggabungkan hasil."],
      en: ["One agent per independent problem domain; let them work concurrently.", "Give precisely crafted context, never your session's history.", "Always verify with the full test suite after merging results."],
    },
    tips: {
      id: ["Mengelompokkan kegagalan menurut apa yang rusak (mis. approval tool, penyelesaian batch, abort) menunjukkan domain yang independen.", "Untuk plan multi-task berurutan gunakan subagent-driven-development, bukan skill ini."],
      en: ["Grouping failures by what is broken (e.g. tool approval, batch completion, abort) reveals independent domains.", "For sequential multi-task plans use subagent-driven-development instead of this skill."],
    },
    pairsWellWith: ["systematic-debugging", "subagent-driven-development", "verification-before-completion"],
    sourcePath: "skills/dispatching-parallel-agents/SKILL.md",
  },
  {
    name: "executing-plans",
    category: "architecture",
    invocation: "model",
    description: {
      id: "Eksekusi rencana implementasi sendiri, task demi task, di session ini: tanpa implementer subagent per task dan tanpa reviewer per task, dengan satu review konteks-segar atas seluruh branch di akhir.",
      en: "Execute an implementation plan yourself, task by task, in this session: no implementer subagent per task and no reviewer per task, with one fresh-context review of the whole branch at the end.",
    },
    detailedDescription: {
      id: "executing-plans adalah alternatif inline yang lebih murah daripada subagent-driven-development, dipakai saat partner memilih eksekusi inline atau harness tidak punya tool subagent. Brief adalah spec, ledger adalah ingatan Anda, TDD adalah gerbang per task, dan reviewer akhir adalah sepasang mata kedua. Eksekusi berkelanjutan: tidak berhenti untuk bertanya 'lanjut?' di antara task; konflik dan cacat rencana diputuskan lewat 'Ruling' yang dicatat di ledger.",
      en: "executing-plans is the cheaper inline alternative to subagent-driven-development, used when the partner chose inline execution or the harness has no subagent tool. The brief is the spec, the ledger is your memory, TDD is the per-task gate, and the final reviewer is the second pair of eyes. Execution is continuous: no stopping to ask 'should I continue?' between tasks; conflicts and plan defects are decided through a 'Ruling' recorded in the ledger.",
    },
    useWhen: {
      id: ["Anda punya rencana dari writing-plans dan partner memilih eksekusi inline.", "Harness tidak punya tool subagent (jangan pernah mengarang dispatch)."],
      en: ["You have a plan from writing-plans and your partner chose inline execution.", "The harness has no subagent tool (never fabricate a dispatch)."],
    },
    avoidWhen: {
      id: ["Partner menginginkan gerbang review di tiap task, atau rencananya cukup panjang sehingga task akhir berjalan di konteks yang terkompaksi: pilih subagent-driven-development."],
      en: ["The partner wants a review gate on every task, or the plan is long enough that its later tasks would run on a compacted context: prefer subagent-driven-development."],
    },
    howItWorks: {
      id: ["Setup: pastikan worktree terisolasi (using-git-worktrees), jalankan sdd-workspace PLAN_FILE untuk direktori workspace git-ignored, baca plan + spec, dan scan konflik sekali.", "Ledger progress.md (di .superpowers/sdd/<plan>/) menjadi catatan: task dengan baris 'Task N: complete' sudah selesai; setelah kompaksi percayai ledger dan git log, bukan ingatan Anda.", "Per task: kerjakan langkah berurutan dengan TDD, jalankan setiap verifikasi dan baca setiap output, commit sesuai langkah commit rencana, lalu catat hasil dan tandai todo.", "Akhir: review seluruh branch (reviewer konteks segar bila ada), satu pass perbaikan untuk Critical/Important (RED→GREEN), hapus workspace plan, lalu gunakan finishing-a-development-branch."],
      en: ["Setup: ensure an isolated worktree (using-git-worktrees), run sdd-workspace PLAN_FILE for the git-ignored workspace directory, read plan + spec, and scan for conflicts once.", "The ledger progress.md (under .superpowers/sdd/<plan>/) is the record: tasks with a 'Task N: complete' line are done; after compaction trust the ledger and git log over your recollection.", "Per task: work the steps in order with TDD, run every verification and read every output, commit as the plan's commit steps say, then ledger the result and mark the todo.", "End: whole-branch review (a fresh-context reviewer if available), one fix pass for Critical/Important (RED→GREEN), delete the plan's workspace, then use finishing-a-development-branch."],
    },
    coreRules: {
      id: ["Eksekusi berkelanjutan: jangan berhenti untuk check-in di antara task; narasi maksimal satu baris pendek di antara tool call.", "Rulings, bukan stall: putuskan konflik/ambiguitas/cacat rencana (spec adalah otoritas, rencana adalah argumennya) dan catat 'Ruling: <keputusan> — <alasan> — <biaya bila salah>'; menyimpang tanpa ruling adalah keputusan rahasia.", "Hanya empat hal yang menghentikan: operasi tak dapat dibatalkan/destruktif, aksi sensitif keamanan, efek samping di luar worktree yang biasanya ditanyakan dulu (merge, push ke branch bersama, publish), dan rencana yang begitu rusak sehingga setiap jalur adalah tebakan."],
      en: ["Continuous execution: do not pause for check-ins between tasks; narrate at most one short line between tool calls.", "Rulings, not stalls: decide conflicts/ambiguities/plan defects (the spec is the authority, the plan its argument) and record 'Ruling: <decision> — <why> — <cost if wrong>'; deviating without a ledgered ruling is a decision made in secret.", "Only four things stop you: an irreversible/destructive operation, a security-sensitive action, a side effect outside the worktree that norms say you ask about first (merge, push to a shared branch, publish), and a plan so broken every path is a guess."],
    },
    tips: {
      id: ["Rencana yang spesifik penuh membuat eksekusi inline menjadi transkripsi plus pengujian, jadi cocok dijalankan di model session tingkat menengah; keunggulan model terkuat ada di review akhir.", "Workspace dan ledger dibagi dengan subagent-driven-development (format sama), sehingga executor bisa berganti di tengah jalan dan melanjutkan dari ledger yang sama."],
      en: ["A fully specified plan makes inline execution transcription plus testing, so it runs well on a mid-tier session model; the most capable model earns its cost on the final review.", "The workspace and ledger are shared with subagent-driven-development (same format), so a plan can change executors mid-flight and resume from the same ledger."],
    },
    pairsWellWith: ["writing-plans", "subagent-driven-development", "test-driven-development", "finishing-a-development-branch"],
    sourcePath: "skills/executing-plans/SKILL.md",
  },
  {
    name: "finishing-a-development-branch",
    category: "shipping",
    invocation: "model",
    description: {
      id: "Dipakai saat implementasi selesai dan semua tes lulus, untuk memutuskan cara mengintegrasikan pekerjaan: verifikasi tes, deteksi lingkungan, konfirmasi base, tawarkan opsi, eksekusi, lalu bersihkan.",
      en: "Use when implementation is complete and all tests pass, to decide how to integrate the work: verify tests, detect the environment, confirm the base, present options, execute, then clean up.",
    },
    detailedDescription: {
      id: "finishing-a-development-branch punya alur tetap: (1) verifikasi test suite penuh (merah berarti berhenti), (2) deteksi lingkungan lewat GIT_DIR vs GIT_COMMON (repo normal, worktree dengan branch, atau detached HEAD), (3) konfirmasi base branch, (4) tampilkan persis 3 opsi (merge lokal, push + buat PR, biarkan apa adanya; 2 opsi bila detached HEAD), (5) eksekusi pilihan, (6) cleanup workspace berbasis provenance. Membuang pekerjaan hanya terjadi bila partner memintanya secara eksplisit.",
      en: "finishing-a-development-branch has a fixed flow: (1) verify the full test suite (red means stop), (2) detect the environment via GIT_DIR vs GIT_COMMON (normal repo, named-branch worktree, or detached HEAD), (3) confirm the base branch, (4) present exactly 3 options (merge locally, push + create a PR, keep as-is; 2 options on a detached HEAD), (5) execute the choice, (6) provenance-based workspace cleanup. Discarding work happens only when the partner explicitly asks for it.",
    },
    useWhen: {
      id: ["Implementasi selesai, semua tes lulus, dan perlu memutuskan cara mengintegrasikan pekerjaan.", "Rencana (subagent-driven-development atau executing-plans) selesai dan review akhir bersih."],
      en: ["Implementation is complete, all tests pass, and you need to decide how to integrate the work.", "A plan run (subagent-driven-development or executing-plans) has finished and the final review is clean."],
    },
    avoidWhen: {
      id: ["Test suite masih gagal (skill berhenti dan melaporkan kegagalan sebelum menu)."],
      en: ["The test suite is still failing (the skill stops and reports failures before the menu)."],
    },
    howItWorks: {
      id: ["Jalankan test suite penuh proyek; bila gagal, laporkan dan berhenti.", "Deteksi lingkungan (GIT_DIR / GIT_COMMON / WORKTREE_PATH) dan tentukan base branch; konfirmasi bila belum jelas.", "Tampilkan persis opsi yang tersedia dan tunggu jawaban partner: merge lokal ke base, push dan buat PR, atau biarkan branch.", "Opsi 1 (merge): checkout base, pull, merge, jalankan tes pada hasil merge, lalu cleanup worktree dan hapus branch; opsi 2 dan 3 selalu mempertahankan worktree."],
      en: ["Run the project's full test suite; if it fails, report and stop.", "Detect the environment (GIT_DIR / GIT_COMMON / WORKTREE_PATH) and determine the base branch; confirm it if unclear.", "Present exactly the options available and wait for the partner's answer: merge locally into the base, push and create a PR, or keep the branch.", "Option 1 (merge): checkout base, pull, merge, run tests on the merged result, then clean up the worktree and delete the branch; options 2 and 3 always preserve the worktree."],
    },
    coreRules: {
      id: ["Menu ditampilkan persis seperti tertulis; keputusan integrasi milik partner.", "Cleanup worktree berbasis provenance: hanya worktree di .worktrees/ atau worktrees/ (dibuat Superpowers) yang dihapus; worktree yang dikelola eksternal dibiarkan. Jangan --force atas inisiatif sendiri bila penghapusan ditolak.", "Bila tes gagal pada hasil merge, berhenti dan biarkan worktree dan branch di tempat (belum ada yang di-push)."],
      en: ["The menu is presented exactly as written; the integration decision belongs to the partner.", "Worktree cleanup is provenance-based: only worktrees under .worktrees/ or worktrees/ (created by Superpowers) are removed; externally managed ones are left in place. Never --force on your own initiative if removal is refused.", "If tests fail on the merged result, stop and leave the worktree and branch in place (nothing has been pushed)."],
    },
    tips: {
      id: ["Skill ini tidak melakukan squash atau merapikan histori; merge strategy yang dipakai adalah merge lokal biasa atau PR sesuai pilihan partner.", "Pasangkan dengan using-git-worktrees: Step 6 di sini adalah sisi pembersihannya."],
      en: ["This skill does not squash or tidy history; the strategy is a plain local merge or a PR as the partner chooses.", "Pair it with using-git-worktrees: Step 6 here is the cleanup side of that skill."],
    },
    pairsWellWith: ["using-git-worktrees", "verification-before-completion", "subagent-driven-development"],
    sourcePath: "skills/finishing-a-development-branch/SKILL.md",
  },
  {
    name: "receiving-code-review",
    category: "review",
    invocation: "model",
    description: {
      id: "Dipakai saat menerima umpan balik code review, sebelum mengimplementasikan saran, terutama bila umpan balik tidak jelas atau meragukan secara teknis: butuh ketelitian dan verifikasi, bukan persetujuan performatif atau implementasi buta.",
      en: "Use when receiving code review feedback, before implementing suggestions, especially if the feedback is unclear or technically questionable: it requires technical rigor and verification, not performative agreement or blind implementation.",
    },
    detailedDescription: {
      id: "receiving-code-review memperlakukan review sebagai evaluasi teknis, bukan performa emosional. Polanya: baca seluruh umpan balik tanpa bereaksi, pahami (restate requirement dengan kata sendiri), verifikasi terhadap realitas codebase, evaluasi apakah benar untuk codebase INI, tanggapi dengan pengakuan teknis atau pushback yang beralasan, lalu implementasikan satu item pada satu waktu dengan tes tiap item. Bila ada item yang tidak jelas, berhenti dan klarifikasi SEMUA sebelum mengimplementasikan apa pun.",
      en: "receiving-code-review treats review as technical evaluation, not emotional performance. The pattern: read the complete feedback without reacting, understand (restate the requirement in your own words), verify against codebase reality, evaluate whether it is sound for THIS codebase, respond with technical acknowledgment or reasoned pushback, then implement one item at a time, testing each. If any item is unclear, stop and clarify ALL of them before implementing anything.",
    },
    useWhen: {
      id: ["Menerima umpan balik review (dari partner atau reviewer eksternal) sebelum menerapkan saran.", "Umpan balik tidak jelas, atau saran tampak keliru secara teknis."],
      en: ["Receiving review feedback (from your partner or an external reviewer) before applying suggestions.", "The feedback is unclear, or a suggestion looks technically wrong."],
    },
    avoidWhen: {
      id: ["Anda yang meminta review (gunakan requesting-code-review)."],
      en: ["You are the one requesting the review (use requesting-code-review)."],
    },
    howItWorks: {
      id: ["Baca penuh, pahami dan restate, lalu verifikasi terhadap codebase sebelum menerapkan.", "Untuk reviewer eksternal: cek apakah benar untuk codebase ini, apakah merusak fungsi lain, alasan implementasi saat ini, kompatibilitas platform/versi, dan apakah reviewer memahami konteks penuh; skeptis tetapi periksa dengan teliti.", "YAGNI check: bila reviewer menyarankan 'implementasi yang proper', grep penggunaan sebenarnya; jika tidak terpakai, usulkan menghapusnya.", "Urutan implementasi: klarifikasi dulu yang tidak jelas, lalu blocking issues (rusak, keamanan), perbaikan sederhana, lalu perbaikan kompleks; satu item pada satu waktu dengan tes."],
      en: ["Read fully, understand and restate, then verify against the codebase before applying.", "For external reviewers: check it is correct for this codebase, whether it breaks existing functionality, the reason for the current implementation, platform/version compatibility, and whether the reviewer understands the full context; be skeptical but check carefully.", "YAGNI check: if a reviewer suggests 'implementing properly', grep for actual usage; if unused, propose removing it.", "Implementation order: clarify anything unclear first, then blocking issues (breaks, security), simple fixes, then complex ones; one item at a time, testing each."],
    },
    coreRules: {
      id: ["Respons terlarang: 'You're absolutely right!', 'Great point!', 'Excellent feedback!', dan 'Let me implement that now' sebelum verifikasi. Gantikan dengan restate teknis, pertanyaan, pushback beralasan, atau langsung bekerja.", "Jika tidak bisa memverifikasi sesuatu, katakan; jika bertentangan dengan keputusan partner sebelumnya, berhenti dan diskusikan dulu.", "Saat mereply komentar review inline di GitHub, balas di thread komentar itu (bukan komentar PR tingkat atas)."],
      en: ["Forbidden responses: 'You're absolutely right!', 'Great point!', 'Excellent feedback!', and 'Let me implement that now' before verification. Instead restate the requirement, ask questions, push back with reasoning, or just start working.", "If you cannot verify something, say so; if it conflicts with the partner's prior decisions, stop and discuss first.", "When replying to inline review comments on GitHub, reply in the comment thread (not a top-level PR comment)."],
    },
    tips: {
      id: ["Aturan partner upstream: 'External feedback - be skeptical, but check carefully'; 'You and reviewer both report to me'.", "Pasangkan dengan verification-before-completion sebelum menyatakan perbaikan selesai."],
      en: ["Upstream partner rules: 'External feedback - be skeptical, but check carefully'; 'You and reviewer both report to me'.", "Pair with verification-before-completion before claiming the fixes are done."],
    },
    pairsWellWith: ["verification-before-completion", "test-driven-development", "requesting-code-review"],
    sourcePath: "skills/receiving-code-review/SKILL.md",
  },
  {
    name: "requesting-code-review",
    category: "review",
    invocation: "model",
    description: {
      id: "Dipakai saat menyelesaikan task, mengimplementasi fitur besar, atau sebelum merge: dispatch subagent code reviewer (template code-reviewer.md) untuk memverifikasi pekerjaan memenuhi kebutuhan.",
      en: "Use when completing tasks, implementing major features, or before merging: dispatch a code reviewer subagent (code-reviewer.md template) to verify the work meets requirements.",
    },
    detailedDescription: {
      id: "requesting-code-review men-dispatch subagent general-purpose dengan template code-reviewer.md, mengisi {DESCRIPTION}, {PLAN_OR_REQUIREMENTS}, {BASE_SHA}, dan {HEAD_SHA}. Reviewer mendapat konteks yang dibuat dengan presisi, tidak pernah riwayat session Anda. Wajib setelah tiap task di subagent-driven development, setelah fitur besar, dan sebelum merge ke main; opsional bila buntu, sebelum refactor, atau setelah memperbaiki bug kompleks.",
      en: "requesting-code-review dispatches a general-purpose subagent with the code-reviewer.md template, filling {DESCRIPTION}, {PLAN_OR_REQUIREMENTS}, {BASE_SHA}, and {HEAD_SHA}. The reviewer gets precisely crafted context, never your session history. It is mandatory after each task in subagent-driven development, after a major feature, and before merging to main; optional when stuck, before refactoring, or after fixing a complex bug.",
    },
    useWhen: {
      id: ["Setelah menyelesaikan task di subagent-driven development, setelah fitur besar, dan sebelum merge ke main.", "Opsional: saat buntu, sebelum refactor (baseline), atau setelah perbaikan bug kompleks."],
      en: ["After completing a task in subagent-driven development, after a major feature, and before merging to main.", "Optional: when stuck, before refactoring (baseline), or after a complex bug fix."],
    },
    avoidWhen: {
      id: ["Mereview sendiri diff secara inline sebagai pengganti reviewer subagent: skill menyebutnya rasionalisasi."],
      en: ["Reviewing the diff yourself inline instead of dispatching a reviewer subagent: the skill calls this a rationalization."],
    },
    howItWorks: {
      id: ["Ambil git SHA: BASE_SHA (mis. git merge-base origin/main HEAD) dan HEAD_SHA.", "Dispatch subagent general-purpose dengan template code-reviewer.md, mengisi DESCRIPTION, PLAN_OR_REQUIREMENTS, BASE_SHA, HEAD_SHA.", "Bertindak atas umpan balik: perbaiki isu Critical segera, isu Important sebelum lanjut, catat isu Minor untuk nanti.", "Pushback dengan alasan bila reviewer keliru."],
      en: ["Get git SHAs: BASE_SHA (e.g. git merge-base origin/main HEAD) and HEAD_SHA.", "Dispatch a general-purpose subagent with the code-reviewer.md template, filling DESCRIPTION, PLAN_OR_REQUIREMENTS, BASE_SHA, HEAD_SHA.", "Act on feedback: fix Critical issues immediately, Important issues before proceeding, note Minor issues for later.", "Push back with reasoning if the reviewer is wrong."],
    },
    coreRules: {
      id: ["Review lebih awal, review lebih sering.", "Jangan melewatkan review karena 'sederhana', jangan abaikan isu Critical, dan jangan lanjut dengan isu Important yang belum diperbaiki.", "Jangan memberi reviewer riwayat session Anda: beri konteks yang dibuat presisi supaya reviewer fokus pada hasil kerja, bukan proses berpikir Anda."],
      en: ["Review early, review often.", "Never skip review because 'it is simple', never ignore Critical issues, and never proceed with unfixed Important issues.", "Do not give the reviewer your session history: hand it precisely crafted context so it stays on the work product, not your thought process."],
    },
    tips: {
      id: ["Mereview diff sendiri secara inline membakar jendela konteks yang Anda perlukan untuk terus mengarahkan pekerjaan.", "Tidak ada pemindaian kredensial atau checklist kualitas generik di skill ini: yang dilakukan adalah dispatch reviewer."],
      en: ["Reviewing the diff inline burns the context window you need to keep driving the work.", "There is no credential scan or generic quality checklist in this skill: what it does is dispatch the reviewer."],
    },
    pairsWellWith: ["subagent-driven-development", "finishing-a-development-branch", "receiving-code-review"],
    sourcePath: "skills/requesting-code-review/SKILL.md",
  },
  {
    name: "subagent-driven-development",
    category: "architecture",
    invocation: "model",
    description: {
      id: "Eksekusi rencana dengan task independen di session ini: implementer subagent segar per task, review task (kepatuhan spec + kualitas kode) setelah tiap task, dan review luas seluruh branch di akhir.",
      en: "Execute a plan with independent tasks in this session: a fresh implementer subagent per task, a task review (spec compliance + code quality) after each, and a broad whole-branch review at the end.",
    },
    detailedDescription: {
      id: "Prinsip inti: subagent segar per task + review task (spec + kualitas) + review akhir luas = kualitas tinggi dan iterasi cepat. Subagent tidak pernah mewarisi konteks session Anda; Anda menyusun persis apa yang mereka butuhkan. Tiap rencana punya workspace git-ignored (scripts/sdd-workspace) dengan ledger progress.md yang bertahan dari kompaksi konteks, eksekusi berkelanjutan tanpa jeda di antara task, dan 'Rulings, not stalls' untuk konflik.",
      en: "Core principle: a fresh subagent per task + a task review (spec + quality) + a broad final review = high quality and fast iteration. Subagents never inherit your session context; you construct exactly what they need. Each plan owns a git-ignored workspace (scripts/sdd-workspace) with a progress.md ledger that survives context compaction, continuous execution with no pause between tasks, and 'Rulings, not stalls' for conflicts.",
    },
    useWhen: {
      id: ["Mengeksekusi rencana implementasi dengan task independen di session ini.", "Partner menginginkan gerbang review di tiap task (paling teliti)."],
      en: ["Executing an implementation plan with independent tasks in this session.", "The partner wants a review gate on every task (the most thorough option)."],
    },
    avoidWhen: {
      id: ["Memilih eksekusi inline yang lebih murah atau tidak ada tool subagent: gunakan executing-plans.", "Task yang saling bergantung erat sehingga tidak bisa dikerjakan independen."],
      en: ["You chose the cheaper inline execution or there is no subagent tool: use executing-plans.", "Tasks so tightly coupled they cannot be worked independently."],
    },
    howItWorks: {
      id: ["Setup: worktree terisolasi, workspace plan + ledger (baris pertama '# SDD ledger — plan: <file>'), baca plan dan spec, scan konflik antar-task, buat todo per task.", "Per task: dispatch implementer segar (implementer-prompt.md; implementer commit dan self-review), lalu dispatch task reviewer (task-reviewer-prompt.md: spec + kualitas) dengan review package.", "Putaran perbaikan hingga 5 kali: putaran 1-3 melanjutkan implementer asli, putaran 4-5 memakai implementer segar pada model lebih mumpuni; tiap putaran diikuti re-review bertarget.", "Setelah semua task: review seluruh branch (model paling mumpuni), hapus workspace plan, lalu gunakan finishing-a-development-branch."],
      en: ["Setup: isolated worktree, plan workspace + ledger (first line '# SDD ledger — plan: <file>'), read plan and spec, scan for conflicts between tasks, create a todo per task.", "Per task: dispatch a fresh implementer (implementer-prompt.md; the implementer commits and self-reviews), then dispatch a task reviewer (task-reviewer-prompt.md: spec + quality) with a review package.", "Up to 5 fix rounds: rounds 1-3 resume the original implementer, rounds 4-5 use a fresh implementer on a more capable model; each round is followed by a scoped re-review.", "After all tasks: a whole-branch review (most capable model), delete the plan's workspace, then use finishing-a-development-branch."],
    },
    coreRules: {
      id: ["Selalu tentukan model secara eksplisit saat dispatch (model yang dihilangkan mewarisi model session yang mahal); pakai model paling murah yang mampu untuk tiap peran, dengan model mid-tier sebagai lantai untuk reviewer.", "Eksekusi berkelanjutan: tidak ada 'Should I continue?'; hanya empat hal yang menghentikan, dan konflik diputuskan lewat Ruling yang dicatat di ledger.", "Percayai ledger dan git log setelah kompaksi: controller yang kehilangan tempat pernah men-dispatch ulang seluruh urutan task (kegagalan termahal yang teramati)."],
      en: ["Always specify the model explicitly when dispatching (an omitted model inherits your expensive session model); use the least powerful capable model per role, with a mid-tier floor for reviewers.", "Continuous execution: no 'Should I continue?'; only four things stop you, and conflicts are decided through a Ruling recorded in the ledger.", "Trust the ledger and git log after compaction: controllers that lost their place have re-dispatched entire completed task sequences (the most expensive failure observed)."],
    },
    tips: {
      id: ["Gabungkan task kecil berbentuk sama (mis. perubahan satu baris yang sama di banyak file) alih-alih men-dispatch satu per satu.", "Workspace dan ledger dibagi dengan executing-plans sehingga executor dapat berganti di tengah rencana."],
      en: ["Batch small same-shape tasks (e.g. the same one-line change across files) instead of dispatching one by one.", "The workspace and ledger are shared with executing-plans, so a plan can change executors mid-flight."],
    },
    pairsWellWith: ["writing-plans", "using-git-worktrees", "requesting-code-review", "finishing-a-development-branch", "executing-plans"],
    sourcePath: "skills/subagent-driven-development/SKILL.md",
  },
  {
    name: "systematic-debugging",
    category: "engineering",
    invocation: "model",
    description: {
      id: "Dipakai saat menemui bug, kegagalan tes, atau perilaku tak terduga, sebelum mengusulkan perbaikan: proses empat fase dengan Iron Law 'tidak ada perbaikan tanpa investigasi akar masalah terlebih dahulu'.",
      en: "Use when encountering any bug, test failure, or unexpected behavior, before proposing fixes: a four-phase process with the Iron Law 'no fixes without root cause investigation first'.",
    },
    detailedDescription: {
      id: "systematic-debugging mewajibkan menemukan akar masalah sebelum mencoba perbaikan; perbaikan gejala adalah kegagalan. Empat fase: 1 Root Cause Investigation (baca error, reproduksi, cek perubahan terbaru, instrumentasi batas multi-komponen), 2 Pattern Analysis, 3 Hypothesis and Testing (metode ilmiah), 4 Implementation (buat tes gagal, satu perbaikan, verifikasi). Bila 3+ perbaikan gagal, pertanyakan arsitektur. Berlaku untuk semua masalah teknis, termasuk yang tampak sederhana atau saat terburu-buru.",
      en: "systematic-debugging requires finding the root cause before attempting fixes; symptom fixes are failure. Four phases: 1 Root Cause Investigation (read errors, reproduce, check recent changes, instrument multi-component boundaries), 2 Pattern Analysis, 3 Hypothesis and Testing (scientific method), 4 Implementation (create a failing test, a single fix, verify). If 3+ fixes fail, question the architecture. It applies to any technical issue, including ones that look simple or when in a hurry.",
    },
    useWhen: {
      id: ["Test gagal, bug produksi, perilaku tak terduga, masalah performa, build gagal, atau masalah integrasi.", "Terutama saat di bawah tekanan waktu, 'satu perbaikan cepat' terasa jelas, atau perbaikan sebelumnya tidak berhasil."],
      en: ["Test failures, production bugs, unexpected behavior, performance problems, build failures, or integration issues.", "Especially under time pressure, when 'one quick fix' seems obvious, or when a previous fix did not work."],
    },
    avoidWhen: {
      id: ["Tidak ada: skill ini justru berlaku saat masalah tampak sederhana ('simple bugs have root causes too')."],
      en: ["None: the skill applies even when the issue seems simple ('simple bugs have root causes too')."],
    },
    howItWorks: {
      id: ["Fase 1, investigasi akar masalah: baca pesan error dengan teliti, reproduksi konsisten, cek perubahan terbaru, dan pada sistem multi-komponen instrumentasi tiap batas untuk menemukan di mana ia rusak.", "Fase 2, analisis pola: temukan pola yang bekerja dan bandingkan dengan yang rusak.", "Fase 3, hipotesis dan pengujian: satu hipotesis pada satu waktu, uji dengan perubahan sekecil mungkin.", "Fase 4, implementasi: buat tes gagal yang mereproduksi bug, terapkan satu perbaikan pada akar masalah, verifikasi."],
      en: ["Phase 1, root cause investigation: read error messages carefully, reproduce consistently, check recent changes, and in multi-component systems instrument each boundary to find where it breaks.", "Phase 2, pattern analysis: find working examples and compare them against the broken one.", "Phase 3, hypothesis and testing: one hypothesis at a time, tested with the smallest possible change.", "Phase 4, implementation: create a failing test that reproduces the bug, apply a single fix at the root cause, verify."],
    },
    coreRules: {
      id: ["Iron Law: tidak ada perbaikan tanpa investigasi akar masalah terlebih dahulu; bila Fase 1 belum selesai, jangan usulkan perbaikan.", "Tes gagal dibuat di Fase 4, setelah akar masalah ditemukan, bukan sebelum investigasi.", "Bila 3+ perbaikan gagal, berhenti dan pertanyakan arsitektur (Phase 4.5) alih-alih mencoba perbaikan keempat."],
      en: ["Iron Law: no fixes without root cause investigation first; if Phase 1 is not complete, you cannot propose fixes.", "The failing test is created in Phase 4, after the root cause is found, not before the investigation.", "If 3+ fixes fail, stop and question the architecture (Phase 4.5) instead of attempting a fourth fix."],
    },
    tips: {
      id: ["Teknik pendukung di direktori skill: root-cause-tracing (telusuri ke belakang lewat call stack), defense-in-depth (validasi di banyak lapis), condition-based-waiting (ganti timeout arbitrer dengan polling kondisi).", "Gunakan verification-before-completion dan test-driven-development saat memverifikasi dan menulis tes perbaikan."],
      en: ["Supporting techniques in the skill directory: root-cause-tracing (trace backward through the call stack), defense-in-depth (validate at multiple layers), condition-based-waiting (replace arbitrary timeouts with condition polling).", "Use verification-before-completion and test-driven-development when verifying and writing the fix's test."],
    },
    pairsWellWith: ["verification-before-completion", "test-driven-development"],
    sourcePath: "skills/systematic-debugging/SKILL.md",
  },
  {
    name: "test-driven-development",
    category: "engineering",
    invocation: "model",
    description: {
      id: "Dipakai saat mengimplementasi fitur atau perbaikan bug apa pun, sebelum menulis kode implementasi: siklus RED-GREEN-REFACTOR dengan Iron Law 'tidak ada kode produksi tanpa tes gagal terlebih dahulu'.",
      en: "Use when implementing any feature or bugfix, before writing implementation code: the RED-GREEN-REFACTOR cycle with the Iron Law 'no production code without a failing test first'.",
    },
    detailedDescription: {
      id: "test-driven-development: tulis tes gagal (RED), lihat ia gagal (wajib, tidak pernah dilewati), tulis kode minimal (GREEN), lihat ia lulus (wajib; 'tes lain' berarti seluruh suite proyek, bukan hanya file Anda), lalu refactor. Prinsip inti: bila Anda tidak melihat tes gagal, Anda tidak tahu apakah ia menguji hal yang benar. Menulis kode sebelum tes? Hapus, mulai ulang; tidak ada pengecualian seperti 'simpan sebagai referensi'.",
      en: "test-driven-development: write a failing test (RED), watch it fail (mandatory, never skipped), write minimal code (GREEN), watch it pass (mandatory; 'other tests' means the project's whole suite, not just your file), then refactor. Core principle: if you did not watch the test fail, you do not know it tests the right thing. Wrote code before the test? Delete it and start over; no exceptions such as 'keep it as reference'.",
    },
    useWhen: {
      id: ["Selalu: fitur baru, perbaikan bug, refactoring, dan perubahan perilaku.", "Pengecualian hanya dengan persetujuan partner: prototipe sekali pakai, kode hasil generate, file konfigurasi."],
      en: ["Always: new features, bug fixes, refactoring, and behavior changes.", "Exceptions only with the partner's approval: throwaway prototypes, generated code, configuration files."],
    },
    avoidWhen: {
      id: ["Prototipe sekali pakai, kode hasil generate, atau file konfigurasi (hanya setelah bertanya pada partner)."],
      en: ["Throwaway prototypes, generated code, or configuration files (only after asking the partner)."],
    },
    howItWorks: {
      id: ["RED: tulis satu tes minimal yang menjelaskan perilaku yang diinginkan.", "Verify RED: jalankan dan lihat gagal dengan benar; jika lulus berarti Anda menguji perilaku yang sudah ada, jika error perbaiki errornya dulu.", "GREEN: tulis kode paling sederhana untuk meluluskan tes; Verify GREEN: pastikan tes ini dan seluruh suite proyek lulus.", "REFACTOR: bersihkan tanpa mengubah perilaku, lalu ulangi untuk perilaku berikutnya."],
      en: ["RED: write one minimal test describing the desired behavior.", "Verify RED: run it and watch it fail correctly; if it passes you are testing existing behavior, if it errors fix the error first.", "GREEN: write the simplest code that passes; Verify GREEN: confirm this test and the project's whole suite pass.", "REFACTOR: clean up without changing behavior, then repeat for the next behavior."],
    },
    coreRules: {
      id: ["Tidak ada kode produksi tanpa tes gagal terlebih dahulu.", "Menulis kode sebelum tes berarti hapus kodenya (jangan simpan sebagai referensi, jangan 'adaptasi', jangan lihat) dan mulai dari tes.", "Pengecualian hanya dengan izin partner; pikiran 'lewati TDD sekali ini saja' adalah rasionalisasi."],
      en: ["No production code without a failing test first.", "Wrote code before the test? Delete it (do not keep it as reference, do not 'adapt' it, do not look at it) and start from the test.", "Exceptions only with the partner's permission; thinking 'skip TDD just this once' is rationalization."],
    },
    tips: {
      id: ["Referensi pendamping writing-good-tests.md mencakup anti-pattern pengujian.", "Bila macet pada bug, gabungkan dengan systematic-debugging: tes gagal untuk bug dibuat setelah akar masalah ditemukan."],
      en: ["The companion writing-good-tests.md reference covers testing anti-patterns.", "When stuck on a bug, combine with systematic-debugging: the failing test for the bug comes after the root cause is found."],
    },
    pairsWellWith: ["systematic-debugging", "verification-before-completion"],
    sourcePath: "skills/test-driven-development/SKILL.md",
  },
  {
    name: "using-git-worktrees",
    category: "engineering",
    invocation: "model",
    description: {
      id: "Dipakai saat memulai pekerjaan fitur yang butuh isolasi dari workspace saat ini atau sebelum mengeksekusi rencana: memastikan workspace terisolasi ada lewat tool native, dengan fallback git worktree.",
      en: "Use when starting feature work that needs isolation from the current workspace or before executing plans: ensures an isolated workspace exists via native tools, with a git worktree fallback.",
    },
    detailedDescription: {
      id: "using-git-worktrees: deteksi isolasi yang ada dulu, lalu tool native, baru fallback git; jangan melawan harness. Step 0 mendeteksi apakah Anda sudah di worktree (GIT_DIR != GIT_COMMON, dengan submodule guard) sehingga tidak membuat yang kedua. Bila belum dan partner belum menyatakan preferensi, minta persetujuan sebelum membuat worktree. Step 1a memakai tool native (EnterWorktree, /worktree, flag --worktree); Step 1b fallback ke git worktree add.",
      en: "using-git-worktrees: detect existing isolation first, then native tools, then git fallback; never fight the harness. Step 0 detects whether you are already in a worktree (GIT_DIR != GIT_COMMON, with a submodule guard) so you do not create a second one. If not, and the partner has not declared a preference, ask consent before creating a worktree. Step 1a uses native tools (EnterWorktree, /worktree, a --worktree flag); Step 1b falls back to git worktree add.",
    },
    useWhen: {
      id: ["Memulai pekerjaan fitur yang butuh isolasi dari workspace saat ini.", "Sebelum mengeksekusi rencana implementasi (executing-plans, subagent-driven-development)."],
      en: ["Starting feature work that needs isolation from the current workspace.", "Before executing implementation plans (executing-plans, subagent-driven-development)."],
    },
    avoidWhen: {
      id: ["Sudah berada di linked worktree (jangan membuat yang lain), atau partner menolak persetujuan (kerjakan di tempat)."],
      en: ["You are already in a linked worktree (do not create another), or the partner declined consent (work in place)."],
    },
    howItWorks: {
      id: ["Step 0: deteksi isolasi yang ada (GIT_DIR vs GIT_COMMON, submodule guard); bila ada, lanjut ke Step 2 tanpa worktree baru. Bila tidak, minta persetujuan kecuali preferensi sudah dinyatakan.", "Step 1a: pakai tool native bila ada; Step 1b fallback git: prioritas direktori = preferensi user → .worktrees/ atau worktrees/ yang ada → default .worktrees/.", "Verifikasi direktori lokal-proyek ter-ignore (git check-ignore); bila belum, tambahkan ke .gitignore dan commit sebelum git worktree add <path> -b <branch>.", "Step 2: deteksi dan jalankan setup proyek otomatis (npm install, cargo build, pip/poetry, go mod); Step 3: verifikasi baseline tes bersih."],
      en: ["Step 0: detect existing isolation (GIT_DIR vs GIT_COMMON, submodule guard); if present, skip to Step 2 without a new worktree. If not, ask consent unless a preference is declared.", "Step 1a: use a native tool if available; Step 1b git fallback: directory priority = user preference → existing .worktrees/ or worktrees/ → default .worktrees/.", "Verify a project-local directory is git-ignored (git check-ignore); if not, add it to .gitignore and commit before git worktree add <path> -b <branch>.", "Step 2: auto-detect and run project setup (npm install, cargo build, pip/poetry, go mod); Step 3: verify a clean test baseline."],
    },
    coreRules: {
      id: ["Jangan menggunakan git worktree add bila Anda punya tool native: itu menciptakan state hantu yang tidak dapat dilihat harness.", "Wajib verifikasi direktori worktree lokal-proyek di-ignore sebelum membuatnya, agar isinya tidak ikut ter-commit.", "Bila sandbox menolak git worktree add, katakan pada user dan lanjut bekerja di direktori saat ini."],
      en: ["Do not use git worktree add when you have a native tool: it creates phantom state your harness cannot see.", "MUST verify a project-local worktree directory is ignored before creating it, so its contents do not get committed.", "If the sandbox denies git worktree add, tell the user and continue working in the current directory."],
    },
    tips: {
      id: ["Cleanup tidak ada di skill ini: ia ada di finishing-a-development-branch (Step 6).", "Preferensi worktree yang sudah dinyatakan dihormati tanpa bertanya lagi."],
      en: ["Cleanup is not in this skill: it lives in finishing-a-development-branch (Step 6).", "An already declared worktree preference is honored without asking again."],
    },
    pairsWellWith: ["finishing-a-development-branch", "executing-plans", "subagent-driven-development"],
    sourcePath: "skills/using-git-worktrees/SKILL.md",
  },
  {
    name: "using-superpowers",
    category: "architecture",
    invocation: "model",
    description: {
      id: "Dipakai saat memulai percakapan apa pun: menetapkan cara menemukan dan memakai skill, mewajibkan pemanggilan skill SEBELUM respons apa pun termasuk pertanyaan klarifikasi.",
      en: "Use when starting any conversation: establishes how to find and use skills, requiring skill invocation before ANY response, including clarifying questions.",
    },
    detailedDescription: {
      id: "using-superpowers adalah bootstrap wajib yang disuntikkan lewat hook SessionStart plugin di tiap harness. Aturannya: bila ada kemungkinan 1% sebuah skill berlaku, WAJIB memanggilnya sebelum respons atau tindakan apa pun, termasuk pertanyaan klarifikasi dan eksplorasi codebase; lalu umumkan 'Using [skill] to [purpose]' dan ikuti skill tepat sesuai tertulis. Subagent yang di-dispatch untuk tugas spesifik mengabaikan skill ini (<SUBAGENT-STOP>). Instruksi user (CLAUDE.md, AGENTS.md, GEMINI.md, permintaan langsung) selalu didahulukan atas skill.",
      en: "using-superpowers is the mandatory bootstrap injected through the plugin's SessionStart hook on each harness. The rule: if there is even a 1% chance a skill applies, you MUST invoke it before any response or action, including clarifying questions and codebase exploration; then announce 'Using [skill] to [purpose]' and follow it exactly. A subagent dispatched for a specific task ignores this skill (<SUBAGENT-STOP>). User instructions (CLAUDE.md, AGENTS.md, GEMINI.md, direct requests) always take precedence over skills.",
    },
    useWhen: {
      id: ["Awal setiap percakapan, sebelum respons apa pun.", "Kapan pun muncul pikiran 'ini cuma pertanyaan sederhana' atau 'saya perlu konteks dulu' (itu red flag di tabel rasionalisasi skill)."],
      en: ["At the start of every conversation, before any response.", "Whenever the thought 'this is just a simple question' or 'I need more context first' appears (these are red flags in the skill's rationalization table)."],
    },
    avoidWhen: {
      id: ["Anda adalah subagent yang di-dispatch untuk mengeksekusi tugas spesifik (<SUBAGENT-STOP>).", "Partner secara eksplisit menyuruh melewati workflow skill (instruksi user lebih tinggi)."],
      en: ["You are a subagent dispatched to execute a specific task (<SUBAGENT-STOP>).", "The partner has explicitly told you to skip skill workflows (user instructions rank higher)."],
    },
    howItWorks: {
      id: ["Aturan: panggil skill yang relevan atau diminta SEBELUM respons atau tindakan apa pun (termasuk pertanyaan klarifikasi, eksplorasi codebase, cek file); bila ternyata salah, tidak perlu dipakai.", "Sebelum masuk plan mode, jalankan brainstorming bila belum; umumkan 'Using [skill] to [purpose]'; bila skill punya checklist, buat todo per item.", "Prioritas: skill proses dulu (brainstorming, systematic-debugging), baru skill implementasi: 'Let's build X' → brainstorming; 'Fix this bug' → systematic-debugging.", "Adaptasi platform: baca file referensi harness Anda di references/ (claude-code-tools, codex-tools, pi-tools, antigravity-tools, hermes-tools, muse-tools, gemini-tools)."],
      en: ["The rule: invoke relevant or requested skills BEFORE any response or action (including clarifying questions, codebase exploration, file checks); if it turns out wrong, you need not use it.", "Before entering plan mode, run brainstorming if you have not; announce 'Using [skill] to [purpose]'; if the skill has a checklist, create a todo per item.", "Priority: process skills first (brainstorming, systematic-debugging), then implementation skills: 'Let's build X' → brainstorming; 'Fix this bug' → systematic-debugging.", "Platform adaptation: read your harness's reference file in references/ (claude-code-tools, codex-tools, pi-tools, antigravity-tools, hermes-tools, muse-tools, gemini-tools)."],
    },
    coreRules: {
      id: ["Bila ada kemungkinan 1% sebuah skill berlaku, WAJIB memanggilnya; ini tidak bisa ditawar.", "Tabel Red Flags menolak rasionalisasi seperti 'ini cuma pertanyaan sederhana', 'saya perlu konteks dulu', 'saya ingat skill ini' (skill berevolusi: baca versi terkini).", "Instruksi user (CLAUDE.md, AGENTS.md, permintaan langsung) mengalahkan skill, yang mengalahkan perilaku default."],
      en: ["If there is a 1% chance a skill applies, you MUST invoke it; this is not negotiable.", "The Red Flags table rejects rationalizations like 'this is just a simple question', 'I need more context first', 'I remember this skill' (skills evolve: read the current version).", "User instructions (CLAUDE.md, AGENTS.md, direct requests) override skills, which override default behavior."],
    },
    tips: {
      id: ["Skill ini otomatis aktif lewat bootstrap plugin; menyalin hanya file SKILL.md tanpa plugin berarti bootstrap tidak ikut dan auto-trigger tidak berjalan.", "Di Hermes tidak ada hook pasca-kompaksi: session panjang yang terkompaksi bisa kehilangan bootstrap; mulai session baru bila skill berhenti terpicu."],
      en: ["This skill activates automatically through the plugin bootstrap; copying only the SKILL.md files without the plugin leaves out the bootstrap, so auto-triggering will not work.", "Hermes has no post-compaction hook: a long session that compacts can lose the bootstrap; start a fresh session if skills stop triggering."],
    },
    pairsWellWith: ["brainstorming", "systematic-debugging", "writing-skills"],
    sourcePath: "skills/using-superpowers/SKILL.md",
  },
  {
    name: "verification-before-completion",
    category: "shipping",
    invocation: "model",
    description: {
      id: "Dipakai sebelum menyatakan pekerjaan selesai, diperbaiki, atau lulus, dan sebelum commit atau membuat PR: wajib menjalankan perintah verifikasi dan mengonfirmasi output sebelum klaim sukses; bukti sebelum asersi.",
      en: "Use when about to claim work is complete, fixed, or passing, before committing or creating PRs: requires running verification commands and confirming output before any success claim; evidence before assertions, always.",
    },
    detailedDescription: {
      id: "verification-before-completion memiliki Iron Law: tidak ada klaim selesai tanpa bukti verifikasi yang segar. Gate function: IDENTIFY perintah yang membuktikan klaim, RUN perintah penuhnya (segar), READ seluruh output dan exit code, VERIFY apakah output mengonfirmasi klaim, baru ONLY THEN buat klaim dengan bukti. Melewati langkah mana pun berarti berbohong, bukan memverifikasi.",
      en: "verification-before-completion has an Iron Law: no completion claims without fresh verification evidence. The gate function: IDENTIFY the command that proves the claim, RUN the full command (fresh), READ the full output and exit code, VERIFY whether the output confirms the claim, and ONLY THEN make the claim with evidence. Skipping any step is lying, not verifying.",
    },
    useWhen: {
      id: ["Sebelum menyatakan pekerjaan selesai, diperbaiki, atau lulus.", "Sebelum commit, push, atau membuat PR."],
      en: ["Before claiming work is complete, fixed, or passing.", "Before committing, pushing, or creating a PR."],
    },
    avoidWhen: {
      id: ["Tidak ada: 'just this once' dan 'confident' bukan pengecualian."],
      en: ["None: 'just this once' and 'I'm confident' are not exceptions."],
    },
    howItWorks: {
      id: ["Identifikasi perintah yang membuktikan klaim (tes: output 0 failures; linter: 0 errors; build: exit 0).", "Jalankan perintah penuh dan segar, baca seluruh output dan exit code, hitung kegagalan.", "Bila output tidak mengonfirmasi, nyatakan status sebenarnya dengan bukti; bila ya, nyatakan klaim BERSAMA buktinya.", "Tes regresi TDD harus melalui red-green: tulis → jalankan (lulus) → kembalikan perbaikan → jalankan (HARUS gagal) → pulihkan → jalankan (lulus)."],
      en: ["Identify the command that proves the claim (tests: output 0 failures; linter: 0 errors; build: exit 0).", "Run the full command fresh, read the whole output and exit code, count failures.", "If the output does not confirm, state the actual status with evidence; if it does, state the claim WITH the evidence.", "A TDD regression test must go through red-green: write → run (pass) → revert the fix → run (MUST FAIL) → restore → run (pass)."],
    },
    coreRules: {
      id: ["Tidak ada klaim selesai tanpa bukti verifikasi segar; jika Anda belum menjalankan perintah verifikasi di pesan ini, Anda tidak boleh mengklaim lulus.", "Kata 'should', 'probably', 'seems to' dan ekspresi puas sebelum verifikasi ('Great!', 'Perfect!', 'Done!') adalah red flag.", "Jangan memercayai laporan sukses agent: periksa diff VCS secara independen."],
      en: ["No completion claims without fresh verification evidence; if you have not run the verification command in this message, you cannot claim it passes.", "'Should', 'probably', 'seems to' and expressing satisfaction before verification ('Great!', 'Perfect!', 'Done!') are red flags.", "Do not trust agent success reports: check the VCS diff independently."],
    },
    tips: {
      id: ["Tabel 'Common Failures' menunjukkan apa yang cukup untuk tiap klaim: linter lulus bukan bukti build berhasil; kode berubah bukan bukti bug diperbaiki; tes lulus bukan bukti requirement terpenuhi (butuh checklist baris demi baris).", "Dipakai oleh systematic-debugging dan di akhir sebelum finishing-a-development-branch."],
      en: ["The 'Common Failures' table shows what suffices per claim: a passing linter is not proof the build works; a code change is not proof the bug is fixed; passing tests are not proof requirements are met (needs a line-by-line checklist).", "Used by systematic-debugging and at the end before finishing-a-development-branch."],
    },
    pairsWellWith: ["systematic-debugging", "test-driven-development", "finishing-a-development-branch"],
    sourcePath: "skills/verification-before-completion/SKILL.md",
  },
  {
    name: "writing-plans",
    category: "architecture",
    invocation: "model",
    description: {
      id: "Dipakai saat Anda punya spec atau requirement untuk tugas multi-langkah, sebelum menyentuh kode: menulis rencana implementasi untuk engineer yang belum pernah melihat codebase atau spec ini.",
      en: "Use when you have a spec or requirements for a multi-step task, before touching code: write an implementation plan for an engineer who has not seen this codebase or spec.",
    },
    detailedDescription: {
      id: "writing-plans menulis rencana untuk engineer yang belum melihat codebase maupun spec-nya. Rencana disimpan di docs/superpowers/plans/YYYY-MM-DD-<feature-name>.md (preferensi user menimpa default). Skill memetakan struktur file, menentukan ukuran task yang tepat (unit terkecil yang punya siklus tes sendiri dan layak digerbang reviewer segar), dan memecah tiap task menjadi langkah satu-aksi yang punya hasil terperiksa (tulis tes gagal, jalankan, implementasi minimal, jalankan, commit).",
      en: "writing-plans writes the plan for an engineer who has seen neither the codebase nor the spec. Plans are saved to docs/superpowers/plans/YYYY-MM-DD-<feature-name>.md (user preferences override the default). The skill maps the file structure, sizes tasks right (the smallest unit that carries its own test cycle and is worth a fresh reviewer's gate), and breaks each task into one-action steps with a checkable result (write the failing test, run it, implement minimally, run it, commit).",
    },
    useWhen: {
      id: ["Anda punya spec atau requirement untuk tugas multi-langkah, sebelum menyentuh kode.", "Brainstorming (jalur Architectural) selesai dan spec tertulis telah disetujui."],
      en: ["You have a spec or requirements for a multi-step task, before touching code.", "Brainstorming (Architectural path) is done and the written spec has been approved."],
    },
    avoidWhen: {
      id: ["Spec mencakup banyak subsistem independen: sarankan memecahnya menjadi rencana terpisah, satu per subsistem."],
      en: ["The spec covers multiple independent subsystems: suggest splitting into separate plans, one per subsystem."],
    },
    howItWorks: {
      id: ["Scope check, lalu peta struktur file (tiap file satu tanggung jawab) sebelum mendefinisikan task.", "Header wajib: Goal, Architecture, Tech Stack, Spec, Global Constraints, dan Review Focus, dengan sub-skill wajib (subagent-driven-development atau executing-plans) di bagian atas.", "Tiap task: daftar file (Create/Modify/Test), blok Interfaces (Consumes/Produces dengan tanda tangan persis), dan langkah checkbox satu-aksi.", "Setelah menyimpan rencana, tawarkan pilihan eksekusi: subagent-driven-development (direkomendasikan) atau executing-plans (inline)."],
      en: ["Scope check, then map the file structure (each file one responsibility) before defining tasks.", "Required header: Goal, Architecture, Tech Stack, Spec, Global Constraints, and Review Focus, with the required sub-skill (subagent-driven-development or executing-plans) at the top.", "Each task: a file list (Create/Modify/Test), an Interfaces block (Consumes/Produces with exact signatures), and one-action checkbox steps.", "After saving the plan, offer the execution choice: subagent-driven-development (recommended) or executing-plans (inline)."],
    },
    coreRules: {
      id: ["Setiap langkah adalah satu aksi dengan hasil yang bisa diperiksa; README upstream menyebut task 'bite-sized (2-5 menit)', bukan batas jumlah file.", "Task right-sizing: gabungkan setup/konfigurasi/scaffolding/dokumentasi ke task yang butuh; pecah hanya bila reviewer bisa masuk akal menolak satu task sambil menyetujui tetangganya.", "Tiap task diakhiri deliverable yang bisa diuji sendiri."],
      en: ["Each step is one action with a checkable result; the upstream README describes tasks as 'bite-sized (2-5 minutes each)', not a file-count limit.", "Task right-sizing: fold setup/configuration/scaffolding/docs into the task whose deliverable needs them; split only where a reviewer could meaningfully reject one task while approving its neighbor.", "Each task ends with an independently testable deliverable."],
    },
    tips: {
      id: ["Interfaces (Consumes/Produces) memberi implementer yang hanya melihat task-nya sendiri nama dan tipe yang dipakai task tetangga.", "Review Focus mendaftar input atau mode kegagalan yang diimplikasikan spec tetapi tidak diuji task mana pun, lalu tiap baris dipasangkan dengan tes di task pemiliknya."],
      en: ["Interfaces (Consumes/Produces) tell an implementer who only sees its own task the names and types neighboring tasks use.", "Review Focus lists inputs or failure modes the spec implies but no task tests, then each line is paired with a test in the task that owns the code."],
    },
    pairsWellWith: ["brainstorming", "subagent-driven-development", "executing-plans"],
    sourcePath: "skills/writing-plans/SKILL.md",
  },
  {
    name: "writing-skills",
    category: "architecture",
    invocation: "model",
    description: {
      id: "Dipakai saat membuat skill baru, mengedit skill yang ada, atau memverifikasi skill berfungsi sebelum deployment: TDD yang diterapkan pada dokumentasi proses.",
      en: "Use when creating new skills, editing existing skills, or verifying skills work before deployment: TDD applied to process documentation.",
    },
    detailedDescription: {
      id: "writing-skills adalah Test-Driven Development yang diterapkan pada dokumentasi proses. Tes adalah skenario tekanan dengan subagent; skill adalah kodenya. Jalankan skenario baseline TANPA skill dan catat rasionalisasi persis yang dipakai agent (RED), tulis skill yang menjawab pelanggaran itu (GREEN), lalu tutup celah baru yang ditemukan (REFACTOR). Prinsip inti: bila Anda tidak melihat agent gagal tanpa skill, Anda tidak tahu apakah skill mengajarkan hal yang benar.",
      en: "writing-skills is Test-Driven Development applied to process documentation. The test is a pressure scenario with subagents; the skill is the code. Run a baseline scenario WITHOUT the skill and record the exact rationalizations the agent uses (RED), write a skill that addresses those violations (GREEN), then close any new loopholes found (REFACTOR). Core principle: if you did not watch an agent fail without the skill, you do not know the skill teaches the right thing.",
    },
    useWhen: {
      id: ["Membuat skill baru, mengedit skill yang ada, atau memverifikasi skill berfungsi sebelum deployment."],
      en: ["Creating a new skill, editing an existing one, or verifying a skill works before deployment."],
    },
    avoidWhen: {
      id: ["Solusi satu kali atau praktik yang sudah terdokumentasi di tempat lain; dan upstream tidak umumnya menerima kontribusi skill baru (lihat README bagian Contributing)."],
      en: ["One-off solutions or practices already documented elsewhere; and upstream does not generally accept contributions of new skills (see the README Contributing section)."],
    },
    howItWorks: {
      id: ["RED: jalankan skenario tekanan dengan subagent tanpa skill dan dokumentasikan rasionalisasi persis yang dipakai agent.", "GREEN: tulis skill minimal yang menjawab pelanggaran spesifik itu dan verifikasi agent kini patuh.", "REFACTOR: temukan rasionalisasi baru, tutup celahnya, verifikasi ulang.", "Struktur: frontmatter name (huruf, angka, tanda hubung) dan description (maks. 1024 karakter total, mulai dengan 'Use when', hanya kondisi pemicu, bukan ringkasan workflow), lalu Overview, When to Use, Core Pattern, Quick Reference, Implementation, Common Mistakes."],
      en: ["RED: run pressure scenarios with subagents without the skill and document the exact rationalizations the agent uses.", "GREEN: write a minimal skill addressing those specific violations and verify the agent now complies.", "REFACTOR: find new rationalizations, plug them, re-verify.", "Structure: frontmatter name (letters, numbers, hyphens) and description (max 1024 characters total, starts with 'Use when', triggering conditions only, not a workflow summary), then Overview, When to Use, Core Pattern, Quick Reference, Implementation, Common Mistakes."],
    },
    coreRules: {
      id: ["Anda harus memahami test-driven-development dulu: skill ini mengadaptasi siklus RED-GREEN-REFACTOR untuk dokumen.", "Description hanya berisi kondisi pemicu: ringkasan workflow di description membuat agent mengikutinya alih-alih membaca skill.", "Efisiensi token: skill getting-started <150 kata, skill lain yang sering dimuat <500 kata."],
      en: ["You must understand test-driven-development first: this skill adapts the RED-GREEN-REFACTOR cycle to documents.", "The description holds triggering conditions only: a workflow summary in the description makes agents follow it instead of reading the skill.", "Token efficiency: getting-started skills <150 words, other frequently loaded skills <500 words."],
    },
    tips: {
      id: ["Panggil skrip bawaan lewat interpreter di prosa (bash scripts/tool.sh, node scripts/tool.js), bukan path telanjang: packager plugin tertentu menghapus bit eksekusi.", "Panduan resmi Anthropic ada di anthropic-best-practices.md; persuasion-principles.md dan testing-skills-with-subagents.md melengkapinya."],
      en: ["Invoke bundled scripts through their interpreter in the prose (bash scripts/tool.sh, node scripts/tool.js), never by bare path: some plugin packagers strip executable bits.", "Anthropic's official guidance lives in anthropic-best-practices.md; persuasion-principles.md and testing-skills-with-subagents.md complement it."],
    },
    pairsWellWith: ["test-driven-development", "systematic-debugging", "using-superpowers"],
    sourcePath: "skills/writing-skills/SKILL.md",
  },
]
