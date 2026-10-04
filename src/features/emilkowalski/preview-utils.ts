import { useEffect, useState } from 'react'
import type { Bezier } from '@/features/motion/easing'

/** CSS `ease-in` keyword, written out so it can be plotted. */
export const EASE_IN = [0.42, 0, 1, 1] as const satisfies Bezier

/** True after `delay` ms, so a demo can play itself right after mount/Replay. */
export function useAutoOn(delay = 400) {
  const [on, setOn] = useState(false)
  useEffect(() => {
    const id = window.setTimeout(() => setOn(true), delay)
    return () => window.clearTimeout(id)
  }, [delay])
  return [on, setOn] as const
}
