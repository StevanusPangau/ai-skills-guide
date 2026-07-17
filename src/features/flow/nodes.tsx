import { memo } from 'react'
import { Handle, Position, type NodeProps, type Node } from '@xyflow/react'
import type { FlowNodeData, FlowNodeKind } from './types'
import { cn } from '@/lib/utils'

export type GuideNode = Node<FlowNodeData, 'guide'>

const kindClass: Record<FlowNodeKind, string> = {
  skill: 'border-border',
  decision: 'border-dashed border-amber-500/60',
  onramp: 'border-sky-500/50',
  commit: 'border-emerald-500/50',
}

function GuideNodeComponent({ data, selected }: NodeProps<GuideNode>) {
  return (
    <div
      className={cn(
        'relative min-w-[188px] max-w-[240px] cursor-pointer rounded-lg border bg-card px-3.5 py-3 shadow-sm transition-[color,background-color,border-color,box-shadow]',
        kindClass[data.kind],
        selected && 'border-primary ring-2 ring-primary/30 shadow-md',
      )}
    >
      {/* Handles required for edges; visually hidden. */}
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={false}
        className="!pointer-events-none !h-px !w-px !min-h-0 !min-w-0 !border-0 !bg-transparent !opacity-0"
      />
      <p
        className={cn(
          'text-sm font-semibold leading-snug',
          data.kind === 'decision' ? 'font-sans' : 'font-mono',
        )}
      >
        {data.label}
      </p>
      {data.subtitle && (
        <p className="mt-1 text-[11px] leading-snug text-muted-foreground">
          {data.subtitle}
        </p>
      )}
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={false}
        className="!pointer-events-none !h-px !w-px !min-h-0 !min-w-0 !border-0 !bg-transparent !opacity-0"
      />
    </div>
  )
}

export const GuideNode = memo(GuideNodeComponent)
