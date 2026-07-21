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
}

export function SkillInstallBlock({ source, skillName }: SkillInstallBlockProps) {
  const command = `npx skills@latest add ${source} --skill ${skillName}`
  const pageUrl = `https://skills.sh/${source}/${skillName}`

  return (
    <div className="space-y-2 border-t border-border pt-4">
      <h4 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        {m.skill_install_title()}
      </h4>
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
