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
    titleId: 'Setup Skema Multi-Tenant Aman dengan RLS',
    titleEn: 'Secure Multi-Tenant Schema with RLS',
    descId: 'Membuat tabel, mengindeks foreign key, mengaktifkan RLS, dan memasang policy dengan evaluasi tunggal.',
    descEn: 'Create tables, index foreign keys, enable RLS, and install single-evaluation cached policies.',
    whyId: 'Kebocoran data antar tenant terjadi saat RLS lupa diaktifkan atau ditulis tanpa subquery wrapper yang efisien.',
    whyEn: 'Cross-tenant leaks occur when RLS is omitted or authored without performant subquery wrappers.',
    steps: [
      'create table (IDENTITY PK)',
      'create index on foreign_keys',
      'alter table enable row level security',
      'create policy using ((select auth.uid()) = user_id)',
      'test query as anon & authenticated',
    ],
  },
  {
    titleId: 'Diagnosa dan Pemulihan Kueri Lambat',
    titleEn: 'Slow Query Diagnosis & Remediation',
    descId: 'Menganalisis query plan dengan EXPLAIN ANALYZE dan menambahkan indeks komposit/parsial.',
    descEn: 'Profile query execution with EXPLAIN ANALYZE and apply composite or partial indexes.',
    whyId: 'Menambahkan indeks sembarangan menambah beban tulis disk — EXPLAIN ANALYZE memastikan letak bottleneck sesungguhnya.',
    whyEn: 'Adding random indexes bloats disk writes — EXPLAIN ANALYZE proves the true sequential scan bottleneck.',
    steps: [
      'explain (analyze, buffers) select ...',
      'identify Seq Scan on large table',
      'create index concurrently / partial index',
      're-run explain & verify index scan',
      'vacuum analyze table',
    ],
  },
  {
    titleId: 'Worker Queue Paralel Tanpa Deadlock',
    titleEn: 'Parallel Worker Queue Without Deadlocks',
    descId: 'Membangun pemrosesan antrean batch berkecepatan tinggi dengan SKIP LOCKED dan transaksi pendek.',
    descEn: 'Build high-throughput batch queue workers using SKIP LOCKED and short transaction scopes.',
    whyId: 'Pekerja paralel yang memperebutkan baris yang sama akan saling menunggu kunci (lock contention) dan memicu deadlock.',
    whyEn: 'Parallel workers competing for the same rows block on locks and trigger catastrophic deadlocks.',
    steps: [
      'select * from jobs where status = pending for update skip locked',
      'process job in application memory',
      'short transaction update status = completed',
      'commit',
    ],
  },
]

export function SupabaseWorkflows() {
  const isEn = getLocale() === 'en'

  return (
    <section id="workflows" className="scroll-mt-20 space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-balance">
          {isEn ? 'Common workflows' : 'Alur kerja umum'}
        </h2>
        <p className="text-muted-foreground mt-1 text-sm">
          {isEn
            ? 'How Supabase Postgres rules combine in production tasks.'
            : 'Cara aturan Postgres Supabase digabungkan dalam tugas nyata.'}
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
