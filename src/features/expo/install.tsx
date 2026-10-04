import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CodeBlock } from '@/components/code-block'
import { getLocale } from '@/paraglide/runtime.js'

const SKILLS_CLI = [
  "npx skills@latest add expo/skills --skill '*'",
  '# Tambahkan --agent <agent> untuk menarget satu agent',
  '# Perbarui: npx skills@latest update',
].join('\n')

const CLAUDE_PLUGIN = [
  'claude plugin install expo@claude-plugins-official',
  '# atau di dalam Claude Code: /plugin install expo@claude-plugins-official',
].join('\n')

const CODEX_PLUGIN = 'codex plugin add expo@openai-curated'

export function ExpoInstall() {
  const isEn = getLocale() === 'en'

  return (
    <section id="installation" className="scroll-mt-20 space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Installation</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          {isEn
            ? 'Install the official skills directly from Expo’s upstream repository. Use the plugin for Claude Code or Codex, and the skills CLI for other agents.'
            : 'Install skill resmi langsung dari repository upstream Expo. Pakai plugin untuk Claude Code atau Codex, dan skills CLI untuk agent lain.'}
        </p>
      </div>
      <Card className="border-primary/40">
        <CardHeader className="pb-3">
          <div className="flex flex-wrap items-center gap-3">
            <CardTitle as="h3" className="text-base">
              Universal CLI (skills.sh)
            </CardTitle>
            <Badge>Cursor, OpenCode, Copilot, Windsurf, Gemini, …</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <CodeBlock code={SKILLS_CLI} shell />
          <p className="text-sm text-muted-foreground">
            {isEn
              ? "Without --skill '*' the CLI prompts for each skill. The flag selects every Expo skill; the CLI still asks where to install them. Restart your agent session afterwards so it discovers the SKILL.md files."
              : "Tanpa --skill '*' CLI akan menanyakan skill satu per satu. Flag ini memilih semua skill Expo; CLI tetap menanyakan lokasi instalasi. Restart sesi agent setelahnya agar SKILL.md terdeteksi."}
          </p>
        </CardContent>
      </Card>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-border">
          <CardHeader className="pb-3">
            <CardTitle as="h3" className="text-base">
              Claude Code plugin
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <CodeBlock code={CLAUDE_PLUGIN} shell />
            <p className="text-xs text-muted-foreground">
              {isEn
                ? 'Updates come through the official plugin marketplace. The plugin also bundles the Expo MCP server configuration.'
                : 'Pembaruan lewat marketplace plugin resmi. Plugin ini juga membundel konfigurasi Expo MCP server.'}
            </p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardHeader className="pb-3">
            <CardTitle as="h3" className="text-base">
              Codex plugin
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <CodeBlock code={CODEX_PLUGIN} shell />
            <p className="text-xs text-muted-foreground">
              {isEn
                ? 'Or open /plugins in Codex and install expo from the OpenAI-curated marketplace.'
                : 'Atau buka /plugins di Codex dan install expo dari marketplace OpenAI-curated.'}
            </p>
          </CardContent>
        </Card>
      </div>
      <Card className="border-border">
        <CardContent className="space-y-2 pt-4 text-sm text-muted-foreground">
          <p>
            {isEn
              ? 'The skills split into free open-source framework skills and EAS cloud services (EAS Build, Update, Hosting, Observe, Simulator) that have free-tier limits and paid plans; each EAS skill opens with a costs note.'
              : 'Skill terbagi menjadi skill framework open-source gratis dan layanan cloud EAS (EAS Build, Update, Hosting, Observe, Simulator) yang punya batas free-tier dan paket berbayar; setiap skill EAS dibuka dengan catatan biaya.'}
          </p>
          <p>
            {isEn
              ? 'expo-migrate-module is experimental and ships in the separate expo-experiments plugin (install it alongside expo), or individually via the skills CLI.'
              : 'expo-migrate-module bersifat eksperimental dan ada di plugin terpisah expo-experiments (install bersama expo), atau satuan lewat skills CLI.'}
          </p>
          <p className="text-xs">Licensed under the MIT License © 650 Industries, Inc.</p>
        </CardContent>
      </Card>
    </section>
  )
}
