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
    titleId: 'Setup Proyek: Konteks Produk Lebih Dulu',
    titleEn: 'Project Setup: Product Context First',
    descId: 'Memasang Impeccable, lalu init untuk menulis PRODUCT.md; DESIGN.md dibuat terpisah dari kode yang ada atau dunia visual baru.',
    descEn: 'Install Impeccable, then init writes PRODUCT.md; DESIGN.md is produced separately from existing code or a new visual world.',
    whyId: 'Setiap command lain membaca PRODUCT.md dan DESIGN.md sebelum bekerja, jadi konteks yang tahan lama mencegah hasil generik.',
    whyEn: 'Every other command reads PRODUCT.md and DESIGN.md before working, so durable context prevents generic output.',
    steps: [
      'npx impeccable install',
      '/impeccable init',
      'interview: users, purpose, constraints (PRODUCT.md)',
      '/impeccable document (existing UI code → DESIGN.md)',
    ],
  },
  {
    titleId: 'Evaluasi, Perbaiki, Poles',
    titleEn: 'Evaluate, Refine, Polish',
    descId: 'Audit teknis dan kritik UX, lalu perbaiki dengan command yang disarankan, dan akhiri dengan polish.',
    descEn: 'Run a technical audit and a UX critique, fix with the recommended commands, and finish with polish.',
    whyId: 'Audit memberi skor 0-4 per dimensi dan keparahan P0-P3 serta urutan command yang disarankan, dengan polish sebagai langkah terakhir.',
    whyEn: 'Audit gives 0-4 scores per dimension and P0-P3 severity plus a suggested command order, with polish as the last step.',
    steps: [
      '/impeccable audit checkout',
      '/impeccable critique checkout',
      '/impeccable layout checkout  (spacing, rhythm, hierarchy)',
      '/impeccable colorize checkout  (color roles, AA contrast floor)',
      '/impeccable polish checkout',
    ],
  },
  {
    titleId: 'Eksperimen Varian Live di Browser',
    titleEn: 'Live Variant Experiments in the Browser',
    descId: 'Dengan dev server lokal berjalan, pilih elemen di browser atau minta varian lewat satu kalimat, lalu terima yang terbaik.',
    descEn: 'With a local dev server running, pick an element in the browser or ask for variants in one sentence, then accept the best one.',
    whyId: 'Varian diterapkan lewat HMR dev server Anda, jadi dilihat langsung di halaman asli; hanya untuk checkout lokal, bukan situs produksi.',
    whyEn: 'Variants are applied through your dev server\'s HMR so you see them on the real page; for local checkouts only, not production sites.',
    steps: [
      'start local dev server',
      '/impeccable live',
      'pick an element and an action in the browser overlay',
      '/impeccable generate 3 bolder variants of the pricing cards',
      'accept the chosen variant',
    ],
  },
]

export function ImpeccableWorkflows() {
  const isEn = getLocale() === 'en'

  return (
    <section id="workflows" className="scroll-mt-20 space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-balance">
          {isEn ? 'Common workflows' : 'Alur kerja umum'}
        </h2>
        <p className="text-muted-foreground mt-1 text-sm">
          {isEn
            ? 'How Impeccable commands combine across design engineering workflows.'
            : 'Cara command Impeccable berkolaborasi dalam siklus rekayasa desain.'}
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
