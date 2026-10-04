/** Cubic-bezier helpers shared by the animation previews. */
export type Bezier = readonly [number, number, number, number]

/** Named curves used by the previews (values taken from the skills' own tables). */
export const CURVES = {
  /** Emil: strong ease-out used for entrances and presses. */
  strongOut: [0.23, 1, 0.32, 1],
  /** Emil: strong ease-in-out for on-screen movement. */
  strongInOut: [0.77, 0, 0.175, 1],
  /** Emil: drawer-style curve. */
  drawer: [0.32, 0.72, 0, 1],
  /** CSS `ease`, the browser default people forget to replace. */
  cssEase: [0.25, 0.1, 0.25, 1],
  linear: [0, 0, 1, 1],
} as const satisfies Record<string, Bezier>

export function bezierCss(c: Bezier): string {
  return `cubic-bezier(${c.join(', ')})`
}

/** Progress (0..1) of an animation at time fraction `t` for a cubic-bezier. */
export function bezierProgress(c: Bezier, t: number): number {
  const [x1, y1, x2, y2] = c
  const cx = 3 * x1
  const bx = 3 * (x2 - x1) - cx
  const ax = 1 - cx - bx
  const cy = 3 * y1
  const by = 3 * (y2 - y1) - cy
  const ay = 1 - cy - by
  const sampleX = (s: number) => ((ax * s + bx) * s + cx) * s
  const sampleY = (s: number) => ((ay * s + by) * s + cy) * s
  let s = t
  for (let i = 0; i < 8; i++) {
    const dx = sampleX(s) - t
    if (Math.abs(dx) < 1e-5) return sampleY(s)
    const d = (3 * ax * s + 2 * bx) * s + cx
    if (Math.abs(d) < 1e-6) break
    s -= dx / d
  }
  let lo = 0
  let hi = 1
  s = t
  for (let i = 0; i < 24; i++) {
    const x = sampleX(s)
    if (Math.abs(x - t) < 1e-5) break
    if (x < t) lo = s
    else hi = s
    s = (lo + hi) / 2
  }
  return sampleY(s)
}
