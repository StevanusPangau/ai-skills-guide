import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CodeBlock } from '@/components/code-block'
import {
  externalLinkAriaLabel,
  externalTextLinkClass,
} from '@/lib/external-link'
import { m } from '@/paraglide/messages.js'
import { getLocale } from '@/paraglide/runtime.js'

const SKILLS_SH_STEPS = [
  'npx skills@latest add vercel-labs/agent-skills',
  '# Pilih skill di prompt (mis. vercel-react-best-practices, deploy-to-vercel)',
  '# Kombinasikan: bangun dengan best practices, lalu deploy dan optimize',
].join('\n')

export function VercelInstall() {
  const isEn = getLocale() === 'en'

  return (
    <section id="installation" className="scroll-mt-20 space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-balance">
          {m.installation_title()}
        </h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          {isEn
            ? 'Install the official Vercel skills to build React apps with Vercel-vetted performance rules, review UI and docs against company handbooks, and deploy or cost-optimize on Vercel.'
            : 'Install skill resmi Vercel untuk membangun aplikasi React dengan aturan performa dari Vercel, mereview UI dan docs sesuai handbook perusahaan, serta deploy dan optimasi biaya di Vercel.'}
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
              {isEn
                ? 'Install directly from the official Vercel repository using the interactive skills.sh CLI for Claude Code, Cursor, Codex, OpenCode, and other agents.'
                : 'Install langsung dari repository resmi Vercel menggunakan CLI skills.sh interaktif untuk Claude Code, Cursor, Codex, OpenCode, dan agent lainnya.'}
            </p>
            <p className="text-xs text-muted-foreground">
              {m.installation_skills_sh_ref()}{' '}
              <a
                href="https://skills.sh/vercel-labs/agent-skills"
                target="_blank"
                rel="noopener noreferrer"
                className={externalTextLinkClass}
                aria-label={externalLinkAriaLabel('skills.sh/vercel-labs/agent-skills')}
              >
                skills.sh/vercel-labs/agent-skills
              </a>
            </p>
          </CardContent>
        </Card>
      </div>

      <p className="text-xs text-muted-foreground">
        {isEn ? 'Skills adapted from' : 'Skills diadaptasi dari'}{' '}
        <a
          href="https://github.com/vercel-labs/agent-skills"
          target="_blank"
          rel="noopener noreferrer"
          className={externalTextLinkClass}
          aria-label={externalLinkAriaLabel('Vercel on GitHub')}
        >
          Vercel
        </a>{' '}
        (MIT License © Vercel).
      </p>
    </section>
  )
}
