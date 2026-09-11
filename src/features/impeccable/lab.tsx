import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getLocale } from '@/paraglide/runtime.js'

export function ImpeccableLab() {
  const isEn = getLocale() === 'en'
  const [designStyle, setDesignStyle] = useState<'slop' | 'impeccable'>('impeccable')
  const [spacingRhythm, setSpacingRhythm] = useState<'random' | 'grid8'>('grid8')

  return (
    <section id="impeccable-lab" className="scroll-mt-20 space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold tracking-tight text-balance">
            {isEn ? 'Anti-AI Slop & Craft Polish Lab' : 'Lab Anti-AI Slop & Pemolesan Craft'}
          </h2>
          <Badge variant="secondary" className="font-mono text-xs">
            Interactive
          </Badge>
        </div>
        <p className="text-muted-foreground mt-1 text-sm">
          {isEn
            ? 'Interactive comparison between generic AI-generated interface slop and humanized, senior designer-grade craft.'
            : 'Perbandingan interaktif antara antarmuka AI generik yang membosankan dan pemolesan craft kelas desainer senior.'}
        </p>
      </div>

      <div className="grid gap-6">
        {/* Module 1: AI Slop vs Impeccable Design */}
        <Card className="border border-border">
          <CardHeader className="pb-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <CardTitle className="text-base font-semibold">
                  {isEn
                    ? '1. Generic AI UI Slop vs Impeccable Craft'
                    : '1. Antarmuka AI Slop Generik vs Craft Impeccable'}
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {isEn
                    ? 'Rule: bolder & colorize — replace gray-on-gray blandness with intentional personality.'
                    : 'Aturan: bolder & colorize — ganti nuansa abu-abu tanpa jiwa dengan karakter visual berani.'}
                </p>
              </div>
              <div className="flex gap-2 font-mono">
                <button
                  type="button"
                  onClick={() => setDesignStyle('slop')}
                  className={`px-3 py-1 rounded text-xs transition-colors border ${
                    designStyle === 'slop'
                      ? 'border-destructive bg-destructive/10 text-destructive font-bold'
                      : 'border-border text-muted-foreground hover:text-foreground'
                  }`}
                >
                  ✕ AI Slop (Bland)
                </button>
                <button
                  type="button"
                  onClick={() => setDesignStyle('impeccable')}
                  className={`px-3 py-1 rounded text-xs transition-colors border ${
                    designStyle === 'impeccable'
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold'
                      : 'border-border text-muted-foreground hover:text-foreground'
                  }`}
                >
                  ✓ Impeccable Craft
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-xs">
            {designStyle === 'slop' ? (
              <div className="rounded-xl border border-zinc-300 bg-zinc-100 dark:bg-zinc-900/50 p-6 space-y-4 shadow-sm">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-400">
                    AI Generated Feature Card
                  </span>
                  <h3 className="text-base font-normal text-zinc-600 dark:text-zinc-400">
                    Robust and seamless cloud infrastructure solutions
                  </h3>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">
                    Empowering modern engineering teams to effortlessly elevate velocity with cutting-edge synergy.
                  </p>
                </div>
                <div className="flex gap-2">
                  <div className="px-3 py-1.5 rounded bg-zinc-300 text-zinc-600 text-xs font-normal">
                    Learn more
                  </div>
                  <div className="px-3 py-1.5 rounded border border-zinc-300 text-zinc-400 text-xs font-normal">
                    Documentation
                  </div>
                </div>
                <div className="text-[10px] text-destructive italic">
                  Problem: zero visual hierarchy, gray-on-gray low contrast, synthetic AI jargon, weak button states.
                </div>
              </div>
            ) : (
              <div className="rounded-xl border-2 border-primary/40 bg-card p-6 space-y-4 shadow-lg">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-primary">
                      Architecture Engine
                    </span>
                    <Badge variant="outline" className="text-[10px] font-mono">
                      v2.4 GA
                    </Badge>
                  </div>
                  <h3 className="text-lg font-bold text-foreground tracking-tight">
                    Deploy Edge Clusters in 80ms
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Sub-millisecond cold starts across 310 global edge points. Deterministic failover and automatic TLS certificates.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button type="button" className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold shadow-sm hover:opacity-90">
                    Get Started Free →
                  </button>
                  <button type="button" className="px-3 py-2 rounded-lg border border-border text-foreground text-xs font-medium hover:bg-muted">
                    Read Architecture
                  </button>
                </div>
                <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                  ✓ High contrast (4.5:1+), punchy headline, human copy, intentional action button with depth.
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Module 2 & 3 */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Module 2: Spacing Rhythm */}
          <Card className="border border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">
                {isEn ? '2. Spacing Normalization (4px/8px Grid)' : '2. Normalisasi Spasi (Grid 4px/8px)'}
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                {isEn
                  ? 'Rule: normalize — replace random pixel magic numbers with harmonious rhythm.'
                  : 'Aturan: normalize — ganti angka acak piksel dengan ritme vertikal harmonis.'}
              </p>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              <div className="flex gap-2 font-mono">
                <button
                  type="button"
                  onClick={() => setSpacingRhythm('random')}
                  className={`flex-1 py-1.5 rounded border transition-colors ${
                    spacingRhythm === 'random'
                      ? 'border-destructive bg-destructive/10 text-destructive font-bold'
                      : 'border-border text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Random (13px, 17px, 23px)
                </button>
                <button
                  type="button"
                  onClick={() => setSpacingRhythm('grid8')}
                  className={`flex-1 py-1.5 rounded border transition-colors ${
                    spacingRhythm === 'grid8'
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold'
                      : 'border-border text-muted-foreground hover:text-foreground'
                  }`}
                >
                  8px Grid Scale
                </button>
              </div>

              <div className="border border-border rounded-lg p-3 bg-muted/20 space-y-2">
                <div className="flex justify-between items-center font-mono text-[11px]">
                  <span>Visual Rhythm:</span>
                  <span className={spacingRhythm === 'grid8' ? 'text-emerald-600 font-bold' : 'text-destructive'}>
                    {spacingRhythm === 'grid8' ? 'Harmonious Cadence' : 'Visual Friction / Uneasy Eye'}
                  </span>
                </div>
                <div className="flex items-end gap-2 h-16 pt-2">
                  {(spacingRhythm === 'grid8' ? [8, 16, 24, 32, 48] : [11, 19, 23, 37, 43]).map((h, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-t transition-all ${
                        spacingRhythm === 'grid8' ? 'bg-primary' : 'bg-destructive/60'
                      }`}
                      style={{ height: `${h}px` }}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Module 3: P0-P3 Severity Scoring */}
          <Card className="border border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">
                {isEn ? '3. Structured Audit Severity (P0-P3)' : '3. Skoring Severity Audit Terstruktur (P0-P3)'}
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                {isEn
                  ? 'Rule: audit — prioritized technical review across accessibility and UX.'
                  : 'Aturan: audit — tinjauan teknis berprioritas tinggi dari aksesibilitas hingga UX.'}
              </p>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2 font-mono">
                <div className="border border-destructive/40 bg-destructive/5 rounded p-2 space-y-1">
                  <span className="font-bold text-destructive block">P0: Critical Blocker</span>
                  <p className="text-[10px] text-muted-foreground font-sans">
                    Contrast &lt; 3:1, missing form labels, broken keyboard trap.
                  </p>
                </div>
                <div className="border border-amber-500/40 bg-amber-500/5 rounded p-2 space-y-1">
                  <span className="font-bold text-amber-600 dark:text-amber-400 block">P1: High Impact</span>
                  <p className="text-[10px] text-muted-foreground font-sans">
                    Layout shift (CLS &gt; 0.1), tap targets &lt; 44x44px.
                  </p>
                </div>
                <div className="border border-sky-500/40 bg-sky-500/5 rounded p-2 space-y-1">
                  <span className="font-bold text-sky-600 dark:text-sky-400 block">P2: Moderate Polish</span>
                  <p className="text-[10px] text-muted-foreground font-sans">
                    Inconsistent border radius, missing focus outline styles.
                  </p>
                </div>
                <div className="border border-zinc-500/40 bg-zinc-500/5 rounded p-2 space-y-1">
                  <span className="font-bold text-zinc-400 block">P3: Minor Polish</span>
                  <p className="text-[10px] text-muted-foreground font-sans">
                    Micro optical alignment tweaks, subpixel anti-aliasing.
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
