import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getLocale } from '@/paraglide/runtime.js'

type EvalStep = 'spawn' | 'grade' | 'aggregate' | 'review'

export function AnthropicEvalArena() {
  const isEn = getLocale() === 'en'
  const [strategy, setStrategy] = useState<'monolithic' | 'progressive'>('progressive')
  const [step, setStep] = useState<EvalStep>('spawn')

  // Qualitative description of what sits in context under each strategy.
  // Source: skill-creator SKILL.md "Progressive Disclosure" (three-level loading system).
  const contextView = {
    monolithic: {
      titleId: 'Semua isi skill dimuat sekaligus',
      titleEn: 'Everything in the skill is loaded at once',
      bodyId: 'Instruksi, referensi, dan isi skrip masuk ke context di setiap tugas, termasuk bagian yang tidak relevan. Inilah yang dihindari desain tiga level.',
      bodyEn: 'Instructions, references, and script contents all enter context on every task, including irrelevant parts. This is what the three-level design avoids.',
    },
    progressive: {
      titleId: 'Tiga level pemuatan',
      titleEn: 'Three-level loading',
      bodyId: 'Metadata (name + description) selalu ada di context; badan SKILL.md dimuat saat skill terpicu; resource terbundel dimuat sesuai kebutuhan.',
      bodyEn: 'Metadata (name + description) is always in context; the SKILL.md body loads when the skill triggers; bundled resources load as needed.',
    },
  }

  // Source: skill-creator SKILL.md, eval iteration loop (Step 1-5).
  const evalSteps = {
    spawn: {
      titleId: '1. Jalankan with-skill dan baseline',
      titleEn: '1. Run with-skill and baseline',
      bodyId: 'Untuk setiap test case, dua subagent dijalankan pada giliran yang sama: satu memakai skill, satu tanpa skill (atau memakai versi lama saat memperbaiki skill). Hasil disimpan per iterasi di <skill-name>-workspace/iteration-N/eval-ID/.',
      bodyEn: 'For each test case, two subagents are spawned in the same turn: one with the skill, one without (or with the old version when improving a skill). Results are stored per iteration under <skill-name>-workspace/iteration-N/eval-ID/.',
      artifact: 'with_skill/outputs · without_skill/outputs',
    },
    grade: {
      titleId: '2. Nilai assertion',
      titleEn: '2. Grade assertions',
      bodyId: 'Grader (agents/grader.md) mengevaluasi tiap assertion terhadap output dan menyimpan grading.json dengan field text, passed, dan evidence. Assertion yang bisa dicek programatis sebaiknya dicek dengan skrip.',
      bodyEn: 'A grader (agents/grader.md) evaluates each assertion against the outputs and writes grading.json with text, passed, and evidence fields. Assertions that can be checked programmatically should be checked with a script.',
      artifact: 'grading.json',
    },
    aggregate: {
      titleId: '3. Agregasi benchmark',
      titleEn: '3. Aggregate the benchmark',
      bodyId: 'python -m scripts.aggregate_benchmark menghasilkan benchmark.json dan benchmark.md berisi pass_rate, waktu, dan token per konfigurasi, dengan mean ± stddev serta delta.',
      bodyEn: 'python -m scripts.aggregate_benchmark produces benchmark.json and benchmark.md with pass_rate, time, and tokens per configuration, with mean ± stddev and the delta.',
      artifact: 'benchmark.json · benchmark.md',
    },
    review: {
      titleId: '4. Review manusia lewat viewer',
      titleEn: '4. Human review in the viewer',
      bodyId: 'eval-viewer/generate_review.py menampilkan output dan metrik kuantitatif agar pengguna bisa memberi feedback; skill lalu diperbaiki dan iterasi berikutnya dijalankan ulang, termasuk baseline.',
      bodyEn: 'eval-viewer/generate_review.py shows outputs and quantitative metrics so the user can leave feedback; the skill is then improved and the next iteration is rerun, baselines included.',
      artifact: 'feedback.json',
    },
  }

  const currentContext = contextView[strategy]
  const currentStep = evalSteps[step]

  return (
    <section id="eval-arena" className="scroll-mt-20 space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold tracking-tight text-balance">
            {isEn ? 'Evaluation & Context Arena' : 'Arena Evaluasi & Konteks Anthropic'}
          </h2>
          <Badge variant="secondary" className="font-mono text-xs">
            Interactive
          </Badge>
        </div>
        <p className="text-muted-foreground mt-1 text-sm">
          {isEn
            ? 'Explore how Anthropic builds skills: progressive disclosure, deterministic Python tools, and baseline-vs-skill evaluation loops.'
            : 'Eksplorasi cara Anthropic merancang skill: progressive disclosure, perkakas Python deterministik, dan loop evaluasi baseline-vs-skill.'}
        </p>
      </div>

      <div className="grid gap-6">
        {/* Module 1: Token Budget & Progressive Disclosure */}
        <Card className="border border-border">
          <CardHeader className="pb-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <CardTitle className="text-base font-semibold">
                  {isEn
                    ? '1. Progressive Disclosure vs Monolithic Dump'
                    : '1. Progressive Disclosure vs Monolithic Dump'}
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {isEn
                    ? 'Context window hygiene: metadata always, SKILL.md body when triggered, bundled resources only as needed.'
                    : 'Higiene context window: metadata selalu ada, badan SKILL.md saat terpicu, resource terbundel hanya saat dibutuhkan.'}
                </p>
              </div>
              <div className="flex gap-1.5 bg-muted/60 p-1 rounded-lg border border-border">
                <button
                  type="button"
                  onClick={() => setStrategy('monolithic')}
                  className={`px-2.5 py-1 text-xs rounded font-medium transition-colors ${
                    strategy === 'monolithic'
                      ? 'bg-destructive/20 text-destructive font-semibold shadow-xs'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {isEn ? 'Monolithic Dump (Raw)' : 'Monolithic Dump (Semua)'}
                </button>
                <button
                  type="button"
                  onClick={() => setStrategy('progressive')}
                  className={`px-2.5 py-1 text-xs rounded font-medium transition-colors ${
                    strategy === 'progressive'
                      ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-semibold shadow-xs'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {isEn ? 'Progressive 3-Level (skill-creator)' : 'Progressive 3-Level (skill-creator)'}
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-muted/30 p-4 border border-border space-y-1.5 text-xs">
              <div className="font-semibold text-foreground">
                {isEn ? currentContext.titleEn : currentContext.titleId}
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {isEn ? currentContext.bodyEn : currentContext.bodyId}
              </p>
              <p className="text-[11px] text-muted-foreground italic">
                {isEn
                  ? 'Illustrative, no measured figures: the upstream skill gives only approximate sizes (~100 words of metadata, SKILL.md under 500 lines).'
                  : 'Ilustratif, tanpa angka terukur: sumber hanya memberi ukuran perkiraan (~100 kata metadata, SKILL.md di bawah 500 baris).'}
              </p>
            </div>

            {/* Breakdown of 3-Tier Architecture */}
            <div className="grid gap-3 sm:grid-cols-3 font-mono text-xs">
              <div className="border border-border rounded-lg p-3 bg-card space-y-1">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-[10px]">Level 1</Badge>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-[10px]">always in context</span>
                </div>
                <p className="font-semibold text-foreground font-sans">Metadata (name + description)</p>
                <p className="text-[11px] text-muted-foreground font-sans">
                  {isEn
                    ? 'About 100 words, always in context; this is what decides whether the skill triggers.'
                    : 'Sekitar 100 kata, selalu ada di context; inilah yang menentukan apakah skill terpicu.'}
                </p>
              </div>

              <div className="border border-border rounded-lg p-3 bg-card space-y-1">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-[10px]">Level 2</Badge>
                  <span className="text-sky-600 dark:text-sky-400 font-semibold text-[10px]">when triggered</span>
                </div>
                <p className="font-semibold text-foreground font-sans">SKILL.md body</p>
                <p className="text-[11px] text-muted-foreground font-sans">
                  {isEn
                    ? 'In context whenever the skill triggers; under 500 lines is ideal, with pointers to deeper files when it grows.'
                    : 'Ada di context setiap kali skill terpicu; di bawah 500 baris ideal, dengan penunjuk ke berkas lebih dalam saat membesar.'}
                </p>
              </div>

              <div className="border border-border rounded-lg p-3 bg-card space-y-1">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-[10px]">Level 3</Badge>
                  <span className="text-purple-600 dark:text-purple-400 font-semibold text-[10px]">as needed</span>
                </div>
                <p className="font-semibold text-foreground font-sans">Bundled resources (references, scripts)</p>
                <p className="text-[11px] text-muted-foreground font-sans">
                  {isEn
                    ? 'Loaded as needed; scripts can be executed without being loaded into context.'
                    : 'Dimuat sesuai kebutuhan; skrip bisa dijalankan tanpa dimuat ke context.'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Module 2 & 3 */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Module 2: Skill-Creator Eval Loop */}
          <Card className="border border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">
                {isEn ? '2. skill-creator Eval Loop' : '2. Loop Evaluasi skill-creator'}
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                {isEn
                  ? 'skill-creator compares each skill against a baseline, aggregates mean ± stddev and the delta, and leaves the verdict to human review.'
                  : 'skill-creator membandingkan skill dengan baseline, mengagregasi mean ± stddev dan delta, dan menyerahkan keputusan akhir pada review manusia.'}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-1.5 bg-muted/60 p-1 rounded-lg border border-border">
                {(['spawn', 'grade', 'aggregate', 'review'] as EvalStep[]).map((st, i) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setStep(st)}
                    className={`flex-1 py-1 text-xs font-mono font-bold rounded transition-colors ${
                      step === st
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <div className="rounded-lg border border-border bg-card p-3 space-y-2 text-xs">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-foreground">
                    {isEn ? currentStep.titleEn : currentStep.titleId}
                  </span>
                  <Badge variant="outline" className="font-mono text-[10px]">
                    {currentStep.artifact}
                  </Badge>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {isEn ? currentStep.bodyEn : currentStep.bodyId}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Module 3: Deterministic Scripts vs Raw LLM XML */}
          <Card className="border border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">
                {isEn ? '3. Deterministic Python vs LLM Guesswork' : '3. Python Deterministik vs Halusinasi LLM'}
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                {isEn
                  ? 'Binary and XML file formats are handled by strict Python engines, not token probabilities.'
                  : 'Format file biner dan XML dikelola oleh engine Python kaku, bukan probabilitas token.'}
              </p>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="border border-border rounded-lg p-3 bg-muted/20 space-y-2">
                <div className="font-mono text-xs font-semibold text-foreground flex items-center justify-between">
                  <span>merge_runs.py</span>
                  <Badge variant="outline" className="font-mono text-[10px]">/docx</Badge>
                </div>
                <p className="text-muted-foreground text-[11px] leading-relaxed">
                  {isEn
                    ? 'Word documents fragment plain text into arbitrary w:r XML tags. Editing raw XML corrupts styles. The deterministic script merges sibling runs with matching formatting before modifications.'
                    : 'Dokumen Word memecah teks biasa menjadi tag XML w:r arbitrer. Mengedit XML mentah merusak formatting. Script deterministik menggabungkan sibling runs yang berformat identik sebelum modifikasi.'}
                </p>
              </div>

              <div className="border border-border rounded-lg p-3 bg-muted/20 space-y-2">
                <div className="font-mono text-xs font-semibold text-foreground flex items-center justify-between">
                  <span>validate.py --original</span>
                  <Badge variant="outline" className="font-mono text-[10px]">/pptx</Badge>
                </div>
                <p className="text-muted-foreground text-[11px] leading-relaxed">
                  {isEn
                    ? 'Validates PowerPoint decks against the customer-provided template. Separates pre-existing deck bugs from regressions introduced by the AI agent.'
                    : 'Memvalidasi deck PowerPoint terhadap template klien. Membedakan bug bawaan template dari regresi yang diperkenalkan oleh agen AI.'}
                </p>
              </div>

              <div className="rounded bg-muted/40 p-2 text-[11px] text-muted-foreground border-l-2 border-primary/50">
                <span className="font-semibold text-foreground">
                  {isEn ? 'Anthropic Principle: ' : 'Prinsip Anthropic: '}
                </span>
                {isEn
                  ? 'Use AI for natural language, planning, and judgment; delegate byte-level file mutations to verified Python packages.'
                  : 'Gunakan AI untuk bahasa alami, perencanaan, dan pertimbangan; serahkan mutasi file tingkat byte ke paket Python terverifikasi.'}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
