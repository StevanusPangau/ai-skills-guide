import { createFileRoute } from '@tanstack/react-router'
import { CollectionGuideLayout } from '@/components/layout/collection-guide-layout'
import {
  BrooklynOverview,
  BrooklynCatalog,
} from '@/features/brooklyn/guide'
import { BrooklynScanner } from '@/features/brooklyn/scanner'
import { brooklynSkills } from '@/data/brooklyn-skills'
import { m } from '@/paraglide/messages.js'

export const Route = createFileRoute('/brooklyn')({
  component: BrooklynPage,
})

function BrooklynPage() {
  const sections = [
    { id: 'overview', label: m.brooklyn_sidebar_overview() },
    { id: 'scanner', label: m.brooklyn_sidebar_scanner() },
    {
      id: 'skills',
      label: m.brooklyn_sidebar_skills({ count: String(brooklynSkills.length) }),
    },
  ]

  return (
    <CollectionGuideLayout
      sections={sections}
      stats={m.brooklyn_sidebar_stats()}
      footer={<p className="text-center text-xs text-muted-foreground">{m.brooklyn_footer()}</p>}
    >
      <BrooklynOverview />
      <BrooklynScanner />
      <BrooklynCatalog />
    </CollectionGuideLayout>
  )
}
