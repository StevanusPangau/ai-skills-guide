import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { m } from '@/paraglide/messages.js'

function Choice({
  pressed,
  onClick,
  tone,
  children,
}: {
  pressed: boolean
  onClick: () => void
  tone: 'bad' | 'good'
  children: string
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={cn(
        'rounded border px-3 py-1 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50',
        pressed
          ? tone === 'bad'
            ? 'border-destructive bg-destructive/10 font-semibold text-destructive'
            : 'border-emerald-600 bg-emerald-600/10 font-semibold text-emerald-700 dark:text-emerald-400'
          : 'border-border text-muted-foreground hover:text-foreground',
      )}
    >
      {children}
    </button>
  )
}

export function ImpeccableLab() {
  const [strong, setStrong] = useState(true)
  const [even, setEven] = useState(true)

  return (
    <section id="impeccable-lab" className="scroll-mt-20 space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold tracking-tight text-balance">{m.impeccable_lab_title()}</h2>
          <Badge variant="secondary" className="font-mono text-xs">
            {m.impeccable_lab_badge()}
          </Badge>
        </div>
        <p className="text-muted-foreground mt-1 text-sm">{m.impeccable_lab_lead()}</p>
      </div>

      <div className="grid gap-6">
        <Card className="border border-border">
          <CardHeader className="pb-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <CardTitle className="text-base font-semibold">{m.impeccable_lab_mod1_title()}</CardTitle>
                <p className="text-muted-foreground mt-0.5 text-xs">{m.impeccable_lab_mod1_rule()}</p>
              </div>
              <div className="flex gap-2">
                <Choice pressed={!strong} onClick={() => setStrong(false)} tone="bad">
                  {m.impeccable_lab_weak()}
                </Choice>
                <Choice pressed={strong} onClick={() => setStrong(true)} tone="good">
                  {m.impeccable_lab_strong()}
                </Choice>
              </div>
            </div>
          </CardHeader>
          <CardContent className="text-xs">
            {strong ? (
              <div className="bg-card space-y-4 rounded-xl border border-border p-6">
                <div className="space-y-1.5">
                  <span className="text-primary text-xs font-medium">{m.impeccable_lab_strong_kicker()}</span>
                  <h3 className="text-foreground text-lg font-bold tracking-tight">
                    {m.impeccable_lab_strong_title()}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{m.impeccable_lab_strong_body()}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className="bg-primary text-primary-foreground rounded-lg px-4 py-2 text-xs font-semibold hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                  >
                    {m.impeccable_lab_primary()}
                  </button>
                  <button
                    type="button"
                    className="border-border text-foreground hover:bg-muted rounded-lg border px-3 py-2 text-xs font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                  >
                    {m.impeccable_lab_secondary()}
                  </button>
                </div>
                <p className="text-emerald-700 dark:text-emerald-400 text-[11px]">{m.impeccable_lab_strong_note()}</p>
              </div>
            ) : (
              <div className="space-y-4 rounded-xl border border-zinc-300 bg-zinc-100 p-6 dark:bg-zinc-900/50">
                <div className="space-y-1">
                  <span className="text-xs text-zinc-400">{m.impeccable_lab_weak_kicker()}</span>
                  <h3 className="text-base font-normal text-zinc-500 dark:text-zinc-400">
                    {m.impeccable_lab_weak_title()}
                  </h3>
                  <p className="text-[11px] leading-relaxed text-zinc-400">{m.impeccable_lab_weak_body()}</p>
                </div>
                <div className="flex gap-2">
                  <div className="rounded bg-zinc-300 px-3 py-1.5 text-xs font-normal text-zinc-600">
                    {m.impeccable_lab_primary()}
                  </div>
                  <div className="rounded border border-zinc-300 px-3 py-1.5 text-xs font-normal text-zinc-400">
                    {m.impeccable_lab_secondary()}
                  </div>
                </div>
                <p className="text-destructive text-[11px]">{m.impeccable_lab_weak_note()}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">{m.impeccable_lab_mod2_title()}</CardTitle>
              <p className="text-muted-foreground mt-0.5 text-xs">{m.impeccable_lab_mod2_rule()}</p>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              <div className="flex gap-2">
                <Choice pressed={!even} onClick={() => setEven(false)} tone="bad">
                  {m.impeccable_lab_spacing_random()}
                </Choice>
                <Choice pressed={even} onClick={() => setEven(true)} tone="good">
                  {m.impeccable_lab_spacing_scale()}
                </Choice>
              </div>
              <div className="bg-muted/20 space-y-2 rounded-lg border border-border p-3">
                <div className="flex items-center justify-between font-mono text-[11px]">
                  <span>{m.impeccable_lab_rhythm_label()}</span>
                  <span className={even ? 'text-emerald-700 dark:text-emerald-400' : 'text-destructive'}>
                    {even ? m.impeccable_lab_rhythm_good() : m.impeccable_lab_rhythm_bad()}
                  </span>
                </div>
                <div className="flex h-16 items-end gap-2 pt-2">
                  {(even ? [8, 16, 24, 32, 48] : [11, 19, 23, 37, 43]).map((h) => (
                    <div
                      key={h}
                      className={cn('flex-1 rounded-t', even ? 'bg-primary' : 'bg-destructive/60')}
                      style={{ height: `${h}px` }}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">{m.impeccable_lab_mod3_title()}</CardTitle>
              <p className="text-muted-foreground mt-0.5 text-xs">{m.impeccable_lab_mod3_rule()}</p>
            </CardHeader>
            <CardContent className="text-xs">
              <div className="grid grid-cols-2 gap-2">
                <Severity tone="border-destructive/40 bg-destructive/5 text-destructive" title={m.impeccable_lab_p0()} body={m.impeccable_lab_p0_body()} />
                <Severity tone="border-warning/40 bg-warning/5 text-warning" title={m.impeccable_lab_p1()} body={m.impeccable_lab_p1_body()} />
                <Severity tone="border-info/40 bg-info/5 text-info" title={m.impeccable_lab_p2()} body={m.impeccable_lab_p2_body()} />
                <Severity tone="border-border bg-muted text-muted-foreground" title={m.impeccable_lab_p3()} body={m.impeccable_lab_p3_body()} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

function Severity({ tone, title, body }: { tone: string; title: string; body: string }) {
  return (
    <div className={cn('space-y-1 rounded border p-2', tone)}>
      <span className="block font-mono text-[11px] font-semibold">{title}</span>
      <p className="text-muted-foreground text-[11px] leading-relaxed">{body}</p>
    </div>
  )
}
