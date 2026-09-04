import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getLocale } from '@/paraglide/runtime.js'

export function BrooklynConcepts() {
  const isEn = getLocale() === 'en'

  return (
    <section id="concepts" className="scroll-mt-20 space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-balance">
          {isEn ? 'Autonomous Engineering & PR Hygiene' : 'Konsep Autonomous Engineering & PR Hygiene'}
        </h2>
        <p className="mt-1 text-muted-foreground text-sm">
          {isEn
            ? 'Key principles guiding Brooklyn\'s high-velocity, low-friction PR shipping methodology.'
            : 'Prinsip-prinsip utama di balik metodologi rilis PR cepat dan tanpa friksi dari Brooklyn.'}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Worktree Isolation */}
        <Card className="border-border">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between gap-2">
              <CardTitle className="text-base">
                {isEn ? 'Worktree Isolation First' : 'Isolasi Git Worktree'}
              </CardTitle>
              <Badge variant="outline" className="font-mono text-[11px]">/work</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              {isEn
                ? 'Never build multi-turn tasks on the dirty primary working branch. Spin up a separate git worktree per feature or bugfix so uncommitted experiments remain isolated.'
                : 'Jangan pernah mengerjakan task besar di branch utama yang kotor. Jalankan git worktree terpisah untuk tiap fitur atau bugfix agar eksperimen lokal tidak saling tumpang tindih.'}
            </p>
            <div className="rounded-md bg-muted/60 p-2.5 font-mono text-xs text-foreground">
              git worktree add ../feature-branch -b feat/task-name
            </div>
          </CardContent>
        </Card>

        {/* PR is a Publication */}
        <Card className="border-border">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between gap-2">
              <CardTitle className="text-base">
                {isEn ? 'PR is a Publication, Not a Dump' : 'PR adalah Publikasi, Bukan Tempat Sampah'}
              </CardTitle>
              <Badge variant="outline" className="font-mono text-[11px]">/clean</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              {isEn
                ? 'A Pull Request is a piece of documentation for reviewers. Purge debugging console.logs, commented dead code, and experimental cruft before triggering handoff.'
                : 'Pull Request adalah dokumen yang harus dinikmati oleh reviewer manusia. Pangkas console.log sementara, kode mati yang dikomentari, dan eksperimen usang sebelum membuka PR.'}
            </p>
            <div className="rounded-md bg-muted/60 p-2.5 font-mono text-xs text-foreground">
              /clean → Re-read diff, strip dead code, extend existing helpers
            </div>
          </CardContent>
        </Card>

        {/* Zero-Trope Writing */}
        <Card className="border-border">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between gap-2">
              <CardTitle className="text-base">
                {isEn ? 'Zero-Trope Writing (Anti-AI Fluff)' : 'Penulisan Tanpa Klise (Anti-AI Fluff)'}
              </CardTitle>
              <Badge variant="outline" className="font-mono text-[11px]">/no-tropes</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              {isEn
                ? 'Strip synthetic boilerplate words (e.g. delve, robust, tapestry, landscape, seamlessly) from PR descriptions and commit logs. Write like a concise human engineer.'
                : 'Bersihkan kata-kata klise AI (delve, robust, tapestry, landscape, seamlessly) dari deskripsi PR dan commit log. Tulis pesan teknis yang tajam, padat, dan manusiawi.'}
            </p>
            <div className="rounded-md bg-muted/60 p-2.5 font-mono text-xs text-foreground">
              Reference tropes.fyi: replace vague puffery with concrete stats
            </div>
          </CardContent>
        </Card>

        {/* Autonomous Babysit */}
        <Card className="border-border">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between gap-2">
              <CardTitle className="text-base">
                {isEn ? 'The Babysit Protocol' : 'Protokol Babysit Otonom'}
              </CardTitle>
              <Badge variant="outline" className="font-mono text-[11px]">/babysit</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              {isEn
                ? 'Engineering responsibility doesn\'t stop at opening a PR. The agent continuously monitors CI checks, retries flaky builds, and resolves merge conflicts until green.'
                : 'Tanggung jawab engineer tidak berhenti saat tombol PR ditekan. Agent terus memantau status CI GitHub Actions, merestart flaky build, dan membereskan konflik hingga hijau.'}
            </p>
            <div className="rounded-md bg-muted/60 p-2.5 font-mono text-xs text-foreground">
              gh pr checks --watch → report only on state transitions
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
