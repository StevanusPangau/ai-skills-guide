import { useMemo } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { CollectionGuideLayout } from '@/components/layout/collection-guide-layout'
import { ExpoOverview } from '@/features/expo/guide'
import { ExpoConcepts } from '@/features/expo/concepts'
import { ExpoNativeLab } from '@/features/expo/lab'
import { ExpoWorkflows } from '@/features/expo/workflows'
import { ExpoInstall } from '@/features/expo/install'
import { StandardSkillsSection } from '@/components/standard-skills-section'
import { expoSkills } from '@/data/expo-skills'
import { m } from '@/paraglide/messages.js'

export const Route = createFileRoute('/expo/')({
  component: ExpoIndexPage,
})

function ExpoIndexPage() {
  const sections = useMemo(
    () => [
      { id: 'overview', label: m.expo_sidebar_overview() },
      { id: 'concepts', label: m.sidebar_concepts() },
      { id: 'native-lab', label: m.expo_sidebar_lab() },
      {
        id: 'skills',
        label: m.expo_sidebar_skills({ count: String(expoSkills.length) }),
      },
      { id: 'workflows', label: m.sidebar_workflows() },
      { id: 'installation', label: m.sidebar_installation() },
    ],
    [],
  )

  const categories = [
    { label: 'Start Here', value: 'start-here' },
    { label: 'Framework (open source)', value: 'framework' },
    { label: 'Services (paid EAS)', value: 'services' },
    { label: 'Experimental', value: 'experimental' },
  ]

  return (
    <CollectionGuideLayout
      sections={sections}
      stats={m.expo_sidebar_stats()}
      footer={<p className="text-center text-xs text-muted-foreground">{m.expo_footer()}</p>}
    >
      <ExpoOverview />
      <ExpoConcepts />
      <ExpoNativeLab />
      <StandardSkillsSection
        collectionSlug="expo"
        skills={expoSkills}
        categories={categories}
        title={m.expo_catalog_title({ count: String(expoSkills.length) })}
        description={m.expo_catalog_desc()}
        repoUrl="github.com/expo/skills"
      />
      <ExpoWorkflows />
      <ExpoInstall />
    </CollectionGuideLayout>
  )
}
