import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CodeBlock } from '@/components/code-block'
import { getLocale } from '@/paraglide/runtime.js'

const INSTALL = [
  'npx skills@latest add neondatabase/agent-skills',
  '# Official Neon agent skills (Apache-2.0)',
].join('\n')

export function NeonInstall() {
  const isEn = getLocale() === 'en'

  return (
    <section id="installation" className="scroll-mt-20 space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Installation</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          {isEn
            ? 'Install official skills directly from the Neon upstream repository.'
            : 'Install skill resmi langsung dari repository upstream Neon.'}
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
              ? 'The repo root is also an Agent Plugins package; Claude Code and Cursor packaging under plugins/ remains available for clients that expect those formats.'
              : 'Root repo juga merupakan paket Agent Plugins; packaging Claude Code dan Cursor di bawah plugins/ tetap tersedia untuk klien yang mengharapkan format itu.'}
          </p>
          <p className="text-xs text-muted-foreground">
            Licensed under the Apache-2.0 License © Neon
          </p>
        </CardContent>
      </Card>
    </section>
  )
}
