import type { BilingualString, BilingualList } from '@/types/skill'

// Verified against expo/skills @ 13ad8e05874195633b5c185f6947bb6400e228fc
// (2026-10-02; plugin `expo` v1.13.9; `expo-experiments` plugin v0.1.1). Checked 2026-10-04.
// Categories follow upstream README groups: start-here, framework (open source),
// services (paid EAS), experimental (separate expo-experiments plugin).
export const EXPO_SOURCE_REPO = 'github.com/expo/skills'
export const EXPO_SOURCE_SHA = '13ad8e05874195633b5c185f6947bb6400e228fc'
export const SOURCE_REPO = EXPO_SOURCE_REPO
export const SOURCE_SHA = EXPO_SOURCE_SHA

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

export const expoSkills: RichSkill[] = [
  {
    name: 'expo-overview',
    category: 'start-here',
    invocation: 'model',
    description: {
      id: 'Entry point & router untuk setiap tugas Expo/EAS: mendeteksi tujuan, mengarahkan ke skill expo-*/eas-* yang tepat, dan memegang aturan setup bersama.',
      en: 'Entry point and router for every Expo/EAS task: detects the real goal, routes to the right expo-*/eas-* skill, and owns the shared setup rules.',
    },
    detailedDescription: {
      id: 'Muat skill ini lebih dulu bila permintaan menyebut Expo, EAS, Expo Go, paket expo-*, atau package.json punya dependency `expo`. Ia memetakan tujuan (build app, ship & operate, extend natively, maintain) ke skill leaf, menerjemahkan frasa kasual ("bikin terasa native", "ship ke App Store"), dan menetapkan aturan bersama: deteksi versi SDK, baca docs versi SDK itu (bukan `latest`), `npx expo install`, EAS auth & linking.',
      en: 'Load this first when a request mentions Expo, EAS, Expo Go, an expo-* package, or package.json has an `expo` dependency. It maps the goal (build the app, ship & operate, extend natively, maintain & learn) to a leaf skill, translates casual phrasing ("make it look native", "ship it"), and owns the shared rules: detect the SDK version, read that SDK\'s docs rather than `latest`, `npx expo install`, EAS auth and linking.',
    },
    useWhen: {
      id: [
        'Permintaan menyebut Expo/EAS/Expo Go atau proyek punya dependency `expo` di package.json — termasuk spec/desain yang akan diimplementasikan (tab, stack, peta, daftar, dari screenshot).',
        'Pengguna baru atau tujuannya samar: "bikin app mobile", "bikin tampil native", "tambah navigasi", "upgrade SDK", "ship ke App Store".',
      ],
      en: [
        'The request mentions Expo, EAS or Expo Go, or the project has an `expo` dependency in package.json — including specs and designs to implement (tabs, stacks, maps, lists, from a screenshot).',
        'The user is new or the goal is vague: "implement a mobile app", "make it look native", "add navigation", "upgrade my SDK", "ship to the App Store".',
      ],
    },
    avoidWhen: {
      id: [
        'Proyek React Native polos tanpa dependency `expo` dan tanpa EAS — itu bukan pekerjaan Expo.',
        'Pengguna sudah menyebut nama skill expo-*/eas-* tertentu — muat skill itu langsung.',
      ],
      en: [
        'A bare React Native project with no `expo` dependency and no EAS involvement is not Expo work.',
        'The user explicitly named a specific expo-*/eas-* skill — load that skill directly.',
      ],
    },
    howItWorks: {
      id: [
        'Konfirmasi ini memang pekerjaan Expo/EAS (permintaan menyebutnya atau ada dependency `expo`; app native yang memakai EAS untuk delivery juga masuk).',
        'Baca tujuan pengguna dalam bahasa biasa, klasifikasikan dengan Skill Map, dan konfirmasi bila ambigu.',
        'Muat SKILL.md skill leaf yang cocok dan percayai logikanya — jangan berimprovisasi.',
      ],
      en: [
        'Confirm this is Expo or EAS work (the request mentions it or there is an `expo` dependency; a native app using EAS for delivery also qualifies).',
        'Read the user\'s goal in plain terms, classify it with the Skill Map, and confirm if ambiguous.',
        'Load the matching leaf skill\'s SKILL.md and trust its own logic — do not improvise.',
      ],
    },
    coreRules: {
      id: [
        'Jangan menebak skill hanya dari file proyek; banyak tujuan terlihat mirip dari filesystem tapi butuh skill berbeda.',
        'Deteksi versi `expo` di package.json/app config sebelum memberi saran spesifik versi, dan baca docs berversi (mis. `docs.expo.dev/versions/v56.0.0/...`), bukan `latest`.',
        'Pasang paket dengan `npx expo install <pkg>`, bukan `npm/yarn/pnpm add` mentah.',
        'Aturan pemilihan komponen: untuk komponen UI (sheet, picker, slider, menu, toggle), cek `expo-ui` dulu sebelum built-in RN atau library komunitas.',
      ],
      en: [
        'Do not guess the skill from project files alone; many goals look similar from the filesystem but need different skills.',
        'Detect the `expo` version in package.json/app config before version-specific advice, and read versioned docs (e.g. `docs.expo.dev/versions/v56.0.0/...`), not `latest`.',
        'Install packages with `npx expo install <pkg>`, not raw `npm/yarn/pnpm add`.',
        'Component selection rule: for UI components (sheets, pickers, sliders, menus, toggles), consult `expo-ui` first before RN built-ins or community libraries.',
      ],
    },
    tips: {
      id: [
        'Proyek baru: mulai dengan `npx create-expo-app@latest`, atur folder per `expo-project-structure`, lalu rute berdasarkan tujuan.',
        'EAS auth: `eas whoami` / `eas login`; proyek ter-link bila `extra.eas.projectId` ada di app config, buat dengan `eas init`.',
        'Pindah ke SDK lebih baru adalah tugas tersendiri — muat `expo-upgrade`, jangan naikkan versi manual.',
      ],
      en: [
        'New project: start with `npx create-expo-app@latest`, lay out folders per `expo-project-structure`, then route by goal.',
        'EAS auth: `eas whoami` / `eas login`; a project is linked when `extra.eas.projectId` exists in the app config, create it with `eas init`.',
        'Moving to a newer SDK is its own task — load `expo-upgrade` instead of bumping versions by hand.',
      ],
    },
    pairsWellWith: ['expo-router', 'expo-native-ui', 'expo-ui'],
    spotlight: {
      title: {
        id: 'Router, Bukan Tukang Kode',
        en: 'A Router, Not a Coder',
      },
      body: {
        id: 'Skill ini hampir tidak berisi kode: isinya Skill Map berdasarkan tujuan (Build the app / Ship & operate / Extend natively / Maintain & learn) plus aturan setup bersama. Bahkan permintaan yang sudah sangat spesifik (SDK dipatok, library disebut) tetap lewat sini agar aturan bersama berlaku.',
        en: 'This skill is almost all routing: a Skill Map by goal (Build the app / Ship & operate / Extend natively / Maintain & learn) plus shared setup rules. Even a fully specified request (SDK pinned, libraries named) still passes through it so the shared rules apply.',
      },
    },
    sourcePath: 'plugins/expo/skills/expo-overview/SKILL.md',
  },
  {
    name: 'expo-project-structure',
    category: 'framework',
    invocation: 'model',
    description: {
      id: 'Struktur folder untuk aplikasi Expo baru: tata letak `src/`, `app/` khusus rute, screens, kode server, dan file spesifik platform.',
      en: 'Folder structure for a new Expo app: `src/` layout, routes-only `app/`, screens, server code, and platform-specific files.',
    },
    detailedDescription: {
      id: 'Kerangka awal untuk app Expo Router baru: kode aplikasi di bawah `src/`, `src/app` hanya berisi rute, UI reusable di `components/`, badan layar di `screens/`, rute API di `app/api/` dengan helper di `src/server/`, plus file `.ios/.android/.native/.web`. Hanya untuk proyek baru — jangan pernah merestrukturisasi app yang sudah ada.',
      en: 'A starting skeleton for a new Expo Router app: app code under `src/`, `src/app` holding routes only, reusable UI in `components/`, screen bodies in `screens/`, API routes in `app/api/` with helpers in `src/server/`, plus `.ios/.android/.native/.web` platform files. For new projects only — never restructure an existing app.',
    },
    useWhen: {
      id: [
        'Membuat scaffold atau menata proyek Expo baru dengan Expo Router.',
        'Menentukan di mana sebuah file harus diletakkan (komponen, layar, helper server, util, hook).',
      ],
      en: [
        'Scaffolding or laying out a new Expo project with Expo Router.',
        'Deciding where a file should live (component, screen, server helper, util, hook).',
      ],
    },
    avoidWhen: {
      id: [
        'App yang sudah punya struktur: ikuti konvensinya, biarkan file di tempatnya — ini default awal, bukan standar yang dipaksakan.',
        'Tidak yakin proyek baru atau bukan: tanyakan dulu sebelum memindahkan apa pun.',
      ],
      en: [
        'An app that already has a layout: follow its conventions and leave files where they are — this is a default to start from, not a standard to enforce.',
        'Unsure whether the project is new: ask before moving anything.',
      ],
    },
    howItWorks: {
      id: [
        'Taruh kode app di `src/` agar terpisah dari file config; Expo Router mendukung `app/` maupun `src/app/`, dan template default meng-alias `@/*` ke `./src/*`.',
        '`src/app` hanya rute; layar yang kompleks dan tidak dipakai ulang pindah ke `src/screens/<nama>/` dan rute hanya me-render-nya.',
        'Rute API (`+api.ts`) dikelompokkan di `app/api/`, helper server-only di `src/server/`.',
      ],
      en: [
        'Keep app code under `src/` to separate it from config files; Expo Router supports both `app/` and `src/app/`, and the default template aliases `@/*` to `./src/*`.',
        '`src/app` is routes-only; complex non-reused screen UI goes to `src/screens/<name>/` and the route just renders it.',
        'API routes (`+api.ts`) are grouped under `app/api/`, server-only helpers in `src/server/`.',
      ],
    },
    coreRules: {
      id: [
        'Nama file kebab-case (`bar-chart.tsx`); komponen yang membesar menjadi folder dengan `index.tsx` dan sub-komponen privat di sebelahnya.',
        'Varian platform (`bar-chart.web.tsx`) wajib punya file default tanpa ekstensi platform dan props yang identik; ekstensi yang didukung: `.ios`, `.android`, `.native`, `.web`.',
        'Colocate: `StyleSheet.create` di bagian bawah file komponen dan test (`format-date.test.ts`) di samping filenya.',
      ],
      en: [
        'Name files in kebab-case (`bar-chart.tsx`); a growing component becomes a folder with `index.tsx` and private sub-components beside it.',
        'Platform variants (`bar-chart.web.tsx`) need a default file with no platform extension and identical props; supported extensions: `.ios`, `.android`, `.native`, `.web`.',
        'Colocate: `StyleSheet.create` at the bottom of the component file and tests (`format-date.test.ts`) next to their source.',
      ],
    },
    tips: {
      id: [
        'Instruksi agent (`AGENTS.md`/`CLAUDE.md`) tetap di root repo; `app.json`, `eas.json`, `assets/`, `scripts/` tetap di luar `src/`.',
        'Skill ini berdasarkan panduan struktur folder Expo oleh Kadi Kraman.',
      ],
      en: [
        'Agent instructions (`AGENTS.md`/`CLAUDE.md`) stay at the repo root; `app.json`, `eas.json`, `assets/`, `scripts/` stay outside `src/`.',
        'This skill is based on the Expo app folder structure guide by Kadi Kraman.',
      ],
    },
    pairsWellWith: ['expo-router', 'expo-design-system', 'expo-overview'],
    spotlight: {
      title: {
        id: 'Rute Saja di `src/app`',
        en: 'Routes Only in `src/app`',
      },
      body: {
        id: 'Aturan inti: setiap file di `src/app` menjadi rute, jadi tidak ada komponen, tipe, atau util di sana. Badan layar yang kompleks tinggal di `src/screens/`, dan layar yang sama bisa dirender oleh beberapa rute.',
        en: 'The core rule: every file in `src/app` becomes a route, so no components, types or utils live there. Complex screen bodies live in `src/screens/`, and the same screen can render under multiple routes.',
      },
    },
    sourcePath: 'plugins/expo/skills/expo-project-structure/SKILL.md',
  },
  {
    name: 'expo-router',
    category: 'framework',
    invocation: 'model',
    description: {
      id: 'Navigasi dan routing Expo Router: rute berbasis file, Link dengan preview & context menu, native Stack, modal & form sheet, NativeTabs, header, toolbar, dan search bar.',
      en: 'Expo Router navigation and routing: file-based routes, Link with previews and context menus, native Stack, modals and form sheets, NativeTabs, headers, toolbars, and header search bars.',
    },
    detailedDescription: {
      id: 'Mencakup rute berbasis file, grup & rute dinamis, organisasi folder, `Link` dengan `Link.Preview`/`Link.Menu`, `Stack` native (`Stack.Title`, `Stack.SearchBar`), modal dan form sheet (`presentation: "formSheet"`), `NativeTabs` dari `expo-router/unstable-native-tabs`, header/toolbar, dan transisi Apple Zoom. Styling layar ada di expo-native-ui, gerak di expo-animation.',
      en: 'Covers file-based routes, groups and dynamic routes, folder organization, `Link` with `Link.Preview`/`Link.Menu`, native `Stack` (`Stack.Title`, `Stack.SearchBar`), modals and form sheets (`presentation: "formSheet"`), `NativeTabs` from `expo-router/unstable-native-tabs`, headers/toolbars, and Apple Zoom transitions. Screen styling lives in expo-native-ui, motion in expo-animation.',
    },
    useWhen: {
      id: [
        'Membuat atau menata rute, grup, rute dinamis, tab, stack, modal, atau sheet di Expo Router.',
        'Menambah Link dengan preview/context menu, judul halaman, header/toolbar, atau search bar di header.',
      ],
      en: [
        'Creating or organizing routes, groups, dynamic routes, tabs, stacks, modals or sheets in Expo Router.',
        'Adding Links with previews/context menus, page titles, headers/toolbars, or header search bars.',
      ],
    },
    avoidWhen: {
      id: [
        'Styling layar, warna, kontrol, media — itu wilayah `expo-native-ui`.',
        'Gerak dan gesture (transisi kustom, sheet yang bisa di-drag) — gunakan `expo-animation`.',
      ],
      en: [
        'Screen styling, colors, controls, media — that is `expo-native-ui` territory.',
        'Motion and gestures (custom transitions, draggable sheets) — use `expo-animation`.',
      ],
    },
    howItWorks: {
      id: [
        'Rute hidup di direktori `app`; selalu definisikan stack lewat file `_layout.tsx` dan pastikan ada rute yang cocok dengan "/" (boleh di dalam grup).',
        'Navigasi antar rute memakai `<Link href>`; sertakan `<Link.Preview>` dan `Link.Menu` agar mengikuti konvensi iOS.',
        'Modal lewat `presentation: "modal"`, sheet lewat `presentation: "formSheet"` (dengan `sheetAllowedDetents`); `contentStyle` transparan memberi latar liquid glass di iOS 26+.',
      ],
      en: [
        'Routes live in the `app` directory; always define stacks via `_layout.tsx` files and make sure a route matches "/" (it may sit inside a group).',
        'Navigate between routes with `<Link href>`; include `<Link.Preview>` and `Link.Menu` to follow iOS conventions.',
        'Modals use `presentation: "modal"`, sheets use `presentation: "formSheet"` (with `sheetAllowedDetents`); a transparent `contentStyle` gives a liquid-glass background on iOS 26+.',
      ],
    },
    coreRules: {
      id: [
        'Jangan menaruh komponen, tipe, atau util di direktori `app` (anti-pattern); hapus file rute lama saat memindahkan/merestrukturisasi navigasi.',
        'Nama file kebab-case tanpa karakter khusus; konfigurasikan alias path di tsconfig.json dan utamakan alias daripada import relatif.',
        'Gunakan `Color` dari `expo-router` untuk warna semantik native, bukan `PlatformColor` mentah.',
        'Di SDK 56+, jangan impor dari `@react-navigation/*` langsung; pakai `expo-router/react-navigation`.',
        'Utamakan `Stack.SearchBar` untuk menambah search bar; pakai komponen `Stack` native dari `expo-router/stack`.',
      ],
      en: [
        'Never co-locate components, types, or utilities in the `app` directory (anti-pattern); remove old route files when moving or restructuring navigation.',
        'Kebab-case file names with no special characters; configure tsconfig path aliases and prefer them over relative imports.',
        'Use `Color` from `expo-router` for native semantic colors, not raw `PlatformColor`.',
        'In SDK 56+, never import from `@react-navigation/*` directly; use `expo-router/react-navigation`.',
        'Prefer `Stack.SearchBar` to add a search bar; use the native `Stack` from `expo-router/stack`.',
      ],
    },
    tips: {
      id: [
        'Tata letak umum: `app/_layout.tsx` berisi `<NativeTabs />`, tiap tab punya grup `(index)`/`(search)` dengan `_layout.tsx` `<Stack />` sendiri.',
        'Referensi detail ada di `references/`: route-structure, tabs (NativeTabs, fitur iOS 26), toolbar-and-headers, form-sheet, search, zoom-transitions (iOS 18+).',
      ],
      en: [
        'Common layout: `app/_layout.tsx` holds `<NativeTabs />`, and each tab has a `(index)`/`(search)` group with its own `_layout.tsx` `<Stack />`.',
        'Detailed references are in `references/`: route-structure, tabs (NativeTabs, iOS 26 features), toolbar-and-headers, form-sheet, search, zoom-transitions (iOS 18+).',
      ],
    },
    pairsWellWith: ['expo-native-ui', 'expo-animation', 'expo-overview'],
    spotlight: {
      title: {
        id: 'Link yang Terasa Native',
        en: 'Links That Feel Native',
      },
      body: {
        id: 'Skill ini mendorong `Link.Preview` dan `Link.Menu` (context menu long-press) "sesering mungkin", plus sheet native (`formSheet`) dan `NativeTabs` alih-alih tab buatan JS — navigasi memakai komponen platform yang asli.',
        en: 'The skill pushes `Link.Preview` and `Link.Menu` (long-press context menus) "frequently", plus native sheets (`formSheet`) and `NativeTabs` instead of JS-built tabs — navigation uses the real platform components.',
      },
    },
    sourcePath: 'plugins/expo/skills/expo-router/SKILL.md',
  },
  {
    name: 'expo-animation',
    category: 'framework',
    invocation: 'model',
    description: {
      id: 'Animasi & gesture React Native/Expo dengan urutan keputusan yang benar: perlu dianimasikan?, thread mana, properti apa, spring atau timing, handoff gesture, dan degradasi. Ditulis dengan Reanimated, Gesture Handler, Expo Router, expo-haptics.',
      en: 'Animation and gestures in React Native/Expo, deciding in the right order: should it animate, which thread, which properties, spring or timing, gesture hand-off, degradation. Implemented with Reanimated, Gesture Handler, Expo Router and expo-haptics.',
    },
    detailedDescription: {
      id: 'Skill konstruksi untuk gerak di mobile, dibuat bersama Emil Kowalski (juga ada di repo emilkowalski/skills). Urutan build: gate frekuensi, tujuan satu kata, pilih tool termurah (Reanimated CSS transition/animation, layout animation, shared value + Gesture), properti, timing vs spring, jaga di UI thread, press (bukan hover), haptics, reduced motion. Skia hanya untuk scene animasi besar atau gambar bebas.',
      en: 'A construction skill for mobile motion, created in collaboration with Emil Kowalski (also in the emilkowalski/skills repo). Build sequence: frequency gate, one-word purpose, cheapest tool (Reanimated CSS transition/animation, layout animations, shared value + Gesture), properties, timing vs spring, keep it off the JS thread, press (not hover), haptics, reduced motion. Skia is only for huge animated scenes or freeform drawing.',
    },
    useWhen: {
      id: [
        'Menganimasikan sesuatu di app Expo: gesture, sheet, transisi layar, press feedback, haptics.',
        'Memperbaiki gerak yang patah-patah di perangkat nyata (dev build lambat menyembunyikan masalah).',
      ],
      en: [
        'Animating anything in an Expo app: gestures, sheets, screen transitions, press feedback, haptics.',
        'Fixing motion that stutters on a real device (a slow dev build hides the very problems).',
      ],
    },
    avoidWhen: {
      id: [
        'Aksi berfrekuensi tinggi (tab switch, buka/tutup keyboard, scroll, toggle di settings): skill ini justru menyuruh tanpa animasi dan tidak menulis kode.',
        'Transisi layar buatan JS atau tab yang slide — pakai opsi native stack / `animation: \'none\'`.',
      ],
      en: [
        'High-frequency actions (tab switches, keyboard open/close, scrolling, settings toggles): the skill says no animation and writes no code.',
        'JS-built screen transitions or sliding tabs — use native stack options / `animation: \'none\'`.',
      ],
    },
    howItWorks: {
      id: [
        'Gate 1: seberapa sering? 100+/hari = tanpa animasi; puluhan = di bawah 150ms; sesekali = animasi standar; langka = anggaran delight.',
        'Gate 2: namai tujuannya (feedback, spatial consistency, state indication, mencegah perubahan mendadak, explanation, delight). Tidak bisa dinamai = jangan dibangun.',
        'Pilih tool paling murah yang cocok, lalu spring bila ada jari di elemen (config `duration` + `dampingRatio`), timing + easing bila tidak.',
      ],
      en: [
        'Gate 1: how often? 100+/day = no animation; tens/day = under 150ms; occasional = standard; rare = delight budget.',
        'Gate 2: name the purpose (feedback, spatial consistency, state indication, preventing a jarring change, explanation, delight). Can\'t name it = don\'t build it.',
        'Pick the cheapest tool that fits, then a spring if a finger was involved (`duration` + `dampingRatio` config), timing + easing otherwise.',
      ],
    },
    coreRules: {
      id: [
        'Reanimated, bukan core `Animated`; gerak di UI runtime, bukan `setState` per frame atau `PanResponder`.',
        'Reduced motion dikirim bersama animasinya: lebih sedikit dan lebih lembut, bukan nol (pertahankan opacity/warna, buang translate/scale/overshoot).',
        'Jangan animasikan `height/width/margin/flex/top`; pakai `transform` + `opacity`. Jangan `scale(0)` entrance — pakai `scale(0.95)` + opacity.',
        'Feel dinilai pada release build di perangkat terlambat yang didukung — bukan Expo Go atau simulator.',
      ],
      en: [
        'Reanimated, not core `Animated`; keep motion on the UI runtime — no per-frame `setState` or `PanResponder`.',
        'Reduced motion ships with the animation: fewer and gentler, not zero (keep opacity/color, drop translation/scale/overshoot).',
        'Never animate `height/width/margin/flex/top`; use `transform` + `opacity`. No `scale(0)` entrance — use `scale(0.95)` + opacity.',
        'Feel is judged on a release build on the slowest supported device — not Expo Go or the simulator.',
      ],
    },
    tips: {
      id: [
        'Pasang lewat `npx expo install react-native-reanimated react-native-worklets`; di Expo, `babel-preset-expo` sudah mengatur plugin worklets. Reanimated 4 butuh New Architecture dan `GestureHandlerRootView` membungkus app.',
        '`RECIPES.md` berisi resep siap pakai: press feedback, drag-to-dismiss sheet, swipe-to-delete, collapsing header, list entrance, UI yang mengikuti keyboard, tab indicator.',
      ],
      en: [
        'Install via `npx expo install react-native-reanimated react-native-worklets`; in Expo, `babel-preset-expo` configures the worklets plugin. Reanimated 4 needs the New Architecture and `GestureHandlerRootView` must wrap the app.',
        '`RECIPES.md` has ready-to-build recipes: press feedback, drag-to-dismiss sheet, swipe-to-delete, collapsing header, list entrances, keyboard-synced UI, tab indicator.',
      ],
    },
    pairsWellWith: ['expo-router', 'expo-native-ui', 'expo-ui'],
    spotlight: {
      title: {
        id: 'Gate yang Kadang Menghasilkan Nol Baris Kode',
        en: 'A Gate That Sometimes Produces Zero Lines of Code',
      },
      body: {
        id: 'Langkah 1 dan 2 menggerbang semuanya: bila permintaan gagal di gate frekuensi/tujuan, agent harus mengatakannya dan tidak menulis animasinya. "Tab tidak pernah slide" adalah contohnya — tab adalah peer, bukan hierarki.',
        en: 'Steps 1 and 2 gate everything: if a request fails the frequency/purpose gate, the agent says so and does not write the animation. "Tab switches never slide" is the example — tabs are peers, not a hierarchy.',
      },
    },
    sourcePath: 'plugins/expo/skills/expo-animation/SKILL.md',
  },
  {
    name: 'expo-native-ui',
    category: 'framework',
    invocation: 'model',
    description: {
      id: 'Layar Expo yang indah dan terasa native: gaya Apple HIG, warna semantik, kontrol native, SF Symbols, media, efek visual, gradien, storage, dan layout responsif.',
      en: 'Beautiful, native-feeling Expo screens: Apple HIG styling, semantic colors, native controls, SF Symbols, media, visual effects, gradients, storage, and responsive layout.',
    },
    detailedDescription: {
      id: 'Panduan styling layar: ikuti bahasa desain tiap platform (Apple HIG di iOS, Material Design 3 di Android), warna semantik via `Color` dari `expo-router`, ikon `expo-symbols`, `expo-image`, `expo-audio`/`expo-video`, blur & liquid glass, gradien CSS, storage (SQLite/SecureStore). Cek `expo-ui` dulu sebelum memilih komponen; routing ada di expo-router dan gerak di expo-animation.',
      en: 'A screen-styling guide: follow each platform\'s design language (Apple HIG on iOS, Material Design 3 on Android), semantic colors via `Color` from `expo-router`, `expo-symbols` icons, `expo-image`, `expo-audio`/`expo-video`, blur and liquid glass, CSS gradients, storage (SQLite/SecureStore). Check `expo-ui` before picking components; routing is expo-router and motion is expo-animation.',
    },
    useWhen: {
      id: [
        'Membangun layar yang terasa native: warna, kontrol, ikon, media, efek visual, gradien, storage.',
        'Menyelesaikan layar: memeriksa empat state (loading/error/empty/content), keyboard, teks panjang, gambar hilang, dan font besar.',
      ],
      en: [
        'Building a native-feeling screen: colors, controls, icons, media, visual effects, gradients, storage.',
        'Finishing a screen: checking the four states (loading/error/empty/content), keyboard, long titles, missing images and large system text.',
      ],
    },
    avoidWhen: {
      id: [
        'Rute, tab, modal, header — gunakan `expo-router`; gerak/gesture — `expo-animation`.',
        'Tailwind/CSS tidak didukung di skill ini (gunakan inline style); untuk Tailwind/NativeWind ikuti setup library tersebut.',
      ],
      en: [
        'Routes, tabs, modals, headers — use `expo-router`; motion/gestures — `expo-animation`.',
        'CSS and Tailwind are not supported here (use inline styles); for Tailwind/NativeWind follow that library\'s own setup.',
      ],
    },
    howItWorks: {
      id: [
        'Mulai dari Expo Go (`npx expo start`); buat custom build hanya bila perlu (local Expo modules, Apple targets, native module pihak ketiga, config native khusus).',
        'Ikuti desain tiap platform; jangan memakai seragam satu platform di platform lain (tanpa FAB/ripple di iOS, tanpa chrome iOS buatan di Android).',
        'Sebelum menyatakan layar selesai: jalankan tugas utamanya, satu kegagalan + pemulihan, akses keyboard, dan perilaku back/dismiss.',
      ],
      en: [
        'Start with Expo Go (`npx expo start`); create custom builds only when required (local Expo modules, Apple targets, third-party native modules, custom native config).',
        'Follow each platform\'s design language; never dress one platform in the other\'s uniform (no FAB/ripple in iOS layouts, no hand-built iOS chrome on Android).',
        'Before calling a screen complete: walk through its primary task, one failure and recovery, keyboard access, and back/dismiss behavior.',
      ],
    },
    coreRules: {
      id: [
        'Pakai `<ScrollView contentInsetAdjustmentBehavior="automatic" />` (juga di FlatList/SectionList) alih-alih `SafeAreaView`; hitung inset atas dan bawah.',
        '`expo-audio`/`expo-video` bukan `expo-av`; `expo-symbols` untuk SF Symbols; `process.env.EXPO_OS` bukan `Platform.OS`; `expo-image` bukan `img`; jangan pakai modul RN yang sudah dihapus (Picker, WebView, SafeAreaView, AsyncStorage).',
        'Warna lewat `Color` dari `expo-router` (dibungkus `Platform.select` dengan fallback hex untuk web) dan dipusatkan di `theme/colors.ts`.',
        'Setiap kontrol aktif harus menjalankan aksi yang diiklankan; handler kosong dan alert sukses palsu bukan implementasi.',
      ],
      en: [
        'Use `<ScrollView contentInsetAdjustmentBehavior="automatic" />` (also on FlatList/SectionList) instead of `SafeAreaView`; account for top and bottom insets.',
        '`expo-audio`/`expo-video` not `expo-av`; `expo-symbols` for SF Symbols; `process.env.EXPO_OS` not `Platform.OS`; `expo-image` not `img`; never use modules removed from React Native (Picker, WebView, SafeAreaView, AsyncStorage).',
        'Colors via `Color` from `expo-router` (wrapped in `Platform.select` with a hex fallback for web), centralized in `theme/colors.ts`.',
        'Every enabled control must perform its advertised action; empty handlers and success alerts are not implementations.',
      ],
    },
    tips: {
      id: [
        'Gunakan `borderCurve: \'continuous\'` untuk sudut membulat (kecuali kapsul), `<Text selectable />` untuk data yang bisa disalin, dan `keyboardShouldPersistTaps="handled"` pada form.',
        'Referensi: controls, gradients, icons, media, storage, visual-effects, webgpu-three.',
      ],
      en: [
        'Use `borderCurve: \'continuous\'` for rounded corners (except capsules), `<Text selectable />` for copyable data, and `keyboardShouldPersistTaps="handled"` on forms.',
        'References: controls, gradients, icons, media, storage, visual-effects, webgpu-three.',
      ],
    },
    pairsWellWith: ['expo-ui', 'expo-router', 'expo-animation'],
    spotlight: {
      title: {
        id: 'Periksa `expo-ui` Sebelum Memilih Komponen',
        en: 'Check `expo-ui` Before Picking a Component',
      },
      body: {
        id: 'Skill ini membuka dengan aturan: sebelum memilih komponen UI apa pun, cek apakah `@expo/ui` punya padanan native (BottomSheet, Picker, Slider, Menu, Switch, dll.). Untuk daftar panjang tetap pakai FlatList/FlashList karena `List` milik `@expo/ui` tidak ter-virtualisasi.',
        en: 'The skill opens with a rule: before picking any UI component, check whether `@expo/ui` has a native equivalent (BottomSheet, Picker, Slider, Menu, Switch, etc.). For long lists still use FlatList/FlashList, because `@expo/ui`\'s `List` is not virtualized.',
      },
    },
    sourcePath: 'plugins/expo/skills/expo-native-ui/SKILL.md',
  },
  {
    name: 'expo-design-system',
    category: 'framework',
    invocation: 'model',
    description: {
      id: 'Design system di dalam app Expo: tema design token (warna, spacing, tipografi, radius, shadow, motion), konvensi komponen (variant/size/state), dan audit drift.',
      en: 'An in-app design system for Expo: a design-token theme (color, spacing, typography, radius, shadow, motion), component conventions (variant/size/state), and drift audits.',
    },
    detailedDescription: {
      id: 'Membuat setiap layar menarik dari satu sumber visual: tema token (`theme.ts` atau `src/theme/`), komponen reusable dengan kontrak variant/size/state, aturan kapan sebuah view diekstrak, pass self-critique (hierarchy, proximity, repetition, alignment), 20 "native slop" tell yang bernama, dan audit drift untuk app yang sudah ada. Bila app sudah punya sistem (NativeWind, Tamagui, Restyle, Unistyles), sistem itu tetap sumber kebenaran.',
      en: 'Makes every screen draw from one visual source: a token theme (`theme.ts` or `src/theme/`), reusable components with a variant/size/state contract, rules for when to extract a view, a self-critique pass (hierarchy, proximity, repetition, alignment), 20 named "native slop" tells, and a drift audit for existing apps. If the app already has a system (NativeWind, Tamagui, Restyle, Unistyles), that system stays the source of truth.',
    },
    useWhen: {
      id: [
        'Membuat/menata file tema & token, atau menyeragamkan gaya layar (termasuk layar buatan AI) agar konsisten.',
        'App terlihat "AI-generated" atau generik, bukan native — pakai tell bernama + audit; atau mengaudit drift (hex, spacing, font yang di-hardcode).',
      ],
      en: [
        'Creating or organizing theme files and tokens, or standardizing styles so screens (including AI-generated ones) look consistent.',
        'An app that looks AI-generated or generic instead of native — use the named tells + audit; or auditing drift (hardcoded colors, spacing, fonts).',
      ],
    },
    avoidWhen: {
      id: [
        'Aturan styling spesifik platform (warna semantik, HIG, kontrol native) — itu `expo-native-ui`; tata letak folder app baru — `expo-project-structure`.',
        'Membungkus komponen platform yang sudah membawa bahasa desain (`Switch`, `DateTimePicker`, header stack, view `@expo/ui`) hanya demi melewati sistem.',
      ],
      en: [
        'Platform styling specifics (semantic colors, HIG, native controls) — that is `expo-native-ui`; folder layout of a new app — `expo-project-structure`.',
        'Wrapping platform components that already carry the design language (`Switch`, `DateTimePicker`, stack headers, `@expo/ui` views) just to route them through the system.',
      ],
    },
    howItWorks: {
      id: [
        'Adopt before you build: cari sistem yang sudah ada (library styling di package.json, file token). Jika ada, perluas dengan idiomnya; jangan buat sistem kedua di sebelahnya.',
        'Bila hanya ada nilai de facto, turunkan token dari nilai yang paling sering, di-snap ke grid 4 poin.',
        'Ekstrak view ke `src/components/` hanya bila muncul di dua layar atau lebih, punya peran bernama, dan API-nya lebih kecil dari implementasinya.',
      ],
      en: [
        'Adopt before you build: look for a declared system (styling library in package.json, a token file). If one exists, extend it in its own idiom; never introduce a second system beside it.',
        'If only de facto values exist, derive tokens from the most frequent ones, snapped to the 4-point grid.',
        'Promote a view into `src/components/` only when it appears in two or more screens, has a nameable role, and its API is smaller than its implementation.',
      ],
    },
    coreRules: {
      id: [
        'Setiap nilai visual yang berulang adalah token; komponen mengimpor token, layar mengimpor komponen.',
        'Jangan hardcode hex, ukuran font, atau kelipatan spacing di luar folder tema; nilai lokal sekali-pakai boleh inline dengan komentar alasannya.',
        'Satu titik masuk tema saja (`theme.ts` atau `src/theme/index.ts`), tidak pernah dua file token yang bersaing.',
      ],
      en: [
        'Every repeated visual value is a token; components import tokens, screens import components.',
        'Never hardcode hex colors, font sizes or spacing multiples outside the theme; genuinely local one-offs may stay inline with a comment saying why.',
        'Exactly one theme entry point (`theme.ts` or `src/theme/index.ts`) — never two competing token files.',
      ],
    },
    tips: {
      id: [
        'Perlakukan tell visual sebagai prompt review, bukan larangan mutlak terhadap card, font, atau branding; hormati brief dan sistem yang ada.',
        '`references/audit.md` berisi grep check, rubrik skor, dan urutan adopsi bertahap; `references/native-slop.md` memuat 20 tell lengkap.',
      ],
      en: [
        'Treat visual tells as review prompts, not blanket bans on cards, fonts or branding; respect the brief and the existing system.',
        '`references/audit.md` has grep checks, a scoring rubric and an incremental adoption plan; `references/native-slop.md` lists all 20 tells.',
      ],
    },
    pairsWellWith: ['expo-native-ui', 'expo-project-structure', 'expo-ui'],
    spotlight: {
      title: {
        id: 'Native Slop: Kegagalan yang Diberi Nama',
        en: 'Native Slop: Failures With Names',
      },
      body: {
        id: 'Skill ini menamai tanda-tanda app buatan AI agar mudah dikenali saat review: The Web Modal, Everything\'s a Card, Emoji Iconography, The Purple-Gradient Hero, The Spinner Blink, dan seterusnya (20 totalnya), sebagian dengan grep check.',
        en: 'The skill names the tells of AI-generated apps so they are easy to spot in review: The Web Modal, Everything\'s a Card, Emoji Iconography, The Purple-Gradient Hero, The Spinner Blink, and so on (20 in total), some with grep checks.',
      },
    },
    sourcePath: 'plugins/expo/skills/expo-design-system/SKILL.md',
  },
  {
    name: 'expo-ui',
    category: 'framework',
    invocation: 'model',
    description: {
      id: 'UI native lewat paket `@expo/ui`: SwiftUI asli di iOS dan Jetpack Compose di Android — BottomSheet, Picker, Slider, Switch, Menu, FieldGroup, List/ListItem. Lapisan universal dulu, platform-spesifik bila perlu.',
      en: 'Native UI with the `@expo/ui` package: real SwiftUI on iOS and Jetpack Compose on Android — BottomSheet, Picker, Slider, Switch, Menu, FieldGroup, List/ListItem. Universal layer first, platform-specific when needed.',
    },
    detailedDescription: {
      id: 'Default untuk sheet, picker, slider, toggle, menu, dan section form. Urutan pilihan: (1) komponen universal dari root `@expo/ui` (SDK 56+, jalan di Expo Go), (2) `@expo/ui/swift-ui` atau `@expo/ui/jetpack-compose` bila universal tidak punya, (3) drop-in replacement (`@gorhom/bottom-sheet`, `datetimepicker`, ...) dari `@expo/ui/community/<nama>` untuk migrasi. Setiap tree harus dibungkus `Host`.',
      en: 'The default for sheets, pickers, sliders, toggles, menus and form sections. Choice order: (1) universal components from the `@expo/ui` root (SDK 56+, works in Expo Go), (2) `@expo/ui/swift-ui` or `@expo/ui/jetpack-compose` when universal lacks something, (3) drop-in replacements (`@gorhom/bottom-sheet`, `datetimepicker`, ...) from `@expo/ui/community/<name>` for migrations. Every tree must be wrapped in `Host`.',
    },
    useWhen: {
      id: [
        'Butuh bottom sheet, picker, slider, switch, menu, atau section form — gunakan `@expo/ui`, bukan Reanimated/`@gorhom/bottom-sheet`/Picker RN.',
        'Mengganti library UI komunitas dengan drop-in replacement dari `@expo/ui/community/*`.',
      ],
      en: [
        'Needing a bottom sheet, picker, slider, switch, menu or form section — use `@expo/ui`, not Reanimated, `@gorhom/bottom-sheet` or the RN Picker.',
        'Replacing a community UI library with a drop-in replacement from `@expo/ui/community/*`.',
      ],
    },
    avoidWhen: {
      id: [
        'Daftar panjang atau panjangnya tak diketahui (feed, hasil pencarian, katalog): `List` milik `@expo/ui` bukan list ter-virtualisasi; pakai `FlatList`/`FlashList`.',
        'Mengimpor `@expo/ui/swift-ui` di Android (atau jetpack-compose di iOS): crash saat runtime ("Unable to get view config").',
      ],
      en: [
        'Large or unknown-length lists (feeds, search results, catalogs): `@expo/ui`\'s `List` is not virtualized; use `FlatList`/`FlashList`.',
        'Importing `@expo/ui/swift-ui` on Android (or jetpack-compose on iOS): it crashes at runtime ("Unable to get view config").',
      ],
    },
    howItWorks: {
      id: [
        'Pasang `npx expo install @expo/ui`, bungkus setiap tree `@expo/ui` dengan `Host`.',
        'Mulai dari komponen universal (satu tree untuk iOS, Android, web); turun ke lapisan platform hanya bila ada komponen/modifier yang hilang.',
        'Pisahkan tree platform ke `.ios.tsx`/`.android.tsx` di `components/` (bukan di `app/`), atau jaga dengan `Platform.OS`.',
      ],
      en: [
        'Install with `npx expo install @expo/ui` and wrap every `@expo/ui` tree in `Host`.',
        'Start with universal components (one tree for iOS, Android and web); drop to a platform layer only when a component or modifier is missing.',
        'Isolate platform trees in `.ios.tsx`/`.android.tsx` under `components/` (never inside `app/`), or guard with `Platform.OS`.',
      ],
    },
    coreRules: {
      id: [
        '`BottomSheet` memakai `isPresented`/`onDismiss` (bukan `isOpened`/`onChange` milik `@gorhom/bottom-sheet`, yang diam-diam tidak bekerja); `snapPoints` opsional.',
        'Lapisan universal butuh SDK 56+; drop-in replacement dan lapisan platform juga ada di SDK 55.',
        'Fallback ke built-in RN hanya bila `@expo/ui` tidak punya komponennya.',
      ],
      en: [
        '`BottomSheet` uses `isPresented`/`onDismiss` (not `@gorhom/bottom-sheet`\'s `isOpened`/`onChange`, which silently do nothing); `snapPoints` is optional.',
        'The universal layer needs SDK 56+; drop-in replacements and the platform layers also exist on SDK 55.',
        'Fall back to RN built-ins only when `@expo/ui` is missing the component.',
      ],
    },
    tips: {
      id: [
        'Gunakan `List` + `ListItem` untuk grup baris pendek berbentuk Settings iOS, dan `FieldGroup` untuk section form berlabel.',
        'Skill menyertakan skrip `list-components.js` untuk melihat daftar komponen; detail per lapisan ada di `references/` (universal, drop-in-replacements, swift-ui, jetpack-compose).',
      ],
      en: [
        'Use `List` + `ListItem` for short Settings-style row groups and `FieldGroup` for labelled form sections.',
        'The skill ships a `list-components.js` script to list components; per-layer details are in `references/` (universal, drop-in-replacements, swift-ui, jetpack-compose).',
      ],
    },
    pairsWellWith: ['expo-native-ui', 'expo-animation', 'expo-router'],
    spotlight: {
      title: {
        id: '`List` Bukan Daftar Ter-virtualisasi',
        en: '`List` Is Not a Virtualized List',
      },
      body: {
        id: 'Jebakan terbesar skill ini: `List` me-render baris tabel grouped native (seperti layar Settings iOS), tiap `ListItem` adalah node native di JS thread dan tidak di-recycle. Untuk data besar, tetap `FlatList`/`FlashList`.',
        en: 'This skill\'s biggest trap: `List` renders native grouped table rows (like an iOS Settings screen); each `ListItem` is a native node on the JS thread and rows are not recycled. For large data, still use `FlatList`/`FlashList`.',
      },
    },
    sourcePath: 'plugins/expo/skills/expo-ui/SKILL.md',
  },
  {
    name: 'expo-data-fetching',
    category: 'framework',
    invocation: 'model',
    description: {
      id: 'Semua pekerjaan jaringan di Expo: fetch API, React Query, SWR, error handling, caching, offline, empat state layar (loading/empty/error/content), dan Expo Router data loaders (`useLoaderData`).',
      en: 'All networking in Expo: fetch API, React Query, SWR, error handling, caching, offline support, the four screen states (loading/empty/error/content), and Expo Router data loaders (`useLoaderData`).',
    },
    detailedDescription: {
      id: 'Skill yang "WAJIB" dipakai untuk setiap pekerjaan network: request API, caching, debugging jaringan, auth/token, URL API dan env var. Preferensi: hindari axios, utamakan `expo/fetch`. Mencakup React Query dan SWR, token di `expo-secure-store`, `EXPO_PUBLIC_` untuk env sisi klien, pembatalan request, serta loader tingkat rute (web, SDK 55+).',
      en: 'The skill you "MUST" use for any networking work: API requests, caching, network debugging, auth/token handling, API URLs and env vars. Preference: avoid axios, prefer `expo/fetch`. Covers React Query and SWR, tokens in `expo-secure-store`, `EXPO_PUBLIC_` for client-side env vars, request cancellation, and route-level loaders (web, SDK 55+).',
    },
    useWhen: {
      id: [
        'Mengimplementasikan atau men-debug request API, strategi caching, skenario offline, auth/token, dan konfigurasi URL/env.',
        'Membuat layar yang memuat data: desain empat state dan menjaga draft saat penyimpanan gagal.',
      ],
      en: [
        'Implementing or debugging API requests, caching strategies, offline scenarios, token handling, and URL/env configuration.',
        'Building screens that load data: designing the four states and preserving drafts when a save fails.',
      ],
    },
    avoidWhen: {
      id: [
        'Mengambil data lewat axios sebagai default — preferensi skill adalah `expo/fetch`.',
        'Menyimpan token di AsyncStorage: gunakan `expo-secure-store`.',
      ],
      en: [
        'Defaulting to axios — the skill prefers `expo/fetch`.',
        'Storing tokens in AsyncStorage: use `expo-secure-store`.',
      ],
    },
    howItWorks: {
      id: [
        'Pohon keputusan: loader rute (web, SDK 55+) → fetch dasar → React Query/SWR untuk caching → auth → penanganan error → offline → env/konfigurasi → performa.',
        'Periksa `response.ok` dan lempar error bertipe; ulangi dengan exponential backoff untuk error jaringan.',
        'Offline: NetInfo untuk status jaringan dan React Query persistence; pembatalan lewat AbortController (lihat `references/offline-and-cancellation.md`).',
      ],
      en: [
        'Decision tree: route loaders (web, SDK 55+) → basic fetch → React Query/SWR for caching → auth → error handling → offline → env/config → performance.',
        'Check `response.ok` and throw typed errors; retry with exponential backoff for network errors.',
        'Offline: NetInfo for network status and React Query persistence; cancellation via AbortController (see `references/offline-and-cancellation.md`).',
      ],
    },
    coreRules: {
      id: [
        'Setiap layar yang memuat data punya empat state — loading, error, empty, content — yang boleh tumpang tindih (refresh error tetap menampilkan konten cache).',
        'Loading bukan empty: empty berarti selesai dengan nol item. Gunakan `isLoading` untuk fetch pertama, `isFetching` untuk aktivitas latar, dan `ListEmptyComponent` yang menjelaskan serta menawarkan aksi.',
        'Gerbang hidrasi: root layout tidak me-render apa pun (atau splash) sampai state tersimpan (token, flag onboarding) termuat.',
        'Penyimpanan menjaga pekerjaan: nonaktifkan submit ulang saat pending; saat gagal, simpan draft dan tampilkan error inline.',
      ],
      en: [
        'Every screen that loads data has four states — loading, error, empty, content — which may overlap (a refresh error coexists with cached content).',
        'Loading ≠ empty: empty means resolved with zero items. Use `isLoading` for the first fetch, `isFetching` for background activity, and a `ListEmptyComponent` that explains and offers an action.',
        'Gate on hydration: the root layout renders nothing (or the splash) until persisted state (token, onboarding flag) has loaded.',
        'Saves preserve work: disable repeat submission while pending; on failure, keep the draft and show an inline error.',
      ],
    },
    tips: {
      id: [
        'Env klien memakai prefix `EXPO_PUBLIC_`; rahasia server (tanpa prefix) hanya untuk API routes.',
        'Deduplikasi dan cache lewat React Query dengan `staleTime`; token disimpan dengan `SecureStore.setItemAsync`.',
      ],
      en: [
        'Client-side env vars use the `EXPO_PUBLIC_` prefix; server secrets (no prefix) are for API routes only.',
        'Dedupe and cache through React Query with `staleTime`; store tokens with `SecureStore.setItemAsync`.',
      ],
    },
    pairsWellWith: ['expo-router', 'eas-hosting', 'expo-native-ui'],
    spotlight: {
      title: {
        id: 'Empat State, Bukan Spinner Saja',
        en: 'Four States, Not Just a Spinner',
      },
      body: {
        id: 'Skill ini menuntut desain loading, error, empty, dan content untuk tiap layar berdata, dan menegaskan bahwa "No items yet" tidak boleh berkedip saat fetch pertama masih berjalan. Ia juga mencakup Expo Router loaders (`useLoaderData`) untuk pemuatan data tingkat rute di web.',
        en: 'The skill demands loading, error, empty and content designs for every data screen, and insists that "No items yet" must not flash while the first fetch is still running. It also covers Expo Router loaders (`useLoaderData`) for route-level data loading on web.',
      },
    },
    sourcePath: 'plugins/expo/skills/expo-data-fetching/SKILL.md',
  },
  {
    name: 'expo-dom',
    category: 'framework',
    invocation: 'model',
    description: {
      id: 'Expo DOM components: jalankan kode web di webview pada native dan apa adanya di web, untuk memakai library web-only atau memigrasikan kode web secara bertahap.',
      en: 'Expo DOM components: run web code in a webview on native and as-is on web, to use web-only libraries or migrate web code incrementally.',
    },
    detailedDescription: {
      id: 'DOM component adalah file dengan direktif `\'use dom\'` yang dirender di WKWebView (iOS) atau WebView (Android) dan tanpa pembungkus di web. Cocok untuk library web-only (recharts, chart.js, syntax highlighter, rich text editor), layout HTML/CSS kompleks, iframe, atau Canvas/WebGL. Untuk migrasi seluruh app web, gunakan `expo-web-to-native`.',
      en: 'A DOM component is a file with the `\'use dom\'` directive, rendered in WKWebView (iOS) or WebView (Android) and as-is on web. Good for web-only libraries (recharts, chart.js, syntax highlighters, rich text editors), complex HTML/CSS layouts, iframes, or Canvas/WebGL. For migrating a whole web app, use `expo-web-to-native`.',
    },
    useWhen: {
      id: [
        'Memakai library React web-only di app Expo tanpa menulis ulang.',
        'Membawa komponen web ke native secara bertahap, atau menanam konten yang butuh konteks browser (iframe, canvas, WebGL).',
      ],
      en: [
        'Using a web-only React library in an Expo app without rewriting it.',
        'Bringing web components to native incrementally, or embedding content that needs a browser context (iframes, canvas, WebGL).',
      ],
    },
    avoidWhen: {
      id: [
        'Kinerja native kritis atau UI sederhana — webview menambah overhead; pakai komponen React Native.',
        'File `_layout` (tidak boleh jadi DOM component) atau integrasi native yang dalam (gunakan local modules).',
      ],
      en: [
        'Native performance is critical or the UI is simple — webviews add overhead; use React Native components.',
        '`_layout` files (they cannot be DOM components) or deep native integration (use local modules).',
      ],
    },
    howItWorks: {
      id: [
        'Buat file sendiri dengan `\'use dom\'` di baris atas dan satu default export; props harus serializable (string, number, boolean, array, objek polos).',
        'Atur webview lewat prop `dom` (tipe `import("expo/dom").DOMProps`); pada web prop ini diabaikan.',
        'Ekspos fungsi native ke webview dengan meneruskan fungsi async sebagai props.',
      ],
      en: [
        'Create its own file with `\'use dom\'` at the top and a single default export; props must be serializable (strings, numbers, booleans, arrays, plain objects).',
        'Configure the webview through the `dom` prop (type `import("expo/dom").DOMProps`); on web it is ignored.',
        'Expose native functionality to the webview by passing async functions as props.',
      ],
    },
    coreRules: {
      id: [
        'Sertakan CSS di dalam file komponen — DOM component berjalan di konteks terisolasi dan tidak berbagi state/JS context dengan native.',
        'Satu komponen per file; tidak boleh didefinisikan inline atau digabung dengan komponen native.',
      ],
      en: [
        'Include CSS in the component file — DOM components run in an isolated context and cannot share state or the JS context with native.',
        'One component per file; it cannot be defined inline or combined with native components.',
      ],
    },
    tips: {
      id: [
        'Jaga DOM component tetap fokus — jangan taruh seluruh layar di webview; pakai native untuk chrome navigasi dan DOM untuk konten khusus.',
        'Hot reload berfungsi saat pengembangan; uji di semua platform karena render web bisa sedikit berbeda dari webview native.',
      ],
      en: [
        'Keep DOM components focused — do not put entire screens in webviews; use native for navigation chrome and DOM for specialized content.',
        'Hot reload works during development; test on all platforms since web rendering may differ slightly from native webviews.',
      ],
    },
    pairsWellWith: ['expo-web-to-native', 'expo-router', 'expo-module'],
    spotlight: {
      title: {
        id: 'Library Web di App Native',
        en: 'Web Libraries in a Native App',
      },
      body: {
        id: 'Dengan `\'use dom\'`, library seperti recharts dapat dipakai langsung di Expo tanpa modifikasi: native merender via webview, web merender apa adanya. Jebakannya: setiap layar DOM membawa runtime web, jadi pakai seperlunya.',
        en: 'With `\'use dom\'`, libraries such as recharts work in Expo unmodified: native renders through a webview, web renders as-is. The catch: every DOM screen carries a web runtime, so use it sparingly.',
      },
    },
    sourcePath: 'plugins/expo/skills/expo-dom/SKILL.md',
  },
  {
    name: 'expo-web-to-native',
    category: 'framework',
    invocation: 'model',
    description: {
      id: 'Panduan migrasi end-to-end app web React (Next.js/Vite/CRA) ke app iOS/Android dengan Expo, layar demi layar: shell DOM component dulu, lalu "strangle" ke native.',
      en: 'End-to-end guide for migrating a web React app (Next.js/Vite/CRA) to a native iOS/Android app with Expo, screen by screen: a DOM-component shell first, then strangle screens into native.',
    },
    detailedDescription: {
      id: 'Web app tidak "dikonversi" ke native — ia dimigrasikan. Urutan: (1) assess & tulis worklist `migration-progress.md`, (2) scaffold shell Expo, (3) shell DOM component (`expo-dom`) yang bisa dikirim di hari pertama, (4) strangle layar ke native berdasarkan nilai, (5) kabelkan data/auth/storage, (6) ship via `eas-app-stores`. Setiap langkah menyerahkan ke skill Expo yang sudah ada.',
      en: 'A web app does not convert to native — it migrates. Order: (1) assess and write a `migration-progress.md` worklist, (2) scaffold the Expo shell, (3) a DOM-component shell (`expo-dom`) shippable on day one, (4) strangle screens into native by value, (5) wire data/auth/storage, (6) ship via `eas-app-stores`. Each step hands off to an existing Expo skill.',
    },
    useWhen: {
      id: [
        'Mengubah website menjadi app mobile, atau memporting codebase React Next.js/Vite/CRA ke React Native.',
        'Menanyakan padanan idiom web (DOM, CSS, React Router, localStorage, window) di native.',
      ],
      en: [
        'Turning a website into a mobile app, or porting a Next.js/Vite/CRA React codebase to React Native.',
        'Asking how web idioms (the DOM, CSS, React Router, localStorage, window) map to native.',
      ],
    },
    avoidWhen: {
      id: [
        'Tidak ada repo web untuk dimigrasi (membangun native dari nol) — pakai `expo-router`; `references/false-friends.md` tetap berguna sebagai peta idiom.',
        'Hanya butuh satu library web di app native — cukup `expo-dom`.',
      ],
      en: [
        'No web repo to migrate (building native fresh) — use `expo-router`; `references/false-friends.md` is still a useful idiom map.',
        'Needing just one web library in a native app — `expo-dom` alone is enough.',
      ],
    },
    howItWorks: {
      id: [
        'Bucket tiap layar: port-as-is (presentasional, masuk webview DOM), nativize-now, nativize-later, atau hybrid.',
        'Shell dulu: bawa tiap layar sebagai DOM component sehingga seluruh app berjalan di ponsel sebelum apa pun di-nativize — ini milestone yang bisa ke TestFlight.',
        'Strangle berdasarkan nilai: redesain, bukan reskin; mulai dari `@expo/ui`, navigasi platform (`expo-router`), dan UX mobile.',
      ],
      en: [
        'Bucket each screen: port-as-is (presentational, ships in a DOM webview), nativize-now, nativize-later, or hybrid.',
        'Shell first: bring every screen over as a DOM component so the whole app runs on a phone before anything is nativized — a milestone shippable to TestFlight.',
        'Strangle by value: redesign, not reskin; reach for `@expo/ui` first, platform navigation (`expo-router`), and mobile UX.',
      ],
    },
    coreRules: {
      id: [
        'Migrasi, jangan tulis ulang; setiap langkah menjaga app tetap bisa dikirim.',
        'Verifikasi dengan menjalankan, bukan mengompilasi: bandingkan konten dan perilaku (bukan piksel) antara web asli dan app native yang berjalan.',
        'Pembayaran adalah fork, bukan swap: barang digital in-app harus memakai IAP store.',
      ],
      en: [
        'Migrate, don\'t rewrite; every step keeps the app shippable.',
        'Verify by running, not compiling: compare content and behavior (not pixels) between the running web original and the native app.',
        'Payments are a fork, not a swap: in-app digital goods must use store IAP.',
      ],
    },
    tips: {
      id: [
        'Skill menyarankan menjalankannya sebagai loop `/goal` memakai `references/run-as-goal.md`, yang membaca ulang skill di tiap iterasi.',
        'Verifikasi memakai tooling yang opinionated: `agent-browser` untuk web dan `argent` untuk simulator.',
      ],
      en: [
        'The skill recommends running it as a `/goal` loop using `references/run-as-goal.md`, which re-reads the skill every iteration.',
        'Verification uses opinionated tooling: `agent-browser` for the web app and `argent` for the simulator.',
      ],
    },
    pairsWellWith: ['expo-dom', 'expo-router', 'eas-app-stores'],
    spotlight: {
      title: {
        id: 'Strangler Fig, Bukan Big-Bang',
        en: 'Strangler Fig, Not Big-Bang',
      },
      body: {
        id: 'Seperti pohon strangler fig yang perlahan menggantikan inangnya: web UI berjalan penuh dalam shell native di hari pertama, lalu layar bernilai tinggi dinative-kan satu per satu. Sisanya boleh tetap di webview.',
        en: 'Like a strangler fig slowly replacing its host: the web UI runs whole inside a native shell on day one, then high-value screens are nativized one at a time. The rest may stay in the webview.',
      },
    },
    sourcePath: 'plugins/expo/skills/expo-web-to-native/SKILL.md',
  },
  {
    name: 'expo-module',
    category: 'framework',
    invocation: 'model',
    description: {
      id: 'Membuat modul dan view native Expo dengan Expo Modules API (Swift, Kotlin, TypeScript): DSL definisi modul, shared object, config plugin, lifecycle hook, autolinking.',
      en: 'Creating Expo native modules and views with the Expo Modules API (Swift, Kotlin, TypeScript): the module definition DSL, shared objects, config plugins, lifecycle hooks, autolinking.',
    },
    detailedDescription: {
      id: 'Referensi lengkap membangun modul native: scaffold dengan `create-expo-module` (local vs standalone, `--platform`, `--features`, `add-platform-support`), DSL (`Name`, `Function`, `AsyncFunction`, `Property`, `Constant`, Events), native view, lifecycle, config plugin (Info.plist/AndroidManifest), dan `expo-module.config.json`.',
      en: 'A complete reference for building native modules: scaffold with `create-expo-module` (local vs standalone, `--platform`, `--features`, `add-platform-support`), the DSL (`Name`, `Function`, `AsyncFunction`, `Property`, `Constant`, Events), native views, lifecycle, config plugins (Info.plist/AndroidManifest), and `expo-module.config.json`.',
    },
    useWhen: {
      id: [
        'Membuat modul atau view native Expo baru, atau membungkus SDK platform untuk React Native.',
        'Mengedit `expo-module.config.json`, config plugin, lifecycle hook, atau menambah dukungan Android/Apple/web ke modul yang ada.',
      ],
      en: [
        'Creating a new Expo native module or view, or wrapping a platform SDK for React Native.',
        'Editing `expo-module.config.json`, config plugins, lifecycle hooks, or adding Android/Apple/web support to an existing module.',
      ],
    },
    avoidWhen: {
      id: [
        'Memigrasi modul Swift dari DSL definisi ke makro 2.0 — itu `expo-migrate-module` (plugin `expo-experiments`).',
        'Hanya butuh library web atau UI native siap pakai — pertimbangkan `expo-dom` atau `expo-ui`.',
      ],
      en: [
        'Migrating a Swift module from the definition DSL to 2.0 macros — that is `expo-migrate-module` (the `expo-experiments` plugin).',
        'Only needing a web library or ready-made native UI — consider `expo-dom` or `expo-ui`.',
      ],
    },
    howItWorks: {
      id: [
        'Pilih tipe scaffold: modul lokal (satu app) atau standalone (reuse, monorepo, publikasi).',
        'Tentukan fitur (`Constant`, `Function`, `AsyncFunction`, `Event`, `View`, `ViewEvent`, `SharedObject`) dan scaffold dengan slug/path eksplisit serta `--platform` yang disengaja.',
        'Ganti kode contoh hasil scaffold dengan implementasi nyata; tambah platform belakangan dengan `add-platform-support`.',
      ],
      en: [
        'Choose the scaffold type: local module (one app) or standalone (reuse, monorepos, publishing).',
        'Pick features (`Constant`, `Function`, `AsyncFunction`, `Event`, `View`, `ViewEvent`, `SharedObject`) and scaffold with an explicit slug/path and a deliberate `--platform`.',
        'Replace the generated example code with the real implementation; add platforms later with `add-platform-support`.',
      ],
    },
    coreRules: {
      id: [
        'Utamakan `create-expo-module` daripada membuat file/direktori modul native manual.',
        'Modul lokal berada di `modules/` (atau `expo.autolinking.nativeModulesDir` bila diatur) dan tidak membuat barrel `index.ts` kecuali `--barrel`.',
        'Dalam scaffolding non-interaktif, berikan slug/path posisional secara eksplisit; `--name` hanya mengubah nama kelas native, bukan nama folder.',
      ],
      en: [
        'Prefer `create-expo-module` over manually creating native module files and directories.',
        'Local modules live in `modules/` (or `expo.autolinking.nativeModulesDir` when configured) and get no `index.ts` barrel unless `--barrel`.',
        'In non-interactive scaffolding pass the positional slug/path explicitly; `--name` changes the native class name, not the folder name.',
      ],
    },
    tips: {
      id: [
        'DSL Swift dan Kotlin berbagi struktur yang sama; Swift biasanya contoh utama di referensi.',
        'Referensi: create-expo-module, native-module, native-view, lifecycle, config-plugin, module-config.',
      ],
      en: [
        'The Swift and Kotlin DSLs share the same structure; Swift is usually the primary example in the references.',
        'References: create-expo-module, native-module, native-view, lifecycle, config-plugin, module-config.',
      ],
    },
    pairsWellWith: ['expo-migrate-module', 'expo-dev-client', 'expo-dom'],
    spotlight: {
      title: {
        id: 'Scaffold Dulu, Tulis Kemudian',
        en: 'Scaffold First, Then Write',
      },
      body: {
        id: 'Skill ini menyarankan membuat scaffold dengan `create-expo-module` terlebih dahulu (layout, `expo-module.config.json`, podspec/Gradle, binding TypeScript) lalu membangun di atasnya, dan memakai `add-platform-support` alih-alih menyalin direktori native secara manual.',
        en: 'The skill recommends scaffolding with `create-expo-module` first (layout, `expo-module.config.json`, podspec/Gradle, TypeScript bindings) and building on top, and using `add-platform-support` instead of manually copying native directories.',
      },
    },
    sourcePath: 'plugins/expo/skills/expo-module/SKILL.md',
  },
  {
    name: 'expo-brownfield',
    category: 'framework',
    invocation: 'model',
    description: {
      id: 'Menanamkan Expo dan React Native ke app native iOS/Android yang sudah ada: layar RN di SwiftUI/UIKit atau Kotlin, pengemasan AAR/XCFramework, pendekatan isolated vs integrated.',
      en: 'Integrating Expo and React Native into an existing native iOS or Android app: an RN screen in SwiftUI/UIKit or Kotlin, AAR/XCFramework packaging, isolated vs integrated approaches.',
    },
    detailedDescription: {
      id: 'Brownfield = app native yang mengadopsi React Native secara bertahap. Dua pendekatan: Isolated (artefak AAR/XCFramework prebuilt; tim native tidak perlu Node/RN tooling) dan Integrated (source RN ditambahkan ke build Gradle/CocoaPods yang ada; satu tim memiliki semuanya). Hanya butuh EAS Build/Submit untuk app Swift? Itu `eas-app-stores`, bukan skill ini.',
      en: 'Brownfield = a native app that adopts React Native incrementally. Two approaches: Isolated (prebuilt AAR/XCFramework artifacts; the native team needs no Node/RN tooling) and Integrated (RN sources added to the existing Gradle/CocoaPods build; one team owns everything). Just needing EAS Build/Submit for a Swift app? That is `eas-app-stores`, not this skill.',
    },
    useWhen: {
      id: [
        'Menyematkan layar React Native di app SwiftUI/UIKit atau Kotlin yang sudah ada.',
        'Mengemas RN sebagai AAR/XCFramework untuk dikonsumsi tim native.',
      ],
      en: [
        'Embedding a React Native screen in an existing SwiftUI/UIKit or Kotlin app.',
        'Packaging RN as an AAR/XCFramework for the native team to consume.',
      ],
    },
    avoidWhen: {
      id: [
        'Hanya membangun/mendistribusikan app native murni dengan EAS — gunakan `eas-app-stores`.',
        'Menjalankan prebuild di host native yang dikelola manual — jangan, termasuk saat troubleshooting.',
      ],
      en: [
        'Only building or distributing a purely native app with EAS — use `eas-app-stores`.',
        'Running prebuild in a manually maintained native host — don\'t, including during troubleshooting.',
      ],
    },
    howItWorks: {
      id: [
        'Periksa host dulu: entry point, pemilik navigasi, build system, deployment target, dan runtime RN yang sudah ter-link; catat versi Expo/RN dari lockfile.',
        'Pilih pendekatan: isolated bila tim native harus mengonsumsi RN sebagai dependency biasa atau repo/kadensi berbeda; integrated bila satu tim memiliki native dan RN.',
        'Verifikasi di host: buka layar RN dengan input, kembalikan hasil ke native, dismiss, buka ulang; lalu build Release dengan artefak Release dan Metro mati.',
      ],
      en: [
        'Inspect the host first: entry point, navigation owner, build system, deployment targets, any RN runtime already linked; record Expo/RN versions from the lockfile.',
        'Pick an approach: isolated if the native team must consume RN as a regular dependency or repos/cadences differ; integrated if one team owns native and RN.',
        'Verify in the host: open the RN screen with input, return a result, dismiss, reopen; then build Release with a Release artifact and Metro stopped.',
      ],
    },
    coreRules: {
      id: [
        'Pertahankan `App` SwiftUI / window UIKit dan layar native milik host.',
        'Untuk proyek Expo/RN yang ada, pertahankan SDK-nya dan pakai `npx expo install` untuk menyelaraskan dependency; jangan upgrade hanya demi skill ini.',
        'Render di Expo Go atau example app producer saja tidak memvalidasi integrasi.',
      ],
      en: [
        'Preserve the host\'s SwiftUI `App` / UIKit window and native screens.',
        'For an existing Expo/RN project, keep its SDK and align dependencies with `npx expo install`; do not upgrade just to follow this skill.',
        'Rendering only in Expo Go or the producer\'s example app does not validate the integration.',
      ],
    },
    tips: {
      id: [
        'Kedua pendekatan mendukung Metro dan Fast Refresh di Debug; pilih integrated karena kepemilikan build bersama, bukan karena isolated tidak bisa iterasi JS.',
        'Baca `references/version-compatibility.md` untuk template native, toolchain, dan default build per versi SDK sebelum setup.',
      ],
      en: [
        'Both approaches support Metro and Fast Refresh in Debug; choose integrated for shared build ownership, not because isolated lacks JS iteration.',
        'Read `references/version-compatibility.md` for native templates, toolchain and build defaults per SDK version before setup.',
      ],
    },
    pairsWellWith: ['eas-app-stores', 'expo-module', 'expo-router'],
    spotlight: {
      title: {
        id: 'Isolated vs Integrated',
        en: 'Isolated vs Integrated',
      },
      body: {
        id: 'Keputusan utama skill ini adalah artefak: Isolated mengirim AAR/XCFramework prebuilt ke tim native, Integrated menambah sumber RN langsung ke Gradle/CocoaPods. Matriks lengkapnya ada di `references/comparison.md`.',
        en: 'The main decision in this skill is about artifacts: Isolated ships a prebuilt AAR/XCFramework to the native team, Integrated adds RN sources straight into Gradle/CocoaPods. The full matrix is in `references/comparison.md`.',
      },
    },
    sourcePath: 'plugins/expo/skills/expo-brownfield/SKILL.md',
  },
  {
    name: 'expo-dev-client',
    category: 'framework',
    invocation: 'model',
    description: {
      id: 'Membangun dan mendistribusikan development client Expo secara lokal atau via TestFlight untuk testing internal. Build lokal gratis; EAS Build/TestFlight adalah langkah berbayar.',
      en: 'Build and distribute Expo development clients locally or via TestFlight for internal testing. Local builds are free; EAS Build/TestFlight is a paid step.',
    },
    detailedDescription: {
      id: 'Gunakan EAS Build untuk membuat development client yang menguji perubahan kode native di perangkat fisik (Expo Go kustom untuk cabang app). Development client adalah setup yang direkomendasikan untuk app nyata; Expo Go cocok untuk belajar dan eksperimen cepat. Untuk rilis produksi TestFlight dan submit ke store, gunakan `eas-app-stores`.',
      en: 'Use EAS Build to create development clients for testing native code changes on physical devices (custom Expo Go clients for app branches). Development clients are the recommended setup for any real app; Expo Go is for learning and quick experiments. For production TestFlight releases and store submission, use `eas-app-stores`.',
    },
    useWhen: {
      id: [
        'App memakai local Expo modules, Apple targets (widget, app clip), library native pihak ketiga di luar Expo Go, config plugin, atau menguji push notification remote dan App/Universal Links.',
        'Mendistribusikan build dev ke tester internal via TestFlight.',
      ],
      en: [
        'The app uses local Expo modules, Apple targets (widgets, app clips), third-party native modules outside Expo Go, config plugins, or tests remote push notifications and App/Universal Links.',
        'Distributing a dev build to internal testers via TestFlight.',
      ],
    },
    avoidWhen: {
      id: [
        'Rilis produksi atau submit ke store — gunakan `eas-app-stores`.',
        'App yang masih cukup dengan Expo Go (belajar, eksperimen dengan library yang dibundel).',
      ],
      en: [
        'Production releases or store submission — use `eas-app-stores`.',
        'Apps that are still fine in Expo Go (learning, experiments with bundled libraries).',
      ],
    },
    howItWorks: {
      id: [
        'Pastikan `eas.json` punya profil `development` dengan `developmentClient: true` (dan `autoIncrement`, `appVersionSource: "remote"`).',
        'Build di cloud (`eas build -p ios --profile development`, `--submit` untuk langsung ke TestFlight) atau lokal dengan `--local`.',
        'Instal (simulator: `xcrun simctl install booted`, perangkat iOS: `ideviceinstaller`, Android: `adb install`) lalu jalankan `npx expo start --dev-client`.',
      ],
      en: [
        'Ensure `eas.json` has a `development` profile with `developmentClient: true` (plus `autoIncrement`, `appVersionSource: "remote"`).',
        'Build in the cloud (`eas build -p ios --profile development`, `--submit` to go straight to TestFlight) or locally with `--local`.',
        'Install (simulator: `xcrun simctl install booted`, iOS device: `ideviceinstaller`, Android: `adb install`) then run `npx expo start --dev-client`.',
      ],
    },
    coreRules: {
      id: [
        'Development client hanya wajib untuk native code kustom, Apple targets, modul pihak ketiga di luar Expo Go, atau config plugin.',
        'Build lokal gratis; build cloud memakai menit build paket EAS dan butuh Apple Developer berbayar untuk distribusi perangkat/TestFlight.',
      ],
      en: [
        'A development client is required only for custom native code, Apple targets, third-party modules outside Expo Go, or config plugins.',
        'Local builds are free; cloud builds use your EAS plan\'s build minutes and need a paid Apple Developer account for device/TestFlight distribution.',
      ],
    },
    tips: {
      id: [
        'Error signing: jalankan `eas credentials`.',
        'Periksa status build dengan `eas build:list` dan `eas build:view`.',
      ],
      en: [
        'Signing errors: run `eas credentials`.',
        'Check build status with `eas build:list` and `eas build:view`.',
      ],
    },
    pairsWellWith: ['eas-app-stores', 'expo-module', 'expo-app-clip'],
    spotlight: {
      title: {
        id: 'Gratis Lokal, Berbayar di Cloud',
        en: 'Free Locally, Paid in the Cloud',
      },
      body: {
        id: 'Skill ini membedakan biayanya dengan jelas: `expo-dev-client` open source dan build lokal gratis; hanya EAS Build/TestFlight yang memakai menit build dan butuh akun Apple Developer berbayar.',
        en: 'The skill is explicit about cost: `expo-dev-client` is open source and local builds are free; only EAS Build/TestFlight uses build minutes and a paid Apple Developer account.',
      },
    },
    sourcePath: 'plugins/expo/skills/expo-dev-client/SKILL.md',
  },
  {
    name: 'expo-examples',
    category: 'framework',
    invocation: 'model',
    description: {
      id: 'Repo expo/examples: sekitar 70 integrasi `with-*` (Stripe, Clerk, Supabase, OpenAI, maps, Reanimated, SQLite, Skia, NativeWind, dll.) sebagai pola kanonis untuk diadaptasi atau scaffold proyek baru.',
      en: 'The expo/examples repo: about 70 `with-*` integrations (Stripe, Clerk, Supabase, OpenAI, maps, Reanimated, SQLite, Skia, NativeWind, and more) as canonical patterns to adapt or scaffold new projects from.',
    },
    detailedDescription: {
      id: 'Contoh-contoh ini bukan app penuh: proyek managed (tanpa `ios/`/`android/`) berisi satu library/layanan, biasanya satu layar ~100-200 baris. Dua mode: inspirasi/adapt (studi contoh lalu terapkan polanya ke app yang ada) dan scaffold (`npx create-expo --example with-stripe`). `meta.json` adalah sumber kebenaran untuk contoh yang di-rename atau deprecated.',
      en: 'These are not full apps: managed projects (no `ios/`/`android/`) built around a single library or service, typically one screen of ~100–200 lines. Two modes: inspiration/adapt (study an example then apply the pattern to an existing app) and scaffold (`npx create-expo --example with-stripe`). `meta.json` is the source of truth for renamed or deprecated examples.',
    },
    useWhen: {
      id: [
        'Mengintegrasikan library/layanan pihak ketiga ke app Expo yang ada dan butuh pola kanonis yang cocok versi.',
        'Memulai proyek baru dari contoh dengan `npx create-expo --example <nama>`.',
      ],
      en: [
        'Integrating a third-party library or service into an existing Expo app and wanting the canonical, version-matched pattern.',
        'Starting a new project from an example with `npx create-expo --example <name>`.',
      ],
    },
    avoidWhen: {
      id: [
        'Men-scaffold contoh di atas proyek pengguna yang sudah ada — baca sebagai referensi dan terapkan pola secara manual.',
        'Merekomendasikan contoh yang tercantum di `deprecated` pada `meta.json` — ikuti pesan penggantinya.',
      ],
      en: [
        'Scaffolding an example on top of the user\'s existing project — read it as reference and apply the pattern by hand.',
        'Recommending an example listed under `deprecated` in `meta.json` — follow its replacement message.',
      ],
    },
    howItWorks: {
      id: [
        'Petakan kebutuhan ke nama contoh (mis. pembayaran → `with-stripe`, auth → `with-clerk`), konfirmasi dengan daftar live via `gh api repos/expo/examples/contents`.',
        'Baca file berprioritas tinggi lebih dulu: README → package.json → app.json → kode integrasi → .env.',
        'Adaptasi secara non-destruktif ke app pengguna.',
      ],
      en: [
        'Map the need to an example name (e.g. payments → `with-stripe`, auth → `with-clerk`) and confirm against the live list via `gh api repos/expo/examples/contents`.',
        'Read high-signal files first: README → package.json → app.json → integration code → .env.',
        'Adapt into the user\'s app non-destructively.',
      ],
    },
    coreRules: {
      id: [
        'Selaraskan versi: contoh mengikuti SDK terbaru, jadi pasang hanya dependency yang kurang dengan `npx expo install <pkg>`, jangan salin versi yang di-pin.',
        'Gabungkan config, jangan ganti: tambahkan hanya plugin dan permission baru ke `app.json`.',
        'Buat ulang env var dari bentuk `.env` contoh (isinya placeholder, bukan rahasia asli).',
      ],
      en: [
        'Version-align: examples track the latest SDK, so add only the missing deps with `npx expo install <pkg>` instead of copying pinned versions.',
        'Merge config, don\'t replace it: add only the new plugins and permissions to `app.json`.',
        'Recreate env vars from the example\'s `.env` shape (placeholders, never working secrets).',
      ],
    },
    tips: {
      id: [
        'Membaca lebih dari beberapa file? Tarik seluruh contoh ke direktori sementara (`npx degit expo/examples/with-stripe /tmp/...`) lalu baca dengan Grep/Read.',
        '`references/catalog.md` adalah snapshot terkategori untuk triase cepat, tetapi bisa usang.',
      ],
      en: [
        'Reading more than a couple of files? Pull the whole example into a scratch dir (`npx degit expo/examples/with-stripe /tmp/...`) and read it with Grep/Read.',
        '`references/catalog.md` is a categorized snapshot for fast triage, but it can drift.',
      ],
    },
    pairsWellWith: ['expo-overview', 'expo-data-fetching', 'expo-ui'],
    spotlight: {
      title: {
        id: 'Pola Kanonis Sebelum Integrasi Manual',
        en: 'Canonical Pattern Before Hand-Rolling',
      },
      body: {
        id: 'Skill ini menyuruh agent mengambil contoh `with-*` yang cocok sebelum menulis integrasi sendiri: dependency set, config app.json, dan kode intinya. Contoh-contoh itu managed, tanpa folder native.',
        en: 'The skill tells the agent to fetch the matching `with-*` example before hand-rolling an integration: the dependency set, app.json config and core code. The examples are managed, with no native folders.',
      },
    },
    sourcePath: 'plugins/expo/skills/expo-examples/SKILL.md',
  },
  {
    name: 'expo-app-clip',
    category: 'framework',
    invocation: 'model',
    description: {
      id: 'Menambah target iOS App Clip ke app Expo: `@bacons/apple-targets`, associated domains, file AASA, Smart App Banner, dan metadata App Clip.',
      en: 'Adding an iOS App Clip target to an Expo app: `@bacons/apple-targets`, associated domains, the AASA file, Smart App Banner, and App Clip metadata.',
    },
    detailedDescription: {
      id: 'Panduan 10 langkah: set `bundleIdentifier` dan `appleTeamId`, `bun create target clip` (memasang `@bacons/apple-targets` dan menulis `targets/clip/`), kabelkan associated domains (`applinks:` + `appclips:`), daftarkan bundle ID, hosting AASA di HTTPS, tag Smart App Banner, deploy situs, mirror permission, build/submit ke TestFlight, dan konfigurasi metadata App Clip. Bundle ID Clip diturunkan otomatis sebagai `<parent>.clip`.',
      en: 'A 10-step guide: set `bundleIdentifier` and `appleTeamId`, `bun create target clip` (installs `@bacons/apple-targets` and writes `targets/clip/`), wire associated domains (`applinks:` + `appclips:`), register bundle IDs, host the AASA file over HTTPS, add the Smart App Banner tag, deploy the site, mirror permissions, build/submit to TestFlight, and configure App Clip metadata. The Clip\'s bundle ID is derived automatically as `<parent>.clip`.',
    },
    useWhen: {
      id: [
        'Pengguna menyebut App Clip, AASA, apple-app-site-association, appclips, atau smart app banner.',
        'Ingin mengirim Clip iOS ringan yang dipanggil dari URL di domain app, berdampingan dengan app induk.',
      ],
      en: [
        'The user mentions App Clip, AASA, apple-app-site-association, appclips, or a smart app banner.',
        'Wanting to ship a lightweight iOS Clip invoked from a URL on the app\'s domain alongside the parent app.',
      ],
    },
    avoidWhen: {
      id: [
        'Tanpa keanggotaan Apple Developer Program dan review App Store, Clip tidak bisa dikirim (menambah target-nya sendiri open source).',
        'Target non-iOS atau widget/ekstensi lain — skill ini khusus App Clip.',
      ],
      en: [
        'Without an Apple Developer Program membership and App Store review a Clip cannot ship (adding the target itself is open source).',
        'Non-iOS targets or other widgets/extensions — this skill is App Clip only.',
      ],
    },
    howItWorks: {
      id: [
        'Tambah target dengan `bun create target clip`; hasilnya `targets/clip/expo-target.config.js`, `Info.plist`, `AppDelegate.swift`, dan `Assets.xcassets`.',
        'Induk dan Clip masing-masing butuh entitlement Associated Domains yang menunjuk ke domain yang meng-host AASA.',
        'Host AASA lewat HTTPS (host mana pun; EAS Hosting salah satunya), deploy situs, lalu build dan submit ke TestFlight.',
      ],
      en: [
        'Add the target with `bun create target clip`; it yields `targets/clip/expo-target.config.js`, `Info.plist`, `AppDelegate.swift` and `Assets.xcassets`.',
        'The parent app and the Clip each need the Associated Domains entitlement pointing at the domain that hosts the AASA file.',
        'Host the AASA over HTTPS (any host; EAS Hosting is one option), deploy the website, then build and submit to TestFlight.',
      ],
    },
    coreRules: {
      id: [
        'Set `deploymentTarget: "17.6"` di config target Clip — batas ukuran App Clip yang lebih tinggi berlaku mulai iOS 17.6.',
        'Deklarasikan entitlement `com.apple.developer.associated-domains` dengan `appclips:` di `expo-target.config.js`.',
      ],
      en: [
        'Set `deploymentTarget: "17.6"` in the Clip\'s target config — App Clips have a higher minimum size limit in iOS 17.6.',
        'Declare the `com.apple.developer.associated-domains` entitlement with `appclips:` in `expo-target.config.js`.',
      ],
    },
    tips: {
      id: [
        'Build lewat EAS Build atau `bunx testflight` memakai menit build paket EAS.',
        'Gunakan ikon yang sudah ada di app (cek `bunx expo config`) atau tentukan ikon sendiri untuk Clip.',
      ],
      en: [
        'Building via EAS Build or `bunx testflight` uses your EAS plan\'s build minutes.',
        'Reuse the app\'s existing icon (check `bunx expo config`) or define one for the Clip.',
      ],
    },
    pairsWellWith: ['expo-dev-client', 'eas-hosting', 'eas-app-stores'],
    spotlight: {
      title: {
        id: 'Target Clip di `targets/clip/`',
        en: 'The Clip Target in `targets/clip/`',
      },
      body: {
        id: 'Skill ini memakai `@bacons/apple-targets` untuk menulis target Clip ke `targets/clip/`, dengan bundle ID otomatis `<parent>.clip`. Batas ukuran App Clip lebih tinggi mulai iOS 17.6, makanya `deploymentTarget` diset ke 17.6.',
        en: 'The skill uses `@bacons/apple-targets` to write the Clip target into `targets/clip/`, with the bundle ID derived as `<parent>.clip`. App Clips have a higher size limit from iOS 17.6, hence `deploymentTarget` is set to 17.6.',
      },
    },
    sourcePath: 'plugins/expo/skills/expo-app-clip/SKILL.md',
  },
  {
    name: 'expo-upgrade',
    category: 'framework',
    invocation: 'model',
    description: {
      id: 'Panduan upgrade versi Expo SDK dan memperbaiki masalah dependency: `npx expo install --fix`, `npx expo-doctor`, pembersihan cache, paket deprecated, dan prebuild.',
      en: 'Guidelines for upgrading Expo SDK versions and fixing dependency issues: `npx expo install --fix`, `npx expo-doctor`, cache cleanup, deprecated packages, and prebuild.',
    },
    detailedDescription: {
      id: 'Proses bertahap: `npx expo install expo@latest` lalu `npx expo install --fix`, jalankan `npx expo-doctor`, bersihkan cache, periksa breaking changes, prebuild hanya bila ada folder `ios/`/`android/`. Menyertakan tabel paket deprecated (`expo-av` → `expo-audio`/`expo-video`, `expo-permissions`, dll.) dan referensi per versi (React 19, New Architecture, React Compiler, NativeTabs, expo-av migrasi, React Navigation → Expo Router).',
      en: 'A step-by-step process: `npx expo install expo@latest` then `npx expo install --fix`, run `npx expo-doctor`, clear caches, review breaking changes, prebuild only if `ios/`/`android/` exist. Includes a deprecated-packages table (`expo-av` → `expo-audio`/`expo-video`, `expo-permissions`, etc.) and per-version references (React 19, New Architecture, React Compiler, NativeTabs, expo-av migration, React Navigation → Expo Router).',
    },
    useWhen: {
      id: [
        'Upgrade ke versi Expo SDK yang lebih baru, termasuk rilis beta/preview (`expo@next`).',
        'Memperbaiki konflik dependency, paket deprecated, atau membersihkan cache setelah upgrade.',
      ],
      en: [
        'Upgrading to a newer Expo SDK, including beta/preview releases (`expo@next`).',
        'Fixing dependency conflicts, deprecated packages, or clearing caches after an upgrade.',
      ],
    },
    avoidWhen: {
      id: [
        'Menjalankan `npx expo prebuild --clean` di proyek CNG (tanpa folder `ios/`/`android/`) atau di app bare workflow.',
        'Dari SDK 55 atau lebih lama, jangan berhenti di SDK 56 atau memakai `expo@57.0.8` ke bawah — ada regresi memori Hermes V1; langsung ke SDK 57.',
      ],
      en: [
        'Running `npx expo prebuild --clean` on a CNG project (no `ios/`/`android/` folders) or a bare workflow app.',
        'From SDK 55 or earlier, do not stop at SDK 56 or use `expo@57.0.8` or below — a Hermes V1 memory regression applies; go directly to SDK 57.',
      ],
    },
    howItWorks: {
      id: [
        'Naikkan Expo dan dependency: `npx expo install expo@latest`, `npx expo install --fix`.',
        'Diagnosa dengan `npx expo-doctor`, bersihkan cache (`npx expo export -p ios --clear`, hapus `node_modules` dan `.expo`, `watchman watch-del-all`).',
        'Periksa checklist breaking change, jalankan prebuild hanya bila perlu, lalu bersihkan cache bare workflow (CocoaPods, DerivedData, Gradle).',
      ],
      en: [
        'Upgrade Expo and dependencies: `npx expo install expo@latest`, `npx expo install --fix`.',
        'Diagnose with `npx expo-doctor` and clear caches (`npx expo export -p ios --clear`, remove `node_modules` and `.expo`, `watchman watch-del-all`).',
        'Work through the breaking-changes checklist, prebuild only if needed, then clear bare-workflow caches (CocoaPods, DerivedData, Gradle).',
      ],
    },
    coreRules: {
      id: [
        'Setelah menghapus dependency apa pun, jalankan `npx expo-doctor` dan pulihkan peer wajib yang hilang; pertahankan `expo-constants` sebagai dependency langsung bila `expo-router` terpasang.',
        'Migrasikan semua pemakaian paket deprecated sebelum menghapus paket lama (mis. `expo-av` → `expo-audio` + `expo-video`).',
        'SDK 54+: pastikan `react-native-worklets` terpasang (wajib untuk Reanimated).',
      ],
      en: [
        'After removing any dependency, run `npx expo-doctor` and restore any missing required peer; keep `expo-constants` as a direct dependency whenever `expo-router` is installed.',
        'Migrate all usage of deprecated packages before removing the old one (e.g. `expo-av` → `expo-audio` + `expo-video`).',
        'SDK 54+: make sure `react-native-worklets` is installed (required for Reanimated).',
      ],
    },
    tips: {
      id: [
        'Tinjau entri `expo.install.exclude` dan folder `patches/` — sering merupakan workaround yang tak lagi dibutuhkan.',
        'Perbarui link docs berversi di `AGENTS.md` (`docs.expo.dev/versions/v<versi>/`).',
      ],
      en: [
        'Review `expo.install.exclude` entries and the `patches/` folder — they are often workarounds that are no longer needed.',
        'Update versioned docs links in `AGENTS.md` (`docs.expo.dev/versions/v<version>/`).',
      ],
    },
    pairsWellWith: ['expo-overview', 'expo-dev-client', 'expo-router'],
    spotlight: {
      title: {
        id: 'Jangan Lompati Hati-Hati: Jalur SDK 57',
        en: 'Mind the SDK 57 Path',
      },
      body: {
        id: 'Catatan paling tegas di skill ini: dari SDK 55 ke bawah, lewati SDK 56 dan langsung ke SDK 57 (bukan 57.0.8 atau lebih lama) karena regresi memori Hermes V1 bisa menaikkan pemakaian memori drastis dengan `react-native-worklets`.',
        en: 'The most pointed note in this skill: from SDK 55 or earlier, skip SDK 56 and go straight to SDK 57 (not 57.0.8 or below) because a Hermes V1 memory regression can drastically increase memory use with `react-native-worklets`.',
      },
    },
    sourcePath: 'plugins/expo/skills/expo-upgrade/SKILL.md',
  },
  {
    name: 'expo-skill-feedback',
    category: 'framework',
    invocation: 'model',
    description: {
      id: 'Kirim umpan balik tentang skill Expo (atau Expo itu sendiri) dan kendalikan telemetri penggunaan anonim opt-in (mati secara default).',
      en: 'Submit feedback about an Expo skill (or Expo itself) and control the opt-in anonymous usage telemetry (off by default).',
    },
    detailedDescription: {
      id: 'Umpan balik dikirim dengan `npx --yes submit-expo-feedback@latest` (opsional `--category` dan `--subject`) dan tidak bergantung pada telemetri. Menyertakan alur "eval candidate": tugas Expo yang gagal diselesaikan agent meski sudah berusaha, dilaporkan dengan `--category evals` setelah mendapat persetujuan pengguna. Telemetri otomatis (Claude Code saja) mati secara default dan dikendalikan lewat skrip `telemetry.cjs` atau env `EXPO_SKILLS_TELEMETRY` / `DO_NOT_TRACK`.',
      en: 'Feedback is submitted with `npx --yes submit-expo-feedback@latest` (optional `--category` and `--subject`) and is independent of telemetry. Includes an "eval candidate" flow: an Expo task the agent could not complete cleanly despite real effort is reported with `--category evals` after the user approves. Automatic telemetry (Claude Code only) is off by default and controlled via the `telemetry.cjs` script or the `EXPO_SKILLS_TELEMETRY` / `DO_NOT_TRACK` env vars.',
    },
    useWhen: {
      id: [
        'Sebuah skill berguna, membingungkan, rusak, atau usang dan Anda ingin melaporkannya dengan spesifik.',
        'Agent berulang kali gagal pada tugas Expo atau pengguna harus mengambil alih — ajukan eval candidate (dengan persetujuan).',
      ],
      en: [
        'A skill was useful, confusing, broken or outdated and you want to report it specifically.',
        'An agent repeatedly failed an Expo task or the user had to take over — propose an eval candidate (with approval).',
      ],
    },
    avoidWhen: {
      id: [
        'Mengaktifkan telemetri tanpa permintaan eksplisit pengguna.',
        'Mengirim eval candidate tanpa pengguna untuk menyetujui (run headless/CI), lebih dari satu per sesi, atau untuk slip kecil yang diperbaiki sendiri.',
      ],
      en: [
        'Enabling telemetry without an explicit user request.',
        'Submitting an eval candidate with no user to approve (headless/CI runs), more than one per session, or for quick slips the agent self-corrected.',
      ],
    },
    howItWorks: {
      id: [
        'Kirim: `npx --yes submit-expo-feedback@latest --category "<KATEGORI>" --subject "<SUBJEK>" "<UMPAN_BALIK>"`; kategori: skills, docs, mcp, expo-cli, eas-cli, evals, unknown.',
        'Eval candidate: tampilkan isi kiriman ke pengguna, minta persetujuan, lalu kirim dengan struktur Task / Expected / Actual / Wrong approach / Evidence.',
        'Telemetri: `node "${CLAUDE_PLUGIN_ROOT}/skills/expo-skill-feedback/scripts/telemetry.cjs" --status|--on|--off`.',
      ],
      en: [
        'Submit: `npx --yes submit-expo-feedback@latest --category "<CATEGORY>" --subject "<SUBJECT>" "<FEEDBACK>"`; categories: skills, docs, mcp, expo-cli, eas-cli, evals, unknown.',
        'Eval candidate: show the exact submission to the user, get approval, then send it with the Task / Expected / Actual / Wrong approach / Evidence structure.',
        'Telemetry: `node "${CLAUDE_PLUGIN_ROOT}/skills/expo-skill-feedback/scripts/telemetry.cjs" --status|--on|--off`.',
      ],
    },
    coreRules: {
      id: [
        'Jangan sertakan rahasia, kode sumber, data pribadi, prompt panjang, atau stack trace dalam umpan balik.',
        'Bidang Task pada eval candidate harus menggambarkan bentuk teknis Expo dari tugasnya, bukan konteks produk/bisnis pengguna.',
        'Telemetri mati secara default; CI tidak pernah mengirim.',
      ],
      en: [
        'Do not include secrets, source code, personal data, long prompts, or stack traces in feedback.',
        'The Task field of an eval candidate must describe the Expo-technical shape of the task, never the user\'s product or business context.',
        'Telemetry is off by default; CI never sends.',
      ],
    },
    tips: {
      id: [
        'Matikan telemetri dengan `EXPO_SKILLS_TELEMETRY=0` atau `DO_NOT_TRACK=1`; menyalakan dengan `EXPO_SKILLS_TELEMETRY=1`.',
        'Setiap skill Expo lain punya bagian "Submitting Feedback" yang menunjuk ke skill ini.',
      ],
      en: [
        'Disable telemetry with `EXPO_SKILLS_TELEMETRY=0` or `DO_NOT_TRACK=1`; enable it with `EXPO_SKILLS_TELEMETRY=1`.',
        'Every other Expo skill has a "Submitting Feedback" section that points here.',
      ],
    },
    pairsWellWith: ['expo-overview'],
    spotlight: {
      title: {
        id: 'Umpan Balik Terpisah dari Telemetri',
        en: 'Feedback Is Separate From Telemetry',
      },
      body: {
        id: 'Mengirim umpan balik tidak memerlukan telemetri. Telemetri otomatis (hanya Claude Code) opt-in dan hanya mengirim nama skill, platform, dan hash id instalasi lokal acak — tidak pernah kode, prompt, path file, atau data pribadi (sesuai README upstream).',
        en: 'Submitting feedback does not require telemetry. Automatic telemetry (Claude Code only) is opt-in and sends only the skill name, platform and a hash of a random local install id — never code, prompts, file paths or personal data (per the upstream README).',
      },
    },
    sourcePath: 'plugins/expo/skills/expo-skill-feedback/SKILL.md',
  },
  {
    name: 'eas-app-stores',
    category: 'services',
    invocation: 'model',
    description: {
      id: 'Build dan submit app iOS/Android dengan EAS ke TestFlight, App Store, atau Google Play: Expo, React Native lain, dan app native yang sudah ada. Layanan EAS berbayar (ada free tier).',
      en: 'Build and submit iOS and Android apps with EAS to TestFlight, the App Store or Google Play: Expo, other React Native projects, and existing native apps. A paid EAS service (free tier available).',
    },
    detailedDescription: {
      id: 'Mencakup setup `eas.json`, pipeline rilis, signing, versi app & build number, submit ke store, dan metadata listing. Mendukung Expo/React Native, app SwiftUI/UIKit tanpa runtime React Native (`references/native-ios.md`), dan Android native (hanya panduan submit). Untuk situs web dan API routes gunakan `eas-hosting`; untuk menambah layar RN ke app native gunakan `expo-brownfield`.',
      en: 'Covers `eas.json` setup, release pipelines, signing, app versions and build numbers, store submissions, and listing metadata. Supports Expo/React Native, SwiftUI/UIKit apps with no React Native runtime (`references/native-ios.md`), and native Android (submission guide only). For websites and API routes use `eas-hosting`; for adding RN screens to a native app use `expo-brownfield`.',
    },
    useWhen: {
      id: [
        'Menyiapkan `eas.json`, build produksi, signing, auto-increment versi, dan submit ke TestFlight / App Store / Google Play.',
        'App native SwiftUI/UIKit yang hanya memakai EAS sebagai layanan delivery (tanpa menambah Expo atau RN ke runtime-nya).',
      ],
      en: [
        'Setting up `eas.json`, production builds, signing, version auto-increment, and submitting to TestFlight / App Store / Google Play.',
        'A native SwiftUI/UIKit app using EAS purely as a delivery service (without adding Expo or RN to its runtime).',
      ],
    },
    avoidWhen: {
      id: [
        'Deploy situs Expo dan API routes — gunakan `eas-hosting`.',
        'Menambah layar React Native ke app native — gunakan `expo-brownfield` (kembali ke sini untuk distribusi).',
      ],
      en: [
        'Deploying Expo websites and API routes — use `eas-hosting`.',
        'Adding React Native screens to a native app — use `expo-brownfield` (return here for distribution).',
      ],
    },
    howItWorks: {
      id: [
        'Pilih jalur proyek: native iOS tanpa RN → `references/native-ios.md`; native Android → `references/play-store.md`; Expo/RN → quick start.',
        '`npm install -g eas-cli`, `eas login`, `eas init`, lalu `eas build:configure` untuk membuat profil di `eas.json`.',
        'Build `eas build -p ios|android --profile production`; kirim dengan menambah `--auto-submit` pada build, atau `eas submit` terpisah.',
      ],
      en: [
        'Choose the project path: native iOS with no RN → `references/native-ios.md`; native Android → `references/play-store.md`; Expo/RN → quick start.',
        '`npm install -g eas-cli`, `eas login`, `eas init`, then `eas build:configure` to create profiles in `eas.json`.',
        'Build with `eas build -p ios|android --profile production`; ship by adding `--auto-submit` to the build, or a separate `eas submit`.',
      ],
    },
    coreRules: {
      id: [
        'Build EAS yang sukses atau submission yang antre belum membuktikan penerimaan Apple, akses tester, atau rilis App Store.',
        'Pertahankan project dan identifier store yang sudah ada saat setup rilis sudah berjalan.',
        '`appVersionSource: "remote"` membuat EAS mengelola nomor versi; untuk native iOS periksa `CFBundleVersion` di archive, karena counter remote saja tidak membuktikan Xcode memakainya.',
      ],
      en: [
        'A successful EAS build or a queued submission does not establish Apple acceptance, tester access, or an App Store release.',
        'Preserve existing project and store identifiers when a release setup already exists.',
        '`appVersionSource: "remote"` lets EAS manage version numbers; for native iOS inspect the archived `CFBundleVersion`, since the remote counter alone does not prove Xcode used it.',
      ],
    },
    tips: {
      id: [
        'Pintasan TestFlight untuk Expo/RN: `npx testflight`; kredensial Apple lewat `eas credentials`.',
        'Pantau dengan `eas build:list`, `eas build:view`, `eas submit:list -p ios --json` (butuh eas-cli yang cukup baru; skill menyebut 23.2.0).',
        'Otomatisasi rilis lewat EAS Workflows (`references/workflows.md`; penulisan YAML via `eas-workflows`).',
      ],
      en: [
        'TestFlight shortcut for Expo/RN: `npx testflight`; Apple credentials via `eas credentials`.',
        'Monitor with `eas build:list`, `eas build:view`, `eas submit:list -p ios --json` (needs a recent eas-cli; the skill cites 23.2.0).',
        'Automate releases via EAS Workflows (`references/workflows.md`; YAML authoring via `eas-workflows`).',
      ],
    },
    pairsWellWith: ['eas-workflows', 'eas-update', 'expo-brownfield'],
    spotlight: {
      title: {
        id: 'Cloud Build + Submit, Termasuk App Native',
        en: 'Cloud Build + Submit, Including Native Apps',
      },
      body: {
        id: 'EAS adalah layanan delivery: app SwiftUI/UIKit murni pun bisa memakainya tanpa memasukkan Expo atau React Native ke runtime. Build dan submit berjalan di cloud EAS (`--auto-submit`), dan skill ini membuka dengan catatan biaya: paket EAS plus keanggotaan Apple Developer/Google Play yang terpisah.',
        en: 'EAS is a delivery service: even a pure SwiftUI/UIKit app can use it without adding Expo or React Native to its runtime. Build and submit run on EAS cloud (`--auto-submit`), and the skill opens with a costs note: EAS plan resources plus separate Apple Developer / Google Play memberships.',
      },
    },
    sourcePath: 'plugins/expo/skills/eas-app-stores/SKILL.md',
  },
  {
    name: 'eas-hosting',
    category: 'services',
    invocation: 'model',
    description: {
      id: 'Deploy situs web Expo dan API routes Expo Router ke EAS Hosting (`eas deploy`): secret, domain kustom, dan runtime Cloudflare Workers. Layanan EAS berbayar (ada free tier).',
      en: 'Deploy Expo websites and Expo Router API routes to EAS Hosting (`eas deploy`): secrets, custom domains, and the Cloudflare Workers runtime. A paid EAS service (free tier available).',
    },
    detailedDescription: {
      id: 'Ekspor bundle web dengan `npx expo export -p web`, kirim dengan `eas deploy` (preview) atau `eas deploy --prod`; perintah yang sama men-deploy API routes. Mencakup penulisan API route (`+api.ts`, method HTTP, request handling, CORS), env var lewat `eas env:create`, job workflow `type: deploy`, dan batasan runtime Cloudflare Workers (tanpa `fs`, tanpa modul Node native). Menulis API routes dan mengekspor bundle gratis dan open source; Anda bisa self-host.',
      en: 'Export the web bundle with `npx expo export -p web` and ship with `eas deploy` (preview) or `eas deploy --prod`; the same command deploys API routes. Covers authoring API routes (`+api.ts`, HTTP methods, request handling, CORS), env vars via `eas env:create`, a `type: deploy` workflow job, and Cloudflare Workers runtime limits (no `fs`, no native Node modules). Authoring API routes and exporting the bundle are free and open source; you can self-host.',
    },
    useWhen: {
      id: [
        'Men-deploy web app Expo atau backend yang hanya berisi API routes ke EAS Hosting, termasuk preview PR.',
        'Menulis API route untuk rahasia sisi server, proxy API pihak ketiga, webhook, validasi, atau komputasi berat.',
      ],
      en: [
        'Deploying an Expo web app or an API-routes-only backend to EAS Hosting, including PR previews.',
        'Writing API routes for server-side secrets, third-party API proxies, webhooks, validation, or heavy computation.',
      ],
    },
    avoidWhen: {
      id: [
        'Build native atau rilis store — gunakan `eas-app-stores`.',
        'Data sudah publik, tanpa rahasia, kebutuhan real-time (WebSockets), CRUD sederhana yang cocok untuk Firebase/Supabase/Convex, upload file (pakai presigned URL), atau hanya autentikasi (pakai Clerk/Auth0/Firebase Auth).',
      ],
      en: [
        'Native builds or store releases — use `eas-app-stores`.',
        'Data that is already public, no secrets needed, real-time needs (WebSockets), simple CRUD better served by Firebase/Supabase/Convex, file uploads (use presigned URLs), or auth only (use Clerk/Auth0/Firebase Auth).',
      ],
    },
    howItWorks: {
      id: [
        'Buat rute di `app/api/` dengan akhiran `+api.ts`, ekspor fungsi bernama per method HTTP (`GET`, `POST`, ...).',
        'Uji lokal dengan `npx expo serve`.',
        '`npx expo export -p web`, lalu `npx eas-cli@latest deploy` untuk preview atau `--prod` untuk produksi; env var produksi via `eas env:create`.',
      ],
      en: [
        'Create routes under `app/api/` with a `+api.ts` suffix and export a named function per HTTP method (`GET`, `POST`, ...).',
        'Test locally with `npx expo serve`.',
        '`npx expo export -p web`, then `npx eas-cli@latest deploy` for a preview or `--prod` for production; production env vars via `eas env:create`.',
      ],
    },
    coreRules: {
      id: [
        'Runtime API routes adalah Cloudflare Workers: tidak ada modul `fs` atau modul Node native; pakai Web API (Web Crypto, `fetch`); koneksi persisten (WebSocket) butuh Durable Objects.',
        'Gunakan `process.env` untuk rahasia sisi server; jangan commit `.env`.',
        'Karena tidak ada filesystem, gunakan database cloud (D1, Turso, PlanetScale, Supabase, Neon).',
      ],
      en: [
        'The API-route runtime is Cloudflare Workers: no `fs` or native Node modules; use Web APIs (Web Crypto, `fetch`); persistent connections (WebSockets) need Durable Objects.',
        'Use `process.env` for server-side secrets; never commit `.env`.',
        'With no filesystem, use cloud databases (D1, Turso, PlanetScale, Supabase, Neon).',
      ],
    },
    tips: {
      id: [
        'Deploy otomatis dengan workflow `type: deploy` (`prod: true` untuk main, `prod: false` untuk preview PR); penulisan YAML via `eas-workflows`.',
        'Tambahkan header CORS dan handler `OPTIONS` bila klien web memanggil API route.',
      ],
      en: [
        'Automate with a `type: deploy` workflow (`prod: true` for main, `prod: false` for PR previews); YAML authoring via `eas-workflows`.',
        'Add CORS headers and an `OPTIONS` handler when web clients call the API route.',
      ],
    },
    pairsWellWith: ['eas-workflows', 'eas-app-stores', 'expo-data-fetching'],
    spotlight: {
      title: {
        id: 'Web + API Routes di Edge Cloudflare Workers',
        en: 'Web + API Routes at the Cloudflare Workers Edge',
      },
      body: {
        id: 'Satu perintah `eas deploy` mengirim bundle web dan API routes bersamaan ke edge Cloudflare Workers milik Expo. Skill ini membuka dengan catatan biaya: EAS Hosting berbayar dengan free tier, tetapi output server hasil ekspor boleh Anda self-host.',
        en: 'One `eas deploy` ships the web bundle and API routes together to Expo\'s Cloudflare Workers edge. The skill opens with a costs note: EAS Hosting is paid with free-tier limits, but you can self-host the exported server output instead.',
      },
    },
    sourcePath: 'plugins/expo/skills/eas-hosting/SKILL.md',
  },
  {
    name: 'eas-workflows',
    category: 'services',
    invocation: 'model',
    description: {
      id: 'Membantu memahami dan menulis file YAML EAS Workflow (`.eas/workflows/*.yml`) untuk CI/CD, pipeline build, dan otomasi deployment. Layanan EAS berbayar (ada free tier).',
      en: 'Helps understand and write EAS Workflow YAML files (`.eas/workflows/*.yml`) for CI/CD, build pipelines, and deployment automation. A paid EAS service (free tier available).',
    },
    detailedDescription: {
      id: 'Skill ini tidak menghafal sintaks: ia mewajibkan mengambil JSON Schema workflow (`api.expo.dev/v2/workflows/schema`), dokumentasi sintaks, dan dokumentasi pre-packaged jobs dengan skrip `fetch.js`, lalu memvalidasi hasilnya dengan `eas workflow:validate`. Mencakup kunci tingkat atas (`name`, `on`, `jobs`, `defaults`, `concurrency`) dan ekspresi `${{ }}`.',
      en: 'This skill does not memorize syntax: it requires fetching the workflow JSON Schema (`api.expo.dev/v2/workflows/schema`), the syntax docs and the pre-packaged jobs docs with the `fetch.js` script, then validating output with `eas workflow:validate`. Covers the top-level keys (`name`, `on`, `jobs`, `defaults`, `concurrency`) and `${{ }}` expressions.',
    },
    useWhen: {
      id: [
        'Pengguna bertanya tentang CI/CD atau workflow dalam konteks Expo/EAS, menyebut `.eas/workflows/`, atau butuh otomasi build/deploy.',
        'Menulis atau mengedit workflow, atau menjawab pertanyaan tentang job type, trigger, runner, dan enum yang tersedia.',
      ],
      en: [
        'The user asks about CI/CD or workflows in an Expo/EAS context, mentions `.eas/workflows/`, or wants build/deployment automation.',
        'Writing or editing a workflow, or answering questions about available job types, triggers, runners and enums.',
      ],
    },
    avoidWhen: {
      id: [
        'Menjawab dari nilai yang diingat — job type dan parameter berkembang; jawab dari schema.',
        'Mengganti `eas workflow:validate` dengan validator YAML/JSON Schema lokal.',
      ],
      en: [
        'Answering from memorized values — job types and parameters evolve; answer from the schema.',
        'Replacing `eas workflow:validate` with a local YAML or JSON Schema validator.',
      ],
    },
    howItWorks: {
      id: [
        'Ambil JSON Schema, dokumen sintaks, dan dokumen pre-packaged jobs lewat `node <skill-dir>/scripts/fetch.js <url>` (menyimpan cache dengan ETag).',
        'Verifikasi field wajib per job type, referensi `needs`/`after`, konteks ekspresi, dan batas panjang `if`.',
        'Validasi: `npx -y eas-cli@latest workflow:validate .eas/workflows/<file>.yml --non-interactive` untuk tiap file yang berubah, ulangi sampai muncul "Workflow configuration YAML is valid."',
      ],
      en: [
        'Fetch the JSON Schema, syntax doc and pre-packaged jobs doc via `node <skill-dir>/scripts/fetch.js <url>` (ETag-cached).',
        'Verify required fields per job type, `needs`/`after` references, expression contexts, and `if` length constraints.',
        'Validate: `npx -y eas-cli@latest workflow:validate .eas/workflows/<file>.yml --non-interactive` for each changed file, repeating until it prints "Workflow configuration YAML is valid."',
      ],
    },
    coreRules: {
      id: [
        'Wajib mengambil schema sebelum membuat/mengedit workflow; schema adalah sumber kebenaran struktur, EAS CLI validator akhir.',
        'Workflow berada di `.eas/workflows/*.yml` (atau `.yaml`), maksimal 16 KiB per file.',
        'Ekspresi memakai `${{ }}` dengan konteks `github.*`, `inputs.*`, `needs.*`, `jobs.*`, `steps.*`, `workflow.*`.',
      ],
      en: [
        'Fetching the schema before generating or editing a workflow is NECESSARY; it is the source of truth for structure, with EAS CLI as the final validator.',
        'Workflows live in `.eas/workflows/*.yml` (or `.yaml`), each file 16 KiB or smaller.',
        'Expressions use `${{ }}` with `github.*`, `inputs.*`, `needs.*`, `jobs.*`, `steps.*`, `workflow.*` contexts.',
      ],
    },
    tips: {
      id: [
        'Validasi butuh sesi EAS CLI yang login dan proyek Expo yang ter-link; ia juga memeriksa referensi profil build terhadap `eas.json` dan validasi sisi server.',
        'Setiap job workflow memakai menit build/compute paket EAS; cek expo.dev/pricing sebelum memicu run.',
      ],
      en: [
        'Validation needs a logged-in EAS CLI session and a linked Expo project; it also checks build-profile references against `eas.json` and server-side validation.',
        'Each workflow job consumes your plan\'s build/compute minutes; review expo.dev/pricing before triggering runs.',
      ],
    },
    pairsWellWith: ['eas-app-stores', 'eas-hosting', 'eas-update'],
    spotlight: {
      title: {
        id: 'Schema sebagai Sumber Kebenaran',
        en: 'The Schema Is the Source of Truth',
      },
      body: {
        id: 'Alih-alih berisi daftar job type, skill ini memerintahkan agent mengambil JSON Schema resmi dan memvalidasi dengan EAS CLI. Jawaban tentang job type, trigger, atau runner diturunkan dari schema, bukan dari ingatan.',
        en: 'Instead of listing job types, the skill tells the agent to fetch the official JSON Schema and validate with EAS CLI. Answers about job types, triggers or runners are derived from the schema, not memory.',
      },
    },
    sourcePath: 'plugins/expo/skills/eas-workflows/SKILL.md',
  },
  {
    name: 'eas-observe',
    category: 'services',
    invocation: 'model',
    description: {
      id: 'EAS Observe: metrik performa produksi (startup, navigasi, event kustom) lewat `expo-observe`, query via `eas observe:*`, dan interpretasi metrik. Tanpa crash reporting. Layanan EAS (gratis hingga 10.000 MAU).',
      en: 'EAS Observe: production performance metrics (startup, navigation, custom events) via `expo-observe`, querying with `eas observe:*`, and interpreting the metrics. No crash reporting. An EAS service (free up to 10,000 MAU).',
    },
    detailedDescription: {
      id: 'Memasang `expo-observe` (bungkus root layout dengan `AppMetricsRoot` di SDK 55 atau `ObserveRoot` di SDK 56+, tandai interaktif via `markInteractive()` / `useObserve()` / `<ObserveInteractiveMarker />`), integrasi Expo Router/React Navigation untuk metrik per rute, event kustom `Observe.logEvent` (SDK 56+), konfigurasi (sampling, dispatch). Query dengan enam perintah `eas observe:*` dan baca metrik (cold/warm launch, TTR, TTI, navigasi, unduhan update). Butuh development/production build (bukan Expo Go).',
      en: 'Install `expo-observe` (wrap the root layout with `AppMetricsRoot` on SDK 55 or `ObserveRoot` on SDK 56+, mark interactive via `markInteractive()` / `useObserve()` / `<ObserveInteractiveMarker />`), Expo Router/React Navigation integrations for per-route metrics, `Observe.logEvent` custom events (SDK 56+), and configuration (sampling, dispatch). Query with the six `eas observe:*` commands and read the metrics (cold/warm launch, TTR, TTI, navigation, update download). Needs a development or production build (not Expo Go).',
    },
    useWhen: {
      id: [
        'Menambahkan EAS Observe ke proyek Expo dan mengukur startup, navigasi per rute, dan event kustom dari app produksi.',
        'Mengquery metrik dari terminal (`observe:metrics-summary`, `metrics`, `routes`, `events`, `session`, `versions`) dan mentriase startup lambat.',
      ],
      en: [
        'Adding EAS Observe to an Expo project and measuring startup, per-route navigation and custom events from production apps.',
        'Querying metrics from the terminal (`observe:metrics-summary`, `metrics`, `routes`, `events`, `session`, `versions`) and triaging slow startups.',
      ],
    },
    avoidWhen: {
      id: [
        'Crash reporting: upstream menyatakan Observe belum punya crash reporting — pakai Sentry atau BugSnag.',
        'Expo Go: library native-nya tidak ada di Expo Go; butuh development atau production build.',
      ],
      en: [
        'Crash reporting: upstream states Observe still has no crash reporting — use Sentry or BugSnag.',
        'Expo Go: the native library is not in Expo Go; a development or production build is required.',
      ],
    },
    howItWorks: {
      id: [
        'Setup: ikuti `references/setup.md` — install, bungkus root layout (`AppMetricsRoot` di SDK 55, `ObserveRoot` di SDK 56+), tandai app interaktif.',
        'Query: `references/queries.md` menjelaskan enam perintah `eas observe:*` lengkap dengan flag, alias metrik, dan bentuk JSON.',
        'Interpretasi: `references/metrics.md` memberi ambang target per metrik dan pola diagnosis (lambat-tapi-mulus vs kontensi main thread vs perangkat throttle).',
      ],
      en: [
        'Setup: follow `references/setup.md` — install, wrap the root layout (`AppMetricsRoot` on SDK 55, `ObserveRoot` on SDK 56+), mark the app interactive.',
        'Query: `references/queries.md` documents the six `eas observe:*` commands with flags, metric aliases and JSON shapes.',
        'Interpret: `references/metrics.md` gives target thresholds per metric and diagnostic patterns (slow-but-smooth vs main-thread contention vs throttled devices).',
      ],
    },
    coreRules: {
      id: [
        'Alias metrik navigasi: `nav_cold_ttr`, `nav_warm_ttr`, `nav_tti`; pengurutan memakai `--sort <slowest|fastest|newest|oldest>` (tidak ada `--order`).',
        '`ObserveErrorBoundary`, `Observe.reportError`, dan `configure({ errorHandlingEnabled })` diekspor tetapi tidak terdokumentasi; error hanya dicatat sebagai event, bukan crash reporting.',
        'Docs resmi (docs.expo.dev/eas/observe) adalah sumber kebenaran untuk detail API; skill bisa tertinggal.',
      ],
      en: [
        'Navigation metric aliases are `nav_cold_ttr`, `nav_warm_ttr`, `nav_tti`; sorting uses `--sort <slowest|fastest|newest|oldest>` (there is no `--order`).',
        '`ObserveErrorBoundary`, `Observe.reportError` and `configure({ errorHandlingEnabled })` are exported but undocumented; errors are recorded as events, not crash reporting.',
        'The official docs (docs.expo.dev/eas/observe) remain the source of truth for API details; the skill may lag.',
      ],
    },
    tips: {
      id: [
        'Paket gratis EAS mengizinkan hingga 10.000 monthly active users dengan fitur terbatas; di atas itu butuh langganan berbayar.',
        'Penulis library (SDK 57+) dapat mengirim integrasi Observe lewat `references/third-party.md`.',
      ],
      en: [
        'The free EAS plan allows up to 10,000 monthly active users with a limited feature set; higher usage requires a paid subscription.',
        'Library authors (SDK 57+) can ship an Observe integration via `references/third-party.md`.',
      ],
    },
    pairsWellWith: ['eas-update', 'eas-update-insights', 'expo-router'],
    spotlight: {
      title: {
        id: 'Observe Mengukur Performa, Bukan Crash',
        en: 'Observe Measures Performance, Not Crashes',
      },
      body: {
        id: 'Upstream tegas: "Observe still has no crash reporting; use Sentry or BugSnag for that." EAS Observe melacak metrik startup, navigasi, dan event kustom dari app produksi (cold/warm launch, TTR, TTI).',
        en: 'Upstream is explicit: "Observe still has no crash reporting; use Sentry or BugSnag for that." EAS Observe tracks startup, navigation and custom-event metrics from production apps (cold/warm launch, TTR, TTI).',
      },
    },
    sourcePath: 'plugins/expo/skills/eas-observe/SKILL.md',
  },
  {
    name: 'eas-update',
    category: 'services',
    invocation: 'model',
    description: {
      id: 'EAS Update untuk update JavaScript dan aset over-the-air dengan `expo-updates`: setup, publish ke channel, runtime version, pengujian, dan debugging build yang tidak ter-update. Layanan EAS (ada Free plan).',
      en: 'EAS Update for over-the-air JavaScript and asset updates with `expo-updates`: setup, publishing to channels, runtime versions, testing, and debugging a build that did not update. An EAS service (Free plan available).',
    },
    detailedDescription: {
      id: 'Mulai dari jalur konfigurasi resmi `eas update:configure` (jangan menebak `updates.url`, `runtimeVersion`, atau channel secara manual), pahami model build/update/branch/channel/runtime version, putuskan apakah update kompatibel, publish dengan `eas update --channel <channel> --message --environment <env>` (SDK 55+ wajib environment), dan uji sesuai tipe build. Kesehatan update (adopsi, crash) ada di `eas-update-insights`.',
      en: 'Start from the supported `eas update:configure` path (never invent `updates.url`, `runtimeVersion` or channels by hand), understand the build/update/branch/channel/runtime-version model, decide whether an update is compatible, publish with `eas update --channel <channel> --message --environment <env>` (SDK 55+ requires an environment), and test according to build type. Update health (adoption, crashes) belongs to `eas-update-insights`.',
    },
    useWhen: {
      id: [
        'Menyiapkan OTA update, mempublikasikan ke channel preview/staging/production, atau menjelaskan branch, channel, dan runtime version.',
        'Debugging mengapa build terpasang (TestFlight/preview/production) masih menampilkan kode lama.',
      ],
      en: [
        'Setting up OTA updates, publishing to preview/staging/production channels, or explaining branches, channels and runtime versions.',
        'Debugging why an installed build (TestFlight/preview/production) still shows old code.',
      ],
    },
    avoidWhen: {
      id: [
        'Perubahan native code atau config native, termasuk upgrade SDK — butuh build baru (`eas-app-stores`); jangan menyiratkan update bisa menambah kemampuan native.',
        'Metrik kesehatan update, adopsi, atau crash — gunakan `eas-update-insights`.',
      ],
      en: [
        'Native code or native config changes, including SDK upgrades — they need a new build (`eas-app-stores`); never imply an update can add native capabilities.',
        'Update health, adoption or crash metrics — use `eas-update-insights`.',
      ],
    },
    howItWorks: {
      id: [
        'Periksa `package.json`, app config, `eas.json`, dan apakah `ios/`/`android/` ter-track; pasang `npx expo install expo-updates`, jalankan `npx eas-cli@latest update:configure`, dan tinjau diff-nya.',
        'Build hanya menerima update bila platform dan runtime version cocok dan channel build menunjuk ke branch yang berisi update tersebut.',
        'Debug berurutan: project/channel/platform/environment, platform + runtime version, URL & channel di build, mapping channel→branch, lalu terminate penuh dan buka ulang.',
      ],
      en: [
        'Inspect `package.json`, app config, `eas.json`, and whether `ios/`/`android/` are tracked; install `npx expo install expo-updates`, run `npx eas-cli@latest update:configure`, and review its diff.',
        'A build receives an update only when platform and runtime version match and its channel points to the branch containing that update.',
        'Debug in order: project/channel/platform/environment, platform + runtime version, URL & channel in the build, channel→branch mapping, then fully terminate and reopen.',
      ],
    },
    coreRules: {
      id: [
        'Publikasi mengubah state remote dan bisa mempengaruhi app terpasang: tetapkan project, channel, environment, platform, runtime version, dan pesan dulu; ke production hanya bila diminta/disetujui eksplisit.',
        'Jangan mengubah kebijakan runtime-version sebagai perbaikan insidental, dan jangan melewati pengaman kompatibilitas/anti-bricking.',
        'Jangan otomatis mengubah `fallbackToCacheTimeout` demi menghindari launch kedua; itu menukar latensi startup dengan aktivasi lebih cepat.',
      ],
      en: [
        'Publishing changes remote state and can affect installed apps: establish project, channel, environment, platforms, runtime version and message first; publish to production only when explicitly requested or approved.',
        'Do not change the runtime-version policy as an incidental fix, and never bypass a compatibility or anti-bricking safeguard.',
        'Do not automatically change `fallbackToCacheTimeout` to avoid the second launch; it trades startup latency for faster activation.',
      ],
    },
    tips: {
      id: [
        'QA manual build rilis: terminate penuh lalu buka ulang — update bisa butuh hingga dua cold launch (satu menemukan/mengunduh, satu menjalankan).',
        'Gunakan channel preview/staging untuk validasi dan promosikan update yang sudah teruji; channel surfing mengganti header `expo-channel-name` per build rilis.',
      ],
      en: [
        'Manual QA on release builds: fully terminate and reopen — an update can take up to two cold launches (one discovers and downloads, one runs it).',
        'Use a preview/staging channel for validation and promote a tested update; channel surfing overrides the `expo-channel-name` header per release build.',
      ],
    },
    pairsWellWith: ['eas-update-insights', 'eas-app-stores', 'eas-workflows'],
    spotlight: {
      title: {
        id: 'Model Build → Channel → Branch → Update',
        en: 'The Build → Channel → Branch → Update Model',
      },
      body: {
        id: 'Inti skill ini adalah model mental: build terpasang membawa channel dan runtime version; channel menunjuk ke branch; branch punya update terbaru yang kompatibel. `eas channel:edit` mengubah mapping untuk semua build di channel itu, bukan channel tertanam di tiap instalasi.',
        en: 'The heart of this skill is the mental model: an installed build carries a channel and runtime version; the channel points to a branch; the branch holds the newest compatible update. `eas channel:edit` changes the mapping for every build on that channel, not an individual installation\'s embedded channel.',
      },
    },
    sourcePath: 'plugins/expo/skills/eas-update/SKILL.md',
  },
  {
    name: 'eas-update-insights',
    category: 'services',
    invocation: 'model',
    description: {
      id: 'Memeriksa kesehatan EAS Update yang sudah dipublikasikan dari CLI: crash rate, jumlah launch, unique users, ukuran payload, dan rasio pengguna embedded vs OTA per channel. Hanya baca (read-only). Layanan EAS.',
      en: 'Check the health of published EAS Updates from the CLI: crash rates, launch counts, unique users, payload size, and the embedded-vs-OTA user split per channel. Read-only. An EAS service.',
    },
    detailedDescription: {
      id: 'Mengekspos data yang sama dengan halaman update/channel di expo.dev lewat `eas update:insights <groupId>`, `eas update:view <groupId> --insights`, dan `eas channel:insights --channel <nama> --runtime-version <versi>`; semuanya mendukung `--json --non-interactive` untuk parsing atau gating CI. Perlu `eas update:list` untuk menemukan ID group. Tidak ada kontrol rollback di skill ini.',
      en: 'Exposes the same data as the update and channel detail pages on expo.dev via `eas update:insights <groupId>`, `eas update:view <groupId> --insights`, and `eas channel:insights --channel <name> --runtime-version <version>`; all support `--json --non-interactive` for parsing or CI gating. Use `eas update:list` to discover group IDs. This skill has no rollback controls.',
    },
    useWhen: {
      id: [
        'Menilai kesehatan atau adopsi update: crash rate, jumlah install, unique users, ukuran bundle, atau split embedded vs OTA di sebuah channel.',
        'Memantau rollout pasca-publish, mendeteksi regresi, atau menggerbang CI berdasarkan kesehatan update.',
      ],
      en: [
        'Assessing update health or adoption: crash rate, install counts, unique users, bundle size, or the embedded-vs-OTA split on a channel.',
        'Post-publish rollout monitoring, regression detection, or gating CI on update health.',
      ],
    },
    avoidWhen: {
      id: [
        'Detail crash per pengguna atau pelaporan level perangkat — skill ini hanya menyediakan metrik agregat EAS.',
        'Mengubah channel/branch atau mempublikasikan update — gunakan `eas-update`.',
      ],
      en: [
        'Per-user crash detail or device-level reporting — this skill only exposes aggregate EAS metrics.',
        'Changing channels/branches or publishing updates — use `eas-update`.',
      ],
    },
    howItWorks: {
      id: [
        'Temukan ID group: `eas update:list --all --json --non-interactive` atau `--branch <nama>` (entri `currentPage[0].group`).',
        '`eas update:insights <groupId>`: launch, failed launch, crash rate, unique users, jumlah aset, rata-rata payload per platform plus rincian harian.',
        '`eas channel:insights --channel <nama> --runtime-version <versi>` (jalankan dari direktori proyek): jumlah pengguna embedded/OTA, update terpopuler, metrik kumulatif.',
      ],
      en: [
        'Discover the group ID: `eas update:list --all --json --non-interactive` or `--branch <name>` (`currentPage[0].group`).',
        '`eas update:insights <groupId>`: launches, failed launches, crash rate, unique users, asset count and average payload per platform plus a daily breakdown.',
        '`eas channel:insights --channel <name> --runtime-version <version>` (run from a project directory): embedded/OTA user counts, most popular updates, cumulative metrics.',
      ],
    },
    coreRules: {
      id: [
        'Selalu beri `--json --non-interactive` saat non-interaktif; tanpa flag branch/`--all`, `update:list` akan meminta pilihan branch.',
        'Baca batasan: "installs" adalah unduhan, bukan launch; crash adalah self-reported dan baru tercatat pada pemeriksaan update berikutnya; publish baru bisa menampilkan nol sementara.',
        'Unique users bisa dihitung ganda lintas iOS dan Android untuk publish yang sama.',
      ],
      en: [
        'Always pass `--json --non-interactive` when non-interactive; without a branch/`--all` flag `update:list` prompts for a branch.',
        'Mind the limitations: "installs" are downloads, not launches; crashes are self-reported and register on the next update check; fresh publishes may show zeros briefly.',
        'Unique users may double-count across iOS and Android for the same publish.',
      ],
    },
    tips: {
      id: [
        'Beri waktu adopsi (menit hingga jam) sebelum menilai crash rate update yang baru dipublikasikan.',
        'Bandingkan adopsi dua channel dan deteksi regresi 24 jam terakhir dengan alur "Common workflows" di skill.',
      ],
      en: [
        'Give adoption some time (minutes to hours) before judging the crash rate of a freshly published update.',
        'Compare adoption between two channels and detect a regression in the last 24 hours with the skill\'s "Common workflows".',
      ],
    },
    pairsWellWith: ['eas-update', 'eas-observe', 'eas-workflows'],
    spotlight: {
      title: {
        id: 'Hanya Membaca, Tidak Me-rollback',
        en: 'Read-Only, Not a Rollback Tool',
      },
      body: {
        id: 'Skill ini membuat metrik kesehatan EAS Update terbaca dari terminal dalam bentuk manusia dan JSON, sehingga cocok untuk gating CI. Ia tidak memuat kontrol rollback; yang ada hanya query `update:insights` / `channel:insights`.',
        en: 'The skill makes EAS Update health metrics readable from the terminal in human and JSON form, which suits CI gating. It contains no rollback controls; it only has the `update:insights` / `channel:insights` queries.',
      },
    },
    sourcePath: 'plugins/expo/skills/eas-update-insights/SKILL.md',
  },
  {
    name: 'eas-simulator',
    category: 'services',
    invocation: 'model',
    description: {
      id: 'Menjalankan dan mengendalikan app di simulator iOS / emulator Android jarak jauh di cloud EAS (`eas simulator:*`): dari CLI atau agent, dengan preview browser live (iOS saja). Eksperimental, akses terbatas.',
      en: 'Run and control your app on a remote iOS simulator or Android emulator on EAS cloud (`eas simulator:*`): from the CLI or an agent, with a live browser preview (iOS only). Experimental, limited access.',
    },
    detailedDescription: {
      id: 'Untuk lingkungan yang tidak bisa menjalankan simulator lokal (Linux, CI, sandbox cloud) dan agar agent dapat memverifikasi perubahan di perangkat sungguhan. Alur inti: `simulator:start` → install app → drive lewat `simulator:exec` dengan `agent-device` (open, snapshot, press, screenshot) → `simulator:stop`. Perintah `simulator:*` eksperimental dan tersembunyi; `--help` adalah acuan otoritatif.',
      en: 'For environments that cannot run a simulator locally (Linux, CI, cloud sandboxes) and for letting an agent verify a change on a real device. Core loop: `simulator:start` → install the app → drive via `simulator:exec` with `agent-device` (open, snapshot, press, screenshot) → `simulator:stop`. The `simulator:*` commands are experimental and hidden; `--help` is authoritative.',
    },
    useWhen: {
      id: [
        'Host tanpa simulator lokal (Linux, headless CI, sandbox cloud) tetapi butuh perangkat iOS, atau agent perlu mengklik app dan screenshot.',
        'Meminta simulator cloud/remote/shareable, versi iOS yang tidak tersedia lokal, atau stream simulator ke browser.',
      ],
      en: [
        'A host without a local simulator (Linux, headless CI, cloud sandbox) that needs an iOS device, or an agent that must click through an app and screenshot it.',
        'Requesting a cloud/remote/shareable simulator, an iOS version unavailable locally, or streaming a simulator to the browser.',
      ],
    },
    avoidWhen: {
      id: [
        'Simulator lokal (`expo run:ios`, Xcode, Android Studio), EAS Build/Update, preview web, atau perangkat fisik. Di macOS, "jalankan di simulator" biasa tidak memicu skill ini.',
        'Memulai sesi sebelum memeriksa akses: jalankan `simulator:availability --json` — fitur ini akses terbatas dan belum aktif di semua akun.',
      ],
      en: [
        'Local simulators (`expo run:ios`, Xcode, Android Studio), EAS Build/Update, web preview, or physical devices. On macOS a plain "run on the simulator" does not trigger this skill.',
        'Starting a session before checking access: run `simulator:availability --json` — this is a limited-access feature not enabled on every account.',
      ],
    },
    howItWorks: {
      id: [
        'Semua perintah via `npx --yes eas-cli@latest ...`; autentikasi dengan `eas login` atau `EXPO_TOKEN` untuk sandbox/CI.',
        'Mulai sesi dengan `--name` deskriptif; install app sesuai mode (A: build release lokal, B: build EAS eksplisit, C: dev build + tunnel untuk live edit — default).',
        'Kendalikan perangkat lewat `agent-device` (`snapshot -i`, `press @e2`, `screenshot`); hentikan sesi dan reset `.env.eas-simulator` setelah selesai.',
      ],
      en: [
        'Run every command via `npx --yes eas-cli@latest ...`; authenticate with `eas login` or `EXPO_TOKEN` for sandbox/CI.',
        'Start a session with a descriptive `--name`; install the app per mode (A: local release build, B: explicit EAS build, C: dev build + tunnel for live edits — the default).',
        'Drive the device through `agent-device` (`snapshot -i`, `press @e2`, `screenshot`); stop the session and reset `.env.eas-simulator` when done.',
      ],
    },
    coreRules: {
      id: [
        'Pastikan ground truth lalu reset, jangan patch-loop: cek cwd, sesi `IN_PROGRESS` lewat `simulator:get --json`, Metro di port sendiri, dan jenis build sesuai tujuan (release build tidak bisa live-reload).',
        '`.env.eas-simulator` berisi token sesi — jaga agar masuk .gitignore. `webPreviewUrl` untuk browser pengguna dan tidak boleh dibuka di simulator.',
        'Hentikan sesi yang Anda buat; hanya aktivitas via `agent-device`/`argent` yang mereset idle timer; gunakan `--max-duration-minutes` bila didukung.',
      ],
      en: [
        'Establish ground truth, then reset — no patch-loop: check cwd, the session is `IN_PROGRESS` via `simulator:get --json`, Metro on its own port, and a build type that fits the goal (a release build cannot live-reload).',
        '`.env.eas-simulator` holds a session token — keep it gitignored. The `webPreviewUrl` is for the user\'s browser and must never be opened on the sim.',
        'Stop sessions you created; only `agent-device`/`argent` activity resets the idle timer; use `--max-duration-minutes` when supported.',
      ],
    },
    tips: {
      id: [
        'Selalu beri nama sesi yang menjelaskan tujuannya ("Checkout flow screenshots") agar daftar sesi di expo.dev mudah dibaca.',
        'Perintah memakai gaya shell POSIX; di Windows gunakan WSL atau Git Bash.',
      ],
      en: [
        'Always name sessions for their purpose ("Checkout flow screenshots") so the session list on expo.dev stays readable.',
        'The command blocks assume a POSIX shell; on Windows use WSL or Git Bash.',
      ],
    },
    pairsWellWith: ['eas-app-stores', 'expo-dev-client', 'eas-update'],
    spotlight: {
      title: {
        id: 'Eksperimental dan Hanya iOS untuk Preview Live',
        en: 'Experimental, With iOS-Only Live Preview',
      },
      body: {
        id: 'Perintah `simulator:*` eksperimental dan tersembunyi, dan fitur ini berakses terbatas. Preview browser live hanya tersedia untuk iOS (per README upstream); `webPreviewUrl` diserahkan ke pengguna, bukan dibuka agent.',
        en: 'The `simulator:*` commands are experimental and hidden, and the feature has limited access. The live browser preview is iOS only (per the upstream README); the `webPreviewUrl` is handed to the user, not opened by the agent.',
      },
    },
    sourcePath: 'plugins/expo/skills/eas-simulator/SKILL.md',
  },
  {
    name: 'expo-migrate-module',
    category: 'experimental',
    invocation: 'model',
    description: {
      id: 'Memigrasi modul native Expo Apple/Swift dari DSL definisi Expo Modules API 1.0 ke API makro 2.0 (`@ExpoModule`, `@JS`, `@Event`, `@SharedObject`, `@Record`), menjaga kontrak JS/TS. Eksperimental; plugin `expo-experiments`.',
      en: 'Migrates an existing Apple/Swift Expo native module from the Expo Modules API 1.0 definition DSL to the 2.0 macro API (`@ExpoModule`, `@JS`, `@Event`, `@SharedObject`, `@Record`), preserving the JS/TS contract. Experimental; `expo-experiments` plugin.',
    },
    detailedDescription: {
      id: 'Arah migrasi: DARI `ModuleDefinition` DSL (1.0) KE makro (2.0), hanya sisi Swift; Kotlin tetap di DSL 1.0 kecuali diminta. Prasyarat `expo` 57.0.21 atau lebih baru. SDK 57 mengirim makro sebagai eksperimental dan tidak terdokumentasi (beta resmi di SDK 58), jadi utamakan mixed mode inkremental. Skill ini ada di plugin terpisah `expo-experiments`.',
      en: 'Migration direction: FROM the `ModuleDefinition` DSL (1.0) TO macros (2.0), Swift side only; Kotlin stays on the 1.0 DSL unless asked. Requires `expo` 57.0.21 or newer. SDK 57 ships the macros as experimental and undocumented (official beta in SDK 58), so prefer incremental mixed mode. This skill lives in the separate `expo-experiments` plugin.',
    },
    useWhen: {
      id: [
        'Mengonversi atau mengadopsi secara bertahap `@ExpoModule`, `@JS`, `@Event`, `@SharedObject`, atau `@Record` pada modul Swift yang sudah ada.',
        'Memigrasi satu grup semantik sekali jalan (nama modul, fungsi, properti/konstanta, event, shared object, record).',
      ],
      en: [
        'Converting or incrementally adopting `@ExpoModule`, `@JS`, `@Event`, `@SharedObject` or `@Record` in an existing Swift module.',
        'Migrating one semantic group at a time (module naming, functions, properties/constants, events, shared objects, records).',
      ],
    },
    avoidWhen: {
      id: [
        'Membuat modul baru (`expo-module`), upgrade SDK umum (`expo-upgrade`), atau migrasi Android/Kotlin.',
        'Target `expo` di bawah 57.0.21 — berhenti dan minta pengguna upgrade dulu (cek juga `package.json` example app).',
      ],
      en: [
        'Creating a new module (`expo-module`), general SDK upgrades (`expo-upgrade`), or Android/Kotlin migration.',
        'Targeting `expo` below 57.0.21 — stop and ask the user to upgrade first (check the example app\'s `package.json` too).',
      ],
    },
    howItWorks: {
      id: [
        'Tetapkan kontrak: inventarisasi nama JS, arity, default, nullability, sync/async, error, event wire name, field record, dan hook lifecycle; anggap permukaan JS/TS sebagai kontrak kompatibilitas.',
        'Verifikasi permukaan 2.0 yang tersedia di dependency yang dipakai, lalu klasifikasikan tiap item: Migrate, Keep in DSL, atau Blocked.',
        'Terapkan per grup dengan diff sempit dan cari sisa entri DSL setelah tiap grup; bila ada item Blocked, tanya pengguna: co-exist (mixed mode) atau berhenti.',
      ],
      en: [
        'Establish the contract: inventory JS names, arity, defaults, nullability, sync/async, errors, event wire names, record fields and lifecycle hooks; treat the JS/TS surface as the compatibility contract.',
        'Verify the 2.0 surface in the dependency actually used, then classify each item: Migrate, Keep in DSL, or Blocked.',
        'Apply group by group with a narrow diff and search for leftover DSL entries after each; for Blocked items ask the user: co-exist (mixed mode) or stop.',
      ],
    },
    coreRules: {
      id: [
        'Pertahankan setiap nama yang terlihat dari JS secara eksplisit dan jangan "memperbaiki" requiredness atau nama event saat migrasi sintaks.',
        'Jaga perilaku threading async: `async` `@JS` mulai di JS thread dan baru keluar pada `await` pertama — body yang tak pernah await memblokir JS thread; audit atau gunakan `@JS(.concurrent)`.',
        'Pertahankan `expo-module.config.json` mendaftar setiap kelas modul di `apple.modules`; kelas yang dimigrasi harus tetap `public` atau `open`.',
        'Jangan menulis simbol hasil generate makro ke source modul, dan jangan ubah Kotlin, wrapper JS, atau `.d.ts` publik tanpa permintaan.',
      ],
      en: [
        'Preserve every JS-visible name explicitly and do not silently "improve" requiredness or event names during a syntax migration.',
        'Preserve async threading: an `async` `@JS` member starts on the JS thread and leaves only at the first `await` — a body that never awaits blocks it; audit or use `@JS(.concurrent)`.',
        'Keep `expo-module.config.json` listing every module class under `apple.modules`; a migrated class must stay `public` or `open`.',
        'Never write macro-generated symbols into the module source, and do not change Kotlin, JS wrappers or public `.d.ts` without a request.',
      ],
    },
    tips: {
      id: [
        'Baca `references/migration-map.md` sebelum mengubah source; `example.md` memberi walkthrough before/after dari mixed mode hingga migrasi penuh; `compatibility.md` untuk memeriksa permukaan makro sebenarnya.',
        'Beritahu pengguna bahwa makro masih eksperimental sebelum migrasi besar.',
      ],
      en: [
        'Read `references/migration-map.md` before changing source; `example.md` is a before/after walkthrough from mixed mode to full migration; `compatibility.md` verifies the real macro surface.',
        'Tell the user the macros are still experimental before a large migration.',
      ],
    },
    pairsWellWith: ['expo-module', 'expo-upgrade'],
    spotlight: {
      title: {
        id: 'Arah Migrasi: DSL 1.0 → Makro 2.0',
        en: 'Migration Direction: 1.0 DSL → 2.0 Macros',
      },
      body: {
        id: 'Skill ini memigrasi dari blok `definition()` / `ModuleDefinition` DSL (1.0) ke makro Swift (2.0: `@ExpoModule`, `@JS`, `@Event`, `@SharedObject`, `@Record`) — bukan sebaliknya, dan bukan dari "arsitektur legacy". Hanya sisi Swift; Kotlin tetap di DSL 1.0. Skill ini bagian dari plugin `expo-experiments` yang opt-in.',
        en: 'This skill migrates from the `definition()` / `ModuleDefinition` DSL (1.0) to Swift macros (2.0: `@ExpoModule`, `@JS`, `@Event`, `@SharedObject`, `@Record`) — not the other way round, and not from a "legacy architecture". Swift only; Kotlin stays on the 1.0 DSL. It belongs to the opt-in `expo-experiments` plugin.',
      },
    },
    sourcePath: 'plugins/expo-experiments/skills/expo-migrate-module/SKILL.md',
  },
]
