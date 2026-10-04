import { useState } from 'react'
import { getLocale } from '@/paraglide/runtime.js'

// Illustrative samples only: they are written for this guide, not output of the
// upstream skill. Flagged items are entries in upstream tropes-reference.md.
const TROPES_SAMPLES = [
  {
    label: 'Word choice',
    raw: 'In the software landscape, we delve into a tapestry of robust agent workflows that quietly serve as the backbone of code review.',
    cleaned: 'We added a subagent workflow that speeds up code review.',
    flags: ['delve', 'tapestry', 'landscape', 'robust', 'quietly', 'serves as'],
  },
  {
    label: 'Sentence structure',
    raw: 'The real fix? A retry loop. It’s not just a patch — it’s a new way of thinking about uploads.',
    cleaned: 'Retry failed uploads with exponential backoff.',
    flags: ['The X? A Y.', 'Negative parallelism (It’s not X — it’s Y)'],
  },
  {
    label: 'PR description',
    raw: 'It’s worth noting that this PR serves as a robust fix. Here’s the kicker: it also removes dead code.',
    cleaned: 'Fix the timeout on 5xx responses by retrying with backoff; remove dead code in the worker queue.',
    flags: ['It’s worth noting', 'serves as', 'robust', 'Here’s the kicker'],
  },
]

export function BrooklynScanner() {
  const [selectedIdx, setSelectedIdx] = useState(0)
  const current = TROPES_SAMPLES[selectedIdx]
  const isEn = getLocale() === 'en'
  const t = (id: string, en: string) => (isEn ? en : id)

  return (
    <section id="scanner" className="scroll-mt-20 space-y-6">
      <div>
        <h2 className="font-heading text-2xl font-bold tracking-tight">
          {t('Contoh AI Tropes & Alur CPR', 'AI Tropes Examples & the CPR Pass')}
        </h2>
        <p className="mt-1 text-muted-foreground text-sm">
          {isEn ? (
            <>
              Illustrative before/after samples for <code>/no-tropes</code> and the <code>/cpr</code> sequence. The samples are written for this guide; they are not output of the upstream skill.
            </>
          ) : (
            <>
              Contoh ilustratif sebelum/sesudah untuk <code>/no-tropes</code> dan urutan <code>/cpr</code>. Contoh ditulis untuk guide ini; bukan output skill upstream.
            </>
          )}
        </p>
      </div>

      <div className="space-y-4">
        {/* Sample selector */}
        <div className="flex flex-wrap gap-2">
          {TROPES_SAMPLES.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedIdx(idx)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors border ${
                selectedIdx === idx
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border bg-card text-muted-foreground hover:text-foreground'
              }`}
            >
              {t('Contoh', 'Sample')} #{idx + 1}
            </button>
          ))}
        </div>

        {/* Comparison card */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Raw AI Draft */}
          <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-destructive">
                {t('✕ SEBELUM: DRAFT AI', '✕ BEFORE: AI DRAFT')}
              </span>
              <span className="text-[10px] font-mono bg-destructive/15 text-destructive px-2 py-0.5 rounded">
                {current.flags.length} {t('tropes', 'tropes')}
              </span>
            </div>
            <p className="text-sm font-sans text-foreground leading-relaxed italic bg-background/60 p-3 rounded-lg border border-destructive/20">
              &ldquo;{current.raw}&rdquo;
            </p>
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase text-muted-foreground">{t('Kata/struktur bermasalah:', 'Flagged words/structures:')}</span>
              <div className="flex flex-wrap gap-1.5">
                {current.flags.map((flag) => (
                  <span key={flag} className="text-[11px] font-mono px-2 py-0.5 rounded bg-destructive/10 text-destructive border border-destructive/20">
                    {flag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Cleaned Human Draft */}
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">
                {t('✓ SESUDAH: REVISI /NO-TROPES', '✓ AFTER: /NO-TROPES REVISION')}
              </span>
              <span className="text-[10px] font-mono bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded font-semibold">
                {t('Langsung', 'Direct')}
              </span>
            </div>
            <p className="text-sm font-sans text-foreground leading-relaxed font-medium bg-background/60 p-3 rounded-lg border border-emerald-500/20">
              &ldquo;{current.cleaned}&rdquo;
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {t('Ringkas, spesifik pada fakta teknis, dan mudah dipindai reviewer.', 'Short, specific about the technical fact, and easy for a reviewer to scan.')}
            </p>
          </div>
        </div>

        {/* CPR Lifecycle Pipeline Banner */}
        <div className="rounded-xl border border-border bg-card p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="min-w-0">
            <span className="text-xs font-mono font-bold text-primary">{t('URUTAN /CPR', '/CPR SEQUENCE')}</span>
            <p className="text-xs text-muted-foreground mt-0.5">
              {isEn ? (
                <>
                  <code>/clean</code> (polish the diff, cut dead code and debug logging; not a test run) → <code>/pr-update</code> (topical commits, title/body through <code>no-tropes</code>, media preserved) → ends with the PR link.
                </>
              ) : (
                <>
                  <code>/clean</code> (poles diff, buang dead code dan debug logging; bukan test run) → <code>/pr-update</code> (commit topikal, judul/isi lewat <code>no-tropes</code>, media dipertahankan) → berakhir dengan tautan PR.
                </>
              )}
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-1 text-xs font-mono font-bold bg-muted px-3 py-1.5 rounded-lg border border-border">
            <span>clean</span>
            <span className="text-muted-foreground">→</span>
            <span>pr-update</span>
            <span className="text-muted-foreground">→</span>
            <span className="text-emerald-600 dark:text-emerald-400">PR link</span>
          </div>
        </div>
      </div>
    </section>
  )
}
