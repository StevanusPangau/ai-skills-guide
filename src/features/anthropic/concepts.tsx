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
            {isEn ? 'Three-Level Progressive Disclosure' : 'Progressive Disclosure Tiga Level'}
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            {isEn
              ? 'skill-creator describes a three-level loading system: metadata, SKILL.md body, and bundled resources loaded as needed.'
              : 'skill-creator menjelaskan sistem pemuatan tiga level: metadata, badan SKILL.md, dan resource terbundel yang dimuat sesuai kebutuhan.'}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-3 font-mono text-xs">
            <div className="rounded-lg border-2 border-emerald-500/70 bg-emerald-500/5 p-3 space-y-2">
              <div className="flex items-center justify-between">
                <Badge className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-[10px]">
                  LEVEL 1: METADATA
                </Badge>
                <span className="text-[10px] text-muted-foreground">~100 words</span>
              </div>
              <p className="font-semibold text-foreground font-sans text-xs">name + description</p>
              <p className="text-[11px] text-muted-foreground leading-tight font-sans">
                {isEn
                  ? 'Always in context. The description is the primary triggering mechanism: what the skill does and when to use it.'
                  : 'Selalu ada di context. Description adalah mekanisme pemicu utama: apa yang dilakukan skill dan kapan dipakai.'}
              </p>
            </div>

            <div className="rounded-lg border-2 border-sky-500/70 bg-sky-500/5 p-3 space-y-2">
              <div className="flex items-center justify-between">
                <Badge className="bg-sky-500/20 text-sky-600 dark:text-sky-400 border border-sky-500/30 text-[10px]">
                  LEVEL 2: SKILL.md BODY
                </Badge>
                <span className="text-[10px] text-muted-foreground">&lt; 500 lines ideal</span>
              </div>
              <p className="font-semibold text-foreground font-sans text-xs">SKILL.md body</p>
              <p className="text-[11px] text-muted-foreground leading-tight font-sans">
                {isEn
                  ? 'In context whenever the skill triggers. When it nears the limit, add a layer of hierarchy with clear pointers to follow-up files.'
                  : 'Ada di context setiap kali skill terpicu. Saat mendekati batas, tambahkan lapisan hierarki dengan penunjuk jelas ke berkas lanjutan.'}
              </p>
            </div>

            <div className="rounded-lg border-2 border-purple-500/70 bg-purple-500/5 p-3 space-y-2">
              <div className="flex items-center justify-between">
                <Badge className="bg-purple-500/20 text-purple-600 dark:text-purple-400 border border-purple-500/30 text-[10px]">
                  LEVEL 3: RESOURCES
                </Badge>
                <span className="text-[10px] text-muted-foreground">As needed</span>
              </div>
              <p className="font-semibold text-foreground font-sans text-xs">references, scripts, assets</p>
              <p className="text-[11px] text-muted-foreground leading-tight font-sans">
                {isEn
                  ? 'Loaded as needed; scripts can be executed without being loaded into context.'
                  : 'Dimuat sesuai kebutuhan; skrip bisa dijalankan tanpa dimuat ke context.'}
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
              ? 'skill-creator iterates on test prompts with a baseline comparison, quantitative metrics, and human review.'
              : 'skill-creator beriterasi pada test prompt dengan pembanding baseline, metrik kuantitatif, dan review manusia.'}
          </p>
        </CardHeader>
        <CardContent className="space-y-3 text-xs">
          <div className="rounded-lg bg-muted/30 p-4 border border-border">
            <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
              <div className="border border-border rounded p-2 text-center bg-card flex-1 min-w-[120px]">
                <span className="font-semibold text-foreground block">1. Test cases</span>
                <span className="text-[10px] text-muted-foreground">Prompts & assertions</span>
              </div>
              <span className="text-muted-foreground text-sm">→</span>
              <div className="border border-destructive/40 rounded p-2 text-center bg-destructive/5 flex-1 min-w-[120px]">
                <span className="font-semibold text-destructive block">2. Run Baseline</span>
                <span className="text-[10px] text-muted-foreground">No skill / old version</span>
              </div>
              <span className="text-muted-foreground text-sm">→</span>
              <div className="border border-emerald-500/40 rounded p-2 text-center bg-emerald-500/5 flex-1 min-w-[120px]">
                <span className="font-semibold text-emerald-600 dark:text-emerald-400 block">3. Run With-Skill</span>
                <span className="text-[10px] text-muted-foreground">Claude + SKILL.md</span>
              </div>
              <span className="text-muted-foreground text-sm">→</span>
              <div className="border border-sky-500/40 rounded p-2 text-center bg-sky-500/5 flex-1 min-w-[120px]">
                <span className="font-semibold text-sky-600 dark:text-sky-400 block">4. Grade & Review</span>
                <span className="text-[10px] text-muted-foreground">benchmark + generate_review.py</span>
              </div>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed text-[11px] italic">
            {isEn
              ? 'Benchmark results show mean ± stddev and the delta against baseline; the user reviews outputs in the viewer, then the skill is revised and the next iteration is rerun.'
              : 'Hasil benchmark menampilkan mean ± stddev dan delta terhadap baseline; pengguna meninjau output di viewer, lalu skill direvisi dan iterasi berikutnya dijalankan ulang.'}
          </p>
        </CardContent>
      </Card>

      <Separator />

      {/* Concept 3: Trigger Precision */}
      <Card className="border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            {isEn ? 'Trigger Precision via Description' : 'Presisi Trigger lewat Description'}
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            {isEn
              ? 'The description field is the primary mechanism that decides whether Claude invokes a skill.'
              : 'Field description adalah mekanisme utama yang menentukan apakah Claude memakai sebuah skill.'}
          </p>
        </CardHeader>
        <CardContent className="space-y-3 text-xs">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-3 space-y-1.5">
              <div className="font-semibold text-foreground font-mono flex items-center justify-between">
                <span>Description-Driven Trigger</span>
                <Badge variant="outline" className="font-mono text-[10px]">skill-creator</Badge>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {isEn
                  ? 'skill-creator notes that Claude tends to undertrigger skills, so descriptions should say both what the skill does and the specific contexts for using it.'
                  : 'skill-creator mencatat Claude cenderung undertrigger, sehingga description harus memuat apa yang dilakukan skill dan konteks spesifik pemakaiannya.'}
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card p-3 space-y-1.5">
              <div className="font-semibold text-foreground font-mono flex items-center justify-between">
                <span>Trigger Eval Queries</span>
                <Badge variant="outline" className="font-mono text-[10px]">description optimizer</Badge>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {isEn
                  ? 'A separate script optimizes the description: about 20 should-trigger and should-not-trigger queries (including near-misses) are split into train and held-out test sets.'
                  : 'Skrip terpisah mengoptimalkan description: sekitar 20 query should-trigger dan should-not-trigger (termasuk near-miss) dibagi menjadi set train dan test.'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
