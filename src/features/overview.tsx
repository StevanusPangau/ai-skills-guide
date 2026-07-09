import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { m } from '@/paraglide/messages.js'

export function Overview() {
  const failureModes = [
    {
      title: m.overview_problem_1_title(),
      description: m.overview_problem_1_description(),
      fix: ['/grill-me', '/grill-with-docs'],
      borderClass: 'border-l-4 border-orange-600',
    },
    {
      title: m.overview_problem_2_title(),
      description: m.overview_problem_2_description(),
      fix: ['/domain-modeling', 'CONTEXT.md'],
      borderClass: 'border-l-4 border-sky-600',
    },
    {
      title: m.overview_problem_3_title(),
      description: m.overview_problem_3_description(),
      fix: ['/tdd', '/diagnosing-bugs'],
      borderClass: 'border-l-4 border-red-600',
    },
    {
      title: m.overview_problem_4_title(),
      description: m.overview_problem_4_description(),
      fix: ['/improve-codebase-architecture', '/codebase-design'],
      borderClass: 'border-l-4 border-emerald-600',
    },
  ]

  return (
    <section id="overview" className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{m.overview_title()}</h2>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          {m.overview_description()}
        </p>
      </div>

      {/* Main Build Chain */}
      <Card className="border-2 border-primary/30 bg-primary/5">
        <CardHeader>
          <CardTitle className="text-base">{m.overview_build_chain_title()}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {m.overview_build_chain_description()}
          </p>
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <Badge variant="default" className="text-xs px-3 py-1">grill-with-docs</Badge>
            <span className="text-muted-foreground">→</span>
            <Badge variant="default" className="text-xs px-3 py-1">to-spec</Badge>
            <span className="text-muted-foreground">→</span>
            <Badge variant="default" className="text-xs px-3 py-1">to-tickets</Badge>
            <span className="text-muted-foreground">→</span>
            <Badge variant="default" className="text-xs px-3 py-1">implement (tdd)</Badge>
            <span className="text-muted-foreground">→</span>
            <Badge variant="default" className="text-xs px-3 py-1">code-review</Badge>
          </div>
          <div className="grid gap-2 text-xs text-muted-foreground mt-2">
            <div className="flex gap-2">
              <span className="font-semibold text-foreground shrink-0">1. grill-with-docs:</span>
              <span>Interview relentless → shared understanding + CONTEXT.md glossary + ADRs</span>
            </div>
            <div className="flex gap-2">
              <span className="font-semibold text-foreground shrink-0">2. to-spec:</span>
              <span>Synthesize (TANPA interview ulang) → spec dengan user stories, decisions, out-of-scope</span>
            </div>
            <div className="flex gap-2">
              <span className="font-semibold text-foreground shrink-0">3. to-tickets:</span>
              <span>Break spec → tracer-bullet tickets dengan blocking edges (tickets.md atau tracker)</span>
            </div>
            <div className="flex gap-2">
              <span className="font-semibold text-foreground shrink-0">4. implement:</span>
              <span>Red→Green per slice via /tdd, test at seams; refactor diserahkan ke code-review</span>
            </div>
            <div className="flex gap-2">
              <span className="font-semibold text-foreground shrink-0">5. code-review:</span>
              <span>Two-axis: Standards (Fowler smells) ∥ Spec (matches spec/ticket?)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Smart Zone */}
      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="text-base">{m.overview_smart_zone_title()}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            {m.overview_smart_zone_description()}
          </p>
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{m.overview_smart_zone_start()}</span>
              <span className="font-semibold">{m.overview_smart_zone_limit()}</span>
              <span>{m.overview_smart_zone_dumb()}</span>
            </div>
            <div className="h-4 rounded-full bg-secondary overflow-hidden relative">
              <div className="absolute inset-y-0 left-0 w-[60%] bg-gradient-to-r from-emerald-500 to-primary rounded-full" />
              <div className="absolute inset-y-0 left-[60%] right-0 bg-gradient-to-r from-primary to-red-500 rounded-full opacity-60" />
            </div>
            <div className="flex text-xs">
              <span className="text-emerald-600 dark:text-emerald-400 w-[60%]">{m.overview_smart_zone_good()}</span>
              <span className="text-red-500">{m.overview_smart_zone_bad()}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-3">
            <div className="text-xs border border-border rounded p-2">
              <span className="font-semibold text-foreground">{m.overview_compact_title()}</span>
              <p className="text-muted-foreground mt-1">{m.overview_compact_description()}</p>
            </div>
            <div className="text-xs border border-border rounded p-2">
              <span className="font-semibold text-foreground">{m.overview_handoff_title()}</span>
              <p className="text-muted-foreground mt-1">{m.overview_handoff_description()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div>
        <h3 className="text-lg font-semibold mb-4">{m.overview_problems_title()}</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {failureModes.map((mode) => (
            <Card key={mode.title} className={`${mode.borderClass}`}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold">
                  {mode.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  {mode.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {mode.fix.map((f) => (
                    <Badge key={f} variant="default" className="text-xs">
                      {f}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* User-invoked vs Model-invoked */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">{m.overview_invocation_title()}</h3>
        <p className="text-sm text-muted-foreground">
          {m.overview_invocation_description()}
        </p>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Badge variant="default" className="text-xs">User-invoked</Badge>
            <span className="text-sm text-muted-foreground">{m.overview_invocation_user()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">Model-invoked</Badge>
            <span className="text-sm text-muted-foreground">{m.overview_invocation_model()}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
