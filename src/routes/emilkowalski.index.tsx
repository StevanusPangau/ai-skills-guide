import { Fragment, useMemo } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { CollectionGuideLayout } from '@/components/layout/collection-guide-layout'
import { Separator } from '@/components/ui/separator'
import {
  EmilCatalog,
  EmilInstall,
  EmilOverview,
  EmilPrinciples,
  EmilWorkflow,
} from '@/features/emilkowalski/guide'
import { EmilPreviewLab } from '@/features/emilkowalski/before-after-preview'
import { useDocumentTitle } from '@/lib/use-document-title'
import { m } from '@/paraglide/messages.js'
import { emilkowalskiSkills } from '@/data/emilkowalski-skills'

export const Route = createFileRoute('/emilkowalski/')({
  component: EmilPage,
})

function EmilPage() {
  useDocumentTitle('Emil Kowalski')
  const categoryCount = new Set(emilkowalskiSkills.map((skill) => skill.category)).size
  const sections = useMemo(
    () => [
      { id: 'overview', label: m.emil_sidebar_overview() },
      { id: 'workflow', label: m.emil_sidebar_workflow() },
      {
        id: 'catalog',
        label: m.emil_sidebar_skills({ count: String(emilkowalskiSkills.length) }),
      },
      { id: 'preview', label: m.emil_sidebar_preview() },
      { id: 'principles', label: m.emil_sidebar_principles() },
      { id: 'installation', label: m.emil_sidebar_installation() },
    ],
    [],
  )
  const content = [
    <EmilOverview key="overview" />,
    <EmilWorkflow key="workflow" />,
    <EmilCatalog key="catalog" />,
    <EmilPreviewLab key="preview" />,
    <EmilPrinciples key="principles" />,
    <EmilInstall key="installation" />,
  ]

  return (
    <CollectionGuideLayout
      sections={sections}
      stats={m.emil_sidebar_stats({
        categories: String(categoryCount),
        skills: String(emilkowalskiSkills.length),
      })}
      footer={<p className="text-center text-xs text-muted-foreground">{m.emil_footer()}</p>}
    >
      {content.map((section, index) => (
        <Fragment key={section.key}>
          {index > 0 ? <Separator /> : null}
          {section}
        </Fragment>
      ))}
    </CollectionGuideLayout>
  )
}
