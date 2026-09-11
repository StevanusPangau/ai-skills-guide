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
    titleId: 'Inisialisasi Sistem Desain Proyek Baru',
    titleEn: 'Greenfield Design System Initialization',
    descId: 'Wawancara penemuan produk, pembuatan PRODUCT.md, ekstraksi token ke DESIGN.md, dan konfigurasi live mode.',
    descEn: 'Discovery interview, authoring PRODUCT.md, extracting tokens into DESIGN.md, and configuring live mode.',
    whyId: 'Menulis UI tanpa spesifikasi desain tertulis membuat agen menghasilkan tampilan generik yang tidak konsisten.',
    whyEn: 'Authoring UI without written design tokens produces inconsistent, generic aesthetic drift.',
    steps: [
      'npx impeccable init',
      'interview: users, brand character, principles',
      'generate PRODUCT.md & DESIGN.md',
      'bind design tokens to Tailwind / CSS variables',
    ],
  },
  {
    titleId: 'Audit Teknis dan Pembersihan Anti-Patterns',
    titleEn: 'Technical Audit & Anti-Pattern Cleanup',
    descId: 'Menjalankan audit kualitas teknis terstruktur dengan penilaian keparahan P0-P3 dan rencana perbaikan.',
    descEn: 'Execute structured technical quality audit with P0-P3 severity grading and remediation roadmap.',
    whyId: 'Audit terstruktur memisahkan blocker aksesibilitas kritis (P0) dari pemolesan mikro kosmetik (P3).',
    whyEn: 'Structured audits isolate critical accessibility blockers (P0) from minor cosmetic polish (P3).',
    steps: [
      'npx impeccable audit [target-screen]',
      'review P0-P3 scored report',
      'apply /normalize on spacing and typography',
      'apply /colorize for WCAG contrast compliance',
    ],
  },
  {
    titleId: 'Eksperimen Desain Live Interaktif di Browser',
    titleEn: 'Interactive Live Browser Design Prototyping',
    descId: 'Memilih elemen di browser aktif, meminta varian desain AI, dan menerapkan hot-swap via HMR.',
    descEn: 'Select elements on running browser screens, prompt AI variants, and hot-swap via HMR.',
    whyId: 'Melihat varian visual secara langsung di browser menghemat waktu siklus edit-refresh manual.',
    whyEn: 'Evaluating visual alternatives directly in browser viewports collapses edit-refresh feedback loops.',
    steps: [
      'start local dev server',
      'npx impeccable live',
      'select target element in browser viewport',
      'generate 3 alternative variants via AI',
      'apply chosen variant into source code',
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
            ? 'How Impeccable design skills combine across design engineering workflows.'
            : 'Cara skill desain Impeccable berkolaborasi dalam siklus rekayasa desain web.'}
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
