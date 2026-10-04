import { useRef, useState, type PointerEvent } from 'react'
import { CURVES, bezierCss } from '@/features/motion/easing'
import type { Playback } from '@/features/motion/use-playback'
import { m } from '@/paraglide/messages.js'
import { EASE_IN, useAutoOn } from './preview-utils'
import { Compare, DemoButton } from './preview-kit'

type DemoProps = { playback: Playback }

/* 1. /emil-design-eng — popover. Values: strong ease-out, 160ms, scale(0.95)+opacity, origin at trigger, active:scale(0.97).
   Before values (500ms ease-in, scale(0), center origin) are illustrative anti-patterns. */
function PopoverStage({ polished, open, onToggle, ms }: { polished: boolean; open: boolean; onToggle: () => void; ms: (n: number) => number }) {
  return (
    <div className="relative h-44 w-full max-w-64 select-none">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className={`inline-flex items-center gap-2 rounded-lg bg-primary px-3.5 py-2 text-xs font-medium text-primary-foreground shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 ${
          polished ? 'transition-transform duration-100 active:scale-[0.97]' : ''
        }`}
      >
        <span>Options</span>
        <span aria-hidden="true" className="text-[10px]">▼</span>
      </button>
      <div
        aria-hidden={!open}
        className={`absolute top-11 left-0 w-52 rounded-xl border border-border bg-card p-2.5 shadow-xl ${
          polished ? 'origin-top-left' : 'origin-center'
        }`}
        style={{
          transitionProperty: 'transform, opacity',
          transitionDuration: `${ms(polished ? 160 : 500)}ms`,
          transitionTimingFunction: polished ? bezierCss(CURVES.strongOut) : 'ease-in',
          transform: open ? 'scale(1)' : polished ? 'scale(0.95)' : 'scale(0)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
        }}
      >
        <div className="space-y-1 text-xs font-medium">
          <div className="flex items-center justify-between rounded-md px-2.5 py-1.5"><span>Edit Document</span><kbd className="font-mono text-[10px] text-muted-foreground">⌘E</kbd></div>
          <div className="flex items-center justify-between rounded-md px-2.5 py-1.5"><span>Duplicate</span><kbd className="font-mono text-[10px] text-muted-foreground">⌘D</kbd></div>
          <div className="my-1 h-px bg-border" />
          <div className="flex items-center justify-between rounded-md px-2.5 py-1.5 text-destructive"><span>Delete</span><kbd className="font-mono text-[10px] text-destructive/70">⌫</kbd></div>
        </div>
      </div>
    </div>
  )
}

export function PopoverDemo({ playback }: DemoProps) {
  const [open, setOpen] = useAutoOn(450)
  const toggle = () => setOpen((v) => !v)
  return (
    <Compare
      playback={playback}
      controls={<DemoButton onClick={toggle} pressed={open}>{m.emil_preview_action_menu()}</DemoButton>}
      before={{
        stage: <PopoverStage polished={false} open={open} onToggle={toggle} ms={playback.ms} />,
        specs: '500ms · ease-in · scale(0) → 1 · origin-center · no press feedback',
        desc: m.emil_preview_emil_design_eng_before_desc(),
        curve: { bezier: EASE_IN, duration: 500 },
      }}
      after={{
        stage: <PopoverStage polished open={open} onToggle={toggle} ms={playback.ms} />,
        specs: '160ms · cubic-bezier(0.23, 1, 0.32, 1) · scale(0.95) → 1 + opacity · origin at trigger · :active scale(0.97)',
        desc: m.emil_preview_emil_design_eng_after_desc(),
        curve: { bezier: CURVES.strongOut, duration: 160 },
      }}
    />
  )
}

/* 2. /apple-design — direct manipulation. The settle animation here is an illustrative spring-like
   ease, not a value from the skill; the skill's rules shown are pointer capture, velocity handoff and rubber-banding. */
function GestureStage({ polished, playback }: { polished: boolean; playback: Playback }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const objectRef = useRef<HTMLDivElement>(null)
  const [percent, setPercent] = useState(0)
  const drag = useRef({ active: false, startX: 0, position: 0, lastX: 0, lastTime: 0, velocity: 0 })

  const setPosition = (position: number) => {
    drag.current.position = position
    const limit = Math.max((trackRef.current?.clientWidth ?? 72) - 60, 1)
    setPercent(Math.round(Math.max(0, Math.min(position / limit, 1)) * 100))
    if (objectRef.current) objectRef.current.style.transform = `translate3d(${position}px, -50%, 0)`
  }
  const limitOf = () => (trackRef.current?.clientWidth ?? 72) - 60

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (polished) event.currentTarget.setPointerCapture(event.pointerId)
    const t = getComputedStyle(event.currentTarget).transform
    const visual = t === 'none' ? drag.current.position : new DOMMatrix(t).m41
    event.currentTarget.getAnimations().forEach((a) => a.cancel())
    setPosition(visual)
    drag.current = { active: true, startX: event.clientX - visual, position: visual, lastX: event.clientX, lastTime: event.timeStamp, velocity: 0 }
  }
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return
    const elapsed = Math.max(event.timeStamp - drag.current.lastTime, 1)
    drag.current.velocity = (event.clientX - drag.current.lastX) / elapsed
    drag.current.lastX = event.clientX
    drag.current.lastTime = event.timeStamp
    const limit = limitOf()
    const raw = event.clientX - drag.current.startX
    setPosition(
      polished
        ? raw < 0 ? raw * 0.25 : raw > limit ? limit + (raw - limit) * 0.25 : raw
        : Math.max(0, Math.min(raw, limit)),
    )
  }
  const release = (event: PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
  }
  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active || !objectRef.current) return
    drag.current.active = false
    release(event)
    if (event.timeStamp - drag.current.lastTime > 80) drag.current.velocity = 0
    const limit = limitOf()
    const current = drag.current.position
    if (!polished) return setPosition(Math.max(0, Math.min(current, limit)))
    const target = Math.max(0, Math.min(current + drag.current.velocity * 160, limit))
    const duration = playback.ms(440)
    if (duration === 0) return setPosition(target)
    const overshoot = Math.max(0, Math.min(target + drag.current.velocity * 20, limit))
    const animation = objectRef.current.animate(
      [
        { transform: `translate3d(${current}px, -50%, 0)` },
        { transform: `translate3d(${overshoot}px, -50%, 0)`, offset: 0.7 },
        { transform: `translate3d(${target}px, -50%, 0)` },
      ],
      { duration, easing: 'cubic-bezier(0.2, 0.9, 0.1, 1)' },
    )
    animation.onfinish = () => setPosition(target)
  }
  const onPointerCancel = (event: PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return
    drag.current.active = false
    release(event)
    setPosition(Math.max(0, Math.min(drag.current.position, limitOf())))
  }

  return (
    <div className="w-full max-w-sm space-y-2">
      <div
        ref={trackRef}
        className={`relative h-20 rounded-xl border border-border ${polished ? 'bg-muted/40 shadow-inner' : 'bg-muted/20'}`}
      >
        <div className="absolute top-1/2 right-6 left-6 h-1 -translate-y-1/2 rounded-full bg-border/80" />
        <div
          ref={objectRef}
          role="slider"
          tabIndex={0}
          aria-label={m.emil_preview_gesture_object()}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percent}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerCancel}
          className={`absolute top-1/2 left-3 flex size-12 touch-none items-center justify-center select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 ${
            polished
              ? 'cursor-grab rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg active:cursor-grabbing'
              : 'cursor-ew-resize rounded-md bg-muted-foreground text-background shadow-xs'
          }`}
          style={{ transform: 'translate3d(0, -50%, 0)' }}
        >
          <span aria-hidden="true" className="font-mono text-xs font-bold">↔</span>
        </div>
        <div className={`absolute top-3 right-3 bottom-3 w-1 rounded-full ${polished ? 'border-r border-dashed border-primary/50 bg-primary/30' : 'bg-destructive/40'}`} />
      </div>
      <p className="text-center text-[11px] text-muted-foreground">{m.emil_preview_hint_drag()}</p>
    </div>
  )
}

export function GestureDemo({ playback }: DemoProps) {
  return (
    <Compare
      playback={playback}
      note={m.emil_preview_curve_none()}
      before={{
        stage: <GestureStage polished={false} playback={playback} />,
        specs: 'no pointer capture · hard clamp at bounds · abrupt stop on release',
        desc: m.emil_preview_apple_design_before_desc(),
      }}
      after={{
        stage: <GestureStage polished playback={playback} />,
        specs: 'pointer capture · rubber-band resistance at bounds · release velocity projects the resting point',
        desc: m.emil_preview_apple_design_after_desc(),
      }}
    />
  )
}

/* 3. /animation-vocabulary — vague prompt vs exact term (Scale in / Pop in from the skill's glossary). */
export function VocabularyDemo({ playback }: DemoProps) {
  const [revealed, setRevealed] = useAutoOn(450)
  const reveal = {
    transition: `transform ${playback.ms(200)}ms ${bezierCss(CURVES.strongOut)}, opacity ${playback.ms(200)}ms ${bezierCss(CURVES.strongOut)}`,
    transform: revealed ? 'scale(1)' : 'scale(0.95)',
    opacity: revealed ? 1 : 0,
  }
  const prompt = (
    <p className="max-w-xs rounded-2xl rounded-bl-sm border border-border bg-muted/60 px-4 py-3 text-xs leading-relaxed font-medium shadow-xs">
      &ldquo;Bikin pas muncul itu dia agak membesar halus dari belakang…&rdquo;
    </p>
  )
  return (
    <Compare
      playback={playback}
      note={m.emil_preview_curve_none()}
      controls={<DemoButton onClick={() => setRevealed((v) => !v)} pressed={revealed}>{m.emil_preview_action_name()}</DemoButton>}
      before={{
        stage: (
          <div className="flex w-full max-w-sm flex-col items-center gap-4">
            {prompt}
            <div aria-hidden={!revealed} style={reveal} className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-center text-xs text-amber-800 dark:text-amber-300">
              <p className="font-semibold">⚠️ Istilah ambigu / tebakan</p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">&ldquo;Bouncy animation? Zoom-in? Pop effect?&rdquo;</p>
            </div>
          </div>
        ),
        specs: 'Ambiguous prompt: "make it pop smoothly" → guesses and mismatched implementations',
        desc: m.emil_preview_vocab_before_desc(),
      }}
      after={{
        stage: (
          <div className="flex w-full max-w-sm flex-col items-center gap-4">
            {prompt}
            <div aria-hidden={!revealed} style={reveal} className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-center shadow-xs">
              <span className="block font-mono text-xs font-bold text-emerald-700 dark:text-emerald-400">Scale in</span>
              <p className="mt-1 text-[11px] font-medium text-emerald-800/90 dark:text-emerald-300/90">Grows from smaller to full size as it appears, often paired with a fade</p>
            </div>
          </div>
        ),
        specs: 'Scale in = grows from smaller to full size + fade · Pop in = slight overshoot',
        desc: m.emil_preview_vocab_after_desc(),
      }}
    />
  )
}

/* 4. /find-animation-opportunities — frequency gate. */
const CANDIDATES = [
  { name: 'Header nav link', freq: 'High frequency', approved: false, reason: 'Distracting at high frequency' },
  { name: 'Table row hover', freq: 'Very high', approved: false, reason: 'Lag while browsing fast' },
  { name: 'Dialog modal', freq: 'Low frequency', approved: true, reason: 'Spatial orientation' },
  { name: 'Save status pill', freq: 'Low frequency', approved: true, reason: 'Clear feedback gap' },
]

export function OpportunityDemo({ playback }: DemoProps) {
  const [scanned, setScanned] = useAutoOn(450)
  const grid = (polished: boolean) => (
    <div className="grid w-full max-w-sm grid-cols-2 gap-2.5">
      {CANDIDATES.map((item, index) => (
        <div
          key={item.name}
          className={`rounded-xl border p-3 text-xs ${
            scanned
              ? polished
                ? item.approved
                  ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-800 shadow-xs dark:text-emerald-300'
                  : 'border-border/60 bg-muted/40 text-muted-foreground opacity-60'
                : 'border-amber-500/30 bg-amber-500/10 text-amber-800 dark:text-amber-300'
              : 'border-border bg-card'
          }`}
          style={{
            transition: `background-color ${playback.ms(200)}ms ease ${playback.ms(index * 50)}ms, border-color ${playback.ms(200)}ms ease ${playback.ms(index * 50)}ms, opacity ${playback.ms(200)}ms ease ${playback.ms(index * 50)}ms`,
          }}
        >
          <div className="flex items-center justify-between gap-1 font-semibold">
            <span>{item.name}</span>
            {scanned ? (
              <span className={`shrink-0 text-[10px] font-bold ${polished ? (item.approved ? 'text-emerald-600 dark:text-emerald-400' : 'text-muted-foreground') : 'text-amber-700 dark:text-amber-400'}`}>
                {polished ? (item.approved ? '✓ PASS' : '✕ SKIP') : '● ANIMATES'}
              </span>
            ) : null}
          </div>
          <p className="mt-1 text-[10px] text-muted-foreground">{scanned && polished ? item.reason : item.freq}</p>
        </div>
      ))}
    </div>
  )
  return (
    <Compare
      playback={playback}
      note={m.emil_preview_curve_none()}
      controls={<DemoButton onClick={() => setScanned((v) => !v)} pressed={scanned}>{m.emil_preview_action_scan()}</DemoButton>}
      before={{
        stage: grid(false),
        specs: 'No filter: every interaction gets motion, whatever the frequency',
        desc: m.emil_preview_opportunities_before_desc(),
      }}
      after={{
        stage: grid(true),
        specs: 'Frequency check + purpose filter · 2 accepted (low frequency), 2 skipped (high frequency)',
        desc: m.emil_preview_opportunities_after_desc(),
      }}
    />
  )
}

/* 5. /review-animations — diff review. Curves are the ones in the diff itself. */
const BLOCKED = [
  '- transition: all 400ms ease-in;',
  '- transform: scale(0);',
  '- left: 50px; /* layout property */',
]
const APPROVED = [
  '+ transition: transform 200ms cubic-bezier(0.23, 1, 0.32, 1),',
  '+             opacity 200ms ease-out;',
  '+ transform: scale(0.95); /* + opacity: 0 */',
]

export function ReviewDemo({ playback }: DemoProps) {
  const [reviewed, setReviewed] = useAutoOn(450)
  const diff = (polished: boolean) => (
    <div className="w-full max-w-sm space-y-3 rounded-xl border border-border bg-card p-3.5 font-mono text-xs shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-1 border-b border-border pb-2 text-[11px] text-muted-foreground">
        <span>components/dropdown.css</span>
        <span className={`font-semibold ${reviewed ? (polished ? 'text-emerald-600 dark:text-emerald-400' : 'text-destructive') : ''}`}>
          {reviewed ? (polished ? 'APPROVED' : 'BLOCKED') : 'PENDING REVIEW'}
        </span>
      </div>
      <div className="space-y-1.5 overflow-x-auto text-[11px]">
        {(polished ? APPROVED : BLOCKED).map((line) => (
          <p
            key={line}
            className={`rounded px-1.5 py-0.5 whitespace-pre ${
              polished ? 'bg-emerald-500/10 text-emerald-800 dark:text-emerald-300' : 'bg-destructive/10 text-destructive'
            }`}
          >
            {line}
          </p>
        ))}
      </div>
    </div>
  )
  return (
    <Compare
      playback={playback}
      controls={<DemoButton onClick={() => setReviewed((v) => !v)} pressed={reviewed}>{m.emil_preview_action_review()}</DemoButton>}
      before={{
        stage: diff(false),
        specs: 'BLOCK · transition: all · ease-in on UI · scale(0) entrance · layout property animated',
        desc: m.emil_preview_review_before_desc(),
        curve: { bezier: EASE_IN, duration: 400 },
      }}
      after={{
        stage: diff(true),
        specs: 'APPROVE · transform + opacity only · 200ms (under 300ms) · cubic-bezier(0.23, 1, 0.32, 1) · scale(0.95) + opacity',
        desc: m.emil_preview_review_after_desc(),
        curve: { bezier: CURVES.strongOut, duration: 200 },
      }}
    />
  )
}

/* 6. /improve-animations — structured audit. */
export function AuditDemo({ playback }: DemoProps) {
  const [audited, setAudited] = useAutoOn(450)
  const rows = [
    { sev: '01 · HIGH', color: 'text-destructive', text: 'Dropdown animates a layout property', tag: 'timing' },
    { sev: '02 · MEDIUM', color: 'text-amber-600 dark:text-amber-400', text: 'Missing prefers-reduced-motion', tag: 'a11y' },
    { sev: '03 · LOW', color: 'text-primary', text: 'Sidebar button uses ease-in', tag: 'cohesion' },
  ]
  return (
    <Compare
      playback={playback}
      note={m.emil_preview_curve_none()}
      controls={<DemoButton onClick={() => setAudited((v) => !v)} pressed={audited}>{m.emil_preview_action_audit()}</DemoButton>}
      before={{
        stage: (
          <div className="flex w-full max-w-sm flex-col items-center justify-center rounded-xl border border-dashed border-destructive/40 bg-destructive/5 p-5 text-center">
            <span className="font-mono text-xs font-semibold text-destructive">
              {audited ? '⚠️ Random, unprioritised complaints' : 'No motion standard yet'}
            </span>
            <p className="mt-1 max-w-xs text-[11px] text-muted-foreground">Different easings and durations scattered across the codebase with no shared tokens.</p>
          </div>
        ),
        specs: 'Unstructured audit: random complaints, no hierarchy, no target files',
        desc: m.emil_preview_audit_before_desc(),
      }}
      after={{
        stage: (
          <div className="w-full max-w-sm space-y-2 font-mono text-xs">
            {rows.map((row, i) => (
              <div
                key={row.sev}
                className="flex items-center justify-between gap-2 rounded-lg border border-border bg-card p-2.5"
                style={{
                  transition: `opacity ${playback.ms(200)}ms ease ${playback.ms(i * 60)}ms, transform ${playback.ms(200)}ms ${bezierCss(CURVES.strongOut)} ${playback.ms(i * 60)}ms`,
                  opacity: audited ? 1 : 0.35,
                  transform: audited ? 'none' : 'translateY(4px)',
                }}
              >
                <span className="min-w-0"><span className={`font-bold ${row.color}`}>{row.sev}</span><span className="ml-2 font-sans text-muted-foreground">{row.text}</span></span>
                <span className="shrink-0 text-[10px] text-muted-foreground">{row.tag}</span>
              </div>
            ))}
            <div className={`text-right transition-opacity duration-200 ${audited ? 'opacity-100' : 'opacity-0'}`}>
              <span className="inline-flex items-center gap-1 rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                📄 plans/NNN-short-slug.md
              </span>
            </div>
          </div>
        ),
        specs: 'Audit categories · severity HIGH / MEDIUM / LOW · output: plans/NNN-short-slug.md',
        desc: m.emil_preview_audit_after_desc(),
      }}
    />
  )
}
