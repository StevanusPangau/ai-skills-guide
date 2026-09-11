import { useMemo } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { CollectionGuideLayout } from '@/components/layout/collection-guide-layout'
import { PrismaOverview } from '@/features/prisma/guide'
import { PrismaConcepts } from '@/features/prisma/concepts'
import { PrismaV7Lab } from '@/features/prisma/lab'
import { PrismaWorkflows } from '@/features/prisma/workflows'
import { PrismaInstall } from '@/features/prisma/install'
import { StandardSkillsSection } from '@/components/standard-skills-section'
import { prismaSkills } from '@/data/prisma-skills'
import { m } from '@/paraglide/messages.js'

export const Route = createFileRoute('/prisma/')({
  component: PrismaIndexPage,
})

function PrismaIndexPage() {
  const sections = useMemo(
    () => [
      { id: 'overview', label: m.prisma_sidebar_overview() },
      { id: 'concepts', label: m.sidebar_concepts() },
      { id: 'v7-lab', label: m.prisma_sidebar_lab() },
      {
        id: 'skills',
        label: m.prisma_sidebar_skills({ count: String(prismaSkills.length) }),
      },
      { id: 'workflows', label: m.sidebar_workflows() },
      { id: 'installation', label: m.sidebar_installation() },
    ],
    [],
  )

  const categories = [
    { label: 'Migrations & Upgrade', value: 'migrations-upgrade' },
    { label: 'Query ORM', value: 'query-orm' },
    { label: 'CLI Tooling', value: 'cli-tooling' },
    { label: 'Adapters & Protocols', value: 'adapters-protocols' },
    { label: 'Database Setup', value: 'database-setup' },
    { label: 'Cloud Database', value: 'cloud-database' },
    { label: 'Hosting & Deployment', value: 'hosting-deployment' },
  ]

  return (
    <CollectionGuideLayout
      sections={sections}
      stats={m.prisma_sidebar_stats()}
      footer={<p className="text-center text-xs text-muted-foreground">{m.prisma_footer()}</p>}
    >
      <PrismaOverview />
      <PrismaConcepts />
      <PrismaV7Lab />
      <StandardSkillsSection
        collectionSlug="prisma"
        skills={prismaSkills}
        categories={categories}
        title={m.prisma_catalog_title({ count: String(prismaSkills.length) })}
        description={m.prisma_catalog_desc()}
        repoUrl="github.com/prisma/skills"
      />
      <PrismaWorkflows />
      <PrismaInstall />
    </CollectionGuideLayout>
  )
}
