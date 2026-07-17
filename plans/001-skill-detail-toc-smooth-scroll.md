# 001 — Skill detail: sticky section TOC with smooth scroll only

- **Status**: DONE
- **Commit**: `60dbd7b` (WIP may diverge; re-read files before editing)
- **Severity**: MEDIUM
- **Category**: Missed opportunities (additive motion) + Accessibility (in-page anchors)
- **Estimated scope**: ~4–6 files, medium (layout + ids + small nav component)

## Problem

On the skill detail page (`/skills/$skillName`, e.g. `/skills/design-an-interface`), section headings jump with no in-page navigation in the app, and section wrappers have **no `id`**, so even hash links cannot target them.

Current section markup (`src/features/skills/skill-detail.tsx:124–138`):

```tsx
function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div>
      <h2 className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        {title}
      </h2>
      {children}
    </div>
  )
}
```

The route layout is a single column (`src/routes/skills.$skillName.tsx:56–57`):

```tsx
<main id="main-content" className="min-w-0 flex-1 pt-14">
  <div className="mx-auto max-w-3xl space-y-8 px-6 py-10">
```

Desired UX (user request): when clicking a **sidebar / on-this-page** item to move to a section header, use **scroll animation only** — no content crossfade, no route transition, no layout morph. Just the page scrolling to the heading.

Collection-guide sidebar already does the correct scroll pattern (`src/components/layout/sidebar.tsx:142–158`):

```tsx
const handleNavClick = (
  e: React.MouseEvent<HTMLAnchorElement>,
  id: string,
) => {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
  e.preventDefault()
  document
    .getElementById(id)
    ?.scrollIntoView({
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    })
  setActive(id)
  if (window.location.hash !== `#${id}`) {
    history.replaceState(null, '', `#${id}`)
  }
  onClose()
}
```

Reduced-motion helper already exists (`src/lib/motion.ts`):

```ts
export function prefersReducedMotion(): boolean {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  } catch {
    return false
  }
}
```

Global CSS already forces `scroll-behavior: auto` under reduced motion (`src/index.css:146–154`). Do **not** add global `html { scroll-behavior: smooth }` — skill route resets use `behavior: 'instant'` and must stay snappy when changing skills.

## Target

1. Each skill-detail section (and install block) has a stable `id` + `scroll-mt-20` (same offset token as collection sections) so the sticky site header (`top-14` / 3.5rem) does not cover the heading.
2. Skill detail pages gain a **right sticky “On this page” TOC** (desktop) listing only sections that exist for that skill.
3. TOC click → **only** `scrollIntoView` with:
   - `behavior: 'smooth'` when motion is OK
   - `behavior: 'auto'` when `prefersReducedMotion()` is true
   - `block: 'start'`
4. Hash updates via `history.replaceState` (no full navigation, no scroll restart from router).
5. Active section highlights while scrolling (scroll spy), matching collection sidebar feel: `transition-colors` only on the link active styles — **no** enter/exit animation on the main content.
6. Changing skill via prev/next **keeps** instant scroll-to-top (`behavior: 'instant'`) — do not animate that.

Motion values (native smooth scroll — browser-owned curve; do not reimplement with rAF):

| Case | Behavior |
| --- | --- |
| TOC click, motion OK | `scrollIntoView({ behavior: 'smooth', block: 'start' })` |
| TOC click, reduced motion | `scrollIntoView({ behavior: 'auto', block: 'start' })` |
| Skill name change (prev/next) | `window.scrollTo({ top: 0, behavior: 'instant' })` (unchanged) |

Link chrome (active/hover): colors only, `transition-colors` (already used elsewhere) — duration ~150–200ms implicit via Tailwind default is fine; do **not** add transform/scale on TOC items.

## Repo conventions to follow

- Reuse `prefersReducedMotion` from `@/lib/motion` — never hardcode reduced-motion checks.
- Mirror collection sidebar scroll + hash pattern in `src/components/layout/sidebar.tsx` (`handleNavClick` + scroll spy), but as a **lighter right TOC**, not the full left drawer.
- Section offset class: `scroll-mt-20` (already used on collection `<section id="…">` e.g. `src/features/overview.tsx`).
- i18n: new TOC chrome strings in **both** `messages/id.json` and `messages/en.json` (keep key sets in sync). Labels for sections reuse existing `m.skill_detail_*()` / `m.david_detail_*()` / `m.skill_install_title()`.
- No new motion libraries (no Framer Motion).
- Package manager: npm. Verify with `npm run lint && npm run build`.

## Steps

### 1. Stable section ids in Matt skill body

File: `src/features/skills/skill-detail.tsx`

- Change `Section` to accept `id: string` and render:

```tsx
function Section({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: React.ReactNode
}) {
  return (
    <div id={id} className="scroll-mt-20">
      <h2 className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        {title}
      </h2>
      {children}
    </div>
  )
}
```

- Use **stable English slug ids** (not localized titles), e.g.:
  - `when-to-use`
  - `when-not-to-use`
  - `key-behaviors`
  - `how-it-works`
  - `its-working-if`
  - `workflow`
  - `tips`
  - `pairs-well-with`
  - `install` (on install wrapper)

- Pass `id` on every `<Section id="…" title={…}>`.
- Wrap install block:

```tsx
<div id="install" className="scroll-mt-20">
  <SkillInstallBlock source="mattpocock/skills" skillName={skill.name} />
</div>
```

### 2. Export a TOC item list from the Matt body (or co-locate helper)

Still in `src/features/skills/skill-detail.tsx` (or small `src/features/skills/skill-detail-toc.ts` if cleaner):

Add a pure helper that returns only present sections:

```ts
export type SkillTocItem = { id: string; label: string }

export function getSkillTocItems(skill: Skill): SkillTocItem[] {
  const whenNotToUse = getWhenNotToUse(skill)
  const items: SkillTocItem[] = [
    { id: 'when-to-use', label: m.skill_detail_when_to_use() },
  ]
  if (whenNotToUse) {
    items.push({ id: 'when-not-to-use', label: m.skill_detail_when_not_to_use() })
  }
  if (skill.keyBehaviors.length > 0) {
    items.push({ id: 'key-behaviors', label: m.skill_detail_key_behaviors() })
  }
  if ((skill.howItWorks ?? []).length > 0) {
    items.push({ id: 'how-it-works', label: m.skill_detail_how_it_works() })
  }
  if ((skill.itsWorkingIf ?? []).length > 0) {
    items.push({ id: 'its-working-if', label: m.skill_detail_its_working_if() })
  }
  if (skill.workflow) {
    items.push({ id: 'workflow', label: m.skill_detail_workflow() })
  }
  if ((skill.tips ?? []).length > 0) {
    items.push({ id: 'tips', label: m.skill_detail_tips() })
  }
  if ((skill.pairsWellWith ?? []).length > 0) {
    items.push({ id: 'pairs-well-with', label: m.skill_detail_pairs_well_with() })
  }
  items.push({ id: 'install', label: m.skill_install_title() })
  return items
}
```

Do **not** invent alternate copy like “Anti-pola” unless product copy is intentionally changed — use existing message keys.

### 3. Same for David skill body

File: `src/features/davidondrej/skill-detail.tsx`

- Add `id` + `scroll-mt-20` to `DetailSection` the same way.
- Stable ids, e.g. `prerequisites`, `dependencies`, `adaptation`, `install` (source link can stay without TOC entry or share adaptation).
- Export `getDavidSkillTocItems(skill)` with only present sections + install.
- Labels from existing `m.david_detail_*()` / `m.skill_install_title()`.

### 4. Shared on-this-page TOC component

Create `src/components/layout/on-this-page.tsx`:

```tsx
import { useEffect, useMemo, useState } from 'react'
import { prefersReducedMotion } from '@/lib/motion'
import { m } from '@/paraglide/messages.js'

export type OnThisPageItem = { id: string; label: string }

export function OnThisPage({ items }: { items: OnThisPageItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? '')
  const idsKey = useMemo(() => items.map((i) => i.id).join('|'), [items])

  useEffect(() => {
    const ids = idsKey.split('|').filter(Boolean)
    if (ids.length === 0) return

    const onScroll = () => {
      // Match collection sidebar trigger: header + breathing room
      const trigger = 56 + 96
      let current = ids[0] ?? ''
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= trigger) {
          current = id
        }
      }
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 4
      ) {
        current = ids[ids.length - 1] ?? current
      }
      setActive(current)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [idsKey])

  // Reset active when items change (skill switch)
  useEffect(() => {
    setActive(items[0]?.id ?? '')
  }, [idsKey]) // eslint: items[0] derived from idsKey

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      block: 'start',
    })
    setActive(id)
    if (window.location.hash !== `#${id}`) {
      history.replaceState(null, '', `#${id}`)
    }
  }

  if (items.length < 2) return null

  return (
    <nav
      aria-label={m.skill_detail_on_this_page()}
      className="hidden xl:block"
    >
      <p className="mb-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        {m.skill_detail_on_this_page()}
      </p>
      <ul className="space-y-1 border-l border-border">
        {items.map((item) => {
          const isActive = active === item.id
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className={`block border-l-2 py-1.5 pl-3 -ml-px text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 ${
                  isActive
                    ? 'border-primary font-medium text-foreground'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
                aria-current={isActive ? 'location' : undefined}
              >
                {item.label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
```

**Hard motion rules for this component:**

- Only motion is native smooth scrolling.
- Link styles: `transition-colors` only — no `translate`, `scale`, `opacity` animation on the content pane.
- Do not animate the TOC list itself (no stagger, no slide-in).

### 5. Wire TOC into skill routes

**Matt** — `src/routes/skills.$skillName.tsx`:

- Import `getSkillTocItems` and `OnThisPage`.
- Widen layout so content + TOC sit side by side on xl:

```tsx
<main id="main-content" className="min-w-0 flex-1 pt-14">
  <div className="mx-auto flex max-w-6xl gap-10 px-6 py-10">
    <div className="min-w-0 max-w-3xl flex-1 space-y-8">
      {/* existing breadcrumb, header, Separator, SkillDetailBody, nav, back */}
    </div>
    <aside className="hidden w-52 shrink-0 xl:block">
      <div className="sticky top-24">
        <OnThisPage items={getSkillTocItems(skill)} />
      </div>
    </aside>
  </div>
</main>
```

Keep `useEffect` scroll-to-top on `skill.name` **instant** (already present). Optionally clear hash on skill change:

```tsx
useEffect(() => {
  window.scrollTo({ top: 0, behavior: 'instant' })
  if (window.location.hash) {
    history.replaceState(null, '', window.location.pathname + window.location.search)
  }
}, [skill.name])
```

**David** — `src/routes/davidondrej.skills.$skillName.tsx`: same layout pattern with `getDavidSkillTocItems`.

### 6. i18n

Add to **both** `messages/id.json` and `messages/en.json`:

```json
"skill_detail_on_this_page": "Di halaman ini"
```

```json
"skill_detail_on_this_page": "On this page"
```

Keys must stay in sync. Do not run paraglide by hand if `npm run build` already compiles it; local dev may need the paraglide step from `package.json` scripts.

### 7. Optional deep-link on first load

If `window.location.hash` matches a known section id on mount, after paint call `scrollIntoView` once with the same reduced-motion branch. Put this in `OnThisPage` or the route — once only, not on every skill prop flicker. Skip if reduced motion and hash is empty.

## Boundaries

- Do **NOT** add Framer Motion / CSS keyframes for section changes.
- Do **NOT** set global `scroll-behavior: smooth` on `html`/`body`.
- Do **NOT** animate prev/next skill navigation or breadcrumb navigation.
- Do **NOT** change collection-guide left `Sidebar` behavior except if you extract a shared `scrollToSection(id)` helper (optional; keep DRY light).
- Do **NOT** rename product copy of section titles to match an external screenshot (“Anti-pola”, etc.) unless product asks.
- Do **NOT** touch landing wordmark, theme default, or unrelated PR WIP beyond the files listed.
- If file contents at execution time differ from the excerpts above, re-read and adapt ids/layout only — do not invent a second motion system.

## Verification

- **Mechanical**:
  - `npm run lint`
  - `npm run build`
  - Both must pass. Paraglide must compile new message key (build script already runs compile first).

- **Feel check**:
  1. Open `/skills/design-an-interface` (or any long skill) at xl viewport.
  2. Confirm right TOC lists only sections present for that skill.
  3. Click each TOC item: page **smooth-scrolls** to that heading; content does not fade/slide; heading sits below the sticky site header (`scroll-mt-20`).
  4. Spam-click several TOC items: scroll retargets mid-flight (native behavior); no stuck animations.
  5. Manually scroll the page: TOC `aria-current` / active border tracks the section.
  6. Click prev/next skill: jump to top is **instant**, not smooth; TOC items update for the new skill.
  7. DevTools → Rendering → **Emulate CSS media feature `prefers-reduced-motion: reduce`**: TOC clicks jump without smooth scroll; active styles still update.
  8. Narrow viewport (&lt; xl): TOC hidden; page still usable; hash links `#when-to-use` still work if typed.
  9. Open with hash e.g. `/skills/design-an-interface#install` (if step 7 implemented): lands on install section without animating the whole app chrome.

- **Done when**:
  - Section anchors exist and TOC click uses smooth scroll only (reduced-motion → auto).
  - No content transition besides scroll.
  - Lint + build clean; id/en message keys in sync.
```

