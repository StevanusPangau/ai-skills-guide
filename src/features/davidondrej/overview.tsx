import { RiAlertLine, RiGithubFill } from '@remixicon/react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DAVIDONDREJ_SOURCE_REPO,
  DAVIDONDREJ_SOURCE_SHA,
  davidCategoryLabels,
  davidondrejSkills,
} from '@/data/davidondrej-skills'
import { m } from '@/paraglide/messages.js'

export function DavidOverview() {
  const total = davidondrejSkills.length
  const categories = Object.keys(davidCategoryLabels).length
  const firstWave = davidondrejSkills.filter((s) => s.bundleStatus === 'first-wave').length
  const shortSha = DAVIDONDREJ_SOURCE_SHA.slice(0, 10)

  const problems = [
    {
      title: m.david_overview_problem_1_title(),
      description: m.david_overview_problem_1_description(),
      fix: ['/folder-specific-…', '/brain-to-docs'],
      borderClass: 'border-l-4 border-orange-600',
    },
    {
      title: m.david_overview_problem_2_title(),
      description: m.david_overview_problem_2_description(),
      fix: ['/research-prompt', '/deep-research'],
      borderClass: 'border-l-4 border-sky-600',
    },
    {
      title: m.david_overview_problem_3_title(),
      description: m.david_overview_problem_3_description(),
      fix: ['/goal-loop', '/anti-sleep'],
      borderClass: 'border-l-4 border-emerald-600',
    },
    {
      title: m.david_overview_problem_4_title(),
      description: m.david_overview_problem_4_description(),
      fix: ['/handoff', '/agent-self-scheduling'],
      borderClass: 'border-l-4 border-violet-600',
    },
  ]

  return (
    <section id="overview" className="scroll-mt-20 space-y-8">
      <div>
        <a
          href="https://github.com/davidondrej/skills"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium tracking-wide text-muted-foreground uppercase transition-colors hover:text-primary"
        >
          {DAVIDONDREJ_SOURCE_REPO}
        </a>
        <h1 className="font-heading mt-2 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
          {m.david_hero_title()}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {m.david_hero_description()}
        </p>

        <a
          href={`https://github.com/davidondrej/skills/tree/${DAVIDONDREJ_SOURCE_SHA}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
        >
          <RiGithubFill className="size-4" />
          {m.david_source_pinned()} <span className="font-mono">{shortSha}</span>
        </a>
      </div>

      <div className="flex flex-wrap gap-x-10 gap-y-4">
        <Stat value={String(total)} label={m.david_stat_skills()} />
        <Stat value={String(categories)} label={m.david_stat_categories()} />
        <Stat value={String(firstWave)} label={m.david_stat_first_wave()} />
      </div>

      <div className="rounded-lg border border-amber-500/40 bg-amber-500/5 p-4">
        <div className="flex items-start gap-3">
          <RiAlertLine className="mt-0.5 size-5 shrink-0 text-amber-600 dark:text-amber-400" />
          <div>
            <p className="text-sm font-semibold">{m.david_notice_title()}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {m.david_notice_body()}
            </p>
          </div>
        </div>
      </div>

      <Card className="border-2 border-primary/30 bg-primary/5">
        <CardHeader>
          <CardTitle className="text-base">{m.david_overview_chain_title()}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {m.david_overview_chain_description()}
          </p>
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <Badge variant="default" className="px-3 py-1 text-xs">
              context files
            </Badge>
            <span className="text-muted-foreground">→</span>
            <Badge variant="default" className="px-3 py-1 text-xs">
              brain-to-docs
            </Badge>
            <span className="text-muted-foreground">→</span>
            <Badge variant="default" className="px-3 py-1 text-xs">
              research-prompt?
            </Badge>
            <span className="text-muted-foreground">→</span>
            <Badge variant="default" className="px-3 py-1 text-xs">
              goal-loop / session
            </Badge>
            <span className="text-muted-foreground">→</span>
            <Badge variant="default" className="px-3 py-1 text-xs">
              handoff / schedule
            </Badge>
          </div>
          <div className="mt-2 grid gap-2 text-xs text-muted-foreground">
            <div className="flex gap-2">
              <span className="shrink-0 font-semibold text-foreground">1. Context:</span>
              <span>{m.david_overview_chain_step_1()}</span>
            </div>
            <div className="flex gap-2">
              <span className="shrink-0 font-semibold text-foreground">2. Capture:</span>
              <span>{m.david_overview_chain_step_2()}</span>
            </div>
            <div className="flex gap-2">
              <span className="shrink-0 font-semibold text-foreground">3. Research:</span>
              <span>{m.david_overview_chain_step_3()}</span>
            </div>
            <div className="flex gap-2">
              <span className="shrink-0 font-semibold text-foreground">4. Execute:</span>
              <span>{m.david_overview_chain_step_4()}</span>
            </div>
            <div className="flex gap-2">
              <span className="shrink-0 font-semibold text-foreground">5. Sustain:</span>
              <span>{m.david_overview_chain_step_5()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div>
        <h3 className="mb-4 text-lg font-semibold">{m.david_overview_problems_title()}</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {problems.map((mode) => (
            <Card key={mode.title} className={mode.borderClass}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold">{mode.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">{mode.description}</p>
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

      <div className="space-y-3">
        <h3 className="text-lg font-semibold">{m.david_overview_categories_title()}</h3>
        <p className="text-sm text-muted-foreground">
          {m.david_overview_categories_description()}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {Object.values(davidCategoryLabels).map((label) => (
            <Badge key={label} variant="outline">
              {label}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col">
      <span className="font-heading text-2xl font-bold tracking-tight text-foreground">
        {value}
      </span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  )
}
