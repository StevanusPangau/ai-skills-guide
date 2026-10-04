import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { cn } from '@/lib/utils'
import { m } from '@/paraglide/messages.js'
import { MotionStage, PlaybackBar } from '@/features/motion/primitives'
import { usePlayback } from '@/features/motion/use-playback'

type Kind = 'absolute' | 'relative' | 'label' | 'start' | 'end'
type Parsed = { start: number; kind: Kind } | null

const B_DUR = 0.5
const C_DUR = 0.3
const LABEL_OFFSET = 0.5 // tl.addLabel("outro", "+=0.5")
const PRESETS = ['<', '>', '+=0.5', '-=0.2', '1', 'outro', 'outro+=0.3', '<0.2'] as const
const num = '(\\d*\\.?\\d+)'

/** Resolve a position string per the gsap-timeline skill. `r` holds the already-placed tweens. */
function parsePosition(
  raw: string,
  r: { prevStart: number; prevEnd: number; tlEnd: number; label: number },
): Parsed {
  const p = raw.trim()
  if (/^-?\d*\.?\d+$/.test(p)) return { start: Math.max(0, parseFloat(p)), kind: 'absolute' }
  let mt = p.match(new RegExp(`^([+-])=${num}$`))
  if (mt) return { start: Math.max(0, r.tlEnd + (mt[1] === '-' ? -1 : 1) * parseFloat(mt[2])), kind: 'relative' }
  mt = p.match(new RegExp(`^([<>])(-?${num})?$`))
  if (mt) {
    const base = mt[1] === '<' ? r.prevStart : r.prevEnd
    return { start: Math.max(0, base + (mt[2] ? parseFloat(mt[2]) : 0)), kind: mt[1] === '<' ? 'start' : 'end' }
  }
  mt = p.match(new RegExp(`^outro(?:([+-])=${num})?$`))
  if (mt) return { start: Math.max(0, r.label + (mt[1] ? (mt[1] === '-' ? -1 : 1) * parseFloat(mt[2]) : 0)), kind: 'label' }
  return null
}

const r2 = (v: number) => Math.round(v * 100) / 100
const fmt = (v: number) => String(r2(v))

type Row = { sel: string; vars: string; start: number; dur: number; color: string; fill: string }

export function PositionTimeline() {
  const pb = usePlayback()
  const [aDur, setADur] = useState<1 | 2>(1)
  const [pos, setPos] = useState('<')
  const [custom, setCustom] = useState('')
  const [lastValid, setLastValid] = useState('<')

  const model = useMemo(() => {
    const aEnd = aDur
    const bStart = aEnd // default ">" after .a
    const bEnd = bStart + B_DUR
    const label = Math.max(aEnd, bEnd) + LABEL_OFFSET
    const ctx = { prevStart: bStart, prevEnd: bEnd, tlEnd: Math.max(aEnd, bEnd), label }
    const parsed = parsePosition(pos, ctx)
    const used = parsed ? pos : lastValid
    const eff = parsed ?? parsePosition(used, ctx) ?? { start: bEnd, kind: 'end' as Kind }
    const rows: Row[] = [
      { sel: '.a', vars: `x: 100, duration: ${aDur}`, start: 0, dur: aDur, color: 'bg-sky-500/25 border-sky-500/50', fill: 'bg-sky-500' },
      { sel: '.b', vars: `y: 50, duration: ${B_DUR}`, start: bStart, dur: B_DUR, color: 'bg-violet-500/25 border-violet-500/50', fill: 'bg-violet-500' },
      { sel: '.c', vars: `opacity: 0, duration: ${C_DUR}`, start: eff.start, dur: C_DUR, color: 'bg-amber-500/25 border-amber-500/50', fill: 'bg-amber-500' },
    ]
    const end = Math.max(...rows.map((x) => x.start + x.dur))
    return { rows, label, eff, valid: parsed !== null, used, end, scale: Math.max(4, Math.ceil(end + 0.5)) }
  }, [aDur, pos, lastValid])

  useEffect(() => {
    if (model.valid) setLastValid(pos)
  }, [model.valid, pos])

  // playhead: drives --ph (seconds) on the track container
  const trackRef = useRef<HTMLDivElement>(null)
  const { runKey, ms } = pb
  const end = model.end
  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const d = ms(end * 1000)
    if (d <= 0) {
      el.style.setProperty('--ph', String(end))
      return
    }
    let raf = 0
    const t0 = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / d)
      el.style.setProperty('--ph', String(end * t))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [runKey, ms, end, aDur, pos])

  const c = model.rows[2]
  const posArg = `, "${model.used}"`
  const kindMsg = {
    absolute: m.gsaplab_tl_k_absolute,
    relative: m.gsaplab_tl_k_relative,
    label: m.gsaplab_tl_k_label,
    start: m.gsaplab_tl_k_start,
    end: m.gsaplab_tl_k_end,
  }[model.eff.kind]()
  const pct = (v: number) => `${(v / model.scale) * 100}%`
  const ticks = Array.from({ length: Math.floor(model.scale * 2) + 1 }, (_, i) => i / 2)

  return (
    <div className="space-y-4">
      <PlaybackBar playback={pb} />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
        <MotionStage className="min-h-0 items-stretch p-3 pt-9 sm:p-4 sm:pt-9" label="timeline">
          <div
            ref={trackRef}
            className="w-full space-y-2.5"
            style={{ '--ph': 0 } as CSSProperties}
            role="img"
            aria-label={m.gsaplab_tl_ruler()}
          >
            {/* ruler */}
            <div className="relative h-5 border-b border-border font-mono text-[10px] text-muted-foreground">
              {ticks.map((t) => (
                <span
                  key={t}
                  className="absolute bottom-0 -translate-x-1/2"
                  style={{ left: pct(t) }}
                >
                  {Number.isInteger(t) ? (
                    <span className="block pb-0.5">{t}s</span>
                  ) : (
                    <span className="block h-1.5 w-px bg-border" />
                  )}
                </span>
              ))}
            </div>
            <div className="relative space-y-2.5">
              {/* grid lines */}
              {ticks.map((t) => (
                <span
                  key={t}
                  className={cn('absolute inset-y-0 w-px', Number.isInteger(t) ? 'bg-border' : 'bg-border/40')}
                  style={{ left: pct(t) }}
                  aria-hidden="true"
                />
              ))}
              {/* label marker */}
              <span
                className="absolute inset-y-0 z-10 border-l border-dashed border-emerald-600 dark:border-emerald-400"
                style={{ left: pct(model.label) }}
                aria-hidden="true"
              >
                <span className="absolute top-0 left-1 rounded bg-emerald-600/15 px-1 font-mono text-[10px] whitespace-nowrap text-emerald-700 dark:text-emerald-400">
                  outro {fmt(model.label)}s
                </span>
              </span>
              {model.rows.map((row, i) => (
                <div key={row.sel} className="relative z-[1]">
                  <div className="relative z-30 mb-0.5 w-fit rounded bg-background/80 px-0.5 font-mono text-[10px] text-muted-foreground">
                    <b className="text-foreground">{row.sel}</b> {row.vars}
                  </div>
                  <div className="relative h-7">
                    <div
                      className={cn(
                        'absolute inset-y-0 overflow-hidden rounded-md border transition-[left,width] duration-300 motion-reduce:transition-none',
                        row.color,
                        i === 2 && 'ring-1 ring-amber-500/60',
                      )}
                      style={{ left: pct(row.start), width: pct(row.dur) }}
                    >
                      <div
                        className={cn('absolute inset-y-0 left-0 opacity-80', row.fill)}
                        style={{
                          width: `clamp(0%, calc((var(--ph) - ${row.start}) / ${row.dur} * 100%), 100%)`,
                        }}
                      />
                    </div>
                    <span
                      className="absolute z-30 top-1/2 -translate-y-1/2 rounded bg-background/80 px-1 font-mono text-[10px] whitespace-nowrap text-foreground/80 transition-[left] duration-300 motion-reduce:transition-none"
                      style={{ left: `calc(${pct(row.start + row.dur)} + 0px)` }}
                    >
                      {fmt(row.start)}–{fmt(row.start + row.dur)}s
                    </span>
                  </div>
                </div>
              ))}
              {/* playhead */}
              <span
                className="pointer-events-none absolute inset-y-0 z-20 w-0.5 bg-foreground/80"
                style={{ left: `calc(var(--ph) / ${model.scale} * 100%)` }}
                aria-hidden="true"
              />
            </div>
          </div>
        </MotionStage>

        <div className="space-y-3 text-xs">
          <fieldset className="space-y-1.5">
            <legend className="mb-1 font-medium">{m.gsaplab_tl_pos()}</legend>
            <div className="flex flex-wrap gap-1.5">
              {PRESETS.map((p) => (
                <button
                  key={p}
                  type="button"
                  aria-pressed={pos === p}
                  onClick={() => {
                    setPos(p)
                    setCustom('')
                  }}
                  className={cn(
                    'rounded-md border px-2 py-1 font-mono transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50',
                    pos === p
                      ? 'border-primary bg-primary/10 text-foreground'
                      : 'border-border bg-card text-muted-foreground hover:text-foreground',
                  )}
                >
                  {p}
                </button>
              ))}
            </div>
            <input
              type="text"
              value={custom}
              placeholder={m.gsaplab_tl_custom()}
              aria-label={m.gsaplab_tl_custom()}
              spellCheck={false}
              autoCapitalize="none"
              onChange={(e) => {
                setCustom(e.target.value)
                if (e.target.value.trim()) setPos(e.target.value.trim())
              }}
              className="w-full rounded-md border border-border bg-background px-2.5 py-1.5 font-mono focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
            />
          </fieldset>

          <div className="flex flex-wrap items-center gap-2">
            <span className="font-medium">{m.gsaplab_tl_adur()}</span>
            <div role="group" className="inline-flex rounded-md border border-border bg-muted p-0.5">
              {([1, 2] as const).map((d) => (
                <button
                  key={d}
                  type="button"
                  aria-pressed={aDur === d}
                  onClick={() => setADur(d)}
                  className={cn(
                    'rounded px-2 py-1 font-mono transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50',
                    aDur === d ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  {d}s
                </button>
              ))}
            </div>
          </div>

          <pre className="overflow-x-auto rounded-lg border border-border bg-muted/50 p-3 font-mono text-[11px] leading-relaxed">
{`tl.to(".a", { x: 100, duration: ${aDur} })
  .to(".b", { y: 50, duration: ${B_DUR} })
  .addLabel("outro", "+=${LABEL_OFFSET}")
  .to(".c", { opacity: 0, duration: ${C_DUR} }${posArg});`}
          </pre>

          {!model.valid ? (
            <p role="status" className="rounded-md border border-destructive/30 bg-destructive/5 px-2.5 py-1.5 text-destructive">
              {m.gsaplab_tl_invalid({ pos: model.used })}
            </p>
          ) : null}
          <p role="status" className="text-foreground">
            {m.gsaplab_tl_result({ start: fmt(c.start), end: fmt(c.start + c.dur), total: fmt(model.end) })}
          </p>
          <p className="text-muted-foreground leading-relaxed">{kindMsg}</p>
          <p className="text-muted-foreground leading-relaxed">{m.gsaplab_tl_note()}</p>
        </div>
      </div>
    </div>
  )
}
