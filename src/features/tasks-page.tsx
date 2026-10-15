import { useMemo, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { RiArrowRightLine } from '@remixicon/react'
import { getLocale } from '@/paraglide/runtime.js'
import { m } from '@/paraglide/messages.js'
import { tasks } from '@/data/tasks'

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50'

export function TasksPage() {
  const [query, setQuery] = useState('')
  const isEn = getLocale() === 'en'

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return tasks
    return tasks.filter((task) => {
      const text = [
        task.title.id,
        task.title.en,
        task.summary.id,
        task.summary.en,
        ...task.skills.flatMap((s) => [s.name, s.why.id, s.why.en]),
      ]
        .join(' ')
        .toLowerCase()
      return text.includes(q)
    })
  }, [query])

  return (
    <main id="main-content" className="min-w-0 flex-1 bg-background pt-14 text-foreground">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <nav aria-label={m.nav_breadcrumb()} className="mb-6 text-sm text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link to="/" className={`rounded-sm transition-colors hover:text-foreground ${focusRing}`}>
                {m.nav_home().toLowerCase()}
              </Link>
            </li>
            <li aria-hidden="true" className="text-muted-foreground/60">
              /
            </li>
            <li className="text-muted-foreground">{m.tasks_breadcrumb()}</li>
          </ol>
        </nav>

        <header className="mb-8 max-w-2xl">
          <h1 className="font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            {m.tasks_title()}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
            {m.tasks_description()}
          </p>
        </header>

        <div className="mb-8 max-w-sm">
          <label htmlFor="task-search" className="sr-only">
            {m.tasks_search_label()}
          </label>
          <input
            id="task-search"
            type="search"
            name="task-search"
            autoComplete="off"
            spellCheck={false}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={m.tasks_search_placeholder()}
            className={`w-full border-b border-border bg-transparent py-2 text-sm placeholder:text-muted-foreground/70 ${focusRing}`}
          />
        </div>

        {filtered.length === 0 ? (
          <p className="text-sm text-muted-foreground">{m.tasks_no_results()}</p>
        ) : (
          <div className="grid gap-8 lg:grid-cols-2">
            {filtered.map((task) => (
              <section key={task.id} aria-labelledby={`task-${task.id}`} className="space-y-3">
                <div>
                  <h2 id={`task-${task.id}`} className="text-lg font-semibold tracking-tight text-balance">
                    {isEn ? task.title.en : task.title.id}
                  </h2>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {isEn ? task.summary.en : task.summary.id}
                  </p>
                </div>
                <ul className="divide-y divide-border border-y border-border">
                  {task.skills.map((skill) => (
                    <li key={skill.href}>
                      <Link
                        to={skill.href as '/'}
                        className={`group flex items-start justify-between gap-4 py-3 ${focusRing}`}
                      >
                        <span className="min-w-0">
                          <span className="block font-mono text-sm font-semibold text-foreground">
                            /{skill.name}
                          </span>
                          <span className="mt-0.5 block text-sm leading-relaxed text-muted-foreground">
                            {isEn ? skill.why.en : skill.why.id}
                          </span>
                        </span>
                        <RiArrowRightLine
                          className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-foreground motion-reduce:transition-none"
                          aria-hidden="true"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
