import { lazy, Suspense, useMemo, useState } from 'react'
import type { FlowGraphEdge, FlowGraphNode } from '@/features/flow/types'
import { m } from '@/paraglide/messages.js'
import { getLocale } from '@/paraglide/runtime.js'

const FlowCanvas = lazy(() => import('@/features/flow/flow-canvas').then((mod) => ({ default: mod.FlowCanvas })))

export function CloudflareFlow() {
  const [active, setActive] = useState<string | null>(null)
  const isEn = getLocale() === 'en'
  const nodes: FlowGraphNode[] = useMemo(() => [
    { id: 'develop', kind: 'skill', label: '/workers-best-practices', subtitle: 'Develop / Kembangkan', description: isEn ? 'Write and review Workers with version-correct APIs and bindings.' : 'Tulis dan review Worker dengan API dan binding yang sesuai versi.', position: { x: 240, y: 0 } },
    { id: 'deploy', kind: 'skill', label: '/wrangler', subtitle: 'Deploy / Rilis', description: isEn ? 'Configure, type-check, and deploy with the local Wrangler.' : 'Konfigurasi, type-check, dan deploy dengan Wrangler lokal.', position: { x: 240, y: 170 } },
    { id: 'observe', kind: 'skill', label: '/web-perf', subtitle: 'Observe / Observasi', description: isEn ? 'Audit Core Web Vitals and optimize loading and interaction.' : 'Audit Core Web Vitals dan optimasi loading serta interaksi.', position: { x: 240, y: 340 } },
    { id: 'secure', kind: 'skill', label: '/cloudflare-one', subtitle: 'Secure / Amankan', description: isEn ? 'Protect traffic with docs-first Zero Trust operations.' : 'Lindungi traffic dengan operasi Zero Trust berbasis dokumentasi.', position: { x: 240, y: 510 } },
  ], [isEn])
  const edges: FlowGraphEdge[] = useMemo(() => [
    { id: 'e1', source: 'develop', target: 'deploy' }, { id: 'e2', source: 'deploy', target: 'observe' }, { id: 'e3', source: 'observe', target: 'secure' },
  ], [])
  return <section id="flow" className="scroll-mt-20 space-y-4"><div><h2 className="text-2xl font-bold tracking-tight">{m.cloudflare_flow_title()}</h2><p className="mt-1 text-sm text-muted-foreground">{m.cloudflare_flow_desc()}</p></div><div className="rounded-xl border border-border bg-card p-2 shadow-xs"><Suspense fallback={<div className="flex h-[520px] items-center justify-center text-sm text-muted-foreground">Loading…</div>}><FlowCanvas nodes={nodes} edges={edges} activeId={active} onSelect={setActive} /></Suspense></div></section>
}
