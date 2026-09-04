import { useState } from 'react'

const SDD_STEPS = [
  {
    id: 'brainstorm',
    title: '1. Socratic Brainstorming',
    skill: '/brainstorming',
    desc: 'Wawancara satu per satu: menggali kebutuhan riil, edge case, dan spesifikasi sebelum sebaris kode pun ditulis.',
  },
  {
    id: 'plan',
    title: '2. Implementation Plan',
    skill: '/writing-plans',
    desc: 'Menyusun plan modular di docs/plans/ dengan test cases, acceptance criteria, dan target file yang exact.',
  },
  {
    id: 'subagent',
    title: '3. Fresh Subagent Dispatch',
    skill: '/subagent-driven-development',
    desc: 'Agent utama men-spawn subagent steril per-task. Subagent hanya diberi konteks yang relevan agar reasoning tetap tajam.',
  },
  {
    id: 'review',
    title: '4. Spec & Quality Review Gate',
    skill: '/requesting-code-review',
    desc: 'Sebelum hasil subagent diterima, subagent reviewer memeriksa kepatuhan spesifikasi dan kualitas kode (TDD).',
  },
  {
    id: 'commit',
    title: '5. Verified Task Commit',
    skill: '/verification-before-completion',
    desc: 'Hanya bila review lolos dan verifikasi nyata berhasil, commit dicatat ke git log dan lanjut ke task berikutnya.',
  },
]

export function SuperpowersSimulator() {
  const [activeStep, setActiveStep] = useState(2) // Default at subagent step
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Task 1: Add authentication middleware & JWT parser', status: 'completed' },
    { id: 2, name: 'Task 2: Implement Redis session cache store', status: 'in-review' },
    { id: 3, name: 'Task 3: Expose /api/auth endpoints with rate limit', status: 'pending' },
  ])

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t
        const nextStatus = t.status === 'completed' ? 'pending' : t.status === 'pending' ? 'in-review' : 'completed'
        return { ...t, status: nextStatus }
      })
    )
  }

  return (
    <section id="sdd" className="scroll-mt-20 space-y-6">
      <div>
        <h2 className="font-heading text-2xl font-bold tracking-tight">
          Subagent-Driven Development (SDD) Simulator
        </h2>
        <p className="mt-1 text-muted-foreground text-sm">
          Simulasi metodologi SDLC Superpowers (281k+ stars): bagaimana koordinator utama tetap fokus dengan mendispatch fresh subagent per-task.
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
              Langkah {idx + 1}
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
            {SDD_STEPS[activeStep].title} ({SDD_STEPS[activeStep].skill})
          </span>
          <span className="text-[10px] font-mono bg-primary/20 text-primary px-2 py-0.5 rounded">
            Superpowers Core Pattern
          </span>
        </div>
        <p className="text-xs text-foreground/90 leading-relaxed">
          {SDD_STEPS[activeStep].desc}
        </p>
      </div>

      {/* Interactive Plan Task Ledger */}
      <div className="rounded-xl border border-border bg-card p-5 space-y-4 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
          <div>
            <h3 className="font-semibold text-sm font-mono">Plan Execution Ledger (docs/plans/001-auth.md)</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Klik task untuk mensimulasikan perubahan status per-subagent.
            </p>
          </div>
          <span className="text-xs font-mono px-2 py-1 rounded bg-muted text-muted-foreground">
            Koordinator: Bersih & Tetap di Smart Zone
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
                  task.status === 'completed'
                    ? 'bg-emerald-500'
                    : task.status === 'in-review'
                      ? 'bg-amber-500 animate-pulse'
                      : 'bg-muted-foreground/40'
                }`} />
                <span className="text-xs font-mono text-foreground font-medium">{task.name}</span>
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold uppercase ${
                task.status === 'completed'
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
