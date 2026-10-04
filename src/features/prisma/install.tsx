import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CodeBlock } from '@/components/code-block'
import { getLocale } from '@/paraglide/runtime.js'

const INSTALL = [
  'npx skills@latest add prisma/skills',
  '# Pilih skill saat prompt (mis. prisma-orm-setup, prisma-postgres-setup, prisma-cli)',
  '# Install langsung dari repository resmi Prisma (MIT)',
].join('\n')

export function PrismaInstall() {
  const isEn = getLocale() === 'en'

  return (
    <section id="installation" className="scroll-mt-20 space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Installation</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          {isEn
            ? 'Install official skills directly from Prisma’s upstream repository.'
            : 'Install skill resmi langsung dari repository upstream Prisma.'}
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
              ? 'New setups default to Prisma ORM 8 (install prisma-orm-setup and prisma-postgres-setup); prisma-cli, prisma-upgrade-v7, prisma-client-api and prisma-driver-adapter-implementation cover Prisma 7. For MongoDB projects on v6, reference prisma-mongodb-upgrade.'
              : 'Setup baru default ke Prisma ORM 8 (pasang prisma-orm-setup dan prisma-postgres-setup); prisma-cli, prisma-upgrade-v7, prisma-client-api, dan prisma-driver-adapter-implementation mencakup Prisma 7. Untuk proyek MongoDB di v6, gunakan prisma-mongodb-upgrade.'}
          </p>
          <p className="text-xs text-muted-foreground">Licensed under the MIT License © 2025 Prisma</p>
        </CardContent>
      </Card>
    </section>
  )
}
