/**
 * Task-first index. Each job points at a few real skills and says why, so a
 * visitor who does not know a skill's name can still start. `href` is the
 * skill's canonical route (Matt Pocock lives at /skills, every other
 * collection at /<slug>/skills). Names must exist in the collection data.
 */
export type TaskSkill = {
  name: string
  href: string
  why: { id: string; en: string }
}

export type Task = {
  id: string
  title: { id: string; en: string }
  summary: { id: string; en: string }
  skills: TaskSkill[]
}

export const tasks: Task[] = [
  {
    id: 'debug',
    title: { id: 'Memperbaiki bug', en: 'Fix a bug' },
    summary: {
      id: 'Jangan langsung menambal. Cari akar masalah dulu, baru perbaiki, lalu buktikan dengan tes.',
      en: 'Do not patch first. Find the root cause, fix it, then prove it with a test.',
    },
    skills: [
      {
        name: 'systematic-debugging',
        href: '/superpowers/skills/systematic-debugging',
        why: {
          id: 'Empat fase dengan aturan: tidak ada perbaikan sebelum akar masalah ditemukan.',
          en: 'Four phases, with a rule: no fix before the root cause is found.',
        },
      },
      {
        name: 'diagnosing-bugs',
        href: '/skills/diagnosing-bugs',
        why: {
          id: 'Enam fase Matt Pocock: umpan balik, reproduksi, hipotesis, instrumen, perbaikan, bereskan.',
          en: 'Matt Pocock\u2019s six phases: feedback, reproduce, hypothesise, instrument, fix, clean up.',
        },
      },
      {
        name: 'test-driven-development',
        href: '/superpowers/skills/test-driven-development',
        why: {
          id: 'Kunci perbaikannya dengan tes yang gagal lebih dulu, supaya bug yang sama tidak kembali.',
          en: 'Lock the fix in with a failing test first, so the same bug cannot return.',
        },
      },
    ],
  },
  {
    id: 'feature',
    title: { id: 'Membangun fitur', en: 'Build a feature' },
    summary: {
      id: 'Dari ide yang masih kabur sampai kode yang lulus tes, tiap langkah punya skillnya sendiri.',
      en: 'From a fuzzy idea to code that passes tests, each step has its own skill.',
    },
    skills: [
      {
        name: 'brainstorming',
        href: '/superpowers/skills/brainstorming',
        why: {
          id: 'Wajib sebelum kerja kreatif: gali maksud dan desain, dapatkan persetujuan dulu.',
          en: 'Required before creative work: explore intent and design, and get approval first.',
        },
      },
      {
        name: 'to-spec',
        href: '/skills/to-spec',
        why: {
          id: 'Mengubah percakapan menjadi spec tanpa wawancara ulang, lalu terbitkan ke issue tracker.',
          en: 'Turns the conversation into a spec without re-interviewing, then publishes it.',
        },
      },
      {
        name: 'writing-plans',
        href: '/superpowers/skills/writing-plans',
        why: {
          id: 'Rencana implementasi untuk engineer yang belum pernah melihat codebase ini.',
          en: 'An implementation plan written for an engineer who has never seen this codebase.',
        },
      },
      {
        name: 'tdd',
        href: '/skills/tdd',
        why: {
          id: 'Loop merah-hijau di batas modul, dengan materi referensi yang aman ditinggal berjalan.',
          en: 'A red-green loop at the seams, with reference material that is safe to leave running.',
        },
      },
    ],
  },
  {
    id: 'review',
    title: { id: 'Meninjau kode', en: 'Review code' },
    summary: {
      id: 'Pisahkan tinjauan standar dari tinjauan spec, dan jangan nyatakan selesai sebelum ada bukti.',
      en: 'Separate a standards review from a spec review, and do not claim done without evidence.',
    },
    skills: [
      {
        name: 'code-review',
        href: '/skills/code-review',
        why: {
          id: 'Dua sumbu paralel: standar (bau kode ala Fowler) dan spec. Jangan digabung.',
          en: 'Two parallel axes: standards (Fowler smells) and spec. Never merge them.',
        },
      },
      {
        name: 'requesting-code-review',
        href: '/superpowers/skills/requesting-code-review',
        why: {
          id: 'Mengirim subagent peninjau untuk memeriksa apakah pekerjaan memenuhi requirement.',
          en: 'Dispatches a reviewer subagent to check the work meets its requirements.',
        },
      },
      {
        name: 'verification-before-completion',
        href: '/superpowers/skills/verification-before-completion',
        why: {
          id: 'Wajib menjalankan perintah verifikasi dan membaca hasilnya sebelum klaim berhasil.',
          en: 'Requires running the verification command and reading its output before any success claim.',
        },
      },
    ],
  },
  {
    id: 'pr',
    title: { id: 'Membereskan pull request', en: 'Get a pull request merged' },
    summary: {
      id: 'Bedakan PR milik sendiri dari PR orang lain. Keduanya butuh langkah yang berbeda.',
      en: 'Tell your own pull request apart from someone else\u2019s. They need different steps.',
    },
    skills: [
      {
        name: 'pr-ready',
        href: '/brooklyn/skills/pr-ready',
        why: {
          id: 'Untuk PR sendiri: rebase ke branch utama, buat CI hijau, selesaikan thread review.',
          en: 'For your own PR: rebase onto the default branch, get CI green, resolve review threads.',
        },
      },
      {
        name: 'pr-triage',
        href: '/brooklyn/skills/pr-triage',
        why: {
          id: 'Untuk PR orang lain: putuskan setujui, gantikan, atau tutup, dengan kredit.',
          en: 'For someone else\u2019s PR: decide to approve, supersede, or close, with credit.',
        },
      },
      {
        name: 'pr',
        href: '/skills/pr',
        why: {
          id: 'Alur PR Matt Pocock, dari branch sampai deskripsi yang bisa ditinjau.',
          en: 'Matt Pocock\u2019s pull request flow, from the branch to a reviewable description.',
        },
      },
    ],
  },
  {
    id: 'design',
    title: { id: 'Mendesain antarmuka', en: 'Design an interface' },
    summary: {
      id: 'Pilih satu arah, lalu tahan. Jangan mencampur filosofi desain yang saling bertentangan.',
      en: 'Pick one direction and hold it. Do not mix design philosophies that contradict each other.',
    },
    skills: [
      {
        name: 'design-taste-frontend',
        href: '/taste/skills/design-taste-frontend',
        why: {
          id: 'Arah seni untuk halaman publik, dengan gambar nyata dan inspeksi browser sebelum selesai.',
          en: 'Art direction for public pages, with real pictures and a browser inspection before done.',
        },
      },
      {
        name: 'emil-design-eng',
        href: '/emilkowalski/skills/emil-design-eng',
        why: {
          id: 'Filosofi design engineering Emil: rasa, polesan, keputusan gerak, dan aksesibilitas.',
          en: 'Emil\u2019s design-engineering philosophy: taste, polish, motion decisions, and accessibility.',
        },
      },
      {
        name: 'better-ui',
        href: '/jakubkrehel/skills/better-ui',
        why: {
          id: 'Detail mikro: radius konsentris, kesejajaran optik, dan kedalaman permukaan.',
          en: 'Micro-details: concentric radii, optical alignment, and surface depth.',
        },
      },
      {
        name: 'frontend-design',
        href: '/anthropic/skills/frontend-design',
        why: {
          id: 'UI yang khas lewat pilihan visual, tipografi, dan gerak yang spesifik terhadap brief.',
          en: 'Distinctive UI through visual, typography, and motion choices specific to the brief.',
        },
      },
    ],
  },
  {
    id: 'motion',
    title: { id: 'Membuat animasi', en: 'Add animation' },
    summary: {
      id: 'Putuskan dulu apakah sesuatu perlu bergerak. Gerak tanpa tujuan adalah utang.',
      en: 'Decide first whether anything should move. Motion without a purpose is debt.',
    },
    skills: [
      {
        name: 'animate',
        href: '/emilkowalski/skills/animate',
        why: {
          id: 'Urutan keputusan Emil: perlu bergerak atau tidak, tujuan, alat, properti, lalu easing.',
          en: 'Emil\u2019s decision order: should it move, why, which tool, which property, then easing.',
        },
      },
      {
        name: 'gsap-core',
        href: '/gsap/skills/gsap-core',
        why: {
          id: 'Mesin inti GSAP: to, from, easing, stagger, durasi, dan matchMedia.',
          en: 'The GSAP core engine: to, from, easing, stagger, duration, and matchMedia.',
        },
      },
      {
        name: 'gsap-performance',
        href: '/gsap/skills/gsap-performance',
        why: {
          id: 'Utamakan transform dan opacity, dan hentikan animasi yang berada di luar layar.',
          en: 'Prefer transform and opacity, and pause animations that leave the screen.',
        },
      },
      {
        name: 'expo-animation',
        href: '/expo/skills/expo-animation',
        why: {
          id: 'Untuk React Native: thread mana, spring atau timing, dan penyerahan gesture.',
          en: 'For React Native: which thread, spring or timing, and the gesture hand-off.',
        },
      },
    ],
  },
  {
    id: 'audit-ui',
    title: { id: 'Meninjau UI yang sudah ada', en: 'Review an existing UI' },
    summary: {
      id: 'Ukur dulu, baru ubah. Tinjauan yang baik memisahkan kualitas teknis dari kualitas desain.',
      en: 'Measure first, then change. A good review separates technical quality from design quality.',
    },
    skills: [
      {
        name: 'audit',
        href: '/impeccable/skills/audit',
        why: {
          id: 'Lima dimensi teknis dengan skor 0-4 dan tingkat P0-P3. Hanya mendokumentasikan, tidak mengubah.',
          en: 'Five technical dimensions scored 0-4 with P0-P3 severity. Documents, does not change.',
        },
      },
      {
        name: 'critique',
        href: '/impeccable/skills/critique',
        why: {
          id: 'Tinjauan UX: hierarki, arsitektur informasi, dan beban kognitif.',
          en: 'A UX review: hierarchy, information architecture, and cognitive load.',
        },
      },
      {
        name: 'redesign-existing-projects',
        href: '/taste/skills/redesign-existing-projects',
        why: {
          id: 'Perbaiki tipografi, warna, layout, dan state tanpa menulis ulang dari nol.',
          en: 'Fix typography, color, layout, and states without rewriting from scratch.',
        },
      },
      {
        name: 'web-design-guidelines',
        href: '/vercel/skills/web-design-guidelines',
        why: {
          id: 'Memeriksa kode UI terhadap panduan Vercel dan melaporkan temuan per baris.',
          en: 'Checks UI code against the Vercel guidelines and reports findings per line.',
        },
      },
    ],
  },
  {
    id: 'data',
    title: { id: 'Mengatur data dan database', en: 'Set up data and a database' },
    summary: {
      id: 'Pilih satu jalur dan ikuti sampai tuntas. Setup ORM dan setup database adalah skill yang berbeda.',
      en: 'Pick one path and follow it through. ORM setup and database setup are different skills.',
    },
    skills: [
      {
        name: 'prisma-orm-setup',
        href: '/prisma/skills/prisma-orm-setup',
        why: {
          id: 'Menghubungkan aplikasi ke database. Aplikasi baru memakai Prisma ORM 8.',
          en: 'Connects an application to its database. New applications use Prisma ORM 8.',
        },
      },
      {
        name: 'supabase-postgres-best-practices',
        href: '/supabase/skills/supabase-postgres-best-practices',
        why: {
          id: 'Delapan kategori aturan Postgres berperingkat, dari indeks sampai RLS.',
          en: 'Eight ranked Postgres rule categories, from indexes to row-level security.',
        },
      },
      {
        name: 'prisma-postgres-setup',
        href: '/prisma/skills/prisma-postgres-setup',
        why: {
          id: 'Menyiapkan database Prisma Postgres, lalu menyerahkan konfigurasi ORM ke skill lain.',
          en: 'Provisions a Prisma Postgres database, then hands ORM configuration to another skill.',
        },
      },
    ],
  },
  {
    id: 'deploy',
    title: { id: 'Mendeploy aplikasi', en: 'Deploy an application' },
    summary: {
      id: 'Tiap platform punya skill resminya. Jangan memakai panduan deploy platform lain.',
      en: 'Each platform has its own official skill. Do not reuse another platform\u2019s deploy guide.',
    },
    skills: [
      {
        name: 'deploy-to-vercel',
        href: '/vercel/skills/deploy-to-vercel',
        why: {
          id: 'Memilih metode deploy dan selalu mengirim preview kecuali produksi diminta.',
          en: 'Picks the deploy method and always ships a preview unless production is requested.',
        },
      },
      {
        name: 'workers-best-practices',
        href: '/cloudflare/skills/workers-best-practices',
        why: {
          id: 'Menulis, meninjau, dan mengonfigurasi Cloudflare Workers untuk produksi.',
          en: 'Writing, reviewing, and configuring Cloudflare Workers for production.',
        },
      },
      {
        name: 'wrangler',
        href: '/cloudflare/skills/wrangler',
        why: {
          id: 'Menjalankan Wrangler untuk pengembangan lokal, preview, dan deployment.',
          en: 'Runs Wrangler for local development, previews, and deployment.',
        },
      },
      {
        name: 'expo-overview',
        href: '/expo/skills/expo-overview',
        why: {
          id: 'Pintu masuk Expo dan EAS: mengarahkan ke skill yang tepat untuk tujuan yang sebenarnya.',
          en: 'The Expo and EAS entry point: routes to the right skill for the real goal.',
        },
      },
    ],
  },
  {
    id: 'react',
    title: { id: 'Menulis React yang cepat', en: 'Write fast React' },
    summary: {
      id: 'Performa React punya urutan: hilangkan waterfall dulu, baru optimasi yang lebih kecil.',
      en: 'React performance has an order: remove waterfalls first, then the smaller optimisations.',
    },
    skills: [
      {
        name: 'vercel-react-best-practices',
        href: '/vercel/skills/vercel-react-best-practices',
        why: {
          id: 'Aturan performa React dan Next.js dari Vercel, diurutkan menurut dampaknya.',
          en: 'React and Next.js performance rules from Vercel, ranked by impact.',
        },
      },
      {
        name: 'vercel-composition-patterns',
        href: '/vercel/skills/vercel-composition-patterns',
        why: {
          id: 'Pola komposisi komponen supaya API komponen tetap kecil dan mudah diubah.',
          en: 'Component composition patterns that keep component APIs small and easy to change.',
        },
      },
      {
        name: 'tanstack-query',
        href: '/tanstack/skills/tanstack-query',
        why: {
          id: 'Pengambilan data, cache, dan sinkronisasi state server dengan TanStack Query.',
          en: 'Data fetching, caching, and server-state sync with TanStack Query.',
        },
      },
    ],
  },
  {
    id: 'docs',
    title: { id: 'Membuat dokumen', en: 'Produce a document' },
    summary: {
      id: 'Skill dokumen Anthropic bekerja pada file sungguhan, bukan pada teks yang ditempel di chat.',
      en: 'Anthropic\u2019s document skills work on real files, not on text pasted into the chat.',
    },
    skills: [
      {
        name: 'docx',
        href: '/anthropic/skills/docx',
        why: {
          id: 'Membuat, membaca, dan mengedit dokumen Word beserta template-nya.',
          en: 'Creates, reads, and edits Word documents and their templates.',
        },
      },
      {
        name: 'pdf',
        href: '/anthropic/skills/pdf',
        why: {
          id: 'Mengolah PDF: ekstrak, gabung, isi formulir, watermark, dan OCR.',
          en: 'Processes PDFs: extract, merge, fill forms, watermark, and OCR.',
        },
      },
      {
        name: 'pptx',
        href: '/anthropic/skills/pptx',
        why: {
          id: 'Membuat dan mengedit presentasi PowerPoint.',
          en: 'Creates and edits PowerPoint presentations.',
        },
      },
      {
        name: 'skill-creator',
        href: '/anthropic/skills/skill-creator',
        why: {
          id: 'Kalau yang ingin dibuat adalah skill baru: menulis, menguji, dan memperbaikinya.',
          en: 'When the thing to produce is a new skill: write it, test it, and improve it.',
        },
      },
    ],
  },
  {
    id: 'a11y',
    title: { id: 'Memperbaiki aksesibilitas', en: 'Fix accessibility' },
    summary: {
      id: 'Mulai dari elemen HTML bawaan dan keyboard, sebelum menambah ARIA.',
      en: 'Start with native HTML elements and the keyboard, before adding ARIA.',
    },
    skills: [
      {
        name: 'better-accessibility',
        href: '/jakubkrehel/skills/better-accessibility',
        why: {
          id: 'Audit dan penerapan: nama aksesibel, fokus, formulir, dan teknologi bantu.',
          en: 'Audit and fixes: accessible names, focus, forms, and assistive technology.',
        },
      },
      {
        name: 'audit',
        href: '/impeccable/skills/audit',
        why: {
          id: 'Aksesibilitas adalah satu dari lima dimensi skornya, dengan tingkat keparahan.',
          en: 'Accessibility is one of its five scored dimensions, with a severity level.',
        },
      },
      {
        name: 'interface-review',
        href: '/jakubkrehel/skills/interface-review',
        why: {
          id: 'Meninjau desain hanya pada perubahan yang belum di-commit atau pada pull request.',
          en: 'Reviews the design of uncommitted changes or a pull request only.',
        },
      },
    ],
  },
]
