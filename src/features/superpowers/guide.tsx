import { RiGithubFill } from '@remixicon/react'
import { AuthorAvatar } from '@/components/author-avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  SUPERPOWERS_SOURCE_REPO,
  superpowersSkills,
} from '@/data/superpowers-skills'
import { getCollectionBySlug } from '@/data/collections'
import { m } from '@/paraglide/messages.js'

export function SuperpowersOverview() {
  const author = getCollectionBySlug('superpowers')
  const categoryCount = new Set(superpowersSkills.map((s) => s.category)).size

  return (
    <section id="overview" className="scroll-mt-20 space-y-7">
      <div>
        <a
          href="https://github.com/obra/superpowers"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-sm text-xs font-medium tracking-wide text-muted-foreground uppercase hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
        >
          {SUPERPOWERS_SOURCE_REPO}
        </a>
        <div className="mt-3 flex items-start gap-4">
          {author?.avatarSrc ? (
            <AuthorAvatar src={author.avatarSrc} name={author.author} size="lg" className="mt-1" />
          ) : null}
          <div className="min-w-0">
            <h1 className="font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              {m.superpowers_hero_title()}
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              <span className="font-medium text-foreground/90">{author?.author}</span>
              <span className="text-muted-foreground/50"> · </span>
              <span className="font-mono text-xs">@obra</span>
            </p>
          </div>
        </div>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {m.superpowers_hero_description()}
        </p>
        <a
          href={`https://github.com/obra/superpowers`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 rounded-sm text-sm text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
        >
          <RiGithubFill className="size-4" aria-hidden="true" />
          <span>github.com/obra/superpowers</span>
        </a>
      </div>

      <div className="flex flex-wrap gap-x-10 gap-y-4">
        <Stat value={String(superpowersSkills.length)} label={m.superpowers_stat_skills()} />
        <Stat value={String(categoryCount)} label={m.superpowers_stat_categories()} />
        <Stat value="v6.4.2" label={m.superpowers_stat_focus()} />
      </div>

      <Card className="border-2 border-primary/30 bg-primary/5">
        <CardHeader className="pb-2">
          <CardTitle as="h2" className="text-base">{m.superpowers_overview_question()}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {m.superpowers_overview_answer()}
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
