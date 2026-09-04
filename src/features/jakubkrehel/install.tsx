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

const HERMES_STEPS = [
  '# Install langsung skill spesifik ke Hermes Agent via GitHub repo:',
  'hermes skills install https://github.com/jakubkrehel/skills/tree/main/skills/better-ui',
  'hermes skills install https://github.com/jakubkrehel/skills/tree/main/skills/better-interface',
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
                Claude Code · Cursor · Codex · OpenCode
              </CardTitle>
              <Badge variant="default">skills.sh</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <CodeBlock code={SKILLS_SH_STEPS} shell />
            <p className="text-sm text-muted-foreground">
              Install langsung dari repository resmi Jakub Krehel menggunakan CLI skills.sh interaktif.
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

        <Card className="border-primary/40">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <CardTitle as="h3" className="text-base">
                Hermes Agent
              </CardTitle>
              <Badge variant="secondary">On-Demand</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <CodeBlock code={HERMES_STEPS} shell />
            <p className="text-sm text-muted-foreground">
              Hermes Agent memuat skill secara dinamis atau mengunduh folder skill dari git repository upstream langsung ke <code className="font-mono text-xs">~/.hermes/skills/</code>.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-muted/50">
        <CardContent className="pt-4">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">
              {m.installation_attribution()}
            </strong>{' '}
            Semua 11 skill antarmuka diciptakan oleh{' '}
            <strong className="text-foreground">Jakub Krehel</strong>, kreator publikasi desain UI/UX{' '}
            <a
              href="https://interfaces.dev"
              target="_blank"
              rel="noopener noreferrer"
              className={externalTextLinkClass}
              aria-label={externalLinkAriaLabel('interfaces.dev')}
            >
              interfaces.dev
            </a>
            . Dilisensikan secara terbuka untuk komunitas AI engineer.
          </p>
        </CardContent>
      </Card>
    </section>
  )
}
