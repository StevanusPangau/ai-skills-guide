import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { m } from '@/paraglide/messages.js'
import { EasingCurve, MotionStage } from '@/features/motion/primitives'
import type { Bezier } from '@/features/motion/easing'
import type { Playback } from '@/features/motion/use-playback'

export type PanelSpec = {
  stage: ReactNode
  /** Mono one-liner with the real values. */
  specs: string
  /** Readable caption (Paraglide). */
  desc: string
  /** Real curve + base duration (ms, before the speed multiplier). */
  curve?: { bezier: Bezier; duration: number }
}

/** Real button that lives in a demo's control row. */
export function DemoButton({
  children,
  onClick,
  pressed,
}: {
  children: ReactNode
  onClick: () => void
  pressed?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={pressed}
      className={cn(
        'rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50',
        pressed
          ? 'border-primary bg-primary text-primary-foreground'
          : 'border-border bg-card hover:border-primary/60',
      )}
    >
      {children}
    </button>
  )
}

/** Segmented group of aria-pressed buttons. */
export function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: T
  options: { value: T; label: string }[]
  onChange: (value: T) => void
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex max-w-full flex-wrap gap-0.5 rounded-lg border border-border bg-muted p-0.5"
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            'rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50',
            value === option.value
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground',
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

function Panel({
  tone,
  spec,
  playback,
}: {
  tone: 'bad' | 'good'
  spec: PanelSpec
  playback: Playback
}) {
  const label = tone === 'bad' ? m.emil_preview_before() : m.emil_preview_after()
  return (
    <div className="min-w-0 space-y-3">
      <MotionStage
        tone={tone}
        label={label}
        className="min-h-64 px-4 pt-10 pb-6 sm:min-h-72 sm:px-6"
      >
        {spec.stage}
      </MotionStage>
      <div className="flex items-start gap-3">
        {spec.curve ? (
          <div className="shrink-0 space-y-1">
            <EasingCurve
              curve={spec.curve.bezier}
              duration={playback.ms(spec.curve.duration)}
              runKey={playback.runKey}
              label={label}
              tone={tone === 'bad' ? 'bad' : 'good'}
              className="w-28"
            />
            <p className="font-mono text-[10px] text-muted-foreground">
              {m.emil_preview_duration()} {spec.curve.duration}ms
            </p>
          </div>
        ) : null}
        <div className="min-w-0 flex-1 space-y-1.5">
          <p
            className={cn(
              'rounded-md px-2 py-1.5 font-mono text-[11px] leading-snug break-words',
              tone === 'bad'
                ? 'bg-destructive/10 text-destructive'
                : 'bg-emerald-600/10 text-emerald-800 dark:text-emerald-300',
            )}
          >
            {spec.specs}
          </p>
          <p className="text-xs leading-relaxed text-muted-foreground">{spec.desc}</p>
        </div>
      </div>
    </div>
  )
}

/**
 * Before / After side by side (stacked on mobile). `note` replaces the easing
 * plot with a one-line reason when the demo has no fixed curve.
 */
export function Compare({
  before,
  after,
  playback,
  controls,
  footer,
  note,
}: {
  before: PanelSpec
  after: PanelSpec
  playback: Playback
  controls?: ReactNode
  footer?: ReactNode
  note?: string
}) {
  const hasCurve = Boolean(before.curve || after.curve)
  return (
    <div className="space-y-4">
      {controls ? <div className="flex flex-wrap items-center gap-3">{controls}</div> : null}
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel tone="bad" spec={before} playback={playback} />
        <Panel tone="good" spec={after} playback={playback} />
      </div>
      {!hasCurve && note ? (
        <p className="text-xs text-muted-foreground">{note}</p>
      ) : null}
      {footer}
    </div>
  )
}
