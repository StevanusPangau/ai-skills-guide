import { Link } from '@tanstack/react-router'
import type { LinkProps } from '@tanstack/react-router'
import { AuthorAvatar } from '@/components/author-avatar'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { collections } from '@/data/collections'
import { m } from '@/paraglide/messages.js'

/**
 * Collections catalog — card grid inspired by skills.sh/topic,
 * using shadcn Card + theme tokens (not a hard-coded dark surface).
 */
export function CollectionsPage() {
  return (
    <main id="main-content" className="min-w-0 flex-1 bg-background pt-14 text-foreground">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <nav
          aria-label={m.nav_breadcrumb()}
          className="mb-6 text-sm text-muted-foreground"
        >
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link
                to="/"
                className="rounded-sm transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
              >
                {m.nav_home().toLowerCase()}
              </Link>
            </li>
            <li aria-hidden="true" className="text-muted-foreground/60">
              /
            </li>
            <li className="text-muted-foreground">
              {m.collections_page_breadcrumb()}
            </li>
          </ol>
        </nav>

        <header className="mb-10 max-w-2xl">
          <h1 className="font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            {m.collections_page_title()}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
            {m.collections_page_description()}
          </p>
        </header>

        <ul className="grid gap-4 sm:grid-cols-2">
          {collections.map((c) => {
            const available = c.status === 'available' && c.to
            const countLabel = m.collections_page_skills_count({
              count: String(c.skillCount),
            })

            const card = (
              <Card
                className={
                  available
                    ? 'h-full transition-[box-shadow,ring-color] hover:ring-primary/30 hover:shadow-md'
                    : 'h-full opacity-70'
                }
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start gap-3">
                    {c.avatarSrc ? (
                      <AuthorAvatar
                        src={c.avatarSrc}
                        name={c.author}
                        size="md"
                        className="mt-0.5"
                      />
                    ) : null}
                    <div className="min-w-0 flex-1">
                      <CardTitle
                        as="h2"
                        className="text-base font-semibold sm:text-lg"
                      >
                        {c.author}
                      </CardTitle>
                      <p className="mt-0.5 text-sm font-medium text-muted-foreground">
                        {c.title}
                      </p>
                      <CardDescription className="mt-1.5 text-sm leading-relaxed">
                        {c.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="font-mono text-xs text-muted-foreground tabular-nums">
                    {available ? countLabel : m.collections_coming_soon()}
                  </p>
                  {c.author ? (
                    <p className="mt-1.5 flex flex-wrap items-center gap-x-1.5 text-xs text-muted-foreground">
                      {c.xHandle ? (
                        <span className="text-muted-foreground/75">
                          @{c.xHandle}
                        </span>
                      ) : null}
                      {c.source ? (
                        <span className="text-muted-foreground/70">
                          {c.xHandle ? '· ' : ''}
                          {c.source}
                        </span>
                      ) : null}
                    </p>
                  ) : null}
                </CardContent>
              </Card>
            )

            return (
              <li key={c.slug} className="min-w-0 list-none">
                {available && c.to ? (
                  <Link
                    to={c.to as LinkProps['to']}
                    className="block h-full rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                  >
                    {card}
                  </Link>
                ) : (
                  card
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </main>
  )
}
