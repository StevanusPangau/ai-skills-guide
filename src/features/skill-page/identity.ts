/**
 * Deterministic visual identity per skill: a hue plus a mirrored 5x5 pattern,
 * both derived from the skill name. Purely decorative (always aria-hidden), so
 * the same skill looks the same on every visit and no two neighbours collide.
 */

function hash(input: string): number {
  // FNV-1a, 32-bit
  let h = 0x811c9dc5
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return h >>> 0
}

export type SkillIdentity = {
  /** Hue in degrees, consumed by `.skill-accent` via `--sk-h`. */
  hue: number
  /** 5 rows x 5 cols, mirrored left/right so it reads as a deliberate glyph. */
  cells: boolean[][]
}

export function getSkillIdentity(name: string): SkillIdentity {
  const h = hash(name)
  // Avoid the 20-50deg band: it is too close to the site's orange primary.
  const raw = h % 300
  const hue = raw < 20 ? raw : raw + 60

  let bits = hash(`${name}:glyph`)
  const cells: boolean[][] = []
  for (let r = 0; r < 5; r++) {
    const row: boolean[] = [false, false, false, false, false]
    for (let c = 0; c < 3; c++) {
      const on = (bits & 1) === 1
      bits = (bits >>> 1) | ((bits & 1) << 31)
      row[c] = on
      row[4 - c] = on
    }
    cells.push(row)
  }
  // Guarantee a visible glyph.
  if (!cells.some((row) => row.some(Boolean))) cells[2][2] = true

  return { hue, cells }
}
