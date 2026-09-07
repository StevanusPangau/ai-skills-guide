import { lazy, Suspense, useMemo, useState } from 'react'
import type { FlowGraphEdge, FlowGraphNode } from '@/features/flow/types'
import { m } from '@/paraglide/messages.js'
import { getLocale } from '@/paraglide/runtime.js'

const FlowCanvas = lazy(() =>
  import('@/features/flow/flow-canvas').then((mod) => ({ default: mod.FlowCanvas })),
)

export function VercelFlow() {
  const [active, setActive] = useState<string | null>(null)
  const isEn = getLocale() === 'en'

  const nodes: FlowGraphNode[] = useMemo(
    () => [
      {
        id: 'start',
        kind: 'skill',
        label: '/vercel-react-best-practices',
        description: isEn
          ? 'Write React/Next.js UI against 70 impact-ranked rules: kill waterfalls, trim bundles, tame re-renders'
          : 'Bangun UI React/Next.js dengan 70 aturan berperingkat impact: basmi waterfall, pangkas bundle, kendalikan re-render',
        subtitle: 'React & Next.js Performance',
        position: { x: 240, y: 0 },
      },
      {
        id: 'arch-gate',
        kind: 'decision',
        label: isEn ? 'UI ready?' : 'UI selesai?',
        description: isEn
          ? 'Confirm composition and native details before review: compound components, virtualized lists, view transitions where they mean something'
          : 'Pastikan komposisi dan detail native sebelum review: compound components, list tervirtualisasi, view transitions yang bermakna',
        position: { x: 240, y: 150 },
      },
      {
        id: 'composition',
        kind: 'skill',
        label: '/vercel-composition-patterns',
        description: isEn
          ? 'Refactor boolean-prop sprawl into compound components with dependency-injected state'
          : 'Refactor boolean prop yang menumpuk jadi compound components dengan state dependency-injected',
        subtitle: 'Component Architecture',
        position: { x: 30, y: 300 },
      },
      {
        id: 'native',
        kind: 'skill',
        label: '/vercel-react-native-skills',
        description: isEn
          ? 'For mobile targets: virtualized lists, GPU-only animations, native navigators and platform UI'
          : 'Untuk target mobile: list tervirtualisasi, animasi GPU saja, navigator native dan UI platform',
        subtitle: 'React Native & Expo',
        position: { x: 450, y: 300 },
      },
      {
        id: 'review-gate',
        kind: 'decision',
        label: isEn ? 'Review pass?' : 'Lolos review?',
        description: isEn
          ? 'Audit the interface and the words together before shipping'
          : 'Audit antarmuka dan tulisannya bersamaan sebelum rilis',
        position: { x: 240, y: 460 },
      },
      {
        id: 'design-review',
        kind: 'skill',
        label: '/web-design-guidelines',
        description: isEn
          ? 'Fetch the latest Web Interface Guidelines and audit UI files; findings land as terse file:line entries'
          : 'Fetch Web Interface Guidelines terbaru dan audit file UI; temuan dilaporkan ringkas per file:line',
        subtitle: 'UI & Accessibility Audit',
        position: { x: 100, y: 620 },
      },
      {
        id: 'writing-review',
        kind: 'skill',
        label: '/writing-guidelines',
        description: isEn
          ? 'Same fresh-fetch discipline for prose: docs and copy checked against the Writing Guidelines handbook'
          : 'Disiplin fetch segar yang sama untuk prosa: docs dan copy diperiksa terhadap handbook Writing Guidelines',
        subtitle: 'Docs & Prose Audit',
        position: { x: 380, y: 620 },
      },
      {
        id: 'deploy',
        kind: 'skill',
        label: '/deploy-to-vercel',
        description: isEn
          ? 'Deploy as preview via the best method — git push when linked, CLI otherwise — and surface the URL'
          : 'Deploy sebagai preview lewat metode terbaik — git push bila ter-link, CLI bila tidak — dan tampilkan URL-nya',
        subtitle: 'Preview Deployment',
        position: { x: 240, y: 780 },
      },
      {
        id: 'optimize',
        kind: 'onramp',
        label: '/vercel-optimize',
        description: isEn
          ? 'After traffic accumulates: a metrics-first audit ranks cost and performance fixes from 14 days of Vercel signals'
          : 'Setelah traffic terkumpul: audit berbasis metrik menyusun perbaikan biaya dan performa dari sinyal Vercel 14 hari',
        subtitle: 'Cost & Performance Audit',
        position: { x: 240, y: 940 },
      },
    ],
    [isEn],
  )

  const edges: FlowGraphEdge[] = useMemo(
    () => [
      { id: 'e-start-arch', source: 'start', target: 'arch-gate' },
      { id: 'e-arch-comp', source: 'arch-gate', target: 'composition', label: 'WEB' },
      { id: 'e-arch-native', source: 'arch-gate', target: 'native', label: 'MOBILE' },
      { id: 'e-comp-review', source: 'composition', target: 'review-gate' },
      { id: 'e-native-review', source: 'native', target: 'review-gate' },
      { id: 'e-review-design', source: 'review-gate', target: 'design-review' },
      { id: 'e-review-writing', source: 'review-gate', target: 'writing-review' },
      { id: 'e-design-deploy', source: 'design-review', target: 'deploy' },
      { id: 'e-writing-deploy', source: 'writing-review', target: 'deploy' },
      { id: 'e-deploy-optimize', source: 'deploy', target: 'optimize' },
    ],
    [],
  )

  return (
    <section id="flow" className="scroll-mt-20 space-y-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-balance">
          {m.vercel_flow_title()}
        </h2>
        <p className="mt-1 text-muted-foreground text-sm">
          {m.vercel_flow_desc()}
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
