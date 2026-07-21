import { useEffect, useRef } from 'react'
import {
  createFileRoute,
  Link,
  notFound,
  useNavigate,
} from '@tanstack/react-router'
import { AuthorAvatar } from '@/components/author-avatar'
import { XHandleLink } from '@/components/x-handle-link'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { OnThisPage } from '@/components/layout/on-this-page'
import { getCollectionBySlug } from '@/data/collections'
import { skills } from '@/data/skills'
import { SkillDetailBody } from '@/features/skills/skill-detail'
import { getSkillTocItems } from '@/features/skills/skill-detail-toc'
import { resetSkillDetailScroll } from '@/lib/scroll-to-section'
import { useDocumentTitle } from '@/lib/use-document-title'
import type { Skill } from '@/types/skill'
import { getOfficialTitle } from '@/types/skill'
import { m } from '@/paraglide/messages.js'

const skillIndexByName = new Map(
  skills.map((skill, index) => [skill.name, index] as const),
)

export const Route = createFileRoute('/skills/$skillName')({
  loader: ({ params }) => {
    const index = skillIndexByName.get(params.skillName)
    if (index === undefined) throw notFound()
    return {
      skill: skills[index],
      prev: index > 0 ? skills[index - 1] : null,
      next: index < skills.length - 1 ? skills[index + 1] : null,
    }
  },
  component: SkillPage,
  notFoundComponent: SkillNotFound,
})

function borderColor(skill: Skill): string {
  if (skill.category === 'engineering' && skill.invocation === 'user')
    return 'border-l-orange-700'
  if (skill.category === 'engineering' && skill.invocation === 'model')
    return 'border-l-violet-600'
  if (skill.category === 'productivity' && skill.invocation === 'user')
    return 'border-l-emerald-600'
  return 'border-l-sky-600'
}

const crumbLinkClass =
  'rounded-sm transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50'
const navCardClass =
  'group rounded-lg border border-border p-3 transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50'

function SkillPage() {
  const { skill, prev, next } = Route.useLoaderData()
  const navigate = useNavigate()
  useDocumentTitle(`/${skill.name}`)
  const author = getCollectionBySlug('mattpocock')

  // Sibling detail pages share this route pattern, so the component does not
  // unmount on navigation — reset scroll on skill change. Keep hash on first
  // paint so OnThisPage can deep-link.
  const prevSkillName = useRef<string | null>(null)
  useEffect(() => {
    const prev = prevSkillName.current
    prevSkillName.current = skill.name
    void resetSkillDetailScroll(navigate, {
      isFirstMount: prev === null,
      skillChanged: prev !== null && prev !== skill.name,
    })
  }, [skill.name, navigate])

  const tocItems = getSkillTocItems(skill)

  return (
    <main id="main-content" className="min-w-0 flex-1 pt-14">
      <div className="mx-auto flex max-w-6xl gap-10 px-6 py-10">
        <div className="min-w-0 max-w-3xl flex-1 space-y-8">
          <div className="text-sm text-muted-foreground">
            <Link to="/" className={crumbLinkClass}>
              {m.nav_home()}
            </Link>
            <span className="mx-2">/</span>
            <Link to="/mattpocock" hash="skills" className={crumbLinkClass}>
              {m.nav_matt_pocock()}
            </Link>
            <span className="mx-2">/</span>
            <span className="font-mono text-foreground">{skill.name}</span>
          </div>

          <div className={`border-l-4 pl-4 ${borderColor(skill)}`}>
            <div className="flex items-start gap-4">
              {author?.avatarSrc ? (
                <AuthorAvatar
                  src={author.avatarSrc}
                  name={author.author}
                  size="lg"
                  className="mt-0.5"
                />
              ) : null}
              <div className="min-w-0 flex-1">
                <h1 className="font-mono text-2xl font-bold tracking-tight text-balance">
                  /{skill.name}
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  {getOfficialTitle(skill)}
                </p>
                {author ? (
                  <p className="mt-2 text-xs text-muted-foreground">
                    <span className="font-medium text-foreground/90">
                      {author.author}
                    </span>
                    {author.xHandle ? (
                      <>
                        <span className="text-muted-foreground/50"> · </span>
                        <XHandleLink handle={author.xHandle} />
                      </>
                    ) : null}
                  </p>
                ) : null}
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {skill.category}
                  </Badge>
                  <Badge
                    variant={
                      skill.invocation === 'user' ? 'default' : 'secondary'
                    }
                    className="text-xs"
                  >
                    {skill.invocation}-invoked
                  </Badge>
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed">{skill.description}</p>
          </div>

          <Separator />

          <SkillDetailBody skill={skill} />

          <Separator />

          <nav className="grid grid-cols-2 gap-3">
            {prev ? (
              <Link
                to="/skills/$skillName"
                params={{ skillName: prev.name }}
                className={navCardClass}
              >
                <span className="block text-xs text-muted-foreground">
                  {m.skill_detail_prev()}
                </span>
                <span className="mt-0.5 block font-mono text-sm transition-colors group-hover:text-primary group-focus-visible:text-primary">
                  /{prev.name}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                to="/skills/$skillName"
                params={{ skillName: next.name }}
                className={`${navCardClass} text-right`}
              >
                <span className="block text-xs text-muted-foreground">
                  {m.skill_detail_next()}
                </span>
                <span className="mt-0.5 block font-mono text-sm transition-colors group-hover:text-primary group-focus-visible:text-primary">
                  /{next.name}
                </span>
              </Link>
            ) : (
              <span />
            )}
          </nav>

          <Link
            to="/mattpocock"
            hash="skills"
            className="inline-flex items-center gap-1 rounded-sm text-sm text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          >
            {m.skill_detail_back()}
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

function SkillNotFound() {
  return (
    <main id="main-content" className="min-w-0 flex-1 pt-14">
      <div className="mx-auto max-w-3xl space-y-4 px-6 py-20 text-center">
        <h1 className="text-2xl font-bold text-balance">
          {m.skill_detail_not_found_title()}
        </h1>
        <p className="text-sm text-muted-foreground">
          {m.skill_detail_not_found_body()}
        </p>
        <Link
          to="/mattpocock"
          hash="skills"
          className="inline-flex items-center gap-1 rounded-sm text-sm text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
        >
          {m.skill_detail_back()}
        </Link>
      </div>
    </main>
  )
}
