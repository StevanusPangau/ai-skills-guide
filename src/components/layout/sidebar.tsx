import {
  useState,
  useEffect,
  useMemo,
  useRef,
  type RefObject,
} from 'react'
import { useNavigate } from '@tanstack/react-router'
import { m } from '@/paraglide/messages.js'
import {
  navigateToSection,
  SCROLL_SPY_TRIGGER,
} from '@/lib/scroll-to-section'

export type SidebarSection = {
  id: string
  label: string
}

interface SidebarProps {
  open: boolean
  onClose: () => void
  sections: SidebarSection[]
  subtitle: string
  stats: string
  /** Element to restore focus to when the mobile drawer closes (e.g. FAB). */
  returnFocusRef?: RefObject<HTMLElement | null>
}

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function Sidebar({
  open,
  onClose,
  sections,
  subtitle,
  stats,
  returnFocusRef,
}: SidebarProps) {
  const navigate = useNavigate()
  const [active, setActive] = useState<string>(sections[0]?.id ?? '')
  const asideRef = useRef<HTMLElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const sectionIdsKey = useMemo(
    () => sections.map((s) => s.id).join('|'),
    [sections],
  )

  // Scroll-spy: rAF-throttled so we don’t setState on every scroll pixel.
  useEffect(() => {
    const ids = sectionIdsKey.split('|').filter(Boolean)
    if (ids.length === 0) return

    let raf = 0
    const measure = () => {
      raf = 0
      let current = ids[0] ?? ''
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= SCROLL_SPY_TRIGGER) {
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
  }, [sectionIdsKey])

  // Mobile drawer: Escape, focus trap, focus first link, restore focus on close.
  useEffect(() => {
    if (!open) return

    const previous =
      (document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null) ?? null
    const returnTarget = returnFocusRef?.current ?? null

    const firstLink = navRef.current?.querySelector<HTMLElement>('a[href^="#"]')
    const focusTimer = window.setTimeout(() => firstLink?.focus(), 0)

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }

      if (e.key !== 'Tab') return

      const root = asideRef.current
      if (!root) return

      const focusable = Array.from(
        root.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => !el.hasAttribute('disabled') && el.tabIndex !== -1)

      if (focusable.length === 0) return

      const first = focusable[0]!
      const last = focusable[focusable.length - 1]!

      if (e.shiftKey) {
        if (
          document.activeElement === first ||
          !root.contains(document.activeElement)
        ) {
          e.preventDefault()
          last.focus()
        }
      } else if (
        document.activeElement === last ||
        !root.contains(document.activeElement)
      ) {
        e.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.clearTimeout(focusTimer)
      window.removeEventListener('keydown', onKeyDown)
      const restore = returnTarget ?? previous
      if (restore && document.contains(restore)) {
        restore.focus()
      }
    }
  }, [open, onClose, returnFocusRef])

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
    e.preventDefault()
    setActive(id)
    onClose()
    void navigateToSection(navigate, id)
  }

  return (
    <>
      {open ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          aria-label={m.close_navigation()}
          onClick={onClose}
        />
      ) : null}

      <aside
        ref={asideRef}
        className={`
          fixed top-14 left-0 z-40 h-[calc(100vh-3.5rem)] w-64 border-r border-border bg-background
          transform transition-transform duration-200 ease-in-out
          safe-left
          lg:sticky lg:top-14 lg:h-[calc(100vh-3.5rem)] lg:translate-x-0
          ${open ? 'translate-x-0' : '-translate-x-full'}
        `}
        role={open ? 'dialog' : undefined}
        aria-modal={open ? true : undefined}
        aria-label={open ? m.section_navigation() : undefined}
      >
        <div className="flex h-full flex-col p-6">
          <div className="mb-8">
            <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
          </div>

          <nav
            ref={navRef}
            className="flex-1 space-y-1"
            aria-label={m.nav_sections()}
          >
            {sections.map((section) => {
              const isActive = active === section.id
              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={(e) => handleNavClick(e, section.id)}
                  className={`flex h-9 w-full items-center justify-start rounded-lg border-l-2 px-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 ${
                    isActive
                      ? 'border-primary bg-secondary font-medium text-foreground'
                      : 'border-transparent font-normal text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                  aria-current={isActive ? 'location' : undefined}
                >
                  {section.label}
                </a>
              )
            })}
          </nav>

          <div className="border-t border-border pt-4">
            <p className="text-xs text-muted-foreground">{stats}</p>
          </div>
        </div>
      </aside>
    </>
  )
}
