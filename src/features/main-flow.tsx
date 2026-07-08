import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import {
  RiSearchEyeLine,
  RiQuestionLine,
  RiFileList3Line,
  RiListCheck,
  RiCodeSSlashLine,
  RiTestTubeLine,
  RiEyeLine,
  RiCheckboxCircleLine,
  RiBugLine,
  RiBuilding2Line,
} from '@remixicon/react'

type NodeId =
  | 'grill'
  | 'multi'
  | 'to-prd'
  | 'to-issues'
  | 'implement'
  | 'tdd'
  | 'code-review'
  | 'commit'
  | 'triage'
  | 'improve'

const nodeDescriptions: Record<NodeId, string> = {
  grill: 'Interview mendalam + domain modeling. Update CONTEXT.md dan ADRs.',
  multi: 'Apakah ini project multi-session atau fitur cepat?',
  'to-prd': 'Sintesis ke PRD: Problem Statement, Solution, User Stories, Decisions, Out of Scope.',
  'to-issues': 'Pecah PRD jadi vertical slices. Setiap issue memotong SEMUA layer end-to-end.',
  implement: 'Tulis kode, didorong oleh /tdd untuk test-first development.',
  tdd: 'Red → Green → Refactor. Test di seams (public interfaces).',
  'code-review': 'Dua axis: Standards (Fowler smells) + Spec (sesuai issue/PRD?).',
  commit: 'Kode lolos kedua review axis. Merge dan ship.',
  triage: 'ON-RAMP: Bug masuk melalui state machine ke main flow.',
  improve: 'ON-RAMP: Scan peluang shallow→deep, lalu implement.',
}

const nodeIcons: Record<NodeId, React.ReactNode> = {
  grill: <RiSearchEyeLine className="size-5" />,
  multi: <RiQuestionLine className="size-5" />,
  'to-prd': <RiFileList3Line className="size-5" />,
  'to-issues': <RiListCheck className="size-5" />,
  implement: <RiCodeSSlashLine className="size-5" />,
  tdd: <RiTestTubeLine className="size-5" />,
  'code-review': <RiEyeLine className="size-5" />,
  commit: <RiCheckboxCircleLine className="size-5" />,
  triage: <RiBugLine className="size-5" />,
  improve: <RiBuilding2Line className="size-5" />,
}

export function MainFlow() {
  const [active, setActive] = useState<NodeId | null>(null)

  return (
    <section id="flow" className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Alur Utama: Ide → Ship</h2>
        <p className="text-muted-foreground mt-1">
          Klik node untuk melihat detail. Ini adalah pipeline utama untuk semua feature work.
        </p>
      </div>

      <div className="border border-border rounded-lg p-6 bg-card">
        {/* Main flow */}
        <div className="flex flex-col items-center gap-0">
          <FlowNode
            id="grill"
            label="/grill-with-docs"
            active={active}
            onClick={setActive}
          />
          <Arrow />
          <FlowNode
            id="multi"
            label="Multi-session?"
            active={active}
            onClick={setActive}
            diamond
          />

          {/* Branches */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-4">
            {/* YES branch */}
            <div className="flex flex-col items-center gap-0">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 mb-2">
                YES
              </span>
              <FlowNode id="to-prd" label="/to-prd" active={active} onClick={setActive} />
              <Arrow />
              <FlowNode id="to-issues" label="/to-issues" active={active} onClick={setActive} />
              <Arrow />
              <FlowNode id="implement" label="/implement" active={active} onClick={setActive} />
              <span className="text-xs text-muted-foreground my-1 italic">drives ↓</span>
              <FlowNode id="tdd" label="/tdd" active={active} onClick={setActive} />
              <Arrow />
              <FlowNode id="code-review" label="/code-review" active={active} onClick={setActive} />
              <Arrow />
              <FlowNode id="commit" label="commit ✓" active={active} onClick={setActive} />
            </div>

            {/* NO branch */}
            <div className="flex flex-col items-center gap-0">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 mb-2">
                NO
              </span>
              <FlowNode id="implement" label="/implement" active={active} onClick={setActive} />
              <Arrow />
              <FlowNode id="code-review" label="/code-review" active={active} onClick={setActive} />
              <Arrow />
              <FlowNode id="commit" label="commit ✓" active={active} onClick={setActive} />
            </div>
          </div>
        </div>

        {/* On-ramps */}
        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-4">
            On-ramps
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <Card
              className="cursor-pointer border-muted hover:border-primary/50 transition-colors"
              onClick={() => setActive('triage')}
            >
              <CardContent className="p-4 flex items-center gap-3">
                <span className="text-primary">{nodeIcons.triage}</span>
                <div>
                  <p className="text-sm font-semibold font-mono">/triage</p>
                  <p className="text-xs text-muted-foreground">Bug masuk → state machine → main flow</p>
                </div>
              </CardContent>
            </Card>
            <Card
              className="cursor-pointer border-muted hover:border-primary/50 transition-colors"
              onClick={() => setActive('improve')}
            >
              <CardContent className="p-4 flex items-center gap-3">
                <span className="text-primary">{nodeIcons.improve}</span>
                <div>
                  <p className="text-sm font-semibold font-mono">/improve-codebase-architecture</p>
                  <p className="text-xs text-muted-foreground">Scan code rot → perbaiki → main flow</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Description panel */}
      {active && (
        <div className="border-l-4 border-primary rounded-r-lg p-4 bg-primary/5 transition-all">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-primary">{nodeIcons[active]}</span>
            <p className="font-mono text-sm font-semibold">/{active}</p>
          </div>
          <p className="text-sm text-muted-foreground">{nodeDescriptions[active]}</p>
        </div>
      )}
    </section>
  )
}

function FlowNode({
  id,
  label,
  active,
  onClick,
  diamond,
}: {
  id: NodeId
  label: string
  active: NodeId | null
  onClick: (id: NodeId) => void
  diamond?: boolean
}) {
  const isActive = active === id
  return (
    <button
      onClick={() => onClick(id)}
      className={`
        px-4 py-2.5 text-sm font-mono border transition-all cursor-pointer flex items-center gap-2
        ${diamond ? 'border-dashed rounded-md' : 'rounded-md'}
        ${isActive
          ? 'bg-primary text-primary-foreground border-primary shadow-sm'
          : 'bg-card border-border hover:border-primary/50 hover:shadow-sm'}
      `}
    >
      <span className={isActive ? '' : 'text-primary'}>{nodeIcons[id]}</span>
      {label}
    </button>
  )
}

function Arrow() {
  return (
    <div className="h-7 w-px bg-border relative">
      <svg className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[2px]" width="10" height="8" viewBox="0 0 10 8" fill="none">
        <path d="M5 8L0 0H10L5 8Z" className="fill-border" />
      </svg>
    </div>
  )
}
