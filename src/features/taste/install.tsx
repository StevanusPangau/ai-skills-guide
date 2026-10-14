import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CodeBlock } from '@/components/code-block'
import { m } from '@/paraglide/messages.js'

const INSTALL_ONE = 'npx skills@latest add Leonxlnx/taste-skill --skill design-taste-frontend'
const INSTALL_ALL = 'npx skills@latest add Leonxlnx/taste-skill'
const INSTALL_PIN = 'npx skills@latest add Leonxlnx/taste-skill --skill design-taste-frontend-v1'

export function TasteInstall() {
  return (
    <section id="installation" className="scroll-mt-20 space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{m.taste_install_title()}</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">{m.taste_install_lead()}</p>
      </div>
      <Card className="border-primary/40">
        <CardHeader className="pb-3">
          <div className="flex flex-wrap items-center gap-3">
            <CardTitle as="h3" className="text-base">{m.taste_install_one_title()}</CardTitle>
            <Badge>{m.taste_install_recommended()}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <CodeBlock code={INSTALL_ONE} shell />
          <p className="text-sm text-muted-foreground">{m.taste_install_one_body()}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle as="h3" className="text-base">{m.taste_install_all_title()}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <CodeBlock code={INSTALL_ALL} shell />
          <p className="text-sm text-muted-foreground">{m.taste_install_all_body()}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle as="h3" className="text-base">{m.taste_install_pin_title()}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <CodeBlock code={INSTALL_PIN} shell />
          <p className="text-xs text-muted-foreground">{m.taste_install_pin_note()}</p>
        </CardContent>
      </Card>
    </section>
  )
}
