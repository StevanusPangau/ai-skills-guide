import { useMemo, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getLocale } from '@/paraglide/runtime.js'

type Goal = 'realistic' | 'sensitive' | 'refresh' | null

type Result = {
  kind: 'normal' | 'schema-only' | 'reset-from-parent'
  titleId: string
  titleEn: string
  bodyId: string
  bodyEn: string
}

/**
 * Interactive helper for the Branch Type Decision section in
 * neon-postgres-branches (normal vs schema-only; reset-from-parent separately).
 */
export function NeonBranchLab() {
  const isEn = getLocale() === 'en'
  const [goal, setGoal] = useState<Goal>(null)

  const result: Result | null = useMemo(() => {
    if (goal === 'realistic') {
      return {
        kind: 'normal',
        titleId: 'Normal branch',
        titleEn: 'Normal branch',
        bodyId:
          'Uji migrasi kompleks, performa, atau perilaku terhadap data mirip production → buat normal branch (copy-on-write dari parent, termasuk baris).',
        bodyEn:
          'Test complex migrations, performance, or behavior against production-like data → create a normal branch (copy-on-write from the parent, including rows).',
      }
    }
    if (goal === 'sensitive') {
      return {
        kind: 'schema-only',
        titleId: 'Schema-only branch (Beta)',
        titleEn: 'Schema-only branch (Beta)',
        bodyId:
          'Hindari menyalin data sensitif → schema-only branch. Hanya struktur schema; branching ini masih Beta. Schema-only adalah root independen, jadi reset-from-parent tidak berlaku.',
        bodyEn:
          'Avoid copying sensitive data → schema-only branch. Structure only; this branching mode is still Beta. Schema-only branches are independent roots, so reset-from-parent does not apply.',
      }
    }
    if (goal === 'refresh') {
      return {
        kind: 'reset-from-parent',
        titleId: 'Reset from parent',
        titleEn: 'Reset from parent',
        bodyId:
          'Child sudah drift dan butuh refresh bersih dari schema+data parent terbaru (bukan merge). Hanya child branch; diblokir jika masih punya children. Root / schema-only root tidak bisa di-reset.',
        bodyEn:
          'The child has drifted and needs a clean refresh from the parent’s latest schema and data (not a merge). Child branches only; blocked while it still has children. Root / schema-only root branches cannot be reset.',
      }
    }
    return null
  }, [goal])

  return (
    <section id="neon-lab" className="scroll-mt-20 space-y-6">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-2xl font-bold tracking-tight text-balance">
            {isEn ? 'Branch type decision lab' : 'Lab keputusan tipe branch'}
          </h2>
          <Badge variant="secondary" className="font-mono text-xs">
            Interactive
          </Badge>
        </div>
        <p className="text-muted-foreground mt-1 text-sm max-w-2xl">
          {isEn
            ? 'Follows the Branch Type Decision section in neon-postgres-branches: normal vs schema-only, plus reset-from-parent when a child needs a clean refresh.'
            : 'Mengikuti bagian Branch Type Decision di neon-postgres-branches: normal vs schema-only, plus reset-from-parent saat child perlu refresh bersih.'}
        </p>
      </div>

      <Card className="border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            {isEn ? 'What do you need?' : 'Apa yang Anda butuhkan?'}
          </CardTitle>
          <p className="text-xs text-muted-foreground mt-0.5">
            {isEn
              ? 'Rule: neon-postgres-branches — Branch Type Decision'
              : 'Aturan: neon-postgres-branches — Branch Type Decision'}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <fieldset className="space-y-3 min-w-0">
            <legend className="sr-only">
              {isEn ? 'Branch goal' : 'Tujuan branch'}
            </legend>
            <RadioOption
              name="neon-branch-goal"
              value="realistic"
              checked={goal === 'realistic'}
              onChange={() => setGoal('realistic')}
              label={
                isEn
                  ? 'Realistic data for migration, performance, or behavior testing'
                  : 'Data realistis untuk uji migrasi, performa, atau perilaku'
              }
              hint={
                isEn
                  ? 'Production-like rows can expose edge cases seed data misses.'
                  : 'Baris mirip production bisa mengungkap edge case yang terlewat seed data.'
              }
            />
            <RadioOption
              name="neon-branch-goal"
              value="sensitive"
              checked={goal === 'sensitive'}
              onChange={() => setGoal('sensitive')}
              label={
                isEn
                  ? 'Schema structure only — do not copy sensitive rows'
                  : 'Hanya struktur schema — jangan salin baris sensitif'
              }
              hint={
                isEn
                  ? 'Official clarifying question when the request is ambiguous.'
                  : 'Pertanyaan klarifikasi resmi bila permintaan ambigu.'
              }
            />
            <RadioOption
              name="neon-branch-goal"
              value="refresh"
              checked={goal === 'refresh'}
              onChange={() => setGoal('refresh')}
              label={
                isEn
                  ? 'Refresh an existing child branch from its parent'
                  : 'Segarkan child branch yang sudah ada dari parent-nya'
              }
              hint={
                isEn
                  ? 'Fully replaces child schema and data; local child changes are lost.'
                  : 'Mengganti penuh schema dan data child; perubahan lokal di child hilang.'
              }
            />
          </fieldset>

          {result ? (
            <div
              className={`rounded-lg border p-3 space-y-2 ${
                result.kind === 'schema-only'
                  ? 'border-amber-500/40 bg-amber-500/5'
                  : 'border-emerald-500/30 bg-emerald-500/5'
              }`}
              role="status"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`text-sm font-bold ${
                    result.kind === 'schema-only'
                      ? 'text-amber-700 dark:text-amber-400'
                      : 'text-emerald-700 dark:text-emerald-400'
                  }`}
                >
                  {isEn ? result.titleEn : result.titleId}
                </span>
                {result.kind === 'schema-only' ? (
                  <Badge
                    variant="outline"
                    className="text-[10px] border-amber-500/40 text-amber-700 dark:text-amber-400"
                  >
                    Beta
                  </Badge>
                ) : null}
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {isEn ? result.bodyEn : result.bodyId}
              </p>
              {result.kind === 'schema-only' ? (
                <p className="text-[11px] text-muted-foreground leading-relaxed border-t border-amber-500/20 pt-2">
                  {isEn
                    ? 'Schema-only branching is in Beta. Unexpected behavior: share feedback in the Neon Console and Neon Discord (per the skill’s Beta Support Guidance).'
                    : 'Schema-only branching masih Beta. Perilaku tak terduga: kirim feedback di Neon Console dan Neon Discord (sesuai Beta Support Guidance di skill).'}
                </p>
              ) : null}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">
              {isEn
                ? 'Select a goal to see the branch type the skill recommends.'
                : 'Pilih tujuan untuk melihat tipe branch yang direkomendasikan skill.'}
            </p>
          )}
        </CardContent>
      </Card>
    </section>
  )
}

function RadioOption({
  name,
  value,
  checked,
  onChange,
  label,
  hint,
}: {
  name: string
  value: string
  checked: boolean
  onChange: () => void
  label: string
  hint: string
}) {
  const id = `${name}-${value}`
  return (
    <label
      htmlFor={id}
      className={`flex gap-3 rounded-lg border p-3 cursor-pointer transition-colors min-w-0 ${
        checked
          ? 'border-primary bg-primary/10'
          : 'border-border hover:border-primary/40'
      }`}
    >
      <input
        id={id}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="mt-1 size-4 shrink-0 accent-primary"
      />
      <span className="min-w-0 space-y-0.5">
        <span className="block text-sm font-medium text-foreground text-pretty">{label}</span>
        <span className="block text-[11px] text-muted-foreground leading-relaxed">{hint}</span>
      </span>
    </label>
  )
}
