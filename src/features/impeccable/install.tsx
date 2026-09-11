import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CodeBlock } from '@/components/code-block'
import { getLocale } from '@/paraglide/runtime.js'

const INSTALL = [
  'npx skills@latest add pbakaus/impeccable',
  '# Pilih skill saat prompt (mis. init, audit, polish, bolder, normalize)',
  '# Install langsung dari repository resmi Paul Bakaus (Apache-2.0)',
].join('\n')

export function ImpeccableInstall() {
  const isEn = getLocale() === 'en'

  return (
    <section id="installation" className="scroll-mt-20 space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Installation</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          {isEn
            ? 'Install official design skills directly from Paul Bakaus’s Impeccable repository.'
            : 'Install skill desain resmi langsung dari repository Impeccable karya Paul Bakaus.'}
        </p>
      </div>
      <Card className="border-primary/40">
        <CardHeader className="pb-3">
          <div className="flex flex-wrap items-center gap-3">
            <CardTitle as="h3" className="text-base">
              Universal CLI (skills.sh)
            </CardTitle>
            <Badge>Recommended</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <CodeBlock code={INSTALL} shell />
          <p className="text-sm text-muted-foreground">
            {isEn
              ? 'Run `init` once per project to generate PRODUCT.md and DESIGN.md before authoring UI.'
              : 'Jalankan `init` sekali per proyek untuk membuat PRODUCT.md dan DESIGN.md sebelum menulis kode UI.'}
          </p>
          <p className="text-xs text-muted-foreground">Licensed under the Apache License 2.0 © Paul Bakaus.</p>
        </CardContent>
      </Card>
    </section>
  )
}
