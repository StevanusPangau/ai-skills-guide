import { lazy, Suspense, useMemo, useState } from 'react'
import type { FlowGraphEdge, FlowGraphNode } from '@/features/flow/types'
import { m } from '@/paraglide/messages.js'

const FlowCanvas = lazy(() =>
  import('@/features/flow/flow-canvas').then((mod) => ({ default: mod.FlowCanvas })),
)

// Recommended path built only from skills that exist upstream (pinned SHA in
// davidondrej-skills.ts): setup-help, before-building, ask-then-build,
// adr-verbatim, deep-research, goal-loop, anti-sleep, git-worktree, handoff,
// total-review, effective-agent-skills.

export function DavidMainFlow() {
  const [active, setActive] = useState<string | null>(null)

  const nodes: FlowGraphNode[] = useMemo(
    () => [
      {
        id: 'context',
        kind: 'skill',
        label: '/setup-help',
        description: m.david_flow_node_context(),
        subtitle: '+ /before-building',
        position: { x: 250, y: 0 },
      },
      {
        id: 'capture',
        kind: 'skill',
        label: '/ask-then-build',
        description: m.david_flow_node_capture(),
        subtitle: '+ /adr-verbatim',
        position: { x: 250, y: 140 },
      },
      {
        id: 'research-gate',
        kind: 'decision',
        label: m.david_flow_gate_research(),
        description: m.david_flow_node_research_gate(),
        position: { x: 240, y: 290 },
      },
      {
        id: 'research',
        kind: 'skill',
        label: '/deep-research',
        description: m.david_flow_node_research(),
        subtitle: m.david_flow_optional_deep(),
        position: { x: 20, y: 450 },
      },
      {
        id: 'work-gate',
        kind: 'decision',
        label: m.david_flow_gate_work(),
        description: m.david_flow_node_work_gate(),
        position: { x: 240, y: 620 },
      },
      {
        id: 'goal',
        kind: 'skill',
        label: '/goal-loop',
        description: m.david_flow_node_goal(),
        subtitle: '+ /anti-sleep',
        position: { x: 20, y: 780 },
      },
      {
        id: 'session',
        kind: 'skill',
        label: m.david_flow_normal_session(),
        description: m.david_flow_node_session(),
        position: { x: 460, y: 780 },
      },
      // Sustain on-ramps — no reverse edges (keeps diagram clean)
      {
        id: 'handoff',
        kind: 'onramp',
        label: '/handoff',
        description: m.david_flow_node_handoff(),
        subtitle: m.david_flow_onramp_handoff(),
        position: { x: 0, y: 960 },
      },
      {
        id: 'review',
        kind: 'onramp',
        label: '/total-review',
        description: m.david_flow_node_review(),
        subtitle: m.david_flow_onramp_review(),
        position: { x: 250, y: 960 },
      },
      {
        id: 'author',
        kind: 'onramp',
        label: '/effective-agent-skills',
        description: m.david_flow_node_author(),
        subtitle: m.david_flow_onramp_author(),
        position: { x: 500, y: 960 },
      },
    ],
    [],
  )

  const edges: FlowGraphEdge[] = useMemo(
    () => [
      { id: 'e-ctx-cap', source: 'context', target: 'capture' },
      { id: 'e-cap-rg', source: 'capture', target: 'research-gate' },
      { id: 'e-rg-yes', source: 'research-gate', target: 'research', label: 'YES' },
      // NO skips research — direct to work gate (no fake skip node)
      {
        id: 'e-rg-no',
        source: 'research-gate',
        target: 'work-gate',
        label: 'NO',
        dashed: true,
      },
      { id: 'e-res-wg', source: 'research', target: 'work-gate' },
      { id: 'e-wg-long', source: 'work-gate', target: 'goal', label: 'YES' },
      { id: 'e-wg-short', source: 'work-gate', target: 'session', label: 'NO' },
    ],
    [],
  )

  return (
    <section id="flow" className="scroll-mt-20 space-y-6">
      <div>
        <h2 className="font-heading text-2xl font-bold tracking-tight text-balance">
          {m.david_flow_title()}
        </h2>
        <p className="mt-1 text-muted-foreground">{m.david_flow_description()}</p>
        <p className="mt-2 max-w-2xl text-xs text-muted-foreground">
          {m.david_flow_disclaimer()}
        </p>
      </div>

      <Suspense
        fallback={
          <div
            className="flex min-h-[20rem] items-center justify-center rounded-lg border border-dashed border-border bg-muted/20 text-sm text-muted-foreground"
            role="status"
          >
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
    </section>
  )
}
