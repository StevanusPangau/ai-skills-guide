import { useEffect, useRef } from 'react'
import {
  createFileRoute,
  Link,
  notFound,
  useNavigate,
} from '@tanstack/react-router'
import { AuthorAvatar } from '@/components/author-avatar'
import { OnThisPage } from '@/components/layout/on-this-page'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { SkillInstallBlock } from '@/components/skill-install-block'
import { CopyAgentRuleButton } from '@/components/copy-agent-rule-button'
import { getCollectionBySlug } from '@/data/collections'
import { prismaSkills, type RichSkill } from '@/data/prisma-skills'
import { resetSkillDetailScroll } from '@/lib/scroll-to-section'
import { useDocumentTitle } from '@/lib/use-document-title'
import { m } from '@/paraglide/messages.js'
import { getLocale } from '@/paraglide/runtime.js'

const skillIndexByName = new Map(
  prismaSkills.map((skill, index) => [skill.name, index] as const),
)

export const Route = createFileRoute('/prisma/skills/$skillName')({
  loader: ({ params }): { skill: RichSkill; prev: RichSkill | null; next: RichSkill | null } => {
    const index = skillIndexByName.get(params.skillName)
    if (index === undefined) throw notFound()
    return {
      skill: prismaSkills[index],
      prev: index > 0 ? prismaSkills[index - 1] : null,
      next:
        index < prismaSkills.length - 1
          ? prismaSkills[index + 1]
          : null,
    }
  },
  component: PrismaSkillPage,
  notFoundComponent: PrismaSkillNotFound,
})

const crumbLinkClass =
  'rounded-sm transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50'
const navCardClass =
  'group rounded-lg border border-border p-3 transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50'

function PrismaSkillPage() {
  const { skill, prev, next } = Route.useLoaderData() as {
    skill: RichSkill
    prev: RichSkill | null
    next: RichSkill | null
  }
  const navigate = useNavigate()
  useDocumentTitle(`/${skill.name}`)
  const author = getCollectionBySlug('prisma')
  const isEn = getLocale() === 'en'

  const prevSkillName = useRef<string | null>(null)
  useEffect(() => {
    const prev = prevSkillName.current
    prevSkillName.current = skill.name
    void resetSkillDetailScroll(navigate, {
      isFirstMount: prev === null,
      skillChanged: prev !== null && prev !== skill.name,
    })
  }, [skill.name, navigate])

  const tocItems = [
    { id: 'use-when', label: isEn ? 'When to Use' : 'Gunakan Saat' },
    { id: 'avoid-when', label: isEn ? 'When to Avoid' : 'Hindari Saat' },
    { id: 'how-it-works', label: isEn ? 'How It Works' : 'Cara Kerja' },
    { id: 'core-rules', label: isEn ? 'Core Rules' : 'Aturan Inti' },
    { id: 'tips', label: isEn ? 'Tips & Best Practices' : 'Tips & Best Practices' },
    ...(skill.spotlight
      ? [{ id: 'spotlight', label: isEn ? skill.spotlight.title.en : skill.spotlight.title.id }]
      : []),
    { id: 'pairs-with', label: isEn ? 'Pairs Well With' : 'Cocok Digunakan Bersama' },
    { id: 'install', label: isEn ? 'Installation' : 'Instalasi' },
  ]

  return (
    <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="xl:grid xl:grid-cols-[1fr_220px] xl:gap-8">
        <article className="min-w-0">
          <header className="space-y-4">
            <nav
              aria-label={m.nav_breadcrumb()}
              className="flex items-center gap-1.5 text-xs text-muted-foreground"
            >
              <Link to="/collections" className={crumbLinkClass}>
                Collections
              </Link>
              <span>/</span>
              <Link to="/prisma" className={crumbLinkClass}>
                Prisma
              </Link>
              <span>/</span>
              <span className="font-mono text-foreground">{skill.name}</span>
            </nav>

            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs text-muted-foreground">
                {author?.source}
              </span>
              <Badge variant="outline" className="text-xs uppercase tracking-wide">
                {skill.category}
              </Badge>
              <Badge
                variant={skill.invocation === 'user' ? 'default' : 'secondary'}
                className="text-xs"
              >
                {skill.invocation === 'user' ? 'User-invoked' : 'Model-invoked'}
              </Badge>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-center gap-3">
                {author?.avatarSrc ? (
                  <AuthorAvatar src={author.avatarSrc} name={author.author} size="md" />
                ) : null}
                <div>
                  <h1 className="font-mono text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    /{skill.name}
                  </h1>
                  <p className="text-xs text-muted-foreground">by {author?.author}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <CopyAgentRuleButton
                  skillName={skill.name}
                  description={isEn ? skill.detailedDescription.en : skill.detailedDescription.id}
                  useWhen={isEn ? skill.useWhen.en : skill.useWhen.id}
                  coreRules={isEn ? skill.coreRules.en : skill.coreRules.id}
                  howItWorks={isEn ? skill.howItWorks.en : skill.howItWorks.id}
                />
                <a
                  href={`https://${author?.source}/tree/main/${skill.sourcePath}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-3 py-1.5 font-mono text-xs text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                >
                  <span>View SKILL.md</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>

            <p className="text-base leading-relaxed text-muted-foreground">
              {isEn ? skill.description.en : skill.description.id}
            </p>
          </header>

          <Separator className="my-8" />

          <div className="prose-clean space-y-8">
            <section id="use-when" className="scroll-mt-20 space-y-3">
              <h2 className="text-lg font-semibold text-foreground">
                {isEn ? 'When to Use' : 'Kapan Digunakan'}
              </h2>
              <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
                {(isEn ? skill.useWhen.en : skill.useWhen.id).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section id="avoid-when" className="scroll-mt-20 space-y-3">
              <h2 className="text-lg font-semibold text-foreground">
                {isEn ? 'When to Avoid' : 'Kapan Dihindari'}
              </h2>
              <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
                {(isEn ? skill.avoidWhen.en : skill.avoidWhen.id).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="mt-1 size-1.5 shrink-0 rounded-full bg-destructive" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section id="how-it-works" className="scroll-mt-20 space-y-3">
              <h2 className="text-lg font-semibold text-foreground">
                {isEn ? 'How It Works' : 'Cara Kerja'}
              </h2>
              <ol className="space-y-2 text-sm leading-relaxed text-muted-foreground">
                {(isEn ? skill.howItWorks.en : skill.howItWorks.id).map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-muted font-mono text-xs font-medium text-foreground">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </section>

            <section id="core-rules" className="scroll-mt-20 space-y-3">
              <h2 className="text-lg font-semibold text-foreground">
                {isEn ? 'Core Rules' : 'Aturan Inti'}
              </h2>
              <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
                {(isEn ? skill.coreRules.en : skill.coreRules.id).map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section id="tips" className="scroll-mt-20 space-y-3">
              <h2 className="text-lg font-semibold text-foreground">
                {isEn ? 'Tips & Best Practices' : 'Tips & Best Practices'}
              </h2>
              <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
                {(isEn ? skill.tips.en : skill.tips.id).map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary/60" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </section>

            {skill.spotlight ? (
              <section id="spotlight" className="scroll-mt-20">
                <div className="rounded-lg border-2 border-primary/40 bg-primary/5 p-4 sm:p-5 space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge className="font-mono text-[10px] uppercase tracking-wider">
                      Spotlight
                    </Badge>
                    <h2 className="text-base font-bold text-foreground">
                      {isEn ? skill.spotlight.title.en : skill.spotlight.title.id}
                    </h2>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {isEn ? skill.spotlight.body.en : skill.spotlight.body.id}
                  </p>
                </div>
              </section>
            ) : null}

            {skill.pairsWellWith.length > 0 ? (
              <section id="pairs-with" className="scroll-mt-20 space-y-3">
                <h2 className="text-lg font-semibold text-foreground">
                  {isEn ? 'Pairs Well With' : 'Cocok Digunakan Bersama'}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {skill.pairsWellWith.map((pair) => (
                    <Badge key={pair} variant="secondary" className="font-mono text-xs">
                      /{pair}
                    </Badge>
                  ))}
                </div>
              </section>
            ) : null}

            <section id="install" className="scroll-mt-20 space-y-3">
              <h2 className="text-lg font-semibold text-foreground">
                {isEn ? 'Installation' : 'Instalasi'}
              </h2>
              <SkillInstallBlock
                skillName={skill.name}
                source={author?.source ?? 'prisma/skills'}
              />
            </section>
          </div>

          <Separator className="my-8" />

          <nav
            aria-label="Skill pagination"
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {prev ? (
              <Link
                to="/prisma/skills/$skillName"
                params={{ skillName: prev.name }}
                className={navCardClass}
              >
                <span className="text-xs text-muted-foreground">
                  ← {isEn ? 'Previous skill' : 'Skill sebelumnya'}
                </span>
                <span className="mt-1 block font-mono text-sm font-semibold text-foreground group-hover:text-primary">
                  /{prev.name}
                </span>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                to="/prisma/skills/$skillName"
                params={{ skillName: next.name }}
                className={`${navCardClass} text-right`}
              >
                <span className="text-xs text-muted-foreground">
                  {isEn ? 'Next skill' : 'Skill berikutnya'} →
                </span>
                <span className="mt-1 block font-mono text-sm font-semibold text-foreground group-hover:text-primary">
                  /{next.name}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </nav>
        </article>

        <div className="hidden xl:block">
          <div className="sticky top-20">
            <OnThisPage items={tocItems} />
          </div>
        </div>
      </div>
    </div>
  )
}

function PrismaSkillNotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="text-2xl font-bold">Skill Not Found</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Skill yang Anda cari tidak ditemukan dalam koleksi Prisma.
      </p>
      <Link
        to="/prisma"
        className="mt-6 inline-block rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
      >
        Kembali ke Prisma
      </Link>
    </div>
  )
}
