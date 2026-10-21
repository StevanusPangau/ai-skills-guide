import type { BilingualString, BilingualList } from '@/types/skill'

// Verified 2026-10-20 against neondatabase/agent-skills @ d814689
// (commit message starts "Merge pull request #149"). LICENSE at repo root is
// Apache-2.0. Nine skills under skills/; neon-postgres-agent-platforms lives in
// a different repo (neondatabase/neon-for-agent-platforms) and is excluded.

export const NEON_SOURCE_REPO = 'github.com/neondatabase/agent-skills'
export const NEON_SOURCE_SHA = 'd814689cbba1506b7a25a7a6df5346258ba8ccf8'
export const SOURCE_REPO = NEON_SOURCE_REPO
export const SOURCE_SHA = NEON_SOURCE_SHA

/** Category labels shared by the catalog filter chips and skill pages. */
export const NEON_CATEGORIES = [
  { label: 'Start', value: 'start' },
  { label: 'Postgres', value: 'postgres' },
  { label: 'Platform', value: 'platform' },
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

export const neonSkills: RichSkill[] = [
  {
    name: 'neon',
    category: 'start',
    invocation: 'model',
    description: {
      id: 'Overview Neon: Lakebase Postgres plus Auth, Object Storage, Functions, AI Gateway, dan Realtime. Mulai di sini untuk backend baru.',
      en: 'Overview of Neon: Lakebase Postgres plus Auth, Object Storage, Functions, AI Gateway, and Realtime. Start here for new backends.',
    },
    detailedDescription: {
      id: 'Skill induk resmi Neon. Neon adalah kumpulan cloud backend primitives di sekitar Lakebase Postgres (dari Databricks): Auth (Managed Better Auth), Functions jangka panjang, Object Storage S3-compatible, AI Gateway, dan Realtime (live SQL, beta). Branch adalah clone copy-on-write yang terisolasi. Agent memakai skill ini untuk memilih primitif yang belum ada, menyiapkan CLI atau MCP, dan mengikuti alur branch-first (`neon init` / `link` / `neon.ts` / `neon deploy`). Child skill `neon-postgres` menang untuk `DATABASE_URL` yang sudah ada, SQL, schema, inspect, atau search; `neon-auth` untuk login/users/sessions; `neon-realtime` untuk live queries. Object Storage, Functions, AI Gateway, dan Realtime saat ini tersedia di `aws-us-east-2`, `aws-us-east-1`, `aws-eu-central-1`, dan `aws-ap-southeast-1`.',
      en: 'Official parent Neon skill. Neon is a set of cloud backend primitives around Lakebase Postgres (from Databricks): Auth (Managed Better Auth), long-running Functions, S3-compatible Object Storage, an AI Gateway, and Realtime (live SQL, beta). A branch is an isolated copy-on-write clone. Agents use this skill to pick undecided primitives, set up the CLI or MCP server, and follow the branch-first workflow (`neon init` / `link` / `neon.ts` / `neon deploy`). Child skill `neon-postgres` wins for an existing `DATABASE_URL`, SQL, schema, inspect, or search; `neon-auth` for login/users/sessions; `neon-realtime` for live queries. Object Storage, Functions, AI Gateway, and Realtime are currently available in `aws-us-east-2`, `aws-us-east-1`, `aws-eu-central-1`, and `aws-ap-southeast-1`.',
    },
    useWhen: {
      id: [
        'Membangun app atau backend baru di Neon / Lakebase Postgres.',
        'Memilih Auth, files, Functions, AI Gateway, atau Realtime yang belum ditentukan.',
        'Menyiapkan CLI, MCP, Claimable Neon, atau alur `neon.ts` branch-first.',
      ],
      en: [
        'Building a new app or backend on Neon / Lakebase Postgres.',
        'Choosing undecided Auth, files, Functions, AI Gateway, or Realtime.',
        'Setting up the CLI, MCP, Claimable Neon, or the branch-first `neon.ts` flow.',
      ],
    },
    avoidWhen: {
      id: [
        'Sudah ada `DATABASE_URL` dan pekerjaan utamanya SQL/schema/inspect/search — pakai `neon-postgres`.',
        'Fokus hanya login/users/sessions atau routing identitas — pakai `neon-auth`.',
        'Fokus live SQL / reactive UI dari baris database — pakai `neon-realtime`.',
      ],
      en: [
        'An existing `DATABASE_URL` with SQL/schema/inspect/search work — use `neon-postgres`.',
        'Login, users, sessions, or identity routing only — use `neon-auth`.',
        'Live SQL / reactive UI from database rows — use `neon-realtime`.',
      ],
    },
    howItWorks: {
      id: [
        'Petakan kemampuan yang diminta: login, files, HTTP APIs, LLM, live data, SQL.',
        'Reuse yang sudah ada (`DATABASE_URL`, IdP, S3, `neon.ts`); jangan ganti tanpa permintaan.',
        'Pilih primitif Neon hanya untuk yang masih undecided; provision dengan `neon init` / `link`, tulis `neon.ts`, lalu `neon deploy`.',
        'Verifikasi alur app (sign-in, upload, API), bukan hanya env vars.',
      ],
      en: [
        'Map requested capabilities: login, files, HTTP APIs, LLM calls, live data, SQL.',
        'Reuse what already exists (`DATABASE_URL`, IdP, S3, `neon.ts`); do not replace without an ask.',
        'Select Neon primitives only for undecided gaps; provision with `neon init` / `link`, write `neon.ts`, then `neon deploy`.',
        'Verify the app flow (sign-in, upload, API call), not only that env vars landed.',
      ],
    },
    coreRules: {
      id: [
        'Neon menyediakan backend primitives; Neon tidak meng-host frontend.',
        'Jangan mengganti Better Auth / Clerk / Supabase Auth / S3 / `DATABASE_URL` yang sudah bekerja kecuali user meminta.',
        'Data API hanya untuk migrasi PostgREST / Supabase database client; app baru query Postgres dari Functions atau handler yang ada.',
        'Prefer pooled `DATABASE_URL` untuk traffic aplikasi; proyek baru di region AWS.',
      ],
      en: [
        'Neon provides backend primitives; Neon does not host the frontend.',
        'Do not replace working Better Auth, Clerk, Supabase Auth, S3, or a supplied `DATABASE_URL` unless the user asks.',
        'Offer the Data API only for PostgREST / Supabase database-client migration; new apps query Postgres from Functions or existing handlers.',
        'Prefer pooled `DATABASE_URL` for application traffic; new projects are created in AWS regions.',
      ],
    },
    tips: {
      id: [
        'Prefer CLI daripada MCP kecuali CLI tidak tersedia, terblokir, atau belum terautentikasi.',
        'Dokumentasi resmi: cari dulu di https://neon.com/docs/llms.txt, lalu fetch halaman `.md`.',
        'Function harus mulai mengembalikan response dalam 15 menit; stream tenang butuh setidaknya satu byte setiap 15 menit.',
      ],
      en: [
        'Prefer the CLI over the MCP server unless the CLI is unavailable, blocked, or unauthenticated.',
        'Official docs: look up pages in https://neon.com/docs/llms.txt first, then fetch the `.md` page.',
        'A Function must start returning a response within 15 minutes; quiet streams need at least one byte every 15 minutes.',
      ],
    },
    pairsWellWith: [
      'neon-postgres',
      'neon-auth',
      'neon-functions',
      'neon-object-storage',
      'neon-ai-gateway',
      'neon-realtime',
    ],
    spotlight: {
      title: {
        id: 'Parent vs child skill routing',
        en: 'Parent vs child skill routing',
      },
      body: {
        id: '`neon` adalah overview untuk backend baru dan primitif yang belum dipilih. `neon-postgres` menang saat sudah ada `DATABASE_URL` atau pekerjaan SQL/schema/inspect/search. `neon-auth` menang untuk identitas. `neon-realtime` menang untuk live queries. Platform skills lain (Object Storage, Functions, AI Gateway, branches, egress) dipakai setelah routing induk selesai.',
        en: '`neon` is the overview for new backends and undecided primitives. `neon-postgres` wins when there is already a `DATABASE_URL` or the work is SQL/schema/inspect/search. `neon-auth` wins for identity. `neon-realtime` wins for live queries. Other platform skills (Object Storage, Functions, AI Gateway, branches, egress) follow after parent routing.',
      },
    },
    sourcePath: 'skills/neon/SKILL.md',
  },
  {
    name: 'neon-postgres',
    category: 'postgres',
    invocation: 'model',
    description: {
      id: 'Indeks praktik Lakebase Postgres: pooled vs direct, branching, autoscaling, scale-to-zero, instant restore, read replicas, IP allow lists, logical replication, dan Lakebase Search.',
      en: 'Lakebase Postgres practices index: pooled vs direct, branching, autoscaling, scale-to-zero, instant restore, read replicas, IP allow lists, logical replication, and Lakebase Search.',
    },
    detailedDescription: {
      id: 'Skill untuk pekerjaan database yang sudah punya `DATABASE_URL`, SQL, schema, inspect, atau search. Mencakup pemilihan koneksi pooled vs direct, driver/ORM, migrasi schema sebagai kode, branching (detail tipe branch di `neon-postgres-branches`), troubleshooting via `neon inspect db` / MCP `inspect_database`, autoscaling, scale-to-zero, instant restore, read replicas, connection pooling, IP allow lists, logical replication, dan Lakebase Search. Login/users/sessions ke `neon-auth`; live queries ke `neon-realtime`; backend baru ke parent `neon`.',
      en: 'Skill for database work with an existing `DATABASE_URL`, SQL, schema, inspect, or search. Covers pooled vs direct connections, drivers/ORMs, schema-as-code migrations, branching (branch-type detail in `neon-postgres-branches`), troubleshooting via `neon inspect db` / MCP `inspect_database`, autoscaling, scale-to-zero, instant restore, read replicas, connection pooling, IP allow lists, logical replication, and Lakebase Search. Login/users/sessions go to `neon-auth`; live queries to `neon-realtime`; new backends to the parent `neon` skill.',
    },
    useWhen: {
      id: [
        'Ada `DATABASE_URL` dan pekerjaan SQL, schema, inspect, atau search.',
        'Memilih pooled vs direct, driver, atau alur migrasi di Neon.',
        'Menyetel autoscaling, scale-to-zero, restore, read replicas, IP allow, atau logical replication.',
      ],
      en: [
        'An existing `DATABASE_URL` with SQL, schema, inspect, or search work.',
        'Choosing pooled vs direct connections, a driver, or migration flow on Neon.',
        'Configuring autoscaling, scale-to-zero, restore, read replicas, IP allow lists, or logical replication.',
      ],
    },
    avoidWhen: {
      id: [
        'Backend baru tanpa `DATABASE_URL` — mulai dari parent `neon`.',
        'Setup Managed Better Auth / routing identitas — `neon-auth`.',
        'Live SQL reactive UI — `neon-realtime`.',
      ],
      en: [
        'A new backend with no `DATABASE_URL` — start from the parent `neon` skill.',
        'Managed Better Auth / identity routing — `neon-auth`.',
        'Live SQL reactive UI — `neon-realtime`.',
      ],
    },
    howItWorks: {
      id: [
        'Reuse `DATABASE_URL` atau `.neon` yang sudah ada; jangan membuat project kedua untuk schema work.',
        'Ambil connection string bila perlu; pilih pooled untuk web/serverless, direct untuk migrasi/dump/replication/admin.',
        'Pertahankan ORM/driver yang ada; kelola schema sebagai kode.',
        'Uji migrasi di branch dengan connection string direct (hostname tanpa `-pooler`).',
      ],
      en: [
        'Reuse an existing `DATABASE_URL` or `.neon`; do not create a second project for schema work.',
        'Fetch a connection string when needed; prefer pooled for web/serverless, direct for migrations/dumps/replication/admin.',
        'Preserve the existing ORM and driver; manage schema as code.',
        'Test migrations on a branch with a direct (non-pooled) connection string (hostname without `-pooler`).',
      ],
    },
    coreRules: {
      id: [
        'Web apps dan serverless functions: pooled (`-pooler`). Migrasi, pg_dump/pg_restore, logical replication, analytics dengan temp tables, admin SET/session, LISTEN/NOTIFY: direct.',
        'Jangan menjalankan ad hoc schema migration yang sulit dikelola; ikut praktik ORM.',
        'Untuk detail normal vs schema-only vs reset-from-parent, pakai `neon-postgres-branches`.',
      ],
      en: [
        'Web apps and serverless functions: pooled (`-pooler`). Migrations, pg_dump/pg_restore, logical replication, long-running analytics with temp tables, admin SET/session state, LISTEN/NOTIFY: direct.',
        'Avoid hard-to-manage ad hoc schema migrations; follow the ORM’s practices.',
        'For normal vs schema-only vs reset-from-parent detail, use `neon-postgres-branches`.',
      ],
    },
    tips: {
      id: [
        'Di Vercel Fluid dan Cloudflare Hyperdrive, serta di Neon Functions: `node-postgres` (`pg`). Edge/serverless lain: `@neondatabase/serverless`.',
        'Pakai `neon inspect db` / MCP sebelum menulis catalog query manual.',
        'Stats `pg_stat_statements` bisa kosong setelah compute scale-to-zero — lihat juga `neon-postgres-egress-optimizer`.',
      ],
      en: [
        'On Vercel Fluid and Cloudflare Hyperdrive, and on Neon Functions: `node-postgres` (`pg`). Other serverless/edge: `@neondatabase/serverless`.',
        'Prefer `neon inspect db` / MCP before hand-writing catalog queries.',
        '`pg_stat_statements` can be empty after compute scales to zero — see also `neon-postgres-egress-optimizer`.',
      ],
    },
    pairsWellWith: [
      'neon',
      'neon-postgres-branches',
      'neon-postgres-egress-optimizer',
    ],
    spotlight: {
      title: {
        id: 'Pooled vs direct',
        en: 'Pooled vs direct',
      },
      body: {
        id: 'Traffic aplikasi web/serverless memakai pooled connection. Schema migrations, dump/restore, logical replication, dan tugas admin yang butuh session state memakai direct URL (hostname tanpa suffix `-pooler`).',
        en: 'Application web/serverless traffic uses a pooled connection. Schema migrations, dump/restore, logical replication, and admin tasks that need session state use the direct URL (hostname without the `-pooler` suffix).',
      },
    },
    sourcePath: 'skills/neon-postgres/SKILL.md',
  },
  {
    name: 'neon-auth',
    category: 'platform',
    invocation: 'model',
    description: {
      id: 'Neon Auth (Managed Better Auth): login, users, sessions yang branch bersama database, plus routing identitas dan plugin support.',
      en: 'Neon Auth (Managed Better Auth): login, users, and sessions that branch with the database, plus identity routing and plugin support.',
    },
    detailedDescription: {
      id: 'Memilih identitas lalu mengimplementasikan Managed Better Auth. Tanpa IdP yang ada: default Managed Better Auth (`auth: true` di `neon.ts`, lalu `neon deploy`). Pertahankan Better Auth, Clerk, Supabase Auth, atau IdP lain yang sudah bekerja. Migrasi dari Supabase Auth → Managed Better Auth (jaga bentuk panggilan `SupabaseAuthAdapter()`). Plugin di luar dukungan Managed → self-managed Better Auth di host app atau Neon Function. Users/sessions di schema `neon_auth` pada branch. Managed Auth hanya di region AWS dan tidak bisa diaktifkan bersama IP Allow atau Private Networking.',
      en: 'Chooses identity, then implements Managed Better Auth. No existing IdP: default to Managed Better Auth (`auth: true` in `neon.ts`, then `neon deploy`). Keep working Better Auth, Clerk, Supabase Auth, or another IdP. Supabase Auth migration → Managed Better Auth (keep `SupabaseAuthAdapter()` call shapes). A required plugin outside Managed support → self-managed Better Auth on the app host or a Neon Function. Users and sessions live in the `neon_auth` schema on the branch. Managed Auth is AWS-only and cannot be enabled with IP Allow or Private Networking.',
    },
    useWhen: {
      id: [
        'Menambah login/sign-up/sessions pada app Neon tanpa IdP yang sudah ada.',
        'Routing identitas: tetap di IdP lama, migrasi Supabase Auth, atau self-managed Better Auth.',
        'Mengonfigurasi trusted domains, OAuth Managed, atau plugin yang didukung.',
      ],
      en: [
        'Adding login/sign-up/sessions to a Neon app with no existing IdP.',
        'Identity routing: keep an existing IdP, migrate Supabase Auth, or move to self-managed Better Auth.',
        'Configuring trusted domains, Managed OAuth, or supported plugins.',
      ],
    },
    avoidWhen: {
      id: [
        'Hanya butuh Postgres/Functions/Storage/AI tanpa mengubah identitas.',
        'IdP yang sudah bekerja dan user tidak meminta migrasi.',
      ],
      en: [
        'Only needing Postgres/Functions/Storage/AI without changing identity.',
        'A working IdP when the user did not ask to migrate.',
      ],
    },
    howItWorks: {
      id: [
        'Inspect identitas dan fitur login yang dibutuhkan sebelum provision.',
        'Tanpa auth: `auth: true` di `neon.ts`, `neon deploy`, lalu implement login lewat `@neondatabase/auth`.',
        'Migrasi Supabase Auth: ikuti guide Managed + adapter call shapes.',
        'Plugin di luar Managed: self-managed Better Auth setelah konfirmasi versi terpasang.',
      ],
      en: [
        'Inspect existing identity and required login features before provisioning.',
        'No auth: set `auth: true` in `neon.ts`, `neon deploy`, then implement login via `@neondatabase/auth`.',
        'Supabase Auth migration: follow the Managed guide and keep adapter call shapes.',
        'Plugins outside Managed: self-managed Better Auth after confirming the installed version.',
      ],
    },
    coreRules: {
      id: [
        'Jangan mengganti auth yang sudah bekerja hanya untuk memakai Postgres, Functions, Object Storage, atau AI Gateway.',
        'Managed client tidak menerima opsi `plugins`; konfigurasi plugin lewat Neon (Console/API/`neon neon-auth`).',
        'Biarkan IP Allow / Private Networking; jangan aktifkan Managed Auth di atasnya.',
        '`DATABASE_URL` yang disuplai bukan alasan mengganti identitas.',
      ],
      en: [
        'Do not replace a working auth server just to use Postgres, Functions, Object Storage, or the AI Gateway.',
        'The Managed client does not accept a `plugins` option; configure plugins through Neon (Console/API/`neon neon-auth`).',
        'Leave IP Allow / Private Networking in place; do not enable Managed Auth on top of them.',
        'A supplied `DATABASE_URL` is not a reason to change identity.',
      ],
    },
    tips: {
      id: [
        'Google, GitHub, dan Vercel social OAuth tersedia di Managed Auth dan bukan alasan meninggalkan Managed.',
        'MFA/passkeys/generic OAuth/SSO di luar Managed → self-managed setelah cek versi Better Auth.',
        'Error `invalid domain`: daftarkan origin (dengan scheme, tanpa trailing slash) ke trusted domains branch yang benar.',
      ],
      en: [
        'Google, GitHub, and Vercel social OAuth are offered on Managed Auth and are not a reason to leave Managed.',
        'MFA/passkeys/generic OAuth/SSO outside Managed → self-managed after checking the installed Better Auth version.',
        '`invalid domain`: register the origin (with scheme, no trailing slash) on the correct branch trusted domains.',
      ],
    },
    pairsWellWith: ['neon', 'neon-functions', 'neon-realtime'],
    spotlight: {
      title: {
        id: 'Identity routing defaults',
        en: 'Identity routing defaults',
      },
      body: {
        id: 'Tanpa identitas → Managed Better Auth. Better Auth/Clerk/Supabase Auth/IdP lain yang sudah bekerja → pertahankan. Migrasi Supabase Auth → Managed Better Auth. Plugin wajib di luar dukungan Managed → self-managed Better Auth.',
        en: 'No identity → Managed Better Auth. Working Better Auth, Clerk, Supabase Auth, or another IdP → keep it. Supabase Auth migration → Managed Better Auth. A required plugin outside Managed support → self-managed Better Auth.',
      },
    },
    sourcePath: 'skills/neon-auth/SKILL.md',
  },
  {
    name: 'neon-postgres-branches',
    category: 'postgres',
    invocation: 'model',
    description: {
      id: 'Memilih dan membuat tipe branch Neon yang tepat: normal untuk data realistis, schema-only (beta) untuk data sensitif, atau reset-from-parent.',
      en: 'Choose and create the right Neon branch type: normal for realistic data, schema-only (beta) for sensitive data, or reset-from-parent.',
    },
    detailedDescription: {
      id: 'Outcome: branch Neon yang sudah dibuat, atau langkah jelas jika pembuatan tidak bisa dilanjutkan. **Branch Type Decision:** (1) uji migrasi/performa/perilaku terhadap data mirip production → **normal branch**; (2) hindari menyalin data sensitif → **schema-only branch** (Beta). Reset-from-parent mengganti schema+data child dengan state parent terbaru (bukan merge). Default tool: Neon CLI; MCP hanya jika CLI tidak bisa dipakai. Schema-only adalah root independen sehingga reset-from-parent tidak berlaku.',
      en: 'Outcome: a created Neon branch, or a clear next step if creation cannot proceed. **Branch Type Decision:** (1) test complex migrations, performance, or behavior against production-like data → **normal branch**; (2) avoid copying sensitive data → **schema-only branch** (Beta). Reset-from-parent fully replaces the child branch schema and data with the parent’s latest state (does not merge). Default tool: Neon CLI; MCP only when the CLI cannot be used. Schema-only branches are independent roots, so reset-from-parent does not apply.',
    },
    useWhen: {
      id: [
        'Migration testing, preview/CI, atau lingkungan test terisolasi di Neon.',
        'Memilih normal vs schema-only, atau mereset child dari parent.',
        'Branch expiration / lifecycle di CI/CD.',
      ],
      en: [
        'Migration testing, preview/CI, or isolated test environments on Neon.',
        'Choosing normal vs schema-only, or resetting a child from its parent.',
        'Branch expiration / lifecycle in CI/CD.',
      ],
    },
    avoidWhen: {
      id: [
        'Pertanyaan umum Postgres tanpa keputusan tipe branch — `neon-postgres`.',
        'Provisioning backend baru tanpa fokus branch — parent `neon`.',
      ],
      en: [
        'General Postgres questions without a branch-type decision — `neon-postgres`.',
        'New backend provisioning without a branch decision — parent `neon`.',
      ],
    },
    howItWorks: {
      id: [
        'Terapkan Branch Type Decision (normal vs schema-only); klarifikasi bila ambigu.',
        'Pastikan CLI (`neon --version` / auth) atau fallback MCP.',
        'Buat branch: `neon branches create` (+ `--schema-only` bila perlu) dengan `--expires-at` sesuai kebutuhan.',
        'Untuk child yang drift: `neon branches reset … --parent` (dengan constraint yang terdokumentasi).',
      ],
      en: [
        'Apply the Branch Type Decision (normal vs schema-only); clarify if ambiguous.',
        'Confirm the CLI (`neon --version` / auth) or fall back to MCP.',
        'Create the branch: `neon branches create` (add `--schema-only` when needed) with `--expires-at` as required.',
        'For a drifted child: `neon branches reset … --parent` (respect documented constraints).',
      ],
    },
    coreRules: {
      id: [
        'Normal branch untuk data realistis; schema-only (Beta) bila baris production tidak boleh disalin.',
        'Hanya child branch yang bisa di-reset; root dan schema-only root tidak bisa reset-from-parent.',
        'Reset diblokir jika target punya children; setelah parent di-restore dari snapshot, reset bisa tidak tersedia hingga 24 jam.',
        'Schema-only branching Beta: arahkan feedback ke Console dan Discord bila perilaku tidak terduga.',
      ],
      en: [
        'Normal branch for realistic data; schema-only (Beta) when production rows must not be copied.',
        'Only child branches can be reset; root and schema-only root branches cannot be reset from parent.',
        'Reset is blocked while the target has children; after a parent is restored from snapshot, reset may be unavailable for up to 24 hours.',
        'Schema-only branching is Beta: send unexpected behavior feedback via Console and Discord.',
      ],
    },
    tips: {
      id: [
        'Pertanyaan klarifikasi resmi: butuh data realistis untuk testing, atau hanya struktur schema karena data sensitif?',
        'Setelah membuat branch, update env/connection string ke branch baru.',
        'PII-aware: derive dari branch anonymized atau pakai schema-only.',
      ],
      en: [
        'Official clarifying question: realistic data for testing, or only schema structure because the data is sensitive?',
        'After creation, update env/connection strings to the new branch.',
        'PII-aware: derive from an anonymized branch or use schema-only.',
      ],
    },
    pairsWellWith: ['neon', 'neon-postgres'],
    spotlight: {
      title: {
        id: 'Branch Type Decision',
        en: 'Branch Type Decision',
      },
      body: {
        id: '1) Migrasi kompleks / performa / perilaku vs data mirip production → normal branch. 2) Hindari menyalin data sensitif → schema-only branch (Beta). Reset-from-parent untuk menyegarkan child yang drift ke state parent terbaru.',
        en: '1) Complex migrations / performance / behavior against production-like data → normal branch. 2) Avoid copying sensitive data → schema-only branch (Beta). Reset-from-parent refreshes a drifted child to the parent’s latest state.',
      },
    },
    sourcePath: 'skills/neon-postgres-branches/SKILL.md',
  },
  {
    name: 'neon-postgres-egress-optimizer',
    category: 'postgres',
    invocation: 'model',
    description: {
      id: 'Diagnosa dan perbaiki egress Postgres berlebih: mulai dari `pg_stat_statements`, lalu perbaiki pola query di codebase.',
      en: 'Diagnose and fix excessive Postgres egress: start with `pg_stat_statements`, then fix query patterns in the codebase.',
    },
    detailedDescription: {
      id: 'Empat langkah berurutan: diagnose query dengan transfer terbesar lewat `pg_stat_statements`, analisis codebase di balik query itu, perbaiki anti-pattern (SELECT *, pagination hilang, high-frequency static reads, agregasi di app, JOIN duplication), lalu verify dengan test dan bandingkan stats. Sebagian besar tagihan egress tinggi berasal dari aplikasi yang mengambil data lebih banyak daripada yang dipakai.',
      en: 'Four ordered steps: diagnose the highest-transfer queries with `pg_stat_statements`, analyze the codebase behind them, fix anti-patterns (SELECT *, missing pagination, high-frequency static reads, app-side aggregation, JOIN duplication), then verify with tests and compare stats. Most high egress bills come from the application fetching more data than it uses.',
    },
    useWhen: {
      id: [
        'Tagihan database / data transfer Neon melonjak atau dicurigai overfetch.',
        'Review pola query untuk efisiensi biaya egress.',
        'Optimasi SELECT *, pagination, caching baca statis, atau JOIN yang menduplikasi baris lebar.',
      ],
      en: [
        'Neon database / data-transfer bills spiked or overfetching is suspected.',
        'Reviewing query patterns for egress cost efficiency.',
        'Fixing SELECT *, pagination, static-read caching, or JOINs that duplicate wide rows.',
      ],
    },
    avoidWhen: {
      id: [
        'Masalah murni compute/autoscaling tanpa gejala transfer data — lihat `neon-postgres`.',
        'Provisioning project baru tanpa bukti egress — parent `neon`.',
      ],
      en: [
        'Pure compute/autoscaling issues without transfer symptoms — see `neon-postgres`.',
        'New project provisioning with no egress evidence — parent `neon`.',
      ],
    },
    howItWorks: {
      id: [
        'Pastikan `pg_stat_statements` tersedia (`CREATE EXTENSION` bila perlu).',
        'Jika stats kosong setelah scale-to-zero: reset, jalankan traffic representatif ≥1 jam, atau analisis kode langsung.',
        'Ranking: high row count + wide rows, call frequency ekstrem, lalu cross-check kolom lebar di schema.',
        'Perbaiki anti-pattern, jalankan test, ukur ulang setelah `pg_stat_statements_reset()`.',
      ],
      en: [
        'Confirm `pg_stat_statements` is available (`CREATE EXTENSION` if needed).',
        'If stats are empty after scale-to-zero: reset, run representative traffic for at least an hour, or analyze code directly.',
        'Rank by high row count + wide rows, extreme call frequency, then cross-check wide columns in the schema.',
        'Fix anti-patterns, run tests, and re-measure after `pg_stat_statements_reset()`.',
      ],
    },
    coreRules: {
      id: [
        'Kerjakan diagnose → analyze → fix → verify secara berurutan.',
        'Perbaiki hanya penyebab yang disebut skill: SELECT *, missing pagination, high-frequency static reads, app-side aggregation, JOIN duplication.',
        'Setting compute murah di `neon.ts` melengkapi, bukan menggantikan, perbaikan pola query.',
      ],
      en: [
        'Work diagnose → analyze → fix → verify in order.',
        'Fix only the causes the skill names: SELECT *, missing pagination, high-frequency static reads, app-side aggregation, JOIN duplication.',
        'Cheap non-prod compute settings in `neon.ts` complement, and do not replace, query-pattern fixes.',
      ],
    },
    tips: {
      id: [
        'JOIN duplication berbeda dari SELECT *: pecah jadi dua query agar data parent tidak diulang per child row.',
        'Endpoint list tanpa LIMIT adalah risiko egress tidak terbatas — tandai berapa pun ukuran tabel saat ini.',
        'Cache data yang jarang berubah dan dipanggil sangat sering.',
      ],
      en: [
        'JOIN duplication is distinct from SELECT *: split into two queries so parent data is not repeated per child row.',
        'An unpaginated list endpoint is an unbounded egress risk — flag it regardless of current table size.',
        'Cache rarely changing data that is called extremely often.',
      ],
    },
    pairsWellWith: ['neon-postgres', 'neon'],
    sourcePath: 'skills/neon-postgres-egress-optimizer/SKILL.md',
  },
  {
    name: 'neon-object-storage',
    category: 'platform',
    invocation: 'model',
    description: {
      id: 'Object storage S3-compatible yang branch bersama database — file dan baris tetap selaras di dev, preview, dan production.',
      en: 'S3-compatible object storage that branches with the database — files and rows stay in sync across dev, preview, and production.',
    },
    detailedDescription: {
      id: 'Penyimpanan file built-in di project Neon. Setiap branch mendapat state storage copy-on-write terisolasi. Deklarasikan bucket di `neon.ts` (`buckets`), lalu `neon deploy`. Mode akses: `private` (default) atau `public_read`. Satu sistem kredensial Neon bersama Functions dan AI Gateway. Tersedia di `aws-us-east-2`, `aws-us-east-1`, `aws-eu-central-1`, dan `aws-ap-southeast-1`. Path-style + SigV4; SDK S3 / boto3 / AWS CLI / presigned URL didukung. Asset statis app tetap di Vercel/Netlify/Cloudflare — `PutBucketWebsite` mengembalikan `501 Not Implemented`.',
      en: 'Built-in file storage in a Neon project. Each branch gets isolated copy-on-write storage state. Declare buckets in `neon.ts` (`buckets`), then `neon deploy`. Access modes: `private` (default) or `public_read`. One Neon credential system shared with Functions and the AI Gateway. Available in `aws-us-east-2`, `aws-us-east-1`, `aws-eu-central-1`, and `aws-ap-southeast-1`. Path-style + SigV4; S3 SDKs / boto3 / AWS CLI / presigned URLs work. App static assets stay on Vercel/Netlify/Cloudflare — `PutBucketWebsite` returns `501 Not Implemented`.',
    },
    useWhen: {
      id: [
        'Upload, avatar, dokumen, atau blob yang harus branch bersama Postgres.',
        'Menghindari provider storage kedua (S3/R2/Supabase Storage) saat app sudah di Neon.',
        'Presigned URL, bucket logs, atau CDN di depan object public.',
      ],
      en: [
        'Uploads, avatars, documents, or blobs that must branch with Postgres.',
        'Avoiding a second storage provider (S3/R2/Supabase Storage) when the app is already on Neon.',
        'Presigned URLs, bucket logs, or a CDN in front of public objects.',
      ],
    },
    avoidWhen: {
      id: [
        'Hosting HTML/JS/CSS/`public/` app — itu static hosting di platform frontend.',
        'Project di luar region yang didukung Object Storage.',
      ],
      en: [
        'Hosting app HTML/JS/CSS/`public/` assets — that is static hosting on a frontend platform.',
        'Projects outside Object Storage supported regions.',
      ],
    },
    howItWorks: {
      id: [
        'Konfirmasi region project didukung.',
        'Deklarasikan `buckets` di `neon.ts`, lalu `neon deploy` / `neon config apply`.',
        'Pakai Files SDK yang direkomendasikan atau AWS S3 client dengan env yang di-inject.',
        'Simpan object key di baris Postgres pada branch yang sama.',
      ],
      en: [
        'Confirm the project region is supported.',
        'Declare `buckets` in `neon.ts`, then `neon deploy` / `neon config apply`.',
        'Use the recommended Files SDK or an AWS S3 client with injected env vars.',
        'Store object keys in Postgres rows on the same branch.',
      ],
    },
    coreRules: {
      id: [
        'Object Storage adalah backend primitive, bukan full-stack hosting.',
        'Taruh CDN di depan aset `public_read` yang sering diload browser; private bucket tetap lewat presigned URL.',
        'Tulis versi baru ke key baru lalu update pointer di Postgres — jangan andalkan overwrite + TTL cache.',
      ],
      en: [
        'Object Storage is a backend primitive, not full-stack app hosting.',
        'Put a CDN in front of hot `public_read` browser assets; private buckets stay on presigned URLs.',
        'Write each version to a new key and update the Postgres pointer — do not rely on overwrite + cache TTL.',
      ],
    },
    tips: {
      id: [
        '`neon checkout` menerapkan policy bucket saat membuat branch baru; branch existing perlu `neon deploy`.',
        'Link/`checkout`/deploy juga menarik kredensial S3 ke `.env.local`.',
        'Pasangkan dengan `neon-functions` untuk trigger `storage_object_created`.',
      ],
      en: [
        '`neon checkout` applies bucket policy when creating a branch; existing branches need `neon deploy`.',
        'Link/`checkout`/deploy also pull S3 credentials into `.env.local`.',
        'Pair with `neon-functions` for `storage_object_created` triggers.',
      ],
    },
    pairsWellWith: ['neon', 'neon-functions', 'neon-postgres'],
    sourcePath: 'skills/neon-object-storage/SKILL.md',
  },
  {
    name: 'neon-ai-gateway',
    category: 'platform',
    invocation: 'model',
    description: {
      id: 'Satu kredensial dan satu API untuk LLM/embeddings di branch Neon; OpenAI / Anthropic / google-genai / Vercel AI SDK / Mastra dengan ganti base URL.',
      en: 'One credential and one API for LLMs/embeddings on your Neon branch; OpenAI / Anthropic / google-genai / Vercel AI SDK / Mastra by changing the base URL.',
    },
    detailedDescription: {
      id: 'AI Gateway membawa inferensi model ke branch Neon (powered by Databricks). Aktifkan `aiGateway: true` di `neon.ts` lalu `neon deploy`. Env: `NEON_AI_GATEWAY_TOKEN` dan `NEON_AI_GATEWAY_BASE_URL` (host tanpa path). Katalog model berubah — sumber kebenaran `/v1/models` dan models.dev, jangan inventarisasi katalog di sini. Free plan memblokir provisioning gateway; paid plan bisa punya katalog terpangkas. Tersedia di `aws-us-east-2`, `aws-us-east-1`, `aws-eu-central-1`, dan `aws-ap-southeast-1`.',
      en: 'The AI Gateway brings model inference to your Neon branch (powered by Databricks). Enable `aiGateway: true` in `neon.ts`, then `neon deploy`. Env: `NEON_AI_GATEWAY_TOKEN` and `NEON_AI_GATEWAY_BASE_URL` (bare host, no path). The model catalog shifts — treat `/v1/models` and models.dev as source of truth; do not invent a catalog here. Free plan blocks gateway provisioning; a paid plan may still have a reduced catalog. Available in `aws-us-east-2`, `aws-us-east-1`, `aws-eu-central-1`, and `aws-ap-southeast-1`.',
    },
    useWhen: {
      id: [
        'Memanggil LLM atau embeddings tanpa mengelola banyak API key provider.',
        'Menghubungkan Vercel AI SDK, Mastra, atau SDK OpenAI/Anthropic/Gemini ke gateway branch.',
        'Membutuhkan AI yang terisolasi per branch (preview/CI/agent).',
      ],
      en: [
        'Calling LLMs or embeddings without juggling many provider API keys.',
        'Wiring the Vercel AI SDK, Mastra, or OpenAI/Anthropic/Gemini SDKs to the branch gateway.',
        'Needing branch-isolated AI for preview/CI/agent environments.',
      ],
    },
    avoidWhen: {
      id: [
        'Integrasi single-provider yang dalam tanpa minat branching/multi-model.',
        'Project Free plan atau di luar region yang didukung.',
      ],
      en: [
        'A deep single-provider integration with no interest in branching/multi-model routing.',
        'Free-plan projects or projects outside supported regions.',
      ],
    },
    howItWorks: {
      id: [
        'Konfirmasi region + paid plan.',
        'Set `aiGateway: true`, `neon deploy`, lalu `neon env pull` bila lokal.',
        'Arahkan SDK ke dialect path yang benar di bawah host gateway (`/v1`, `/openai/v1`, `/anthropic`, `/gemini`).',
        'Verifikasi model yang benar-benar tersedia lewat `GET /v1/models`.',
      ],
      en: [
        'Confirm region + paid plan.',
        'Set `aiGateway: true`, `neon deploy`, then `neon env pull` for local use.',
        'Point SDKs at the correct dialect path under the gateway host (`/v1`, `/openai/v1`, `/anthropic`, `/gemini`).',
        'Verify actually available models via `GET /v1/models`.',
      ],
    },
    coreRules: {
      id: [
        'Jangan mengarang daftar model; baca `/v1/models` / models.dev / embeddings guide.',
        'Neon hanya meng-inject `NEON_AI_GATEWAY_*` — tidak set `OPENAI_API_KEY` / `OPENAI_BASE_URL` otomatis.',
        'Gateway bersifat branch-scoped; credential mengotorisasi branch itu dan turunannya.',
      ],
      en: [
        'Do not invent a model list; read `/v1/models` / models.dev / the embeddings guide.',
        'Neon injects only `NEON_AI_GATEWAY_*` — it does not auto-set `OPENAI_API_KEY` / `OPENAI_BASE_URL`.',
        'The gateway is branch-scoped; the credential authorizes that branch and its descendants.',
      ],
    },
    tips: {
      id: [
        '`@neon/ai-sdk-provider` dan Mastra `neon/<model>` membaca `NEON_AI_GATEWAY_*` langsung.',
        'Bedakan Free-plan block vs reduced catalog di paid plan saat debugging model hilang.',
        'Pasangkan dengan `neon-functions` untuk agent streaming panjang.',
      ],
      en: [
        '`@neon/ai-sdk-provider` and Mastra `neon/<model>` read `NEON_AI_GATEWAY_*` directly.',
        'Distinguish Free-plan provisioning blocks from a reduced paid-plan catalog when debugging missing models.',
        'Pair with `neon-functions` for long-running streaming agents.',
      ],
    },
    pairsWellWith: ['neon', 'neon-functions'],
    sourcePath: 'skills/neon-ai-gateway/SKILL.md',
  },
  {
    name: 'neon-functions',
    category: 'platform',
    invocation: 'model',
    description: {
      id: 'Node.js HTTP functions jangka panjang di branch Neon, dengan `DATABASE_URL` di-inject; trigger cron atau object-storage event yang POST ke function.',
      en: 'Long-running Node.js HTTP functions on your Neon branch, with `DATABASE_URL` injected; cron or object-storage triggers that POST to a function.',
    },
    detailedDescription: {
      id: 'Compute serverless Neon: handler `fetch(request)` di Node.js 24, URL HTTPS publik, berjalan di region branch, `DATABASE_URL` di-inject bila branch punya Postgres. Deklarasikan di `neon.ts` (`functions`, slug `^[a-z0-9]{1,20}$`), develop dengan `neon dev`, deploy dengan `neon deploy`. Time to first byte 15 menit; heartbeat stream 15 menit; `waitUntil` 15 menit. Function Triggers: cron (`schedule`) atau `storage_object_created` yang POST JSON ke function. Untuk live UI atas baris database pakai `neon-realtime`. Region: `aws-us-east-2`, `aws-us-east-1`, `aws-eu-central-1`, `aws-ap-southeast-1`.',
      en: 'Neon’s serverless compute: `fetch(request)` handlers on Node.js 24, public HTTPS URL, same region as the branch, `DATABASE_URL` injected when the branch has Postgres. Declare in `neon.ts` (`functions`, slug `^[a-z0-9]{1,20}$`), develop with `neon dev`, deploy with `neon deploy`. Time to first byte: 15 minutes; stream heartbeat: 15 minutes; `waitUntil`: 15 minutes. Function Triggers: cron (`schedule`) or `storage_object_created` POSTing JSON to a function. For live UIs over database rows, use `neon-realtime`. Regions: `aws-us-east-2`, `aws-us-east-1`, `aws-eu-central-1`, `aws-ap-southeast-1`.',
    },
    useWhen: {
      id: [
        'API, agent streaming, WebSocket/SSE, webhook, Discord bot, atau MCP yang berisiko timeout di lambda pendek.',
        'Compute yang harus dekat Postgres dan branch bersama data.',
        'Function Trigger: jadwal cron atau event object storage.',
      ],
      en: [
        'APIs, streaming agents, WebSocket/SSE, webhooks, Discord bots, or MCP servers that risk short lambda timeouts.',
        'Compute that must sit next to Postgres and branch with the data.',
        'Function Triggers: cron schedules or object-storage events.',
      ],
    },
    avoidWhen: {
      id: [
        'Live query / reactive UI dari baris database — `neon-realtime`.',
        'Static site atau workload di luar region yang didukung.',
        'Mengganti IdP hanya untuk memanggil Function.',
      ],
      en: [
        'Live queries / reactive UI from database rows — `neon-realtime`.',
        'Static sites or workloads outside supported regions.',
        'Switching IdP only to call a Function.',
      ],
    },
    howItWorks: {
      id: [
        'Konfirmasi region; deklarasikan function di `neon.ts` dengan slug tetap.',
        'Implement handler WinterTC/`export default` Hono; pool `pg` di module scope + `attachDatabasePool`.',
        '`neon deploy` untuk provision; autentikasi JWT/API key di ujung handler untuk HTTP publik.',
        'Trigger: deklarasikan di `neon.ts`, autentikasi delivery dengan `parseTriggerDelivery`.',
      ],
      en: [
        'Confirm region; declare the function in `neon.ts` with a permanent slug.',
        'Implement a WinterTC/`export default` Hono handler; create a module-scope `pg` pool + `attachDatabasePool`.',
        '`neon deploy` to provision; authenticate JWT/API key at the top of public HTTP handlers.',
        'Triggers: declare in `neon.ts`, authenticate deliveries with `parseTriggerDelivery`.',
      ],
    },
    coreRules: {
      id: [
        'Functions adalah request/response runtime, bukan background job runner.',
        'Untuk stream agent panjang: browser → Function langsung dengan JWT; jangan proxy lewat app host yang memotong stream.',
        'Route trigger tidak boleh mewajibkan user JWT/`X-Secret`; Neon POST ke native URL tanpa itu.',
        'Prefer query Postgres dari Function/handler; Data API hanya untuk klien PostgREST/Supabase yang sudah ada.',
      ],
      en: [
        'Functions are a request/response runtime, not a background job runner.',
        'For long agent streams: browser → Function directly with a JWT; do not proxy through an app host that cuts the stream.',
        'Trigger routes must not require a user JWT or `X-Secret`; Neon POSTs to the native URL without those.',
        'Prefer querying Postgres from the Function/handler; Data API only for existing PostgREST/Supabase clients.',
      ],
    },
    tips: {
      id: [
        'Slug tidak bisa diubah setelah deploy pertama; `name` hanya label tampilan.',
        'Module-scope state per-isolate; persist data yang harus selamat dari eviction di Postgres.',
        'Presence, typing, atau LLM streams yang bukan baris database: tetap di Functions, bukan Realtime.',
      ],
      en: [
        'The slug cannot change after the first deploy; `name` is display-only.',
        'Module-scope state is per-isolate; persist anything that must survive eviction in Postgres.',
        'Presence, typing, or LLM streams that are not database rows stay on Functions, not Realtime.',
      ],
    },
    pairsWellWith: [
      'neon',
      'neon-ai-gateway',
      'neon-object-storage',
      'neon-auth',
      'neon-realtime',
    ],
    spotlight: {
      title: {
        id: '15-minute runtime ceilings',
        en: '15-minute runtime ceilings',
      },
      body: {
        id: 'Handler harus mulai mengembalikan response dalam 15 menit. WebSocket/SSE tetap hidup selama data mengalir — kirim ≥1 byte setiap 15 menit pada stream tenang. `waitUntil` juga dibatasi 15 menit untuk cleanup setelah response, bukan job background.',
        en: 'The handler must begin returning a response within 15 minutes. WebSocket/SSE stay open while data flows — send at least one byte every 15 minutes on a quiet stream. `waitUntil` is also capped at 15 minutes for post-response cleanup, not background jobs.',
      },
    },
    sourcePath: 'skills/neon-functions/SKILL.md',
  },
  {
    name: 'neon-realtime',
    category: 'platform',
    invocation: 'model',
    description: {
      id: 'Realtime membuat setiap SQL query menjadi live: reactive apps/agents di Lakebase Postgres dengan live queries bertipe aman dan optimistic mutations.',
      en: 'Realtime makes any SQL query live: reactive apps/agents on Lakebase Postgres with type-safe live queries and optimistic mutations.',
    },
    detailedDescription: {
      id: 'Beta. Backend mendefinisikan query read-only, seal dengan `NEON_REALTIME_SECRET`, dan mengeksposnya dari endpoint terautentikasi. Client subscribe ke sealed query, menerima snapshot awal lalu batch perubahan per transaksi. Writes tetap lewat API Anda yang mengembalikan `txid` untuk `awaitTxId()`. Untuk presence, typing, atau LLM streams yang bukan baris database, pakai `neon-functions`. Tidak tersedia di Claimable projects sampai di-claim.',
      en: 'Beta. Trusted backend code defines a read-only query, seals it with `NEON_REALTIME_SECRET`, and exposes it from an authenticated endpoint. Clients subscribe to the sealed query, receive the initial snapshot, then per-transaction change batches. Writes stay on your API, which returns a `txid` for `awaitTxId()`. For presence, typing, or LLM streams that are not database rows, use `neon-functions`. Unavailable on Claimable projects until claimed.',
    },
    useWhen: {
      id: [
        'UI atau agent state harus update live dari baris database (dashboard, feed, kolaborasi, sync multi-device).',
        'Optimistic mutations dengan `awaitTxId`.',
        'Mengganti polling atau sync engine lain dengan live SQL.',
      ],
      en: [
        'App UI or agent state must update live from database rows (dashboards, feeds, collaboration, multi-device sync).',
        'Optimistic mutations with `awaitTxId`.',
        'Replacing polling or another sync engine with live SQL.',
      ],
    },
    avoidWhen: {
      id: [
        'Push yang bukan dari baris database (presence, typing, LLM streams) — `neon-functions`.',
        'Hanya CRUD/schema tanpa subscription live — `neon-postgres`.',
      ],
      en: [
        'Push that is not from database rows (presence, typing, LLM streams) — `neon-functions`.',
        'Plain CRUD/schema without live subscriptions — `neon-postgres`.',
      ],
    },
    howItWorks: {
      id: [
        'Enable Realtime di branch (`neon realtime enable` atau `preview.realtime` di `neon.ts`) lalu `neon deploy`.',
        'Definisikan query deterministik read-only; authorize di query; seal di backend tepercaya.',
        'Client subscribe (`useLiveQuery` / TanStack DB / `client.subscribe`).',
        'Write path app mengembalikan `txid`; client `awaitTxId` dengan timeout.',
      ],
      en: [
        'Enable Realtime on the branch (`neon realtime enable` or `preview.realtime` in `neon.ts`) then `neon deploy`.',
        'Define deterministic read-only queries; authorize in the query; seal in trusted backend code.',
        'Clients subscribe (`useLiveQuery` / TanStack DB / `client.subscribe`).',
        'App write paths return `txid`; clients `awaitTxId` with a timeout.',
      ],
    },
    coreRules: {
      id: [
        'Sealed query adalah bearer token — jangan taruh di URL, log, atau storage persisten; jangan isi parameter dari input tak terpercaya.',
        'Query harus read-only/deterministik (satu SELECT, placeholder `$1`; bukan `now()` / `gen_random_uuid()` tanpa parameter).',
        'Tabel butuh stable replica identity (primary key cukup).',
        'Satu database per client; pilih stable unique key per row (jangan `rowId`).',
      ],
      en: [
        'A sealed query is a bearer token — keep it out of URLs, logs, and persistent storage; never fill parameters from unchecked input.',
        'Queries must be read-only and deterministic (single SELECT, `$1` placeholders; no `now()` / `gen_random_uuid()` without parameters).',
        'Tables need a stable replica identity (a primary key is enough).',
        'One database per client; select a stable unique key per row (never `rowId`).',
      ],
    },
    tips: {
      id: [
        'Ambil `txid` di `RETURNING` write yang sama — jangan buka transaksi terpisah hanya untuk `pg_current_xact_id()`.',
        'Saat session berubah, full page load agar client Realtime dan baris user lama dibuang.',
        'Migrasi dari Electric: live SQL menggantikan shapes; `realtimeCollectionOptions()` menggantikan `electricCollectionOptions()`.',
      ],
      en: [
        'Return `txid` from the same write’s `RETURNING` — do not open a separate transaction just for `pg_current_xact_id()`.',
        'When the session changes, full page load so the Realtime client and previous user’s rows are dropped.',
        'Migrating from Electric: live SQL replaces shapes; `realtimeCollectionOptions()` replaces `electricCollectionOptions()`.',
      ],
    },
    pairsWellWith: ['neon', 'neon-auth', 'neon-functions', 'neon-postgres'],
    sourcePath: 'skills/neon-realtime/SKILL.md',
  },
]
