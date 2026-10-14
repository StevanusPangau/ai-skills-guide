import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { m } from '@/paraglide/messages.js'

const RULES = [
  { id: 'eyebrow', label: 'Eyebrow' },
  { id: 'index', label: '01 / 02' },
  { id: 'hairline', label: 'Hairline' },
  { id: 'gradient', label: 'Gradient' },
  { id: 'shadow', label: 'Resting shadow' },
  { id: 'glass', label: 'Glass nav' },
] as const

type RuleId = (typeof RULES)[number]['id']

const CLEAN: Record<RuleId, boolean> = {
  eyebrow: false,
  index: false,
  hairline: false,
  gradient: false,
  shadow: false,
  glass: false,
}

export function TasteLab() {
  const [on, setOn] = useState<Record<RuleId, boolean>>(CLEAN)
  const fails = RULES.filter((rule) => on[rule.id]).length

  function toggle(id: RuleId) {
    setOn((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <section id="taste-lab" className="scroll-mt-20 space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold tracking-tight text-balance">{m.taste_lab_title()}</h2>
          <Badge variant="secondary" className="text-xs">{m.taste_lab_badge()}</Badge>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{m.taste_lab_lead()}</p>
      </div>

      <Card className="border border-border">
        <CardHeader className="pb-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <CardTitle className="text-base font-semibold">{m.taste_lab_card()}</CardTitle>
            <Badge variant={fails === 0 ? 'default' : 'outline'}>
              {fails === 0 ? m.taste_lab_pass() : m.taste_lab_fail({ count: String(fails) })}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {RULES.map((rule) => (
              <button
                key={rule.id}
                type="button"
                onClick={() => toggle(rule.id)}
                aria-pressed={on[rule.id]}
                className={`rounded border px-3 py-1 text-xs transition-colors ${
                  on[rule.id]
                    ? 'border-destructive bg-destructive/10 font-medium text-destructive'
                    : 'border-success bg-success/10 text-success'
                }`}
              >
                {on[rule.id] ? '−' : '+'} {rule.label}
              </button>
            ))}
          </div>

          <div
            className={`space-y-4 rounded-xl border p-6 ${
              on.gradient
                ? 'border-violet-300 bg-gradient-to-br from-amber-50 to-orange-200 text-stone-800'
                : 'border-border bg-muted/30 text-foreground'
            } ${on.shadow ? 'shadow-xl' : ''}`}
          >
            {on.glass ? (
              <div className="flex items-center justify-between rounded-full border border-white/40 bg-white/50 px-4 py-2 text-xs backdrop-blur">
                <span>Northwind</span>
                <span className="rounded-full bg-foreground px-3 py-1 text-background">Book</span>
              </div>
            ) : (
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium">Northwind</span>
                <span className="bg-foreground px-3 py-1 text-background">Book</span>
              </div>
            )}

            <div className={on.hairline ? 'border-t border-current/30 pt-4' : 'pt-2'}>
              {on.eyebrow ? (
                <p className="mb-2 text-[10px] tracking-[0.2em] text-current/60 uppercase">
                  New · Coastal rooms
                </p>
              ) : null}
              <h3 className="max-w-md text-3xl leading-none font-semibold tracking-tight">
                {on.index ? '01 — ' : ''}
                Rooms above the harbor
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed">{m.taste_lab_copy()}</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">{m.taste_lab_note()}</p>
        </CardContent>
      </Card>
    </section>
  )
}
