import { useState, useEffect } from 'react'
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { RiGithubFill, RiMoonLine, RiSunLine } from '@remixicon/react'
import { Button } from '@/components/ui/button'
import { externalLinkAriaLabel } from '@/lib/external-link'
import { m } from '@/paraglide/messages.js'
import { getLocale, setLocale } from '@/paraglide/runtime.js'

export const Route = createRootRoute({
  component: RootLayout,
})

const navItems = [
  { to: '/', labelKey: 'nav_home' as const, exact: true },
  { to: '/collections', labelKey: 'nav_collections' as const, exact: false },
] as const

const THEME_COLOR_LIGHT = '#ffffff'
const THEME_COLOR_DARK = '#252525'

function readStoredDark(): boolean {
  try {
    const stored = localStorage.getItem('theme')
    // Explicit choice wins; otherwise default to dark (site identity).
    if (stored === 'dark') return true
    if (stored === 'light') return false
  } catch {
    // private mode / blocked storage
  }
  return true
}

function writeStoredTheme(dark: boolean) {
  try {
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  } catch {
    // ignore
  }
}

/** Keep the single theme-color meta aligned with the app theme. */
function syncThemeColor(dark: boolean) {
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) {
    meta.setAttribute('content', dark ? THEME_COLOR_DARK : THEME_COLOR_LIGHT)
  }
}

function RootLayout() {
  const [dark, setDark] = useState(readStoredDark)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    writeStoredTheme(dark)
    syncThemeColor(dark)
  }, [dark])

  useEffect(() => {
    document.documentElement.lang = getLocale()
  }, [])

  const navLabels: Record<string, string> = {
    nav_home: m.nav_home(),
    nav_collections: m.nav_collections(),
  }

  const toggleLocale = () => {
    const current = getLocale()
    setLocale(current === 'id' ? 'en' : 'id', { reload: false })
    window.location.reload()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:shadow-md focus:ring-2 focus:ring-ring/50"
      >
        {m.skip_to_main()}
      </a>

      <header className="fixed top-0 right-0 left-0 z-50 border-b border-border bg-background/80 backdrop-blur safe-top">
        <div className="flex h-14 w-full items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-2 sm:gap-5">
            <Link
              to="/"
              className="inline-flex shrink-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
              aria-label={m.nav_ai_skills_guide()}
            >
              <img
                src="/android-chrome-192x192.png"
                alt=""
                width={28}
                height={28}
                className="size-7 rounded-md transition-[opacity,box-shadow,transform] duration-150 hover:scale-[1.04] hover:opacity-90 hover:ring-2 hover:ring-primary/40"
                decoding="async"
              />
            </Link>

            <nav
              className="flex items-center gap-1"
              aria-label={m.nav_primary()}
            >
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  activeOptions={{ exact: item.exact }}
                  className="rounded-lg px-2.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 sm:px-3"
                  activeProps={{
                    className:
                      'rounded-lg px-2.5 py-1.5 text-sm font-medium text-foreground bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 sm:px-3',
                  }}
                >
                  {navLabels[item.labelKey]}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex shrink-0 items-center gap-1">
            <a
              href="https://github.com/StevanusPangau/ai-skills-guide"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
              aria-label={externalLinkAriaLabel(m.github_repo())}
            >
              <RiGithubFill className="size-5" aria-hidden="true" />
            </a>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDark((d) => !d)}
              aria-label={m.toggle_dark_mode()}
            >
              {dark ? (
                <RiSunLine aria-hidden="true" />
              ) : (
                <RiMoonLine aria-hidden="true" />
              )}
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
