import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getLocale } from '@/paraglide/runtime.js'

const RULES = [
  { id: 'eyebrow', label: 'Eyebrow', banned: true },
  { id: 'index', label: '01 / 02', banned: true },
  { id: 'hairline', label: 'Hairline', banned: true },
  { id: 'gradient', label: 'Gradient', banned: true },
  { id: 'shadow', label: 'Resting shadow', banned: true },
  { id: 'glass', label: 'Glass nav', banned: true },
] as const

type RuleId = (typeof RULES)[number]['id']

export function TasteLab() {
  const isEn = getLocale() === 'en'
  const [on, setOn] = useState<Record<RuleId, boolean>>({
    eyebrow: true,
    index: true,
    hairline: true,
    gradient: true,
    shadow: true,
    glass: true,
  })

  const fails = RULES.filter((rule) => on[rule.id]).length

  function toggle(id: RuleId) {
    setOn((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <section id="taste-lab" className="scroll-mt-20 space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold tracking-tight text-balance">
            {isEn ? 'House-rule inspector' : 'Inspector house rules'}
          </h2>
          <Badge variant="secondary" className="font-mono text-xs">
            Interactive
          </Badge>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          {isEn
            ? 'Toggle the tells v2 measures in a real browser. A clean page fails none of them. This is a model of the rules, not the upstream script.'
            : 'Nyalakan tanda yang diukur v2 di browser sungguhan. Halaman bersih tidak menggagalkan satupun. Ini model aturannya, bukan skrip upstream.'}
        </p>
      </div>

      <Card className="border border-border">
        <CardHeader className="pb-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <CardTitle className="text-base font-semibold">
              {isEn ? 'What the inspector fails' : 'Apa yang digagalkan inspector'}
            </CardTitle>
            <Badge variant={fails === 0 ? 'default' : 'outline'} className="font-mono">
              {fails === 0
                ? isEn
                  ? 'pass'
                  : 'lulus'
                : isEn
                  ? `${fails} fail`
                  : `${fails} gagal`}
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
                className={`rounded border px-3 py-1 font-mono text-xs transition-colors ${
                  on[rule.id]
                    ? 'border-destructive bg-destructive/10 font-bold text-destructive'
                    : 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                }`}
              >
                {on[rule.id] ? '✕' : '✓'} {rule.label}
              </button>
            ))}
          </div>

          <div
            className={`space-y-4 rounded-xl border p-6 ${
              on.gradient
                ? 'border-violet-300 bg-gradient-to-br from-amber-50 to-orange-200 text-stone-800'
                : 'border-stone-300 bg-stone-100 text-stone-900 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100'
            } ${on.shadow ? 'shadow-xl' : ''}`}
          >
            {on.glass ? (
              <div className="flex items-center justify-between rounded-full border border-white/40 bg-white/50 px-4 py-2 text-xs backdrop-blur">
                <span>Northwind</span>
                <span className="rounded-full bg-stone-900 px-3 py-1 text-white">Book</span>
              </div>
            ) : (
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium">Northwind</span>
                <span className="bg-stone-900 px-3 py-1 text-white">Book</span>
              </div>
            )}

            <div className={on.hairline ? 'border-t border-stone-400 pt-4' : 'pt-2'}>
              {on.eyebrow ? (
                <p className="mb-2 text-[10px] tracking-[0.2em] uppercase text-stone-500">
                  New · Coastal rooms
                </p>
              ) : null}
              <h3 className="max-w-md text-3xl leading-none font-semibold tracking-tight">
                {on.index ? '01 — ' : ''}
                Rooms above the harbor
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed">
                {isEn
                  ? 'Twelve rooms. Breakfast until ten. The street is on the old postcard, not a stock beach.'
                  : 'Dua belas kamar. Sarapan sampai pukul sepuluh. Jalanannya ada di kartu pos lama, bukan pantai stok.'}
              </p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            {isEn
              ? 'Red means the tell is present and v2 would fail it. Green means the page dropped it: space, a type step, or a real picture instead.'
              : 'Merah berarti tandanya ada dan v2 akan menggagalkannya. Hijau berarti halaman menghapusnya: diganti spasi, langkah warna, atau gambar sungguhan.'}
          </p>
        </CardContent>
      </Card>
    </section>
  )
}
