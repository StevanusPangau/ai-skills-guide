import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Sidebar } from '@/components/layout/sidebar'
import { Overview } from '@/features/overview'
import { MainFlow } from '@/features/main-flow'
import { SkillsSection } from '@/features/skills/skills-section'
import { Workflows } from '@/features/workflows'
import { Concepts } from '@/features/concepts'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { useDocumentTitle } from '@/lib/use-document-title'

export const Route = createFileRoute('/mattpocock')({
  component: MattPocockPage,
})

function MattPocockPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  useDocumentTitle('Matt Pocock')

  return (
    <div className="flex flex-1 pt-14">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Mobile sidebar toggle */}
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-4 left-4 z-30 lg:hidden shadow-md"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open navigation"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 5h14M3 10h14M3 15h14" />
        </svg>
      </Button>

      <main className="flex-1 min-w-0">
        <div className="max-w-3xl mx-auto px-6 py-12 space-y-16">
          <Overview />
          <Separator />
          <MainFlow />
          <Separator />
          <SkillsSection />
          <Separator />
          <Workflows />
          <Separator />
          <Concepts />

          <footer className="pt-8 pb-4 border-t border-border">
            <p className="text-xs text-muted-foreground text-center">
              Berdasarkan sistem AI Skills dari Matt Pocock. Panduan referensi.
            </p>
          </footer>
        </div>
      </main>
    </div>
  )
}
