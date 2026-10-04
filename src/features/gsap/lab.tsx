import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getLocale } from '@/paraglide/runtime.js'

export function GsapTimelineLab() {
  const isEn = getLocale() === 'en'
  const [scrollProgress, setScrollProgress] = useState<number>(45)
  const [positionMode, setPositionMode] = useState<'delay' | 'relative'>('relative')
  const [renderPipeline, setRenderPipeline] = useState<'transform' | 'layout'>('transform')

  const pipelineCost =
    renderPipeline === 'transform'
      ? {
          phases: 'Composite',
          noteEn: 'Transforms and opacity keep work on the compositor and avoid layout and most paint.',
          noteId: 'Transform dan opacity menjaga pekerjaan di compositor dan menghindari layout serta sebagian besar paint.',
        }
      : {
          phases: 'Style -> Layout -> Paint -> Composite',
          noteEn: 'Layout properties trigger layout and can cause jank. Prefer x/y over left/top.',
          noteId: 'Properti layout memicu layout dan bisa menyebabkan jank. Utamakan x/y daripada left/top.',
        }

  return (
    <section id="gsap-lab" className="scroll-mt-20 space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold tracking-tight text-balance">
            {isEn ? 'Timeline Choreography & Performance Lab' : 'Lab Koreografi Timeline & Performa GSAP'}
          </h2>
          <Badge variant="secondary" className="font-mono text-xs">
            Interactive
          </Badge>
        </div>
        <p className="text-muted-foreground mt-1 text-sm">
          {isEn
            ? 'Interactive exploration of GSAP choreography: position parameter flexibility, ScrollTrigger scrubbing, and layout vs transform properties.'
            : 'Eksplorasi interaktif koreografi GSAP: fleksibilitas position parameter, scrubbing ScrollTrigger, dan properti layout vs transform.'}
        </p>
      </div>

      <div className="grid gap-6">
        {/* Module 1: ScrollTrigger Scrubber Simulator */}
        <Card className="border border-border">
          <CardHeader className="pb-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <CardTitle className="text-base font-semibold">
                  {isEn
                    ? '1. ScrollTrigger Interactive Scrub Simulator'
                    : '1. Simulator Scrubbing Interaktif ScrollTrigger'}
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {isEn
                    ? 'Rule (gsap-scrolltrigger): attach scrollTrigger once on the timeline root; a numeric scrub (e.g. scrub: 1) adds smoothing. The values below are illustrative.'
                    : 'Aturan (gsap-scrolltrigger): pasang scrollTrigger sekali pada root timeline; scrub numerik (mis. scrub: 1) menambah smoothing. Nilai di bawah hanya ilustrasi.'}
                </p>
              </div>
              <Badge variant="outline" className="font-mono text-xs">
                Scroll: {scrollProgress}%
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <div className="flex justify-between items-center font-mono">
                <span>Viewport Scroll Progress:</span>
                <span className="font-bold text-primary">{scrollProgress}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={scrollProgress}
                onChange={(e) => setScrollProgress(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>

            {/* Visual Animated Preview Track */}
            <div className="rounded-lg bg-muted/30 p-4 border border-border space-y-3">
              <div className="h-16 w-full bg-secondary/60 rounded-lg relative overflow-hidden flex items-center px-4">
                <div
                  className="size-10 rounded-lg bg-primary text-primary-foreground font-bold flex items-center justify-center text-xs shadow-md transition-all duration-75"
                  style={{
                    transform: `translateX(${scrollProgress * 2.2}px) rotate(${scrollProgress * 3.6}deg) scale(${
                      1 + (scrollProgress / 100) * 0.4
                    })`,
                  }}
                >
                  GSAP
                </div>
              </div>
              <div className="flex justify-between text-[11px] font-mono text-muted-foreground">
                <span>start: &quot;top bottom&quot; (0%)</span>
                <span>center (50%)</span>
                <span>end: &quot;bottom top&quot; (100%)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Module 2 & 3 */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Module 2: Position Parameter vs Hardcoded Delays */}
          <Card className="border border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">
                {isEn ? '2. Position Parameter vs Brittle Delays' : '2. Position Parameter vs Delay Rapuh'}
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                {isEn
                  ? 'Rule: gsap-timeline — position syntax ("<", ">", "-=0.2") makes choreography elastic.'
                  : 'Aturan: gsap-timeline — sintaks posisi ("<", ">", "-=0.2") membuat koreografi elastis.'}
              </p>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              <div className="flex gap-2 font-mono">
                <button
                  type="button"
                  onClick={() => setPositionMode('delay')}
                  className={`flex-1 py-1.5 rounded border transition-colors ${
                    positionMode === 'delay'
                      ? 'border-destructive bg-destructive/10 text-destructive font-bold'
                      : 'border-border text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Hardcoded delay: 1.2s
                </button>
                <button
                  type="button"
                  onClick={() => setPositionMode('relative')}
                  className={`flex-1 py-1.5 rounded border transition-colors ${
                    positionMode === 'relative'
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold'
                      : 'border-border text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Position: &quot;&lt;0.2&quot;
                </button>
              </div>

              {positionMode === 'delay' ? (
                <div className="border border-destructive/30 bg-destructive/5 rounded p-3 space-y-1.5">
                  <span className="font-bold text-destructive block">
                    ✕ Brittle Manual Delay Math
                  </span>
                  <p className="text-muted-foreground text-[11px] leading-relaxed">
                    {isEn
                      ? 'Changing step 1 duration from 1s to 2s breaks timing on all subsequent steps; requires manual recalculation.'
                      : 'Mengubah durasi langkah 1 dari 1s ke 2s merusak timing semua langkah berikutnya; butuh kalkulasi ulang manual.'}
                  </p>
                </div>
              ) : (
                <div className="border border-emerald-500/30 bg-emerald-500/5 rounded p-3 space-y-1.5">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 block">
                    ✓ Elastic Relative Choreography
                  </span>
                  <p className="text-muted-foreground text-[11px] leading-relaxed">
                    {isEn
                      ? '`<0.2` begins 200ms after step 1 starts. Expanding step 1 duration automatically cascades downstream.'
                      : '`<0.2` mulai 200ms setelah langkah 1 dimulai. Memperpanjang langkah 1 otomatis mengalirkan jeda ke bawah.'}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Module 3: Render Pipeline Costs */}
          <Card className="border border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">
                {isEn ? '3. Layout vs Compositor' : '3. Layout vs Compositor'}
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                {isEn
                  ? 'Rule (gsap-performance): animate transforms and opacity instead of layout properties.'
                  : 'Aturan (gsap-performance): animasikan transform dan opacity, bukan properti layout.'}
              </p>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              <div className="flex gap-2 font-mono">
                <button
                  type="button"
                  onClick={() => setRenderPipeline('transform')}
                  className={`flex-1 py-1.5 rounded border transition-colors ${
                    renderPipeline === 'transform'
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold'
                      : 'border-border text-muted-foreground hover:text-foreground'
                  }`}
                >
                  x: 100, y: 50
                </button>
                <button
                  type="button"
                  onClick={() => setRenderPipeline('layout')}
                  className={`flex-1 py-1.5 rounded border transition-colors ${
                    renderPipeline === 'layout'
                      ? 'border-destructive bg-destructive/10 text-destructive font-bold'
                      : 'border-border text-muted-foreground hover:text-foreground'
                  }`}
                >
                  left: 100, top: 50
                </button>
              </div>

              <div className="rounded-lg bg-card border border-border p-3 space-y-2">
                <div className="flex justify-between items-center font-mono">
                  <span className="text-muted-foreground">Browser Pipeline:</span>
                  <Badge variant="outline" className="font-mono text-[10px]">
                    {pipelineCost.phases}
                  </Badge>
                </div>
                <p className="text-[11px] leading-relaxed text-muted-foreground">
                  {isEn ? pipelineCost.noteEn : pipelineCost.noteId}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
