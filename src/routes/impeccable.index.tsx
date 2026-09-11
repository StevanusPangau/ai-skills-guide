import { useMemo } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { CollectionGuideLayout } from '@/components/layout/collection-guide-layout'
import { ImpeccableOverview } from '@/features/impeccable/guide'
import { ImpeccableConcepts } from '@/features/impeccable/concepts'
import { ImpeccableLab } from '@/features/impeccable/lab'
import { ImpeccableWorkflows } from '@/features/impeccable/workflows'
import { ImpeccableInstall } from '@/features/impeccable/install'
import { StandardSkillsSection } from '@/components/standard-skills-section'
import { impeccableSkills } from '@/data/impeccable-skills'
import { m } from '@/paraglide/messages.js'

export const Route = createFileRoute('/impeccable/')({
  component: ImpeccableIndexPage,
})

function ImpeccableIndexPage() {
  const sections = useMemo(
    () => [
      { id: 'overview', label: m.impeccable_sidebar_overview() },
      { id: 'concepts', label: m.sidebar_concepts() },
      { id: 'impeccable-lab', label: m.impeccable_sidebar_lab() },
      {
        id: 'skills',
        label: m.impeccable_sidebar_skills({ count: String(impeccableSkills.length) }),
      },
      { id: 'workflows', label: m.sidebar_workflows() },
      { id: 'installation', label: m.sidebar_installation() },
    ],
    [],
  )

  const categories = [
    { label: 'Project Setup', value: 'project-setup' },
    { label: 'Design Tokens', value: 'design-tokens' },
    { label: 'Component Architecture', value: 'component-architecture' },
    { label: 'Interactive Prototyping', value: 'interactive-prototyping' },
    { label: 'Responsive Design', value: 'responsive-design' },
    { label: 'Motion & Delight', value: 'motion-delight' },
    { label: 'Quality Assurance', value: 'quality-assurance' },
    { label: 'Visual Craft', value: 'visual-craft' },
    { label: 'UX Writing', value: 'ux-writing' },
    { label: 'Color Tokens', value: 'color-tokens' },
    { label: 'Design Review', value: 'design-review' },
    { label: 'Micro Interactions', value: 'micro-interactions' },
    { label: 'Robustness', value: 'robustness' },
    { label: 'Spacing & Typography', value: 'spacing-typography' },
    { label: 'Performance', value: 'performance' },
    { label: 'Micro Details', value: 'micro-details' },
  ]

  return (
    <CollectionGuideLayout
      sections={sections}
      stats={m.impeccable_sidebar_stats()}
      footer={<p className="text-center text-xs text-muted-foreground">{m.impeccable_footer()}</p>}
    >
      <ImpeccableOverview />
      <ImpeccableConcepts />
      <ImpeccableLab />
      <StandardSkillsSection
        collectionSlug="impeccable"
        skills={impeccableSkills}
        categories={categories}
        title={m.impeccable_catalog_title({ count: String(impeccableSkills.length) })}
        description={m.impeccable_catalog_desc()}
        repoUrl="github.com/pbakaus/impeccable"
      />
      <ImpeccableWorkflows />
      <ImpeccableInstall />
    </CollectionGuideLayout>
  )
}
