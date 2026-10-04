import { CodeBlock } from '@/components/code-block'
import {
  externalLinkAriaLabel,
  externalTextLinkClass,
} from '@/lib/external-link'
import { m } from '@/paraglide/messages.js'

type SkillInstallBlockProps = {
  /** GitHub owner/repo, e.g. mattpocock/skills */
  source: string
  /** Skill folder/name as known by skills.sh */
  skillName: string
  /** Hide the built-in heading when the caller already renders a section title. */
  hideHeading?: boolean
}

export function SkillInstallBlock({
  source,
  skillName,
  hideHeading = false,
}: SkillInstallBlockProps) {
  const command = `npx skills@latest add ${source} --skill ${skillName}`
  const pageUrl = `https://skills.sh/${source}/${skillName}`

  return (
    <div className="space-y-2 border-t border-border pt-4">
      {hideHeading ? null : (
        <h2 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          {m.skill_install_title()}
        </h2>
      )}
      <CodeBlock code={command} shell />
      <a
        href={pageUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-block text-xs text-muted-foreground ${externalTextLinkClass}`}
        aria-label={externalLinkAriaLabel(
          `skills.sh/${source}/${skillName}`,
        )}
      >
        skills.sh/{source}/{skillName}
      </a>
    </div>
  )
}
