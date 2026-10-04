import { lazy, Suspense, useMemo, useState } from 'react'
import type { FlowGraphEdge, FlowGraphNode } from '@/features/flow/types'
import { m } from '@/paraglide/messages.js'
import { getLocale } from '@/paraglide/runtime.js'

const FlowCanvas = lazy(() =>
  import('@/features/flow/flow-canvas').then((mod) => ({ default: mod.FlowCanvas })),
)

const t = (id: string, en: string) => (getLocale() === 'en' ? en : id)

export function SuperpowersFlow() {
  const [active, setActive] = useState<string | null>(null)

  const nodes: FlowGraphNode[] = useMemo(
    () => [
      {
        id: 'brainstorm',
        kind: 'skill',
        label: '/brainstorming',
        description: t(
          'Klasifikasikan permintaan (Spike / Bounded / Architectural), gali maksud, ajukan pendekatan, dan dapatkan persetujuan sebelum implementasi. Jalur Architectural menulis spec ke docs/superpowers/specs/.',
          'Classify the request (Spike / Bounded / Architectural), discover intent, propose approaches, and get approval before implementation. The Architectural path writes a spec to docs/superpowers/specs/.',
        ),
        subtitle: t('Fase 1: Desain', 'Phase 1: Design'),
        position: { x: 240, y: 0 },
      },
      {
        id: 'worktree',
        kind: 'skill',
        label: '/using-git-worktrees',
        description: t(
          'Pastikan workspace terisolasi: deteksi isolasi yang ada, pakai tool native, fallback ke git worktree; lalu setup proyek dan baseline tes bersih.',
          'Ensure an isolated workspace: detect existing isolation, use native tools, fall back to a git worktree; then project setup and a clean test baseline.',
        ),
        subtitle: t('Fase 2: Isolasi', 'Phase 2: Isolation'),
        position: { x: 240, y: 140 },
      },
      {
        id: 'plans',
        kind: 'skill',
        label: '/writing-plans',
        description: t(
          'Tulis rencana untuk engineer tanpa konteks: task kecil, satu aksi per langkah, interface dan path persis, disimpan di docs/superpowers/plans/.',
          'Write the plan for an engineer with no context: bite-sized tasks, one action per step, exact interfaces and paths, saved to docs/superpowers/plans/.',
        ),
        subtitle: t('Fase 3: Rencana', 'Phase 3: Plan'),
        position: { x: 240, y: 280 },
      },
      {
        id: 'exec-mode',
        kind: 'decision',
        label: t('Mode eksekusi?', 'Execution mode?'),
        description: t(
          'Partner memilih: subagent segar per task dengan review tiap task (paling teliti), atau inline di session ini dengan satu review akhir (lebih murah).',
          'The partner chooses: a fresh subagent per task with a review after each (most thorough), or inline in this session with one final review (cheaper).',
        ),
        position: { x: 240, y: 420 },
      },
      {
        id: 'sdd',
        kind: 'skill',
        label: '/subagent-driven-development',
        description: t(
          'Implementer segar per task, review task (spec + kualitas), hingga 5 putaran perbaikan, lalu review seluruh branch; ledger progres di disk.',
          'A fresh implementer per task, a task review (spec + quality), up to 5 fix rounds, then a whole-branch review; progress ledger on disk.',
        ),
        subtitle: t('Subagent per task', 'Subagent per task'),
        position: { x: 40, y: 570 },
      },
      {
        id: 'exec',
        kind: 'skill',
        label: '/executing-plans',
        description: t(
          'Kerjakan rencana sendiri di session ini, task demi task, tanpa jeda; satu review konteks-segar atas seluruh branch di akhir.',
          'Execute the plan yourself in this session, task by task, without pausing; one fresh-context review of the whole branch at the end.',
        ),
        subtitle: t('Inline', 'Inline'),
        position: { x: 440, y: 570 },
      },
      {
        id: 'tdd',
        kind: 'skill',
        label: '/test-driven-development',
        description: t(
          'RED-GREEN-REFACTOR selama implementasi: lihat tes gagal dulu, tulis kode minimal, lihat lulus.',
          'RED-GREEN-REFACTOR during implementation: watch the test fail first, write minimal code, watch it pass.',
        ),
        subtitle: t('Gerbang per task', 'Per-task gate'),
        position: { x: 240, y: 720 },
      },
      {
        id: 'review',
        kind: 'skill',
        label: '/requesting-code-review',
        description: t(
          'Dispatch subagent reviewer dengan BASE_SHA/HEAD_SHA; isu Critical diperbaiki segera, Important sebelum lanjut, Minor dicatat.',
          'Dispatch a reviewer subagent with BASE_SHA/HEAD_SHA; Critical issues fixed immediately, Important before proceeding, Minor noted.',
        ),
        subtitle: t('Review', 'Review'),
        position: { x: 240, y: 860 },
      },
      {
        id: 'finish',
        kind: 'onramp',
        label: '/finishing-a-development-branch',
        description: t(
          'Verifikasi tes, deteksi lingkungan, konfirmasi base, lalu tawarkan: merge lokal, push + PR, atau biarkan branch; cleanup worktree berbasis provenance.',
          'Verify tests, detect the environment, confirm the base, then offer: merge locally, push + PR, or keep the branch; provenance-based worktree cleanup.',
        ),
        subtitle: t('Integrasi & cleanup', 'Integrate & clean up'),
        position: { x: 240, y: 1000 },
      },
    ],
    [],
  )

  const edges: FlowGraphEdge[] = useMemo(
    () => [
      { id: 'e-brain-wt', source: 'brainstorm', target: 'worktree' },
      { id: 'e-wt-plans', source: 'worktree', target: 'plans' },
      { id: 'e-plans-mode', source: 'plans', target: 'exec-mode' },
      { id: 'e-mode-sdd', source: 'exec-mode', target: 'sdd', label: 'SUBAGENT' },
      { id: 'e-mode-exec', source: 'exec-mode', target: 'exec', label: 'INLINE' },
      { id: 'e-sdd-tdd', source: 'sdd', target: 'tdd' },
      { id: 'e-exec-tdd', source: 'exec', target: 'tdd' },
      { id: 'e-tdd-rev', source: 'tdd', target: 'review' },
      { id: 'e-rev-fin', source: 'review', target: 'finish', label: 'PASS' },
    ],
    [],
  )

  return (
    <section id="flow" className="scroll-mt-20 space-y-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-balance">
          {m.superpowers_flow_title()}
        </h2>
        <p className="mt-1 text-muted-foreground text-sm">
          {m.superpowers_flow_desc()}
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card p-2 shadow-xs">
        <Suspense
          fallback={
            <div className="flex h-[520px] items-center justify-center text-sm text-muted-foreground">
              {m.flow_loading()}
            </div>
          }
        >
          <FlowCanvas
            nodes={nodes}
            edges={edges}
            activeId={active}
            onSelect={setActive}
          />
        </Suspense>
      </div>
    </section>
  )
}
