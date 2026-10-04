import { useEffect, useId, useMemo, useRef, type ReactNode } from 'react'
import { RiRestartLine } from '@remixicon/react'
import { cn } from '@/lib/utils'
import { m } from '@/paraglide/messages.js'
import { bezierCss, bezierProgress, type Bezier } from './easing'
import { SPEEDS, type Playback } from './use-playback'

export function PlaybackBar({
  playback,
  className,
}: {
  playback: Playback
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-2 text-xs',
        className,
      )}
    >
      <button
        type="button"
        onClick={playback.replay}
        className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1.5 font-medium transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
      >
        <RiRestartLine className="size-3.5" aria-hidden="true" />
        {m.motion_replay()}
      </button>
      <div
        role="group"
        aria-label={m.motion_speed()}
        className="inline-flex rounded-md border border-border bg-muted p-0.5"
      >
        {SPEEDS.map((s) => (
          <button
            key={s}
            type="button"
            aria-pressed={playback.speed === s}
            onClick={() => playback.setSpeed(s)}
            className={cn(
              'rounded px-2 py-1 font-mono transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50',
              playback.speed === s
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {s}×
          </button>
        ))}
      </div>
      {playback.reduced ? (
        <span className="rounded-md border border-amber-500/40 bg-amber-500/10 px-2 py-1 text-amber-700 dark:text-amber-400">
          {m.motion_reduced_note()}
        </span>
      ) : null}
    </div>
  )
}

/** Dotted-grid canvas that gives every demo the same "stage" feel. */
export function MotionStage({
  children,
  label,
  tone = 'neutral',
  className,
}: {
  children: ReactNode
  /** Small corner caption, e.g. "Before" / "After". */
  label?: string
  tone?: 'neutral' | 'bad' | 'good'
  className?: string
}) {
  return (
    <div
      className={cn(
        'relative isolate flex min-h-56 items-center justify-center overflow-hidden rounded-xl border p-6',
        '[background-image:radial-gradient(var(--border)_1px,transparent_1px)] [background-size:16px_16px]',
        tone === 'neutral' && 'border-border bg-muted/40',
        tone === 'bad' && 'border-destructive/30 bg-destructive/5',
        tone === 'good' &&
          'border-emerald-600/30 bg-emerald-600/5 dark:border-emerald-400/30 dark:bg-emerald-400/5',
        className,
      )}
    >
      {label ? (
        <span
          className={cn(
            'absolute top-2.5 left-3 z-10 rounded-md px-1.5 py-0.5 font-mono text-[10px] font-semibold tracking-wide uppercase',
            tone === 'bad' && 'bg-destructive/10 text-destructive',
            tone === 'good' &&
              'bg-emerald-600/10 text-emerald-700 dark:text-emerald-400',
            tone === 'neutral' && 'bg-muted text-muted-foreground',
          )}
        >
          {label}
        </span>
      ) : null}
      {children}
    </div>
  )
}

/**
 * Plots a cubic-bezier and runs a dot along it for `duration` ms whenever
 * `runKey` changes, so people can see what the curve does to progress over time.
 */
export function EasingCurve({
  curve,
  duration,
  runKey,
  label,
  tone = 'good',
  className,
}: {
  curve: Bezier
  /** Already speed-scaled duration in ms. */
  duration: number
  runKey: number
  label: string
  tone?: 'good' | 'bad' | 'neutral'
  className?: string
}) {
  const titleId = useId()
  const dotRef = useRef<SVGCircleElement>(null)
  const size = 120
  const pad = 10
  const inner = size - pad * 2
  const x = (t: number) => pad + t * inner
  const y = (p: number) => size - pad - p * inner

  const path = useMemo(() => {
    const pts: string[] = []
    for (let i = 0; i <= 40; i++) {
      const t = i / 40
      pts.push(`${i === 0 ? 'M' : 'L'}${x(t).toFixed(1)},${y(bezierProgress(curve, t)).toFixed(1)}`)
    }
    return pts.join(' ')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curve])

  useEffect(() => {
    const dot = dotRef.current
    if (!dot) return
    if (duration <= 0) {
      dot.setAttribute('cx', String(x(1)))
      dot.setAttribute('cy', String(y(1)))
      return
    }
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      dot.setAttribute('cx', x(t).toFixed(1))
      dot.setAttribute('cy', y(bezierProgress(curve, t)).toFixed(1))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runKey, duration, curve])

  const stroke =
    tone === 'bad'
      ? 'var(--destructive)'
      : tone === 'good'
        ? 'oklch(0.62 0.17 155)'
        : 'var(--muted-foreground)'

  return (
    <figure className={cn('space-y-1.5', className)}>
      <svg
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-labelledby={titleId}
        className="w-full max-w-[9rem] rounded-lg border border-border bg-card"
      >
        <title id={titleId}>{`${label}: ${bezierCss(curve)}`}</title>
        <path
          d={`M${x(0)},${y(0)} L${x(1)},${y(1)}`}
          stroke="var(--border)"
          strokeDasharray="3 3"
          fill="none"
        />
        <path d={path} stroke={stroke} strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle ref={dotRef} r="4" cx={x(0)} cy={y(0)} fill={stroke} />
      </svg>
      <figcaption className="font-mono text-[10px] leading-snug text-muted-foreground">
        <span className="block font-semibold text-foreground">{label}</span>
        {bezierCss(curve)}
      </figcaption>
    </figure>
  )
}
