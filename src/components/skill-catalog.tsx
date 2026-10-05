import { useMemo, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { RiGithubFill } from '@remixicon/react'
import { AuthorAvatar } from '@/components/author-avatar'
import { Badge } from '@/components/ui/badge'
import { FilterChip } from '@/components/filter-chip'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { getCollectionBySlug } from '@/data/collections'
import { m } from '@/paraglide/messages.js'

const CATALOG_VIEWPORT_CLASS = 'h-[28rem] sm:h-[30rem]'

/** Collection-agnostic catalog row; each collection maps its own records to this. */
export type CatalogItem = {
  name: string
  /** Value matched by the category filter chips. */
  category: string
  categoryLabel: string
  invocation: 'user' | 'model'
  /** Overrides the default "User-invoked"/"Model-invoked" wording. */
  invocationLabel?: string
  description: string
  /** Short chips under the description (core rules, use-when, ...). */
  highlights?: string[]
  /** Small mono line (e.g. an operating mode). */
  meta?: string
  sourceUrl?: string
  /** Extra text matched by the search box. */
  searchText?: string
}

type SkillCatalogProps = {
  collectionSlug: string
  items: CatalogItem[]
  categories: { label: string; value: string }[]
  title: string
  description: string
  /** Anchor id of the section (defaults to `skills`). */
  sectionId?: string
  /** Overrides the User/Model invocation filter chip labels. */
  invocationFilterLabels?: { user: string; model: string }
}

/**
 * Shared catalog: search box, category + invocation filter chips, a scrollable
 * list of skill cards and a "showing X of Y" counter. Every collection page
 * uses it so the catalogs look and behave the same.
 */
export function SkillCatalog({
  collectionSlug,
  items,
  categories,
  title,
  description,
  sectionId = 'skills',
  invocationFilterLabels,
}: SkillCatalogProps) {
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState<string>('all')
  const author = getCollectionBySlug(collectionSlug)

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return items.filter((item) => {
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q) ||
        (item.searchText ?? '').toLowerCase().includes(q) ||
        (item.highlights ?? []).some((h) => h.toLowerCase().includes(q))
      const matchesFilter =
        activeFilter === 'all' ||
        item.category === activeFilter ||
        item.invocation === activeFilter
      return matchesSearch && matchesFilter
    })
  }, [items, search, activeFilter])

  const allFilters = [
    { label: m.catalog_filter_all(), value: 'all' },
    ...categories,
    { label: invocationFilterLabels?.user ?? m.skills_filter_user(), value: 'user' },
    { label: invocationFilterLabels?.model ?? m.skills_filter_model(), value: 'model' },
  ]
  const placeholder = m.catalog_search_placeholder({ count: String(items.length) })

  return (
    <section id={sectionId} className="scroll-mt-20 space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-balance">{title}</h2>
        <p className="mt-1 text-muted-foreground">{description}</p>
      </div>

      <div className="space-y-3">
        <Input
          type="search"
          name="skill-search"
          autoComplete="off"
          spellCheck={false}
          placeholder={placeholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
          aria-label={placeholder}
        />
        <div className="flex flex-wrap gap-2" role="group" aria-label={m.nav_filters()}>
          {allFilters.map((f) => (
            <FilterChip
              key={f.value}
              pressed={activeFilter === f.value}
              onClick={() => setActiveFilter(f.value)}
            >
              {f.label}
            </FilterChip>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-border bg-card py-10 text-center">
          <p className="text-sm text-muted-foreground">{m.catalog_no_results()}</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
          <ScrollArea className={CATALOG_VIEWPORT_CLASS}>
            <div className="space-y-3 p-3 pr-4">
              {filtered.map((item) => (
                <Link
                  key={item.name}
                  to={`/${collectionSlug}/skills/$skillName` as '/'}
                  params={{ skillName: item.name } as never}
                  className="block w-full cursor-pointer rounded-lg border border-border bg-background px-4 py-3.5 text-left transition-colors hover:border-primary/40 hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
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
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-sm font-semibold text-foreground">
                            /{item.name}
                          </span>
                          <Badge variant="outline" className="font-mono text-xs uppercase">
                            {item.categoryLabel}
                          </Badge>
                          <Badge
                            variant={item.invocation === 'user' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {item.invocationLabel ??
                              (item.invocation === 'user'
                                ? m.skills_filter_user()
                                : m.skills_filter_model())}
                          </Badge>
                        </div>
                        {item.sourceUrl ? (
                          <span
                            role="link"
                            tabIndex={0}
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              window.open(item.sourceUrl, '_blank', 'noopener,noreferrer')
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault()
                                e.stopPropagation()
                                window.open(item.sourceUrl, '_blank', 'noopener,noreferrer')
                              }
                            }}
                            className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-primary"
                          >
                            <RiGithubFill className="size-3.5" aria-hidden="true" />
                            <span>{m.catalog_view_skill_md()}</span>
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                      {item.meta ? (
                        <p className="mt-1.5 font-mono text-xs text-muted-foreground">
                          {item.meta}
                        </p>
                      ) : null}
                      {item.highlights && item.highlights.length > 0 ? (
                        <div className="mt-3 flex flex-wrap gap-1.5 border-t border-border/50 pt-2">
                          {item.highlights.slice(0, 2).map((h, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-[11px] text-muted-foreground line-clamp-1"
                            >
                              • {h}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}

      <p className="text-xs text-muted-foreground tabular-nums" aria-live="polite">
        {m.catalog_showing({
          count: String(filtered.length),
          total: String(items.length),
        })}
      </p>
    </section>
  )
}
