import type { BilingualString, BilingualList } from '@/types/skill'

export const GSAP_SOURCE_REPO = 'github.com/greensock/gsap-skills'
export const GSAP_SOURCE_SHA = 'main'
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
        'Menerapkan transformasi GPU-accelerated: `x`, `y`, `scale`, `rotation` alih-alih `left`, `top`, `width`, `height`.',
        'Menggunakan `gsap.matchMedia()` untuk mendefinisikan breakpoint layar dan preferensi reduced motion.',
        'Menyediakan pembersihan (revert) otomatis saat media query berubah.',
      ],
      en: [
        'Targets GPU-accelerated transforms: `x`, `y`, `scale`, `rotation` instead of `left`, `top`, `width`, `height`.',
        'Leverages `gsap.matchMedia()` to define viewport breakpoints and reduced-motion guards.',
        'Provides automatic context reversion upon media query matching changes.',
      ],
    },
    coreRules: {
      id: [
        'Selalu animasikan properti transform (`x`, `y`, `scale`) untuk mencegah browser layout thrashing.',
        'Gunakan `gsap.matchMedia()` dan hormati preferensi `(prefers-reduced-motion: reduce)`.',
        'Hindari membuat tween yang saling menimpa target yang sama tanpa menghentikan tween sebelumnya.',
      ],
      en: [
        'Always animate transform properties (`x`, `y`, `scale`) to avoid layout reflows.',
        'Use `gsap.matchMedia()` and strictly respect `(prefers-reduced-motion: reduce)`.',
        'Never create conflicting tweens targeting the same properties without proper kill/overwrite handling.',
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
        id: 'Banyak developer mengabaikan pengguna dengan gangguan vestibular yang sensitif terhadap gerakan layar. `gsap.matchMedia()` memungkinkan Anda menyematkan kondisi `"(prefers-reduced-motion: reduce)"` secara native. Saat terdeteksi, GSAP otomatis beralih ke transisi opacity halus atau langsung men-jump ke state akhir tanpa animasi pusing.',
        en: 'Many engineers neglect users with vestibular motion sensitivities. `gsap.matchMedia()` allows declarative binding to `"(prefers-reduced-motion: reduce)"`. When matched, GSAP seamlessly switches to gentle cross-fades or instantaneous state jumps without disorienting layout animations.',
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
        'Menyinkronkan progress video atau model 3D dengan posisi scroll halaman.',
      ],
      en: [
        'Building interactive landing pages with parallax layers, pinned showcases, or scroll timelines.',
        'Triggering enter animations as elements enter the browser viewport.',
        'Synchronizing video frame scrubbing or 3D models with scroll progress.',
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
    pairsWellWith: ['gsap-timeline', 'gsap-react', 'gsap-performance'],
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
      id: 'Skill resmi GSAP untuk React & Next.js: hook useGSAP, scoping ref, pencegahan SSR hydration mismatch, dan pembersihan unmount otomatis.',
      en: 'Official GSAP skill for React & Next.js: useGSAP hook, ref scoping, SSR hydration safety, and automated unmount cleanup.',
    },
    detailedDescription: {
      id: 'Skill integrasi resmi GSAP dengan React (@gsap/react). Memecahkan masalah klasik animasi di React: React StrictMode yang memicu mount dua kali di dev, kebocoran memori saat unmount, dan ketidakcocokan hidrasi SSR. Memperkenalkan hook `useGSAP()` yang secara otomatis membungkus kode ke dalam `gsap.context()`, mengisolasi selector DOM ke scope komponen (`scope: containerRef`), serta mengeksekusi pembersihan (revert) instan saat komponen di-unmount.',
      en: 'Official integration skill for GSAP with React (@gsap/react). Solves classic React animation bugs: StrictMode double-mounting in development, dangling memory leaks on unmount, and SSR hydration mismatches. Employs the `useGSAP()` hook which automatically wraps executions in `gsap.context()`, scopes DOM query selectors (`scope: containerRef`), and guarantees automated cleanup (reversion) when components unmount.',
    },
    useWhen: {
      id: [
        'Menulis atau merefaktor animasi GSAP di dalam komponen React, Next.js, atau Remix.',
        'Mencegah animasi berkedip atau berjalan ganda akibat React 18/19 StrictMode.',
        'Mengisolasi selector CSS agar tidak bocor ke komponen lain di halaman.',
      ],
      en: [
        'Authoring or refactoring GSAP animations inside React, Next.js, or Remix components.',
        'Preventing double-animation glitches caused by React 18/19 StrictMode.',
        'Scoping CSS query selectors to isolate animations within component boundaries.',
      ],
    },
    avoidWhen: {
      id: [
        'Aplikasi yang menggunakan framework lain seperti Vue atau Svelte (gunakan gsap-frameworks).',
      ],
      en: [
        'Applications built on alternate frameworks like Vue or Svelte (use gsap-frameworks).',
      ],
    },
    howItWorks: {
      id: [
        'Mengimpor hook `useGSAP` dari `@gsap/react`.',
        'Mengoper `scope: containerRef` untuk membatasi selector seperti `.box` hanya di dalam container.',
        'useGSAP otomatis membuat `gsap.context()` dan memanggil `ctx.revert()` saat unmount.',
      ],
      en: [
        'Imports the `useGSAP` hook from `@gsap/react`.',
        'Passes `scope: containerRef` so class selectors like `.box` are evaluated strictly within the container ref.',
        'useGSAP initializes `gsap.context()` under the hood and executes `ctx.revert()` upon unmount.',
      ],
    },
    coreRules: {
      id: [
        'Selalu gunakan `useGSAP()` alih-alih `useEffect()` standar untuk menganimasikan elemen di React.',
        'Sertakan `{ scope: containerRef }` agar selector teks tidak memindai elemen di luar komponen.',
        'Jangan pernah membuat tween di luar scope useGSAP tanpa pembersihan manual.',
      ],
      en: [
        'Always use `useGSAP()` instead of plain `useEffect()` when authoring animations in React.',
        'Provide `{ scope: containerRef }` to ensure string selectors are isolated to component DOM trees.',
        'Never spawn tweens outside useGSAP scopes without explicit manual cleanup.',
      ],
    },
    tips: {
      id: [
        'Di Next.js App Router, pastikan komponen yang menggunakan GSAP memiliki direktif `"use client"` di baris pertama.',
      ],
      en: [
        'In Next.js App Router, ensure animation components declare `"use client"` at the top of the file.',
      ],
    },
    pairsWellWith: ['gsap-core', 'gsap-scrolltrigger', 'vercel-react-best-practices'],
    spotlight: {
      title: {
        id: 'useGSAP Menghentikan StrictMode Double-Mounting',
        en: 'useGSAP Eliminates StrictMode Double-Mounting Bugs',
      },
      body: {
        id: 'Di React 18 dan 19, StrictMode me-mount setiap komponen dua kali di local development. Jika Anda menggunakan `useEffect` biasa dengan `gsap.from()`, posisi awal elemen akan rusak karena animasi kedua mengambil posisi yang sedang dianimasikan oleh animasi pertama (from() from bug). Hook `useGSAP()` secara cerdas membatalkan (revert) seluruh state animasi pertama sebelum mount kedua dimulai, menjamin animasi tampil 100% konsisten.',
        en: 'In React 18 and 19, StrictMode double-mounts every component during development. If you write `useEffect` with `gsap.from()`, initial positions corrupt as the second mount reads the in-flight animated coordinates (the infamous "from() from" bug). The `useGSAP()` hook automatically reverts all DOM modifications between mounts, guaranteeing deterministic rendering.',
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
      id: 'Skill resmi GSAP untuk ekosistem plugin: Flip, Draggable, ScrollToPlugin, SplitText, DrawSVG, MotionPath, dan kurva CustomEase.',
      en: 'Official GSAP skill for the plugin ecosystem: Flip, Draggable, ScrollToPlugin, SplitText, DrawSVG, MotionPath, and CustomEase.',
    },
    detailedDescription: {
      id: 'Panduan lengkap untuk plugin spesialis GSAP: 1) Flip Plugin untuk animasi perubahan layout state yang mulus (First-Last-Invert-Play); 2) Draggable & Inertia untuk interaksi drag-and-drop dengan lemparan inersia natural; 3) ScrollToPlugin untuk scroll animasi halus ke anchor atau posisi pixel tertentu; 4) DrawSVG & MorphSVG untuk animasi path vector SVG tingkat bioskop; 5) SplitText untuk memecah teks menjadi kata/karakter individu untuk animasi tipografi; 6) CustomEase untuk membuat kurva easing matematika bebas.',
      en: 'Complete guide for GSAP specialized plugins: 1) Flip Plugin for seamless layout state transitions (First-Last-Invert-Play); 2) Draggable & Inertia for natural drag-and-drop mechanics with physics tossing; 3) ScrollToPlugin for smooth programmatic scrolling to anchors or coordinates; 4) DrawSVG & MorphSVG for cinema-grade vector path animations; 5) SplitText for slicing text into animated characters or words; 6) CustomEase for bespoke mathematical cubic bezier curves.',
    },
    useWhen: {
      id: [
        'Menganimasikan perubahan layout dinamis (misal grid filter, kartu yang membesar menjadi modal) dengan Flip.',
        'Membangun carousel atau UI swipe kustom dengan Draggable.',
        'Menganimasikan garis SVG atau transisi teks berkarakter tipografi halus.',
      ],
      en: [
        'Animating dynamic layout shifts (e.g. grid filtering, expanding card-to-modal transitions) with Flip.',
        'Building custom carousels or swipeable sheets with Draggable.',
        'Animating SVG path drawing or fine-grained typography splitting.',
      ],
    },
    avoidWhen: {
      id: [
        'Animasi posisi atau opacity standar yang tidak membutuhkan kemampuan plugin khusus.',
      ],
      en: [
        'Standard position or opacity tweens requiring zero specialized plugin features.',
      ],
    },
    howItWorks: {
      id: [
        'Mendaftarkan plugin via `gsap.registerPlugin(Flip, Draggable, ...)`.',
        'Mengambil snapshot state awal dengan `Flip.getState(targets)`, mengubah DOM, lalu memanggil `Flip.from(state, {...})`.',
      ],
      en: [
        'Registers target plugins via `gsap.registerPlugin(Flip, Draggable, ...)`.',
        'Snapshots initial layout state via `Flip.getState(targets)`, applies DOM changes, and executes `Flip.from(state, {...})`.',
      ],
    },
    coreRules: {
      id: [
        'Selalu daftarkan seluruh plugin yang digunakan sebelum membuat animasi.',
        'Pastikan elemen target memiliki ID atau data attribute unik saat menggunakan Flip untuk pelacakan record.',
      ],
      en: [
        'Always register all imported plugins before authoring animations.',
        'Ensure target elements possess unique IDs or dataset keys when employing Flip.',
      ],
    },
    tips: {
      id: [
        'Gunakan `Flip.from(state, { absolute: true })` untuk mencegah pergeseran layout mendadak saat elemen di-reparent.',
      ],
      en: [
        'Use `Flip.from(state, { absolute: true })` to prevent layout jumps during DOM reparenting.',
      ],
    },
    pairsWellWith: ['gsap-core', 'gsap-timeline', 'emil-design-eng'],
    spotlight: {
      title: {
        id: 'Flip Plugin: Animasi Layout Tanpa Layout Shift',
        en: 'Flip Plugin: Layout Transitions Without Layout Thrashing',
      },
      body: {
        id: 'Menganimasikan properti layout seperti `width`, `height`, atau posisi flexbox secara langsung adalah dosa besar performa web karena memicu reflow browser pada setiap frame. Flip Plugin memecahkan ini: ia mencatat posisi awal (First) dan posisi akhir (Last), menghitung selisihnya (Invert), lalu menganimasikan perubahannya murni menggunakan GPU transform `x`, `y`, dan `scale` (Play) pada 60FPS.',
        en: 'Directly animating CSS layout properties like `width`, `height`, or flexbox positioning causes massive browser layout thrashing on every frame. GSAP Flip solves this elegantly: it records the First and Last positions, Inverts the differences, and Plays the transition purely through GPU transforms (`x`, `y`, `scale`) at a silky 60FPS.',
      },
    },
    sourcePath: 'skills/gsap-plugins/SKILL.md',
  },
  {
    name: 'gsap-performance',
    category: 'performance-optimization',
    invocation: 'model',
    description: {
      id: 'Skill resmi GSAP untuk performa: prioritas transform GPU, eliminasi layout thrashing, will-change selektif, dan batching render 60FPS.',
      en: 'Official GSAP skill for performance: GPU transforms, layout thrashing elimination, selective will-change, and 60FPS batching.',
    },
    detailedDescription: {
      id: 'Skill audit performa untuk memastikan seluruh animasi web berjalan stabil pada 60FPS di berbagai perangkat. Menganalisis dan mengeliminasi penyebab lag/jank: penggantian animasi `top`/`left` menjadi `x`/`y`, penghindaran pembacaan layout DOM sinkron di tengah loop render, penggunaan selektif `will-change: transform`, pengelompokan (batching) perhitungan ScrollTrigger, serta pembersihan memori tween yang sudah selesai.',
      en: 'Performance audit skill to ensure all web animations run at a rock-solid 60FPS across low-power and mobile devices. Eliminates common animation jank sources: converting `top`/`left` to hardware-accelerated `x`/`y`, eradicating forced synchronous layout recalculations in render loops, selective `will-change` application, batching ScrollTrigger queries, and aggressive garbage collection of completed tweens.',
    },
    useWhen: {
      id: [
        'Mengoptimalkan animasi yang terasa patah-patah (jank) atau memicu penurunan frame rate.',
        'Menganimasikan ratusan elemen grafis secara simultan di layar.',
        'Mengaudit konsumsi baterai dan beban CPU pada animasi landing page panjang.',
      ],
      en: [
        'Optimizing stuttering animations or eliminating dropped frames on mobile viewports.',
        'Animating hundreds of concurrent graphical elements on screen.',
        'Auditing CPU load and battery consumption on asset-heavy landing pages.',
      ],
    },
    avoidWhen: {
      id: [
        'Animasi ringan standar yang sudah berjalan lancar di 60FPS tanpa masalah kinerja.',
      ],
      en: [
        'Trivial animations already performing smoothly at 60FPS.',
      ],
    },
    howItWorks: {
      id: [
        'Agent memindai properti tween: mendeteksi `width`, `height`, `top`, `left`, `margin`, atau `padding`.',
        'Mengonversi properti layout tersebut menjadi padanan transform `x`, `y`, `scaleX`, `scaleY`.',
        'Memastikan pembacaan ukuran DOM (`getBoundingClientRect`) dilakukan sebelum loop animasi dimulai.',
      ],
      en: [
        'Agent audits tween properties: detects layout properties like `width`, `height`, `top`, `left`, `margin`, or `padding`.',
        'Rewrites layout mutations into hardware-accelerated transform equivalents `x`, `y`, `scaleX`, `scaleY`.',
        'Ensures layout measurements (`getBoundingClientRect`) occur prior to animation loops.',
      ],
    },
    coreRules: {
      id: [
        'Jangan pernah menganimasikan properti layout (`left`, `top`, `margin`); selalu gunakan `x` dan `y`.',
        'Jangan pasang `will-change` secara permanen pada seluruh elemen; pasang hanya saat animasi aktif.',
        'Gunakan `ScrollTrigger.batch()` saat menganimasikan puluhan elemen yang muncul berurutan di scroll.',
      ],
      en: [
        'Never animate layout properties (`left`, `top`, `margin`); always use `x` and `y`.',
        'Do not leave `will-change` enabled permanently on all elements; apply only when active.',
        'Use `ScrollTrigger.batch()` when orchestrating staggered reveal animations on lists.',
      ],
    },
    tips: {
      id: [
        'Gunakan `gsap.ticker.fps(60)` jika perlu membatasi refresh rate maksimal pada perangkat layar 120Hz untuk menghemat daya baterai.',
      ],
      en: [
        'Use `gsap.ticker.fps(60)` to clamp maximum tick rates on 120Hz displays to preserve battery life.',
      ],
    },
    pairsWellWith: ['gsap-core', 'gsap-scrolltrigger', 'web-perf'],
    spotlight: {
      title: {
        id: 'Dosa Besar Layout Thrashing: x/y vs top/left',
        en: 'The Layout Thrashing Sin: x/y vs top/left',
      },
      body: {
        id: 'Menganimasikan `top` atau `left` memaksa browser menjalankan 3 tahapan rendering penuh di setiap frame: Recalculate Styles -> Layout (Reflow) -> Paint -> Composite. Sebaliknya, menganimasikan `x` atau `y` (CSS transform) melewati tahapan Layout dan Paint secara total, mengirim bitmap langsung ke GPU Composite layer. Hasilnya: beban CPU turun drastis dan frame rate terkunci mulus di 60FPS.',
        en: 'Animating `top` or `left` forces the browser engine through all 3 rendering pipeline phases on every single frame: Recalculate Styles -> Layout (Reflow) -> Paint -> Composite. Conversely, animating `x` or `y` (CSS transform) completely bypasses Layout and Paint, offloading textures directly to the GPU Composite layer. CPU utilization drops drastically while frame rates lock firmly at 60FPS.',
      },
    },
    sourcePath: 'skills/gsap-performance/SKILL.md',
  },
  {
    name: 'gsap-frameworks',
    category: 'framework-integration',
    invocation: 'model',
    description: {
      id: 'Skill resmi GSAP untuk Vue, Nuxt, Svelte, dan SvelteKit: lifecycle onMounted/onDestroy, scoping selector, dan pembersihan context.',
      en: 'Official GSAP skill for Vue, Nuxt, Svelte, and SvelteKit: lifecycle hooks, selector scoping, and context cleanup.',
    },
    detailedDescription: {
      id: 'Skill panduan integrasi GSAP untuk framework non-React (Vue 3, Nuxt 3, Svelte 4/5, SvelteKit). Mengajarkan penggunaan `gsap.context()` secara manual di dalam hook lifecycle framework (`onMounted`, `onUnmounted` di Vue; `onMount`, `onDestroy` di Svelte), scoping selector DOM lokal via template refs, serta penanganan SSR hydration yang aman di Nuxt dan SvelteKit.',
      en: 'Official integration skill for non-React component frameworks (Vue 3, Nuxt 3, Svelte 4/5, SvelteKit). Details manual `gsap.context()` instantiation inside component lifecycle boundaries (`onMounted`, `onUnmounted` in Vue; `onMount`, `onDestroy` in Svelte), DOM selector scoping via template refs, and SSR hydration safety in Nuxt and SvelteKit.',
    },
    useWhen: {
      id: [
        'Mengimplementasikan animasi GSAP di proyek Vue 3, Nuxt, Svelte, atau SvelteKit.',
        'Mengonfigurasi pembersihan memori otomatis saat komponen berpindah halaman.',
      ],
      en: [
        'Implementing GSAP animations inside Vue 3, Nuxt, Svelte, or SvelteKit projects.',
        'Configuring automated memory cleanup on component route transitions.',
      ],
    },
    avoidWhen: {
      id: [
        'Proyek React atau Next.js (gunakan gsap-react yang memiliki hook bawaan useGSAP).',
      ],
      en: [
        'React or Next.js codebases (use gsap-react which features the native useGSAP hook).',
      ],
    },
    howItWorks: {
      id: [
        'Membuat instance `ctx = gsap.context(() => { ... }, rootRef)` di dalam lifecycle mount.',
        'Menjalankan `ctx.revert()` di dalam lifecycle unmount.',
      ],
      en: [
        'Creates `ctx = gsap.context(() => { ... }, rootRef)` inside component mount hooks.',
        'Executes `ctx.revert()` during component unmount hooks.',
      ],
    },
    coreRules: {
      id: [
        'Selalu panggil `ctx.revert()` saat komponen di-unmount di Vue atau Svelte.',
      ],
      en: [
        'Always invoke `ctx.revert()` upon component unmount in Vue or Svelte.',
      ],
    },
    tips: {
      id: [
        'Di Nuxt 3, jalankan animasi hanya di client side dengan membungkusnya di dalam `onMounted` atau `<ClientOnly>`.',
      ],
      en: [
        'In Nuxt 3, ensure animations execute strictly client-side by scoping inside `onMounted` or `<ClientOnly>`.',
      ],
    },
    pairsWellWith: ['gsap-core', 'gsap-timeline'],
    spotlight: {
      title: {
        id: 'Pola gsap.context() untuk Vue dan Svelte',
        en: 'gsap.context() Pattern for Vue and Svelte',
      },
      body: {
        id: 'Di luar React yang memiliki hook `useGSAP()`, framework seperti Vue dan Svelte menggunakan pola `gsap.context()`. Dengan membungkus seluruh pembuatan tween ke dalam satu context object, satu baris `ctx.revert()` pada saat teardown komponen seketika mematikan seluruh tween, membatalkan ScrollTrigger, dan mengembalikan DOM ke keadaan aslinya tanpa memory leak.',
        en: 'Outside React which has `useGSAP()`, frameworks like Vue and Svelte rely on `gsap.context()`. Wrapping all tween creation inside one context object means a single `ctx.revert()` call on component teardown immediately terminates all in-flight tweens, detaches ScrollTriggers, and restores the DOM with zero dangling memory leaks.',
      },
    },
    sourcePath: 'skills/gsap-frameworks/SKILL.md',
  },
  {
    name: 'gsap-utils',
    category: 'math-utilities',
    invocation: 'model',
    description: {
      id: 'Skill resmi untuk utilitas matematika dan koleksi gsap.utils: clamp, mapRange, interpolate, random, snap, toArray, wrap, dan pipe.',
      en: 'Official skill for gsap.utils mathematics and collections: clamp, mapRange, interpolate, random, snap, toArray, wrap, and pipe.',
    },
    detailedDescription: {
      id: 'Skill referensi untuk utilitas kalkulasi matematika dan manipulasi koleksi bawaan GSAP (`gsap.utils`). Menghilangkan kebutuhan library eksternal seperti lodash: `clamp()` untuk membatasi nilai dalam rentang min-max, `mapRange()` untuk memetakan nilai dari satu domain angka ke domain lain, `snap()` untuk membulatkan nilai ke grid atau array titik koordinat terdekat, `interpolate()` untuk interpolasi linear, `wrap()` untuk looping nilai berputar, `toArray()` untuk mengonversi NodeList/selector menjadi array murni, dan `pipe()` untuk merangkai fungsi matematika secara fungsional.',
      en: 'Reference skill for GSAP built-in mathematical and array utilities (`gsap.utils`). Replaces external utility packages like lodash: `clamp()` for range boundary clamping, `mapRange()` for remapping values between arbitrary domains, `snap()` for rounding coordinates to the nearest grid step or coordinate array, `interpolate()` for linear value transitions, `wrap()` for circular index loops, `toArray()` for converting NodeLists into true arrays, and `pipe()` for functional function composition.',
    },
    useWhen: {
      id: [
        'Memetakan posisi kursor mouse atau nilai scroll ke rotasi/skala elemen UI (`mapRange`).',
        'Mengunci posisi drag elemen ke titik-titik grid tertentu (`snap`).',
        'Mengonversi selector string atau NodeList menjadi array murni yang aman di-map (`toArray`).',
      ],
      en: [
        'Mapping cursor coordinates or scroll offsets to element scale/rotation (`mapRange`).',
        'Snapping drag coordinates to discrete grid points (`snap`).',
        'Normalizing DOM NodeLists or query selector strings into true arrays (`toArray`).',
      ],
    },
    avoidWhen: {
      id: [
        'Operasi manipulasi data bisnis yang tidak terkait dengan koordinat atau kalkulasi animasi visual.',
      ],
      en: [
        'Business data operations unrelated to visual coordinates or animation math.',
      ],
    },
    howItWorks: {
      id: [
        'Memanggil fungsi utilitas langsung: `const clamp = gsap.utils.clamp(0, 100, val)`.',
        'Menggunakan bentuk currying (tanpa argumen nilai akhir) untuk menghasilkan fungsi transformasi reusable: `const mapper = gsap.utils.mapRange(0, window.innerWidth, -45, 45)`.',
      ],
      en: [
        'Direct invocation: `const clamped = gsap.utils.clamp(0, 100, val)`.',
        'Curried functional variant: `const mapper = gsap.utils.mapRange(0, window.innerWidth, -45, 45)` returning a reusable mapping closure.',
      ],
    },
    coreRules: {
      id: [
        'Gunakan `gsap.utils.toArray()` alih-alih `document.querySelectorAll()` mentah saat mengoper elemen ke GSAP.',
      ],
      en: [
        'Prefer `gsap.utils.toArray()` over raw `document.querySelectorAll()` when passing elements to GSAP.',
      ],
    },
    tips: {
      id: [
        'Gabungkan `gsap.utils.pipe()` untuk merangkai normalisasi, clamping, dan mapping menjadi satu fungsi tunggal yang elegan.',
      ],
      en: [
        'Chain `gsap.utils.pipe()` to compose normalization, clamping, and value mapping into one elegant transformer.',
      ],
    },
    pairsWellWith: ['gsap-core', 'gsap-scrolltrigger'],
    spotlight: {
      title: {
        id: 'Currying Fungsional pada gsap.utils',
        en: 'Functional Currying in gsap.utils',
      },
      body: {
        id: 'Seluruh helper di `gsap.utils` (seperti `mapRange`, `clamp`, `snap`) mendukung gaya currying: jika Anda tidak memberikan argumen nilai terakhir, fungsi akan mengembalikan fungsi transformer baru. Contoh: `const getRotation = gsap.utils.mapRange(0, 1000, 0, 360)`. Anda dapat memanggil `getRotation(scrollPos)` ribuan kali di event listener dengan performa optimal.',
        en: 'All helpers in `gsap.utils` (such as `mapRange`, `clamp`, `snap`) feature currying: omitting the final value argument returns a dedicated transformer function. Example: `const getRotation = gsap.utils.mapRange(0, 1000, 0, 360)`. You can invoke `getRotation(scrollPos)` thousands of times inside high-frequency event loops with zero allocation overhead.',
      },
    },
    sourcePath: 'skills/gsap-utils/SKILL.md',
  },
]
