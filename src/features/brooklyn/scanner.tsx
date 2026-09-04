import { useState } from 'react'

const TROPES_SAMPLES = [
  {
    label: 'Kalimat Klise AI (Trope Overload)',
    raw: 'In today’s rapidly evolving software landscape, we delve deep into a tapestry of robust agentic workflows that quietly serve as game-changers.',
    cleaned: 'We built a subagent workflow that speeds up code review.',
    flags: ['delve', 'tapestry', 'robust', 'landscape', 'quietly', 'serves as'],
  },
  {
    label: 'Format Retoris Palsu (False Range & Rhetoric)',
    raw: 'The real secret? It’s not just about speed — it’s about crafting resilient architectures that stand the test of time.',
    cleaned: 'Fast iteration matters, but clear module boundaries prevent regressions.',
    flags: ['The real secret?', 'It’s not just X — it’s Y', 'stand the test of time'],
  },
  {
    label: 'PR Description Berbunga-bunga',
    raw: 'This PR seamlessly introduces comprehensive optimizations, empowering engineers to effortlessly elevate their development velocity.',
    cleaned: 'Add retry exponential backoff to worker queues; fixes timeout on 5xx.',
    flags: ['seamlessly', 'comprehensive', 'empowering', 'effortlessly', 'elevate'],
  }
]

export function BrooklynScanner() {
  const [selectedIdx, setSelectedIdx] = useState(0)
  const current = TROPES_SAMPLES[selectedIdx]

  return (
    <section id="scanner" className="scroll-mt-20 space-y-6">
      <div>
        <h2 className="font-heading text-2xl font-bold tracking-tight">
          AI Tropes & PR Linter Sandbox
        </h2>
        <p className="mt-1 text-muted-foreground text-sm">
          Simulasi skill <code>/no-tropes</code> dan alur <code>/cpr</code> Brooklyn: mendeteksi kata-kata klise AI dan memangkasnya menjadi bahasa manusia yang tajam.
        </p>
      </div>

      <div className="space-y-4">
        {/* Sample selector */}
        <div className="flex flex-wrap gap-2">
          {TROPES_SAMPLES.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedIdx(idx)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors border ${
                selectedIdx === idx
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border bg-card text-muted-foreground hover:text-foreground'
              }`}
            >
              Contoh #{idx + 1}
            </button>
          ))}
        </div>

        {/* Comparison card */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Raw AI Draft */}
          <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-destructive">
                ✕ SEBELUM: AI DRAFT (PENUH TROPES)
              </span>
              <span className="text-[10px] font-mono bg-destructive/15 text-destructive px-2 py-0.5 rounded">
                {current.flags.length} Tropes Terdeteksi
              </span>
            </div>
            <p className="text-sm font-sans text-foreground leading-relaxed italic bg-background/60 p-3 rounded-lg border border-destructive/20">
              &ldquo;{current.raw}&rdquo;
            </p>
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase text-muted-foreground">Kata/Struktur Bermasalah:</span>
              <div className="flex flex-wrap gap-1.5">
                {current.flags.map((flag) => (
                  <span key={flag} className="text-[11px] font-mono px-2 py-0.5 rounded bg-destructive/10 text-destructive border border-destructive/20">
                    {flag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Cleaned Human Draft */}
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">
                ✓ SESUDAH: REVISI /NO-TROPES
              </span>
              <span className="text-[10px] font-mono bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded font-semibold">
                Human-Grade Direct
              </span>
            </div>
            <p className="text-sm font-sans text-foreground leading-relaxed font-medium bg-background/60 p-3 rounded-lg border border-emerald-500/20">
              &ldquo;{current.cleaned}&rdquo;
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Ringkas, spesifik pada fakta teknis, tidak melebih-lebihkan dampak, dan mudah di-scan oleh reviewer PR.
            </p>
          </div>
        </div>

        {/* CPR Lifecycle Pipeline Banner */}
        <div className="rounded-xl border border-border bg-card p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="min-w-0">
            <span className="text-xs font-mono font-bold text-primary">ALUR CEPAT BROOKLYN: /CPR</span>
            <p className="text-xs text-muted-foreground mt-0.5">
              <code>/clean</code> (rapikan diff & buang dead code) → <code>/pr-update</code> (tulis PR via <code>no-tropes</code>) → otomatis cetak tautan PR siap review.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-1 text-xs font-mono font-bold bg-muted px-3 py-1.5 rounded-lg border border-border">
            <span>clean</span>
            <span className="text-muted-foreground">→</span>
            <span>no-tropes</span>
            <span className="text-muted-foreground">→</span>
            <span className="text-emerald-600 dark:text-emerald-400">PR ready</span>
          </div>
        </div>
      </div>
    </section>
  )
}
