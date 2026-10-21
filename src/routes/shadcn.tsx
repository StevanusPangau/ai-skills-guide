import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/shadcn')({
  component: () => <Outlet />,
})
