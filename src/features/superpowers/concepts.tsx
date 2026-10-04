import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getLocale } from '@/paraglide/runtime.js'

export function SuperpowersConcepts() {
  const isEn = getLocale() === 'en'

  return (
    <section id="concepts" className="scroll-mt-20 space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-balance">
          {isEn ? 'Agentic SDLC & SDD Architecture' : 'Arsitektur Agentic SDLC & SDD'}
        </h2>
        <p className="mt-1 text-muted-foreground text-sm">
          {isEn
            ? 'Core patterns from Jesse Vincent\'s Superpowers methodology for orchestrating coding agents reliably.'
            : 'Pola-pola inti dari metodologi Superpowers karya Jesse Vincent untuk mengorkestrasi coding agent secara andal.'}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Auto-triggered skills */}
        <Card className="border-border">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between gap-2">
              <CardTitle className="text-base">
                {isEn ? 'Skills Trigger Automatically' : 'Skill Terpicu Otomatis'}
              </CardTitle>
              <Badge variant="outline" className="font-mono text-[11px]">/using-superpowers</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              {isEn
                ? 'A plugin bootstrap injected at session start tells the agent to invoke any skill with even a 1% chance of applying before any response, including clarifying questions. Workflows are mandatory, not suggestions. User instructions (CLAUDE.md, AGENTS.md) still win over skills.'
                : 'Bootstrap plugin yang disuntikkan saat session dimulai menyuruh agent memanggil skill mana pun yang punya peluang 1% berlaku sebelum respons apa pun, termasuk pertanyaan klarifikasi. Workflow bersifat wajib, bukan saran. Instruksi user (CLAUDE.md, AGENTS.md) tetap mengalahkan skill.'}
            </p>
            <div className="rounded-md bg-muted/60 p-2.5 font-mono text-xs text-foreground">
              Using [skill] to [purpose]
            </div>
          </CardContent>
        </Card>

        {/* Coordinator vs workers */}
        <Card className="border-border">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between gap-2">
              <CardTitle className="text-base">
                {isEn ? 'Fresh Subagents per Task' : 'Subagent Segar per Task'}
              </CardTitle>
              <Badge variant="outline" className="font-mono text-[11px]">/subagent-driven-development</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              {isEn
                ? 'The controller dispatches a fresh implementer per task, then a task review (spec compliance + code quality), with up to five fix rounds and a broad whole-branch review at the end. Subagents never inherit the session history. A progress ledger on disk survives context compaction.'
                : 'Controller men-dispatch implementer segar per task, lalu review task (kepatuhan spec + kualitas kode), dengan hingga lima putaran perbaikan dan review luas seluruh branch di akhir. Subagent tidak pernah mewarisi riwayat session. Ledger progres di disk bertahan dari kompaksi konteks.'}
            </p>
            <div className="rounded-md bg-muted/60 p-2.5 font-mono text-xs text-foreground">
              Task N → implementer → task review → fix rounds (≤5) → final review
            </div>
          </CardContent>
        </Card>

        {/* Three paths */}
        <Card className="border-border">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between gap-2">
              <CardTitle className="text-base">
                {isEn ? 'Brainstorm Paths with a Hard Gate' : 'Jalur Brainstorming dengan Hard Gate'}
              </CardTitle>
              <Badge variant="outline" className="font-mono text-[11px]">/brainstorming</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              {isEn
                ? 'The agent classifies the request out loud as Spike, Bounded, or Architectural, and takes the heavier path when in doubt. No implementation action happens until that path\'s approval is given; Architectural work needs a written spec and a reviewed plan.'
                : 'Agent mengklasifikasikan permintaan keras-keras sebagai Spike, Bounded, atau Architectural, dan memilih jalur lebih berat bila ragu. Tidak ada tindakan implementasi sebelum persetujuan jalur itu diberikan; pekerjaan Architectural butuh spec tertulis dan rencana yang direview.'}
            </p>
            <div className="rounded-md bg-muted/60 p-2.5 font-mono text-xs text-foreground">
              docs/superpowers/specs/YYYY-MM-DD-&lt;topic&gt;-design.md
            </div>
          </CardContent>
        </Card>

        {/* Bite-sized plans + TDD */}
        <Card className="border-border">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between gap-2">
              <CardTitle className="text-base">
                {isEn ? 'Bite-Sized Plans, Tests First' : 'Rencana Kecil, Tes Dulu'}
              </CardTitle>
              <Badge variant="outline" className="font-mono text-[11px]">/writing-plans</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              {isEn
                ? 'Plans are written for an engineer with no context: tasks that are bite-sized (about 2-5 minutes each), one action per step, exact file paths and interfaces. Implementation follows test-driven-development: watch the test fail first.'
                : 'Rencana ditulis untuk engineer tanpa konteks: task yang kecil (sekitar 2-5 menit per task), satu aksi per langkah, path file dan interface yang persis. Implementasi mengikuti test-driven-development: lihat tes gagal dulu.'}
            </p>
            <div className="rounded-md bg-muted/60 p-2.5 font-mono text-xs text-foreground">
              docs/superpowers/plans/YYYY-MM-DD-&lt;feature-name&gt;.md
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
