import { useMemo } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { CollectionGuideLayout } from '@/components/layout/collection-guide-layout'
import {
  BrooklynOverview,
} from '@/features/brooklyn/guide'
import { BrooklynFlow } from '@/features/brooklyn/flow'
import { BrooklynScanner } from '@/features/brooklyn/scanner'
import { StandardSkillsSection } from '@/components/standard-skills-section'
import { brooklynSkills } from '@/data/brooklyn-skills'
import { m } from '@/paraglide/messages.js'

export const Route = createFileRoute('/brooklyn')({
  component: BrooklynPage,
})

function BrooklynPage() {
  const sections = useMemo(
    () => [
      { id: 'overview', label: m.brooklyn_sidebar_overview() },
      { id: 'flow', label: m.sidebar_flow_title() },
      { id: 'scanner', label: m.brooklyn_sidebar_scanner() },
      {
        id: 'skills',
        label: m.brooklyn_sidebar_skills({ count: String(brooklynSkills.length) }),
      },
    ],
    [],
  )

  const categories = [
    { label: 'PR Lifecycle', value: 'pr-lifecycle' },
    { label: 'Quality & Audit', value: 'quality' },
    { label: 'System & Tooling', value: 'system' },
  ]

  return (
    <CollectionGuideLayout
      sections={sections}
      stats={m.brooklyn_sidebar_stats()}
      footer={<p className="text-center text-xs text-muted-foreground">{m.brooklyn_footer()}</p>}
    >
      <BrooklynOverview />
      <BrooklynFlow />
      <BrooklynScanner />
      <StandardSkillsSection
        collectionSlug="brooklyn"
        skills={brooklynSkills}
        categories={categories}
        title={m.brooklyn_catalog_title({ count: String(brooklynSkills.length) })}
        description={m.brooklyn_catalog_desc()}
        repoUrl="github.com/OutThisLife/brooklyn-skills"
      />
    </CollectionGuideLayout>
  )
}
