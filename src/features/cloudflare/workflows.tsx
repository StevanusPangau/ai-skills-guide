import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getLocale } from '@/paraglide/runtime.js'

type Wf = { titleId: string; titleEn: string; descId: string; descEn: string; whyId: string; whyEn: string; steps: string[] }

const workflows: Wf[] = [
  {
    titleId: 'Ship Worker pertama ke produksi',
    titleEn: 'Ship your first Worker to production',
    descId: 'Pilih produk, tulis dengan best practices, deploy dengan Wrangler lokal.',
    descEn: 'Pick the product, write with best practices, deploy with local Wrangler.',
    whyId: 'Salah pilih produk di awal mahal diperbaiki — discovery dulu, lalu retrieval docs sebelum coding.',
    whyEn: 'A wrong product choice is expensive to fix later — discover first, then retrieve docs before coding.',
    steps: ['/cloudflare', '/workers-best-practices', 'wrangler types', '/wrangler', 'wrangler deploy'],
  },
  {
    titleId: 'Amankan form dengan Turnstile',
    titleEn: 'Protect a form with Turnstile',
    descId: 'Pasang widget di frontend yang ada, validasi token di backend — fail closed.',
    descEn: 'Embed the widget in the existing frontend, validate tokens in the backend — fail closed.',
    whyId: 'Validasi di browser saja sama dengan tidak ada proteksi — siteverify wajib di backend dengan action dan hostname dicek.',
    whyEn: 'Browser-only validation is no protection — siteverify must run in the backend with action and hostname checked.',
    steps: ['auth-probe.sh', 'embed widget + action', 'siteverify (backend)', 'fresh-token + replay test'],
  },
  {
    titleId: 'Pindah Sandbox stable ke @next',
    titleEn: 'Move Sandbox from stable to @next',
    descId: 'Audit API lama, samakan lini package, ganti exec string dengan argv, cutover dengan approval.',
    descEn: 'Audit legacy APIs, align the package line, swap string exec for argv, cut over with approval.',
    whyId: 'Campur lini stable dan @next menghasilkan error misterius — migrasi adalah operasi terencana, bukan find-replace.',
    whyEn: 'Mixing stable and @next lines causes cryptic errors — migration is a planned operation, not find-replace.',
    steps: ['/sandbox-migrate-to-next', 'replacement map', 'grep removed APIs + smoke test', '--containers-rollout=immediate'],
  },
]

export function CloudflareWorkflows() {
  const isEn = getLocale() === 'en'
  return (
    <section id="workflows" className="scroll-mt-20 space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-balance">{isEn ? 'Common workflows' : 'Alur kerja umum'}</h2>
        <p className="text-muted-foreground mt-1 text-sm">{isEn ? 'How Cloudflare skills combine in real tasks.' : 'Cara skill Cloudflare digabungkan dalam tugas nyata.'}</p>
      </div>
      <div className="grid gap-4">
        {workflows.map((wf, idx) => (
          <Card key={idx} className="border border-border">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0">
                  {idx + 1}
                </span>
                <div>
                  <CardTitle className="text-sm font-semibold">{isEn ? wf.titleEn : wf.titleId}</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">{isEn ? wf.descEn : wf.descId}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap items-center gap-1.5">
                {wf.steps.map((step, i) => (
                  <span key={i} className="flex items-center gap-1.5">
                    <Badge variant="secondary" className="text-xs font-mono whitespace-nowrap">
                      {step}
                    </Badge>
                    {i < wf.steps.length - 1 && (
                      <span className="text-muted-foreground text-sm">→</span>
                    )}
                  </span>
                ))}
              </div>
              <div className="text-xs text-muted-foreground border-l-2 border-primary/30 pl-3 italic">
                <span className="font-semibold not-italic text-foreground">{isEn ? 'Why: ' : 'Mengapa: '}</span>
                {isEn ? wf.whyEn : wf.whyId}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
