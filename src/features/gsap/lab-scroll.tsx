import { useCallback, useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { m } from '@/paraglide/messages.js'
import { MotionStage, PlaybackBar } from '@/features/motion/primitives'
import { usePlayback } from '@/features/motion/use-playback'

// Illustrative geometry (px inside the scroll box content).
const CONTENT_H = 920
const TRIG_TOP = 330
const TRIG_H = 420
const STAGE_H = 92

const clamp01 = (v: number) => Math.min(1, Math.max(0, v))

type Vals = { scroll: number; target: number; smooth: number }

/**
 * ScrollTrigger scrub simulation: a real scrollable box whose scroll position
 * drives two lanes. `scrub: true` = progress equals scroll; `scrub: 1` is an
 * illustrative catch-up (exponential approach), not GSAP's exact easing.
 */
export function ScrubSimulator() {
  const pb = usePlayback()
  const scrollerRef = useRef<HTMLDivElement>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const targetRef = useRef(0)
  const smoothRef = useRef(0)
  const rafRef = useRef(0)
  const autoRef = useRef(0)
  const lastRef = useRef(0)
  const pbRef = useRef(pb)
  // Keep the latest playback in a ref for the rAF loop (not written during render).
  useEffect(() => {
    pbRef.current = pb
  })
  const [vals, setVals] = useState<Vals>({ scroll: 0, target: 0, smooth: 0 })

  const step = useCallback((now: number) => {
    const dt = Math.min(64, now - (lastRef.current || now))
    lastRef.current = now
    const { reduced, speed } = pbRef.current
    const tau = 1000 / 3 / speed // ~1s to settle at 1x
    const t = targetRef.current
    let s = smoothRef.current
    s = reduced ? t : s + (t - s) * (1 - Math.exp(-dt / tau))
    const done = Math.abs(t - s) < 0.0008
    if (done) s = t
    smoothRef.current = s
    setVals((v) => ({ ...v, target: t, smooth: s }))
    if (done) {
      rafRef.current = 0
      lastRef.current = 0
    } else rafRef.current = requestAnimationFrame(step)
  }, [])

  const sync = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return
    targetRef.current = clamp01((el.scrollTop + el.clientHeight / 2 - TRIG_TOP) / TRIG_H)
    setVals((v) => ({ ...v, scroll: Math.round(el.scrollTop) }))
    if (!rafRef.current) rafRef.current = requestAnimationFrame(step)
  }, [step])

  const stopAuto = useCallback(() => {
    cancelAnimationFrame(autoRef.current)
    autoRef.current = 0
  }, [])

  const play = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return
    stopAuto()
    smoothRef.current = 0
    el.scrollTop = 0
    sync()
    const max = el.scrollHeight - el.clientHeight
    const d = pbRef.current.ms(4200)
    if (d <= 0) {
      el.scrollTop = max
      return
    }
    const t0 = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / d)
      el.scrollTop = max * (0.5 - Math.cos(Math.PI * t) / 2)
      if (t < 1) autoRef.current = requestAnimationFrame(tick)
    }
    autoRef.current = requestAnimationFrame(tick)
  }, [stopAuto, sync])

  // Replay button (skip the initial mount; the observer below plays once in view).
  const first = useRef(true)
  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    play()
  }, [pb.runKey, play])

  useEffect(() => {
    const root = rootRef.current
    if (!root || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect()
          play()
        }
      },
      { threshold: 0.6 },
    )
    io.observe(root)
    return () => io.disconnect()
  }, [play])

  useEffect(
    () => () => {
      cancelAnimationFrame(rafRef.current)
      cancelAnimationFrame(autoRef.current)
    },
    [],
  )

  const { scroll, target, smooth } = vals
  const state =
    target <= 0 ? m.gsaplab_st_before() : target >= 1 ? m.gsaplab_st_after() : m.gsaplab_st_active()
  const pct = (v: number) => `${Math.round(v * 100)}%`

  return (
    <div ref={rootRef} className="space-y-4">
      <PlaybackBar playback={pb} />
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        <MotionStage
          label={m.gsaplab_illustrative()}
          className="min-h-0 items-stretch p-3 pt-9"
        >
          <div className="relative w-full">
            <div
              ref={scrollerRef}
              tabIndex={0}
              role="region"
              aria-label={m.gsaplab_st_scroller()}
              onScroll={sync}
              onWheel={stopAuto}
              onTouchStart={stopAuto}
              onKeyDown={stopAuto}
              onPointerDown={stopAuto}
              className="h-72 overflow-y-auto overscroll-contain rounded-lg border border-border bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
            >
              <div className="relative" style={{ height: CONTENT_H }}>
                {/* sticky stage with the two lanes */}
                <div
                  className="sticky top-0 z-20 space-y-2 border-b border-border bg-card/95 px-3 py-2.5 backdrop-blur"
                  style={{ height: STAGE_H }}
                >
                  <Lane label="scrub: true" progress={target} tone="sky" />
                  <Lane label="scrub: 1" progress={smooth} ghost={target} tone="amber" />
                </div>

                <p className="text-muted-foreground absolute top-[120px] left-3 text-[11px]">
                  {m.gsaplab_st_hint()} ↓
                </p>

                {/* trigger element with start/end markers */}
                <div
                  className="absolute inset-x-3 rounded-md border border-dashed border-sky-500/50 bg-sky-500/5"
                  style={{ top: TRIG_TOP, height: TRIG_H }}
                >
                  <span className="absolute -top-px left-0 -translate-y-full rounded-t bg-sky-600 px-1.5 py-0.5 font-mono text-[10px] text-white">
                    start: &quot;top center&quot;
                  </span>
                  <span className="absolute -bottom-px right-0 translate-y-full rounded-b bg-sky-600 px-1.5 py-0.5 font-mono text-[10px] text-white">
                    end: &quot;bottom center&quot;
                  </span>
                  <span className="text-muted-foreground absolute inset-0 flex items-center justify-center font-mono text-xs">
                    {m.gsaplab_st_trigger()}
                  </span>
                </div>
              </div>
            </div>
            {/* fixed scroller-centre line (where start/end are measured) */}
            <div className="pointer-events-none absolute inset-x-0 top-1/2 z-30 flex items-center">
              <div className="h-px flex-1 bg-amber-500/80" />
              <span className="bg-amber-500 px-1.5 py-0.5 font-mono text-[10px] text-white dark:text-black">
                {m.gsaplab_st_center()}
              </span>
            </div>
            {/* progress bar */}
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-border" aria-hidden="true">
              <div
                className="h-full origin-left rounded-full bg-sky-500"
                style={{ transform: `scaleX(${target})` }}
              />
            </div>
          </div>
        </MotionStage>

        <div className="space-y-3 text-xs">
          <dl className="grid grid-cols-2 gap-2 font-mono">
            <Stat k={m.gsaplab_st_scrolled()} v={`${scroll}px`} />
            <Stat k={m.gsaplab_st_state()} v={state} />
            <Stat k={m.gsaplab_st_progress()} v={pct(target)} />
            <Stat k={m.gsaplab_st_lag()} v={`${Math.abs(Math.round((target - smooth) * 100))}%`} />
          </dl>
          <pre className="overflow-x-auto rounded-lg border border-border bg-muted/50 p-3 font-mono text-[11px] leading-relaxed">
{`gsap.to(".box", {
  x: 500,
  scrollTrigger: {
    trigger: ".box",
    start: "top center",
    end: "bottom center",
    scrub: true, // or 1
  },
});`}
          </pre>
          <ul className="space-y-1 text-muted-foreground">
            <li className="flex gap-2">
              <span className="mt-1 size-2 shrink-0 rounded-sm bg-sky-500" aria-hidden="true" />
              <span>
                <code className="text-foreground">scrub: true</code>: {m.gsaplab_st_lane_true()}
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-1 size-2 shrink-0 rounded-sm bg-amber-500" aria-hidden="true" />
              <span>
                <code className="text-foreground">scrub: 1</code>: {m.gsaplab_st_lane_1()}
              </span>
            </li>
          </ul>
          <p className="text-muted-foreground leading-relaxed">{m.gsaplab_st_note()}</p>
        </div>
      </div>
    </div>
  )
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-lg border border-border bg-card px-2.5 py-1.5">
      <dt className="text-muted-foreground text-[10px]">{k}</dt>
      <dd className="font-semibold tabular-nums">{v}</dd>
    </div>
  )
}

function Lane({
  label,
  progress,
  ghost,
  tone,
}: {
  label: string
  progress: number
  ghost?: number
  tone: "sky" | "amber"
}) {
  // box is 20% of the track wide; translateX(%) is relative to the box, so 400% = full travel.
  const fill = tone === "sky" ? "bg-sky-500" : 'bg-amber-500'
  return (
    <div className="flex items-center gap-2">
      <span className="w-[4.5rem] shrink-0 font-mono text-[10px] text-muted-foreground">{label}</span>
      <div className="relative h-7 flex-1 rounded-md bg-muted">
        {ghost !== undefined ? (
          <div
            className="absolute inset-y-0 left-0 w-1/5 rounded-md border border-dashed border-amber-500/70"
            style={{ transform: `translateX(${ghost * 400}%)` }}
          />
        ) : null}
        <div
          className={cn('absolute inset-y-0 left-0 w-1/5 rounded-md shadow-sm', fill)}
          style={{ transform: `translateX(${progress * 400}%)` }}
        />
      </div>
    </div>
  )
}
