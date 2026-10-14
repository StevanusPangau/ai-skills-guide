import { useMemo } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { CollectionGuideLayout } from '@/components/layout/collection-guide-layout'
import { TasteOverview } from '@/features/taste/guide'
import { TasteConcepts } from '@/features/taste/concepts'
import { TasteLab } from '@/features/taste/lab'
import { TasteWorkflows } from '@/features/taste/workflows'
import { TasteInstall } from '@/features/taste/install'
import { StandardSkillsSection } from '@/components/standard-skills-section'
import { tasteSkills } from '@/data/taste-skills'
import { m } from '@/paraglide/messages.js'

export const Route = createFileRoute('/taste/')({
  component: TasteIndexPage,
})

function TasteIndexPage() {
  const sections = useMemo(
    () => [
      { id: 'overview', label: m.taste_sidebar_overview() },
      { id: 'concepts', label: m.sidebar_concepts() },
      { id: 'taste-lab', label: m.taste_sidebar_lab() },
      {
        id: 'skills',
        label: m.taste_sidebar_skills({ count: String(tasteSkills.length) }),
      },
      { id: 'workflows', label: m.sidebar_workflows() },
      { id: 'installation', label: m.sidebar_installation() },
    ],
    [],
  )

  const categories = [
    { label: 'Art Direction', value: 'art-direction' },
    { label: 'Redesign', value: 'redesign' },
    { label: 'Image Pipeline', value: 'image-pipeline' },
    { label: 'Motion', value: 'motion' },
    { label: 'Style', value: 'style' },
    { label: 'Design System', value: 'design-system' },
    { label: 'Output', value: 'output' },
    { label: 'Image Generation', value: 'image-generation' },
    { label: 'Legacy', value: 'legacy' },
  ]

  return (
    <CollectionGuideLayout
      sections={sections}
      stats={m.taste_sidebar_stats()}
      footer={<p className="text-center text-xs text-muted-foreground">{m.taste_footer()}</p>}
    >
      <TasteOverview />
      <TasteConcepts />
      <TasteLab />
      <StandardSkillsSection
        collectionSlug="taste"
        skills={tasteSkills}
        categories={categories}
        title={m.taste_catalog_title({ count: String(tasteSkills.length) })}
        description={m.taste_catalog_desc()}
        repoUrl="github.com/Leonxlnx/taste-skill"
      />
      <TasteWorkflows />
      <TasteInstall />
    </CollectionGuideLayout>
  )
}
