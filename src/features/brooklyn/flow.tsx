import { lazy, Suspense, useMemo, useState } from 'react'
import type { FlowGraphEdge, FlowGraphNode } from '@/features/flow/types'
import { m } from '@/paraglide/messages.js'
import { getLocale } from '@/paraglide/runtime.js'

const FlowCanvas = lazy(() =>
  import('@/features/flow/flow-canvas').then((mod) => ({ default: mod.FlowCanvas })),
)

const t = (id: string, en: string) => (getLocale() === 'en' ? en : id)

export function BrooklynFlow() {
  const [active, setActive] = useState<string | null>(null)

  const nodes: FlowGraphNode[] = useMemo(
    () => [
      {
        id: 'start',
        kind: 'skill',
        label: '/work',
        description: t(
          'Mulai task di git worktree terisolasi yang baru, meniru konvensi branch/worktree repo; jangan pernah di checkout utama.',
          'Start the task in a fresh isolated git worktree mirroring the repo conventions; never in the primary checkout.',
        ),
        subtitle: t('Worktree terisolasi', 'Isolated worktree'),
        position: { x: 240, y: 0 },
      },
      {
        id: 'dev-gate',
        kind: 'decision',
        label: t('Tipe task?', 'Task type?'),
        description: t(
          'Pertanyaan/audit biasa, pekerjaan tampilan (UI), atau perubahan kode lain.',
          'A plain question/audit, UI work, or another code change.',
        ),
        position: { x: 240, y: 150 },
      },
      {
        id: 'audit',
        kind: 'skill',
        label: '/audit-only',
        description: t(
          'Investigasi baca-saja: jawab dan laporkan temuan dulu; tanpa edit kode sampai user bilang go.',
          'Read-only investigation: answer and report findings first; no code edits until the user says go.',
        ),
        subtitle: t('Berhenti sampai ada go', 'Stops until a go'),
        position: { x: 30, y: 300 },
      },
      {
        id: 'ui-only',
        kind: 'skill',
        label: '/ui-only',
        description: t(
          'Iterasi UI dulu: jangan jalankan tsc/lint/test penuh/commit/push sampai user menyukai tampilannya (dev server dan screenshot tetap boleh).',
          'Iterate on the UI first: no tsc/lint/full tests/commit/push until the user likes it (dev server and screenshots are fine).',
        ),
        subtitle: t('Gerbang persetujuan UI', 'UI approval gate'),
        position: { x: 450, y: 300 },
      },
      {
        id: 'pre-pr',
        kind: 'decision',
        label: t('Siap handoff?', 'Ready to hand off?'),
        description: t(
          'Pekerjaan selesai (untuk UI: sudah disukai dan dicek dengan /visual-verify). clean berjalan otomatis sebelum handoff PR apa pun.',
          'The work is done (for UI: approved and checked with /visual-verify). clean runs automatically before any PR handoff.',
        ),
        position: { x: 240, y: 460 },
      },
      {
        id: 'clean',
        kind: 'skill',
        label: '/clean',
        description: t(
          'Poles diff sendiri dengan KISS/DRY dan gaya lokal; buang dead code dan debug logging. Bukan test run.',
          'Polish your own diff with KISS/DRY and local style; cut dead code and debug logging. Not a test run.',
        ),
        subtitle: t('Pass pra-handoff', 'Pre-handoff pass'),
        position: { x: 100, y: 620 },
      },
      {
        id: 'notropes',
        kind: 'skill',
        label: '/no-tropes',
        description: t(
          'Revisi teks (judul/isi PR, commit message) terhadap katalog tropes tulisan AI.',
          'Revise text (PR title/body, commit messages) against the AI writing tropes catalog.',
        ),
        subtitle: t('Pass revisi prosa', 'Prose revision pass'),
        position: { x: 380, y: 620 },
      },
      {
        id: 'cpr',
        kind: 'skill',
        label: '/cpr',
        description: t(
          'clean lalu pr-update dalam satu pass (commit topikal, media di body dipertahankan, prosa lewat no-tropes); berakhir dengan tautan PR.',
          'clean then pr-update in one pass (topical commits, media in the body preserved, prose through no-tropes); ends with the PR link.',
        ),
        subtitle: t('Clean lalu PR', 'Clean then PR'),
        position: { x: 240, y: 780 },
      },
      {
        id: 'pr-ready',
        kind: 'onramp',
        label: '/pr-ready',
        description: t(
          'Jika base basi, CI merah, atau review thread terbuka: rebase/merge, perbaiki CI, selesaikan thread, query ulang forge.',
          'If the base is stale, CI is red, or review threads are open: rebase/merge, fix CI, resolve threads, re-query the forge.',
        ),
        subtitle: t('Base, CI, review thread', 'Base, CI, review threads'),
        position: { x: 60, y: 940 },
      },
      {
        id: 'babysit',
        kind: 'onramp',
        label: '/babysit',
        description: t(
          'Pantau PR sampai hijau atau merged: kick CI yang macet, rerun flake, tangkap thread terlambat. Lapor perubahan state saja; merge hanya bila diminta.',
          'Watch the PR until green or merged: kick stalled CI, rerun flakes, catch late threads. Report state changes only; merge only when asked.',
        ),
        subtitle: t('Pemantau CI', 'CI watcher'),
        position: { x: 420, y: 940 },
      },
    ],
    [],
  )

  const edges: FlowGraphEdge[] = useMemo(
    () => [
      { id: 'e-start-dev', source: 'start', target: 'dev-gate' },
      { id: 'e-dev-audit', source: 'dev-gate', target: 'audit', label: 'AUDIT' },
      { id: 'e-dev-ui', source: 'dev-gate', target: 'ui-only', label: 'UI' },
      { id: 'e-dev-code', source: 'dev-gate', target: 'pre-pr', label: 'CODE', dashed: true },
      { id: 'e-ui-pre', source: 'ui-only', target: 'pre-pr' },
      { id: 'e-pre-clean', source: 'pre-pr', target: 'clean' },
      { id: 'e-pre-notropes', source: 'pre-pr', target: 'notropes' },
      { id: 'e-clean-cpr', source: 'clean', target: 'cpr' },
      { id: 'e-notropes-cpr', source: 'notropes', target: 'cpr' },
      { id: 'e-cpr-ready', source: 'cpr', target: 'pr-ready' },
      { id: 'e-cpr-babysit', source: 'cpr', target: 'babysit' },
    ],
    [],
  )

  return (
    <section id="flow" className="scroll-mt-20 space-y-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-balance">
          {m.brooklyn_flow_title()}
        </h2>
        <p className="mt-1 text-muted-foreground text-sm">
          {m.brooklyn_flow_desc()}
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card p-2 shadow-xs">
        <Suspense
          fallback={
            <div className="flex h-[520px] items-center justify-center text-sm text-muted-foreground">
              {m.flow_loading()}
            </div>
          }
        >
          <FlowCanvas
            nodes={nodes}
            edges={edges}
            activeId={active}
            onSelect={setActive}
          />
        </Suspense>
      </div>
    </section>
  )
}
