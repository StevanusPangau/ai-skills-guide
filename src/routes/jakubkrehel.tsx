import { useMemo } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { CollectionGuideLayout } from '@/components/layout/collection-guide-layout'
import {
  JakubOverview,
} from '@/features/jakubkrehel/guide'
import { JakubFlow } from '@/features/jakubkrehel/flow'
import { JakubLab } from '@/features/jakubkrehel/lab'
import { StandardSkillsSection } from '@/components/standard-skills-section'
import { jakubkrehelSkills } from '@/data/jakubkrehel-skills'
import { m } from '@/paraglide/messages.js'

export const Route = createFileRoute('/jakubkrehel')({
  component: JakubPage,
})

function JakubPage() {
  const sections = useMemo(
    () => [
      { id: 'overview', label: m.jakub_sidebar_overview() },
      { id: 'flow', label: 'Alur Polish UI' },
      { id: 'lab', label: m.jakub_sidebar_lab() },
      {
        id: 'skills',
        label: m.jakub_sidebar_skills({ count: String(jakubkrehelSkills.length) }),
      },
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
      <JakubLab />
      <StandardSkillsSection
        collectionSlug="jakubkrehel"
        skills={jakubkrehelSkills}
        categories={categories}
        title={`Semua ${jakubkrehelSkills.length} Skills`}
        description="Katalog lengkap skill antarmuka dan design engineering presisi dari Jakub Krehel (Interfaces.dev)."
        repoUrl="github.com/jakubkrehel/skills"
      />
    </CollectionGuideLayout>
  )
}
