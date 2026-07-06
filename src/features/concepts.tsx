import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'

export function Concepts() {
  return (
    <section id="concepts" className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Konsep Kunci</h2>
        <p className="text-muted-foreground mt-1">
          Mental model yang mendasari sistem skills ini.
        </p>
      </div>

      {/* Deep vs Shallow Modules */}
      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="text-base">Deep vs Shallow Modules</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            "AI is not a super-powered developer. It's a new starter with no memory."
            Setiap kali spawn agent, ia seperti Guy dari Memento masuk ke codebase:
            "Okay, I'm here, what am I doing?" Codebase-mu adalah pengaruh TERBESAR
            terhadap output AI — lebih besar dari prompt atau AGENTS.md.
          </p>
          <p className="text-sm text-muted-foreground">
            Deep module = banyak implementasi di balik interface sederhana. Shallow module =
            interface hampir sekompleks implementasinya. Dengan deep modules, AI bisa membaca
            interface types dan memahami apa yang dilakukan module — tanpa menggali implementasi.
          </p>
          <div className="grid grid-cols-2 gap-4 font-mono text-xs">
            <div className="border-2 border-emerald-600 rounded p-3 text-center">
              <div className="border-b border-border pb-2 mb-2 font-semibold">
                narrow interface
              </div>
              <div className="h-24 flex items-center justify-center bg-emerald-50 dark:bg-emerald-900/20 rounded">
                deep implementation
              </div>
              <p className="mt-2 text-emerald-700 dark:text-emerald-400 font-semibold">✓ Deep module</p>
            </div>
            <div className="border-2 border-red-500 rounded p-3 text-center">
              <div className="border-b border-border pb-2 mb-2 font-semibold">
                wide interface
              </div>
              <div className="h-8 flex items-center justify-center bg-red-50 dark:bg-red-900/20 rounded">
                shallow impl
              </div>
              <p className="mt-2 text-red-600 dark:text-red-400 font-semibold">✗ Shallow module</p>
            </div>
          </div>

          {/* Grey Box Modules */}
          <div className="border border-border rounded p-4 mt-4 space-y-2">
            <p className="text-sm font-semibold">Grey Box Modules</p>
            <p className="text-xs text-muted-foreground">
              Deep modules menciptakan natural seam. Kamu own interface-nya, AI own implementasinya.
              Tests keep it honest. Kamu bisa lihat ke dalam jika mau — untuk apply taste, influence outcome,
              atau improve performance — tapi selama tests pass, kamu tidak PERLU peduli.
            </p>
            <div className="font-mono text-xs grid grid-cols-3 gap-2 mt-2">
              <div className="border border-emerald-600 rounded p-2 text-center bg-emerald-50 dark:bg-emerald-900/10">
                <span className="font-semibold">You</span>
                <p className="text-muted-foreground mt-1">Design interface</p>
              </div>
              <div className="border border-sky-600 rounded p-2 text-center bg-sky-50 dark:bg-sky-900/10">
                <span className="font-semibold">Tests</span>
                <p className="text-muted-foreground mt-1">Lock behavior</p>
              </div>
              <div className="border border-purple-600 rounded p-2 text-center bg-purple-50 dark:bg-purple-900/10">
                <span className="font-semibold">AI</span>
                <p className="text-muted-foreground mt-1">Implements</p>
              </div>
            </div>
          </div>

          {/* Progressive Disclosure */}
          <div className="border border-border rounded p-4 space-y-2">
            <p className="text-sm font-semibold">Progressive Disclosure of Complexity</p>
            <p className="text-xs text-muted-foreground">
              Berikan setiap module folder-nya sendiri dengan public interface yang jelas.
              AI bisa lihat semua services di file system, baca types-nya, dan pahami fungsinya —
              tanpa menggali implementasi. Interface di top, detail di dalam. Reduced cognitive burnout:
              instead of ratusan interrelated modules, kamu hanya keep 7-8 chunks di kepala.
            </p>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Smart Zone vs Dumb Zone */}
      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="text-base">Smart Zone vs Dumb Zone</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Context window Claude Code = 1 juta token. Tapi ada sweet spot:
            di awal window, attention relationships belum strained, agent bisa fokus lebih baik.
            Setelah ~120k token, response gradually jadi dumber — Matt personally merasa sudah masuk "dumb zone."
          </p>
          {/* Visual progress bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0 tokens</span>
              <span className="font-semibold text-foreground">~120k (batas Smart Zone)</span>
              <span>1M tokens</span>
            </div>
            <div className="h-5 rounded-full bg-secondary overflow-hidden relative">
              <div className="absolute inset-y-0 left-0 w-[12%] bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-l-full" />
              <div className="absolute inset-y-0 left-[12%] w-[88%] bg-gradient-to-r from-amber-400 via-red-400 to-red-600 rounded-r-full opacity-50" />
              <div className="absolute inset-0 flex items-center px-3">
                <div className="w-[12%] text-center text-[10px] font-bold text-white">SMART</div>
              </div>
            </div>
            <div className="flex text-xs gap-4 mt-1">
              <span className="text-emerald-600 dark:text-emerald-400">✓ Fokus tajam, output berkualitas</span>
              <span className="text-red-500">✗ Attention terdifusi, missed details, drift</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="border border-border rounded p-3 space-y-1">
              <p className="font-semibold text-foreground">/compact — Recover Intelligence</p>
              <p className="text-muted-foreground">
                Summarize conversation besar → kembali ke smart zone. Seperti sedimen —
                layers of previous conversations. Bagus untuk single-threaded debugging.
              </p>
            </div>
            <div className="border border-border rounded p-3 space-y-1">
              <p className="font-semibold text-foreground">/handoff — Split Concerns</p>
              <p className="text-muted-foreground">
                Ambil slice context → berikan ke session baru → keep session saat ini pure.
                Tidak clobber progress. Cross-agent portable (Claude → Codex → Copilot).
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Vertical Slices */}
      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="text-base">Vertical Slices / Tracer Bullets</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Setiap issue harus memotong SEMUA layer end-to-end (UI → API → DB → Tests).
            Jangan pernah pecah kerja secara horizontal — itu menciptakan handoff problems
            dan partially finished work yang tidak bisa diverifikasi.
          </p>

          {/* Bad vs Good comparison */}
          <div className="grid grid-cols-2 gap-4">
            <div className="border-2 border-red-500/50 rounded p-3 space-y-2">
              <p className="text-xs font-semibold text-red-600 dark:text-red-400">✗ Horizontal (BAD)</p>
              <div className="font-mono text-[11px] space-y-1 text-muted-foreground">
                <p>1. Build the schema</p>
                <p>2. Build the API</p>
                <p>3. Build the UI</p>
                <p>4. Add tests</p>
              </div>
              <p className="text-[10px] text-red-500 mt-2">
                → Handoff problems, partially finished work, nothing verifiable until step 4
              </p>
            </div>
            <div className="border-2 border-emerald-500/50 rounded p-3 space-y-2">
              <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">✓ Vertical (GOOD)</p>
              <div className="font-mono text-[11px] space-y-1 text-muted-foreground">
                <p>1. User can create simplest thing E2E</p>
                <p>2. User can edit one field E2E</p>
                <p>3. User sees first validation error E2E</p>
              </div>
              <p className="text-[10px] text-emerald-500 mt-2">
                → Each slice includes schema+API+UI+tests, independently verifiable
              </p>
            </div>
          </div>

          <div className="font-mono text-xs border border-border rounded p-4">
            <div className="grid grid-cols-4 gap-1 text-center relative">
              <div className="bg-secondary p-2 rounded">UI</div>
              <div className="bg-secondary p-2 rounded">API</div>
              <div className="bg-secondary p-2 rounded">DB</div>
              <div className="bg-secondary p-2 rounded">Test</div>
              {/* Highlight overlay */}
              <div className="absolute inset-0 border-2 border-primary rounded opacity-60 pointer-events-none" />
            </div>
            <div className="mt-3 text-center">
              <span className="inline-block px-3 py-1 rounded bg-primary/10 text-primary font-semibold">
                ← satu tracer bullet memotong semua layer →
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* AFK vs HITL */}
      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="text-base">AFK vs HITL</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Setiap vertical slice ditandai salah satu mode kerja. Ini menentukan apakah
            kamu bisa tinggalkan agent bekerja sendiri, atau perlu hadir untuk checkpoint.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-emerald-600/50 rounded p-4 space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="default" className="text-xs bg-emerald-600">AFK</Badge>
                <span className="text-sm font-semibold">Away From Keyboard</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Agent bisa implement tanpa input manusia lagi. Spec cukup jelas,
                tidak ada design decision yang belum resolved. Prefer mode ini.
              </p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-mono">
                "Agent can grab this and run"
              </p>
            </div>
            <div className="border border-amber-600/50 rounded p-4 space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs bg-amber-600 text-white">HITL</Badge>
                <span className="text-sm font-semibold">Human In The Loop</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Agent butuh human checkpoint — design review, architectural decision,
                atau judgment call yang belum resolved. Tidak bisa ditinggal jalan sendiri.
              </p>
              <p className="text-xs text-amber-600 dark:text-amber-400 font-mono">
                "Needs your eyes before proceeding"
              </p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground italic">
            /to-issues secara aktif prefer AFK slices. Semakin banyak AFK slices,
            semakin banyak yang bisa kamu serahkan ke agent untuk dikerjakan paralel.
          </p>
        </CardContent>
      </Card>

      <Separator />

      {/* Seams */}
      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="text-base">Seams & Test Surface</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Seam = public interface di mana behavior bisa berubah tanpa editing in place.
            Interface IS the test surface — callers dan tests cross seam yang sama.
            Kalau perlu test private implementation, berarti module boundary-nya salah.
          </p>
          <div className="text-xs border border-border rounded p-3 space-y-2">
            <p className="font-semibold">Vocabulary ketat dari /codebase-design:</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-muted-foreground">
              <span><span className="font-semibold text-foreground">Module:</span> sesuatu dengan interface + implementation</span>
              <span><span className="font-semibold text-foreground">Interface:</span> semua yang caller harus tahu</span>
              <span><span className="font-semibold text-foreground">Depth:</span> leverage dari interface</span>
              <span><span className="font-semibold text-foreground">Seam:</span> tempat behavior bisa vary</span>
              <span><span className="font-semibold text-foreground">Adapter:</span> concrete thing di seam</span>
              <span><span className="font-semibold text-foreground">Locality:</span> related change tetap berdekatan</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Context Hygiene */}
      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="text-base">Context Hygiene</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Jaga CONTEXT.md sebagai glossary saja — definisi vocabulary, bukan narasi atau spec.
            ADR hanya untuk keputusan yang memenuhi 3 syarat: hard to reverse + surprising without context + real trade-off.
            Prototype dihapus setelah pertanyaannya terjawab. Setiap file di context harus earn its place.
          </p>
          <div className="text-xs border border-border rounded p-3 space-y-1 text-muted-foreground">
            <p><span className="font-semibold text-foreground">CONTEXT.md:</span> Pure glossary. Bukan spec, scratchpad, atau implementation detail.</p>
            <p><span className="font-semibold text-foreground">ADR (docs/adr/):</span> Sparingly. Hanya 3-syarat decisions. Most sessions = 0 ADRs.</p>
            <p><span className="font-semibold text-foreground">Prototype:</span> Disposable. Capture answer → delete code.</p>
            <p><span className="font-semibold text-foreground">Handoff docs:</span> Temp dir. Disposable working docs, bukan permanent.</p>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Leading Words */}
      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="text-base">Leading Words</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Mulai setiap instruksi dengan kata yang paling penting — compact concept dari pretraining
            yang anchor behavior. Satu token menggantikan paragraf. Contoh: "tight" loop (bukan "fast, deterministic,
            low-overhead" loop), "red-green" (bukan "write test first then implement"), "tracer bullet"
            (bukan "thin vertical slice that proves a path works end-to-end").
          </p>
        </CardContent>
      </Card>
    </section>
  )
}
