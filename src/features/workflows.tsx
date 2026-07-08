import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { m } from '@/paraglide/messages.js'

function getWorkflows() {
  return [
    {
      title: m.workflow_1_title(),
      description: m.workflow_1_description(),
      mengapa: m.workflow_1_why(),
      steps: ['grill-with-docs', 'to-prd', 'to-issues', 'implement (tdd)', 'code-review'],
    },
    {
      title: m.workflow_2_title(),
      description: m.workflow_2_description(),
      mengapa: m.workflow_2_why(),
      steps: ['diagnosing-bugs (6 fase)', 'fix + regression test', 'code-review'],
    },
    {
      title: m.workflow_3_title(),
      description: m.workflow_3_description(),
      mengapa: m.workflow_3_why(),
      steps: ['improve-codebase-architecture', 'pilih candidate', 'to-issues', 'implement', 'code-review'],
    },
    {
      title: m.workflow_4_title(),
      description: m.workflow_4_description(),
      mengapa: m.workflow_4_why(),
      steps: ['triage (state machine)', 'ready-for-agent → implement', 'ready-for-human → manual'],
    },
    {
      title: m.workflow_5_title(),
      description: m.workflow_5_description(),
      mengapa: m.workflow_5_why(),
      steps: ['grill-with-docs (singkat)', 'implement (tdd)', 'code-review'],
    },
    {
      title: m.workflow_6_title(),
      description: m.workflow_6_description(),
      mengapa: m.workflow_6_why(),
      steps: ['/handoff (purpose: prototype)', 'session baru: /prototype', '/handoff back learnings', 'lanjut grilling dengan insight'],
    },
    {
      title: m.workflow_7_title(),
      description: m.workflow_7_description(),
      mengapa: m.workflow_7_why(),
      steps: ['/handoff (dari agent A)', 'load di agent B', 'kerja di agent B', '/handoff back (jika perlu)'],
    },
  ]
}

export function Workflows() {
  const workflows = getWorkflows()

  return (
    <section id="workflows" className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{m.workflows_title()}</h2>
        <p className="text-muted-foreground mt-1">
          {m.workflows_description()}
        </p>
      </div>

      <div className="grid gap-4">
        {workflows.map((wf, idx) => (
          <Card key={idx} className="border border-border">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0">
                  {idx + 1}
                </span>
                <div>
                  <CardTitle className="text-sm font-semibold">{wf.title}</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">{wf.description}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap items-center gap-1.5">
                {wf.steps.map((step, i) => (
                  <span key={i} className="flex items-center gap-1.5">
                    <Badge variant="secondary" className="text-xs font-mono whitespace-nowrap">
                      {step}
                    </Badge>
                    {i < wf.steps.length - 1 && (
                      <span className="text-muted-foreground text-sm">→</span>
                    )}
                  </span>
                ))}
              </div>
              <div className="text-xs text-muted-foreground border-l-2 border-primary/30 pl-3 italic">
                <span className="font-semibold not-italic text-foreground">{m.workflows_why()} </span>
                {wf.mengapa}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
