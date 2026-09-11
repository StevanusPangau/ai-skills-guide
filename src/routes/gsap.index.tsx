import { useMemo } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { CollectionGuideLayout } from '@/components/layout/collection-guide-layout'
import { GsapOverview } from '@/features/gsap/guide'
import { GsapConcepts } from '@/features/gsap/concepts'
import { GsapTimelineLab } from '@/features/gsap/lab'
import { GsapWorkflows } from '@/features/gsap/workflows'
import { GsapInstall } from '@/features/gsap/install'
import { StandardSkillsSection } from '@/components/standard-skills-section'
import { gsapSkills } from '@/data/gsap-skills'
import { m } from '@/paraglide/messages.js'

export const Route = createFileRoute('/gsap/')({
  component: GsapIndexPage,
})

function GsapIndexPage() {
  const sections = useMemo(
    () => [
      { id: 'overview', label: m.gsap_sidebar_overview() },
      { id: 'concepts', label: m.sidebar_concepts() },
      { id: 'gsap-lab', label: m.gsap_sidebar_lab() },
      {
        id: 'skills',
        label: m.gsap_sidebar_skills({ count: String(gsapSkills.length) }),
      },
      { id: 'workflows', label: m.sidebar_workflows() },
      { id: 'installation', label: m.sidebar_installation() },
    ],
    [],
  )

  const categories = [
    { label: 'Core Engine', value: 'core-engine' },
    { label: 'Scroll Interaction', value: 'scroll-interaction' },
    { label: 'Framework Integration', value: 'framework-integration' },
    { label: 'Plugins & Extensions', value: 'plugins-extensions' },
    { label: 'Performance Optimization', value: 'performance-optimization' },
    { label: 'Math Utilities', value: 'math-utilities' },
  ]

  return (
    <CollectionGuideLayout
      sections={sections}
      stats={m.gsap_sidebar_stats()}
      footer={<p className="text-center text-xs text-muted-foreground">{m.gsap_footer()}</p>}
    >
      <GsapOverview />
      <GsapConcepts />
      <GsapTimelineLab />
      <StandardSkillsSection
        collectionSlug="gsap"
        skills={gsapSkills}
        categories={categories}
        title={m.gsap_catalog_title({ count: String(gsapSkills.length) })}
        description={m.gsap_catalog_desc()}
        repoUrl="github.com/greensock/gsap-skills"
      />
      <GsapWorkflows />
      <GsapInstall />
    </CollectionGuideLayout>
  )
}
