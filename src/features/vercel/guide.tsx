import { RiGithubFill } from '@remixicon/react'
import { AuthorAvatar } from '@/components/author-avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  VERCEL_SOURCE_REPO,
  vercelSkills,
} from '@/data/vercel-skills'
import { getCollectionBySlug } from '@/data/collections'
import { m } from '@/paraglide/messages.js'

export function VercelOverview() {
  const author = getCollectionBySlug('vercel')

  return (
    <section id="overview" className="scroll-mt-20 space-y-7">
      <div>
        <a
          href="https://github.com/vercel-labs/agent-skills"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-sm text-xs font-medium tracking-wide text-muted-foreground uppercase hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
        >
          {VERCEL_SOURCE_REPO}
        </a>
        <div className="mt-3 flex items-start gap-4">
          {author?.avatarSrc ? (
            <AuthorAvatar src={author.avatarSrc} name={author.author} size="lg" className="mt-1" />
          ) : null}
          <div className="min-w-0">
            <h1 className="font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              {m.vercel_hero_title()}
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              <span className="font-medium text-foreground/90">{author?.author}</span>
            </p>
          </div>
        </div>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {m.vercel_hero_description()}
        </p>
        <a
          href="https://github.com/vercel-labs/agent-skills"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 rounded-sm text-sm text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
        >
          <RiGithubFill className="size-4" aria-hidden="true" />
          <span>github.com/vercel-labs/agent-skills</span>
        </a>
      </div>

      <div className="flex flex-wrap gap-x-10 gap-y-4">
        <Stat value={String(vercelSkills.length)} label={m.vercel_stat_skills()} />
        <Stat value="8" label={m.vercel_stat_categories()} />
        <Stat value="Official" label={m.vercel_stat_focus()} />
      </div>

      <Card className="border-2 border-primary/30 bg-primary/5">
        <CardHeader className="pb-2">
          <CardTitle as="h2" className="text-base">{m.vercel_overview_question()}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {m.vercel_overview_answer()}
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
