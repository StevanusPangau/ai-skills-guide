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
            {isEn ? 'Anti-AI Slop & Craft Lab' : 'Lab Anti-AI Slop & Craft'}
          </h2>
          <Badge variant="secondary" className="font-mono text-xs">
            Interactive
          </Badge>
        </div>
        <p className="text-muted-foreground mt-1 text-sm">
          {isEn
            ? 'Interactive comparison between a generic AI-template look and a more deliberate one. The sample copy and styling are illustrative only.'
            : 'Perbandingan interaktif antara tampilan template AI generik dan yang lebih disengaja. Contoh copy dan styling hanya ilustrasi.'}
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
                    ? 'Rules (bolder, colorize): amplify what the system owns, add color roles, keep body contrast at WCAG AA.'
                    : 'Aturan (bolder, colorize): perkuat apa yang dimiliki sistem, tambah peran warna, jaga kontras body di batas WCAG AA.'}
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
                    Seamless solutions for modern teams
                  </h3>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">
                    Empowering teams to effortlessly unlock value with cutting-edge synergy.
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
                  Tells: weak hierarchy, gray text on gray, vague jargon, indistinct buttons.
                </div>
              </div>
            ) : (
              <div className="rounded-xl border-2 border-primary/40 bg-card p-6 space-y-4 shadow-lg">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-primary">
                      Sample card
                    </span>
                    <Badge variant="outline" className="text-[10px] font-mono">
                      Illustrative
                    </Badge>
                  </div>
                  <h3 className="text-lg font-bold text-foreground tracking-tight">
                    Ship your first project today
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Concrete headline, plain language, and one clear primary action.
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
                  ✓ Clear hierarchy, readable contrast, specific copy, one primary action.
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
                {isEn ? '2. Spacing Rhythm (layout)' : '2. Ritme Spasi (layout)'}
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                {isEn
                  ? 'Rule (layout, craft floor): tight groups, generous separation, more space above a heading than below. Values here are illustrative.'
                  : 'Aturan (layout, craft floor): grup rapat, pemisahan lega, lebih banyak ruang di atas heading daripada di bawah. Nilai di sini hanya ilustrasi.'}
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
                  Arbitrary values
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
                  Deliberate scale
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
                {isEn ? '3. Audit Severity (P0-P3)' : '3. Severity Audit (P0-P3)'}
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                {isEn
                  ? 'Rule (audit): every issue is tagged P0-P3, and each dimension is scored 0-4.'
                  : 'Aturan (audit): setiap isu ditandai P0-P3, dan tiap dimensi diberi skor 0-4.'}
              </p>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2 font-mono">
                <div className="border border-destructive/40 bg-destructive/5 rounded p-2 space-y-1">
                  <span className="font-bold text-destructive block">P0: Blocking</span>
                  <p className="text-[10px] text-muted-foreground font-sans">
                    Prevents task completion. Fix immediately.
                  </p>
                </div>
                <div className="border border-amber-500/40 bg-amber-500/5 rounded p-2 space-y-1">
                  <span className="font-bold text-amber-600 dark:text-amber-400 block">P1: Major</span>
                  <p className="text-[10px] text-muted-foreground font-sans">
                    Significant difficulty or a WCAG AA violation. Fix before release.
                  </p>
                </div>
                <div className="border border-sky-500/40 bg-sky-500/5 rounded p-2 space-y-1">
                  <span className="font-bold text-sky-600 dark:text-sky-400 block">P2: Minor</span>
                  <p className="text-[10px] text-muted-foreground font-sans">
                    Annoyance, a workaround exists. Fix in the next pass.
                  </p>
                </div>
                <div className="border border-zinc-500/40 bg-zinc-500/5 rounded p-2 space-y-1">
                  <span className="font-bold text-zinc-400 block">P3: Polish</span>
                  <p className="text-[10px] text-muted-foreground font-sans">
                    Nice-to-fix, no real user impact. Fix if time permits.
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
