import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/remotion')({
  component: () => <Outlet />,
})
