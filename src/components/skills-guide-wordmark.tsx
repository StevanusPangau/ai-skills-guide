/**
 * FIGlet ANSI Shadow wordmark — technique from https://www.skills.sh
 *
 * Single-line "SKILLS GUIDE": each FIGlet row of SKILLS is joined with GUIDE.
 * Two paint layers (no offset): muted outline + foreground solid █ fill.
 */

const SKILLS_LINES = [
  '███████╗██╗  ██╗██╗██╗     ██╗     ███████╗',
  '██╔════╝██║ ██╔╝██║██║     ██║     ██╔════╝',
  '███████╗█████╔╝ ██║██║     ██║     ███████╗',
  '╚════██║██╔═██╗ ██║██║     ██║     ╚════██║',
  '███████║██║  ██╗██║███████╗███████╗███████║',
  '╚══════╝╚═╝  ╚═╝╚═╝╚══════╝╚══════╝╚══════╝',
] as const

const GUIDE_LINES = [
  ' ██████╗ ██╗   ██╗██╗██████╗ ███████╗',
  '██╔════╝ ██║   ██║██║██╔══██╗██╔════╝',
  '██║  ███╗██║   ██║██║██║  ██║█████╗  ',
  '██║   ██║██║   ██║██║██║  ██║██╔══╝  ',
  '╚██████╔╝╚██████╔╝██║██████╔╝███████╗',
  ' ╚═════╝  ╚═════╝ ╚═╝╚═════╝ ╚══════╝',
] as const

/** Join SKILLS + GUIDE on one FIGlet row each (space-separated words). */
const WORDMARK = SKILLS_LINES.map(
  (line, i) => `${line}  ${GUIDE_LINES[i] ?? ''}`,
).join('\n')

/** Keep full block █; turn outline box-drawing into spaces so fill sits on gray. */
function solidFillOnly(ascii: string): string {
  let out = ''
  for (const ch of ascii) {
    if (ch === '\n' || ch === ' ' || ch === '█') {
      out += ch
    } else {
      out += ' '
    }
  }
  return out
}

const FILL_ONLY = solidFillOnly(WORDMARK)

const preBase =
  "m-0 select-none whitespace-pre font-['Fira_Mono',ui-monospace,monospace] text-[10px] leading-[125%] tracking-[-1px] sm:text-[12px] lg:text-[15px] [font-synthesis:none] [-webkit-font-smoothing:antialiased] [-moz-osx-font-smoothing:grayscale]"

type SkillsGuideWordmarkProps = {
  className?: string
  label?: string
}

export function SkillsGuideWordmark({
  className,
  label = 'Skills Guide',
}: SkillsGuideWordmarkProps) {
  return (
    <div className={className} role="img" aria-label={label}>
      {/* Wider container: one-line SKILLS + GUIDE is ~2× previous width */}
      <div className="relative w-full max-w-full overflow-x-auto overflow-y-hidden">
        <pre
          aria-hidden
          className={`${preBase} text-muted-foreground`}
        >
          {WORDMARK}
        </pre>
        <pre
          aria-hidden
          className={`${preBase} pointer-events-none absolute inset-0 text-foreground`}
        >
          {FILL_ONLY}
        </pre>
      </div>
    </div>
  )
}
