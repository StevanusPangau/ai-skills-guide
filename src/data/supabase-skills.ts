import type { BilingualString, BilingualList } from '@/types/skill'

// Verified 2026-10-04 against supabase/agent-skills @ c9be0e9 (release 0.1.9):
// skills/supabase (metadata.version 0.1.2) + skills/supabase-postgres-best-practices (1.1.1).
// Upstream has exactly these 2 skills.

export const SUPABASE_SOURCE_REPO = 'github.com/supabase/agent-skills'
export const SUPABASE_SOURCE_SHA = 'c9be0e931b7930f7d02126d04774d904c381e7d7'
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
      id: 'Skill resmi Supabase yang berlaku untuk database Postgres di mana saja, dan bukan hanya panduan performa: skema, migrasi, RLS, dan penulisan SQL juga memakai aturan ini. Aturan dikelompokkan ke 8 kategori berperingkat dampak (references/_sections.md): Query Performance (CRITICAL: index pada WHERE/JOIN, composite & partial index, index-only scan via INCLUDE), Connection Management (CRITICAL: connection pooling dengan pooler seperti PgBouncer, hitung max_connections berdasarkan RAM, idle timeout), Security & RLS (CRITICAL: bungkus auth.uid() dalam SELECT agar dievaluasi sekali, least privilege), Schema Design (HIGH: IDENTITY over serial, hindari random UUIDv4 untuk PK guna mencegah fragmentasi indeks, index pada foreign key), Concurrency & Locking (MEDIUM-HIGH: SKIP LOCKED untuk queue pekerja, lock ordering konsisten untuk cegah deadlock), Data Access Patterns (MEDIUM: batch insert, hindari N+1, cursor pagination over OFFSET), Monitoring & Diagnostics (LOW-MEDIUM: EXPLAIN ANALYZE, pg_stat_statements), dan Advanced Features (LOW: full-text search, JSONB indexing).',
      en: 'Official Supabase skill for Postgres running anywhere, and not only a performance guide: schema, migration, RLS and SQL-authoring tasks use these rules too. Rules are grouped into 8 impact-ranked categories (references/_sections.md): Query Performance (CRITICAL: indexes on WHERE/JOIN, composite & partial indexes, index-only scans via INCLUDE), Connection Management (CRITICAL: connection pooling with a pooler such as PgBouncer, RAM-based max_connections, idle timeouts), Security & RLS (CRITICAL: wrapping auth.uid() in SELECT so it evaluates once, least privilege), Schema Design (HIGH: IDENTITY over serial, avoiding random UUIDv4 PKs to prevent index fragmentation, foreign key indexing), Concurrency & Locking (MEDIUM-HIGH: SKIP LOCKED for worker queues, consistent lock ordering to prevent deadlocks), Data Access Patterns (MEDIUM: batch inserts, eliminating N+1, cursor pagination over OFFSET), Monitoring & Diagnostics (LOW-MEDIUM: EXPLAIN ANALYZE, pg_stat_statements), and Advanced Features (LOW: full-text search, JSONB indexing).',
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
        'Gunakan partial index (`WHERE deleted_at IS NULL`) untuk memperkecil index (upstream: 5-20x lebih kecil) pada soft-deleted tables.',
      ],
      en: [
        'Order composite index columns with equality (=) columns first, followed by range (<, >) columns.',
        'Use partial indexes (`WHERE deleted_at IS NULL`) to shrink the index (upstream: 5-20x smaller) on soft-deleted tables.',
      ],
    },
    pairsWellWith: ['supabase'],
    spotlight: {
      title: {
        id: 'Optimasi Kritis RLS: Evaluasi Tunggal vs Per-Baris',
        en: 'Critical RLS Optimization: Single Evaluation vs Row-By-Row',
      },
      body: {
        id: 'Jebakan performa nomor 1 pada Supabase RLS adalah menulis `using (auth.uid() = user_id)`. Pada tabel 1 juta baris, fungsi `auth.uid()` dipanggil 1 juta kali. Dengan membungkusnya menjadi `using ((select auth.uid()) = user_id)`, Postgres mengevaluasi subquery tersebut sekali saja untuk seluruh rencana kueri dan mencache hasilnya, yang menurut aturan upstream bisa jauh lebih cepat pada tabel besar (upstream menyebut 5-10x, dan 100x+ pada contoh tabel besar; hasil nyata bergantung beban kerja).',
        en: 'The #1 performance trap in Supabase RLS is writing `using (auth.uid() = user_id)`. On a 1-million-row table, `auth.uid()` executes 1 million times. By wrapping it as `using ((select auth.uid()) = user_id)`, Postgres evaluates the subquery exactly once for the whole query plan and caches the result, which upstream rates as 5-10x faster (100x+ in its large-table example); real gains depend on the workload.',
      },
    },
    sourcePath: 'skills/supabase-postgres-best-practices/SKILL.md',
  },
  {
    name: 'supabase',
    category: 'platform-operations',
    invocation: 'model',
    description: {
      id: 'Skill resmi untuk setiap tugas Supabase: wajib cek changelog dan docs terbaru, jalankan Security Checklist (RLS, JWT, views, SECURITY DEFINER, storage), pakai CLI/MCP dengan alur migrasi yang benar, dan debug lewat dokumentasi Monitoring and Debugging.',
      en: 'Official skill for any Supabase task: verify against the latest changelog and docs, run the Security Checklist (RLS, JWT, views, SECURITY DEFINER, storage), use the CLI/MCP with the right migration workflow, and debug via the Monitoring and Debugging docs.',
    },
    detailedDescription: {
      id: 'Skill ini adalah pointer skill: isinya bukan tutorial per produk, melainkan aturan kerja agar agent tidak mengandalkan memori usang. Ada 6 Core Principles: 1) Supabase sering berubah, jadi ambil `https://supabase.com/changelog.md` dan cek tag `breaking-change` sebelum implementasi; 2) Verifikasi hasil dengan kueri uji; 3) Jangan mengulang buta: setelah 2-3 percobaan gagal, ganti pendekatan dan cek log; 4) Eksposur tabel ke Data API: tergantung pengaturan Data API, tabel baru mungkin perlu GRANT eksplisit ke `anon`/`authenticated`, dan RLS tetap wajib diaktifkan; 5) Aktifkan RLS di setiap tabel pada skema yang diekspos (termasuk `public`), lalu buat policy sesuai model akses; 6) Security checklist: jangan pakai `user_metadata` untuk otorisasi, menghapus user tidak mencabut access token, view mem-bypass RLS (pakai `security_invoker = true`), UPDATE butuh SELECT policy plus `WITH CHECK`, `auth.role()` deprecated (pakai klausa `TO`), `SECURITY DEFINER` mem-bypass RLS (utamakan `SECURITY INVOKER`), storage upsert butuh INSERT+SELECT+UPDATE, `service_role` tidak boleh ada di client publik, dan pin versi paket + commit lockfile. Selain itu ada panduan CLI (temukan perintah lewat `--help`), MCP server, akses dokumentasi (MCP `search_docs`, atau tambahkan `.md` ke URL docs), alur perubahan skema (declarative vs imperative), dan kewajiban membaca dokumentasi Monitoring and Debugging saat terjadi error.',
      en: 'This is a pointer skill: it is not a per-product tutorial but a set of working rules so the agent stops relying on stale memory. It defines 6 Core Principles: 1) Supabase changes often, so fetch `https://supabase.com/changelog.md` and scan `breaking-change` tags before implementing; 2) Verify your work with a test query; 3) Do not loop: after 2-3 failed attempts change approach and check logs; 4) Exposing tables to the Data API: depending on Data API settings, new tables may need explicit GRANTs to `anon`/`authenticated`, and RLS must still be enabled; 5) Enable RLS on every table in an exposed schema (including `public`), then write policies that match the access model; 6) Security checklist: never use `user_metadata` for authorization, deleting a user does not revoke access tokens, views bypass RLS (use `security_invoker = true`), UPDATE needs a SELECT policy plus `WITH CHECK`, `auth.role()` is deprecated (use the `TO` clause), `SECURITY DEFINER` bypasses RLS (prefer `SECURITY INVOKER`), storage upsert needs INSERT+SELECT+UPDATE, never expose `service_role` in public clients, and pin package versions + commit lockfiles. It also covers the CLI (discover commands via `--help`), the MCP server, documentation access (MCP `search_docs`, or append `.md` to docs URLs), the schema-change workflow (declarative vs imperative), and the requirement to read the Monitoring and Debugging docs when an error occurs.',
    },
    useWhen: {
      id: [
        'Mengerjakan tugas apa pun yang menyentuh produk Supabase: Database, Auth, Edge Functions, Realtime, Storage, Vectors, Cron, Queues.',
        'Bekerja dengan supabase-js atau @supabase/ssr di Next.js, React, SvelteKit, Astro, atau Remix, termasuk masalah login, sesi, JWT, cookie, getUser/getClaims.',
        'Mengaudit keamanan: RLS, view, fungsi SECURITY DEFINER, storage policy, atau penggunaan service_role.',
        'Mendiagnosis error Supabase (HTTP/Postgres error, RLS menghasilkan hasil kosong, permission denied, schema cache, timeout) dan membaca log.',
        'Mengubah skema atau migrasi lewat Supabase CLI/MCP, termasuk declarative schemas.',
      ],
      en: [
        'Working on any task touching Supabase products: Database, Auth, Edge Functions, Realtime, Storage, Vectors, Cron, Queues.',
        'Using supabase-js or @supabase/ssr in Next.js, React, SvelteKit, Astro, or Remix, including login, session, JWT, cookie and getUser/getClaims issues.',
        'Running security audits: RLS, views, SECURITY DEFINER functions, storage policies, or service_role usage.',
        'Diagnosing Supabase errors (HTTP/Postgres errors, RLS returning empty results, permission denied, schema cache, timeouts) and reading logs.',
        'Changing schema or migrations through the Supabase CLI/MCP, including declarative schemas.',
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
        'Agent mengambil `supabase.com/changelog.md`, memindai tag `breaking-change`, lalu mencari topik terkait lewat MCP `search_docs` atau halaman docs berformat `.md`.',
        'Untuk perubahan skema, agent memilih alur: declarative (jika ada `supabase/schemas/` atau `schema_paths` di config.toml) atau imperative.',
        'Pada alur imperative, agent beriterasi dengan `execute_sql` (MCP) atau `supabase db query` (CLI v2.79.0+), tidak memakai `apply_migration` pada database lokal, lalu menjalankan advisors dan membuat migrasi dengan `supabase db pull <nama> --local --yes`.',
        'Sebelum selesai agent menjalankan Security Checklist dan `supabase db advisors` (CLI v2.81.3+, atau MCP `get_advisors`), lalu memverifikasi dengan `supabase migration list --local`.',
        'Saat ada error, agent wajib membaca dokumentasi Monitoring and Debugging sebelum mendiagnosis.',
      ],
      en: [
        'Agent fetches `supabase.com/changelog.md`, scans `breaking-change` tags, then looks up the topic through MCP `search_docs` or `.md` docs pages.',
        'For schema changes, agent picks a workflow: declarative (when `supabase/schemas/` exists or `schema_paths` is set in config.toml) or imperative.',
        'On the imperative path, agent iterates with `execute_sql` (MCP) or `supabase db query` (CLI v2.79.0+), avoids `apply_migration` on a local database, then runs advisors and generates the migration with `supabase db pull <name> --local --yes`.',
        'Before finishing, agent runs the Security Checklist and `supabase db advisors` (CLI v2.81.3+, or MCP `get_advisors`), then verifies with `supabase migration list --local`.',
        'When an error occurs, agent must read the Monitoring and Debugging docs before diagnosing.',
      ],
    },
    coreRules: {
      id: [
        'Jangan pernah memakai klaim `user_metadata` untuk keputusan otorisasi; simpan data otorisasi di `app_metadata`.',
        'Aktifkan RLS di setiap tabel pada skema yang diekspos; saat memberi akses `anon`/`authenticated`, RLS wajib menyala.',
        '`auth.role()` sudah deprecated: gunakan klausa `TO authenticated` / `TO anon` pada policy, dikombinasikan dengan predikat kepemilikan seperti `(select auth.uid()) = user_id`. Pengguna anonymous sign-in membawa role `authenticated`.',
        'Utamakan `SECURITY INVOKER`. Jangan menambah `SECURITY DEFINER` hanya untuk mengatasi error permission: fungsi itu mem-bypass RLS dan di skema `public` bisa dipanggil semua role. Jika benar-benar perlu, taruh di skema yang tidak diekspos, sertakan cek `auth.uid()` di dalam fungsi, dan jalankan `supabase db advisors`.',
        'View mem-bypass RLS secara default: pakai `WITH (security_invoker = true)` (Postgres 15+). Policy UPDATE butuh SELECT policy serta `USING` dan `WITH CHECK`; storage upsert butuh INSERT + SELECT + UPDATE.',
        'Jangan ekspos `service_role`/secret key di client publik (variabel `NEXT_PUBLIC_` dikirim ke browser); gunakan scoped personal access token untuk CLI, CI, dan MCP; pin versi paket dan commit lockfile.',
      ],
      en: [
        'Never use `user_metadata` claims for authorization decisions; keep authorization data in `app_metadata`.',
        'Enable RLS on every table in an exposed schema; whenever you grant `anon`/`authenticated` access, RLS must be on.',
        '`auth.role()` is deprecated: use the policy `TO authenticated` / `TO anon` clause combined with an ownership predicate such as `(select auth.uid()) = user_id`. Anonymous sign-in users carry the `authenticated` role.',
        'Prefer `SECURITY INVOKER`. Never add `SECURITY DEFINER` just to fix a permission error: it bypasses RLS and in `public` it is callable by every role. If truly needed, keep it in a non-exposed schema, include an `auth.uid()` check in the body, and run `supabase db advisors`.',
        'Views bypass RLS by default: use `WITH (security_invoker = true)` (Postgres 15+). UPDATE needs a SELECT policy plus both `USING` and `WITH CHECK`; storage upsert needs INSERT + SELECT + UPDATE.',
        'Never expose `service_role`/secret keys in public clients (`NEXT_PUBLIC_` vars are sent to the browser); use scoped personal access tokens for the CLI, CI and MCP; pin package versions and commit lockfiles.',
      ],
    },
    tips: {
      id: [
        'Selalu temukan perintah CLI lewat `supabase --help` / `supabase <group> --help`, jangan menebak; struktur CLI berubah antar versi.',
        'Di CI, set `SUPABASE_ACCESS_TOKEN` ke scoped personal access token; login lewat browser membuat token klasik dengan akses penuh ke akun.',
        'Jika koneksi MCP bermasalah: cek `https://mcp.supabase.com/mcp` (401 berarti server hidup), cek `.mcp.json`, lalu autentikasi OAuth 2.1 di agent.',
      ],
      en: [
        'Always discover CLI commands via `supabase --help` / `supabase <group> --help`, never guess; the CLI structure changes between versions.',
        'In CI, set `SUPABASE_ACCESS_TOKEN` to a scoped personal access token; the browser login creates a classic token with full account access.',
        'If the MCP connection fails: check `https://mcp.supabase.com/mcp` (a 401 means the server is up), check `.mcp.json`, then complete the OAuth 2.1 flow in your agent.',
      ],
    },
    pairsWellWith: ['supabase-postgres-best-practices'],
    spotlight: {
      title: {
        id: 'SECURITY DEFINER Mem-bypass RLS',
        en: 'SECURITY DEFINER Bypasses RLS',
      },
      body: {
        id: 'Fungsi `SECURITY DEFINER` berjalan dengan hak pembuatnya, biasanya role dengan `bypassrls` seperti `postgres`, sehingga kontrol akses hilang tanpa memperbaiki akar masalah. Postgres juga memberi `EXECUTE` ke `PUBLIC` secara default, jadi fungsi seperti itu di skema `public` menjadi endpoint yang bisa dipanggil `anon` dan `authenticated`. Upstream: utamakan `SECURITY INVOKER`; jika harus DEFINER, taruh di skema yang tidak diekspos, sertakan cek `auth.uid()` di badan fungsi, dan jalankan `supabase db advisors`. Contoh upstream untuk helper RLS memakai `set search_path = \'\'`, skema `private`, dan `revoke execute ... from PUBLIC, anon, authenticated`.',
        en: 'A `SECURITY DEFINER` function runs with its creator\'s privileges, typically a role with `bypassrls` such as `postgres`, so it silently removes access control without fixing the root cause. Postgres also grants `EXECUTE` to `PUBLIC` by default, so such a function in `public` becomes an endpoint callable by `anon` and `authenticated`. Upstream: prefer `SECURITY INVOKER`; if DEFINER is needed, keep it in a non-exposed schema, include an `auth.uid()` check in the body, and run `supabase db advisors`. Upstream\'s RLS-helper example uses `set search_path = \'\'`, a `private` schema, and `revoke execute ... from PUBLIC, anon, authenticated`.',
      },
    },
    sourcePath: 'skills/supabase/SKILL.md',
  },
]
