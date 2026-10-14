import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { m } from '@/paraglide/messages.js'

const workflows = [
  {
    title: m.taste_wf1_title,
    desc: m.taste_wf1_desc,
    why: m.taste_wf1_why,
    steps: ['design-taste-frontend', 'draw.mjs --options 3', 'build from the sheet', 'inspect.mjs 1440 / 768 / 390'],
  },
  {
    title: m.taste_wf2_title,
    desc: m.taste_wf2_desc,
    why: m.taste_wf2_why,
    steps: ['imagegen-frontend-web', 'one image per section', 'image-to-code', 'match the frames'],
  },
  {
    title: m.taste_wf3_title,
    desc: m.taste_wf3_desc,
    why: m.taste_wf3_why,
    steps: ['redesign-existing-projects', 'fix in place', 'minimalist-ui or high-end-visual-design', 'full-output-enforcement if it truncates'],
  },
] as const

export function TasteWorkflows() {
  return (
    <section id="workflows" className="scroll-mt-20 space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-balance">{m.taste_workflows_title()}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{m.taste_workflows_lead()}</p>
      </div>
      <div className="grid gap-4">
        {workflows.map((wf, idx) => (
          <Card key={wf.steps[0]} className="border border-border">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                  {idx + 1}
                </span>
                <div>
                  <CardTitle className="text-sm font-semibold">{wf.title()}</CardTitle>
                  <p className="mt-0.5 text-xs text-muted-foreground">{wf.desc()}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap items-center gap-1.5">
                {wf.steps.map((step, i) => (
                  <span key={step} className="flex items-center gap-1.5">
                    <Badge variant="secondary" className="text-xs whitespace-nowrap">{step}</Badge>
                    {i < wf.steps.length - 1 ? (
                      <span className="text-sm text-muted-foreground">→</span>
                    ) : null}
                  </span>
                ))}
              </div>
              <p className="border-l-2 border-primary/30 pl-3 text-xs text-muted-foreground">
                <span className="font-medium text-foreground">{m.taste_wf_why()} </span>
                {wf.why()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
