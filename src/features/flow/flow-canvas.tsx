import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  MarkerType,
  ReactFlow,
  type Edge,
  type Node,
  type NodeMouseHandler,
} from '@xyflow/react'
import { GuideNode } from './nodes'
import type { FlowGraphEdge, FlowGraphNode, FlowNodeData } from './types'
import { cn } from '@/lib/utils'
import { m } from '@/paraglide/messages.js'

const nodeTypes = { guide: GuideNode }

/** Rough node box for height calculation (matches GuideNode max size). */
const NODE_W = 240
const NODE_H = 88
const PAD_X = 32
const PAD_TOP = 16
const PAD_BOTTOM = 40

function useColorMode(): 'light' | 'dark' {
  const [mode, setMode] = useState<'light' | 'dark'>(() =>
    document.documentElement.classList.contains('dark') ? 'dark' : 'light',
  )

  useEffect(() => {
    const root = document.documentElement
    const sync = () => setMode(root.classList.contains('dark') ? 'dark' : 'light')
    sync()
    const obs = new MutationObserver(sync)
    obs.observe(root, { attributes: true, attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])

  return mode
}

function graphSize(graph: FlowGraphNode[]) {
  let maxX = 0
  let maxY = 0
  for (const n of graph) {
    maxX = Math.max(maxX, n.position.x + NODE_W)
    maxY = Math.max(maxY, n.position.y + NODE_H)
  }
  return {
    width: maxX + PAD_X,
    height: maxY + PAD_TOP + PAD_BOTTOM,
  }
}

function toNodes(graph: FlowGraphNode[], activeId: string | null): Node<FlowNodeData>[] {
  return graph.map((n) => ({
    id: n.id,
    type: 'guide',
    position: { x: n.position.x, y: n.position.y + PAD_TOP },
    data: {
      kind: n.kind,
      label: n.label,
      description: n.description,
      subtitle: n.subtitle,
    },
    selected: activeId === n.id,
  }))
}

function toEdges(graph: FlowGraphEdge[], activeId: string | null): Edge[] {
  return graph.map((e) => {
    const related = activeId != null && (e.source === activeId || e.target === activeId)
    // muted-foreground is readable in light+dark; plain --border is nearly invisible on dark.
    const stroke = related
      ? 'var(--primary)'
      : 'color-mix(in oklab, var(--muted-foreground) 75%, transparent)'
    return {
      id: e.id,
      source: e.source,
      target: e.target,
      label: e.label,
      type: 'smoothstep',
      animated: related,
      zIndex: related ? 5 : 0,
      style: {
        stroke,
        strokeWidth: related ? 2.25 : 2,
        strokeDasharray: e.dashed ? '6 4' : undefined,
      },
      labelStyle: {
        fill: 'var(--muted-foreground)',
        fontSize: 10,
        fontWeight: 600,
      },
      labelBgStyle: {
        fill: 'var(--background)',
        fillOpacity: 0.95,
      },
      labelBgPadding: [4, 6] as [number, number],
      labelBgBorderRadius: 4,
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 18,
        height: 18,
        color: stroke,
      },
    }
  })
}

type FlowCanvasProps = {
  nodes: FlowGraphNode[]
  edges: FlowGraphEdge[]
  activeId: string | null
  onSelect: (id: string) => void
  className?: string
}

export function FlowCanvas({
  nodes: graphNodes,
  edges: graphEdges,
  activeId,
  onSelect,
  className,
}: FlowCanvasProps) {
  const colorMode = useColorMode()
  const size = useMemo(() => graphSize(graphNodes), [graphNodes])

  const nodes = useMemo(
    () => toNodes(graphNodes, activeId),
    [graphNodes, activeId],
  )
  const edges = useMemo(
    () => toEdges(graphEdges, activeId),
    [graphEdges, activeId],
  )

  const onNodeClick: NodeMouseHandler = useCallback(
    (_evt, node) => {
      onSelect(node.id)
    },
    [onSelect],
  )

  const activeDescription = useMemo(() => {
    if (!activeId) return null
    return graphNodes.find((n) => n.id === activeId) ?? null
  }, [activeId, graphNodes])

  return (
    <div className={cn('space-y-4', className)}>
      {/*
        Height follows graph bounds so the full flow is visible at zoom=1.
        No card/border/background dots — blends into page; page scroll only.
      */}
      <div
        className="react-flow-guide w-full"
        style={{ height: size.height, minHeight: size.height }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodeClick={onNodeClick}
          colorMode={colorMode}
          defaultViewport={{ x: 0, y: 0, zoom: 1 }}
          minZoom={1}
          maxZoom={1}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable
          panOnDrag={false}
          panOnScroll={false}
          zoomOnScroll={false}
          zoomOnPinch={false}
          zoomOnDoubleClick={false}
          preventScrolling={false}
          proOptions={{ hideAttribution: true }}
          defaultEdgeOptions={{ type: 'smoothstep' }}
          nodesFocusable
          edgesFocusable={false}
          selectNodesOnDrag={false}
          deleteKeyCode={null}
          multiSelectionKeyCode={null}
          selectionKeyCode={null}
          autoPanOnNodeDrag={false}
          autoPanOnConnect={false}
        />
      </div>

      {activeDescription ? (
        <div className="rounded-r-lg border-l-4 border-primary bg-primary/5 p-4 transition-all">
          <p className="font-mono text-sm font-semibold">
            {activeDescription.label}
          </p>
          {activeDescription.subtitle && (
            <p className="mt-0.5 text-xs text-muted-foreground">
              {activeDescription.subtitle}
            </p>
          )}
          <p className="mt-2 text-sm text-muted-foreground">
            {activeDescription.description}
          </p>
        </div>
      ) : (
        <p className="text-xs text-muted-foreground">{m.flow_canvas_hint()}</p>
      )}
    </div>
  )
}
