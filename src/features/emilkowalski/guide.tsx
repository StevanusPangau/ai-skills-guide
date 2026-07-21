import { Link } from '@tanstack/react-router'
import { RiGithubFill } from '@remixicon/react'
import { AuthorAvatar } from '@/components/author-avatar'
import { XHandleLink } from '@/components/x-handle-link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CodeBlock } from '@/components/code-block'
import {
  EMILKOWALSKI_SOURCE_REPO,
  EMILKOWALSKI_SOURCE_SHA,
  emilkowalskiSkills,
} from '@/data/emilkowalski-skills'
import {
  emilCategoryLabel,
  emilInvocationLabel,
  emilModeLabel,
} from '@/features/emilkowalski/labels'
import { externalLinkAriaLabel } from '@/lib/external-link'
import { getCollectionBySlug } from '@/data/collections'
import { m } from '@/paraglide/messages.js'

const workflow = [
  ['animation-vocabulary', () => m.emil_workflow_name()],
  ['find-animation-opportunities', () => m.emil_workflow_decide()],
  ['review-animations', () => m.emil_workflow_review()],
  ['improve-animations', () => m.emil_workflow_audit()],
] as const

export function EmilOverview() {
  const categoryCount = new Set(emilkowalskiSkills.map((skill) => skill.category)).size
  const author = getCollectionBySlug('emilkowalski')

  return (
    <section id="overview" className="scroll-mt-20 space-y-7">
      <div>
        <a
          href="https://github.com/emilkowalski/skills"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-sm text-xs font-medium tracking-wide text-muted-foreground uppercase hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          aria-label={externalLinkAriaLabel(EMILKOWALSKI_SOURCE_REPO)}
        >
          {EMILKOWALSKI_SOURCE_REPO}
        </a>
        <div className="mt-3 flex items-start gap-4">
          {author?.avatarSrc ? (
            <AuthorAvatar src={author.avatarSrc} name={author.author} size="lg" className="mt-1" />
          ) : null}
          <div className="min-w-0">
            <h1 className="font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              {m.emil_hero_title()}
            </h1>
            {author?.xHandle ? (
              <p className="mt-1.5 text-sm text-muted-foreground">
                <span className="font-medium text-foreground/90">{author.author}</span>
                <span className="text-muted-foreground/50"> · </span>
                <XHandleLink handle={author.xHandle} />
              </p>
            ) : null}
          </div>
        </div>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {m.emil_hero_description()}
        </p>
        <a
          href={`https://github.com/emilkowalski/skills/tree/${EMILKOWALSKI_SOURCE_SHA}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 rounded-sm text-sm text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          aria-label={externalLinkAriaLabel(m.emil_source_pinned())}
        >
          <RiGithubFill className="size-4" aria-hidden="true" />
          {m.emil_source_pinned()}{' '}
          <span className="font-mono">{EMILKOWALSKI_SOURCE_SHA.slice(0, 10)}</span>
        </a>
      </div>

      <div className="flex flex-wrap gap-x-10 gap-y-4">
        <Stat value={String(emilkowalskiSkills.length)} label={m.emil_stat_skills()} />
        <Stat value={String(categoryCount)} label={m.emil_stat_categories()} />
        <Stat value="0" label={m.emil_stat_dependencies()} />
      </div>

      <Card className="border-2 border-primary/30 bg-primary/5">
        <CardHeader className="pb-2">
          <CardTitle as="h2" className="text-base">{m.emil_overview_question()}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {m.emil_overview_answer()}
          </p>
        </CardContent>
      </Card>
    </section>
  )
}

export function EmilWorkflow() {
  return (
    <section id="workflow" className="scroll-mt-20 space-y-6">
      <div>
        <h2 className="font-heading text-2xl font-bold tracking-tight">{m.emil_workflow_title()}</h2>
        <p className="mt-1 text-muted-foreground">{m.emil_workflow_description()}</p>
      </div>
      <ul className="grid gap-3 sm:grid-cols-2">
        {workflow.map(([name, getAction]) => (
          <li key={name}>
          <Card className="h-full">
            <CardContent className="flex items-start gap-3 pt-4">
              <span className="mt-1 size-2 shrink-0 rounded-full bg-primary" aria-hidden="true" />
              <div>
                <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">{getAction()}</p>
                <Link
                  to="/emilkowalski/skills/$skillName"
                  params={{ skillName: name }}
                  className="mt-1 block rounded-sm font-mono text-sm font-semibold hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                >
                  /{name}
                </Link>
              </div>
            </CardContent>
          </Card>
          </li>
        ))}
      </ul>
      <p className="text-sm text-muted-foreground">{m.emil_workflow_foundations()}</p>
    </section>
  )
}

export function EmilCatalog() {
  return (
    <section id="catalog" className="scroll-mt-20 space-y-6">
      <div>
        <h2 className="font-heading text-2xl font-bold tracking-tight">{m.emil_catalog_title()}</h2>
        <p className="mt-1 text-muted-foreground">{m.emil_catalog_description()}</p>
      </div>
      <ul className="grid gap-3">
        {emilkowalskiSkills.map((skill) => (
          <li key={skill.name}>
          <Link
            to="/emilkowalski/skills/$skillName"
            params={{ skillName: skill.name }}
            className="block h-full rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-sm font-semibold">/{skill.name}</span>
              <Badge variant="outline" className="text-xs">{emilCategoryLabel(skill.category)}</Badge>
              <Badge variant={skill.invocation === 'manual' ? 'default' : 'secondary'} className="text-xs">
                {emilInvocationLabel(skill.invocation)}
              </Badge>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{skill.description}</p>
            <p className="mt-2 font-mono text-xs text-muted-foreground">{emilModeLabel(skill.mode)}</p>
          </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function EmilPrinciples() {
  const principles = [
    [m.emil_principle_1_title(), m.emil_principle_1_body()],
    [m.emil_principle_2_title(), m.emil_principle_2_body()],
    [m.emil_principle_3_title(), m.emil_principle_3_body()],
    [m.emil_principle_4_title(), m.emil_principle_4_body()],
  ]
  return (
    <section id="principles" className="scroll-mt-20 space-y-6">
      <div>
        <h2 className="font-heading text-2xl font-bold tracking-tight">{m.emil_principles_title()}</h2>
        <p className="mt-1 text-muted-foreground">{m.emil_principles_description()}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {principles.map(([title, body]) => (
          <Card key={title}>
            <CardHeader className="pb-2"><CardTitle as="h3" className="text-sm">{title}</CardTitle></CardHeader>
            <CardContent><p className="text-sm leading-relaxed text-muted-foreground">{body}</p></CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

export function EmilInstall() {
  return (
    <section id="installation" className="scroll-mt-20 space-y-6">
      <div>
        <h2 className="font-heading text-2xl font-bold tracking-tight">{m.emil_install_title()}</h2>
        <p className="mt-1 max-w-2xl text-muted-foreground">{m.emil_install_description()}</p>
      </div>
      <Card className="border-primary/40">
        <CardContent className="space-y-3 pt-4">
          <CodeBlock code="npx skills@latest add emilkowalski/skills" shell />
          <p className="text-sm text-muted-foreground">{m.emil_install_note()}</p>
        </CardContent>
      </Card>
    </section>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return <div><p className="font-heading text-2xl font-bold tabular-nums">{value}</p><p className="text-xs text-muted-foreground">{label}</p></div>
}
