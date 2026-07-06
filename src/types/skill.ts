export type SkillCategory = 'engineering' | 'productivity'
export type SkillInvocation = 'user' | 'model'

export type Skill = {
  name: string
  category: SkillCategory
  invocation: SkillInvocation
  description: string
  officialTitle?: string
  whenToUse: string
  whenNotToUse?: string
  keyBehaviors: string[]
  itsWorkingIf?: string[]
  workflow: string
  pairsWellWith: string[]
  related: string[]
  detailedDescription: string
  howItWorks?: string[]
  tips?: string[]
}

const officialTitles: Record<string, string> = {
  'ask-matt': 'ask-matt: Route to the Right Skill',
  'grill-with-docs': 'grill-with-docs: Align Before You Build',
  'triage': 'triage: Turn Backlog Mess Into Agent-Ready Work',
  'improve-codebase-architecture': 'improve-codebase-architecture: Find Deepening Opportunities',
  'setup-matt-pocock-skills': 'setup-matt-pocock-skills: One-Time Repo Setup',
  'to-issues': 'to-issues: Break a PRD Into Vertical-Slice GitHub Issues',
  'to-prd': 'to-prd: Turn Resolved Context Into a PRD',
  'prototype': 'prototype: Answer Questions With Throwaway Code',
  'diagnosing-bugs': 'diagnosing-bugs: Six-Phase Systematic Debugging',
  'research': 'research: Primary-Source Investigation Agent',
  'tdd': 'tdd: Red, Green, Refactor for Agentic Coding',
  'domain-modeling': 'domain-modeling: Build and Sharpen Domain Vocabulary',
  'codebase-design': 'codebase-design: Deep Module Vocabulary & Principles',
  'code-review': 'code-review: Two-Axis Parallel Review',
  'grill-me': 'grill-me: Relentless Interview Without Docs',
  'handoff': 'handoff: Move Context Between Agent Sessions',
  'teach': 'teach: Multi-Session Structured Learning',
  'writing-great-skills': 'writing-great-skills: Meta-Reference for Skill Authoring',
  'grilling': 'grilling: Reusable Interview Primitive',
}

const whenNotToUseMap: Record<string, string> = {
  'ask-matt': 'Jika sudah tahu skill mana yang tepat, langsung panggil saja tanpa routing.',
  'grill-with-docs': 'Jika plan sudah clear dan hanya perlu pin terminology, gunakan /domain-modeling. Jika tidak butuh paper trail, gunakan /grill-me.',
  'triage': 'Jika issue sudah jelas scope-nya dan ready to implement, langsung ke /to-issues atau implement.',
  'improve-codebase-architecture': 'Jika codebase sudah clean dan masalahnya ada di spec/requirements, gunakan /grill-with-docs.',
  'setup-matt-pocock-skills': 'Jika repo sudah pernah di-setup. Jangan jalankan ulang.',
  'to-issues': 'Jika belum ada PRD yang settled — gunakan /to-prd dulu. Jika scope terlalu kecil untuk dipecah, langsung implement.',
  'to-prd': 'Jika context belum cukup (belum grilling) — hasilnya akan vague. Gunakan /grill-with-docs dulu.',
  'prototype': 'Jika bug yang ada di production — gunakan /diagnosing-bugs. Prototype untuk explore what to build, bukan debug what is broken.',
  'diagnosing-bugs': 'Jika masalahnya bukan bug tapi design question — gunakan /prototype. Jika butuh feature baru, gunakan main flow.',
  'research': 'Jika sudah punya informasi yang cukup dari grilling. Jangan research sebagai penundaan.',
  'tdd': 'Jika behavior belum clear — settle spec dulu dengan /to-prd. Jika reasoning tentang interfaces, gunakan /codebase-design.',
  'domain-modeling': 'Jika butuh full interview + paper trail, gunakan /grill-with-docs yang sudah include domain-modeling.',
  'codebase-design': 'Jika butuh actionable refactor plan, gunakan /improve-codebase-architecture yang menghasilkan HTML report.',
  'code-review': 'Jika code belum selesai implementasi — review hanya berguna untuk completed work.',
  'grill-me': 'Jika ada codebase yang perlu dipahami — gunakan /grill-with-docs yang bisa explore code.',
  'handoff': 'Jika masih bisa lanjut di session yang sama tanpa context bloat. Jangan handoff terlalu dini.',
  'teach': 'Jika butuh jawaban cepat satu kali — gunakan /research. Teach untuk learning journey multi-session.',
  'writing-great-skills': 'Jika hanya menggunakan skills yang sudah ada, bukan membuat baru.',
  'grilling': 'Jangan panggil langsung — ia dipanggil otomatis oleh /grill-me dan /grill-with-docs.',
}

export function getOfficialTitle(skill: Skill): string {
  return skill.officialTitle ?? officialTitles[skill.name] ?? skill.name
}

export function getWhenNotToUse(skill: Skill): string {
  return skill.whenNotToUse ?? whenNotToUseMap[skill.name] ?? ''
}

export function getItsWorkingIf(skill: Skill): string[] {
  return skill.itsWorkingIf ?? []
}
