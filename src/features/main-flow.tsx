import { useMemo, useState } from 'react'
import { FlowCanvas } from '@/features/flow/flow-canvas'
import type { FlowGraphEdge, FlowGraphNode } from '@/features/flow/types'
import { m } from '@/paraglide/messages.js'

// Main build chain + official on-ramps (Matt's recommended path).

export function MainFlow() {
  const [active, setActive] = useState<string | null>(null)

  const nodes: FlowGraphNode[] = useMemo(
    () => [
      {
        id: 'grill',
        kind: 'skill',
        label: '/grill-with-docs',
        description: m.flow_node_grill(),
        position: { x: 250, y: 0 },
      },
      {
        id: 'multi',
        kind: 'decision',
        label: 'Multi-session?',
        description: m.flow_node_multi(),
        position: { x: 260, y: 140 },
      },
      // YES branch
      {
        id: 'to-spec',
        kind: 'skill',
        label: '/to-spec',
        description: m.flow_node_to_spec(),
        subtitle: 'YES · multi-session',
        position: { x: 20, y: 300 },
      },
      {
        id: 'to-tickets',
        kind: 'skill',
        label: '/to-tickets',
        description: m.flow_node_to_tickets(),
        position: { x: 20, y: 440 },
      },
      {
        id: 'implement-yes',
        kind: 'skill',
        label: '/implement',
        description: m.flow_node_implement(),
        position: { x: 20, y: 580 },
      },
      {
        id: 'tdd',
        kind: 'skill',
        label: '/tdd',
        description: m.flow_node_tdd(),
        subtitle: 'drives implement',
        position: { x: 20, y: 720 },
      },
      {
        id: 'code-review-yes',
        kind: 'skill',
        label: '/code-review',
        description: m.flow_node_code_review(),
        position: { x: 20, y: 860 },
      },
      {
        id: 'commit-yes',
        kind: 'commit',
        label: 'commit ✓',
        description: m.flow_node_commit(),
        position: { x: 20, y: 1000 },
      },
      // NO branch
      {
        id: 'implement-no',
        kind: 'skill',
        label: '/implement',
        description: m.flow_node_implement(),
        subtitle: 'NO · single session',
        position: { x: 460, y: 300 },
      },
      {
        id: 'code-review-no',
        kind: 'skill',
        label: '/code-review',
        description: m.flow_node_code_review(),
        position: { x: 460, y: 460 },
      },
      {
        id: 'commit-no',
        kind: 'commit',
        label: 'commit ✓',
        description: m.flow_node_commit(),
        position: { x: 460, y: 620 },
      },
      // On-ramps (no reverse edges — avoids long looping lines)
      {
        id: 'triage',
        kind: 'onramp',
        label: '/triage',
        description: m.flow_node_triage(),
        subtitle: m.flow_triage_description(),
        position: { x: 40, y: 1160 },
      },
      {
        id: 'improve',
        kind: 'onramp',
        label: '/improve-codebase-architecture',
        description: m.flow_node_improve(),
        subtitle: m.flow_improve_description(),
        position: { x: 360, y: 1160 },
      },
    ],
    [],
  )

  const edges: FlowGraphEdge[] = useMemo(
    () => [
      { id: 'e-grill-multi', source: 'grill', target: 'multi' },
      { id: 'e-multi-spec', source: 'multi', target: 'to-spec', label: 'YES' },
      { id: 'e-spec-tickets', source: 'to-spec', target: 'to-tickets' },
      { id: 'e-tickets-impl', source: 'to-tickets', target: 'implement-yes' },
      { id: 'e-impl-tdd', source: 'implement-yes', target: 'tdd' },
      { id: 'e-tdd-review', source: 'tdd', target: 'code-review-yes' },
      { id: 'e-review-commit-yes', source: 'code-review-yes', target: 'commit-yes' },
      { id: 'e-multi-impl-no', source: 'multi', target: 'implement-no', label: 'NO' },
      { id: 'e-impl-review-no', source: 'implement-no', target: 'code-review-no' },
      { id: 'e-review-commit-no', source: 'code-review-no', target: 'commit-no' },
    ],
    [],
  )

  return (
    <section id="flow" className="scroll-mt-20 space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{m.flow_title()}</h2>
        <p className="mt-1 text-muted-foreground">{m.flow_description()}</p>
      </div>

      <FlowCanvas
        nodes={nodes}
        edges={edges}
        activeId={active}
        onSelect={setActive}
      />
    </section>
  )
}
