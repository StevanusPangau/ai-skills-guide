import { createFileRoute } from '@tanstack/react-router'
import { CollectionGuideLayout } from '@/components/layout/collection-guide-layout'
import {
  SuperpowersOverview,
  SuperpowersCatalog,
} from '@/features/superpowers/guide'
import { SuperpowersSimulator } from '@/features/superpowers/simulator'
import { superpowersSkills } from '@/data/superpowers-skills'
import { m } from '@/paraglide/messages.js'

export const Route = createFileRoute('/superpowers')({
  component: SuperpowersPage,
})

function SuperpowersPage() {
  const sections = [
    { id: 'overview', label: m.superpowers_sidebar_overview() },
    { id: 'sdd', label: m.superpowers_sidebar_sdd() },
    {
      id: 'skills',
      label: m.superpowers_sidebar_skills({ count: String(superpowersSkills.length) }),
    },
  ]

  return (
    <CollectionGuideLayout
      sections={sections}
      stats={m.superpowers_sidebar_stats()}
      footer={<p className="text-center text-xs text-muted-foreground">{m.superpowers_footer()}</p>}
    >
      <SuperpowersOverview />
      <SuperpowersSimulator />
      <SuperpowersCatalog />
    </CollectionGuideLayout>
  )
}
