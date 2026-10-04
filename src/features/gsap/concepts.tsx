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
            ? 'Core mental models: a shared ticker, context teardown, and transforms over layout properties.'
            : 'Model mental inti: ticker bersama, teardown context otomatis, dan transform alih-alih properti layout.'}
        </p>
      </div>

      {/* Model 1: Ticker Engine Architecture */}
      <Card className="border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            {isEn ? 'Three Core Engine Ideas' : 'Tiga Ide Inti Engine'}
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            {isEn
              ? 'How GSAP skills expect you to think about tweens, cleanup, and what you animate.'
              : 'Cara skill GSAP mengharapkan Anda berpikir tentang tween, cleanup, dan apa yang dianimasikan.'}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-3 font-mono text-xs">
            <div className="rounded-lg border-2 border-emerald-500/70 bg-emerald-500/5 p-3 space-y-2">
              <div className="flex items-center justify-between">
                <Badge className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-[10px]">
                  TWEENS
                </Badge>
                <span className="text-[10px] text-muted-foreground">gsap-core</span>
              </div>
              <p className="font-semibold text-foreground font-sans text-xs">to · from · fromTo · set</p>
              <p className="text-[11px] text-muted-foreground leading-tight font-sans">
                {isEn
                  ? 'Tweens target elements with defaults (gsap.defaults), stagger, and easing; timelines sequence them with position parameters.'
                  : 'Tween menarget elemen dengan default (gsap.defaults), stagger, dan easing; timeline mengurutkannya dengan position parameter.'}
              </p>
            </div>

            <div className="rounded-lg border-2 border-sky-500/70 bg-sky-500/5 p-3 space-y-2">
              <div className="flex items-center justify-between">
                <Badge className="bg-sky-500/20 text-sky-600 dark:text-sky-400 border border-sky-500/30 text-[10px]">
                  REVERT
                </Badge>
                <span className="text-[10px] text-muted-foreground">context · matchMedia</span>
              </div>
              <p className="font-semibold text-foreground font-sans text-xs">Undo what you created</p>
              <p className="text-[11px] text-muted-foreground leading-tight font-sans">
                {isEn
                  ? 'gsap.context() and gsap.matchMedia() track the animations and ScrollTriggers created inside them and revert them in one call.'
                  : 'gsap.context() dan gsap.matchMedia() melacak animasi dan ScrollTrigger yang dibuat di dalamnya dan me-revert-nya dalam satu panggilan.'}
              </p>
            </div>

            <div className="rounded-lg border-2 border-purple-500/70 bg-purple-500/5 p-3 space-y-2">
              <div className="flex items-center justify-between">
                <Badge className="bg-purple-500/20 text-purple-600 dark:text-purple-400 border border-purple-500/30 text-[10px]">
                  TRANSFORMS
                </Badge>
                <span className="text-[10px] text-muted-foreground">gsap-performance</span>
              </div>
              <p className="font-semibold text-foreground font-sans text-xs">x · y · scale · rotation · opacity</p>
              <p className="text-[11px] text-muted-foreground leading-tight font-sans">
                {isEn
                  ? 'Prefer transforms and opacity over width, height, top, left, margin, or padding, which trigger layout.'
                  : 'Utamakan transform dan opacity daripada width, height, top, left, margin, atau padding yang memicu layout.'}
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
              ? 'Components must clean up animations and listeners when they unmount.'
              : 'Komponen wajib membersihkan animasi dan listener saat unmount.'}
          </p>
        </CardHeader>
        <CardContent className="space-y-3 text-xs">
          <div className="grid gap-3 md:grid-cols-2 font-mono">
            <div className="border border-destructive/30 bg-destructive/5 rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-destructive">✕ useEffect Without Cleanup</span>
                <span className="text-[10px] bg-destructive/20 text-destructive px-2 py-0.5 rounded">Unsafe</span>
              </div>
              <p className="text-muted-foreground text-[11px] font-sans leading-relaxed">
                {isEn
                  ? 'Animations and ScrollTriggers created in a raw effect keep running on detached nodes unless you revert them in cleanup.'
                  : 'Animasi dan ScrollTrigger yang dibuat di effect mentah tetap berjalan di node yang sudah lepas kecuali Anda me-revert di cleanup.'}
              </p>
            </div>

            <div className="border border-emerald-500/30 bg-emerald-500/5 rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-600 dark:text-emerald-400">✓ useGSAP Automated Revert</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded">Deterministic</span>
              </div>
              <p className="text-muted-foreground text-[11px] font-sans leading-relaxed">
                {isEn
                  ? 'Tweens and ScrollTriggers created during the hook are tracked in a context and reverted on unmount; wrap handler-created tweens in contextSafe.'
                  : 'Tween dan ScrollTrigger yang dibuat saat hook berjalan dilacak dalam context dan di-revert saat unmount; bungkus tween di event handler dengan contextSafe.'}
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
              ? 'Register each plugin before use. All GSAP plugins are free and ship in the public gsap package.'
              : 'Daftarkan setiap plugin sebelum dipakai. Semua plugin GSAP gratis dan ada di paket publik gsap.'}
          </p>
        </CardHeader>
        <CardContent className="space-y-3 text-xs">
          <div className="rounded bg-muted/40 p-3 text-muted-foreground leading-relaxed border-l-2 border-primary/50">
            <strong className="text-foreground">{isEn ? 'Core Rule: ' : 'Aturan Baku: '}</strong>
            {isEn
              ? 'Import plugins from `gsap/<Plugin>` (e.g. `gsap/ScrollTrigger`, `gsap/SplitText`) and call `gsap.registerPlugin(ScrollTrigger, Flip, Draggable)` once per app, before using them. In React, register `useGSAP` too. No Club GSAP membership, token or private registry is needed.'
              : 'Impor plugin dari `gsap/<Plugin>` (mis. `gsap/ScrollTrigger`, `gsap/SplitText`) dan panggil `gsap.registerPlugin(ScrollTrigger, Flip, Draggable)` sekali per aplikasi, sebelum dipakai. Di React, daftarkan juga `useGSAP`. Tidak perlu keanggotaan Club GSAP, token, atau registry privat.'}
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
