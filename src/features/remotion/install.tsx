import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CodeBlock } from '@/components/code-block'
import { getLocale } from '@/paraglide/runtime.js'

const INSTALL = [
  'npx skills@latest add remotion-dev/skills',
  '# Atau saat membuat proyek baru:',
  'bun create video',
].join('\n')

export function RemotionInstall() {
  const isEn = getLocale() === 'en'

  return (
    <section id="installation" className="scroll-mt-20 space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Installation</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          {isEn
            ? 'Install official skills from the Remotion upstream repository.'
            : 'Install skill resmi dari repository upstream Remotion.'}
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
              ? '`bun create video` also offers these skills when scaffolding a new Remotion project. Docs: https://www.remotion.dev/docs/ai/skills'
              : '`bun create video` juga menawarkan skill ini saat scaffold proyek Remotion baru. Docs: https://www.remotion.dev/docs/ai/skills'}
          </p>
          <p className="text-xs text-muted-foreground">
            {isEn
              ? 'Pinned commit 039e8a2 has no LICENSE file; GitHub reports no license for remotion-dev/skills.'
              : 'Commit pin 039e8a2 tidak punya file LICENSE; GitHub melaporkan tidak ada license untuk remotion-dev/skills.'}
          </p>
        </CardContent>
      </Card>
    </section>
  )
}
