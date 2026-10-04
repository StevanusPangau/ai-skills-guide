import { useEffect, useMemo, useRef, type ReactNode } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiArrowRightSLine,
  RiCheckLine,
  RiCloseLine,
  RiGithubFill,
  RiLightbulbLine,
  RiSparklingLine,
  RiTerminalBoxLine,
} from '@remixicon/react'
import { AuthorAvatar } from '@/components/author-avatar'
import { CodeBlock } from '@/components/code-block'
import { CopyAgentRuleButton } from '@/components/copy-agent-rule-button'
import { OnThisPage } from '@/components/layout/on-this-page'
import { Badge } from '@/components/ui/badge'
import { XHandleLink } from '@/components/x-handle-link'
import { externalLinkAriaLabel } from '@/lib/external-link'
import { resetSkillDetailScroll } from '@/lib/scroll-to-section'
import { useDocumentTitle } from '@/lib/use-document-title'
import { cn } from '@/lib/utils'
import { m } from '@/paraglide/messages.js'
import { getSkillIdentity } from './identity'
import type {
  SkillBadge,
  SkillCollectionContext,
  SkillLink,
  SkillView,
} from './types'

type SkillPageProps = {
  view: SkillView
  ctx: SkillCollectionContext
  prev: SkillLink | null
  next: SkillLink | null
  /** 1-based position of this skill in its collection. */
  position: number
  total: number
  /** Install block rendered inside the Install section. */
  install: ReactNode
}

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50'

export function SkillPage({
  view,
  ctx,
  prev,
  next,
  position,
  total,
  install,
}: SkillPageProps) {
  const navigate = useNavigate()
  const title = `/${view.displayName ?? view.name}`
  useDocumentTitle(title, `${title}: ${view.summary}`)

  const identity = useMemo(() => getSkillIdentity(view.name), [view.name])

  const prevName = useRef<string | null>(null)
  useEffect(() => {
    const before = prevName.current
    prevName.current = view.name
    void resetSkillDetailScroll(navigate, {
      isFirstMount: before === null,
      skillChanged: before !== null && before !== view.name,
    })
  }, [view.name, navigate])

  const paragraphs = (view.detail ?? '')
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)
  const hasDetail = paragraphs.length > 0
  const workflowChain = view.workflow?.includes('→')
    ? view.workflow.split('→').map((s) => s.trim())
    : null

  const toc = [
    { id: 'brief', label: m.skillpage_brief_title() },
    view.spotlight && { id: 'spotlight', label: view.spotlight.title },
    (view.useWhen.length > 0 || view.avoidWhen.length > 0) && {
      id: 'decision',
      label: m.skillpage_decision_title(),
    },
    view.steps.length > 0 && {
      id: 'how-it-works',
      label: m.skillpage_steps_title(),
    },
    view.workflow && { id: 'flow', label: m.skillpage_flow_title() },
    view.output && { id: 'output', label: m.skillpage_output_title() },
    view.rules.length > 0 && { id: 'core-rules', label: m.skillpage_rules_title() },
    (view.signs?.length ?? 0) > 0 && {
      id: 'signs',
      label: m.skillpage_signs_title(),
    },
    view.tips.length > 0 && { id: 'tips', label: m.skillpage_tips_title() },
    ...(view.extraSections ?? []).map((s) => ({ id: s.id, label: s.title })),
    view.pairs.length > 0 && { id: 'pairs-well-with', label: m.skillpage_related_title() },
    { id: 'install', label: m.skill_install_title() },
  ].filter((item): item is { id: string; label: string } => Boolean(item))

  const command = view.invokeCommand ?? `/${view.name}`

  return (
    <main id="main-content" className="min-w-0 flex-1 pt-14">
      <div className="mx-auto flex max-w-6xl gap-10 px-4 py-10 sm:px-6">
        <article
          className="skill-accent min-w-0 max-w-3xl flex-1 space-y-12"
          style={{ ['--sk-h' as string]: identity.hue }}
        >
          <nav
            aria-label={m.nav_breadcrumb()}
            className="text-sm text-muted-foreground"
          >
            <Link to="/" className={cn('rounded-sm hover:text-primary', focusRing)}>
              {m.nav_home()}
            </Link>
            <span className="mx-2" aria-hidden="true">
              /
            </span>
            <Link
              to={ctx.indexPath as '/'}
              className={cn('rounded-sm hover:text-primary', focusRing)}
            >
              {ctx.label}
            </Link>
            <span className="mx-2" aria-hidden="true">
              /
            </span>
            <span className="font-mono text-foreground" aria-current="page">
              {view.name}
            </span>
          </nav>

          {/* Hero */}
          <header className="relative overflow-hidden rounded-2xl border border-[var(--sk-line)] bg-gradient-to-br from-[var(--sk-soft)] via-transparent to-transparent p-5 sm:p-7">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <SkillGlyph cells={identity.cells} />
              <div className="min-w-0 flex-1 space-y-3">
                <h1 className="font-mono text-2xl font-bold tracking-tight break-words text-balance sm:text-4xl">
                  {title}
                </h1>
                {view.tagline ? (
                  <p className="text-sm font-medium text-[var(--sk-strong)]">
                    {view.tagline}
                  </p>
                ) : null}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                  {ctx.avatarSrc && ctx.authorName ? (
                    <AuthorAvatar
                      src={ctx.avatarSrc}
                      name={ctx.authorName}
                      size="xs"
                    />
                  ) : null}
                  {ctx.authorName ? (
                    <span className="font-medium text-foreground/90">
                      {ctx.authorName}
                    </span>
                  ) : null}
                  {ctx.authorHandle ? <XHandleLink handle={ctx.authorHandle} /> : null}
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="font-mono text-xs uppercase">
                    {view.category}
                  </Badge>
                  <Badge
                    variant={view.invocation === 'user' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {view.invocation === 'user'
                      ? m.skills_filter_user()
                      : m.skills_filter_model()}
                  </Badge>
                  {(view.badges ?? []).map((b) => (
                    <Badge
                      key={b.label}
                      variant={badgeVariant(b)}
                      className="text-xs"
                    >
                      {b.label}
                    </Badge>
                  ))}
                </div>
                <p className="text-base leading-relaxed text-foreground/90 sm:text-lg">
                  {view.summary}
                </p>
              </div>
            </div>
          </header>

          {/* Brief */}
          <section id="brief" className="scroll-mt-20 space-y-4">
            <SectionTitle>{m.skillpage_brief_title()}</SectionTitle>
            <div className="grid items-start gap-4 lg:grid-cols-5">
              {hasDetail ? (
                <Card className="lg:col-span-3">
                  <Eyebrow>{m.skillpage_what_it_does()}</Eyebrow>
                  <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
                    <p className="whitespace-pre-line">{paragraphs[0]}</p>
                    {paragraphs.length > 1 ? (
                      <details className="group">
                        <summary
                          className={cn(
                            'w-fit cursor-pointer rounded-sm text-sm font-medium text-primary hover:underline',
                            focusRing,
                          )}
                        >
                          {m.skillpage_read_full()}
                        </summary>
                        <div className="mt-3 space-y-3">
                          {paragraphs.slice(1).map((p, i) => (
                            <p key={i} className="whitespace-pre-line">
                              {p}
                            </p>
                          ))}
                        </div>
                      </details>
                    ) : null}
                  </div>
                </Card>
              ) : null}

              <div
                className={cn(
                  'grid gap-4',
                  hasDetail ? 'lg:col-span-2' : 'lg:col-span-5 lg:grid-cols-2',
                )}
              >
                <Card>
                  <Eyebrow>{m.skillpage_how_called()}</Eyebrow>
                  {view.invocation === 'user' ? (
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        {m.skillpage_called_user()}
                      </p>
                      <CodeBlock code={command} />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
                        <RiTerminalBoxLine
                          className="mt-0.5 size-4 shrink-0 text-[var(--sk)]"
                          aria-hidden="true"
                        />
                        {m.skillpage_called_model()}
                      </p>
                      <CodeBlock code={command} />
                    </div>
                  )}
                </Card>
                <Card>
                  <Eyebrow>{m.skillpage_facts_title()}</Eyebrow>
                  <dl className="space-y-1.5 text-sm">
                    <Fact label={m.skillpage_fact_category()} value={view.category} />
                    <Fact
                      label={m.skillpage_fact_invocation()}
                      value={
                        view.invocation === 'user'
                          ? m.skills_filter_user()
                          : m.skills_filter_model()
                      }
                    />
                    {view.steps.length > 0 ? (
                      <Fact
                        label={m.skillpage_fact_steps()}
                        value={String(view.steps.length)}
                      />
                    ) : null}
                    {view.rules.length > 0 ? (
                      <Fact
                        label={m.skillpage_fact_rules()}
                        value={String(view.rules.length)}
                      />
                    ) : null}
                    {(view.facts ?? []).map((f) => (
                      <Fact key={f.label} label={f.label} value={f.value} />
                    ))}
                  </dl>
                  {view.sourceUrl ? (
                    <a
                      href={view.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={externalLinkAriaLabel(m.skillpage_view_source())}
                      className={cn(
                        'mt-3 inline-flex items-center gap-1.5 rounded-sm text-xs text-primary hover:underline',
                        focusRing,
                      )}
                    >
                      <RiGithubFill className="size-4" aria-hidden="true" />
                      <span className="break-all font-mono">
                        {view.sourcePath ?? m.skillpage_view_source()}
                      </span>
                    </a>
                  ) : null}
                </Card>
              </div>
            </div>
          </section>

          {/* Spotlight: the one section written only for this skill */}
          {view.spotlight ? (
            <section
              id="spotlight"
              className="scroll-mt-20 rounded-2xl border border-[var(--sk-line)] bg-gradient-to-br from-[var(--sk-soft)] to-transparent p-5 sm:p-6"
            >
              <p className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-[var(--sk-strong)] uppercase">
                <RiSparklingLine className="size-4" aria-hidden="true" />
                {m.skillpage_spotlight_eyebrow()}
              </p>
              <h2 className="mt-2 text-xl font-semibold text-balance">
                {view.spotlight.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed whitespace-pre-line text-muted-foreground">
                {view.spotlight.body}
              </p>
            </section>
          ) : null}

          {/* Use / avoid */}
          {view.useWhen.length > 0 || view.avoidWhen.length > 0 ? (
            <section id="decision" className="scroll-mt-20 space-y-4">
              <SectionTitle>{m.skillpage_decision_title()}</SectionTitle>
              <div
                className={cn(
                  'grid gap-4',
                  view.useWhen.length > 0 && view.avoidWhen.length > 0 && 'md:grid-cols-2',
                )}
              >
                {view.useWhen.length > 0 ? (
                  <DecisionCard
                    tone="use"
                    title={m.skillpage_use_when()}
                    items={view.useWhen}
                  />
                ) : null}
                {view.avoidWhen.length > 0 ? (
                  <DecisionCard
                    tone="avoid"
                    title={m.skillpage_avoid_when()}
                    items={view.avoidWhen}
                  />
                ) : null}
              </div>
            </section>
          ) : null}

          {/* Steps */}
          {view.steps.length > 0 ? (
            <section id="how-it-works" className="scroll-mt-20 space-y-5">
              <SectionTitle>{m.skillpage_steps_title()}</SectionTitle>
              <ol>
                {view.steps.map((step, i) => (
                  <li key={i} className="relative pb-6 pl-12 last:pb-0">
                    {i < view.steps.length - 1 ? (
                      <span
                        className="absolute top-9 bottom-1 left-4 w-px bg-[var(--sk-line)]"
                        aria-hidden="true"
                      />
                    ) : null}
                    <span
                      className="absolute top-0 left-0 flex size-8 items-center justify-center rounded-full border border-[var(--sk-line)] bg-[var(--sk-soft)] font-mono text-sm font-semibold text-[var(--sk-strong)]"
                      aria-hidden="true"
                    >
                      {i + 1}
                    </span>
                    <p className="pt-1 text-sm leading-relaxed">{step}</p>
                  </li>
                ))}
              </ol>
            </section>
          ) : null}

          {view.workflow ? (
            <section id="flow" className="scroll-mt-20 space-y-3">
              <SectionTitle>{m.skillpage_flow_title()}</SectionTitle>
              {workflowChain ? (
                <ol className="flex flex-wrap items-center gap-2 font-mono text-xs">
                  {workflowChain.map((node, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="rounded-md border border-[var(--sk-line)] bg-[var(--sk-soft)] px-2 py-1">
                        {node}
                      </span>
                      {i < workflowChain.length - 1 ? (
                        <RiArrowRightLine
                          className="size-4 text-muted-foreground"
                          aria-hidden="true"
                        />
                      ) : null}
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="rounded-md bg-muted p-3 font-mono text-xs leading-relaxed">
                  {view.workflow}
                </p>
              )}
            </section>
          ) : null}

          {view.output ? (
            <section id="output" className="scroll-mt-20 space-y-3">
              <SectionTitle>{m.skillpage_output_title()}</SectionTitle>
              <Card>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {view.output}
                </p>
              </Card>
            </section>
          ) : null}

          {/* Rules */}
          {view.rules.length > 0 ? (
            <section id="core-rules" className="scroll-mt-20 space-y-4">
              <SectionTitle>{m.skillpage_rules_title()}</SectionTitle>
              <ul className="grid gap-3 sm:grid-cols-2">
                {view.rules.map((rule, i) => (
                  <li
                    key={i}
                    className="rounded-xl border border-border bg-card p-4"
                  >
                    <span className="font-mono text-xs font-semibold text-[var(--sk-strong)]">
                      R{String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="mt-1.5 text-sm leading-relaxed">{rule}</p>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {(view.signs?.length ?? 0) > 0 ? (
            <section id="signs" className="scroll-mt-20 space-y-3">
              <SectionTitle>{m.skillpage_signs_title()}</SectionTitle>
              <ul className="space-y-2">
                {view.signs!.map((sign, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-sm leading-relaxed"
                  >
                    <RiCheckLine
                      className="mt-0.5 size-4 shrink-0 text-emerald-600 dark:text-emerald-400"
                      aria-hidden="true"
                    />
                    {sign}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {view.tips.length > 0 ? (
            <section id="tips" className="scroll-mt-20 space-y-3">
              <SectionTitle>{m.skillpage_tips_title()}</SectionTitle>
              <ul className="space-y-2.5">
                {view.tips.map((tip, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 rounded-lg border-l-2 border-[var(--sk)] bg-[var(--sk-soft)] px-4 py-3 text-sm leading-relaxed"
                  >
                    <RiLightbulbLine
                      className="mt-0.5 size-4 shrink-0 text-[var(--sk-strong)]"
                      aria-hidden="true"
                    />
                    {tip}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {(view.extraSections ?? []).map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-20 space-y-3">
              <SectionTitle>{section.title}</SectionTitle>
              {section.body ? (
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {section.body}
                </p>
              ) : null}
              {section.chips && section.chips.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {section.chips.map((chip) => (
                    <Badge key={chip} variant="outline" className="font-mono text-xs">
                      {chip}
                    </Badge>
                  ))}
                </div>
              ) : null}
              {section.links && section.links.length > 0 ? (
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={externalLinkAriaLabel(link.label)}
                        className={cn(
                          'flex w-fit max-w-full items-center gap-1.5 rounded-sm font-mono text-sm break-all text-primary hover:underline',
                          focusRing,
                        )}
                      >
                        <RiGithubFill className="size-4 shrink-0" aria-hidden="true" />
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}

          {view.pairs.length > 0 ? (
            <section id="pairs-well-with" className="scroll-mt-20 space-y-4">
              <SectionTitle>{m.skillpage_related_title()}</SectionTitle>
              <ul className="grid gap-3 sm:grid-cols-2">
                {view.pairs.map((pair) => (
                  <li key={pair.name}>
                    <Link
                      to={ctx.skillPath as '/skills/$skillName'}
                      params={{ skillName: pair.name }}
                      className={cn(
                        'group flex h-full flex-col gap-1 rounded-xl border border-border p-4 transition-colors hover:border-primary',
                        focusRing,
                      )}
                    >
                      <span className="flex items-center justify-between font-mono text-sm font-semibold">
                        /{pair.name}
                        <RiArrowRightSLine
                          className="size-4 text-muted-foreground transition-colors group-hover:text-primary"
                          aria-hidden="true"
                        />
                      </span>
                      <span className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                        {pair.summary}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {/* Install */}
          <section id="install" className="scroll-mt-20 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <SectionTitle>{m.skill_install_title()}</SectionTitle>
              <CopyAgentRuleButton
                skillName={view.agentRule.name}
                description={view.agentRule.description}
                useWhen={view.agentRule.useWhen}
                coreRules={view.agentRule.coreRules}
                howItWorks={view.agentRule.howItWorks}
              />
            </div>
            {view.installNotice}
            {install}
          </section>

          {/* Prev / next */}
          <nav
            aria-label={m.skillpage_nav_label()}
            className="space-y-3 border-t border-border pt-6"
          >
            <p className="text-center text-xs text-muted-foreground">
              {m.skillpage_position({ n: position, total })}
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {prev ? (
                <NeighbourCard
                  skillPath={ctx.skillPath}
                  skill={prev}
                  label={m.skillpage_prev()}
                  direction="prev"
                />
              ) : (
                <span className="hidden sm:block" />
              )}
              {next ? (
                <NeighbourCard
                  skillPath={ctx.skillPath}
                  skill={next}
                  label={m.skillpage_next()}
                  direction="next"
                />
              ) : null}
            </div>
            <Link
              to={ctx.indexPath as '/'}
              hash={ctx.catalogHash}
              className={cn(
                'inline-flex rounded-sm text-sm text-primary hover:underline',
                focusRing,
              )}
            >
              {m.skillpage_back({ collection: ctx.label })}
            </Link>
          </nav>
        </article>

        <aside className="hidden w-52 shrink-0 xl:block">
          <div className="sticky top-24">
            <OnThisPage items={toc} />
          </div>
        </aside>
      </div>
    </main>
  )
}

export function SkillPageNotFound({ ctx }: { ctx: Pick<SkillCollectionContext, 'indexPath' | 'label'> }) {
  return (
    <main id="main-content" className="min-w-0 flex-1 pt-14">
      <div className="mx-auto max-w-3xl space-y-4 px-6 py-20 text-center">
        <h1 className="text-2xl font-bold text-balance">
          {m.skillpage_not_found_title()}
        </h1>
        <p className="text-sm text-muted-foreground">
          {m.skillpage_not_found_body()}
        </p>
        <Link
          to={ctx.indexPath as '/'}
          className={cn('inline-flex rounded-sm text-sm text-primary hover:underline', focusRing)}
        >
          {m.skillpage_back({ collection: ctx.label })}
        </Link>
      </div>
    </main>
  )
}

function badgeVariant(b: SkillBadge) {
  if (b.tone === 'danger') return 'destructive' as const
  return b.tone ?? ('outline' as const)
}

function SkillGlyph({ cells }: { cells: boolean[][] }) {
  return (
    <div
      role="img"
      aria-label={m.skillpage_identity_label()}
      className="grid size-16 shrink-0 grid-cols-5 gap-[3px] rounded-xl border border-[var(--sk-line)] bg-card p-2.5 sm:size-20"
    >
      {cells.flat().map((on, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={cn('rounded-[2px]', on ? 'bg-[var(--sk)]' : 'bg-[var(--sk-soft)]')}
        />
      ))}
    </div>
  )
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="flex items-center gap-2.5 text-lg font-semibold tracking-tight text-balance">
      <span
        className="h-5 w-1 shrink-0 rounded-full bg-[var(--sk)]"
        aria-hidden="true"
      />
      {children}
    </h2>
  )
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <h3 className="mb-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
      {children}
    </h3>
  )
}

function Card({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('rounded-xl border border-border bg-card p-4 sm:p-5', className)}>
      {children}
    </div>
  )
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right font-medium break-words">{value}</dd>
    </div>
  )
}

function DecisionCard({
  tone,
  title,
  items,
}: {
  tone: 'use' | 'avoid'
  title: string
  items: string[]
}) {
  const isUse = tone === 'use'
  const Icon = isUse ? RiCheckLine : RiCloseLine
  return (
    <div
      className={cn(
        'rounded-xl border p-4 sm:p-5',
        isUse
          ? 'border-emerald-600/30 bg-emerald-600/5 dark:border-emerald-400/30 dark:bg-emerald-400/5'
          : 'border-destructive/30 bg-destructive/5',
      )}
    >
      <h3
        className={cn(
          'mb-3 flex items-center gap-1.5 text-sm font-semibold',
          isUse
            ? 'text-emerald-700 dark:text-emerald-400'
            : 'text-destructive',
        )}
      >
        <Icon className="size-4" aria-hidden="true" />
        {title}
      </h3>
      <ul className="space-y-2.5 text-sm leading-relaxed">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <Icon
              className={cn(
                'mt-0.5 size-4 shrink-0',
                isUse
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-destructive/80',
              )}
              aria-hidden="true"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function NeighbourCard({
  skillPath,
  skill,
  label,
  direction,
}: {
  skillPath: string
  skill: SkillLink
  label: string
  direction: 'prev' | 'next'
}) {
  const Arrow = direction === 'prev' ? RiArrowLeftLine : RiArrowRightLine
  return (
    <Link
      to={skillPath as '/skills/$skillName'}
      params={{ skillName: skill.name }}
      className={cn(
        'group min-w-0 rounded-xl border border-border p-4 transition-colors hover:border-primary',
        direction === 'next' && 'sm:text-right',
        focusRing,
      )}
    >
      <span
        className={cn(
          'flex items-center gap-1.5 text-xs text-muted-foreground',
          direction === 'next' && 'sm:justify-end',
        )}
      >
        {direction === 'prev' ? <Arrow className="size-3.5" aria-hidden="true" /> : null}
        {label}
        {direction === 'next' ? <Arrow className="size-3.5" aria-hidden="true" /> : null}
      </span>
      <span className="mt-1 block font-mono text-sm font-semibold break-words">
        /{skill.name}
      </span>
      <span className="mt-1 line-clamp-2 block text-xs leading-relaxed text-muted-foreground">
        {skill.summary}
      </span>
    </Link>
  )
}
