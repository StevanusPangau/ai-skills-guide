import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getLocale } from '@/paraglide/runtime.js'

type WaterfallMode = 'sequential' | 'parallel' | 'deferred'

export function VercelWaterfallLab() {
  const isEn = getLocale() === 'en'
  const [mode, setMode] = useState<WaterfallMode>('sequential')
  const [propCount, setPropCount] = useState<number>(3)
  const [signalStep, setSignalStep] = useState<number>(1)

  // Simulation values for waterfall
  const requests = [
    { name: 'fetchUser()', ms: 180, color: 'bg-sky-500' },
    { name: 'fetchWorkspace()', ms: 320, color: 'bg-emerald-500' },
    { name: 'fetchPermissions()', ms: 210, color: 'bg-amber-500' },
  ]

  const totalSequential = requests.reduce((acc, r) => acc + r.ms, 0)
  const maxParallel = Math.max(...requests.map((r) => r.ms))
  const deferredInitial = 180 + 320 // permissions deferred to user action

  const totalTime =
    mode === 'sequential' ? totalSequential : mode === 'parallel' ? maxParallel : deferredInitial

  const booleanStates = Math.pow(2, propCount)

  const signalPhases = [
    {
      step: 1,
      titleId: '1. Kumpulkan Sinyal 14 Hari',
      titleEn: '1. Collect 14-Day Signals',
      descId: 'Kumpulkan metrik produksi lewat vercel metrics, vercel usage, dan vercel contract ke signals.json (window 14 hari). Dilarang repo-wide grep sebelum signals.json ada.',
      descEn: 'Collect production metrics via vercel metrics, vercel usage, and vercel contract into signals.json (14-day window). No repo-wide grep before signals.json exists.',
      metric: 'signals.json · 14d',
    },
    {
      step: 2,
      titleId: '2. Gate Deterministik',
      titleEn: '2. Deterministic Gate',
      descId: 'gate-investigations.mjs memilih kandidat dengan ambang batas deterministik (bukan perkalian P95 x jumlah request); default maksimal 6 kandidat dengan diversity guardrail.',
      descEn: 'gate-investigations.mjs selects candidates with deterministic thresholds (not a P95 x request-count product); at most 6 candidates by default, with a diversity guardrail.',
      metric: 'gate.json · max 6',
    },
    {
      step: 3,
      titleId: '3. Investigasi Per Kandidat',
      titleEn: '3. Per-Candidate Investigation',
      descId: 'deep-dive mengumpulkan bukti, lalu brief per entri diinvestigasi: inline untuk 1-2 brief, satu sub-agent per brief untuk 3+. Hanya berkas yang tercantum di brief (plus import lokal route) yang dibaca.',
      descEn: 'deep-dive gathers evidence, then each brief is investigated: inline for 1-2 briefs, one sub-agent per brief for 3+. Only files listed in the brief (plus route-local imports) are read.',
      metric: 'scope: brief files',
    },
    {
      step: 4,
      titleId: '4. Verifikasi Mekanis',
      titleEn: '4. Mechanical Verification',
      descId: 'verify-and-regen memeriksa klaim, berkas, dan sitasi versi framework; brief yang gagal diulang dengan daftar kegagalan sebelumnya.',
      descEn: 'verify-and-regen checks claims, files, and framework-version citations; briefs that fail are rerun with the previous failures listed.',
      metric: 'verify-and-regen',
    },
    {
      step: 5,
      titleId: '5. Laporan Rekomendasi Berperingkat',
      titleEn: '5. Ranked Recommendation Report',
      descId: 'render-report menghasilkan report.md dan final-message.json berisi rekomendasi berperingkat dengan bukti metrik. Skill tidak membuat patch dan memakai frasa magnitudo biaya, bukan angka penghematan $N.',
      descEn: 'render-report emits report.md and final-message.json with ranked, metric-backed recommendations. The skill does not produce patches and uses cost-magnitude phrases, not $N savings figures.',
      metric: 'report.md',
    },
  ]

  return (
    <section id="waterfall-lab" className="scroll-mt-20 space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold tracking-tight text-balance">
            {isEn ? 'Performance & Rules Lab' : 'Lab Kinerja & Aturan Vercel'}
          </h2>
          <Badge variant="secondary" className="font-mono text-xs">
            Interactive
          </Badge>
        </div>
        <p className="text-muted-foreground mt-1 text-sm">
          {isEn
            ? 'Hands-on simulation of core Vercel Engineering rules: eliminating sequential waterfalls, preventing boolean prop explosion, and signal-gated optimization.'
            : 'Simulasi interaktif aturan inti Vercel Engineering: eliminasi sequential waterfalls, pencegahan ledakan boolean props, dan optimasi berbasis sinyal 14 hari.'}
        </p>
      </div>

      <div className="grid gap-6">
        {/* Module 1: Waterfall Simulator */}
        <Card className="border border-border">
          <CardHeader className="pb-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <CardTitle className="text-base font-semibold">
                  {isEn ? '1. Async Waterfall vs Parallel Timeline' : '1. Timeline Async Waterfall vs Paralel'}
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {isEn
                    ? 'Rule: async-parallel (CRITICAL) — sequential awaits kill TTFB and wall-clock execution.'
                    : 'Aturan: async-parallel (CRITICAL) — await berurutan merusak TTFB dan durasi eksekusi.'}
                </p>
              </div>
              <div className="flex gap-1.5 bg-muted/60 p-1 rounded-lg border border-border">
                <button
                  type="button"
                  onClick={() => setMode('sequential')}
                  className={`px-2.5 py-1 text-xs rounded font-medium transition-colors ${
                    mode === 'sequential'
                      ? 'bg-destructive/20 text-destructive font-semibold shadow-xs'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {isEn ? 'Sequential (Naive)' : 'Berurutan (Naive)'}
                </button>
                <button
                  type="button"
                  onClick={() => setMode('parallel')}
                  className={`px-2.5 py-1 text-xs rounded font-medium transition-colors ${
                    mode === 'parallel'
                      ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-semibold shadow-xs'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {isEn ? 'Promise.all (Optimized)' : 'Promise.all (Optimal)'}
                </button>
                <button
                  type="button"
                  onClick={() => setMode('deferred')}
                  className={`px-2.5 py-1 text-xs rounded font-medium transition-colors ${
                    mode === 'deferred'
                      ? 'bg-sky-500/20 text-sky-600 dark:text-sky-400 font-semibold shadow-xs'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {isEn ? 'Deferred Branch' : 'Cabang Ditunda'}
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Timeline Graphic */}
            <div className="space-y-3 rounded-lg bg-muted/30 p-4 border border-border">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-muted-foreground">
                  {isEn ? 'Simulated Execution Wall Clock:' : 'Waktu Dinding Eksekusi:'}
                </span>
                <span
                  className={`font-bold text-sm ${
                    mode === 'sequential'
                      ? 'text-destructive'
                      : 'text-emerald-600 dark:text-emerald-400'
                  }`}
                >
                  {totalTime} ms{' '}
                  {mode === 'parallel' && (
                    <span className="text-xs font-normal text-muted-foreground">
                      (-{Math.round(((totalSequential - maxParallel) / totalSequential) * 100)}% latency)
                    </span>
                  )}
                </span>
              </div>

              {/* Visual Gantt Bar */}
              <div className="space-y-2 pt-2">
                {requests.map((req, idx) => {
                  let leftPercent = 0
                  let widthPercent = (req.ms / totalSequential) * 100

                  if (mode === 'sequential') {
                    if (idx === 1) leftPercent = (requests[0].ms / totalSequential) * 100
                    if (idx === 2)
                      leftPercent =
                        ((requests[0].ms + requests[1].ms) / totalSequential) * 100
                  } else if (mode === 'parallel') {
                    leftPercent = 0
                    widthPercent = (req.ms / totalSequential) * 100
                  } else if (mode === 'deferred') {
                    if (idx === 1) leftPercent = (requests[0].ms / totalSequential) * 100
                    if (idx === 2) {
                      return (
                        <div key={req.name} className="flex items-center gap-3 text-xs">
                          <span className="w-36 font-mono text-muted-foreground truncate line-through">
                            {req.name}
                          </span>
                          <span className="text-[11px] text-sky-600 dark:text-sky-400 italic">
                            {isEn
                              ? '↳ Deferred: fetched on click, 0ms initial block'
                              : '↳ Ditunda: diambil saat interaksi, 0ms beban awal'}
                          </span>
                        </div>
                      )
                    }
                  }

                  return (
                    <div key={req.name} className="space-y-1">
                      <div className="flex justify-between text-[11px] font-mono text-muted-foreground">
                        <span>{req.name}</span>
                        <span>{req.ms}ms</span>
                      </div>
                      <div className="h-4 w-full bg-secondary/60 rounded overflow-hidden relative">
                        <div
                          className={`h-full ${req.color} rounded transition-all duration-300`}
                          style={{
                            marginLeft: `${leftPercent}%`,
                            width: `${widthPercent}%`,
                          }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Code Snippet Box */}
            <div className="rounded-md bg-zinc-950 p-3 text-xs font-mono text-zinc-100 overflow-x-auto border border-zinc-800">
              {mode === 'sequential' && (
                <div className="space-y-1">
                  <div className="text-destructive font-semibold">
                    // ✕ ANTI-PATTERN: Sequential waterfalls block execution
                  </div>
                  <div>const user = await fetchUser()</div>
                  <div>const workspace = await fetchWorkspace()</div>
                  <div>const permissions = await fetchPermissions()</div>
                </div>
              )}
              {mode === 'parallel' && (
                <div className="space-y-1">
                  <div className="text-emerald-400 font-semibold">
                    // ✓ PATTERN: Independent async operations dispatched concurrently
                  </div>
                  <div>
                    const [user, workspace, permissions] = await Promise.all([
                  </div>
                  <div className="pl-4">fetchUser(),</div>
                  <div className="pl-4">fetchWorkspace(),</div>
                  <div className="pl-4">fetchPermissions(),</div>
                  <div>])</div>
                </div>
              )}
              {mode === 'deferred' && (
                <div className="space-y-1">
                  <div className="text-sky-400 font-semibold">
                    // ✓ PATTERN: Defer optional fetches into runtime event handlers
                  </div>
                  <div>const [user, workspace] = await Promise.all([fetchUser(), fetchWorkspace()])</div>
                  <div>// fetchPermissions called inside {'<PermissionModal onOpen={...} />'}</div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Module 2 & 3 in 2 Columns */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Module 2: Composition vs Boolean Props */}
          <Card className="border border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">
                {isEn ? '2. Boolean Flag Soup vs Compound Pattern' : '2. Sup Boolean Flag vs Compound Pattern'}
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                {isEn
                  ? 'Rule: architecture-avoid-boolean-props — each boolean doubles component states.'
                  : 'Aturan: architecture-avoid-boolean-props — setiap boolean menggandakan state komponen.'}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span>
                    {isEn ? 'Boolean Props Count:' : 'Jumlah Boolean Props:'}{' '}
                    <strong className="text-primary">{propCount}</strong>
                  </span>
                  <span className="text-xs text-destructive font-bold">
                    {booleanStates} {isEn ? 'state permutations' : 'kombinasi state'} (2^{propCount})
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={propCount}
                  onChange={(e) => setPropCount(Number(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>

              <div className="space-y-2 text-xs">
                <div className="border border-destructive/30 bg-destructive/5 rounded p-2.5">
                  <div className="font-semibold text-destructive mb-1">
                    {isEn ? '✕ Anti-Pattern (Props Explosion):' : '✕ Anti-Pattern (Ledakan Props):'}
                  </div>
                  <code className="text-[11px] block font-mono text-muted-foreground">
                    {'<Composer '}
                    {propCount >= 1 && 'isOpen '}
                    {propCount >= 2 && 'hasAttachments '}
                    {propCount >= 3 && 'isCompact '}
                    {propCount >= 4 && 'readOnly '}
                    {propCount >= 5 && 'showFooter '}
                    {'/>'}
                  </code>
                </div>

                <div className="border border-emerald-500/30 bg-emerald-500/5 rounded p-2.5">
                  <div className="font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
                    {isEn ? '✓ Vercel Composition Pattern:' : '✓ Pola Komposisi Vercel:'}
                  </div>
                  <code className="text-[11px] block font-mono text-muted-foreground">
                    {'<Composer.Frame>\n  <Composer.Input />\n  <Composer.Footer />\n</Composer.Frame>'}
                  </code>
                  <p className="text-[11px] text-muted-foreground mt-1.5 italic">
                    {isEn
                      ? 'Subtree reads shared context via use(ComposerContext). Zero root boolean explosion.'
                      : 'Subtree membaca context bersama via use(ComposerContext). Nol ledakan boolean prop.'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Module 3: 14-Day Signal Optimization */}
          <Card className="border border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">
                {isEn ? '3. 14-Day Signal Gate Inspector' : '3. Gerbang Sinyal 14 Hari vercel-optimize'}
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                {isEn
                  ? 'Five ordered phases: do not read source before production telemetry selects candidates.'
                  : 'Lima fase berurutan: dilarang membaca source sebelum telemetri produksi memilih kandidat.'}
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Stepper buttons */}
              <div className="flex gap-1">
                {signalPhases.map((phase) => (
                  <button
                    key={phase.step}
                    type="button"
                    onClick={() => setSignalStep(phase.step)}
                    className={`flex-1 py-1 text-center text-xs font-mono font-bold rounded transition-colors ${
                      signalStep === phase.step
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted/70 text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Fase {phase.step}
                  </button>
                ))}
              </div>

              {/* Active phase card */}
              {(() => {
                const active = signalPhases.find((p) => p.step === signalStep)!
                return (
                  <div className="rounded-lg border border-border bg-card p-3 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-foreground">
                        {isEn ? active.titleEn : active.titleId}
                      </span>
                      <Badge variant="outline" className="font-mono text-[10px]">
                        {active.metric}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {isEn ? active.descEn : active.descId}
                    </p>
                  </div>
                )
              })()}

              <div className="rounded bg-muted/40 p-2 text-[11px] text-muted-foreground border-l-2 border-primary/50">
                <span className="font-semibold text-foreground">
                  {isEn ? 'Core Rule: ' : 'Aturan Pokok: '}
                </span>
                {isEn
                  ? 'vercel-optimize traces every recommendation to a metric-backed candidate or a traffic-independent scanner finding; no repo-wide grep beyond candidate scope.'
                  : 'vercel-optimize melacak setiap rekomendasi ke kandidat berbasis metrik atau temuan scanner yang tidak bergantung traffic; tidak ada repo-wide grep di luar cakupan kandidat.'}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
