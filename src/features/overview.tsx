import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function Overview() {
  const failureModes = [
    {
      title: 'Agent tidak mengerjakan yang diminta',
      description: 'Agent salah interpretasi atau tidak fokus pada requirement yang diberikan.',
      fix: ['/grill-me', '/grill-with-docs'],
      borderClass: 'border-l-4 border-orange-600',
    },
    {
      title: 'Agent terlalu verbose',
      description: 'Output terlalu panjang, tidak ada domain model yang jelas, cognitive load tinggi.',
      fix: ['/domain-modeling', 'CONTEXT.md'],
      borderClass: 'border-l-4 border-sky-600',
    },
    {
      title: 'Kode tidak berfungsi',
      description: 'Bug yang sulit dilacak, tidak ada test, approach trial-and-error.',
      fix: ['/tdd', '/diagnosing-bugs'],
      borderClass: 'border-l-4 border-red-600',
    },
    {
      title: 'Codebase jadi ball of mud',
      description: 'Arsitektur yang tidak jelas, module boundaries buruk, technical debt menumpuk.',
      fix: ['/improve-codebase-architecture', '/codebase-design'],
      borderClass: 'border-l-4 border-emerald-600',
    },
  ]

  return (
    <section id="overview" className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Ringkasan</h2>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          Sistem AI Skills dari Matt Pocock adalah workflow terstruktur untuk
          pengembangan software berbasis AI. Terdiri dari 19 skill yang composable
          dan bisa digunakan di agent manapun.
        </p>
      </div>

      {/* Main Build Chain */}
      <Card className="border-2 border-primary/30 bg-primary/5">
        <CardHeader>
          <CardTitle className="text-base">Main Build Chain</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Ini adalah pipeline utama dari ide hingga kode yang siap merge.
            Setiap step menghasilkan artifact yang menjadi input step berikutnya.
            Seluruh sistem dirancang agar agent tetap berada di "Smart Zone" — tidak pernah
            melampaui ~120k token context di mana kualitas output mulai menurun.
          </p>
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <Badge variant="default" className="text-xs px-3 py-1">grill-with-docs</Badge>
            <span className="text-muted-foreground">→</span>
            <Badge variant="default" className="text-xs px-3 py-1">to-prd</Badge>
            <span className="text-muted-foreground">→</span>
            <Badge variant="default" className="text-xs px-3 py-1">to-issues</Badge>
            <span className="text-muted-foreground">→</span>
            <Badge variant="default" className="text-xs px-3 py-1">implement (tdd)</Badge>
            <span className="text-muted-foreground">→</span>
            <Badge variant="default" className="text-xs px-3 py-1">code-review</Badge>
          </div>
          <div className="grid gap-2 text-xs text-muted-foreground mt-2">
            <div className="flex gap-2">
              <span className="font-semibold text-foreground shrink-0">1. grill-with-docs:</span>
              <span>Interview relentless → shared understanding + CONTEXT.md glossary + ADRs</span>
            </div>
            <div className="flex gap-2">
              <span className="font-semibold text-foreground shrink-0">2. to-prd:</span>
              <span>Synthesize (TANPA interview ulang) → PRD dengan user stories, decisions, out-of-scope</span>
            </div>
            <div className="flex gap-2">
              <span className="font-semibold text-foreground shrink-0">3. to-issues:</span>
              <span>Break PRD → vertical slices (tracer bullets), mark AFK vs HITL</span>
            </div>
            <div className="flex gap-2">
              <span className="font-semibold text-foreground shrink-0">4. implement:</span>
              <span>Red→Green→Refactor per slice, test at seams, one behavior at a time</span>
            </div>
            <div className="flex gap-2">
              <span className="font-semibold text-foreground shrink-0">5. code-review:</span>
              <span>Two-axis: Standards (Fowler smells) ∥ Spec (matches PRD?)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Smart Zone */}
      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="text-base">Smart Zone & Context Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            "AI is not a super-powered developer. It's a new starter with no memory."
            — Matt Pocock. Context window besar (1M tokens) bukan berarti semuanya berguna.
            Setelah ~120k tokens, perhatian agent mulai terdifusi dan output menurun.
            Seluruh skill system dirancang untuk menjaga agent tetap di Smart Zone.
          </p>
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0</span>
              <span className="font-semibold">~120k (Smart Zone)</span>
              <span>200k+ (Dumb Zone)</span>
            </div>
            <div className="h-4 rounded-full bg-secondary overflow-hidden relative">
              <div className="absolute inset-y-0 left-0 w-[60%] bg-gradient-to-r from-emerald-500 to-primary rounded-full" />
              <div className="absolute inset-y-0 left-[60%] right-0 bg-gradient-to-r from-primary to-red-500 rounded-full opacity-60" />
            </div>
            <div className="flex text-xs">
              <span className="text-emerald-600 dark:text-emerald-400 w-[60%]">Fokus tajam, output berkualitas</span>
              <span className="text-red-500">Drift, halusinasi, missed details</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-3">
            <div className="text-xs border border-border rounded p-2">
              <span className="font-semibold text-foreground">/compact</span>
              <p className="text-muted-foreground mt-1">Summarize session saat ini → kembali ke Smart Zone. Untuk single-threaded long work.</p>
            </div>
            <div className="text-xs border border-border rounded p-2">
              <span className="font-semibold text-foreground">/handoff</span>
              <p className="text-muted-foreground mt-1">Split ke session baru → keep session saat ini pure. Untuk parallel concerns.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div>
        <h3 className="text-lg font-semibold mb-4">4 Masalah Utama yang Dipecahkan</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {failureModes.map((mode) => (
            <Card key={mode.title} className={`${mode.borderClass}`}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold">
                  {mode.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  {mode.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {mode.fix.map((f) => (
                    <Badge key={f} variant="default" className="text-xs">
                      {f}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* User-invoked vs Model-invoked */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Tipe Invokasi</h3>
        <p className="text-sm text-muted-foreground">
          Skills dibagi menjadi dua tipe berdasarkan siapa yang memanggilnya:
        </p>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Badge variant="default" className="text-xs">User-invoked</Badge>
            <span className="text-sm text-muted-foreground">— dipanggil langsung oleh user (misal: /grill-with-docs)</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">Model-invoked</Badge>
            <span className="text-sm text-muted-foreground">— dipanggil otomatis oleh agent saat dibutuhkan (misal: /tdd)</span>
          </div>
        </div>
      </div>
    </section>
  )
}
