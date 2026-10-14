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
    titleId: 'Halaman publik baru',
    titleEn: 'A new public page',
    descId: 'Satu skill default: inventaris klien, draw arah, bangun, lalu inspector browser.',
    descEn: 'One default skill: client inventory, a direction draw, the build, then the browser inspector.',
    whyId: 'Memasang semua varian gaya sekaligus membuat agen mencampur aturan yang saling bertentangan.',
    whyEn: 'Installing every style variant at once makes the agent mix rules that contradict each other.',
    steps: [
      'design-taste-frontend',
      'draw.mjs --options 3',
      'build from the sheet',
      'inspect.mjs 1440 / 768 / 390',
    ],
  },
  {
    titleId: 'Gambar dulu, baru kode',
    titleEn: 'Images first, then code',
    descId: 'Satu gambar per section, analisis, lalu implementasi yang mengikuti frame itu.',
    descEn: 'One image per section, an analysis, then an implementation that follows those frames.',
    whyId: 'Papan komposit yang padat tidak bisa dibaca sebagai hierarki section.',
    whyEn: 'A packed composite board cannot be read as a section hierarchy.',
    steps: [
      'imagegen-frontend-web',
      'one image per section',
      'image-to-code',
      'match the frames',
    ],
  },
  {
    titleId: 'Halaman yang sudah ada',
    titleEn: 'A page that already exists',
    descId: 'Audit dulu, perbaiki di tempat, lalu kunci arah jika identitas visualnya sudah jelas.',
    descEn: 'Audit first, fix in place, then lock a direction once the visual identity is clear.',
    whyId: 'Menulis ulang dari nol menghapus perilaku yang sudah jalan hanya demi tampilan.',
    whyEn: 'A from-scratch rewrite deletes working behavior just to change the look.',
    steps: [
      'redesign-existing-projects',
      'fix in place',
      'minimalist-ui or high-end-visual-design',
      'full-output-enforcement if it truncates',
    ],
  },
]

export function TasteWorkflows() {
  const isEn = getLocale() === 'en'

  return (
    <section id="workflows" className="scroll-mt-20 space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-balance">
          {isEn ? 'Common workflows' : 'Alur kerja umum'}
        </h2>
        <p className="text-muted-foreground mt-1 text-sm">
          {isEn
            ? 'Three ways to combine the skills. Pick one direction per project.'
            : 'Tiga cara menggabungkan skill. Pilih satu arah per proyek.'}
        </p>
      </div>
      <div className="grid gap-4">
        {workflows.map((wf, idx) => (
          <Card key={wf.titleEn} className="border border-border">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {idx + 1}
                </span>
                <div>
                  <CardTitle className="text-sm font-semibold">
                    {isEn ? wf.titleEn : wf.titleId}
                  </CardTitle>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {isEn ? wf.descEn : wf.descId}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap items-center gap-1.5">
                {wf.steps.map((step, i) => (
                  <span key={step} className="flex items-center gap-1.5">
                    <Badge variant="secondary" className="font-mono text-xs whitespace-nowrap">
                      {step}
                    </Badge>
                    {i < wf.steps.length - 1 ? (
                      <span className="text-sm text-muted-foreground">→</span>
                    ) : null}
                  </span>
                ))}
              </div>
              <div className="border-l-2 border-primary/30 pl-3 text-xs text-muted-foreground italic">
                <span className="font-semibold text-foreground not-italic">
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
