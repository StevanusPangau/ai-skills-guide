import { useEffect, useRef, useState, type ReactNode } from 'react'
import { CURVES, bezierCss, type Bezier } from '@/features/motion/easing'
import type { Playback } from '@/features/motion/use-playback'
import { cn } from '@/lib/utils'
import { m } from '@/paraglide/messages.js'
import { EASE_IN, useAutoOn } from './preview-utils'
import { Compare, DemoButton, Segmented, type PanelSpec } from './preview-kit'

type DemoProps = { playback: Playback }

/* =========================================================================
   /animate — the build sequence. Gate first (frequency), then ingredients.
   Values: strong ease-out, scale 0.9–0.97 + opacity (never scale(0)),
   modals 200–500ms, press feedback 100–160ms, UI under 300ms. Tier durations
   inside those ranges are illustrative picks; the Before side is an
   illustrative anti-pattern.
   ========================================================================= */
type Tier = '100' | 'tens' | 'occasional' | 'rare'

const TIER_PLAN: Record<Tier, { duration: number; scale: number; specs: string } | null> = {
  '100': null,
  tens: { duration: 100, scale: 0.97, specs: 'illustrative: 100ms · strong ease-out · scale(0.97) + opacity · fast and subtle' },
  occasional: { duration: 200, scale: 0.95, specs: '200ms · cubic-bezier(0.23, 1, 0.32, 1) · scale(0.95) + opacity · transform + opacity only' },
  rare: { duration: 250, scale: 0.9, specs: 'illustrative: 250ms · strong ease-out · scale(0.9) + opacity · delight budget, still under 300ms' },
}

function Enter({
  duration,
  bezier,
  from,
  property,
  children,
}: {
  duration: number
  bezier: Bezier | 'ease-in'
  from: string
  property: string
  children: ReactNode
}) {
  const [on] = useAutoOn(450)
  const easing = bezier === 'ease-in' ? 'ease-in' : bezierCss(bezier)
  return (
    <div
      style={{
        transitionProperty: property,
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: easing,
        transform: on ? 'scale(1)' : from,
        opacity: on ? 1 : 0,
      }}
    >
      {children}
    </div>
  )
}

function InviteCard({ polished }: { polished: boolean }) {
  return (
    <div className="w-56 rounded-xl border border-border bg-card p-3.5 text-xs shadow-lg">
      <p className="font-semibold">Invite teammate</p>
      <p className="mt-1 text-muted-foreground">Send a link to join this workspace.</p>
      <div className="mt-3 flex justify-end gap-2">
        <span className="rounded-md border border-border px-2 py-1 text-muted-foreground">Cancel</span>
        <span className={cn('rounded-md px-2 py-1 font-medium', polished ? 'bg-primary text-primary-foreground' : 'bg-muted-foreground text-background')}>Send</span>
      </div>
    </div>
  )
}

export function AnimateDemo({ playback }: DemoProps) {
  const [tier, setTier] = useState<Tier>('occasional')
  const plan = TIER_PLAN[tier]
  const labels: Record<Tier, string> = {
    '100': m.emil_preview_tier_100(),
    tens: m.emil_preview_tier_tens(),
    occasional: m.emil_preview_tier_occasional(),
    rare: m.emil_preview_tier_rare(),
  }
  const decisions: Record<Tier, string> = {
    '100': m.emil_preview_tier_100_decision(),
    tens: m.emil_preview_tier_tens_decision(),
    occasional: m.emil_preview_tier_occasional_decision(),
    rare: m.emil_preview_tier_rare_decision(),
  }
  const before: PanelSpec = {
    stage: (
      <Enter key={`b-${tier}`} duration={playback.ms(400)} bezier="ease-in" from="scale(0)" property="all">
        <InviteCard polished={false} />
      </Enter>
    ),
    specs: 'transition: all · 400ms · ease-in · scale(0) → 1 · ignores frequency',
    desc: m.emil_preview_animate_before_desc(),
    curve: { bezier: EASE_IN, duration: 400 },
  }
  const after: PanelSpec = plan
    ? {
        stage: (
          <Enter key={`a-${tier}`} duration={playback.ms(plan.duration)} bezier={CURVES.strongOut} from={`scale(${plan.scale})`} property="transform, opacity">
            <InviteCard polished />
          </Enter>
        ),
        specs: plan.specs,
        desc: m.emil_preview_animate_after_desc(),
        curve: { bezier: CURVES.strongOut, duration: plan.duration },
      }
    : {
        stage: <InviteCard polished />,
        specs: `${m.emil_preview_animate_instant()} · 100+ times/day → no animation, ever`,
        desc: m.emil_preview_animate_after_desc(),
      }
  return (
    <Compare
      playback={playback}
      before={before}
      after={after}
      controls={
        <>
          <Segmented
            label={m.emil_preview_animate_tier()}
            value={tier}
            onChange={setTier}
            options={(Object.keys(labels) as Tier[]).map((value) => ({ value, label: labels[value] }))}
          />
          <p className="text-xs font-medium text-emerald-700 dark:text-emerald-400" aria-live="polite">
            {decisions[tier]}
          </p>
        </>
      }
      footer={<p className="rounded-lg border border-border bg-muted/40 p-3 text-xs leading-relaxed text-muted-foreground">{m.emil_preview_animate_expo_note()}</p>}
    />
  )
}

/* =========================================================================
   /break-ui — worst-case data. Worst-case values are the ones the skill itself
   names (Aleksandra Wiśniewska-Kowalczyk, the long Northwind email, Jo, 1,284
   members, count of 1, empty list); the fixes are the skill's signature table.
   ========================================================================= */
type Member = { name: string; email: string; role?: string; status: string; initials: string }
type Dataset = 'demo' | 'worst' | 'empty' | 'one'

const DEMO_ROWS: Member[] = [
  { name: 'Jane Doe', email: 'jane@acme.com', role: 'Designer', status: 'Active', initials: 'JD' },
  { name: 'Sam Lee', email: 'sam@acme.com', role: 'Engineer', status: 'Active', initials: 'SL' },
  { name: 'Ana Ruiz', email: 'ana@acme.com', role: 'Product', status: 'Invited', initials: 'AR' },
]
const WORST_ROWS: Member[] = [
  { name: 'Aleksandra Wiśniewska-Kowalczyk', email: 'aleksandra@acme.com', role: 'Designer', status: 'Active', initials: 'AW' },
  { name: 'Bartholomew Fitzgerald', email: 'bartholomew.fitzgerald@northwind-industries-holdings.example.com', role: 'Engineer', status: 'Invited', initials: 'BF' },
  { name: 'Jo', email: 'jo@acme.com', status: 'Active', initials: 'J' },
]
const DATA: Record<Dataset, { rows: Member[]; count: number }> = {
  demo: { rows: DEMO_ROWS, count: 12 },
  worst: { rows: WORST_ROWS, count: 1284 },
  empty: { rows: [], count: 0 },
  one: { rows: DEMO_ROWS.slice(0, 1), count: 1 },
}

const plural = new Intl.PluralRules('en')
const number = new Intl.NumberFormat('en')

function MemberList({ polished, dataset }: { polished: boolean; dataset: Dataset }) {
  const { rows, count } = DATA[dataset]
  const heading = polished
    ? `${number.format(count)} ${plural.select(count) === 'one' ? 'member' : 'members'}`
    : `${count} members`
  return (
    <div className="w-full max-w-[20rem] overflow-hidden rounded-xl border border-border bg-card text-sm shadow-xs">
      <p className={cn('border-b border-border px-3 py-2 text-xs font-semibold', polished && 'tabular-nums')}>{heading}</p>
      {rows.length === 0 ? (
        polished ? (
          <p className="px-3 py-6 text-center text-xs text-muted-foreground">No members yet</p>
        ) : (
          <div className="h-16" aria-hidden="true" />
        )
      ) : (
        <ul className="divide-y divide-border">
          {rows.map((member) => (
            <li key={member.email} className={cn('flex gap-2.5 px-3 py-2.5', polished ? 'items-start' : 'items-center')}>
              <span
                className={cn(
                  'grid size-8 place-items-center rounded-full bg-primary/15 text-[11px] font-semibold text-primary',
                  polished && 'shrink-0',
                )}
              >
                {member.initials}
              </span>
              <div className={cn(polished && 'min-w-0 flex-1')}>
                <p className={cn('text-xs font-medium', !polished && 'whitespace-nowrap')}>{member.name}</p>
                <p className={cn('text-[11px] text-muted-foreground', polished ? '[overflow-wrap:anywhere]' : 'whitespace-nowrap')}>{member.email}</p>
                {polished ? (
                  member.role ? <p className="text-[11px] text-muted-foreground">{member.role}</p> : null
                ) : (
                  <p className="text-[11px] text-muted-foreground">{member.role ?? '—'}</p>
                )}
              </div>
              <span className={cn('rounded-full border border-border px-1.5 py-0.5 text-[10px]', polished && 'shrink-0 whitespace-nowrap')}>{member.status}</span>
              <button type="button" aria-label="More" className={cn('rounded px-1 text-muted-foreground', polished && 'shrink-0')}>•••</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export function BreakDemo({ playback }: DemoProps) {
  const [dataset, setDataset] = useState<Dataset>('demo')
  useEffect(() => {
    const id = window.setTimeout(() => setDataset('worst'), 700)
    return () => window.clearTimeout(id)
  }, [])
  const options: { value: Dataset; label: string }[] = [
    { value: 'demo', label: m.emil_preview_data_demo() },
    { value: 'worst', label: m.emil_preview_data_worst() },
    { value: 'empty', label: m.emil_preview_data_empty() },
    { value: 'one', label: m.emil_preview_data_one() },
  ]
  return (
    <Compare
      playback={playback}
      note={m.emil_preview_no_motion()}
      controls={<Segmented label={m.emil_preview_data_label()} value={dataset} options={options} onChange={setDataset} />}
      before={{
        stage: <MemberList polished={false} dataset={dataset} />,
        specs: 'avatar shrinks · no min-width: 0 · email cannot break · menu pushed off-screen · "1 members" · orphaned "—"',
        desc: m.emil_preview_break_before_desc(),
      }}
      after={{
        stage: <MemberList polished dataset={dataset} />,
        specs: 'flex-shrink: 0 · min-width: 0 · overflow-wrap: anywhere · nowrap badge · Intl.PluralRules + Intl.NumberFormat · tabular-nums',
        desc: m.emil_preview_break_after_desc(),
      }}
    />
  )
}

/* =========================================================================
   /mobile-native — four fixes the skill states. Simulated in the browser:
   the skill itself says none of these reproduce in device emulation.
   ========================================================================= */
type Rule = 'hover' | 'tap' | 'vh' | 'zoom'

const PHONE_H = 280
const BAR_H = 36

function TapButton({ polished, mode }: { polished: boolean; mode: 'hover' | 'tap' }) {
  const [stuck, setStuck] = useState(false)
  const [flash, setFlash] = useState(false)
  const timer = useRef(0)
  useEffect(() => () => window.clearTimeout(timer.current), [])
  const onClick = () => {
    if (mode === 'hover' && !polished) setStuck(true)
    if (mode === 'tap' && !polished) {
      setFlash(true)
      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setFlash(false), 350)
    }
  }
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center gap-3"
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) setStuck(false)
      }}
    >
      <button
        type="button"
        onClick={onClick}
        className={cn(
          'relative rounded-lg border border-border bg-card px-5 py-3 text-xs font-semibold shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50',
          polished && 'transition-transform duration-100 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] active:bg-muted',
          stuck && 'scale-[1.02] bg-muted',
        )}
      >
        Add to cart
        {flash ? <span aria-hidden="true" className="absolute inset-0 rounded-lg bg-sky-500/30" /> : null}
      </button>
      <p className="text-[11px] text-muted-foreground">{m.emil_preview_mobile_tap_hint()}</p>
    </div>
  )
}

function ViewportPhone({ polished, urlBar, ms }: { polished: boolean; urlBar: boolean; ms: (n: number) => number }) {
  const bar = urlBar ? BAR_H : 0
  const transition = `top ${ms(200)}ms ${bezierCss(CURVES.strongOut)}, height ${ms(200)}ms ${bezierCss(CURVES.strongOut)}`
  return (
    <div className="relative w-44 overflow-hidden rounded-[1.5rem] border-2 border-foreground/30 bg-background" style={{ height: PHONE_H }}>
      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-center border-b border-border bg-muted text-[10px] text-muted-foreground" style={{ height: bar, transition: `height ${ms(200)}ms ${bezierCss(CURVES.strongOut)}` }}>
        {urlBar ? 'example.com' : null}
      </div>
      <div className="absolute inset-x-0 border-b border-dashed border-primary/40 bg-primary/5" style={{ top: bar, height: polished ? PHONE_H - bar : PHONE_H, transition }}>
        <p className="p-2 font-mono text-[10px] text-primary">{polished ? '100dvh' : '100vh'}</p>
        <span className="absolute inset-x-2 bottom-2 rounded-md bg-primary py-1.5 text-center text-[11px] font-semibold text-primary-foreground">Continue</span>
      </div>
    </div>
  )
}

function ZoomScreen({ polished, ms }: { polished: boolean; ms: (n: number) => number }) {
  const [zoomed, setZoomed] = useState(false)
  return (
    <div
      className="w-52 origin-top-left rounded-xl border border-border bg-card p-3 text-xs shadow-xs"
      style={{ transform: zoomed ? 'scale(1.35)' : 'none', transition: `transform ${ms(200)}ms ${bezierCss(CURVES.strongOut)}` }}
    >
      <p className="font-semibold">Sign in</p>
      <label className="mt-2 block">
        <span className="sr-only">Email</span>
        <input
          type="email"
          placeholder={m.emil_preview_mobile_focus_hint()}
          onFocus={() => {
            if (!polished) setZoomed(true)
          }}
          className="w-full rounded-md border border-border bg-background px-2 py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          style={{ fontSize: polished ? 16 : 14 }}
        />
      </label>
      <span className="mt-2 block rounded-md bg-primary py-1.5 text-center font-semibold text-primary-foreground">Continue</span>
    </div>
  )
}

export function MobileDemo({ playback }: DemoProps) {
  const [rule, setRule] = useState<Rule>('hover')
  const [urlBar, setUrlBar] = useState(true)
  const options: { value: Rule; label: string }[] = [
    { value: 'hover', label: m.emil_preview_mobile_hover() },
    { value: 'tap', label: m.emil_preview_mobile_tap() },
    { value: 'vh', label: m.emil_preview_mobile_vh() },
    { value: 'zoom', label: m.emil_preview_mobile_zoom() },
  ]
  const copy = {
    hover: {
      b: [m.emil_preview_mobile_hover_before(), '.button:hover { transform: scale(1.02) } · stays applied after a tap'],
      a: [m.emil_preview_mobile_hover_after(), '@media (hover: hover) and (pointer: fine) { .button:hover {…} } · :active { scale(0.97) } · 100ms'],
    },
    tap: {
      b: [m.emil_preview_mobile_tap_before(), 'default tap highlight over the element'],
      a: [m.emil_preview_mobile_tap_after(), 'html { -webkit-tap-highlight-color: transparent } · :active { scale(0.97) } · 100ms'],
    },
    vh: {
      b: [m.emil_preview_mobile_vh_before(), '.app { height: 100vh } → largest viewport, overflows under the URL bar'],
      a: [m.emil_preview_mobile_vh_after(), '.app { height: 100dvh } · hero: min-height: 100svh'],
    },
    zoom: {
      b: [m.emil_preview_mobile_zoom_before(), 'input { font-size: 14px } → page zooms on focus, stays zoomed'],
      a: [m.emil_preview_mobile_zoom_after(), 'input, textarea, select { font-size: 16px }'],
    },
  }[rule]
  const stage = (polished: boolean): ReactNode => {
    if (rule === 'hover' || rule === 'tap') return <div key={rule} className="relative h-44 w-full"><TapButton polished={polished} mode={rule} /></div>
    if (rule === 'vh') return <ViewportPhone key={rule} polished={polished} urlBar={urlBar} ms={playback.ms} />
    return <ZoomScreen key={rule} polished={polished} ms={playback.ms} />
  }
  const pressCurve = rule === 'hover' || rule === 'tap' ? { bezier: CURVES.strongOut, duration: 100 } : undefined
  return (
    <Compare
      playback={playback}
      note={m.emil_preview_curve_none()}
      controls={
        <>
          <Segmented label={m.emil_preview_mobile_rule()} value={rule} options={options} onChange={setRule} />
          {rule === 'vh' ? <DemoButton onClick={() => setUrlBar((v) => !v)} pressed={urlBar}>{m.emil_preview_mobile_urlbar()}</DemoButton> : null}
        </>
      }
      before={{ stage: stage(false), desc: copy.b[0], specs: copy.b[1] }}
      after={{ stage: stage(true), desc: copy.a[0], specs: copy.a[1], curve: pressCurve }}
      footer={<p className="rounded-lg border border-border bg-muted/40 p-3 text-xs leading-relaxed text-muted-foreground">{m.emil_preview_mobile_sim_note()}</p>}
    />
  )
}
