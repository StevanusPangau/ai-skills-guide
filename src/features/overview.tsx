import { RiGithubFill } from '@remixicon/react'
import { AuthorAvatar } from '@/components/author-avatar'
import { XHandleLink } from '@/components/x-handle-link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getCollectionBySlug } from '@/data/collections'
import {
  MATTPOCOCK_SOURCE_REPO,
  MATTPOCOCK_SOURCE_SHA,
  MATTPOCOCK_SOURCE_VERSION,
  skills,
} from '@/data/skills'
import { externalLinkAriaLabel } from '@/lib/external-link'
import { m } from '@/paraglide/messages.js'

export function Overview() {
  const total = skills.length
  const engineering = skills.filter((s) => s.category === 'engineering').length
  const productivity = skills.filter((s) => s.category === 'productivity').length
  const shortSha = MATTPOCOCK_SOURCE_SHA.slice(0, 10)
  const author = getCollectionBySlug('mattpocock')

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
    <section id="overview" className="scroll-mt-20 space-y-8">
      {/* Hero — mirror David collection style */}
      <div>
        <a
          href="https://github.com/mattpocock/skills"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-sm text-xs font-medium tracking-wide text-muted-foreground uppercase transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          aria-label={externalLinkAriaLabel(MATTPOCOCK_SOURCE_REPO)}
        >
          {MATTPOCOCK_SOURCE_REPO}
        </a>
        <div className="mt-3 flex items-start gap-4">
          {author?.avatarSrc ? (
            <AuthorAvatar
              src={author.avatarSrc}
              name={author.author}
              size="lg"
              className="mt-1"
            />
          ) : null}
          <div className="min-w-0">
            <h1 className="font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              {m.matt_hero_title()}
            </h1>
            {author ? (
              <p className="mt-1.5 text-sm text-muted-foreground">
                <span className="font-medium text-foreground/90">
                  {author.author}
                </span>
                {author.xHandle ? (
                  <>
                    <span className="text-muted-foreground/50"> · </span>
                    <XHandleLink handle={author.xHandle} />
                  </>
                ) : null}
              </p>
            ) : null}
          </div>
        </div>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {m.matt_hero_description()}
        </p>

        <a
          href={`https://github.com/mattpocock/skills/tree/${MATTPOCOCK_SOURCE_SHA}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 rounded-sm text-sm text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          aria-label={externalLinkAriaLabel(
            `${m.matt_source_pinned()} ${MATTPOCOCK_SOURCE_VERSION} · ${shortSha}`,
          )}
        >
          <RiGithubFill className="size-4" aria-hidden="true" />
          {m.matt_source_pinned()}{' '}
          <span className="font-mono">
            {MATTPOCOCK_SOURCE_VERSION} · {shortSha}
          </span>
        </a>
      </div>

      <div className="flex flex-wrap gap-x-10 gap-y-4">
        <Stat value={String(total)} label={m.matt_stat_skills()} />
        <Stat value={String(engineering)} label={m.matt_stat_engineering()} />
        <Stat value={String(productivity)} label={m.matt_stat_productivity()} />
        <Stat value="7" label={m.matt_stat_workflows()} />
      </div>

      {/* Main Build Chain */}
      <Card className="border-2 border-primary/30 bg-primary/5">
        <CardHeader>
          <CardTitle as="h2" className="text-base text-balance">
            {m.overview_build_chain_title()}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {m.overview_build_chain_description()}
          </p>
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <Badge variant="default" className="px-3 py-1 text-xs">
              grill-with-docs
            </Badge>
            <span className="text-muted-foreground">→</span>
            <Badge variant="default" className="px-3 py-1 text-xs">
              to-spec
            </Badge>
            <span className="text-muted-foreground">→</span>
            <Badge variant="default" className="px-3 py-1 text-xs">
              to-tickets
            </Badge>
            <span className="text-muted-foreground">→</span>
            <Badge variant="default" className="px-3 py-1 text-xs">
              implement (tdd)
            </Badge>
            <span className="text-muted-foreground">→</span>
            <Badge variant="default" className="px-3 py-1 text-xs">
              code-review
            </Badge>
          </div>
          <div className="mt-2 grid gap-2 text-xs text-muted-foreground">
            <div className="flex gap-2">
              <span className="shrink-0 font-semibold text-foreground">1. grill-with-docs:</span>
              <span>
                Interview relentless → shared understanding + CONTEXT.md glossary + ADRs
              </span>
            </div>
            <div className="flex gap-2">
              <span className="shrink-0 font-semibold text-foreground">2. to-spec:</span>
              <span>
                Synthesize (TANPA interview ulang) → spec dengan user stories, decisions,
                out-of-scope
              </span>
            </div>
            <div className="flex gap-2">
              <span className="shrink-0 font-semibold text-foreground">3. to-tickets:</span>
              <span>
                Break spec → tracer-bullet tickets dengan blocking edges (tickets.md atau
                tracker)
              </span>
            </div>
            <div className="flex gap-2">
              <span className="shrink-0 font-semibold text-foreground">4. implement:</span>
              <span>
                Red→Green per slice via /tdd, test at seams; refactor diserahkan ke code-review
              </span>
            </div>
            <div className="flex gap-2">
              <span className="shrink-0 font-semibold text-foreground">5. code-review:</span>
              <span>Two-axis: Standards (Fowler smells) ∥ Spec (matches spec/ticket?)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Smart Zone */}
      <Card className="border border-border">
        <CardHeader>
          <CardTitle as="h2" className="text-base text-balance">
            {m.overview_smart_zone_title()}
          </CardTitle>
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
            <div className="relative h-4 overflow-hidden rounded-full bg-secondary">
              <div className="absolute inset-y-0 left-0 w-[60%] rounded-full bg-gradient-to-r from-emerald-500 to-primary" />
              <div className="absolute inset-y-0 left-[60%] right-0 rounded-full bg-gradient-to-r from-primary to-red-500 opacity-60" />
            </div>
            <div className="flex text-xs">
              <span className="w-[60%] text-emerald-600 dark:text-emerald-400">
                {m.overview_smart_zone_good()}
              </span>
              <span className="text-red-500">{m.overview_smart_zone_bad()}</span>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className="rounded border border-border p-2 text-xs">
              <span className="font-semibold text-foreground">{m.overview_compact_title()}</span>
              <p className="mt-1 text-muted-foreground">{m.overview_compact_description()}</p>
            </div>
            <div className="rounded border border-border p-2 text-xs">
              <span className="font-semibold text-foreground">{m.overview_handoff_title()}</span>
              <p className="mt-1 text-muted-foreground">{m.overview_handoff_description()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div>
        <h2 className="mb-4 text-lg font-semibold text-balance">{m.overview_problems_title()}</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {failureModes.map((mode) => (
            <Card key={mode.title} className={mode.borderClass}>
              <CardHeader className="pb-2">
                <CardTitle as="h3" className="text-sm font-semibold">
                  {mode.title}
                </CardTitle>
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

      {/* User-invoked vs Model-invoked */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-balance">{m.overview_invocation_title()}</h2>
        <p className="text-sm text-muted-foreground">
          {m.overview_invocation_description()}
        </p>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Badge variant="default" className="text-xs">
              {m.skills_filter_user()}
            </Badge>
            <span className="text-sm text-muted-foreground">
              {m.overview_invocation_user()}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {m.skills_filter_model()}
            </Badge>
            <span className="text-sm text-muted-foreground">
              {m.overview_invocation_model()}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col">
      <span className="font-heading text-2xl font-bold tracking-tight text-foreground tabular-nums">
        {value}
      </span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  )
}
