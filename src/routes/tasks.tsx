import { createFileRoute } from '@tanstack/react-router'
import { TasksPage } from '@/features/tasks-page'
import { useDocumentTitle } from '@/lib/use-document-title'
import { m } from '@/paraglide/messages.js'

export const Route = createFileRoute('/tasks')({
  component: TasksRoute,
})

function TasksRoute() {
  useDocumentTitle(m.tasks_title(), m.tasks_description())
  return <TasksPage />
}
