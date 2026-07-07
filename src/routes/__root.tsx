import { useState, useEffect } from 'react'
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { RiMoonLine, RiSunLine } from '@remixicon/react'
import { Button } from '@/components/ui/button'

export const Route = createRootRoute({
  component: RootLayout,
})

const navItems = [
  { to: '/', label: 'Home', exact: true },
  { to: '/mattpocock', label: 'Matt Pocock', exact: false },
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

  return (
    <div className="flex min-h-screen flex-col">
      <header className="fixed top-0 right-0 left-0 z-50 h-14 border-b border-border bg-background/80 backdrop-blur">
        <div className="flex h-full items-center justify-between px-4">
          <div className="flex items-center gap-5">
            <Link
              to="/"
              className="font-heading text-sm font-bold tracking-tight transition-colors hover:text-primary"
            >
              AI Skills Guide
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
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setDark(!dark)}
            aria-label="Toggle dark mode"
          >
            {dark ? <RiSunLine /> : <RiMoonLine />}
          </Button>
        </div>
      </header>

      <Outlet />
    </div>
  )
}
