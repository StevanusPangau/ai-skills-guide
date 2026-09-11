import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { getLocale } from '@/paraglide/runtime.js'

export function SupabaseConcepts() {
  const isEn = getLocale() === 'en'

  return (
    <section id="concepts" className="scroll-mt-20 space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-balance">
          {isEn ? 'Supabase & Postgres Mental Models' : 'Model Mental Postgres & Supabase'}
        </h2>
        <p className="mt-1 text-muted-foreground text-sm">
          {isEn
            ? 'Core database principles: 8 impact-ranked rule tiers, security boundaries, and Data API exposure gates.'
            : 'Prinsip inti database: 8 hierarki aturan berperingkat dampak, batas keamanan, dan pintu eksposur Data API.'}
        </p>
      </div>

      {/* Model 1: 8-Category Impact Hierarchy */}
      <Card className="border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            {isEn ? '8-Category Rule Impact Hierarchy' : 'Hierarki Dampak Aturan 8 Kategori'}
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            {isEn
              ? 'Performance bottlenecks in Postgres are strictly ranked from critical resource killers to minor gains.'
              : 'Bottleneck performa di Postgres diprioritaskan ketat dari killer resource kritis hingga penghematan inkremental.'}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-4 font-mono text-xs">
            <div className="rounded-lg border-2 border-red-500/80 bg-red-500/5 p-3 space-y-1.5">
              <div className="flex items-center justify-between">
                <Badge variant="destructive" className="text-[10px] uppercase font-bold">
                  CRITICAL
                </Badge>
                <span className="text-[11px] text-muted-foreground">Query & Conn</span>
              </div>
              <p className="font-semibold text-foreground text-xs font-sans">Indexes & Pooling</p>
              <p className="text-[11px] text-muted-foreground leading-tight font-sans">
                {isEn
                  ? 'Indexes on WHERE/JOIN columns, connection pooler setup, max_connections calculation.'
                  : 'Index pada kolom WHERE/JOIN, setup connection pooler, kalkulasi max_connections.'}
              </p>
            </div>

            <div className="rounded-lg border-2 border-amber-500/80 bg-amber-500/5 p-3 space-y-1.5">
              <div className="flex items-center justify-between">
                <Badge className="bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 text-[10px] uppercase font-bold">
                  HIGH
                </Badge>
                <span className="text-[11px] text-muted-foreground">Security & Schema</span>
              </div>
              <p className="font-semibold text-foreground text-xs font-sans">RLS & Primary Keys</p>
              <p className="text-[11px] text-muted-foreground leading-tight font-sans">
                {isEn
                  ? 'Subquery RLS caching, foreign key indexing, IDENTITY over serial, sequential UUIDs.'
                  : 'Caching subquery RLS, indexing foreign key, IDENTITY over serial, UUID berurutan.'}
              </p>
            </div>

            <div className="rounded-lg border border-sky-500/80 bg-sky-500/5 p-3 space-y-1.5">
              <div className="flex items-center justify-between">
                <Badge className="bg-sky-500/20 text-sky-600 dark:text-sky-400 border border-sky-500/30 text-[10px] uppercase font-bold">
                  MED-HIGH
                </Badge>
                <span className="text-[11px] text-muted-foreground">Locks & Batch</span>
              </div>
              <p className="font-semibold text-foreground text-xs font-sans">Concurrency & Cursor</p>
              <p className="text-[11px] text-muted-foreground leading-tight font-sans">
                {isEn
                  ? 'SKIP LOCKED queue workers, short transactions, cursor pagination O(1) over OFFSET.'
                  : 'SKIP LOCKED pekerja antrean, transaksi ringkas, pagination cursor O(1) over OFFSET.'}
              </p>
            </div>

            <div className="rounded-lg border border-zinc-500/50 bg-zinc-500/5 p-3 space-y-1.5">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-[10px] uppercase font-bold">
                  MEDIUM
                </Badge>
                <span className="text-[11px] text-muted-foreground">Monitoring</span>
              </div>
              <p className="font-semibold text-foreground text-xs font-sans">EXPLAIN & GIN</p>
              <p className="text-[11px] text-muted-foreground leading-tight font-sans">
                {isEn
                  ? 'EXPLAIN ANALYZE, pg_stat_statements, JSONB GIN indexes, tsvector full-text.'
                  : 'EXPLAIN ANALYZE, pg_stat_statements, JSONB GIN index, tsvector pencarian teks.'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Model 2: SECURITY DEFINER Search Path Injection */}
      <Card className="border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            {isEn
              ? 'Security Invariant: SECURITY DEFINER & Search Path Poisoning'
              : 'Invarian Keamanan: SECURITY DEFINER & Search Path Poisoning'}
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            {isEn
              ? 'Database functions running as superuser/postgres must lock the schema lookup path.'
              : 'Fungsi database yang berjalan dengan hak superuser/postgres wajib mengunci jalur pencarian skema.'}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 font-mono text-xs">
            <div className="border-2 border-destructive/50 rounded-lg p-4 bg-destructive/5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-destructive">✕ Vulnerable Function</span>
                <span className="text-[10px] bg-destructive/20 text-destructive px-2 py-0.5 rounded">
                  Privilege Escalation Risk
                </span>
              </div>
              <pre className="bg-background/80 p-2.5 rounded border border-destructive/30 text-destructive text-[11px] overflow-x-auto">
                {`CREATE FUNCTION delete_user()\nRETURNS void SECURITY DEFINER AS $$\nBEGIN\n  DELETE FROM users WHERE id = auth.uid();\nEND; $$ LANGUAGE plpgsql;`}
              </pre>
              <p className="text-[11px] text-muted-foreground font-sans leading-relaxed">
                {isEn
                  ? 'Attacker can create a fake "users" table in a temporary schema and hijack elevated admin permissions.'
                  : 'Penyerang dapat membuat tabel "users" palsu di skema sementara dan membajak hak istimewa admin.'}
              </p>
            </div>

            <div className="border-2 border-emerald-500/50 rounded-lg p-4 bg-emerald-500/5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  ✓ Safe Function with Locked Search Path
                </span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded">
                  Secure
                </span>
              </div>
              <pre className="bg-background/80 p-2.5 rounded border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-[11px] overflow-x-auto">
                {`CREATE FUNCTION delete_user()\nRETURNS void SECURITY DEFINER\nSET search_path = public AS $$\nBEGIN\n  DELETE FROM users WHERE id = (SELECT auth.uid());\nEND; $$ LANGUAGE plpgsql;`}
              </pre>
              <p className="text-[11px] text-muted-foreground font-sans leading-relaxed">
                {isEn
                  ? 'Schema resolution is pinned to public. Coupled with (SELECT auth.uid()) for single-evaluation performance.'
                  : 'Resolusi skema dikunci ke public. Digabung dengan (SELECT auth.uid()) untuk performa evaluasi tunggal.'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Model 3: Data REST API Exposure Gate */}
      <Card className="border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            {isEn ? 'The Data REST API Exposure Gate' : 'Gerbang Eksposur Data REST API'}
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            {isEn
              ? 'Creating a table in PostgreSQL does not automatically expose it to PostgREST.'
              : 'Membuat tabel di PostgreSQL tidak otomatis mengeksposnya ke PostgREST Data API.'}
          </p>
        </CardHeader>
        <CardContent className="space-y-3 text-xs">
          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-lg border border-border bg-card p-3 space-y-1.5">
              <div className="font-semibold text-foreground font-mono">1. DDL Create Table</div>
              <p className="text-muted-foreground leading-relaxed">
                {isEn
                  ? 'Table is created in Postgres. Default ownership belongs to postgres role with no external access.'
                  : 'Tabel dibuat di Postgres. Kepemilikan default dipegang role postgres tanpa akses keluar.'}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-3 space-y-1.5">
              <div className="font-semibold text-foreground font-mono">2. Grant Schema Roles</div>
              <p className="text-muted-foreground leading-relaxed">
                {isEn
                  ? 'Explicitly run: GRANT SELECT, INSERT ON public.table TO anon, authenticated.'
                  : 'Jalankan eksplisit: GRANT SELECT, INSERT ON public.table TO anon, authenticated.'}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-3 space-y-1.5">
              <div className="font-semibold text-foreground font-mono">3. Enable RLS</div>
              <p className="text-muted-foreground leading-relaxed">
                {isEn
                  ? 'ALTER TABLE t ENABLE ROW LEVEL SECURITY. Without policies, anon/auth receive zero rows.'
                  : 'ALTER TABLE t ENABLE ROW LEVEL SECURITY. Tanpa policy, anon/auth tidak menerima satu baris pun.'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
