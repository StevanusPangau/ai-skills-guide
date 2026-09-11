import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getLocale } from '@/paraglide/runtime.js'

export function TanStackLab() {
  const isEn = getLocale() === 'en'
  const [tab, setTab] = useState<'overview' | 'billing' | 'security'>('overview')
  const [page, setPage] = useState<number>(1)
  const [filterActive, setFilterActive] = useState<boolean>(true)
  const [formKeystrokes, setFormKeystrokes] = useState<number>(12)
  const [queryState, setQueryState] = useState<'fresh' | 'stale' | 'fetching'>('fresh')

  const queryJson = JSON.stringify({ tab, page, active: filterActive }, null, 2)
  const searchUrl = `/dashboard?tab=${tab}&page=${page}&active=${filterActive}`

  return (
    <section id="reactive-lab" className="scroll-mt-20 space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold tracking-tight text-balance">
            {isEn ? 'Reactive State & SWR Router Lab' : 'Lab State Reaktif & Router SWR TanStack'}
          </h2>
          <Badge variant="secondary" className="font-mono text-xs">
            Interactive
          </Badge>
        </div>
        <p className="text-muted-foreground mt-1 text-sm">
          {isEn
            ? 'Interactive demonstration of TanStack core superpowers: Zod-validated search params as state, SWR cache freshness lifecycles, and fine-grained form re-render boundaries.'
            : 'Simulasi interaktif keunggulan inti TanStack: search params tervalidasi Zod sebagai state, siklus kesegaran cache SWR, dan isolasi render form reaktif.'}
        </p>
      </div>

      <div className="grid gap-6">
        {/* Module 1: Search Params as State Manager */}
        <Card className="border border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">
              {isEn
                ? '1. URL Search Params as First-Class State Manager'
                : '1. Search Params URL Sebagai State Manager Kelas Satu'}
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">
              {isEn
                ? 'TanStack Router: bidirectionally syncs typed JSON state with browser query strings.'
                : 'TanStack Router: mensinkronisasikan objek JSON bertipe kuat dengan query string browser.'}
            </p>
          </CardHeader>
          <CardContent className="space-y-4 text-xs">
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="space-y-1">
                <span className="font-semibold text-foreground">Tab:</span>
                <div className="flex gap-1">
                  {(['overview', 'billing', 'security'] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTab(t)}
                      className={`px-2 py-1 rounded text-[11px] font-mono capitalize border transition-colors ${
                        tab === t
                          ? 'border-primary bg-primary/10 text-primary font-bold'
                          : 'border-border text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <span className="font-semibold text-foreground">
                  Page ({page}):
                </span>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={page}
                  onChange={(e) => setPage(Number(e.target.value))}
                  className="w-full accent-primary mt-1"
                />
              </div>

              <div className="space-y-1">
                <span className="font-semibold text-foreground">Filter Active:</span>
                <div>
                  <button
                    type="button"
                    onClick={() => setFilterActive(!filterActive)}
                    className={`px-3 py-1 rounded text-[11px] font-mono border transition-colors ${
                      filterActive
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold'
                        : 'border-border text-muted-foreground'
                    }`}
                  >
                    active: {String(filterActive)}
                  </button>
                </div>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <div className="space-y-1.5">
                <span className="font-mono text-[11px] text-muted-foreground">Browser Address Bar (Shareable URL):</span>
                <div className="rounded bg-muted/50 p-2.5 font-mono text-xs text-foreground border border-border truncate">
                  {searchUrl}
                </div>
              </div>
              <div className="space-y-1.5">
                <span className="font-mono text-[11px] text-muted-foreground">Zod-Validated Route Context:</span>
                <pre className="rounded bg-zinc-950 p-2.5 font-mono text-[11px] text-emerald-400 border border-zinc-800">
                  {queryJson}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Module 2 & 3 */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Module 2: SWR Cache Lifecycles */}
          <Card className="border border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">
                {isEn ? '2. TanStack Query SWR Lifecycle' : '2. Siklus Hidup SWR TanStack Query'}
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                {isEn
                  ? 'Instant cached UI on mount, silent background refetch on stale.'
                  : 'UI instan dari cache saat mount, refetch hening di latar belakang saat data basi.'}
              </p>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              <div className="flex gap-1.5 bg-muted/60 p-1 rounded-lg border border-border">
                <button
                  type="button"
                  onClick={() => setQueryState('fresh')}
                  className={`flex-1 py-1 rounded font-mono font-bold transition-colors ${
                    queryState === 'fresh'
                      ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Fresh (&lt; 5s)
                </button>
                <button
                  type="button"
                  onClick={() => setQueryState('stale')}
                  className={`flex-1 py-1 rounded font-mono font-bold transition-colors ${
                    queryState === 'stale'
                      ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Stale (5s+)
                </button>
                <button
                  type="button"
                  onClick={() => setQueryState('fetching')}
                  className={`flex-1 py-1 rounded font-mono font-bold transition-colors ${
                    queryState === 'fetching'
                      ? 'bg-sky-500/20 text-sky-600 dark:text-sky-400'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Refetching
                </button>
              </div>

              <div className="border border-border rounded-lg p-3 bg-muted/20 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-foreground">
                    {queryState === 'fresh' && (isEn ? 'Zero Network Request' : 'Nol Panggilan Jaringan')}
                    {queryState === 'stale' && (isEn ? 'Data Visible + Revalidating on Focus' : 'Data Terlihat + Revalidasi Saat Fokus')}
                    {queryState === 'fetching' && (isEn ? 'Background HTTP Hop' : 'Panggilan HTTP Latar Belakang')}
                  </span>
                  <Badge variant="outline" className="font-mono text-[10px]">
                    {queryState === 'fresh' ? '0ms render' : queryState === 'stale' ? 'Instant SWR' : '~120ms network'}
                  </Badge>
                </div>
                <p className="text-muted-foreground text-[11px] leading-relaxed">
                  {queryState === 'fresh' && (isEn ? 'staleTime has not elapsed. Components read memory cache directly.' : 'staleTime belum lewat. Komponen membaca cache memori langsung.')}
                  {queryState === 'stale' && (isEn ? 'Data is displayed immediately without spinner, while a background query checks for updates.' : 'Data ditampilkan seketika tanpa loading spinner, sementara kueri latar belakang memeriksa pembaruan.')}
                  {queryState === 'fetching' && (isEn ? 'Fetching new payload. Previous data remains visible on screen (no layout shift).' : 'Mengambil payload baru. Data sebelumnya tetap terlihat di layar tanpa kedipan layout.')}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Module 3: Fine-grained Form Re-render */}
          <Card className="border border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">
                {isEn ? '3. Fine-Grained Form Re-render Boundary' : '3. Batas Re-render Form Fine-Grained'}
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                {isEn
                  ? 'TanStack Form isolates typing re-renders to the single target field.'
                  : 'TanStack Form mengisolasi render pengetikan hanya ke satu field target.'}
              </p>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="flex justify-between items-center font-mono">
                <span>
                  {isEn ? 'Simulated Keystrokes:' : 'Ketikan Karakter:'}{' '}
                  <strong>{formKeystrokes}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => setFormKeystrokes((k) => k + 5)}
                  className="px-2 py-0.5 rounded border border-border text-[11px] hover:bg-muted"
                >
                  +5 Keystrokes
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="border border-destructive/30 bg-destructive/5 rounded p-2.5 space-y-1">
                  <span className="font-bold text-destructive block">
                    {isEn ? 'Naive React Form' : 'Form React Biasa'}
                  </span>
                  <div className="text-base font-mono font-bold text-destructive">
                    {formKeystrokes * 12} re-renders
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    {isEn ? 'All 12 fields re-render on every keystroke.' : 'Seluruh 12 input me-re-render di tiap ketikan.'}
                  </p>
                </div>

                <div className="border border-emerald-500/30 bg-emerald-500/5 rounded p-2.5 space-y-1">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 block">
                    TanStack Form
                  </span>
                  <div className="text-base font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {formKeystrokes} re-renders
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    {isEn ? 'Only the active field re-renders. 11 fields idle.' : 'Hanya field aktif yang me-render. 11 field lain diam.'}
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
