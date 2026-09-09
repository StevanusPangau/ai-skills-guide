import type { BilingualString, BilingualList } from '@/types/skill'

export const VERCEL_SOURCE_REPO = 'github.com/vercel-labs/agent-skills'
export const VERCEL_SOURCE_SHA = '063bee94c3f4df8453406c830b0a7df0f2860278'
export const SOURCE_REPO = VERCEL_SOURCE_REPO
export const SOURCE_SHA = VERCEL_SOURCE_SHA

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
  /** Section khusus unik per skill — hanya dirender bila ada. */
  spotlight?: {
    title: BilingualString
    body: BilingualString
  }
}

export const vercelSkills: RichSkill[] = [
  {
    name: 'vercel-composition-patterns',
    category: 'react-architecture',
    invocation: 'model',
    description: {
      id: 'Pola komposisi React yang scalable: hilangkan proliferasi boolean prop dengan compound components, lifting state, dan komposisi internal.',
      en: 'Scalable React composition patterns: kill boolean prop proliferation with compound components, lifted state, and composed internals.',
    },
    detailedDescription: {
      id: 'Skill ini berisi panduan arsitektur komponen Vercel yang tersusun berdasarkan prioritas: component architecture (HIGH), state management, implementation patterns, dan React 19 APIs. Aturan intinya architecture-avoid-boolean-prop mencegah komponen meledak jadi kombinasi isThread/isEditing/isDMThread, lalu digantikan compound components dengan shared context. Interface context generik (state, actions, meta) membuat state dependency-injectable sehingga UI yang sama bisa dipakai provider lokal maupun global, dan aturan react19-no-forwardref menghapus forwardRef serta memakai use() alih-alih useContext() di React 19.',
      en: 'This skill packages Vercel\'s component architecture guidance, prioritized into component architecture (HIGH), state management, implementation patterns, and React 19 APIs. The core rule architecture-avoid-boolean-props stops components from exploding into isThread/isEditing/isDMThread combinations, replaced by compound components with a shared context. A generic context interface (state, actions, meta) makes state dependency-injectable so the same UI works with local or global providers, and react19-no-forwardref drops forwardRef in favor of ref-as-prop and use() instead of useContext() on React 19.',
    },
    useWhen: {
      id: ['Merefaktor komponen yang menumpuk boolean prop (isEditing, isDMThread, dan lainnya).', 'Membangun component library reusable atau merancang API komponen yang fleksibel.', 'Menstrukturkan compound components dengan context provider bersama.'],
      en: ['Refactoring components drowning in boolean props (isEditing, isDMThread, etc.).', 'Building reusable component libraries or designing flexible component APIs.', 'Structuring compound components around a shared context provider.'],
    },
    avoidWhen: {
      id: ['Komponen daun sederhana satu-dua varian yang tidak akan pernah bertumbuh.', 'Codebase masih di React 18 untuk aturan react19 (bagian itu boleh dilewati).'],
      en: ['Simple one-off leaf components with one or two variants that will never grow.', 'React 18 codebases for the react19 rules (that section is explicitly skippable).'],
    },
    howItWorks: {
      id: ['Audit komponen bermasalah: hitung boolean prop dan conditional render yang muncul akibatnya.', 'Pecah menjadi compound components (Composer.Frame, Composer.Input, Composer.Footer) dengan state dibagikan lewat context.', 'Definisikan interface context generik state/actions/meta, dan angkat state ke provider agar komponen di luar frame tetap bisa mengaksesnya.', 'Di React 19, terima ref sebagai prop biasa dan pakai use() untuk membaca context.'],
      en: ['Audit the offending component: count boolean props and the conditional rendering they force.', 'Split it into compound components (Composer.Frame, Composer.Input, Composer.Footer) sharing state via context.', 'Define a generic state/actions/meta context interface and lift state into a provider so siblings outside the frame can still access it.', 'On React 19, accept ref as a regular prop and read context with use().'],
    },
    coreRules: {
      id: ['Jangan pernah menambah boolean prop untuk memvariasikan perilaku; gunakan komposisi.', 'Provider adalah satu-satunya tempat yang tahu bagaimana state dikelola; UI hanya bergantung pada interface context.', 'Utamakan komposisi children daripada render props untuk menyusun struktur statis.'],
      en: ['Never add boolean props to vary behavior; compose instead.', 'The provider is the only place that knows how state is managed; UI depends only on the context interface.', 'Prefer composing children over render props for static structure.'],
    },
    tips: {
      id: ['Buat komponen varian eksplisit (ThreadComposer, EditComposer) agar kode mendokumentasikan dirinya sendiri.', 'Render props tetap tepat saat parent perlu mengalirkan data kembali (mis. renderItem dengan item dan index).'],
      en: ['Create explicit variant components (ThreadComposer, EditComposer) so code documents itself.', 'Render props remain appropriate when the parent must feed data back (e.g. renderItem receiving item and index).'],
    },
    pairsWellWith: ['vercel-react-best-practices', 'web-design-guidelines'],
    spotlight: {
      title: { id: 'Komposisi React yang Tahan Perubahan', en: 'React Composition That Scales' },
      body: { id: 'Hindari boolean props yang menumpuk; pilih compound components, state-context interface, dan children over render props agar API komponen tetap fleksibel. Pastikan prasyaratnya sesuai: pola ini memanfaatkan React 19, sementara React 18 memerlukan pendekatan kompatibel yang dijelaskan sumber.', en: 'Avoid accumulating boolean props; use compound components, a state-context interface, and children over render props to keep component APIs flexible. Check the prerequisite first: these patterns target React 19, while React 18 needs the compatibility approach described in the source.' },
    },
    sourcePath: 'skills/composition-patterns/SKILL.md',
  },
  {
    name: 'vercel-react-best-practices',
    category: 'react-performance',
    invocation: 'model',
    description: {
      id: 'Panduan optimasi performa React dan Next.js dari Vercel Engineering: puluhan aturan dalam 8 kategori (SKILL.md menyebut 70; kompilasi AGENTS.md 40+), diurutkan dari waterfalls hingga advanced patterns.',
      en: 'React and Next.js performance guidelines from Vercel Engineering: dozens of rules across 8 categories (SKILL.md cites 70; the compiled AGENTS.md lists 40+), ranked from waterfalls to advanced patterns.',
    },
    detailedDescription: {
      id: 'Skill ini adalah referensi optimasi performa paling lengkap di koleksi, disusun Vercel Engineering berdasarkan impact: Eliminating Waterfalls (CRITICAL, naikkan paralelisme dengan Promise.all dan async-defer-await), Bundle Size (CRITICAL, hindari barrel file imports dan lazy-load komponen berat via next/dynamic), Server-Side Performance (React.cache() untuk deduplikasi per-request, after() untuk logging non-blocking), hingga Re-render Optimization (turunkan state berlebih, derive saat render, startTransition dan useDeferredValue). Setiap aturan punya file terpisah berisi contoh incorrect vs correct sehingga agen bisa langsung menerapkannya saat refactor.',
      en: 'The most comprehensive performance reference in the collection, authored by Vercel Engineering and ranked by impact: Eliminating Waterfalls (CRITICAL, maximize parallelism with Promise.all and async-defer-await), Bundle Size (CRITICAL, avoid barrel file imports and lazy-load heavy components via next/dynamic), Server-Side Performance (React.cache() for per-request deduplication, after() for non-blocking logging), through Re-render Optimization (drop redundant state, derive during render, startTransition and useDeferredValue). Each rule ships as its own file with incorrect vs correct examples so agents can apply it directly during refactors.',
    },
    useWhen: {
      id: ['Menulis komponen React atau halaman Next.js baru sejak awal.', 'Mengimplementasikan data fetching client maupun server-side.', 'Mengoptimalkan bundle size, waktu load, atau me-review kode untuk masalah performa.'],
      en: ['Writing new React components or Next.js pages from scratch.', 'Implementing client or server-side data fetching.', 'Optimizing bundle size, load times, or reviewing code for performance issues.'],
    },
    avoidWhen: {
      id: ['Proyek non-React/non-Next.js (mis. Svelte, Vue) yang pola aturannya tidak berlaku.', 'Refactor mikro tanpa konteks profil; ukur dulu sebelum mengutak-atik hot path.'],
      en: ['Non-React/non-Next.js projects (e.g. Svelte, Vue) where the rules do not apply.', 'Micro-refactors without profiling context; measure before touching hot paths.'],
    },
    howItWorks: {
      id: ['Petakan kode terhadap 8 kategori aturan berdasarkan prioritas impact, mulai dari waterfalls dan bundle size.', 'Basmi waterfall berurutan: awali operasi independen bersamaan lewat Promise.all atau better-all, dan pindahkan await ke cabang yang benar-benar memakainya.', 'Pangkas bundle: hindari barrel imports (lucide-react, @mui/material), dynamic import komponen berat, dan tunda pustaka pihak ketiga sampai setelah hidrasi.', 'Rapikan sisi client/server: deduplikasi dengan React.cache() dan SWR, minimalkan serialisasi props RSC, dan optimasi re-render dengan derived state serta memo.'],
      en: ['Map the code against 8 impact-prioritized rule categories, starting with waterfalls and bundle size.', 'Eliminate sequential waterfalls: start independent operations concurrently via Promise.all or better-all, and move awaits into the branches that actually use them.', 'Trim the bundle: avoid barrel imports (lucide-react, @mui/material), dynamic-import heavy components, and defer third-party libraries until after hydration.', 'Clean up client/server: deduplicate with React.cache() and SWR, minimize RSC prop serialization, and tame re-renders with derived state and memo.'],
    },
    coreRules: {
      id: ['Waterfall adalah killer performa nomor satu: operasi async independen wajib berjalan paralel (sumber mengklaim 2-10x pada workload yang cocok — ukur di workload sendiri).', 'Server Actions diautentikasi seperti API route karena bisa dipanggil langsung sebagai endpoint publik.', 'Jangan membungkus ekspresi sederhana berresult primitif dalam useMemo; overhead hook bisa melebihi hitungannya.'],
      en: ['Waterfalls are the #1 performance killer: independent async operations must run in parallel (source claims 2-10x on suitable workloads — measure on your own).', 'Authenticate Server Actions like API routes since they are exposed as public endpoints.', 'Do not wrap simple primitive-result expressions in useMemo; hook overhead can exceed the computation.'],
    },
    tips: {
      id: ['Di Next.js 13.5+, biarkan import barrel biasa; optimizePackageImports mengubahnya jadi direct import tanpa kehilangan type safety (verifikasi terhadap versi Next.js yang dipakai, aturan ini tidak tercantum di SKILL.md).', 'Ingat React.cache() hanya berlaku per-request; untuk cache lintas-request pakai LRU cache, efektif di Fluid Compute karena instance shared.'],
      en: ['On Next.js 13.5+, keep plain barrel imports; optimizePackageImports rewrites them to direct imports without losing type safety (verify against your Next.js version — this rule is not in SKILL.md).', 'Remember React.cache() is per-request only; use an LRU cache across requests, especially effective on Fluid Compute with shared instances.'],
    },
    pairsWellWith: ['vercel-composition-patterns', 'vercel-optimize', 'vercel-react-view-transitions'],
    spotlight: {
      title: { id: 'Aturan Kinerja React yang Terukur', en: 'Measured React Performance Rules' },
      body: { id: 'Setiap aturan dapat ditelusuri ke rules/*.md yang memuat contoh incorrect/correct dan dipandu oleh AGENTS.md. Mulai dari async-cheap-condition-before-await, gunakan async-dependencies dengan Promise.all saat dependensi memungkinkan, dan letakkan server-after-nonblocking setelah pekerjaan non-blocking.', en: 'Each rule is traceable to a rules/*.md file with incorrect/correct examples and is governed by AGENTS.md. Start with async-cheap-condition-before-await, use async-dependencies with Promise.all when dependencies allow it, and place server-after-nonblocking work after non-blocking operations.' },
    },
    sourcePath: 'skills/react-best-practices/SKILL.md',
  },
  {
    name: 'vercel-react-native-skills',
    category: 'react-native',
    invocation: 'model',
    description: {
      id: 'Best practices React Native dan Expo untuk aplikasi mobile yang performen: list virtualization, animasi GPU, navigasi native, dan pola UI platform.',
      en: 'React Native and Expo best practices for performant mobile apps: list virtualization, GPU animations, native navigation, and platform UI patterns.',
    },
    detailedDescription: {
      id: 'Panduan resmi Vercel untuk React Native/Expo dengan kategori berprioritas: List Performance (CRITICAL menurut SKILL.md; kompilasi AGENTS.md menempatkan Core Rendering sebagai CRITICAL dan List sebagai HIGH — virtualisasi dengan LegendList/FlashList, referensi objek stabil, props primitif agar memo() bekerja), Animation (hanya transform dan opacity yang GPU-accelerated, gunakan useDerivedValue dan GestureDetector dengan worklet UI thread), Navigation (native stack dan native tabs di atas navigator berbasis JS), hingga aturan rendering kritis seperti melarang {value && <Component/>} ketika value bisa falsy (crash di production) dan mewajibkan string dibungkus <Text>. Mencakup juga monorepo, fonts via config plugins, dan kompatibilitas React Compiler.',
      en: 'Vercel\'s official React Native/Expo guide with prioritized categories: List Performance (CRITICAL, virtualize with LegendList/FlashList, keep object references stable, pass primitive props so memo() works), Animation (only transform and opacity are GPU-accelerated; use useDerivedValue and GestureDetector with UI-thread worklets), Navigation (native stack and native tabs over JS navigators), plus critical rendering rules like banning {value && <Component/>} when value can be falsy (production crash) and requiring strings wrapped in <Text>. Also covers monorepos, fonts via config plugins, and React Compiler compatibility.',
    },
    useWhen: {
      id: ['Membangun atau merefaktor aplikasi React Native dan Expo.', 'Mengoptimalkan performa list panjang, scroll, atau animasi Reanimated.', 'Mengonfigurasi native modules, fonts, atau struktur monorepo dengan dependensi native.'],
      en: ['Building or refactoring React Native and Expo apps.', 'Optimizing long lists, scroll performance, or Reanimated animations.', 'Configuring native modules, fonts, or monorepo structure with native dependencies.'],
    },
    avoidWhen: {
      id: ['Aplikasi web React murni; gunakan vercel-react-best-practices sebagai gantinya.', 'Keputusan bisnis native non-React Native (Swift/Kotlin penuh) di luar cakupan skill ini.'],
      en: ['Pure web React apps; use vercel-react-best-practices instead.', 'Fully native non-React Native decisions (Swift/Kotlin) outside this skill\'s scope.'],
    },
    howItWorks: {
      id: ['Klasifikasi masalah ke kategori aturan: list performance, animation, navigation, UI patterns, state, rendering, monorepo, atau configuration.', 'Ganti ScrollView+map dengan virtualizer (LegendList atau FlashList) dan jaga referensi item stabil agar hanya item berubah yang dirender ulang.', 'Batasi animasi ke transform dan opacity, simpan state gesture sebagai ground truth (pressed), lalu turunkan visual via interpolate.', 'Gunakan navigator native (native-stack, native tabs), expo-image untuk gambar, dan modals/menus native agar UI terasa platform asli.'],
      en: ['Classify the issue into a rule category: list performance, animation, navigation, UI patterns, state, rendering, monorepo, or configuration.', 'Replace ScrollView+map with a virtualizer (LegendList or FlashList) and keep item references stable so only changed items re-render.', 'Constrain animations to transform and opacity, store gesture state as ground truth (pressed), and derive visuals via interpolate.', 'Use native navigators (native-stack, native tabs), expo-image for images, and native modals/menus so UI feels platform-native.'],
    },
    coreRules: {
      id: ['Semua list memakai virtualizer; ScrollView merender seluruh children sekaligus dan cepat mahal.', 'Larang {value && <Component/>} untuk nilai yang bisa 0 atau string kosong; React Native mencoba merendernya di luar <Text> dan crash.', 'Jangan pernah menyimpan posisi scroll di useState; pakai shared value Reanimated atau ref agar tidak terjadi render thrashing.'],
      en: ['Every list uses a virtualizer; ScrollView mounts all children upfront and gets expensive fast.', 'Ban {value && <Component/>} for values that can be 0 or empty string; React Native renders them outside <Text> and crashes.', 'Never track scroll position in useState; use a Reanimated shared value or ref to avoid render thrashing.'],
    },
    tips: {
      id: ['Kirim props primitif (id, name, isActive) ke list item agar perbandingan shallow memo() efektif; turunkan gaya di dalam child.', 'Dengan React Compiler aktif, destructure fungsi di awal render dan pakai .get()/.set() untuk Reanimated shared values, bukan .value.'],
      en: ['Pass primitive props (id, name, isActive) to list items so memo() shallow comparison works; derive styles inside the child.', 'With React Compiler enabled, destructure functions early in render and use .get()/.set() on Reanimated shared values instead of .value.'],
    },
    pairsWellWith: ['vercel-react-best-practices', 'vercel-composition-patterns'],
    spotlight: {
      title: { id: 'React Native Tanpa Crash Rendering', en: 'Crash-Resistant React Native Rendering' },
      body: { id: 'Jangan merender nilai falsy secara langsung, dan bungkus teks di dalam Text agar aturan rendering-no-falsy-and serta rendering-text-in-text-component terpenuhi. Untuk font, gunakan Expo config plugin lalu jalankan npx expo prebuild agar konfigurasi native diterapkan.', en: 'Do not render falsy values directly, and wrap text inside Text to satisfy rendering-no-falsy-and and rendering-text-in-text-component. For fonts, use the Expo config plugin and then run npx expo prebuild so the native configuration is applied.' },
    },
    sourcePath: 'skills/react-native-skills/SKILL.md',
  },
  {
    name: 'vercel-react-view-transitions',
    category: 'animation',
    invocation: 'model',
    description: {
      id: 'Animasi antar state UI yang terasa native memakai View Transition API React: komponen <ViewTransition>, addTransitionType, dan pseudo-element CSS.',
      en: 'Native-feeling UI state animations with React\'s View Transition API: the <ViewTransition> component, addTransitionType, and CSS pseudo-elements.',
    },
    detailedDescription: {
      id: 'Skill ini memandu animasi transisi tanpa library pihak ketiga: deklarasikan apa yang dianimasikan dengan <ViewTransition>, picu kapan dengan startTransition/useDeferredValue/Suspense (setState biasa tidak menganimasikan), dan kendalikan bagaimana lewat CSS class pada pseudo-element ::view-transition-*. Pola diurutkan berdasarkan makna: shared element (name) untuk "benda yang sama makin dalam", Suspense reveal, list identity per-item key, enter/exit untuk state change, dan route change dengan slide directional nav-forward/nav-back via addTransitionType. Di Next.js App Router bekerja out of the box karena App Router membundel React canary (aplikasi non-Next.js memerlukan react@canary dan react-dom@canary); browser yang tidak mendukung graceful degradation tanpa animasi.',
      en: 'This skill guides transition animations without third-party libraries: declare what with <ViewTransition>, trigger when with startTransition/useDeferredValue/Suspense (plain setState never animates), and control how via CSS classes on ::view-transition-* pseudo-elements. Patterns are ordered by meaning: shared element (name) for "same thing, going deeper", Suspense reveals, per-item list identity keys, enter/exit state changes, and route changes with directional nav-forward/nav-back slides via addTransitionType. It works out of the box in the Next.js App Router because the App Router bundles React canary (non-Next.js apps need react@canary and react-dom@canary); unsupported browsers degrade gracefully.',
    },
    useWhen: {
      id: ['Menambahkan transisi halaman atau animasi antar route terasa native.', 'Membuat shared element morph (thumbnail list membesar jadi gambar detail).', 'Menganimasikan reveal Suspense, reorder list, atau enter/exit komponen tanpa library animasi eksternal.'],
      en: ['Adding native-feeling page or route-change transitions.', 'Creating shared element morphs (a list thumbnail growing into the detail image).', 'Animating Suspense reveals, list reorders, or component enter/exit without external animation libraries.'],
    },
    avoidWhen: {
      id: ['Aplikasi wajib beranimasi di browser lama; dukungan butuh Chromium 125+, Firefox 144+, Safari 18.2+.', 'Animasi tanpa makna spasial atau kontinuitas yang jelas; skill ini melarang menambah <ViewTransition> tanpa alasan komunikatif.'],
      en: ['Apps that must animate on legacy browsers; support requires Chromium 125+, Firefox 144+, Safari 18.2+.', 'Animations with no spatial meaning or continuity; the skill forbids adding <ViewTransition> without a communicative reason.'],
    },
    howItWorks: {
      id: ['Audit aplikasi: petakan semua Link/router.push, boundary Suspense, elemen persisten, dan elemen visual bersama antar halaman.', 'Tambahkan CSS recipes (fade, slide directional, morph) plus aturan prefers-reduced-motion ke stylesheet global.', 'Bungkus halaman dengan <ViewTransition> type-keyed untuk slide nav-forward/nav-back, pasang reveal Suspense dengan string props, dan beri name unik (photo-${id}) untuk shared element.', 'Verifikasi tiap jalur navigasi: pasangan shared element terbentuk, default="none" tidak memblokir animasi yang diinginkan, dan elemen persisten tetap diam.'],
      en: ['Audit the app: map every Link/router.push, Suspense boundary, persistent element, and visual element shared across pages.', 'Add the CSS recipes (fade, directional slide, morph) plus prefers-reduced-motion rules to the global stylesheet.', 'Wrap pages in type-keyed <ViewTransition>s for nav-forward/nav-back slides, add Suspense reveals with string props, and give shared elements unique names (photo-${id}).', 'Verify each navigation path: shared pairs form, default="none" does not block wanted animations, and persistent elements stay still.'],
    },
    coreRules: {
      id: ['Jangan pernah memanggil document.startViewTransition sendiri; React yang mengelolanya di balik <ViewTransition>.', 'Setiap <ViewTransition> wajib mengomunikasikan relasi spasial atau kontinuitas; jika tidak bisa diartikulasikan, jangan ditambahkan.', 'Gunakan default="none" secara disiplin pada shared/page VT agar cross-fade browser tidak menyala di setiap transisi dan revalidasi.'],
      en: ['Never call document.startViewTransition yourself; React drives it behind <ViewTransition>.', 'Every <ViewTransition> must communicate a spatial relationship or continuity; if you cannot articulate it, do not add it.', 'Use default="none" deliberately on shared/page VTs so the browser cross-fade does not fire on every transition and revalidation.'],
    },
    tips: {
      id: ['Object type map (enter/exit/share) wajib punya key default untuk TypeScript; router.back() tidak membawa transition types, jadi animasi typed hanya jalan via router.push().', 'Untuk shared element di dalam list item, pakai dua boundary nested: VT luar ber-key untuk list identity, VT dalam ber-name untuk morph antar route.'],
      en: ['Type-map objects (enter/exit/share) require a default key for TypeScript; router.back() carries no transition types, so typed animations only fire via router.push().', 'For shared elements inside list items, use two nested boundaries: an outer keyed VT for list identity, an inner named VT for the cross-route morph.'],
    },
    pairsWellWith: ['vercel-react-best-practices', 'vercel-composition-patterns'],
    spotlight: {
      title: { id: 'ViewTransition dengan Aksesibilitas Aman', en: 'Accessible ViewTransition Boundaries' },
      body: { id: 'Tempatkan <ViewTransition> sebelum DOM node yang ingin dianimasikan, bukan sesudahnya. Navigasi melalui router.back atau tombol browser tidak memakai transition types, dan setiap transisi wajib menghormati prefers-reduced-motion.', en: 'Place <ViewTransition> before the DOM node you want to animate, not after it. Navigation through router.back or the browser button does not use transition types, and every transition must respect prefers-reduced-motion.' },
    },
    sourcePath: 'skills/react-view-transitions/SKILL.md',
  },
  {
    name: 'deploy-to-vercel',
    category: 'deployment',
    invocation: 'user',
    description: {
      id: 'Deploy aplikasi apa pun ke Vercel: pilih metode terbaik (git push, vercel deploy, atau fallback sandbox) dan selalu preview kecuali diminta produksi.',
      en: 'Deploy any project to Vercel: pick the best method (git push, vercel deploy, or sandbox fallback) and always ship preview unless production is requested.',
    },
    detailedDescription: {
      id: 'Skill resmi Vercel untuk aksi deployment yang dipicu permintaan seperti "deploy my app" atau "push this live". Alurnya dimulai dengan empat pemeriksaan state (git remote, file link .vercel/project.json atau .vercel/repo.json, vercel whoami, daftar team), lalu memilih metode: proyek ter-link dengan git remote di-push (dengan persetujuan pengguna), proyek ter-link tanpa remote memakai vercel deploy -y --no-wait, proyek belum ter-link di-link dulu (vercel link --repo --scope lebih andal), dan sandbox tanpa auth memakai fallback script yang mengembalikan Preview URL plus Claim URL. Tujuan jangka panjangnya selalu membawa pengguna ke setup terbaik: proyek ter-link dengan git-push deploys.',
      en: 'Vercel\'s official skill for deployment actions triggered by requests like "deploy my app" or "push this live". It starts with four state checks (git remote, the .vercel/project.json or .vercel/repo.json link files, vercel whoami, team list), then picks a method: linked projects with a git remote get committed and pushed (with user approval), linked projects without a remote use vercel deploy -y --no-wait, unlinked projects link first (vercel link --repo --scope is the more reliable path), and auth-less sandboxes use a fallback script returning a Preview URL plus Claim URL. The long-term goal is always steering users to the best setup: a linked project with git-push deploys.',
    },
    useWhen: {
      id: ['Pengguna meminta "deploy my app", "deploy and give me the link", atau "push this live".', 'Menyiapkan proyek agar ter-link ke Vercel dengan deployment otomatis per git push.', 'Deploy dari sandbox (claude.ai/Codex) yang tidak bisa install atau login CLI.'],
      en: ['The user asks to "deploy my app", "deploy and give me the link", or "push this live".', 'Setting a project up linked to Vercel with automatic git-push deployments.', 'Deploying from sandboxes (claude.ai/Codex) that cannot install or authenticate the CLI.'],
    },
    avoidWhen: {
      id: ['Deploy ke production; hanya dilakukan jika pengguna memintanya secara eksplisit.', 'Direktori belum ter-link: jangan pakai vercel project inspect atau vercel ls untuk mendeteksi state karena bisa memicu prompt interaktif atau link diam-diam.'],
      en: ['Production deploys; only when the user explicitly requests them.', 'Unlinked directories: never detect state with vercel project inspect or vercel link, which can prompt interactively or silently link as a side-effect.'],
    },
    howItWorks: {
      id: ['Kumpulkan state proyek: git remote, isi .vercel/, vercel whoami, dan vercel teams list; pilih team via --scope bila perlu.', 'Tentukan metode: git push (ter-link + remote), vercel deploy -y --no-wait (ter-link saja), atau link dulu lalu deploy.', 'Untuk proyek belum ter-link, jalankan vercel link --repo --scope <team-slug> agar terhubung ke proyek Vercel yang benar.', 'Tampilkan URL deployment ke pengguna: ambil dari vercel ls --format json atau vercel inspect; fallback sandbox mengembalikan Preview URL dan Claim URL.'],
      en: ['Gather project state: git remote, .vercel/ contents, vercel whoami, and vercel teams list; pass the team via --scope when needed.', 'Choose the method: git push (linked + remote), vercel deploy -y --no-wait (linked only), or link first then deploy.', 'For unlinked projects, run vercel link --repo --scope <team-slug> so it attaches to the correct Vercel project.', 'Always surface the deployment URL: from vercel ls --format json or vercel inspect; the sandbox fallback returns a Preview URL and a Claim URL.'],
    },
    coreRules: {
      id: ['Selalu deploy sebagai preview kecuali pengguna eksplisit meminta production.', 'Jangan pernah git push tanpa persetujuan eksplisit pengguna.', 'Jangan curl atau fetch URL hasil deploy untuk verifikasi; cukup kembalikan tautannya.'],
      en: ['Always deploy as preview unless the user explicitly asks for production.', 'Never git push without the user\'s explicit approval.', 'Do not curl or fetch the deployed URL to verify; just return the link.'],
    },
    tips: {
      id: ['Gunakan --no-wait agar CLI langsung mengembalikan URL tanpa menunggu build selesai, lalu pantau dengan vercel inspect <url>.', 'Di claude.ai, jika deploy gagal karena network egress, minta pengguna menambahkan *.vercel.com ke allowed domains di pengaturan capabilities.'],
      en: ['Use --no-wait so the CLI returns the URL immediately instead of blocking on the build, then track progress with vercel inspect <url>.', 'On claude.ai, if deployment fails on network egress, ask the user to add *.vercel.com to allowed domains in capabilities settings.'],
    },
    pairsWellWith: ['vercel-cli-with-tokens', 'vercel-optimize'],
    spotlight: {
      title: { id: 'Pohon Keputusan Deploy Vercel', en: 'The Vercel Deployment Decision Tree' },
      body: { id: 'Jika proyek linked dan memiliki remote Git, gunakan git push; jika linked tanpa remote, gunakan vercel deploy; jika unlinked, link terlebih dahulu. Fallback tanpa autentikasi menghasilkan Preview URL dan Claim URL, sementara proyek dengan beberapa team memerlukan pemilihan team sebelum deploy.', en: 'If the project is linked and has a Git remote, use git push; if linked without a remote, use vercel deploy; if unlinked, link it first. The no-auth fallback returns both a Preview URL and a Claim URL, while projects with multiple teams require team selection before deployment.' },
    },
    sourcePath: 'skills/deploy-to-vercel/SKILL.md',
  },
  {
    name: 'vercel-cli-with-tokens',
    category: 'deployment',
    invocation: 'user',
    description: {
      id: 'Kelola Vercel lewat CLI dengan token-based auth (VERCEL_TOKEN di environment) tanpa vercel login interaktif.',
      en: 'Manage Vercel via the CLI with token-based auth (VERCEL_TOKEN in the environment) without interactive vercel login.',
    },
    detailedDescription: {
      id: 'Skill ini menggantikan alur vercel login interaktif untuk lingkungan non-interaktif seperti CI. Agen mencari token secara berurutan: printenv VERCEL_TOKEN, lalu .env (variabel lain yang diawali vca_ juga dikenali), dan terakhir meminta token dari pengguna (dibuat di vercel.com/account/tokens). Setelah diekspor, CLI membaca VERCEL_TOKEN secara native; VERCEL_ORG_ID dan VERCEL_PROJECT_ID yang diset berpasangan membuat CLI menarget proyek tepat tanpa .vercel/ directory. Mencakup juga quick deploy, full link flow (vercel link --repo), manajemen environment variables (vercel env add/pull), inspect deployment dengan build logs, dan manajemen domains.',
      en: 'This skill replaces interactive vercel login for non-interactive environments like CI. The agent hunts for the token in order: printenv VERCEL_TOKEN, then .env files (other variables holding vca_ tokens are recognized too), and finally asks the user (created at vercel.com/account/tokens). Once exported, the CLI reads VERCEL_TOKEN natively; setting VERCEL_ORG_ID and VERCEL_PROJECT_ID together lets the CLI target the exact project without a .vercel/ directory. It also covers quick deploys, the full link flow (vercel link --repo), environment variable management (vercel env add/pull), deployment inspection with build logs, and domains.',
    },
    useWhen: {
      id: ['Bekerja di lingkungan non-interaktif (CI, sandbox) tempat vercel login tidak memungkinkan.', 'Menjalankan "deploy to vercel" atau "add environment variables to vercel" memakai access token.', 'Menarget proyek/team tertentu via VERCEL_ORG_ID dan VERCEL_PROJECT_ID tanpa proses link.'],
      en: ['Working in non-interactive environments (CI, sandboxes) where vercel login is impossible.', 'Running "deploy to vercel" or "add environment variables to vercel" with an access token.', 'Targeting a specific project/team via VERCEL_ORG_ID and VERCEL_PROJECT_ID without linking.'],
    },
    avoidWhen: {
      id: ['Pengembangan lokal interaktif yang lebih mudah lewat vercel login biasa.', 'Proyek yang tidak berhubungan dengan Vercel sama sekali.'],
      en: ['Interactive local development better served by plain vercel login.', 'Projects with nothing to do with Vercel.'],
    },
    howItWorks: {
      id: ['Temukan token: cek printenv VERCEL_TOKEN, grep .env, kenali token berprefiks vca_, atau minta ke pengguna bila tidak ada.', 'Ekspor VERCEL_TOKEN (dan VERCEL_ORG_ID + VERCEL_PROJECT_ID bila ada) sebagai environment variable, bukan flag --token.', 'Deploy preview: vercel deploy -y --no-wait, atau link dulu dengan vercel link --repo --scope <team-slug> bila belum punya project ID.', 'Kelola lanjutan: vercel env add/pull untuk environment variables, vercel inspect --logs untuk build gagal, vercel domains add untuk domain.'],
      en: ['Find the token: check printenv VERCEL_TOKEN, grep .env, recognize vca_ prefixed tokens, or ask the user if none exists.', 'Export VERCEL_TOKEN (plus VERCEL_ORG_ID + VERCEL_PROJECT_ID when available) as environment variables, never a --token flag.', 'Deploy preview: vercel deploy -y --no-wait, or link first with vercel link --repo --scope <team-slug> when no project ID exists.', 'Manage follow-ups: vercel env add/pull for environment variables, vercel inspect --logs for failed builds, vercel domains add for domains.'],
    },
    coreRules: {
      id: ['Jangan pernah meneruskan token via flag --token; rahasia bisa bocor ke shell history dan process listing.', 'Default selalu preview deployment; production hanya bila diminta eksplisit.', 'Tanyakan dulu sebelum git push dan jangan memodifikasi file .vercel/ secara manual.'],
      en: ['Never pass the token via a --token flag; secrets leak into shell history and process listings.', 'Default to preview deployments; production only when explicitly requested.', 'Ask before git push and never modify .vercel/ files directly.'],
    },
    tips: {
      id: ['Verifikasi token dan scope dengan vercel whoami sebelum deploy; gunakan vercel whoami --scope <team-slug> bila ragu team yang aktif.', 'Pakai --format json untuk output terstruktur dan -y pada perintah yang menampilkan prompt konfirmasi agar tidak macet interaktif.'],
      en: ['Verify the token and scope with vercel whoami before deploying; use vercel whoami --scope <team-slug> when unsure which team is active.', 'Use --format json for structured output and -y on confirmation-prompting commands so nothing blocks interactively.'],
    },
    pairsWellWith: ['deploy-to-vercel', 'vercel-optimize'],
    spotlight: {
      title: { id: 'Token Vercel yang Tidak Bocor', en: 'Keep Vercel Tokens Out of the CLI' },
      body: { id: 'Simpan token di environment variable VERCEL_TOKEN, jangan meneruskannya lewat flag --token agar tidak muncul di history atau process listing. VERCEL_ORG_ID dan VERCEL_PROJECT_ID harus dipasang berpasangan, dan perubahan plan Stripe wajib dikonfirmasi sebelum dijalankan.', en: 'Store the token in the VERCEL_TOKEN environment variable; never pass it with --token, which exposes it in history or process listings. VERCEL_ORG_ID and VERCEL_PROJECT_ID must be set together, and Stripe plan changes require confirmation before execution.' },
    },
    sourcePath: 'skills/vercel-cli-with-tokens/SKILL.md',
  },
  {
    name: 'vercel-optimize',
    category: 'deployment',
    invocation: 'user',
    description: {
      id: 'Audit optimasi biaya dan performa Vercel berbasis observability: kumpulkan metrik dulu, investigasi kandidat berbasis gate deterministik, hasilkan rekomendasi berperingkat.',
      en: 'Observability-first Vercel cost and performance audit: collect metrics first, investigate gate-selected candidates, produce ranked recommendations.',
    },
    detailedDescription: {
      id: 'Skill audit paling prosedural di koleksi: ia menolak repo-wide grep sebelum signals.json terkumpul dari vercel metrics, vercel usage, dan vercel contract pada window 14 hari. Alurnya: collect-signals dan scan-codebase digabung via merge-signals, gate-investigations memilih maksimal 6 kandidat dengan diversity guardrail, deep-dive menyusun brief per kandidat (3+ brief memicu satu sub-agent per brief; host tanpa sub-agent jalan inline serial), verify-and-regen memverifikasi file dan sitasi secara mekanis, lalu render-report menghasilkan rekomendasi berperingkat dengan bukti metrik. Mendukung Next.js paling kuat, SvelteKit/Nuxt didukung, Astro terbatas; butuh Vercel CLI v53+, link direktori proyek, dan Observability Plus untuk rekomendasi route-level.',
      en: 'The most procedural audit skill in the collection: it refuses repo-wide grep until signals.json exists, built from vercel metrics, vercel usage, and vercel contract over a 14-day window. Its flow: collect-signals and scan-codebase merge into signals, gate-investigations picks at most 6 candidates with a diversity guardrail, deep-dive writes one brief per candidate (3+ briefs spawn one sub-agent per brief; hosts without sub-agents run inline serially), verify-and-regen mechanically checks files and citations, then render-report emits ranked recommendations grounded in metric evidence. Next.js is supported most strongly, SvelteKit/Nuxt are supported, Astro is limited; it needs Vercel CLI v53+, a linked project directory, and Observability Plus for route-level recommendations.',
    },
    useWhen: {
      id: ['Menurunkan tagihan Vercel (Fast Data Transfer, Function Invocations, Build Minutes).', 'Menyelidiki route yang lambat atau mahal, peluang caching, atau Core Web Vitals.', 'Minta breakdown biaya atau audit Fluid compute pada proyek yang sudah deployed dan punya traffic.'],
      en: ['Reducing the Vercel bill (Fast Data Transfer, Function Invocations, Build Minutes).', 'Investigating slow or expensive routes, caching opportunities, or Core Web Vitals.', 'Cost breakdown requests or Fluid compute audits on deployed projects with real traffic.'],
    },
    avoidWhen: {
      id: ['Proyek tidak di-deploy ke Vercel, greenfield tanpa traffic 14 hari, atau butuh general code review.', 'Pengguna tidak punya Observability Plus dan menolak audit terbatas; skill melarang fallback senyap ke mode code-only.'],
      en: ['Projects not deployed on Vercel, greenfield apps without 14 days of traffic, or general code review.', 'Users without Observability Plus who decline the limited audit; the skill forbids silently falling back to code-only mode.'],
    },
    howItWorks: {
      id: ['Collect: jalankan collect-signals.mjs dan scan-codebase.mjs dari direktori ter-link, lalu gabungkan jadi signals.json dengan scope proyek yang terverifikasi.', 'Gate: gate-investigations.mjs menentukan kandidat layak investigasi (toLaunch, platform, gated) berdasarkan bukti metrik.', 'Investigate: deep-dive memverifikasi berkas per brief; brief 3+ dikerjakan paralel oleh sub-agent dengan cakupan terikat kandidat.', 'Verify dan render: verify-and-regen memvalidasi klaim, file, dan sitasi versi framework; render-report menghasilkan laporan Markdown plus pesan akhir yang dicetak verbatim.'],
      en: ['Collect: run collect-signals.mjs and scan-codebase.mjs from the linked directory, merging into signals.json under a verified project scope.', 'Gate: gate-investigations.mjs decides which candidates merit investigation (toLaunch, platform, gated) from metric evidence.', 'Investigate: deep-dive verifies files per brief; 3+ briefs fan out to candidate-bound sub-agents in parallel.', 'Verify and render: verify-and-regen validates claims, files, and framework-version citations; render-report produces the Markdown report plus a final message printed verbatim.'],
    },
    coreRules: {
      id: ['Metrics first: rekomendasi harus dilacak ke kandidat berbasis metrik atau temuan scanner yang traffic-independent; dilarang repo-wide grep di luar cakupan kandidat.', 'Jangan pernah menaruh token auth di perintah shell (VERCEL_TOKEN=..., --token, atau Authorization header).', 'Gunakan frasa magnitudo biaya, bukan angka penghematan $N; respons yang tidak aman tetap dinamis sampai bukti membuktikan aman di-cache.'],
      en: ['Metrics first: every recommendation traces to a metric-backed candidate or a traffic-independent scanner finding; no repo-wide grep beyond candidate scope.', 'Never put auth tokens in shell commands (VERCEL_TOKEN=..., --token, or Authorization headers).', 'Use cost magnitude phrasing, never customer-facing $N savings; keep unsafe responses dynamic until evidence proves they are safe to cache.'],
    },
    tips: {
      id: ['Selalu pakai run directory baru per audit (mktemp -d) dan jangan pakai ulang brief atau report antar run.', 'Endpoint Workflow (/.well-known/workflow/v1/*) di-hard-gate sebelum investigasi; streaming dan route long-lived tidak dianggap masalah hanya karena durasinya panjang.'],
      en: ['Always use a fresh run directory per audit (mktemp -d) and never reuse briefs or reports across runs.', 'Workflow endpoints (/.well-known/workflow/v1/*) are hard-gated before investigation; streaming and long-lived routes are not problems merely for being slow.'],
    },
    pairsWellWith: ['deploy-to-vercel', 'vercel-cli-with-tokens', 'vercel-react-best-practices'],
    spotlight: {
      title: { id: 'Optimasi Vercel Berbasis Sinyal', en: 'Signal-Gated Vercel Optimization' },
      body: { id: 'Jangan membaca source sebelum signals.json tersedia dan gate deterministik memilih kandidat. Batasi kandidat default hingga enam, gunakan cost-magnitude sebagai besaran relatif—bukan angka dolar pasti—lalu hasilkan report.md dan final-message.json.', en: 'Do not inspect source files until signals.json exists and a deterministic gate selects candidates. Limit the default scope to six candidates, express cost-magnitude as a relative magnitude rather than a guaranteed dollar figure, and produce report.md plus final-message.json.' },
    },
    sourcePath: 'skills/vercel-optimize/SKILL.md',
  },
  {
    name: 'web-design-guidelines',
    category: 'design-quality',
    invocation: 'user',
    description: {
      id: 'Review kode UI terhadap Web Interface Guidelines: fetch panduan terbaru, periksa file target, laporkan temuan dalam format ringkas file:line.',
      en: 'Review UI code against the Web Interface Guidelines: fetch the latest handbook, check target files, report findings in terse file:line format.',
    },
    detailedDescription: {
      id: 'Skill review ringan berbasis command dengan argument-hint <file-or-pattern>. Berbeda dari skill berisi aturan statis, ia selalu mengambil panduan terbaru dari vercel-labs/web-interface-guidelines (command.md) sebelum tiap review, sehingga aturan aksesibilitas dan UX yang diperiksa selalu versi terkini. Dipicu permintaan seperti "review my UI", "check accessibility", "audit design", atau "review UX"; hasilnya temuan terformat ketat file:line sesuai format yang ditetapkan panduan. Jika tidak ada file yang disebutkan, skill bertanya dulu file mana yang direview.',
      en: 'A lightweight command-based review skill with argument-hint <file-or-pattern>. Unlike skills shipping static rules, it always fetches the latest guidance from vercel-labs/web-interface-guidelines (command.md) before each review, so the accessibility and UX rules applied are always current. Triggered by requests like "review my UI", "check accessibility", "audit design", or "review UX"; it outputs strictly formatted file:line findings as dictated by the fetched handbook. When no files are specified, it asks which files to review first.',
    },
    useWhen: {
      id: ['Audit UI menjelang rilis: aksesibilitas, interaksi keyboard, dan pola UX standar.', 'Review kode komponen atau halaman terhadap best practice web interface.', 'Pemeriksaan desain menyeluruh sebelum PR besar di-merge.'],
      en: ['Pre-release UI audits: accessibility, keyboard interaction, and standard UX patterns.', 'Reviewing component or page code against web interface best practices.', 'Design sweeps before a large PR merges.'],
    },
    avoidWhen: {
      id: ['Mereview dokumentasi atau prosa; gunakan writing-guidelines untuk pekerjaan tulisan.', 'Generate UI baru dari nol; skill ini difokuskan untuk review, bukan scaffolding.'],
      en: ['Reviewing docs or prose; use writing-guidelines for written work.', 'Generating new UI from scratch; this skill is review-focused, not scaffolding.'],
    },
    howItWorks: {
      id: ['Fetch panduan terbaru dari raw.githubusercontent.com/vercel-labs/web-interface-guidelines sebelum setiap review.', 'Baca file target dari argumen <file-or-pattern>, atau tanyakan ke pengguna bila tidak ada.', 'Terapkan seluruh aturan dari panduan yang telah di-fetch pada file tersebut.', 'Keluarkan temuan dalam format ringkas file:line sesuai instruksi output panduan.'],
      en: ['Fetch the latest guidelines from raw.githubusercontent.com/vercel-labs/web-interface-guidelines before every review.', 'Read the target files from the <file-or-pattern> argument, or ask the user if none was given.', 'Apply every rule from the fetched guidelines to those files.', 'Report findings in terse file:line format per the handbook\'s output instructions.'],
    },
    coreRules: {
      id: ['Selalu fetch panduan segar sebelum review; jangan mengandalkan aturan yang dihafal dari sesi sebelumnya.', 'Output temuan harus terformat ketat file:line agar mudah ditindaklanjuti.'],
      en: ['Always fetch fresh guidelines before reviewing; never rely on rules memorized from earlier sessions.', 'Findings must be strictly formatted as file:line so they are immediately actionable.'],
    },
    tips: {
      id: ['Berikan argumen file atau glob (mis. src/components/**) agar review terarah sejak awal.', 'Kombinasikan dengan writing-guidelines untuk audit menyeluruh UI plus copy-nya dalam satu pass.'],
      en: ['Pass a file or glob argument (e.g. src/components/**) so the review is targeted from the start.', 'Combine with writing-guidelines for a full UI-plus-copy audit in one pass.'],
    },
    pairsWellWith: ['writing-guidelines', 'vercel-composition-patterns'],
    spotlight: {
      title: { id: 'Review UI dengan Handbook Terbaru', en: 'Review UI Against the Latest Handbook' },
      body: { id: 'Sebelum setiap review, fetch command.md terbaru dari sumber Web Interface Guidelines. Argumen <file-or-pattern> wajib diberikan agar pemeriksaan memiliki target, lalu ikuti format output yang ditentukan handbook.', en: 'Before every review, fetch the latest command.md from the Web Interface Guidelines source. The <file-or-pattern> argument is required so the review has a target, and the output must follow the handbook\'s specified format.' },
    },
    sourcePath: 'skills/web-design-guidelines/SKILL.md',
  },
  {
    name: 'writing-guidelines',
    category: 'authoring',
    invocation: 'user',
    description: {
      id: 'Review dokumentasi dan prosa terhadap Writing Guidelines Vercel: fetch handbook terbaru, periksa file, laporkan temuan file:line.',
      en: 'Review docs and prose against Vercel\'s Writing Guidelines: fetch the latest handbook, check files, report file:line findings.',
    },
    detailedDescription: {
      id: 'Pasangan writing dari web-design-guidelines: ia mengaudit teks, bukan antarmuka. Dengan argument-hint <file-or-pattern>, skill ini mengambil panduan terbaru dari vercel-labs/writing-guidelines (command.md) sebelum tiap review sehingga aturan voice, tone, dan gaya dokumentasi selalu yang terkini. Dipicu permintaan seperti "review my docs", "check writing style", "audit prose", atau "review docs voice and tone". Temuan dilaporkan ringkas per file:line mengikuti format output panduan, dan bila tidak ada file disebutkan, skill menanyakannya lebih dulu.',
      en: 'The writing counterpart to web-design-guidelines: it audits text, not interfaces. With argument-hint <file-or-pattern>, it fetches the latest guidance from vercel-labs/writing-guidelines (command.md) before each review, so voice, tone, and documentation style rules are always current. Triggered by requests like "review my docs", "check writing style", "audit prose", or "review docs voice and tone". Findings are reported tersely per file:line following the handbook\'s output format, and when no files are named, it asks for them first.',
    },
    useWhen: {
      id: ['Audit dokumentasi teknis, README, atau halaman marketing sebelum publikasi.', 'Menyelaraskan voice dan tone docs dengan writing handbook resmi.', 'Review prose di situs atau produk sebelum rilis besar.'],
      en: ['Auditing technical docs, READMEs, or marketing pages before publishing.', 'Aligning docs voice and tone with the official writing handbook.', 'Reviewing site or product prose ahead of a major release.'],
    },
    avoidWhen: {
      id: ['Mereview kode atau UI; gunakan web-design-guidelines untuk antarmuka.', 'Konten dengan gaya/legal register khusus yang tidak mengikuti handbook umum.'],
      en: ['Reviewing code or UI; use web-design-guidelines for interfaces.', 'Content in specialized legal or register styles that intentionally deviate from the handbook.'],
    },
    howItWorks: {
      id: ['Fetch panduan terbaru dari raw.githubusercontent.com/vercel-labs/writing-guidelines sebelum setiap review.', 'Baca file prosa target dari argumen <file-or-pattern>, atau tanyakan ke pengguna bila kosong.', 'Periksa seluruh aturan voice, tone, dan gaya dari panduan yang terbaru.', 'Sajikan temuan ringkas per file:line sesuai format output yang ditetapkan panduan.'],
      en: ['Fetch the latest guidelines from raw.githubusercontent.com/vercel-labs/writing-guidelines before every review.', 'Read the target prose files from the <file-or-pattern> argument, or ask the user if empty.', 'Check every voice, tone, and style rule from the freshly fetched handbook.', 'Report terse file:line findings following the handbook\'s output format.'],
    },
    coreRules: {
      id: ['Fetch panduan fresh setiap kali; jangan mereview dari ingatan aturan lama.', 'Temuan disajikan dalam format file:line yang ringkas dan konsisten.'],
      en: ['Fetch fresh guidelines every time; never review from remembered rules.', 'Findings are presented in a consistent, terse file:line format.'],
    },
    tips: {
      id: ['Arahkan ke file atau pola spesifik (mis. docs/**/*.mdx) agar hasil review mudah diprioritaskan.', 'Jalankan bersama web-design-guidelines sebelum rilis agar UI dan tulisannya sama-sama lolos audit.'],
      en: ['Point it at specific files or patterns (e.g. docs/**/*.mdx) so findings are easy to prioritize.', 'Run it alongside web-design-guidelines before releases so UI and copy both pass audit.'],
    },
    pairsWellWith: ['web-design-guidelines', 'vercel-composition-patterns'],
    spotlight: {
      title: { id: 'Audit Prosa dengan Writing Handbook', en: 'Audit Prose with the Writing Handbook' },
      body: { id: 'Fetch command.md terbaru sebelum setiap audit dan selalu berikan argumen <file-or-pattern>. Cakupannya hanya prosa atau dokumentasi, bukan code maupun UI, dan temuan harus mengikuti format handbook.', en: 'Fetch the latest command.md before every audit and always provide the <file-or-pattern> argument. Its scope is prose or documentation only—not code or UI—and findings must follow the handbook\'s format.' },
    },
    sourcePath: 'skills/writing-guidelines/SKILL.md',
  },
]
