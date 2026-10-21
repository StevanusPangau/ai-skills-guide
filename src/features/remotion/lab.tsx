import { useMemo, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getLocale } from '@/paraglide/runtime.js'

type Fps = 24 | 30 | 60

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

/** Diagram-only stand-in for Remotion interpolate(..., { extrapolateLeft/Right: 'clamp' }). */
function interpolateOpacity(frame: number, fps: number): number {
  const start = 0
  const end = 2 * fps
  if (end === start) return 0
  const t = clamp((frame - start) / (end - start), 0, 1)
  return t
}

export function RemotionFrameLab() {
  const isEn = getLocale() === 'en'
  const [fps, setFps] = useState<Fps>(30)
  const [frame, setFrame] = useState(0)

  const maxFrame = 4 * fps
  const safeFrame = clamp(frame, 0, maxFrame)
  const opacity = useMemo(() => interpolateOpacity(safeFrame, fps), [safeFrame, fps])

  const setFpsAndClampFrame = (next: Fps) => {
    setFps(next)
    setFrame((f) => clamp(f, 0, 4 * next))
  }

  const formula = `opacity = interpolate(frame, [0, 2 * fps], [0, 1])  // clamp`

  return (
    <section id="remotion-lab" className="scroll-mt-20 space-y-6">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-2xl font-bold tracking-tight text-balance">
            {isEn ? 'Frame timing lab' : 'Lab timing frame'}
          </h2>
          <Badge variant="secondary" className="font-mono text-xs">
            Diagram
          </Badge>
        </div>
        <p className="text-muted-foreground mt-1 text-sm max-w-2xl">
          {isEn
            ? 'Interactive diagram of Remotion’s frame clock. Scrub the frame; nothing autoplays. CSS transitions do not render in Remotion — rewrite them with interpolate().'
            : 'Diagram interaktif frame clock Remotion. Geser frame; tidak ada autoplay. Transisi CSS tidak merender di Remotion — tulis ulang dengan interpolate().'}
        </p>
      </div>

      <Card className="border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            {isEn ? 'Opacity fade over 2 × fps frames' : 'Fade opacity selama 2 × fps frame'}
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            {isEn
              ? 'Rule from remotion-markup: take fps from useVideoConfig(); drive style with useCurrentFrame() + interpolate().'
              : 'Aturan remotion-markup: ambil fps dari useVideoConfig(); gerakkan style dengan useCurrentFrame() + interpolate().'}
          </p>
        </CardHeader>
        <CardContent className="space-y-5">
          <fieldset className="space-y-2">
            <legend className="text-xs font-medium text-foreground">
              {isEn ? 'Composition fps' : 'fps composition'}
            </legend>
            <div
              className="flex flex-wrap gap-1.5 rounded-lg border border-border bg-muted/60 p-1 w-fit max-w-full"
              role="radiogroup"
              aria-label={isEn ? 'Frames per second' : 'Frame per detik'}
            >
              {([24, 30, 60] as const).map((value) => {
                const selected = fps === value
                return (
                  <button
                    key={value}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setFpsAndClampFrame(value)}
                    className={`rounded px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                      selected
                        ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-semibold shadow-xs'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {value} fps
                  </button>
                )
              })}
            </div>
          </fieldset>

          <div className="space-y-2">
            <label htmlFor="remotion-frame-slider" className="text-xs font-medium text-foreground">
              {isEn ? `Frame (0 – ${maxFrame})` : `Frame (0 – ${maxFrame})`}
            </label>
            <input
              id="remotion-frame-slider"
              type="range"
              min={0}
              max={maxFrame}
              step={1}
              value={safeFrame}
              onChange={(e) => setFrame(Number(e.target.value))}
              className="w-full max-w-full accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
              aria-valuemin={0}
              aria-valuemax={maxFrame}
              aria-valuenow={safeFrame}
              aria-valuetext={`frame ${safeFrame}, opacity ${opacity.toFixed(2)}`}
            />
            <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-muted-foreground">
              <span>
                frame = <span className="text-foreground font-semibold">{safeFrame}</span>
              </span>
              <span>
                fps = <span className="text-foreground font-semibold">{fps}</span>
              </span>
              <span>
                2 × fps = <span className="text-foreground font-semibold">{2 * fps}</span>
              </span>
              <span>
                opacity = <span className="text-foreground font-semibold">{opacity.toFixed(3)}</span>
              </span>
            </div>
          </div>

          <pre className="overflow-x-auto rounded-lg border border-border bg-muted/40 p-3 font-mono text-[11px] leading-relaxed text-foreground whitespace-pre-wrap break-all sm:break-normal">
            {formula}
            {'\n'}
            {`// fps = ${fps}, frame = ${safeFrame} → opacity ≈ ${opacity.toFixed(3)}`}
          </pre>

          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <div
              className="mx-auto flex size-28 shrink-0 items-center justify-center rounded-xl border border-border bg-sky-500/80 text-xs font-semibold text-sky-950 dark:text-sky-50 sm:mx-0"
              style={{ opacity }}
              aria-hidden="true"
            >
              fade box
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground min-w-0">
              {isEn
                ? 'This box’s opacity follows the clamped interpolate() above. It is a timing-model diagram only — not a Remotion runtime. Prefer CSS scale / translate / rotate over a transform string in real compositions.'
                : 'Opacity kotak ini mengikuti interpolate() ter-clamp di atas. Ini hanya diagram model timing — bukan runtime Remotion. Di composition nyata, prefer CSS scale / translate / rotate daripada string transform.'}
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
