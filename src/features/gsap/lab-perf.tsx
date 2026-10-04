import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { m } from '@/paraglide/messages.js'
import { MotionStage, PlaybackBar } from '@/features/motion/primitives'
import { usePlayback, type Playback } from '@/features/motion/use-playback'

const PREFER = ['x', 'y', 'scaleX', 'scaleY', 'rotation', 'rotationX', 'rotationY', 'skewX', 'skewY', 'opacity']
const AVOID = ['width', 'height', 'top', 'left', 'margin', 'padding']

type Stage = { name: string; state: 'hit' | 'skip' | 'most' | 'follow' }

function Mover({ mode, pb }: { mode: 'layout' | 'transform'; pb: Playback }) {
  const ref = useRef<HTMLDivElement>(null)
  const { runKey, ms } = pb
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const d = ms(1600)
    const opts: KeyframeAnimationOptions = { duration: d, easing: 'ease-in-out', fill: 'forwards' }
    const anim =
      mode === 'layout'
        ? el.animate([{ left: '0px', top: '0px' }, { left: '100px', top: '50px' }], opts)
        : el.animate(
            [{ transform: 'translate(0px, 0px)' }, { transform: 'translate(100px, 50px)' }],
            opts,
          )
    return () => anim.cancel()
  }, [runKey, ms, mode])
  return (
    <div className="relative h-24 w-[10.5rem]">
      <div
        ref={ref}
        className={cn(
          'absolute top-0 left-0 size-10 rounded-lg shadow-sm',
          mode === 'layout' ? 'bg-destructive/80' : 'bg-emerald-600 dark:bg-emerald-500',
        )}
      />
    </div>
  )
}

function Pipeline({ stages, active, tone }: { stages: Stage[]; active: boolean; tone: 'bad' | 'good' }) {
  const label = (s: Stage['state']) =>
    s === 'hit'
      ? m.gsaplab_pf_hit()
      : s === 'most'
        ? m.gsaplab_pf_most()
        : s === 'follow'
          ? m.gsaplab_pf_follow()
          : m.gsaplab_pf_skip()
  return (
    <ol className="grid grid-cols-3 gap-1.5 font-mono text-[10px]">
      {stages.map((s) => {
        const lit = s.state === 'hit' || s.state === 'follow'
        return (
          <li
            key={s.name}
            className={cn(
              'rounded-md border px-2 py-1.5 transition-opacity',
              lit
                ? tone === 'bad'
                  ? 'border-destructive/50 bg-destructive/10 text-destructive'
                  : 'border-emerald-600/50 bg-emerald-600/10 text-emerald-700 dark:text-emerald-400'
                : 'border-dashed border-border text-muted-foreground opacity-70',
              lit && active && 'motion-safe:animate-pulse',
            )}
          >
            <span className="block text-[11px] font-semibold">{s.name}</span>
            {label(s.state)}
          </li>
        )
      })}
    </ol>
  )
}

export function LayoutVsCompositor() {
  const pb = usePlayback()
  return (
    <div className="space-y-4">
      <PlaybackBar playback={pb} />
      <div className="grid gap-4 lg:grid-cols-2" role="group" aria-label={m.gsaplab_pf_stage()}>
        <div className="space-y-2.5">
          <MotionStage tone="bad" label={`${m.gsaplab_pf_bad()} · ${m.gsaplab_illustrative()}`} className="min-h-44 pt-9">
            <Mover mode="layout" pb={pb} />
          </MotionStage>
          <div className="font-mono text-[11px]">
            gsap.to(&quot;.box&quot;, {'{'} <b className="text-destructive">left: 100, top: 50</b> {'}'})
          </div>
          <Pipeline
            tone="bad"
            active={!pb.reduced}
            stages={[
              { name: 'Layout', state: 'hit' },
              { name: 'Paint', state: 'follow' },
              { name: 'Composite', state: 'follow' },
            ]}
          />
          <p className="text-muted-foreground text-xs leading-relaxed">{m.gsaplab_pf_bad_note()}</p>
        </div>
        <div className="space-y-2.5">
          <MotionStage tone="good" label={m.gsaplab_pf_good()} className="min-h-44 pt-9">
            <Mover mode="transform" pb={pb} />
          </MotionStage>
          <div className="font-mono text-[11px]">
            gsap.to(&quot;.box&quot;, {'{'} <b className="text-emerald-700 dark:text-emerald-400">x: 100, y: 50</b> {'}'})
          </div>
          <Pipeline
            tone="good"
            active={!pb.reduced}
            stages={[
              { name: 'Layout', state: 'skip' },
              { name: 'Paint', state: 'most' },
              { name: 'Composite', state: 'hit' },
            ]}
          />
          <p className="text-muted-foreground text-xs leading-relaxed">{m.gsaplab_pf_good_note()}</p>
        </div>
      </div>

      <p className="text-muted-foreground text-[11px]">{m.gsaplab_pf_sim()}</p>

      <div className="grid gap-3 sm:grid-cols-2">
        <PropList title={m.gsaplab_pf_prefer()} items={PREFER} tone="good" />
        <PropList title={m.gsaplab_pf_avoid()} items={AVOID} tone="bad" />
      </div>
      <p className="rounded-lg border border-border bg-muted/40 px-3 py-2 text-xs leading-relaxed">
        {m.gsaplab_pf_tip()}
      </p>
    </div>
  )
}

function PropList({ title, items, tone }: { title: string; items: string[]; tone: 'good' | 'bad' }) {
  return (
    <div className="space-y-1.5">
      <h4 className="text-xs font-medium">{title}</h4>
      <ul className="flex flex-wrap gap-1.5">
        {items.map((p) => (
          <li
            key={p}
            className={cn(
              'rounded-md border px-1.5 py-0.5 font-mono text-[11px]',
              tone === 'good'
                ? 'border-emerald-600/40 bg-emerald-600/10 text-emerald-700 dark:text-emerald-400'
                : 'border-destructive/40 bg-destructive/10 text-destructive',
            )}
          >
            {p}
          </li>
        ))}
      </ul>
    </div>
  )
}
