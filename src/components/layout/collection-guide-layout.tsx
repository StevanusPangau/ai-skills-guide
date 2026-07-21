import { useRef, useState, type ReactNode } from 'react'
import { Sidebar, type SidebarSection } from '@/components/layout/sidebar'
import { Button } from '@/components/ui/button'
import { m } from '@/paraglide/messages.js'

type CollectionGuideLayoutProps = {
  sections: SidebarSection[]
  subtitle: string
  stats: string
  footer: ReactNode
  children: ReactNode
}

export function CollectionGuideLayout({
  sections,
  subtitle,
  stats,
  footer,
  children,
}: CollectionGuideLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const fabRef = useRef<HTMLButtonElement>(null)

  return (
    <div className="flex flex-1 pt-14">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        sections={sections}
        subtitle={subtitle}
        stats={stats}
        returnFocusRef={fabRef}
      />

      <Button
        ref={fabRef}
        variant="outline"
        size="icon"
        className="fixed bottom-4 left-4 z-30 shadow-md safe-fab lg:hidden"
        onClick={() => setSidebarOpen(true)}
        aria-label={m.open_navigation()}
        aria-expanded={sidebarOpen}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M3 5h14M3 10h14M3 15h14" />
        </svg>
      </Button>

      <main id="main-content" className="min-w-0 flex-1">
        <div className="mx-auto max-w-3xl space-y-16 px-6 py-12">
          {children}
          <footer className="border-t border-border pt-8 pb-4">{footer}</footer>
        </div>
      </main>
    </div>
  )
}
