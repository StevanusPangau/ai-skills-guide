import { createFileRoute } from '@tanstack/react-router'
import { CollectionGuideLayout } from '@/components/layout/collection-guide-layout'
import {
  JakubOverview,
  JakubCatalog,
} from '@/features/jakubkrehel/guide'
import { JakubLab } from '@/features/jakubkrehel/lab'
import { jakubkrehelSkills } from '@/data/jakubkrehel-skills'
import { m } from '@/paraglide/messages.js'

export const Route = createFileRoute('/jakubkrehel')({
  component: JakubPage,
})

function JakubPage() {
  const sections = [
    { id: 'overview', label: m.jakub_sidebar_overview() },
    { id: 'lab', label: m.jakub_sidebar_lab() },
    {
      id: 'skills',
      label: m.jakub_sidebar_skills({ count: String(jakubkrehelSkills.length) }),
    },
  ]

  return (
    <CollectionGuideLayout
      sections={sections}
      stats={m.jakub_sidebar_stats()}
      footer={<p className="text-center text-xs text-muted-foreground">{m.jakub_footer()}</p>}
    >
      <JakubOverview />
      <JakubLab />
      <JakubCatalog />
    </CollectionGuideLayout>
  )
}
