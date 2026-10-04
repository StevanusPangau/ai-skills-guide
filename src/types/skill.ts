export type SkillCategory = 'engineering' | 'productivity'
export type SkillInvocation = 'user' | 'model'

export type BilingualString = {
  id: string
  en: string
}

export type BilingualList = {
  id: string[]
  en: string[]
}

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
  'wayfinder': 'wayfinder: Chart Large Plans as a Shared Map',
  'triage': 'triage: Turn Backlog Mess Into Agent-Ready Work',
  'improve-codebase-architecture': 'improve-codebase-architecture: Find Deepening Opportunities',
  'setup-matt-pocock-skills': 'setup-matt-pocock-skills: One-Time Repo Setup',
  'to-tickets': 'to-tickets: Break a Spec Into Tracer-Bullet Tickets',
  'to-spec': 'to-spec: Turn Resolved Context Into a Spec',
  'implement': 'implement: Build a Ticket or Spec Test-First',
  'implement-spec': 'implement-spec: Build a Whole Spec With Parallel Subagents',
  'prototype': 'prototype: Answer Questions With Throwaway Code',
  'diagnosing-bugs': 'diagnosing-bugs: Six-Phase Systematic Debugging',
  'research': 'research: Primary-Source Investigation Agent',
  'tdd': 'tdd: Red, Green (Refactor Moved to Review)',
  'domain-modeling': 'domain-modeling: Build and Sharpen Domain Vocabulary',
  'codebase-design': 'codebase-design: Deep Module Vocabulary & Principles',
  'code-review': 'code-review: Two-Axis Parallel Review',
  'pr': 'pr: Write the PR Body (Summary, Evidence, Merge Danger)',
  'retro': 'retro: Retrospective on the Agent Environment',
  'grill-me': 'grill-me: Relentless Interview Without Docs',
  'handoff': 'handoff: Move Context Between Agent Sessions',
  'teach': 'teach: Multi-Session Structured Learning',
  'writing-for-agents': 'writing-for-agents: Reference for Agent-Facing Docs',
  'wizard': 'wizard: Interactive Human-in-the-Loop Setup Script',
  'to-questionnaire': 'to-questionnaire: Turn Gap Into Async Questions',
  'wait-what': 'wait-what: One-Word Corrective for Model Verbosity',
  'grilling': 'grilling: Reusable Interview Primitive',
}

const whenNotToUseMap: Record<string, string> = {
  'ask-matt': 'Jika sudah tahu skill mana yang tepat, langsung panggil saja tanpa routing.',
  'grill-with-docs': 'Jika plan sudah clear dan hanya perlu pin terminology, gunakan /domain-modeling. Jika tidak ada working directory, gunakan /grill-me. Jika usaha terlalu besar dan berkabut untuk satu sesi, gunakan /wayfinder.',
  'wayfinder': 'Jika plan cukup kecil untuk satu sesi agent atau fitur sudah well-scoped — gunakan /grill-with-docs saja, tidak perlu peta (wayfinder lebih lambat dan padat).',
  'triage': 'Hanya untuk issue yang bukan kamu buat (bug report, feature request masuk). Tickets dari /to-tickets sudah agent-ready — jangan di-triage.',
  'improve-codebase-architecture': 'Jika codebase sudah clean dan masalahnya ada di spec/requirements, gunakan /grill-with-docs.',
  'setup-matt-pocock-skills': 'Jika repo sudah pernah di-setup. Jangan jalankan ulang.',
  'to-tickets': 'Jika belum ada spec yang settled — gunakan /to-spec dulu. Jika scope terlalu kecil untuk dipecah, langsung implement.',
  'to-spec': 'Jika context belum cukup (belum grilling) — hasilnya akan vague. Gunakan /grill-with-docs dulu.',
  'implement': 'Jika belum ada spec/ticket yang settled — pecah dulu dengan /to-tickets. Implement untuk eksekusi, bukan planning. Untuk mengorkestrasi seluruh spec dengan subagent paralel, gunakan /implement-spec.',
  'implement-spec': 'Jika belum ada spec beserta tickets (jalankan /to-spec dan /to-tickets dulu), atau kamu ingin menyetir tiap ticket sendiri — gunakan /implement.',
  'prototype': 'Jika bug yang ada di production — gunakan /diagnosing-bugs. Prototype untuk explore what to build, bukan debug what is broken.',
  'diagnosing-bugs': 'Jika masalahnya bukan bug tapi design question — gunakan /prototype. Jika butuh feature baru, gunakan main flow.',
  'research': 'Jika sudah punya informasi yang cukup dari grilling. Jangan research sebagai penundaan.',
  'tdd': 'Jika behavior belum clear — settle spec dulu dengan /to-spec. Jika reasoning tentang interfaces, gunakan /codebase-design.',
  'domain-modeling': 'Jika butuh full interview + paper trail, gunakan /grill-with-docs yang memanggil /grilling dan /domain-modeling sekaligus.',
  'codebase-design': 'Jika butuh actionable refactor plan, gunakan /improve-codebase-architecture yang menghasilkan HTML report.',
  'code-review': 'Jika code belum selesai implementasi — review hanya berguna untuk completed work.',
  'pr': 'Jika bukan sedang menulis body pull request, atau perubahan belum selesai di-review dengan /code-review.',
  'retro': 'Jika yang ingin diperbaiki adalah code-nya (bukan environment agent) — gunakan /code-review atau /diagnosing-bugs.',
  'grill-me': 'Jika kamu bekerja di working directory — gunakan /grill-with-docs: interview yang sama plus paper trail (GLOSSARY.md/ADR).',
  'handoff': 'Jika masih bisa lanjut di session yang sama tanpa context bloat. Jangan handoff terlalu dini.',
  'teach': 'Jika butuh jawaban cepat satu kali — gunakan /research. Teach untuk learning journey multi-session.',
  'writing-for-agents': 'Jika hanya menggunakan skills yang sudah ada tanpa membuat atau memodifikasi skill/AGENTS.md.',
  'wizard': 'Jika langkah tersebut bisa dijalankan sendiri secara otomatis oleh AI agent tanpa bantuan manusia.',
  'to-questionnaire': 'Jika kamu sendiri sudah tahu jawabannya atau bisa diselesaikan lewat /grill-with-docs.',
  'wait-what': 'Jika pesan agent sudah jelas dan sesuai kebutuhan, atau ingin eksplorasi arah baru.',
  'grilling': 'Biasanya tidak perlu dipanggil langsung — /grill-me dan /grill-with-docs adalah dua pintu masuk bernama, dan triage/wayfinder/improve-codebase-architecture memanggilnya sendiri.',
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
