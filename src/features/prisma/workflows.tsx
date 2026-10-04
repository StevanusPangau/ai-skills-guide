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
    titleId: 'Upgrade Prisma ORM v6 ke v7',
    titleEn: 'Prisma ORM v6 to v7 Upgrade',
    descId: 'Memperbarui generator, memasang driver adapter, menyusun prisma.config.ts, dan men-generate client baru.',
    descEn: 'Update generator, install driver adapters, scaffold prisma.config.ts, and compile the modern client.',
    whyId: 'Prisma 7 mewajibkan driver adapter untuk provider SQL — tanpa adapter, client tidak bisa terhubung ke database.',
    whyEn: 'Prisma 7 requires a driver adapter for SQL providers — without one, the client cannot connect to the database.',
    steps: [
      'ganti generator ke prisma-client dengan output eksplisit',
      'npm i @prisma/adapter-pg pg',
      'buat prisma.config.ts',
      'npx prisma generate',
      'verifikasi kueri via test suite',
    ],
  },
  {
    titleId: 'Setup Database Prisma Postgres Serverless',
    titleEn: 'Provision Serverless Prisma Postgres',
    descId: 'Gunakan ulang atau buat database Prisma Postgres, simpan koneksi dengan aman, lalu serahkan setup ORM ke prisma-orm-setup.',
    descEn: 'Reuse or provision a Prisma Postgres database, store the connection safely, then hand ORM setup to prisma-orm-setup.',
    whyId: 'Memisahkan provisioning database dari konfigurasi ORM mencegah pembuatan database ganda dan menjaga setup tetap terverifikasi.',
    whyEn: 'Keeping provisioning separate from ORM configuration avoids duplicate databases and keeps setup verifiable.',
    steps: [
      'periksa koneksi/integrasi yang sudah ada',
      'jika perlu: npx create-db@latest create --help',
      'simpan koneksi di file env / secret',
      'prisma-orm-setup: konfigurasi ORM',
      'verifikasi dengan kueri read-only',
    ],
  },
  {
    titleId: 'Deploy Aplikasi Prisma ke Prisma Compute',
    titleEn: 'Deploy Prisma Application to Prisma Compute',
    descId: 'Mengonfigurasi prisma.compute.ts (opsional), binding host 0.0.0.0, dan deploy lewat Platform CLI.',
    descEn: 'Configure prisma.compute.ts (optional), enforce 0.0.0.0 host binding, and deploy with the Platform CLI.',
    whyId: 'Readiness Compute hanya memantau port yang didengarkan — listener loopback bisa tampak siap padahal ingress publik tidak bisa menjangkaunya.',
    whyEn: 'Compute readiness only watches listening ports — a loopback listener can look ready while public ingress cannot reach it.',
    steps: [
      'bunx @prisma/cli@latest app deploy --help',
      'bind app.listen(PORT, "0.0.0.0")',
      'bunx @prisma/cli@latest app deploy',
      'bunx @prisma/cli@latest app logs (verifikasi)',
    ],
  },
]

export function PrismaWorkflows() {
  const isEn = getLocale() === 'en'

  return (
    <section id="workflows" className="scroll-mt-20 space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-balance">
          {isEn ? 'Common workflows' : 'Alur kerja umum'}
        </h2>
        <p className="text-muted-foreground mt-1 text-sm">
          {isEn
            ? 'How Prisma skills combine across development and deployment.'
            : 'Cara skill Prisma digabungkan di seluruh siklus pengembangan dan deployment.'}
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
                <div>
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
