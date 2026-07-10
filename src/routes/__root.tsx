import { useState, useEffect } from 'react'
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { RiGithubFill, RiMoonLine, RiSunLine } from '@remixicon/react'
import { Button } from '@/components/ui/button'
import { m } from '@/paraglide/messages.js'
import { getLocale, setLocale } from '@/paraglide/runtime.js'

export const Route = createRootRoute({
  component: RootLayout,
})

const navItems = [
  { to: '/', labelKey: 'nav_home' as const, exact: true },
  { to: '/mattpocock', labelKey: 'nav_matt_pocock' as const, exact: false },
  { to: '/davidondrej', labelKey: 'nav_david_ondrej' as const, exact: false },
] as const

function RootLayout() {
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem('theme')
    if (stored) return stored === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  const navLabels: Record<string, string> = {
    nav_home: m.nav_home(),
    nav_matt_pocock: m.nav_matt_pocock(),
    nav_david_ondrej: m.nav_david_ondrej(),
  }

  const toggleLocale = () => {
    const current = getLocale()
    setLocale(current === 'id' ? 'en' : 'id', { reload: false })
    // Force re-render by toggling a dummy state
    window.location.reload()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="fixed top-0 right-0 left-0 z-50 h-14 border-b border-border bg-background/80 backdrop-blur">
        <div className="flex h-full items-center justify-between px-4">
          <div className="flex items-center gap-5">
            <Link
              to="/"
              className="font-heading text-sm font-bold tracking-tight transition-colors hover:text-primary"
            >
              {m.nav_ai_skills_guide()}
            </Link>

            <nav className="flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  activeOptions={{ exact: item.exact }}
                  className="rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  activeProps={{
                    className:
                      'rounded-lg px-3 py-1.5 text-sm font-medium text-foreground bg-muted',
                  }}
                >
                  {navLabels[item.labelKey]}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-1">
            <a
              href="https://github.com/StevanusPangau/ai-skills-guide"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label={m.github_repo()}
            >
              <RiGithubFill className="size-5" />
            </a>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDark(!dark)}
              aria-label={m.toggle_dark_mode()}
            >
              {dark ? <RiSunLine /> : <RiMoonLine />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLocale}
              aria-label={m.toggle_language()}
              title={getLocale() === 'id' ? 'English' : 'Indonesia'}
              className="text-muted-foreground hover:text-foreground"
            >
              <span className="text-xs font-semibold tracking-wide uppercase">
                {getLocale() === 'id' ? 'ID' : 'EN'}
              </span>
            </Button>
          </div>
        </div>
      </header>

      <Outlet />
    </div>
  )
}
