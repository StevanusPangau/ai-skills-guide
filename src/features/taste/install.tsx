import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CodeBlock } from '@/components/code-block'
import { getLocale } from '@/paraglide/runtime.js'

const INSTALL_ONE = 'npx skills@latest add Leonxlnx/taste-skill --skill design-taste-frontend'
const INSTALL_ALL = 'npx skills@latest add Leonxlnx/taste-skill'
const INSTALL_PIN = 'npx skills@latest add Leonxlnx/taste-skill --skill design-taste-frontend-v1'

export function TasteInstall() {
  const isEn = getLocale() === 'en'

  return (
    <section id="installation" className="scroll-mt-20 space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Installation</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          {isEn
            ? 'Install from the upstream repo. The install name is the frontmatter name, not the folder name. Pass --skill or the CLI installs every skill in the repo.'
            : 'Pasang dari repo upstream. Nama install adalah nama di frontmatter, bukan nama folder. Lewatkan --skill, atau CLI akan memasang setiap skill di repo.'}
        </p>
      </div>
      <Card className="border-primary/40">
        <CardHeader className="pb-3">
          <div className="flex flex-wrap items-center gap-3">
            <CardTitle as="h3" className="text-base">
              {isEn ? 'Default skill only' : 'Skill default saja'}
            </CardTitle>
            <Badge>Recommended</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <CodeBlock code={INSTALL_ONE} shell />
          <p className="text-sm text-muted-foreground">
            {isEn
              ? 'Current v2. Needs Node 22+ and Chrome, Edge, or Chromium for the browser inspector. It installs nothing and needs no API key.'
              : 'v2 saat ini. Butuh Node 22+ dan Chrome, Edge, atau Chromium untuk inspector browser. Tidak memasang paket dan tidak butuh API key.'}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle as="h3" className="text-base">
            {isEn ? 'Every skill in the repo' : 'Semua skill di repo'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <CodeBlock code={INSTALL_ALL} shell />
          <p className="text-sm text-muted-foreground">
            {isEn
              ? 'Includes the style variants, the image-generation skills, and the two legacy pins. Do not install the legacy pins as a second default on the same project.'
              : 'Termasuk varian gaya, skill pembuat gambar, dan dua pin versi lama. Jangan memasang pin lama sebagai default kedua di proyek yang sama.'}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle as="h3" className="text-base">
            {isEn ? 'Pin an older version' : 'Pin versi lama'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <CodeBlock code={INSTALL_PIN} shell />
          <p className="text-xs text-muted-foreground">
            MIT © 2026 Leonxlnx. Pin a60a36dc.
          </p>
        </CardContent>
      </Card>
    </section>
  )
}
