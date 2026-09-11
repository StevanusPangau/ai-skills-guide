import { useMemo } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { CollectionGuideLayout } from '@/components/layout/collection-guide-layout'
import {
  VercelOverview,
} from '@/features/vercel/guide'
import { VercelFlow } from '@/features/vercel/flow'
import { VercelConcepts } from '@/features/vercel/concepts'
import { VercelWaterfallLab } from '@/features/vercel/lab'
import { VercelWorkflows } from '@/features/vercel/workflows'
import { VercelInstall } from '@/features/vercel/install'
import { StandardSkillsSection } from '@/components/standard-skills-section'
import { vercelSkills } from '@/data/vercel-skills'
import { m } from '@/paraglide/messages.js'

export const Route = createFileRoute('/vercel/')({
  component: VercelIndexPage,
})

function VercelIndexPage() {
  const sections = useMemo(
    () => [
      { id: 'overview', label: m.vercel_sidebar_overview() },
      { id: 'flow', label: m.sidebar_flow_title() },
      { id: 'concepts', label: m.sidebar_concepts() },
      { id: 'waterfall-lab', label: m.vercel_sidebar_lab() },
      {
        id: 'skills',
        label: m.vercel_sidebar_skills({ count: String(vercelSkills.length) }),
      },
      { id: 'workflows', label: m.sidebar_workflows() },
      { id: 'installation', label: m.sidebar_installation() },
    ],
    [],
  )

  const categories = [
    { label: 'React Performance', value: 'react-performance' },
    { label: 'Architecture', value: 'react-architecture' },
    { label: 'React Native', value: 'react-native' },
    { label: 'Animation', value: 'animation' },
    { label: 'Deployment', value: 'deployment' },
    { label: 'Design Quality', value: 'design-quality' },
    { label: 'Authoring', value: 'authoring' },
  ]

  return (
    <CollectionGuideLayout
      sections={sections}
      stats={m.vercel_sidebar_stats()}
      footer={<p className="text-center text-xs text-muted-foreground">{m.vercel_footer()}</p>}
    >
      <VercelOverview />
      <VercelFlow />
      <VercelConcepts />
      <VercelWaterfallLab />
      <StandardSkillsSection
        collectionSlug="vercel"
        skills={vercelSkills}
        categories={categories}
        title={m.vercel_catalog_title({ count: String(vercelSkills.length) })}
        description={m.vercel_catalog_desc()}
        repoUrl="github.com/vercel-labs/agent-skills"
      />
      <VercelWorkflows />
      <VercelInstall />
    </CollectionGuideLayout>
  )
}
