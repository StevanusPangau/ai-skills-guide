import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/jakubkrehel')({
  component: () => <Outlet />,
})
