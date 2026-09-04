import { lazy, Suspense, useMemo, useState } from 'react'
import type { FlowGraphEdge, FlowGraphNode } from '@/features/flow/types'

const FlowCanvas = lazy(() =>
  import('@/features/flow/flow-canvas').then((mod) => ({ default: mod.FlowCanvas })),
)

export function SuperpowersFlow() {
  const [active, setActive] = useState<string | null>(null)

  const nodes: FlowGraphNode[] = useMemo(
    () => [
      {
        id: 'brainstorm',
        kind: 'skill',
        label: '/brainstorming',
        description: 'Interview Socratic satu per satu untuk menggali kebutuhan dan trade-off spesifik sebelum coding',
        subtitle: 'Phase 1: Alignment',
        position: { x: 240, y: 0 },
      },
      {
        id: 'plans',
        kind: 'skill',
        label: '/writing-plans',
        description: 'Tulis plan modular dengan acceptance criteria & checklist commit atomic per task',
        subtitle: 'Phase 2: Modular Spec',
        position: { x: 240, y: 150 },
      },
      {
        id: 'exec-mode',
        kind: 'decision',
        label: 'Mode Eksekusi?',
        description: 'Pilih apakah eksekusi butuh subagent terisolasi atau paralel multi-task',
        position: { x: 240, y: 300 },
      },
      {
        id: 'sdd',
        kind: 'skill',
        label: '/subagent-driven-development',
        description: 'Dispatch 1 subagent steril per task, koordinator tetap bersih di Smart Zone',
        subtitle: 'Single Subagent Gate',
        position: { x: 40, y: 460 },
      },
      {
        id: 'parallel',
        kind: 'skill',
        label: '/dispatching-parallel-agents',
        description: 'Jalankan beberapa subagent secara bersamaan untuk task independen',
        subtitle: 'Concurrent Agents',
        position: { x: 440, y: 460 },
      },
      {
        id: 'tdd',
        kind: 'skill',
        label: '/test-driven-development',
        description: 'Strict Red-Green-Refactor di lingkungan kerja subagent',
        subtitle: 'Verification Barrier',
        position: { x: 240, y: 620 },
      },
      {
        id: 'review',
        kind: 'decision',
        label: 'Review Gate',
        description: 'Minta review kode independen dari spec reviewer sebelum commit',
        position: { x: 240, y: 780 },
      },
      {
        id: 'finish',
        kind: 'onramp',
        label: '/finishing-a-development-branch',
        description: 'Verifikasi checklist lengkap, squash commit bersih, dan merge ke target branch',
        subtitle: 'Ship & Clean Up',
        position: { x: 240, y: 940 },
      },
    ],
    [],
  )

  const edges: FlowGraphEdge[] = useMemo(
    () => [
      { id: 'e-brain-plans', source: 'brainstorm', target: 'plans' },
      { id: 'e-plans-mode', source: 'plans', target: 'exec-mode' },
      { id: 'e-mode-sdd', source: 'exec-mode', target: 'sdd', label: 'SERIAL' },
      { id: 'e-mode-par', source: 'exec-mode', target: 'parallel', label: 'PARALLEL' },
      { id: 'e-sdd-tdd', source: 'sdd', target: 'tdd' },
      { id: 'e-par-tdd', source: 'parallel', target: 'tdd' },
      { id: 'e-tdd-rev', source: 'tdd', target: 'review' },
      { id: 'e-rev-fin', source: 'review', target: 'finish', label: 'PASS' },
    ],
    [],
  )

  return (
    <section id="flow" className="scroll-mt-20 space-y-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-balance">
          Alur Subagent-Driven Development (SDD)
        </h2>
        <p className="mt-1 text-muted-foreground text-sm">
          Diagram alur lengkap bagaimana koordinator utama mendelegasikan pengerjaan ke subagent terisolasi dengan review gate yang disiplin.
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card p-2 shadow-xs">
        <Suspense
          fallback={
            <div className="flex h-[520px] items-center justify-center text-sm text-muted-foreground">
              Memuat diagram flow...
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
