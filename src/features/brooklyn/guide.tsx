import { RiGithubFill } from '@remixicon/react'
import { AuthorAvatar } from '@/components/author-avatar'
import { XHandleLink } from '@/components/x-handle-link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  BROOKLYN_SOURCE_REPO,
  brooklynSkills,
} from '@/data/brooklyn-skills'
import { getCollectionBySlug } from '@/data/collections'
import { m } from '@/paraglide/messages.js'

export function BrooklynOverview() {
  const author = getCollectionBySlug('brooklyn')
  const categoryCount = new Set(brooklynSkills.map((s) => s.category)).size

  return (
    <section id="overview" className="scroll-mt-20 space-y-7">
      <div>
        <a
          href="https://github.com/OutThisLife/brooklyn-skills"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-sm text-xs font-medium tracking-wide text-muted-foreground uppercase hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
        >
          {BROOKLYN_SOURCE_REPO}
        </a>
        <div className="mt-3 flex items-start gap-4">
          {author?.avatarSrc ? (
            <AuthorAvatar src={author.avatarSrc} name={author.author} size="lg" className="mt-1" />
          ) : null}
          <div className="min-w-0">
            <h1 className="font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              {m.brooklyn_hero_title()}
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
          {m.brooklyn_hero_description()}
        </p>
        <a
          href={`https://github.com/OutThisLife/brooklyn-skills`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 rounded-sm text-sm text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
        >
          <RiGithubFill className="size-4" aria-hidden="true" />
          <span>github.com/OutThisLife/brooklyn-skills</span>
        </a>
      </div>

      <div className="flex flex-wrap gap-x-10 gap-y-4">
        <Stat value={String(brooklynSkills.length)} label={m.brooklyn_stat_skills()} />
        <Stat value={String(categoryCount)} label={m.brooklyn_stat_categories()} />
        <Stat value="defaults.md" label={m.brooklyn_stat_focus()} />
      </div>

      <Card className="border-2 border-primary/30 bg-primary/5">
        <CardHeader className="pb-2">
          <CardTitle as="h2" className="text-base">{m.brooklyn_overview_question()}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {m.brooklyn_overview_answer()}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle as="h2" className="text-base">{m.brooklyn_defaults_title()}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {m.brooklyn_defaults_body()}
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
