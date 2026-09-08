import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/cloudflare')({
  component: () => <Outlet />,
})
