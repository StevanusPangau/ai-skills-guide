// Brooklyn — OutThisLife/brooklyn-skills.
// Disinkronkan dengan upstream HEAD 3649573 (2026-10-01, MIT, 22 skill + defaults.md)
// pada 2026-10-04. Konten tiap skill diturunkan dari SKILL.md upstream; label
// `invocation` adalah konvensi guide ini (frontmatter upstream tidak memakai
// disable-model-invocation).
import type { BilingualString, BilingualList } from '@/types/skill'

export const BROOKLYN_SOURCE_REPO = 'github.com/OutThisLife/brooklyn-skills'
export const BROOKLYN_SOURCE_SHA = '364957320b9b7f61fa26ce17cecc913a603863a5'
export const SOURCE_REPO = BROOKLYN_SOURCE_REPO
export const SOURCE_SHA = BROOKLYN_SOURCE_SHA

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

export const brooklynSkills: RichSkill[] = [
  {
    name: "audit-only",
    category: "review",
    invocation: "user",
    description: {
      id: "Mode investigasi baca-saja: jawab dan laporkan temuan dulu, jangan ubah kode sampai user bilang go.",
      en: "Read-only investigation mode: answer and report findings first, change no code until told to go.",
    },
    detailedDescription: {
      id: "audit-only dipakai saat user bilang audit, investigate, 'don't touch code', atau sekadar mengajukan pertanyaan. Agent membaca kode/data yang relevan, menjawab pertanyaan sebenarnya, melaporkan temuan beserta opsi dan rekomendasi, lalu menunggu go sebelum mengubah apa pun. Temuan boleh diposting sebagai komentar PR/issue; itu belum dianggap edit kode.",
      en: "audit-only applies when the user says audit, investigate, 'don't touch code', or simply asks a plain question. The agent reads the relevant code/data, answers the actual question, reports findings with options and a recommendation, and waits for a go before changing anything. Findings may be posted as a PR/issue comment; that still is not a code edit.",
    },
    useWhen: {
      id: ["User meminta audit atau investigasi tanpa perubahan kode.", "User mengajukan pertanyaan biasa tentang codebase.", "Ada perubahan yang tampak perlu, tetapi user belum memberi izin untuk melakukannya."],
      en: ["The user asks for an audit or investigation with no code changes.", "The user asks a plain question about the codebase.", "A change looks warranted but the user has not authorized it yet."],
    },
    avoidWhen: {
      id: ["User sudah menyuruh mengimplementasikan atau memperbaiki sesuatu (go sudah diberikan)."],
      en: ["The user has already told you to implement or fix something (the go has been given)."],
    },
    howItWorks: {
      id: ["Baca kode/data yang relevan dan jawab pertanyaan yang benar-benar diajukan.", "Laporkan temuan: apa yang ada, apa yang salah, opsi, dan satu rekomendasi.", "Jika perubahan memang diperlukan, deskripsikan dulu lalu tunggu go.", "Jika diminta, posting temuan sebagai komentar PR/issue."],
      en: ["Read the relevant code/data and answer the question actually asked.", "Report findings: what is there, what is wrong, options, and one recommendation.", "If a change is warranted, describe it and wait for a go.", "If asked, post the findings as a PR/issue comment."],
    },
    coreRules: {
      id: ["Tidak mengedit kode, membuat file, atau membuka PR sampai user eksplisit menyuruh lanjut.", "Jangan mulai menulis kode hanya karena perbaikannya tampak jelas, dan jangan menganggap 'review this' sebagai izin mengubah."],
      en: ["Do not edit code, create files, or open PRs until the user explicitly says to proceed.", "Do not start writing code because the fix seems obvious, and do not treat 'review this' as permission to change things."],
    },
    tips: {
      id: ["Jawab hanya yang ditanyakan, tidak lebih (jangan bertindak atas scope yang diasumsikan).", "Untuk riset yang lebih dalam, gunakan /research; keduanya sama-sama tidak mengedit sampai ada go."],
      en: ["Answer what was asked and nothing more (do not act on assumed scope).", "For deeper lookups use /research; both stop short of edits until a go."],
    },
    pairsWellWith: ["research", "triage", "runtime-debug"],
    sourcePath: "skills/audit-only/SKILL.md",
  },
  {
    name: "babysit",
    category: "shipping",
    invocation: "user",
    description: {
      id: "Pantau PR/MR terbuka sampai hijau atau merged: polling checks, tendang CI yang macet, rerun flake, tangkap review thread yang datang terlambat.",
      en: "Watch an open PR/MR until it is green or merged: poll checks, kick stalled CI, rerun flakes, catch late review threads.",
    },
    detailedDescription: {
      id: "babysit tetap berada di PR setelah handoff sampai benar-benar selesai. Diminta babysit berarti diminta polling, tetapi hanya perubahan state yang dilaporkan: tanpa heartbeat dan tanpa narasi per poll. Loop-nya bekerja dengan forge apa pun (gh atau glab) dan hanya melakukan perbaikan kecil yang disebabkan branch ini; rebase besar atau overhaul CI merah adalah wilayah pr-ready.",
      en: "babysit stays on the PR after handoff until it is actually done. Being asked to babysit is the ask to poll, but only state changes are reported: no heartbeats and no per-poll narration. The loop works with any forge (gh or glab) and only makes small branch-caused fixes; full rebases or red-CI overhauls belong to pr-ready.",
    },
    useWhen: {
      id: ["Setelah handoff PR dan user bilang 'babysit it to green', 'watch it', atau 'keep an eye on CI'.", "CI tidak pernah mulai, merah karena flake/infra, atau review thread baru muncul terlambat."],
      en: ["After a PR handoff when the user says 'babysit it to green', 'watch it', or 'keep an eye on CI'.", "CI never started, is red from a flake/infra, or new review threads arrive late."],
    },
    avoidWhen: {
      id: ["PR belum dibuat atau diperbarui (gunakan pr-update atau cpr).", "PR orang lain (pr-triage) atau perlu rebase/perbaikan CI besar (pr-ready)."],
      en: ["The PR has not been opened or refreshed yet (use pr-update or cpr).", "It is someone else's PR (pr-triage) or needs a full rebase/red-CI overhaul (pr-ready)."],
    },
    howItWorks: {
      id: ["Ambil snapshot lewat gh pr view (state, mergeable, reviewDecision, statusCheckRollup) dan gh pr checks.", "Polling dalam loop shell terbatas (sleep 30-60 detik), bukan satu pesan per cek; simpan skrip watcher dan log di luar worktree sekali-pakai.", "Bereaksi menurut penyebab: CI belum mulai -> commit kosong 'chore: kick CI'; merah karena branch -> perbaiki lalu push; flake/infra -> rerun job gagal; thread baru -> tangani sesuai pr-ready.", "Re-query forge sebelum menyatakan selesai: merged, atau semua check hijau tanpa thread terbuka."],
      en: ["Snapshot via gh pr view (state, mergeable, reviewDecision, statusCheckRollup) and gh pr checks.", "Poll inside bounded shell loops (sleep 30-60s), not one message per check; keep watcher scripts and logs outside disposable worktrees.", "React by cause: CI never started -> empty 'chore: kick CI' commit; red from this branch -> fix and push; flake/infra -> rerun failed jobs; new threads -> handle per pr-ready.", "Re-query the forge before declaring done: merged, or every check green with no unresolved threads."],
    },
    coreRules: {
      id: ["Laporkan perubahan state saja; push atau rerun adalah progres, bukan alasan berhenti.", "Arm automerge hanya bila user secara eksplisit meminta merge; 'babysit' dan 'watch it' hanya mengotorisasi cek dan perbaikan.", "Fail closed: check merah atau thread terbuka berarti terus memantau."],
      en: ["Report state changes only; a push or rerun is progress, not an exit.", "Arm automerge only when the user explicitly asks to merge; 'babysit' and 'watch it' authorize checks and repairs only.", "Fail closed: any red check or open thread means keep watching."],
    },
    tips: {
      id: ["Quirk CI: jika gh run rerun menolak karena 'already running', batalkan run dulu lalu rerun.", "Run yang dibatalkan dengan 'no checks reported' berarti pending, bukan merah; gate 'All required checks pass' yang merah berarti diagnosis leaf-nya, bukan gate."],
      en: ["CI quirk: if gh run rerun refuses with 'already running', cancel the run first, then rerun.", "A cancelled run showing 'no checks reported' is pending, not red; when a rollup gate goes red, diagnose the leaf failure, not the gate."],
    },
    pairsWellWith: ["pr-ready", "cpr", "pr-update"],
    sourcePath: "skills/babysit/SKILL.md",
  },
  {
    name: "clean",
    category: "shipping",
    invocation: "model",
    description: {
      id: "Poles diff sendiri secara manual dengan KISS/DRY dan gaya lokal: pass pra-handoff, bukan test run dan bukan sapuan subagent.",
      en: "Polish your own diff by hand with KISS/DRY and local style: the pre-handoff pass, not a test run and not a subagent sweep.",
    },
    detailedDescription: {
      id: "clean berarti memoles kodenya sendiri. Ia TIDAK berarti menjalankan test suite, tsc, atau lint sebagai tugasnya; cek hanya dijalankan bila benar-benar perlu untuk memastikan polesan aman. clean adalah pass mandiri yang boleh dijalankan kapan saja kode mulai berantakan, dan juga berjalan otomatis sebelum handoff PR apa pun (membuat, memperbarui, automerge, atau pindah ke PR berikutnya) tanpa perlu disuruh.",
      en: "clean means polishing the code itself. It does NOT mean running the test suite, tsc, or lint as the task; a check runs only when genuinely needed to confirm the polish is safe. clean is a standalone pass that can run any time things get messy, and it also runs automatically before any PR handoff (creating, updating, automerging, or moving to the next PR) without being told each time.",
    },
    useWhen: {
      id: ["Sebelum membuat, memperbarui, atau automerge PR, dan sebelum pindah ke PR berikutnya.", "Kapan pun diff mulai berantakan, termasuk di tengah pekerjaan ('clean it up', 'tidy this')."],
      en: ["Before creating, updating, or automerging a PR, and before moving to the next one.", "Any time the diff gets messy, including mid-work ('clean it up', 'tidy this')."],
    },
    avoidWhen: {
      id: ["Pekerjaan UI yang belum disukai user (ikuti ui-only dulu).", "Ingin menjalankan test suite/tsc/lint sebagai tujuan; itu bukan arti clean."],
      en: ["UI work the user has not approved yet (follow ui-only first).", "You want to run the test suite/tsc/lint as the goal; that is not what clean means."],
    },
    howItWorks: {
      id: ["Baca ulang diff Anda: buang dead code, debug logging yang tersisa, dan duplikasi.", "Perluas helper yang sudah ada, jangan implementasi paralel; samakan gaya tetangga (nama, import, layout file, kepadatan komentar).", "Pilih versi kecil yang tajam daripada seremoni.", "Di PR: judul/isi menjelaskan perubahan secara keseluruhan (intro singkat), pecah commit topikal (pr-update), jalankan no-tropes pada teks, lalu tautkan PR."],
      en: ["Re-read your diff: cut dead code, leftover debug logging, and duplication.", "Extend existing helpers instead of paralleling them; match neighboring style (names, imports, file layout, comment density).", "Prefer the small sharp version over ceremony.", "On the PR: title/body describe the change as a whole (short intro), split into topical commits (pr-update), run no-tropes on the text, and link the PR."],
    },
    coreRules: {
      id: ["Jangan menjalankan test suite/tsc/lint hanya karena disuruh 'clean'.", "Tanpa refactor tak terkait, tanpa abstraksi dengan satu pemanggil, tanpa scope creep berkedok pembersihan."],
      en: ["Do not run the test suite/tsc/lint just because you were told to 'clean'.", "No unrelated refactors, no abstractions with one caller, no scope creep dressed up as cleanup."],
    },
    tips: {
      id: ["Untuk pekerjaan UI, pakai clean hanya setelah user menyukai UI-nya, dan gunakan ui-system untuk primitive.", "Per defaults.md, 'clean' selalu dijalankan sebelum handoff PR; jangan menunggu diminta."],
      en: ["For UI work, use clean only after the user likes the UI, and use ui-system for primitives.", "Per defaults.md, clean always runs before a PR handoff; do not wait to be asked."],
    },
    pairsWellWith: ["cpr", "pr-update", "no-tropes"],
    sourcePath: "skills/clean/SKILL.md",
  },
  {
    name: "cpr",
    category: "shipping",
    invocation: "user",
    description: {
      id: "Clean diff, lalu buka atau segarkan PR/MR: satu pass yang berakhir dengan URL tertaut.",
      en: "Clean the diff, then open or refresh the PR/MR: one pass, ending in the linked URL.",
    },
    detailedDescription: {
      id: "cpr (clean -> PR) menjalankan clean lalu pr-update, berurutan dan tanpa bertanya di antaranya. Dipakai saat pekerjaan selesai dan branch harus menjadi PR yang bisa dibaca orang. File skill hanya urutannya: kedua skill dijalankan sungguhan. Ini pass poles saja, bukan test/tsc/lint run, dan diakhiri tautan markdown PR (nomor dan URL forge lengkap).",
      en: "cpr (clean -> PR) runs clean then pr-update, in that order and without asking between them. Use it when the work is done and the branch should become a PR someone can read. The skill file is only the sequence: both skills are actually run. It is a polish pass, not a test/tsc/lint run, and ends with the PR as a markdown link (number and full forge URL).",
    },
    useWhen: {
      id: ["Pekerjaan selesai dan branch harus berakhir sebagai PR yang bisa dibaca.", "User bilang '/cpr', 'clean and PR', atau 'tidy it up and push the PR'."],
      en: ["The work is done and the branch should end up as a readable PR.", "The user says '/cpr', 'clean and PR', or 'tidy it up and push the PR'."],
    },
    avoidWhen: {
      id: ["Masalahnya CI/review thread (pr-ready), triase/salvage (pr-triage), base bertumpuk (stacked-pr), atau merge.", "Pekerjaan UI yang belum disukai user (ui-only)."],
      en: ["The problem is CI/review threads (pr-ready), triage/salvage (pr-triage), stacked bases (stacked-pr), or merging.", "UI work the user has not approved yet (ui-only)."],
    },
    howItWorks: {
      id: ["Clean (clean): baca ulang diff, buang dead code dan debug logging, perluas helper yang ada, samakan gaya; hanya polesan, bukan test/tsc/lint.", "Bentuk + publikasikan (pr-update): commit topikal, judul dan isi yang menjelaskan perubahan secara utuh, media pada body lama dipertahankan verbatim, prosa lewat no-tropes.", "Akhiri dengan PR/MR sebagai tautan markdown: nomor dan URL forge lengkap."],
      en: ["Clean (clean): re-read the diff, cut dead code and debug logging, extend existing helpers, match style; polish only, not a test/tsc/lint run.", "Shape + publish (pr-update): topical commits, title and body describing the change as a whole, media in an existing body preserved verbatim, prose through no-tropes.", "End with the PR/MR as a markdown link: number and full forge URL."],
    },
    coreRules: {
      id: ["Clean dulu, selalu: commit sebelum clean membuat pembagian commit dan isi PR menggambarkan kode yang sudah dibuang.", "Tidak ada yang perlu dibersihkan adalah hasil yang valid: katakan dalam satu baris lalu lanjut ke langkah 2.", "Jangan tersendat di pass clean; jika polesan terus melebar itu scope creep, kirim versi sempit."],
      en: ["Clean first, always: committing before cleaning makes the commit split and PR body describe code already thrown away.", "Nothing to clean is a valid outcome: say so in one line and go to step 2.", "Do not stall on a clean pass; if polish keeps expanding that is scope creep, ship the narrow version."],
    },
    tips: {
      id: ["Lanjutkan dengan /babysit atau /pr-ready bila CI/review masih menahan PR.", "cpr tidak punya langkah push eksplisit sendiri; pr-update yang mendorong branch bila perlu."],
      en: ["Follow with /babysit or /pr-ready when CI/reviews still block the PR.", "cpr has no explicit push step of its own; pr-update pushes the branch when needed."],
    },
    pairsWellWith: ["clean", "pr-update", "pr-ready"],
    sourcePath: "skills/cpr/SKILL.md",
  },
  {
    name: "draft-tweet",
    category: "shipping",
    invocation: "user",
    description: {
      id: "Menyusun draft post X/Twitter tentang pekerjaan yang dikirim. Tidak pernah memposting kecuali diminta.",
      en: "Draft X/Twitter posts about shipped work. Never post unless asked.",
    },
    detailedDescription: {
      id: "draft-tweet menulis opsi tweet; tidak memposting kecuali user eksplisit menyuruh. Jika xurl terpasang dan terautentikasi, skill memakainya read-only untuk mencontoh gaya post asli user terbaru (kapitalisasi, tanda baca, panjang kalimat, penggunaan link/emoji) tanpa mengutip post lama. Jika xurl tidak ada, draft dibuat dari contoh yang sudah ada di percakapan.",
      en: "draft-tweet writes tweet options; it does not post unless the user explicitly says so. If xurl is installed and authenticated it is used read-only to sample the user's recent original posts (capitalization, punctuation, sentence length, link/emoji use) without quoting old posts. If xurl is missing, the draft comes from examples already in the conversation.",
    },
    useWhen: {
      id: ["User ingin opsi tweet untuk pekerjaan yang baru dikirim.", "User bertanya 'what should I tweet'."],
      en: ["The user wants tweet options for work they just shipped.", "The user asks 'what should I tweet'."],
    },
    avoidWhen: {
      id: ["User ingin langsung memposting (skill ini tidak pernah memposting sendiri)."],
      en: ["The user wants it posted directly (this skill never posts on its own)."],
    },
    howItWorks: {
      id: ["Opsional: xurl whoami lalu xurl posts @handle -n 30 (read-only) untuk menangkap pola gaya penulisan user.", "Tulis 2-4 opsi, masing-masing kira-kira maksimal 240 karakter: klaim konkret atau manfaat bagi user, bukan hype kosong.", "Sedikit atau tanpa emoji, tanpa engagement bait, maksimal satu link bila berguna.", "Jalankan hasilnya lewat no-tropes."],
      en: ["Optional: xurl whoami then xurl posts @handle -n 30 (read-only) to pick up the user's writing pattern.", "Write 2-4 options, each roughly 240 characters or fewer: a concrete claim or user benefit, no empty hype.", "Little or no emoji, no engagement bait, at most one link if useful.", "Run the result through no-tropes."],
    },
    coreRules: {
      id: ["Tidak pernah memanggil xurl post, reply, quote, DM, atau API tulis lain kecuali diminta.", "Jangan mengarang angka performa yang tidak direstui user, dan jangan default ke thread."],
      en: ["Never call xurl post, reply, quote, DM, or any other write API unless asked.", "Do not invent performance numbers the user has not blessed, and do not default to a thread."],
    },
    tips: {
      id: ["Untuk alat visual, buka dengan efek yang terlihat atau deskripsi yang akurat dan playful, bukan daftar fitur.", "Jika diminta contoh gambar, cari dulu artefak PR/MR sebelumnya dan periksa gambarnya; beri label jelas bila membuat demo hasil rekonstruksi."],
      en: ["For visual tools, lead with the visible effect or an accurate, playful description rather than a feature list.", "If asked for an example image, look for prior PR/MR artifacts first and inspect the image; label any reconstructed demo clearly."],
    },
    pairsWellWith: ["no-tropes", "pr-update"],
    sourcePath: "skills/draft-tweet/SKILL.md",
  },
  {
    name: "free-disk-space",
    category: "engineering",
    invocation: "user",
    description: {
      id: "Mengosongkan ruang disk di macOS dengan aman tanpa menyentuh data pribadi atau data agent.",
      en: "Safely reclaim disk space on macOS without touching personal or agent data.",
    },
    detailedDescription: {
      id: "free-disk-space (khusus macOS) menyelidiki dulu, lalu hanya menghapus data yang bisa dibuat ulang dan sudah diotorisasi user. Skill tidak pernah memeriksa atau mengubah data IDE/agent tempat ia berjalan (application support, cache, globalStorage, database, ekstensi, log) kecuali user menyebutnya sebagai target, dan tidak pernah menyentuh riwayat/ekstensi/cookie/kredensial browser maupun file buatan user.",
      en: "free-disk-space (macOS only) investigates first, then deletes only regenerable data the user has authorized. It never inspects or modifies the data of the IDE/agent it runs inside (application support, caches, globalStorage, databases, extensions, logs) unless the user names it as a target, and never touches browser history/extensions/cookies/credentials or user-created files.",
    },
    useWhen: {
      id: ["User meminta mengosongkan disk atau membersihkan cache.", "Mac hampir penuh dan perlu diselidiki."],
      en: ["The user asks to free disk space or clear caches.", "A Mac is nearly full and needs investigating."],
    },
    avoidWhen: {
      id: ["Bukan macOS (skill ini khusus macOS).", "Ingin menghapus data browser, kredensial, atau data pribadi (tidak boleh)."],
      en: ["Not macOS (this skill is macOS-specific).", "You want to delete browser data, credentials, or personal files (not allowed)."],
    },
    howItWorks: {
      id: ["Catat penggunaan dari volume data macOS: df -h /System/Volumes/Data.", "Cari pemakai terbesar dengan du dan diagnostik package manager sebelum menghapus apa pun, tanpa masuk ke data agent/IDE yang dilindungi.", "Jelaskan apa yang besar, apakah bisa dibuat ulang, dan dampaknya; bersihkan hanya target aman: isi ~/Library/Caches/, entri cache package manager yang tak terpakai (mis. pnpm store prune), cache model/GPU browser yang dikenal.", "Catat penggunaan lagi dan laporkan ruang yang dibebaskan."],
      en: ["Record usage from the macOS data volume: df -h /System/Volumes/Data.", "Find the largest consumers with du and package-manager diagnostics before deleting anything, without descending into protected agent/IDE data.", "Explain what is large, whether it is regenerable, and the impact; clean only safe targets: contents of ~/Library/Caches/, unused package-manager cache entries (e.g. pnpm store prune), known browser model/GPU caches.", "Record usage again and report the space freed."],
    },
    coreRules: {
      id: ["Tanyakan dulu sebelum penghapusan destruktif seperti image, container, volume, atau disk virtual Docker.", "Untuk file sparse (mis. disk virtual Docker), laporkan pemakaian nyata dari du, bukan ukuran semu dari ls."],
      en: ["Ask before destructive cleanup such as Docker images, containers, volumes, or virtual disks.", "For sparse files (e.g. Docker's virtual disk), report actual use from du, not apparent size from ls."],
    },
    tips: {
      id: ["Jangan menyajikan volume sistem / yang tersegel sebagai kapasitas data Mac yang bisa dipakai."],
      en: ["Do not present the sealed / system volume as the Mac's usable data-volume capacity."],
    },
    pairsWellWith: [],
    sourcePath: "skills/free-disk-space/SKILL.md",
  },
  {
    name: "list-open-work",
    category: "shipping",
    invocation: "user",
    description: {
      id: "Mendaftar MR/PR terbuka milik saya di repo/worktree ini, masing-masing dengan tiket tracker-nya.",
      en: "List my open MRs/PRs in the current repo/worktree, each with its tracker ticket.",
    },
    detailedDescription: {
      id: "list-open-work menjawab satu pertanyaan: apa milik saya yang terbuka di repo ini, dan tiket apa yang dibawa tiap item? Scope-nya hanya checkout git saat ini (origin-nya): MR/PR yang saya buat, bukan repo, org, atau tracker lain. Daftar dikirim sebagai markdown biasa yang bisa diklik (tidak pernah dalam code fence), satu paragraf per item, dengan nomor dan kunci tiket sebagai link.",
      en: "list-open-work answers one question: what of mine is open in this repo, and which ticket does each carry? Scope is only the current git checkout (its origin): MRs/PRs authored by me, never another repo, org, or tracker. The list goes out as clickable rendered markdown (never in a code fence), one paragraph per item, with the number and ticket key as links.",
    },
    useWhen: {
      id: ["User memanggil /list-open-work atau bertanya apa yang sedang saya buka / in review.", "Perlu daftar standup berisi MR atau PR terbuka milik saya."],
      en: ["The user invokes /list-open-work or asks what they have open / in review.", "A standup list of my open MRs or PRs is needed."],
    },
    avoidWhen: {
      id: ["Ingin mendaftar pekerjaan orang lain atau repo/forge lain.", "Bukan di dalam repo git (skill berhenti dan menyatakannya)."],
      en: ["You want to list other people's work or another repo/forge.", "Not inside a git repo (the skill stops and says so)."],
    },
    howItWorks: {
      id: ["Baca origin checkout; deteksi forge: GitLab lewat glab api user + endpoint merge_requests (filter author = saya), GitHub lewat gh pr list --author @me --state open.", "Kunci tiket = kecocokan pertama \\b[A-Z][A-Z0-9]+-\\d+\\b di judul, lalu branch, lalu deskripsi; di Jira, validasi hasil acli terhadap proyek tracker repo ini.", "Urut menurun menurut nomor, format `<!|#><N> - <judul> [<KEY>]` dengan baris kosong di antara item, tanpa bullet atau emoji.", "Setelah daftar, tambahkan prosa hanya untuk hal yang mengubah langkah berikutnya: konflik, pipeline merah, status tiket yang bertentangan, MR lama tanpa tiket."],
      en: ["Read the checkout's origin; detect the forge: GitLab via glab api user + the merge_requests endpoint (filter author = me), GitHub via gh pr list --author @me --state open.", "Ticket key = first match of \\b[A-Z][A-Z0-9]+-\\d+\\b in the title, then the branch, then the description; for Jira, validate acli results against this repo's tracker project.", "Descending by number, format `<!|#><N> - <title> [<KEY>]` with a blank line between items, no bullets or emoji.", "After the list, add prose only for what changes the next step: conflicts, red pipelines, contradicting ticket status, old MRs with no ticket."],
    },
    coreRules: {
      id: ["Hanya repo ini: jangan mengambil prefiks tiket atau origin dari repo/sesi lain, dan jangan mengarang kunci tiket (tanpa tiket berarti tanpa [KEY]).", "Jangan pernah membungkus daftar dalam code fence dan jangan lewatkan baris kosong antar item (satu newline akan menyatu menjadi satu paragraf).", "Lewati approval kecuali diminta."],
      en: ["This repo only: never take a ticket prefix or origin from another repo/session, and never invent a ticket key (no ticket means no [KEY]).", "Never wrap the list in a code fence and never skip the blank line between items (a single newline collapses into one paragraph).", "Skip approvals unless asked."],
    },
    tips: {
      id: ["GitLab menghitung mergeability secara malas: GET MR biasa bisa mengembalikan has_conflicts: false yang usang; paksa dengan include_diverged_commits_count dan baca merge_status.", "Untuk Slack, versi sama tanpa sintaks link karena integrasi forge/tracker meng-link otomatis."],
      en: ["GitLab recomputes mergeability lazily: a plain MR GET can return a stale has_conflicts: false; force it with include_diverged_commits_count and read merge_status.", "For Slack, the same lines with link syntax stripped, since forge/tracker integrations linkify automatically."],
    },
    pairsWellWith: ["ticket-ship", "pr-ready", "babysit"],
    sourcePath: "skills/list-open-work/SKILL.md",
  },
  {
    name: "no-tropes",
    category: "review",
    invocation: "model",
    description: {
      id: "Mendeteksi dan menghapus tropes tulisan AI dari teks yang dihasilkan; diterapkan otomatis sebagai pass revisi mandiri (tropes.fyi).",
      en: "Detect and eliminate common AI writing tropes from generated text; applied automatically as a self-revision pass (tropes.fyi).",
    },
    detailedDescription: {
      id: "Setelah menyusun prosa apa pun (dokumentasi, README, commit message, deskripsi PR, blog, komentar, atau teks non-kode lain), no-tropes merevisinya terhadap katalog tropes di tropes-reference.md (bersumber dari tropes.fyi). Prinsipnya: tulis seperti manusia yang bervariasi dan spesifik; satu trope sekali pakai mungkin tidak masalah, yang bermasalah adalah ketika beberapa trope menumpuk atau satu trope berulang.",
      en: "After drafting any prose (docs, READMEs, commit messages, PR descriptions, blog posts, comments, or other non-code text), no-tropes revises it against the tropes catalog in tropes-reference.md (sourced from tropes.fyi). The principle: write like a human, varied and specific; one trope used once might be fine, the problem is stacked tropes or one trope repeating.",
    },
    useWhen: {
      id: ["Menulis atau merevisi prosa, dokumentasi, README, commit message, atau deskripsi PR.", "Menyusun teks non-kode apa pun yang akan dibaca orang."],
      en: ["Writing or revising prose, docs, READMEs, commit messages, or PR descriptions.", "Producing any non-code text people will read."],
    },
    avoidWhen: {
      id: ["Mengedit kode (skill ini hanya untuk teks non-kode)."],
      en: ["Editing code (this skill is for non-code text only)."],
    },
    howItWorks: {
      id: ["Baca draf utuh dan tandai kecocokan dengan referensi trope.", "Tulis ulang bagian yang ditandai dengan bahasa polos dan langsung: kata kerja sederhana ('is' bukan 'serves as'), kata benda konkret, struktur kalimat bervariasi.", "Buang transisi pengisi ('It's worth noting', 'Importantly', 'Interestingly').", "Jika pola struktur yang sama muncul 3+ kali, patahkan polanya."],
      en: ["Read the full draft and flag trope matches from the reference.", "Rewrite flagged passages in plain, direct language: simple verbs ('is' over 'serves as'), concrete nouns, varied sentence structure.", "Cut filler transitions ('It's worth noting', 'Importantly', 'Interestingly').", "If the same structural pattern shows up 3+ times, break the pattern."],
    },
    coreRules: {
      id: ["Checklist: pilihan kata ('quietly', 'delve', 'tapestry', 'landscape', 'serves as', 'leverage', 'robust'), struktur kalimat ('It's not X, it's Y', tricolon, anaphora), struktur paragraf, nada, format, dan komposisi.", "Em-dash maksimal 2-3 per tulisan; waspadai bullet berawalan tebal dan panah unicode."],
      en: ["Checklist: word choice ('quietly', 'delve', 'tapestry', 'landscape', 'serves as', 'leverage', 'robust'), sentence structure ('It's not X, it's Y', tricolons, anaphora), paragraph structure, tone, formatting, and composition.", "Em-dashes at most 2-3 per piece; watch for bold-first bullets and unicode arrows."],
    },
    tips: {
      id: ["Dipakai pr-update, cpr, draft-tweet, dan ticket-ship pada teks yang dipublikasikan.", "Sumber katalog: tropes.fyi (via tropes-reference.md di folder skill)."],
      en: ["Used by pr-update, cpr, draft-tweet, and ticket-ship on published text.", "Catalog source: tropes.fyi (via tropes-reference.md in the skill folder)."],
    },
    pairsWellWith: ["pr-update", "draft-tweet", "clean"],
    sourcePath: "skills/no-tropes/SKILL.md",
  },
  {
    name: "notarize-mac",
    category: "shipping",
    invocation: "user",
    description: {
      id: "Membangun dan memverifikasi app atau DMG macOS yang ditandatangani dan dinotarisasi memakai otomasi notarisasi yang sudah ada di proyek.",
      en: "Build and verify a signed, notarized macOS app or DMG using the project's existing notarization automation.",
    },
    detailedDescription: {
      id: "notarize-mac tidak membuat pipeline signing baru. Skill menemukan lalu menjalankan skrip notarisasi/rilis yang sudah dimiliki proyek (mis. notarize-*-installer.sh), mempertahankan identitas signing, penanganan kunci App Store Connect, penamaan artefak, dan alur notarisasinya, lalu memverifikasi hasilnya dengan cek skrip itu atau spctl.",
      en: "notarize-mac does not invent a new signing pipeline. It locates and runs the notarization/release script the project already ships (e.g. notarize-*-installer.sh), preserving its signing identity, App Store Connect key handling, artifact naming, and notarization flow, then verifies the result with the script's checks or spctl.",
    },
    useWhen: {
      id: ["User meminta notarisasi build Mac atau membuat DMG rilis.", "Perlu memverifikasi Gatekeeper pada artefak."],
      en: ["The user asks to notarize a Mac build or produce a release DMG.", "You need to verify Gatekeeper on an artifact."],
    },
    avoidWhen: {
      id: ["Proyek belum punya skrip notarisasi (skill meminta lokasinya, bukan membuat ulang)."],
      en: ["The project has no notarization script (the skill asks for its location instead of recreating it)."],
    },
    howItWorks: {
      id: ["Konfirmasi checkout dan branch; default ke branch default yang bersih dan terkini.", "Cari skrip notarisasi/rilis yang sudah ada: pakai path dari user dulu, jika tidak cari di repo dan checkout rilis/notary di sekitarnya; jika tidak ada, minta lokasinya.", "Jalankan skrip dari environment yang diharapkannya, pertahankan identitas signing dan alur notarisasinya.", "Verifikasi artefak dengan cek skrip atau spctl, lalu laporkan path, ukuran, hasil notarisasi, dan hasil Gatekeeper."],
      en: ["Confirm the checkout and branch; default to a clean, current default branch.", "Locate the existing notarization/release script: use a user-supplied path first, otherwise search the repo and nearby release/notary checkouts; if none exists, ask for its location.", "Run the script from the environment it expects, preserving its signing identity and notarization flow.", "Verify the artifact with the script's checks or spctl, then report path, size, notarization result, and Gatekeeper result."],
    },
    coreRules: {
      id: ["Jangan membuat pipeline signing baru dan jangan mengekspos kredensial.", "Tidak pernah mencetak isi private key, kredensial signing, atau nilai secret."],
      en: ["Do not invent a new signing pipeline and do not expose credentials.", "Never print private key contents, signing credentials, or secret values."],
    },
    tips: {
      id: ["Laporan akhir yang diminta skill: path artefak, ukuran, hasil notarisasi, hasil Gatekeeper."],
      en: ["The final report the skill asks for: artifact path, size, notarization result, Gatekeeper result."],
    },
    pairsWellWith: [],
    sourcePath: "skills/notarize-mac/SKILL.md",
  },
  {
    name: "perf",
    category: "engineering",
    invocation: "user",
    description: {
      id: "Loop perf umum berbasis profil untuk bahasa/runtime apa pun: baseline, profil, perbaiki hot path yang nyata, ukur ulang.",
      en: "The general profile-driven perf loop for any language or runtime: baseline, profile, fix the real hot path, re-measure.",
    },
    detailedDescription: {
      id: "perf adalah loop performa umum; alat profil (CPU profile, flamegraph, memory snapshot, trace) bisa berbeda, tetapi loopnya sama. Ukur dulu, baca profil (bukan intuisi), perbaiki hot path yang sebenarnya, ukur ulang, dan catat sebelum/sesudah di judul/deskripsi PR. File upstream juga memuat catatan panjang khusus kasus (Electron/hgui, loading web/Vue/SSR, katalog serverless, idle browser) yang tidak dirangkum di sini.",
      en: "perf is the general performance loop; the profiling tool (CPU profile, flamegraph, memory snapshot, trace) varies but the loop is the same. Measure first, read the profile (not intuition), fix the actual hot path, re-measure, and record before/after in the PR title/description. The upstream file also carries long case-specific notes (Electron/hgui, web/Vue/SSR loading, serverless catalog caches, browser idle) that are not summarized here.",
    },
    useWhen: {
      id: ["Ada yang lambat ('this is slow') atau pekerjaan optimasi.", "Perlu bukti terukur sebelum/sesudah untuk PR performa."],
      en: ["Something is slow ('this is slow') or you are doing optimization work.", "A PR needs measured before/after evidence."],
    },
    avoidWhen: {
      id: ["Ingin mengoptimasi berdasarkan tebakan tanpa profil.", "Tidak ada jalur lambat yang bisa direproduksi."],
      en: ["You want to optimize by guess without profiling.", "There is no reproducible slow path."],
    },
    howItWorks: {
      id: ["Reproduksi jalur lambat dan tangkap angka baseline (waktu, memori, FPS, latensi request).", "Profil untuk menemukan hot path nyata dengan profiler yang sudah ada di repo; jangan membuat harness paralel.", "Baca profil, bukan intuisi, dan perbaiki hot path yang sebenarnya.", "Ukur ulang dan catat sebelum/sesudah di judul/deskripsi PR; kirim dalam commit topikal (pr-update), jalankan clean, jaga CI hijau."],
      en: ["Reproduce the slow path and capture a baseline number (time, memory, FPS, request latency).", "Profile to find the real hot path using the repo's existing profiler; do not build a parallel harness.", "Read the profile, not your intuition, and fix the actual hot path.", "Re-measure and record before/after in the PR title/description; ship in topical commits (pr-update), clean, keep CI green."],
    },
    coreRules: {
      id: ["Jangan mengoptimasi berdasarkan tebakan sebelum profiling.", "Jangan mengutak-atik sistem pengukuran alih-alih memperbaiki performa, dan batasi cakupan run agar tidak membebani mesin.", "Jangan melaporkan peningkatan yang tidak diukur."],
      en: ["Do not optimize by guess before profiling.", "Do not fiddle with the measurement system instead of improving perf, and scope the run so it does not overwhelm the machine.", "Do not report gains you did not measure."],
    },
    tips: {
      id: ["Gunakan profiler yang sudah ada di repo dan simpan sampel mentah sebelum melaporkan tabel."],
      en: ["Use the repo's existing profiler and persist raw samples before reporting tables."],
    },
    pairsWellWith: ["pr-update", "clean", "runtime-debug"],
    sourcePath: "skills/perf/SKILL.md",
  },
  {
    name: "pr-ready",
    category: "shipping",
    invocation: "user",
    description: {
      id: "Bereskan semua yang menghalangi merge PR/MR yang sudah ada: rebase ke default branch, CI hijau, dan selesaikan review thread (Copilot dan manusia).",
      en: "Clear everything blocking an existing PR/MR from merging: rebase onto the default branch, get CI green, and resolve review threads (Copilot and human).",
    },
    detailedDescription: {
      id: "PR terbuka yang belum mergeable punya dua penghalang: base basi atau CI merah, dan review thread terbuka. Loop-nya sama untuk keduanya: perbaiki, push, query ulang forge, ulangi. Tanpa pekerjaan fitur dan tanpa drive-by. Strategi update menghormati aturan riwayat repo: bila force push dilarang atau user mensyaratkan merge, merge origin/<default> ke branch tanpa menulis ulang commit; selain itu rebase.",
      en: "An open PR that is not mergeable has two blockers: a stale base or red CI, and open review threads. Same loop for both: fix, push, re-query the forge, repeat. No feature work and no drive-bys. The update strategy honors repository history rules: where force pushes are forbidden or the user requires a merge, merge origin/<default> into the branch without rewriting commits; otherwise rebase.",
    },
    useWhen: {
      id: ["'rebase on main', 'make CI green', 'fix CI/CD', 'address the reviews', 'address Copilot', 'review-loop', atau 'get this mergeable'.", "PR milik sendiri yang CI-nya merah atau punya thread review terbuka."],
      en: ["'rebase on main', 'make CI green', 'fix CI/CD', 'address the reviews', 'address Copilot', 'review-loop', or 'get this mergeable'.", "Your own PR with red CI or open review threads."],
    },
    avoidWhen: {
      id: ["PR orang lain (pr-triage).", "PR dengan premis salah yang perlu salvage (hentikan dan serahkan ke pr-triage)."],
      en: ["Someone else's PR (pr-triage).", "A wrong-premise PR that needs salvage (stop and hand off to pr-triage)."],
    },
    howItWorks: {
      id: ["Rebase + CI: cari/buat worktree untuk PR, fetch origin <default>, pilih strategi sesuai aturan riwayat repo (merge atau rebase), selesaikan konflik dengan membaca niat kedua sisi, push (--force-with-lease bila riwayat ditulis ulang), tonton CI dan perbaiki hanya kegagalan akibat rebase atau kerusakan yang sudah ada di branch ini.", "Review thread: push dulu pekerjaan yang belum terkirim, daftar komentar inline dan isi review yang belum selesai, minta bot review repo bila perlu lalu tunggu (jika macet ~10-15 menit, katakan).", "Per komentar: valid -> perbaiki lalu resolve; salah/usang -> balasan singkat lalu resolve; nit di luar scope -> tanya sekali; jangan pernah resolve komentar maintainer #1 tanpa memperbaikinya atau override eksplisit.", "Ulangi sampai thread terbuka habis atau hanya yang disetujui ditunda."],
      en: ["Rebase + CI: find/create the worktree for the PR, fetch origin <default>, pick the strategy per the repo's history rules (merge or rebase), resolve conflicts by reading both sides' intent, push (--force-with-lease if history was rewritten), watch CI and fix only failures caused by the rebase or existing breakage on this branch.", "Review threads: push any unpushed work first, list open inline comments and review bodies, request the repo's review bot if wanted and wait (if stuck ~10-15 min, say so).", "Per comment: valid -> fix and resolve; wrong/outdated -> short reply and resolve; out-of-scope nit -> ask once; never resolve a #1 maintainer comment without fixing it or an explicit override.", "Repeat until unresolved threads are gone or only ones approved for deferral remain."],
    },
    coreRules: {
      id: ["Re-query forge, jangan percaya bahwa push membuat CI hijau atau balasan me-resolve thread. Fail closed: check merah atau thread terbuka berarti belum selesai.", "Scope lock: tanpa refactor, restyle, atau perbaikan 'while I'm here'; jangan memperluas deskripsi PR atau supersede kecuali diminta (pr-update).", "Flake upstream di default branch disebutkan, bukan ditutupi dengan penghapusan test yang tak terkait."],
      en: ["Re-query the forge; do not trust that a push turned CI green or that a reply resolved a thread. Fail closed: any red check or open thread means you are not done.", "Scope lock: no refactors, restyles, or 'while I'm here' fixes; do not expand the PR description or supersede unless asked (pr-update).", "A flaky upstream on the default branch is called out, not papered over with unrelated test deletes."],
    },
    tips: {
      id: ["Laporan akhir: ujung branch, status check, dan ringkasan singkat fixed-vs-replied.", "Bila PR perlu salvage karena premisnya salah, hentikan dan serahkan ke /pr-triage alih-alih menulis ulang diam-diam."],
      en: ["Final report: branch tip, checks status, and a short fixed-vs-replied summary.", "If the PR needs salvage because its premise is wrong, stop and hand off to /pr-triage instead of silently rewriting it."],
    },
    pairsWellWith: ["pr-update", "babysit", "pr-triage", "stacked-pr"],
    sourcePath: "skills/pr-ready/SKILL.md",
  },
  {
    name: "pr-triage",
    category: "review",
    invocation: "user",
    description: {
      id: "Triase maintainer atas PR/MR ORANG LAIN: verdict approve, supersede, atau close, salvage dengan kredit, tutup cluster. Bukan untuk PR sendiri (itu pr-ready).",
      en: "Maintainer triage on OTHER people's PRs/MRs: verdict of approve, supersede, or close, salvage with credit, close the cluster. Not for your own PR (that is pr-ready).",
    },
    detailedDescription: {
      id: "pr-triage punya tiga hasil nyata: approve, supersede (salvage + kredit + tutup yang lama), atau close-as-wrong-premise. Verdict didahulukan, lalu tunggu 'go' eksplisit sebelum menulis ke forge (approve/supersede/close/merge/push). Batch PR dikelompokkan dulu berdasarkan fix yang dibutuhkan: PR yang memperbaiki bug atau subsistem yang sama digabung menjadi satu super-PR yang mengkredit setiap penulis. Jika user membatasi hasil (mis. hanya approve atau request changes), batasan itu mengalahkan taksonomi default.",
      en: "pr-triage has three real outcomes: approve, supersede (salvage + credit + close the old one), or close-as-wrong-premise. The verdict comes first, then wait for an explicit 'go' before forge writes (approve/supersede/close/merge/push). The batch is clustered first by the fix it needs: PRs fixing the same bug or subsystem merge into one super-PR that credits every author. If the user restricts the outcomes (e.g. approve or request changes only), that restriction overrides the default taxonomy.",
    },
    useWhen: {
      id: ["Review batch PR/MR orang lain, atau thread Discord yang ditempel berisi sebuah PR.", "Permintaan salvage, supersede, atau close."],
      en: ["Reviewing a batch of other people's PRs/MRs, or a pasted Discord thread with a PR.", "Salvage, supersede, or close requests."],
    },
    avoidWhen: {
      id: ["PR milik sendiri (gunakan pr-ready).", "Menulis ke forge sebelum user mengatakan go."],
      en: ["Your own PR (use pr-ready).", "Writing to the forge before the user says go."],
    },
    howItWorks: {
      id: ["Kickoff: tentukan repo + forge, baca AGENTS.md/CONTRIBUTING.md, tiru penamaan worktree/branch repo, jangan sentuh checkout utama, lalu cluster batch sebelum verdict per-PR.", "Loop per PR (dalam tiap cluster): metadata + diff + review; komentar #1/lead maintainer yang belum dijawab berarti jangan approve; cek premis di default branch; cherry-pick/terapkan di worktree review dan jalankan test yang relevan; keluarkan verdict (approve | supersede | close-as-wrong-premise) dengan rencana salvage yang konkret.", "Supersede (setelah go): satu worktree salvage per cluster, pertahankan ide bagus dan pakai helper yang ada, kredit setiap penulis (Co-authored-by + @handle), tes untuk kelas bug, buka satu PR baru 'Supersedes #N, #M', lalu tutup cluster dengan komentar 'Superseded by #<new>.'.", "Approve (setelah go): approve singkat atau merge bila diminta; fork PR dengan CI action_required perlu approve run-nya; cek rebaseable sebelum --rebase --auto."],
      en: ["Kickoff: work out repo + forge, read AGENTS.md/CONTRIBUTING.md, mirror the repo's worktree/branch naming, leave the primary checkout alone, then cluster the batch before per-PR verdicts.", "Per-PR loop (within each cluster): metadata + diff + reviews; unaddressed #1/lead-maintainer comments mean do not approve; check the premise on the default branch; cherry-pick/apply in a review worktree and run relevant tests; return a verdict (approve | supersede | close-as-wrong-premise) with a concrete salvage plan.", "Supersede (after go): one salvage worktree per cluster, keep the good idea and reuse existing helpers, credit every author (Co-authored-by + @handle), bug-class tests, open one new PR 'Supersedes #N, #M', then close the cluster with a 'Superseded by #<new>.' comment.", "Approve (after go): short approve or merge if asked; fork PRs with CI action_required need their runs approved; check rebaseable before --rebase --auto."],
    },
    coreRules: {
      id: ["Hanya worktree untuk pekerjaan review; tidak pernah git stash di worktree review (stash list dibagi semua worktree repo).", "Tidak ada supersede/close/approve/merge tanpa go eksplisit, dan tidak ada approve di atas komentar lead-maintainer yang belum dijawab.", "Jangan memakai 'keep open: minta author menulis ulang' bila kriteria supersede terpenuhi; salvage saja. request-changes bukan verdict triase (hanya untuk penulis tepercaya dengan satu nit kecil)."],
      en: ["Worktrees only for review work; never git stash in a review worktree (the stash list is shared by every worktree of the repo).", "No supersede/close/approve/merge without an explicit go, and no approve past unaddressed lead-maintainer comments.", "Do not use 'keep open: ask the author to rewrite' when supersede criteria match; salvage it. request-changes is not a triage verdict (only for trusted authors with one tiny nit)."],
    },
    tips: {
      id: ["Thread Discord yang ditempel adalah intake itu sendiri; tarik gejala, platform, PR/issue terkait, dan jawaban staf. Baris support handoff dengan kolom owner adalah papan bersama: ambil hanya baris yang owner-nya menyebut Anda.", "Jalankan no-tropes pada komentar publik; checklist 'Before you stop' di akhir tiap item mencegah cluster terlewat."],
      en: ["A pasted Discord thread is the intake itself; pull out symptom, platform, linked PR/issue, and staff replies. A support handoff with an owner column is a shared board: take only rows whose owner names you.", "Run no-tropes on public comments; the 'Before you stop' checklist at the end of each item prevents missed clusters."],
    },
    pairsWellWith: ["pr-ready", "triage", "work", "pr-update"],
    sourcePath: "skills/pr-triage/SKILL.md",
  },
  {
    name: "pr-update",
    category: "shipping",
    invocation: "user",
    description: {
      id: "Buka PR/MR bila belum ada, atau segarkan judul dan deskripsi yang ada agar sesuai diff saat ini. Media yang sudah ada di body dipertahankan.",
      en: "Open a PR/MR if missing, or refresh an existing one's title and description so they match the current diff. Preserves any media already in the body.",
    },
    detailedDescription: {
      id: "Satu skill untuk membuat dan memperbarui PR/MR. Judul dan body dibuat dari seluruh perubahan branch, bukan satu commit. Skill juga membentuk commit branch secara topikal (split 2-5 commit; rebuild dengan soft reset ke base SHA sebenarnya dan commit per path), dan menjaga aturan keras: media pada body yang sudah ada tidak boleh dihapus. Output selalu diakhiri tautan markdown PR/MR (nomor dan URL forge lengkap).",
      en: "One skill for creating and updating a PR/MR. The title and body come from the whole branch's changes, not a single commit. The skill also shapes the branch's commits topically (a 2-5 commit split; rebuilt with a soft reset to the real base SHA and path-staged commits) and enforces a hard rule: media in an existing body is never deleted. Output always ends with the PR/MR as a markdown link (number and full forge URL).",
    },
    useWhen: {
      id: ["'/pr-update', 'open a PR', 'update the PR', atau menyegarkan judul/deskripsi PR.", "Branch perlu dipecah menjadi commit topikal sebelum publikasi."],
      en: ["'/pr-update', 'open a PR', 'update the PR', or refreshing the PR title/description.", "A branch needs splitting into topical commits before publishing."],
    },
    avoidWhen: {
      id: ["Rebase, CI, atau review thread (pr-ready).", "Triase/salvage (pr-triage) atau merge."],
      en: ["Rebase, CI, or review threads (pr-ready).", "Triage/salvage (pr-triage) or merging."],
    },
    howItWorks: {
      id: ["Baca git status/diff/log dan diff <default>...HEAD agar tahu seluruh perubahan; deteksi PR/MR yang sudah ada (gh pr view / glab mr view): tidak ada -> buat, ada -> edit di tempat (jangan buka duplikat).", "Jika memperbarui: ambil body saat ini dulu, ekstrak dan pertahankan semua media (gambar/video markdown, <img>, <video>, URL upload), tulis ulang teks agar sesuai diff, lalu pasang kembali media dan diff body lama vs baru sebelum submit.", "Judul ringkas dan berfokus pada alasan, cocokkan gaya PR repo; body pakai template repo, atau Summary + Test plan; jalankan prosa lewat no-tropes.", "Bentuk commit topikal (satu concern per commit) dan cek user.name/user.email efektif sebelum publish."],
      en: ["Read git status/diff/log and the <default>...HEAD diff to know the full change set; detect an existing PR/MR (gh pr view / glab mr view): none -> create, exists -> edit in place (never a duplicate).", "When updating: fetch the current body first, extract and keep every media item (markdown images/video, <img>, <video>, upload URLs), rewrite the text to match the diff, re-attach the media and diff old vs new body before submitting.", "Title concise and why-focused, matching the repo's PR style; body uses the repo template, or Summary + Test plan; run the prose through no-tropes.", "Shape topical commits (one concern per commit) and check the effective user.name/user.email before publishing."],
    },
    coreRules: {
      id: ["Jangan menghapus media dari body yang sudah ada; bila refresh akan membuangnya, berhenti dan pertahankan body lama (atau hanya ubah judul).", "Jangan mengarang reviewer, label, atau milestone.", "Soft-reset ke merge-base SHA yang sebenarnya, bukan origin/<default>; verifikasi isi commit mendarat sebelum force-push."],
      en: ["Never delete media from an existing body; if a refresh would drop it, stop and keep the old body (or only edit the title).", "Do not invent reviewers, labels, or a milestone.", "Soft-reset to the real merge-base SHA, not origin/<default>; verify the content landed before force-pushing."],
    },
    tips: {
      id: ["Akhiri selalu dengan tautan markdown PR, bukan '#123' polos: ini satu-satunya tempat aturannya ditulis, skill lain hanya mengikutinya.", "Jaga authorship saat membentuk ulang pekerjaan orang lain (Co-authored-by / cherry-pick), terutama saat salvage pr-triage."],
      en: ["Always end with the PR as a markdown link, never a bare '#123': this is the one place the rule is written down, other skills just follow it.", "Keep authorship when reshaping others' work (Co-authored-by / cherry-pick), especially during pr-triage salvage."],
    },
    pairsWellWith: ["clean", "cpr", "no-tropes", "pr-ready"],
    sourcePath: "skills/pr-update/SKILL.md",
  },
  {
    name: "research",
    category: "engineering",
    invocation: "user",
    description: {
      id: "Cari tahu sebelum menjawab atau membangun: dokumen resmi proyek ini dulu, baru prior art eksternal.",
      en: "Look it up before answering or building: this project's documents of record first, then external prior art.",
    },
    detailedDescription: {
      id: "research punya dua bagian, berurutan: dokumen of record proyek ini (tiket, spec/PRD, thread pemicu, plans/docs/ADR/AGENTS.md, Figma, git log, source vendored) lalu prior art di luar (GitHub, arXiv, dokumentasi vendor, blog/forum). Menjawab dari memori lalu menyebutnya riset adalah hal yang dicegah skill ini. Bentuknya mengikuti permintaan: pertanyaan -> cari, laporkan, berhenti (tanpa edit sampai go, lihat audit-only); bagian dari pekerjaan -> riset di dalam loop.",
      en: "research has two halves, in order: this project's documents of record (tickets, spec/PRD, the triggering thread, plans/docs/ADRs/AGENTS.md, Figma, git log, vendored source) then prior art outside it (GitHub, arXiv, vendor docs, blogs/forums). Answering from memory and calling it research is what this skill exists to stop. The shape follows the ask: a question -> look it up, report, stop (no edits until a go, see audit-only); part of the work -> research inside the loop.",
    },
    useWhen: {
      id: ["User bilang research, look it up, sleuth GitHub, 'what do other people do', 'is that a thing', atau 'are you sure'.", "Permintaan yang jelas sudah pernah diselesaikan orang lain."],
      en: ["The user says research, look it up, sleuth GitHub, 'what do other people do', 'is that a thing', or 'are you sure'.", "A request that has obviously been solved before."],
    },
    avoidWhen: {
      id: ["Jawaban hanya butuh satu fakta yang sudah ada di konteks percakapan."],
      en: ["The answer needs one fact already in the conversation context."],
    },
    howItWorks: {
      id: ["Pilih kedalaman dan sebutkan: quick (satu fakta/API, 1-2 sumber), medium (3-6 sumber, bandingkan, rekomendasikan), very thorough (survei bidang, sebut kanon, opsi berurut ROI). Fan out dengan subagent paralel untuk keluasan.", "Dokumen of record dulu: tiket/spec, planning docs repo, Figma, git log -S<symbol> / git log -p, dan source vendored di node_modules.", "Lalu prior art: gh search repos/code, baca source asli (bukan README), catat lisensi; arXiv; dokumentasi/changelog vendor.", "Beri peringkat bukti: (1) dokumentasi vendor atau source yang dikirim, (2) pernyataan maintainer/paper/repo primer, (3) blog/forum/memori model (ditandai lemah)."],
      en: ["Pick a depth and say it: quick (one fact/API, 1-2 sources), medium (3-6 sources, compare, recommend), very thorough (survey the field, name the canon, ROI-ordered options). Fan out with parallel subagents for breadth.", "Documents of record first: tickets/specs, the repo's planning docs, Figma, git log -S<symbol> / git log -p, and vendored source in node_modules.", "Then prior art: gh search repos/code, read the real source (not the README), note the license; arXiv; vendor docs/changelogs.", "Grade the evidence: (1) vendor-documented or the shipping source, (2) maintainer statements/papers/primary repos, (3) blogs/forums/model memory (flagged as weak)."],
    },
    coreRules: {
      id: ["Setiap klaim non-obvious membawa URL; tanpa URL tulis 'unverified'.", "Bila dua dokumen bertentangan, katakan, jangan diam-diam memilih satu.", "Jangan menyebut sesuatu mustahil tanpa membuka dokumen atau source; hasilnya adalah rekomendasi dengan sumber di bawahnya, bukan tumpukan link."],
      en: ["Every non-obvious claim carries a URL; with no URL, write 'unverified'.", "When two documents disagree, say so instead of silently picking one.", "Do not call something impossible without opening the docs or source; the deliverable is the recommendation with sources under it, not a link dump."],
    },
    tips: {
      id: ["Bila riset menggerakkan perubahan, deskripsi PR memuat temuan dan alasannya (pr-update); untuk survei besar tanpa PR, tulis ke planning docs repo agar bertahan lebih lama dari chat.", "Berikan tiap subagent scope, level 'Thoroughness:', 'Do not edit files.', dan kontrak output (path+baris+kutipan, atau URL+teknik+lisensi)."],
      en: ["When research drives a change, the PR description carries the findings and why (pr-update); for a big survey with no PR, write it into the repo's planning docs so it outlives the chat.", "Give each subagent a scope, a 'Thoroughness:' level, 'Do not edit files.', and a return contract (path+line+quote, or URL+technique+license)."],
    },
    pairsWellWith: ["audit-only", "pr-update", "ui-system"],
    sourcePath: "skills/research/SKILL.md",
  },
  {
    name: "runtime-debug",
    category: "engineering",
    invocation: "user",
    description: {
      id: "Debug runtime/environment yang rusak dengan mengecek log dan observability dulu, baru kode.",
      en: "Debug broken runtime/environments by checking logs and observability first, then code.",
    },
    detailedDescription: {
      id: "runtime-debug dipakai saat URL, deploy, atau environment ephemeral/CI gagal saat runtime (bukan bug kode lokal). Lihat apa yang sebenarnya terjadi sebelum mengedit kode: reproduksi dan tangkap kegagalan nyata, cek observability (MCP observability seperti Datadog bila terhubung, atau log CI/container/Jenkins/cloud), temukan service/baris yang gagal dari bukti, lalu perbaiki penyebab sebenarnya.",
      en: "runtime-debug applies when a URL, deploy, or ephemeral/CI environment fails at runtime (not a local code bug). Look at what actually happened before editing code: reproduce and capture the real failure, check observability (an observability MCP such as Datadog when connected, else CI/container/Jenkins/cloud logs), locate the failing service/line from evidence, then fix the real cause.",
    },
    useWhen: {
      id: ["URL 500, deploy mati, atau environment ephemeral berperilaku salah.", "Kegagalan CI/container yang tampak sebagai masalah runtime, bukan kode lokal."],
      en: ["A URL 500s, a deploy is down, or an ephemeral env misbehaves.", "A CI/container failure that looks like a runtime issue rather than local code."],
    },
    avoidWhen: {
      id: ["Bug kode lokal yang bisa direproduksi tanpa environment (investigasi biasa)."],
      en: ["A local code bug reproducible without the environment (ordinary investigation)."],
    },
    howItWorks: {
      id: ["Reproduksi dan tangkap kegagalan nyata (status, error, request id, waktu).", "Cek observability dulu: log, trace, metrik; gunakan MCP observability bila tersedia, jika tidak log stream platform.", "Temukan service/baris gagal dari bukti, bukan tebakan.", "Perbaiki penyebab sebenarnya; jangan menambahkan perbaikan logging-saja lalu menyebutnya selesai."],
      en: ["Reproduce and capture the real failure (status, error, request id, time).", "Check observability first: logs, traces, metrics; use an observability MCP if available, otherwise the platform's log stream.", "Locate the failing service/line from evidence, not a guess.", "Fix the real cause; do not add logging-only 'fixes' and call it done."],
    },
    coreRules: {
      id: ["Jangan menulis ulang kode secara spekulatif sebelum membaca log.", "Jangan melaporkan 'fixed' tanpa memeriksa ulang runtime.", "Untuk konfigurasi lab/ephemeral yang disengaja (secret tes, fail-open), jangan membuat alarm palsu; biarkan env yang diperlukan."],
      en: ["Do not rewrite code speculatively before reading logs.", "Do not report fixed without re-checking the runtime.", "For intentional lab/ephemeral config (test secrets, fail-open), do not raise false alarms; leave required env in place."],
    },
    tips: {
      id: ["File upstream juga memuat catatan khusus (preview MR lokal, latensi preview riset, instalasi deploy pnpm) yang spesifik proyek asalnya.", "Untuk investigasi tanpa perubahan, mulai dari /audit-only atau /research."],
      en: ["The upstream file also carries notes specific to its origin projects (local MR preview, research preview latency, pnpm deployment installs).", "For investigation with no changes, start from /audit-only or /research."],
    },
    pairsWellWith: ["audit-only", "research"],
    sourcePath: "skills/runtime-debug/SKILL.md",
  },
  {
    name: "stacked-pr",
    category: "shipping",
    invocation: "user",
    description: {
      id: "Menangani PR bertumpuk/dependen dan kode yang sama di banyak base dengan benar: PR di atas PR lain, atau perubahan yang harus masuk ke default branch plus branch release/produksi.",
      en: "Handle dependent/stacked PRs and same-code-on-multiple-bases correctly: a PR stacked on another, or a change that must land on the default branch plus a release/production branch.",
    },
    detailedDescription: {
      id: "stacked-pr punya dua bagian. Stacked: PR anak dibangun di branch PR induk; perbarui dari bawah ke atas (induk dulu, lalu rebase anak ke induk yang sudah diperbarui, bukan ke default branch, dan tidak pernah 'merge main ke leaf' sebagai satu-satunya langkah), dengan base tiap PR menunjuk yang di bawahnya. Multi-base: beberapa org mewajibkan perubahan yang sama di default branch DAN branch release/produksi; PR kedua adalah target review baru yang butuh persetujuan developer eksplisitnya sendiri, tidak boleh menyalin approval QA dari PR saudara.",
      en: "stacked-pr has two halves. Stacked: a child PR builds on a parent PR's branch; update bottom-up (parent first, then rebase the child onto the updated parent, not onto the default branch, and never 'merge main into the leaf' as the only step), keeping each PR's base pointing at the one below. Multi-base: some orgs require the same change on the default branch AND a release/production branch; the second PR is a fresh review target that needs its own explicit developer approval and must not copy QA approval from the sibling.",
    },
    useWhen: {
      id: ["PR yang bertumpuk di atas PR lain.", "Perubahan yang sama harus mendarat di default branch dan branch release/produksi."],
      en: ["A PR stacked on another PR.", "The same change must land on the default branch and a release/production branch."],
    },
    avoidWhen: {
      id: ["PR tunggal biasa ke default branch (gunakan pr-update)."],
      en: ["An ordinary single PR to the default branch (use pr-update)."],
    },
    howItWorks: {
      id: ["Stacked: perbarui branch/PR induk, rebase anak ke induk yang diperbarui, push tiap level, jaga base tiap PR menunjuk ke bawahnya.", "Multi-base: konfirmasi branch target dari aturan repo, mendaratkan perubahan sekali lalu cherry-pick/port kode identik ke base lain sebagai PR kedua, catat saudara di tiap deskripsi.", "Perlakukan duplikat sebagai target review baru: minta reviewer/tim developer asli, pakai label review pending repo, lalu verifikasi assignee, permintaan review, dan label.", "Perkirakan integrasi sebelum mengubah branch dengan git merge-tree --write-tree --name-only <base> <head> (jumlah konflik adalah scope tekstual, bukan bukti kebenaran)."],
      en: ["Stacked: update the parent branch/PR, rebase the child onto the updated parent, push each level, keep each PR's base pointing at the one below.", "Multi-base: confirm the target branches from the repo's rules, land the change once then cherry-pick/port the identical code to the other base as a second PR, note the sibling in each description.", "Treat the duplicate as a fresh review target: request the original developer reviewer/team, use the repo's pending-review labels, then verify assignees, review requests, and labels.", "Estimate an integration before changing branches with git merge-tree --write-tree --name-only <base> <head> (conflict counts are textual scope, not proof of correctness)."],
    },
    coreRules: {
      id: ["Jangan meruntuhkan stack dengan merge default branch ke anak.", "Jangan biarkan kedua PR base saling menyimpang.", "Akhiri dengan daftar setiap PR/MR dalam stack sebagai tautan."],
      en: ["Do not collapse a stack by merging the default branch into the child.", "Do not let the two base PRs drift apart.", "Finish by listing every PR/MR in the stack as a link."],
    },
    tips: {
      id: ["Gunakan ticket-ship bila pekerjaan ini mengikuti tiket yang butuh release branch; verifikasi aturan org, jangan mengasumsikan."],
      en: ["Use ticket-ship when this follows a ticket that needs a release branch; verify the org's rule, never assume."],
    },
    pairsWellWith: ["pr-update", "pr-ready", "ticket-ship"],
    sourcePath: "skills/stacked-pr/SKILL.md",
  },
  {
    name: "ticket-ship",
    category: "shipping",
    invocation: "user",
    description: {
      id: "Bawa tiket tracker sampai shipped: temukan atau mulai PR, dorong sampai mergeable, perbarui state tiket, draft pesan stakeholder.",
      en: "Take a tracker ticket through to shipped: find or start the PR, drive it to mergeable, update the ticket state, draft the stakeholder message.",
    },
    detailedDescription: {
      id: "ticket-ship adalah bagian bentuk-tiket dari shipping; mekanik PR hidup di skill lain. Skill membaca tiket dan komentar terbarunya, mendaftar PR yang ada, memastikan base branch yang benar, menemukan atau memulai PR (work lalu pr-update), mendorongnya mergeable (pr-ready) dan memolesnya (clean), memilih state handoff hanya setelah membaca panduan tiket/label repo, dan menyusun (bukan mengirim) pesan stakeholder.",
      en: "ticket-ship is the ticket-shaped part of shipping; PR mechanics live in other skills. It reads the ticket and its latest comments, lists existing PRs, confirms the correct base branch(es), finds or starts the PR (work then pr-update), drives it mergeable (pr-ready) and polishes it (clean), picks the handoff state only after reading the repo's ticket/label guidance, and drafts (never sends) the stakeholder update.",
    },
    useWhen: {
      id: ["Tiket Jira/Linear (atau acli) yang ditugaskan kepada Anda perlu dibawa sampai shipped."],
      en: ["A Jira/Linear (or acli) ticket assigned to you needs to be taken through to shipped."],
    },
    avoidWhen: {
      id: ["Pekerjaan tanpa tiket tracker (gunakan cpr atau pr-update)."],
      en: ["Work without a tracker ticket (use cpr or pr-update)."],
    },
    howItWorks: {
      id: ["Baca tiket dan komentar terbarunya (acli dengan --fields summary,description,status,comment,issuelinks --json; tampilan default tidak memuat komentar), lalu daftar PR yang ada dan baca diff-nya, bukan hanya body.", "Konfirmasi base branch (kadang release branch plus default, lihat stacked-pr); jangan mengasumsikan.", "Temukan atau mulai PR (work -> pr-update), dorong mergeable (pr-ready), poles sebelum handoff (clean).", "Baca panduan tiket/label repo sebelum memilih state handoff, lalu draft update stakeholder (Slack atau komentar tiket) singkat lewat no-tropes; jangan kirim kecuali diminta."],
      en: ["Read the ticket and its latest comments (acli with --fields summary,description,status,comment,issuelinks --json; the default view omits comments), then list existing PRs and read their diffs, not just bodies.", "Confirm the base branch(es) (sometimes a release branch plus the default, see stacked-pr); never assume.", "Find or start the PR (work -> pr-update), drive it mergeable (pr-ready), polish before handoff (clean).", "Read the repo's ticket/label guidance before choosing a handoff state, then draft the stakeholder update (Slack or ticket comment) short and through no-tropes; do not send unless asked."],
    },
    coreRules: {
      id: ["Jangan mengasumsikan base branch.", "Jangan menandai tiket selesai selagi CI merah atau review thread terbuka.", "Jangan biarkan tiket dan PR menceritakan kisah yang berbeda tentang state pekerjaan."],
      en: ["Do not assume the base branch.", "Do not mark the ticket done while CI is red or review threads are open.", "Do not let the ticket and the PR tell different stories about the state of the work."],
    },
    tips: {
      id: ["Baca diff PR yang ada: commit lanjutan bisa membuat klaim implementasi di body usang.", "Komentar tiket bisa memuat scope QA yang dibuka ulang; baca sebelum menganggapnya selesai."],
      en: ["Read the existing PR diff: follow-up commits can invalidate the body's implementation claims.", "Ticket comments can contain reopened QA scope; read them before treating it as done."],
    },
    pairsWellWith: ["work", "pr-update", "pr-ready", "clean", "stacked-pr"],
    sourcePath: "skills/ticket-ship/SKILL.md",
  },
  {
    name: "triage",
    category: "review",
    invocation: "user",
    description: {
      id: "Triase issue sebagai maintainer: selidiki terhadap upstream saat ini, buktikan disposisi, dan miliki perbaikannya; gabungkan PR yang bersaing menjadi satu PR pengganti milik maintainer per cluster akar masalah.",
      en: "Triage issues as a maintainer: investigate against current upstream, prove the disposition, and own the fix; consolidate competing PRs into one maintainer-owned replacement per root-cause cluster.",
    },
    detailedDescription: {
      id: "triage (frontmatter upstream: 'Use when triaging issues as a maintainer.') menyelidiki issue terhadap default branch terkini, membuktikan disposisi, dan memiliki perbaikan untuk bug nyata: PR yang bersaing digabung menjadi satu PR pengganti per cluster akar masalah, dengan kredit kontributor dipertahankan; implementasi tidak dilempar balik ke pelapor atau kontributor. Skill ini independen terhadap agent dan repo. Bare /triage berarti investigasi + verdict dulu tanpa menulis ke forge; 'fix', 'ship', 'execute', atau 'go' mengotorisasi scope implementasi/publikasi yang disepakati.",
      en: "triage (upstream frontmatter: 'Use when triaging issues as a maintainer.') investigates issues against the current default branch, proves the disposition, and owns the fix for a real bug: competing PRs are consolidated into one maintainer-owned replacement per root-cause cluster with contributor credit preserved; implementation is not bounced back to reporters or contributors. The skill is agent- and repository-independent. Bare /triage means investigate + verdict first with no forge writes; 'fix', 'ship', 'execute', or 'go' authorizes the agreed implementation/publishing scope.",
    },
    useWhen: {
      id: ["/triage <URL issue, nomor, rentang, atau query>; thread/laporan yang ditempel juga valid sebagai intake.", "Sapuan backlog, investigasi duplikat/resolved, dan pass issue-ke-fix sebagai maintainer."],
      en: ["/triage <issue URLs, numbers, range, or query>; a pasted report/thread is valid intake.", "Backlog sweeps, duplicate/resolution investigations, and issue-to-fix maintainer passes."],
    },
    avoidWhen: {
      id: ["Review khusus PR (pr-triage) atau CI/review PR yang sudah dimiliki (pr-ready).", "Menutup issue karena umur, popularitas, atau selera produk spekulatif."],
      en: ["PR-only review (pr-triage) or CI/reviews of an already-owned PR (pr-ready).", "Closing issues because of age, popularity, or speculative product taste."],
    },
    howItWorks: {
      id: ["1. Bangun basis bukti: tentukan upstream kanonis dan forge, pin SHA default branch, daftar persis issue yang diminta (batch: baca references/batches.md).", "2. Baca, cari, dan cluster: baca seluruh issue, komentar, timeline; cari issue dan PR terbuka/tertutup/merged; satu cluster per akar masalah bersama.", "3. Verifikasi realitas di default branch: telusuri call chain, reproduksi dengan probe terkecil nyata, bedakan reproduced / statically demonstrated / not reproduced / blocked.", "4. Pilih disposisi: fix, duplicate, resolved, not-a-bug, feature-request, needs-evidence, atau skipped, masing-masing dengan bukti wajib.", "5. Fix sekali (konsolidasi PR terkait ke satu target milik maintainer, kredit semua kontributor, periksa efek samping sebelum publikasi), 6. publikasikan lewat cpr lalu rekonsiliasi: supersede dan tutup sumber hanya setelah pengganti siap."],
      en: ["1. Establish the evidence base: resolve canonical upstream and forge, pin the default-branch SHA, enumerate exactly the requested issues (batches: read references/batches.md).", "2. Read, search, and cluster: read the whole issue, comments, timeline; search open/closed issues and PRs; one cluster per shared root cause.", "3. Verify reality on the default branch: trace the call chain, reproduce with the narrowest real probe, distinguish reproduced / statically demonstrated / not reproduced / blocked.", "4. Choose a disposition: fix, duplicate, resolved, not-a-bug, feature-request, needs-evidence, or skipped, each with required evidence.", "5. Fix once (consolidate related PRs into one maintainer-owned target, credit every contributor, screen for side effects before publishing), 6. publish via cpr then reconcile: supersede and close sources only after the replacement is ready."],
    },
    coreRules: {
      id: ["Companion skills wajib: work, cpr, clean, pr-update, pr-ready, no-tropes, ui-only, dan ui-system; install bersama direktori lengkap termasuk references/batches.md.", "Bukti harus mencakup setiap persyaratan dan varian belakangan sebelum 'resolved'/'duplicate'; 'fixed on main' bukan 'released'.", "Authorized fix-and-ship menyertakan rebase auto-merge untuk PR low-risk saat dibuka; perubahan berisiko atau UI/UX/fitur/inti yang mungkin regresi tetap manual."],
      en: ["Required companion skills: work, cpr, clean, pr-update, pr-ready, no-tropes, ui-only, and ui-system; install them together with the whole directory including references/batches.md.", "Evidence must cover every requirement and later variant before 'resolved'/'duplicate'; 'fixed on main' is not 'released'.", "An authorized fix-and-ship run includes rebase auto-merge for eligible low-risk PRs when opened; risky changes or plausible UI/UX/feature/core regressions stay manual."],
    },
    tips: {
      id: ["Unresolved issue tetap terbuka sampai fix mendarat di default branch kanonis; closing keyword yang menstage penutupan, bukan penutupan manual.", "Isi komentar lewat file (--body-file), bukan string shell inline, agar backtick tidak menghapus SHA dan identifier."],
      en: ["Unresolved issues stay open until the fix lands on the canonical default branch; closing keywords stage the closure, do not close manually.", "Post comment bodies via a file (--body-file), not an inline shell string, so backticks do not strip SHAs and identifiers."],
    },
    pairsWellWith: ["pr-triage", "work", "cpr", "clean", "pr-update", "pr-ready", "no-tropes", "ui-only", "ui-system"],
    sourcePath: "skills/triage/SKILL.md",
  },
  {
    name: "ui-only",
    category: "visual",
    invocation: "user",
    description: {
      id: "Saat mengiterasi UI, jangan buang waktu untuk tsc, lint, typecheck, format, test suite penuh, commit, atau push sampai user menyukai tampilan dan perilakunya.",
      en: "While iterating on UI, do not waste time on tsc, lint, typecheck, format, full test suites, commit, or push until the user likes how it looks and works.",
    },
    detailedDescription: {
      id: "ui-only tidak membatasi file yang boleh diubah; ia mengatur apa yang BELUM dijalankan. Saat mengubah tampilan atau interaksi, dapatkan UI-nya benar dulu: jangan tsc/typecheck/build sebagai langkah akhir, eslint/prettier/biome, test suite penuh hanya untuk meng-greenlight commit, atau git commit/push/buka PR sebagai 'selesai'. Dev server, screenshot, dan run bertarget yang diperlukan untuk melihat atau memakai UI tetap boleh.",
      en: "ui-only does not restrict which files may change; it governs what NOT to run yet. When changing how something looks or interacts, get the UI right first: no tsc/typecheck/build as a finish step, no eslint/prettier/biome, no full test suites just to greenlight a commit, no git commit/push/opening the PR as done. A dev server, screenshots, and targeted runs needed to see or use the UI are fine.",
    },
    useWhen: {
      id: ["Pekerjaan UI/UX, layout, redesign, implementasi Figma, polesan visual, 'make it look right'.", "User ingin melihat UI sebelum cleanup."],
      en: ["UI/UX work, layout, redesign, Figma implementation, visual polish, 'make it look right'.", "The user wants to see the UI before cleanup."],
    },
    avoidWhen: {
      id: ["Pekerjaan backend saja."],
      en: ["Backend-only work."],
    },
    howItWorks: {
      id: ["Ubah UI.", "Tunjukkan (atau beri tahu cara melihatnya).", "Terima umpan balik dan iterasi.", "Saat user bilang bagus / lgtm / 'clean it' / 'commit it', baru jalankan cek, gunakan clean, commit, dan hal lain yang dibutuhkan repo."],
      en: ["Change the UI.", "Show it (or tell them how to look).", "Take feedback and iterate.", "When they say it is good / lgtm / 'clean it' / 'commit it', then run checks, use clean, commit, and whatever else the repo needs."],
    },
    coreRules: {
      id: ["Jangan menjalankan dev server yang sudah dijalankan user; anggap sudah hidup kecuali dikatakan lain.", "Biarkan debug logging selagi masih ada yang rusak; hapus hanya setelah berfungsi.", "Jika ragu apakah terus iterasi, tanyakan."],
      en: ["Do not start a dev server the user already has running; assume it is up unless told otherwise.", "Keep debug logging in place while something is still broken; remove it only once it works.", "If unsure whether to keep iterating, ask."],
    },
    tips: {
      id: ["Berlaku untuk semua permukaan UI (web, desktop, TUI); lewati untuk pekerjaan backend.", "Untuk primitive dan token, gunakan juga ui-system; setelah user menyukainya, konfirmasi terhadap desain dengan visual-verify."],
      en: ["Applies to any UI surface (web, desktop, TUI); skip for backend-only work.", "For primitives and tokens, also use ui-system; once they like it, confirm against the design with visual-verify."],
    },
    pairsWellWith: ["ui-system", "visual-verify", "clean"],
    sourcePath: "skills/ui-only/SKILL.md",
  },
  {
    name: "ui-system",
    category: "visual",
    invocation: "model",
    description: {
      id: "Pakai ulang primitive UI, CSS var, dan pola DESIGN.md yang sudah ada alih-alih menciptakan tombol, warna, border, bayangan, atau helper baru, termasuk saat mengimplementasi Figma, mock, atau screenshot.",
      en: "Reuse existing UI primitives, CSS vars, and DESIGN.md patterns instead of inventing new buttons, colors, borders, shadows, or helpers, including when implementing a Figma file, mock, or screenshot.",
    },
    detailedDescription: {
      id: "ui-system: pakai ulang apa yang sudah dimiliki app dan jangan membuat UI kit paralel. Baca DESIGN.md/dokumen area, cari komponen atau helper yang ada dan salin cara permukaan lain memakainya, utamakan varian pada primitive yang ada daripada komponen baru, ambil warna/spasi/tipografi dari CSS var atau token yang ada, dan cocokkan tampilan app (bila app tidak memakai border/bayangan/sparkle, fitur Anda juga tidak). Hover dicat seketika; hanya exit yang di-ease. File upstream juga berisi bagian panjang khusus kasus (composer Hermes Desktop, mencocokkan referensi brand, navigasi Settings, preferensi tema, badge brand, tipografi).",
      en: "ui-system: reuse what the app already has; do not invent a parallel UI kit. Read DESIGN.md/area docs, find the existing component or helper and copy how other surfaces use it, prefer a variant on an existing primitive over a new component, take colors/spacing/type from existing CSS vars or tokens, and match the app's look (if the app does not use borders/shadows/sparkles, neither does your feature). Hover paints instantly; only the exit eases. The upstream file also has long case-specific sections (Hermes Desktop composer, matching a brand reference, Settings navigation, theme preferences, brand badges, typography).",
    },
    useWhen: {
      id: ["Pekerjaan UI Desktop/web/TUI, redesign, atau saat user menyebut shared primitives, tw4, Figma, atau pola UI.", "Mengimplementasi file Figma, mock, atau screenshot."],
      en: ["Desktop/web/TUI UI work, redesigns, or when the user mentions shared primitives, tw4, Figma, or UI patterns.", "Implementing a Figma file, mock, or screenshot."],
    },
    avoidWhen: {
      id: ["Pekerjaan backend saja tanpa permukaan UI."],
      en: ["Backend-only work with no UI surface."],
    },
    howItWorks: {
      id: ["Baca DESIGN.md / dokumen area, lalu cari komponen/helper yang ada (button, input, dialog, progress, relative-time, dropdown, back row) dan tiru cara Settings/Projects memakainya.", "Utamakan varian pada primitive yang ada; warna/spasi/tipe dari CSS var/token yang ada (termasuk setup Tailwind v4 app).", "Dari desain: tarik konteks desain (Figma MCP bila ada, atau screenshot/mock), petakan ke primitive dan token, struktur dulu baru konten, cocokkan spasi, padding, kontras, dan state persis, optimalkan aset (SVGO).", "Hover: transisi di state diam dan dimatikan saat hover (mis. transition-colors duration-100 hover:transition-none); audit tiap hover yang Anda tambah."],
      en: ["Read DESIGN.md / area docs, then find the existing component/helper (button, input, dialog, progress, relative-time, dropdown, back row) and copy how Settings/Projects use it.", "Prefer a variant on an existing primitive; colors/spacing/type from existing CSS vars/tokens (including the app's Tailwind v4 setup).", "From a design: pull the design context (Figma MCP if available, else the screenshot/mock), map to existing primitives and tokens, structure first then content, match spacing, padding, contrast, and states exactly, optimize assets (SVGO).", "Hover: put the transition on the resting state and drop it while hovered (e.g. transition-colors duration-100 hover:transition-none); audit every hover you add."],
    },
    coreRules: {
      id: ["Jangan buat implementasi button/input/modal baru, palet warna lokal, atau chrome dekoratif; jangan duplikasi formatter (waktu, dll.).", "Jangan menambah border, background, bayangan, sparkle, atau badge yang tidak dipakai permukaan sekitar; jangan membuat chrome section yang tidak dipakai di tempat lain.", "Jika primitive tidak ketemu, cari lebih keras atau tanya; jangan diam-diam membuatnya."],
      en: ["No new button/input/modal implementations, local color palettes, or decorative chrome; no duplicate formatters (time, etc.).", "No new borders, backgrounds, shadows, sparkles, or badges the surrounding app does not already use; no section chrome used nowhere else.", "If you cannot find the primitive, search harder or ask; do not quietly make one."],
    },
    tips: {
      id: ["Selagi masih mengiterasi tampilan, ikuti ui-only; setelah user menyukainya, konfirmasi terhadap desain dengan visual-verify."],
      en: ["While still iterating on look, follow ui-only; once the user likes it, confirm against the design with visual-verify."],
    },
    pairsWellWith: ["ui-only", "visual-verify"],
    sourcePath: "skills/ui-system/SKILL.md",
  },
  {
    name: "visual-verify",
    category: "visual",
    invocation: "user",
    description: {
      id: "Verifikasi UI yang dirender terhadap referensi desainnya.",
      en: "Verify rendered UI against its design reference.",
    },
    detailedDescription: {
      id: "visual-verify (frontmatter upstream: 'Use to verify rendered UI against its design reference.') melarang melaporkan perubahan visual, layout, atau tema sebagai selesai berdasarkan diff atau test yang lulus: lihat permukaan yang berjalan. Jalankan permukaan nyata, tangkap tampilannya, bandingkan dengan referensi (Figma/mock, permukaan saudara, atau state sebelumnya) dengan menyebut hal spesifik yang dicek, lalu bagikan bukti render dan perbandingan. Pencocokan Figma/screenshot mengikuti references/screenshot-overlays.md dengan utilitas bawaan atau harness yang sudah ada.",
      en: "visual-verify (upstream frontmatter: 'Use to verify rendered UI against its design reference.') forbids reporting a visual, layout, or theme change as done based on the diff or a passing test: look at the running surface. Run the actual surface, capture how it looks, compare against the reference (Figma/mock, the sibling surface, or the before state) naming the specific things checked, then share the clean render and comparison evidence. Figma/screenshot matching follows references/screenshot-overlays.md using the bundled utility or an existing harness.",
    },
    useWhen: {
      id: ["Setelah perubahan visual/layout/tema, sebelum menyatakannya selesai.", "Membandingkan UI dengan desain Figma/mock atau permukaan saudara."],
      en: ["After a visual/layout/theme change, before calling it done.", "Comparing a UI with its Figma/mock design or a sibling surface."],
    },
    avoidWhen: {
      id: ["Pekerjaan backend saja."],
      en: ["Backend-only work."],
    },
    howItWorks: {
      id: ["Jalankan permukaan nyata (dev server, app, TUI/GUI, Storybook); jangan mulai yang sudah dijalankan user.", "Tangkap tampilannya (screenshot atau beri tahu user cara melihatnya).", "Bandingkan dengan referensi dan sebut hal spesifik yang dicek (nilai warna, spasi, border, state aktif, kontras).", "Jika tidak cocok, pertahankan debug logging dan iterasi; katakan 'done' hanya bila visibel cocok. Bagikan render bersih dan bukti perbandingan (viewport/state, delta terukur, deviasi yang disetujui, state yang belum diverifikasi), dengan paritas visual, QA fungsional, dan persetujuan user dipisah."],
      en: ["Run the actual surface (dev server, app, TUI/GUI, Storybook); do not start one the user already has running.", "Capture how it looks (screenshot, or tell the user how to see it).", "Compare against the reference and name the specific things checked (color values, spacing, border, active state, contrast).", "If it does not match, keep the debug logging and iterate; say 'done' only once it visibly matches. Share the clean render and comparison evidence (viewport/state, measured deltas, approved deviations, unverified states), keeping visual parity, functional QA, and the user's approval separate."],
    },
    coreRules: {
      id: ["Jangan mengklaim perubahan tema/warna berfungsi karena matematika token tampak benar; verifikasi nilai yang dirender.", "Jangan menghapus instrumentasi selagi visual masih salah.", "Jangan percaya unit test sebagai bukti UI dirender dengan benar."],
      en: ["Do not claim a theme/color change works because the token math looks right; verify the rendered value.", "Do not delete instrumentation while the visual is still wrong.", "Do not trust unit tests as proof a UI renders correctly."],
    },
    tips: {
      id: ["Skill membawa referensi dan alat: references/screenshot-overlays.md, scripts (compare.py, selftest.py), dan templates/viewer.html.", "Untuk motion, nilai dari still berurutan pada waktu film tetap (6-8 still, ditata dengan ffmpeg concat dengan daftar file eksplisit), bukan rekaman video."],
      en: ["The skill ships a reference and tooling: references/screenshot-overlays.md, scripts (compare.py, selftest.py), and templates/viewer.html.", "For motion, judge from ordered stills at fixed film-clock times (6-8 stills, tiled with ffmpeg concat and an explicit file list), not a video recording."],
    },
    pairsWellWith: ["ui-system", "ui-only"],
    sourcePath: "skills/visual-verify/SKILL.md",
  },
  {
    name: "work",
    category: "engineering",
    invocation: "user",
    description: {
      id: "Mulai task di git worktree terisolasi yang baru, bukan di checkout saat ini. Dipakai saat user memanggil /work (opsional dengan slug atau deskripsi).",
      en: "Kick off a task in a fresh isolated git worktree instead of the current checkout. Use when the user invokes /work (optionally with a slug or description).",
    },
    detailedDescription: {
      id: "/work [slug] adalah deklarasi untuk task ini: 'buat worktree khusus dan kerjakan di sana'. Berlaku untuk apa yang sedang dimulai, bukan aturan tetap bahwa semua pekerjaan selalu di worktree. Skill membaca konvensi repo (prefiks branch, nama dan lokasi direktori worktree, default branch) dan menirunya, bukan memakai pola tetap; base-nya default branch kecuali user menyebut lain.",
      en: "/work [slug] is a declaration for this task: 'spin up a dedicated worktree and do the work there'. It applies to what the user is starting right now, not a standing rule that all work always happens in worktrees. The skill reads the repo's conventions (branch prefix, worktree directory name and location, default branch) and copies them rather than using a fixed pattern; the base is the default branch unless the user names another.",
    },
    useWhen: {
      id: ["User memanggil /work untuk memulai sesuatu yang baru tanpa menyentuh working tree-nya.", "Memulai fitur/perbaikan saat checkout utama tidak boleh disentuh."],
      en: ["The user invokes /work to start something new without touching their working tree.", "Starting a feature/fix while the primary checkout must stay untouched."],
    },
    avoidWhen: {
      id: ["Mereview PR orang lain yang sudah ada (gunakan pr-triage).", "Perubahan kecil satu baris yang sengaja dikerjakan di checkout saat ini."],
      en: ["Reviewing an existing PR of someone else (use pr-triage).", "A trivial one-line edit deliberately made in the current checkout."],
    },
    howItWorks: {
      id: ["Baca konvensi repo: git worktree list, git branch -a --sort=-committerdate, dan default branch dari git remote show origin.", "Tiru prefiks branch yang dominan (tidak jelas -> tanya), lokasi/nama direktori worktree saudara (umumnya <repo>-<short> di samping checkout utama), dan slug dari argumen /work atau deskripsi task.", "Buat worktree + branch dari origin/<default> (git worktree add -b <prefix>/<slug> ...), lalu cd ke sana; pakai ulang worktree/branch yang cocok bila sudah ada.", "Kerjakan di worktree, serahkan path worktree dan cara menjalankannya; shipping = commit, push, buka PR/MR ke default branch; cleanup = tawarkan hapus worktree yang branch-nya sudah merged."],
      en: ["Read the repo's conventions: git worktree list, git branch -a --sort=-committerdate, and the default branch from git remote show origin.", "Mirror the dominant branch prefix (unclear -> ask), the sibling worktree location/naming (commonly <repo>-<short> next to the primary checkout), and the slug from the /work argument or task description.", "Create the worktree + branch from origin/<default> (git worktree add -b <prefix>/<slug> ...), then cd into it; reuse a matching worktree/branch if one already exists.", "Do the task in the worktree and hand off the worktree path and how to run it; shipping = commit, push, open a PR/MR to the default branch; cleanup = offer to remove worktrees whose branch is already merged."],
    },
    coreRules: {
      id: ["Kerjakan di worktree, tidak pernah di checkout utama dan tidak pernah di worktree agent lain.", "Tidak pernah git stash di worktree: refs/stash dibagi semua worktree repo, jadi agent paralel bisa mem-pop milik Anda; commit WIP atau salin file ke samping (git show HEAD:<path>).", "Aturan khusus Hermes: setiap worker/subagent punya worktree hermes-agent sendiri, perbaikan memakai branch bb/*, verifikasi di worktree detached pada origin/main, tiap worktree menjalankan npm ci sendiri, dan jangan edit/install/build/test di ~/Developer/hermes-agent."],
      en: ["Work in the worktree, never in the primary checkout and never in another agent's worktree.", "Never git stash in a worktree: refs/stash is shared by every worktree of the repo, so a parallel agent can pop your entry; commit WIP or copy the file aside (git show HEAD:<path>).", "Hermes-specific rules: every worker/subagent gets its own hermes-agent worktree, fixes use a bb/* branch, verification runs in a detached worktree at origin/main, each worktree runs its own npm ci, and never edit/install/build/test in ~/Developer/hermes-agent."],
    },
    tips: {
      id: ["Utamakan eksekusi langsung untuk perbaikan terfokus; subagent hanya untuk pekerjaan independen yang substansial.", "Default ke pnpm untuk perintah paket JavaScript bila repo mendukungnya; hormati kontrak package manager/lockfile yang sudah ada.", "UI -> ui-only + ui-system."],
      en: ["Prefer direct execution for focused fixes; reserve subagents for substantial independent work.", "Default to pnpm for JavaScript package commands when the repo supports it; respect an existing package-manager/lockfile contract.", "UI -> ui-only + ui-system."],
    },
    pairsWellWith: ["ui-only", "ui-system", "pr-triage", "pr-update"],
    sourcePath: "skills/work/SKILL.md",
  },
]
