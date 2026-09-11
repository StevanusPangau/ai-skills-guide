import type { BilingualString, BilingualList } from '@/types/skill'

export const SUPABASE_SOURCE_REPO = 'github.com/supabase/agent-skills'
export const SUPABASE_SOURCE_SHA = '82df90a5de1cd84386d8bc192746e50343b86dc0'
export const SOURCE_REPO = SUPABASE_SOURCE_REPO
export const SOURCE_SHA = SUPABASE_SOURCE_SHA

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

export const supabaseSkills: RichSkill[] = [
  {
    name: 'supabase-postgres-best-practices',
    category: 'database-performance',
    invocation: 'model',
    description: {
      id: 'Panduan optimasi performa dan keamanan PostgreSQL resmi dari Supabase: 8 kategori aturan berperingkat dampak dari indeks, connection pooling, RLS, hingga concurrency.',
      en: 'Official PostgreSQL performance and security optimization guide from Supabase: 8 impact-ranked rule categories from indexes, connection pooling, RLS, to concurrency.',
    },
    detailedDescription: {
      id: 'Skill resmi Supabase yang berlaku untuk database Postgres di mana saja. Mengorganisir aturan ke dalam 8 kategori dampak: Query Performance (CRITICAL: index pada WHERE/JOIN, composite & partial index, index-only scan via INCLUDE), Connection Management (CRITICAL: connection pooling via PgBouncer/Supavisor, hitung max_connections berdasarkan RAM, idle timeout), Security & RLS (CRITICAL: wrapping auth.uid() dalam SELECT agar dievaluasi 1x bukan per baris, least privilege), Schema Design (HIGH: IDENTITY over serial, hindari random UUIDv4 untuk PK guna mencegah fragmentasi indeks, index pada foreign key), Concurrency (MEDIUM-HIGH: SKIP LOCKED untuk queue pekerja, lock ordering konsisten untuk cegah deadlock), Data Operations (batch insert, hindari N+1, cursor pagination O(1) over OFFSET), dan Monitoring (EXPLAIN ANALYZE, pg_stat_statements).',
      en: 'Official Supabase skill applicable to Postgres databases anywhere. Organizes rules across 8 impact tiers: Query Performance (CRITICAL: indexes on WHERE/JOIN, composite & partial indexes, index-only scans via INCLUDE), Connection Management (CRITICAL: connection pooling via PgBouncer/Supavisor, resource-based max_connections, idle timeouts), Security & RLS (CRITICAL: wrapping auth.uid() in SELECT for single-evaluation caching, least privilege), Schema Design (HIGH: IDENTITY over serial, avoiding random UUIDv4 PKs to prevent B-tree fragmentation, foreign key indexing), Concurrency (MEDIUM-HIGH: SKIP LOCKED for worker queues, consistent lock ordering to eliminate deadlocks), Data Operations (batch inserts, eliminating N+1 round-trips, cursor pagination O(1) over OFFSET), and Monitoring (EXPLAIN ANALYZE, pg_stat_statements).',
    },
    useWhen: {
      id: [
        'Menulis kueri SQL, membuat skema baru, atau menambahkan tabel/kolom.',
        'Mengimplementasikan dan mengoptimasi kebijakan Row-Level Security (RLS).',
        'Mendiagnosis kueri lambat, CPU tinggi, lock contention, atau connection exhaustion.',
        'Mendesain antrean worker paralel atau migrasi skema tabel besar.',
      ],
      en: [
        'Writing SQL queries, creating schemas, or adding tables and columns.',
        'Implementing and optimizing Row-Level Security (RLS) policies.',
        'Diagnosing slow queries, high CPU spikes, lock contention, or connection exhaustion.',
        'Designing parallel worker queues or running large-table schema migrations.',
      ],
    },
    avoidWhen: {
      id: [
        'Tugas murni frontend tanpa sentuhan SQL atau database relasional.',
        'Database NoSQL atau document store tanpa paradigma relasional.',
      ],
      en: [
        'Pure frontend tasks with zero SQL or relational database touchpoints.',
        'Non-relational document or key-value stores without relational semantics.',
      ],
    },
    howItWorks: {
      id: [
        'Agent memindai kueri atau skema terhadap 8 kategori aturan yang diprioritaskan dampak kinerjanya.',
        'Pada kueri berulang atau multi-tenant, agent memastikan fungsi autentikasi dibungkus subquery: `(select auth.uid()) = user_id` agar dievaluasi satu kali untuk seluruh scan.',
        'Mendeteksi pagination OFFSET bernilai besar dan mengubahnya menjadi keyset/cursor pagination O(1).',
        'Memverifikasi foreign key terindeks agar relasi JOIN dan ON DELETE CASCADE tidak memicu full table scan.',
      ],
      en: [
        'Agent evaluates the target SQL or schema against the 8 impact-ranked rule categories.',
        'For multi-tenant queries, agent wraps auth helper calls into subqueries: `(select auth.uid()) = user_id` so Postgres caches the result once per statement.',
        'Detects deep OFFSET pagination and rewrites it into O(1) keyset/cursor pagination.',
        'Verifies all foreign key columns are indexed so JOINs and ON DELETE CASCADE avoid full table sequential scans.',
      ],
    },
    coreRules: {
      id: [
        'Wajib bungkus fungsi RLS dalam subquery: `(select auth.uid()) = user_id` untuk mencegah pemanggilan berulang per baris.',
        'Selalu buat index pada foreign key; Postgres tidak membuatkannya secara otomatis.',
        'Gunakan keyset/cursor pagination (`where id > $last_id`) alih-alih `OFFSET` untuk tabel besar.',
        'Gunakan `SKIP LOCKED` saat worker membaca queue agar tidak saling memblokir kunci transaksi.',
      ],
      en: [
        'Wrap RLS functions in a subquery: `(select auth.uid()) = user_id` to prevent row-by-row function invocation.',
        'Always index foreign key columns; PostgreSQL does not create them automatically.',
        'Use keyset/cursor pagination (`where id > $last_id`) instead of `OFFSET` for high-depth pagination.',
        'Use `SKIP LOCKED` when workers select queue rows to eliminate lock blocking.',
      ],
    },
    tips: {
      id: [
        'Gunakan composite index dengan urutan kolom kesetaraan (=) terlebih dahulu, baru kolom rentang (<, >).',
        'Gunakan partial index (`WHERE deleted_at IS NULL`) untuk memangkas ukuran index hingga 90% pada soft-deleted tables.',
      ],
      en: [
        'Order composite index columns with equality (=) columns first, followed by range (<, >) columns.',
        'Use partial indexes (`WHERE deleted_at IS NULL`) to cut index footprint by up to 90% on soft-deleted tables.',
      ],
    },
    pairsWellWith: ['supabase', 'prisma-postgres', 'workers-best-practices'],
    spotlight: {
      title: {
        id: 'Optimasi Kritis RLS: Evaluasi Tunggal vs Per-Baris',
        en: 'Critical RLS Optimization: Single Evaluation vs Row-By-Row',
      },
      body: {
        id: 'Jebakan performa nomor 1 pada Supabase RLS adalah menulis `using (auth.uid() = user_id)`. Pada tabel 1 juta baris, fungsi `auth.uid()` dipanggil 1 juta kali. Dengan membungkusnya menjadi `using ((select auth.uid()) = user_id)`, Postgres mengevaluasi subquery tersebut sekali saja untuk seluruh rencana kueri dan mencache hasilnya, menghasilkan lonjakan kecepatan hingga 10x lipat.',
        en: 'The #1 performance trap in Supabase RLS is writing `using (auth.uid() = user_id)`. On a 1-million-row table, `auth.uid()` executes 1 million times. By wrapping it as `using ((select auth.uid()) = user_id)`, Postgres evaluates the subquery exactly once for the whole query plan and caches the result, delivering up to 10x query acceleration.',
      },
    },
    sourcePath: 'skills/supabase-postgres-best-practices/SKILL.md',
  },
  {
    name: 'supabase',
    category: 'platform-operations',
    invocation: 'model',
    description: {
      id: 'Operasi lengkap platform Supabase: Auth SSR cookies, integrasi client libraries, eksposur Data API, migrasi deklaratif, dan audit keamanan.',
      en: 'Complete Supabase platform operations: Auth SSR cookies, client library integrations, Data API exposure, declarative migrations, and security audits.',
    },
    detailedDescription: {
      id: 'Skill komprehensif untuk seluruh tugas yang bersentuhan dengan ekosistem Supabase: Database, Auth, Edge Functions, Realtime, Storage, dan Vector. Menetapkan 4 prinsip inti: 1) Cek changelog.md sebelum implementasi karena API dan sintaks config.toml berkembang pesat; 2) Verifikasi setiap perubahan skema dengan kueri uji nyata; 3) Berhenti dan ubah pendekatan jika gagal setelah 2-3 percobaan alih-alih mengulang command secara buta; 4) Sadari setting Data API: tabel baru mungkin memerlukan grant eksplisit ke role anon dan authenticated agar terbaca di REST API. Mencakup arsitektur Auth SSR (@supabase/ssr) berbasis cookies untuk Next.js App Router, proteksi Broken Object Level Authorization (BOLA), serta audit fungsi SECURITY DEFINER.',
      en: 'Comprehensive skill for any task involving the Supabase ecosystem: Database, Auth, Edge Functions, Realtime, Storage, and Vector. Enforces 4 core tenets: 1) Inspect changelog.md before coding because API signatures and config.toml evolve rapidly; 2) Verify every schema change with an actual test query; 3) Stop and pivot after 2-3 failed attempts rather than blindly looping; 4) Beware Data API table exposure settings: newly created tables may require explicit GRANTs to anon and authenticated roles to appear in the REST API. Covers Auth SSR (@supabase/ssr) cookie architecture for Next.js App Router, Broken Object Level Authorization (BOLA) mitigations, and SECURITY DEFINER audits.',
    },
    useWhen: {
      id: [
        'Menyiapkan autentikasi Supabase dengan cookie SSR di Next.js App Router, SvelteKit, atau Remix.',
        'Mengonfigurasi Edge Functions, Storage buckets, Realtime channels, atau pgvector.',
        'Mendiagnosis error Supabase: 401/403 permission denied, JWT expiry, RLS unexpected empty result, atau timeout.',
        'Mengelola migrasi database via Supabase CLI (`supabase migration new`) atau declarative schemas.',
      ],
      en: [
        'Setting up Supabase auth with SSR cookies in Next.js App Router, SvelteKit, or Remix.',
        'Configuring Edge Functions, Storage buckets, Realtime channels, or pgvector.',
        'Diagnosing Supabase errors: 401/403 permission denied, JWT expiry, RLS unexpected empty result, or timeouts.',
        'Managing database migrations via Supabase CLI (`supabase migration new`) or declarative schemas.',
      ],
    },
    avoidWhen: {
      id: [
        'Proyek backend yang tidak menggunakan infrastruktur atau layanan Supabase sama sekali.',
        'Tugas SQL murni tanpa dependensi auth, client library, atau platform Supabase (gunakan supabase-postgres-best-practices).',
      ],
      en: [
        'Backend projects that do not use any Supabase services or infrastructure.',
        'Pure SQL schema tasks without auth, client libraries, or Supabase platform touchpoints (use supabase-postgres-best-practices).',
      ],
    },
    howItWorks: {
      id: [
        'Agent memeriksa versi Supabase dan changelog untuk mencegah penggunaan API usang.',
        'Menyiapkan client `@supabase/ssr` dengan helper cookie `getAll()` dan `setAll()` yang benar untuk server components dan route handlers.',
        'Memastikan fungsi `SECURITY DEFINER` selalu mengeset `SET search_path = public` untuk mencegah eksploitasi search_path injection.',
        'Memverifikasi grant schema `GRANT USAGE ON SCHEMA public TO anon, authenticated` dan hak akses tabel setelah pembuatan DDL.',
      ],
      en: [
        'Agent checks Supabase version and changelog to avoid deprecated API signatures.',
        'Wires `@supabase/ssr` clients with proper `getAll()` and `setAll()` cookie helpers across server components and route handlers.',
        'Guarantees `SECURITY DEFINER` functions always declare `SET search_path = public` to prevent search_path escalation vulnerabilities.',
        'Verifies schema grants (`GRANT USAGE ON SCHEMA public TO anon, authenticated`) and table permissions following DDL execution.',
      ],
    },
    coreRules: {
      id: [
        'Gunakan `@supabase/ssr` (bukan auth-helpers lama yang deprecated) untuk aplikasi Next.js App Router.',
        'Selalu sertakan `SET search_path = public` pada setiap fungsi `SECURITY DEFINER`.',
        'Jangan pernah gunakan `auth.role()` yang sudah usang; gunakan klaim JWT dari token terverifikasi.',
        'Verifikasi bahwa tabel baru sudah di-grant ke role `anon` atau `authenticated` jika diekspos ke Data REST API.',
      ],
      en: [
        'Use `@supabase/ssr` (not legacy deprecated auth-helpers) for Next.js App Router applications.',
        'Always append `SET search_path = public` to every `SECURITY DEFINER` database function.',
        'Never use deprecated `auth.role()`; inspect verified JWT claims from token payloads.',
        'Confirm new tables receive explicit `GRANT` permissions to `anon` or `authenticated` if accessed via Data REST API.',
      ],
    },
    tips: {
      id: [
        'Gunakan Supabase CLI lokal (`supabase start`) untuk menguji RLS dan migrasi sebelum push ke branch remote.',
        'Query Logs Explorer dengan SQL terstruktur untuk membedakan HTTP error gateway dari Postgres query timeout.',
      ],
      en: [
        'Use local Supabase CLI (`supabase start`) to test RLS policies and migrations before pushing upstream.',
        'Query Logs Explorer with structured SQL to distinguish edge gateway 502s from internal Postgres statement timeouts.',
      ],
    },
    pairsWellWith: ['supabase-postgres-best-practices', 'deploy-to-vercel', 'workers-best-practices'],
    spotlight: {
      title: {
        id: 'Keamanan SECURITY DEFINER & Search Path Invariant',
        en: 'SECURITY DEFINER Safety & Search Path Invariant',
      },
      body: {
        id: 'Fungsi PostgreSQL bertanda `SECURITY DEFINER` dieksekusi dengan hak istimewa pembuatnya (biasanya postgres/admin). Jika Anda tidak mendefinisikan `SET search_path = public`, penyerang dapat membuat tabel atau fungsi tipuan di skema sementara untuk membajak hak akses admin. Selalu kunci search_path secara eksplisit pada setiap fungsi database Supabase.',
        en: 'PostgreSQL functions declared as `SECURITY DEFINER` run with the privileges of the creating user (typically postgres/admin). Without an explicit `SET search_path = public`, an attacker can create decoy objects in a temporary schema to hijack administrative permissions. Always lock search_path explicitly on every Supabase database function.',
      },
    },
    sourcePath: 'skills/supabase/SKILL.md',
  },
]
