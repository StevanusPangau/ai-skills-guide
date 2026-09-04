import { useMemo, useState } from 'react'
import { AuthorAvatar } from '@/components/author-avatar'
import { Badge } from '@/components/ui/badge'
import { FilterChip } from '@/components/filter-chip'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { getCollectionBySlug } from '@/data/collections'
import { RiGithubFill } from '@remixicon/react'

const CATALOG_VIEWPORT_CLASS = 'h-[28rem] sm:h-[30rem]'

export type GenericSkillItem = {
  name: string
  description: string
  category: string
  invocation: 'user' | 'model'
  useWhen?: string[]
  avoidWhen?: string[]
  coreRules?: string[]
  sourcePath?: string
}

type Props = {
  collectionSlug: string
  skills: GenericSkillItem[]
  categories: { label: string; value: string }[]
  title: string
  description: string
  repoUrl: string
}

export function StandardSkillsSection({
  collectionSlug,
  skills,
  categories,
  title,
  description,
  repoUrl,
}: Props) {
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState<string>('all')
  const author = getCollectionBySlug(collectionSlug)

  const filtered = useMemo(() => {
    return skills.filter((skill) => {
      const q = search.trim().toLowerCase()
      const matchesSearch =
        !q ||
        skill.name.toLowerCase().includes(q) ||
        skill.description.toLowerCase().includes(q) ||
        (skill.useWhen && skill.useWhen.some((u) => u.toLowerCase().includes(q))) ||
        (skill.coreRules && skill.coreRules.some((r) => r.toLowerCase().includes(q)))

      const matchesFilter =
        activeFilter === 'all' ||
        skill.category === activeFilter ||
        skill.invocation === activeFilter

      return matchesSearch && matchesFilter
    })
  }, [skills, search, activeFilter])

  const allFilters = [
    { label: 'Semua', value: 'all' },
    ...categories,
    { label: 'User-invoked', value: 'user' },
    { label: 'Model-invoked', value: 'model' },
  ]

  return (
    <section id="skills" className="scroll-mt-20 space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-balance">
          {title}
        </h2>
        <p className="mt-1 text-muted-foreground">{description}</p>
      </div>

      <div className="space-y-3">
        <Input
          type="search"
          name="skill-search"
          autoComplete="off"
          spellCheck={false}
          placeholder={`Cari dari ${skills.length} skills...`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
          aria-label="Cari skill"
        />
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Filter kategori skill"
        >
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
          <p className="text-sm text-muted-foreground">
            Tidak ada skill yang cocok dengan kriteria pencarian.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
          <ScrollArea className={CATALOG_VIEWPORT_CLASS}>
            <div className="space-y-3 p-3 pr-4">
              {filtered.map((skill) => (
                <div
                  key={skill.name}
                  className="block w-full rounded-lg border border-border bg-background px-4 py-3.5 text-left transition-colors hover:border-primary/40 hover:bg-muted/40"
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
                            /{skill.name}
                          </span>
                          <Badge variant="outline" className="text-xs uppercase font-mono">
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
                              ? 'User-invoked'
                              : 'Model-invoked'}
                          </Badge>
                        </div>
                        {skill.sourcePath ? (
                          <a
                            href={`https://${repoUrl}/tree/main/${skill.sourcePath}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                          >
                            <RiGithubFill className="size-3.5" />
                            <span>SKILL.md ↗</span>
                          </a>
                        ) : null}
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {skill.description}
                      </p>
                      {skill.coreRules && skill.coreRules.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5 border-t border-border/50 pt-2">
                          {skill.coreRules.slice(0, 2).map((rule, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-[11px] text-muted-foreground"
                            >
                              • {rule}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}

      <p
        className="text-xs text-muted-foreground tabular-nums"
        aria-live="polite"
      >
        Menampilkan {filtered.length} dari {skills.length} skills
      </p>
    </section>
  )
}
