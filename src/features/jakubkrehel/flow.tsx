import { lazy, Suspense, useMemo, useState } from 'react'
import type { FlowGraphEdge, FlowGraphNode } from '@/features/flow/types'
import { m } from '@/paraglide/messages.js'

const FlowCanvas = lazy(() =>
  import('@/features/flow/flow-canvas').then((mod) => ({ default: mod.FlowCanvas })),
)

export function JakubFlow() {
  const [active, setActive] = useState<string | null>(null)

  const nodes: FlowGraphNode[] = useMemo(
    () => [
      {
        id: 'spec',
        kind: 'skill',
        label: '/better-interface',
        description: 'Meta-skill: audit holistik mencakup layout, warna, tipografi, dan interaksi',
        subtitle: 'Audit Komprehensif',
        position: { x: 240, y: 0 },
      },
      {
        id: 'domain-gate',
        kind: 'decision',
        label: 'Domain Perbaikan?',
        description: 'Tentukan lapisan antarmuka yang memerlukan penyempurnaan presisi',
        position: { x: 240, y: 150 },
      },
      {
        id: 'visual',
        kind: 'skill',
        label: '/better-ui',
        description: 'Poles concentric radius, optical alignment, surface depth, dan hit areas',
        subtitle: 'Micro-UI Details',
        position: { x: 20, y: 300 },
      },
      {
        id: 'typo',
        kind: 'skill',
        label: '/better-typography',
        description: 'Atur type scale, variable fonts, tabular numbers, dan text wrapping',
        subtitle: 'Typography & Numerics',
        position: { x: 240, y: 300 },
      },
      {
        id: 'color',
        kind: 'skill',
        label: '/better-colors',
        description: 'Semantic tokens, kontras APCA, dan palet warna adaptif dark mode',
        subtitle: 'Color Tokens & APCA',
        position: { x: 460, y: 300 },
      },
      {
        id: 'stress-gate',
        kind: 'decision',
        label: 'Stress-Test UI?',
        description: 'Uji daya tahan antarmuka terhadap data ekstrim & overflow',
        position: { x: 240, y: 460 },
      },
      {
        id: 'break',
        kind: 'skill',
        label: '/break',
        description: 'Simulasi teks super panjang, localization layout shift, dan zero state',
        subtitle: 'Edge-Case Stress Test',
        position: { x: 80, y: 610 },
      },
      {
        id: 'review',
        kind: 'onramp',
        label: '/interface-review',
        description: 'Final design pass: verifikasi pixel-precision dan konsistensi sebelum ship',
        subtitle: 'Pre-Ship Design Gate',
        position: { x: 240, y: 760 },
      },
    ],
    [],
  )

  const edges: FlowGraphEdge[] = useMemo(
    () => [
      { id: 'e-spec-domain', source: 'spec', target: 'domain-gate' },
      { id: 'e-domain-visual', source: 'domain-gate', target: 'visual' },
      { id: 'e-domain-typo', source: 'domain-gate', target: 'typo' },
      { id: 'e-domain-color', source: 'domain-gate', target: 'color' },
      { id: 'e-visual-stress', source: 'visual', target: 'stress-gate' },
      { id: 'e-typo-stress', source: 'typo', target: 'stress-gate' },
      { id: 'e-color-stress', source: 'color', target: 'stress-gate' },
      { id: 'e-stress-break', source: 'stress-gate', target: 'break' },
      { id: 'e-break-review', source: 'break', target: 'review' },
      { id: 'e-stress-review', source: 'stress-gate', target: 'review' },
    ],
    [],
  )

  return (
    <section id="flow" className="scroll-mt-20 space-y-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-balance">
          {m.jakub_flow_title()}
        </h2>
        <p className="mt-1 text-muted-foreground text-sm">
          {m.jakub_flow_desc()}
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
