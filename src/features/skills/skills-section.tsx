import { useMemo, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { SkillDetailBody } from '@/features/skills/skill-detail'
import { skills } from '@/data/skills'
import type { Skill } from '@/types/skill'
import { m } from '@/paraglide/messages.js'

const CATALOG_VIEWPORT_CLASS = 'h-[28rem] sm:h-[30rem]'

type Filter = 'all' | 'engineering' | 'productivity' | 'user' | 'model'

export function SkillsSection() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<Filter>('all')
  const [active, setActive] = useState<Skill | null>(null)

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
    { label: 'Engineering', value: 'engineering' },
    { label: 'Productivity', value: 'productivity' },
    { label: 'User-invoked', value: 'user' },
    { label: 'Model-invoked', value: 'model' },
  ]

  return (
    <section id="skills" className="scroll-mt-20 space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{m.skills_title()}</h2>
        <p className="mt-1 text-muted-foreground">{m.skills_description()}</p>
      </div>

      <div className="space-y-3">
        <Input
          type="search"
          placeholder={m.skills_search_placeholder()}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
          aria-label={m.skills_search_placeholder()}
        />
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <Badge
              key={f.value}
              variant={filter === f.value ? 'default' : 'outline'}
              className="cursor-pointer transition-colors"
              onClick={() => setFilter(f.value)}
            >
              {f.label}
            </Badge>
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
                <button
                  key={skill.name}
                  type="button"
                  onClick={() => setActive(skill)}
                  className="w-full rounded-lg border border-border bg-background px-4 py-3.5 text-left transition-colors hover:border-primary/40 hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-sm font-semibold">
                      /{skill.name}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {skill.category}
                    </Badge>
                    <Badge
                      variant={skill.invocation === 'user' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {skill.invocation}-invoked
                    </Badge>
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {skill.description}
                  </p>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}

      <p className="text-xs text-muted-foreground">
        {m.skills_showing({
          count: String(filtered.length),
          total: String(skills.length),
        })}
      </p>

      <Dialog
        open={active != null}
        onOpenChange={(open) => {
          if (!open) setActive(null)
        }}
      >
        <DialogContent
          className="max-h-[min(90vh,40rem)] gap-4 overflow-y-auto sm:max-w-2xl"
          showCloseButton
        >
          {active && (
            <>
              <DialogHeader>
                <DialogTitle className="font-mono text-lg">
                  /{active.name}
                </DialogTitle>
                <DialogDescription className="sr-only">
                  {active.description}
                </DialogDescription>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <Badge variant="outline" className="text-xs">
                    {active.category}
                  </Badge>
                  <Badge
                    variant={active.invocation === 'user' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {active.invocation}-invoked
                  </Badge>
                </div>
              </DialogHeader>
              <SkillDetailBody skill={active} />
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
