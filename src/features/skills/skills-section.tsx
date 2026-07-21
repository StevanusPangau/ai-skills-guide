import { useMemo, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { AuthorAvatar } from '@/components/author-avatar'
import { Badge } from '@/components/ui/badge'
import { FilterChip } from '@/components/filter-chip'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { getCollectionBySlug } from '@/data/collections'
import { skills } from '@/data/skills'
import { m } from '@/paraglide/messages.js'

const CATALOG_VIEWPORT_CLASS = 'h-[28rem] sm:h-[30rem]'

type Filter = 'all' | 'engineering' | 'productivity' | 'user' | 'model'

export function SkillsSection() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<Filter>('all')
  const author = getCollectionBySlug('mattpocock')

  const filtered = useMemo(() => {
    return skills.filter((skill) => {
      const q = search.trim().toLowerCase()
      const matchesSearch =
        !q ||
        skill.name.toLowerCase().includes(q) ||
        skill.description.toLowerCase().includes(q) ||
        skill.keyBehaviors.some((b) => b.toLowerCase().includes(q))

      const matchesFilter =
        filter === 'all' ||
        skill.category === filter ||
        skill.invocation === filter

      return matchesSearch && matchesFilter
    })
  }, [search, filter])

  const filters: { label: string; value: Filter }[] = [
    { label: m.skills_filter_all(), value: 'all' },
    { label: m.skills_filter_engineering(), value: 'engineering' },
    { label: m.skills_filter_productivity(), value: 'productivity' },
    { label: m.skills_filter_user(), value: 'user' },
    { label: m.skills_filter_model(), value: 'model' },
  ]

  return (
    <section id="skills" className="scroll-mt-20 space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-balance">
          {m.skills_title()}
        </h2>
        <p className="mt-1 text-muted-foreground">{m.skills_description()}</p>
      </div>

      <div className="space-y-3">
        <Input
          type="search"
          name="skill-search"
          autoComplete="off"
          spellCheck={false}
          placeholder={m.skills_search_placeholder()}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
          aria-label={m.skills_search_placeholder()}
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
          <p className="text-sm text-muted-foreground">{m.skills_no_results()}</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
          <ScrollArea className={CATALOG_VIEWPORT_CLASS}>
            <div className="space-y-3 p-3 pr-4">
              {filtered.map((skill) => (
                <Link
                  key={skill.name}
                  to="/skills/$skillName"
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
                          {skill.category}
                        </Badge>
                        <Badge
                          variant={
                            skill.invocation === 'user'
                              ? 'default'
                              : 'secondary'
                          }
                          className="text-xs"
                        >
                          {skill.invocation === 'user'
                            ? m.skills_filter_user()
                            : m.skills_filter_model()}
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
        {m.skills_showing({
          count: String(filtered.length),
          total: String(skills.length),
        })}
      </p>
    </section>
  )
}
