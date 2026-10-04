import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getLocale } from '@/paraglide/runtime.js'

export function SupabaseRlsLab() {
  const isEn = getLocale() === 'en'
  const [rlsMode, setRlsMode] = useState<'naive' | 'cached'>('cached')
  const [pageNumber, setPageNumber] = useState<number>(500)
  const [concurrentUsers, setConcurrentUsers] = useState<number>(250)

  // RLS stats
  const rlsCalls = rlsMode === 'naive' ? '1,000,000 calls' : '1 call (cached)'

  // Pagination stats
  const pageSize = 20
  const rowsScannedOffset = pageNumber * pageSize

  // Connection pooling stats
  // Illustrative only: pool size is a placeholder, not an upstream recommendation.
  const pooledConnections = 15

  return (
    <section id="rls-lab" className="scroll-mt-20 space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold tracking-tight text-balance">
            {isEn ? 'Postgres Performance & RLS Lab' : 'Lab Kinerja PostgreSQL & RLS Supabase'}
          </h2>
          <Badge variant="secondary" className="font-mono text-xs">
            Interactive
          </Badge>
        </div>
        <p className="text-muted-foreground mt-1 text-sm">
          {isEn
            ? 'Illustrative simulations of official Supabase Postgres rules (no measured benchmarks): single-evaluation RLS subqueries, cursor vs OFFSET pagination, and connection pooling RAM exhaustion.'
            : 'Simulasi ilustratif aturan resmi Supabase Postgres (bukan hasil benchmark): subquery RLS evaluasi tunggal, pagination cursor vs OFFSET, dan connection pooling pembebasan RAM.'}
        </p>
      </div>

      <div className="grid gap-6">
        {/* Module 1: RLS Subquery Simulator */}
        <Card className="border border-border">
          <CardHeader className="pb-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <CardTitle className="text-base font-semibold">
                  {isEn
                    ? '1. RLS Policy Function Invariant: Row-by-Row vs Subquery Cache'
                    : '1. Invarian Fungsi Kebijakan RLS: Per-Baris vs Cache Subquery'}
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {isEn
                    ? 'Rule: security-rls-performance (upstream rates it 5-10x faster, workload-dependent) — wrap auth functions in (select auth.uid()) so they are evaluated once.'
                    : 'Aturan: security-rls-performance (CRITICAL) — bungkus fungsi auth dalam (select auth.uid()) agar dievaluasi sekali (upstream: 5-10x lebih cepat, bergantung beban kerja).'}
                </p>
              </div>
              <div className="flex gap-1.5 bg-muted/60 p-1 rounded-lg border border-border">
                <button
                  type="button"
                  onClick={() => setRlsMode('naive')}
                  className={`px-2.5 py-1 text-xs rounded font-medium transition-colors ${
                    rlsMode === 'naive'
                      ? 'bg-destructive/20 text-destructive font-semibold shadow-xs'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {isEn ? 'Naive using (auth.uid())' : 'Naive using (auth.uid())'}
                </button>
                <button
                  type="button"
                  onClick={() => setRlsMode('cached')}
                  className={`px-2.5 py-1 text-xs rounded font-medium transition-colors ${
                    rlsMode === 'cached'
                      ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-semibold shadow-xs'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {isEn ? 'Cached ((select auth.uid()))' : 'Cached ((select auth.uid()))'}
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
              <div className="border border-border rounded p-2.5 bg-muted/30">
                <span className="text-[10px] text-muted-foreground block uppercase">
                  {isEn ? 'Illustrative Table Size' : 'Ukuran Tabel Ilustrasi'}
                </span>
                <span className="text-base font-bold text-foreground">1,000,000 rows</span>
              </div>
              <div className="border border-border rounded p-2.5 bg-muted/30">
                <span className="text-[10px] text-muted-foreground block uppercase">
                  {isEn ? 'auth.uid() Executions' : 'Frekuensi Eksekusi auth.uid()'}
                </span>
                <span
                  className={`text-base font-bold ${
                    rlsMode === 'naive'
                      ? 'text-destructive'
                      : 'text-emerald-600 dark:text-emerald-400'
                  }`}
                >
                  {rlsCalls}
                </span>
              </div>
              <div className="border border-border rounded p-2.5 bg-muted/30 col-span-2 sm:col-span-1">
                <span className="text-[10px] text-muted-foreground block uppercase">
                  {isEn ? 'Evaluation' : 'Evaluasi'}
                </span>
                <span
                  className={`text-base font-bold ${
                    rlsMode === 'naive'
                      ? 'text-destructive'
                      : 'text-emerald-600 dark:text-emerald-400'
                  }`}
                >
                  {rlsMode === 'naive'
                    ? isEn ? 'per row' : 'per baris'
                    : isEn ? 'once (initplan)' : 'sekali (initplan)'}
                </span>
              </div>
            </div>

            <pre className="rounded bg-zinc-950 p-3 text-xs font-mono text-zinc-200 overflow-x-auto border border-zinc-800">
              {rlsMode === 'naive'
                ? `-- ✕ ANTI-PATTERN: auth.uid() executes for EVERY candidate row in the table\nCREATE POLICY "user_orders" ON orders\n  FOR SELECT USING (auth.uid() = user_id);`
                : `-- ✓ PATTERN: (SELECT auth.uid()) evaluates ONCE as an initplan and caches\nCREATE POLICY "user_orders" ON orders\n  FOR SELECT USING ((SELECT auth.uid()) = user_id);`}
            </pre>
          </CardContent>
        </Card>

        {/* Module 2 & 3 */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Module 2: Pagination Inspector */}
          <Card className="border border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">
                {isEn ? '2. Keyset / Cursor vs OFFSET Pagination' : '2. Pagination Keyset / Cursor vs OFFSET'}
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                {isEn
                  ? 'Rule: data-pagination (MEDIUM-HIGH) — OFFSET scans all skipped rows; cursor is O(1).'
                  : 'Aturan: data-pagination (MEDIUM-HIGH) — OFFSET men-scan semua baris yang dilewati; cursor bernilai O(1).'}
              </p>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <div className="flex justify-between items-center font-mono">
                  <span>
                    {isEn ? 'Page Number:' : 'Halaman Ke:'} <strong>{pageNumber.toLocaleString()}</strong>
                  </span>
                  <span className="text-muted-foreground">
                    {pageSize} {isEn ? 'items/page' : 'item/halaman'}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="2000"
                  step="25"
                  value={pageNumber}
                  onChange={(e) => setPageNumber(Number(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="border border-destructive/30 bg-destructive/5 rounded p-2.5 space-y-1">
                  <span className="font-bold text-destructive block">OFFSET {rowsScannedOffset.toLocaleString()}</span>
                  <p className="text-muted-foreground text-[11px]">
                    {isEn
                      ? `Reads and discards ${rowsScannedOffset.toLocaleString()} rows before returning the page; cost grows with page depth.`
                      : `Membaca dan membuang ${rowsScannedOffset.toLocaleString()} baris sebelum mengembalikan halaman; biaya naik seiring kedalaman halaman.`}
                  </p>
                </div>
                <div className="border border-emerald-500/30 bg-emerald-500/5 rounded p-2.5 space-y-1">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 block">
                    WHERE id &gt; $last_id
                  </span>
                  <p className="text-muted-foreground text-[11px]">
                    {isEn
                      ? `Index seek on the last id: reads only the ${pageSize} rows of the page, regardless of depth.`
                      : `Index seek pada id terakhir: hanya membaca ${pageSize} baris halaman, berapa pun kedalamannya.`}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Module 3: Connection Pooling Exhaustion */}
          <Card className="border border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">
                {isEn ? '3. Connection Pooling vs RAM Exhaustion' : '3. Connection Pooling vs Kehabisan RAM'}
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                {isEn
                  ? 'Rule: conn-pooling (CRITICAL) — each Postgres connection consumes 1-3MB RAM.'
                  : 'Aturan: conn-pooling (CRITICAL) — setiap koneksi Postgres memakan 1-3MB RAM.'}
              </p>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <div className="flex justify-between items-center font-mono">
                  <span>
                    {isEn ? 'Concurrent Users / Workers:' : 'Pengguna / Pekerja Konkuren:'}{' '}
                    <strong>{concurrentUsers}</strong>
                  </span>
                  <span className="text-muted-foreground">
                    {isEn ? 'illustrative' : 'ilustrasi'}
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="1000"
                  step="50"
                  value={concurrentUsers}
                  onChange={(e) => setConcurrentUsers(Number(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="border border-destructive/30 bg-destructive/5 rounded p-2.5 space-y-1">
                  <span className="font-bold text-destructive block">Direct Connections</span>
                  <div className="text-base font-mono font-bold text-destructive">
                    {concurrentUsers} {isEn ? 'connections' : 'koneksi'}
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    {isEn
                      ? `${concurrentUsers} backend processes, each using roughly 1-3MB RAM (upstream conn-limits); can exhaust memory and max_connections.`
                      : `${concurrentUsers} proses backend, masing-masing sekitar 1-3MB RAM (upstream conn-limits); bisa menghabiskan memori dan max_connections.`}
                  </p>
                </div>
                <div className="border border-emerald-500/30 bg-emerald-500/5 rounded p-2.5 space-y-1">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 block">
                    Pooler (e.g. PgBouncer)
                  </span>
                  <div className="text-base font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {pooledConnections} {isEn ? 'connections' : 'koneksi'}
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    {isEn
                      ? 'A small fixed pool of connections reused across many requests (pool size here is only an example).'
                      : 'Pool koneksi kecil dan tetap dipakai bergantian oleh banyak request (ukuran pool di sini hanya contoh).'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
