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
    titleId: 'Upgrade Prisma ORM v6 ke v7 Tanpa Downtime',
    titleEn: 'Zero-Downtime Prisma ORM v6 to v7 Upgrade',
    descId: 'Memperbarui generator, memasang driver adapter, menyusun prisma.config.ts, dan men-generate client baru.',
    descEn: 'Update generator, install driver adapters, scaffold prisma.config.ts, and compile the modern client.',
    whyId: 'Prisma 7 menghapus query engine binary C++ — tanpa adapter JavaScript, inisialisasi client akan gagal saat runtime.',
    whyEn: 'Prisma 7 eliminates native binary query engines — without a JavaScript driver adapter, client initialization crashes.',
    steps: [
      'ganti generator prisma-client di schema',
      'npm i @prisma/adapter-pg pg',
      'buat prisma.config.ts',
      'npx prisma generate',
      'verifikasi kueri via test suite',
    ],
  },
  {
    titleId: 'Setup Database Prisma Postgres Serverless',
    titleEn: 'Provision Serverless Prisma Postgres',
    descId: 'Membuat database cloud via Management API, menghubungkan DATABASE_URL, dan mengeksekusi migrasi perdana.',
    descEn: 'Provision cloud database via Management API, bind DATABASE_URL, and execute initial schema migration.',
    whyId: 'Memisahkan URL pooler (port transaksi) dari directUrl menjamin operasi migrasi DDL tidak ditolak proxy.',
    whyEn: 'Segregating transaction pooler URLs from directUrl guarantees DDL migrations succeed without proxy rejection.',
    steps: [
      'npx create-db --region us-east-1',
      'isi DATABASE_URL & DIRECT_URL di .env',
      'npx prisma migrate deploy',
      'prisma studio (inspeksi visual)',
    ],
  },
  {
    titleId: 'Deploy Aplikasi Prisma ke Prisma Compute',
    titleEn: 'Deploy Prisma Application to Prisma Compute',
    descId: 'Mengonfigurasi prisma.compute.ts, binding host 0.0.0.0, dan deployment artifact.',
    descEn: 'Configure prisma.compute.ts, enforce 0.0.0.0 host binding, and deploy container artifact.',
    whyId: 'Container Prisma Compute menolak koneksi localhost loopback — binding 0.0.0.0 adalah syarat mutlak ingress 200 OK.',
    whyEn: 'Prisma Compute ingress rejects localhost loopback — binding to 0.0.0.0 is mandatory for healthy ingress.',
    steps: [
      'setup prisma.compute.ts',
      'bind app.listen(PORT, "0.0.0.0")',
      'npx prisma app deploy',
      'npx prisma app logs (verifikasi)',
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
