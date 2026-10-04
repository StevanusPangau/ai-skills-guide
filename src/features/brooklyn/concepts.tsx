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
                ? 'Do real work in a dedicated git worktree, not the primary checkout. /work mirrors the repo\'s own branch prefix and worktree naming instead of imposing one, and never uses git stash (the stash list is shared by every worktree).'
                : 'Kerjakan pekerjaan nyata di git worktree khusus, bukan checkout utama. /work meniru prefiks branch dan penamaan worktree yang sudah dipakai repo, bukan memaksakan pola sendiri, dan tidak pernah memakai git stash (daftar stash dibagi semua worktree).'}
            </p>
            <div className="rounded-md bg-muted/60 p-2.5 font-mono text-xs text-foreground">
              {'git worktree add -b <prefix>/<slug> ../<repo>-<short> origin/<default>'}
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
                ? 'A Pull Request is a piece of documentation for reviewers. Purge debugging console.logs, commented dead code, and experimental cruft before any PR handoff. Clean means polish, not running the test suite.'
                : 'Pull Request adalah dokumen yang harus dinikmati oleh reviewer manusia. Pangkas console.log sementara, kode mati yang dikomentari, dan eksperimen usang sebelum handoff PR apa pun. Clean berarti memoles, bukan menjalankan test suite.'}
            </p>
            <div className="rounded-md bg-muted/60 p-2.5 font-mono text-xs text-foreground">
              /clean → Re-read diff, strip dead code, extend existing helpers (polish, not a test run)
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
                ? 'Revise prose against a catalog of AI writing tropes (e.g. delve, robust, tapestry, landscape, quietly, serves as) before publishing PR descriptions and commit messages. Write like a concise human engineer.'
                : 'Revisi tulisan terhadap katalog tropes tulisan AI (mis. delve, robust, tapestry, landscape, quietly, serves as) sebelum memublikasikan deskripsi PR dan commit message. Tulis seperti engineer manusia yang ringkas.'}
            </p>
            <div className="rounded-md bg-muted/60 p-2.5 font-mono text-xs text-foreground">
              Catalog: tropes.fyi (tropes-reference.md)
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
                ? 'Responsibility does not stop at opening a PR. The agent stays on it: polls checks, kicks stalled CI, reruns flakes, and handles late review threads until green or merged. It only makes small branch-caused fixes (bigger rebases belong to /pr-ready) and merges only when asked.'
                : 'Tanggung jawab tidak berhenti saat PR dibuka. Agent tetap di PR: polling check, menendang CI yang macet, rerun flake, dan menangani review thread yang terlambat sampai hijau atau merged. Hanya perbaikan kecil akibat branch ini (rebase besar urusan /pr-ready), dan merge hanya bila diminta.'}
            </p>
            <div className="rounded-md bg-muted/60 p-2.5 font-mono text-xs text-foreground">
              bounded sleep loop (30-60s) → report state changes only
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
