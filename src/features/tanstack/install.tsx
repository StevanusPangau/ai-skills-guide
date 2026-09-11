import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CodeBlock } from '@/components/code-block'
import { getLocale } from '@/paraglide/runtime.js'

const INSTALL = [
  'npx skills@latest add tanstack-skills/tanstack-skills',
  '# Pilih skill saat prompt (mis. tanstack-router, tanstack-query, tanstack-table, tanstack-start)',
  '# Atau via TanStack Intent: npx @tanstack/intent install',
].join('\n')

export function TanStackInstall() {
  const isEn = getLocale() === 'en'

  return (
    <section id="installation" className="scroll-mt-20 space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Installation</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          {isEn
            ? 'Install official skills directly from TanStack’s upstream repository.'
            : 'Install skill resmi langsung dari repository upstream TanStack.'}
        </p>
      </div>
      <Card className="border-primary/40">
        <CardHeader className="pb-3">
          <div className="flex flex-wrap items-center gap-3">
            <CardTitle as="h3" className="text-base">
              Universal CLI (skills.sh & TanStack Intent)
            </CardTitle>
            <Badge>Recommended</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <CodeBlock code={INSTALL} shell />
          <p className="text-sm text-muted-foreground">
            {isEn
              ? 'TanStack Intent packages skills alongside npm packages. Skills update as your dependencies update.'
              : 'TanStack Intent mengemas skill bersama paket npm. Panduan skill otomatis terbarui saat dependensi Anda di-update.'}
          </p>
          <p className="text-xs text-muted-foreground">Licensed under the MIT License © TanStack.</p>
        </CardContent>
      </Card>
    </section>
  )
}
