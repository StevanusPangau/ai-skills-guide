import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CodeBlock } from '@/components/code-block'
import {
  externalLinkAriaLabel,
  externalTextLinkClass,
} from '@/lib/external-link'
import { m } from '@/paraglide/messages.js'

// Upstream via skills.sh — install full davidondrej/skills.
const SKILLS_SH_STEPS = [
  'npx skills@latest add davidondrej/skills',
  '# Pilih skill di prompt; cek prasyarat & agent target sebelum install massal',
].join('\n')

export function DavidInstall() {
  return (
    <section id="installation" className="scroll-mt-20 space-y-8">
      <div>
        <h2 className="font-heading text-2xl font-bold tracking-tight text-balance">
          {m.david_install_title()}
        </h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          {m.david_install_description()}
        </p>
      </div>

      <div className="grid gap-4">
        <Card className="border-primary/40">
          <CardHeader className="pb-3">
            <div className="flex flex-wrap items-center gap-3">
              <CardTitle as="h3" className="text-base">
                Universal CLI (skills.sh)
              </CardTitle>
              <Badge variant="default">Recommended</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <CodeBlock code={SKILLS_SH_STEPS} shell />
            <p className="text-sm text-muted-foreground">
              {m.david_install_notes_skills_sh()}
            </p>
            <p className="text-xs text-muted-foreground">
              {m.installation_skills_sh_ref()}{' '}
              <a
                href="https://skills.sh"
                target="_blank"
                rel="noopener noreferrer"
                className={externalTextLinkClass}
                aria-label={externalLinkAriaLabel('skills.sh')}
              >
                skills.sh
              </a>
            </p>
          </CardContent>
        </Card>
      </div>

      <p className="text-xs text-muted-foreground">
        {m.installation_attribution()}{' '}
        <a
          href="https://github.com/davidondrej/skills"
          target="_blank"
          rel="noopener noreferrer"
          className={externalTextLinkClass}
          aria-label={externalLinkAriaLabel('David Ondrej on GitHub')}
        >
          David Ondrej
        </a>{' '}
        {m.david_install_attribution_suffix()}
      </p>
    </section>
  )
}
