import { useCallback, useMemo, useState } from 'react'
import { prefersReducedMotion } from '@/lib/motion'

export const SPEEDS = [1, 0.5, 0.25] as const
export type Speed = (typeof SPEEDS)[number]

/**
 * Playback state for a demo: a `runKey` that remounts/re-triggers the motion
 * on replay, and a `speed` multiplier applied to every duration so the timing
 * can be inspected in slow motion. Reduced motion is respected: durations
 * collapse to near-zero and the bar says so.
 */
export function usePlayback() {
  const [runKey, setRunKey] = useState(0)
  const [speed, setSpeed] = useState<Speed>(1)
  const reduced = useMemo(() => prefersReducedMotion(), [])
  const replay = useCallback(() => setRunKey((k) => k + 1), [])
  /** Scale a duration in ms by the chosen slow-motion factor. */
  const ms = useCallback(
    (duration: number) => (reduced ? 0 : Math.round(duration / speed)),
    [reduced, speed],
  )
  return { runKey, speed, setSpeed, replay, reduced, ms }
}


export type Playback = ReturnType<typeof usePlayback>
