import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CodeBlock } from '@/components/code-block'
import {
  externalLinkAriaLabel,
  externalTextLinkClass,
} from '@/lib/external-link'
import { m } from '@/paraglide/messages.js'

const SKILLS_SH_STEPS = [
  'npx skills@latest add obra/superpowers',
  '# Pilih skill di prompt (misal: /subagent-driven-development, /brainstorming, dll.)',
  '# Jalankan /using-superpowers untuk panduan workflow komprehensif',
].join('\n')

const HERMES_STEPS = [
  '# Install langsung skill ke Hermes Agent via GitHub repo:',
  'hermes skills install https://github.com/obra/superpowers/tree/main/skills/subagent-driven-development',
  'hermes skills install https://github.com/obra/superpowers/tree/main/skills/brainstorming',
  'hermes skills install https://github.com/obra/superpowers/tree/main/skills/writing-plans',
].join('\n')

export function SuperpowersInstall() {
  return (
    <section id="installation" className="scroll-mt-20 space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-balance">
          {m.installation_title()}
        </h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Framework SDLC agentic terlengkap (281k+ stars) oleh Jesse Vincent. Mengubah AI agent menjadi koordinator disiplin dengan Subagent-Driven Development (SDD), Socratic interview, dan review gates.
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
              Install langsung dari repository resmi Jesse Vincent menggunakan CLI skills.sh interaktif.
            </p>
            <p className="text-xs text-muted-foreground">
              {m.installation_skills_sh_ref()}{' '}
              <a
                href="https://skills.sh/obra/superpowers"
                target="_blank"
                rel="noopener noreferrer"
                className={externalTextLinkClass}
                aria-label={externalLinkAriaLabel('skills.sh/obra/superpowers')}
              >
                skills.sh/obra/superpowers
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
              Hermes Agent memuat skill secara modular atau mengunduh folder skill langsung ke <code className="font-mono text-xs">~/.hermes/skills/</code>.
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
            Semua 14 skill SDLC agentic diciptakan oleh{' '}
            <strong className="text-foreground">Jesse Vincent (@obra)</strong>. Repository resmi:{' '}
            <a
              href="https://github.com/obra/superpowers"
              target="_blank"
              rel="noopener noreferrer"
              className={externalTextLinkClass}
              aria-label={externalLinkAriaLabel('github.com/obra/superpowers')}
            >
              github.com/obra/superpowers
            </a>
            . Dilisensikan secara terbuka untuk seluruh komunitas AI engineer.
          </p>
        </CardContent>
      </Card>
    </section>
  )
}
