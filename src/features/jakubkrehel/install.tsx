import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CodeBlock } from '@/components/code-block'
import {
  externalLinkAriaLabel,
  externalTextLinkClass,
} from '@/lib/external-link'
import { m } from '@/paraglide/messages.js'

const SKILLS_SH_STEPS = [
  'npx skills@latest add jakubkrehel/skills',
  '# Pilih skill di prompt (misal: /better-ui, /better-typography, dll.)',
  '# Jalankan /better-interface untuk audit holistik layout & design tokens',
].join('\n')

export function JakubInstall() {
  return (
    <section id="installation" className="scroll-mt-20 space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-balance">
          {m.installation_title()}
        </h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Gunakan skill Jakub Krehel untuk memberikan standar estetika tinggi, presisi CSS micro-details, dan formula concentric border radius pada AI coding agent Anda.
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
              Install langsung dari repository resmi Jakub Krehel menggunakan CLI skills.sh interaktif untuk Claude Code, Cursor, Codex, OpenCode, dan agent modern lainnya.
            </p>
            <p className="text-xs text-muted-foreground">
              {m.installation_skills_sh_ref()}{' '}
              <a
                href="https://skills.sh/jakubkrehel/skills"
                target="_blank"
                rel="noopener noreferrer"
                className={externalTextLinkClass}
                aria-label={externalLinkAriaLabel('skills.sh/jakubkrehel/skills')}
              >
                skills.sh/jakubkrehel/skills
              </a>
            </p>
          </CardContent>
        </Card>
      </div>

      <p className="text-xs text-muted-foreground">
        Skills diadaptasi dari{' '}
        <a
          href="https://github.com/jakubkrehel/skills"
          target="_blank"
          rel="noopener noreferrer"
          className={externalTextLinkClass}
          aria-label={externalLinkAriaLabel('Jakub Krehel on GitHub')}
        >
          Jakub Krehel
        </a>{' '}
        (MIT License). Panduan presisi antarmuka web modern dari{' '}
        <a
          href="https://interfaces.dev"
          target="_blank"
          rel="noopener noreferrer"
          className={externalTextLinkClass}
          aria-label={externalLinkAriaLabel('interfaces.dev')}
        >
          interfaces.dev
        </a>.
      </p>
    </section>
  )
}
