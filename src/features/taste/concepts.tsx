import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getLocale } from '@/paraglide/runtime.js'

const bans = [
  ['Eyebrow', 'Label kecil di atas heading'],
  ['01 / 02 / 03', 'Nomor indeks sebagai ornamen'],
  ['Hairline', 'Garis 1px dan kotak outline'],
  ['Gradient', 'Latar, tombol, atau teks'],
  ['Resting shadow', 'Bayangan pada elemen yang diam'],
  ['Glass', 'Blur dan nav pill mengambang'],
]

export function TasteConcepts() {
  const isEn = getLocale() === 'en'

  return (
    <section id="concepts" className="scroll-mt-20 space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-balance">
          {isEn ? 'How v2 decides a page' : 'Bagaimana v2 memutuskan sebuah halaman'}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {isEn
            ? 'A draw picks the direction. The inspector measures the limits. The two legacy skills still use dials.'
            : 'Draw memilih arah. Inspector mengukur batas. Dua skill lama masih memakai dial.'}
        </p>
      </div>

      <Card className="border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            {isEn ? 'Draw, then inspect' : 'Draw, lalu inspect'}
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            {isEn
              ? 'Current v2 has no 1–10 dials. Direction comes from the draw; limits come from the inspector.'
              : 'v2 saat ini tidak punya dial 1–10. Arah datang dari draw; batas datang dari inspector.'}
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 font-mono text-xs">
            <div className="space-y-2 rounded-lg border-2 border-primary/50 bg-primary/5 p-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-primary">draw.mjs</span>
                <Badge variant="outline" className="text-[10px]">3 of 20</Badge>
              </div>
              <p className="font-sans text-[11px] leading-relaxed text-muted-foreground">
                {isEn
                  ? 'Deals a hero, section blueprints, a type system of real free fonts, a palette, photographs, and a motion. The agent adopts one direction. It does not blend it with the layout it would have made anyway.'
                  : 'Membagi hero, blueprint section, sistem huruf dari font gratis sungguhan, palet, foto, dan motion. Agen mengadopsi satu arah. Tidak mencampurnya dengan layout yang akan dibuat sendiri.'}
              </p>
            </div>
            <div className="space-y-2 rounded-lg border-2 border-emerald-500/50 bg-emerald-500/5 p-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-600 dark:text-emerald-400">inspect.mjs</span>
                <Badge className="bg-emerald-500/20 text-[10px] text-emerald-600 dark:text-emerald-400">
                  1440 / 768 / 390
                </Badge>
              </div>
              <p className="font-sans text-[11px] leading-relaxed text-muted-foreground">
                {isEn
                  ? 'A real browser measures the house rules, then the agent reads the screenshots and fixes the top three problems. At most three rounds. Needs Node 22+ and Chrome, Edge, or Chromium.'
                  : 'Browser sungguhan mengukur house rules, lalu agen membaca screenshot dan memperbaiki tiga masalah teratas. Maksimal tiga putaran. Butuh Node 22+ dan Chrome, Edge, atau Chromium.'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            {isEn ? 'House rules the inspector fails' : 'House rules yang digagalkan inspector'}
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            {isEn
              ? 'These hold on every v2 build, whatever direction was dealt. Code blocks, real tables, and a root marked data-ui are left alone.'
              : 'Berlaku di setiap build v2, arah apa pun yang terbagi. Blok kode, tabel sungguhan, dan root bertanda data-ui tidak disentuh.'}
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-3">
            {bans.map(([name, id]) => (
              <div key={name} className="space-y-1 rounded border border-border bg-muted/20 p-3">
                <span className="block font-mono text-xs font-bold text-foreground">{name}</span>
                <p className="font-sans text-[11px] text-muted-foreground">
                  {isEn ? 'Banned on a v2 page.' : id}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            {isEn ? 'Which skill, when' : 'Skill mana, kapan'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 font-mono text-xs">
            {[
              ['design-taste-frontend', isEn ? 'New public page. Not a dashboard.' : 'Halaman publik baru. Bukan dashboard.'],
              ['redesign-existing-projects', isEn ? 'Audit first, then fix in place.' : 'Audit dulu, lalu perbaiki di tempat.'],
              ['minimalist-ui', isEn ? 'Product UI. Warm monochrome, flat cards.' : 'UI produk. Monokrom hangat, kartu flat.'],
              ['high-end-visual-design', isEn ? 'Calm and expensive. Soft contrast, spring motion.' : 'Tenang dan mahal. Kontras lembut, motion pegas.'],
              ['industrial-brutalist-ui', isEn ? 'Mechanical print. Do not mix with v2 bans.' : 'Cetak mekanis. Jangan dicampur larangan v2.'],
              ['imagegen-* / brandkit', isEn ? 'Images only. Hand the frames to a coding agent.' : 'Gambar saja. Serahkan frame ke agen kode.'],
            ].map(([name, text]) => (
              <div key={name} className="space-y-1 rounded border border-border bg-muted/20 p-3">
                <span className="block font-bold text-foreground">{name}</span>
                <p className="font-sans text-[11px] text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
