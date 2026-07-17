import { RiGithubFill } from '@remixicon/react'
import { Badge } from '@/components/ui/badge'
import { SkillInstallBlock } from '@/components/skill-install-block'
import {
  davidSourceUrl,
  type DavidSkill,
} from '@/data/davidondrej-skills'
import { externalLinkAriaLabel } from '@/lib/external-link'
import { m } from '@/paraglide/messages.js'

/** Shared David skill body (header/badges owned by the route). */
export function DavidSkillDetailBody({ skill }: { skill: DavidSkill }) {
  return (
    <div className="space-y-5">
      {skill.prerequisites && skill.prerequisites.length > 0 && (
        <DetailSection
          id="prerequisites"
          label={m.david_detail_prerequisites()}
        >
          <div className="flex flex-wrap gap-1.5">
            {skill.prerequisites.map((item) => (
              <Badge key={item} variant="outline" className="font-mono text-xs">
                {item}
              </Badge>
            ))}
          </div>
        </DetailSection>
      )}

      {skill.dependencies && skill.dependencies.length > 0 && (
        <DetailSection id="dependencies" label={m.david_detail_dependencies()}>
          <div className="flex flex-wrap gap-1.5">
            {skill.dependencies.map((item) => (
              <Badge key={item} variant="outline" className="font-mono text-xs">
                {item}
              </Badge>
            ))}
          </div>
        </DetailSection>
      )}

      <DetailSection id="adaptation" label={m.david_detail_adaptation()}>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {skill.adaptationNotes}
        </p>
      </DetailSection>

      <a
        href={davidSourceUrl(skill.sourcePath)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-sm text-sm text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
        aria-label={externalLinkAriaLabel(m.david_detail_source())}
      >
        <RiGithubFill className="size-4" aria-hidden="true" />
        {m.david_detail_source()}
      </a>

      <div id="install" className="scroll-mt-20">
        <SkillInstallBlock source="davidondrej/skills" skillName={skill.name} />
      </div>
    </div>
  )
}

function DetailSection({
  id,
  label,
  children,
}: {
  id: string
  label: string
  children: React.ReactNode
}) {
  return (
    <div id={id} className="scroll-mt-20">
      <h2 className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        {label}
      </h2>
      {children}
    </div>
  )
}
