import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/anthropic')({
  component: () => <Outlet />,
})
