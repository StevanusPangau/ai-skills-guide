import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getLocale } from '@/paraglide/runtime.js'

type Wf = { titleId: string; titleEn: string; descId: string; descEn: string; whyId: string; whyEn: string; steps: string[] }

const workflows: Wf[] = [
  {
    titleId: 'Laporan klien .docx dari nol',
    titleEn: 'Client .docx report from scratch',
    descId: 'Tulis bersama, terapkan identitas, hasilkan dokumen Word yang tidak rusak.',
    descEn: 'Co-write, apply identity, produce a Word document that does not corrupt.',
    whyId: 'Dokumen rusak hampir selalu berasal dari detail XML yang dilewati — alur ini memaksa validasi di tiap tahap.',
    whyEn: 'Corrupt documents almost always come from skipped XML details — this flow forces validation at each stage.',
    steps: ['/doc-coauthoring', '/brand-guidelines', '/docx', 'merge_runs.py + render visual'],
  },
  {
    titleId: 'Deck presentasi bertema untuk klien',
    titleEn: 'Themed presentation deck for a client',
    descId: 'Pilih preset dari showcase, terapkan ke deck, validasi terhadap template asli.',
    descEn: 'Pick a preset from the showcase, apply it to the deck, validate against the original template.',
    whyId: 'Showcase hanya untuk dilihat — tema diterapkan via kode, dan validasi membedakan error template dari regresi.',
    whyEn: 'The showcase is view-only — themes apply via code, and validation separates template errors from regressions.',
    steps: ['/theme-factory', '/pptx', 'validate.py --original', 'deck final'],
  },
  {
    titleId: 'Buat skill reusable sendiri',
    titleEn: 'Build your own reusable skill',
    descId: 'Tulis skill, uji melawan baseline, iterasi dari bukti evaluasi.',
    descEn: 'Write a skill, test against baseline, iterate from evaluation evidence.',
    whyId: 'Skill yang tidak dievaluasi hanya prompt panjang — perbandingan with-skill vs baseline membuktikan nilainya.',
    whyEn: 'An unevaluated skill is just a long prompt — with-skill vs baseline comparison proves its value.',
    steps: ['/skill-creator', 'evals/evals.json + baseline', 'generate_review.py', 'skill + SKILL.md'],
  },
]

export function AnthropicWorkflows() {
  const isEn = getLocale() === 'en'
  return (
    <section id="workflows" className="scroll-mt-20 space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-balance">{isEn ? 'Common workflows' : 'Alur kerja umum'}</h2>
        <p className="text-muted-foreground mt-1 text-sm">{isEn ? 'How Anthropic skills combine in real tasks.' : 'Cara skill Anthropic digabungkan dalam tugas nyata.'}</p>
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
