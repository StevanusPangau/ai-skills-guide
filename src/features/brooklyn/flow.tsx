import { lazy, Suspense, useMemo, useState } from 'react'
import type { FlowGraphEdge, FlowGraphNode } from '@/features/flow/types'

const FlowCanvas = lazy(() =>
  import('@/features/flow/flow-canvas').then((mod) => ({ default: mod.FlowCanvas })),
)

export function BrooklynFlow() {
  const [active, setActive] = useState<string | null>(null)

  const nodes: FlowGraphNode[] = useMemo(
    () => [
      {
        id: 'start',
        kind: 'skill',
        label: '/work',
        description: 'Mulai task di isolasi git worktree baru tanpa mengotori branch aktif',
        subtitle: 'Git Worktree Isolation',
        position: { x: 240, y: 0 },
      },
      {
        id: 'dev-gate',
        kind: 'decision',
        label: 'Tipe Task?',
        description: 'Tentukan apakah task adalah bugfix, feature, audit atau perf',
        position: { x: 240, y: 150 },
      },
      {
        id: 'audit',
        kind: 'skill',
        label: '/audit-only',
        description: 'Investigasi read-only: laporkan temuan dulu, dilarang menyentuh kode',
        subtitle: 'Read-only mode',
        position: { x: 30, y: 300 },
      },
      {
        id: 'ui-only',
        kind: 'skill',
        label: '/ui-only',
        description: 'Batasi lingkup modifikasi hanya pada layer antarmuka/styling',
        subtitle: 'UI Polish boundary',
        position: { x: 450, y: 300 },
      },
      {
        id: 'pre-pr',
        kind: 'decision',
        label: 'Siap Handoff?',
        description: 'Verifikasi visual & runtime sebelum memoles diff',
        position: { x: 240, y: 460 },
      },
      {
        id: 'clean',
        kind: 'skill',
        label: '/clean',
        description: 'Poles diff sendiri dengan prinsip KISS/DRY, hapus dead-code & logs',
        subtitle: 'Pre-handoff Pass',
        position: { x: 100, y: 620 },
      },
      {
        id: 'notropes',
        kind: 'skill',
        label: '/no-tropes',
        description: 'Pangkas AI-writing buzzwords agar PR description terbaca natural',
        subtitle: 'Anti-AI Fluff Filter',
        position: { x: 380, y: 620 },
      },
      {
        id: 'cpr',
        kind: 'skill',
        label: '/cpr',
        description: 'Clean + Push + Buka Pull Request otomatis dalam 1 langkah mulus',
        subtitle: 'Clean & Open PR',
        position: { x: 240, y: 780 },
      },
      {
        id: 'babysit',
        kind: 'onramp',
        label: '/babysit',
        description: 'Pantau CI terus-menerus ke hijau: retry flaky tests & atasi blocker otomatis',
        subtitle: 'CI Autonomous Watcher',
        position: { x: 240, y: 940 },
      },
    ],
    [],
  )

  const edges: FlowGraphEdge[] = useMemo(
    () => [
      { id: 'e-start-dev', source: 'start', target: 'dev-gate' },
      { id: 'e-dev-audit', source: 'dev-gate', target: 'audit', label: 'AUDIT' },
      { id: 'e-dev-ui', source: 'dev-gate', target: 'ui-only', label: 'UI' },
      { id: 'e-audit-pre', source: 'audit', target: 'pre-pr' },
      { id: 'e-ui-pre', source: 'ui-only', target: 'pre-pr' },
      { id: 'e-pre-clean', source: 'pre-pr', target: 'clean' },
      { id: 'e-pre-notropes', source: 'pre-pr', target: 'notropes' },
      { id: 'e-clean-cpr', source: 'clean', target: 'cpr' },
      { id: 'e-notropes-cpr', source: 'notropes', target: 'cpr' },
      { id: 'e-cpr-babysit', source: 'cpr', target: 'babysit' },
    ],
    [],
  )

  return (
    <section id="flow" className="scroll-mt-20 space-y-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-balance">
          Alur Autonomous Shipping (/cpr)
        </h2>
        <p className="mt-1 text-muted-foreground text-sm">
          Diagram alur terintegrasi bagaimana Brooklyn mengelola isolasi cabang, review diff, pembersihan AI-tropes, hingga pemantauan CI otomatis.
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
