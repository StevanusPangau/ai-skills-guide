import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getLocale } from '@/paraglide/runtime.js'

export function JakubConcepts() {
  const isEn = getLocale() === 'en'

  return (
    <section id="concepts" className="scroll-mt-20 space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-balance">
          {isEn ? 'Core Design Engineering Concepts' : 'Konsep Kunci Design Engineering'}
        </h2>
        <p className="mt-1 text-muted-foreground text-sm">
          {isEn
            ? 'Rules from the better-* skills that make interfaces feel right (jakubkrehel/skills, interfaces.dev).'
            : 'Aturan dari skill better-* yang membuat antarmuka terasa tepat (jakubkrehel/skills, interfaces.dev).'}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Concentric Border Radius */}
        <Card className="border-border">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between gap-2">
              <CardTitle className="text-base">
                {isEn ? 'Concentric Radius Formula' : 'Formula Radius Sepusat'}
              </CardTitle>
              <Badge variant="outline" className="font-mono text-[11px]">outer = inner + padding</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              {isEn
                ? 'Nested elements sharing an identical border radius look off. For curves to be concentric the outer radius equals the inner radius plus the padding between them. It matters most when surfaces sit close together; past 24px of padding, treat them as separate surfaces.'
                : 'Elemen bersarang dengan border-radius seragam tampak janggal. Agar lengkungan sepusat, radius luar sama dengan radius dalam ditambah padding di antaranya. Paling penting bila permukaan berdekatan; di atas padding 24px, perlakukan sebagai permukaan terpisah.'}
            </p>
            <div className="rounded-md bg-muted/60 p-2.5 font-mono text-xs text-foreground">
              .card {'{'} border-radius: 20px; padding: 8px; {'}'} /* 12 + 8 */<br />
              .card-inner {'{'} border-radius: 12px; {'}'}
            </div>
          </CardContent>
        </Card>

        {/* Optical Alignment */}
        <Card className="border-border">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between gap-2">
              <CardTitle className="text-base">
                {isEn ? 'Geometric vs Optical Centering' : 'Pusat Geometri vs Keseimbangan Optis'}
              </CardTitle>
              <Badge variant="outline" className="font-mono text-[11px]">optical alignment</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              {isEn
                ? 'When geometric centering looks off, align optically. A play triangle\'s geometric center is not its visual center, so it is shifted slightly right; for buttons with an icon, use slightly less padding on the icon side. For other asymmetric icons (stars, arrows, carets), the best fix is the SVG itself.'
                : 'Bila pemusatan geometris terlihat janggal, selaraskan secara optis. Pusat geometris segitiga play bukan pusat visualnya, jadi digeser sedikit ke kanan; untuk tombol berikon, beri padding sedikit lebih kecil di sisi ikon. Untuk ikon asimetris lain (bintang, panah, caret), perbaikan terbaik ada di SVG-nya.'}
            </p>
            <div className="rounded-md bg-muted/60 p-2.5 font-mono text-xs text-foreground">
              .play-button svg {'{'} transform: translateX(2px); {'}'}
            </div>
          </CardContent>
        </Card>

        {/* OKLCH Uniform Lightness */}
        <Card className="border-border">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between gap-2">
              <CardTitle className="text-base">
                {isEn ? 'Gradient Interpolation Space' : 'Ruang Interpolasi Gradasi'}
              </CardTitle>
              <Badge variant="outline" className="font-mono text-[11px]">in oklab</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              {isEn
                ? 'The interpolation space is a look, not a correctness setting. sRGB darkens and mutes at the midpoint; `in oklab` is the best default (even brightness, no hue surprises); `in oklch` arcs around the hue wheel, staying vivid but able to produce hues nobody asked for. Reach for it when a two-hue gradient goes gray in the middle.'
                : 'Ruang interpolasi adalah soal tampilan, bukan pengaturan kebenaran. sRGB menggelap dan memudar di titik tengah; `in oklab` adalah default terbaik (kecerahan merata, tanpa kejutan hue); `in oklch` melengkung mengelilingi roda hue sehingga tetap cerah tetapi bisa memunculkan hue yang tidak diminta. Pakai bila gradasi dua-hue menjadi abu-abu di tengah.'}
            </p>
            <div className="rounded-md bg-muted/60 p-2.5 font-mono text-xs text-foreground">
              background: linear-gradient(in oklab, #3b82f6, #ec4899);
            </div>
          </CardContent>
        </Card>

        {/* Tabular Numerics */}
        <Card className="border-border">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between gap-2">
              <CardTitle className="text-base">
                {isEn ? 'Tabular Figures for Live Data' : 'Tabular Figures (Angka Monospace)'}
              </CardTitle>
              <Badge variant="outline" className="font-mono text-[11px]">tabular-nums</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              {isEn
                ? 'Digits have different widths by default, so timers, counters, and prices shift the layout as they update. Apply tabular figures to any value that changes, using the standard CSS property rather than raw OpenType feature tags.'
                : 'Lebar digit berbeda secara default, sehingga timer, counter, dan harga menggeser layout saat berubah. Terapkan tabular figures pada setiap nilai yang berubah, memakai properti CSS standar, bukan tag fitur OpenType mentah.'}
            </p>
            <div className="rounded-md bg-muted/60 p-2.5 font-mono text-xs text-foreground">
              font-variant-numeric: tabular-nums;
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
