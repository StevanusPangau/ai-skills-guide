import { RiGithubFill } from '@remixicon/react'
import { AuthorAvatar } from '@/components/author-avatar'
import { XHandleLink } from '@/components/x-handle-link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  JAKUBKREHEL_SOURCE_REPO,
  JAKUBKREHEL_SOURCE_SHA,
  jakubkrehelSkills,
} from '@/data/jakubkrehel-skills'
import { getCollectionBySlug } from '@/data/collections'
import { m } from '@/paraglide/messages.js'

export function JakubOverview() {
  const author = getCollectionBySlug('jakubkrehel')
  const categoryCount = new Set(jakubkrehelSkills.map((skill) => skill.category)).size

  return (
    <section id="overview" className="scroll-mt-20 space-y-7">
      <div>
        <a
          href="https://github.com/jakubkrehel/skills"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-sm text-xs font-medium tracking-wide text-muted-foreground uppercase hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
        >
          {JAKUBKREHEL_SOURCE_REPO}
        </a>
        <div className="mt-3 flex items-start gap-4">
          {author?.avatarSrc ? (
            <AuthorAvatar src={author.avatarSrc} name={author.author} size="lg" className="mt-1" />
          ) : null}
          <div className="min-w-0">
            <h1 className="font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              {m.jakub_hero_title()}
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
          {m.jakub_hero_description()}
        </p>
        <a
          href={`https://github.com/jakubkrehel/skills/tree/${JAKUBKREHEL_SOURCE_SHA}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 rounded-sm text-sm text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
        >
          <RiGithubFill className="size-4" aria-hidden="true" />
          <span>
            {m.jakub_overview_pinned()}{' '}
            <span className="font-mono">{JAKUBKREHEL_SOURCE_SHA.slice(0, 10)}</span>
          </span>
        </a>
      </div>

      <div className="flex flex-wrap gap-x-10 gap-y-4">
        <Stat value={String(jakubkrehelSkills.length)} label={m.jakub_stat_skills()} />
        <Stat value={String(categoryCount)} label={m.jakub_stat_categories()} />
        <Stat value="interfaces.dev" label={m.jakub_stat_focus()} />
      </div>

      <Card className="border-2 border-primary/30 bg-primary/5">
        <CardHeader className="pb-2">
          <CardTitle as="h2" className="text-base">{m.jakub_overview_question()}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {m.jakub_overview_answer()}
          </p>
        </CardContent>
      </Card>
    </section>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <span className="font-mono text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        {value}
      </span>
      <span className="mt-0.5 block text-xs text-muted-foreground">{label}</span>
    </div>
  )
}
