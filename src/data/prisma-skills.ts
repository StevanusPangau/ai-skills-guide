import type { BilingualString, BilingualList } from '@/types/skill'

// Verified 2026-10-04 against prisma/skills @ be16a87 (HEAD, 38 commits). The repo has no tags;
// "7.9.1" is only metadata.version of three SKILL.md files. Upstream README lists 8 real skills.
// prisma-database-setup and prisma-postgres are deprecated stubs upstream (aliases of
// prisma-orm-setup / prisma-postgres-setup) and are intentionally not listed here.

export const PRISMA_SOURCE_REPO = 'github.com/prisma/skills'
export const PRISMA_SOURCE_SHA = 'be16a8740d01363d13552b317042431ee8dfc581'
export const SOURCE_REPO = PRISMA_SOURCE_REPO
export const SOURCE_SHA = PRISMA_SOURCE_SHA

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

export const prismaSkills: RichSkill[] = [
  {
    name: 'prisma-upgrade-v7',
    category: 'migrations-upgrade',
    invocation: 'model',
    description: {
      id: 'Panduan migrasi lengkap dari Prisma ORM v6 ke v7: generator prisma-client baru, driver adapters wajib, prisma.config.ts, dan pemuatan env eksplisit.',
      en: 'Complete migration guide from Prisma ORM v6 to v7: new prisma-client generator, mandatory driver adapters, prisma.config.ts, and explicit env loading.',
    },
    detailedDescription: {
      id: 'Skill resmi untuk memandu migrasi aplikasi Prisma ORM dari versi 6 ke versi 7. Perubahan utamanya: generator `prisma-client` menjadi default dengan `output` eksplisit (generator `prisma-client-js` masih ada untuk setup legacy), driver adapters berbasis JavaScript (seperti @prisma/adapter-pg, @prisma/adapter-neon, @prisma/adapter-d1) wajib untuk provider SQL, file `prisma.config.ts` menjadi tempat konfigurasi koneksi dan migrasi, file `.env` tidak lagi dimuat otomatis, ESM-first (dengan `moduleFormat = "cjs"` untuk CommonJS), entrypoint client tergenerasi (`client`, `browser`, `models`, `enums`), `Prisma.validator` diganti `satisfies`, middleware `$use` dan metrics dihapus, plus catatan khusus pengguna Accelerate. Butuh Node.js 20.19+ dan TypeScript 5.4+.',
      en: 'Official skill guiding the migration of Prisma ORM applications from v6 to v7. Key changes: the `prisma-client` generator is the default and needs an explicit `output` (`prisma-client-js` still exists for legacy setups), JavaScript driver adapters (such as @prisma/adapter-pg, @prisma/adapter-neon, @prisma/adapter-d1) are required for SQL providers, `prisma.config.ts` holds connection and migration configuration, `.env` files are no longer loaded automatically, ESM-first (with `moduleFormat = "cjs"` for CommonJS), generated client entrypoints (`client`, `browser`, `models`, `enums`), `Prisma.validator` replaced by `satisfies`, `$use` middleware and metrics removed, plus special handling for Accelerate users. Requires Node.js 20.19+ and TypeScript 5.4+.',
    },
    useWhen: {
      id: [
        'Melakukan upgrade Prisma ORM proyek dari versi 6 ke versi 7.',
        'Mengatasi error kompilasi setelah instalasi `@prisma/client@7` atau `prisma@7`.',
        'Mengonfigurasi `prisma.config.ts` dan adapter driver database modern.',
      ],
      en: [
        'Upgrading a Prisma ORM project from version 6 to version 7.',
        'Resolving build or runtime errors after installing `@prisma/client@7` or `prisma@7`.',
        'Configuring `prisma.config.ts` and modern SQL driver adapters.',
      ],
    },
    avoidWhen: {
      id: [
        'Proyek Prisma yang masih terkunci di versi 5 atau 6 tanpa rencana upgrade.',
        'Proyek dengan provider MongoDB (v6 adalah rilis terminal untuk MongoDB; gunakan prisma-mongodb-upgrade).',
      ],
      en: [
        'Prisma projects pinned to version 5 or 6 without an upgrade schedule.',
        'Projects using MongoDB provider (v6 is the terminal release for MongoDB; see prisma-mongodb-upgrade).',
      ],
    },
    howItWorks: {
      id: [
        'Agent memeriksa versi dependensi dan skema schema.prisma yang ada.',
        'Memperbarui blok generator ke `provider = "prisma-client"` dengan `output` eksplisit (mis. `../generated/prisma`).',
        'Menginstal adapter driver yang sesuai (misal `@prisma/adapter-pg` dan `pg`).',
        'Membuat file `prisma.config.ts` untuk mengelola koneksi dan migrasi secara terpusat.',
        'Memperbarui import `@prisma/client` menjadi import path kustom yang didefinisikan generator.',
      ],
      en: [
        'Agent audits existing dependencies and schema.prisma generator declarations.',
        'Updates the generator block to `provider = "prisma-client"` with an explicit `output` (e.g. `../generated/prisma`).',
        'Installs the matching driver adapter package (e.g. `@prisma/adapter-pg` and `pg`).',
        'Scaffolds `prisma.config.ts` for centralized connection and migration management.',
        'Rewrites `@prisma/client` imports to point to the designated generated entrypoint.',
      ],
    },
    coreRules: {
      id: [
        'Di Prisma 7 `prisma-client` adalah generator default dan `output` wajib eksplisit; `prisma-client-js` masih ada hanya untuk setup legacy.',
        'Driver adapter wajib diinisialisasi dan dioper ke konstruktor PrismaClient.',
        'Dilarang mengandalkan auto-loading `.env`; pastikan variabel lingkungan diekspor atau dimuat dengan dotenv/tsx.',
      ],
      en: [
        'In Prisma 7 `prisma-client` is the default generator and `output` must be explicit; `prisma-client-js` still exists only for legacy setups.',
        'A database driver adapter must be instantiated and passed into the PrismaClient constructor.',
        'Never rely on implicit `.env` autoloading; ensure environment variables are explicitly loaded.',
      ],
    },
    tips: {
      id: [
        'Ganti `Prisma.validator()` dengan operator TypeScript `satisfies` (mis. `{ id: true } satisfies Prisma.UserSelect`).',
        'Jalankan `npx prisma generate` segera setelah memperbarui schema untuk memastikan entrypoint baru terbentuk.',
      ],
      en: [
        'Replace `Prisma.validator()` with the TypeScript `satisfies` operator (e.g. `{ id: true } satisfies Prisma.UserSelect`).',
        'Run `npx prisma generate` immediately following schema updates to produce the designated client files.',
      ],
    },
    pairsWellWith: ['prisma-driver-adapter-implementation', 'prisma-cli', 'prisma-orm-setup'],
    spotlight: {
      title: {
        id: 'Arsitektur Wajib Driver Adapter di Prisma 7',
        en: 'Mandatory Driver Adapter Architecture in Prisma 7',
      },
      body: {
        id: 'Pada Prisma 6 ke bawah, query engine berbasis Rust menangani koneksi database secara internal. Di Prisma 7 pengaturan engine Rust lama sudah hilang dan koneksi SQL lewat driver adapter. Hasilnya: driver adapter JavaScript (seperti node-postgres, Neon serverless, atau D1) kini wajib dipasang oleh developer. Kode inisialisasi client harus secara eksplisit mengoper instance adapter ke `new PrismaClient({ adapter })`.',
        en: 'In Prisma 6 and earlier, the Rust-based query engine handled database connections internally. In Prisma 7 the legacy Rust engine settings are gone and SQL connections go through driver adapters. Consequently, JavaScript driver adapters (such as node-postgres, Neon serverless, or D1) are now mandatory. Client initialization must explicitly pass the adapter instance into `new PrismaClient({ adapter })`.',
      },
    },
    sourcePath: 'prisma-upgrade-v7/SKILL.md',
  },
  {
    name: 'prisma-client-api',
    category: 'query-orm',
    invocation: 'model',
    description: {
      id: 'Referensi lengkap kueri Prisma Client: CRUD, relasi nested, filter mendalam, pagination, dan transaksi $transaction.',
      en: 'Complete Prisma Client API reference: CRUD operations, nested relations, deep filtering, pagination, and $transaction primitives.',
    },
    detailedDescription: {
      id: 'Skill referensi query ORM untuk seluruh operasi data di Prisma Client. Mencakup metode model standar (`findUnique`, `findFirst`, `findMany`, `create`, `update`, `upsert`, `delete`), mutasi berantai via nested writes (`connect`, `create`, `connectOrCreate`), operator filter (`some`, `every`, `none`, `contains`, `mode: "insensitive"`), pagination cursor vs offset, agregasi (`groupBy`, `count`, `aggregate`), serta transaksi interaktif `prisma.$transaction(async (tx) => { ... })` dengan kontrol isolation level dan timeout.',
      en: 'Comprehensive ORM reference skill for data operations across Prisma Client. Details core model operations (`findUnique`, `findFirst`, `findMany`, `create`, `update`, `upsert`, `delete`), relational mutations via nested writes (`connect`, `create`, `connectOrCreate`), relational filter operators (`some`, `every`, `none`, `contains`, `mode: "insensitive"`), cursor vs offset pagination, aggregations (`groupBy`, `count`, `aggregate`), and interactive transactions via `prisma.$transaction(async (tx) => { ... })` with timeout and isolation level tuning.',
    },
    useWhen: {
      id: [
        'Menulis atau merefaktor kueri database menggunakan Prisma Client.',
        'Mengimplementasikan operasi transaksi atomik dengan `$transaction`.',
        'Mengonfigurasi kueri relasional bersarang dan mutasi cascading.',
      ],
      en: [
        'Authoring or refactoring database queries with Prisma Client.',
        'Implementing atomic multi-table mutations with `$transaction`.',
        'Configuring nested relational queries and cascading mutations.',
      ],
    },
    avoidWhen: {
      id: [
        'Kueri analitik raksasa yang lebih efisien ditulis sebagai raw SQL window functions.',
        'Perintah CLI atau migrasi skema (gunakan prisma-cli).',
      ],
      en: [
        'Massive analytic queries that are more performant when authored as raw SQL window functions.',
        'CLI commands or schema migration tasks (use prisma-cli).',
      ],
    },
    howItWorks: {
      id: [
        'Agent memilih metode Prisma Client yang paling tepat dan hemat alokasi memori.',
        'Menggunakan `select` untuk membatasi kolom yang ditarik, menghindari `select *` implisit yang membebani transfer data.',
        'Menerapkan nested writes (`create`, `connect`, `connectOrCreate`) untuk menyimpan data relasi dalam satu panggilan.',
        'Membungkus mutasi yang saling bergantung ke dalam transaksi interaktif dengan error handling eksplisit.',
      ],
      en: [
        'Agent selects the most performant Prisma Client method to minimize heap overhead.',
        'Enforces targeted `select` clauses to retrieve only necessary columns, avoiding wasteful implicit full-row fetches.',
        'Applies nested writes (`create`, `connect`, `connectOrCreate`) to persist relational records in a single call.',
        'Encapsulates dependent write operations inside interactive transactions with explicit rollback boundaries.',
      ],
    },
    coreRules: {
      id: [
        'Selalu spesifikasikan `select` pada model dengan kolom teks panjang (JSON/Blob) untuk mencegah over-fetching.',
        'Gunakan transaksi interaktif saat operasi kedua bergantung pada hasil komputasi operasi pertama.',
        'Gunakan cursor pagination (`cursor: { id }`, `take`, `skip: 1`) untuk daftar data berukuran besar.',
      ],
      en: [
        'Always specify `select` on models with heavy columns (JSON/Blobs) to eliminate over-fetching.',
        'Use interactive transactions whenever step two depends on values computed in step one.',
        'Employ cursor-based pagination (`cursor: { id }`, `take`, `skip: 1`) on high-cardinality datasets.',
      ],
    },
    tips: {
      id: [
        'Gunakan `prisma.$extends` untuk menambahkan computed fields atau logging tanpa memodifikasi schema.prisma.',
        'Gunakan `omit` untuk mengecualikan kolom tertentu (mis. `password`) atau `select` untuk memilih kolom secara eksplisit.',
      ],
      en: [
        'Use `prisma.$extends` to add computed fields or query telemetry without modifying schema.prisma.',
        'Use `omit` to exclude specific fields (e.g. `password`) or `select` to pick fields explicitly.',
      ],
    },
    pairsWellWith: ['prisma-upgrade-v7', 'prisma-cli'],
    spotlight: {
      title: {
        id: 'Nested Writes: Relasi dalam Satu Panggilan',
        en: 'Nested Writes: Relations in a Single Call',
      },
      body: {
        id: 'Prisma Client memungkinkan penulisan relasi bertingkat (misal membuat User sekaligus profil dan post perdananya) melalui blok `create: { posts: { create: [...] } }`. Referensi relasi di skill ini juga mendokumentasikan `connect` dan `connectOrCreate`. Untuk operasi yang saling bergantung dan butuh kontrol eksplisit atas isolation level atau timeout, gunakan transaksi interaktif `$transaction` (lihat referensi transactions).',
        en: 'Prisma Client supports hierarchical relational writes (e.g. creating a User alongside their Profile and first Post) via `create: { posts: { create: [...] } }`. The skill\'s relations reference also documents `connect` and `connectOrCreate`. For dependent operations that need explicit control over isolation level or timeout, use interactive `$transaction` (see the transactions reference).',
      },
    },
    sourcePath: 'prisma-client-api/SKILL.md',
  },
  {
    name: 'prisma-cli',
    category: 'cli-tooling',
    invocation: 'model',
    description: {
      id: 'Panduan lengkap perintah Prisma CLI: init, generate, migrate dev/deploy, db push, db pull, validate, studio, dan MCP server.',
      en: 'Complete Prisma CLI commands reference: init, generate, migrate dev/deploy, db push, db pull, validate, studio, and MCP server.',
    },
    detailedDescription: {
      id: 'Referensi perintah Prisma ORM 7 CLI untuk aplikasi Prisma 7 yang sudah ada atau workflow Prisma 7 yang dipilih eksplisit (untuk setup, perbaikan koneksi, atau Prisma 8 gunakan prisma-orm-setup). Membedakan batasan antara ORM CLI (`prisma`) dan Platform CLI beta (`@prisma/cli`, binary `prisma-cli`) yang dipakai untuk Compute dan database Platform. Gunakan CLI yang versinya cocok dengan proyek, jangan memasang `prisma@latest`. Menguraikan alur kerja migrasi pengembangan (`prisma migrate dev`), deployment produksi (`prisma migrate deploy`), sinkronisasi skema cepat tanpa migrasi (`prisma db push`), inspeksi database visual (`prisma studio`), validasi & format skema (`prisma validate`, `prisma format`), serta integrasi Prisma MCP server untuk asisten AI.',
      en: 'Operational command reference for the complete Prisma ORM CLI lifecycle. Reference for the Prisma ORM 7 CLI in existing Prisma 7 applications or explicitly selected Prisma 7 workflows (for setup, connection repair, or Prisma 8 use prisma-orm-setup). Distinguishes the ORM CLI (`prisma`) from the public-beta Platform CLI (`@prisma/cli`, binary `prisma-cli`) used for Compute and Platform databases. Use the project\'s version-matched CLI; do not install `prisma@latest`. Outlines developmental migration workflows (`prisma migrate dev`), production rollouts (`prisma migrate deploy`), rapid schema prototyping (`prisma db push`), visual data inspection (`prisma studio`), schema linting (`prisma validate`, `prisma format`), and the Prisma MCP server integration for AI coding agents.',
    },
    useWhen: {
      id: [
        'Menjalankan migrasi database di lingkungan lokal atau CI/CD produksi.',
        'Melakukan reverse engineering skema database existing dengan `prisma db pull`.',
        'Mengonfigurasi dan memvalidasi file skema `schema.prisma`.',
      ],
      en: [
        'Executing database migrations in local development or production CI/CD pipelines.',
        'Reverse-engineering an existing database schema with `prisma db pull`.',
        'Validating, linting, or formatting `schema.prisma` files.',
      ],
    },
    avoidWhen: {
      id: [
        'Menjalankan `prisma migrate dev` di lingkungan produksi (wajib gunakan `prisma migrate deploy`).',
        'Deployment aplikasi serverless di Prisma Compute (gunakan prisma-compute).',
      ],
      en: [
        'Running `prisma migrate dev` in production environments (always use `prisma migrate deploy`).',
        'Hosting application workloads on Prisma Compute (use prisma-compute).',
      ],
    },
    howItWorks: {
      id: [
        'Agent memilih perintah CLI yang aman sesuai target lingkungan (dev vs production).',
        'Memastikan `prisma migrate deploy` digunakan pada CI/CD karena tidak membutuhkan interaksi prompt terminal.',
        'Mendeteksi konflik skema atau migration drift dan menyarankan penanganan terukur sebelum mengeksekusi reset.',
        'Sebelum perintah destruktif (`migrate reset`, `db push --force-reset`, `db push --accept-data-loss`), agent menjelaskan dampak kehilangan data dan meminta persetujuan eksplisit pengguna.',
      ],
      en: [
        'Agent selects the safe and appropriate CLI command matching the runtime target (dev vs production).',
        'Ensures `prisma migrate deploy` is used in automated CI/CD because it requires zero interactive terminal prompts.',
        'Detects migration drift or unapplied steps and recommends targeted fixes before prompting a destructive reset.',
        'Before destructive commands (`migrate reset`, `db push --force-reset`, `db push --accept-data-loss`), agent explains the data-loss impact and asks for explicit user consent.',
      ],
    },
    coreRules: {
      id: [
        'Jangan pernah jalankan `prisma db push` di produksi jika skema memiliki data penting; gunakan migrasi terencana.',
        'Di produksi, selalu gunakan `npx prisma migrate deploy` untuk menerapkan migrasi tertunda.',
        'Jalankan `npx prisma validate` sebelum commit untuk memastikan integritas relasi skema.',
        'AI Safety Checkpoint: Prisma memblokir `migrate reset`, `db push --force-reset`, dan `db push --accept-data-loss` saat mendeteksi agent AI sampai ada persetujuan eksplisit pengguna. Jangan menyimpulkan atau mengarang persetujuan; jika otomasi butuh, set `PRISMA_USER_CONSENT_FOR_DANGEROUS_AI_ACTION` ke pesan persetujuan persis dari pengguna.',
      ],
      en: [
        'Never run `prisma db push` in production if preserving critical data; use planned migrations.',
        'In production environments, always execute `npx prisma migrate deploy` to apply pending migrations.',
        'Run `npx prisma validate` prior to git commit to guarantee schema and relation integrity.',
        'AI Safety Checkpoint: Prisma blocks `migrate reset`, `db push --force-reset`, and `db push --accept-data-loss` when it detects an AI agent until the user gives explicit consent. Never infer or fabricate consent; if automation needs it, set `PRISMA_USER_CONSENT_FOR_DANGEROUS_AI_ACTION` to the user\'s exact consent message.',
      ],
    },
    tips: {
      id: [
        'Gunakan `prisma migrate diff` untuk membandingkan skema lokal dengan database remote tanpa membuat migration file.',
        'Di Prisma 7 `migrate dev` dan `db push` tidak lagi menjalankan generate otomatis (flag `--skip-generate` dihapus): jalankan `prisma generate` secara eksplisit saat butuh output client baru, dan `prisma db seed` secara eksplisit jika butuh seed.',
      ],
      en: [
        'Use `prisma migrate diff` to compare local schema against remote databases without generating migration files.',
        'In Prisma 7 `migrate dev` and `db push` no longer run generate automatically (the `--skip-generate` flag was removed): run `prisma generate` explicitly when you need fresh client output, and `prisma db seed` explicitly when you need seed data.',
      ],
    },
    pairsWellWith: ['prisma-orm-setup', 'prisma-upgrade-v7', 'prisma-client-api'],
    spotlight: {
      title: {
        id: 'Disiplin CI/CD: migrate dev vs migrate deploy',
        en: 'CI/CD Discipline: migrate dev vs migrate deploy',
      },
      body: {
        id: 'Kesalahan paling umum yang dilakukan agen otomatis adalah memanggil `prisma migrate dev` di dalam skrip deploy CI/CD. Perintah `migrate dev` dirancang interaktif: ia mendeteksi drift dan dapat meminta konfirmasi untuk mereset seluruh database! Pada pipeline produksi tanpa terminal interaktif, perintah ini akan hang atau menghapus data. Di CI/CD produksi, satu-satunya perintah yang sah adalah `prisma migrate deploy`. Selain itu, Prisma memblokir perintah destruktif saat mendeteksi agent AI sampai pengguna memberi persetujuan eksplisit; jangan melewati checkpoint itu.',
        en: 'The single most catastrophic automated error is invoking `prisma migrate dev` inside CI/CD deployment scripts. `migrate dev` is an interactive command: it evaluates schema drift and may prompt to drop the database! In headless production pipelines, it either hangs indefinitely or causes catastrophic data loss. In production CI/CD, the only approved command is `prisma migrate deploy`. Prisma also blocks destructive commands when it detects an AI agent until the user gives explicit consent; never bypass that checkpoint.',
      },
    },
    sourcePath: 'prisma-cli/SKILL.md',
  },
  {
    name: 'prisma-driver-adapter-implementation',
    category: 'adapters-protocols',
    invocation: 'model',
    description: {
      id: 'Panduan protokol implementasi SQL driver adapter Prisma ORM 7: SqlDriverAdapter, siklus transaksi, savepoint, pemetaan tipe, dan preservasi error.',
      en: 'Implementation guide for Prisma ORM 7 SQL driver adapters: SqlDriverAdapter protocol, transaction lifecycle, savepoints, type mapping, and error preservation.',
    },
    detailedDescription: {
      id: 'Skill spesifikasi teknis tingkat mendalam untuk mengembangkan atau memodifikasi SQL Driver Adapter di Prisma 7. Driver adapter bertindak sebagai protokol batas antara engine query Prisma dan driver database eksternal. Menguraikan kontrak antarmuka `SqlDriverAdapter`, penanganan query parametrik, siklus hidup transaksi (`startTransaction`, `commit`, `rollback`), dukungan hook savepoint opsional, normalisasi konversi tipe data (DATE, NUMERIC, JSON, UUID), serta kewajiban mempreservasi kode dan pesan error database asli di `DriverAdapterError` agar kode aplikasi dapat menangkap kode error yang sesungguhnya.',
      en: 'Deep-dive technical specification skill for engineering or customizing SQL Driver Adapters in Prisma 7. Driver adapters serve as the protocol boundary between Prisma query planning and external database drivers. Details the `SqlDriverAdapter` interface contract, parameterized query handling, transaction lifecycles (`startTransaction`, `commit`, `rollback`), optional savepoint hook extensions, datatype normalizations (DATE, NUMERIC, JSON, UUID), and the strict requirement to preserve the original database error code and message in `DriverAdapterError` so application code receives authentic native error codes.',
    },
    useWhen: {
      id: [
        'Mengimplementasikan adapter database kustom untuk runtime khusus (misal Cloudflare Workers, Bun, Deno).',
        'Melakukan debug transaksi yang bocor, koneksi macet, atau serialisasi tipe data yang rusak pada driver adapter.',
        'Mengintegrasikan provider koneksi pooled seperti PgBouncer atau Neon Serverless driver.',
      ],
      en: [
        'Engineering custom database adapters for specialized runtimes (e.g. Cloudflare Workers, Bun, Deno).',
        'Debugging transaction leaks, dangling connections, or corrupted datatype serialization in driver adapters.',
        'Integrating pooled connection providers such as PgBouncer or Neon Serverless drivers.',
      ],
    },
    avoidWhen: {
      id: [
        'Penggunaan aplikasi standar yang cukup mengimpor adapter resmi (`@prisma/adapter-pg`, dll.).',
        'Tugas penulisan kueri tingkat tinggi (gunakan prisma-client-api).',
      ],
      en: [
        'Standard applications that simply consume official adapters (`@prisma/adapter-pg`, etc.).',
        'High-level query authoring (use prisma-client-api).',
      ],
    },
    howItWorks: {
      id: [
        'Agent memvalidasi kesesuaian implementasi terhadap interface `@prisma/driver-adapter-utils`.',
        'Memeriksa apakah koneksi transaksi dibebaskan kembali ke pool pada setiap cabang kegagalan (try/finally).',
        'Memastikan error dari native driver dibungkus dalam `DriverAdapterError` (dipetakan ke `MappedError` bila dikenali) tanpa menghilangkan kode dan pesan aslinya.',
      ],
      en: [
        'Agent verifies implementation fidelity against `@prisma/driver-adapter-utils` contracts.',
        'Confirms transactional connections are released back to the pool across all failure paths (try/finally).',
        'Ensures native database errors are wrapped in `DriverAdapterError` (mapped to `MappedError` kinds when recognized) without stripping the original code and message.',
      ],
    },
    coreRules: {
      id: [
        'Gunakan versi `@prisma/driver-adapter-utils` yang identik dengan versi Prisma ORM proyek.',
        'Jangan pernah menelan atau menyembunyikan original error dari database driver.',
        'Wajib rilis koneksi database kembali ke pool jika terjadi kegagalan saat `startTransaction`.',
      ],
      en: [
        'Match `@prisma/driver-adapter-utils` version exactly to the project Prisma ORM installation.',
        'Never swallow or obfuscate the underlying native database driver error.',
        'Always release database connections back to the pool if `startTransaction` fails.',
      ],
    },
    tips: {
      id: [
        'Implementasikan savepoint opsional pada objek Transaction (bukan kedalaman global di adapter) untuk mendukung nested transactions.',
        '`commit()` dan `rollback()` pada Transaction adalah hook siklus hidup: lepaskan koneksi tepat sekali dan jangan mengeluarkan SQL COMMIT/ROLLBACK kedua (Prisma yang menjalankannya lewat `executeRaw`).',
      ],
      en: [
        'Implement optional savepoint methods on the Transaction object (not an adapter-global depth) to support nested transactions.',
        '`commit()` and `rollback()` on the Transaction are lifecycle hooks: release the connection exactly once and do not issue a second SQL COMMIT/ROLLBACK (Prisma runs it through `executeRaw`).',
      ],
    },
    pairsWellWith: ['prisma-upgrade-v7', 'prisma-client-api'],
    spotlight: {
      title: {
        id: 'Protokol Preservasi Error Asli Database',
        en: 'Native Database Error Preservation Protocol',
      },
      body: {
        id: 'Adapter yang menelan detail error database merusak logika aplikasi yang bergantung pada kode error spesifik (seperti 23505 untuk Unique Violation di PostgreSQL) dan fallback `P2039`. Adapter wajib membungkus error driver yang dikenali dalam `DriverAdapterError`, memetakannya ke `MappedError` bila ada, dan mempertahankan kode serta pesan database asli (`originalCode` / `originalMessage`).',
        en: 'Adapters that discard database error details break application logic that expects specific codes (like 23505 for PostgreSQL unique violations) and the `P2039` fallback. Adapters must wrap recognized driver failures in `DriverAdapterError`, map them to `MappedError` kinds where one exists, and preserve the original database code and message (`originalCode` / `originalMessage`).',
      },
    },
    sourcePath: 'prisma-driver-adapter-implementation/SKILL.md',
  },
  {
    name: 'prisma-orm-setup',
    category: 'database-setup',
    invocation: 'model',
    description: {
      id: 'Setup Prisma ORM di aplikasi, hubungkan database, atau perbaiki koneksi aplikasi Prisma 6, 7, atau 8. Aplikasi baru default ke Prisma ORM 8; aplikasi Prisma 6/7 tetap di versinya.',
      en: 'Set up Prisma ORM in an application, connect its database, or troubleshoot the connection of an existing Prisma 6, 7, or 8 app. New applications default to Prisma ORM 8; existing Prisma 6/7 apps stay on their version.',
    },
    detailedDescription: {
      id: 'Skill (v1.0.0) yang memegang pemilihan versi ORM untuk pekerjaan setup dan koneksi, menggantikan prisma-database-setup yang kini hanya alias deprecated. Langkah: 1) deteksi titik awal (manifest, lockfile, config, schema, import; versi CLI saja tidak menentukan versi aplikasi); 2) upgrade mayor ditangani terpisah (prisma-upgrade-v7 untuk 6 ke 7, prisma-mongodb-upgrade untuk MongoDB 6 ke 8); 3) bootstrap aplikasi baru dengan CLI Prisma 8 yang di-pin, mis. `prisma orm init --yes --target postgres --authoring psl`; 4) `prisma skills sync` lalu baca `prisma-8/SKILL.md` yang tersinkron; 5) untuk versi lebih lama, ikuti referensi provider (PostgreSQL, MySQL/MariaDB/PlanetScale, SQLite/Turso, SQL Server/Azure SQL, CockroachDB, MongoDB di Prisma 6, Prisma Postgres di Prisma 7); 6) hubungkan dan verifikasi dengan kueri read-only lewat client aplikasi.',
      en: 'A v1.0.0 skill that owns ORM version selection for setup and connection work, replacing prisma-database-setup, which is now only a deprecated alias. Steps: 1) detect the starting point (manifest, lockfile, config, schema, imports; the CLI version alone does not identify the app\'s version); 2) major upgrades are handled separately (prisma-upgrade-v7 for 6 to 7, prisma-mongodb-upgrade for MongoDB 6 to 8); 3) bootstrap new apps with a pinned Prisma 8 CLI, e.g. `prisma orm init --yes --target postgres --authoring psl`; 4) `prisma skills sync`, then read the synced `prisma-8/SKILL.md`; 5) for earlier versions follow the provider references (PostgreSQL, MySQL/MariaDB/PlanetScale, SQLite/Turso, SQL Server/Azure SQL, CockroachDB, MongoDB on Prisma 6, Prisma Postgres on Prisma 7); 6) connect and verify with a read-only query through the app\'s client.',
    },
    useWhen: {
      id: [
        'Memulai aplikasi baru dan menghubungkan Prisma ORM ke database.',
        'Memperbaiki koneksi aplikasi Prisma 6, 7, atau 8 yang sudah ada tanpa upgrade mayor.',
        'Memilih referensi provider untuk PostgreSQL, MySQL, SQLite, SQL Server, CockroachDB, MongoDB, atau Prisma Postgres.',
      ],
      en: [
        'Starting a new application and connecting Prisma ORM to a database.',
        'Repairing the connection of an existing Prisma 6, 7, or 8 app without a major upgrade.',
        'Choosing the provider reference for PostgreSQL, MySQL, SQLite, SQL Server, CockroachDB, MongoDB, or Prisma Postgres.',
      ],
    },
    avoidWhen: {
      id: [
        'Hanya membutuhkan database Prisma Postgres tanpa konfigurasi ORM (gunakan prisma-postgres-setup).',
        'Upgrade mayor 6 ke 7 (gunakan prisma-upgrade-v7) atau MongoDB 6 ke 8 (gunakan prisma-mongodb-upgrade).',
      ],
      en: [
        'You only need a Prisma Postgres database without ORM configuration (use prisma-postgres-setup).',
        'Major upgrades 6 to 7 (use prisma-upgrade-v7) or MongoDB 6 to 8 (use prisma-mongodb-upgrade).',
      ],
    },
    howItWorks: {
      id: [
        'Agent membaca manifest, lockfile, konfigurasi Prisma, schema, dan import untuk menentukan versi ORM, provider database, dan runtime.',
        'Untuk aplikasi baru, agent memeriksa dukungan provider dan persyaratan runtime Prisma 8, memasang CLI Prisma 8 yang di-pin, lalu menjalankan init.',
        'Agent menjalankan `prisma skills sync` dan membaca `prisma-8/SKILL.md` yang tersinkron; sync saja belum memuat instruksinya.',
        'Untuk Prisma 6/7, agent memakai referensi provider yang sesuai dan tidak menyalin konfigurasi Prisma 7 ke aplikasi Prisma 6.',
        'Agent memverifikasi dengan kueri read-only lewat client aplikasi ke database yang dituju.',
      ],
      en: [
        'Agent reads the manifest, lockfile, Prisma configuration, schema, and imports to identify the ORM version, database provider, and runtime.',
        'For new apps, agent checks Prisma 8 provider support and runtime requirements, installs a pinned Prisma 8 CLI, then runs init.',
        'Agent runs `prisma skills sync` and reads the synced `prisma-8/SKILL.md`; syncing alone does not load the instructions.',
        'For Prisma 6/7, agent uses the matching provider reference and does not copy Prisma 7 configuration into a Prisma 6 app.',
        'Agent verifies with a read-only query through the app\'s client against the intended database.',
      ],
    },
    coreRules: {
      id: [
        'Pertahankan versi ORM dan database yang dituju aplikasi; perbaikan koneksi tidak memerlukan upgrade mayor.',
        'Aplikasi baru default ke Prisma ORM 8; jika provider tidak didukung, jelaskan batasannya dan tawarkan versi lama secara eksplisit, jangan diam-diam berpindah database.',
        'Simpan kredensial di file environment yang di-ignore atau secret host; CLI dan aplikasi bisa memuat file environment berbeda.',
        'Instalasi paket atau sync skill saja bukan setup yang selesai: verifikasi dengan kueri read-only.',
      ],
      en: [
        'Preserve the application\'s ORM version and intended database; a connection repair does not require a major upgrade.',
        'New apps default to Prisma ORM 8; if the provider is unsupported, explain the limitation and offer an earlier version explicitly, never silently switch databases.',
        'Keep credentials in ignored environment files or the host\'s secret configuration; the CLI and the app can load different env files.',
        'Package installation or a skill sync alone is not a finished setup: verify with a read-only query.',
      ],
    },
    tips: {
      id: [
        'Pin versi CLI Prisma 8 yang dipublikasikan dan verifikasi versinya sebelum init; jangan bergantung pada `latest` yang mengambang.',
        'Untuk provider PostgreSQL pada Prisma 8: `prisma orm init --yes --target postgres --authoring psl`.',
      ],
      en: [
        'Pin a published Prisma 8 CLI release and verify its version before init; do not rely on a floating `latest`.',
        'For PostgreSQL on Prisma 8: `prisma orm init --yes --target postgres --authoring psl`.',
      ],
    },
    pairsWellWith: ['prisma-postgres-setup', 'prisma-cli', 'prisma-upgrade-v7'],
    spotlight: {
      title: {
        id: 'Versi CLI Tidak Sama dengan Versi Aplikasi',
        en: 'CLI Version Is Not the App Version',
      },
      body: {
        id: 'Menurut skill ini, CLI Prisma 8 bisa hidup berdampingan dengan client lama, jadi versi CLI saja tidak menunjukkan versi ORM aplikasi. Periksa `@prisma/client`, `@prisma/prisma7`, schema, dan konfigurasi sebelum memutuskan jalur setup. Skill prisma-database-setup yang lama kini hanya alias deprecated yang mengarahkan ke skill ini.',
        en: 'Per this skill, a Prisma 8 CLI can coexist with a legacy client, so the CLI version alone does not identify the app\'s ORM version. Inspect `@prisma/client`, `@prisma/prisma7`, the schema, and the configuration before choosing a setup path. The old prisma-database-setup skill is now only a deprecated alias that points here.',
      },
    },
    sourcePath: 'prisma-orm-setup/SKILL.md',
  },
  {
    name: 'prisma-postgres-setup',
    category: 'cloud-database',
    invocation: 'model',
    description: {
      id: 'Gunakan ulang atau dapatkan database Prisma Postgres dan hubungkan aplikasi; konfigurasi ORM diserahkan ke prisma-orm-setup.',
      en: 'Obtain or reuse a Prisma Postgres database and connect an application; Prisma ORM configuration is handed off to prisma-orm-setup.',
    },
    detailedDescription: {
      id: 'Skill (v2.0.0) yang memisahkan provisioning database dari konfigurasi ORM agar database yang sudah ada dipakai ulang. Alur: 1) periksa proyek (ORM/driver pilihan pengguna, paket, koneksi, file environment); 2) gunakan ulang koneksi atau integrasi yang ada; untuk v0 atau Vercel Marketplace pakai alur integrasi native; untuk database persisten pakai Platform CLI terautentikasi (`npx -y @prisma/cli@latest database --help`), MCP, Console, atau Management API dengan service token workspace; untuk database sementara pakai `create-db` (aktif 24 jam dan dihapus jika tidak diklaim); 3) simpan koneksi di konfigurasi secret proyek; 4) serahkan konfigurasi ORM ke prisma-orm-setup dan verifikasi dengan kueri read-only. Skill prisma-postgres yang lama kini hanya alias deprecated untuk skill ini.',
      en: 'A v2.0.0 skill that keeps database provisioning separate from ORM configuration so an existing database is reused. Flow: 1) inspect the project (user-requested ORM/driver, packages, connection, env files); 2) reuse an existing connection or integration; for v0 or the Vercel Marketplace use the native integration flow; for a persistent database use the authenticated Platform CLI (`npx -y @prisma/cli@latest database --help`), MCP, Console, or the Management API with a workspace service token; for a temporary database use `create-db` (available for 24 hours and deleted if unclaimed); 3) store the connection in the project\'s secret configuration; 4) hand ORM configuration to prisma-orm-setup and verify with a read-only query. The old prisma-postgres skill is now only a deprecated alias for this one.',
    },
    useWhen: {
      id: [
        'Menyiapkan database Prisma Postgres atau menghubungkan aplikasi ke Prisma Postgres.',
        'Setup Prisma Postgres lewat v0 atau Vercel Marketplace.',
        'Membutuhkan database sementara yang bisa diklaim untuk pengembangan (`create-db`).',
      ],
      en: [
        'Setting up a Prisma Postgres database or connecting an application to Prisma Postgres.',
        'Prisma Postgres setup through v0 or the Vercel Marketplace.',
        'Needing a temporary, claimable development database (`create-db`).',
      ],
    },
    avoidWhen: {
      id: [
        'Proyek yang sudah memiliki koneksi aktif dan hanya butuh kueri atau skema (gunakan skill ORM yang sesuai versi).',
        'Konfigurasi Prisma ORM itu sendiri (gunakan prisma-orm-setup).',
      ],
      en: [
        'Projects with an existing working connection that only need queries or schema work (use the version-matched ORM skill).',
        'Prisma ORM configuration itself (use prisma-orm-setup).',
      ],
    },
    howItWorks: {
      id: [
        'Agent memeriksa ORM/driver yang diminta, paket terpasang, koneksi, dan file environment tanpa menampilkan nilai secret.',
        'Menggunakan ulang koneksi yang ada, atau memutuskan jalur: Marketplace, database persisten, atau database sementara.',
        'Menentukan workspace, project, dan region sebelum membuat; jika ada beberapa kandidat, agent bertanya.',
        'Menyimpan koneksi di konfigurasi secret, menyerahkan setup ORM ke prisma-orm-setup, lalu memverifikasi dengan kueri read-only.',
      ],
      en: [
        'Agent checks the requested ORM/driver, installed packages, connection, and env files without printing secret values.',
        'Reuses an existing connection, or picks a path: Marketplace, persistent database, or temporary database.',
        'Resolves workspace, project, and region before creating; if several fit, the agent asks.',
        'Stores the connection in secret configuration, hands ORM setup to prisma-orm-setup, then verifies with a read-only query.',
      ],
    },
    coreRules: {
      id: [
        'Hormati pilihan eksplisit seperti Drizzle, `pg`, atau setup database-only.',
        'Gunakan ulang database yang ada; jangan membuat database lain hanya karena variabel tidak terlihat di shell (CLI dan aplikasi bisa memuat file environment berbeda).',
        'Jangan menghapus resource lain atau berpindah workspace untuk mengakali masalah izin atau kuota; laporkan hambatannya.',
        'Simpan koneksi di konfigurasi secret, bukan di kode sumber atau chat.',
      ],
      en: [
        'Honor explicit choices such as Drizzle, `pg`, or database-only setup.',
        'Reuse an existing database; do not provision another one just because a variable is missing from the shell (the CLI and the app can load different env files).',
        'Do not delete another resource or switch workspaces to get around permission or quota blocks; report the blocker.',
        'Store the connection in secret configuration, never in source code or chat.',
      ],
    },
    tips: {
      id: [
        'Untuk database sementara: `npx create-db@latest create --help` dan `npx create-db@latest regions --help` menunjukkan opsi dan region yang tersedia.',
        'Klaim database `create-db` lewat claim URL sebelum kedaluwarsa jika ingin mempertahankannya (butuh akun Prisma).',
      ],
      en: [
        'For a temporary database: `npx create-db@latest create --help` and `npx create-db@latest regions --help` show the available options and regions.',
        'Claim a `create-db` database through its claim URL before it expires if you want to keep it (requires a Prisma account).',
      ],
    },
    pairsWellWith: ['prisma-orm-setup', 'prisma-cli', 'prisma-compute'],
    spotlight: {
      title: {
        id: 'Provisioning Terpisah dari Konfigurasi ORM',
        en: 'Provisioning Kept Separate from ORM Configuration',
      },
      body: {
        id: 'Skill ini hanya mengurus database: menggunakan ulang atau membuatnya, lalu menyimpan koneksi dengan aman. Konfigurasi ORM diserahkan ke prisma-orm-setup, dan setup dianggap selesai hanya setelah kueri read-only lewat client aplikasi berhasil. Jika langkah tertentu terblokir atau belum diuji, laporkan apa adanya.',
        en: 'This skill only handles the database: reuse or create it, then store the connection safely. ORM configuration is handed to prisma-orm-setup, and setup counts as complete only after a read-only query through the app\'s client succeeds. If a step is blocked or untested, say so instead of claiming success.',
      },
    },
    sourcePath: 'prisma-postgres-setup/SKILL.md',
  },
  {
    name: 'prisma-compute',
    category: 'hosting-deployment',
    invocation: 'model',
    description: {
      id: 'Panduan deployment dan hosting aplikasi pada Prisma Compute: prisma.compute.ts, port binding 0.0.0.0, dan kesiapan deploy berbagai framework.',
      en: 'Deployment and hosting guide for Prisma Compute: prisma.compute.ts, 0.0.0.0 port binding, and multi-framework deploy readiness.',
    },
    detailedDescription: {
      id: 'Panduan untuk membuat dan men-deploy aplikasi di Prisma Compute memakai Platform CLI (`bunx @prisma/cli@latest app deploy`, bukan `prisma app deploy` dari ORM CLI). Membahas `prisma.compute.ts` (`defineComputeConfig`, `app` vs `apps`), binding host `0.0.0.0`, port via `process.env.PORT`, autentikasi (login workspace atau `PRISMA_SERVICE_TOKEN`), batas 60 detik ingress (504), `app deploy --no-promote`, dan framework yang didukung deploy: nextjs, nuxt, astro, hono, nestjs, tanstack-start, custom, dan bun.',
      en: 'Guide for creating and deploying apps on Prisma Compute with the Platform CLI (`bunx @prisma/cli@latest app deploy`, not `prisma app deploy` from the ORM CLI). Covers `prisma.compute.ts` (`defineComputeConfig`, `app` vs `apps`), `0.0.0.0` host binding, `process.env.PORT`, auth (workspace login or `PRISMA_SERVICE_TOKEN`), the 60-second ingress limit (504), `app deploy --no-promote`, and the frameworks supported for deploy: nextjs, nuxt, astro, hono, nestjs, tanstack-start, custom, and bun.',
    },
    useWhen: {
      id: [
        'Men-deploy aplikasi TypeScript ke Prisma Compute.',
        'Mengonfigurasi `prisma.compute.ts` dan setting network container.',
        'Mengatasi aplikasi yang tidak bisa dijangkau karena binding localhost atau port yang salah.',
      ],
      en: [
        'Deploying TypeScript applications to Prisma Compute.',
        'Configuring `prisma.compute.ts` and container networking directives.',
        'Troubleshooting apps that are unreachable because of localhost binding or a wrong port.',
      ],
    },
    avoidWhen: {
      id: [
        'Deployment ke provider lain seperti Vercel, Cloudflare Workers, AWS, atau Railway.',
      ],
      en: [
        'Deploying workloads to alternate hosting providers like Vercel, Cloudflare, AWS, or Railway.',
      ],
    },
    howItWorks: {
      id: [
        'Agent memeriksa skrip build dan start pada `package.json`.',
        'Memastikan server mendengarkan host `0.0.0.0` dan port deploy (baca `process.env.PORT` atau teruskan `--http-port` yang sama).',
        'Memverifikasi CLI dengan `--help`, lalu men-deploy lewat `@prisma/cli app deploy` (atau skrip `compute:deploy` yang ada), dengan `prisma.compute.ts` bila perlu.',
      ],
      en: [
        'Agent audits build and startup scripts in `package.json`.',
        'Verifies the application binds to host `0.0.0.0` and the deployed HTTP port (read `process.env.PORT` or pass the matching `--http-port`).',
        'Verifies the CLI with `--help`, then deploys through `@prisma/cli app deploy` (or the existing `compute:deploy` script), using `prisma.compute.ts` when needed.',
      ],
    },
    coreRules: {
      id: [
        'Wajib bind ke `0.0.0.0`, bukan `localhost` atau `127.0.0.1`.',
        'Wajib baca port dari variabel lingkungan `process.env.PORT`.',
        'Compute membutuhkan server entrypoint atau artifact framework, bukan hanya output statis; untuk Next.js dibutuhkan output standalone.',
        'Ingress memberi aplikasi 60 detik untuk mulai merespons, lalu mengembalikan 504; jalankan pekerjaan panjang di luar request.',
      ],
      en: [
        'Always bind to `0.0.0.0`, never to `localhost` or `127.0.0.1`.',
        'Always listen on `process.env.PORT` injected dynamically by the container runtime.',
        'Compute needs a server entrypoint or framework artifact, not only static output; Next.js needs standalone output.',
        'The ingress gives the app 60 seconds to start responding, then returns 504; run long work outside the request.',
      ],
    },
    tips: {
      id: [
        'Gunakan `bunx @prisma/cli@latest app logs` (Platform CLI, bukan `prisma app logs` dari ORM CLI) untuk melihat log runtime; `app logs --deployment <id>` untuk deployment tertentu.',
        'Gunakan `app deploy --no-promote` untuk build lalu verifikasi kandidat di URL-nya sendiri sebelum dipromosikan dengan `app promote <deployment-id>`.',
      ],
      en: [
        'Use `bunx @prisma/cli@latest app logs` (the Platform CLI, not `prisma app logs` from the ORM CLI) for runtime logs; `app logs --deployment <id>` targets a specific deployment.',
        'Use `app deploy --no-promote` to build and verify a candidate at its own URL before promoting it with `app promote <deployment-id>`.',
      ],
    },
    pairsWellWith: ['prisma-postgres-setup', 'prisma-cli'],
    spotlight: {
      title: {
        id: 'Aturan Wajib Host Binding 0.0.0.0',
        en: 'Mandatory 0.0.0.0 Host Binding Rule',
      },
      body: {
        id: 'Jebakan paling sering dialami pada container deployment adalah membiarkan server default mendengarkan `localhost` (127.0.0.1). Menurut skill ini, readiness Compute hanya memantau port yang didengarkan, sehingga listener loopback bisa terlihat siap padahal ingress publik tidak bisa menjangkaunya. Karena itu bind ke semua interface (`0.0.0.0`) dan ke port deploy wajib dilakukan.',
        en: 'The most frequent container deployment failure is letting servers listen on `localhost` (127.0.0.1). Per this skill, Compute readiness only watches listening ports, so a loopback-only listener can look ready while public ingress cannot reach it. Binding to all interfaces (`0.0.0.0`) and to the deployed port is therefore mandatory.',
      },
    },
    sourcePath: 'prisma-compute/SKILL.md',
  },
  {
    name: 'prisma-mongodb-upgrade',
    category: 'migrations-upgrade',
    invocation: 'model',
    description: {
      id: 'Panduan keputusan dan migrasi untuk proyek Prisma MongoDB di v6, yang tidak punya jalur ke v7: v6 adalah rilis mayor terminal, jalur penerusnya adalah Prisma 8 (dukungan MongoDB masih Early Access).',
      en: 'Decision and migration guide for Prisma MongoDB projects on v6, which have no upgrade path to v7: v6 is the terminal major, and the successor path is Prisma 8 (MongoDB support is Early Access).',
    },
    detailedDescription: {
      id: 'Skill keputusan (v0.2.0) bagi tim yang memakai MongoDB dengan Prisma ORM. Fakta intinya: v6 adalah mayor klasik terakhir untuk MongoDB, dan v7 tidak pernah merilis konektor MongoDB. Jalur penerusnya adalah Prisma 8, tempat dukungan MongoDB berstatus Early Access lewat `@prisma/orm-mongo` (butuh Node.js 22.18+, TypeScript 5.9+, MongoDB 8.0+, dan `mongodb@7`). Upstream menyatakan migrasi ke Prisma 8 sebagai jalur yang didorong; bertahan di v6 tetap sah bila ada hambatan keras, misalnya Prisma 8 belum punya metode transaksi MongoDB atau tim tidak dapat menyerap perubahan antar release candidate. Skill ini juga membawa referensi pemetaan schema, client API, migrasi, dan checklist cutover tanpa memindahkan data.',
      en: 'A v0.2.0 decision skill for teams running MongoDB with Prisma ORM. The core fact: v6 is the terminal classic major for MongoDB, and v7 never ships a MongoDB connector. The successor path is Prisma 8, where MongoDB support is Early Access via `@prisma/orm-mongo` (needs Node.js 22.18+, TypeScript 5.9+, MongoDB 8.0+, and `mongodb@7`). Upstream calls migrating to Prisma 8 the encouraged path; staying on v6 remains legitimate where a hard blocker applies, such as Prisma 8 having no MongoDB transaction method yet or a team that cannot absorb changes between release candidates. The skill also carries mapping references for schema, client API, and migrations, plus a no-data-moves cutover checklist.',
    },
    useWhen: {
      id: [
        'Proyek dengan `provider = "mongodb"` menanyakan kemungkinan upgrade ke Prisma 7.',
        'Mengevaluasi perpindahan dari Prisma v6 ke Prisma 8 untuk proyek berbasis MongoDB.',
      ],
      en: [
        'Projects with `provider = "mongodb"` inquiring about upgrading to Prisma 7.',
        'Evaluating a move from Prisma v6 to Prisma 8 for a MongoDB-backed project.',
      ],
    },
    avoidWhen: {
      id: [
        'Proyek yang menggunakan database relasional SQL (PostgreSQL, MySQL, SQLite) yang dapat langsung upgrade ke v7.',
      ],
      en: [
        'Projects using relational SQL engines (PostgreSQL, MySQL, SQLite) with direct Prisma 7 upgrade paths.',
      ],
    },
    howItWorks: {
      id: [
        'Agent mendeteksi `provider = "mongodb"` di schema.prisma.',
        'Segera menegaskan bahwa Prisma 7 tidak punya konektor MongoDB dan panduan prisma-upgrade-v7 tidak berlaku.',
        'Menyajikan keputusan: migrasi ke Prisma 8 (didorong) atau bertahan di v6 bila ada hambatan keras, memeriksa penggunaan `$transaction` lewat grep, bukan bertanya.',
        'Untuk migrasi, memakai referensi pemetaan dan menjalankan checklist cutover (database yang sama, paritas index, uji round-trip bertahap).',
      ],
      en: [
        'Agent detects `provider = "mongodb"` in schema.prisma.',
        'Immediately states that Prisma 7 has no MongoDB connector and the prisma-upgrade-v7 guide does not apply.',
        'Presents the decision: migrate to Prisma 8 (encouraged) or stay on v6 where a hard blocker applies, checking `$transaction` usage with grep instead of asking.',
        'For migration, uses the mapping references and runs the cutover checklist (same database, index parity, staged round-trip).',
      ],
    },
    coreRules: {
      id: [
        'Jangan pernah menyarankan proyek MongoDB untuk "upgrade ke Prisma 7"; konektornya tidak ada.',
        'Jangan pernah menyelesaikan pertanyaan versi dengan menulis ulang aplikasi ke database SQL; mengganti engine database adalah keputusan terpisah yang jauh lebih besar.',
        'Jika bertahan di v6: pin ke 6.x terbaru, ikuti patch 6.x, pantau advisory keamanan, dan pertahankan setup MongoDB klasik (`url = env("DATABASE_URL")` di schema, alur `db push`, tanpa SQL driver adapter).',
        'Sebelum bertindak berdasarkan klaim Prisma 8, periksa versi terpasang (`npm ls @prisma/orm-mongo`) dan skill `prisma-8` yang tersinkron, karena dukungan MongoDB masih berubah antar release candidate.',
      ],
      en: [
        'Never advise a MongoDB project to "upgrade to Prisma 7"; the connector does not exist there.',
        'Never solve the version question by rewriting the app onto a SQL database; changing the database engine is a separate, much larger decision.',
        'If staying on v6: pin to the latest 6.x, keep taking 6.x patches, track security advisories, and keep the classic MongoDB setup (`url = env("DATABASE_URL")` in the schema, `db push` workflow, no SQL driver adapters).',
        'Before acting on any Prisma 8 claim, check the installed version (`npm ls @prisma/orm-mongo`) and the synced `prisma-8` skill, since MongoDB support still changes between release candidates.',
      ],
    },
    tips: {
      id: [
        'Jika berisiko tinggi tetapi tertarik, arahkan Prisma 8 ke schema v6 dengan `prisma6Schema(...)`, latih di salinan database, lalu migrasi.',
        'Setelah pindah ke Prisma 8, jalankan `prisma skills sync` dan baca `prisma-8/SKILL.md`; jangan terus bekerja dari ringkasan skill ini.',
      ],
      en: [
        'If risk-averse but interested, point Prisma 8 at the v6 schema with `prisma6Schema(...)`, rehearse on a copy of the database, then migrate.',
        'After switching to Prisma 8, run `prisma skills sync` and read `prisma-8/SKILL.md`; do not keep working from this skill\'s summaries.',
      ],
    },
    pairsWellWith: ['prisma-upgrade-v7', 'prisma-client-api', 'prisma-orm-setup'],
    spotlight: {
      title: {
        id: 'Fakta Kritis: v6 Rilis Terminal untuk MongoDB, Penerusnya Prisma 8',
        en: 'Critical Fact: v6 Is the Terminal MongoDB Release, Prisma 8 Is the Successor',
      },
      body: {
        id: 'Prisma 7 tidak pernah punya konektor MongoDB, jadi jangan menghabiskan waktu men-debug adapter MongoDB di Prisma 7. Keputusan nyatanya: migrasi ke Prisma 8 (jalur yang didorong, MongoDB masih Early Access) atau bertahan di v6 secara sengaja bila ada hambatan keras. Mengganti database ke SQL bukan jawaban atas pertanyaan versi.',
        en: 'Prisma 7 never had a MongoDB connector, so do not spend time debugging MongoDB adapters on Prisma 7. The real decision: migrate to Prisma 8 (the encouraged path, MongoDB still Early Access) or deliberately stay on v6 where a hard blocker applies. Switching the database to SQL is not an answer to the version question.',
      },
    },
    sourcePath: 'prisma-mongodb-upgrade/SKILL.md',
  },
]
