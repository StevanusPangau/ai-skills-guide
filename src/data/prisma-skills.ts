import type { BilingualString, BilingualList } from '@/types/skill'

export const PRISMA_SOURCE_REPO = 'github.com/prisma/skills'
export const PRISMA_SOURCE_SHA = '7.9.1'
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
      id: 'Skill resmi untuk memandu migrasi aplikasi Prisma ORM dari versi 6 ke versi 7. Versi 7 membawa perubahan arsitektur terbesar: generator `prisma-client-js` digantikan oleh generator `prisma-client`, driver adapters berbasis JavaScript (seperti @prisma/adapter-pg, @prisma/adapter-neon, @prisma/adapter-d1) kini wajib digunakan untuk koneksi basis data menggantikan C++ query engine rust bawaan, file konfigurasi `prisma.config.ts` menggantikan konfigurasi lama, file `.env` tidak lagi dimuat secara otomatis melainkan harus eksplisit, dan entri import client berpindah ke path kustom tergenerasi.',
      en: 'Official skill guiding the migration of Prisma ORM applications from v6 to v7. Prisma 7 introduces fundamental architectural shifts: the legacy `prisma-client-js` generator is replaced by `prisma-client`, JavaScript-based driver adapters (such as @prisma/adapter-pg, @prisma/adapter-neon, @prisma/adapter-d1) are now mandatory for database communication, a typed `prisma.config.ts` configuration file replaces legacy schema flags, `.env` files are no longer loaded implicitly by default, and client entrypoints move to generated paths.',
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
        'Memperbarui blok generator dari `provider = "prisma-client-js"` menjadi `provider = "prisma-client"`.',
        'Menginstal adapter driver yang sesuai (misal `@prisma/adapter-pg` dan `pg`).',
        'Membuat file `prisma.config.ts` untuk mengelola koneksi dan migrasi secara terpusat.',
        'Memperbarui import `@prisma/client` menjadi import path kustom yang didefinisikan generator.',
      ],
      en: [
        'Agent audits existing dependencies and schema.prisma generator declarations.',
        'Updates the generator block from `provider = "prisma-client-js"` to `provider = "prisma-client"`.',
        'Installs the matching driver adapter package (e.g. `@prisma/adapter-pg` and `pg`).',
        'Scaffolds `prisma.config.ts` for centralized connection and migration management.',
        'Rewrites `@prisma/client` imports to point to the designated generated entrypoint.',
      ],
    },
    coreRules: {
      id: [
        'Generator `prisma-client-js` tidak lagi didukung di Prisma 7; wajib ganti ke `prisma-client`.',
        'Driver adapter wajib diinisialisasi dan dioper ke konstruktor PrismaClient.',
        'Dilarang mengandalkan auto-loading `.env`; pastikan variabel lingkungan diekspor atau dimuat dengan dotenv/tsx.',
      ],
      en: [
        'The `prisma-client-js` generator is obsolete in Prisma 7; replace with `prisma-client`.',
        'A database driver adapter must be instantiated and passed into the PrismaClient constructor.',
        'Never rely on implicit `.env` autoloading; ensure environment variables are explicitly loaded.',
      ],
    },
    tips: {
      id: [
        'Aktifkan preview fitur `typedSql` di Prisma 7 untuk mendapatkan static type inference pada raw SQL queries.',
        'Jalankan `npx prisma generate` segera setelah memperbarui schema untuk memastikan entrypoint baru terbentuk.',
      ],
      en: [
        'Enable the `typedSql` preview feature in Prisma 7 for compile-time typed raw SQL queries.',
        'Run `npx prisma generate` immediately following schema updates to produce the designated client files.',
      ],
    },
    pairsWellWith: ['prisma-driver-adapter-implementation', 'prisma-cli', 'prisma-database-setup'],
    spotlight: {
      title: {
        id: 'Arsitektur Wajib Driver Adapter di Prisma 7',
        en: 'Mandatory Driver Adapter Architecture in Prisma 7',
      },
      body: {
        id: 'Pada Prisma 6 ke bawah, query engine binary (C++/Rust) menangani koneksi socket database secara internal. Di Prisma 7, binary engine dipangkas demi ukuran bundle yang ringan dan kompatibilitas serverless/edge. Hasilnya: driver adapter JavaScript (seperti node-postgres, Neon serverless, atau D1) kini wajib dipasang oleh developer. Kode inisialisasi client harus secara eksplisit mengoper instance adapter ke `new PrismaClient({ adapter })`.',
        en: 'In Prisma 6 and earlier, internal Rust/C++ binaries handled database socket connections directly. In Prisma 7, binary engines were eliminated to minimize bundle sizes and achieve native serverless/edge compatibility. Consequently, JavaScript driver adapters (such as node-postgres, Neon serverless, or D1) are now mandatory. Client initialization must explicitly pass the adapter instance into `new PrismaClient({ adapter })`.',
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
        'Menerapkan nested writes untuk menyimpan data relasi dalam satu panggilan atomik tanpa kueri tambahan.',
        'Membungkus mutasi yang saling bergantung ke dalam transaksi interaktif dengan error handling eksplisit.',
      ],
      en: [
        'Agent selects the most performant Prisma Client method to minimize heap overhead.',
        'Enforces targeted `select` clauses to retrieve only necessary columns, avoiding wasteful implicit full-row fetches.',
        'Applies nested writes to persist relational records in a single atomic database pass.',
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
        'Hindari nesting `include` yang terlalu dalam (> 3 tingkat) karena dapat memicu JOIN SQL yang sangat berat.',
      ],
      en: [
        'Use `prisma.$extends` to add computed fields or query telemetry without modifying schema.prisma.',
        'Avoid deeply nested `include` trees (> 3 levels) which generate expensive relational SQL JOIN trees.',
      ],
    },
    pairsWellWith: ['prisma-upgrade-v7', 'prisma-cli', 'supabase-postgres-best-practices'],
    spotlight: {
      title: {
        id: 'Nested Writes: Keandalan Atomik Tanpa Transaksi Manual',
        en: 'Nested Writes: Atomic Reliability Without Manual Transactions',
      },
      body: {
        id: 'Prisma Client memungkinkan penulisan relasi bertingkat (misal membuat User sekaligus profil dan post perdananya) melalui blok `create: { posts: { create: [...] } }`. Secara internal, Prisma otomatis membungkus seluruh hierarki penulisan tersebut ke dalam satu transaksi database tunggal. Jika salah satu insert gagal, seluruh operasi di-rollback otomatis tanpa perlu kode boilerplate `$transaction`.',
        en: 'Prisma Client supports hierarchical relational writes (e.g. creating a User alongside their Profile and first Post) via `create: { posts: { create: [...] } }`. Internally, Prisma automatically wraps the entire relational write graph inside a single database transaction. If any nested insertion fails, the complete operation rolls back automatically without boilerplate `$transaction` code.',
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
      id: 'Skill operasional untuk seluruh siklus perintah Prisma ORM CLI. Membedakan dengan jelas batasan antara ORM CLI (`npx prisma`) dan Prisma Platform/Compute CLI. Menguraikan alur kerja migrasi pengembangan (`prisma migrate dev`), deployment produksi (`prisma migrate deploy`), sinkronisasi skema cepat tanpa migrasi (`prisma db push`), inspeksi database visual (`prisma studio`), validasi & format skema (`prisma validate`, `prisma format`), serta integrasi Prisma MCP server untuk asisten AI.',
      en: 'Operational command reference for the complete Prisma ORM CLI lifecycle. Clearly distinguishes between the core ORM CLI (`npx prisma`) and the Prisma Platform/Compute CLI. Outlines developmental migration workflows (`prisma migrate dev`), production zero-downtime rollouts (`prisma migrate deploy`), rapid schema prototyping (`prisma db push`), visual data inspection (`prisma studio`), schema linting (`prisma validate`, `prisma format`), and the Prisma MCP server integration for AI coding agents.',
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
      ],
      en: [
        'Agent selects the safe and appropriate CLI command matching the runtime target (dev vs production).',
        'Ensures `prisma migrate deploy` is used in automated CI/CD because it requires zero interactive terminal prompts.',
        'Detects migration drift or unapplied steps and recommends targeted fixes before prompting a destructive reset.',
      ],
    },
    coreRules: {
      id: [
        'Jangan pernah jalankan `prisma db push` di produksi jika skema memiliki data penting; gunakan migrasi terencana.',
        'Di produksi, selalu gunakan `npx prisma migrate deploy` untuk menerapkan migrasi tertunda.',
        'Jalankan `npx prisma validate` sebelum commit untuk memastikan integritas relasi skema.',
      ],
      en: [
        'Never run `prisma db push` in production if preserving critical data; use planned migrations.',
        'In production environments, always execute `npx prisma migrate deploy` to apply pending migrations.',
        'Run `npx prisma validate` prior to git commit to guarantee schema and relation integrity.',
      ],
    },
    tips: {
      id: [
        'Gunakan `prisma migrate diff` untuk membandingkan skema lokal dengan database remote tanpa membuat migration file.',
        'Gunakan flag `--skip-generate` pada CI/CD bila client sudah di-generate di langkah build terpisah.',
      ],
      en: [
        'Use `prisma migrate diff` to compare local schema against remote databases without generating migration files.',
        'Pass `--skip-generate` in CI pipelines if the Prisma Client was already built in an earlier step.',
      ],
    },
    pairsWellWith: ['prisma-database-setup', 'prisma-upgrade-v7', 'prisma-client-api'],
    spotlight: {
      title: {
        id: 'Disiplin CI/CD: migrate dev vs migrate deploy',
        en: 'CI/CD Discipline: migrate dev vs migrate deploy',
      },
      body: {
        id: 'Kesalahan paling umum yang dilakukan agen otomatis adalah memanggil `prisma migrate dev` di dalam skrip deploy CI/CD. Perintah `migrate dev` dirancang interaktif: ia mendeteksi drift dan dapat meminta konfirmasi untuk mereset seluruh database! Pada pipeline produksi tanpa terminal interaktif, perintah ini akan hang atau menghapus data. Di CI/CD produksi, satu-satunya perintah yang sah adalah `prisma migrate deploy`.',
        en: 'The single most catastrophic automated error is invoking `prisma migrate dev` inside CI/CD deployment scripts. `migrate dev` is an interactive command: it evaluates schema drift and may prompt to drop the database! In headless production pipelines, it either hangs indefinitely or causes catastrophic data loss. In production CI/CD, the only approved command is `prisma migrate deploy`.',
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
      id: 'Skill spesifikasi teknis tingkat mendalam untuk mengembangkan atau memodifikasi SQL Driver Adapter di Prisma 7. Driver adapter bertindak sebagai protokol batas antara engine query Prisma dan driver database eksternal. Menguraikan kontrak antarmuka `SqlDriverAdapter`, penanganan query parametrik, siklus hidup transaksi (`startTransaction`, `commit`, `rollback`), dukungan hook savepoint opsional, normalisasi konversi tipe data (DATE, NUMERIC, JSON, UUID), serta kewajiban mempreservasi `DriverAdapterError` asli agar kode aplikasi dapat menangkap kode error Postgres/MySQL yang sesungguhnya.',
      en: 'Deep-dive technical specification skill for engineering or customizing SQL Driver Adapters in Prisma 7. Driver adapters serve as the protocol boundary between Prisma query planning and external database drivers. Details the `SqlDriverAdapter` interface contract, parameterized query handling, transaction lifecycles (`startTransaction`, `commit`, `rollback`), optional savepoint hook extensions, datatype normalizations (DATE, NUMERIC, JSON, UUID), and the strict requirement to preserve original `DriverAdapterError` causes so application code receives authentic native database error codes.',
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
        'Memastikan error dari native driver dibungkus tanpa menghilangkan properti asli seperti `code` atau `message`.',
      ],
      en: [
        'Agent verifies implementation fidelity against `@prisma/driver-adapter-utils` contracts.',
        'Confirms transactional connections are released back to the pool across all failure paths (try/finally).',
        'Ensures native database errors are wrapped without stripping underlying properties like error codes or messages.',
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
        'Implementasikan savepoint opsional untuk mendukung nested transactions di Prisma Client.',
        'Perhatikan serialisasi BigInt dan Date: pastikan dipetakan sesuai ekspektasi query engine Prisma.',
      ],
      en: [
        'Implement optional savepoint hooks to support nested transactions in Prisma Client.',
        'Pay special attention to BigInt and Date serialization to match Prisma query engine expectations.',
      ],
    },
    pairsWellWith: ['prisma-upgrade-v7', 'workers-best-practices', 'supabase-postgres-best-practices'],
    spotlight: {
      title: {
        id: 'Protokol Preservasi Error Asli Database',
        en: 'Native Database Error Preservation Protocol',
      },
      body: {
        id: 'Driver adapter yang ditulis serampangan sering kali mengonversi error database menjadi objek JavaScript generik bertuliskan "Query failed". Ini merusak logika aplikasi yang bergantung pada kode error PostgreSQL spesifik (seperti 23505 untuk Unique Violation). Driver adapter wajib mengemas error native ke dalam `DriverAdapterError` dengan menyertakan referensi `cause` asli dan kode status utuh.',
        en: 'Carelessly written driver adapters often collapse specific database errors into generic "Query failed" strings. This breaks downstream application logic expecting native PostgreSQL codes (like 23505 for unique violations). Adapters must wrap native exceptions into `DriverAdapterError` while fully preserving the underlying `cause` object and status metadata.',
      },
    },
    sourcePath: 'prisma-driver-adapter-implementation/SKILL.md',
  },
  {
    name: 'prisma-database-setup',
    category: 'database-setup',
    invocation: 'model',
    description: {
      id: 'Panduan konfigurasi koneksi Prisma dengan berbagai provider database: PostgreSQL, MySQL, SQLite, SQL Server, dan CockroachDB.',
      en: 'Configuration guide for connecting Prisma with diverse database engines: PostgreSQL, MySQL, SQLite, SQL Server, and CockroachDB.',
    },
    detailedDescription: {
      id: 'Skill referensi konfigurasi multi-database untuk Prisma ORM. Membantu developer menyusun connection strings yang benar, mengonfigurasi pooler (PgBouncer, Supavisor, AWS RDS Proxy), mengatur opsi SSL/TLS (`sslmode=require`), dan menyesuaikan flag provider di `schema.prisma`. Memberikan panduan spesifik per vendor cloud (Supabase, Neon, PlanetScale, AWS Aurora, Azure SQL, local SQLite).',
      en: 'Multi-database configuration skill for Prisma ORM. Guides engineers through crafting robust connection strings, configuring connection poolers (PgBouncer, Supavisor, AWS RDS Proxy), configuring SSL/TLS requirements (`sslmode=require`), and configuring provider directives in `schema.prisma`. Delivers cloud-vendor recipes across Supabase, Neon, PlanetScale, AWS Aurora, Azure SQL, and local SQLite.',
    },
    useWhen: {
      id: [
        'Memulai proyek baru dan menghubungkan Prisma ke database lokal atau cloud.',
        'Beralih provider database (misal dari SQLite lokal ke PostgreSQL cloud).',
        'Mengonfigurasi parameter koneksi pooling dan SSL mode.',
      ],
      en: [
        'Initializing a new project and establishing connections to local or cloud databases.',
        'Migrating between database engines (e.g. from local SQLite to cloud PostgreSQL).',
        'Tuning connection pooling parameters and SSL connection modes.',
      ],
    },
    avoidWhen: {
      id: [
        'Proyek Prisma yang sudah terhubung stabil dan tidak mengubah infrastruktur database.',
      ],
      en: [
        'Stable Prisma projects with no pending database infrastructure changes.',
      ],
    },
    howItWorks: {
      id: [
        'Agent memverifikasi format URL koneksi database yang dideklarasikan di environment.',
        'Memisahkan URL pooling untuk aplikasi runtime dan Direct URL untuk migrasi skema.',
        'Mengonfigurasi schema.prisma dengan `provider` dan `directUrl` yang tepat.',
      ],
      en: [
        'Agent audits the connection URL syntax declared in environment variables.',
        'Segregates pooled application URLs from unpooled Direct URLs used for schema migrations.',
        'Configures `schema.prisma` with the correct `provider` and `directUrl` parameters.',
      ],
    },
    coreRules: {
      id: [
        'Saat menggunakan connection pooler (port 6543 / PgBouncer), selalu sertakan `directUrl` di schema untuk perintah migrasi.',
        'Jangan pernah commit connection string yang berisi password mentah ke repositori publik.',
        'Pastikan parameter `sslmode=require` aktif saat terhubung ke database cloud publik.',
      ],
      en: [
        'When using connection poolers (port 6543 / PgBouncer), always define `directUrl` in schema for migration commands.',
        'Never commit raw connection strings containing database credentials to source control.',
        'Ensure `sslmode=require` is present when connecting to public cloud databases.',
      ],
    },
    tips: {
      id: [
        'Gunakan `file:./dev.db` untuk SQLite saat membuat prototipe cepat di local development.',
        'Tambahkan parameter `connection_limit=10` pada URL koneksi untuk mencegah serverless functions membanjiri pool database.',
      ],
      en: [
        'Use `file:./dev.db` for SQLite during rapid local prototyping.',
        'Append `connection_limit=10` to connection strings to prevent serverless workers from exhausting database pools.',
      ],
    },
    pairsWellWith: ['prisma-cli', 'supabase-postgres-best-practices', 'prisma-postgres-setup'],
    spotlight: {
      title: {
        id: 'Pemisahan URL Pooling vs Direct URL untuk Migrasi',
        en: 'Pooled URL vs Direct URL Segregation for Migrations',
      },
      body: {
        id: 'Banyak database cloud serverless (seperti Supabase atau Neon) menyediakan endpoint pooling melalui PgBouncer (mode transaksi). Endpoint ini sangat cepat untuk kueri aplikasi biasa, tetapi menolak operasi DDL seperti `ALTER TABLE` atau `CREATE INDEX CONCURRENTLY`. Oleh karena itu, Prisma mewajibkan deklarasi `directUrl = env("DIRECT_URL")` di schema.prisma yang langsung menembus port database asli (5432) untuk eksekusi migrasi.',
        en: 'Serverless cloud databases (like Supabase or Neon) provide pooled endpoints via PgBouncer in transaction mode. While ideal for application queries, poolers reject DDL statements like `ALTER TABLE` or `CREATE INDEX CONCURRENTLY`. Prisma solves this by allowing a `directUrl = env("DIRECT_URL")` declaration in `schema.prisma` targeting port 5432 directly for migrations.',
      },
    },
    sourcePath: 'prisma-database-setup/SKILL.md',
  },
  {
    name: 'prisma-postgres',
    category: 'cloud-database',
    invocation: 'model',
    description: {
      id: 'Operasi dan panduan Prisma Postgres: Console, create-db CLI, Management API SDK, token service, dan integrasi caching bawaan.',
      en: 'Prisma Postgres guidance and operations: Console, create-db CLI, Management API SDK, service tokens, and built-in caching.',
    },
    detailedDescription: {
      id: 'Panduan pengelolaan database serverless Prisma Postgres resmi dari Prisma. Meliputi pembuatan database via Console interaktif atau CLI `create-db`, otomatisasi provisioning via Management API SDK (@prisma/management-sdk), manajemen environment staging vs production, pemanfaatan caching bawaan query engine, serta integrasi service token untuk CI/CD.',
      en: 'Official operational guide for Prisma Postgres, Prisma\'s managed serverless database. Covers database provisioning via interactive Console or `create-db` CLI, programmatic lifecycle automation through the Management API SDK (@prisma/management-sdk), staging vs production workspace management, leveraging built-in query caching, and service token workflows for CI/CD.',
    },
    useWhen: {
      id: [
        'Menyediakan atau mengelola instance database Prisma Postgres.',
        'Mengonfigurasi token service dan akses Management API terprogram.',
        'Mengaktifkan query caching bawaan pada Prisma Postgres.',
      ],
      en: [
        'Provisioning or maintaining Prisma Postgres database instances.',
        'Configuring service tokens and programmatic Management API access.',
        'Enabling built-in query caching on Prisma Postgres.',
      ],
    },
    avoidWhen: {
      id: [
        'Database PostgreSQL self-hosted atau vendor pihak ketiga (AWS RDS, Supabase, Neon).',
      ],
      en: [
        'Self-hosted PostgreSQL instances or non-Prisma managed cloud vendors (AWS RDS, Supabase, Neon).',
      ],
    },
    howItWorks: {
      id: [
        'Agent memandu alur pembuatan database menggunakan CLI atau Console.',
        'Mengekstrak connection string terkelola yang sudah mencakup connection pooler dan caching proxy.',
        'Menyusun variabel lingkungan `DATABASE_URL` pada file `.env` lokal proyek.',
      ],
      en: [
        'Agent assists database creation workflows via CLI or Console.',
        'Extracts managed connection strings with embedded connection pooling and caching proxies.',
        'Configures the project `.env` file with the verified `DATABASE_URL`.',
      ],
    },
    coreRules: {
      id: [
        'Simpan service token di vault rahasia; jangan pernah memasukkannya ke commit git.',
        'Gunakan region database yang paling dekat dengan lokasi deployment serverless compute aplikasi Anda.',
      ],
      en: [
        'Store service tokens securely in environment secrets; never commit them to git.',
        'Deploy the database in the cloud region closest to your serverless application compute.',
      ],
    },
    tips: {
      id: [
        'Manfaatkan fitur zero-cold-start Prisma Postgres untuk menghemat biaya lingkungan staging.',
      ],
      en: [
        'Leverage Prisma Postgres zero-cold-start capabilities to cut idle staging costs.',
      ],
    },
    pairsWellWith: ['prisma-postgres-setup', 'prisma-upgrade-v7', 'prisma-compute'],
    spotlight: {
      title: {
        id: 'Query Caching Bawaan di Edge Proxy',
        en: 'Edge Proxy Built-in Query Caching',
      },
      body: {
        id: 'Prisma Postgres menempatkan proxy pintar di depan database yang memungkinkan query caching transparan. Anda dapat mengontrol waktu simpan cache langsung di kueri Prisma Client dengan opsi `swr` (stale-while-revalidate), sehingga pembacaan data berulang tidak membebani komputasi PostgreSQL.',
        en: 'Prisma Postgres deploys intelligent proxies in front of database nodes, unlocking transparent query caching. Developers can control cache TTL directly from Prisma Client queries using `swr` (stale-while-revalidate) semantics, sparing Postgres compute on high-frequency read paths.',
      },
    },
    sourcePath: 'prisma-postgres/SKILL.md',
  },
  {
    name: 'prisma-postgres-setup',
    category: 'cloud-database',
    invocation: 'model',
    description: {
      id: 'Prosedur setup database Prisma Postgres baru dan menghubungkannya ke proyek lokal via Management API.',
      en: 'Procedural guide to provisioning a new Prisma Postgres database and connecting it to a local project via Management API.',
    },
    detailedDescription: {
      id: 'Skill prosedural langkah-demi-langkah untuk membuat database Prisma Postgres baru, mendapatkan token autentikasi, memilih region cloud (misal us-east-1, eu-central-1), menghasilkan skema awal, dan menghubungkan aplikasi lokal ke database cloud yang baru dibuat.',
      en: 'Step-by-step procedural skill for provisioning a fresh Prisma Postgres database, obtaining authentication credentials, selecting cloud regions (e.g. us-east-1, eu-central-1), generating initial schema definitions, and binding local applications to the newly created cloud database.',
    },
    useWhen: {
      id: [
        'Membuat database baru di Prisma Postgres dari terminal.',
        'Menghubungkan aplikasi web baru ke Prisma Postgres cloud.',
      ],
      en: [
        'Provisioning a fresh database on Prisma Postgres directly from the terminal.',
        'Binding a new web application to Prisma Postgres cloud.',
      ],
    },
    avoidWhen: {
      id: [
        'Proyek yang sudah memiliki database aktif dan hanya membutuhkan kueri data.',
      ],
      en: [
        'Projects with existing active databases that only require query authoring.',
      ],
    },
    howItWorks: {
      id: [
        'Memeriksa ketersediaan autentikasi Prisma di mesin lokal.',
        'Menjalankan perintah provisioning dan memilih nama proyek serta region.',
        'Menyimpan connection string ke file `.env` dan menjalankan `prisma db push` perdana.',
      ],
      en: [
        'Verifies active Prisma authentication tokens locally.',
        'Executes provisioning workflows selecting project name and region parameters.',
        'Writes the generated connection string into `.env` and executes initial `prisma db push`.',
      ],
    },
    coreRules: {
      id: [
        'Pastikan koneksi internet stabil saat proses provisioning berlangsung.',
        'Verifikasi konektivitas database dengan perintah `npx prisma db pull` atau `prisma db push`.',
      ],
      en: [
        'Ensure network stability throughout the provisioning lifecycle.',
        'Verify database connectivity immediately using `npx prisma db pull` or `prisma db push`.',
      ],
    },
    tips: {
      id: [
        'Pilih region yang sama persis dengan hosting Vercel atau Cloudflare untuk memangkas network latency.',
      ],
      en: [
        'Select the exact same region as your Vercel or Cloudflare hosting to minimize latency.',
      ],
    },
    pairsWellWith: ['prisma-postgres', 'prisma-database-setup', 'prisma-cli'],
    spotlight: {
      title: {
        id: 'Konektivitas Instan Tanpa Instalasi Software Database Lokal',
        en: 'Instant Cloud Connectivity Without Local Database Daemons',
      },
      body: {
        id: 'Prisma Postgres Setup menghilangkan kerepotan menginstal PostgreSQL daemon di komputer lokal atau konfigurasi Docker Compose rumit. Dalam satu perintah, database cloud serverless aktif dan siap pakai dengan connection string otomatis.',
        en: 'Prisma Postgres Setup eliminates the friction of maintaining local PostgreSQL daemons or Docker Compose setups. With a single command, a fully managed serverless cloud database is online with auto-configured connection strings.',
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
      id: 'Panduan lengkap untuk men-deploy aplikasi full-stack di platform Prisma Compute (`@prisma/cli app deploy`). Membahas konfigurasi `prisma.compute.ts`, binding host `0.0.0.0` (bukan localhost yang memblokir traffic luar), pemetaan port dinamis via `process.env.PORT`, autentikasi service token `PRISMA_SERVICE_TOKEN`, serta penyesuaian build artifact untuk Hono, Next.js, TanStack Start, Elysia, Nuxt, dan Astro.',
      en: 'Complete guide for deploying full-stack web applications to the Prisma Compute platform (`@prisma/cli app deploy`). Covers `prisma.compute.ts` configuration, mandatory `0.0.0.0` network host binding (localhost blocks ingress container traffic), dynamic port binding via `process.env.PORT`, `PRISMA_SERVICE_TOKEN` deployment auth, and build packaging recipes across Hono, Next.js, TanStack Start, Elysia, Nuxt, and Astro.',
    },
    useWhen: {
      id: [
        'Men-deploy aplikasi Node.js/TypeScript ke Prisma Compute.',
        'Mengonfigurasi `prisma.compute.ts` dan setting network container.',
        'Mengatasi masalah container yang crash karena port binding localhost.',
      ],
      en: [
        'Deploying Node.js/TypeScript applications to Prisma Compute.',
        'Configuring `prisma.compute.ts` and container networking directives.',
        'Troubleshooting container boot crashes caused by localhost port binding.',
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
        'Memastikan server mendengarkan host `0.0.0.0` dan port `process.env.PORT || 3000`.',
        'Membuat konfigurasi `prisma.compute.ts` dan mengeksekusi deployment.',
      ],
      en: [
        'Agent audits build and startup scripts in `package.json`.',
        'Verifies the application binds to host `0.0.0.0` and port `process.env.PORT || 3000`.',
        'Generates `prisma.compute.ts` configuration and executes the deployment CLI.',
      ],
    },
    coreRules: {
      id: [
        'Wajib bind ke `0.0.0.0`, bukan `localhost` atau `127.0.0.1`.',
        'Wajib baca port dari variabel lingkungan `process.env.PORT`.',
        'Sediakan build script yang menghasilkan output mandiri sebelum deployment dimulai.',
      ],
      en: [
        'Always bind to `0.0.0.0`, never to `localhost` or `127.0.0.1`.',
        'Always listen on `process.env.PORT` injected dynamically by the container runtime.',
        'Provide an autonomous production build script prior to triggering deployment.',
      ],
    },
    tips: {
      id: [
        'Gunakan perintah `prisma app logs` untuk streaming log container produksi secara realtime.',
      ],
      en: [
        'Use `prisma app logs` to stream real-time container production logs during troubleshooting.',
      ],
    },
    pairsWellWith: ['prisma-postgres', 'prisma-cli', 'hono-cloudflare-workers'],
    spotlight: {
      title: {
        id: 'Aturan Wajib Host Binding 0.0.0.0',
        en: 'Mandatory 0.0.0.0 Host Binding Rule',
      },
      body: {
        id: 'Jebakan paling sering dialami pada container deployment adalah membiarkan server default mendengarkan `localhost` (127.0.0.1). Di dalam container Prisma Compute, `127.0.0.1` hanya menerima koneksi internal loopback container itu sendiri, sehingga load balancer luar menganggap aplikasi offline dan menghasilkan HTTP 502. Mengubah host menjadi `0.0.0.0` wajib dilakukan.',
        en: 'The most frequent container deployment failure is letting servers listen on `localhost` (127.0.0.1). Inside Prisma Compute containers, `127.0.0.1` only accepts internal loopback traffic, causing ingress health checks to fail with 502 Bad Gateway. Explicitly binding to `0.0.0.0` is mandatory.',
      },
    },
    sourcePath: 'prisma-compute/SKILL.md',
  },
  {
    name: 'prisma-mongodb-upgrade',
    category: 'migrations-upgrade',
    invocation: 'model',
    description: {
      id: 'Panduan keputusan strategis proyek Prisma MongoDB di v6: pemahaman bahwa v6 adalah rilis terminal untuk MongoDB dan navigasi migrasi ke Prisma Next.',
      en: 'Strategic decision guide for Prisma MongoDB projects on v6: understanding v6 as the terminal MongoDB release and navigating migration to Prisma Next.',
    },
    detailedDescription: {
      id: 'Skill keputusan krusial bagi developer yang menggunakan MongoDB dengan Prisma ORM. Menegaskan fakta teknis penting: Prisma ORM v6 adalah rilis terminal terakhir yang mendukung konektor MongoDB. Prisma ORM v7 tidak pernah merilis konektor MongoDB. Proyek MongoDB dihadapkan pada dua pilihan resmi: 1) Tetap berada di Prisma v6 yang didukung pembaruan keamanan jangka panjang, atau 2) Mengevaluasi migrasi ke Prisma Next (generasi penerus Prisma engine modern) yang membuka dukungan MongoDB di fase Early Access.',
      en: 'Crucial strategic decision guide for teams operating MongoDB with Prisma ORM. Explicitly details the core architectural reality: Prisma ORM v6 is the terminal release series supporting the MongoDB connector. Prisma ORM v7 will NEVER ship a MongoDB connector. MongoDB projects face two official pathways: 1) Pin to Prisma v6 with long-term security maintenance, or 2) Transition toward Prisma Next (the next-generation Prisma engine) which introduces MongoDB support under Early Access.',
    },
    useWhen: {
      id: [
        'Proyek dengan `provider = "mongodb"` menanyakan kemungkinan upgrade ke Prisma 7.',
        'Mengevaluasi arsitektur database masa depan untuk proyek Prisma berbasis MongoDB.',
      ],
      en: [
        'Projects with `provider = "mongodb"` inquiring about upgrading to Prisma 7.',
        'Evaluating database architecture roadmaps for existing MongoDB-backed Prisma systems.',
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
        'Agent mendeteksi deklarasi `provider = "mongodb"` di dalam file schema.prisma.',
        'Segera memperingatkan pengguna bahwa upgrade ke Prisma 7 tidak didukung untuk MongoDB.',
        'Menyajikan opsi bertahan di v6 dengan dependensi terisolasi atau migrasi ke Prisma Next.',
      ],
      en: [
        'Agent detects `provider = "mongodb"` declarations inside schema.prisma.',
        'Immediately flags that upgrading to Prisma 7 is not supported for MongoDB.',
        'Outlines strategic options: pinning on stable v6 or exploring Prisma Next.',
      ],
    },
    coreRules: {
      id: [
        'Jangan pernah mencoba menjalankan `npm install @prisma/client@7` pada proyek MongoDB.',
        'Kunci versi dependensi di `^6.x` pada `package.json` untuk proyek MongoDB.',
      ],
      en: [
        'Never attempt executing `npm install @prisma/client@7` on MongoDB projects.',
        'Pin dependencies to `^6.x` in `package.json` for all MongoDB applications.',
      ],
    },
    tips: {
      id: [
        'Jika membutuhkan fitur modern Prisma 7, pertimbangkan migrasi data dari MongoDB ke PostgreSQL (Supabase/Prisma Postgres).',
      ],
      en: [
        'If Prisma 7 features are critical, consider migrating data from MongoDB to PostgreSQL.',
      ],
    },
    pairsWellWith: ['prisma-upgrade-v7', 'prisma-client-api', 'prisma-database-setup'],
    spotlight: {
      title: {
        id: 'Fakta Kritis: Prisma v6 Adalah Rilis Terminal untuk MongoDB',
        en: 'Critical Fact: Prisma v6 is the Terminal Release for MongoDB',
      },
      body: {
        id: 'Prisma 7 berfokus 100% pada arsitektur relational SQL berbasis driver adapters. Konektor MongoDB resmi dihentikan di Prisma 6 dan tidak memiliki upgrade path langsung ke Prisma 7. Jangan buang waktu mencoba membongkar error adapter MongoDB di Prisma 7; keputusan resminya adalah bertahan di v6 atau bertransisi ke Prisma Next.',
        en: 'Prisma 7 focuses 100% on relational SQL architectures powered by driver adapters. The official MongoDB connector ended its lifecycle in Prisma 6 and has no direct upgrade path to Prisma 7. Do not spend time troubleshooting MongoDB adapter failures on Prisma 7; the official recommendation is to pin to v6 or migrate to Prisma Next.',
      },
    },
    sourcePath: 'prisma-mongodb-upgrade/SKILL.md',
  },
]
