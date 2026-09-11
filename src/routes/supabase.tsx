import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/supabase')({
  component: () => <Outlet />,
})
