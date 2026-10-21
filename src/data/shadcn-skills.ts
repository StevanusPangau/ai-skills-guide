import type { BilingualString, BilingualList } from '@/types/skill'

// Verified 2026-10-21 against shadcn-ui/ui @ ba1503c64472b82256d9de95e2e62c5901a38e8b
// (2026-10-19; "feat(registry): add community registries (#12347)").
// Skills live under skills/ inside the UI monorepo — only skills/shadcn and
// skills/migrate-radix-to-base. Root LICENSE.md is MIT, Copyright (c) 2023 shadcn.
// shadcn frontmatter sets user-invocable: false.

export const SHADCN_SOURCE_REPO = 'github.com/shadcn-ui/ui'
export const SHADCN_SOURCE_SHA = 'ba1503c64472b82256d9de95e2e62c5901a38e8b'
export const SOURCE_REPO = SHADCN_SOURCE_REPO
export const SOURCE_SHA = SHADCN_SOURCE_SHA

/** Category labels shared by the catalog filter chips and skill pages. */
export const SHADCN_CATEGORIES = [
  { label: 'Components', value: 'components' },
  { label: 'Migration', value: 'migration' },
]

export type RichSkill = {
  name: string
  category: string
  invocation: 'user' | 'model'
  description: BilingualString
  detailedDescription: BilingualString
  useWhen: BilingualList
  avoidWhen: BilingualList
  howItWorks: BilingualList
  coreRules: BilingualList
  tips: BilingualList
  pairsWellWith: string[]
  sourcePath: string
  spotlight?: {
    title: BilingualString
    body: BilingualString
  }
}

export const shadcnSkills: RichSkill[] = [
  {
    name: 'shadcn',
    category: 'components',
    invocation: 'model',
    description: {
      id: 'Skill model-invoked untuk mengelola komponen dan proyek shadcn/ui: mencari, menambah, memperbaiki, menata, dan menyusun UI lewat CLI, termasuk antarmuka chat.',
      en: 'Model-invoked skill for managing shadcn/ui components and projects: search, add, fix, style, and compose UI through the CLI, including chat interfaces.',
    },
    detailedDescription: {
      id: 'Skill resmi di dalam monorepo shadcn-ui/ui (folder skills/shadcn). Frontmatter menetapkan `user-invocable: false`, jadi agent memuatnya saat pekerjaan menyentuh shadcn/ui, registry, preset, kode `--preset`, atau proyek dengan `components.json`. Menyuntikkan konteks proyek lewat `npx shadcn@latest info --json`, lalu menegakkan Critical Rules dari `rules/` (styling, forms, composition, icons, chat, CLI). Alur utamanya: cek komponen terpasang, `search`, `docs`, `add` (dengan `--dry-run`/`--diff` saat memperbarui), lalu tinjau file yang ditambahkan terhadap aturan komposisi.',
      en: 'Official skill inside the shadcn-ui/ui monorepo (skills/shadcn folder). Frontmatter sets `user-invocable: false`, so the agent loads it when the work involves shadcn/ui, registries, presets, `--preset` codes, or a project with `components.json`. Injects project context via `npx shadcn@latest info --json`, then enforces Critical Rules from `rules/` (styling, forms, composition, icons, chat, CLI). Core loop: check installed components, `search`, `docs`, `add` (with `--dry-run`/`--diff` when updating), then review added files against composition rules.',
    },
    useWhen: {
      id: [
        'Proyek punya `components.json`, atau pekerjaan melibatkan shadcn/ui, registry, atau preset.',
        'Menambah, mencari, memperbaiki, menata, atau menyusun komponen lewat CLI shadcn.',
        'Membangun antarmuka chat dengan primitif MessageScroller, Message, Bubble, Attachment, Marker, Trace.',
      ],
      en: [
        'The project has a `components.json`, or the work involves shadcn/ui, a registry, or a preset.',
        'Adding, searching, fixing, styling, or composing components through the shadcn CLI.',
        'Building chat UI with MessageScroller, Message, Bubble, Attachment, Marker, and Trace primitives.',
      ],
    },
    avoidWhen: {
      id: [
        'Proyek tanpa `components.json` dan tanpa pekerjaan shadcn/registry/preset.',
        'Migrasi wrapper Radix ke Base UI (gunakan migrate-radix-to-base).',
      ],
      en: [
        'Projects without `components.json` and without shadcn/registry/preset work.',
        'Migrating Radix wrappers to Base UI (use migrate-radix-to-base).',
      ],
    },
    howItWorks: {
      id: [
        'Membaca konteks proyek dari `npx shadcn@latest info --json` (aliases, base, style, iconLibrary, framework, packageManager, dan lainnya).',
        'Mencari komponen dengan `npx shadcn@latest search` sebelum menulis UI kustom.',
        'Mengambil docs/examples lewat `npx shadcn@latest docs <component>`, lalu memasang dengan `add` (preview via `--dry-run` / `--diff`).',
        'Meninjau file yang ditambahkan: Group wrapping, Title overlay, iconLibrary proyek, dan Critical Rules.',
      ],
      en: [
        'Reads project context from `npx shadcn@latest info --json` (aliases, base, style, iconLibrary, framework, packageManager, and more).',
        'Searches with `npx shadcn@latest search` before writing custom UI.',
        'Fetches docs/examples via `npx shadcn@latest docs <component>`, then installs with `add` (preview via `--dry-run` / `--diff`).',
        'Reviews added files: Group wrapping, overlay Titles, the project iconLibrary, and Critical Rules.',
      ],
    },
    coreRules: {
      id: [
        '`className` untuk layout saja; warna semantik (`bg-primary`, `text-muted-foreground`), bukan nilai mentah; `gap-*` bukan `space-y-*`; `size-*` bila lebar=tinggi; `cn()` untuk kelas kondisional; jangan set `z-index` manual pada overlay.',
        'Form memakai `FieldGroup` + `Field`; `InputGroup` memakai `InputGroupInput`/`InputGroupTextarea`; set opsi 2–7 pakai `ToggleGroup`; validasi: `data-invalid` pada Field, `aria-invalid` pada kontrol.',
        'Item selalu di dalam Group-nya; Dialog/Sheet/Drawer wajib punya Title; Card pakai komposisi penuh; Button tanpa `isPending`/`isLoading` (compose Spinner + `data-icon` + `disabled`).',
        'Ikon di Button memakai `data-icon`; jangan kelas sizing pada ikon di dalam komponen; impor dari `iconLibrary` proyek.',
        'Chat memakai MessageScroller / Message / Bubble / Attachment / Marker / Trace — bukan bubble `div` atau scroll container manual.',
        'Jangan decode kode preset manual; pakai `preset decode` / `apply` / `init --preset`. Registry harus eksplisit — jangan menebak registry atas nama pengguna.',
      ],
      en: [
        '`className` for layout only; semantic colors (`bg-primary`, `text-muted-foreground`), never raw values; `gap-*` not `space-y-*`; `size-*` when width equals height; `cn()` for conditional classes; never set manual `z-index` on overlays.',
        'Forms use `FieldGroup` + `Field`; `InputGroup` uses `InputGroupInput`/`InputGroupTextarea`; 2–7 option sets use `ToggleGroup`; validation: `data-invalid` on Field, `aria-invalid` on the control.',
        'Items always inside their Group; Dialog/Sheet/Drawer always need a Title; Card uses full composition; Button has no `isPending`/`isLoading` (compose Spinner + `data-icon` + `disabled`).',
        'Icons in Button use `data-icon`; no sizing classes on icons inside components; import from the project `iconLibrary`.',
        'Chat composes MessageScroller / Message / Bubble / Attachment / Marker / Trace — never hand-rolled bubble `div`s or a raw scroll container.',
        'Never decode preset codes manually; use `preset decode` / `apply` / `init --preset`. Registry must be explicit — never guess a registry on the user\'s behalf.',
      ],
    },
    tips: {
      id: [
        'Preset bernama yang didokumentasikan skill: `nova`, `vega`, `maia`, `lyra`, `mira`, `luma`. Template: `next`, `vite`, `start`, `react-router`, `astro`, `laravel`.',
        'Saat memperbarui komponen: `add --dry-run` lalu `add --diff <file>`; jangan `--overwrite` tanpa persetujuan pengguna.',
        'Cek `base` dari info: Radix memakai `asChild`, Base UI memakai `render`.',
      ],
      en: [
        'Named presets documented by the skill: `nova`, `vega`, `maia`, `lyra`, `mira`, `luma`. Templates: `next`, `vite`, `start`, `react-router`, `astro`, `laravel`.',
        'When updating components: `add --dry-run` then `add --diff <file>`; never `--overwrite` without explicit user approval.',
        'Check `base` from info: Radix uses `asChild`, Base UI uses `render`.',
      ],
    },
    pairsWellWith: ['migrate-radix-to-base'],
    spotlight: {
      title: {
        id: 'Critical Rules selalu ditegakkan',
        en: 'Critical Rules are always enforced',
      },
      body: {
        id: 'Setiap aturan kritis menaut ke file di `rules/` dengan pasangan Incorrect/Correct: styling.md, forms.md, composition.md, icons.md, chat.md, plus CLI (preset/registry). Agent wajib memuatnya, bukan menebak pola Tailwind generik.',
        en: 'Every critical rule links to a file under `rules/` with Incorrect/Correct pairs: styling.md, forms.md, composition.md, icons.md, chat.md, plus CLI (preset/registry). The agent must load these, not invent generic Tailwind advice.',
      },
    },
    sourcePath: 'skills/shadcn/SKILL.md',
  },
  {
    name: 'migrate-radix-to-base',
    category: 'migration',
    invocation: 'user',
    description: {
      id: 'Memigrasi proyek dan komponen React dari Radix UI ke Base UI. Dipakai saat diminta migrasi dari radix, pindah ke base-ui, atau mengganti base library proyek shadcn.',
      en: 'Migrates React projects and components from Radix UI to Base UI. Use when asked to migrate from radix, move to base-ui, or switch a shadcn project\'s base library.',
    },
    detailedDescription: {
      id: 'Skill resmi di skills/migrate-radix-to-base. Menangani wrapper shadcn, komposisi radix hand-rolled, dan konsumennya menuju `@base-ui/react`, menjaga proyek tetap bisa di-build di setiap langkah. Preflight selalu: `npx shadcn@latest info --json`, deteksi package manager, git tree bersih, baseline typecheck/build, lalu pasang `@base-ui/react` berdampingan dengan radix. Strategi utama: golden pair via CLI (style `radix-<style>` → `base-<style>`), dengan fallback transformation engine dari file referensi (universal-patterns, overlays, menus, form-controls, dll.). Mode default progressive (satu komponen, strangler-fig ke `<component>-base.tsx`); whole-project hanya jika diminta eksplisit.',
      en: 'Official skill at skills/migrate-radix-to-base. Migrates shadcn wrappers, hand-rolled radix compositions, and their consumers to `@base-ui/react`, keeping the project buildable at every step. Preflight always: `npx shadcn@latest info --json`, detect package manager, clean git tree, baseline typecheck/build, then install `@base-ui/react` alongside radix. Preferred strategy: golden pair via CLI (`radix-<style>` → `base-<style>`), with a transformation-engine fallback from the reference files (universal-patterns, overlays, menus, form-controls, etc.). Default mode is progressive (one component, strangler-fig into `<component>-base.tsx`); whole-project only when explicitly asked.',
    },
    useWhen: {
      id: [
        'Pengguna meminta migrasi dari Radix ke Base UI (satu komponen atau seluruh proyek).',
        'Mengganti base library proyek shadcn dari radix ke base.',
        'Mengonversi primitif radix hand-rolled ke `@base-ui/react`.',
      ],
      en: [
        'The user asks to migrate from Radix to Base UI (one component or a whole project).',
        'Switching a shadcn project\'s base library from radix to base.',
        'Converting hand-rolled radix primitives to `@base-ui/react`.',
      ],
    },
    avoidWhen: {
      id: [
        'Menambah atau menata komponen shadcn tanpa migrasi base (gunakan skill shadcn).',
        'Menyentuh library non-radix: cmdk, vaul, sonner, input-otp, react-day-picker, recharts — sengaja tidak disentuh.',
      ],
      en: [
        'Adding or styling shadcn components without a base migration (use the shadcn skill).',
        'Touching non-radix libraries: cmdk, vaul, sonner, input-otp, react-day-picker, recharts — intentionally left alone.',
      ],
    },
    howItWorks: {
      id: [
        'Preflight: `info --json`, package manager dari lockfile, branch bersih, baseline build, pasang `@base-ui/react` berdampingan.',
        'Klasifikasi wrapper vs golden radix dari URL style `components.json` (verbatim, termasuk legacy new-york / default).',
        'Golden pair: whole-project mem-flip style ke `base-<style>` lalu `shadcn add <component> --overwrite` per komponen; progressive menulis ke `<component>-base.tsx` tanpa `--overwrite`.',
        'Sweep wajib: `grep -n "radix-ui\\|@radix-ui\\|IconPlaceholder"`; laporan per komponen di `.migration/<component>.md`.',
      ],
      en: [
        'Preflight: `info --json`, package manager from the lockfile, clean branch, baseline build, install `@base-ui/react` alongside.',
        'Classify wrappers against the radix golden from the `components.json` style URL (verbatim, including legacy new-york / default).',
        'Golden pair: whole-project flips style to `base-<style>` then `shadcn add <component> --overwrite` per component; progressive writes `<component>-base.tsx` without `--overwrite`.',
        'Mandatory sweep: `grep -n "radix-ui\\|@radix-ui\\|IconPlaceholder"`; per-component reports in `.migration/<component>.md`.',
      ],
    },
    coreRules: {
      id: [
        'Jangan menebak mapping — bila prop/part tidak ada di file referensi, cek `node_modules/@base-ui/react/**/*.d.ts`.',
        'Jangan bulk `--all --overwrite`; satu komponen per langkah. Progressive: jangan `--overwrite` (menghancurkan original yang masih diimpor konsumen).',
        'Jangan sentuh cmdk, vaul, sonner, input-otp, react-day-picker, recharts. Behavior deltas di-FLAG, tidak di-patch diam-diam.',
        '`button.tsx` migrasi ke primitif nyata `@base-ui/react/button`, bukan wrapper useRender hand-rolled.',
        'Style legacy (new-york, new-york-v4, default) tidak punya counterpart base — transform file pengguna, jangan restyle lewat base-<style>.',
      ],
      en: [
        'Never guess a mapping — when a prop or part is missing from the reference files, check `node_modules/@base-ui/react/**/*.d.ts`.',
        'Never bulk `--all --overwrite`; one component at a time. Progressive: never `--overwrite` (it destroys the original consumers still import).',
        'Never touch cmdk, vaul, sonner, input-otp, react-day-picker, recharts. Behavior deltas are FLAGGED, never silently patched.',
        '`button.tsx` migrates to the real `@base-ui/react/button` primitive, never a hand-rolled useRender wrapper.',
        'Legacy styles (new-york, new-york-v4, default) have no base counterpart — transform the user\'s own file; do not restyle onto base-<style>.',
      ],
    },
    tips: {
      id: [
        'Customized wrappers: `git merge-file user.tsx radix-golden.tsx base-golden.tsx` (three-way, radix golden sebagai ancestor), lalu sweep leftover.',
        'Dependency order: migrasi leaf/shared dulu (button, label) sebelum komponen yang mengimpornya.',
        'Status migrasi diturunkan dari disk (sisa import radix di alias `ui`), bukan dari index file.',
      ],
      en: [
        'Customized wrappers: `git merge-file user.tsx radix-golden.tsx base-golden.tsx` (three-way, radix golden as ancestor), then leftover sweep.',
        'Dependency order: migrate leaf/shared wrappers first (button, label) before components that import them.',
        'Migration status is derived from disk (remaining radix imports under the `ui` alias), not from an index file.',
      ],
    },
    pairsWellWith: ['shadcn'],
    spotlight: {
      title: {
        id: 'Golden pair dulu, transformation engine kemudian',
        en: 'Golden pair first, transformation engine second',
      },
      body: {
        id: 'Bila proyek shadcn punya style dikenal (`radix-<style>`), CLI sendiri adalah executor pasangan emas: ambil varian base dari registry, replay diff pengguna, sweep sisa radix. Transformation engine (universal-patterns + tabel per-family) hanya fallback untuk kode hand-rolled, non-shadcn, atau style tidak dikenal.',
        en: 'When a shadcn project has a known style (`radix-<style>`), the CLI itself is the golden-pair executor: fetch the base variant from the registry, replay the user diff, sweep leftover radix. The transformation engine (universal-patterns + per-family tables) is only the fallback for hand-rolled, non-shadcn, or unknown-style code.',
      },
    },
    sourcePath: 'skills/migrate-radix-to-base/SKILL.md',
  },
]
