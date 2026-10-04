import type { BilingualString, BilingualList } from '@/types/skill'

// Verified against greensock/gsap-skills @ aed9cfd3277740755f6bfc1155c7aa645403b760
// (2026-04-21; plugin.json v1.0.0; MIT, Copyright (c) 2026 GreenSock). Checked 2026-10-04.
// GSAP itself and every plugin (incl. formerly Club-only SplitText, MorphSVG) are free,
// installed from the public `gsap` npm package.
export const GSAP_SOURCE_REPO = 'github.com/greensock/gsap-skills'
export const GSAP_SOURCE_SHA = 'aed9cfd3277740755f6bfc1155c7aa645403b760'
export const SOURCE_REPO = GSAP_SOURCE_REPO
export const SOURCE_SHA = GSAP_SOURCE_SHA

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

export const gsapSkills: RichSkill[] = [
  {
    name: 'gsap-core',
    category: 'core-engine',
    invocation: 'model',
    description: {
      id: 'Skill resmi GSAP untuk engine inti: gsap.to(), from(), fromTo(), sistem easing, staggers, durasi, dan responsive media query (matchMedia).',
      en: 'Official GSAP skill for the core engine: gsap.to(), from(), fromTo(), easing systems, staggers, durations, and responsive matchMedia().',
    },
    detailedDescription: {
      id: 'Skill dasar yang mengatur seluruh animasi inti GSAP. Menangani pembuatan tween dasar (`to`, `from`, `fromTo`, `set`), manipulasi properti CSS (selalu transform alih-alih properti layout), kurva easing standar dan kustom, stagger dinamis untuk elemen jamak, nilai default global, serta pengaturan animasi responsif dan penghormatan preferensi sistem `prefers-reduced-motion` melalui `gsap.matchMedia()`. Berjalan di framework mana pun (React, Vue, Svelte, vanilla) dan menjadi engine di balik Webflow Interactions.',
      en: 'Foundational skill governing all GSAP core animation workflows. Details tween authoring (`to`, `from`, `fromTo`, `set`), CSS property targets (favoring transforms over layout recalculations), standard and custom easing curves, dynamic staggers across element collections, global defaults, and accessible responsive animation using `gsap.matchMedia()` with strict `prefers-reduced-motion` compliance. Operates seamlessly in any framework or vanilla environment.',
    },
    useWhen: {
      id: [
        'Membangun animasi JavaScript interaktif untuk elemen DOM atau SVG.',
        'Mengonfigurasi kurva easing presisi atau efek stagger pada banyak elemen.',
        'Mengimplementasikan animasi responsif dengan `gsap.matchMedia()` dan dukungan aksesibilitas gerak berkurang.',
      ],
      en: [
        'Building interactive JavaScript animations for DOM or SVG elements.',
        'Configuring precise easing curves or stagger cascades across element lists.',
        'Implementing responsive animations with `gsap.matchMedia()` and reduced-motion accessibility.',
      ],
    },
    avoidWhen: {
      id: [
        'Animasi UI sederhana yang cukup diselesaikan dengan transisi CSS murni (`transition: opacity`).',
        'Sequencing multi-langkah yang lebih tepat menggunakan Timeline (gunakan gsap-timeline).',
      ],
      en: [
        'Trivial UI transitions where pure CSS (`transition: opacity`) is sufficient.',
        'Multi-step sequences better orchestrated with timelines (use gsap-timeline).',
      ],
    },
    howItWorks: {
      id: [
        'Menganimasikan alias transform: `x`, `y`, `scale`, `rotation` alih-alih `left`, `top`, `width`, `height`.',
        'Menggunakan `gsap.matchMedia()` untuk mendefinisikan breakpoint layar dan preferensi reduced motion.',
        'Me-revert otomatis semua yang dibuat di dalam handler saat media query berhenti cocok (`mm.revert()` untuk membersihkan manual, mis. saat unmount).',
      ],
      en: [
        'Animates transform aliases: `x`, `y`, `scale`, `rotation` instead of `left`, `top`, `width`, `height`.',
        'Leverages `gsap.matchMedia()` to define viewport breakpoints and reduced-motion guards.',
        'Automatically reverts everything created inside the handler when the media query stops matching (`mm.revert()` to clean up manually, e.g. on unmount).',
      ],
    },
    coreRules: {
      id: [
        'Utamakan properti transform (`x`, `y`, `scale`, `rotation`) dan opacity daripada properti layout (`left`, `top`, `width`, `height`).',
        'Gunakan `gsap.matchMedia()` dan hormati preferensi `(prefers-reduced-motion: reduce)`.',
        'Hindari membuat tween yang saling menimpa target yang sama tanpa menghentikan tween sebelumnya.',
        'Jangan menumpuk `gsap.context()` di dalam `gsap.matchMedia()`: matchMedia sudah membuat context sendiri, cukup gunakan `mm.revert()`.',
      ],
      en: [
        'Prefer transform properties (`x`, `y`, `scale`, `rotation`) and opacity over layout properties (`left`, `top`, `width`, `height`).',
        'Use `gsap.matchMedia()` and strictly respect `(prefers-reduced-motion: reduce)`.',
        'Never create conflicting tweens targeting the same properties without proper kill/overwrite handling.',
        'Do not nest `gsap.context()` inside `gsap.matchMedia()`: matchMedia creates a context internally, so just use `mm.revert()`.',
      ],
    },
    tips: {
      id: [
        'Gunakan `gsap.defaults({ ease: "power2.out", duration: 0.5 })` di awal file untuk konsistensi seluruh aplikasi.',
      ],
      en: [
        'Set `gsap.defaults({ ease: "power2.out", duration: 0.5 })` globally for consistent application feel.',
      ],
    },
    pairsWellWith: ['gsap-timeline', 'gsap-react', 'gsap-scrolltrigger'],
    spotlight: {
      title: {
        id: 'Aksesibilitas matchMedia & Reduced Motion',
        en: 'matchMedia & Reduced Motion Accessibility',
      },
      body: {
        id: 'Banyak developer mengabaikan pengguna dengan gangguan vestibular yang sensitif terhadap gerakan layar. `gsap.matchMedia()` menjalankan fungsi setup Anda hanya selama media query cocok, dan otomatis me-revert semua animasi serta ScrollTrigger yang dibuat di dalamnya begitu query berhenti cocok. Untuk reduced motion, Andalah yang menentukan apa yang berubah: handler menerima `context.conditions` (mis. `reduceMotion`), lalu Anda memakai `duration: reduceMotion ? 0 : 2` atau melewati animasinya. GSAP tidak mengganti animasi dengan cross-fade secara otomatis.',
        en: 'Many engineers neglect users with vestibular motion sensitivities. `gsap.matchMedia()` runs your setup function only while a media query matches and automatically reverts every animation and ScrollTrigger created inside it once the query stops matching. For reduced motion, you decide what changes: the handler receives `context.conditions` (e.g. `reduceMotion`), and you use `duration: reduceMotion ? 0 : 2` or skip the animation. GSAP does not automatically swap in cross-fades.',
      },
    },
    sourcePath: 'skills/gsap-core/SKILL.md',
  },
  {
    name: 'gsap-scrolltrigger',
    category: 'scroll-interaction',
    invocation: 'model',
    description: {
      id: 'Skill resmi GSAP untuk ScrollTrigger: animasi terhubung posisi scroll, section pinning, scrubbing halus, dan navigasi parallax.',
      en: 'Official GSAP skill for ScrollTrigger: scroll-driven animations, section pinning, smooth scrubbing, and parallax navigation.',
    },
    detailedDescription: {
      id: 'Skill spesialis untuk ScrollTrigger, plugin scroll paling populer dan canggih di ekosistem web. Memungkinkan animasi dipicu berdasarkan posisi scroll viewport, scrubbing animasi maju/mundur mengikuti roda scroll mouse (`scrub: true` atau `scrub: 1` untuk kelembapan inersia), pinning elemen fixed saat konten lain bergulir, perhitungan titik awal/akhir dinamis (`start: "top center"`, `end: "+=500"`), serta manajemen refresh scroll saat layout DOM mengalami pergeseran tinggi.',
      en: 'Specialized skill for ScrollTrigger, the industry benchmark scroll-driven animation plugin. Unlocks scroll-linked tweening, bi-directional progress scrubbing matching the scrollbar (`scrub: true` or numeric smoothing like `scrub: 1`), viewport element pinning during content scroll, dynamic percentage triggers (`start: "top center"`, `end: "+=500"`), and layout recalculation hooks via `ScrollTrigger.refresh()`.',
    },
    useWhen: {
      id: [
        'Membangun landing page interaktif dengan efek parallax, pinned showcase, atau timeline scroll.',
        'Memicu animasi masuk saat elemen memasuki viewport browser.',
        'Mem-pin (menyematkan) elemen selama rentang scroll tertentu sambil menganimasikan anak-anaknya.',
      ],
      en: [
        'Building interactive landing pages with parallax layers, pinned showcases, or scroll timelines.',
        'Triggering enter animations as elements enter the browser viewport.',
        'Pinning an element for a scroll range while animating its children.',
      ],
    },
    avoidWhen: {
      id: [
        'Animasi yang dipicu oleh klik tombol atau hover mouse tanpa hubungan ke scroll (gunakan gsap-core atau gsap-timeline).',
      ],
      en: [
        'Click-triggered or hover animations independent of viewport scroll position (use gsap-core or gsap-timeline).',
      ],
    },
    howItWorks: {
      id: [
        'Mendaftarkan plugin dengan `gsap.registerPlugin(ScrollTrigger)`.',
        'Menyematkan konfigurasi `scrollTrigger: { trigger, start, end, scrub, pin }` ke dalam tween atau timeline.',
        'Menghitung posisi scroll dan menginterpolasikan progress tween secara presisi.',
      ],
      en: [
        'Registers plugin via `gsap.registerPlugin(ScrollTrigger)`.',
        'Embeds `scrollTrigger: { trigger, start, end, scrub, pin }` parameters directly into tweens or timelines.',
        'Computes viewport positions and interpolates tween progress smoothly.',
      ],
    },
    coreRules: {
      id: [
        'Selalu daftarkan ScrollTrigger dengan `gsap.registerPlugin(ScrollTrigger)` sebelum inisialisasi.',
        'Saat membuat timeline dengan ScrollTrigger, sematkan scrollTrigger pada objek timeline, bukan pada tiap child tween.',
        'Panggil `ScrollTrigger.refresh()` jika ada gambar atau font eksternal yang dimuat belakangan dan mengubah tinggi halaman.',
      ],
      en: [
        'Always invoke `gsap.registerPlugin(ScrollTrigger)` prior to creating triggers.',
        'When attaching ScrollTrigger to a timeline, define it on the timeline instance, never on individual child tweens.',
        'Call `ScrollTrigger.refresh()` whenever lazy-loaded images or fonts alter page height.',
      ],
    },
    tips: {
      id: [
        'Gunakan `markers: true` selama pengembangan untuk melihat garis start/end trigger visual di layar.',
        'Gunakan nilai numerik pada `scrub` (misal `scrub: 0.5`) untuk memberikan efek perlambatan inersia yang mewah.',
      ],
      en: [
        'Toggle `markers: true` during local development to inspect visual trigger lines in the browser.',
        'Assign numeric scrub values (e.g. `scrub: 0.5`) for elegant inertial deceleration.',
      ],
    },
    pairsWellWith: ['gsap-timeline', 'gsap-react', 'gsap-plugins'],
    spotlight: {
      title: {
        id: 'Aturan Pemasangan ScrollTrigger pada Timeline',
        en: 'Timeline ScrollTrigger Attachment Rule',
      },
      body: {
        id: 'Kesalahan paling sering terjadi adalah memasang `scrollTrigger: {...}` di dalam setiap `tl.to(...)` anak. Ini merusak kalkulasi urutan timeline karena tiap anak mencoba mengikat dirinya ke posisi scroll sendiri-sendiri. Aturan baku GSAP: pasang `scrollTrigger` SATU KALI pada konstruktor `gsap.timeline({ scrollTrigger: {...} })`. Seluruh anak tween di dalamnya otomatis tersinkronisasi sempurna dengan scroll bar.',
        en: 'The most pervasive mistake is attaching `scrollTrigger: {...}` onto individual child `tl.to(...)` steps. This fragments timeline choreography as children compete for scroll offsets. The official GSAP invariant: attach `scrollTrigger` ONCE at the timeline root: `gsap.timeline({ scrollTrigger: {...} })`. All nested child tweens will synchronize seamlessly with the scrubbar.',
      },
    },
    sourcePath: 'skills/gsap-scrolltrigger/SKILL.md',
  },
  {
    name: 'gsap-react',
    category: 'framework-integration',
    invocation: 'model',
    description: {
      id: 'Skill resmi GSAP untuk React & Next.js: hook useGSAP, scope ref, dependencies/revertOnUpdate, contextSafe untuk event handler, dan pembersihan otomatis saat unmount.',
      en: 'Official GSAP skill for React & Next.js: the useGSAP hook, ref scope, dependencies/revertOnUpdate, contextSafe for event handlers, and automatic cleanup on unmount.',
    },
    detailedDescription: {
      id: 'Skill integrasi resmi GSAP dengan React (`@gsap/react`). Gunakan `useGSAP()` sebagai pengganti `useEffect()`: ia membungkus kode dalam `gsap.context()`, menerima `scope` (ref/elemen) agar selector seperti `.box` terbatas pada komponen, dan me-revert animasi serta ScrollTrigger otomatis saat unmount. Argumen kedua boleh berupa array dependency atau objek `{ dependencies, scope, revertOnUpdate }`. Tween yang dibuat di event handler (setelah useGSAP selesai dieksekusi) harus dibungkus `contextSafe`. Tanpa `@gsap/react`, pakai `gsap.context()` di `useEffect` dan selalu `ctx.revert()` di cleanup. Jangan memanggil gsap saat SSR.',
      en: 'Official integration skill for GSAP with React (`@gsap/react`). Use `useGSAP()` instead of `useEffect()`: it wraps code in `gsap.context()`, accepts a `scope` (ref/element) so selectors like `.box` stay inside the component, and reverts animations and ScrollTriggers automatically on unmount. The second argument can be a dependency array or a `{ dependencies, scope, revertOnUpdate }` object. Tweens created in event handlers (after useGSAP has run) must be wrapped in `contextSafe`. Without `@gsap/react`, use `gsap.context()` in `useEffect` and always `ctx.revert()` in the cleanup. Never call gsap during SSR.',
    },
    useWhen: {
      id: [
        'Menulis atau me-review kode GSAP di komponen React atau framework berbasis React seperti Next.js.',
        'Membersihkan animasi dan ScrollTrigger saat unmount, atau menghindari masalah context/SSR.',
        'Membuat tween di event handler (klik, pointer) yang harus ikut dibersihkan: gunakan `contextSafe`.',
      ],
      en: [
        'Writing or reviewing GSAP code in React components or React-based frameworks such as Next.js.',
        'Cleaning up animations and ScrollTriggers on unmount, or avoiding context/SSR issues.',
        'Creating tweens in event handlers (click, pointer) that must be cleaned up too: use `contextSafe`.',
      ],
    },
    avoidWhen: {
      id: [
        'Aplikasi Vue atau Svelte (gunakan gsap-frameworks).',
        'Mendefinisikan tween dan timeline itu sendiri — itu urusan gsap-core dan gsap-timeline.',
      ],
      en: [
        'Vue or Svelte applications (use gsap-frameworks).',
        'Authoring the tweens and timelines themselves — that is gsap-core and gsap-timeline.',
      ],
    },
    howItWorks: {
      id: [
        'Install `gsap` dan `@gsap/react`, impor `useGSAP`, dan daftarkan: `gsap.registerPlugin(useGSAP)` sebelum dipakai.',
        'Panggil `useGSAP(() => { gsap.to(".box", { x: 100 }) }, { scope: containerRef })`; selector dibatasi pada `containerRef`.',
        'Cleanup (revert animasi dan ScrollTrigger) berjalan otomatis saat unmount; `revertOnUpdate: true` juga menjalankannya setiap dependency berubah.',
      ],
      en: [
        'Install `gsap` and `@gsap/react`, import `useGSAP`, and register it: `gsap.registerPlugin(useGSAP)` before use.',
        'Call `useGSAP(() => { gsap.to(".box", { x: 100 }) }, { scope: containerRef })`; selectors are limited to `containerRef`.',
        'Cleanup (reverting animations and ScrollTriggers) runs automatically on unmount; `revertOnUpdate: true` also runs it every time a dependency changes.',
      ],
    },
    coreRules: {
      id: [
        'Utamakan `useGSAP()` daripada `useEffect()`/`useLayoutEffect()`; jika tidak bisa, pakai `gsap.context()` di `useEffect` dan wajib `return () => ctx.revert()`.',
        'Selalu berikan `scope` (ref atau elemen); jangan menarget dengan selector tanpa scope.',
        'Bungkus fungsi yang membuat animasi setelah useGSAP selesai (mis. handler klik) dengan `contextSafe`; hapus juga event listener di fungsi cleanup.',
        'Jangan menjalankan gsap atau ScrollTrigger saat SSR; semua penggunaan harus di lifecycle client-only (useGSAP/useEffect).',
      ],
      en: [
        'Prefer `useGSAP()` over `useEffect()`/`useLayoutEffect()`; if not possible, use `gsap.context()` in `useEffect` and always `return () => ctx.revert()`.',
        'Always pass a `scope` (ref or element); never target by selector without a scope.',
        'Wrap functions that create animations after useGSAP has run (e.g. click handlers) in `contextSafe`; also remove the event listener in the cleanup function.',
        'Never run gsap or ScrollTrigger during SSR; keep all usage in a client-only lifecycle (useGSAP/useEffect).',
      ],
    },
    tips: {
      id: [
        'Secara default `useGSAP` memakai dependency array kosong; argumen kedua bisa array dependency atau objek `{ dependencies, scope, revertOnUpdate }`.',
        'Callback `useGSAP((context, contextSafe) => ...)` memberi akses ke `contextSafe`; tween di dalam handler tanpa contextSafe tidak masuk context dan tidak akan di-revert.',
        'Untuk banyak elemen, gunakan ref ke container lalu query anak-anaknya, atau array ref.',
      ],
      en: [
        'By default `useGSAP` uses an empty dependency array; the second argument can be a dependency array or a `{ dependencies, scope, revertOnUpdate }` object.',
        'The `useGSAP((context, contextSafe) => ...)` callback gives you `contextSafe`; tweens inside handlers without it are not in the context and will not be reverted.',
        'For multiple elements, use a ref to the container and query its children, or an array of refs.',
      ],
    },
    pairsWellWith: ['gsap-core', 'gsap-scrolltrigger', 'gsap-frameworks'],
    spotlight: {
      title: {
        id: '`contextSafe`: Tween di Event Handler yang Ikut Dibersihkan',
        en: '`contextSafe`: Event-Handler Tweens That Get Cleaned Up',
      },
      body: {
        id: 'Jebakan utama di React: animasi yang dibuat di dalam event handler berjalan SETELAH useGSAP dieksekusi, sehingga tidak masuk context dan tidak di-revert saat unmount atau render ulang. Bungkus fungsi itu dengan `contextSafe` (argumen kedua callback useGSAP) agar tween ikut dibersihkan, dan hapus event listener-nya di fungsi cleanup.',
        en: 'The key React gotcha: animations created inside event handlers run AFTER useGSAP executes, so they are not part of the context and are not reverted on unmount or re-render. Wrap those functions in `contextSafe` (the second argument of the useGSAP callback) so the tweens get cleaned up too, and remove the event listener in the cleanup function.',
      },
    },
    sourcePath: 'skills/gsap-react/SKILL.md',
  },
  {
    name: 'gsap-timeline',
    category: 'core-engine',
    invocation: 'model',
    description: {
      id: 'Skill resmi GSAP untuk Timeline: orkestrasi animasi berurutan/paralel, parameter posisi, nesting timeline, dan kontrol pemutaran playback.',
      en: 'Official GSAP skill for Timelines: sequencing animations, position parameter orchestration, nested timelines, and playback controls.',
    },
    detailedDescription: {
      id: 'Skill untuk orkestrasi sekuensial dan koreografi multi-elemen menggunakan `gsap.timeline()`. Mengatur waktu eksekusi tanpa perhitungan delay matematika yang rapuh melalui position parameter (`"<"`, `">"`, `"+=0.2"`, `"-=0.5"`), memungkinkan timeline bersarang (nested timelines) untuk memecah animasi rumit menjadi fungsi modular kecil, serta menyediakan kontrol pemutaran interaktif penuh (`play`, `pause`, `reverse`, `restart`, `seek`, `timeScale`).',
      en: 'Choreography skill for multi-element sequencing via `gsap.timeline()`. Eliminates brittle delay calculations through position parameter semantics (`"<"`, `">"`, `"+=0.2"`, `"-=0.5"`), enables nested modular timelines for maintainable complex animations, and delivers granular playback controls (`play`, `pause`, `reverse`, `restart`, `seek`, `timeScale`).',
    },
    useWhen: {
      id: [
        'Mengkoordinasikan serangkaian animasi yang berjalan berurutan atau tumpang tindih secara presisi.',
        'Membangun kontrol interaktif (play, pause, reverse, slider progress) untuk animasi UI.',
        'Memecah animasi landing page kompleks menjadi sub-timeline yang mudah dikelola.',
      ],
      en: [
        'Coordinating sequential or overlapping animations across multiple UI elements.',
        'Building interactive controls (play, pause, reverse, progress scrubbers) for UI animations.',
        'Breaking complex landing page choreography into modular, maintainable sub-timelines.',
      ],
    },
    avoidWhen: {
      id: [
        'Animasi satu elemen tunggal yang berdiri sendiri tanpa sekuens (cukup gunakan `gsap.to()`).',
      ],
      en: [
        'Single isolated animations without sequential dependencies (use plain `gsap.to()`).',
      ],
    },
    howItWorks: {
      id: [
        'Membuat timeline dengan `const tl = gsap.timeline()`.',
        'Menambahkan tween berantai dengan `tl.to(el1, {...}).to(el2, {...}, "<0.2")`.',
        'Menggunakan position parameter untuk mengatur overlapping dan sinkronisasi antar langkah.',
      ],
      en: [
        'Creates timeline instance via `const tl = gsap.timeline()`.',
        'Chains sequential tweens via `tl.to(el1, {...}).to(el2, {...}, "<0.2")`.',
        'Uses position parameters to orchestrate tight overlaps and synchronization.',
      ],
    },
    coreRules: {
      id: [
        'Gunakan position parameter alih-alih menambahkan properti `delay` manual di dalam timeline.',
        'Pecah timeline panjang menjadi fungsi yang mengembalikan sub-timeline (`function buildHeroTl() { return tl }`).',
      ],
      en: [
        'Use position parameters instead of hardcoding manual `delay` properties inside timelines.',
        'Decompose long timelines into modular functions returning child timelines.',
      ],
    },
    tips: {
      id: [
        'Gunakan `tl.timeScale(2)` untuk mempercepat seluruh durasi timeline secara instan tanpa mengedit durasi tiap tween.',
      ],
      en: [
        'Use `tl.timeScale(2)` to speed up the entire timeline sequence globally without altering individual durations.',
      ],
    },
    pairsWellWith: ['gsap-core', 'gsap-scrolltrigger', 'gsap-react'],
    spotlight: {
      title: {
        id: 'Kekuatan Position Parameter Menggantikan Delay Manual',
        en: 'The Power of Position Parameters Over Manual Delays',
      },
      body: {
        id: 'Jika Anda menggunakan `delay: 1.2s`, mengubah durasi langkah pertama memaksa Anda menghitung ulang delay di seluruh 10 langkah berikutnya. Dengan position parameter GSAP (`"<"` untuk mulai bersamaan dengan langkah sebelumnya, `"<0.2"` untuk offset 200ms setelahnya), seluruh urutan bersifat elastis: mengubah durasi langkah pertama otomatis menggeser seluruh langkah berikutnya secara proporsional.',
        en: 'Hardcoding `delay: 1.2s` means altering step one forces manual recalculation of delays across every subsequent step. With GSAP position parameters (`"<"` to start with previous, `"<0.2"` to offset by 200ms), the choreography is elastic: modifying step one automatically shifts downstream steps proportionally.',
      },
    },
    sourcePath: 'skills/gsap-timeline/SKILL.md',
  },
  {
    name: 'gsap-plugins',
    category: 'plugins-extensions',
    invocation: 'model',
    description: {
      id: 'Skill resmi GSAP untuk plugin: registrasi, ScrollToPlugin, ScrollSmoother, Flip, Draggable, Inertia, Observer, SplitText, ScrambleText, plugin SVG/fisika, CustomEase, EasePack, CustomWiggle/Bounce, dan GSDevTools. Semua plugin gratis.',
      en: 'Official GSAP skill for plugins: registration, ScrollToPlugin, ScrollSmoother, Flip, Draggable, Inertia, Observer, SplitText, ScrambleText, SVG and physics plugins, CustomEase, EasePack, CustomWiggle/Bounce, and GSDevTools. Every plugin is free.',
    },
    detailedDescription: {
      id: 'Panduan plugin GSAP. Semua plugin gratis, termasuk untuk penggunaan komersial: sejak Webflow mengakuisisi GSAP, Club GSAP bukan lagi tier berbayar dan plugin lama Club (SplitText, MorphSVG, dll.) tidak butuh keanggotaan, license key, atau token. Install dari paket npm publik `gsap` (`npm install gsap`) dan impor sebagai `gsap/SplitText`, `gsap/MorphSVGPlugin`, dst. Jangan membuat `.npmrc` dengan token GreenSock atau memakai registry privat `npm.greensock.com`. Mencakup: Scroll (ScrollToPlugin, ScrollSmoother), DOM/UI (Flip, Draggable, Inertia, Observer), Text (SplitText, ScrambleText), SVG (DrawSVG, MorphSVG, MotionPath), Easing (CustomEase, EasePack, CustomWiggle, CustomBounce), Physics, dan GSDevTools. ScrollTrigger punya skill sendiri.',
      en: 'A guide to GSAP plugins. Every plugin is free, including for commercial use: since Webflow\'s acquisition of GSAP, Club GSAP is no longer a paid tier and formerly Club-only plugins (SplitText, MorphSVG, etc.) need no membership, license key or auth token. Install from the public `gsap` npm package (`npm install gsap`) and import as `gsap/SplitText`, `gsap/MorphSVGPlugin`, and so on. Never generate an `.npmrc` with a GreenSock token or use the private `npm.greensock.com` registry. Covers Scroll (ScrollToPlugin, ScrollSmoother), DOM/UI (Flip, Draggable, Inertia, Observer), Text (SplitText, ScrambleText), SVG (DrawSVG, MorphSVG, MotionPath), Easing (CustomEase, EasePack, CustomWiggle, CustomBounce), Physics, and GSDevTools. ScrollTrigger has its own skill.',
    },
    useWhen: {
      id: [
        'Menganimasikan perubahan layout dinamis (grid filter, kartu yang membesar menjadi modal) dengan Flip.',
        'Membangun elemen draggable (Draggable, Inertia), scroll-to (ScrollToPlugin), atau smooth scrolling (ScrollSmoother).',
        'Menganimasikan teks (SplitText, ScrambleText), path SVG (DrawSVG, MorphSVG, MotionPath), atau kurva easing kustom.',
      ],
      en: [
        'Animating dynamic layout changes (grid filtering, a card expanding into a modal) with Flip.',
        'Building draggable elements (Draggable, Inertia), scroll-to (ScrollToPlugin), or smooth scrolling (ScrollSmoother).',
        'Animating text (SplitText, ScrambleText), SVG paths (DrawSVG, MorphSVG, MotionPath), or custom easing curves.',
      ],
    },
    avoidWhen: {
      id: [
        'Tween posisi atau opacity standar yang tidak butuh plugin.',
        'Menyarankan keanggotaan Club GSAP, `.npmrc` dengan token, atau registry `npm.greensock.com` — instruksi itu sudah usang.',
        'ScrollTrigger: gunakan gsap-scrolltrigger.',
      ],
      en: [
        'Standard position or opacity tweens that need no plugin.',
        'Suggesting a Club GSAP membership, an `.npmrc` with a token, or the `npm.greensock.com` registry — those instructions are outdated.',
        'ScrollTrigger: use gsap-scrolltrigger.',
      ],
    },
    howItWorks: {
      id: [
        'Install `gsap` dari npm (semua plugin ikut), lalu impor plugin dari `gsap/<Plugin>` dan daftarkan sekali dengan `gsap.registerPlugin(Flip, Draggable, ...)`.',
        'Flip: ambil snapshot dengan `Flip.getState(targets)`, ubah DOM, lalu panggil `Flip.from(state, {...})`.',
      ],
      en: [
        'Install `gsap` from npm (all plugins included), import plugins from `gsap/<Plugin>` and register them once with `gsap.registerPlugin(Flip, Draggable, ...)`.',
        'Flip: snapshot with `Flip.getState(targets)`, change the DOM, then call `Flip.from(state, {...})`.',
      ],
    },
    coreRules: {
      id: [
        'Daftarkan setiap plugin yang dipakai sebelum menggunakannya di tween atau API; daftarkan sekali per aplikasi, bukan di dalam komponen yang re-render.',
        'Di React, `useGSAP` sendiri adalah plugin yang harus didaftarkan sebelum dipakai.',
        'Jangan menambahkan `.npmrc` dengan token GreenSock atau mengarahkan ke `npm.greensock.com`.',
      ],
      en: [
        'Register every plugin you use before using it in a tween or API call; register once per app, not inside a component that re-renders.',
        'In React, `useGSAP` is itself a plugin that must be registered before use.',
        'Never add an `.npmrc` with a GreenSock token or point at `npm.greensock.com`.',
      ],
    },
    tips: {
      id: [
        'Gunakan `Flip.from(state, { absolute: true })` untuk mencegah lompatan layout saat elemen di-reparent atau berubah posisi.',
        'Semua plugin tersedia dari paket `gsap` yang sama; tidak perlu paket atau registry terpisah.',
      ],
      en: [
        'Use `Flip.from(state, { absolute: true })` to prevent layout jumps when elements are reparented or repositioned.',
        'All plugins come from the same `gsap` package; no separate package or registry is needed.',
      ],
    },
    pairsWellWith: ['gsap-core', 'gsap-timeline', 'gsap-scrolltrigger'],
    spotlight: {
      title: {
        id: 'Semua Plugin GSAP Gratis',
        en: 'Every GSAP Plugin Is Free',
      },
      body: {
        id: 'Sejak Webflow mengakuisisi GSAP, seluruh plugin (termasuk SplitText dan MorphSVG yang dulu khusus Club GSAP) gratis untuk semua orang, termasuk penggunaan komersial. Tidak perlu keanggotaan, license key, atau token: cukup `npm install gsap` dari npm publik. Skill ini secara eksplisit melarang agent membuat `.npmrc` GreenSock atau menyarankan mendaftar Club GSAP.',
        en: 'Since Webflow\'s acquisition of GSAP, every plugin (including SplitText and MorphSVG, formerly Club GSAP only) is free for everyone, including commercial use. No membership, license key or token is needed: just `npm install gsap` from the public registry. The skill explicitly forbids agents from generating a GreenSock `.npmrc` or telling users to sign up for Club GSAP.',
      },
    },
    sourcePath: 'skills/gsap-plugins/SKILL.md',
  },
  {
    name: 'gsap-performance',
    category: 'performance-optimization',
    invocation: 'model',
    description: {
      id: 'Skill resmi GSAP untuk performa: utamakan transform & opacity, hindari layout thrashing, will-change di CSS, `gsap.quickTo()`, stagger, dan hentikan animasi di luar layar.',
      en: 'Official GSAP skill for performance: prefer transform & opacity, avoid layout thrashing, will-change in CSS, `gsap.quickTo()`, stagger, and pausing off-screen animations.',
    },
    detailedDescription: {
      id: 'Panduan performa animasi GSAP. Utamakan `x`, `y`, `scale`, `rotation`, dan `opacity` daripada `width`, `height`, `top`, `left`, `margin`, `padding`; gunakan `will-change` di CSS hanya pada elemen yang benar-benar dianimasikan; hindari mencampur pembacaan dan penulisan DOM yang memicu layout thrashing; pakai `stagger` alih-alih banyak tween dengan delay manual; pakai `gsap.quickTo()` untuk properti yang sering berubah (mouse follower); jeda atau kill animasi di luar layar; panggil `ScrollTrigger.refresh()` hanya saat layout berubah (di-debounce).',
      en: 'A GSAP animation performance guide. Prefer `x`, `y`, `scale`, `rotation` and `opacity` over `width`, `height`, `top`, `left`, `margin`, `padding`; use `will-change` in CSS only on elements that actually animate; avoid interleaving DOM reads and writes that cause layout thrashing; use `stagger` instead of many tweens with manual delays; use `gsap.quickTo()` for frequently updated properties (mouse followers); pause or kill off-screen animations; call `ScrollTrigger.refresh()` only when layout changes (debounced).',
    },
    useWhen: {
      id: [
        'Mengoptimalkan animasi yang patah-patah (jank) atau menurunkan frame rate.',
        'Menganimasikan banyak elemen sekaligus (daftar, stagger) atau properti yang diperbarui terus-menerus seperti mouse follower.',
        'Me-review ScrollTrigger (pin, scrub) yang terasa berat di perangkat low-end.',
      ],
      en: [
        'Optimizing janky animations or dropped frames.',
        'Animating many elements at once (lists, staggers) or constantly updated properties like mouse followers.',
        'Reviewing ScrollTrigger setups (pin, scrub) that feel heavy on low-end devices.',
      ],
    },
    avoidWhen: {
      id: [
        'Animasi ringan yang sudah berjalan mulus.',
        'Membangun animasinya sendiri — gunakan gsap-core dan gsap-timeline; skill ini untuk mengoptimalkan.',
      ],
      en: [
        'Light animations that already run smoothly.',
        'Building the animations themselves — use gsap-core and gsap-timeline; this skill is for optimizing.',
      ],
    },
    howItWorks: {
      id: [
        'Cari properti layout (`width`, `height`, `top`, `left`, `margin`, `padding`) pada tween dan ganti dengan padanan transform (`x`, `y`, `scale`, `rotation`) bila hasilnya sama.',
        'Ganti banyak tween dengan delay manual menjadi satu tween dengan `stagger`; ganti tween yang dibuat berulang pada event (mousemove) dengan `gsap.quickTo()`.',
        'Jeda atau kill animasi yang tidak terlihat, dan panggil `ScrollTrigger.refresh()` hanya saat layout benar-benar berubah.',
      ],
      en: [
        'Look for layout properties (`width`, `height`, `top`, `left`, `margin`, `padding`) in tweens and replace them with transform equivalents (`x`, `y`, `scale`, `rotation`) where the effect is the same.',
        'Replace many tweens with manual delays by a single tween with `stagger`; replace tweens created repeatedly on events (mousemove) with `gsap.quickTo()`.',
        'Pause or kill animations that are not visible, and call `ScrollTrigger.refresh()` only when layout actually changes.',
      ],
    },
    coreRules: {
      id: [
        'Jangan menganimasikan `width`/`height`/`top`/`left` untuk gerakan ketika `x`/`y`/`scale` memberi tampilan yang sama.',
        'Pakai `will-change` di CSS pada elemen yang akan dianimasikan; jangan memasang `will-change` atau `force3D` pada semua elemen "just in case".',
        'Jangan membuat ratusan tween atau ScrollTrigger yang tumpang tindih tanpa menguji di perangkat low-end, dan jangan abaikan cleanup.',
      ],
      en: [
        'Do not animate `width`/`height`/`top`/`left` for movement when `x`/`y`/`scale` give the same look.',
        'Use `will-change` in CSS on elements that will animate; never set `will-change` or `force3D` on every element "just in case".',
        'Never create hundreds of overlapping tweens or ScrollTriggers without testing on low-end devices, and never ignore cleanup.',
      ],
    },
    tips: {
      id: [
        '`gsap.quickTo(el, "x", { duration: 0.4, ease: "power3" })` menggunakan ulang satu tween; panggil `xTo(e.pageX)` di handler mousemove.',
        '`pin: true` mempromosikan elemen yang di-pin, jadi pin hanya yang perlu; `scrub` bernilai kecil (mis. `scrub: 1`) dapat mengurangi kerja saat scroll — uji di perangkat low-end.',
        'Untuk daftar panjang pertimbangkan virtualisasi atau hanya menganimasikan item yang terlihat.',
      ],
      en: [
        '`gsap.quickTo(el, "x", { duration: 0.4, ease: "power3" })` reuses a single tween; call `xTo(e.pageX)` in the mousemove handler.',
        '`pin: true` promotes the pinned element, so pin only what is needed; a small `scrub` value (e.g. `scrub: 1`) can reduce work during scroll — test on low-end devices.',
        'For long lists consider virtualization or animating only visible items.',
      ],
    },
    pairsWellWith: ['gsap-core', 'gsap-scrolltrigger', 'gsap-timeline'],
    spotlight: {
      title: {
        id: 'Transform dan Opacity Tetap di Compositor',
        en: 'Transform and Opacity Stay on the Compositor',
      },
      body: {
        id: 'Menganimasikan transform (`x`, `y`, `scale`, `rotation`) dan opacity menjaga pekerjaan di compositor dan menghindari layout serta sebagian besar paint; menganimasikan properti layout seperti `width`, `height`, `top`, `left` memicu layout dan bisa menyebabkan jank. `x` dan `y` milik GSAP memakai transform translate secara default, jadi gunakan itu untuk gerakan, bukan `left`/`top`.',
        en: 'Animating transforms (`x`, `y`, `scale`, `rotation`) and opacity keeps work on the compositor and avoids layout and most paint; animating layout properties like `width`, `height`, `top`, `left` triggers layout and can cause jank. GSAP\'s `x` and `y` use translate transforms by default, so use them for movement instead of `left`/`top`.',
      },
    },
    sourcePath: 'skills/gsap-performance/SKILL.md',
  },
  {
    name: 'gsap-frameworks',
    category: 'framework-integration',
    invocation: 'model',
    description: {
      id: 'Skill resmi GSAP untuk Vue, Nuxt 4, Svelte, dan SvelteKit: lifecycle onMounted/onMount, scoping selector, dan pembersihan context.',
      en: 'Official GSAP skill for Vue, Nuxt 4, Svelte, and SvelteKit: onMounted/onMount lifecycle, selector scoping, and context cleanup.',
    },
    detailedDescription: {
      id: 'Panduan integrasi GSAP untuk framework non-React. Prinsip semua framework: buat tween dan ScrollTrigger setelah DOM komponen tersedia (`onMounted`, `onMount`), kill atau revert saat unmount, dan scope selector ke root komponen. Vue 3 (Composition API dan `<script setup>`) memakai `onMounted` + `gsap.context()` dan `onUnmounted`; Nuxt 4 memakai composable untuk mendaftarkan plugin dan me-lazy-load plugin yang jarang dipakai (lihat `examples/nuxt/`); Svelte memakai `onMount` yang mengembalikan fungsi cleanup `() => ctx.revert()`. Untuk React gunakan gsap-react.',
      en: 'GSAP integration guide for non-React frameworks. Principles for every framework: create tweens and ScrollTriggers after the component\'s DOM is available (`onMounted`, `onMount`), kill or revert on unmount, and scope selectors to the component root. Vue 3 (Composition API and `<script setup>`) uses `onMounted` + `gsap.context()` and `onUnmounted`; Nuxt 4 uses a composable to register plugins and lazy-load rarely used ones (see `examples/nuxt/`); Svelte uses `onMount` returning a cleanup function `() => ctx.revert()`. For React use gsap-react.',
    },
    useWhen: {
      id: [
        'Mengimplementasikan animasi GSAP di proyek Vue 3, Nuxt 4, Svelte, atau SvelteKit.',
        'Menyiapkan cleanup otomatis saat komponen di-unmount atau pindah halaman.',
      ],
      en: [
        'Implementing GSAP animations in Vue 3, Nuxt 4, Svelte or SvelteKit projects.',
        'Setting up automatic cleanup when a component unmounts or the route changes.',
      ],
    },
    avoidWhen: {
      id: [
        'Proyek React atau Next.js (gunakan gsap-react dengan hook useGSAP).',
      ],
      en: [
        'React or Next.js codebases (use gsap-react with the useGSAP hook).',
      ],
    },
    howItWorks: {
      id: [
        'Buat `ctx = gsap.context(() => { ... }, rootRef)` di dalam hook mount (`onMounted` di Vue, `onMount` di Svelte).',
        'Panggil `ctx.revert()` saat unmount: `onUnmounted` di Vue, atau fungsi yang dikembalikan `onMount` di Svelte.',
        'Di Nuxt 4, daftarkan plugin lewat composable dan lazy-load plugin yang jarang dipakai.',
      ],
      en: [
        'Create `ctx = gsap.context(() => { ... }, rootRef)` inside the mount hook (`onMounted` in Vue, `onMount` in Svelte).',
        'Call `ctx.revert()` on unmount: `onUnmounted` in Vue, or the function returned from `onMount` in Svelte.',
        'In Nuxt 4, register plugins through a composable and lazy-load rarely used plugins.',
      ],
    },
    coreRules: {
      id: [
        'Selalu `ctx.revert()` (atau kill/revert tween dan ScrollTrigger) saat unmount agar tidak ada yang berjalan di node yang sudah lepas.',
        'Buat tween dan ScrollTrigger hanya setelah DOM komponen tersedia, dan scope selector ke root komponen.',
      ],
      en: [
        'Always `ctx.revert()` (or kill/revert tweens and ScrollTriggers) on unmount so nothing runs on detached nodes.',
        'Create tweens and ScrollTriggers only after the component\'s DOM is available, and scope selectors to the component root.',
      ],
    },
    tips: {
      id: [
        'Di Svelte, `bind:this={container}` memberi referensi root untuk `gsap.context(fn, container)`; Svelte 5 punya lifecycle berbeda tetapi prinsipnya sama.',
        '`examples/vue` dan `examples/nuxt` di repo upstream adalah proyek yang bisa dijalankan.',
      ],
      en: [
        'In Svelte, `bind:this={container}` gives the root reference for `gsap.context(fn, container)`; Svelte 5 has a different lifecycle but the same principle applies.',
        '`examples/vue` and `examples/nuxt` in the upstream repo are runnable projects.',
      ],
    },
    pairsWellWith: ['gsap-core', 'gsap-timeline', 'gsap-react'],
    spotlight: {
      title: {
        id: 'Pola gsap.context() untuk Vue dan Svelte',
        en: 'gsap.context() Pattern for Vue and Svelte',
      },
      body: {
        id: 'Di luar React yang punya `useGSAP()`, Vue dan Svelte memakai `gsap.context()`: bungkus pembuatan tween dalam satu context, lalu satu `ctx.revert()` saat teardown mematikan tween, ScrollTrigger, dan mengembalikan style inline. Di Nuxt 4, upstream menyarankan composable untuk registrasi dan lazy loading plugin.',
        en: 'Outside React which has `useGSAP()`, Vue and Svelte use `gsap.context()`: wrap tween creation in one context, and a single `ctx.revert()` at teardown kills the tweens, ScrollTriggers and reverts inline styles. In Nuxt 4, upstream recommends a composable for plugin registration and lazy loading.',
      },
    },
    sourcePath: 'skills/gsap-frameworks/SKILL.md',
  },
  {
    name: 'gsap-utils',
    category: 'math-utilities',
    invocation: 'model',
    description: {
      id: 'Skill resmi untuk `gsap.utils`: clamp, mapRange, normalize, interpolate, random, snap, toArray, wrap, dan pipe.',
      en: 'Official skill for `gsap.utils`: clamp, mapRange, normalize, interpolate, random, snap, toArray, wrap, and pipe.',
    },
    detailedDescription: {
      id: 'Referensi untuk helper matematika dan koleksi bawaan GSAP (`gsap.utils`): `clamp()` membatasi nilai ke rentang, `mapRange()` memetakan nilai antar domain, `normalize()` menormalkan ke 0-1, `snap()` membulatkan ke grid atau array, `interpolate()` interpolasi nilai, `wrap()` untuk indeks melingkar, `random()`, `toArray()` mengonversi NodeList/selector menjadi array, dan `pipe()` merangkai fungsi. Tidak perlu `registerPlugin`. Banyak util menerima nilai yang diubah sebagai argumen terakhir; bila argumen itu dihilangkan, util mengembalikan fungsi yang bisa dipanggil nanti (pengecualian: `random()` memakai `true` sebagai argumen terakhir).',
      en: 'Reference for GSAP\'s built-in math and collection helpers (`gsap.utils`): `clamp()` limits a value to a range, `mapRange()` remaps values between domains, `normalize()` normalizes to 0-1, `snap()` rounds to a grid or array, `interpolate()` interpolates values, `wrap()` for circular indices, `random()`, `toArray()` converts NodeLists/selectors to arrays, and `pipe()` composes functions. No `registerPlugin` needed. Many utils take the value to transform as the last argument; if you omit it, the util returns a function you call later (exception: `random()` takes `true` as the last argument).',
    },
    useWhen: {
      id: [
        'Memetakan posisi kursor atau nilai scroll ke rotasi/skala elemen (`mapRange`), atau menormalkan input (`normalize`).',
        'Mengunci posisi drag ke titik grid (`snap`) atau membuat indeks melingkar (`wrap`).',
        'Mengubah selector string atau NodeList menjadi array murni (`toArray`).',
      ],
      en: [
        'Mapping cursor coordinates or scroll offsets to element rotation/scale (`mapRange`), or normalizing inputs (`normalize`).',
        'Snapping drag positions to grid points (`snap`) or creating circular indices (`wrap`).',
        'Turning selector strings or NodeLists into true arrays (`toArray`).',
      ],
    },
    avoidWhen: {
      id: [
        'Operasi data bisnis yang tidak terkait koordinat atau kalkulasi animasi.',
      ],
      en: [
        'Business-data operations unrelated to coordinates or animation math.',
      ],
    },
    howItWorks: {
      id: [
        'Panggil langsung dengan nilai: `gsap.utils.clamp(0, 100, 150)` mengembalikan `100`.',
        'Hilangkan argumen nilai untuk mendapat fungsi reusable: `const c = gsap.utils.clamp(0, 100); c(150)` — berguna di handler mousemove atau callback tween.',
      ],
      en: [
        'Call directly with a value: `gsap.utils.clamp(0, 100, 150)` returns `100`.',
        'Omit the value to get a reusable function: `const c = gsap.utils.clamp(0, 100); c(150)` — handy in mousemove handlers or tween callbacks.',
      ],
    },
    coreRules: {
      id: [
        'Gunakan `gsap.utils.toArray()` untuk menormalkan selector/NodeList menjadi array sebelum di-`map`.',
        'Untuk `random()`, berikan `true` sebagai argumen terakhir agar mendapat fungsi reusable (jangan hanya menghilangkan nilainya).',
      ],
      en: [
        'Use `gsap.utils.toArray()` to normalize selectors/NodeLists into arrays before `map`-ing.',
        'For `random()`, pass `true` as the last argument to get a reusable function (do not just omit the value).',
      ],
    },
    tips: {
      id: [
        'Gabungkan `gsap.utils.pipe()` untuk merangkai normalisasi, clamping, dan mapping menjadi satu fungsi.',
        'Easing kustom seperti CustomEase ada di gsap-plugins, bukan di `gsap.utils`.',
      ],
      en: [
        'Chain `gsap.utils.pipe()` to compose normalization, clamping and mapping into one function.',
        'Custom easing such as CustomEase lives in gsap-plugins, not `gsap.utils`.',
      ],
    },
    pairsWellWith: ['gsap-core', 'gsap-timeline', 'gsap-scrolltrigger'],
    spotlight: {
      title: {
        id: 'Bentuk Fungsi: Hilangkan Argumen Nilai',
        en: 'Function Form: Omit the Value',
      },
      body: {
        id: 'Banyak util `gsap.utils` (mis. `clamp`, `mapRange`, `normalize`, `interpolate`, `snap`) menerima nilai yang diubah sebagai argumen TERAKHIR. Jika dihilangkan, util mengembalikan fungsi transformer: `const getRotation = gsap.utils.mapRange(0, 1000, 0, 360)`, lalu `getRotation(scrollPos)`. Tidak semua util berpola ini; `random()` memakai `true` sebagai argumen terakhir.',
        en: 'Many `gsap.utils` helpers (e.g. `clamp`, `mapRange`, `normalize`, `interpolate`, `snap`) take the value to transform as the LAST argument. Omit it and the util returns a transformer function: `const getRotation = gsap.utils.mapRange(0, 1000, 0, 360)`, then `getRotation(scrollPos)`. Not every util follows this pattern; `random()` uses `true` as the last argument.',
      },
    },
    sourcePath: 'skills/gsap-utils/SKILL.md',
  },
]
