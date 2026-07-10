import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

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
}

export function Sidebar({ open, onClose, sections, subtitle, stats }: SidebarProps) {
  const [active, setActive] = useState<string>(sections[0]?.id ?? '')

  useEffect(() => {
    const onScroll = () => {
      const trigger = 56 + 96
      let current = sections[0]?.id ?? ''
      for (const s of sections) {
        const el = document.getElementById(s.id)
        if (el && el.getBoundingClientRect().top <= trigger) {
          current = s.id
        }
      }
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 4
      ) {
        current = sections[sections.length - 1]?.id ?? current
      }
      setActive(current)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [sections])

  const handleClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setActive(id)
    onClose()
  }

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-14 left-0 h-[calc(100vh-3.5rem)] w-64 bg-background border-r border-border z-40
          transform transition-transform duration-200 ease-in-out
          lg:translate-x-0 lg:sticky lg:top-14 lg:h-[calc(100vh-3.5rem)]
          ${open ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="mb-8">
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          </div>

          <nav className="space-y-1 flex-1">
            {sections.map((section) => {
              const isActive = active === section.id
              return (
                <Button
                  key={section.id}
                  variant={isActive ? 'secondary' : 'ghost'}
                  className={`w-full justify-start text-sm h-9 border-l-2 transition-colors ${
                    isActive
                      ? 'border-primary font-medium text-foreground'
                      : 'border-transparent font-normal text-muted-foreground'
                  }`}
                  onClick={() => handleClick(section.id)}
                >
                  {section.label}
                </Button>
              )
            })}
          </nav>

          <div className="pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground">{stats}</p>
          </div>
        </div>
      </aside>
    </>
  )
}
