import { useRef, useState, type PointerEvent, type ReactNode } from 'react'
import { emilkowalskiSkills } from '@/data/emilkowalski-skills'
import { emilCategoryLabel } from '@/features/emilkowalski/labels'
import { prefersReducedMotion } from '@/lib/motion'
import { m } from '@/paraglide/messages.js'

export function EmilPreviewLab() {
  const [skillName, setSkillName] = useState(emilkowalskiSkills[0].name)
  const [state, setState] = useState<'before' | 'after'>('after')
  const skill = emilkowalskiSkills.find((item) => item.name === skillName) ?? emilkowalskiSkills[0]

  const getExplanation = () => {
    switch (skill.name) {
      case 'emil-design-eng':
        return state === 'before'
          ? m.emil_preview_emil_design_eng_before_desc()
          : m.emil_preview_emil_design_eng_after_desc()
      case 'apple-design':
        return state === 'before'
          ? m.emil_preview_apple_design_before_desc()
          : m.emil_preview_apple_design_after_desc()
      case 'animation-vocabulary':
        return state === 'before'
          ? m.emil_preview_vocab_before_desc()
          : m.emil_preview_vocab_after_desc()
      case 'find-animation-opportunities':
        return state === 'before'
          ? m.emil_preview_opportunities_before_desc()
          : m.emil_preview_opportunities_after_desc()
      case 'review-animations':
        return state === 'before'
          ? m.emil_preview_review_before_desc()
          : m.emil_preview_review_after_desc()
      case 'improve-animations':
        return state === 'before'
          ? m.emil_preview_audit_before_desc()
          : m.emil_preview_audit_after_desc()
      default:
        return ''
    }
  }

  return (
    <section id="preview" className="scroll-mt-20 space-y-6">
      <div>
        <h2 className="font-heading text-2xl font-bold tracking-tight">
          {m.emil_preview_title()}
        </h2>
        <p className="mt-1 text-muted-foreground">{m.emil_preview_description()}</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[15rem_minmax(0,1fr)]">
        {/* Left selector */}
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
              }}
              aria-pressed={item.name === skill.name}
              className={`min-w-0 rounded-lg border px-3 py-2.5 text-left transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 ${
                item.name === skill.name
                  ? 'border-primary bg-primary/10 shadow-xs ring-1 ring-primary/30'
                  : 'border-border bg-card hover:border-primary/40 hover:bg-muted/30'
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

        {/* Right Canvas */}
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-xs">
          {/* Header toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-muted/20 p-3 sm:px-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-mono text-sm font-bold text-foreground">/{skill.name}</p>
                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold font-mono uppercase tracking-wider ${
                  state === 'before'
                    ? 'bg-destructive/15 text-destructive border border-destructive/20'
                    : 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20'
                }`}>
                  {state === 'before' ? m.emil_preview_tag_before() : m.emil_preview_tag_after()}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed max-w-xl">
                {getExplanation()}
              </p>
            </div>

            {/* Toggle State */}
            <div
              className="grid grid-cols-2 rounded-lg bg-muted p-1 border border-border/50 shrink-0"
              role="group"
              aria-label={m.emil_preview_state()}
            >
              {(['before', 'after'] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setState(value)}
                  aria-pressed={state === value}
                  className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 ${
                    state === value
                      ? value === 'after'
                        ? 'bg-background text-emerald-700 dark:text-emerald-400 shadow-xs'
                        : 'bg-background text-destructive shadow-xs'
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

          {/* Interactive Canvas */}
          <figure
            className="flex min-h-80 items-center justify-center bg-background/50 p-6 sm:min-h-96"
            aria-live="polite"
            aria-label={m.emil_preview_canvas({
              skill: skill.name,
              state:
                state === 'before'
                  ? m.emil_preview_before()
                  : m.emil_preview_after(),
            })}
          >
            <div className="w-full max-w-md text-sm [&_code]:text-xs">
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

/* =========================================================================
   1. /emil-design-eng Demo (Dropdown / Popover)
   Before: 500ms ease-in, scale(0) from center, no active press feedback
   After: 160ms cubic-bezier(0.16, 1, 0.3, 1), scale(0.96) origin-top-left, active:scale(0.97)
   ========================================================================= */
function PopoverDemo({ quality }: { quality: 'before' | 'after' }) {
  const [open, setOpen] = useState(false)
  const polished = quality === 'after'

  return (
    <DemoFrame
      action={m.emil_preview_action_menu()}
      onAction={() => setOpen((value) => !value)}
      pressed={open}
      polished={polished}
      specs={
        polished
          ? 'duration: 160ms · ease-out cubic-bezier(0.16,1,0.3,1) · scale(0.96) → 1.0 · origin-top-left'
          : 'duration: 500ms · ease-in · scale(0) → 1.0 · origin-center · no tactile feedback'
      }
    >
      <div className="relative mx-auto h-44 w-64 select-none">
        {/* Trigger Button with active press state */}
        <div
          className={`inline-flex items-center gap-2 rounded-lg bg-primary px-3.5 py-2 font-medium text-xs text-primary-foreground shadow-xs transition-transform duration-100 ${
            polished ? 'active:scale-[0.97] cursor-pointer' : 'cursor-pointer'
          }`}
        >
          <span>Options</span>
          <span className={`text-[10px] transition-transform ${polished ? (open ? 'rotate-180 duration-160' : 'rotate-0 duration-160') : ''}`}>
            ▼
          </span>
        </div>

        {/* Popover Menu Container */}
        <div
          className={`absolute top-11 left-0 w-52 rounded-xl border border-border bg-card p-2.5 shadow-xl transition-all ${
            polished
              ? 'origin-top-left'
              : 'origin-center'
          }`}
          style={{
            transitionDuration: polished ? '160ms' : '500ms',
            transitionTimingFunction: polished
              ? 'cubic-bezier(0.16, 1, 0.3, 1)'
              : 'ease-in',
            transform: open
              ? 'scale(1) translateY(0)'
              : polished
                ? 'scale(0.96) translateY(-4px)'
                : 'scale(0) translateY(0)',
            opacity: open ? 1 : 0,
            pointerEvents: open ? 'auto' : 'none',
          }}
        >
          <div className="space-y-1">
            <div className="flex items-center justify-between rounded-md px-2.5 py-1.5 text-xs hover:bg-muted font-medium">
              <span>Edit Document</span>
              <kbd className="text-[10px] text-muted-foreground font-mono">⌘E</kbd>
            </div>
            <div className="flex items-center justify-between rounded-md px-2.5 py-1.5 text-xs hover:bg-muted font-medium">
              <span>Duplicate</span>
              <kbd className="text-[10px] text-muted-foreground font-mono">⌘D</kbd>
            </div>
            <div className="h-px bg-border my-1" />
            <div className="flex items-center justify-between rounded-md px-2.5 py-1.5 text-xs text-destructive hover:bg-destructive/10 font-medium">
              <span>Delete</span>
              <kbd className="text-[10px] text-destructive/70 font-mono">⌫</kbd>
            </div>
          </div>
        </div>
      </div>
    </DemoFrame>
  )
}

/* =========================================================================
   2. /apple-design Demo (Physics & Direct Manipulation)
   Before: No pointer capture, abrupt stop on release, hard boundary hit
   After: Pointer capture, projected endpoint velocity momentum, rubber-band resistance
   ========================================================================= */
function GestureDemo({ quality }: { quality: 'before' | 'after' }) {
  const polished = quality === 'after'
  const trackRef = useRef<HTMLDivElement>(null)
  const objectRef = useRef<HTMLDivElement>(null)
  const [positionPercent, setPositionPercent] = useState(0)
  const drag = useRef({ active: false, startX: 0, position: 0, lastX: 0, lastTime: 0, velocity: 0 })

  const setPosition = (position: number) => {
    drag.current.position = position
    const limit = Math.max((trackRef.current?.clientWidth ?? 72) - 60, 1)
    setPositionPercent(Math.round(Math.max(0, Math.min(position / limit, 1)) * 100))
    if (objectRef.current) objectRef.current.style.transform = `translate3d(${position}px, -50%, 0)`
  }

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (polished) {
      event.currentTarget.setPointerCapture(event.pointerId)
    }
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
    const limit = trackRef.current.clientWidth - 60
    const raw = event.clientX - drag.current.startX

    // Apple rubber-band resistance outside bounds
    const position = polished
      ? raw < 0
        ? raw * 0.25
        : raw > limit
          ? limit + (raw - limit) * 0.25
          : raw
      : Math.max(0, Math.min(raw, limit))

    setPosition(position)
  }

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active || !trackRef.current || !objectRef.current) return
    drag.current.active = false
    if (polished && event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
    if (event.timeStamp - drag.current.lastTime > 80) drag.current.velocity = 0
    const limit = trackRef.current.clientWidth - 60
    const current = drag.current.position

    if (!polished) {
      // Hard clamp immediately
      setPosition(Math.max(0, Math.min(current, limit)))
      return
    }

    // Polished: Spring projection from projected endpoint
    const target = Math.max(0, Math.min(current + drag.current.velocity * 160, limit))
    if (prefersReducedMotion()) {
      setPosition(target)
      return
    }

    const overshoot = Math.max(0, Math.min(target + drag.current.velocity * 20, limit))
    const animation = objectRef.current.animate(
      [
        { transform: `translate3d(${current}px, -50%, 0)` },
        { transform: `translate3d(${overshoot}px, -50%, 0)`, offset: 0.7 },
        { transform: `translate3d(${target}px, -50%, 0)` },
      ],
      {
        duration: 440,
        easing: 'cubic-bezier(0.2, 0.9, 0.1, 1)',
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
    const limit = trackRef.current.clientWidth - 60
    setPosition(Math.max(0, Math.min(drag.current.position, limit)))
  }

  const reset = () => {
    objectRef.current?.getAnimations().forEach((animation) => animation.cancel())
    setPosition(0)
  }

  return (
    <DemoFrame
      action={m.emil_preview_action_reset()}
      onAction={reset}
      polished={polished}
      specs={
        polished
          ? 'pointer capture ✓ · rubber-band boundary resistance · momentum velocity handoff'
          : 'no pointer capture · hard clamp bounds · abrupt stop on release'
      }
    >
      <div className="mx-auto w-full max-w-sm space-y-3">
        <div
          ref={trackRef}
          className={`relative h-20 overflow-visible rounded-xl border border-border ${
            polished ? 'bg-muted/40 shadow-inner' : 'bg-muted/20'
          }`}
        >
          {/* Track Guideline */}
          <div className="absolute top-1/2 right-6 left-6 h-1 -translate-y-1/2 rounded-full bg-border/80" />

          {/* Interactive Puck */}
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
            className={`absolute top-1/2 left-3 size-12 -translate-y-1/2 touch-none select-none flex items-center justify-center transition-shadow ${
              polished
                ? 'cursor-grab active:cursor-grabbing rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg active:shadow-md'
                : 'cursor-ew-resize rounded-md bg-muted-foreground text-background shadow-xs'
            }`}
            style={{ transform: 'translate3d(0, -50%, 0)' }}
          >
            <span className="font-mono text-xs font-bold">↔</span>
          </div>

          {/* Rubber-band indicators */}
          <div className={`absolute top-3 right-3 bottom-3 w-1 rounded-full ${polished ? 'bg-primary/30 border-r border-dashed border-primary/50' : 'bg-destructive/40'}`} />
        </div>
      </div>
    </DemoFrame>
  )
}

/* =========================================================================
   3. /animation-vocabulary Demo (Precise Naming vs Vague Descriptions)
   ========================================================================= */
function VocabularyDemo({ quality }: { quality: 'before' | 'after' }) {
  const [revealed, setRevealed] = useState(false)
  const polished = quality === 'after'

  return (
    <DemoFrame
      action={m.emil_preview_action_name()}
      onAction={() => setRevealed((value) => !value)}
      pressed={revealed}
      polished={polished}
      specs={
        polished
          ? 'Canonical Term: "Scale in" · Target: scale(0.95→1.0) + opacity(0→1) · Avoid: Bouncy/pop'
          : 'Ambiguous prompt: "Make it pop smoothly" → results in inconsistent, jarring springs'
      }
    >
      <div className="mx-auto flex min-h-32 max-w-sm flex-col items-center justify-center gap-4">
        {/* User fuzzy prompt */}
        <div className="relative rounded-2xl rounded-bl-sm border border-border bg-muted/60 px-4 py-3 text-xs leading-relaxed text-foreground shadow-xs max-w-xs">
          <p className="font-medium">💬 &ldquo;Bikin pas muncul itu dia agak membesar halus dari belakang…&rdquo;</p>
        </div>

        {/* Answer comparison */}
        <div
          aria-hidden={!revealed}
          className={`transition-all duration-200 ${
            revealed ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
        >
          {polished ? (
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-center shadow-xs">
              <span className="block font-mono text-xs font-bold text-emerald-700 dark:text-emerald-400">
                Term: &ldquo;Scale in&rdquo;
              </span>
              <p className="mt-1 text-[11px] text-muted-foreground">
                <code className="font-mono text-[10px] bg-background/80 px-1.5 py-0.5 rounded border border-border">
                  scale(0.95 → 1.0) + opacity(0 → 1)
                </code>
              </p>
              <p className="mt-1 text-[10px] text-emerald-700/80 dark:text-emerald-400/80 font-medium">
                Easing: cubic-bezier(0.16, 1, 0.3, 1) · duration: 160ms
              </p>
            </div>
          ) : (
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-center text-xs text-amber-800 dark:text-amber-300">
              <p className="font-semibold">⚠️ Istilah Ambigu / Tebakan</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                &ldquo;Bouncy animation? Zoom-in? Pop effect?&rdquo;
              </p>
            </div>
          )}
        </div>
      </div>
    </DemoFrame>
  )
}

/* =========================================================================
   4. /find-animation-opportunities Demo (Frequency Gate)
   Before: Animate everything
   After: Strict frequency & purpose filter (nav/tab rejected, modal accepted)
   ========================================================================= */
function OpportunityDemo({ quality }: { quality: 'before' | 'after' }) {
  const [scanned, setScanned] = useState(false)
  const polished = quality === 'after'

  const candidates = [
    { name: 'Header Nav Link', freq: 'High frequency', purpose: 'Navigation', approved: false, reason: 'Distracting & high frequency' },
    { name: 'Table Row Hover', freq: 'Very high', purpose: 'Data scanning', approved: false, reason: 'Lag during fast browsing' },
    { name: 'Dialog Modal', freq: 'Low frequency', purpose: 'Context switch', approved: true, reason: 'Strong spatial orientation' },
    { name: 'Save Status Pill', freq: 'Low frequency', purpose: 'State feedback', approved: true, reason: 'Clear feedback gap' },
  ]

  return (
    <DemoFrame
      action={m.emil_preview_action_scan()}
      onAction={() => setScanned((value) => !value)}
      pressed={scanned}
      polished={polished}
      specs={
        polished
          ? 'Emil Gate: Frequency check + Purpose filter · 2 Accepted (Low freq), 2 Rejected (High freq)'
          : 'Zero filtering: Semua interaksi diberi motion tanpa memedulikan frekuensi kerja user'
      }
    >
      <div className="mx-auto grid max-w-sm grid-cols-2 gap-2.5">
        {candidates.map((item, index) => {
          const isApproved = item.approved
          return (
            <div
              key={item.name}
              className={`rounded-xl border p-3 text-xs transition-all duration-200 ${
                scanned
                  ? polished
                    ? isApproved
                      ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 shadow-xs'
                      : 'border-border/60 bg-muted/40 text-muted-foreground opacity-60'
                    : 'border-amber-500/30 bg-amber-500/10 text-amber-800 dark:text-amber-300'
                  : 'border-border bg-card'
              }`}
              style={{ transitionDelay: prefersReducedMotion() ? '0ms' : `${index * 50}ms` }}
            >
              <div className="flex items-center justify-between font-semibold">
                <span>{item.name}</span>
                {scanned && polished && (
                  <span className={`text-[10px] font-bold ${isApproved ? 'text-emerald-600 dark:text-emerald-400' : 'text-muted-foreground'}`}>
                    {isApproved ? '✓ PASS' : '✕ REJECT'}
                  </span>
                )}
              </div>
              <p className="mt-1 text-[10px] text-muted-foreground">
                {scanned && polished ? item.reason : `Freq: ${item.freq}`}
              </p>
            </div>
          )
        })}
      </div>
    </DemoFrame>
  )
}

/* =========================================================================
   5. /review-animations Demo (Code Diff Review)
   ========================================================================= */
function ReviewDemo({ quality }: { quality: 'before' | 'after' }) {
  const [reviewed, setReviewed] = useState(false)
  const polished = quality === 'after'

  const beforeCode = [
    '- transition: all 400ms ease-in;',
    '- transform: scale(0);',
    '- left: 50px; /* layout thrashing */',
  ]

  const afterCode = [
    '+ transition: transform 160ms cubic-bezier(0.16, 1, 0.3, 1), opacity 160ms ease-out;',
    '+ transform: scale(0.96);',
    '+ will-change: transform, opacity; /* compositor only */',
  ]

  return (
    <DemoFrame
      action={m.emil_preview_action_review()}
      onAction={() => setReviewed((value) => !value)}
      pressed={reviewed}
      polished={polished}
      specs={
        polished
          ? 'VERDICT: APPROVE ✓ · Sub-200ms · Transform/Opacity compositor only · scale(0.96)'
          : 'VERDICT: BLOCK ✕ · Transition: all layout property · 400ms ease-in sluggish · scale(0)'
      }
    >
      <div className="mx-auto w-full max-w-sm rounded-xl border border-border bg-card p-3.5 font-mono text-xs shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-border pb-2 text-[11px] text-muted-foreground">
          <span>components/dropdown.css</span>
          <span className={`font-semibold ${polished ? 'text-emerald-600 dark:text-emerald-400' : 'text-destructive'}`}>
            {reviewed ? (polished ? 'STATUS: APPROVED' : 'STATUS: BLOCKED') : 'PENDING REVIEW'}
          </span>
        </div>

        <div className="space-y-1.5 overflow-x-auto text-[11px]">
          {(reviewed && polished ? afterCode : beforeCode).map((line, index) => (
            <p
              key={index}
              className={`rounded px-1.5 py-0.5 whitespace-pre ${
                reviewed && polished
                  ? 'bg-emerald-500/10 text-emerald-800 dark:text-emerald-300'
                  : 'bg-destructive/10 text-destructive'
              }`}
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </DemoFrame>
  )
}

/* =========================================================================
   6. /improve-animations Demo (Structured Audit & Planning)
   ========================================================================= */
function AuditDemo({ quality }: { quality: 'before' | 'after' }) {
  const [audited, setAudited] = useState(false)
  const polished = quality === 'after'

  return (
    <DemoFrame
      action={m.emil_preview_action_audit()}
      onAction={() => setAudited((value) => !value)}
      pressed={audited}
      polished={polished}
      specs={
        polished
          ? 'Structured Audit: 8 Kategori Emil · Prioritas Severity · Output: plans/001-motion.md'
          : 'Unstructured Audit: Keluhan acak tanpa hierarki, target file tidak jelas'
      }
    >
      <div className="mx-auto w-full max-w-sm">
        {!polished ? (
          <div className="relative h-36 rounded-xl border border-dashed border-destructive/40 bg-destructive/5 p-4 flex flex-col items-center justify-center text-center">
            <span className="font-mono text-xs font-semibold text-destructive">
              {audited ? '⚠️ 18 Temuan Acak Ditemukan' : 'Belum Ada Standarisasi Motion'}
            </span>
            <p className="mt-1 text-[11px] text-muted-foreground max-w-xs">
              Animasi tersebar dengan 6 easing berbeda, durasi mulai dari 100ms hingga 900ms tanpa acuan.
            </p>
          </div>
        ) : (
          <div className={`space-y-2 font-mono text-xs ${audited ? 'visible' : 'opacity-80'}`}>
            <div className="rounded-lg border border-border bg-card p-2.5 flex items-center justify-between">
              <div>
                <span className="font-bold text-destructive">01 · HIGH</span>
                <span className="ml-2 text-muted-foreground font-sans">Dropdown modal thrashing</span>
              </div>
              <span className="text-[10px] text-muted-foreground">timing</span>
            </div>
            <div className="rounded-lg border border-border bg-card p-2.5 flex items-center justify-between">
              <div>
                <span className="font-bold text-amber-500">02 · MED</span>
                <span className="ml-2 text-muted-foreground font-sans">Missing prefers-reduced-motion</span>
              </div>
              <span className="text-[10px] text-muted-foreground">a11y</span>
            </div>
            <div className="rounded-lg border border-border bg-card p-2.5 flex items-center justify-between">
              <div>
                <span className="font-bold text-primary">03 · LOW</span>
                <span className="ml-2 text-muted-foreground font-sans">Sidebar button ease-in curve</span>
              </div>
              <span className="text-[10px] text-muted-foreground">cohesion</span>
            </div>

            {audited && (
              <div className="mt-2 text-right">
                <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-700 dark:text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                  📄 Generated: plans/001-motion.md
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </DemoFrame>
  )
}

/* =========================================================================
   Frame Helper Component
   ========================================================================= */
function DemoFrame({
  children,
  action,
  onAction,
  pressed,
  polished,
  specs,
}: {
  children: ReactNode
  action: string
  onAction: () => void
  pressed?: boolean
  polished: boolean
  specs: string
}) {
  return (
    <div className="space-y-4">
      {/* Interactive area */}
      <div className="min-h-48 flex flex-col justify-center">
        {children}
      </div>

      {/* Control button */}
      <div className="flex flex-col items-center gap-2">
        <button
          type="button"
          onClick={onAction}
          aria-pressed={pressed}
          className={`rounded-lg px-4 py-2 text-xs font-semibold shadow-xs transition-all duration-150 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 ${
            polished
              ? 'bg-primary text-primary-foreground hover:bg-primary/90 ring-1 ring-primary/30'
              : 'bg-muted text-muted-foreground hover:text-foreground border border-border'
          }`}
        >
          {action}
        </button>

        {/* Live specs label */}
        <p className="text-center font-mono text-[10px] text-muted-foreground leading-normal max-w-sm">
          {specs}
        </p>
      </div>
    </div>
  )
}
