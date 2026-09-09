import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getLocale } from '@/paraglide/runtime.js'

type Wf = { titleId: string; titleEn: string; descId: string; descEn: string; whyId: string; whyEn: string; steps: string[] }

const workflows: Wf[] = [
  {
    titleId: 'Kirim halaman Next.js yang cepat',
    titleEn: 'Ship a fast Next.js page',
    descId: 'Dari aturan performa sampai preview deployment untuk satu halaman atau fitur.',
    descEn: 'From performance rules to preview deployment for a single page or feature.',
    whyId: 'Aturan performa paling murah diterapkan saat menulis kode, bukan setelah rilis — review dan preview menangkap sisanya.',
    whyEn: 'Performance rules are cheapest applied while writing code, not after release — review and preview catch the rest.',
    steps: ['/vercel-react-best-practices', '/vercel-composition-patterns', '/web-design-guidelines', '/deploy-to-vercel'],
  },
  {
    titleId: 'Deploy preview dari sandbox atau CI',
    titleEn: 'Preview deploys from sandbox or CI',
    descId: 'Deploy non-interaktif tanpa browser login memakai token dan ID proyek berpasangan.',
    descEn: 'Non-interactive deploys with no browser login using a token and paired project IDs.',
    whyId: 'Agent coding (sandbox, CI) tidak bisa klik login — token via env var adalah satu-satunya jalan yang aman.',
    whyEn: 'Coding agents (sandbox, CI) cannot click through login — a token via env var is the only safe path.',
    steps: ['VERCEL_TOKEN via env', '/vercel-cli-with-tokens', '/deploy-to-vercel', 'Preview URL + Claim URL'],
  },
  {
    titleId: 'Pangkas tagihan setelah ada traffic',
    titleEn: 'Cut the bill once traffic exists',
    descId: 'Audit biaya dan performa berbasis metrik setelah 14 hari sinyal terkumpul.',
    descEn: 'Metrics-driven cost and performance audit after 14 days of signals accumulate.',
    whyId: 'Optimasi tanpa data hanya tebakan — signals.json memastikan tiap rekomendasi punya bukti metrik.',
    whyEn: 'Optimizing without data is guessing — signals.json ensures every recommendation has metric evidence.',
    steps: ['deploy + tunggu 14 hari / deploy + wait 14 days', 'signals.json', '/vercel-optimize', 'report.md'],
  },
]

export function VercelWorkflows() {
  const isEn = getLocale() === 'en'
  return (
    <section id="workflows" className="scroll-mt-20 space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-balance">{isEn ? 'Common workflows' : 'Alur kerja umum'}</h2>
        <p className="text-muted-foreground mt-1 text-sm">{isEn ? 'How Vercel skills combine in real tasks.' : 'Cara skill Vercel digabungkan dalam tugas nyata.'}</p>
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
