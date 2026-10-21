import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { getLocale } from '@/paraglide/runtime.js'

export function RemotionConcepts() {
  const isEn = getLocale() === 'en'

  return (
    <section id="concepts" className="scroll-mt-20 space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-balance">
          {isEn ? 'Remotion mental models' : 'Model mental Remotion'}
        </h2>
        <p className="mt-1 text-muted-foreground text-sm">
          {isEn
            ? 'Three ideas from the official skills: the frame clock, Studio-before-render, and the router skill.'
            : 'Tiga gagasan dari skill resmi: frame clock, Studio sebelum render, dan skill router.'}
        </p>
      </div>

      <Card className="border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            {isEn ? 'Frame clock vs CSS animation' : 'Frame clock vs animasi CSS'}
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            {isEn
              ? 'Drive motion with useCurrentFrame() and interpolate(); CSS transitions do not render.'
              : 'Gerakkan animasi dengan useCurrentFrame() dan interpolate(); transisi CSS tidak merender.'}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2 font-mono text-xs">
            <div className="rounded-lg border-2 border-emerald-500/70 bg-emerald-500/5 p-3 space-y-2">
              <div className="flex items-center justify-between">
                <Badge className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-[10px]">
                  RENDERS
                </Badge>
                <span className="text-[10px] text-muted-foreground">Frame clock</span>
              </div>
              <p className="font-semibold text-foreground font-sans text-xs">
                useCurrentFrame + interpolate
              </p>
              <p className="text-[11px] text-muted-foreground leading-tight font-sans">
                {isEn
                  ? 'Take fps from useVideoConfig() for seconds-to-frames (including trimBefore and durationInFrames). Keep interpolate() inline; prefer scale / translate / rotate with output: \'perceptual-scale\' for scale.'
                  : 'Ambil fps dari useVideoConfig() untuk detik-ke-frame (termasuk trimBefore dan durationInFrames). Biarkan interpolate() inline; prefer scale / translate / rotate dengan output: \'perceptual-scale\' untuk scale.'}
              </p>
            </div>

            <div className="rounded-lg border-2 border-amber-500/70 bg-amber-500/5 p-3 space-y-2">
              <div className="flex items-center justify-between">
                <Badge className="bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 text-[10px]">
                  DOES NOT RENDER
                </Badge>
                <span className="text-[10px] text-muted-foreground">Rewrite</span>
              </div>
              <p className="font-semibold text-foreground font-sans text-xs">
                CSS transition / animation / Tailwind animate-*
              </p>
              <p className="text-[11px] text-muted-foreground leading-tight font-sans">
                {isEn
                  ? 'These play in a browser tab but do not bake into Remotion frames. Refactor them to interpolate()-driven style props.'
                  : 'Ini bisa terlihat di tab browser tetapi tidak masuk ke frame Remotion. Refaktor ke style props yang digerakkan interpolate().'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            {isEn ? 'Studio before render' : 'Studio sebelum render'}
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            {isEn
              ? '“Make a video” means open an interactive preview, not export an MP4 by default.'
              : '“Buat video” berarti buka preview interaktif, bukan mengekspor MP4 secara default.'}
          </p>
        </CardHeader>
        <CardContent className="space-y-3 text-xs">
          <div className="grid gap-3 md:grid-cols-2 font-mono">
            <div className="border border-emerald-500/30 rounded-lg p-3 bg-emerald-500/5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  npx remotion studio
                </span>
                <Badge className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px]">
                  Default
                </Badge>
              </div>
              <p className="text-muted-foreground text-[11px] font-sans leading-relaxed">
                {isEn
                  ? 'Start Studio as soon as the project can run. Keep it open while editing. Use --no-open only for in-app browsers, then open the printed URL.'
                  : 'Mulai Studio segera setelah proyek bisa dijalankan. Biarkan terbuka saat mengedit. --no-open hanya untuk browser in-app, lalu buka URL yang dicetak.'}
              </p>
            </div>

            <div className="border border-border rounded-lg p-3 bg-muted/20 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground">npx remotion render</span>
                <Badge variant="outline" className="text-[10px]">
                  Explicit ask
                </Badge>
              </div>
              <p className="text-muted-foreground text-[11px] font-sans leading-relaxed">
                {isEn
                  ? 'Only when the user clearly asks to render, export, or get an MP4. The Studio UI is often the more intuitive render path.'
                  : 'Hanya jika pengguna jelas meminta render, export, atau MP4. UI Studio sering lebih intuitif untuk render.'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      <Card className="border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            {isEn ? 'Router skill: remotion-best-practices' : 'Skill router: remotion-best-practices'}
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            {isEn
              ? 'When the right specialist skill is unclear, load the router; it points at create, markup, maps, captions, studio, render, saas, docs, and upgrade.'
              : 'Jika skill khusus belum jelas, muat router; ia mengarah ke create, markup, maps, captions, studio, render, saas, docs, dan upgrade.'}
          </p>
        </CardHeader>
        <CardContent className="space-y-3 text-xs">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg border-2 border-sky-500/70 bg-sky-500/5 p-3 space-y-1.5">
              <Badge className="bg-sky-500/20 text-sky-600 dark:text-sky-400 border border-sky-500/30 text-[10px]">
                ROUTER
              </Badge>
              <p className="font-semibold text-foreground font-mono text-xs">remotion-best-practices</p>
              <p className="text-muted-foreground leading-relaxed font-sans">
                {isEn
                  ? 'Model-invoked map from a vague Remotion ask to the matching specialist skill.'
                  : 'Pemetaan model-invoked dari permintaan Remotion umum ke skill khusus yang cocok.'}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-3 space-y-1.5 sm:col-span-2">
              <p className="font-semibold text-foreground font-mono text-xs">/remotion-*</p>
              <p className="text-muted-foreground leading-relaxed">
                {isEn
                  ? 'README documents slash prompts such as /remotion-create, /remotion-markup, and /remotion-studio. Those specialist skills are user-invoked; the router loads them when the path is ambiguous.'
                  : 'README mendokumentasikan slash prompt seperti /remotion-create, /remotion-markup, dan /remotion-studio. Skill khusus itu user-invoked; router memuatnya saat jalur masih ambigu.'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
