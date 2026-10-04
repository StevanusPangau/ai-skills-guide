import { lazy, Suspense, useMemo, useState } from 'react'
import type { FlowGraphEdge, FlowGraphNode } from '@/features/flow/types'
import { m } from '@/paraglide/messages.js'

const FlowCanvas = lazy(() =>
  import('@/features/flow/flow-canvas').then((mod) => ({ default: mod.FlowCanvas })),
)

export function JakubFlow() {
  const [active, setActive] = useState<string | null>(null)

  // Mirrors upstream AGENTS.md: better-interface runs the six domain skills in order and
  // consolidates; interface-review hands change reviews up to it; variant / break /
  // explain-interface are standalone, user-invoked verbs.
  const nodes: FlowGraphNode[] = useMemo(
    () => [
      {
        id: 'review',
        kind: 'onramp',
        label: '/interface-review',
        description: m.jakub_flow_review(),
        subtitle: m.jakub_flow_sub_user(),
        position: { x: 240, y: 0 },
      },
      {
        id: 'bi',
        kind: 'skill',
        label: '/better-interface',
        description: m.jakub_flow_bi(),
        subtitle: m.jakub_flow_sub_model(),
        position: { x: 240, y: 150 },
      },
      {
        id: 'a11y',
        kind: 'skill',
        label: '/better-accessibility',
        description: m.jakub_flow_a11y(),
        subtitle: '1',
        position: { x: 240, y: 300 },
      },
      {
        id: 'layout',
        kind: 'skill',
        label: '/better-layout',
        description: m.jakub_flow_layout(),
        subtitle: '2',
        position: { x: 240, y: 440 },
      },
      {
        id: 'writing',
        kind: 'skill',
        label: '/better-writing',
        description: m.jakub_flow_writing(),
        subtitle: '3',
        position: { x: 240, y: 580 },
      },
      {
        id: 'typo',
        kind: 'skill',
        label: '/better-typography',
        description: m.jakub_flow_typo(),
        subtitle: '4',
        position: { x: 240, y: 720 },
      },
      {
        id: 'colors',
        kind: 'skill',
        label: '/better-colors',
        description: m.jakub_flow_colors(),
        subtitle: '5',
        position: { x: 240, y: 860 },
      },
      {
        id: 'ui',
        kind: 'skill',
        label: '/better-ui',
        description: m.jakub_flow_ui(),
        subtitle: '6',
        position: { x: 240, y: 1000 },
      },
      {
        id: 'verdict',
        kind: 'commit',
        label: 'report + verdict',
        description: m.jakub_flow_verdict(),
        position: { x: 240, y: 1140 },
      },
      {
        id: 'variant',
        kind: 'onramp',
        label: '/variant',
        description: m.jakub_flow_variant(),
        subtitle: m.jakub_flow_sub_standalone(),
        position: { x: 540, y: 150 },
      },
      {
        id: 'break',
        kind: 'onramp',
        label: '/break',
        description: m.jakub_flow_break(),
        subtitle: m.jakub_flow_sub_standalone(),
        position: { x: 540, y: 300 },
      },
      {
        id: 'explain',
        kind: 'onramp',
        label: '/explain-interface',
        description: m.jakub_flow_explain(),
        subtitle: m.jakub_flow_sub_standalone(),
        position: { x: 540, y: 440 },
      },
    ],
    [],
  )

  const edges: FlowGraphEdge[] = useMemo(
    () => [
      { id: 'e-review-bi', source: 'review', target: 'bi' },
      { id: 'e-bi-a11y', source: 'bi', target: 'a11y' },
      { id: 'e-a11y-layout', source: 'a11y', target: 'layout' },
      { id: 'e-layout-writing', source: 'layout', target: 'writing' },
      { id: 'e-writing-typo', source: 'writing', target: 'typo' },
      { id: 'e-typo-colors', source: 'typo', target: 'colors' },
      { id: 'e-colors-ui', source: 'colors', target: 'ui' },
      { id: 'e-ui-verdict', source: 'ui', target: 'verdict' },
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
