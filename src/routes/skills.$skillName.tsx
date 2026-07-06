import { useEffect } from 'react'
import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { skills } from '@/data/skills'
import { getOfficialTitle, getWhenNotToUse } from '@/types/skill'
import type { Skill } from '@/types/skill'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { useDocumentTitle } from '@/lib/use-document-title'

export const Route = createFileRoute('/skills/$skillName')({
  loader: ({ params }) => {
    const index = skills.findIndex((s) => s.name === params.skillName)
    if (index === -1) throw notFound()
    return {
      skill: skills[index],
      prev: index > 0 ? skills[index - 1] : null,
      next: index < skills.length - 1 ? skills[index + 1] : null,
    }
  },
  component: SkillPage,
  notFoundComponent: SkillNotFound,
})

function borderColor(skill: Skill): string {
  if (skill.category === 'engineering' && skill.invocation === 'user') return 'border-l-orange-700'
  if (skill.category === 'engineering' && skill.invocation === 'model') return 'border-l-violet-600'
  if (skill.category === 'productivity' && skill.invocation === 'user') return 'border-l-emerald-600'
  return 'border-l-sky-600'
}

function SkillPage() {
  const { skill, prev, next } = Route.useLoaderData()
  const whenNotToUse = getWhenNotToUse(skill)
  useDocumentTitle(`/${skill.name}`)

  // Navigasi antar-skill memakai route pattern yang sama, jadi komponen tidak
  // unmount — reset scroll ke atas secara eksplisit setiap ganti skill.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [skill.name])

  return (
    <main className="flex-1 min-w-0 pt-14">
      <div className="max-w-3xl mx-auto px-6 py-10 space-y-8">
        {/* Breadcrumb */}
        <div className="text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary transition-colors">
            Beranda
          </Link>
          <span className="mx-2">/</span>
          <Link to="/" hash="skills" className="hover:text-primary transition-colors">
            Skills
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground font-mono">{skill.name}</span>
        </div>

        {/* Header */}
        <div className={`border-l-4 ${borderColor(skill)} pl-4`}>
          <h1 className="text-2xl font-bold tracking-tight font-mono">/{skill.name}</h1>
          <p className="text-sm text-muted-foreground mt-1">{getOfficialTitle(skill)}</p>
          <div className="flex items-center gap-2 flex-wrap mt-3">
            <Badge variant="outline" className="text-xs">{skill.category}</Badge>
            <Badge variant={skill.invocation === 'user' ? 'default' : 'secondary'} className="text-xs">
              {skill.invocation}-invoked
            </Badge>
          </div>
          <p className="text-sm mt-4 leading-relaxed">{skill.description}</p>
        </div>

        <Separator />

        {/* Detailed description */}
        {skill.detailedDescription && (
          <section>
            <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
              {skill.detailedDescription}
            </p>
          </section>
        )}

        {/* When to use */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
            Kapan Digunakan
          </h2>
          <p className="text-sm leading-relaxed">{skill.whenToUse}</p>
        </section>

        {/* When NOT to use */}
        {whenNotToUse && (
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
              Kapan TIDAK Digunakan
            </h2>
            <p className="text-sm leading-relaxed">{whenNotToUse}</p>
          </section>
        )}

        {/* Key behaviors */}
        {skill.keyBehaviors.length > 0 && (
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
              Perilaku Utama
            </h2>
            <ul className="space-y-1">
              {skill.keyBehaviors.map((b, i) => (
                <li key={i} className="text-sm flex items-start gap-2">
                  <span className="text-primary shrink-0">•</span>
                  {b}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* How it works */}
        {(skill.howItWorks ?? []).length > 0 && (
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
              Cara Kerja
            </h2>
            <ol className="space-y-1.5 list-decimal list-inside">
              {skill.howItWorks!.map((step, i) => (
                <li key={i} className="text-sm">{step}</li>
              ))}
            </ol>
          </section>
        )}

        {/* It's working if */}
        {(skill.itsWorkingIf ?? []).length > 0 && (
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
              Tanda Berjalan dengan Benar
            </h2>
            <ul className="space-y-1">
              {skill.itsWorkingIf!.map((sign, i) => (
                <li key={i} className="text-sm flex items-start gap-2">
                  <span className="text-emerald-600 shrink-0">✓</span>
                  {sign}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Workflow */}
        {skill.workflow && (
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
              Posisi dalam Alur
            </h2>
            <div className="bg-secondary/50 rounded-md p-3 font-mono text-xs">
              {skill.workflow}
            </div>
          </section>
        )}

        {/* Tips */}
        {(skill.tips ?? []).length > 0 && (
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
              Tips Praktis
            </h2>
            <ul className="space-y-1">
              {skill.tips!.map((tip, i) => (
                <li key={i} className="text-sm flex items-start gap-2">
                  <span className="text-orange-600 shrink-0">💡</span>
                  {tip}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Pairs well with */}
        {skill.pairsWellWith.length > 0 && (
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
              Cocok Dipasangkan dengan
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {skill.pairsWellWith.map((name) => (
                <Link key={name} to="/skills/$skillName" params={{ skillName: name }}>
                  <Badge variant="outline" className="font-mono text-xs cursor-pointer hover:border-primary transition-colors">
                    /{name}
                  </Badge>
                </Link>
              ))}
            </div>
          </section>
        )}

        <Separator />

        {/* Prev / Next navigation */}
        <nav className="grid grid-cols-2 gap-3">
          {prev ? (
            <Link
              to="/skills/$skillName"
              params={{ skillName: prev.name }}
              className="group rounded-lg border border-border p-3 hover:border-primary transition-colors"
            >
              <span className="block text-xs text-muted-foreground">← Sebelumnya</span>
              <span className="block font-mono text-sm mt-0.5 group-hover:text-primary transition-colors">
                /{prev.name}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              to="/skills/$skillName"
              params={{ skillName: next.name }}
              className="group rounded-lg border border-border p-3 text-right hover:border-primary transition-colors"
            >
              <span className="block text-xs text-muted-foreground">Berikutnya →</span>
              <span className="block font-mono text-sm mt-0.5 group-hover:text-primary transition-colors">
                /{next.name}
              </span>
            </Link>
          ) : (
            <span />
          )}
        </nav>

        <Link to="/" hash="skills" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
          ← Kembali ke daftar skill
        </Link>
      </div>
    </main>
  )
}

function SkillNotFound() {
  return (
    <main className="flex-1 min-w-0 pt-14">
      <div className="max-w-3xl mx-auto px-6 py-20 text-center space-y-4">
        <h1 className="text-2xl font-bold">Skill tidak ditemukan</h1>
        <p className="text-sm text-muted-foreground">
          Skill yang kamu cari tidak ada dalam katalog.
        </p>
        <Link to="/" hash="skills" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
          ← Kembali ke daftar skill
        </Link>
      </div>
    </main>
  )
}
