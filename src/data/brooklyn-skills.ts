import type { BilingualString, BilingualList } from '@/types/skill'

export const BROOKLYN_SOURCE_REPO = 'github.com/OutThisLife/brooklyn-skills'
export const BROOKLYN_SOURCE_SHA = '037ad3ca8efc0f4fce9d34346e969966b96e57df'
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
      id: "Mode investigasi baca-saja: jawab dan laporkan temuan terlebih dahulu tanpa mengubah baris kode apapun.",
      en: "Read-only investigation mode: answer and report findings first, changing zero code.",
    },
    detailedDescription: {
      id: "audit-only mengunci agen ke mode read-only yang ketat saat menginvestigasi bug atau arsitektur. Agen memeriksa file dan menjalankan inspeksi tanpa membuat edit, commit, atau patch apapun sebelum rencana disetujui.",
      en: "audit-only locks the agent into a strict read-only mode during bug or architectural investigations. The agent inspects codebases and runs read-only commands without making edits or commits until findings are reviewed.",
    },
    useWhen: {
      id: ["Menginvestigasi akar masalah bug tanpa risiko merusak codebase.", "Melakukan audit arsitektur atau keamanan codebase.", "Membuat laporan analisis sebelum memutuskan solusi teknis."],
      en: ["Investigating root causes without risking changes to the codebase.", "Conducting architectural or security audits.", "Generating analysis reports before committing to technical solutions."],
    },
    avoidWhen: {
      id: ["Saat sudah siap mengimplementasikan kode atau perbaikan."],
      en: ["When ready to actively write code or implement bugfixes."],
    },
    howItWorks: {
      id: ["Aktifkan batasan read-only pada seluruh tool penulisan file.", "Analisis codebase melalui pembacaan file dan penelusuran riwayat git.", "Kumpulkan bukti konkret mengenai akar permasalahan.", "Sajikan laporan temuan terstruktur dengan rekomendasi langkah."],
      en: ["Enforce read-only constraints across all file-writing tools.", "Analyze the codebase via file inspection and git history.", "Collect concrete evidence regarding the underlying problem.", "Deliver a structured findings report with actionable recommendations."],
    },
    coreRules: {
      id: ["Dilarang memodifikasi file atau menjalankan perintah yang mengubah state.", "Sajikan temuan berbasis file dan nomor baris konkret."],
      en: ["Never modify files or run state-mutating commands.", "Ground all findings in specific file paths and line numbers."],
    },
    tips: {
      id: ["Gunakan di awal saat menghadapi insiden kritis di lingkungan produksi.", "Kombinasikan dengan /runtime-debug jika membutuhkan analisis log."],
      en: ["Use early when diagnosing critical incidents in production environments.", "Pair with /runtime-debug when log analysis is required."],
    },
    pairsWellWith: ["runtime-debug", "research", "work"],
    sourcePath: "skills/audit-only/SKILL.md",
  },
  {
    name: "babysit",
    category: "shipping",
    invocation: "user",
    description: {
      id: "Pantau PR/MR terbuka hingga seluruh checks CI hijau atau merged; pemicu otomatis untuk job yang tersendat.",
      en: "Watch an open PR/MR until it is green or merged; poll checks and kick stalled jobs.",
    },
    detailedDescription: {
      id: "babysit memantau Pull Request secara otonom hingga status CI lulus 100%. Skill ini secara berkala memeriksa status GitHub Actions, mengidentifikasi kegagalan tes flaky, dan melaporkan blocker nyata secara cepat.",
      en: "babysit watches open Pull Requests autonomously until all CI checks pass. It polls GitHub Actions status, identifies flaky test failures, and immediately surfaces actionable blockers.",
    },
    useWhen: {
      id: ["Menunggu hasil CI GitHub Actions setelah membuka atau memperbarui PR.", "Memantau PR penting agar segera dapat digabungkan (auto-merge).", "Mendeteksi test runner yang macet atau kehabisan waktu."],
      en: ["Waiting on GitHub Actions CI results after opening or updating PRs.", "Monitoring mission-critical PRs for immediate merge readiness.", "Detecting stalled or timed-out test runners."],
    },
    avoidWhen: {
      id: ["Kode lokal belum di-push ke remote repository."],
      en: ["Local commits have not yet been pushed to the remote repository."],
    },
    howItWorks: {
      id: ["Ambil ID atau nomor PR target melalui gh pr view.", "Lakukan polling berkala terhadap commit status dan checks.", "Jika seluruh checks hijau, verifikasi kesiapan merge.", "Jika ada check gagal, ambil cuplikan log kegagalan dan laporkan."],
      en: ["Resolve target PR number via gh pr view.", "Poll commit status and GitHub check suites periodically.", "If all checks turn green, verify merge readiness.", "If a check fails, pull relevant failure logs and report immediately."],
    },
    coreRules: {
      id: ["Tanggung jawab engineer belum selesai sebelum CI hijau.", "Hentikan pemantauan jika mendeteksi kegagalan tes non-flaky nyata."],
      en: ["An engineer's responsibility does not end before CI is green.", "Halt polling immediately when real non-flaky test failures occur."],
    },
    tips: {
      id: ["Panggil langsung setelah /cpr agar tidak perlu menunggu CI secara manual.", "Aktifkan notifikasi otomatis saat CI selesai."],
      en: ["Call immediately after /cpr to avoid manual CI watching.", "Enable automated notifications when checks conclude."],
    },
    pairsWellWith: ["cpr", "pr-ready", "ticket-ship"],
    sourcePath: "skills/babysit/SKILL.md",
  },
  {
    name: "clean",
    category: "shipping",
    invocation: "user",
    description: {
      id: "Poles git diff secara mandiri dengan prinsip KISS/DRY dan gaya lokal sebelum serah-terima ke review.",
      en: "Polish your git diff by hand using KISS/DRY and local style before review handoff.",
    },
    detailedDescription: {
      id: "clean melakukan pembersihan diff sebelum review. Menghilangkan console.log sementara, kode komentar mati, impor yang tidak terpakai, dan file sementara agar PR tetap ramping, terfokus, dan mudah ditinjau.",
      en: "clean performs pre-review diff hygiene. It strips temporary console.log calls, dead commented code, unused imports, and scratch files so the PR stays lean, focused, and reviewable.",
    },
    useWhen: {
      id: ["Sebelum membuat commit atau membuka Pull Request.", "Membersihkan artefak debugging yang tertinggal selama pengerjaan.", "Memastikan kode baru mematuhi standar formatting dan lint lokal."],
      en: ["Before committing changes or opening a Pull Request.", "Removing leftover debugging artifacts from development.", "Ensuring new code strictly adheres to local formatting and linting."],
    },
    avoidWhen: {
      id: ["Merombak arsitektur besar di luar cakupan task yang sedang dikerjakan."],
      en: ["Attempting major architectural refactors outside current task scope."],
    },
    howItWorks: {
      id: ["Periksa git diff uncommitted baris demi baris.", "Hapus baris debug, komentar sisa, dan import tak terpakai.", "Jalankan formatter dan linter proyek.", "Pastikan diff hanya memuat perubahan yang relevan dengan tiket."],
      en: ["Inspect the uncommitted git diff line by line.", "Remove debug statements, scratch comments, and unused imports.", "Run local project linter and formatter suites.", "Confirm the diff contains only changes relevant to the ticket."],
    },
    coreRules: {
      id: ["PR adalah publikasi resmi, bukan tempat membuang coretan kerja.", "Pertahankan konvensi penamaan dan gaya file lokal yang sudah ada."],
      en: ["A PR is a formal publication, not a scratchpad dump.", "Preserve existing local naming conventions and coding styles."],
    },
    tips: {
      id: ["Jalankan bersamaan dengan /no-tropes untuk memoles deskripsi commit.", "Selalu verifikasi ulang dengan git status setelah pembersihan."],
      en: ["Run alongside /no-tropes to polish commit messages and comments.", "Always re-verify with git status after cleanup."],
    },
    pairsWellWith: ["cpr", "no-tropes", "visual-verify"],
    sourcePath: "skills/clean/SKILL.md",
  },
  {
    name: "cpr",
    category: "shipping",
    invocation: "user",
    description: {
      id: "Bersihkan diff (clean), lalu buka atau perbarui PR/MR dalam satu pass cepat.",
      en: "Clean the diff, then open or update the PR/MR in a single fast pass.",
    },
    detailedDescription: {
      id: "cpr (Clean + PR) menggabungkan pembersihan diff dan pembuatan PR menjadi satu alur efisien. Memastikan kode bersih, menjalankan lint/typecheck, lalu mempublikasikan PR dengan deskripsi ringkas dan berkualitas.",
      en: "cpr (Clean + PR) merges diff cleanup and PR opening into one seamless flow. It cleans code, verifies local checks, and creates or updates the PR with a concise, high-signal description.",
    },
    useWhen: {
      id: ["Task implementasi selesai dan siap diajukan untuk code review.", "Mempublikasikan perubahan baru ke cabang PR yang sudah terbuka.", "Menghemat waktu dengan menjalankan alur shipping dalam satu perintah."],
      en: ["Implementation task is done and ready for formal review.", "Pushing new updates to an existing open PR branch.", "Saving time by running the shipping pipeline in one command."],
    },
    avoidWhen: {
      id: ["Tes unit atau build lokal masih mengalami kegagalan."],
      en: ["Local tests or builds are currently failing."],
    },
    howItWorks: {
      id: ["Jalankan pembersihan diff lokal (hapus debug log & dead code).", "Jalankan quality gates (typecheck, lint, test).", "Commit perubahan dengan pesan deskriptif.", "Buka atau perbarui PR via GitHub CLI dengan deskripsi terstruktur."],
      en: ["Perform local diff cleanup (strip debug logs and dead code).", "Run local quality gates (typecheck, lint, test).", "Commit changes with a clear, descriptive message.", "Open or update the PR via GitHub CLI with structured notes."],
    },
    coreRules: {
      id: ["Dilarang membuka PR jika tes lokal masih gagal.", "Sertakan ringkasan perubahan dan bukti verifikasi pada deskripsi PR."],
      en: ["Never open a PR while local tests are red.", "Include a change summary and verification evidence in the PR body."],
    },
    tips: {
      id: ["Lanjutkan dengan /babysit setelah menjalankan /cpr untuk memantau CI.", "Gunakan flag draft jika perubahan masih membutuhkan diskusi."],
      en: ["Follow up with /babysit after running /cpr to monitor CI checks.", "Use draft status if the change requires open architectural discussion."],
    },
    pairsWellWith: ["clean", "babysit", "pr-ready"],
    sourcePath: "skills/cpr/SKILL.md",
  },
  {
    name: "draft-tweet",
    category: "shipping",
    invocation: "user",
    description: {
      id: "Tulis draft postingan X/Twitter ringkas tentang fitur yang baru dikirim tanpa istilah klise.",
      en: "Draft concise X/Twitter posts about shipped features without marketing fluff.",
    },
    detailedDescription: {
      id: "draft-tweet membantu menyusun pengumuman rilis fitur teknis yang elegan di X/Twitter. Menghindari jargon pemasaran klise dan berfokus pada masalah nyata yang diselesaikan serta dampak langsung bagi pengguna.",
      en: "draft-tweet crafts elegant technical release announcements for X/Twitter. It avoids marketing fluff, focusing strictly on the real problem solved and the direct impact on users.",
    },
    useWhen: {
      id: ["Mempublikasikan fitur atau library open-source baru ke media sosial.", "Menyampaikan pembaruan teknis dengan gaya yang santai dan lugas.", "Menyiapkan alternatif draf cuitan untuk dipilih oleh tim."],
      en: ["Announcing new features or open-source libraries on social media.", "Communicating technical updates in a natural, concise tone.", "Drafting candidate tweet options for team selection."],
    },
    avoidWhen: {
      id: ["Memposting secara otomatis tanpa persetujuan manual pengguna."],
      en: ["Auto-posting directly to social channels without manual sign-off."],
    },
    howItWorks: {
      id: ["Identifikasi masalah nyata yang diselesaikan oleh fitur baru ini.", "Tulis 2\u20133 variasi draf cuitan dengan sudut pandang berbeda.", "Gunakan bahasa ringkas, sertakan media visual atau cuplikan kode jika ada.", "Serahkan opsi draf kepada pengguna untuk disetujui."],
      en: ["Identify the core problem solved by the shipped feature.", "Draft 2-3 distinct tweet variations highlighting different angles.", "Keep prose crisp, noting screenshots or code snippets where helpful.", "Present draft options to the user for explicit approval."],
    },
    coreRules: {
      id: ["Dilarang memposting ke jaringan sosial tanpa persetujuan eksplisit.", "Hindari jargon AI klise ('Excited to announce', 'Revolutionary')."],
      en: ["Never publish directly to social networks without explicit approval.", "Eliminate promotional AI tropes ('Excited to announce', 'Game-changer')."],
    },
    tips: {
      id: ["Sorot perbandingan before vs after dalam satu kalimat pendek.", "Sertakan tautan langsung ke rilis atau demo interaktif."],
      en: ["Highlight a clear before-and-after comparison in one sentence.", "Include direct links to the release notes or interactive demo."],
    },
    pairsWellWith: ["no-tropes", "ticket-ship", "cpr"],
    sourcePath: "skills/draft-tweet/SKILL.md",
  },
  {
    name: "free-disk-space",
    category: "review",
    invocation: "user",
    description: {
      id: "Bersihkan cache paket, artefak build, dan Docker yang aman tanpa menyentuh data penting.",
      en: "Safely reclaim disk space from package caches, build artifacts, and stale Docker data.",
    },
    detailedDescription: {
      id: "free-disk-space membersihkan ruang disk yang terbuang secara aman dan terukur. Menargetkan cache package manager (npm, yarn, pnpm, bun), cache Docker yang tidak terpakai, dan direktori build usang tanpa menyentuh data personal atau konfigurasi.",
      en: "free-disk-space reclaims wasted disk capacity safely and methodically. Targets package manager caches (npm, yarn, pnpm, bun), unused Docker layers, and stale build output without touching personal data or configs.",
    },
    useWhen: {
      id: ["Disk penyimpanan penuh atau mendekati batas peringatan (>85%).", "Membersihkan sisa build lama setelah sprint pengembangan yang panjang.", "Mempercepat proses kompilasi dengan membuang cache yang korup."],
      en: ["Disk storage is full or nearing warning thresholds (>85%).", "Purging legacy build debris after extensive development sprints.", "Clearing corrupted package caches to resolve build failures."],
    },
    avoidWhen: {
      id: ["Menghapus volume Docker produksi aktif atau database lokal."],
      en: ["Deleting active production Docker volumes or local databases."],
    },
    howItWorks: {
      id: ["Periksa penggunaan disk saat ini per partisi dan folder utama.", "Identifikasi cache paket dan file sementara yang aman dihapus.", "Jalankan pembersihan cache bertingkat (package manager, docker, temp).", "Verifikasi kembali kapasitas disk yang berhasil dipulihkan."],
      en: ["Inspect current disk allocation per partition and major directory.", "Identify safe targets (stale caches, dangling Docker images, temp files).", "Execute tiered cache pruning in a safe sequence.", "Report the exact amount of disk space reclaimed."],
    },
    coreRules: {
      id: ["Dilarang menghapus repositori git lokal yang memiliki uncommitted changes.", "Konfirmasi sebelum menjalankan pembersihan volume docker."],
      en: ["Never delete local git repositories with uncommitted changes.", "Prompt for explicit approval before purging Docker volumes."],
    },
    tips: {
      id: ["Fokuskan pembersihan pada folder /tmp dan cache package manager terlebih dahulu.", "Jadwalkan pembersihan rutin pada mesin CI/CD."],
      en: ["Target /tmp and package manager caches first for immediate gains.", "Schedule routine prune maintenance on CI/CD runner machines."],
    },
    pairsWellWith: ["runtime-debug", "perf", "clean"],
    sourcePath: "skills/free-disk-space/SKILL.md",
  },
  {
    name: "list-open-work",
    category: "review",
    invocation: "user",
    description: {
      id: "Daftar semua PR/MR terbuka di repositori saat ini beserta status tracker dan reviewer.",
      en: "List all open PRs/MRs in the current repo with issue tracker and review status.",
    },
    detailedDescription: {
      id: "list-open-work memberikan visibilitas instan terhadap seluruh pekerjaan yang sedang berjalan di repositori. Memetakan cabang aktif, nomor tiket issue yang terhubung, status checks CI, dan siapa reviewer yang ditugaskan.",
      en: "list-open-work provides instant situational awareness across in-flight repository work. Maps active branches, linked ticket IDs, CI check statuses, and assigned reviewers in one view.",
    },
    useWhen: {
      id: ["Memulai hari kerja untuk melihat status PR yang sedang menunggu review.", "Mengetahui PR mana yang mengalami kegagalan CI atau membutuhkan rebase.", "Menghindari duplikasi pekerjaan antar anggota tim."],
      en: ["Starting the workday to review pending pull requests.", "Identifying PRs with failing CI checks or stale merge conflicts.", "Preventing duplicate work across collaborating engineers."],
    },
    avoidWhen: {
      id: ["Mencari log commit historis; gunakan git log untuk riwayat masa lalu."],
      en: ["Searching deep git history; use git log for historical commits."],
    },
    howItWorks: {
      id: ["Ambil daftar PR aktif melalui gh pr list.", "Kaitkan masing-masing PR dengan cabang git dan nomor tiket issue terkait.", "Ambil status checks CI dan approval review saat ini.", "Sajikan tabel ringkas status pekerjaan terbuka."],
      en: ["Query active PRs via gh pr list.", "Associate each PR with its git branch and linked tracker ticket.", "Fetch current CI check states and review approval progress.", "Format findings into a clear, scannable table."],
    },
    coreRules: {
      id: ["Sajikan status faktual dari server remote, bukan asumsi lokal.", "Tandai dengan jelas PR yang mengalami merge conflict."],
      en: ["Present verified state from remote servers, not local assumptions.", "Explicitly highlight PRs suffering from merge conflicts."],
    },
    tips: {
      id: ["Jalankan di pagi hari sebelum memulai fitur baru.", "Prioritaskan PR yang sudah di-approve untuk segera digabungkan."],
      en: ["Run at standup or morning check-in before picking new tickets.", "Prioritize approved PRs for immediate merge."],
    },
    pairsWellWith: ["ticket-ship", "pr-triage", "babysit"],
    sourcePath: "skills/list-open-work/SKILL.md",
  },
  {
    name: "no-tropes",
    category: "review",
    invocation: "model",
    description: {
      id: "Deteksi dan eliminasi kata-kata klise AI sintetis pada teks, commit message, dan dokumentasi.",
      en: "Detect and eliminate synthetic AI tropes from copy, commit messages, and docs.",
    },
    detailedDescription: {
      id: "no-tropes menyaring frasa-frasa klise khas model bahasa (seperti 'delve', 'testament', 'tapestry', 'seamlessly') agar tulisan terdengar natural, berbobot, dan ditulis layaknya software engineer senior.",
      en: "no-tropes filters out synthetic LLM buzzwords and clich\u00e9s (e.g., 'delve', 'testament', 'tapestry', 'seamlessly') so copy sounds natural, authentic, and written by an experienced human engineer.",
    },
    useWhen: {
      id: ["Menyaring draf dokumentasi teknis atau README sebelum dipublikasikan.", "Membersihkan commit message dan deskripsi PR dari bahasa promosi AI.", "Meninjau copy teks antarmuka agar terdengar alami."],
      en: ["Scrubbing technical documentation or README drafts before publishing.", "Purging commit messages and PR bodies of synthetic AI fluff.", "Refining interface copy so it sounds genuine and grounded."],
    },
    avoidWhen: {
      id: ["Dokumen yang memang membutuhkan jargon hukum atau regulasi spesifik."],
      en: ["Documents strictly requiring specific legal or regulatory terminology."],
    },
    howItWorks: {
      id: ["Pindai teks target terhadap daftar kata klise dan pola kalimat sintetis.", "Identifikasi kalimat pasif berlebihan dan kata sifat promosi.", "Tulis ulang kalimat menjadi lugas, langsung, dan menggunakan kata kerja aktif.", "Verifikasi nada teks akhir tetap profesional dan ringkas."],
      en: ["Scan target text against recognized AI trope lexicons and patterns.", "Flag passive voice overuse and hyperbolic marketing adjectives.", "Rewrite passages directly using active verbs and concrete facts.", "Verify the final prose sounds calm, confident, and professional."],
    },
    coreRules: {
      id: ["Hapus kata klise tanpa menghilangkan substansi teknis yang dimaksud.", "Utamakan fakta konkret daripada metafora berbunga-bunga."],
      en: ["Strip tropes without losing intended technical meaning.", "Prioritize concrete facts over flowery metaphors."],
    },
    tips: {
      id: ["Periksa deskripsi PR sebelum melakukan submission.", "Gunakan gaya bahasa langsung dan padat."],
      en: ["Run on PR descriptions before submission.", "Keep phrasing crisp, direct, and matter-of-fact."],
    },
    pairsWellWith: ["clean", "draft-tweet", "better-writing"],
    sourcePath: "skills/no-tropes/SKILL.md",
  },
  {
    name: "notarize-mac",
    category: "shipping",
    invocation: "user",
    description: {
      id: "Build, sign, dan lakukan proses Apple Notarization untuk aplikasi macOS atau installer DMG.",
      en: "Build, code-sign, and notarize macOS desktop applications or DMG bundles.",
    },
    detailedDescription: {
      id: "notarize-mac mengelola alur penandatanganan kode (code signing) dan notarization Apple Gatekeeper untuk aplikasi macOS. Memastikan sertifikat Developer ID valid, mengirim berkas ke layanan Notary Apple, dan menempelkan tiket stapler.",
      en: "notarize-mac automates Apple Gatekeeper code-signing and notarization pipelines for macOS applications. Validates certificates, submits bundles to the Apple Notary service, and staples tickets.",
    },
    useWhen: {
      id: ["Mempersiapkan rilis aplikasi desktop macOS untuk distribusi publik di luar Mac App Store.", "Memperbaiki peringatan keamanan Gatekeeper ('App cannot be opened').", "Membuat berkas DMG resmi yang siap dipasang oleh pengguna."],
      en: ["Preparing macOS desktop releases for distribution outside the Mac App Store.", "Resolving Gatekeeper warnings ('App cannot be opened').", "Creating signed and stapled DMG installers for users."],
    },
    avoidWhen: {
      id: ["Build aplikasi web murni atau distribusi Linux/Windows."],
      en: ["Web application builds or Linux/Windows deployments."],
    },
    howItWorks: {
      id: ["Verifikasi ketersediaan sertifikat Developer ID dan kredensial Notary.", "Jalankan build binary aplikasi dan tanda tangani dengan codesign.", "Kemas aplikasi ke dalam format .dmg atau .zip.", "Kirim ke Apple Notary Service via notarytool dan staple tiket."],
      en: ["Verify Developer ID certificates and Apple Notary credentials.", "Build the binary and apply hardened runtime code-signing.", "Package the signed app into a .dmg or .zip distribution container.", "Submit to Apple Notary Service via notarytool and staple the ticket."],
    },
    coreRules: {
      id: ["Wajib menggunakan hardened runtime pada binary yang ditandatangani.", "Verifikasi hasil notarization dengan spctl --assess sebelum rilis."],
      en: ["Enable hardened runtime on all signed binaries.", "Validate notarization status via spctl --assess before public release."],
    },
    tips: {
      id: ["Simpan kredensial Notary di Apple Keychain daripada file teks mentah.", "Gunakan xcrun notarytool submit alih-alih altool yang sudah usang."],
      en: ["Store Notary credentials in macOS Keychain rather than plain text.", "Use xcrun notarytool submit over deprecated altool commands."],
    },
    pairsWellWith: ["ticket-ship", "pr-ready", "runtime-debug"],
    sourcePath: "skills/notarize-mac/SKILL.md",
  },
  {
    name: "perf",
    category: "engineering",
    invocation: "user",
    description: {
      id: "Siklus optimasi performa berbasis profil: ukur baseline, profil bottleneck, dan verifikasi peningkatan.",
      en: "Profile-driven performance optimization: measure baseline, profile, and verify gains.",
    },
    detailedDescription: {
      id: "perf menegakkan optimasi performa berbasis data nyata, bukan dugaan. Mengukur metrik baseline terlebih dahulu, menjalankan profiling CPU/memori untuk menemukan bottleneck utama, dan memverifikasi perubahan dengan benchmark komparatif.",
      en: "perf enforces empirical, measurement-driven performance engineering. Captures baseline metrics first, profiles CPU/memory bottlenecks, and validates optimizations with reproducible comparative benchmarks.",
    },
    useWhen: {
      id: ["Menangani keluhan latensi tinggi pada API atau waktu respon aplikasi.", "Mengurangi penggunaan memori pada proses latar belakang yang intensif.", "Mengoptimalkan bundle size dan waktu render frontend."],
      en: ["Addressing high latency or slow response times in APIs.", "Reducing memory consumption in heavy background workers.", "Optimizing frontend bundle sizes and initial paint times."],
    },
    avoidWhen: {
      id: ["Melakukan optimasi prematur pada kode yang tidak berada di jalur kritis (hot path)."],
      en: ["Prematurely optimizing non-critical code paths without measurements."],
    },
    howItWorks: {
      id: ["Tentukan metrik target dan ukur angka baseline sebelum perubahan.", "Jalankan profiler (CPU flamegraph, memory snapshot, atau network trace).", "Identifikasi fungsi spesifik yang mengonsumsi sumber daya terbesar.", "Terapkan optimasi terarah dan bandingkan metrik baru vs baseline."],
      en: ["Define target metrics and record verified baseline numbers.", "Run profilers (CPU flamegraphs, memory snapshots, network traces).", "Pinpoint hot functions consuming disproportionate resources.", "Implement targeted changes and run comparative benchmarks."],
    },
    coreRules: {
      id: ["Jangan optimasi tanpa angka baseline terukur.", "Buktikan peningkatan performa dengan data statistik yang dapat diulang."],
      en: ["Never optimize without an established empirical baseline.", "Prove performance improvements with reproducible benchmarks."],
    },
    tips: {
      id: ["Fokuskan perbaikan pada 20% kode yang memakan 80% waktu eksekusi.", "Periksa alokasi memori berlebih yang memicu garbage collection."],
      en: ["Focus efforts on the 20% of code driving 80% of runtime.", "Inspect excess allocations causing frequent garbage collection pauses."],
    },
    pairsWellWith: ["runtime-debug", "visual-verify", "clean"],
    sourcePath: "skills/perf/SKILL.md",
  },
  {
    name: "pr-ready",
    category: "shipping",
    invocation: "user",
    description: {
      id: "Bersihkan semua hambatan pada PR terbuka: rebase ke cabang utama, selesaikan konflik, dan jalankan checks.",
      en: "Clear all blockers on an open PR: rebase onto main, resolve conflicts, and run checks.",
    },
    detailedDescription: {
      id: "pr-ready memastikan Pull Request siap digabungkan tanpa hambatan teknis. Melakukan rebase ke cabang utama terbaru, menyelesaikan konflik merge secara bersih, dan memastikan seluruh checks lokal hijau sebelum handoff ke reviewer.",
      en: "pr-ready resolves every merge blocker on an existing PR. Rebases the branch onto the latest main, resolves conflicts cleanly, and confirms all local checks pass before reviewer handoff.",
    },
    useWhen: {
      id: ["PR tertinggal dari branch main dan mengalami konflik merge.", "Mempersiapkan PR untuk persetujuan akhir dan penggabungan.", "Menyelesaikan status checks yang usang setelah commit baru di main."],
      en: ["A PR falls behind the main branch and encounters merge conflicts.", "Preparing an existing PR for final review sign-off and merge.", "Refreshing stale checks after upstream commits land on main."],
    },
    avoidWhen: {
      id: ["Cabang masih dalam tahap eksplorasi awal dengan banyak uncommitted changes."],
      en: ["Branch is in early prototype exploration with uncommitted changes."],
    },
    howItWorks: {
      id: ["Fetch commit terbaru dari remote origin main.", "Lakukan rebase cabang fitur di atas commit origin/main terbaru.", "Selesaikan konflik merge yang muncul secara teliti.", "Jalankan ulang tes lokal dan push cabang fitur yang telah diperbarui."],
      en: ["Fetch the latest commits from remote origin main.", "Rebase the feature branch cleanly onto latest origin/main.", "Resolve any merge conflicts preserving intended functionality.", "Re-run local test suites and push the updated branch."],
    },
    coreRules: {
      id: ["Gunakan git rebase daripada merge commit untuk menjaga riwayat linier.", "Verifikasi seluruh rangkaian tes setelah menyelesaikan konflik."],
      en: ["Prefer git rebase over merge commits to maintain linear history.", "Verify the full test suite after conflict resolution."],
    },
    tips: {
      id: ["Gunakan git rerere jika sering menghadapi konflik yang berulang.", "Selalu periksa git diff setelah rebase untuk memastikan tidak ada kode hilang."],
      en: ["Enable git rerere if frequently resolving repeated merge conflicts.", "Always review git diff after rebasing to ensure no regressions."],
    },
    pairsWellWith: ["cpr", "babysit", "stacked-pr"],
    sourcePath: "skills/pr-ready/SKILL.md",
  },
  {
    name: "pr-triage",
    category: "shipping",
    invocation: "user",
    description: {
      id: "Triage PR kontributor eksternal sebagai maintainer: berikan vonis approve, supersede, atau perbaikan.",
      en: "Maintainer triage for external PRs: render verdicts of approve, supersede, or revise.",
    },
    detailedDescription: {
      id: "pr-triage membantu maintainer repositori meninjau PR yang masuk secara terstruktur dan adil. Memeriksa relevansi arsitektur, kelayakan tes, kepatuhan gaya kode, dan memberikan keputusan jelas (Approve, Request Changes, atau Close/Supersede).",
      en: "pr-triage guides maintainers through structured, objective PR reviews. Evaluates architectural alignment, test coverage, code style, and issues clear decisions (Approve, Request Changes, or Supersede).",
    },
    useWhen: {
      id: ["Memproses antrean PR masuk dari kontributor open-source atau tim lain.", "Meninjau perubahan eksternal yang berdampak pada arsitektur inti proyek.", "Memberikan umpan balik yang konstruktif dan terarah kepada pembuat PR."],
      en: ["Processing incoming PR backlogs from external contributors or teammates.", "Reviewing external changes impacting core system architecture.", "Delivering constructive, actionable feedback to PR authors."],
    },
    avoidWhen: {
      id: ["Meninjau PR milik sendiri; gunakan /clean atau /cpr."],
      en: ["Reviewing your own open PR; use /clean or /cpr instead."],
    },
    howItWorks: {
      id: ["Pahami konteks tiket atau masalah yang coba diselesaikan oleh PR.", "Periksa diff perubahan kode, coverage tes, dan dokumentasi terkait.", "Uji perubahan secara lokal jika melibatkan perilaku fungsional baru.", "Tulis komentar review terstruktur dengan vonis akhir yang jelas."],
      en: ["Understand the problem statement and ticket context of the PR.", "Review code diffs, automated test coverage, and documentation.", "Test changes locally if functional regressions are suspected.", "Write structured review comments culminating in a clear verdict."],
    },
    coreRules: {
      id: ["Berikan umpan balik yang objektif dan menghargai kontributor.", "Jelaskan alasan teknis jika memutuskan untuk menolak atau menutup PR."],
      en: ["Provide objective, respectful feedback to contributors.", "Document clear technical justifications when rejecting or superseding PRs."],
    },
    tips: {
      id: ["Pisahkan antara saran opsional (nitpick) dan blocker wajib.", "Gunakan format komentar konvensional (misal: 'suggestion:', 'blocker:')."],
      en: ["Distinguish between optional nits and blocking requirements.", "Use conventional comment prefixes (e.g., 'suggestion:', 'blocking:')."],
    },
    pairsWellWith: ["list-open-work", "ticket-ship", "pr-ready"],
    sourcePath: "skills/pr-triage/SKILL.md",
  },
  {
    name: "pr-update",
    category: "shipping",
    invocation: "user",
    description: {
      id: "Buka PR baru atau perbarui judul dan deskripsi PR yang sudah ada agar mencerminkan kondisi terkini.",
      en: "Open a new PR or refresh an existing PR's title and description to match latest code.",
    },
    detailedDescription: {
      id: "pr-update menjaga metadata Pull Request tetap akurat dan sinkron dengan kode nyata. Menyusun ringkasan perubahan terbaru, memperbarui checklist pengujian, dan menautkan nomor tiket issue secara otomatis.",
      en: "pr-update keeps Pull Request metadata accurate and synchronized with actual commits. Generates up-to-date change summaries, test checklists, and issue ticket links automatically.",
    },
    useWhen: {
      id: ["Membuat PR baru setelah cabang fitur di-push ke remote repository.", "Memperbarui deskripsi PR lama setelah ada banyak commit perbaikan baru.", "Menghubungkan PR dengan issue tracker (misal: 'Closes #123')."],
      en: ["Creating a fresh PR after pushing a feature branch.", "Refreshing an existing PR body after major follow-up commits land.", "Linking PRs to issue trackers (e.g., 'Closes #123')."],
    },
    avoidWhen: {
      id: ["Ingin melakukan pembersihan diff sekaligus; gunakan /cpr."],
      en: ["Wanting diff cleanup bundled with PR updating; use /cpr instead."],
    },
    howItWorks: {
      id: ["Analisis riwayat commit dan diff antara cabang fitur vs target base.", "Tulis ringkasan ringkas perubahan yang dilakukan dan alasannya.", "Sertakan instruksi pengujian dan checklist verifikasi.", "Buka atau perbarui deskripsi PR melalui gh pr create atau gh pr edit."],
      en: ["Analyze commit history and diff between feature branch and base.", "Draft a concise summary of changes and architectural rationale.", "Include reproduction/testing steps and verification evidence.", "Create or update the PR body via gh pr create or gh pr edit."],
    },
    coreRules: {
      id: ["Judul PR harus ringkas dan mengikuti konvensi (misal: Conventional Commits).", "Deskripsi wajib mencantumkan cara memverifikasi perubahan."],
      en: ["PR titles must follow project conventions (e.g., Conventional Commits).", "The description must document how to verify changes."],
    },
    tips: {
      id: ["Sertakan screenshot atau video pendek untuk perubahan yang memengaruhi UI.", "Tandai PR sebagai Draft jika masih dalam tahap pengerjaan."],
      en: ["Attach screenshots or short screen recordings for visual UI changes.", "Mark as Draft if work is still actively in progress."],
    },
    pairsWellWith: ["cpr", "clean", "ticket-ship"],
    sourcePath: "skills/pr-update/SKILL.md",
  },
  {
    name: "research",
    category: "engineering",
    invocation: "user",
    description: {
      id: "Teliti dokumen resmi dan arsitektur sebelum membangun: periksa dokumen catatan resmi proyek.",
      en: "Investigate official documentation and system records before writing code.",
    },
    detailedDescription: {
      id: "research mengutamakan pemahaman sebelum eksekusi kode. Memeriksa dokumen arsitektur proyek (ADR, PRD, RFC), spesifikasi API eksternal, dan kode referensi untuk memastikan solusi yang dibangun tepat sasaran dan selaras dengan standar tim.",
      en: "research prioritizes deep context gathering before code execution. Reviews architectural decision records (ADRs), PRDs, external API specs, and reference implementations to ensure designs align with system standards.",
    },
    useWhen: {
      id: ["Sebelum memulai fitur baru yang melibatkan integrasi pihak ketiga.", "Memahami keputusan arsitektur masa lalu pada modul yang kompleks.", "Mencari pola desain yang sudah terbukti di dalam codebase proyek."],
      en: ["Before starting features involving third-party integrations.", "Understanding historical architectural decisions in complex subsystems.", "Identifying established design patterns within the existing codebase."],
    },
    avoidWhen: {
      id: ["Perbaikan bug sebaris yang sudah jelas penyebab dan solusinya."],
      en: ["Trivial one-line bugfixes where the root cause is already clear."],
    },
    howItWorks: {
      id: ["Cari dokumen arsitektur yang relevan di folder docs atau repo.", "Pelajari dokumentasi resmi upstream dan batasan API yang berlaku.", "Temukan contoh implementasi serupa di dalam proyek.", "Sintesiskan temuan menjadi rangkuman teknis ringkas sebelum coding."],
      en: ["Search for relevant architectural documents in docs or repos.", "Review official upstream API docs and contract constraints.", "Locate existing reference implementations in the codebase.", "Synthesize findings into a concise technical brief before coding."],
    },
    coreRules: {
      id: ["Kutip sumber dokumentasi resmi yang dapat diverifikasi.", "Jangan berasumsi tentang perilaku API eksternal tanpa memeriksa dokumentasi."],
      en: ["Ground findings in cited, verifiable documentation sources.", "Never guess external API behaviors without inspecting official specs."],
    },
    tips: {
      id: ["Simpan ringkasan keputusan penting ke dalam file ADR proyek.", "Gunakan penelusuran riwayat git blame untuk memahami konteks historis kode."],
      en: ["Record key decisions in project ADR files for long-term reference.", "Use git blame and past PR discussions to uncover historical context."],
    },
    pairsWellWith: ["audit-only", "runtime-debug", "work"],
    sourcePath: "skills/research/SKILL.md",
  },
  {
    name: "runtime-debug",
    category: "engineering",
    invocation: "user",
    description: {
      id: "Investigasi lingkungan atau proses yang rusak dengan memeriksa log dan observabilitas terlebih dahulu.",
      en: "Debug broken runtime environments by inspecting logs and observability first.",
    },
    detailedDescription: {
      id: "runtime-debug mendekati masalah runtime dengan bukti data konkret. Memeriksa log proses, metrik tracing, status kontainer, dan variabel lingkungan sebelum mengubah baris kode apapun.",
      en: "runtime-debug tackles runtime defects with concrete empirical evidence. Inspects application logs, distributed traces, container states, and environment variables before modifying any code.",
    },
    useWhen: {
      id: ["Layanan mengalami crash, restart loop, atau pesan error di server.", "Variabel lingkungan tidak terbaca atau konfigurasi gagal dimuat.", "Investigasi perbedaan perilaku antara lingkungan lokal dan server staging."],
      en: ["Services crashing, encountering restart loops, or throwing server errors.", "Environment variables failing to resolve or configuration loading issues.", "Investigating behavioral differences between local dev and staging servers."],
    },
    avoidWhen: {
      id: ["Kesalahan logika murni yang sudah memiliki unit test gagal yang jelas."],
      en: ["Pure logic errors already isolated by a failing unit test."],
    },
    howItWorks: {
      id: ["Kumpulkan log runtime aplikasi dan pesan error terbaru.", "Periksa status proses, penggunaan port, dan alokasi memori/CPU.", "Verifikasi keberadaan dan format variabel lingkungan yang dibutuhkan.", "Isolasi titik kegagalan pertama (root error) dari log beruntun."],
      en: ["Collect latest application runtime logs and error traces.", "Inspect process status, port bindings, and memory/CPU loads.", "Verify the existence and format of required environment variables.", "Isolate the root error from cascading exception logs."],
    },
    coreRules: {
      id: ["Analisis pesan error pertama sebelum mendiagnosis error turunan.", "Jangan berspekulasi tanpa memeriksa log proses nyata."],
      en: ["Isolate the primary root error before debugging downstream failures.", "Never guess the failure mechanism without inspecting live logs."],
    },
    tips: {
      id: ["Periksa log kontainer dengan docker logs --tail 100.", "Gunakan log level DEBUG sementara untuk merekam jejak panggilan data."],
      en: ["Inspect container logs quickly via docker logs --tail 100.", "Temporarily elevate log verbosity to DEBUG to trace data flows."],
    },
    pairsWellWith: ["audit-only", "perf", "clean"],
    sourcePath: "skills/runtime-debug/SKILL.md",
  },
  {
    name: "stacked-pr",
    category: "shipping",
    invocation: "user",
    description: {
      id: "Kelola rantai PR bertumpuk (stacked PRs) dengan benar saat fitur bergantung pada PR lain.",
      en: "Manage stacked PR chains correctly when features depend on unmerged PRs.",
    },
    detailedDescription: {
      id: "stacked-pr menangani pembuatan dan pemeliharaan rantai Pull Request yang saling bergantung. Memastikan setiap cabang memiliki base yang benar, mempermudah rebase berantai saat PR bawah dimerge, dan menjaga review tetap modular.",
      en: "stacked-pr manages dependent chains of modular Pull Requests. Ensures branches point to correct target bases, orchestrates chained rebases when lower PRs merge, and keeps diffs small and reviewable.",
    },
    useWhen: {
      id: ["Mengerjakan fitur besar yang dipecah menjadi beberapa PR kecil berurutan.", "Melanjutkan pekerjaan di atas cabang fitur yang masih menunggu review.", "Menyinkronkan rantai cabang saat cabang dasar mengalami perubahan."],
      en: ["Splitting large features into a chain of small, reviewable PRs.", "Continuing work atop an unmerged branch still awaiting approval.", "Synchronizing dependent branches when base branches are updated."],
    },
    avoidWhen: {
      id: ["Fitur kecil mandiri yang dapat digabungkan langsung ke branch main."],
      en: ["Small, standalone features that merge directly into main."],
    },
    howItWorks: {
      id: ["Cabangkan fitur kedua dari cabang fitur pertama (bukan dari main).", "Buka PR kedua dengan target base menunjuk ke cabang fitur pertama.", "Ketika PR pertama dimerge ke main, ubah target base PR kedua ke main.", "Rebase cabang kedua di atas main terbaru dan jalankan checks."],
      en: ["Branch the second feature off the first feature branch (not main).", "Open the second PR targeting the first feature branch as base.", "When the first PR merges into main, retarget the second PR to main.", "Rebase the second branch onto main and confirm tests pass."],
    },
    coreRules: {
      id: ["Tiap PR dalam rantai wajib memiliki cakupan fungsional mandiri.", "Perbarui target base PR atas segera setelah PR bawah digabungkan."],
      en: ["Each PR in the stack must maintain an isolated functional scope.", "Retarget dependent PRs immediately once the base PR merges into main."],
    },
    tips: {
      id: ["Batasi tumpukan maksimal 3 PR bertingkat untuk mencegah konflik rumit.", "Tulis catatan jelas di deskripsi PR mengenai ketergantungan rantai."],
      en: ["Limit stacks to at most 3 PRs to keep rebases manageable.", "Explicitly note the dependency chain in each PR description."],
    },
    pairsWellWith: ["pr-ready", "cpr", "ticket-ship"],
    sourcePath: "skills/stacked-pr/SKILL.md",
  },
  {
    name: "ticket-ship",
    category: "shipping",
    invocation: "user",
    description: {
      id: "Kawal tiket issue dari pengerjaan hingga shipped: mulai PR, dorong hingga merge, dan tutup tiket.",
      en: "Drive an issue ticket from development to shipped: start PR, merge, and close ticket.",
    },
    detailedDescription: {
      id: "ticket-ship mengorkestrasikan siklus hidup pengiriman fitur dari awal tiket hingga selesai sepenuhnya. Menghubungkan pembuatan cabang kerja, pemantauan PR, verifikasi penggabungan, hingga penutupan tiket issue di tracker.",
      en: "ticket-ship orchestrates the full lifecycle of shipping a ticket end to end. Manages worktree creation, PR tracking, merge verification, and final closure on the issue tracker.",
    },
    useWhen: {
      id: ["Mengambil tiket pekerjaan baru dari backlog proyek untuk diselesaikan.", "Memastikan seluruh tahapan pengiriman terlaksana tanpa ada yang terlewat.", "Menutup tiket issue secara otomatis dengan referensi commit merge resmi."],
      en: ["Picking up a new task ticket from the backlog to drive to completion.", "Ensuring every phase of the shipping workflow is fulfilled.", "Closing issue tickets automatically with verified merge commit references."],
    },
    avoidWhen: {
      id: ["Eksplorasi spike atau riset santai yang tidak memiliki tiket issue resmi."],
      en: ["Informal exploratory spikes without an assigned tracker ticket."],
    },
    howItWorks: {
      id: ["Ambil detail kebutuhan dan acceptance criteria dari tiket issue.", "Buka cabang kerja terisolasi dan implementasikan solusi.", "Jalankan quality gates lokal, buka PR, dan kawal hingga merged.", "Perbarui status tiket di issue tracker menjadi Closed atau Shipped."],
      en: ["Extract requirements and acceptance criteria from the issue ticket.", "Create an isolated worktree branch and implement the solution.", "Run local quality gates, open the PR, and drive it to merge.", "Update ticket status on the tracker to Closed or Shipped."],
    },
    coreRules: {
      id: ["Jangan tutup tiket sebelum PR benar-benar digabungkan ke cabang utama.", "Sertakan nomor tiket issue pada setiap pesan commit dan deskripsi PR."],
      en: ["Never close a ticket before the PR is merged into the default branch.", "Reference the issue ticket ID in all commit messages and PR bodies."],
    },
    tips: {
      id: ["Gunakan kata kunci penutup otomatis seperti 'Closes #123' di deskripsi PR.", "Verifikasi deployment produksi sebelum mengumumkan penyelesaian tiket."],
      en: ["Use automatic closing keywords like 'Closes #123' in the PR body.", "Verify production deployment before announcing ticket completion."],
    },
    pairsWellWith: ["work", "cpr", "babysit"],
    sourcePath: "skills/ticket-ship/SKILL.md",
  },
  {
    name: "ui-only",
    category: "visual",
    invocation: "user",
    description: {
      id: "Mode iterasi cepat UI: abaikan typecheck, lint, dan test saat merapikan tampilan visual.",
      en: "Fast UI iteration mode: defer typecheck, lint, and tests while polishing visuals.",
    },
    detailedDescription: {
      id: "ui-only mengoptimalkan kecepatan saat mendesain tampilan antarmuka. Menunda eksekusi typecheck dan linter yang lambat selama fase eksplorasi visual, sehingga perubahan CSS dan tata letak dapat langsung dilihat di browser tanpa hambatan.",
      en: "ui-only accelerates visual interface styling passes. Temporarily defers slow typechecks and linters during visual exploration so CSS and layout adjustments reflect instantly in the browser.",
    },
    useWhen: {
      id: ["Merapikan padding, warna, dan posisi elemen visual antarmuka.", "Eksplorasi cepat layout komponen sebelum menulis logika bisnis.", "Menghindari jeda lambat proses build/lint saat hanya mengubah styling."],
      en: ["Fine-tuning padding, colors, and visual component layout.", "Fast styling exploration before wiring up heavy business logic.", "Eliminating slow lint/build friction while purely tweaking styles."],
    },
    avoidWhen: {
      id: ["Sebelum membuat commit final atau membuka PR; quality gates wajib dijalankan."],
      en: ["Before final commits or opening PRs; quality gates must run then."],
    },
    howItWorks: {
      id: ["Fokuskan perubahan hanya pada file stylesheet atau props styling komponen.", "Gunakan hot module replacement (HMR) browser untuk melihat hasil instan.", "Abaikan sementara peringatan linting selama fase eksplorasi.", "Jalankan kembali seluruh quality gates sebelum menyelesaikan task."],
      en: ["Restrict modifications strictly to styling and presentation files.", "Rely on browser Hot Module Replacement (HMR) for instant preview.", "Temporarily defer linting warnings during visual tweaking.", "Re-enable and pass all quality gates before finishing the task."],
    },
    coreRules: {
      id: ["Hanya untuk fase eksplorasi visual; wajib lolos lint sebelum commit.", "Dilarang memodifikasi logika bisnis penting saat berada di mode ini."],
      en: ["Restricted to visual styling passes; all gates must pass before commit.", "Never modify core business logic while operating in this mode."],
    },
    tips: {
      id: ["Gunakan bersamaan dengan /visual-verify untuk menangkap screenshot.", "Kembalikan ke mode normal dengan /clean sebelum membuat PR."],
      en: ["Pair with /visual-verify to capture rendered screenshot evidence.", "Return to standard workflows via /clean before submitting a PR."],
    },
    pairsWellWith: ["visual-verify", "ui-system", "clean"],
    sourcePath: "skills/ui-only/SKILL.md",
  },
  {
    name: "ui-system",
    category: "visual",
    invocation: "model",
    description: {
      id: "Gunakan kembali primitif UI, variabel CSS, dan token desain yang ada alih-alih membuat styling acak.",
      en: "Reuse existing UI primitives, CSS variables, and design tokens over ad-hoc styles.",
    },
    detailedDescription: {
      id: "ui-system menjaga konsistensi antarmuka dengan memanfaatkan token dan komponen yang sudah ada di proyek. Menghindari penulisan nilai warna hex atau margin acak, dan mengarahkan agen untuk selalu menggunakan token tema resmi.",
      en: "ui-system maintains interface cohesion by leveraging existing design tokens and primitives. Prevents arbitrary hardcoded hex codes or ad-hoc margins by routing styling to official system tokens.",
    },
    useWhen: {
      id: ["Menambahkan komponen UI baru ke dalam aplikasi yang sudah memiliki design system.", "Mencegah duplikasi styling atau inkonsistensi warna dan spasi.", "Merefaktor komponen yang menggunakan nilai CSS hardcoded."],
      en: ["Adding new UI components to an application with an established design system.", "Preventing duplicate styles or inconsistent colors and spacing.", "Refactoring components that contain hardcoded CSS values."],
    },
    avoidWhen: {
      id: ["Membangun prototype throwaway yang tidak memerlukan kepatuhan sistem."],
      en: ["Building throwaway prototypes that do not require design system compliance."],
    },
    howItWorks: {
      id: ["Periksa inventaris komponen dan token CSS tema yang tersedia di proyek.", "Pilih komponen primitif yang paling mendekati kebutuhan (Card, Button, Badge).", "Gunakan token warna dan skala spasi semantik proyek.", "Verifikasi konsistensi tampilan dengan halaman yang sudah ada."],
      en: ["Audit the project's available component library and CSS theme tokens.", "Select the closest matching UI primitives (Card, Button, Badge).", "Apply semantic theme tokens for colors, spacing, and typography.", "Verify visual alignment with existing application screens."],
    },
    coreRules: {
      id: ["Dilarang menggunakan nilai warna hex mentah jika token semantik tersedia.", "Gunakan kembali komponen dasar daripada membuat duplikasi dari nol."],
      en: ["Never hardcode raw hex values when semantic tokens exist.", "Reuse existing base components rather than rebuilding from scratch."],
    },
    tips: {
      id: ["Periksa file index.css atau theme tokens sebelum mendesain komponen baru.", "Gunakan komponen shadcn/ui atau library internal yang sudah terpasang."],
      en: ["Inspect the project's index.css or tokens before styling new views.", "Leverage installed shadcn/ui or internal library primitives."],
    },
    pairsWellWith: ["better-ui", "better-layout", "clean"],
    sourcePath: "skills/ui-system/SKILL.md",
  },
  {
    name: "visual-verify",
    category: "visual",
    invocation: "user",
    description: {
      id: "Buktikan perubahan visual dengan memeriksa permukaan render: tangkap tangkapan layar dan periksa DOM.",
      en: "Prove visual changes by inspecting the rendered surface: screenshot and check DOM.",
    },
    detailedDescription: {
      id: "visual-verify membuktikan bahwa perubahan tampilan benar-benar terlihat dan berfungsi dengan baik di browser. Mengambil tangkapan layar nyata atau menginspeksi pohon DOM untuk memastikan tidak ada elemen yang meluap atau bergeser.",
      en: "visual-verify confirms UI modifications render correctly in a real browser. Captures actual screenshots and inspects DOM geometry to ensure no elements overflow or misalign.",
    },
    useWhen: {
      id: ["Setelah memodifikasi tata letak, komponen interaktif, atau styling CSS.", "Membuktikan tidak ada regresi visual sebelum membuka Pull Request.", "Memeriksa tampilan antarmuka pada berbagai resolusi layar (mobile & desktop)."],
      en: ["After modifying layouts, interactive components, or CSS styling.", "Proving zero visual regressions before opening a Pull Request.", "Inspecting interface rendering across responsive breakpoints."],
    },
    avoidWhen: {
      id: ["Perubahan backend murni yang tidak menyentuh tampilan antarmuka sama sekali."],
      en: ["Pure backend changes that do not touch user-facing surfaces."],
    },
    howItWorks: {
      id: ["Buka halaman aplikasi di browser headless atau lingkungan dev.", "Navigasikan ke komponen atau alur kerja yang dimodifikasi.", "Tangkap screenshot area terkait pada resolusi desktop dan mobile.", "Periksa keterbacaan, padding, dan alignment visual."],
      en: ["Launch the application in a headless browser or dev environment.", "Navigate to the modified component or user workflow.", "Capture screenshots across desktop and mobile viewport sizes.", "Inspect visual legibility, padding, and alignment."],
    },
    coreRules: {
      id: ["Bukti visual nyata wajib disertakan; jangan berasumsi kode CSS sudah benar.", "Periksa state interaktif (hover, active, focus) dan state responsif."],
      en: ["Real visual proof is required; never assume CSS works unseen.", "Inspect interactive states (hover, active, focus) and breakpoints."],
    },
    tips: {
      id: ["Sertakan screenshot sebelum dan sesudah di deskripsi PR.", "Periksa kontras warna pada mode terang dan gelap."],
      en: ["Attach before-and-after screenshots to the PR description.", "Verify color contrast across both light and dark modes."],
    },
    pairsWellWith: ["ui-only", "better-ui", "cpr"],
    sourcePath: "skills/visual-verify/SKILL.md",
  },
  {
    name: "work",
    category: "engineering",
    invocation: "user",
    description: {
      id: "Mulai task di git worktree terisolasi alih-alih mengotori direktori kerja saat ini.",
      en: "Kick off a task in a fresh isolated git worktree rather than dirtying current repo.",
    },
    detailedDescription: {
      id: "work membuat ruang kerja git worktree baru yang terisolasi untuk mengerjakan task baru. Memungkinkan pengerjaan cabang fitur secara paralel tanpa mengganggu status file atau proses dev server yang sedang berjalan di direktori utama.",
      en: "work spawns an isolated git worktree for each new task. Enables parallel feature branch development without dirtying uncommitted files or interrupting running dev servers in the main directory.",
    },
    useWhen: {
      id: ["Memulai pengerjaan fitur baru saat direktori saat ini masih memiliki pekerjaan aktif.", "Memeriksa atau mereview PR orang lain tanpa mengubah cabang direktori utama.", "Menjalankan eksperimen kode yang berisiko secara terisolasi."],
      en: ["Starting a new feature while the current workspace has in-flight edits.", "Reviewing or testing someone else's PR without switching branches locally.", "Executing risky spike experiments in complete workspace isolation."],
    },
    avoidWhen: {
      id: ["Perubahan kecil 1 baris yang langsung di-commit di cabang saat ini."],
      en: ["Trivial one-line edits immediately committed to the current branch."],
    },
    howItWorks: {
      id: ["Buat git worktree baru di direktori kerja terpisah via git worktree add.", "Pasang dependensi yang diperlukan di folder baru jika dibutuhkan.", "Jalankan proses pengembangan dan pengujian di ruang kerja terisolasi tersebut.", "Hapus worktree setelah task selesai dan branch digabungkan."],
      en: ["Create a fresh git worktree in an isolated path via git worktree add.", "Install dependencies in the new workspace directory if needed.", "Develop and run tests completely inside the isolated worktree.", "Remove the worktree once the task is finished and the branch is merged."],
    },
    coreRules: {
      id: ["Satu worktree untuk satu task terfokus.", "Bersihkan worktree lama yang sudah selesai agar tidak memakan kapasitas disk."],
      en: ["One worktree per focused task.", "Clean up completed worktrees to prevent disk space accumulation."],
    },
    tips: {
      id: ["Beri nama direktori worktree sesuai nomor tiket (misal: wt/feat-123).", "Gunakan symlink untuk file .env bersama agar setup instan."],
      en: ["Name worktree directories by ticket ID (e.g., wt/feat-123).", "Symlink shared .env files for instant workspace setup."],
    },
    pairsWellWith: ["ticket-ship", "cpr", "clean"],
    sourcePath: "skills/work/SKILL.md",
  },
]
