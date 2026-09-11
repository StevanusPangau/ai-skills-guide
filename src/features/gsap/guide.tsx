import { RiGithubFill } from '@remixicon/react'
import { AuthorAvatar } from '@/components/author-avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { GSAP_SOURCE_REPO, gsapSkills } from '@/data/gsap-skills'
import { getCollectionBySlug } from '@/data/collections'
import { m } from '@/paraglide/messages.js'

export function GsapOverview() {
  const author = getCollectionBySlug('gsap')

  return (
    <section id="overview" className="scroll-mt-20 space-y-7">
      <div>
        <a
          href="https://github.com/greensock/gsap-skills"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-sm text-xs font-medium tracking-wide text-muted-foreground uppercase hover:text-primary"
        >
          {GSAP_SOURCE_REPO}
        </a>
        <div className="mt-3 flex items-start gap-4">
          {author?.avatarSrc ? (
            <AuthorAvatar src={author.avatarSrc} name={author.author} size="lg" className="mt-1" />
          ) : null}
          <div className="min-w-0">
            <h1 className="font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              {m.gsap_hero_title()}
            </h1>
            <p className="mt-1.5 text-sm font-medium text-foreground/90">GreenSock (Webflow Team)</p>
          </div>
        </div>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {m.gsap_hero_description()}
        </p>
        <a
          href="https://github.com/greensock/gsap-skills"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
        >
          <RiGithubFill className="size-4" aria-hidden="true" />
          <span>github.com/greensock/gsap-skills</span>
        </a>
      </div>
      <div className="flex flex-wrap gap-x-10 gap-y-4">
        <Stat value={String(gsapSkills.length)} label={m.gsap_stat_skills()} />
        <Stat value="6" label={m.gsap_stat_categories()} />
      </div>
      <Card className="border-2 border-primary/30 bg-primary/5">
        <CardHeader className="pb-2">
          <CardTitle as="h2" className="text-base">
            {m.gsap_overview_question()}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {m.gsap_overview_answer()}
          </p>
        </CardContent>
      </Card>
      <p className="text-xs text-muted-foreground">{m.gsap_footer()}</p>
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
