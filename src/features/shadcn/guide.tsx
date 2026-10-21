import { RiGithubFill } from '@remixicon/react'
import { AuthorAvatar } from '@/components/author-avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SHADCN_SOURCE_REPO, shadcnSkills } from '@/data/shadcn-skills'
import { getCollectionBySlug } from '@/data/collections'
import { m } from '@/paraglide/messages.js'
import { getLocale } from '@/paraglide/runtime.js'

export function ShadcnOverview() {
  const author = getCollectionBySlug('shadcn')
  const isEn = getLocale() === 'en'

  return (
    <section id="overview" className="scroll-mt-20 space-y-7">
      <div>
        <a
          href="https://github.com/shadcn-ui/ui"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-sm text-xs font-medium tracking-wide text-muted-foreground uppercase hover:text-primary"
        >
          {SHADCN_SOURCE_REPO}
        </a>
        <div className="mt-3 flex items-start gap-4">
          {author?.avatarSrc ? (
            <AuthorAvatar src={author.avatarSrc} name={author.author} size="lg" className="mt-1" />
          ) : null}
          <div className="min-w-0">
            <h1 className="font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              {m.shadcn_hero_title()}
            </h1>
            <p className="mt-1.5 text-sm font-medium text-foreground/90">shadcn</p>
          </div>
        </div>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {m.shadcn_hero_description()}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
          <a
            href="https://github.com/shadcn-ui/ui"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
          >
            <RiGithubFill className="size-4" aria-hidden="true" />
            <span>github.com/shadcn-ui/ui</span>
          </a>
          <a
            href="https://ui.shadcn.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline"
          >
            ui.shadcn.com
          </a>
        </div>
      </div>
      <div className="flex flex-wrap gap-x-10 gap-y-4">
        <Stat value={String(shadcnSkills.length)} label={m.shadcn_stat_skills()} />
        <Stat
          value={String(new Set(shadcnSkills.map((s) => s.category)).size)}
          label={m.shadcn_stat_categories()}
        />
      </div>
      <Card className="border-2 border-primary/30 bg-primary/5">
        <CardHeader className="pb-2">
          <CardTitle as="h2" className="text-base">
            {m.shadcn_overview_question()}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {m.shadcn_overview_answer()}
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {isEn ? (
              <>
                The <code className="font-mono text-xs">shadcn</code> skill is model-invoked (
                <code className="font-mono text-xs">user-invocable: false</code>
                ): agents load it when a project has a{' '}
                <code className="font-mono text-xs">components.json</code> file or the work is
                shadcn, registry, or preset related. Projects with a{' '}
                <code className="font-mono text-xs">components.json</code> are what the skill
                targets. Two skills only — MIT © 2023 shadcn.
              </>
            ) : (
              <>
                Skill <code className="font-mono text-xs">shadcn</code> dipanggil model (
                <code className="font-mono text-xs">user-invocable: false</code>
                ): agent memuatnya saat proyek punya{' '}
                <code className="font-mono text-xs">components.json</code> atau pekerjaannya
                terkait shadcn, registry, atau preset. Proyek dengan{' '}
                <code className="font-mono text-xs">components.json</code> adalah target skill
                ini. Hanya dua skill — MIT © 2023 shadcn.
              </>
            )}
          </p>
        </CardContent>
      </Card>
      <p className="text-xs text-muted-foreground">{m.shadcn_footer()}</p>
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
