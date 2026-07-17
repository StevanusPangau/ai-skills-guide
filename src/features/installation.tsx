import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CodeBlock } from '@/components/code-block'
import {
  externalLinkAriaLabel,
  externalTextLinkClass,
} from '@/lib/external-link'
import { m } from '@/paraglide/messages.js'

const HERMES_STEPS = [
  'hermes skills tap add StevanusPangau/ai-skills-guide',
  'hermes skills browse --source github',
  'hermes skills install StevanusPangau/ai-skills-guide/skills/hermes/engineering/tdd',
].join('\n')

const HERMES_ALT = `# ~/.hermes/config.yaml
skills:
  external_dirs:
    - ~/Development/Project/Tools/ai-skills-guide/skills/hermes`

// skills.sh CLI — installs to Claude Code, Codex, OpenCode, Cursor, and more.
const SKILLS_SH_STEPS = [
  'npx skills@latest add mattpocock/skills',
  '# Pilih skills di prompt; pastikan pilih /setup-matt-pocock-skills',
  '# Lalu jalankan /setup-matt-pocock-skills di agent untuk setup awal',
].join('\n')

export function Installation() {
  return (
    <section id="installation" className="scroll-mt-20 space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-balance">
          {m.installation_title()}
        </h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          {m.installation_description()}
        </p>
      </div>

      <div className="grid gap-4">
        <Card className="border-primary/40">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <CardTitle as="h3" className="text-base">
                Hermes Agent
              </CardTitle>
              <Badge variant="default">Available</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <CodeBlock code={HERMES_STEPS} shell />
            <div className="space-y-1.5">
              <p className="text-xs text-muted-foreground">
                {m.installation_alt_label()}
              </p>
              <CodeBlock code={HERMES_ALT} />
            </div>
            <p className="text-sm text-muted-foreground">
              {m.installation_notes_hermes()}
            </p>
          </CardContent>
        </Card>

        <Card className="border-primary/40">
          <CardHeader className="pb-3">
            <div className="flex flex-wrap items-center gap-3">
              <CardTitle as="h3" className="text-base">
                Claude Code · Codex · OpenCode · Cursor
              </CardTitle>
              <Badge variant="default">skills.sh</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <CodeBlock code={SKILLS_SH_STEPS} shell />
            <p className="text-sm text-muted-foreground">
              {m.installation_notes_skills_sh()}
            </p>
            <p className="text-xs text-muted-foreground">
              {m.installation_skills_sh_ref()}{' '}
              <a
                href="https://skills.sh/mattpocock/skills"
                target="_blank"
                rel="noopener noreferrer"
                className={externalTextLinkClass}
                aria-label={externalLinkAriaLabel('skills.sh/mattpocock/skills')}
              >
                skills.sh/mattpocock/skills
              </a>
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
            <a
              href="https://github.com/mattpocock/skills"
              target="_blank"
              rel="noopener noreferrer"
              className={externalTextLinkClass}
              aria-label={externalLinkAriaLabel('mattpocock/skills')}
            >
              mattpocock/skills
            </a>{' '}
            {m.installation_attribution_suffix()}
          </p>
        </CardContent>
      </Card>
    </section>
  )
}
