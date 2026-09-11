import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getLocale } from '@/paraglide/runtime.js'

type EvalScenario = 'docx' | 'pptx' | 'pdf'

export function AnthropicEvalArena() {
  const isEn = getLocale() === 'en'
  const [strategy, setStrategy] = useState<'monolithic' | 'progressive'>('progressive')
  const [scenario, setScenario] = useState<EvalScenario>('docx')

  // Data for Progressive Disclosure
  const tokenStats = {
    monolithic: {
      tokens: 48500,
      costPer1k: '$7.28',
      ttftMs: 3400,
      contextClarity: '24% (High noise / distraction)',
    },
    progressive: {
      tokens: 5800,
      costPer1k: '$0.87',
      ttftMs: 520,
      contextClarity: '96% (Sharp, focused reasoning)',
    },
  }

  const evalScenarios = {
    docx: {
      titleId: 'Generasi Dokumen Word Kompleks (.docx)',
      titleEn: 'Complex Word Document Generation (.docx)',
      baselinePass: '32%',
      withSkillPass: '98%',
      baselineCorrupt: '41% (XML schema tags unclosed, run splits)',
      withSkillCorrupt: '0% (Verified with merge_runs.py)',
      rubricId: 'Validasi lint OOXML, margin konsisten, run merging tanpa tag ganda.',
      rubricEn: 'OOXML lint validation, consistent margins, run merging without duplicate tags.',
    },
    pptx: {
      titleId: 'Theming Presentasi Pitch Deck (.pptx)',
      titleEn: 'Pitch Deck Presentation Theming (.pptx)',
      baselinePass: '28%',
      withSkillPass: '95%',
      baselineCorrupt: '52% (Shape offsets shift, slide layout regressed)',
      withSkillCorrupt: '2% (Flags pre-existing layout vs new changes)',
      rubricId: 'Validasi python validate.py --original, preservasi slide master.',
      rubricEn: 'Validated against python validate.py --original, preserves slide master.',
    },
    pdf: {
      titleId: 'Ekstraksi PDF Terproteksi Password & Form',
      titleEn: 'Password-Protected PDF & Form Field Extraction',
      baselinePass: '45%',
      withSkillPass: '99%',
      baselineCorrupt: '38% (Binary buffer crash, hallucinated fields)',
      withSkillCorrupt: '0% (Deterministic pypdf + pdfplumber pipeline)',
      rubricId: 'Auto-fallback OCR saat scan, ekstraksi form stream bytes tanpa distorsi.',
      rubricEn: 'Auto-fallback to OCR for scans, stream byte extraction without distortion.',
    },
  }

  const currentEval = evalScenarios[scenario]
  const currentTokens = tokenStats[strategy]

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
            ? 'Explore how Anthropic builds skills: progressive disclosure token economics, deterministic Python tools, and baseline-vs-skill evaluation loops.'
            : 'Eksplorasi cara Anthropic merancang skill: ekonomi token progressive disclosure, perkakas Python deterministik, dan loop evaluasi baseline-vs-skill.'}
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
                    ? 'Context window hygiene: load SKILL.md summary first, fetch references only on demand.'
                    : 'Higiene context window: muat ringkasan SKILL.md dulu, ambil referensi hanya saat dibutuhkan.'}
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
                  {isEn ? 'Progressive 3-Tier (Anthropic)' : 'Progressive 3-Tier (Anthropic)'}
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Visual Token Gauge Bar */}
            <div className="rounded-lg bg-muted/30 p-4 border border-border space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div className="border border-border rounded p-2 bg-card">
                  <span className="text-muted-foreground block text-[10px]">
                    {isEn ? 'TOKEN USAGE' : 'KONSUMSI TOKEN'}
                  </span>
                  <span
                    className={`font-bold text-sm ${
                      strategy === 'progressive'
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-destructive'
                    }`}
                  >
                    {currentTokens.tokens.toLocaleString()} tokens
                  </span>
                </div>
                <div className="border border-border rounded p-2 bg-card">
                  <span className="text-muted-foreground block text-[10px]">
                    {isEn ? 'COST / 1K RUNS' : 'BIAYA / 1K RUNS'}
                  </span>
                  <span className="font-bold text-sm text-foreground">
                    {currentTokens.costPer1k}
                  </span>
                </div>
                <div className="border border-border rounded p-2 bg-card">
                  <span className="text-muted-foreground block text-[10px]">
                    {isEn ? 'TIME TO 1ST TOKEN' : 'RESPON PERTAMA'}
                  </span>
                  <span className="font-bold text-sm text-foreground">
                    {currentTokens.ttftMs} ms
                  </span>
                </div>
                <div className="border border-border rounded p-2 bg-card">
                  <span className="text-muted-foreground block text-[10px]">
                    {isEn ? 'REASONING SHARPNESS' : 'KETAPAJAMAN NALAR'}
                  </span>
                  <span className="font-bold text-xs text-foreground">
                    {currentTokens.contextClarity}
                  </span>
                </div>
              </div>

              {/* Graphical Context Window Usage */}
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between text-[11px] font-mono text-muted-foreground">
                  <span>Context Window Consumption (200k max)</span>
                  <span>{Math.round((currentTokens.tokens / 200000) * 100)}%</span>
                </div>
                <div className="h-5 w-full bg-secondary/60 rounded-full overflow-hidden relative">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      strategy === 'progressive'
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                        : 'bg-gradient-to-r from-amber-500 to-destructive'
                    }`}
                    style={{
                      width: `${Math.max(4, (currentTokens.tokens / 200000) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Breakdown of 3-Tier Architecture */}
            <div className="grid gap-3 sm:grid-cols-3 font-mono text-xs">
              <div className="border border-border rounded-lg p-3 bg-card space-y-1">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-[10px]">Tier 1</Badge>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-[10px]">~1.2k tokens</span>
                </div>
                <p className="font-semibold text-foreground font-sans">SKILL.md Summary</p>
                <p className="text-[11px] text-muted-foreground font-sans">
                  {isEn
                    ? 'Workflow triggers, short overview, and pointer to specific reference files.'
                    : 'Pemicu alur kerja, ikhtisar singkat, dan penunjuk ke file referensi spesifik.'}
                </p>
              </div>

              <div className="border border-border rounded-lg p-3 bg-card space-y-1">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-[10px]">Tier 2</Badge>
                  <span className="text-sky-600 dark:text-sky-400 font-semibold text-[10px]">~4.5k on demand</span>
                </div>
                <p className="font-semibold text-foreground font-sans">references/*.md</p>
                <p className="text-[11px] text-muted-foreground font-sans">
                  {isEn
                    ? 'Deep XML tags, API schemas, and formulas loaded only when the task explicitly calls for them.'
                    : 'Tag XML mendalam, skema API, dan formula yang hanya dimuat saat tugas membutuhkannya.'}
                </p>
              </div>

              <div className="border border-border rounded-lg p-3 bg-card space-y-1">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-[10px]">Tier 3</Badge>
                  <span className="text-purple-600 dark:text-purple-400 font-semibold text-[10px]">0 LLM tokens</span>
                </div>
                <p className="font-semibold text-foreground font-sans">scripts/*.py</p>
                <p className="text-[11px] text-muted-foreground font-sans">
                  {isEn
                    ? 'Deterministic Python programs run in subprocess; results return cleanly to the session.'
                    : 'Program Python deterministik yang berjalan di subprocess; hasil kembali bersih ke sesi.'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Module 2 & 3 */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Module 2: Skill-Creator Eval Benchmark */}
          <Card className="border border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">
                {isEn ? '2. Skill-Creator Eval Benchmark Engine' : '2. Engine Benchmark Evaluasi skill-creator'}
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                {isEn
                  ? 'A skill is never published without proving a statistically significant win over raw Baseline.'
                  : 'Sebuah skill dilarang dirilis tanpa bukti kemenangan terukur di atas Baseline mentah.'}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Scenario Selector */}
              <div className="flex gap-1.5 bg-muted/60 p-1 rounded-lg border border-border">
                {(['docx', 'pptx', 'pdf'] as EvalScenario[]).map((sc) => (
                  <button
                    key={sc}
                    type="button"
                    onClick={() => setScenario(sc)}
                    className={`flex-1 py-1 text-xs font-mono uppercase font-bold rounded transition-colors ${
                      scenario === sc
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {sc}
                  </button>
                ))}
              </div>

              {/* Comparison Card */}
              <div className="rounded-lg border border-border bg-card p-3 space-y-3 text-xs">
                <div className="font-semibold text-foreground">
                  {isEn ? currentEval.titleEn : currentEval.titleId}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="border border-destructive/30 bg-destructive/5 rounded p-2.5 space-y-1">
                    <span className="text-[10px] font-mono text-destructive font-bold block">
                      ✕ BASELINE (NO SKILL)
                    </span>
                    <div className="text-lg font-bold text-destructive font-mono">
                      {currentEval.baselinePass}
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      {currentEval.baselineCorrupt}
                    </p>
                  </div>

                  <div className="border border-emerald-500/30 bg-emerald-500/5 rounded p-2.5 space-y-1">
                    <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold block">
                      ✓ WITH SKILL (ANTHROPIC)
                    </span>
                    <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                      {currentEval.withSkillPass}
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      {currentEval.withSkillCorrupt}
                    </p>
                  </div>
                </div>

                <div className="border-t border-border pt-2 text-[11px] text-muted-foreground">
                  <span className="font-semibold text-foreground">Rubrik Penilaian: </span>
                  {isEn ? currentEval.rubricEn : currentEval.rubricId}
                </div>
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
