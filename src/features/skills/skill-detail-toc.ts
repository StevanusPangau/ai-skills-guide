import type { Skill } from '@/types/skill'
import { getWhenNotToUse } from '@/types/skill'
import { m } from '@/paraglide/messages.js'

export type SkillTocItem = { id: string; label: string }

/** TOC entries for sections that exist on this skill (stable English slug ids). */
export function getSkillTocItems(skill: Skill): SkillTocItem[] {
  const whenNotToUse = getWhenNotToUse(skill)
  const items: SkillTocItem[] = [
    { id: 'when-to-use', label: m.skill_detail_when_to_use() },
  ]
  if (whenNotToUse) {
    items.push({
      id: 'when-not-to-use',
      label: m.skill_detail_when_not_to_use(),
    })
  }
  if (skill.keyBehaviors.length > 0) {
    items.push({
      id: 'key-behaviors',
      label: m.skill_detail_key_behaviors(),
    })
  }
  if ((skill.howItWorks ?? []).length > 0) {
    items.push({
      id: 'how-it-works',
      label: m.skill_detail_how_it_works(),
    })
  }
  if ((skill.itsWorkingIf ?? []).length > 0) {
    items.push({
      id: 'its-working-if',
      label: m.skill_detail_its_working_if(),
    })
  }
  if (skill.workflow) {
    items.push({ id: 'workflow', label: m.skill_detail_workflow() })
  }
  if ((skill.tips ?? []).length > 0) {
    items.push({ id: 'tips', label: m.skill_detail_tips() })
  }
  if ((skill.pairsWellWith ?? []).length > 0) {
    items.push({
      id: 'pairs-well-with',
      label: m.skill_detail_pairs_well_with(),
    })
  }
  items.push({ id: 'install', label: m.skill_install_title() })
  return items
}
