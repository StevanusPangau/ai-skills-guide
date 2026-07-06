import { useState, useMemo } from 'react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { SkillCard } from '@/features/skills/skill-card'
import { skills } from '@/data/skills'

type Filter = 'all' | 'engineering' | 'productivity' | 'user' | 'model'

export function SkillsSection() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<Filter>('all')

  const filtered = useMemo(() => {
    return skills.filter((skill) => {
      const matchesSearch =
        search === '' ||
        skill.name.toLowerCase().includes(search.toLowerCase()) ||
        skill.description.toLowerCase().includes(search.toLowerCase()) ||
        skill.keyBehaviors.some((b) =>
          b.toLowerCase().includes(search.toLowerCase())
        )

      const matchesFilter =
        filter === 'all' ||
        skill.category === filter ||
        skill.invocation === filter

      return matchesSearch && matchesFilter
    })
  }, [search, filter])

  const filters: { label: string; value: Filter }[] = [
    { label: 'Semua', value: 'all' },
    { label: 'Engineering', value: 'engineering' },
    { label: 'Productivity', value: 'productivity' },
    { label: 'User-invoked', value: 'user' },
    { label: 'Model-invoked', value: 'model' },
  ]

  return (
    <section id="skills" className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Semua 19 Skills</h2>
        <p className="text-muted-foreground mt-1">
          Cari dan filter katalog skill lengkap.
        </p>
      </div>

      <div className="space-y-3">
        <Input
          placeholder="Cari skill..."
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <Badge
              key={f.value}
              variant={filter === f.value ? 'default' : 'outline'}
              className="cursor-pointer transition-colors"
              onClick={() => setFilter(f.value)}
            >
              {f.label}
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filtered.length === 0 ? (
          <p className="text-sm text-muted-foreground py-8 text-center">
            Tidak ada skill yang cocok.
          </p>
        ) : (
          filtered.map((skill) => <SkillCard key={skill.name} skill={skill} />)
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        Menampilkan {filtered.length} dari {skills.length} skills
      </p>
    </section>
  )
}
