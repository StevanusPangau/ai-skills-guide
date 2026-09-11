import { useMemo } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { CollectionGuideLayout } from '@/components/layout/collection-guide-layout'
import { SupabaseOverview } from '@/features/supabase/guide'
import { SupabaseConcepts } from '@/features/supabase/concepts'
import { SupabaseRlsLab } from '@/features/supabase/lab'
import { SupabaseWorkflows } from '@/features/supabase/workflows'
import { SupabaseInstall } from '@/features/supabase/install'
import { StandardSkillsSection } from '@/components/standard-skills-section'
import { supabaseSkills } from '@/data/supabase-skills'
import { m } from '@/paraglide/messages.js'

export const Route = createFileRoute('/supabase/')({
  component: SupabaseIndexPage,
})

function SupabaseIndexPage() {
  const sections = useMemo(
    () => [
      { id: 'overview', label: m.supabase_sidebar_overview() },
      { id: 'concepts', label: m.sidebar_concepts() },
      { id: 'rls-lab', label: m.supabase_sidebar_lab() },
      {
        id: 'skills',
        label: m.supabase_sidebar_skills({ count: String(supabaseSkills.length) }),
      },
      { id: 'workflows', label: m.sidebar_workflows() },
      { id: 'installation', label: m.sidebar_installation() },
    ],
    [],
  )

  const categories = [
    { label: 'Database Performance', value: 'database-performance' },
    { label: 'Platform Operations', value: 'platform-operations' },
  ]

  return (
    <CollectionGuideLayout
      sections={sections}
      stats={m.supabase_sidebar_stats()}
      footer={<p className="text-center text-xs text-muted-foreground">{m.supabase_footer()}</p>}
    >
      <SupabaseOverview />
      <SupabaseConcepts />
      <SupabaseRlsLab />
      <StandardSkillsSection
        collectionSlug="supabase"
        skills={supabaseSkills}
        categories={categories}
        title={m.supabase_catalog_title({ count: String(supabaseSkills.length) })}
        description={m.supabase_catalog_desc()}
        repoUrl="github.com/supabase/agent-skills"
      />
      <SupabaseWorkflows />
      <SupabaseInstall />
    </CollectionGuideLayout>
  )
}
