import { createFileRoute } from '@tanstack/react-router'
import { Landing } from '@/features/landing'
import { useDocumentTitle } from '@/lib/use-document-title'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  useDocumentTitle()
  return <Landing />
}
