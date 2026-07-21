import { useRef, useState, type PointerEvent, type ReactNode } from 'react'
import { emilkowalskiSkills } from '@/data/emilkowalski-skills'
import { emilCategoryLabel } from '@/features/emilkowalski/labels'
import { prefersReducedMotion } from '@/lib/motion'
import { m } from '@/paraglide/messages.js'

export function EmilPreviewLab() {
  const [skillName, setSkillName] = useState(emilkowalskiSkills[0].name)
  const [state, setState] = useState<'before' | 'after'>('before')
  const skill = emilkowalskiSkills.find((item) => item.name === skillName) ?? emilkowalskiSkills[0]

  return (
    <section id="preview" className="scroll-mt-20 space-y-6">
      <div>
        <h2 className="font-heading text-2xl font-bold tracking-tight">
          {m.emil_preview_title()}
        </h2>
        <p className="mt-1 text-muted-foreground">{m.emil_preview_description()}</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[15rem_minmax(0,1fr)]">
        <div
          className="grid grid-cols-2 gap-2 lg:grid-cols-1"
          role="group"
          aria-label={m.emil_preview_choose_skill()}
        >
          {emilkowalskiSkills.map((item) => (
            <button
              key={item.name}
              type="button"
              onClick={() => {
                setSkillName(item.name)
                setState('before')
              }}
              aria-pressed={item.name === skill.name}
              className={`min-w-0 rounded-lg border px-3 py-2.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 ${
                item.name === skill.name
                  ? 'border-primary bg-primary/5'
                  : 'border-border bg-card hover:border-primary/40'
              }`}
            >
              <span className="block break-words font-mono text-xs font-semibold">
                /{item.name}
              </span>
              <span className="mt-1 block text-[10px] text-muted-foreground">
                {emilCategoryLabel(item.category)}
              </span>
            </button>
          ))}
        </div>

        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-3">
            <div className="min-w-0">
              <p className="font-mono text-sm font-semibold">/{skill.name}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {m.emil_preview_instruction()}
              </p>
            </div>
            <div
              className="grid grid-cols-2 rounded-lg bg-muted p-1"
              role="group"
              aria-label={m.emil_preview_state()}
            >
              {(['before', 'after'] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setState(value)}
                  aria-pressed={state === value}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 ${
                    state === value
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {value === 'before'
                    ? m.emil_preview_before()
                    : m.emil_preview_after()}
                </button>
              ))}
            </div>
          </div>

          <figure
            className="flex min-h-72 items-center justify-center bg-background/40 p-6 sm:min-h-80"
            aria-live="polite"
            aria-label={m.emil_preview_canvas({
              skill: skill.name,
              state:
                state === 'before'
                  ? m.emil_preview_before()
                  : m.emil_preview_after(),
            })}
          >
            <div className="w-full max-w-sm text-sm [&_code]:text-xs">
              <InteractivePreview
                key={`${skill.name}-${state}`}
                skillName={skill.name}
                quality={state}
              />
            </div>
          </figure>
        </div>
      </div>
    </section>
  )
}

function InteractivePreview({
  skillName,
  quality,
}: {
  skillName: string
  quality: 'before' | 'after'
}) {
  if (skillName === 'emil-design-eng') return <PopoverDemo quality={quality} />
  if (skillName === 'apple-design') return <GestureDemo quality={quality} />
  if (skillName === 'animation-vocabulary') return <VocabularyDemo quality={quality} />
  if (skillName === 'find-animation-opportunities') return <OpportunityDemo quality={quality} />
  if (skillName === 'review-animations') return <ReviewDemo quality={quality} />
  return <AuditDemo quality={quality} />
}

function PopoverDemo({ quality }: { quality: 'before' | 'after' }) {
  const [open, setOpen] = useState(false)
  const polished = quality === 'after'
  return (
    <DemoFrame action={m.emil_preview_action_menu()} onAction={() => setOpen((value) => !value)} pressed={open}>
      <div className="relative mx-auto h-32 w-44">
        <div className="absolute top-0 left-4 rounded-md bg-primary px-3 py-2 font-medium text-primary-foreground">Menu</div>
        <div
          className={`absolute top-11 left-4 w-32 rounded-lg border border-border bg-card p-3 shadow-lg transition-[transform,opacity] ${polished ? 'origin-top-left duration-180' : 'origin-center duration-500 ease-in'} ${open ? 'scale-100 opacity-100' : polished ? 'scale-95 opacity-0' : 'scale-0 opacity-0'}`}
          style={polished ? { transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)' } : undefined}
        >
          <div className="mb-2 h-2 w-20 rounded bg-foreground/70" />
          <div className="h-2 w-14 rounded bg-muted-foreground/30" />
        </div>
        <code className={`absolute right-0 bottom-0 ${polished ? 'text-emerald-700 dark:text-emerald-400' : 'text-destructive'}`}>
          {polished ? 'scale(.95) · ease-out' : 'scale(0) · ease-in'}
        </code>
      </div>
    </DemoFrame>
  )
}

function GestureDemo({ quality }: { quality: 'before' | 'after' }) {
  const polished = quality === 'after'
  const trackRef = useRef<HTMLDivElement>(null)
  const objectRef = useRef<HTMLDivElement>(null)
  const [positionPercent, setPositionPercent] = useState(0)
  const drag = useRef({ active: false, startX: 0, position: 0, lastX: 0, lastTime: 0, velocity: 0 })

  const setPosition = (position: number) => {
    drag.current.position = position
    const limit = Math.max((trackRef.current?.clientWidth ?? 64) - 64, 1)
    setPositionPercent(Math.round(Math.max(0, Math.min(position / limit, 1)) * 100))
    if (objectRef.current) objectRef.current.style.transform = `translate3d(${position}px, -50%, 0)`
  }

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId)
    const currentTransform = getComputedStyle(event.currentTarget).transform
    const visualPosition = currentTransform === 'none' ? drag.current.position : new DOMMatrix(currentTransform).m41
    event.currentTarget.getAnimations().forEach((animation) => animation.cancel())
    setPosition(visualPosition)
    drag.current = {
      active: true,
      startX: event.clientX - visualPosition,
      position: visualPosition,
      lastX: event.clientX,
      lastTime: event.timeStamp,
      velocity: 0,
    }
  }

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active || !trackRef.current) return
    const elapsed = Math.max(event.timeStamp - drag.current.lastTime, 1)
    drag.current.velocity = (event.clientX - drag.current.lastX) / elapsed
    drag.current.lastX = event.clientX
    drag.current.lastTime = event.timeStamp
    const limit = trackRef.current.clientWidth - 64
    const raw = event.clientX - drag.current.startX
    const position = polished
      ? raw < 0
        ? raw * 0.2
        : raw > limit
          ? limit + (raw - limit) * 0.2
          : raw
      : Math.max(0, Math.min(raw, limit))
    setPosition(position)
  }

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active || !trackRef.current || !objectRef.current) return
    drag.current.active = false
    event.currentTarget.releasePointerCapture(event.pointerId)
    if (event.timeStamp - drag.current.lastTime > 80) drag.current.velocity = 0
    const limit = trackRef.current.clientWidth - 64
    const current = drag.current.position
    const target = polished
      ? Math.max(0, Math.min(current + drag.current.velocity * 140, limit))
      : Math.max(0, Math.min(current, limit))
    if (prefersReducedMotion()) {
      setPosition(target)
      return
    }
    const overshoot = polished
      ? Math.max(0, Math.min(target + drag.current.velocity * 18, limit))
      : target
    const animation = objectRef.current.animate(
      polished
        ? [
            { transform: `translate3d(${current}px, -50%, 0)` },
            { transform: `translate3d(${overshoot}px, -50%, 0)`, offset: 0.72 },
            { transform: `translate3d(${target}px, -50%, 0)` },
          ]
        : [
            { transform: `translate3d(${current}px, -50%, 0)` },
            { transform: `translate3d(${target}px, -50%, 0)` },
          ],
      {
        duration: polished ? 420 : 180,
        easing: polished ? 'cubic-bezier(0.32, 0.72, 0, 1)' : 'ease-in',
      },
    )
    animation.onfinish = () => setPosition(target)
  }

  const onPointerCancel = (event: PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active || !trackRef.current) return
    drag.current.active = false
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
    const limit = trackRef.current.clientWidth - 64
    setPosition(Math.max(0, Math.min(drag.current.position, limit)))
  }

  const reset = () => {
    objectRef.current?.getAnimations().forEach((animation) => animation.cancel())
    setPosition(0)
  }

  return (
    <DemoFrame action={m.emil_preview_action_reset()} onAction={reset}>
      <div className="mx-auto w-full max-w-xs space-y-3">
        <div ref={trackRef} className="relative h-16 overflow-hidden rounded-lg border border-border bg-muted/30">
          <div className="absolute top-1/2 right-5 left-5 h-px bg-border" />
          <div
            ref={objectRef}
            role="slider"
            tabIndex={0}
            aria-label={m.emil_preview_gesture_object()}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={positionPercent}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerCancel}
            onKeyDown={(event) => {
              if (!trackRef.current || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
              event.preventDefault()
              const limit = trackRef.current.clientWidth - 64
              if (event.key === 'Home') setPosition(0)
              else if (event.key === 'End') setPosition(limit)
              else setPosition(Math.max(0, Math.min(drag.current.position + (event.key === 'ArrowRight' ? 16 : -16), limit)))
            }}
            className={`absolute top-1/2 left-5 size-8 touch-none shadow-sm select-none ${polished ? 'cursor-grab rounded-full bg-primary active:cursor-grabbing' : 'cursor-ew-resize rounded bg-muted-foreground'}`}
            style={{ transform: 'translate3d(0, -50%, 0)' }}
          />
          <div className={`absolute top-2 right-3 bottom-2 border-r ${polished ? 'rounded-r-full border-dashed border-primary/60' : 'border-destructive'}`} />
        </div>
        <p className={`text-center font-mono text-xs ${polished ? 'text-emerald-700 dark:text-emerald-400' : 'text-muted-foreground'}`}>
          {polished ? 'velocity → projected target → settle' : 'position → hard stop'}
        </p>
      </div>
    </DemoFrame>
  )
}

function VocabularyDemo({ quality }: { quality: 'before' | 'after' }) {
  const [revealed, setRevealed] = useState(false)
  const polished = quality === 'after'
  return (
    <DemoFrame action={m.emil_preview_action_name()} onAction={() => setRevealed((value) => !value)} pressed={revealed}>
      <div className="mx-auto flex min-h-28 max-w-xs items-center justify-center gap-4">
        <div className="max-w-36 rounded-xl rounded-bl-sm bg-muted p-3 text-xs leading-relaxed text-muted-foreground">“It grows smoothly into place…”</div>
        <div aria-hidden={!revealed} className={`transition-[transform,opacity] duration-200 ${revealed ? 'visible scale-100 opacity-100' : 'invisible scale-95 opacity-0'}`}>
          {polished ? (
            <div className="space-y-1 text-center"><div className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 font-mono font-semibold text-primary">Scale in</div><span className="text-xs text-muted-foreground">scale + opacity</span></div>
          ) : (
            <div className="rounded border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-amber-700 dark:text-amber-400">Bouncy animation?</div>
          )}
        </div>
      </div>
    </DemoFrame>
  )
}

function OpportunityDemo({ quality }: { quality: 'before' | 'after' }) {
  const [scanned, setScanned] = useState(false)
  const polished = quality === 'after'
  const candidates = ['nav', 'hover', 'list', 'modal']
  return (
    <DemoFrame action={m.emil_preview_action_scan()} onAction={() => setScanned((value) => !value)} pressed={scanned}>
      <div className="mx-auto grid max-w-xs grid-cols-2 gap-2 text-center text-xs">
        {candidates.map((item, index) => {
          const accepted = item === 'modal'
          return <div key={item} className={`rounded border px-2 py-3 transition-[background-color,border-color,transform,opacity] duration-200 ${scanned ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-60'} ${scanned && polished ? accepted ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400' : 'border-border text-muted-foreground' : 'border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400'}`} style={{ transitionDelay: prefersReducedMotion() ? '0ms' : `${index * 40}ms` }}>
            {scanned && polished ? (accepted ? '✓ ' : '× ') : ''}{item}
            <span className="block text-[10px]">{scanned && polished ? (accepted ? 'spatial purpose' : 'reject') : 'animate?'}</span>
          </div>
        })}
      </div>
    </DemoFrame>
  )
}

function ReviewDemo({ quality }: { quality: 'before' | 'after' }) {
  const [reviewed, setReviewed] = useState(false)
  const polished = quality === 'after'
  const before = [
    'transition: all 400ms;',
    'transform: scale(0);',
    'transition-timing-function: ease-in;',
  ]
  const after = [
    'transition: transform 180ms cubic-bezier(.23,1,.32,1), opacity 180ms cubic-bezier(.23,1,.32,1);',
    'transform: scale(0.95);',
    'opacity: 0;',
  ]
  return (
    <DemoFrame action={m.emil_preview_action_review()} onAction={() => setReviewed((value) => !value)} pressed={reviewed}>
      <div className="mx-auto w-full max-w-xs space-y-2 rounded-lg border border-border bg-muted/30 p-3 font-mono text-xs">
        {(reviewed && polished ? after : before).map((line, index) => <p key={index} className={`break-all transition-[transform,opacity,color] duration-200 ${reviewed ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-60'} ${reviewed && polished ? 'text-emerald-700 dark:text-emerald-400' : 'text-destructive'}`} style={{ transitionDelay: prefersReducedMotion() ? '0ms' : `${index * 60}ms` }}>{line}</p>)}
        {reviewed ? <p className="border-t border-border pt-2 text-right text-muted-foreground">{polished ? 'Approve' : 'Issues found'}</p> : null}
      </div>
    </DemoFrame>
  )
}

function AuditDemo({ quality }: { quality: 'before' | 'after' }) {
  const [audited, setAudited] = useState(false)
  const polished = quality === 'after'
  return (
    <DemoFrame action={m.emil_preview_action_audit()} onAction={() => setAudited((value) => !value)} pressed={audited}>
      <div className="mx-auto w-full max-w-xs">
        {!polished ? (
          <div className="relative h-28 rounded-lg border border-dashed border-border bg-muted/30">
            {['top-3 left-5', 'top-10 right-8', 'bottom-4 left-1/2'].map((position) => <span key={position} className={`absolute size-2 rounded-full bg-destructive ${position}`} />)}
            <span className="absolute top-1/2 left-1/2 -translate-1/2 font-mono text-xs text-muted-foreground">{audited ? 'fix everything' : 'scattered motion'}</span>
          </div>
        ) : (
          <div aria-hidden={!audited} className={`space-y-2 font-mono text-xs ${audited ? 'visible' : 'invisible'}`}>
            {['01 · HIGH · easing', '02 · MED · a11y', '03 · LOW · cohesion'].map((item, index) => <div key={item} className={`rounded border border-border px-3 py-2 transition-[transform,opacity] duration-200 ${audited ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`} style={{ transitionDelay: prefersReducedMotion() ? '0ms' : `${index * 70}ms` }}>{item}</div>)}
            <div className={`text-right text-emerald-700 transition-opacity duration-200 dark:text-emerald-400 ${audited ? 'opacity-100' : 'opacity-0'}`}>plans/001.md</div>
          </div>
        )}
      </div>
    </DemoFrame>
  )
}

function DemoFrame({ children, action, onAction, pressed }: { children: ReactNode; action: string; onAction: () => void; pressed?: boolean }) {
  return (
    <div className="space-y-5">
      {children}
      <button type="button" onClick={onAction} aria-pressed={pressed} className="mx-auto block rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-transform duration-150 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50">
        {action}
      </button>
    </div>
  )
}
