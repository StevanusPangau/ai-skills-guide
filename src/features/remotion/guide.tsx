import { RiGithubFill } from '@remixicon/react'
import { AuthorAvatar } from '@/components/author-avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { REMOTION_SOURCE_REPO, remotionSkills } from '@/data/remotion-skills'
import { getCollectionBySlug } from '@/data/collections'
import { m } from '@/paraglide/messages.js'

export function RemotionOverview() {
  const author = getCollectionBySlug('remotion')
  const categoryCount = new Set(remotionSkills.map((s) => s.category)).size

  return (
    <section id="overview" className="scroll-mt-20 space-y-7">
      <div>
        <a
          href="https://github.com/remotion-dev/skills"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-sm text-xs font-medium tracking-wide text-muted-foreground uppercase hover:text-primary"
        >
          {REMOTION_SOURCE_REPO}
        </a>
        <div className="mt-3 flex items-start gap-4">
          {author?.avatarSrc ? (
            <AuthorAvatar src={author.avatarSrc} name={author.author} size="lg" className="mt-1" />
          ) : null}
          <div className="min-w-0">
            <h1 className="font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              {m.remotion_hero_title()}
            </h1>
            <p className="mt-1.5 text-sm font-medium text-foreground/90">Remotion</p>
          </div>
        </div>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {m.remotion_hero_description()}
        </p>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
          <a
            href="https://github.com/remotion-dev/skills"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
          >
            <RiGithubFill className="size-4" aria-hidden="true" />
            <span>github.com/remotion-dev/skills</span>
          </a>
          <a
            href="https://www.remotion.dev/docs/ai/skills"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-primary hover:underline"
          >
            remotion.dev/docs/ai/skills
          </a>
        </div>
      </div>
      <div className="flex flex-wrap gap-x-10 gap-y-4">
        <Stat value={String(remotionSkills.length)} label={m.remotion_stat_skills()} />
        <Stat value={String(categoryCount)} label={m.remotion_stat_categories()} />
      </div>
      <Card className="border-2 border-primary/30 bg-primary/5">
        <CardHeader className="pb-2">
          <CardTitle as="h2" className="text-base">
            {m.remotion_overview_question()}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {m.remotion_overview_answer()}
          </p>
        </CardContent>
      </Card>
      <p className="text-xs text-muted-foreground">{m.remotion_footer()}</p>
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
