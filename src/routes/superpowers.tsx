import { useMemo } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { CollectionGuideLayout } from '@/components/layout/collection-guide-layout'
import {
  SuperpowersOverview,
} from '@/features/superpowers/guide'
import { SuperpowersFlow } from '@/features/superpowers/flow'
import { SuperpowersSimulator } from '@/features/superpowers/simulator'
import { StandardSkillsSection } from '@/components/standard-skills-section'
import { superpowersSkills } from '@/data/superpowers-skills'
import { m } from '@/paraglide/messages.js'

export const Route = createFileRoute('/superpowers')({
  component: SuperpowersPage,
})

function SuperpowersPage() {
  const sections = useMemo(
    () => [
      { id: 'overview', label: m.superpowers_sidebar_overview() },
      { id: 'flow', label: 'Alur Subagent (SDD)' },
      { id: 'sdd', label: m.superpowers_sidebar_sdd() },
      {
        id: 'skills',
        label: m.superpowers_sidebar_skills({ count: String(superpowersSkills.length) }),
      },
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
      <SuperpowersSimulator />
      <StandardSkillsSection
        collectionSlug="superpowers"
        skills={superpowersSkills}
        categories={categories}
        title={`Semua ${superpowersSkills.length} Skills`}
        description="Katalog lengkap skill SDLC agentic, Subagent-Driven Development (SDD), dan TDD ketat dari Jesse Vincent (obra)."
        repoUrl="github.com/obra/superpowers"
      />
    </CollectionGuideLayout>
  )
}
