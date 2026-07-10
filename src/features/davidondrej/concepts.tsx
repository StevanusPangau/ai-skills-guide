import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { m } from '@/paraglide/messages.js'

export function DavidConcepts() {
  const concepts = [
    {
      title: m.david_concept_1_title(),
      body: m.david_concept_1_body(),
      tags: ['building blocks', '5 categories'],
    },
    {
      title: m.david_concept_2_title(),
      body: m.david_concept_2_body(),
      tags: ['L1 discovery', 'L2 activation', 'L3 execution'],
    },
    {
      title: m.david_concept_3_title(),
      body: m.david_concept_3_body(),
      tags: ['objective', 'constraints', 'validate', 'stop', 'docs'],
    },
    {
      title: m.david_concept_4_title(),
      body: m.david_concept_4_body(),
      tags: ['Camp A external clock', 'Camp B Hermes cron'],
    },
    {
      title: m.david_concept_5_title(),
      body: m.david_concept_5_body(),
      tags: ['state not orders', 'why + traps'],
    },
    {
      title: m.david_concept_6_title(),
      body: m.david_concept_6_body(),
      tags: ['first-wave', 'optional', 'catalog-only'],
    },
  ]

  return (
    <section id="concepts" className="scroll-mt-20 space-y-6">
      <div>
        <h2 className="font-heading text-2xl font-bold tracking-tight">
          {m.david_concepts_title()}
        </h2>
        <p className="mt-1 text-muted-foreground">
          {m.david_concepts_description()}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {concepts.map((c) => (
          <Card key={c.title} className="border border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">{c.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm leading-relaxed text-muted-foreground">
                {c.body}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {c.tags.map((t) => (
                  <Badge key={t} variant="outline" className="text-[10px]">
                    {t}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
