import { RiGithubFill } from '@remixicon/react'
import { AuthorAvatar } from '@/components/author-avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PRISMA_SOURCE_REPO, prismaSkills } from '@/data/prisma-skills'
import { getCollectionBySlug } from '@/data/collections'
import { m } from '@/paraglide/messages.js'

export function PrismaOverview() {
  const author = getCollectionBySlug('prisma')

  return (
    <section id="overview" className="scroll-mt-20 space-y-7">
      <div>
        <a
          href="https://github.com/prisma/skills"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-sm text-xs font-medium tracking-wide text-muted-foreground uppercase hover:text-primary"
        >
          {PRISMA_SOURCE_REPO}
        </a>
        <div className="mt-3 flex items-start gap-4">
          {author?.avatarSrc ? (
            <AuthorAvatar src={author.avatarSrc} name={author.author} size="lg" className="mt-1" />
          ) : null}
          <div className="min-w-0">
            <h1 className="font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              {m.prisma_hero_title()}
            </h1>
            <p className="mt-1.5 text-sm font-medium text-foreground/90">Prisma Engineering</p>
          </div>
        </div>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {m.prisma_hero_description()}
        </p>
        <a
          href="https://github.com/prisma/skills"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
        >
          <RiGithubFill className="size-4" aria-hidden="true" />
          <span>github.com/prisma/skills</span>
        </a>
      </div>
      <div className="flex flex-wrap gap-x-10 gap-y-4">
        <Stat value={String(prismaSkills.length)} label={m.prisma_stat_skills()} />
        <Stat value="7" label={m.prisma_stat_categories()} />
      </div>
      <Card className="border-2 border-primary/30 bg-primary/5">
        <CardHeader className="pb-2">
          <CardTitle as="h2" className="text-base">
            {m.prisma_overview_question()}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {m.prisma_overview_answer()}
          </p>
        </CardContent>
      </Card>
      <p className="text-xs text-muted-foreground">{m.prisma_footer()}</p>
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
