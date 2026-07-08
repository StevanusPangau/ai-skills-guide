import { Link } from '@tanstack/react-router'
import { Badge } from '@/components/ui/badge'
import { RiLightbulbLine } from '@remixicon/react'
import type { Skill } from '@/types/skill'

export function SkillDetail({ skill }: { skill: Skill }) {
  return (
    <div className="space-y-5 pt-2">
      {/* Detailed description */}
      {skill.detailedDescription && (
        <div>
          <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
            {skill.detailedDescription}
          </p>
        </div>
      )}

      {/* How it works */}
      {(skill.howItWorks ?? []).length > 0 && (
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Cara Kerja</h4>
          <ol className="space-y-1.5 list-decimal list-inside">
            {skill.howItWorks!.map((step, i) => (
              <li key={i} className="text-sm">{step}</li>
            ))}
          </ol>
        </div>
      )}

      {/* It's working if */}
      {(skill.itsWorkingIf ?? []).length > 0 && (
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Tanda Berjalan dengan Benar</h4>
          <ul className="space-y-1">
            {skill.itsWorkingIf!.map((sign, i) => (
              <li key={i} className="text-sm flex items-start gap-2">
                <span className="text-emerald-600 shrink-0">✓</span>
                {sign}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Workflow */}
      {skill.workflow && (
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Posisi dalam Alur</h4>
          <div className="bg-secondary/50 rounded-md p-3 font-mono text-xs">
            {skill.workflow}
          </div>
        </div>
      )}

      {/* Tips */}
      {(skill.tips ?? []).length > 0 && (
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Tips Praktis</h4>
          <ul className="space-y-1">
            {skill.tips!.map((tip, i) => (
              <li key={i} className="text-sm flex items-start gap-2">
                <RiLightbulbLine className="size-4 text-orange-600 shrink-0 mt-0.5" />
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Pairs well with */}
      {(skill.pairsWellWith ?? []).length > 0 && (
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Cocok Dipasangkan dengan</h4>
          <div className="flex flex-wrap gap-1.5">
            {skill.pairsWellWith!.map((name) => (
              <Link key={name} to="/skills/$skillName" params={{ skillName: name }}>
                <Badge variant="outline" className="font-mono text-xs cursor-pointer hover:border-primary transition-colors">
                  /{name}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Link to full page */}
      <div className="pt-2">
        <Link
          to="/skills/$skillName"
          params={{ skillName: skill.name }}
          className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
        >
          Lihat halaman lengkap →
        </Link>
      </div>
    </div>
  )
}
