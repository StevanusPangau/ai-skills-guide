import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getLocale } from '@/paraglide/runtime.js'

export function VercelConcepts() {
  const isEn = getLocale() === 'en'

  return (
    <section id="concepts" className="scroll-mt-20 space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-balance">
          {isEn
            ? 'Build, Review, Ship, Optimize'
            : 'Bangun, Review, Deploy, Optimasi'}
        </h2>
        <p className="mt-1 text-muted-foreground text-sm">
          {isEn
            ? 'Key principles distilled from Vercel\'s official skills across the app lifecycle.'
            : 'Prinsip kunci yang disarikan dari skill resmi Vercel di sepanjang siklus hidup aplikasi.'}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Performance rules ranked by impact */}
        <Card className="border-border">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between gap-2">
              <CardTitle className="text-base">
                {isEn ? 'Waterfalls First, Bundle Second' : 'Waterfalls Dulu, Bundle Kedua'}
              </CardTitle>
              <Badge variant="outline" className="font-mono text-[11px]">/vercel-react-best-practices</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              {isEn
                ? 'Sequential awaits are the #1 performance killer. Run independent async work with Promise.all, defer awaits into the branches that use them, then trim the bundle: no barrel imports, dynamic-import heavy components.'
                : 'Await berurutan adalah killer performa nomor satu. Jalankan operasi async independen dengan Promise.all, pindahkan await ke cabang yang memakainya, lalu pangkas bundle: hindari barrel imports, dynamic-import komponen berat.'}
            </p>
            <div className="rounded-md bg-muted/60 p-2.5 font-mono text-xs text-foreground">
              const [user, posts] = await Promise.all([fetchUser(), fetchPosts()])
            </div>
          </CardContent>
        </Card>

        {/* Composition over boolean props */}
        <Card className="border-border">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between gap-2">
              <CardTitle className="text-base">
                {isEn ? 'Composition over Boolean Props' : 'Komposisi di Atas Boolean Props'}
              </CardTitle>
              <Badge variant="outline" className="font-mono text-[11px]">/vercel-composition-patterns</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              {isEn
                ? 'Each boolean prop doubles component states. Structure complex components as compound components with a shared context (state, actions, meta) so variants stay explicit and state is dependency-injectable.'
                : 'Setiap boolean prop menggandakan jumlah state komponen. Susun komponen kompleks sebagai compound components dengan context bersama (state, actions, meta) agar varian eksplisit dan state bisa dependency-injection.'}
            </p>
            <div className="rounded-md bg-muted/60 p-2.5 font-mono text-xs text-foreground">
              {'<Composer.Frame><Composer.Input /><Composer.Footer /></Composer.Frame>'}
            </div>
          </CardContent>
        </Card>

        {/* Review gates */}
        <Card className="border-border">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between gap-2">
              <CardTitle className="text-base">
                {isEn ? 'Fresh Review Gates Before Ship' : 'Gerbang Review Segar Sebelum Ship'}
              </CardTitle>
              <Badge variant="outline" className="font-mono text-[11px]">/web-design-guidelines</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              {isEn
                ? 'The guidelines skills fetch the latest handbook before every review instead of trusting memorized rules — UI gets audited against Web Interface Guidelines, prose against the Writing Guidelines, findings reported as terse file:line entries.'
                : 'Skill guidelines selalu fetch handbook terbaru sebelum tiap review, bukan mengandalkan aturan yang dihafal — UI diaudit terhadap Web Interface Guidelines, prosa terhadap Writing Guidelines, temuan dilaporkan ringkas per file:line.'}
            </p>
            <div className="rounded-md bg-muted/60 p-2.5 font-mono text-xs text-foreground">
              fetch guidelines → read files → apply rules → file:line findings
            </div>
          </CardContent>
        </Card>

        {/* Metrics-first deploy and optimize */}
        <Card className="border-border">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between gap-2">
              <CardTitle className="text-base">
                {isEn ? 'Preview Deploys, Metrics-First Audits' : 'Preview Deploy, Audit Berbasis Metrik'}
              </CardTitle>
              <Badge variant="outline" className="font-mono text-[11px]">/deploy-to-vercel</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              {isEn
                ? 'Deploy as preview by default and steer projects toward linked git-push deploys. After traffic accumulates, vercel-optimize collects 14 days of Vercel metrics before reading a single source file — recommendations must trace to metric-backed candidates.'
                : 'Deploy selalu sebagai preview dan arahkan proyek ke setup ter-link dengan git-push deploys. Setelah traffic terkumpul, vercel-optimize mengumpulkan metrik Vercel 14 hari sebelum membaca satu pun source file — rekomendasi wajib berakar pada kandidat berbasis metrik.'}
            </p>
            <div className="rounded-md bg-muted/60 p-2.5 font-mono text-xs text-foreground">
              vercel deploy -y --no-wait → vercel inspect {'<url>'}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
