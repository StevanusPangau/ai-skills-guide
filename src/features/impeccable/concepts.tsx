import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { getLocale } from '@/paraglide/runtime.js'

export function ImpeccableConcepts() {
  const isEn = getLocale() === 'en'

  return (
    <section id="concepts" className="scroll-mt-20 space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-balance">
          {isEn ? 'Impeccable Design System Architecture' : 'Arsitektur Sistem Desain Impeccable'}
        </h2>
        <p className="mt-1 text-muted-foreground text-sm">
          {isEn
            ? 'Core mental models: one skill with many commands, the PRODUCT.md / DESIGN.md pair, visitor modes, and the craft floor.'
            : 'Model mental inti: satu skill dengan banyak command, pasangan PRODUCT.md / DESIGN.md, mode pengunjung, dan craft floor.'}
        </p>
      </div>

      {/* Model 1: Dual Spec Architecture */}
      <Card className="border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            {isEn ? 'One Skill, Many Commands: PRODUCT.md & DESIGN.md' : 'Satu Skill, Banyak Command: PRODUCT.md & DESIGN.md'}
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            {isEn
              ? 'Impeccable is a single user-invocable skill: /impeccable <command> [target]. Every command reads the project context first.'
              : 'Impeccable adalah satu skill yang dipanggil pengguna: /impeccable <command> [target]. Setiap command membaca konteks proyek lebih dulu.'}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 font-mono text-xs">
            <div className="rounded-lg border-2 border-primary/50 bg-primary/5 p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-primary">PRODUCT.md</span>
                <Badge variant="outline" className="text-[10px]">/impeccable init</Badge>
              </div>
              <p className="text-[11px] text-muted-foreground font-sans leading-relaxed">
                {isEn
                  ? 'Durable product truth: users, purpose, positioning, constraints, voice, platform (web, ios, android, adaptive). Written by init; it holds no visual decisions.'
                  : 'Kebenaran produk yang tahan lama: pengguna, tujuan, posisi, batasan, suara, platform (web, ios, android, adaptive). Ditulis oleh init; tidak berisi keputusan visual.'}
              </p>
            </div>

            <div className="rounded-lg border-2 border-emerald-500/50 bg-emerald-500/5 p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-600 dark:text-emerald-400">DESIGN.md</span>
                <Badge className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px]">/impeccable document</Badge>
              </div>
              <p className="text-[11px] text-muted-foreground font-sans leading-relaxed">
                {isEn
                  ? 'The visual design system in the Google Stitch DESIGN.md format: YAML token frontmatter plus ordered prose sections. Produced by document (existing code) or new-work (a new visual world), never by init.'
                  : 'Sistem desain visual dalam format Google Stitch DESIGN.md: frontmatter token YAML plus bagian prosa berurutan. Dihasilkan oleh document (kode yang ada) atau new-work (dunia visual baru), tidak pernah oleh init.'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Model 2: Craft Floor Invariant */}
      <Card className="border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            {isEn ? 'The Craft Floor' : 'Craft Floor (Batas Bawah Kualitas)'}
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            {isEn
              ? 'Loaded before any UI edit (reference/craft-floor.md): the quality floor, the absolute bans and the reflexes no detector catches.'
              : 'Dimuat sebelum edit UI apa pun (reference/craft-floor.md): batas bawah kualitas, larangan mutlak, dan refleks yang tidak tertangkap detector.'}
          </p>
        </CardHeader>
        <CardContent className="space-y-3 text-xs">
          <div className="grid gap-3 sm:grid-cols-3 font-mono">
            <div className="border border-border rounded p-3 bg-muted/20 space-y-1">
              <span className="font-bold text-foreground block">1. Contrast (WCAG AA)</span>
              <p className="text-[11px] text-muted-foreground font-sans">
                Teks body dan placeholder minimal 4.5:1, teks besar 3:1 (batas WCAG AA; AAA butuh 7:1 / 4.5:1). Teks sekunder di permukaan berwarna ditint dari hue, bukan abu-abu.
              </p>
            </div>
            <div className="border border-border rounded p-3 bg-muted/20 space-y-1">
              <span className="font-bold text-foreground block">2. Type & Spacing</span>
              <p className="text-[11px] text-muted-foreground font-sans">
                Measure body 65–75ch, grup rapat dan pemisahan lega, lebih banyak ruang di atas heading daripada di bawahnya; jalankan copy asli di setiap breakpoint.
              </p>
            </div>
            <div className="border border-border rounded p-3 bg-muted/20 space-y-1">
              <span className="font-bold text-foreground block">3. States & Motion</span>
              <p className="text-[11px] text-muted-foreground font-sans">
                Hover, disabled, loading, error, empty, plus fokus keyboard; satu momen gerak yang dirancang, bukan efek tersebar.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Model: Visitor modes */}
      <Card className="border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            {isEn ? 'Visitor Modes' : 'Mode Pengunjung'}
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            {isEn
              ? 'The mode names what the visitor’s success looks like on a surface. It is chosen per surface, from the requested surface rather than the product.'
              : 'Mode menamai wujud keberhasilan pengunjung pada sebuah permukaan. Dipilih per permukaan, dari permukaan yang diminta, bukan dari produknya.'}
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-4 font-mono text-xs">
            {[
              ['Persuade', isEn ? 'Visitor decides and acts: landing pages, campaigns, pricing.' : 'Pengunjung memutuskan dan bertindak: landing page, kampanye, harga.'],
              ['Operate', isEn ? 'Visitor completes a task: app UI, dashboards, editors, settings.' : 'Pengunjung menyelesaikan tugas: UI app, dashboard, editor, settings.'],
              ['Read', isEn ? 'Visitor understands something: docs, articles, guides, changelogs.' : 'Pengunjung memahami sesuatu: docs, artikel, panduan, changelog.'],
              ['Experience', isEn ? 'Visitor is inside the work: portfolios, galleries, showcases.' : 'Pengunjung berada di dalam karya: portofolio, galeri, showcase.'],
            ].map(([name, text]) => (
              <div key={name} className="border border-border rounded p-3 bg-muted/20 space-y-1">
                <span className="font-bold text-foreground block">{name}</span>
                <p className="text-[11px] text-muted-foreground font-sans">{text}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Model 3: Anti-AI Slop Manifesto */}
      <Card className="border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            {isEn ? 'Anti-AI-Slop: Detector + Refusals' : 'Anti-AI-Slop: Detector + Penolakan'}
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            {isEn
              ? '61 deterministic detector rules (CLI, browser extension, design hook) plus LLM-only critique checks.'
              : '61 aturan detector deterministik (CLI, ekstensi browser, design hook) plus pemeriksaan critique khusus LLM.'}
          </p>
        </CardHeader>
        <CardContent className="space-y-3 text-xs">
          <div className="rounded bg-muted/40 p-3 text-muted-foreground leading-relaxed border-l-2 border-primary/50">
            <strong className="text-foreground">{isEn ? 'Core Tenet: ' : 'Prinsip Inti: '}</strong>
            {isEn
              ? 'Models trained on the same SaaS templates repeat the same tells: Inter for everything, purple-to-blue gradients, cards nested in cards, gray text on colored backgrounds. Impeccable pairs the detector (npx impeccable detect) with a craft floor and explicit refusals, while the brief wins: pinned fonts, palettes and eras are honored even when they trip a warning.'
              : 'Model yang dilatih pada template SaaS yang sama mengulang tanda yang sama: Inter untuk semuanya, gradien ungu-biru, card bersarang, teks abu-abu di latar berwarna. Impeccable memasangkan detector (npx impeccable detect) dengan craft floor dan penolakan eksplisit, sementara brief tetap menang: font, palet, dan era yang dipatok dihormati meski memicu peringatan.'}
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
