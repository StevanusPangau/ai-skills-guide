import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { getLocale } from '@/paraglide/runtime.js'

export function GsapConcepts() {
  const isEn = getLocale() === 'en'

  return (
    <section id="concepts" className="scroll-mt-20 space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-balance">
          {isEn ? 'GSAP Animation Architecture & Principles' : 'Arsitektur Animasi & Prinsip GSAP'}
        </h2>
        <p className="mt-1 text-muted-foreground text-sm">
          {isEn
            ? 'Core mental models: the tick engine, context teardown, and hardware-accelerated transforms.'
            : 'Model mental inti: engine ticker 60FPS, teardown konteks otomatis, dan akselerasi GPU murni.'}
        </p>
      </div>

      {/* Model 1: Ticker Engine Architecture */}
      <Card className="border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            {isEn ? 'The Unified requestAnimationFrame Ticker' : 'Engine Ticker requestAnimationFrame Terpadu'}
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            {isEn
              ? 'GSAP synchronizes all concurrent animations into a single central heartbeat loop.'
              : 'GSAP menyinkronkan seluruh animasi yang berjalan simultan ke dalam satu detak loop sentral.'}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-3 font-mono text-xs">
            <div className="rounded-lg border-2 border-emerald-500/70 bg-emerald-500/5 p-3 space-y-2">
              <div className="flex items-center justify-between">
                <Badge className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-[10px]">
                  CENTRAL HEARTBEAT
                </Badge>
                <span className="text-[10px] text-muted-foreground">Single Loop</span>
              </div>
              <p className="font-semibold text-foreground font-sans text-xs">gsap.ticker</p>
              <p className="text-[11px] text-muted-foreground leading-tight font-sans">
                {isEn
                  ? 'One global requestAnimationFrame listener updates thousands of tweens in unified batches.'
                  : 'Satu listener requestAnimationFrame global mengupdate ribuan tween dalam batch terpadu.'}
              </p>
            </div>

            <div className="rounded-lg border-2 border-sky-500/70 bg-sky-500/5 p-3 space-y-2">
              <div className="flex items-center justify-between">
                <Badge className="bg-sky-500/20 text-sky-600 dark:text-sky-400 border border-sky-500/30 text-[10px]">
                  LAG COMPENSATION
                </Badge>
                <span className="text-[10px] text-muted-foreground">Auto Catchup</span>
              </div>
              <p className="font-semibold text-foreground font-sans text-xs">Zero Frame Drift</p>
              <p className="text-[11px] text-muted-foreground leading-tight font-sans">
                {isEn
                  ? 'If background tab throttles CPU, GSAP jumps to accurate timestamps when the user returns.'
                  : 'Jika tab browser di-throttle, GSAP otomatis melompat ke timestamp akurat saat tab dibuka kembali.'}
              </p>
            </div>

            <div className="rounded-lg border-2 border-purple-500/70 bg-purple-500/5 p-3 space-y-2">
              <div className="flex items-center justify-between">
                <Badge className="bg-purple-500/20 text-purple-600 dark:text-purple-400 border border-purple-500/30 text-[10px]">
                  SUB-PIXEL PRECISION
                </Badge>
                <span className="text-[10px] text-muted-foreground">Interpolation</span>
              </div>
              <p className="font-semibold text-foreground font-sans text-xs">Smooth Easing Math</p>
              <p className="text-[11px] text-muted-foreground leading-tight font-sans">
                {isEn
                  ? 'Computes 64-bit floating point subpixel offsets for silky smooth low-speed glides.'
                  : 'Menghitung koordinat subpiksel floating-point untuk pergerakan lambat yang sangat halus.'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Model 2: Component Cleanup & Reversion */}
      <Card className="border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            {isEn ? 'Automatic Reversion Lifecycle (useGSAP & context)' : 'Siklus Hidup Revert Otomatis (useGSAP & context)'}
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            {isEn
              ? 'Components must clean up DOM mutations and event listeners when transitioning routes.'
              : 'Komponen wajib membersihkan mutasi DOM dan listener scroll saat berpindah halaman.'}
          </p>
        </CardHeader>
        <CardContent className="space-y-3 text-xs">
          <div className="grid gap-3 md:grid-cols-2 font-mono">
            <div className="border border-destructive/30 bg-destructive/5 rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-destructive">✕ Raw useEffect Memory Leak</span>
                <span className="text-[10px] bg-destructive/20 text-destructive px-2 py-0.5 rounded">Unsafe</span>
              </div>
              <p className="text-muted-foreground text-[11px] font-sans leading-relaxed">
                {isEn
                  ? 'Mounted animations persist in ticker memory. ScrollTriggers remain bound to phantom coordinates after page unmount.'
                  : 'Animasi tetap berjalan di memori ticker. ScrollTrigger tetap terikat pada koordinat fiktif setelah unmount.'}
              </p>
            </div>

            <div className="border border-emerald-500/30 bg-emerald-500/5 rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-600 dark:text-emerald-400">✓ useGSAP Automated Revert</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded">Deterministic</span>
              </div>
              <p className="text-muted-foreground text-[11px] font-sans leading-relaxed">
                {isEn
                  ? 'All child tweens and ScrollTriggers are tracked inside context and reverted to original inline styles on unmount.'
                  : 'Seluruh tween dan ScrollTrigger dipantau di dalam context dan dikembalikan ke inline style awal saat unmount.'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Model 3: Plugin Registration Gate */}
      <Card className="border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            {isEn ? 'The Plugin Registration Gate' : 'Pintu Registrasi Plugin GSAP'}
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            {isEn
              ? 'Plugins must be registered with the core engine to prevent tree-shaking drops.'
              : 'Plugin wajib didaftarkan ke engine inti agar tidak terhapus saat tree-shaking bundler.'}
          </p>
        </CardHeader>
        <CardContent className="space-y-3 text-xs">
          <div className="rounded bg-muted/40 p-3 text-muted-foreground leading-relaxed border-l-2 border-primary/50">
            <strong className="text-foreground">{isEn ? 'Core Rule: ' : 'Aturan Baku: '}</strong>
            {isEn
              ? 'Always run `gsap.registerPlugin(ScrollTrigger, Flip, Draggable)` at the file module root. This informs tree-shaking bundlers like Vite and Rollup that the plugin code is actively consumed by the GSAP core.'
              : 'Selalu panggil `gsap.registerPlugin(ScrollTrigger, Flip, Draggable)` di root modul file. Ini memberitahu bundler seperti Vite dan Rollup bahwa kode plugin aktif dikonsumsi oleh core GSAP.'}
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
