export type FlowNodeKind = 'skill' | 'decision' | 'onramp' | 'commit'

export type FlowNodeData = {
  kind: FlowNodeKind
  label: string
  description: string
  /** Optional mono subtitle under label */
  subtitle?: string
}

export type FlowGraphNode = {
  id: string
  kind: FlowNodeKind
  label: string
  description: string
  subtitle?: string
  position: { x: number; y: number }
}

export type FlowGraphEdge = {
  id: string
  source: string
  target: string
  label?: string
  /** dashed for optional/skip paths */
  dashed?: boolean
}
