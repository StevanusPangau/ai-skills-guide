import { useState } from 'react'
import { getLocale } from '@/paraglide/runtime.js'

const SDD_STEPS = [
  {
    id: 'brainstorm',
    skill: '/brainstorming',
    title: { id: '1. Klasifikasi & desain', en: '1. Classify & design' },
    desc: {
      id: 'Agent mengklasifikasikan permintaan (Spike / Bounded / Architectural), menggali maksud, dan mendapat persetujuan. Jalur Architectural menulis spec ke docs/superpowers/specs/.',
      en: 'The agent classifies the request (Spike / Bounded / Architectural), discovers intent, and gets approval. The Architectural path writes a spec to docs/superpowers/specs/.',
    },
  },
  {
    id: 'plan',
    skill: '/writing-plans',
    title: { id: '2. Rencana implementasi', en: '2. Implementation plan' },
    desc: {
      id: 'Rencana disimpan di docs/superpowers/plans/YYYY-MM-DD-<feature>.md: task kecil, satu aksi per langkah, blok Interfaces (Consumes/Produces), Global Constraints, dan Review Focus.',
      en: 'The plan is saved to docs/superpowers/plans/YYYY-MM-DD-<feature>.md: bite-sized tasks, one action per step, an Interfaces block (Consumes/Produces), Global Constraints, and Review Focus.',
    },
  },
  {
    id: 'subagent',
    skill: '/subagent-driven-development',
    title: { id: '3. Implementer segar per task', en: '3. Fresh implementer per task' },
    desc: {
      id: 'Controller men-dispatch implementer segar untuk tiap task dengan brief yang disusun presisi (bukan riwayat session). Implementer mengerjakan dengan TDD, commit, dan self-review.',
      en: 'The controller dispatches a fresh implementer for each task with a precisely crafted brief (not the session history). The implementer works with TDD, commits, and self-reviews.',
    },
  },
  {
    id: 'review',
    skill: '/requesting-code-review',
    title: { id: '4. Review task', en: '4. Task review' },
    desc: {
      id: 'Reviewer subagent memeriksa kepatuhan spec dan kualitas kode. Temuan diperbaiki dalam hingga 5 putaran (1-3 melanjutkan implementer, 4-5 implementer segar pada model lebih mumpuni).',
      en: 'A reviewer subagent checks spec compliance and code quality. Findings are fixed in up to 5 rounds (1-3 resume the implementer, 4-5 use a fresh implementer on a more capable model).',
    },
  },
  {
    id: 'finish',
    skill: '/finishing-a-development-branch',
    title: { id: '5. Review akhir & integrasi', en: '5. Final review & integration' },
    desc: {
      id: 'Setelah semua task: review seluruh branch, hapus workspace plan, lalu verifikasi tes dan tawarkan merge lokal, push + PR, atau biarkan branch.',
      en: 'After all tasks: a whole-branch review, delete the plan workspace, then verify tests and offer a local merge, push + PR, or keep the branch.',
    },
  },
]

export function SuperpowersSimulator() {
  const isEn = getLocale() === 'en'
  const t = (id: string, en: string) => (isEn ? en : id)
  const [activeStep, setActiveStep] = useState(2) // Default at subagent step
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Task 1: Add authentication middleware & JWT parser', status: 'complete' },
    { id: 2, name: 'Task 2: Implement Redis session cache store', status: 'in-review' },
    { id: 3, name: 'Task 3: Expose /api/auth endpoints with rate limit', status: 'pending' },
  ])

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== id) return task
        const nextStatus = task.status === 'complete' ? 'pending' : task.status === 'pending' ? 'in-review' : 'complete'
        return { ...task, status: nextStatus }
      })
    )
  }

  return (
    <section id="sdd" className="scroll-mt-20 space-y-6">
      <div>
        <h2 className="font-heading text-2xl font-bold tracking-tight">
          {t('Simulator Subagent-Driven Development (SDD)', 'Subagent-Driven Development (SDD) Simulator')}
        </h2>
        <p className="mt-1 text-muted-foreground text-sm">
          {t('Simulasi ilustratif alur Superpowers: brainstorming, rencana, lalu implementer segar per task dengan review. Contoh task di bawah hanya sampel.', 'Illustrative walkthrough of the Superpowers flow: brainstorming, plan, then a fresh implementer per task with review. The sample tasks below are examples only.')}
        </p>
      </div>

      {/* Stepper overview */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {SDD_STEPS.map((step, idx) => (
          <button
            key={step.id}
            type="button"
            onClick={() => setActiveStep(idx)}
            className={`text-left p-3 rounded-xl border transition-all ${
              activeStep === idx
                ? 'border-primary bg-primary/10 shadow-xs ring-1 ring-primary/30'
                : 'border-border bg-card hover:border-primary/40'
            }`}
          >
            <span className="block font-mono text-[10px] uppercase font-bold text-muted-foreground">
              {t('Langkah', 'Step')} {idx + 1}
            </span>
            <span className="block font-mono text-xs font-semibold text-foreground mt-0.5">
              {step.skill}
            </span>
          </button>
        ))}
      </div>

      {/* Active Step Explainer */}
      <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs font-bold text-primary">
            {isEn ? SDD_STEPS[activeStep].title.en : SDD_STEPS[activeStep].title.id} ({SDD_STEPS[activeStep].skill})
          </span>
          <span className="text-[10px] font-mono bg-primary/20 text-primary px-2 py-0.5 rounded">
            {t('Pola inti Superpowers', 'Superpowers core pattern')}
          </span>
        </div>
        <p className="text-xs text-foreground/90 leading-relaxed">
          {isEn ? SDD_STEPS[activeStep].desc.en : SDD_STEPS[activeStep].desc.id}
        </p>
      </div>

      {/* Interactive Plan Task Ledger */}
      <div className="rounded-xl border border-border bg-card p-5 space-y-4 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
          <div>
            <h3 className="font-semibold text-sm font-mono">{t('Contoh ledger eksekusi (progress.md)', 'Sample execution ledger (progress.md)')}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {t('Klik task untuk mensimulasikan perubahan status.', 'Click a task to simulate a status change.')}
            </p>
          </div>
          <span className="text-xs font-mono px-2 py-1 rounded bg-muted text-muted-foreground">
            {t('Ledger bertahan dari kompaksi konteks', 'The ledger survives context compaction')}
          </span>
        </div>

        <div className="space-y-2.5">
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className="flex items-center justify-between p-3 rounded-lg border border-border/80 bg-background/50 hover:bg-muted/40 cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className={`size-2.5 rounded-full ${
                  task.status === 'complete'
                    ? 'bg-emerald-500'
                    : task.status === 'in-review'
                      ? 'bg-amber-500 animate-pulse'
                      : 'bg-muted-foreground/40'
                }`} />
                <span className="text-xs font-mono text-foreground font-medium">{task.name}</span>
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold uppercase ${
                task.status === 'complete'
                  ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30'
                  : task.status === 'in-review'
                    ? 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30'
                    : 'bg-muted text-muted-foreground border border-border'
              }`}>
                {task.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
