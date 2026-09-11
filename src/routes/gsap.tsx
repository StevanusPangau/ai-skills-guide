import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/gsap')({
  component: () => <Outlet />,
})
