import { useMemo, useState } from 'react'
import { Link } from '@tanstack/react-router'
import type { LinkProps } from '@tanstack/react-router'
import { RiAddLine } from '@remixicon/react'
import { AuthorAvatar } from '@/components/author-avatar'
import { SkillsGuideWordmark } from '@/components/skills-guide-wordmark'
import { collections } from '@/data/collections'
import { m } from '@/paraglide/messages.js'

export function Landing() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return collections
    return collections.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.author.toLowerCase().includes(q) ||
        (c.source?.toLowerCase().includes(q) ?? false) ||
        c.tags.some((t) => t.toLowerCase().includes(q)),
    )
  }, [query])

  return (
    <main
      id="main-content"
      className="min-w-0 flex-1 bg-background pt-14 text-foreground"
    >
      {/* Hero: row 1 = wordmark (one line), row 2 = description */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="flex flex-col gap-8 lg:gap-10">
            <div className="min-w-0">
              <h1 className="sr-only">
                {m.hero_wordmark_skills()} {m.hero_wordmark_guide()}
              </h1>
              <SkillsGuideWordmark
                label={`${m.hero_wordmark_skills()} ${m.hero_wordmark_guide()}`}
              />
              <p className="mt-3 font-mono text-[15px] font-medium tracking-tight text-foreground uppercase lg:text-[19px]">
                {m.hero_eyebrow()}
              </p>
            </div>

            <p className="max-w-3xl text-xl leading-tight tracking-tight text-pretty text-muted-foreground sm:text-2xl lg:text-3xl">
              {m.hero_description()}
            </p>
          </div>
        </div>
      </section>

      {/* Collections catalog — leaderboard-style list */}
      <section
        id="collections"
        className="mx-auto max-w-6xl scroll-mt-20 px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
      >
        <div className="mb-6">
          <h2 className="text-[11px] font-medium tracking-[0.18em] text-muted-foreground uppercase">
            {m.collections_catalog_title()}
          </h2>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            {m.collections_description()}
          </p>
        </div>

        <div className="relative mb-6">
          <label className="sr-only" htmlFor="landing-collection-search">
            {m.skills_search_placeholder()}
          </label>
          <span
            className="pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3-3" />
            </svg>
          </span>
          <input
            id="landing-collection-search"
            type="search"
            name="collection-search"
            autoComplete="off"
            spellCheck={false}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={m.skills_search_placeholder()}
            className="w-full rounded-none border-0 border-b border-border bg-transparent py-3 pr-3 pl-7 text-sm text-foreground placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          />
        </div>

        <div className="mb-1 hidden grid-cols-[2.5rem_minmax(0,1.4fr)_minmax(0,1fr)_5.5rem] gap-3 border-b border-border px-1 pb-2 text-[11px] font-medium tracking-wider text-muted-foreground uppercase sm:grid">
          <span>{m.collections_col_rank()}</span>
          <span>{m.collections_col_name()}</span>
          <span>{m.collections_col_source()}</span>
          <span className="text-right">{m.collections_col_skills()}</span>
        </div>

        <ul className="divide-y divide-border border-b border-border">
          {filtered.map((c, index) => {
            const available = c.status === 'available' && c.to
            const rank = String(index + 1)

            const rowClass = `group grid grid-cols-1 gap-2 rounded-sm px-1 py-4 transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 sm:grid-cols-[2.5rem_minmax(0,1.4fr)_minmax(0,1fr)_5.5rem] sm:items-center sm:gap-3 ${
              available ? 'cursor-pointer' : 'opacity-60'
            }`

            const body = (
              <>
                <span className="font-mono text-xs text-muted-foreground tabular-nums">
                  {rank}
                </span>
                <div className="flex min-w-0 items-center gap-3">
                  {c.avatarSrc ? (
                    <AuthorAvatar
                      src={c.avatarSrc}
                      name={c.author}
                      size="sm"
                    />
                  ) : null}
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-foreground transition-colors group-hover:text-primary">
                      {c.author}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-muted-foreground">
                      {c.title}
                      {c.xHandle ? (
                        <span className="text-muted-foreground/75">
                          {' '}
                          · @{c.xHandle}
                        </span>
                      ) : null}
                    </p>
                  </div>
                </div>
                <p className="truncate font-mono text-xs text-muted-foreground">
                  {c.source ?? '—'}
                </p>
                <p className="text-left font-mono text-sm text-foreground tabular-nums sm:text-right">
                  {c.status === 'available' ? (
                    c.skillCount
                  ) : (
                    <span className="text-muted-foreground">
                      {m.collections_coming_soon()}
                    </span>
                  )}
                </p>
              </>
            )

            if (available && c.to) {
              return (
                <li key={c.slug}>
                  <Link
                    to={c.to as LinkProps['to']}
                    className={rowClass}
                  >
                    {body}
                  </Link>
                </li>
              )
            }

            return (
              <li key={c.slug} className={rowClass}>
                {body}
              </li>
            )
          })}

          <li className="flex items-center gap-3 px-1 py-5 text-muted-foreground">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-dashed border-border">
              <RiAddLine className="size-4" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {m.collections_next_title()}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground/80">
                {m.collections_next_description()}
              </p>
            </div>
          </li>
        </ul>

        {filtered.length === 0 && (
          <p className="py-10 text-center text-sm text-muted-foreground">
            {m.skills_no_results()}
          </p>
        )}
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-center text-xs text-muted-foreground">
            {m.footer_attribution()}
          </p>
        </div>
      </footer>
    </main>
  )
}
