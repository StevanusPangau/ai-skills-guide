import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const workflows = [
  {
    title: 'Project Baru (Main Build Chain)',
    description: 'Pipeline utama dari ide hingga kode yang siap merge.',
    mengapa: 'Setiap step menghasilkan artifact yang menjadi input step berikutnya. Tidak ada step yang bisa di-skip tanpa mengorbankan kualitas output.',
    steps: ['grill-with-docs', 'to-prd', 'to-issues', 'implement (tdd)', 'code-review'],
  },
  {
    title: 'Perbaiki Bug',
    description: 'Debugging sistematis dengan 6 fase — feedback loop PERTAMA, hypothesis KEDUA.',
    mengapa: 'Jumping to hypothesis tanpa feedback loop adalah failure mode #1. Phase 1 (build feedback loop) adalah THE SKILL — sisanya mechanical.',
    steps: ['diagnosing-bugs (6 fase)', 'fix + regression test', 'code-review'],
  },
  {
    title: 'Perbaiki Arsitektur',
    description: 'Identifikasi shallow modules dan deepen secara bertahap.',
    mengapa: 'Jika codebase garbage, AI produce garbage. Fix output dulu, BARU improve system yang menghasilkannya. Jalankan seminggu sekali atau setelah development surge.',
    steps: ['improve-codebase-architecture', 'pilih candidate', 'to-issues', 'implement', 'code-review'],
  },
  {
    title: 'Triage Backlog',
    description: 'Ubah backlog berantakan menjadi agent-ready work via state machine.',
    mengapa: 'Tanpa triage, issues menumpuk tanpa clarity. State machine memastikan setiap issue punya exactly satu category + satu state — tidak ada ambiguity.',
    steps: ['triage (state machine)', 'ready-for-agent → implement', 'ready-for-human → manual'],
  },
  {
    title: 'Fitur Cepat (Skip PRD)',
    description: 'Shortcut untuk fitur kecil yang scope-nya sudah 100% clear.',
    mengapa: 'Tidak semua fitur butuh full PRD. Jika scope kecil dan bisa dijelaskan dalam 1-2 kalimat, langsung grill → implement.',
    steps: ['grill-with-docs (singkat)', 'implement (tdd)', 'code-review'],
  },
  {
    title: 'DIY Sub-Agent Pattern',
    description: 'Handoff → prototype di session baru → handoff back learnings.',
    mengapa: 'Saat grilling menemukan pertanyaan yang butuh kode untuk dijawab (UI yang harus dilihat, state machine yang harus dicoba), jangan pollute session saat ini. Gunakan full context window session baru untuk explore, compress learnings, pass back.',
    steps: ['/handoff (purpose: prototype)', 'session baru: /prototype', '/handoff back learnings', 'lanjut grilling dengan insight'],
  },
  {
    title: 'Lintas Agent/Tool',
    description: 'Bridge context dari satu AI tool ke tool lain via markdown.',
    mengapa: 'Handoff document = markdown. Portable ke agent manapun: Claude Code → Codex → Copilot → any agent. Enables adversarial review (different agents review each other) dan tool diversity.',
    steps: ['/handoff (dari agent A)', 'load di agent B', 'kerja di agent B', '/handoff back (jika perlu)'],
  },
]

export function Workflows() {
  return (
    <section id="workflows" className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Pola Kerja</h2>
        <p className="text-muted-foreground mt-1">
          Skenario umum dan urutan skill yang direkomendasikan. Setiap pola dirancang
          untuk menjaga agent di Smart Zone (~120k tokens).
        </p>
      </div>

      <div className="grid gap-4">
        {workflows.map((wf, idx) => (
          <Card key={wf.title} className="border border-border">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0">
                  {idx + 1}
                </span>
                <div>
                  <CardTitle className="text-sm font-semibold">{wf.title}</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">{wf.description}</p>
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
                <span className="font-semibold not-italic text-foreground">Mengapa: </span>
                {wf.mengapa}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
