import { useEffect, useRef } from 'react'
import { createFileRoute, Link, notFound, useNavigate } from '@tanstack/react-router'
import { OnThisPage } from '@/components/layout/on-this-page'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { emilkowalskiSkills } from '@/data/emilkowalski-skills'
import {
  emilCategoryLabel,
  emilInvocationLabel,
  emilModeLabel,
} from '@/features/emilkowalski/labels'
import { EmilSkillDetailBody } from '@/features/emilkowalski/skill-detail'
import { resetSkillDetailScroll } from '@/lib/scroll-to-section'
import { useDocumentTitle } from '@/lib/use-document-title'
import { m } from '@/paraglide/messages.js'

const indexByName = new Map(emilkowalskiSkills.map((skill, index) => [skill.name, index] as const))
const tocItems = [
  { id: 'use-when', label: m.emil_detail_use_when() },
  { id: 'avoid-when', label: m.emil_detail_avoid_when() },
  { id: 'output', label: m.emil_detail_output() },
  { id: 'core-rules', label: m.emil_detail_core_rules() },
  { id: 'source', label: m.emil_detail_source_files() },
  { id: 'install', label: m.skill_install_title() },
]

export const Route = createFileRoute('/emilkowalski/skills/$skillName')({
  loader: ({ params }) => {
    const index = indexByName.get(params.skillName)
    if (index === undefined) throw notFound()
    return { skill: emilkowalskiSkills[index], prev: emilkowalskiSkills[index - 1] ?? null, next: emilkowalskiSkills[index + 1] ?? null }
  },
  component: EmilSkillPage,
  notFoundComponent: EmilSkillNotFound,
})

function EmilSkillPage() {
  const { skill, prev, next } = Route.useLoaderData()
  const navigate = useNavigate()
  const previousName = useRef<string | null>(null)
  useDocumentTitle(`/${skill.name}`)
  useEffect(() => {
    const previous = previousName.current
    previousName.current = skill.name
    void resetSkillDetailScroll(navigate, { isFirstMount: previous === null, skillChanged: previous !== null && previous !== skill.name })
  }, [navigate, skill.name])

  return (
    <main id="main-content" className="min-w-0 flex-1 pt-14">
      <div className="mx-auto flex max-w-6xl gap-10 px-6 py-10">
        <div className="min-w-0 max-w-3xl flex-1 space-y-8">
          <nav aria-label={m.nav_breadcrumb()} className="text-sm text-muted-foreground"><Link to="/">{m.nav_home()}</Link><span className="mx-2" aria-hidden="true">/</span><Link to="/emilkowalski">Emil Kowalski</Link><span className="mx-2" aria-hidden="true">/</span><span className="font-mono text-foreground" aria-current="page">{skill.name}</span></nav>
          <div className="border-l-4 border-violet-500 pl-4">
            <h1 className="font-mono text-2xl font-bold tracking-tight text-balance">/{skill.name}</h1>
            <div className="mt-3 flex flex-wrap gap-2"><Badge variant="outline">{emilCategoryLabel(skill.category)}</Badge><Badge variant={skill.invocation === 'manual' ? 'default' : 'secondary'}>{emilInvocationLabel(skill.invocation)}</Badge><Badge variant="secondary">{emilModeLabel(skill.mode)}</Badge></div>
            <p className="mt-4 text-sm leading-relaxed">{skill.description}</p>
          </div>
          <Separator />
          <EmilSkillDetailBody skill={skill} />
          <Separator />
          <nav aria-label={m.emil_detail_skill_navigation()} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {prev ? <Link to="/emilkowalski/skills/$skillName" params={{ skillName: prev.name }} className="min-w-0 break-words rounded-lg border p-3 text-sm hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"><span className="block text-xs text-muted-foreground">{m.emil_detail_prev()}</span><span className="mt-0.5 block font-mono">/{prev.name}</span></Link> : <span className="hidden sm:block" />}
            {next ? <Link to="/emilkowalski/skills/$skillName" params={{ skillName: next.name }} className="min-w-0 break-words rounded-lg border p-3 text-sm hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 sm:text-right"><span className="block text-xs text-muted-foreground">{m.emil_detail_next()}</span><span className="mt-0.5 block font-mono">/{next.name}</span></Link> : null}
          </nav>
          <Link to="/emilkowalski" hash="catalog" className="inline-flex rounded-sm text-sm text-primary hover:underline">{m.emil_detail_back()}</Link>
        </div>
        <aside className="hidden w-52 shrink-0 xl:block"><div className="sticky top-24"><OnThisPage items={tocItems} /></div></aside>
      </div>
    </main>
  )
}

function EmilSkillNotFound() {
  return <main id="main-content" className="min-w-0 flex-1 pt-14"><div className="mx-auto max-w-3xl space-y-4 px-6 py-20 text-center"><h1 className="text-2xl font-bold">{m.emil_detail_not_found()}</h1><Link to="/emilkowalski" hash="catalog" className="text-primary hover:underline">{m.emil_detail_back()}</Link></div></main>
}
