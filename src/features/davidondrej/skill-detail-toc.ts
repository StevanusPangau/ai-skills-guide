import type { DavidSkill } from '@/data/davidondrej-skills'
import { m } from '@/paraglide/messages.js'

export type DavidSkillTocItem = { id: string; label: string }

/** TOC entries for sections that exist on this David skill. */
export function getDavidSkillTocItems(skill: DavidSkill): DavidSkillTocItem[] {
  const items: DavidSkillTocItem[] = []
  if (skill.prerequisites && skill.prerequisites.length > 0) {
    items.push({
      id: 'prerequisites',
      label: m.david_detail_prerequisites(),
    })
  }
  if (skill.dependencies && skill.dependencies.length > 0) {
    items.push({
      id: 'dependencies',
      label: m.david_detail_dependencies(),
    })
  }
  items.push({
    id: 'adaptation',
    label: m.david_detail_adaptation(),
  })
  items.push({ id: 'install', label: m.skill_install_title() })
  return items
}
