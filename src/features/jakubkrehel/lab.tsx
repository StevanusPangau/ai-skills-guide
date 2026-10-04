import { useEffect, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { m } from '@/paraglide/messages.js'
import { MotionStage, PlaybackBar } from '@/features/motion/primitives'
import { usePlayback, type Playback } from '@/features/motion/use-playback'

/** Stage + caption, shared by every Wrong/Right pair. */
function Side({
  tone,
  caption,
  children,
}: {
  tone: 'bad' | 'good'
  caption: ReactNode
  children: ReactNode
}) {
  return (
    <div className="min-w-0 space-y-2">
      <MotionStage
        tone={tone}
        label={tone === 'bad' ? m.jakub_lab_wrong_label() : m.jakub_lab_right_label()}
        className="min-h-60 pt-9"
      >
        {children}
      </MotionStage>
      <p className="font-mono text-[11px] leading-snug text-muted-foreground">{caption}</p>
    </div>
  )
}

function Demo({
  title,
  rule,
  body,
  controls,
  children,
}: {
  title: string
  rule: string
  body: string
  controls?: ReactNode
  children: ReactNode
}) {
  return (
    <article className="space-y-4 rounded-xl border border-border bg-card p-4 shadow-xs sm:p-6">
      <header className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-mono text-base font-semibold">{title}</h3>
          <code className="rounded bg-primary/10 px-2 py-0.5 font-mono text-xs font-bold text-primary">
            {rule}
          </code>
        </div>
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">{body}</p>
      </header>
      {controls}
      <div className="grid gap-4 lg:grid-cols-2">{children}</div>
    </article>
  )
}

function Slider({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  onChange: (v: number) => void
}) {
  return (
    <label className="flex items-center gap-3 font-mono text-xs">
      <span className="w-32 shrink-0">
        {label}: <b>{value}px</b>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="min-w-0 flex-1 accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
      />
    </label>
  )
}

/* ---------- 1. Concentric radius ---------- */

function RadiusDemo() {
  const [padding, setPadding] = useState(16)
  const [outer, setOuter] = useState(24)
  // better-ui surfaces.md: outerRadius = innerRadius + padding
  const inner = Math.max(0, outer - padding)
  const box = (innerRadius: number, good: boolean) => (
    <div
      className="flex h-32 w-full max-w-60 items-stretch border border-border bg-card shadow-sm"
      style={{ borderRadius: outer, padding }}
    >
      <div
        className={cn(
          'flex flex-1 items-center justify-center border font-mono text-[10px]',
          good
            ? 'border-emerald-500/50 bg-emerald-500/15 text-emerald-700 dark:text-emerald-400'
            : 'border-destructive/50 bg-destructive/15 text-destructive',
        )}
        style={{ borderRadius: innerRadius }}
      >
        {good ? m.jakub_lab_right_box() : m.jakub_lab_wrong_box()}
      </div>
    </div>
  )
  return (
    <Demo
      title={m.jakub_lab_radius_title()}
      rule={m.jakub_lab_radius_rule()}
      body={m.jakub_lab_radius_body()}
      controls={
        <div className="space-y-2 rounded-lg border border-border bg-muted/40 p-3">
          <div className="grid gap-2 sm:grid-cols-2 sm:gap-6">
            <Slider label={m.jakub_lab_outer_radius()} value={outer} min={12} max={48} onChange={setOuter} />
            <Slider label={m.jakub_lab_padding()} value={padding} min={4} max={32} onChange={setPadding} />
          </div>
          <p className="font-mono text-xs font-semibold text-emerald-700 dark:text-emerald-400" aria-live="polite">
            {m.jakub_lab_radius_live({ outer: String(outer), inner: String(inner), pad: String(padding) })}
          </p>
          {padding > 24 ? (
            <p className="text-xs text-muted-foreground">{m.jakub_lab_past_24()}</p>
          ) : null}
        </div>
      }
    >
      <Side tone="bad" caption={m.jakub_lab_radius_wrong_cap({ inner: String(outer) })}>
        {box(outer, false)}
      </Side>
      <Side
        tone="good"
        caption={m.jakub_lab_radius_right_cap({ outer: String(outer), pad: String(padding), inner: String(inner) })}
      >
        {box(inner, true)}
      </Side>
    </Demo>
  )
}

/* ---------- 2. Optical alignment ---------- */

function OpticalDemo() {
  const btn = (shift: number) => (
    <div className="relative flex size-28 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
      <div className="absolute inset-y-0 left-1/2 w-px bg-primary-foreground/40" aria-hidden="true" />
      <div className="absolute inset-x-0 top-1/2 h-px bg-primary-foreground/40" aria-hidden="true" />
      <svg
        viewBox="0 0 24 24"
        className="relative size-12 fill-current"
        style={{ transform: `translateX(${shift}px)` }}
        aria-hidden="true"
      >
        <path d="M8 5v14l11-7z" />
      </svg>
    </div>
  )
  return (
    <Demo
      title={m.jakub_lab_optical_title()}
      rule="translateX(2px)"
      body={m.jakub_lab_optical_body()}
    >
      <Side tone="bad" caption={m.jakub_lab_optical_wrong_cap()}>
        {btn(0)}
      </Side>
      <Side tone="good" caption={m.jakub_lab_optical_right_cap()}>
        {btn(2)}
      </Side>
    </Demo>
  )
}

/* ---------- 3. Split + stagger ---------- */

const HIDDEN = { opacity: 0, transform: 'translateY(12px)', filter: 'blur(4px)' } as const
const SHOWN = { opacity: 1, transform: 'translateY(0)', filter: 'blur(0px)' } as const

/** Runs an enter transition each time `runKey` changes (CSS transition, ease-out, 400ms). */
function Reveal({
  playback,
  delay,
  children,
  className,
}: {
  playback: Playback
  delay: number
  children: ReactNode
  className?: string
}) {
  const { runKey, ms } = playback
  const [shown, setShown] = useState(false)
  useEffect(() => {
    setShown(false)
    let r2 = 0
    const r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(() => setShown(true))
    })
    return () => {
      cancelAnimationFrame(r1)
      cancelAnimationFrame(r2)
    }
  }, [runKey])
  const d = ms(400)
  return (
    <div
      className={className}
      style={{
        ...(shown ? SHOWN : HIDDEN),
        transitionProperty: 'opacity, transform, filter',
        transitionDuration: `${d}ms`,
        transitionTimingFunction: 'ease-out',
        transitionDelay: `${ms(delay)}ms`,
      }}
    >
      {children}
    </div>
  )
}

function StaggerDemo({ playback }: { playback: Playback }) {
  const content = (delays: [number, number, number]) => (
    <div className="space-y-2 text-center">
      <Reveal playback={playback} delay={delays[0]}>
        <h4 className="font-heading text-xl font-bold">{m.jakub_lab_stagger_h()}</h4>
      </Reveal>
      <Reveal playback={playback} delay={delays[1]}>
        <p className="text-sm text-muted-foreground">{m.jakub_lab_stagger_p()}</p>
      </Reveal>
      <Reveal playback={playback} delay={delays[2]}>
        <span className="inline-block rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground">
          {m.jakub_lab_stagger_btn()}
        </span>
      </Reveal>
    </div>
  )
  return (
    <Demo
      title={m.jakub_lab_stagger_title()}
      rule={m.jakub_lab_stagger_rule()}
      body={m.jakub_lab_stagger_body()}
      controls={<PlaybackBar playback={playback} />}
    >
      <Side tone="bad" caption={m.jakub_lab_stagger_wrong_cap()}>
        {content([0, 0, 0])}
      </Side>
      <Side tone="good" caption={m.jakub_lab_stagger_right_cap()}>
        {content([0, 100, 200])}
      </Side>
    </Demo>
  )
}

/* ---------- 4. Scale on press ---------- */

function PressButton({ scale, playback }: { scale: boolean; playback: Playback }) {
  const [auto, setAuto] = useState(false)
  const [held, setHeld] = useState(false)
  const { runKey, speed } = playback
  // Simulated press on replay: hold for 450ms, then release.
  useEffect(() => {
    if (runKey === 0) return
    const t1 = setTimeout(() => setAuto(true), 150 / speed)
    const t2 = setTimeout(() => setAuto(false), 750 / speed)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      setAuto(false)
    }
  }, [runKey, speed])
  const pressed = scale && (auto || held)
  return (
    <button
      type="button"
      onPointerDown={() => setHeld(true)}
      onPointerUp={() => setHeld(false)}
      onPointerLeave={() => setHeld(false)}
      onPointerCancel={() => setHeld(false)}
      className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      style={{
        scale: pressed ? 0.96 : 1,
        transitionProperty: 'scale',
        transitionDuration: `${playback.ms(150)}ms`,
        transitionTimingFunction: 'ease-out',
      }}
    >
      {m.jakub_lab_press_btn()}
    </button>
  )
}

function PressDemo({ playback }: { playback: Playback }) {
  return (
    <Demo
      title={m.jakub_lab_press_title()}
      rule={m.jakub_lab_press_rule()}
      body={m.jakub_lab_press_body()}
      controls={<PlaybackBar playback={playback} />}
    >
      <Side tone="bad" caption={m.jakub_lab_press_wrong_cap()}>
        <PressButton scale={false} playback={playback} />
      </Side>
      <Side tone="good" caption={m.jakub_lab_press_right_cap()}>
        <PressButton scale playback={playback} />
      </Side>
    </Demo>
  )
}

/* ---------- 5. Tabular numbers ---------- */

const TICKS = ['1111', '0808', '1181', '0000', '1818', '0101']

function TabularDemo({ playback }: { playback: Playback }) {
  const [i, setI] = useState(0)
  const { speed } = playback
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % TICKS.length), Math.round(900 / speed))
    return () => clearInterval(id)
  }, [speed])
  const v = TICKS[i]
  const text = `${v.slice(0, 2)}:${v.slice(2)}`
  const num = (variant: 'proportional-nums' | 'tabular-nums') => (
    <div className="inline-flex flex-col gap-2">
      <span className="font-sans text-5xl font-semibold" style={{ fontVariantNumeric: variant }}>
        {text}
      </span>
      <span
        className={cn('h-1 rounded-full', variant === 'tabular-nums' ? 'bg-emerald-500' : 'bg-destructive')}
        aria-hidden="true"
      />
    </div>
  )
  return (
    <Demo
      title={m.jakub_lab_tabular_title()}
      rule={m.jakub_lab_tabular_rule()}
      body={m.jakub_lab_tabular_body()}
    >
      <Side tone="bad" caption={m.jakub_lab_tabular_wrong_cap()}>
        {num('proportional-nums')}
      </Side>
      <Side tone="good" caption={m.jakub_lab_tabular_right_cap()}>
        {num('tabular-nums')}
      </Side>
    </Demo>
  )
}

export function JakubLab() {
  const stagger = usePlayback()
  const press = usePlayback()
  return (
    <section id="lab" className="scroll-mt-20 space-y-6">
      <div>
        <h2 className="font-heading text-2xl font-bold tracking-tight">{m.jakub_lab_title()}</h2>
        <p className="mt-1 max-w-3xl text-sm text-muted-foreground">{m.jakub_lab_description()}</p>
      </div>
      <div className="space-y-6">
        <RadiusDemo />
        <OpticalDemo />
        <StaggerDemo playback={stagger} />
        <PressDemo playback={press} />
        <TabularDemo playback={press} />
      </div>
      <p className="text-xs text-muted-foreground">{m.jakub_lab_note()}</p>
    </section>
  )
}
