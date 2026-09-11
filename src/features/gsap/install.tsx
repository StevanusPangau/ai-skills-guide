import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CodeBlock } from '@/components/code-block'
import { getLocale } from '@/paraglide/runtime.js'

const INSTALL = [
  'npx skills@latest add greensock/gsap-skills',
  '# Pilih skill saat prompt (mis. gsap-core, gsap-scrolltrigger, gsap-react, gsap-timeline)',
  '# Install langsung dari repository resmi GreenSock (MIT)',
].join('\n')

export function GsapInstall() {
  const isEn = getLocale() === 'en'

  return (
    <section id="installation" className="scroll-mt-20 space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Installation</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          {isEn
            ? 'Install official skills directly from GreenSock’s upstream repository.'
            : 'Install skill resmi langsung dari repository upstream GreenSock.'}
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
              ? 'GSAP is framework-agnostic. For React/Next.js projects, install @gsap/react for the official useGSAP hook.'
              : 'GSAP bersifat framework-agnostic. Untuk proyek React/Next.js, pasang @gsap/react untuk memanfaatkan hook resmi useGSAP.'}
          </p>
          <p className="text-xs text-muted-foreground">Licensed under the MIT License © GreenSock.</p>
        </CardContent>
      </Card>
    </section>
  )
}
