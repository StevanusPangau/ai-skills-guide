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
import { anthropicSkills, type RichSkill } from '@/data/anthropic-skills'
import { resetSkillDetailScroll } from '@/lib/scroll-to-section'
import { useDocumentTitle } from '@/lib/use-document-title'
import { m } from '@/paraglide/messages.js'
import { getLocale } from '@/paraglide/runtime.js'

const skillIndexByName = new Map(
  anthropicSkills.map((skill, index) => [skill.name, index] as const),
)

export const Route = createFileRoute('/anthropic/skills/$skillName')({
  loader: ({ params }): { skill: RichSkill; prev: RichSkill | null; next: RichSkill | null } => {
    const index = skillIndexByName.get(params.skillName)
    if (index === undefined) throw notFound()
    return {
      skill: anthropicSkills[index],
      prev: index > 0 ? anthropicSkills[index - 1] : null,
      next:
        index < anthropicSkills.length - 1
          ? anthropicSkills[index + 1]
          : null,
    }
  },
  component: AnthropicSkillPage,
  notFoundComponent: AnthropicSkillNotFound,
})

const crumbLinkClass =
  'rounded-sm transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50'
const navCardClass =
  'group rounded-lg border border-border p-3 transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50'

function AnthropicSkillPage() {
  const { skill, prev, next } = Route.useLoaderData() as {
    skill: RichSkill
    prev: RichSkill | null
    next: RichSkill | null
  }
  const navigate = useNavigate()
  useDocumentTitle(`/${skill.name}`)
  const author = getCollectionBySlug('anthropic')
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
    { id: 'avoid-when', label: isEn ? 'When Not to Use' : 'Hindari Saat' },
    { id: 'how-it-works', label: isEn ? 'How It Works' : 'Cara Kerja Eksekusi' },
    { id: 'core-rules', label: isEn ? 'Core Rules' : 'Aturan Inti' },
    { id: 'tips', label: isEn ? 'Pro Tips' : 'Tips Penerapan' },
    { id: 'pairs-well-with', label: isEn ? 'Pairs Well With' : 'Cocok Dikombinasikan' },
    { id: 'install', label: isEn ? 'Installation' : 'Instalasi' },
  ]

  const desc = isEn ? skill.description.en : skill.description.id
  const detailed = isEn ? skill.detailedDescription.en : skill.detailedDescription.id
  const useWhenList = isEn ? skill.useWhen.en : skill.useWhen.id
  const avoidWhenList = isEn ? skill.avoidWhen.en : skill.avoidWhen.id
  const howItWorksList = isEn ? skill.howItWorks.en : skill.howItWorks.id
  const coreRulesList = isEn ? skill.coreRules.en : skill.coreRules.id
  const tipsList = isEn ? skill.tips.en : skill.tips.id

  return (
    <main id="main-content" className="min-w-0 flex-1 pt-14">
      <div className="mx-auto flex max-w-6xl gap-10 px-6 py-10">
        <div className="min-w-0 max-w-3xl flex-1 space-y-8">
          <div className="text-sm text-muted-foreground">
            <Link to="/" className={crumbLinkClass}>
              {m.nav_home()}
            </Link>
            <span className="mx-2">/</span>
            <Link to="/anthropic" className={crumbLinkClass}>
              Anthropic
            </Link>
            <span className="mx-2">/</span>
            <span className="font-mono text-foreground">{skill.name}</span>
          </div>

          <div className="border-l-4 border-primary pl-4">
            <div className="flex items-start gap-4">
              {author?.avatarSrc ? (
                <AuthorAvatar
                  src={author.avatarSrc}
                  name={author.author}
                  size="lg"
                  className="mt-1 shrink-0"
                />
              ) : null}
              <div className="min-w-0 flex-1">
                <h1 className="font-mono text-2xl font-bold tracking-tight text-balance sm:text-3xl">
                  /{skill.name}
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  <span className="font-medium text-foreground/90">
                    {author?.author}
                  </span>
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="outline" className="font-mono uppercase text-xs">
                {skill.category}
              </Badge>
              <Badge
                variant={skill.invocation === 'user' ? 'default' : 'secondary'}
                className="text-xs"
              >
                {skill.invocation === 'user'
                  ? m.skills_filter_user()
                  : m.skills_filter_model()}
              </Badge>
            </div>

            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {desc}
            </p>
          </div>

          <Separator />

          <div className="space-y-6">
            {detailed && (
              <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                {detailed}
              </p>
            )}

            <section id="use-when" className="space-y-2">
              <h2 className="text-base font-semibold">
                {isEn ? 'When to Use' : 'Gunakan Saat (Use When)'}
              </h2>
              <ul className="space-y-1 text-sm">
                {useWhenList.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section id="avoid-when" className="space-y-2">
              <h2 className="text-base font-semibold">
                {isEn ? 'When Not to Use' : 'Hindari Saat (Avoid When)'}
              </h2>
              <ul className="space-y-1 text-sm">
                {avoidWhenList.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-muted-foreground">
                    <span className="text-destructive">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section id="how-it-works" className="space-y-2">
              <h2 className="text-base font-semibold">
                {isEn ? 'How It Works' : 'Cara Kerja Eksekusi (How It Works)'}
              </h2>
              <ol className="list-inside list-decimal space-y-1.5 text-sm">
                {howItWorksList.map((step: string, i: number) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </section>

            <section id="core-rules" className="space-y-2">
              <h2 className="text-base font-semibold">
                {isEn ? 'Core Rules & Requirements' : 'Aturan Inti (Core Rules)'}
              </h2>
              <ul className="space-y-1 text-sm">
                {coreRulesList.map((rule: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section id="tips" className="space-y-2">
              <h2 className="text-base font-semibold">
                {isEn ? 'Pro Tips' : 'Tips Penerapan'}
              </h2>
              <ul className="space-y-1 text-sm">
                {tipsList.map((tip: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-muted-foreground">
                    <span className="text-amber-500">★</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </section>

            {skill.pairsWellWith.length > 0 && (
              <section id="pairs-well-with" className="space-y-2">
                <h2 className="text-base font-semibold">
                  {isEn ? 'Pairs Well With' : 'Cocok Dikombinasikan (Pairs Well With)'}
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {skill.pairsWellWith.map((pair: string) => (
                    <Link
                      key={pair}
                      to="/anthropic/skills/$skillName"
                      params={{ skillName: pair }}
                      className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                    >
                      <Badge
                        variant="outline"
                        className="cursor-pointer font-mono text-xs transition-colors hover:border-primary"
                      >
                        /{pair}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            <div id="install" className="scroll-mt-20 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  {m.skill_install_title()}
                </h2>
                <CopyAgentRuleButton
                  skillName={skill.name}
                  description={isEn ? skill.detailedDescription.en : skill.detailedDescription.id}
                  useWhen={isEn ? skill.useWhen.en : skill.useWhen.id}
                  coreRules={isEn ? skill.coreRules.en : skill.coreRules.id}
                  howItWorks={isEn ? skill.howItWorks.en : skill.howItWorks.id}
                />
              </div>
              <SkillInstallBlock source="anthropics/skills" skillName={skill.name} />
            </div>
          </div>

          <Separator />

          <nav
            aria-label="Skill navigasi"
            className="grid grid-cols-1 gap-3 sm:grid-cols-2"
          >
            {prev ? (
              <Link
                to="/anthropic/skills/$skillName"
                params={{ skillName: prev.name }}
                className={navCardClass}
              >
                <span className="block text-xs text-muted-foreground">
                  {isEn ? 'Previous Skill' : 'Skill Sebelumnya'}
                </span>
                <span className="mt-0.5 block font-mono text-sm font-semibold">
                  /{prev.name}
                </span>
              </Link>
            ) : (
              <span className="hidden sm:block" />
            )}
            {next ? (
              <Link
                to="/anthropic/skills/$skillName"
                params={{ skillName: next.name }}
                className={`${navCardClass} sm:text-right`}
              >
                <span className="block text-xs text-muted-foreground">
                  {isEn ? 'Next Skill' : 'Skill Selanjutnya'}
                </span>
                <span className="mt-0.5 block font-mono text-sm font-semibold">
                  /{next.name}
                </span>
              </Link>
            ) : null}
          </nav>

          <Link
            to="/anthropic"
            className="inline-flex rounded-sm text-sm text-primary hover:underline"
          >
            {isEn ? '← Back to Anthropic Catalog' : '← Kembali ke Katalog Anthropic'}
          </Link>
        </div>

        <aside className="hidden w-52 shrink-0 xl:block">
          <div className="sticky top-24">
            <OnThisPage items={tocItems} />
          </div>
        </aside>
      </div>
    </main>
  )
}

function AnthropicSkillNotFound() {
  const isEn = getLocale() === 'en'
  return (
    <main id="main-content" className="min-w-0 flex-1 pt-14">
      <div className="mx-auto max-w-3xl space-y-4 px-6 py-20 text-center">
        <h1 className="text-2xl font-bold">
          {isEn ? 'Skill Not Found' : 'Skill Tidak Ditemukan'}
        </h1>
        <Link to="/anthropic" className="text-primary hover:underline">
          {isEn ? 'Back to Anthropic Guide' : 'Kembali ke Panduan Anthropic'}
        </Link>
      </div>
    </main>
  )
}
