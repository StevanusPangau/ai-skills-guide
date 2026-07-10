import { useEffect } from 'react'
import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { RiGithubFill } from '@remixicon/react'
import {
  davidCategoryLabels,
  davidondrejSkills,
  davidSourceUrl,
} from '@/data/davidondrej-skills'
import {
  bundleLabel,
  compatibilityBorder,
  compatibilityLabel,
  invocationLabel,
  riskBadgeClass,
  riskLabel,
} from '@/features/davidondrej/badges'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { useDocumentTitle } from '@/lib/use-document-title'
import { m } from '@/paraglide/messages.js'

export const Route = createFileRoute('/davidondrej/skills/$skillName')({
  loader: ({ params }) => {
    const index = davidondrejSkills.findIndex((s) => s.name === params.skillName)
    if (index === -1) throw notFound()
    return {
      skill: davidondrejSkills[index],
      prev: index > 0 ? davidondrejSkills[index - 1] : null,
      next: index < davidondrejSkills.length - 1 ? davidondrejSkills[index + 1] : null,
    }
  },
  component: DavidSkillPage,
  notFoundComponent: DavidSkillNotFound,
})

function DavidSkillPage() {
  const { skill, prev, next } = Route.useLoaderData()
  useDocumentTitle(`/${skill.name}`)

  // Sibling detail pages share this route pattern, so the component does not
  // unmount on navigation — reset scroll explicitly on skill change.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [skill.name])

  return (
    <main className="flex-1 min-w-0 pt-14">
      <div className="mx-auto max-w-3xl space-y-8 px-6 py-10">
        {/* Breadcrumb */}
        <div className="text-sm text-muted-foreground">
          <Link to="/" className="transition-colors hover:text-primary">
            Beranda
          </Link>
          <span className="mx-2">/</span>
          <Link to="/davidondrej" className="transition-colors hover:text-primary">
            David Ondrej
          </Link>
          <span className="mx-2">/</span>
          <span className="font-mono text-foreground">{skill.name}</span>
        </div>

        {/* Header */}
        <div className={`border-l-4 pl-4 ${compatibilityBorder(skill.compatibility)}`}>
          <h1 className="font-mono text-2xl font-bold tracking-tight">/{skill.name}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {davidCategoryLabels[skill.category]}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Badge
              variant={skill.invocation === 'manual' ? 'default' : 'secondary'}
              className="text-xs"
            >
              {invocationLabel(skill.invocation)}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {compatibilityLabel(skill.compatibility)}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {bundleLabel(skill.bundleStatus)}
            </Badge>
            <span className={`text-xs font-medium ${riskBadgeClass(skill.risk)}`}>
              {riskLabel(skill.risk)}
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed">{skill.description}</p>
        </div>

        <Separator />

        {/* Prerequisites */}
        {skill.prerequisites && skill.prerequisites.length > 0 && (
          <ListSection label={m.david_detail_prerequisites()} items={skill.prerequisites} />
        )}

        {/* Dependencies */}
        {skill.dependencies && skill.dependencies.length > 0 && (
          <ListSection label={m.david_detail_dependencies()} items={skill.dependencies} />
        )}

        {/* Adaptation notes */}
        <section>
          <h2 className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            {m.david_detail_adaptation()}
          </h2>
          <p className="text-sm leading-relaxed">{skill.adaptationNotes}</p>
        </section>

        {/* Source link */}
        <a
          href={davidSourceUrl(skill.sourcePath)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
        >
          <RiGithubFill className="size-4" />
          {m.david_detail_source()}
        </a>

        <Separator />

        {/* Prev / Next navigation */}
        <nav className="grid grid-cols-2 gap-3">
          {prev ? (
            <Link
              to="/davidondrej/skills/$skillName"
              params={{ skillName: prev.name }}
              className="group rounded-lg border border-border p-3 transition-colors hover:border-primary"
            >
              <span className="block text-xs text-muted-foreground">{m.david_detail_prev()}</span>
              <span className="mt-0.5 block font-mono text-sm transition-colors group-hover:text-primary">
                /{prev.name}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              to="/davidondrej/skills/$skillName"
              params={{ skillName: next.name }}
              className="group rounded-lg border border-border p-3 text-right transition-colors hover:border-primary"
            >
              <span className="block text-xs text-muted-foreground">{m.david_detail_next()}</span>
              <span className="mt-0.5 block font-mono text-sm transition-colors group-hover:text-primary">
                /{next.name}
              </span>
            </Link>
          ) : (
            <span />
          )}
        </nav>

        <Link
          to="/davidondrej"
          className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
        >
          {m.david_detail_back()}
        </Link>
      </div>
    </main>
  )
}

function ListSection({ label, items }: { label: string; items: string[] }) {
  return (
    <section>
      <h2 className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        {label}
      </h2>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <Badge key={item} variant="outline" className="font-mono text-xs">
            {item}
          </Badge>
        ))}
      </div>
    </section>
  )
}

function DavidSkillNotFound() {
  return (
    <main className="flex-1 min-w-0 pt-14">
      <div className="mx-auto max-w-3xl space-y-4 px-6 py-20 text-center">
        <h1 className="text-2xl font-bold">{m.david_detail_not_found_title()}</h1>
        <p className="text-sm text-muted-foreground">{m.david_detail_not_found_body()}</p>
        <Link
          to="/davidondrej"
          className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
        >
          {m.david_detail_back()}
        </Link>
      </div>
    </main>
  )
}
