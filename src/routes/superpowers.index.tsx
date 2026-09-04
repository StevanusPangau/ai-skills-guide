import { useMemo } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { CollectionGuideLayout } from '@/components/layout/collection-guide-layout'
import {
  SuperpowersOverview,
} from '@/features/superpowers/guide'
import { SuperpowersFlow } from '@/features/superpowers/flow'
import { SuperpowersConcepts } from '@/features/superpowers/concepts'
import { SuperpowersSimulator } from '@/features/superpowers/simulator'
import { SuperpowersInstall } from '@/features/superpowers/install'
import { StandardSkillsSection } from '@/components/standard-skills-section'
import { superpowersSkills } from '@/data/superpowers-skills'
import { m } from '@/paraglide/messages.js'

export const Route = createFileRoute('/superpowers/')({
  component: SuperpowersIndexPage,
})

function SuperpowersIndexPage() {
  const sections = useMemo(
    () => [
      { id: 'overview', label: m.superpowers_sidebar_overview() },
      { id: 'flow', label: m.sidebar_flow_title() },
      { id: 'concepts', label: m.sidebar_concepts() },
      { id: 'sdd', label: m.superpowers_sidebar_sdd() },
      {
        id: 'skills',
        label: m.superpowers_sidebar_skills({ count: String(superpowersSkills.length) }),
      },
      { id: 'installation', label: m.sidebar_installation() },
    ],
    [],
  )

  const categories = [
    { label: 'Planning', value: 'planning' },
    { label: 'Subagent Execution', value: 'execution' },
    { label: 'Quality & Review', value: 'quality' },
    { label: 'Meta', value: 'meta' },
  ]

  return (
    <CollectionGuideLayout
      sections={sections}
      stats={m.superpowers_sidebar_stats()}
      footer={<p className="text-center text-xs text-muted-foreground">{m.superpowers_footer()}</p>}
    >
      <SuperpowersOverview />
      <SuperpowersFlow />
      <SuperpowersConcepts />
      <SuperpowersSimulator />
      <StandardSkillsSection
        collectionSlug="superpowers"
        skills={superpowersSkills}
        categories={categories}
        title={m.superpowers_catalog_title({ count: String(superpowersSkills.length) })}
        description={m.superpowers_catalog_desc()}
        repoUrl="github.com/obra/superpowers"
      />
      <SuperpowersInstall />
    </CollectionGuideLayout>
  )
}
