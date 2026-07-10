import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Sidebar } from '@/components/layout/sidebar'
import { DavidOverview } from '@/features/davidondrej/overview'
import { DavidMainFlow } from '@/features/davidondrej/main-flow'
import { DavidCatalog } from '@/features/davidondrej/catalog'
import { DavidWorkflows } from '@/features/davidondrej/workflows'
import { DavidConcepts } from '@/features/davidondrej/concepts'
import { DavidInstall } from '@/features/davidondrej/install'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { useDocumentTitle } from '@/lib/use-document-title'
import { m } from '@/paraglide/messages.js'

export const Route = createFileRoute('/davidondrej/')({
  component: DavidPage,
})

function DavidPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  useDocumentTitle('David Ondrej')

  const sections = [
    { id: 'overview', label: m.david_sidebar_overview() },
    { id: 'flow', label: m.david_sidebar_flow() },
    { id: 'catalog', label: m.david_sidebar_skills() },
    { id: 'workflows', label: m.david_sidebar_workflows() },
    { id: 'concepts', label: m.david_sidebar_concepts() },
    { id: 'installation', label: m.david_sidebar_installation() },
  ]

  return (
    <div className="flex flex-1 pt-14">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        sections={sections}
        subtitle={m.david_sidebar_subtitle()}
        stats={m.david_sidebar_stats()}
      />

      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-4 left-4 z-30 shadow-md lg:hidden"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open navigation"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M3 5h14M3 10h14M3 15h14" />
        </svg>
      </Button>

      <main className="min-w-0 flex-1">
        <div className="mx-auto max-w-3xl space-y-16 px-6 py-12">
          <DavidOverview />
          <Separator />
          <DavidMainFlow />
          <Separator />
          <DavidCatalog />
          <Separator />
          <DavidWorkflows />
          <Separator />
          <DavidConcepts />
          <Separator />
          <DavidInstall />

          <footer className="border-t border-border pt-8 pb-4">
            <p className="text-center text-xs text-muted-foreground">
              {m.david_footer()}
            </p>
          </footer>
        </div>
      </main>
    </div>
  )
}
