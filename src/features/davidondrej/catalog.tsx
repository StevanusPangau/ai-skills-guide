import { useMemo, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { AuthorAvatar } from '@/components/author-avatar'
import { Badge } from '@/components/ui/badge'
import { FilterChip } from '@/components/filter-chip'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { getCollectionBySlug } from '@/data/collections'
import {
  davidCategoryLabels,
  davidondrejSkills,
  type DavidBundleStatus,
  type DavidCategory,
  type DavidCompatibility,
  type DavidInvocation,
} from '@/data/davidondrej-skills'
import { invocationLabel } from './badges'
import { m } from '@/paraglide/messages.js'

const CATALOG_VIEWPORT_CLASS = 'h-[28rem] sm:h-[30rem]'

type Filter =
  | 'all'
  | DavidCategory
  | DavidInvocation
  | DavidCompatibility
  | DavidBundleStatus

const CATEGORY_KEYS = Object.keys(davidCategoryLabels) as DavidCategory[]

export function DavidCatalog() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<Filter>('all')
  const author = getCollectionBySlug('davidondrej')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return davidondrejSkills.filter((s) => {
      const matchesSearch =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.adaptationNotes.toLowerCase().includes(q)

      const matchesFilter =
        filter === 'all' ||
        s.category === filter ||
        s.invocation === filter ||
        s.compatibility === filter ||
        s.bundleStatus === filter

      return matchesSearch && matchesFilter
    })
  }, [query, filter])

  const filters: { label: string; value: Filter }[] = [
    { label: m.david_filter_all(), value: 'all' },
    ...CATEGORY_KEYS.map((c) => ({
      label: davidCategoryLabels[c],
      value: c as Filter,
    })),
    { label: m.david_invocation_manual(), value: 'manual' },
    { label: m.david_invocation_model(), value: 'model' },
    { label: m.david_bundle_first_wave(), value: 'first-wave' },
    { label: m.david_compat_portable(), value: 'portable' },
    { label: m.david_compat_adapt(), value: 'adapt' },
  ]

  return (
    <section id="catalog" className="scroll-mt-20 space-y-6">
      <div>
        <h2 className="font-heading text-2xl font-bold tracking-tight text-balance">
          {m.david_catalog_title()}
        </h2>
        <p className="mt-1 text-muted-foreground">
          {m.david_catalog_description()}
        </p>
      </div>

      <div className="space-y-3">
        <Input
          type="search"
          name="skill-search"
          autoComplete="off"
          spellCheck={false}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={m.david_search_placeholder()}
          aria-label={m.david_search_placeholder()}
          className="max-w-sm"
        />
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label={m.nav_filters()}
        >
          {filters.map((f) => (
            <FilterChip
              key={f.value}
              pressed={filter === f.value}
              onClick={() => setFilter(f.value)}
            >
              {f.label}
            </FilterChip>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-border bg-card py-10 text-center">
          <p className="text-sm text-muted-foreground">{m.david_no_results()}</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
          <ScrollArea className={CATALOG_VIEWPORT_CLASS}>
            <div className="space-y-3 p-3 pr-4">
              {filtered.map((skill) => (
                <Link
                  key={skill.name}
                  to="/davidondrej/skills/$skillName"
                  params={{ skillName: skill.name }}
                  className="block w-full rounded-lg border border-border bg-background px-4 py-3.5 text-left transition-colors hover:border-primary/40 hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                >
                  <div className="flex gap-3">
                    {author?.avatarSrc ? (
                      <AuthorAvatar
                        src={author.avatarSrc}
                        name={author.author}
                        size="md"
                        className="mt-0.5"
                      />
                    ) : null}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-sm font-semibold">
                          /{skill.name}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {davidCategoryLabels[skill.category]}
                        </Badge>
                        <Badge
                          variant={
                            skill.invocation === 'manual'
                              ? 'default'
                              : 'secondary'
                          }
                          className="text-xs"
                        >
                          {invocationLabel(skill.invocation)}
                        </Badge>
                      </div>
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                        {skill.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}

      <p
        className="text-xs text-muted-foreground tabular-nums"
        aria-live="polite"
      >
        {m.david_showing({
          count: String(filtered.length),
          total: String(davidondrejSkills.length),
        })}
      </p>
    </section>
  )
}
