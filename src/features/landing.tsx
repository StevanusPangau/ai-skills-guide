import { Link } from '@tanstack/react-router'
import type { LinkProps } from '@tanstack/react-router'
import { RiArrowRightLine, RiAddLine, RiSparkling2Line } from '@remixicon/react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { collections, availableCollections } from '@/data/collections'
import { m } from '@/paraglide/messages.js'

export function Landing() {
  const totalSkills = availableCollections.reduce((sum, c) => sum + c.skillCount, 0)

  return (
    <main className="flex-1 min-w-0 pt-14">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        {/* Subtle primary glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(55% 55% at 50% -5%, color-mix(in oklch, var(--primary) 22%, transparent) 0%, transparent 70%)',
          }}
        />
        <div className="mx-auto max-w-4xl px-6 py-20 text-center sm:py-28">
          <Badge variant="outline" className="gap-1.5 bg-card/60 backdrop-blur">
            <RiSparkling2Line className="text-primary" />
            {m.hero_badge()}
          </Badge>

          <h1 className="font-heading mt-6 text-4xl font-bold tracking-tight text-balance sm:text-6xl">
            {m.hero_title_prefix()}{' '}
            <span className="bg-gradient-to-r from-chart-2 to-chart-5 bg-clip-text text-transparent dark:from-chart-1 dark:to-chart-3">
              {m.hero_title_highlight()}
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base text-pretty text-muted-foreground sm:text-lg">
            {m.hero_description()}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button
              size="lg"
              render={<Link to="/mattpocock" />}
            >
              {m.hero_cta_explore()}
              <RiArrowRightLine data-icon="inline-end" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              render={<a href="#collections" />}
            >
              {m.hero_cta_collections()}
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            <Stat value={String(availableCollections.length)} label={m.hero_stat_collections()} />
            <Stat value={`${totalSkills}`} label={m.hero_stat_skills()} />
            <Stat value="∞" label={m.hero_stat_composable()} />
          </div>
        </div>
      </section>

      {/* Collections */}
      <section id="collections" className="mx-auto max-w-5xl scroll-mt-20 px-6 py-16 sm:py-20">
        <div className="mb-10 text-center">
          <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
            {m.collections_title()}
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
            {m.collections_description()}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {collections.map((c) => (
            <CollectionCard key={c.slug} collection={c} />
          ))}

          {/* Placeholder invitasi koleksi berikutnya */}
          <div className="flex min-h-[220px] flex-col items-center justify-center rounded-xl border border-dashed border-border p-8 text-center">
            <div className="flex size-11 items-center justify-center rounded-full bg-secondary text-muted-foreground">
              <RiAddLine className="size-5" />
            </div>
            <p className="mt-4 text-sm font-semibold">{m.collections_next_title()}</p>
            <p className="mt-1 max-w-[15rem] text-xs text-muted-foreground">
              {m.collections_next_description()}
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-5xl px-6 py-8">
          <p className="text-center text-xs text-muted-foreground">
            {m.footer_attribution()}
          </p>
        </div>
      </footer>
    </main>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-heading text-2xl font-bold tracking-tight text-foreground">
        {value}
      </span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  )
}

function CollectionCard({ collection: c }: { collection: (typeof collections)[number] }) {
  const available = c.status === 'available'

  const inner = (
    <>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            {c.author}
          </p>
          <h3 className="font-heading mt-1 text-lg font-bold tracking-tight transition-colors group-hover:text-primary">
            {c.title}
          </h3>
        </div>
        {available ? (
          <Badge variant="default" className="shrink-0">
            {c.skillCount} skills
          </Badge>
        ) : (
          <Badge variant="secondary" className="shrink-0">
            {m.collections_coming_soon()}
          </Badge>
        )}
      </div>

      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.description}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {c.tags.map((t) => (
          <Badge key={t} variant="outline">
            {t}
          </Badge>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between">
        {c.source ? (
          <span className="truncate font-mono text-[11px] text-muted-foreground">{c.source}</span>
        ) : (
          <span />
        )}
        {available && (
          <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
            {m.collections_open()}
            <RiArrowRightLine className="size-3.5" />
          </span>
        )}
      </div>
    </>
  )

  const cardClass =
    'group relative flex flex-col rounded-xl bg-card p-6 ring-1 ring-foreground/10 transition-all'

  if (available && c.to) {
    return (
      <Link
        to={c.to as LinkProps['to']}
        className={`${cardClass} hover:ring-primary/40 hover:shadow-md`}
      >
        {inner}
      </Link>
    )
  }

  return <div className={`${cardClass} opacity-70`}>{inner}</div>
}
