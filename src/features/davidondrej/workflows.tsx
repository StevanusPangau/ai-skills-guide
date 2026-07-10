import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { m } from '@/paraglide/messages.js'

function getWorkflows() {
  return [
    {
      title: m.david_workflow_1_title(),
      description: m.david_workflow_1_description(),
      why: m.david_workflow_1_why(),
      steps: [
        'folder-specific-claude-and-agents-md',
        'brain-to-docs',
        'README + docs/adr/*',
      ],
    },
    {
      title: m.david_workflow_2_title(),
      description: m.david_workflow_2_description(),
      why: m.david_workflow_2_why(),
      steps: ['level-up', 'LEARNING-PLAN.md', 'teach (reuse Matt)'],
    },
    {
      title: m.david_workflow_3_title(),
      description: m.david_workflow_3_description(),
      why: m.david_workflow_3_why(),
      steps: ['research-prompt', 'deep-research (optional)', 'markdown report'],
    },
    {
      title: m.david_workflow_4_title(),
      description: m.david_workflow_4_description(),
      why: m.david_workflow_4_why(),
      steps: [
        'goal-loop (5-part contract)',
        'anti-sleep',
        'validate command loop',
      ],
    },
    {
      title: m.david_workflow_5_title(),
      description: m.david_workflow_5_description(),
      why: m.david_workflow_5_why(),
      steps: [
        'agent-self-scheduling',
        'heartbeat / zero-token',
        'silent when idle',
      ],
    },
    {
      title: m.david_workflow_6_title(),
      description: m.david_workflow_6_description(),
      why: m.david_workflow_6_why(),
      steps: ['handoff (state, not orders)', 'fresh session', 'verify pointers'],
    },
    {
      title: m.david_workflow_7_title(),
      description: m.david_workflow_7_description(),
      why: m.david_workflow_7_why(),
      steps: [
        'effective-agent-skills',
        'write SKILL.md',
        'folder-specific context',
      ],
    },
  ]
}

export function DavidWorkflows() {
  const workflows = getWorkflows()

  return (
    <section id="workflows" className="scroll-mt-20 space-y-6">
      <div>
        <h2 className="font-heading text-2xl font-bold tracking-tight">
          {m.david_workflows_title()}
        </h2>
        <p className="mt-1 text-muted-foreground">
          {m.david_workflows_description()}
        </p>
      </div>

      <div className="grid gap-4">
        {workflows.map((wf, idx) => (
          <Card key={idx} className="border border-border">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {idx + 1}
                </span>
                <div>
                  <CardTitle className="text-sm font-semibold">{wf.title}</CardTitle>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {wf.description}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap items-center gap-1.5">
                {wf.steps.map((step, i) => (
                  <span key={i} className="flex items-center gap-1.5">
                    <Badge
                      variant="secondary"
                      className="whitespace-nowrap font-mono text-xs"
                    >
                      {step}
                    </Badge>
                    {i < wf.steps.length - 1 && (
                      <span className="text-sm text-muted-foreground">→</span>
                    )}
                  </span>
                ))}
              </div>
              <div className="border-l-2 border-primary/30 pl-3 text-xs text-muted-foreground italic">
                <span className="font-semibold text-foreground not-italic">
                  {m.david_workflows_why()}{' '}
                </span>
                {wf.why}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
