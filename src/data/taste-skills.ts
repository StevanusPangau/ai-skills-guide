import type { BilingualString, BilingualList } from '@/types/skill'

// Verified against Leonxlnx/taste-skill @ a60a36dc2bb3bb77ccf17f2f62041f5ca8a458b9
// (2026-10-13, MIT). Each record is one installable skill. `name` is the skills.sh
// install name (frontmatter `name:`), not the folder. sourcePath is the SKILL.md path.
export const TASTE_SOURCE_REPO = 'github.com/Leonxlnx/taste-skill'
export const TASTE_SOURCE_SHA = 'a60a36dc2bb3bb77ccf17f2f62041f5ca8a458b9'
export const SOURCE_REPO = TASTE_SOURCE_REPO
export const SOURCE_SHA = TASTE_SOURCE_SHA

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

export const tasteSkills: RichSkill[] = [
  {
    name: 'design-taste-frontend',
    category: 'art-direction',
    invocation: 'model',
    description: {
      id: 'Skill default v2 untuk halaman publik: arah seni dari studi 247 situs, gambar nyata yang dikreditkan, dan inspeksi browser sebelum halaman dianggap selesai.',
      en: 'Default v2 skill for public pages: art direction from a study of 247 sites, credited real pictures, and a real-browser inspection before the page is called done.',
    },
    detailedDescription: {
      id: 'Install name `design-taste-frontend` (folder `skills/taste-skill`). Bukan skill dashboard. Satu run: inventaris materi klien, skrip `draw.mjs` membagi 3 dari 20 arah, agen memilih satu, membangun dari blueprint, lalu `lint.mjs` dan `inspect.mjs` mengukur house rules di 1440 / 768 / 390. Butuh Node 22+ dan Chrome, Edge, atau Chromium. Tidak memasang paket dan tidak butuh API key; jaringan hanya untuk mencari gambar.',
      en: 'Install name `design-taste-frontend` (folder `skills/taste-skill`). Not a dashboard skill. One run: inventory the client\'s own material, `draw.mjs` deals 3 of 20 directions, the agent picks one, builds from the blueprints, then `lint.mjs` and `inspect.mjs` measure the house rules at 1440 / 768 / 390. Needs Node 22+ and Chrome, Edge, or Chromium. Installs nothing and needs no API key; network is only for finding pictures.',
    },
    useWhen: {
      id: [
        'Membangun atau merapikan landing page, situs marketing, portfolio, atau halaman produk.',
        'Halaman terasa generik, templated, atau "buatan AI".',
      ],
      en: [
        'Building or restyling a landing page, marketing site, portfolio, or product page.',
        'The page looks generic, templated, or "AI-made".',
      ],
    },
    avoidWhen: {
      id: [
        'Dashboard atau layar aplikasi — pakai `minimalist-ui` atau `high-end-visual-design`.',
        'Proyek yang harus meniru perilaku v1 persis — pin `design-taste-frontend-v1`.',
      ],
      en: [
        'Dashboards or app screens — use `minimalist-ui` or `high-end-visual-design`.',
        'A project that must match v1 exactly — pin `design-taste-frontend-v1`.',
      ],
    },
    howItWorks: {
      id: [
        'Baca brief dan daftar apa yang hanya dimiliki klien ini.',
        '`node <skill>/scripts/draw.mjs` membagi tiga arah; agen memilih satu dan tidak mencampurnya dengan layout default.',
        'Tulis satu kalimat ide yang mengikat materi klien ke arah itu, lalu bangun hero dan section dari blueprint.',
        'Gambar: milik proyek, lalu hasil generate, lalu koleksi terbuka (Wikimedia, Openverse, Met: PD / CC0 / CC BY / CC BY-SA) yang diunduh dan dikreditkan.',
        '`lint.mjs` lalu `inspect.mjs` di tiga lebar. Agen melihat screenshot, memperbaiki tiga masalah teratas, maksimal tiga putaran.',
      ],
      en: [
        'Read the brief and list what only this client has.',
        '`node <skill>/scripts/draw.mjs` deals three directions; the agent picks one and does not blend it with a default layout.',
        'Write one idea sentence tying the client\'s material to that direction, then build the hero and sections from the blueprints.',
        'Imagery order: the project\'s own, then generated, then open collections (Wikimedia, Openverse, the Met: PD / CC0 / CC BY / CC BY-SA), downloaded and credited.',
        '`lint.mjs` then `inspect.mjs` at three widths. The agent reads the screenshots, fixes the top three problems, at most three rounds.',
      ],
    },
    coreRules: {
      id: [
        'Headline maksimal dua baris di setiap lebar. Kalimat pengantar adalah paragraf, bukan headline.',
        'Tanpa eyebrow, monospace di luar kode, nomor indeks 01/02/03, garis rambut, gradient, atau bayangan pada elemen yang diam.',
        'Tanpa palet asisten (krim+terracotta, ungu/indigo), glass, emoji, atau kata aksen bergaya di headline.',
        'Satu ground, satu tinta, satu aksen. Maksimal dua huruf. Brand yang sudah ada: `--keep palette,type`.',
      ],
      en: [
        'Headlines are two lines or fewer at every width. An intro sentence is a paragraph, not a headline.',
        'No eyebrows, no monospace outside code, no 01/02/03 index numbers, no hairlines, no gradients, no shadows on things at rest.',
        'No assistant palette (cream+terracotta, violet/indigo), no glass, no emoji, no styled accent word in a headline.',
        'One ground, one ink, one accent. Two typefaces at most. Existing brand: `--keep palette,type`.',
      ],
    },
    tips: {
      id: [
        'v2 tidak punya dial. Arah datang dari hasil draw; batas datang dari inspector.',
        'Jika brand sendiri memakai perangkat yang dilarang, pertahankan aset brand dan teruskan `--allow <rule>` hanya untuk aturan itu.',
      ],
      en: [
        'v2 has no dials. Direction comes from the draw; limits come from the inspector.',
        'If the brand itself requires a banned device, keep the brand asset and pass `--allow <rule>` for that rule only.',
      ],
    },
    pairsWellWith: ['redesign-existing-projects', 'image-to-code'],
    sourcePath: 'skills/taste-skill/SKILL.md',
    spotlight: {
      title: {
        id: 'Skrip yang membagi arah, bukan model yang mengarang',
        en: 'A script deals the direction, the model does not invent one',
      },
      body: {
        id: '`draw.mjs` membagi 3 dari 20 arah yang diteliti. Agen wajib mengadopsi satu, bukan mencampurnya dengan layout yang akan dibuat sendiri. Draw terbaru diingat supaya proyek tidak mengulang.',
        en: '`draw.mjs` deals 3 of 20 researched directions. The agent must adopt one, not blend it with the layout it would have made anyway. Recent draws are remembered so projects do not repeat.',
      },
    },
  },
  {
    name: 'redesign-existing-projects',
    category: 'redesign',
    invocation: 'model',
    description: {
      id: 'Audit UI yang sudah ada, lalu perbaiki tipografi, warna, layout, dan state tanpa menulis ulang dari nol.',
      en: 'Audit an existing UI, then fix typography, color, layout, and states without rewriting from scratch.',
    },
    detailedDescription: {
      id: 'Folder `skills/redesign-skill`. Tiga langkah: pindai stack (Tailwind, CSS, styled-components), diagnosa pola generik, lalu perbaiki di tempat. Bekerja di framework CSS apa pun.',
      en: 'Folder `skills/redesign-skill`. Three steps: scan the stack (Tailwind, CSS, styled-components), diagnose generic patterns, then fix in place. Works with any CSS approach.',
    },
    useWhen: {
      id: [
        'Halaman atau aplikasi sudah ada dan perlu naik kelas visual.',
        'Anda ingin daftar temuan dulu, bukan redesign buta.',
      ],
      en: [
        'A page or app already exists and needs a visual upgrade.',
        'You want a findings list first, not a blind rewrite.',
      ],
    },
    avoidWhen: {
      id: [
        'Halaman publik baru dari nol — mulai dari `design-taste-frontend`.',
        'Arah visual sudah dipilih (soft, minimal, brutalist) dan tidak perlu audit.',
      ],
      en: [
        'A new public page from scratch — start with `design-taste-frontend`.',
        'The visual direction is already chosen and no audit is needed.',
      ],
    },
    howItWorks: {
      id: [
        'Pindai codebase: framework dan cara styling.',
        'Jalankan audit: tipografi, permukaan, layout, state, konten, pola komponen.',
        'Terapkan perbaikan bertarget. Jangan rewrite.',
      ],
      en: [
        'Scan the codebase: framework and styling method.',
        'Run the audit: typography, surfaces, layout, states, content, component patterns.',
        'Apply targeted fixes. Do not rewrite.',
      ],
    },
    coreRules: {
      id: [
        'Ganti font default/Inter dengan huruf yang berkarakter. Lebar paragraf sekitar 65 karakter. Pakai bobot 500 dan 600, bukan hanya 400/700.',
        'Jangan latar `#000`. Satu aksen, saturasi di bawah 80%. Jangan gradient ungu/biru khas AI.',
        'Jangan tiga kartu sama sebagai baris fitur. `min-height: 100dvh`, bukan `height: 100vh`.',
        'Wajib hover, active, focus ring, skeleton, empty state, dan error inline. Animasi hanya `transform` dan `opacity`.',
      ],
      en: [
        'Replace default fonts or Inter with a face that has character. Paragraphs near 65 characters. Use 500 and 600 weights, not only 400/700.',
        'No `#000` backgrounds. One accent, saturation under 80%. No purple/blue AI gradient.',
        'No three equal cards as the feature row. `min-height: 100dvh`, not `height: 100vh`.',
        'Hover, active, focus ring, skeletons, empty states, and inline errors are required. Animate only `transform` and `opacity`.',
      ],
    },
    tips: {
      id: [
        'Larangan copy: Elevate, Seamless, Unleash, Next-Gen, Delve, Tapestry, serta "Oops!" dan tanda seru di pesan sukses.',
        'Angka palsu bulat (`99.99%`) diganti data organik. Jangan Lorem Ipsum atau Acme Corp.',
      ],
      en: [
        'Banned copy: Elevate, Seamless, Unleash, Next-Gen, Delve, Tapestry, plus "Oops!" and exclamation marks in success messages.',
        'Replace fake round numbers (`99.99%`) with organic data. No Lorem Ipsum or Acme Corp.',
      ],
    },
    pairsWellWith: ['design-taste-frontend', 'high-end-visual-design', 'minimalist-ui'],
    sourcePath: 'skills/redesign-skill/SKILL.md',
    spotlight: {
      title: {
        id: 'Tiga kartu sama adalah sidik jari layout AI',
        en: 'Three equal cards are the AI layout fingerprint',
      },
      body: {
        id: 'Baris fitur tiga kolom sama diganti zig-zag 2 kolom, grid asimetris, scroll horizontal, atau masonry. Jangan menulis ulang halaman hanya untuk menghapus pola itu.',
        en: 'The equal three-column feature row is replaced with a 2-column zig-zag, an asymmetric grid, horizontal scroll, or masonry. Do not rewrite the page just to remove that pattern.',
      },
    },
  },
  {
    name: 'image-to-code',
    category: 'image-pipeline',
    invocation: 'model',
    description: {
      id: 'Pipeline gambar dulu: generate referensi per section, analisis, lalu kode yang mengikuti gambar — bukan sebaliknya.',
      en: 'Image-first pipeline: generate a reference per section, analyze it, then code to match — not the other way around.',
    },
    detailedDescription: {
      id: 'Folder `skills/image-to-code-skill`. Untuk tugas web yang visualnya penting, agen wajib membuat gambar sendiri dulu, menganalisisnya, lalu mengimplementasikan situs agar sedekat mungkin. Di Codex, gambar harus besar dan per section, bukan papan kecil yang dikompres.',
      en: 'Folder `skills/image-to-code-skill`. For visually important web work the agent must generate the images itself, analyze them, then implement the site to match. In Codex, images must be large and section-specific, not one tiny compressed board.',
    },
    useWhen: {
      id: [
        'Anda ingin referensi visual dulu, baru implementasi.',
        'Agen biasanya langsung menulis layout generik tanpa arah gambar.',
      ],
      en: [
        'You want visual references before implementation.',
        'The agent usually jumps straight to a generic layout with no image direction.',
      ],
    },
    avoidWhen: {
      id: [
        'Deliverable-nya hanya gambar, tanpa kode — pakai skill imagegen.',
        'Halaman sudah ada dan hanya perlu audit — pakai `redesign-existing-projects`.',
      ],
      en: [
        'The deliverable is images only, no code — use an imagegen skill.',
        'The page already exists and only needs an audit — use `redesign-existing-projects`.',
      ],
    },
    howItWorks: {
      id: [
        'Generate gambar baru per section. Jangan crop gambar lama.',
        'Analisis tiap gambar: hierarki, palet, tipe, komposisi.',
        'Kode mengikuti gambar. Hero harus bersih dan terbaca di laptop kecil.',
        'Sebut pipeline di prompt: generate, lalu analisis, lalu kode.',
      ],
      en: [
        'Generate a fresh image per section. Do not crop an old one.',
        'Analyze each image: hierarchy, palette, type, composition.',
        'Code follows the image. The hero must stay clean and readable on a small laptop.',
        'State the pipeline in the prompt: generate, then analyze, then code.',
      ],
    },
    coreRules: {
      id: [
        'Gambar wajib dibuat lebih dulu. Under-generation dianggap gagal.',
        'Satu gambar per section, cukup besar untuk dibaca. Jangan crop.',
        'Tanpa kartu-dalam-kartu-dalam-kartu. Hero bersih dan luas.',
      ],
      en: [
        'Images come first. Under-generation is a failure.',
        'One large readable image per section. Do not crop.',
        'No cards-inside-cards-inside-cards. Keep the hero clean and spacious.',
      ],
    },
    tips: {
      id: [
        'Jika satu section tidak terbaca, generate gambar detail baru, jangan perbesar crop.',
        'Setelah gambar selesai, serahkan frame ke agen kode atau lanjutkan di skill yang sama.',
      ],
      en: [
        'If a section is unreadable, generate a fresh detail image. Do not enlarge a crop.',
        'After the frames exist, hand them to the coding agent or continue in the same skill.',
      ],
    },
    pairsWellWith: ['imagegen-frontend-web', 'design-taste-frontend'],
    sourcePath: 'skills/image-to-code-skill/SKILL.md',
    spotlight: {
      title: {
        id: 'Jangan crop gambar lama',
        en: 'Do not crop an old image',
      },
      body: {
        id: 'Section atau tampilan detail yang kurang harus berupa gambar mandiri yang baru, bukan potongan papan sebelumnya. Papan kecil yang dikompres gagal sebagai referensi implementasi.',
        en: 'A missing section or detail view must be a fresh standalone image, not a crop of the previous board. A tiny compressed board fails as an implementation reference.',
      },
    },
  },
  {
    name: 'gpt-taste',
    category: 'motion',
    invocation: 'model',
    description: {
      id: 'Varian lebih ketat untuk GPT/Codex: layout diacak lewat rencana, struktur AIDA, dan GSAP ScrollTrigger.',
      en: 'Stricter GPT/Codex variant: a planned layout draw, AIDA structure, and GSAP ScrollTrigger.',
    },
    detailedDescription: {
      id: 'Folder `skills/gpt-tasteskill`. Sebelum UI, agen menulis `<design_plan>` yang mensimulasikan pemilihan hero, huruf, komponen, dan paradigma GSAP. Bukan pengganti `design-taste-frontend` untuk halaman yang butuh inspector browser.',
      en: 'Folder `skills/gpt-tasteskill`. Before any UI, the agent writes a `<design_plan>` that simulates picking the hero, type, components, and GSAP paradigms. Not a replacement for `design-taste-frontend` when you need the browser inspector.',
    },
    useWhen: {
      id: [
        'Modelnya GPT atau Codex dan layout-nya selalu sama.',
        'Anda ingin pin, scrub, dan stacking GSAP yang eksplisit.',
      ],
      en: [
        'The model is GPT or Codex and the layout always comes out the same.',
        'You want explicit GSAP pin, scrub, and stacking.',
      ],
    },
    avoidWhen: {
      id: [
        'Anda butuh house rules v2 yang diukur `inspect.mjs`.',
        'Arahnya sudah tenang atau editorial — pakai `high-end-visual-design` atau `minimalist-ui`.',
      ],
      en: [
        'You need the v2 house rules measured by `inspect.mjs`.',
        'The direction is already calm or editorial — use `high-end-visual-design` or `minimalist-ui`.',
      ],
    },
    howItWorks: {
      id: [
        'Tulis `<design_plan>`: hero, stack huruf, 3 komponen, 2 paradigma GSAP.',
        'Nav premium, lalu AIDA: Attention, Interest, Desire, Action.',
        'Bento memakai `grid-flow-dense` supaya tidak ada sel mati.',
        'Semua animasi menghormati `prefers-reduced-motion`.',
      ],
      en: [
        'Write a `<design_plan>`: hero, type stack, 3 components, 2 GSAP paradigms.',
        'A premium nav, then AIDA: Attention, Interest, Desire, Action.',
        'Bento grids use `grid-flow-dense` so no cell is left dead.',
        'Every animation honors `prefers-reduced-motion`.',
      ],
    },
    coreRules: {
      id: [
        'H1 maksimal 2–3 baris. Pakai container lebar (`max-w-5xl` ke atas) sebelum mengecilkan ukuran.',
        'Huruf: Satoshi, Cabinet Grotesk, Outfit, atau Geist. Jangan Inter.',
        'Tanpa label "SECTION 01" / "ABOUT US", tanpa badge mengambang di hero, tanpa statistik mentah di hero.',
        'Bungkus halaman dengan `overflow-x-hidden` supaya animasi off-screen tidak membuat scroll horizontal.',
      ],
      en: [
        'The H1 is 2–3 lines. Use a wide container (`max-w-5xl` or wider) before shrinking the size.',
        'Type: Satoshi, Cabinet Grotesk, Outfit, or Geist. Never Inter.',
        'No "SECTION 01" / "ABOUT US" labels, no floating hero badges, no raw stats in the hero.',
        'Wrap the page in `overflow-x-hidden` so off-screen motion cannot create a horizontal scrollbar.',
      ],
    },
    tips: {
      id: [
        'Kontras tombol wajib: latar gelap = teks putih, dan sebaliknya.',
        'Kartu bento 3–5 buah lebih baik daripada 8 kartu berantakan.',
      ],
      en: [
        'Button contrast is mandatory: dark ground means white text, and the reverse.',
        'Three to five bento cards beat eight messy ones.',
      ],
    },
    pairsWellWith: ['design-taste-frontend', 'full-output-enforcement'],
    sourcePath: 'skills/gpt-tasteskill/SKILL.md',
    spotlight: {
      title: {
        id: 'Rencana desain sebelum satu baris UI',
        en: 'A design plan before any UI',
      },
      body: {
        id: 'Skill ini mensimulasikan pemilihan acak di `<design_plan>` karena model cenderung selalu mengambil opsi layout pertama. Tanpa blok itu, keluaran dianggap belum mulai.',
        en: 'The skill simulates a random pick inside `<design_plan>` because models tend to take the first layout option. Without that block, output has not started.',
      },
    },
  },
  {
    name: 'high-end-visual-design',
    category: 'style',
    invocation: 'model',
    description: {
      id: 'UI tenang dan mahal: kontras lembut, whitespace besar, bayangan sangat tipis, dan motion pegas.',
      en: 'Calm, expensive UI: soft contrast, large whitespace, very thin shadows, and spring motion.',
    },
    detailedDescription: {
      id: 'Folder `skills/soft-skill`. Memaksa satu arketipe vibe (gelas etereal, kemewahan editorial, atau strukturalisme lembut) plus satu arketipe layout, lalu membangun kartu dengan teknik double-bezel.',
      en: 'Folder `skills/soft-skill`. Forces one vibe archetype (ethereal glass, editorial luxury, or soft structuralism) plus one layout archetype, then builds cards with the double-bezel technique.',
    },
    useWhen: {
      id: [
        'Arah visual sudah "premium / tenang / agensi" dan bukan eksperimen kasar.',
        'Landing, produk konsumen, atau portfolio yang harus terasa mahal.',
      ],
      en: [
        'The visual direction is already "premium / calm / agency", not a harsh experiment.',
        'A landing page, consumer product, or portfolio that should feel expensive.',
      ],
    },
    avoidWhen: {
      id: [
        'Anda ingin bahasa mekanis tajam — pakai `industrial-brutalist-ui`.',
        'Anda ingin monokrom editorial datar — pakai `minimalist-ui`.',
      ],
      en: [
        'You want a sharp mechanical language — use `industrial-brutalist-ui`.',
        'You want flat editorial monochrome — use `minimalist-ui`.',
      ],
    },
    howItWorks: {
      id: [
        'Pilih satu vibe dan satu layout dari variance engine.',
        'Bangun kartu dengan kulit luar + inti dalam (double-bezel).',
        'Tombol utama adalah pill; ikon panah duduk di lingkaran sendiri.',
        'Di bawah 768px, rotasi dan tumpang-tindih dihapus; jadi satu kolom.',
      ],
      en: [
        'Pick one vibe and one layout from the variance engine.',
        'Build cards as an outer shell plus an inner core (double-bezel).',
        'Primary buttons are pills; a trailing arrow sits in its own circle.',
        'Below 768px, rotations and overlaps are removed; the page becomes one column.',
      ],
    },
    coreRules: {
      id: [
        'Huruf terlarang: Inter, Roboto, Arial, Open Sans, Helvetica.',
        'Tanpa border abu-abu generik dan tanpa `shadow-md` yang keras.',
        'Padding section minimal `py-24`. Transisi pakai cubic-bezier kustom, bukan `linear` atau `ease-in-out`.',
        '`backdrop-blur` hanya pada elemen fixed/sticky. Animasi hanya `transform` dan `opacity`.',
      ],
      en: [
        'Banned faces: Inter, Roboto, Arial, Open Sans, Helvetica.',
        'No generic gray borders and no harsh `shadow-md`.',
        'Section padding is at least `py-24`. Transitions use a custom cubic-bezier, not `linear` or `ease-in-out`.',
        '`backdrop-blur` only on fixed or sticky elements. Animate only `transform` and `opacity`.',
      ],
    },
    tips: {
      id: [
        'Jangan pakai `h-screen`. Pakai `min-h-[100dvh]` atau setara.',
        'Noise/grain hanya pada pseudo-element `position: fixed` yang `pointer-events: none`.',
      ],
      en: [
        'Do not use `h-screen`. Use `min-h-[100dvh]` or equivalent.',
        'Noise or grain only on a `position: fixed` pseudo-element with `pointer-events: none`.',
      ],
    },
    pairsWellWith: ['redesign-existing-projects', 'minimalist-ui'],
    sourcePath: 'skills/soft-skill/SKILL.md',
    spotlight: {
      title: {
        id: 'Double-bezel, bukan kartu border+shadow',
        en: 'Double-bezel, not a border-and-shadow card',
      },
      body: {
        id: 'Kartu besar punya kulit luar (ring halus + padding) dan inti dengan highlight inset. Tombol dengan panah menaruh ikon di lingkaran terpisah, bukan menempel polos di teks.',
        en: 'A major card has an outer shell (a fine ring plus padding) and an inner core with an inset highlight. A button with an arrow nests the icon in its own circle instead of sitting it naked next to the text.',
      },
    },
  },
  {
    name: 'minimalist-ui',
    category: 'style',
    invocation: 'model',
    description: {
      id: 'UI produk editorial: monokrom hangat, pastel pudar, kartu flat, tanpa gradient dan tanpa bayangan berat.',
      en: 'Editorial product UI: warm monochrome, washed pastels, flat cards, no gradients and no heavy shadows.',
    },
    detailedDescription: {
      id: 'Folder `skills/minimalist-skill`. Nuansa Notion/Linear: kanvas putih atau tulang (`#F7F6F3`), border `1px solid #EAEAEA`, radius kartu 8–12px, dan aksen pastel yang sudah ditentukan hex-nya.',
      en: 'Folder `skills/minimalist-skill`. Notion/Linear mood: a white or bone canvas (`#F7F6F3`), borders at `1px solid #EAEAEA`, card radius 8–12px, and pastel accents with fixed hex values.',
    },
    useWhen: {
      id: [
        'Produk, docs, atau alat yang harus terasa tenang dan terstruktur.',
        'Anda sudah memilih arah minimalis, bukan landing sinematik.',
      ],
      en: [
        'A product, docs site, or tool that should feel calm and structured.',
        'You already chose a minimal direction, not a cinematic landing page.',
      ],
    },
    avoidWhen: {
      id: [
        'Halaman publik yang butuh foto besar dan arah seni — pakai `design-taste-frontend`.',
        'Bahasa industri tajam — pakai `industrial-brutalist-ui`.',
      ],
      en: [
        'A public page that needs large photographs and art direction — use `design-taste-frontend`.',
        'A sharp industrial language — use `industrial-brutalist-ui`.',
      ],
    },
    howItWorks: {
      id: [
        'Tetapkan whitespace makro (`py-24` / `py-32`) dan lebar konten `max-w-4xl` atau `max-w-5xl`.',
        'Pasang hierarki huruf dan variabel warna monokrom segera.',
        'Semua kartu, pemisah, dan border memakai `1px solid #EAEAEA`.',
        'Masuk scroll hanya lewat `transform` + `opacity`, di belakang `prefers-reduced-motion`.',
      ],
      en: [
        'Set macro whitespace (`py-24` / `py-32`) and a content width of `max-w-4xl` or `max-w-5xl`.',
        'Apply the type hierarchy and monochrome color variables immediately.',
        'Every card, divider, and border uses `1px solid #EAEAEA`.',
        'Scroll entry uses only `transform` and `opacity`, gated by `prefers-reduced-motion`.',
      ],
    },
    coreRules: {
      id: [
        'Jangan Inter, Roboto, Open Sans. Jangan Lucide, Feather, atau Heroicons tipis — pakai Phosphor Bold/Fill atau Radix.',
        'Teks badan bukan `#000`. Pakai arang (`#111111` atau `#2F3437`) dengan line-height 1.6.',
        'Tanpa `rounded-full` pada kartu atau tombol utama. Tanpa emoji. Tanpa klise Elevate / Seamless / Unleash.',
        'Aksen hanya pastel yang ditentukan: merah `#FDEBEC`, biru `#E1F3FE`, hijau `#EDF3EC`, kuning `#FBF3DB`.',
      ],
      en: [
        'No Inter, Roboto, or Open Sans. No thin Lucide, Feather, or Heroicons — use Phosphor Bold/Fill or Radix.',
        'Body text is not `#000`. Use charcoal (`#111111` or `#2F3437`) at line-height 1.6.',
        'No `rounded-full` on cards or primary buttons. No emoji. No Elevate / Seamless / Unleash cliches.',
        'Accents are only the specified pastels: red `#FDEBEC`, blue `#E1F3FE`, green `#EDF3EC`, yellow `#FBF3DB`.',
      ],
    },
    tips: {
      id: [
        'Tombol utama: isi `#111111`, teks putih, radius 4–6px, active `scale(0.98)`.',
        'FAQ tanpa kotak: hanya `border-bottom`. Pintasan keyboard dirender sebagai `<kbd>`.',
      ],
      en: [
        'Primary button: fill `#111111`, white text, 4–6px radius, active `scale(0.98)`.',
        'FAQs have no boxes: only a `border-bottom`. Keyboard shortcuts render as `<kbd>`.',
      ],
    },
    pairsWellWith: ['high-end-visual-design', 'redesign-existing-projects'],
    sourcePath: 'skills/minimalist-skill/SKILL.md',
    spotlight: {
      title: {
        id: 'Empat pastel, bukan pelangi aksen',
        en: 'Four pastels, not an accent rainbow',
      },
      body: {
        id: 'Tag dan latar ikon hanya boleh memakai empat pasangan pastel yang sudah di-hex. Aksen jenuh atau hero berwarna primer dianggap gagal.',
        en: 'Tags and icon backgrounds may use only the four specified pastel pairs. A saturated accent or a primary-colored hero is a failure.',
      },
    },
  },
  {
    name: 'industrial-brutalist-ui',
    category: 'style',
    invocation: 'model',
    description: {
      id: 'Bahasa mekanis: tipe Swiss, kontras skala ekstrem, warna utilitarian, dan degradasi analog.',
      en: 'A mechanical language: Swiss type, extreme scale contrast, utilitarian color, and analog degradation.',
    },
    detailedDescription: {
      id: 'Folder `skills/brutalist-skill`. Menggabungkan cetak Swiss dengan estetika terminal militer. Cocok untuk dashboard padat, portfolio, atau situs editorial yang harus terasa seperti blueprint yang dideklasifikasi.',
      en: 'Folder `skills/brutalist-skill`. Fuses Swiss print with a military-terminal aesthetic. Fits dense dashboards, portfolios, or editorial sites that should feel like declassified blueprints.',
    },
    useWhen: {
      id: [
        'Arah visual sudah brutalist / industrial, bukan premium lembut.',
        'Data padat atau portfolio yang boleh terasa keras.',
      ],
      en: [
        'The visual direction is already brutalist / industrial, not soft premium.',
        'Dense data or a portfolio that is allowed to feel harsh.',
      ],
    },
    avoidWhen: {
      id: [
        'Produk konsumen yang harus terasa tenang — pakai `minimalist-ui` atau `high-end-visual-design`.',
        'Halaman publik yang aturannya justru melarang garis rambut dan nomor indeks — itu `design-taste-frontend`.',
      ],
      en: [
        'A consumer product that should feel calm — use `minimalist-ui` or `high-end-visual-design`.',
        'A public page whose rules ban hairlines and index numbers — that is `design-taste-frontend`.',
      ],
    },
    howItWorks: {
      id: [
        'Pilih arketipe Swiss Industrial atau telemetri taktis.',
        'Bangun grid kaku dan kontras skala tipe yang ekstrem.',
        'Tambahkan degradasi analog secukupnya, tanpa ornamen lucu.',
        'Tetap hormati reduced-motion dan target sentuh.',
      ],
      en: [
        'Pick the Swiss Industrial or tactical-telemetry archetype.',
        'Build a rigid grid and an extreme type-scale contrast.',
        'Add analog degradation sparingly, with no cute ornament.',
        'Still honor reduced-motion and touch targets.',
      ],
    },
    coreRules: {
      id: [
        'Bahasa visual keras: kontras tajam, grid kaku, skala tipe ekstrem.',
        'Bukan palet lembut dan bukan glassmorphism.',
        'Jangan dicampur dengan house rules v2 yang melarang garis dan nomor indeks.',
      ],
      en: [
        'The visual language is hard: sharp contrast, a rigid grid, extreme type scale.',
        'Not a soft palette and not glassmorphism.',
        'Do not mix it with the v2 house rules that ban rules and index numbers.',
      ],
    },
    tips: {
      id: [
        'Pakai skill ini hanya setelah arahnya memang brutalist. Jangan sebagai default landing.',
        'Degradasi analog adalah tekstur, bukan alasan untuk teks yang tidak terbaca.',
      ],
      en: [
        'Use this skill only after the direction is actually brutalist. Not as the default landing page.',
        'Analog degradation is texture, not an excuse for unreadable text.',
      ],
    },
    pairsWellWith: ['redesign-existing-projects', 'stitch-design-taste'],
    sourcePath: 'skills/brutalist-skill/SKILL.md',
    spotlight: {
      title: {
        id: 'Jangan dicampur dengan house rules v2',
        en: 'Do not mix it with the v2 house rules',
      },
      body: {
        id: 'v2 melarang garis rambut, nomor 01/02/03, dan monospace di luar kode. Brutalist justru memakai bahasa cetak itu. Pilih satu sistem, jangan digabung dalam satu halaman.',
        en: 'v2 bans hairlines, 01/02/03 numbers, and monospace outside code. Brutalist uses that print language on purpose. Pick one system; do not combine them on one page.',
      },
    },
  },
  {
    name: 'stitch-design-taste',
    category: 'design-system',
    invocation: 'model',
    description: {
      id: 'Aturan untuk Google Stitch, plus ekspor `DESIGN.md` opsional: atmosfer, warna, tipe, gerak, dan anti-pola.',
      en: 'Rules for Google Stitch, plus an optional `DESIGN.md` export: atmosphere, color, type, motion, and anti-patterns.',
    },
    detailedDescription: {
      id: 'Folder `skills/stitch-skill`. Menghasilkan sistem desain yang ramah agen: suasana (density / variance / motion skala 1–10), kalibrasi warna dengan hex, arsitektur tipe, dan daftar NEVER DO. Prasyarat: akses Google Stitch; MCP opsional.',
      en: 'Folder `skills/stitch-skill`. Produces an agent-friendly design system: atmosphere (density / variance / motion on a 1–10 scale), color calibration with hex values, a type architecture, and a NEVER DO list. Prerequisite: Google Stitch access; MCP is optional.',
    },
    useWhen: {
      id: [
        'Anda merancang di Google Stitch atau mengekspor `DESIGN.md`.',
        'Agen lain akan membaca token, bukan mengarang palet sendiri.',
      ],
      en: [
        'You are designing in Google Stitch or exporting a `DESIGN.md`.',
        'Another agent will read the tokens instead of inventing a palette.',
      ],
    },
    avoidWhen: {
      id: [
        'Tidak ada Stitch dan Anda hanya butuh halaman jadi — pakai `design-taste-frontend`.',
        'Sistem desain produk sudah ada dan hanya perlu dipoles.',
      ],
      en: [
        'There is no Stitch and you only need a finished page — use `design-taste-frontend`.',
        'The product design system already exists and only needs polish.',
      ],
    },
    howItWorks: {
      id: [
        'Tetapkan density, variance, dan motion pada skala 1–10.',
        'Petakan satu aksen (saturasi < 80%) di atas netral. Ungu/biru neon dilarang.',
        'Tulis komponen, layout, aturan responsif, dan filosofi motion ke `DESIGN.md`.',
        'Encode anti-pola sebagai aturan NEVER DO.',
      ],
      en: [
        'Set density, variance, and motion on a 1–10 scale.',
        'Map one accent (saturation < 80%) onto neutrals. Purple/blue neon is banned.',
        'Write components, layout, responsive rules, and motion philosophy into `DESIGN.md`.',
        'Encode anti-patterns as NEVER DO rules.',
      ],
    },
    coreRules: {
      id: [
        'Maksimal satu aksen. Jangan hitam murni. Inter dilarang untuk konteks premium.',
        'Hero terpusat dilarang saat variance di atas 4. Maksimal satu CTA primer.',
        'Baris tiga kartu sama dilarang. Full-height memakai `min-h-[100dvh]`, bukan `h-screen`.',
        'Di bawah 768px semua layout multi-kolom menjadi satu kolom. Target sentuh minimal 44px.',
      ],
      en: [
        'One accent maximum. No pure black. Inter is banned for premium contexts.',
        'A centered hero is banned when variance is above 4. One primary CTA maximum.',
        'The equal three-card row is banned. Full-height uses `min-h-[100dvh]`, not `h-screen`.',
        'Below 768px every multi-column layout becomes one column. Touch targets are at least 44px.',
      ],
    },
    tips: {
      id: [
        'Serif generik (Times, Georgia, Garamond) dilarang. Serif modern yang khas boleh jika editorial.',
        'Saat density di atas 7, semua angka memakai monospace.',
      ],
      en: [
        'Generic serifs (Times, Georgia, Garamond) are banned. A distinctive modern serif is allowed for editorial work.',
        'When density is above 7, every number uses monospace.',
      ],
    },
    pairsWellWith: ['design-taste-frontend', 'minimalist-ui'],
    sourcePath: 'skills/stitch-skill/SKILL.md',
    spotlight: {
      title: {
        id: 'Tiga dial suasana, lalu DESIGN.md',
        en: 'Three atmosphere dials, then DESIGN.md',
      },
      body: {
        id: 'Density, variance, dan motion (1–10) mengunci keputusan sebelum hex ditulis. File contoh ada di `skills/stitch-skill/DESIGN.md` pada repo upstream.',
        en: 'Density, variance, and motion (1–10) lock the decisions before any hex is written. A sample file lives at `skills/stitch-skill/DESIGN.md` in the upstream repo.',
      },
    },
  },
  {
    name: 'full-output-enforcement',
    category: 'output',
    invocation: 'model',
    description: {
      id: 'Paksa keluaran selesai: tanpa placeholder, tanpa bagian yang dipendekkan, dan pemecahan token yang bersih.',
      en: 'Force finished output: no placeholders, no shortened sections, and a clean token-limit split.',
    },
    detailedDescription: {
      id: 'Folder `skills/output-skill`. Bukan skill desain. Menghitung jumlah deliverable di awal, membangun semuanya utuh, lalu mencocokkan hitungan sebelum menjawab. Jika token habis, berhenti di batas bersih dan lanjutkan, jangan memampatkan sisa.',
      en: 'Folder `skills/output-skill`. Not a design skill. It counts deliverables up front, builds every one completely, then matches the count before answering. If the token budget runs out, it stops at a clean breakpoint and continues — it does not compress the rest.',
    },
    useWhen: {
      id: [
        'Agen sering berhenti di tengah file atau menulis komentar "sisanya serupa".',
        'Tugasnya punya banyak file, fungsi, atau bagian yang semuanya harus ada.',
      ],
      en: [
        'The agent often stops mid-file or writes "the rest is similar".',
        'The task has many files, functions, or sections that all have to exist.',
      ],
    },
    avoidWhen: {
      id: [
        'Anda memang minta ringkasan atau kerangka, bukan keluaran utuh.',
        'Sebagai pengganti skill desain. Ini hanya aturan keluaran.',
      ],
      en: [
        'You actually asked for a summary or a skeleton, not a full deliverable.',
        'As a substitute for a design skill. This is an output rule only.',
      ],
    },
    howItWorks: {
      id: [
        'Hitung deliverable yang diminta dan kunci angkanya.',
        'Bangun masing-masing sampai selesai. Tanpa draf parsial.',
        'Bandingkan hitungan dengan permintaan sebelum menjawab.',
        'Jika panjang, berhenti di akhir fungsi, file, atau bagian — lalu lanjutkan.',
      ],
      en: [
        'Count the requested deliverables and lock the number.',
        'Build each one to completion. No partial drafts.',
        'Compare the count with the request before answering.',
        'If it is long, stop at the end of a function, file, or section — then continue.',
      ],
    },
    coreRules: {
      id: [
        'Blok kode berisi kode yang bisa dijalankan, bukan deskripsi kode.',
        'Jangan memendekkan bagian demi menghemat ruang.',
        'Jangan meloncat ke kesimpulan selagi ada bagian yang belum ditulis.',
      ],
      en: [
        'Code blocks contain runnable code, not a description of what the code would do.',
        'Do not shorten a section to save space.',
        'Do not jump to a conclusion while a section is still unwritten.',
      ],
    },
    tips: {
      id: [
        'Pasangkan dengan skill desain jika modelnya memotong halaman di tengah section.',
        'Minta breakpoint eksplisit (nama file berikutnya) saat keluaran terbelah.',
      ],
      en: [
        'Pair it with a design skill when the model cuts a page off mid-section.',
        'Ask for an explicit breakpoint (the next file name) when the output splits.',
      ],
    },
    pairsWellWith: ['design-taste-frontend', 'gpt-taste', 'image-to-code'],
    sourcePath: 'skills/output-skill/SKILL.md',
    spotlight: {
      title: {
        id: 'Hitung dulu, baru tulis',
        en: 'Count first, then write',
      },
      body: {
        id: 'Langkah pertama mengunci jumlah deliverable. Sebelum menjawab, hitungan itu dicocokkan lagi. Yang kurang ditambahkan, bukan dijelaskan.',
        en: 'The first step locks the deliverable count. Before the answer, that count is matched again. Anything missing is added, not described.',
      },
    },
  },
  {
    name: 'imagegen-frontend-web',
    category: 'image-generation',
    invocation: 'model',
    description: {
      id: 'Gambar referensi situs: satu gambar horizontal terpisah per section, palet konsisten, bukan papan komposit.',
      en: 'Website reference images: one separate horizontal image per section, one consistent palette, not a composite board.',
    },
    detailedDescription: {
      id: 'Folder `skills/imagegen-frontend-web`. Hanya gambar, tanpa kode. Landing 8 section menghasilkan 8 gambar. Mengunci variasi komposisi, skala hero, dan tulang konsep sebelum frame pertama.',
      en: 'Folder `skills/imagegen-frontend-web`. Images only, no code. An 8-section landing page produces 8 images. It locks composition variety, hero scale, and a concept spine before the first frame.',
    },
    useWhen: {
      id: [
        'Deliverable-nya komposisi web untuk diterjemahkan agen kode.',
        'Anda memakai ChatGPT Images, Codex image mode, atau generator lain.',
      ],
      en: [
        'The deliverable is website comps a coding agent will recreate.',
        'You are using ChatGPT Images, Codex image mode, or another generator.',
      ],
    },
    avoidWhen: {
      id: [
        'Anda butuh kode dalam langkah yang sama — pakai `image-to-code`.',
        'Yang dibutuhkan layar aplikasi mobile — pakai `imagegen-frontend-mobile`.',
      ],
      en: [
        'You need code in the same step — use `image-to-code`.',
        'You need mobile app screens — use `imagegen-frontend-mobile`.',
      ],
    },
    howItWorks: {
      id: [
        'Petakan brief ke arah: tema, latar, tipe, arsitektur hero.',
        'Generate SATU gambar horizontal per section. Jangan digabung.',
        'Jaga satu palet di semua gambar dan satu tulang narasi.',
        'Serahkan frame ke agen kode.',
      ],
      en: [
        'Map the brief to a direction: theme, background, type, hero architecture.',
        'Generate ONE horizontal image per section. Do not merge them.',
        'Keep one palette across every image and one narrative spine.',
        'Hand the frames to the coding agent.',
      ],
    },
    coreRules: {
      id: [
        'Satu gambar per section. Delapan section = delapan gambar.',
        'Komposisi tidak selalu teks-kiri / gambar-kanan.',
        'Skala hero bervariasi (raksasa, sedang, atau minimal). Satu palet untuk seluruh set.',
      ],
      en: [
        'One image per section. Eight sections means eight images.',
        'Composition is not always left-text / right-image.',
        'Hero scale varies (giant, mid, or minimal). One palette for the whole set.',
      ],
    },
    tips: {
      id: [
        'Sebut jumlah section di prompt supaya generator tidak menjejalkan semuanya ke satu file.',
        'Frame yang sudah jadi menjadi masukan `image-to-code`, bukan diganti layout baru.',
      ],
      en: [
        'State the section count in the prompt so the generator does not cram everything into one file.',
        'Finished frames become the input to `image-to-code`. Do not replace them with a new layout.',
      ],
    },
    pairsWellWith: ['image-to-code', 'design-taste-frontend'],
    sourcePath: 'skills/imagegen-frontend-web/SKILL.md',
    spotlight: {
      title: {
        id: 'Satu section, satu file gambar',
        en: 'One section, one image file',
      },
      body: {
        id: 'Aturan keluaran pertama: jangan memampatkan banyak section ke satu gambar. Agen kode tidak bisa membaca hierarki dari papan yang terlalu padat.',
        en: 'The first output rule: do not compress many sections into one image. A coding agent cannot read hierarchy off an over-packed board.',
      },
    },
  },
  {
    name: 'imagegen-frontend-mobile',
    category: 'image-generation',
    invocation: 'model',
    description: {
      id: 'Gambar layar mobile: alur yang koheren, mockup ponsel, dan safe area — tanpa kode.',
      en: 'Mobile screen images: a coherent flow, a phone mockup, and safe areas — no code.',
    },
    detailedDescription: {
      id: 'Folder `skills/imagegen-frontend-mobile`. Untuk iOS, Android, atau netral lintas platform. Layar ditampilkan di dalam mockup ponsel, tetapi fokus tetap pada isi aplikasi. Tidak menulis kode.',
      en: 'Folder `skills/imagegen-frontend-mobile`. For iOS, Android, or a cross-platform neutral. Screens sit inside a phone mockup, but the focus stays on the app content. It does not write code.',
    },
    useWhen: {
      id: [
        'Anda butuh konsep layar atau alur aplikasi, bukan situs web.',
        'Set layar harus konsisten: nav, tipe, dan palet yang sama.',
      ],
      en: [
        'You need app screen concepts or a flow, not a website.',
        'The screen set must stay consistent: same nav, type, and palette.',
      ],
    },
    avoidWhen: {
      id: [
        'Yang dibutuhkan halaman web — pakai `imagegen-frontend-web`.',
        'Anda ingin implementasi React Native — ini hanya gambar.',
      ],
      en: [
        'You need a website — use `imagegen-frontend-web`.',
        'You want a React Native implementation — this skill only makes images.',
      ],
    },
    howItWorks: {
      id: [
        'Pilih mode platform: iOS, Android, atau netral.',
        'Generate cukup banyak layar untuk alur yang diminta. Jangan crop gambar lama.',
        'Layar pertama bersih. Hormati safe area dan wilayah sistem.',
        'Nav dan palet konsisten di seluruh set.',
      ],
      en: [
        'Pick a platform mode: iOS, Android, or neutral.',
        'Generate enough screens for the requested flow. Do not crop old images.',
        'The first screen stays clean. Honor safe areas and system regions.',
        'Navigation and palette stay consistent across the set.',
      ],
    },
    coreRules: {
      id: [
        'Default: layar di dalam bingkai ponsel, fokus pada isi.',
        'Jangan menghasilkan terlalu sedikit layar untuk alur yang diminta.',
        'Tanpa crop. Tanpa teks yang bertabrakan dengan status bar atau home indicator.',
        'Ikon kustom yang konsisten, bukan campuran set generik.',
      ],
      en: [
        'Default: screens inside a phone frame, focus on the content.',
        'Do not under-generate screens for the requested flow.',
        'No crops. No text colliding with the status bar or home indicator.',
        'Custom icons stay consistent. Do not mix generic sets.',
      ],
    },
    tips: {
      id: [
        'Sebut jumlah layar dan urutan alur di prompt.',
        'Onboarding punya aturan sendiri: jangan menjejalkan penjelasan ke layar pertama.',
      ],
      en: [
        'State the screen count and the flow order in the prompt.',
        'Onboarding has its own rule: do not cram the explanation onto the first screen.',
      ],
    },
    pairsWellWith: ['image-to-code', 'brandkit'],
    sourcePath: 'skills/imagegen-frontend-mobile/SKILL.md',
    spotlight: {
      title: {
        id: 'Mockup ada, isi yang utama',
        en: 'The mockup is there, the content leads',
      },
      body: {
        id: 'Bingkai iPhone atau ponsel serupa dipakai secara default, tetapi skill ini gagal jika bingkai lebih dominan daripada hierarki aplikasi.',
        en: 'An iPhone or similar frame is the default, but the skill fails when the frame dominates the app hierarchy.',
      },
    },
  },
  {
    name: 'brandkit',
    category: 'image-generation',
    invocation: 'model',
    description: {
      id: 'Papan identitas: arah logo, palet, huruf, dan penerapan — gambar saja, bukan file kode.',
      en: 'Identity boards: logo directions, palette, type, and applications — images only, not code.',
    },
    detailedDescription: {
      id: 'Folder `skills/brandkit`. Papan pedoman merek: logo, konstruksi, penerapan digital dan fisik, esensi, warna, tipografi, arah gambar. Default-nya grid panel 3×3; alternatif 2×3.',
      en: 'Folder `skills/brandkit`. Brand-guideline boards: logo, construction, digital and physical application, essence, color, typography, image direction. The default is a 3×3 panel grid; 2×3 is the alternative.',
    },
    useWhen: {
      id: [
        'Anda butuh arah identitas sebelum halaman atau aplikasi dibangun.',
        'Deliverable-nya papan, bukan komponen React.',
      ],
      en: [
        'You need an identity direction before a page or app is built.',
        'The deliverable is a board, not a React component.',
      ],
    },
    avoidWhen: {
      id: [
        'Merek sudah terkunci dan yang kurang adalah halaman — pakai `design-taste-frontend` dengan `--keep palette,type`.',
        'Anda butuh file desain vektor produksi. Ini konsep gambar.',
      ],
      en: [
        'The brand is already locked and you need a page — use `design-taste-frontend` with `--keep palette,type`.',
        'You need production vector files. This skill makes concept images.',
      ],
    },
    howItWorks: {
      id: [
        'Intake merek dan strategi lebih dulu, sebelum bentuk logo.',
        'Pilih metode konsep: monogram, aksi produk, metafora, ruang negatif, atau geometri konstruksi.',
        'Susun papan 3×3: sampul logo, konstruksi, penerapan, esensi, warna, tipe, fisik, arah gambar, detail sistem.',
        'Jaga tipografi jarang dan makna simbol yang disengaja.',
      ],
      en: [
        'Take the brand in and settle strategy before the logo shape.',
        'Pick a concept method: monogram, product action, metaphor, negative space, or construction geometry.',
        'Lay out a 3×3 board: logo cover, construction, application, essence, color, type, physical, image direction, system detail.',
        'Keep typography sparse and the symbol\'s meaning intentional.',
      ],
    },
    coreRules: {
      id: [
        'Strategi sebelum bentuk. Jangan langsung menggambar logo.',
        'Satu sistem visual di seluruh panel, bukan sembilan gaya campur.',
        'Huruf jarang. Mockup premium, bukan kolase stok acak.',
      ],
      en: [
        'Strategy before form. Do not draw a logo immediately.',
        'One visual system across every panel, not nine mixed styles.',
        'Sparse type. Premium mockups, not a random stock collage.',
      ],
    },
    tips: {
      id: [
        'Sebutkan kategori (mewah, developer tool, budaya, keamanan) supaya metode logo tidak generik.',
        'Papan yang disetujui menjadi `--keep palette,type` saat membangun halaman.',
      ],
      en: [
        'Name the category (luxury, developer tool, cultural, security) so the logo method is not generic.',
        'An approved board becomes `--keep palette,type` when the page is built.',
      ],
    },
    pairsWellWith: ['design-taste-frontend', 'stitch-design-taste', 'imagegen-frontend-web'],
    sourcePath: 'skills/brandkit/SKILL.md',
    spotlight: {
      title: {
        id: 'Sembilan panel, satu sistem',
        en: 'Nine panels, one system',
      },
      body: {
        id: 'Grid 3×3 mencakup sampul logo sampai detail sistem. Gagal jika tiap panel terlihat seperti merek yang berbeda.',
        en: 'The 3×3 grid runs from the logo cover to system detail. It fails when each panel looks like a different brand.',
      },
    },
  },
  {
    name: 'design-taste-frontend-v1',
    category: 'legacy',
    invocation: 'model',
    description: {
      id: 'v1 asli, dipertahankan untuk proyek yang bergantung pada perilakunya. Bukan default.',
      en: 'The original v1, kept for projects that depend on its behavior. Not the default.',
    },
    detailedDescription: {
      id: 'Folder `skills/taste-skill-v1`. High-agency frontend dengan dial di bagian atas file. Pakai hanya jika v2 merusak alur yang sudah ada. Default saat ini adalah `design-taste-frontend`.',
      en: 'Folder `skills/taste-skill-v1`. High-agency frontend with dials at the top of the file. Use it only when v2 breaks an existing workflow. The current default is `design-taste-frontend`.',
    },
    useWhen: {
      id: [
        'Proyek sudah di-generate dengan v1 dan harus tetap konsisten.',
        'Anda sengaja butuh dial DESIGN_VARIANCE, MOTION_INTENSITY, dan VISUAL_DENSITY.',
      ],
      en: [
        'A project was already generated with v1 and must stay consistent.',
        'You deliberately want the DESIGN_VARIANCE, MOTION_INTENSITY, and VISUAL_DENSITY dials.',
      ],
    },
    avoidWhen: {
      id: [
        'Proyek baru. Pakai `design-taste-frontend`.',
        'Anda butuh inspector browser dan gambar terkreditkan dari v2.',
      ],
      en: [
        'A new project. Use `design-taste-frontend`.',
        'You need the v2 browser inspector and credited pictures.',
      ],
    },
    howItWorks: {
      id: [
        'Baca tiga dial 1–10 di bagian atas file.',
        'Verifikasi dependensi di `package.json` sebelum mengimpor pustaka.',
        'Komponen interaktif dipisah sebagai leaf client component.',
        'Terapkan siklus interaksi lengkap, bukan hanya state sukses yang statis.',
      ],
      en: [
        'Read the three 1–10 dials at the top of the file.',
        'Verify dependencies in `package.json` before importing a library.',
        'Interactive components are extracted as client leaf components.',
        'Implement full interaction cycles, not only a static success state.',
      ],
    },
    coreRules: {
      id: [
        'Tanpa emoji. Ikon dari Phosphor atau Radix, dengan stroke yang distandardisasi.',
        'Jangan `h-screen`. Pakai `min-h-[100dvh]`.',
        'Grid, bukan matematika flex `calc()`.',
        'Jika motion tinggi, fisika magnetik tidak boleh memakai `useState` untuk posisi kursor.',
      ],
      en: [
        'No emoji. Icons from Phosphor or Radix, with a standardized stroke.',
        'No `h-screen`. Use `min-h-[100dvh]`.',
        'Grid, not flex `calc()` math.',
        'When motion is high, magnetic physics must not use `useState` for cursor position.',
      ],
    },
    tips: {
      id: [
        'Jangan memasang v1 dan v2 sebagai default bersamaan. Pilih satu untuk satu proyek.',
        'Dial ada di file, bukan di argumen CLI.',
      ],
      en: [
        'Do not install v1 and v2 as competing defaults. Pick one per project.',
        'The dials live in the file, not in a CLI argument.',
      ],
    },
    pairsWellWith: ['full-output-enforcement'],
    sourcePath: 'skills/taste-skill-v1/SKILL.md',
    spotlight: {
      title: {
        id: 'Tiga dial 1–10, bukan draw',
        en: 'Three 1–10 dials, not a draw',
      },
      body: {
        id: 'DESIGN_VARIANCE, MOTION_INTENSITY, dan VISUAL_DENSITY mengemudi layout. v2 menghapus dial ini: arah datang dari `draw.mjs`, batas dari inspector.',
        en: 'DESIGN_VARIANCE, MOTION_INTENSITY, and VISUAL_DENSITY drive the layout. v2 removes these dials: direction comes from `draw.mjs`, limits from the inspector.',
      },
    },
  },
  {
    name: 'design-taste-frontend-v2-experimental',
    category: 'legacy',
    invocation: 'model',
    description: {
      id: 'Rewrite satu file berbasis dial yang sempat menjadi default sebelum v2 sekarang. Untuk kompatibilitas.',
      en: 'The single-file dial-driven rewrite that was the default before current v2. For compatibility.',
    },
    detailedDescription: {
      id: 'Folder `skills/taste-skill-v2-experimental`. Masih membaca brief, mengeluarkan satu baris Design Read, lalu menyetel tiga dial. Bukan skill yang diukur `inspect.mjs`. Default sekarang tetap `design-taste-frontend`.',
      en: 'Folder `skills/taste-skill-v2-experimental`. It still reads the brief, emits a one-line Design Read, then sets three dials. It is not measured by `inspect.mjs`. The current default remains `design-taste-frontend`.',
    },
    useWhen: {
      id: [
        'Proyek sudah memakai rewrite dial satu file dan hasilnya harus stabil.',
        'Anda butuh peta brief ke design system (Material, Carbon, Fluent, Polaris) dari versi itu.',
      ],
      en: [
        'A project already uses the single-file dial rewrite and its output must stay stable.',
        'You need that version\'s brief-to-design-system map (Material, Carbon, Fluent, Polaris).',
      ],
    },
    avoidWhen: {
      id: [
        'Proyek baru. Pakai `design-taste-frontend`.',
        'Anda mengira ini masih default. Bukan.',
      ],
      en: [
        'A new project. Use `design-taste-frontend`.',
        'You think this is still the default. It is not.',
      ],
    },
    howItWorks: {
      id: [
        'Baca sinyal brief sebelum menyentuh kode.',
        'Keluarkan satu baris Design Read. Jika ambigu, tanyakan satu pertanyaan.',
        'Setel dial dari bacaan itu, atau pakai preset use-case.',
        'Jika brief adalah sistem desain sungguhan, pakai paket resminya. Jika hanya estetika, bangun kustom.',
      ],
      en: [
        'Read the brief\'s signals before touching code.',
        'Emit a one-line Design Read. If it is ambiguous, ask one question.',
        'Set the dials from that read, or use a use-case preset.',
        'If the brief is a real design system, use its official packages. If it is only an aesthetic, build custom.',
      ],
    },
    coreRules: {
      id: [
        'Jangan menebak brief yang ambigu. Satu pertanyaan, lalu baru generate.',
        'Dial mengemudi varians, motion, dan densitas. Jangan diabaikan setelah Design Read.',
        'Verifikasi dependensi sebelum impor. Tanpa emoji.',
        'Ini bukan v2 saat ini. Jangan berharap `draw.mjs` atau `inspect.mjs`.',
      ],
      en: [
        'Do not guess an ambiguous brief. One question, then generate.',
        'The dials drive variance, motion, and density. Do not ignore them after the Design Read.',
        'Verify dependencies before importing. No emoji.',
        'This is not current v2. Do not expect `draw.mjs` or `inspect.mjs`.',
      ],
    },
    tips: {
      id: [
        'Nama install sengaja panjang supaya tidak tertukar dengan `design-taste-frontend`.',
        'Jika v2 saat ini sudah cukup, jangan memasang versi ini sebagai cadangan di proyek yang sama.',
      ],
      en: [
        'The install name is deliberately long so it is not confused with `design-taste-frontend`.',
        'If current v2 is enough, do not install this as a fallback in the same project.',
      ],
    },
    pairsWellWith: ['design-taste-frontend-v1'],
    sourcePath: 'skills/taste-skill-v2-experimental/SKILL.md',
    spotlight: {
      title: {
        id: 'Design Read satu baris sebelum kode',
        en: 'A one-line Design Read before code',
      },
      body: {
        id: 'Versi ini mewajibkan satu baris bacaan desain (suasana, densitas, sistem atau estetika) sebelum generate. v2 saat ini menggantinya dengan inventaris klien dan hasil draw.',
        en: 'This version requires a one-line design read (mood, density, system or aesthetic) before generation. Current v2 replaces that with the client inventory and the draw.',
      },
    },
  },
]
