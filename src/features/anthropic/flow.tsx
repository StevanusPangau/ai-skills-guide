import { lazy, Suspense, useMemo, useState } from 'react'
import type { FlowGraphEdge, FlowGraphNode } from '@/features/flow/types'
import { m } from '@/paraglide/messages.js'
import { getLocale } from '@/paraglide/runtime.js'

const FlowCanvas = lazy(() => import('@/features/flow/flow-canvas').then((mod) => ({ default: mod.FlowCanvas })))

export function AnthropicFlow() {
  const [active, setActive] = useState<string | null>(null)
  const isEn = getLocale() === 'en'
  const nodes: FlowGraphNode[] = useMemo(() => [
    { id: 'creator', kind: 'skill', label: '/skill-creator', subtitle: 'Authoring / Penulisan', description: isEn ? 'Create, evaluate, and improve a reusable skill.' : 'Buat, evaluasi, dan tingkatkan skill yang reusable.', position: { x: 240, y: 0 } },
    { id: 'mcp', kind: 'skill', label: '/mcp-builder', subtitle: 'Integration / Integrasi', description: isEn ? 'Build a reliable MCP server around external tools.' : 'Bangun MCP server yang andal untuk tools eksternal.', position: { x: 240, y: 170 } },
    { id: 'production', kind: 'skill', label: '/document-skills + /frontend-design', subtitle: 'Production / Produksi', description: isEn ? 'Produce documents and design-forward interfaces.' : 'Produksi dokumen dan antarmuka yang berorientasi desain.', position: { x: 240, y: 340 } },
    { id: 'testing', kind: 'skill', label: '/webapp-testing', subtitle: 'Validation / Validasi', description: isEn ? 'Test the resulting web application before delivery.' : 'Uji aplikasi web sebelum diserahkan.', position: { x: 240, y: 510 } },
  ], [isEn])
  const edges: FlowGraphEdge[] = useMemo(() => [
    { id: 'e1', source: 'creator', target: 'mcp' }, { id: 'e2', source: 'mcp', target: 'production' }, { id: 'e3', source: 'production', target: 'testing' },
  ], [])
  return <section id="flow" className="scroll-mt-20 space-y-4"><div><h2 className="text-2xl font-bold tracking-tight">{m.anthropic_flow_title()}</h2><p className="mt-1 text-sm text-muted-foreground">{m.anthropic_flow_desc()}</p></div><div className="rounded-xl border border-border bg-card p-2 shadow-xs"><Suspense fallback={<div className="flex h-[520px] items-center justify-center text-sm text-muted-foreground">Loading…</div>}><FlowCanvas nodes={nodes} edges={edges} activeId={active} onSelect={setActive} /></Suspense></div></section>
}
