import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CodeBlock } from '@/components/code-block'
import { getLocale } from '@/paraglide/runtime.js'

const INSTALL = [
  'npx skills@latest add shadcn-ui/ui --skill shadcn',
  'npx skills@latest add shadcn-ui/ui --skill migrate-radix-to-base',
].join('\n')

export function ShadcnInstall() {
  const isEn = getLocale() === 'en'

  return (
    <section id="installation" className="scroll-mt-20 space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Installation</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          {isEn
            ? 'Install the official skills from the shadcn-ui/ui monorepo. They live under skills/, not in a separate skills repository.'
            : 'Pasang skill resmi dari monorepo shadcn-ui/ui. Skill berada di folder skills/, bukan di repositori skills terpisah.'}
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
              ? 'skills.sh redirects shadcn/ui to shadcn-ui/ui. Pin skill selection with --skill so only the intended folder is installed.'
              : 'skills.sh mengarahkan shadcn/ui ke shadcn-ui/ui. Pin pilihan skill dengan --skill agar hanya folder yang dimaksud yang terpasang.'}
          </p>
          <p className="text-xs text-muted-foreground">
            MIT © 2023 shadcn. Skills are a folder inside the UI monorepo, not a separate skills
            repo.
          </p>
        </CardContent>
      </Card>
    </section>
  )
}
