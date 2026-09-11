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
    titleId: 'Membangun Data Table Interaktif Type-Safe',
    titleEn: 'Build an Interactive Type-Safe Datagrid',
    descId: 'Menggabungkan TanStack Query untuk data fetching dan TanStack Table untuk sorting, filter, dan pagination.',
    descEn: 'Combine TanStack Query for data fetching and TanStack Table for sorting, filtering, and pagination.',
    whyId: 'Memisahkan data layer server dari representasi UI headless memastikan tabel merespons filter seketika tanpa request berulang.',
    whyEn: 'Decoupling server data layers from headless UI guarantees instant table filtering without redundant network requests.',
    steps: [
      'queryOptions factory (Query)',
      'createColumnHelper columns (Table)',
      'useReactTable({ data, columns })',
      'render tailwind / shadcn <table>',
      'integrate pagination controls',
    ],
  },
  {
    titleId: 'Rute Berpagar Auth dengan Server Function',
    titleEn: 'Auth-Guarded Route with Server Functions',
    descId: 'Memvalidasi sesi di beforeLoad TanStack Router dan mengambil data terproteksi via createServerFn TanStack Start.',
    descEn: 'Verify sessions in TanStack Router beforeLoad and fetch protected data with TanStack Start createServerFn.',
    whyId: 'Memvalidasi kredensial sebelum loader dieksekusi mencegah eksekusi kueri liar dari pengguna yang belum login.',
    whyEn: 'Guarding credentials in beforeLoad prevents unauthorized loader execution before sensitive data touches the wire.',
    steps: [
      'createFileRoute("/dashboard")',
      'beforeLoad checkSession() or redirect',
      'createServerFn().handler(fetchDashboard)',
      'loader: ({ context }) => fetchDashboard()',
      'render Route.useLoaderData()',
    ],
  },
  {
    titleId: 'Virtualisasi Infinite Feed Performa Tinggi',
    titleEn: 'High-Performance Virtualized Infinite Feed',
    descId: 'Menghubungkan useInfiniteQuery TanStack Query dengan useVirtualizer TanStack Virtual untuk me-render ribuan kartu.',
    descEn: 'Wire TanStack Query useInfiniteQuery with TanStack Virtual useVirtualizer to render thousands of feed items.',
    whyId: 'Tanpa virtualisasi, 10.000 item di DOM memakan memori ratusan megabyte dan membekukan thread browser (jank).',
    whyEn: 'Without virtualization, 10,000 DOM nodes consume hundreds of MBs and freeze the browser main thread.',
    steps: [
      'useInfiniteQuery({ getNextPageParam })',
      'flatten query.data.pages into array',
      'useVirtualizer({ count, estimateSize: 120 })',
      'render absolute container + virtualItem.start',
      'trigger fetchNextPage on last row in view',
    ],
  },
]

export function TanStackWorkflows() {
  const isEn = getLocale() === 'en'

  return (
    <section id="workflows" className="scroll-mt-20 space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-balance">
          {isEn ? 'Common workflows' : 'Alur kerja umum'}
        </h2>
        <p className="text-muted-foreground mt-1 text-sm">
          {isEn
            ? 'How TanStack libraries orchestrate modern application architectures.'
            : 'Cara library TanStack berkolaborasi dalam arsitektur aplikasi modern.'}
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
