import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { getLocale } from '@/paraglide/runtime.js'

export function AnthropicConcepts() {
  const isEn = getLocale() === 'en'

  return (
    <section id="concepts" className="scroll-mt-20 space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-balance">
          {isEn ? 'Anthropic Skills Architecture & Mental Models' : 'Arsitektur & Model Mental Skill Anthropic'}
        </h2>
        <p className="mt-1 text-muted-foreground text-sm">
          {isEn
            ? 'The design principles established by Anthropic in creating the Agent Skills open standard.'
            : 'Prinsip desain yang dirumuskan Anthropic saat menciptakan standar terbuka Agent Skills.'}
        </p>
      </div>

      {/* Concept 1: The 3-Tier Skill Architecture Diagram */}
      <Card className="border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            {isEn ? 'The 3-Tier Skill Anatomy' : 'Anatomi 3-Tier Skill Anthropic'}
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            {isEn
              ? 'Never cram everything into a single prompt file. Separate workflow, reference knowledge, and deterministic tools.'
              : 'Jangan jejalkan semua instruksi ke satu file prompt. Pisahkan workflow, pengetahuan referensi, dan tools deterministik.'}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-3 font-mono text-xs">
            <div className="rounded-lg border-2 border-emerald-500/70 bg-emerald-500/5 p-3 space-y-2">
              <div className="flex items-center justify-between">
                <Badge className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-[10px]">
                  TIER 1: MAP
                </Badge>
                <span className="text-[10px] text-muted-foreground">&lt; 100 lines</span>
              </div>
              <p className="font-semibold text-foreground font-sans text-xs">SKILL.md Workflow Guide</p>
              <p className="text-[11px] text-muted-foreground leading-tight font-sans">
                {isEn
                  ? 'High-level instructions, trigger keywords, safety invariants, and pointers to references.'
                  : 'Instruksi tingkat tinggi, keyword pemicu, batasan keamanan, dan petunjuk ke referensi.'}
              </p>
            </div>

            <div className="rounded-lg border-2 border-sky-500/70 bg-sky-500/5 p-3 space-y-2">
              <div className="flex items-center justify-between">
                <Badge className="bg-sky-500/20 text-sky-600 dark:text-sky-400 border border-sky-500/30 text-[10px]">
                  TIER 2: REFERENCE
                </Badge>
                <span className="text-[10px] text-muted-foreground">On-Demand</span>
              </div>
              <p className="font-semibold text-foreground font-sans text-xs">references/*.md Knowledge</p>
              <p className="text-[11px] text-muted-foreground leading-tight font-sans">
                {isEn
                  ? 'Deep specifications, styling rules, color palettes, XML tables. Loaded only when matched.'
                  : 'Spesifikasi mendalam, aturan styling, palet warna, tabel XML. Dimuat hanya saat cocok.'}
              </p>
            </div>

            <div className="rounded-lg border-2 border-purple-500/70 bg-purple-500/5 p-3 space-y-2">
              <div className="flex items-center justify-between">
                <Badge className="bg-purple-500/20 text-purple-600 dark:text-purple-400 border border-purple-500/30 text-[10px]">
                  TIER 3: CODE
                </Badge>
                <span className="text-[10px] text-muted-foreground">Subprocess</span>
              </div>
              <p className="font-semibold text-foreground font-sans text-xs">scripts/*.py Determinism</p>
              <p className="text-[11px] text-muted-foreground leading-tight font-sans">
                {isEn
                  ? 'Byte-level parsers, document linters, table generators. Zero LLM context token tax.'
                  : 'Parser tingkat byte, linter dokumen, generator tabel. Nol pajak token konteks LLM.'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Concept 2: Eval-Driven Iteration Loop */}
      <Card className="border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            {isEn ? 'The Eval-Driven Feedback Loop (skill-creator)' : 'Loop Evaluasi Terarah Bukti (skill-creator)'}
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            {isEn
              ? 'Anthropic rejects subjective prompt vibes. Skill improvements are proven via measurable test suites.'
              : 'Anthropic menolak rekayasa prompt berbasis intuisi semata. Penyempurnaan skill dibuktikan lewat test suite terukur.'}
          </p>
        </CardHeader>
        <CardContent className="space-y-3 text-xs">
          <div className="rounded-lg bg-muted/30 p-4 border border-border">
            <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
              <div className="border border-border rounded p-2 text-center bg-card flex-1 min-w-[120px]">
                <span className="font-semibold text-foreground block">1. evals.json</span>
                <span className="text-[10px] text-muted-foreground">Test cases & assertions</span>
              </div>
              <span className="text-muted-foreground text-sm">→</span>
              <div className="border border-destructive/40 rounded p-2 text-center bg-destructive/5 flex-1 min-w-[120px]">
                <span className="font-semibold text-destructive block">2. Run Baseline</span>
                <span className="text-[10px] text-muted-foreground">Raw Claude (No Skill)</span>
              </div>
              <span className="text-muted-foreground text-sm">→</span>
              <div className="border border-emerald-500/40 rounded p-2 text-center bg-emerald-500/5 flex-1 min-w-[120px]">
                <span className="font-semibold text-emerald-600 dark:text-emerald-400 block">3. Run With-Skill</span>
                <span className="text-[10px] text-muted-foreground">Claude + SKILL.md</span>
              </div>
              <span className="text-muted-foreground text-sm">→</span>
              <div className="border border-sky-500/40 rounded p-2 text-center bg-sky-500/5 flex-1 min-w-[120px]">
                <span className="font-semibold text-sky-600 dark:text-sky-400 block">4. Delta Review</span>
                <span className="text-[10px] text-muted-foreground">generate_review.py</span>
              </div>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed text-[11px] italic">
            {isEn
              ? 'If With-Skill does not beat Baseline with statistical significance, the skill instructions are refined or pruned.'
              : 'Bila With-Skill tidak mengungguli Baseline secara statistik signifikan, instruksi skill direvisi atau dipangkas.'}
          </p>
        </CardContent>
      </Card>

      <Separator />

      {/* Concept 3: Trigger Precision */}
      <Card className="border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            {isEn ? 'Trigger Precision & Invariant Boundaries' : 'Presisi Trigger & Batasan Invarian'}
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            {isEn
              ? 'Avoid eager activation: skills must declare exactly when to wake up and when to stay dormant.'
              : 'Cegah aktivasi prematur: skill wajib menyatakan kapan harus aktif dan kapan harus dorman.'}
          </p>
        </CardHeader>
        <CardContent className="space-y-3 text-xs">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-3 space-y-1.5">
              <div className="font-semibold text-foreground font-mono flex items-center justify-between">
                <span>Model-Invoked Trigger</span>
                <Badge variant="outline" className="font-mono text-[10px]">skill-creator</Badge>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {isEn
                  ? 'Activated automatically by the agent when inspecting, improving, or authoring other skills. Silent during regular coding.'
                  : 'Diaktifkan otomatis oleh agen saat memeriksa, menyempurnakan, atau menulis skill lain. Dorman saat coding biasa.'}
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card p-3 space-y-1.5">
              <div className="font-semibold text-foreground font-mono flex items-center justify-between">
                <span>User-Invoked Commands</span>
                <Badge variant="outline" className="font-mono text-[10px]">/theme-factory</Badge>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {isEn
                  ? 'Activated explicitly by user command to apply style systems without polluting the general agent prompt context.'
                  : 'Diaktifkan secara eksplisit melalui perintah pengguna untuk menerapkan sistem gaya tanpa mencemari konteks umum agen.'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
