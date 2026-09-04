import type { BilingualString, BilingualList } from '@/types/skill'

export const SUPERPOWERS_SOURCE_REPO = 'github.com/obra/superpowers'
export const SUPERPOWERS_SOURCE_SHA = '0be96ff1f73752e55712165f9ea3d1bb0096baea'
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
    invocation: "user",
    description: {
      id: "Penyelarasan ide kreatif dan desain sistem via wawancara Sokrates satu per satu sebelum menyusun rencana.",
      en: "Creative alignment and system design via Socratic interview one question at a time before planning.",
    },
    detailedDescription: {
      id: "brainstorming mengklarifikasi ide dan desain arsitektur sebelum coding dimulai. Mengajukan satu pertanyaan fokus per waktu untuk menggali kebutuhan tersembunyi, mengevaluasi 2-3 pendekatan dengan trade-off nyata, dan memvalidasi arah sebelum menyusun spek.",
      en: "brainstorming refines creative ideas and architecture before code begins. It asks one focused question at a time to uncover requirements, evaluates 2-3 approaches with real trade-offs, and validates direction before formal planning.",
    },
    useWhen: {
      id: ["Memulai perancangan fitur baru yang masih konseptual atau fleksibel.", "Mengevaluasi trade-off arsitektural sebelum memilih pendekatan implementasi.", "Menemukan asumsi tersembunyi dan batasan edge-case sejak awal."],
      en: ["Starting design on new features that are still conceptual or flexible.", "Evaluating architectural trade-offs before choosing an implementation approach.", "Surfacing hidden assumptions and edge constraints early."],
    },
    avoidWhen: {
      id: ["Task kecil yang sudah memiliki spesifikasi teknis dan instruksi jelas."],
      en: ["Small tasks that already have locked specs and unambiguous instructions."],
    },
    howItWorks: {
      id: ["Gali kebutuhan dengan mengajukan satu pertanyaan terfokus per waktu.", "Teliti dokumen proyek dan codebase untuk menjawab pertanyaan sendiri.", "Tawarkan 2\u20133 alternatif pendekatan arsitektur beserta trade-off-nya.", "Dokumentasikan keputusan yang disepakati ke dalam artefak rencana."],
      en: ["Explore requirements asking one focused question at a time.", "Research project documents and codebase to answer own questions.", "Offer 2-3 architectural approaches with clear trade-offs.", "Document agreed decisions into a design or plan artifact."],
    },
    coreRules: {
      id: ["Satu pertanyaan per waktu; dilarang membombardir daftar pertanyaan panjang.", "Validasi arah desain sebelum beralih ke pembuatan rencana implementasi."],
      en: ["One question at a time; never dump long questionnaires.", "Validate design direction before proceeding to implementation planning."],
    },
    tips: {
      id: ["Lanjutkan dengan /writing-plans setelah arah arsitektur disepakati.", "Fokuskan diskusi pada batasan sistem dan trade-off."],
      en: ["Follow with /writing-plans once architectural direction is locked.", "Focus discussions on system constraints and explicit trade-offs."],
    },
    pairsWellWith: ["writing-plans", "subagent-driven-development", "systematic-debugging"],
    sourcePath: "skills/brainstorming/SKILL.md",
  },
  {
    name: "dispatching-parallel-agents",
    category: "architecture",
    invocation: "model",
    description: {
      id: "Orkestrasi eksekusi subagent independen secara paralel untuk task tanpa ketergantungan data.",
      en: "Orchestrates concurrent independent subagents for tasks with zero shared state.",
    },
    detailedDescription: {
      id: "dispatching-parallel-agents mengelola eksekusi tugas paralel secara aman. Memastikan setiap subagent bekerja di ruang lingkup file yang terisolasi tanpa konflik baca-tulis, mengumpulkan hasil kerja secara mandiri, dan menggabungkannya ke cabang utama.",
      en: "dispatching-parallel-agents executes independent tasks concurrently. Ensures each subagent operates in isolated file scopes without read-write collisions, collects outputs independently, and reconciles results cleanly.",
    },
    useWhen: {
      id: ["Menjalankan migrasi massal atau perbaikan lint di banyak modul terpisah.", "Mengeksekusi unit test atau audit keamanan secara bersamaan.", "Mengisi dataset independen yang tidak saling bergantung."],
      en: ["Running bulk migrations or lint fixes across isolated modules.", "Executing independent test suites or security scans in parallel.", "Processing disjoint datasets without shared mutations."],
    },
    avoidWhen: {
      id: ["Task berurutan di mana langkah berikutnya membutuhkan output langkah sebelumnya."],
      en: ["Sequential tasks where downstream steps depend on upstream outputs."],
    },
    howItWorks: {
      id: ["Petakan task-task yang sepenuhnya independen dan tidak berbagi state.", "Berikan prompt mandiri dan batasan file yang jelas ke tiap subagent.", "Jalankan subagent secara paralel di lingkungan terisolasi.", "Kumpulkan dan verifikasi hasil gabungan sebelum diserahkan."],
      en: ["Identify fully independent tasks with zero shared state mutations.", "Dispatch self-contained prompts and file scopes to each subagent.", "Run subagents concurrently in isolated environments.", "Aggregate and verify combined deliverables before reporting."],
    },
    coreRules: {
      id: ["Dilarang menugaskan dua subagent menulis ke file yang sama.", "Verifikasi hasil penggabungan akhir dengan test suite penuh."],
      en: ["Never assign two concurrent subagents to mutate the same file.", "Verify aggregated results against the full project test suite."],
    },
    tips: {
      id: ["Batasi konkurensi maksimal 3\u20135 subagent agar resource sistem tetap stabil.", "Gunakan git diff untuk memeriksa tidak ada tabrakan perubahan."],
      en: ["Limit concurrency to 3-5 subagents to keep system resources stable.", "Use git diff to verify no overlapping file modifications occurred."],
    },
    pairsWellWith: ["subagent-driven-development", "executing-plans", "writing-plans"],
    sourcePath: "skills/dispatching-parallel-agents/SKILL.md",
  },
  {
    name: "executing-plans",
    category: "architecture",
    invocation: "user",
    description: {
      id: "Eksekusi rencana bertahap dalam sesi terpisah: selesaikan task satu per satu dengan verifikasi ketat.",
      en: "Execute multi-step plans in dedicated sessions: task by task with strict verification.",
    },
    detailedDescription: {
      id: "executing-plans menjalankan file rencana implementasi secara berurutan dan disiplin. Menuntaskan setiap task langkah demi langkah, menjalankan tes otomatis di setiap tahap, dan menghentikan eksekusi jika terjadi anomali untuk dikonfirmasi.",
      en: "executing-plans guides disciplined, sequential plan execution. Completes tasks step by step, verifies automated tests at each boundary, and halts immediately if unexpected blockers emerge.",
    },
    useWhen: {
      id: ["Menjalankan rencana implementasi yang sudah ditulis oleh /writing-plans.", "Memastikan setiap langkah terverifikasi sebelum melangkah ke task berikutnya.", "Menjaga disiplin commit modular selama pengerjaan proyek."],
      en: ["Executing implementation plans written via /writing-plans.", "Ensuring each step is strictly verified before proceeding.", "Maintaining disciplined modular commits across project work."],
    },
    avoidWhen: {
      id: ["Mengerjakan task tanpa dokumen rencana; gunakan /writing-plans terlebih dahulu."],
      en: ["Working without a written plan; run /writing-plans first."],
    },
    howItWorks: {
      id: ["Muat dokumen rencana dari folder rencana proyek.", "Pilih satu task aktif berikutnya dan pahami acceptance criteria-nya.", "Terapkan perubahan kode dan jalankan verifikasi tes lokal.", "Tandai task selesai di dokumen rencana dan lanjutkan ke task berikutnya."],
      en: ["Load the plan document from the project plans directory.", "Select the next active task and review its acceptance criteria.", "Implement code changes and run local verification tests.", "Mark the task complete in the plan and proceed to the next step."],
    },
    coreRules: {
      id: ["Selesaikan satu task sepenuhnya sebelum berpindah ke task berikutnya.", "Wajib menjalankan tes verifikasi di setiap batas task."],
      en: ["Complete one task fully before moving to the next.", "Always run verification tests at every task boundary."],
    },
    tips: {
      id: ["Jaga riwayat commit tetap bersih dengan meng-commit per task yang selesai.", "Hentikan eksekusi jika menemukan asumsi rencana yang tidak sesuai kenyataan."],
      en: ["Keep commit history clean by committing per completed task.", "Pause execution if plan assumptions diverge from codebase reality."],
    },
    pairsWellWith: ["writing-plans", "subagent-driven-development", "test-driven-development"],
    sourcePath: "skills/executing-plans/SKILL.md",
  },
  {
    name: "finishing-a-development-branch",
    category: "shipping",
    invocation: "user",
    description: {
      id: "Tutup cabang fitur: putuskan strategi merge (rebase, squash, atau PR) setelah semua tes hijau.",
      en: "Conclude a development branch: select merge strategy once all tests are green.",
    },
    detailedDescription: {
      id: "finishing-a-development-branch menutup siklus cabang fitur secara bersih dan teratur. Memastikan tes akhir lolos 100%, membersihkan artefak lokal, dan memandu pemilihan strategi integrasi cabang (Squash and Merge vs Rebase).",
      en: "finishing-a-development-branch wraps up a feature branch with clean closure. Confirms all tests pass, cleans up temporary local files, and guides the branch integration strategy (Squash vs Rebase).",
    },
    useWhen: {
      id: ["Seluruh task pada cabang fitur telah selesai dan terverifikasi.", "Menentukan apakah cabang harus digabungkan langsung atau via Pull Request.", "Membersihkan cabang kerja lokal yang sudah berhasil digabungkan."],
      en: ["All tasks on a feature branch are finished and verified.", "Deciding whether to merge locally or submit a Pull Request.", "Cleaning up local branches and worktrees after successful merges."],
    },
    avoidWhen: {
      id: ["Masih ada tes unit yang gagal atau uncommitted changes yang berantakan."],
      en: ["Tests are still failing or uncommitted changes remain dirty."],
    },
    howItWorks: {
      id: ["Jalankan seluruh rangkaian tes dan quality gates proyek.", "Periksa ringkasan commit dan bersihkan riwayat branch jika perlu.", "Tanyakan kepada pengguna strategi integrasi yang diinginkan.", "Gabungkan cabang atau buka PR, lalu bersihkan worktree lokal."],
      en: ["Execute full project test suites and quality gates.", "Inspect commit summaries and tidy up history if necessary.", "Confirm the desired integration strategy with the user.", "Merge or submit PR, then clean up local worktrees."],
    },
    coreRules: {
      id: ["Dilarang menggabungkan cabang jika status tes belum hijau 100%.", "Hapus cabang fitur lokal hanya setelah perubahan aman di remote."],
      en: ["Never merge branches until all tests pass 100%.", "Delete local feature branches only after remote confirmation."],
    },
    tips: {
      id: ["Gunakan Squash and Merge untuk fitur berukuran kecil agar riwayat main rapi.", "Gunakan Rebase untuk menjaga komit modular terstruktur."],
      en: ["Use Squash and Merge for small features to keep main history tidy.", "Use Rebase to preserve well-structured modular commits."],
    },
    pairsWellWith: ["subagent-driven-development", "requesting-code-review", "cpr"],
    sourcePath: "skills/finishing-a-development-branch/SKILL.md",
  },
  {
    name: "receiving-code-review",
    category: "review",
    invocation: "user",
    description: {
      id: "Proses feedback code review secara objektif dan sistematis sebelum menerapkan perubahan.",
      en: "Process code review feedback systematically and objectively before changing code.",
    },
    detailedDescription: {
      id: "receiving-code-review membantu pengembang menanggapi komentar review kode dengan tenang dan metodis. Memvalidasi saran terhadap arsitektur yang ada, membedakan perbaikan wajib dari saran opsional, dan memverifikasi patch dengan tes.",
      en: "receiving-code-review helps engineers handle code review feedback calmly and methodically. Validates suggestions against architecture, distinguishes blockers from nits, and verifies patches with tests.",
    },
    useWhen: {
      id: ["Menerima komentar review dari rekan tim atau reviewer otomatis pada PR.", "Menyaring saran yang bertentangan dengan kebutuhan sistem atau spek.", "Menerapkan perbaikan secara bertahap dengan verifikasi yang teruji."],
      en: ["Receiving review comments from peers or automated review bots.", "Evaluating suggestions that may conflict with architectural constraints.", "Implementing requested revisions with automated test verification."],
    },
    avoidWhen: {
      id: ["Langsung menyetujui semua saran tanpa memahami implikasi kodenya."],
      en: ["Blindly accepting all suggestions without understanding code impact."],
    },
    howItWorks: {
      id: ["Baca seluruh komentar review dan kelompokkan berdasarkan prioritas.", "Periksa apakah ada saran yang bertentangan dengan arsitektur proyek.", "Diskusikan atau klarifikasi poin yang belum jelas dengan reviewer.", "Terapkan perbaikan yang disepakati dan jalankan kembali tes verifikasi."],
      en: ["Review all comments and categorize by priority and impact.", "Check whether any feedback conflicts with system architecture.", "Clarify ambiguous points respectfully with the reviewer.", "Implement agreed improvements and re-run automated test suites."],
    },
    coreRules: {
      id: ["Tetap objektif dan utamakan kualitas kode jangka panjang.", "Verifikasi setiap perubahan dengan tes sebelum melakukan push balasan."],
      en: ["Stay objective and prioritize long-term system health.", "Verify every revision with tests before pushing reply commits."],
    },
    tips: {
      id: ["Balas setiap komentar dengan tautan ke commit perbaikan yang relevan.", "Ucapkan terima kasih atas feedback yang konstruktif."],
      en: ["Reply to review threads linking directly to the resolving commit.", "Acknowledge helpful and insightful feedback constructively."],
    },
    pairsWellWith: ["requesting-code-review", "clean", "cpr"],
    sourcePath: "skills/receiving-code-review/SKILL.md",
  },
  {
    name: "requesting-code-review",
    category: "review",
    invocation: "user",
    description: {
      id: "Lakukan pre-commit review mandiri: scan keamanan, quality gates, dan validasi kepatuhan spesifikasi.",
      en: "Self-directed pre-commit review: security scanning, quality gates, and spec compliance.",
    },
    detailedDescription: {
      id: "requesting-code-review bertindak sebagai gerbang review mandiri sebelum kode diserahkan ke orang lain. Memindai potensi kebocoran secret, memeriksa kepatuhan terhadap spek asli, dan memastikan standar kualitas terpenuhi.",
      en: "requesting-code-review serves as a self-directed review gate before code is handed to external reviewers. Scans for credential leaks, verifies spec compliance, and validates project standards.",
    },
    useWhen: {
      id: ["Sebelum membuka Pull Request atau meminta review dari rekan tim.", "Memastikan tidak ada file konfigurasi sensitif atau token yang terbawa.", "Memeriksa bahwa seluruh acceptance criteria tiket telah terpenuhi."],
      en: ["Before submitting a Pull Request or asking teammates for review.", "Ensuring no sensitive configs or API tokens are inadvertently staged.", "Confirming all issue acceptance criteria are satisfied."],
    },
    avoidWhen: {
      id: ["Kode masih dalam tahap draft eksplorasi yang belum selesai."],
      en: ["Draft prototype exploration where code is known to be incomplete."],
    },
    howItWorks: {
      id: ["Jalankan pemindaian diff terhadap pola secret dan kunci API.", "Bandingkan perubahan kode dengan dokumen spesifikasi atau tiket.", "Jalankan linter, typecheck, dan tes otomatis.", "Sajikan checklist kesiapan review beserta ringkasan verifikasi."],
      en: ["Scan the diff for credentials, private keys, and secret patterns.", "Compare code changes against original spec acceptance criteria.", "Run linter, typecheck, and full automated test suites.", "Produce a review-readiness checklist with verification evidence."],
    },
    coreRules: {
      id: ["Dilarang menyerahkan kode jika ada potensi kebocoran rahasia.", "Pastikan diff tidak memuat perubahan di luar cakupan tiket."],
      en: ["Never request review if secret leaks are suspected.", "Ensure the diff does not contain out-of-scope modifications."],
    },
    tips: {
      id: ["Jalankan di akhir pengerjaan task subagent sebelum serah-terima.", "Gunakan git diff --stat untuk memeriksa ukuran perubahan."],
      en: ["Run at the conclusion of subagent tasks before sign-off.", "Inspect git diff --stat to ensure changes remain compact."],
    },
    pairsWellWith: ["receiving-code-review", "clean", "cpr"],
    sourcePath: "skills/requesting-code-review/SKILL.md",
  },
  {
    name: "subagent-driven-development",
    category: "architecture",
    invocation: "user",
    description: {
      id: "Arsitektur SDD: koordinator mendelegasikan task ke subagent terisolasi dengan review dua lapis.",
      en: "SDD Architecture: coordinator delegates tasks to isolated subagents with two-tier reviews.",
    },
    detailedDescription: {
      id: "subagent-driven-development (SDD) adalah arsitektur multi-agent terstruktur. Agen koordinator menjaga konteks tetap bersih (<50k tokens) dan menugaskan subagent independen untuk mengimplementasikan satu task, lalu mereview kepatuhan spesifikasi dan kualitas kode sebelum commit.",
      en: "subagent-driven-development (SDD) is a structured multi-agent architecture. The coordinator stays lean (<50k tokens) and delegates one task per fresh subagent, enforcing two-tier reviews (spec compliance and code quality) before commits.",
    },
    useWhen: {
      id: ["Mengeksekusi rencana implementasi fitur kompleks dengan banyak task.", "Menjaga kualitas context window agar agen tidak mengalami halusinasi.", "Menegakkan pengujian TDD dan review bertingkat secara otomatis."],
      en: ["Executing complex multi-task feature plans end to end.", "Maintaining clean context windows to prevent LLM hallucinations.", "Enforcing automated TDD and tiered reviews at each step."],
    },
    avoidWhen: {
      id: ["Perbaikan bug sebaris yang dapat diselesaikan dalam 1 turn langsung."],
      en: ["Trivial one-line fixes easily completed in a single direct turn."],
    },
    howItWorks: {
      id: ["Koordinator memuat rencana implementasi dan memilih task aktif.", "Kirimkan instruksi task terisolasi ke subagent implementer baru.", "Subagent menerapkan perubahan dengan metodologi TDD dan menjalankan tes.", "Koordinator mereview hasil, melakukan commit, dan melanjutkan ke task berikutnya."],
      en: ["Coordinator loads the plan and selects the active task.", "Dispatches an isolated prompt to a fresh implementer subagent.", "Subagent executes changes via TDD and confirms passing tests.", "Coordinator reviews deliverables, commits, and picks the next task."],
    },
    coreRules: {
      id: ["Satu subagent untuk satu task terfokus; buang konteks setelah selesai.", "Koordinator wajib mereview kepatuhan spek dan kualitas kode."],
      en: ["One subagent per focused task; discard context upon task completion.", "Coordinator must enforce spec compliance and code quality reviews."],
    },
    tips: {
      id: ["Jaga koordinator tetap di bawah 50k tokens (Smart Zone).", "Gunakan TDD untuk setiap implementasi fungsional baru."],
      en: ["Keep coordinator context below 50k tokens (Smart Zone).", "Enforce TDD for all newly added functionality."],
    },
    pairsWellWith: ["writing-plans", "executing-plans", "test-driven-development"],
    sourcePath: "skills/subagent-driven-development/SKILL.md",
  },
  {
    name: "systematic-debugging",
    category: "engineering",
    invocation: "user",
    description: {
      id: "Metodologi debugging 4 fase: pahami akar masalah, reproduksi via tes, perbaiki, dan verifikasi.",
      en: "4-phase debugging methodology: understand root cause, reproduce via test, fix, and verify.",
    },
    detailedDescription: {
      id: "systematic-debugging melarang tebakan buta saat menangani bug. Mengharuskan pengembang membuat tes reproduksi yang gagal terlebih dahulu, menelusuri aliran data hingga ke akar penyebabnya, menerapkan perbaikan minimal, dan membuktikan tes kini berhasil.",
      en: "systematic-debugging forbids guesswork during bugfixes. Mandates writing a failing reproduction test first, tracing data flows to the root cause, applying minimal fixes, and proving the test passes.",
    },
    useWhen: {
      id: ["Menghadapi bug misterius atau kegagalan tes yang tidak dapat dijelaskan.", "Mencegah perbaikan parsial yang hanya menambal gejala di permukaan.", "Menjamin bug yang diperbaiki tidak akan mengalami regresi di masa depan."],
      en: ["Investigating mysterious bugs or unexplained test failures.", "Preventing surface-level symptom patching that leaves root causes intact.", "Guaranteeing resolved defects will not regress in future releases."],
    },
    avoidWhen: {
      id: ["Bug sepele berupa typo sintaks atau kesalahan penamaan variabel sederhana."],
      en: ["Trivial syntax typos or obvious variable renaming mistakes."],
    },
    howItWorks: {
      id: ["Pahami masalah dan amati perilaku yang diharapkan vs aktual.", "Buat tes otomatis minimal yang secara konsisten mereproduksi kegagalan.", "Telusuri kode dan identifikasi mekanisme akar kegagalan.", "Terapkan perbaikan terkecil yang valid dan buktikan tes kini hijau."],
      en: ["Understand the problem and contrast expected vs actual behavior.", "Author a minimal automated test that consistently reproduces failure.", "Trace execution and isolate the exact root cause mechanism.", "Apply the smallest correct fix and verify the test turns green."],
    },
    coreRules: {
      id: ["Dilarang memperbaiki kode sebelum berhasil mereproduksi bug dengan tes.", "Perbaikan harus menyelesaikan akar masalah, bukan sekadar menutupi error."],
      en: ["Never modify application code before reproducing the bug in a test.", "Fixes must target root mechanisms rather than masking symptoms."],
    },
    tips: {
      id: ["Simpan tes reproduksi sebagai bagian permanen dari test suite proyek.", "Hindari mengubah banyak file sekaligus saat mencari penyebab bug."],
      en: ["Retain reproduction tests as permanent additions to the test suite.", "Avoid mutating multiple files concurrently when isolating defects."],
    },
    pairsWellWith: ["test-driven-development", "runtime-debug", "subagent-driven-development"],
    sourcePath: "skills/systematic-debugging/SKILL.md",
  },
  {
    name: "test-driven-development",
    category: "engineering",
    invocation: "user",
    description: {
      id: "Siklus disiplin TDD Red-Green-Refactor: tulis tes yang gagal terlebih dahulu sebelum kode implementasi.",
      en: "Disciplined TDD Red-Green-Refactor cycle: write failing tests before implementation code.",
    },
    detailedDescription: {
      id: "test-driven-development menegakkan siklus Red-Green-Refactor yang ketat. Menulis tes unit terkecil yang gagal terlebih dahulu (Red), menulis kode minimal untuk membuatnya lulus (Green), lalu merapikan struktur kode tanpa mengubah perilakunya (Refactor).",
      en: "test-driven-development enforces strict Red-Green-Refactor loops. Write the smallest failing unit test first (Red), implement minimal code to pass (Green), and refactor cleanly while preserving behavior (Refactor).",
    },
    useWhen: {
      id: ["Mengimplementasikan logika bisnis baru, fungsi utilitas, atau parser.", "Membangun komponen sistem yang membutuhkan keandalan dan determinisme tinggi.", "Memastikan kode baru memiliki cakupan tes otomatis 100% sejak awal."],
      en: ["Implementing new business logic, utility functions, or parsers.", "Building core system components requiring high reliability.", "Ensuring new code achieves complete test coverage by design."],
    },
    avoidWhen: {
      id: ["Eksplorasi prototyping cepat di mana antarmuka API masih berubah drastis."],
      en: ["Rapid prototyping spikes where API signatures shift continuously."],
    },
    howItWorks: {
      id: ["Tulis tes unit yang memvalidasi satu perilaku spesifik (fase Red).", "Jalankan tes dan buktikan bahwa tes gagal dengan alasan yang tepat.", "Tulis kode implementasi paling sederhana agar tes lulus (fase Green).", "Refaktor kode untuk kebersihan dan performa (fase Refactor)."],
      en: ["Write a unit test exercising one specific behavior (Red phase).", "Execute the test and confirm it fails for the expected reason.", "Write minimal implementation code to make the test pass (Green phase).", "Refactor code for elegance and performance without breaking tests."],
    },
    coreRules: {
      id: ["Dilarang menulis kode implementasi sebelum ada tes yang gagal.", "Tes wajib menguji perilaku fungsional nyata, bukan detail implementasi internal."],
      en: ["Never write implementation code before a failing test exists.", "Tests must validate observable behaviors rather than internal mechanics."],
    },
    tips: {
      id: ["Jaga setiap siklus TDD berlangsung cepat (2\u20135 menit per siklus).", "Jalankan test watcher lokal agar feedback loop instan."],
      en: ["Keep each TDD iteration loop fast (2-5 minutes per cycle).", "Run local test runners in watch mode for instant feedback."],
    },
    pairsWellWith: ["systematic-debugging", "subagent-driven-development", "writing-plans"],
    sourcePath: "skills/test-driven-development/SKILL.md",
  },
  {
    name: "using-git-worktrees",
    category: "engineering",
    invocation: "user",
    description: {
      id: "Kelola git worktrees secara aman untuk isolasi cabang fitur dan pengujian multi-sesi.",
      en: "Manage git worktrees safely for feature branch isolation and multi-session work.",
    },
    detailedDescription: {
      id: "using-git-worktrees menyediakan prosedur standar untuk membuat, menggunakan, dan membersihkan git worktree. Menghindari tabrakan branch, memelihara dependensi lokal, dan menjaga workspace utama tetap rapi.",
      en: "using-git-worktrees establishes safe operational protocols for creating, operating, and cleaning git worktrees. Prevents branch collisions and keeps the primary workspace intact.",
    },
    useWhen: {
      id: ["Mengerjakan beberapa fitur atau hotfix secara bersamaan.", "Menguji perubahan pada cabang lain tanpa perlu stash uncommitted changes.", "Menyediakan lingkungan kerja terisolasi untuk subagent otomatis."],
      en: ["Working on multiple concurrent features or hotfixes in parallel.", "Testing PR branches without stashing uncommitted changes.", "Providing clean, isolated working environments for autonomous subagents."],
    },
    avoidWhen: {
      id: ["Perubahan kecil pada satu file di cabang kerja saat ini."],
      en: ["Minor one-file edits on the active working branch."],
    },
    howItWorks: {
      id: ["Tentukan nama cabang dan direktori worktree terpisah.", "Buat worktree baru melalui git worktree add.", "Hubungkan dependensi atau konfigurasi lingkungan (.env).", "Hapus worktree setelah pekerjaan selesai melalui git worktree remove."],
      en: ["Define target branch name and dedicated worktree path.", "Spawn the new worktree via git worktree add.", "Symlink shared dependencies or environment files (.env).", "Prune the worktree after work concludes via git worktree remove."],
    },
    coreRules: {
      id: ["Selalu hapus worktree setelah cabang digabungkan ke cabang utama.", "Jangan biarkan worktree terbengkalai memakan ruang penyimpanan disk."],
      en: ["Always prune worktrees once branches merge into main.", "Never abandon orphaned worktrees consuming disk resources."],
    },
    tips: {
      id: ["Simpan semua worktree dalam satu direktori induk (misal: .worktrees/).", "Pastikan folder worktree terdaftar di .gitignore global atau proyek."],
      en: ["Keep all worktrees inside a dedicated directory (e.g., .worktrees/).", "Ensure worktree folders are ignored in .gitignore."],
    },
    pairsWellWith: ["work", "subagent-driven-development", "ticket-ship"],
    sourcePath: "skills/using-git-worktrees/SKILL.md",
  },
  {
    name: "using-superpowers",
    category: "architecture",
    invocation: "model",
    description: {
      id: "Meta-skill pengenalan ekosistem Superpowers: cara menemukan, memilih, dan memicu skill yang tepat.",
      en: "Meta-skill for the Superpowers framework: discovering, selecting, and invoking skills.",
    },
    detailedDescription: {
      id: "using-superpowers adalah panduan navigasi untuk seluruh keahlian dalam framework Superpowers. Memetakan alur kerja dari ide hingga rilis dan mengarahkan agen ke keahlian yang paling tepat sesuai fase proyek saat ini.",
      en: "using-superpowers is the central router for the Superpowers framework. Maps workflows from idea conception to final shipment and directs agents to the appropriate skill for their project phase.",
    },
    useWhen: {
      id: ["Di awal percakapan ketika belum yakin keahlian mana yang harus digunakan.", "Menemukan keahlian yang sesuai untuk fase perancangan, eksekusi, atau review.", "Memahami aturan dan filosofi arsitektur agen Superpowers."],
      en: ["At conversation onset when selecting the optimal skill workflow.", "Discovering skills matching design, execution, or review phases.", "Understanding core Superpowers multi-agent architectural principles."],
    },
    avoidWhen: {
      id: ["Ketika sudah mengetahui skill spesifik yang ingin dipanggil langsung."],
      en: ["When the specific target skill to invoke is already known."],
    },
    howItWorks: {
      id: ["Evaluasi status pekerjaan saat ini: ide, perencanaan, coding, atau review.", "Petakan kebutuhan ke keahlian spesifik yang paling relevan.", "Muat instruksi keahlian target dan terapkan panduannya.", "Arahkan transisi ke keahlian berikutnya saat fase selesai."],
      en: ["Assess current project phase: idea, plan, code, or review.", "Map requirements to the highest-leverage specialized skill.", "Load target skill instructions and execute guidelines.", "Transition cleanly to downstream skills as phases conclude."],
    },
    coreRules: {
      id: ["Pilih skill yang paling spesifik untuk kebutuhan saat ini.", "Patuhi batasan context window koordinator agar tetap di bawah 50k token."],
      en: ["Select the most specialized skill matching the immediate task.", "Preserve coordinator context window budgets below 50k tokens."],
    },
    tips: {
      id: ["Gunakan brainstorming untuk ide baru, dan subagent-driven-development untuk eksekusi.", "Rujuk alur diagram jika bingung menentukan langkah berikutnya."],
      en: ["Use brainstorming for new ideas, and subagent-driven-development for execution.", "Consult the workflow diagram when charting next steps."],
    },
    pairsWellWith: ["brainstorming", "subagent-driven-development", "writing-plans"],
    sourcePath: "skills/using-superpowers/SKILL.md",
  },
  {
    name: "verification-before-completion",
    category: "shipping",
    invocation: "user",
    description: {
      id: "Gerbang verifikasi mutlak: jalankan bukti nyata eksekusi sebelum mengklaim pekerjaan selesai.",
      en: "Mandatory verification gate: execute real proof commands before claiming completion.",
    },
    detailedDescription: {
      id: "verification-before-completion mewajibkan bukti empiris nyata sebelum mengklaim suatu pekerjaan telah tuntas. Melarang asumsi dan mewajibkan eksekusi tes otomatis, pemeriksaan status build, atau bukti tangkapan layar visual nyata.",
      en: "verification-before-completion mandates empirical execution evidence before claiming any task is done. Prohibits guesswork and requires passing test suites, green build outputs, or real visual evidence.",
    },
    useWhen: {
      id: ["Sebelum menyatakan suatu task selesai atau siap diserah-terimakan.", "Mencegah laporan 'selesai' palsu saat tes atau build sebenarnya masih gagal.", "Memvalidasi seluruh kriteria keberhasilan sebelum membuat commit akhir."],
      en: ["Before announcing a task is finished or ready for handoff.", "Preventing false completion claims when builds or tests are broken.", "Validating all acceptance criteria before authoring the final commit."],
    },
    avoidWhen: {
      id: ["Di tengah-tengah pengerjaan kode saat pengujian belum siap dijalankan."],
      en: ["Midway through drafting code before test harnesses are in place."],
    },
    howItWorks: {
      id: ["Periksa seluruh acceptance criteria yang diminta pada task.", "Jalankan perintah tes otomatis dan verifikasi exit code 0.", "Jalankan build produksi dan linter proyek.", "Sertakan cuplikan output nyata dari terminal sebagai bukti penyelesaian."],
      en: ["Review all required task acceptance criteria.", "Execute automated test commands and confirm zero exit codes.", "Run production build and lint verification commands.", "Present actual terminal output evidence validating success."],
    },
    coreRules: {
      id: ["Dilarang mengklaim selesai tanpa bukti output perintah nyata.", "Jika ada satu tes yang gagal, pekerjaan belum dapat dinyatakan tuntas."],
      en: ["Never claim completion without real command output evidence.", "If a single test fails, the task cannot be considered complete."],
    },
    tips: {
      id: ["Jalankan npm run build atau bun run test sebagai pemeriksaan final.", "Tunjukkan bukti terminal ringkas kepada pengguna."],
      en: ["Execute npm run build or test runners as final verification.", "Present clean, concise terminal output proof to the user."],
    },
    pairsWellWith: ["finishing-a-development-branch", "requesting-code-review", "cpr"],
    sourcePath: "skills/verification-before-completion/SKILL.md",
  },
  {
    name: "writing-plans",
    category: "architecture",
    invocation: "user",
    description: {
      id: "Penyusunan dokumen rencana implementasi terperinci dengan task modular, acceptance criteria, dan tes.",
      en: "Detailed implementation plan authoring with modular tasks, acceptance criteria, and tests.",
    },
    detailedDescription: {
      id: "writing-plans menghasilkan dokumen rencana kerja yang siap dieksekusi secara otonom. Memecah fitur besar menjadi langkah-langkah kecil (2\u20135 file per task), mendefinisikan kriteria keberhasilan yang jelas, dan menyertakan perintah verifikasi untuk tiap langkah.",
      en: "writing-plans generates actionable, self-contained implementation plan files. Breaks features into small modular tasks (2-5 files each), defines explicit acceptance criteria, and includes exact verification commands.",
    },
    useWhen: {
      id: ["Setelah fase brainstorming selesai dan spesifikasi teknis sudah disepakati.", "Menyiapkan panduan eksekusi untuk subagent otomatis atau tim pengembang.", "Mencegah ketergantungan konteks yang berlebihan saat pengerjaan fitur besar."],
      en: ["After brainstorming concludes and technical specs are settled.", "Preparing execution roadmaps for autonomous subagents or teammates.", "Preventing context bloat when building large, multi-component features."],
    },
    avoidWhen: {
      id: ["Spesifikasi masih belum jelas; gunakan /brainstorming terlebih dahulu."],
      en: ["Requirements are still ambiguous; use /brainstorming first."],
    },
    howItWorks: {
      id: ["Tinjau spesifikasi dan arsitektur yang telah disepakati.", "Pecah pekerjaan menjadi task-task modular berurutan.", "Tentukan file yang disentuh, kriteria selesai, dan tes verifikasi per task.", "Simpan dokumen rencana terstruktur ke dalam direktori rencana proyek."],
      en: ["Review agreed requirements and architecture.", "Deconstruct the work into sequential, bite-sized tasks.", "Define modified files, completion criteria, and tests per task.", "Save the structured plan document into the project plans folder."],
    },
    coreRules: {
      id: ["Tiap task harus modular dan dapat diverifikasi secara independen.", "Sertakan perintah tes verifikasi konkret pada setiap task."],
      en: ["Each task must be bite-sized and independently verifiable.", "Include concrete automated test commands in every task definition."],
    },
    tips: {
      id: ["Gunakan format Markdown terstruktur dengan checkbox untuk melacak progres.", "Simpan file rencana di folder .hermes/plans/ atau docs/plans/."],
      en: ["Use structured Markdown with checklists to track execution progress.", "Store plan files in .hermes/plans/ or docs/plans/."],
    },
    pairsWellWith: ["brainstorming", "executing-plans", "subagent-driven-development"],
    sourcePath: "skills/writing-plans/SKILL.md",
  },
  {
    name: "writing-skills",
    category: "architecture",
    invocation: "user",
    description: {
      id: "Penulisan dan standarisasi keahlian agent (SKILL.md): struktur frontmatter, deskripsi pemicu, dan invariant.",
      en: "Agent skill authoring and standardization: frontmatter, trigger descriptions, and invariants.",
    },
    detailedDescription: {
      id: "writing-skills menetapkan format baku pembuatan berkas SKILL.md untuk agen kecerdasan buatan. Mengoptimalkan deskripsi pemicu agar agent mengetahui kapan harus memanggil skill, menyusun aturan inti yang tak dapat ditawar, dan mengemas skrip pembantu.",
      en: "writing-skills establishes rigorous quality standards for SKILL.md agent files. Crafts high-signal trigger descriptions so models invoke skills accurately, structures non-negotiable invariants, and packages helper scripts.",
    },
    useWhen: {
      id: ["Membuat skill baru untuk mengotomatiskan alur kerja tim yang berulang.", "Mengevaluasi atau memperbarui skill lama agar lebih hemat token konteks.", "Menstandarisasi format repositori skill sebelum dipublikasikan."],
      en: ["Authoring new skills to automate recurring engineering workflows.", "Refactoring legacy skills to optimize token efficiency.", "Standardizing skill bundles for public or organizational distribution."],
    },
    avoidWhen: {
      id: ["Menyimpan data catatan tugas sementara yang cepat basi ke dalam file skill."],
      en: ["Dumping transient task logs or rapidly expiring data into skills."],
    },
    howItWorks: {
      id: ["Tentukan nama skill (kebab-case) dan deskripsi pemicu (trigger description).", "Susun bagian When to Use dan When Not to Use yang tegas.", "Tuliskan aturan inti (Core Invariants) dan instruksi alur kerja bertahap.", "Uji efektivitas skill dengan skenario evaluasi nyata."],
      en: ["Define skill name (kebab-case) and precise trigger description.", "Draft strict When to Use and When Not to Use boundaries.", "Structure non-negotiable core invariants and phased procedures.", "Validate skill efficacy against real evaluation test cases."],
    },
    coreRules: {
      id: ["Deskripsi pada frontmatter wajib menjelaskan kondisi pemicu secara jelas.", "Gunakan bahasa deklaratif yang padat dan bebas filler."],
      en: ["Frontmatter descriptions must state unambiguous activation triggers.", "Use concise declarative language free of conversational filler."],
    },
    tips: {
      id: ["Pelajari pola skill Matt Pocock atau Superpowers sebagai tolok ukur kualitas.", "Pisahkan skrip panjang ke dalam subfolder scripts/ daripada menumpuknya di SKILL.md."],
      en: ["Study Matt Pocock or Superpowers skills as quality benchmarks.", "Extract heavy scripts into a scripts/ folder rather than inlining."],
    },
    pairsWellWith: ["using-superpowers", "writing-plans", "subagent-driven-development"],
    sourcePath: "skills/writing-skills/SKILL.md",
  },
]
