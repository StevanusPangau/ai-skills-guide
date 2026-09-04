import { useMemo } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { CollectionGuideLayout } from '@/components/layout/collection-guide-layout'
import {
  JakubOverview,
} from '@/features/jakubkrehel/guide'
import { JakubFlow } from '@/features/jakubkrehel/flow'
import { JakubConcepts } from '@/features/jakubkrehel/concepts'
import { JakubLab } from '@/features/jakubkrehel/lab'
import { JakubInstall } from '@/features/jakubkrehel/install'
import { StandardSkillsSection } from '@/components/standard-skills-section'
import { jakubkrehelSkills } from '@/data/jakubkrehel-skills'
import { m } from '@/paraglide/messages.js'

export const Route = createFileRoute('/jakubkrehel/')({
  component: JakubIndexPage,
})

function JakubIndexPage() {
  const sections = useMemo(
    () => [
      { id: 'overview', label: m.jakub_sidebar_overview() },
      { id: 'flow', label: m.sidebar_flow_title() },
      { id: 'concepts', label: m.sidebar_concepts() },
      { id: 'lab', label: m.jakub_sidebar_lab() },
      {
        id: 'skills',
        label: m.jakub_sidebar_skills({ count: String(jakubkrehelSkills.length) }),
      },
      { id: 'installation', label: m.sidebar_installation() },
    ],
    [],
  )

  const categories = [
    { label: 'Visual UI', value: 'visual' },
    { label: 'Typography', value: 'typography' },
    { label: 'Color Tokens', value: 'color' },
    { label: 'Accessibility', value: 'accessibility' },
    { label: 'Engineering', value: 'engineering' },
  ]

  return (
    <CollectionGuideLayout
      sections={sections}
      stats={m.jakub_sidebar_stats()}
      footer={<p className="text-center text-xs text-muted-foreground">{m.jakub_footer()}</p>}
    >
      <JakubOverview />
      <JakubFlow />
      <JakubConcepts />
      <JakubLab />
      <StandardSkillsSection
        collectionSlug="jakubkrehel"
        skills={jakubkrehelSkills}
        categories={categories}
        title={m.jakub_catalog_title({ count: String(jakubkrehelSkills.length) })}
        description={m.jakub_catalog_desc()}
        repoUrl="github.com/jakubkrehel/skills"
      />
      <JakubInstall />
    </CollectionGuideLayout>
  )
}
