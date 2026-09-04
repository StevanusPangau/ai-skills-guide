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
            ? 'Core patterns from Jesse Vincent\'s Superpowers framework (281k+ stars) for orchestrating reliable autonomous agents.'
            : 'Pola-pola arsitektur inti dari framework Superpowers karya Jesse Vincent (281k+ stars) untuk mengorkestrasi agent yang andal.'}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Coordinator vs Implementer Separation */}
        <Card className="border-border">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between gap-2">
              <CardTitle className="text-base">
                {isEn ? 'Coordinator vs Worker Separation' : 'Pemisahan Koordinator vs Subagent Worker'}
              </CardTitle>
              <Badge variant="outline" className="font-mono text-[11px]">Clean Context</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              {isEn
                ? 'Monolithic agent chats decay quickly once conversation history exceeds 50k tokens. In SDD, the primary coordinator maintains high-level alignment and delegates execution to disposable subagents.'
                : 'Chat agent tunggal yang menangani semua tugas akan cepat mengalami degradasi penalaran saat riwayat melebihi 50k token. Pada SDD, agent koordinator utama tetap bersih di level arsitektur dan mendelegasikan tugas ke subagent sekali pakai.'}
            </p>
            <div className="rounded-md bg-muted/60 p-2.5 font-mono text-xs text-foreground">
              Smart Zone budget: Lead &lt; 50k tokens; Subagent: fresh 200k window
            </div>
          </CardContent>
        </Card>

        {/* Socratic Alignment */}
        <Card className="border-border">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between gap-2">
              <CardTitle className="text-base">
                {isEn ? 'Socratic Alignment Before Plan' : 'Penyelarasan Sokrates Sebelum Coding'}
              </CardTitle>
              <Badge variant="outline" className="font-mono text-[11px]">/brainstorming</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              {isEn
                ? 'Never jump into generating code or plans without clarifying edge cases. Ask one focused question per turn, explore trade-offs, and reach explicit consensus first.'
                : 'Jangan pernah langsung menulis kode atau file rencana tanpa mengonfirmasi asumsi yang ambigu. Tanyakan satu pertanyaan spesifik per giliran, diskusikan trade-off, dan capai kesepakatan tegas.'}
            </p>
            <div className="rounded-md bg-muted/60 p-2.5 font-mono text-xs text-foreground">
              /brainstorming → explore intent, propose 2-3 approaches, lock spec
            </div>
          </CardContent>
        </Card>

        {/* Two-Tier Review Gates */}
        <Card className="border-border">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between gap-2">
              <CardTitle className="text-base">
                {isEn ? 'Two-Tier Review Gates' : 'Gerbang Review Dua Lapis'}
              </CardTitle>
              <Badge variant="outline" className="font-mono text-[11px]">Spec + Quality</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              {isEn
                ? 'Self-reporting by subagents is untrusted. Every task must pass two distinct checks: Spec Compliance (did it meet acceptance criteria?) and Code Quality (no regressions or bloat).'
                : 'Laporan keberhasilan subagent tidak boleh dipercaya mentah-mentah. Setiap task wajib melewati dua filter ketat: Kepatuhan Spesifikasi (apakah acceptance criteria terpenuhi?) dan Kualitas Kode (tanpa dead code).' }
            </p>
            <div className="rounded-md bg-muted/60 p-2.5 font-mono text-xs text-foreground">
              Pass criteria: Red-Green-Refactor test green + independent diff review
            </div>
          </CardContent>
        </Card>

        {/* Atomic Modular Tasks */}
        <Card className="border-border">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between gap-2">
              <CardTitle className="text-base">
                {isEn ? 'Atomic Modular Task Commits' : 'Commit Modular & Bertahap'}
              </CardTitle>
              <Badge variant="outline" className="font-mono text-[11px]">/writing-plans</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              {isEn
                ? 'Break architectural work into small bite-sized tasks (2-5 files max). Each completed subagent task results in an atomic commit, making rollbacks effortless if a test fails.'
                : 'Pecah pekerjaan arsitektur besar menjadi langkah-langkah modular kecil (maksimal 2-5 file per task). Tiap task menghasilkan satu commit terverifikasi sehingga mudah di-rollback bila bermasalah.'}
            </p>
            <div className="rounded-md bg-muted/60 p-2.5 font-mono text-xs text-foreground">
              docs/plans/001-feature.md: Task N → Subagent → Review → Commit
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
