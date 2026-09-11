import type { BilingualString, BilingualList } from '@/types/skill'

export const IMPECCABLE_SOURCE_REPO = 'github.com/pbakaus/impeccable'
export const IMPECCABLE_SOURCE_SHA = 'main'
export const SOURCE_REPO = IMPECCABLE_SOURCE_REPO
export const SOURCE_SHA = IMPECCABLE_SOURCE_SHA

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

export const impeccableSkills: RichSkill[] = [
  {
    name: 'adapt',
    category: 'responsive-design',
    invocation: 'model',
    description: {
      id: 'Adaptasi layout responsif: penyesuaian breakpoint, layout fluid, touch target mobile, dan mode cetak.',
      en: 'Responsive design adaptation: breakpoint tuning, fluid layouts, mobile touch targets, and print modes.',
    },
    detailedDescription: {
      id: 'Adaptasi layout responsif: penyesuaian breakpoint, layout fluid, touch target mobile, dan mode cetak. Keterampilan desain dari Paul Bakaus (Impeccable) untuk membebaskan antarmuka dari pola visual generik AI.',
      en: 'Responsive design adaptation: breakpoint tuning, fluid layouts, mobile touch targets, and print modes. Design skill by Paul Bakaus (Impeccable) to liberate interfaces from generic synthetic AI aesthetics.',
    },
    useWhen: {
      id: [
        'Mengeksekusi perintah adapt untuk memoles atau memperbaiki desain UI.',
        'Meningkatkan standar visual antarmuka web ke tingkat desainer profesional.',
      ],
      en: [
        'Executing the adapt command to polish or repair UI design.',
        'Elevating web interface standards to senior designer grade.',
      ],
    },
    avoidWhen: {
      id: [
        'Tugas murni backend atau algoritma database tanpa antarmuka visual.',
      ],
      en: [
        'Pure backend or database tasks with no visual interface.',
      ],
    },
    howItWorks: {
      id: [
        'Agent membaca PRODUCT.md dan DESIGN.md untuk memahami batasan merek.',
        'Mengevaluasi komponen UI terhadap prinsip desain spesifik adapt.',
        'Menerapkan perubahan CSS/HTML yang presisi tanpa merusak fungsionalitas.',
      ],
      en: [
        'Agent reads PRODUCT.md and DESIGN.md to absorb brand boundaries.',
        'Evaluates UI components against adapt design principles.',
        'Applies targeted CSS/HTML refinements without breaking functionality.',
      ],
    },
    coreRules: {
      id: [
        'Selalu pertahankan hierarki visual dan aksesibilitas kontras.',
        'Hormati token desain yang sudah didefinisikan di dalam DESIGN.md.',
      ],
      en: [
        'Always preserve visual hierarchy and accessibility contrast ratios.',
        'Respect existing design tokens declared in DESIGN.md.',
      ],
    },
    tips: {
      id: [
        'Jalankan audit terlebih dahulu untuk mendapatkan gambaran skor kualitas teknis sebelum memoles.',
      ],
      en: [
        'Run audit first to establish a baseline technical quality score before polishing.',
      ],
    },
    pairsWellWith: ['audit', 'polish', 'normalize'],
    spotlight: {
      title: {
        id: 'Prinsip Fluid Layout di Atas Breakpoint Kaku',
        en: 'Fluid Layouts Over Rigid Breakpoints',
      },
      body: {
        id: 'Mencegah desain patah di layar tablet atau ponsel lipat dengan mengutamakan unit viewport relatif (clamp, min, max) daripada breakpoint kaku.',
        en: 'Prevents broken tablet or foldable layouts by prioritizing fluid math (clamp, min, max) over brittle fixed breakpoints.',
      },
    },
    sourcePath: 'skill/reference/adapt.md',
  },
  {
    name: 'animate',
    category: 'motion-delight',
    invocation: 'model',
    description: {
      id: 'Menyempurnakan UI dengan animasi mikro dan efek gerak yang meningkatkan kegunaan dan keterbacaan interaksi.',
      en: 'Enhance UI with purposeful micro-interactions, spring physics, and motion that elevates usability.',
    },
    detailedDescription: {
      id: 'Menyempurnakan UI dengan animasi mikro dan efek gerak yang meningkatkan kegunaan dan keterbacaan interaksi. Keterampilan desain dari Paul Bakaus (Impeccable) untuk membebaskan antarmuka dari pola visual generik AI.',
      en: 'Enhance UI with purposeful micro-interactions, spring physics, and motion that elevates usability. Design skill by Paul Bakaus (Impeccable) to liberate interfaces from generic synthetic AI aesthetics.',
    },
    useWhen: {
      id: [
        'Mengeksekusi perintah animate untuk memoles atau memperbaiki desain UI.',
        'Meningkatkan standar visual antarmuka web ke tingkat desainer profesional.',
      ],
      en: [
        'Executing the animate command to polish or repair UI design.',
        'Elevating web interface standards to senior designer grade.',
      ],
    },
    avoidWhen: {
      id: [
        'Tugas murni backend atau algoritma database tanpa antarmuka visual.',
      ],
      en: [
        'Pure backend or database tasks with no visual interface.',
      ],
    },
    howItWorks: {
      id: [
        'Agent membaca PRODUCT.md dan DESIGN.md untuk memahami batasan merek.',
        'Mengevaluasi komponen UI terhadap prinsip desain spesifik animate.',
        'Menerapkan perubahan CSS/HTML yang presisi tanpa merusak fungsionalitas.',
      ],
      en: [
        'Agent reads PRODUCT.md and DESIGN.md to absorb brand boundaries.',
        'Evaluates UI components against animate design principles.',
        'Applies targeted CSS/HTML refinements without breaking functionality.',
      ],
    },
    coreRules: {
      id: [
        'Selalu pertahankan hierarki visual dan aksesibilitas kontras.',
        'Hormati token desain yang sudah didefinisikan di dalam DESIGN.md.',
      ],
      en: [
        'Always preserve visual hierarchy and accessibility contrast ratios.',
        'Respect existing design tokens declared in DESIGN.md.',
      ],
    },
    tips: {
      id: [
        'Jalankan audit terlebih dahulu untuk mendapatkan gambaran skor kualitas teknis sebelum memoles.',
      ],
      en: [
        'Run audit first to establish a baseline technical quality score before polishing.',
      ],
    },
    pairsWellWith: ['audit', 'polish', 'normalize'],
    spotlight: {
      title: {
        id: 'Motion Fungsional Bukan Dekorasi Kosong',
        en: 'Functional Motion Over Empty Gimmicks',
      },
      body: {
        id: 'Animasi di Impeccable selalu memiliki tujuan informatif: memandu fokus mata pengguna, mengonfirmasi aksi berhasil, atau memberi feedback status.',
        en: 'Animations in Impeccable serve informational purpose: guiding user gaze, confirming success, or providing spatial orientation.',
      },
    },
    sourcePath: 'skill/reference/animate.md',
  },
  {
    name: 'audit',
    category: 'quality-assurance',
    invocation: 'model',
    description: {
      id: 'Audit kualitas teknis UI: pemeriksaan aksesibilitas WCAG, performa render, kontras warna, dan anti-patterns.',
      en: 'Technical UI quality audit: WCAG accessibility, rendering performance, color contrast, and design anti-patterns.',
    },
    detailedDescription: {
      id: 'Audit kualitas teknis UI: pemeriksaan aksesibilitas WCAG, performa render, kontras warna, dan anti-patterns. Keterampilan desain dari Paul Bakaus (Impeccable) untuk membebaskan antarmuka dari pola visual generik AI.',
      en: 'Technical UI quality audit: WCAG accessibility, rendering performance, color contrast, and design anti-patterns. Design skill by Paul Bakaus (Impeccable) to liberate interfaces from generic synthetic AI aesthetics.',
    },
    useWhen: {
      id: [
        'Mengeksekusi perintah audit untuk memoles atau memperbaiki desain UI.',
        'Meningkatkan standar visual antarmuka web ke tingkat desainer profesional.',
      ],
      en: [
        'Executing the audit command to polish or repair UI design.',
        'Elevating web interface standards to senior designer grade.',
      ],
    },
    avoidWhen: {
      id: [
        'Tugas murni backend atau algoritma database tanpa antarmuka visual.',
      ],
      en: [
        'Pure backend or database tasks with no visual interface.',
      ],
    },
    howItWorks: {
      id: [
        'Agent membaca PRODUCT.md dan DESIGN.md untuk memahami batasan merek.',
        'Mengevaluasi komponen UI terhadap prinsip desain spesifik audit.',
        'Menerapkan perubahan CSS/HTML yang presisi tanpa merusak fungsionalitas.',
      ],
      en: [
        'Agent reads PRODUCT.md and DESIGN.md to absorb brand boundaries.',
        'Evaluates UI components against audit design principles.',
        'Applies targeted CSS/HTML refinements without breaking functionality.',
      ],
    },
    coreRules: {
      id: [
        'Selalu pertahankan hierarki visual dan aksesibilitas kontras.',
        'Hormati token desain yang sudah didefinisikan di dalam DESIGN.md.',
      ],
      en: [
        'Always preserve visual hierarchy and accessibility contrast ratios.',
        'Respect existing design tokens declared in DESIGN.md.',
      ],
    },
    tips: {
      id: [
        'Jalankan audit terlebih dahulu untuk mendapatkan gambaran skor kualitas teknis sebelum memoles.',
      ],
      en: [
        'Run audit first to establish a baseline technical quality score before polishing.',
      ],
    },
    pairsWellWith: ['audit', 'polish', 'normalize'],
    spotlight: {
      title: {
        id: 'Skoring Severity P0-P3 Terukur',
        en: 'Actionable P0-P3 Severity Scored Audits',
      },
      body: {
        id: 'Menghasilkan laporan komprehensif dengan skor numerik dan peringkat prioritas: P0 (aksesibilitas kritis) hingga P3 (pemolesan mikro).',
        en: 'Emits structured audit reports with numerical quality scores and strict P0-P3 severity ratings for rapid remediation.',
      },
    },
    sourcePath: 'skill/reference/audit.md',
  },
  {
    name: 'bolder',
    category: 'visual-craft',
    invocation: 'model',
    description: {
      id: 'Memperkuat desain yang membosankan atau terlalu generik: meningkatkan kontras, hirarki visual, dan karakter kepribadian UI.',
      en: 'Amplify bland or timid designs: heighten visual hierarchy, bold contrast, and memorable aesthetic personality.',
    },
    detailedDescription: {
      id: 'Memperkuat desain yang membosankan atau terlalu generik: meningkatkan kontras, hirarki visual, dan karakter kepribadian UI. Keterampilan desain dari Paul Bakaus (Impeccable) untuk membebaskan antarmuka dari pola visual generik AI.',
      en: 'Amplify bland or timid designs: heighten visual hierarchy, bold contrast, and memorable aesthetic personality. Design skill by Paul Bakaus (Impeccable) to liberate interfaces from generic synthetic AI aesthetics.',
    },
    useWhen: {
      id: [
        'Mengeksekusi perintah bolder untuk memoles atau memperbaiki desain UI.',
        'Meningkatkan standar visual antarmuka web ke tingkat desainer profesional.',
      ],
      en: [
        'Executing the bolder command to polish or repair UI design.',
        'Elevating web interface standards to senior designer grade.',
      ],
    },
    avoidWhen: {
      id: [
        'Tugas murni backend atau algoritma database tanpa antarmuka visual.',
      ],
      en: [
        'Pure backend or database tasks with no visual interface.',
      ],
    },
    howItWorks: {
      id: [
        'Agent membaca PRODUCT.md dan DESIGN.md untuk memahami batasan merek.',
        'Mengevaluasi komponen UI terhadap prinsip desain spesifik bolder.',
        'Menerapkan perubahan CSS/HTML yang presisi tanpa merusak fungsionalitas.',
      ],
      en: [
        'Agent reads PRODUCT.md and DESIGN.md to absorb brand boundaries.',
        'Evaluates UI components against bolder design principles.',
        'Applies targeted CSS/HTML refinements without breaking functionality.',
      ],
    },
    coreRules: {
      id: [
        'Selalu pertahankan hierarki visual dan aksesibilitas kontras.',
        'Hormati token desain yang sudah didefinisikan di dalam DESIGN.md.',
      ],
      en: [
        'Always preserve visual hierarchy and accessibility contrast ratios.',
        'Respect existing design tokens declared in DESIGN.md.',
      ],
    },
    tips: {
      id: [
        'Jalankan audit terlebih dahulu untuk mendapatkan gambaran skor kualitas teknis sebelum memoles.',
      ],
      en: [
        'Run audit first to establish a baseline technical quality score before polishing.',
      ],
    },
    pairsWellWith: ['audit', 'polish', 'normalize'],
    spotlight: {
      title: {
        id: 'Antidot Desain AI Template Abu-Abu',
        en: 'The Antidote to Gray AI Slop',
      },
      body: {
        id: 'Mengubah tampilan landing page yang tampak seperti template AI generik menjadi karya berkarakter visual tajam, tipografi percaya diri, dan warna berani.',
        en: 'Transforms generic, washed-out AI templates into punchy, confident interfaces with bold typography and deliberate contrast.',
      },
    },
    sourcePath: 'skill/reference/bolder.md',
  },
  {
    name: 'clarify',
    category: 'ux-writing',
    invocation: 'model',
    description: {
      id: 'Memperjelas teks UI, pesan error, label form, dan instruksi agar mudah dipahami tanpa kebingungan.',
      en: 'Refine UX copy, error messages, form labels, and microcopy to eliminate cognitive friction.',
    },
    detailedDescription: {
      id: 'Memperjelas teks UI, pesan error, label form, dan instruksi agar mudah dipahami tanpa kebingungan. Keterampilan desain dari Paul Bakaus (Impeccable) untuk membebaskan antarmuka dari pola visual generik AI.',
      en: 'Refine UX copy, error messages, form labels, and microcopy to eliminate cognitive friction. Design skill by Paul Bakaus (Impeccable) to liberate interfaces from generic synthetic AI aesthetics.',
    },
    useWhen: {
      id: [
        'Mengeksekusi perintah clarify untuk memoles atau memperbaiki desain UI.',
        'Meningkatkan standar visual antarmuka web ke tingkat desainer profesional.',
      ],
      en: [
        'Executing the clarify command to polish or repair UI design.',
        'Elevating web interface standards to senior designer grade.',
      ],
    },
    avoidWhen: {
      id: [
        'Tugas murni backend atau algoritma database tanpa antarmuka visual.',
      ],
      en: [
        'Pure backend or database tasks with no visual interface.',
      ],
    },
    howItWorks: {
      id: [
        'Agent membaca PRODUCT.md dan DESIGN.md untuk memahami batasan merek.',
        'Mengevaluasi komponen UI terhadap prinsip desain spesifik clarify.',
        'Menerapkan perubahan CSS/HTML yang presisi tanpa merusak fungsionalitas.',
      ],
      en: [
        'Agent reads PRODUCT.md and DESIGN.md to absorb brand boundaries.',
        'Evaluates UI components against clarify design principles.',
        'Applies targeted CSS/HTML refinements without breaking functionality.',
      ],
    },
    coreRules: {
      id: [
        'Selalu pertahankan hierarki visual dan aksesibilitas kontras.',
        'Hormati token desain yang sudah didefinisikan di dalam DESIGN.md.',
      ],
      en: [
        'Always preserve visual hierarchy and accessibility contrast ratios.',
        'Respect existing design tokens declared in DESIGN.md.',
      ],
    },
    tips: {
      id: [
        'Jalankan audit terlebih dahulu untuk mendapatkan gambaran skor kualitas teknis sebelum memoles.',
      ],
      en: [
        'Run audit first to establish a baseline technical quality score before polishing.',
      ],
    },
    pairsWellWith: ['audit', 'polish', 'normalize'],
    spotlight: {
      title: {
        id: 'Mikrokopi Manusiawi Tanpa Jargon AI',
        en: 'Human Microcopy Without AI Jargon',
      },
      body: {
        id: 'Menghapus kata-kata klise robotik dan menggantinya dengan bahasa manusia yang ringkas, ramah, dan langsung membimbing aksi user.',
        en: 'Strips synthetic AI filler phrases, replacing them with concise, human-grade instructions that guide user momentum.',
      },
    },
    sourcePath: 'skill/reference/clarify.md',
  },
  {
    name: 'colorize',
    category: 'color-tokens',
    invocation: 'model',
    description: {
      id: 'Menata palet warna antarmuka: memastikan kontras rasio 4.5:1, saturasi harmonis, dan aksen yang tepat sasaran.',
      en: 'Harmonize interface color palettes: enforce 4.5:1 contrast ratios, coherent saturation, and focused accents.',
    },
    detailedDescription: {
      id: 'Menata palet warna antarmuka: memastikan kontras rasio 4.5:1, saturasi harmonis, dan aksen yang tepat sasaran. Keterampilan desain dari Paul Bakaus (Impeccable) untuk membebaskan antarmuka dari pola visual generik AI.',
      en: 'Harmonize interface color palettes: enforce 4.5:1 contrast ratios, coherent saturation, and focused accents. Design skill by Paul Bakaus (Impeccable) to liberate interfaces from generic synthetic AI aesthetics.',
    },
    useWhen: {
      id: [
        'Mengeksekusi perintah colorize untuk memoles atau memperbaiki desain UI.',
        'Meningkatkan standar visual antarmuka web ke tingkat desainer profesional.',
      ],
      en: [
        'Executing the colorize command to polish or repair UI design.',
        'Elevating web interface standards to senior designer grade.',
      ],
    },
    avoidWhen: {
      id: [
        'Tugas murni backend atau algoritma database tanpa antarmuka visual.',
      ],
      en: [
        'Pure backend or database tasks with no visual interface.',
      ],
    },
    howItWorks: {
      id: [
        'Agent membaca PRODUCT.md dan DESIGN.md untuk memahami batasan merek.',
        'Mengevaluasi komponen UI terhadap prinsip desain spesifik colorize.',
        'Menerapkan perubahan CSS/HTML yang presisi tanpa merusak fungsionalitas.',
      ],
      en: [
        'Agent reads PRODUCT.md and DESIGN.md to absorb brand boundaries.',
        'Evaluates UI components against colorize design principles.',
        'Applies targeted CSS/HTML refinements without breaking functionality.',
      ],
    },
    coreRules: {
      id: [
        'Selalu pertahankan hierarki visual dan aksesibilitas kontras.',
        'Hormati token desain yang sudah didefinisikan di dalam DESIGN.md.',
      ],
      en: [
        'Always preserve visual hierarchy and accessibility contrast ratios.',
        'Respect existing design tokens declared in DESIGN.md.',
      ],
    },
    tips: {
      id: [
        'Jalankan audit terlebih dahulu untuk mendapatkan gambaran skor kualitas teknis sebelum memoles.',
      ],
      en: [
        'Run audit first to establish a baseline technical quality score before polishing.',
      ],
    },
    pairsWellWith: ['audit', 'polish', 'normalize'],
    spotlight: {
      title: {
        id: 'Aturan Kontras WCAG AAA & Aksen Terarah',
        en: 'WCAG AAA Contrast & Intentional Accents',
      },
      body: {
        id: 'Mencegah antarmuka abu-abu di atas abu-abu yang sulit dibaca; mengatur peran warna: background tenang, surface jelas, dan aksen mencolok.',
        en: 'Eliminates low-contrast unreadable text; enforces clear color roles: calm canvas, distinct surfaces, and deliberate interactive pops.',
      },
    },
    sourcePath: 'skill/reference/colorize.md',
  },
  {
    name: 'critique',
    category: 'design-review',
    invocation: 'model',
    description: {
      id: 'Review desain mendalam: analisis komposisi, keseimbangan ritme visual, ruang negatif, dan konsistensi token.',
      en: 'In-depth design critique: analyze composition balance, visual rhythm, whitespace distribution, and token hygiene.',
    },
    detailedDescription: {
      id: 'Review desain mendalam: analisis komposisi, keseimbangan ritme visual, ruang negatif, dan konsistensi token. Keterampilan desain dari Paul Bakaus (Impeccable) untuk membebaskan antarmuka dari pola visual generik AI.',
      en: 'In-depth design critique: analyze composition balance, visual rhythm, whitespace distribution, and token hygiene. Design skill by Paul Bakaus (Impeccable) to liberate interfaces from generic synthetic AI aesthetics.',
    },
    useWhen: {
      id: [
        'Mengeksekusi perintah critique untuk memoles atau memperbaiki desain UI.',
        'Meningkatkan standar visual antarmuka web ke tingkat desainer profesional.',
      ],
      en: [
        'Executing the critique command to polish or repair UI design.',
        'Elevating web interface standards to senior designer grade.',
      ],
    },
    avoidWhen: {
      id: [
        'Tugas murni backend atau algoritma database tanpa antarmuka visual.',
      ],
      en: [
        'Pure backend or database tasks with no visual interface.',
      ],
    },
    howItWorks: {
      id: [
        'Agent membaca PRODUCT.md dan DESIGN.md untuk memahami batasan merek.',
        'Mengevaluasi komponen UI terhadap prinsip desain spesifik critique.',
        'Menerapkan perubahan CSS/HTML yang presisi tanpa merusak fungsionalitas.',
      ],
      en: [
        'Agent reads PRODUCT.md and DESIGN.md to absorb brand boundaries.',
        'Evaluates UI components against critique design principles.',
        'Applies targeted CSS/HTML refinements without breaking functionality.',
      ],
    },
    coreRules: {
      id: [
        'Selalu pertahankan hierarki visual dan aksesibilitas kontras.',
        'Hormati token desain yang sudah didefinisikan di dalam DESIGN.md.',
      ],
      en: [
        'Always preserve visual hierarchy and accessibility contrast ratios.',
        'Respect existing design tokens declared in DESIGN.md.',
      ],
    },
    tips: {
      id: [
        'Jalankan audit terlebih dahulu untuk mendapatkan gambaran skor kualitas teknis sebelum memoles.',
      ],
      en: [
        'Run audit first to establish a baseline technical quality score before polishing.',
      ],
    },
    pairsWellWith: ['audit', 'polish', 'normalize'],
    spotlight: {
      title: {
        id: 'Review Desain Jujur Standar Desainer Senior',
        en: 'Senior Designer-Level Honest Critiques',
      },
      body: {
        id: 'Memberikan evaluasi objektif dan kritis terhadap hierarki visual, konsistensi padding, dan kepadatan informasi sebelum kode di-merge.',
        en: 'Provides objective, uncompromising evaluations of visual hierarchy, spacing rhythms, and cognitive load before code review.',
      },
    },
    sourcePath: 'skill/reference/critique.md',
  },
  {
    name: 'delight',
    category: 'micro-interactions',
    invocation: 'model',
    description: {
      id: 'Menambahkan sentuhan mikro yang menyenangkan: efek hover responsif, suara subtil, dan transisi fisik natural.',
      en: 'Inject tasteful delight: playful hover states, tactile feedback, and organic spring dynamics.',
    },
    detailedDescription: {
      id: 'Menambahkan sentuhan mikro yang menyenangkan: efek hover responsif, suara subtil, dan transisi fisik natural. Keterampilan desain dari Paul Bakaus (Impeccable) untuk membebaskan antarmuka dari pola visual generik AI.',
      en: 'Inject tasteful delight: playful hover states, tactile feedback, and organic spring dynamics. Design skill by Paul Bakaus (Impeccable) to liberate interfaces from generic synthetic AI aesthetics.',
    },
    useWhen: {
      id: [
        'Mengeksekusi perintah delight untuk memoles atau memperbaiki desain UI.',
        'Meningkatkan standar visual antarmuka web ke tingkat desainer profesional.',
      ],
      en: [
        'Executing the delight command to polish or repair UI design.',
        'Elevating web interface standards to senior designer grade.',
      ],
    },
    avoidWhen: {
      id: [
        'Tugas murni backend atau algoritma database tanpa antarmuka visual.',
      ],
      en: [
        'Pure backend or database tasks with no visual interface.',
      ],
    },
    howItWorks: {
      id: [
        'Agent membaca PRODUCT.md dan DESIGN.md untuk memahami batasan merek.',
        'Mengevaluasi komponen UI terhadap prinsip desain spesifik delight.',
        'Menerapkan perubahan CSS/HTML yang presisi tanpa merusak fungsionalitas.',
      ],
      en: [
        'Agent reads PRODUCT.md and DESIGN.md to absorb brand boundaries.',
        'Evaluates UI components against delight design principles.',
        'Applies targeted CSS/HTML refinements without breaking functionality.',
      ],
    },
    coreRules: {
      id: [
        'Selalu pertahankan hierarki visual dan aksesibilitas kontras.',
        'Hormati token desain yang sudah didefinisikan di dalam DESIGN.md.',
      ],
      en: [
        'Always preserve visual hierarchy and accessibility contrast ratios.',
        'Respect existing design tokens declared in DESIGN.md.',
      ],
    },
    tips: {
      id: [
        'Jalankan audit terlebih dahulu untuk mendapatkan gambaran skor kualitas teknis sebelum memoles.',
      ],
      en: [
        'Run audit first to establish a baseline technical quality score before polishing.',
      ],
    },
    pairsWellWith: ['audit', 'polish', 'normalize'],
    spotlight: {
      title: {
        id: 'Sentuhan Halus yang Membuat UI Terasa Hidup',
        en: 'Subtle Polish That Breathes Life into UI',
      },
      body: {
        id: 'Menghadirkan detail kelezatan interaksi yang membuat pengguna betah tanpa terasa berlebihan atau memperlambat alur kerja produktivitas.',
        en: 'Injects refined interaction moments that make software feel crafted and rewarding without degrading task velocity.',
      },
    },
    sourcePath: 'skill/reference/delight.md',
  },
  {
    name: 'distill',
    category: 'visual-craft',
    invocation: 'model',
    description: {
      id: 'Menyederhanakan antarmuka yang terlalu padat: memangkas elemen visual yang tidak esensial dan memperluas whitespace.',
      en: 'Declutter crowded interfaces: eliminate visual noise, redundant borders, and expand breathing room.',
    },
    detailedDescription: {
      id: 'Menyederhanakan antarmuka yang terlalu padat: memangkas elemen visual yang tidak esensial dan memperluas whitespace. Keterampilan desain dari Paul Bakaus (Impeccable) untuk membebaskan antarmuka dari pola visual generik AI.',
      en: 'Declutter crowded interfaces: eliminate visual noise, redundant borders, and expand breathing room. Design skill by Paul Bakaus (Impeccable) to liberate interfaces from generic synthetic AI aesthetics.',
    },
    useWhen: {
      id: [
        'Mengeksekusi perintah distill untuk memoles atau memperbaiki desain UI.',
        'Meningkatkan standar visual antarmuka web ke tingkat desainer profesional.',
      ],
      en: [
        'Executing the distill command to polish or repair UI design.',
        'Elevating web interface standards to senior designer grade.',
      ],
    },
    avoidWhen: {
      id: [
        'Tugas murni backend atau algoritma database tanpa antarmuka visual.',
      ],
      en: [
        'Pure backend or database tasks with no visual interface.',
      ],
    },
    howItWorks: {
      id: [
        'Agent membaca PRODUCT.md dan DESIGN.md untuk memahami batasan merek.',
        'Mengevaluasi komponen UI terhadap prinsip desain spesifik distill.',
        'Menerapkan perubahan CSS/HTML yang presisi tanpa merusak fungsionalitas.',
      ],
      en: [
        'Agent reads PRODUCT.md and DESIGN.md to absorb brand boundaries.',
        'Evaluates UI components against distill design principles.',
        'Applies targeted CSS/HTML refinements without breaking functionality.',
      ],
    },
    coreRules: {
      id: [
        'Selalu pertahankan hierarki visual dan aksesibilitas kontras.',
        'Hormati token desain yang sudah didefinisikan di dalam DESIGN.md.',
      ],
      en: [
        'Always preserve visual hierarchy and accessibility contrast ratios.',
        'Respect existing design tokens declared in DESIGN.md.',
      ],
    },
    tips: {
      id: [
        'Jalankan audit terlebih dahulu untuk mendapatkan gambaran skor kualitas teknis sebelum memoles.',
      ],
      en: [
        'Run audit first to establish a baseline technical quality score before polishing.',
      ],
    },
    pairsWellWith: ['audit', 'polish', 'normalize'],
    spotlight: {
      title: {
        id: 'Prinsip Subtraktif: Kurangi Hingga Sempurna',
        en: 'Subtractive Design: Remove Until Perfect',
      },
      body: {
        id: 'Desain terbaik dicapai bukan saat tidak ada lagi yang bisa ditambah, melainkan saat tidak ada lagi elemen visual yang bisa dikurangi.',
        en: 'Great design is achieved not when there is nothing left to add, but when no superfluous borders, badges, or shadows remain.',
      },
    },
    sourcePath: 'skill/reference/distill.md',
  },
  {
    name: 'doctor',
    category: 'quality-assurance',
    invocation: 'model',
    description: {
      id: 'Mendiagnosis dan memperbaiki inkonsistensi styling: CSS conflict, z-index war, margin collapse, dan overflow bug.',
      en: 'Diagnose and heal styling regressions: CSS conflicts, z-index wars, margin collapsing, and layout overflows.',
    },
    detailedDescription: {
      id: 'Mendiagnosis dan memperbaiki inkonsistensi styling: CSS conflict, z-index war, margin collapse, dan overflow bug. Keterampilan desain dari Paul Bakaus (Impeccable) untuk membebaskan antarmuka dari pola visual generik AI.',
      en: 'Diagnose and heal styling regressions: CSS conflicts, z-index wars, margin collapsing, and layout overflows. Design skill by Paul Bakaus (Impeccable) to liberate interfaces from generic synthetic AI aesthetics.',
    },
    useWhen: {
      id: [
        'Mengeksekusi perintah doctor untuk memoles atau memperbaiki desain UI.',
        'Meningkatkan standar visual antarmuka web ke tingkat desainer profesional.',
      ],
      en: [
        'Executing the doctor command to polish or repair UI design.',
        'Elevating web interface standards to senior designer grade.',
      ],
    },
    avoidWhen: {
      id: [
        'Tugas murni backend atau algoritma database tanpa antarmuka visual.',
      ],
      en: [
        'Pure backend or database tasks with no visual interface.',
      ],
    },
    howItWorks: {
      id: [
        'Agent membaca PRODUCT.md dan DESIGN.md untuk memahami batasan merek.',
        'Mengevaluasi komponen UI terhadap prinsip desain spesifik doctor.',
        'Menerapkan perubahan CSS/HTML yang presisi tanpa merusak fungsionalitas.',
      ],
      en: [
        'Agent reads PRODUCT.md and DESIGN.md to absorb brand boundaries.',
        'Evaluates UI components against doctor design principles.',
        'Applies targeted CSS/HTML refinements without breaking functionality.',
      ],
    },
    coreRules: {
      id: [
        'Selalu pertahankan hierarki visual dan aksesibilitas kontras.',
        'Hormati token desain yang sudah didefinisikan di dalam DESIGN.md.',
      ],
      en: [
        'Always preserve visual hierarchy and accessibility contrast ratios.',
        'Respect existing design tokens declared in DESIGN.md.',
      ],
    },
    tips: {
      id: [
        'Jalankan audit terlebih dahulu untuk mendapatkan gambaran skor kualitas teknis sebelum memoles.',
      ],
      en: [
        'Run audit first to establish a baseline technical quality score before polishing.',
      ],
    },
    pairsWellWith: ['audit', 'polish', 'normalize'],
    spotlight: {
      title: {
        id: 'Pembedahan Bug Layout CSS Sistematis',
        en: 'Surgical CSS Layout Bug Remediation',
      },
      body: {
        id: 'Menuntaskan perang `z-index: 999999` dan overflow horizontal yang merusak tampilan mobile dengan isolasi stacking context.',
        en: 'Resolves runaway `z-index` escalation and mobile horizontal scrolling bugs through rigorous stacking context isolation.',
      },
    },
    sourcePath: 'skill/reference/doctor.md',
  },
  {
    name: 'document',
    category: 'design-tokens',
    invocation: 'model',
    description: {
      id: 'Ekstraksi otomatis token desain visual: palet warna, skala tipografi, radius sudut, dan pola komponen ke DESIGN.md.',
      en: 'Automated extraction of visual design tokens: color palettes, typography scales, radii, and patterns into DESIGN.md.',
    },
    detailedDescription: {
      id: 'Ekstraksi otomatis token desain visual: palet warna, skala tipografi, radius sudut, dan pola komponen ke DESIGN.md. Keterampilan desain dari Paul Bakaus (Impeccable) untuk membebaskan antarmuka dari pola visual generik AI.',
      en: 'Automated extraction of visual design tokens: color palettes, typography scales, radii, and patterns into DESIGN.md. Design skill by Paul Bakaus (Impeccable) to liberate interfaces from generic synthetic AI aesthetics.',
    },
    useWhen: {
      id: [
        'Mengeksekusi perintah document untuk memoles atau memperbaiki desain UI.',
        'Meningkatkan standar visual antarmuka web ke tingkat desainer profesional.',
      ],
      en: [
        'Executing the document command to polish or repair UI design.',
        'Elevating web interface standards to senior designer grade.',
      ],
    },
    avoidWhen: {
      id: [
        'Tugas murni backend atau algoritma database tanpa antarmuka visual.',
      ],
      en: [
        'Pure backend or database tasks with no visual interface.',
      ],
    },
    howItWorks: {
      id: [
        'Agent membaca PRODUCT.md dan DESIGN.md untuk memahami batasan merek.',
        'Mengevaluasi komponen UI terhadap prinsip desain spesifik document.',
        'Menerapkan perubahan CSS/HTML yang presisi tanpa merusak fungsionalitas.',
      ],
      en: [
        'Agent reads PRODUCT.md and DESIGN.md to absorb brand boundaries.',
        'Evaluates UI components against document design principles.',
        'Applies targeted CSS/HTML refinements without breaking functionality.',
      ],
    },
    coreRules: {
      id: [
        'Selalu pertahankan hierarki visual dan aksesibilitas kontras.',
        'Hormati token desain yang sudah didefinisikan di dalam DESIGN.md.',
      ],
      en: [
        'Always preserve visual hierarchy and accessibility contrast ratios.',
        'Respect existing design tokens declared in DESIGN.md.',
      ],
    },
    tips: {
      id: [
        'Jalankan audit terlebih dahulu untuk mendapatkan gambaran skor kualitas teknis sebelum memoles.',
      ],
      en: [
        'Run audit first to establish a baseline technical quality score before polishing.',
      ],
    },
    pairsWellWith: ['audit', 'polish', 'normalize'],
    spotlight: {
      title: {
        id: 'Format Terbaca Mesin Google Stitch',
        en: 'Google Stitch Machine-Readable Format',
      },
      body: {
        id: 'Mengikuti standar Google Stitch DESIGN.md sehingga file spesifikasi desain dapat dipahami dan ditaati oleh agen coding secara deterministik.',
        en: 'Adheres to Google Stitch DESIGN.md standards, enabling AI coding agents to follow design specs deterministically.',
      },
    },
    sourcePath: 'skill/reference/document.md',
  },
  {
    name: 'extract',
    category: 'component-architecture',
    invocation: 'model',
    description: {
      id: 'Ekstraksi komponen reusable dan token desain dari duplikasi kode UI yang tercecer di codebase.',
      en: 'Extract reusable components and design tokens from duplicated UI patterns across the codebase.',
    },
    detailedDescription: {
      id: 'Ekstraksi komponen reusable dan token desain dari duplikasi kode UI yang tercecer di codebase. Keterampilan desain dari Paul Bakaus (Impeccable) untuk membebaskan antarmuka dari pola visual generik AI.',
      en: 'Extract reusable components and design tokens from duplicated UI patterns across the codebase. Design skill by Paul Bakaus (Impeccable) to liberate interfaces from generic synthetic AI aesthetics.',
    },
    useWhen: {
      id: [
        'Mengeksekusi perintah extract untuk memoles atau memperbaiki desain UI.',
        'Meningkatkan standar visual antarmuka web ke tingkat desainer profesional.',
      ],
      en: [
        'Executing the extract command to polish or repair UI design.',
        'Elevating web interface standards to senior designer grade.',
      ],
    },
    avoidWhen: {
      id: [
        'Tugas murni backend atau algoritma database tanpa antarmuka visual.',
      ],
      en: [
        'Pure backend or database tasks with no visual interface.',
      ],
    },
    howItWorks: {
      id: [
        'Agent membaca PRODUCT.md dan DESIGN.md untuk memahami batasan merek.',
        'Mengevaluasi komponen UI terhadap prinsip desain spesifik extract.',
        'Menerapkan perubahan CSS/HTML yang presisi tanpa merusak fungsionalitas.',
      ],
      en: [
        'Agent reads PRODUCT.md and DESIGN.md to absorb brand boundaries.',
        'Evaluates UI components against extract design principles.',
        'Applies targeted CSS/HTML refinements without breaking functionality.',
      ],
    },
    coreRules: {
      id: [
        'Selalu pertahankan hierarki visual dan aksesibilitas kontras.',
        'Hormati token desain yang sudah didefinisikan di dalam DESIGN.md.',
      ],
      en: [
        'Always preserve visual hierarchy and accessibility contrast ratios.',
        'Respect existing design tokens declared in DESIGN.md.',
      ],
    },
    tips: {
      id: [
        'Jalankan audit terlebih dahulu untuk mendapatkan gambaran skor kualitas teknis sebelum memoles.',
      ],
      en: [
        'Run audit first to establish a baseline technical quality score before polishing.',
      ],
    },
    pairsWellWith: ['audit', 'polish', 'normalize'],
    spotlight: {
      title: {
        id: 'Konsolidasi Pola yang Tercecer',
        en: 'Consolidate Fragmented Patterns',
      },
      body: {
        id: 'Mendeteksi tombol, kartu, dan input serupa yang ditulis berulang kali, lalu menyatukannya ke komponen inti dengan varian eksplisit.',
        en: 'Identifies redundant one-off buttons and cards, consolidating them into core component tokens with explicit variants.',
      },
    },
    sourcePath: 'skill/reference/extract.md',
  },
  {
    name: 'harden',
    category: 'robustness',
    invocation: 'model',
    description: {
      id: 'Memperkuat UI terhadap kondisi ekstrem: teks sangat panjang, nama bahasa asing, gambar gagal muat, dan network lambat.',
      en: 'Stress-test UI against edge cases: localized long text, missing avatars, broken images, and slow network states.',
    },
    detailedDescription: {
      id: 'Memperkuat UI terhadap kondisi ekstrem: teks sangat panjang, nama bahasa asing, gambar gagal muat, dan network lambat. Keterampilan desain dari Paul Bakaus (Impeccable) untuk membebaskan antarmuka dari pola visual generik AI.',
      en: 'Stress-test UI against edge cases: localized long text, missing avatars, broken images, and slow network states. Design skill by Paul Bakaus (Impeccable) to liberate interfaces from generic synthetic AI aesthetics.',
    },
    useWhen: {
      id: [
        'Mengeksekusi perintah harden untuk memoles atau memperbaiki desain UI.',
        'Meningkatkan standar visual antarmuka web ke tingkat desainer profesional.',
      ],
      en: [
        'Executing the harden command to polish or repair UI design.',
        'Elevating web interface standards to senior designer grade.',
      ],
    },
    avoidWhen: {
      id: [
        'Tugas murni backend atau algoritma database tanpa antarmuka visual.',
      ],
      en: [
        'Pure backend or database tasks with no visual interface.',
      ],
    },
    howItWorks: {
      id: [
        'Agent membaca PRODUCT.md dan DESIGN.md untuk memahami batasan merek.',
        'Mengevaluasi komponen UI terhadap prinsip desain spesifik harden.',
        'Menerapkan perubahan CSS/HTML yang presisi tanpa merusak fungsionalitas.',
      ],
      en: [
        'Agent reads PRODUCT.md and DESIGN.md to absorb brand boundaries.',
        'Evaluates UI components against harden design principles.',
        'Applies targeted CSS/HTML refinements without breaking functionality.',
      ],
    },
    coreRules: {
      id: [
        'Selalu pertahankan hierarki visual dan aksesibilitas kontras.',
        'Hormati token desain yang sudah didefinisikan di dalam DESIGN.md.',
      ],
      en: [
        'Always preserve visual hierarchy and accessibility contrast ratios.',
        'Respect existing design tokens declared in DESIGN.md.',
      ],
    },
    tips: {
      id: [
        'Jalankan audit terlebih dahulu untuk mendapatkan gambaran skor kualitas teknis sebelum memoles.',
      ],
      en: [
        'Run audit first to establish a baseline technical quality score before polishing.',
      ],
    },
    pairsWellWith: ['audit', 'polish', 'normalize'],
    spotlight: {
      title: {
        id: 'Uji Ketahanan Interface Terhadap Data Liar',
        en: 'Edge-Case Interface Hardening',
      },
      body: {
        id: 'Menguji apakah tombol hancur saat diterjemahkan ke bahasa Jerman, apakah kartu meluap saat judul 300 karakter, dan menangani image fallback anggun.',
        en: 'Tests whether buttons break under verbose translations, verifies layout stability on 300-character titles, and asserts image fallbacks.',
      },
    },
    sourcePath: 'skill/reference/harden.md',
  },
  {
    name: 'init',
    category: 'project-setup',
    invocation: 'model',
    description: {
      id: 'Inisialisasi sistem desain Impeccable: wawancara tujuan produk, pembuatan PRODUCT.md, dan penyiapan DESIGN.md.',
      en: 'Initialize the Impeccable design system: product discovery, PRODUCT.md creation, and DESIGN.md setup.',
    },
    detailedDescription: {
      id: 'Inisialisasi sistem desain Impeccable: wawancara tujuan produk, pembuatan PRODUCT.md, dan penyiapan DESIGN.md. Keterampilan desain dari Paul Bakaus (Impeccable) untuk membebaskan antarmuka dari pola visual generik AI.',
      en: 'Initialize the Impeccable design system: product discovery, PRODUCT.md creation, and DESIGN.md setup. Design skill by Paul Bakaus (Impeccable) to liberate interfaces from generic synthetic AI aesthetics.',
    },
    useWhen: {
      id: [
        'Mengeksekusi perintah init untuk memoles atau memperbaiki desain UI.',
        'Meningkatkan standar visual antarmuka web ke tingkat desainer profesional.',
      ],
      en: [
        'Executing the init command to polish or repair UI design.',
        'Elevating web interface standards to senior designer grade.',
      ],
    },
    avoidWhen: {
      id: [
        'Tugas murni backend atau algoritma database tanpa antarmuka visual.',
      ],
      en: [
        'Pure backend or database tasks with no visual interface.',
      ],
    },
    howItWorks: {
      id: [
        'Agent membaca PRODUCT.md dan DESIGN.md untuk memahami batasan merek.',
        'Mengevaluasi komponen UI terhadap prinsip desain spesifik init.',
        'Menerapkan perubahan CSS/HTML yang presisi tanpa merusak fungsionalitas.',
      ],
      en: [
        'Agent reads PRODUCT.md and DESIGN.md to absorb brand boundaries.',
        'Evaluates UI components against init design principles.',
        'Applies targeted CSS/HTML refinements without breaking functionality.',
      ],
    },
    coreRules: {
      id: [
        'Selalu pertahankan hierarki visual dan aksesibilitas kontras.',
        'Hormati token desain yang sudah didefinisikan di dalam DESIGN.md.',
      ],
      en: [
        'Always preserve visual hierarchy and accessibility contrast ratios.',
        'Respect existing design tokens declared in DESIGN.md.',
      ],
    },
    tips: {
      id: [
        'Jalankan audit terlebih dahulu untuk mendapatkan gambaran skor kualitas teknis sebelum memoles.',
      ],
      en: [
        'Run audit first to establish a baseline technical quality score before polishing.',
      ],
    },
    pairsWellWith: ['audit', 'polish', 'normalize'],
    spotlight: {
      title: {
        id: 'Fondasi PRODUCT.md & DESIGN.md',
        en: 'PRODUCT.md & DESIGN.md Foundations',
      },
      body: {
        id: 'Impeccable mewajibkan keberadaan PRODUCT.md (strategi & persona) dan DESIGN.md (token visual) sebelum agen menulis kode UI agar hasil tidak generik.',
        en: 'Impeccable mandates PRODUCT.md (strategy & users) and DESIGN.md (visual tokens) before authoring UI to eliminate generic AI output.',
      },
    },
    sourcePath: 'skill/reference/init.md',
  },
  {
    name: 'live',
    category: 'interactive-prototyping',
    invocation: 'model',
    description: {
      id: 'Mode varian live interaktif: eksperimen varian HTML/CSS secara instan di browser via HMR.',
      en: 'Interactive live variant mode: experiment with HTML/CSS design alternatives hot-swapped via HMR.',
    },
    detailedDescription: {
      id: 'Mode varian live interaktif: eksperimen varian HTML/CSS secara instan di browser via HMR. Keterampilan desain dari Paul Bakaus (Impeccable) untuk membebaskan antarmuka dari pola visual generik AI.',
      en: 'Interactive live variant mode: experiment with HTML/CSS design alternatives hot-swapped via HMR. Design skill by Paul Bakaus (Impeccable) to liberate interfaces from generic synthetic AI aesthetics.',
    },
    useWhen: {
      id: [
        'Mengeksekusi perintah live untuk memoles atau memperbaiki desain UI.',
        'Meningkatkan standar visual antarmuka web ke tingkat desainer profesional.',
      ],
      en: [
        'Executing the live command to polish or repair UI design.',
        'Elevating web interface standards to senior designer grade.',
      ],
    },
    avoidWhen: {
      id: [
        'Tugas murni backend atau algoritma database tanpa antarmuka visual.',
      ],
      en: [
        'Pure backend or database tasks with no visual interface.',
      ],
    },
    howItWorks: {
      id: [
        'Agent membaca PRODUCT.md dan DESIGN.md untuk memahami batasan merek.',
        'Mengevaluasi komponen UI terhadap prinsip desain spesifik live.',
        'Menerapkan perubahan CSS/HTML yang presisi tanpa merusak fungsionalitas.',
      ],
      en: [
        'Agent reads PRODUCT.md and DESIGN.md to absorb brand boundaries.',
        'Evaluates UI components against live design principles.',
        'Applies targeted CSS/HTML refinements without breaking functionality.',
      ],
    },
    coreRules: {
      id: [
        'Selalu pertahankan hierarki visual dan aksesibilitas kontras.',
        'Hormati token desain yang sudah didefinisikan di dalam DESIGN.md.',
      ],
      en: [
        'Always preserve visual hierarchy and accessibility contrast ratios.',
        'Respect existing design tokens declared in DESIGN.md.',
      ],
    },
    tips: {
      id: [
        'Jalankan audit terlebih dahulu untuk mendapatkan gambaran skor kualitas teknis sebelum memoles.',
      ],
      en: [
        'Run audit first to establish a baseline technical quality score before polishing.',
      ],
    },
    pairsWellWith: ['audit', 'polish', 'normalize'],
    spotlight: {
      title: {
        id: 'Eksperimen Desain Hot-Swap Realtime',
        en: 'Realtime Hot-Swap Design Experiments',
      },
      body: {
        id: 'Memungkinkan developer atau desainer memilih elemen di browser dan melihat 3 varian desain AI langsung di layar tanpa me-refresh halaman.',
        en: 'Allows developers to select live browser DOM elements and hot-swap AI design variants in realtime via HMR.',
      },
    },
    sourcePath: 'skill/reference/live.md',
  },
  {
    name: 'normalize',
    category: 'spacing-typography',
    invocation: 'model',
    description: {
      id: 'Menyelaraskan spasi dan skala tipografi ke kelipatan grid matematis (skala 4px/8px) di seluruh halaman.',
      en: 'Normalize spacing and typography to mathematical rhythm scales (4px/8px grids) across views.',
    },
    detailedDescription: {
      id: 'Menyelaraskan spasi dan skala tipografi ke kelipatan grid matematis (skala 4px/8px) di seluruh halaman. Keterampilan desain dari Paul Bakaus (Impeccable) untuk membebaskan antarmuka dari pola visual generik AI.',
      en: 'Normalize spacing and typography to mathematical rhythm scales (4px/8px grids) across views. Design skill by Paul Bakaus (Impeccable) to liberate interfaces from generic synthetic AI aesthetics.',
    },
    useWhen: {
      id: [
        'Mengeksekusi perintah normalize untuk memoles atau memperbaiki desain UI.',
        'Meningkatkan standar visual antarmuka web ke tingkat desainer profesional.',
      ],
      en: [
        'Executing the normalize command to polish or repair UI design.',
        'Elevating web interface standards to senior designer grade.',
      ],
    },
    avoidWhen: {
      id: [
        'Tugas murni backend atau algoritma database tanpa antarmuka visual.',
      ],
      en: [
        'Pure backend or database tasks with no visual interface.',
      ],
    },
    howItWorks: {
      id: [
        'Agent membaca PRODUCT.md dan DESIGN.md untuk memahami batasan merek.',
        'Mengevaluasi komponen UI terhadap prinsip desain spesifik normalize.',
        'Menerapkan perubahan CSS/HTML yang presisi tanpa merusak fungsionalitas.',
      ],
      en: [
        'Agent reads PRODUCT.md and DESIGN.md to absorb brand boundaries.',
        'Evaluates UI components against normalize design principles.',
        'Applies targeted CSS/HTML refinements without breaking functionality.',
      ],
    },
    coreRules: {
      id: [
        'Selalu pertahankan hierarki visual dan aksesibilitas kontras.',
        'Hormati token desain yang sudah didefinisikan di dalam DESIGN.md.',
      ],
      en: [
        'Always preserve visual hierarchy and accessibility contrast ratios.',
        'Respect existing design tokens declared in DESIGN.md.',
      ],
    },
    tips: {
      id: [
        'Jalankan audit terlebih dahulu untuk mendapatkan gambaran skor kualitas teknis sebelum memoles.',
      ],
      en: [
        'Run audit first to establish a baseline technical quality score before polishing.',
      ],
    },
    pairsWellWith: ['audit', 'polish', 'normalize'],
    spotlight: {
      title: {
        id: 'Ritme Vertikal & Skala Modular 4px/8px',
        en: 'Vertical Rhythm & 4px/8px Modular Scales',
      },
      body: {
        id: 'Mengganti margin acak (13px, 17px, 21px) dengan skala spasi terstandarisasi yang menghasilkan keseimbangan mata yang tenang.',
        en: 'Replaces random margin magic numbers with standardized spacing tokens that establish soothing visual cadence.',
      },
    },
    sourcePath: 'skill/reference/normalize.md',
  },
  {
    name: 'onboard',
    category: 'project-setup',
    invocation: 'model',
    description: {
      id: 'Mempelajari basis kode UI yang ada dan memetakan komponen, konvensi styling, serta dependensi yang terpasang.',
      en: 'Onboard into an existing codebase: map UI components, styling conventions, and installed dependencies.',
    },
    detailedDescription: {
      id: 'Mempelajari basis kode UI yang ada dan memetakan komponen, konvensi styling, serta dependensi yang terpasang. Keterampilan desain dari Paul Bakaus (Impeccable) untuk membebaskan antarmuka dari pola visual generik AI.',
      en: 'Onboard into an existing codebase: map UI components, styling conventions, and installed dependencies. Design skill by Paul Bakaus (Impeccable) to liberate interfaces from generic synthetic AI aesthetics.',
    },
    useWhen: {
      id: [
        'Mengeksekusi perintah onboard untuk memoles atau memperbaiki desain UI.',
        'Meningkatkan standar visual antarmuka web ke tingkat desainer profesional.',
      ],
      en: [
        'Executing the onboard command to polish or repair UI design.',
        'Elevating web interface standards to senior designer grade.',
      ],
    },
    avoidWhen: {
      id: [
        'Tugas murni backend atau algoritma database tanpa antarmuka visual.',
      ],
      en: [
        'Pure backend or database tasks with no visual interface.',
      ],
    },
    howItWorks: {
      id: [
        'Agent membaca PRODUCT.md dan DESIGN.md untuk memahami batasan merek.',
        'Mengevaluasi komponen UI terhadap prinsip desain spesifik onboard.',
        'Menerapkan perubahan CSS/HTML yang presisi tanpa merusak fungsionalitas.',
      ],
      en: [
        'Agent reads PRODUCT.md and DESIGN.md to absorb brand boundaries.',
        'Evaluates UI components against onboard design principles.',
        'Applies targeted CSS/HTML refinements without breaking functionality.',
      ],
    },
    coreRules: {
      id: [
        'Selalu pertahankan hierarki visual dan aksesibilitas kontras.',
        'Hormati token desain yang sudah didefinisikan di dalam DESIGN.md.',
      ],
      en: [
        'Always preserve visual hierarchy and accessibility contrast ratios.',
        'Respect existing design tokens declared in DESIGN.md.',
      ],
    },
    tips: {
      id: [
        'Jalankan audit terlebih dahulu untuk mendapatkan gambaran skor kualitas teknis sebelum memoles.',
      ],
      en: [
        'Run audit first to establish a baseline technical quality score before polishing.',
      ],
    },
    pairsWellWith: ['audit', 'polish', 'normalize'],
    spotlight: {
      title: {
        id: 'Pemetaan Arsitektur Tanpa Asumsi',
        en: 'Assumption-Free Codebase Reconnaissance',
      },
      body: {
        id: 'Sebelum menyentuh kode satu baris pun, Impeccable memindai apakah proyek memakai Tailwind, CSS Modules, atau styled-components.',
        en: 'Before touching a single style declaration, Impeccable audits whether the project uses Tailwind, CSS Modules, or tokens.',
      },
    },
    sourcePath: 'skill/reference/onboard.md',
  },
  {
    name: 'optimize',
    category: 'performance',
    invocation: 'model',
    description: {
      id: 'Optimasi aset grafis dan rendering UI: kompresi SVG, layout shift (CLS) 0, dan penghapusan CSS tak terpakai.',
      en: 'Optimize UI rendering and media assets: SVG minification, zero Cumulative Layout Shift (CLS), and dead CSS pruning.',
    },
    detailedDescription: {
      id: 'Optimasi aset grafis dan rendering UI: kompresi SVG, layout shift (CLS) 0, dan penghapusan CSS tak terpakai. Keterampilan desain dari Paul Bakaus (Impeccable) untuk membebaskan antarmuka dari pola visual generik AI.',
      en: 'Optimize UI rendering and media assets: SVG minification, zero Cumulative Layout Shift (CLS), and dead CSS pruning. Design skill by Paul Bakaus (Impeccable) to liberate interfaces from generic synthetic AI aesthetics.',
    },
    useWhen: {
      id: [
        'Mengeksekusi perintah optimize untuk memoles atau memperbaiki desain UI.',
        'Meningkatkan standar visual antarmuka web ke tingkat desainer profesional.',
      ],
      en: [
        'Executing the optimize command to polish or repair UI design.',
        'Elevating web interface standards to senior designer grade.',
      ],
    },
    avoidWhen: {
      id: [
        'Tugas murni backend atau algoritma database tanpa antarmuka visual.',
      ],
      en: [
        'Pure backend or database tasks with no visual interface.',
      ],
    },
    howItWorks: {
      id: [
        'Agent membaca PRODUCT.md dan DESIGN.md untuk memahami batasan merek.',
        'Mengevaluasi komponen UI terhadap prinsip desain spesifik optimize.',
        'Menerapkan perubahan CSS/HTML yang presisi tanpa merusak fungsionalitas.',
      ],
      en: [
        'Agent reads PRODUCT.md and DESIGN.md to absorb brand boundaries.',
        'Evaluates UI components against optimize design principles.',
        'Applies targeted CSS/HTML refinements without breaking functionality.',
      ],
    },
    coreRules: {
      id: [
        'Selalu pertahankan hierarki visual dan aksesibilitas kontras.',
        'Hormati token desain yang sudah didefinisikan di dalam DESIGN.md.',
      ],
      en: [
        'Always preserve visual hierarchy and accessibility contrast ratios.',
        'Respect existing design tokens declared in DESIGN.md.',
      ],
    },
    tips: {
      id: [
        'Jalankan audit terlebih dahulu untuk mendapatkan gambaran skor kualitas teknis sebelum memoles.',
      ],
      en: [
        'Run audit first to establish a baseline technical quality score before polishing.',
      ],
    },
    pairsWellWith: ['audit', 'polish', 'normalize'],
    spotlight: {
      title: {
        id: 'Zero Cumulative Layout Shift (CLS)',
        en: 'Zero Cumulative Layout Shift (CLS)',
      },
      body: {
        id: 'Memastikan setiap gambar dan font memiliki dimensi tereservasi sehingga halaman tidak melompat-lompat saat loading.',
        en: 'Guarantees images and fonts have reserved aspect-ratios, preventing frustrating layout shifts during initial render.',
      },
    },
    sourcePath: 'skill/reference/optimize.md',
  },
  {
    name: 'polish',
    category: 'micro-details',
    invocation: 'model',
    description: {
      id: 'Polesan akhir tingkat piksel: perataan optik, penyesuaian border sub-piksel, dan konsistensi state fokus/disabled.',
      en: 'Pixel-perfect final polish: optical alignment, sub-pixel border tuning, and consistent focus/disabled states.',
    },
    detailedDescription: {
      id: 'Polesan akhir tingkat piksel: perataan optik, penyesuaian border sub-piksel, dan konsistensi state fokus/disabled. Keterampilan desain dari Paul Bakaus (Impeccable) untuk membebaskan antarmuka dari pola visual generik AI.',
      en: 'Pixel-perfect final polish: optical alignment, sub-pixel border tuning, and consistent focus/disabled states. Design skill by Paul Bakaus (Impeccable) to liberate interfaces from generic synthetic AI aesthetics.',
    },
    useWhen: {
      id: [
        'Mengeksekusi perintah polish untuk memoles atau memperbaiki desain UI.',
        'Meningkatkan standar visual antarmuka web ke tingkat desainer profesional.',
      ],
      en: [
        'Executing the polish command to polish or repair UI design.',
        'Elevating web interface standards to senior designer grade.',
      ],
    },
    avoidWhen: {
      id: [
        'Tugas murni backend atau algoritma database tanpa antarmuka visual.',
      ],
      en: [
        'Pure backend or database tasks with no visual interface.',
      ],
    },
    howItWorks: {
      id: [
        'Agent membaca PRODUCT.md dan DESIGN.md untuk memahami batasan merek.',
        'Mengevaluasi komponen UI terhadap prinsip desain spesifik polish.',
        'Menerapkan perubahan CSS/HTML yang presisi tanpa merusak fungsionalitas.',
      ],
      en: [
        'Agent reads PRODUCT.md and DESIGN.md to absorb brand boundaries.',
        'Evaluates UI components against polish design principles.',
        'Applies targeted CSS/HTML refinements without breaking functionality.',
      ],
    },
    coreRules: {
      id: [
        'Selalu pertahankan hierarki visual dan aksesibilitas kontras.',
        'Hormati token desain yang sudah didefinisikan di dalam DESIGN.md.',
      ],
      en: [
        'Always preserve visual hierarchy and accessibility contrast ratios.',
        'Respect existing design tokens declared in DESIGN.md.',
      ],
    },
    tips: {
      id: [
        'Jalankan audit terlebih dahulu untuk mendapatkan gambaran skor kualitas teknis sebelum memoles.',
      ],
      en: [
        'Run audit first to establish a baseline technical quality score before polishing.',
      ],
    },
    pairsWellWith: ['audit', 'polish', 'normalize'],
    spotlight: {
      title: {
        id: 'Kesenjangan Antara \'Bagus\' dan \'Luar Biasa\'',
        en: 'The Gap Between \'Good\' and \'Exquisite\'',
      },
      body: {
        id: 'Memperbaiki ketidaksejajaran visual 1-2 piksel yang dirasakan mata manusia meskipun secara matematika komputasi berada di tengah.',
        en: 'Corrects subtle 1-2 pixel visual misalignments that human eyes perceive even when CSS math reports centered.',
      },
    },
    sourcePath: 'skill/reference/polish.md',
  },
  {
    name: 'quieter',
    category: 'visual-craft',
    invocation: 'model',
    description: {
      id: 'Meredam antarmuka yang terlalu berisik: menurunkan saturasi latar, melembutkan bayangan tebal, dan menenangkan mata.',
      en: 'Tone down aggressive interfaces: soften heavy shadows, lower background saturation, and reduce visual fatigue.',
    },
    detailedDescription: {
      id: 'Meredam antarmuka yang terlalu berisik: menurunkan saturasi latar, melembutkan bayangan tebal, dan menenangkan mata. Keterampilan desain dari Paul Bakaus (Impeccable) untuk membebaskan antarmuka dari pola visual generik AI.',
      en: 'Tone down aggressive interfaces: soften heavy shadows, lower background saturation, and reduce visual fatigue. Design skill by Paul Bakaus (Impeccable) to liberate interfaces from generic synthetic AI aesthetics.',
    },
    useWhen: {
      id: [
        'Mengeksekusi perintah quieter untuk memoles atau memperbaiki desain UI.',
        'Meningkatkan standar visual antarmuka web ke tingkat desainer profesional.',
      ],
      en: [
        'Executing the quieter command to polish or repair UI design.',
        'Elevating web interface standards to senior designer grade.',
      ],
    },
    avoidWhen: {
      id: [
        'Tugas murni backend atau algoritma database tanpa antarmuka visual.',
      ],
      en: [
        'Pure backend or database tasks with no visual interface.',
      ],
    },
    howItWorks: {
      id: [
        'Agent membaca PRODUCT.md dan DESIGN.md untuk memahami batasan merek.',
        'Mengevaluasi komponen UI terhadap prinsip desain spesifik quieter.',
        'Menerapkan perubahan CSS/HTML yang presisi tanpa merusak fungsionalitas.',
      ],
      en: [
        'Agent reads PRODUCT.md and DESIGN.md to absorb brand boundaries.',
        'Evaluates UI components against quieter design principles.',
        'Applies targeted CSS/HTML refinements without breaking functionality.',
      ],
    },
    coreRules: {
      id: [
        'Selalu pertahankan hierarki visual dan aksesibilitas kontras.',
        'Hormati token desain yang sudah didefinisikan di dalam DESIGN.md.',
      ],
      en: [
        'Always preserve visual hierarchy and accessibility contrast ratios.',
        'Respect existing design tokens declared in DESIGN.md.',
      ],
    },
    tips: {
      id: [
        'Jalankan audit terlebih dahulu untuk mendapatkan gambaran skor kualitas teknis sebelum memoles.',
      ],
      en: [
        'Run audit first to establish a baseline technical quality score before polishing.',
      ],
    },
    pairsWellWith: ['audit', 'polish', 'normalize'],
    spotlight: {
      title: {
        id: 'Mengurangi Kelelahan Kognitif Pengguna',
        en: 'Reducing Visual & Cognitive Fatigue',
      },
      body: {
        id: 'Mencegah UI berteriak ke pengguna; mengubah bayangan hitam pekat menjadi bayangan lembut multi-layer dan menenangkan warna background.',
        en: 'Prevents interfaces from shouting at users; transforms harsh black shadows into ambient soft layers that comfort the eyes.',
      },
    },
    sourcePath: 'skill/reference/quieter.md',
  },
  {
    name: 'typeset',
    category: 'spacing-typography',
    invocation: 'model',
    description: {
      id: 'Menata tipografi profesional: hierarchical font pairing, line-height proporsional, measure (panjang baris), dan tracking.',
      en: 'Professional typography typesetting: font pairings, proportional line-heights, line measures, and letter-spacing.',
    },
    detailedDescription: {
      id: 'Menata tipografi profesional: hierarchical font pairing, line-height proporsional, measure (panjang baris), dan tracking. Keterampilan desain dari Paul Bakaus (Impeccable) untuk membebaskan antarmuka dari pola visual generik AI.',
      en: 'Professional typography typesetting: font pairings, proportional line-heights, line measures, and letter-spacing. Design skill by Paul Bakaus (Impeccable) to liberate interfaces from generic synthetic AI aesthetics.',
    },
    useWhen: {
      id: [
        'Mengeksekusi perintah typeset untuk memoles atau memperbaiki desain UI.',
        'Meningkatkan standar visual antarmuka web ke tingkat desainer profesional.',
      ],
      en: [
        'Executing the typeset command to polish or repair UI design.',
        'Elevating web interface standards to senior designer grade.',
      ],
    },
    avoidWhen: {
      id: [
        'Tugas murni backend atau algoritma database tanpa antarmuka visual.',
      ],
      en: [
        'Pure backend or database tasks with no visual interface.',
      ],
    },
    howItWorks: {
      id: [
        'Agent membaca PRODUCT.md dan DESIGN.md untuk memahami batasan merek.',
        'Mengevaluasi komponen UI terhadap prinsip desain spesifik typeset.',
        'Menerapkan perubahan CSS/HTML yang presisi tanpa merusak fungsionalitas.',
      ],
      en: [
        'Agent reads PRODUCT.md and DESIGN.md to absorb brand boundaries.',
        'Evaluates UI components against typeset design principles.',
        'Applies targeted CSS/HTML refinements without breaking functionality.',
      ],
    },
    coreRules: {
      id: [
        'Selalu pertahankan hierarki visual dan aksesibilitas kontras.',
        'Hormati token desain yang sudah didefinisikan di dalam DESIGN.md.',
      ],
      en: [
        'Always preserve visual hierarchy and accessibility contrast ratios.',
        'Respect existing design tokens declared in DESIGN.md.',
      ],
    },
    tips: {
      id: [
        'Jalankan audit terlebih dahulu untuk mendapatkan gambaran skor kualitas teknis sebelum memoles.',
      ],
      en: [
        'Run audit first to establish a baseline technical quality score before polishing.',
      ],
    },
    pairsWellWith: ['audit', 'polish', 'normalize'],
    spotlight: {
      title: {
        id: 'Standar Editorial Tipografi Cetak ke Web',
        en: 'Print-Editorial Standards on the Web',
      },
      body: {
        id: 'Menerapkan aturan tipografi klasik: panjang baris optimal 45-75 karakter, line-height 1.5x untuk teks bacaan, dan tracking ketat pada judul besar.',
        en: 'Enforces classical typography rules: optimal 45-75 character line measures, 1.5 line-height for body, and tightened tracking on headlines.',
      },
    },
    sourcePath: 'skill/reference/typeset.md',
  },
]
