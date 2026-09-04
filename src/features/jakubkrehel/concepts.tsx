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
            ? 'The mathematical and optical rules behind Jakub Krehel\'s precision UI standards (interfaces.dev).'
            : 'Aturan matematis dan optis di balik standar antarmuka presisi Jakub Krehel (interfaces.dev).'}
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
              <Badge variant="outline" className="font-mono text-[11px]">R_in = R_out - P</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              {isEn
                ? 'Nested elements sharing identical border radius look visually broken. For curves to be concentric, the inner radius must equal the outer radius minus the container padding.'
                : 'Elemen bersarang dengan border-radius seragam akan terlihat canggung dan tidak harmonis. Agar lengkungan sepusat (concentric), radius dalam harus sama dengan radius luar dikurangi padding.'}
            </p>
            <div className="rounded-md bg-muted/60 p-2.5 font-mono text-xs text-foreground">
              border-radius: max(0px, var(--parent-radius) - var(--padding));
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
              <Badge variant="outline" className="font-mono text-[11px]">+2px X-Offset</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              {isEn
                ? 'Asymmetrical icons (e.g. Play triangle, Chevrons) centered via geometric bounding boxes appear displaced towards their visual weight. They require intentional subpixel optical shifts.'
                : 'Ikon asimetris (seperti segitiga Play atau panah) yang diletakkan persis di tengah kotak pembungkus geometris akan tampak miring karena distribusi beban visualnya. Butuh kompensasi offset optis manual.'}
            </p>
            <div className="rounded-md bg-muted/60 p-2.5 font-mono text-xs text-foreground">
              /* Play button center shift */ translate-x-[2px]
            </div>
          </CardContent>
        </Card>

        {/* OKLCH Uniform Lightness */}
        <Card className="border-border">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between gap-2">
              <CardTitle className="text-base">
                {isEn ? 'Perceptual Lightness (OKLCH)' : 'Keseragaman Terang Perseptual (OKLCH)'}
              </CardTitle>
              <Badge variant="outline" className="font-mono text-[11px]">in oklch</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              {isEn
                ? 'Traditional sRGB gradients lose saturation and darken at the midpoint. OKLCH interpolates around the perceptual color wheel, keeping brightness uniform across steps.'
                : 'Gradasi warna sRGB tradisional seringkali menggelap atau menjadi keabuan di titik tengah. OKLCH menginterpolasi warna berdasarkan persepsi mata manusia sehingga tingkat terang tetap konstan.'}
            </p>
            <div className="rounded-md bg-muted/60 p-2.5 font-mono text-xs text-foreground">
              background: linear-gradient(in oklch to right, #38bdf8, #818cf8);
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
                ? 'Proportional numbers cause jitter and layout shift as values increment (e.g. timer, metrics, financial tables). Always enforce monospace figures via OpenType tabular numbers.'
                : 'Angka proporsional standar menyebabkan getaran (layout shift) saat angka berganti cepat (timer, counter, tabel finansial). Wajib gunakan angka dengan lebar seragam via OpenType tabular numbers.'}
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
