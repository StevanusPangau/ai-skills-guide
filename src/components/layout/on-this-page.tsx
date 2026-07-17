import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import {
  navigateToSection,
  scrollToSection,
  SCROLL_SPY_TRIGGER,
} from '@/lib/scroll-to-section'
import { m } from '@/paraglide/messages.js'

export type OnThisPageItem = { id: string; label: string }

/**
 * Sticky right-rail TOC for skill detail pages.
 * Motion: native smooth scroll via `navigateToSection` (router hash update
 * with scroll restoration disabled — see `scroll-to-section.ts`).
 */
export function OnThisPage({ items }: { items: OnThisPageItem[] }) {
  const navigate = useNavigate()
  const [active, setActive] = useState(items[0]?.id ?? '')
  const idsKey = useMemo(() => items.map((i) => i.id).join('|'), [items])

  useEffect(() => {
    setActive(idsKey.split('|')[0] ?? '')
  }, [idsKey])

  // Scroll-spy: rAF-throttled (one measure per frame max).
  useEffect(() => {
    const ids = idsKey.split('|').filter(Boolean)
    if (ids.length === 0) return

    let raf = 0
    const measure = () => {
      raf = 0
      let current = ids[0] ?? ''
      for (const id of ids) {
        const node = document.getElementById(id)
        if (node && node.getBoundingClientRect().top <= SCROLL_SPY_TRIGGER) {
          current = id
        }
      }
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 4
      ) {
        current = ids[ids.length - 1] ?? current
      }
      setActive((prev) => (prev === current ? prev : current))
    }

    const onScrollOrResize = () => {
      if (raf) return
      raf = window.requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', onScrollOrResize, { passive: true })
    window.addEventListener('resize', onScrollOrResize, { passive: true })
    return () => {
      if (raf) window.cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScrollOrResize)
      window.removeEventListener('resize', onScrollOrResize)
    }
  }, [idsKey])

  // Deep-link on first paint when URL already has a section hash.
  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, '')
    if (!hash) return
    const ids = idsKey.split('|').filter(Boolean)
    if (!ids.includes(hash)) return
    if (!document.getElementById(hash)) return

    const frame = window.requestAnimationFrame(() => {
      scrollToSection(hash)
      setActive(hash)
    })
    return () => window.cancelAnimationFrame(frame)
  }, [idsKey])

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0)
      return
    e.preventDefault()
    setActive(id)
    void navigateToSection(navigate, id)
  }

  if (items.length < 2) return null

  return (
    <nav
      aria-label={m.skill_detail_on_this_page()}
      className="hidden xl:block"
    >
      <p className="mb-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        {m.skill_detail_on_this_page()}
      </p>
      <ul className="space-y-1 border-l border-border">
        {items.map((item) => {
          const isActive = active === item.id
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className={`-ml-px block border-l-2 py-1.5 pl-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 ${
                  isActive
                    ? 'border-primary font-medium text-foreground'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
                aria-current={isActive ? 'location' : undefined}
              >
                {item.label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
