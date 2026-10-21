import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getLocale } from '@/paraglide/runtime.js'

type Wf = {
  titleId: string
  titleEn: string
  descId: string
  descEn: string
  whyId: string
  whyEn: string
  steps: string[]
}

const workflows: Wf[] = [
  {
    titleId: 'App baru lewat skill neon',
    titleEn: 'New app via the neon skill',
    descId: 'Petakan kemampuan, reuse yang ada, provision primitif yang belum ada, lalu verifikasi alur app.',
    descEn: 'Map capabilities, reuse what exists, provision missing primitives, then verify the app flow.',
    whyId: 'Parent neon mencegah mengganti IdP/S3/DATABASE_URL yang sudah bekerja dan mengarahkan child skill yang tepat.',
    whyEn: 'The parent neon skill avoids replacing a working IdP/S3/DATABASE_URL and routes to the right child skills.',
    steps: [
      'map login / files / APIs / LLM / live / SQL',
      'reuse DATABASE_URL & IdP bila ada',
      'neon init | link → neon.ts',
      'neon deploy',
      'verify sign-in / upload / API',
    ],
  },
  {
    titleId: 'Branch untuk migrasi',
    titleEn: 'Branch for a migration',
    descId: 'Branch Type Decision → buat normal (atau schema-only bila data sensitif) → migrasi dengan connection string direct.',
    descEn: 'Branch Type Decision → create normal (or schema-only if data is sensitive) → migrate with a direct connection string.',
    whyId: 'Uji migrasi di branch menangkap edge case sebelum production; hostname pooled (-pooler) tidak dipakai untuk migrasi.',
    whyEn: 'Testing migrations on a branch catches edge cases before production; a pooled (-pooler) hostname is not used for migrations.',
    steps: [
      'Branch Type Decision',
      'neon branches create [--schema-only]',
      'direct connection-string',
      'run migration on branch',
      'promote / apply to parent',
    ],
  },
  {
    titleId: 'Diagnosa egress',
    titleEn: 'Egress diagnosis',
    descId: 'pg_stat_statements → analisis codebase → perbaiki SELECT */pagination/cache/agregasi/JOIN → verify.',
    descEn: 'pg_stat_statements → codebase analysis → fix SELECT */pagination/cache/aggregation/JOIN → verify.',
    whyId: 'Sebagian besar tagihan egress tinggi berasal dari aplikasi yang mengambil data lebih banyak daripada yang dipakai.',
    whyEn: 'Most high egress bills come from the application fetching more data than it uses.',
    steps: [
      'pg_stat_statements diagnose',
      'rank wide + frequent queries',
      'fix SELECT * / LIMIT / JOIN',
      'push aggregation into SQL',
      'reset stats & re-measure',
    ],
  },
]

export function NeonWorkflows() {
  const isEn = getLocale() === 'en'

  return (
    <section id="workflows" className="scroll-mt-20 space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-balance">
          {isEn ? 'Common workflows' : 'Alur kerja umum'}
        </h2>
        <p className="text-muted-foreground mt-1 text-sm">
          {isEn
            ? 'How Neon skills combine for new apps, migration branches, and egress fixes.'
            : 'Cara skill Neon digabungkan untuk app baru, branch migrasi, dan perbaikan egress.'}
        </p>
      </div>
      <div className="grid gap-4">
        {workflows.map((wf, idx) => (
          <Card key={idx} className="border border-border">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0">
                  {idx + 1}
                </span>
                <div className="min-w-0">
                  <CardTitle className="text-sm font-semibold">
                    {isEn ? wf.titleEn : wf.titleId}
                  </CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {isEn ? wf.descEn : wf.descId}
                  </p>
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
                <span className="font-semibold not-italic text-foreground">
                  {isEn ? 'Why: ' : 'Mengapa: '}
                </span>
                {isEn ? wf.whyEn : wf.whyId}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
