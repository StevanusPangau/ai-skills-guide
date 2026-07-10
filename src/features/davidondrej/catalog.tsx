import { useMemo, useState } from 'react'
import { RiGithubFill } from '@remixicon/react'
import { SkillInstallBlock } from '@/components/skill-install-block'
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
import {
  davidCategoryLabels,
  davidondrejSkills,
  davidSourceUrl,
  type DavidBundleStatus,
  type DavidCategory,
  type DavidCompatibility,
  type DavidInvocation,
  type DavidSkill,
} from '@/data/davidondrej-skills'
import {
  bundleLabel,
  compatibilityLabel,
  invocationLabel,
  riskBadgeClass,
  riskLabel,
} from './badges'
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
  const [active, setActive] = useState<DavidSkill | null>(null)

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
        <h2 className="font-heading text-2xl font-bold tracking-tight">
          {m.david_catalog_title()}
        </h2>
        <p className="mt-1 text-muted-foreground">
          {m.david_catalog_description()}
        </p>
      </div>

      <div className="space-y-3">
        <Input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={m.david_search_placeholder()}
          aria-label={m.david_search_placeholder()}
          className="max-w-sm"
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
          <p className="text-sm text-muted-foreground">{m.david_no_results()}</p>
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
                      {davidCategoryLabels[skill.category]}
                    </Badge>
                    <Badge
                      variant={
                        skill.invocation === 'manual' ? 'default' : 'secondary'
                      }
                      className="text-xs"
                    >
                      {invocationLabel(skill.invocation)}
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
        {m.david_showing({
          count: String(filtered.length),
          total: String(davidondrejSkills.length),
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
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <Badge variant="outline" className="text-xs">
                    {davidCategoryLabels[active.category]}
                  </Badge>
                  <Badge
                    variant={
                      active.invocation === 'manual' ? 'default' : 'secondary'
                    }
                    className="text-xs"
                  >
                    {invocationLabel(active.invocation)}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {compatibilityLabel(active.compatibility)}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {bundleLabel(active.bundleStatus)}
                  </Badge>
                  <span
                    className={`text-xs font-medium ${riskBadgeClass(active.risk)}`}
                  >
                    {riskLabel(active.risk)}
                  </span>
                </div>
              </DialogHeader>

              <div className="space-y-5">
                <p className="text-sm leading-relaxed">{active.description}</p>

                {active.prerequisites && active.prerequisites.length > 0 && (
                  <ModalSection label={m.david_detail_prerequisites()}>
                    <div className="flex flex-wrap gap-1.5">
                      {active.prerequisites.map((item) => (
                        <Badge
                          key={item}
                          variant="outline"
                          className="font-mono text-xs"
                        >
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </ModalSection>
                )}

                {active.dependencies && active.dependencies.length > 0 && (
                  <ModalSection label={m.david_detail_dependencies()}>
                    <div className="flex flex-wrap gap-1.5">
                      {active.dependencies.map((item) => (
                        <Badge
                          key={item}
                          variant="outline"
                          className="font-mono text-xs"
                        >
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </ModalSection>
                )}

                <ModalSection label={m.david_detail_adaptation()}>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {active.adaptationNotes}
                  </p>
                </ModalSection>

                <a
                  href={davidSourceUrl(active.sourcePath)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
                >
                  <RiGithubFill className="size-4" />
                  {m.david_detail_source()}
                </a>

                <SkillInstallBlock
                  source="davidondrej/skills"
                  skillName={active.name}
                />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}

function ModalSection({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div>
      <h4 className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        {label}
      </h4>
      {children}
    </div>
  )
}
