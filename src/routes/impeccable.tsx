import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/impeccable')({
  component: () => <Outlet />,
})
