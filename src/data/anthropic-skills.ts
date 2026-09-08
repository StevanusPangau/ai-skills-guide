import type { BilingualString, BilingualList } from '@/types/skill'

// Koleksi: Anthropic — github.com/anthropics/skills.
// Lisensi upstream: Copyright Anthropic PBC, All rights reserved (LICENSE.txt
// per skill). Guide ini hanya mendokumentasikan ringkasan; install langsung
// dari repo upstream.
//
// Sumber: https://github.com/anthropics/skills.
export const ANTHROPIC_SOURCE_REPO = 'github.com/anthropics/skills'
export const ANTHROPIC_SOURCE_SHA = '41bbe19d1a1a7eaab5e7bb9050a417e5c6cffc8f'
export const SOURCE_REPO = ANTHROPIC_SOURCE_REPO
export const SOURCE_SHA = ANTHROPIC_SOURCE_SHA

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
}

export const anthropicSkills: RichSkill[] = [
{
  name: 'docx',
  category: 'document-creation',
  invocation: 'user',
  description: {
    id: 'Buat, baca, edit, dan analisis dokumen Word serta template .docx atau .dotx.',
    en: 'Create, read, edit, and analyze Word documents and .docx or .dotx templates.',
  },
  detailedDescription: {
    id: 'Skill ini memilih pendekatan berdasarkan tugas: gunakan docx-js untuk membuat dokumen baru, unzip dan edit XML untuk dokumen yang sudah ada, serta pandoc untuk membaca isi. Panduannya mencakup gotcha ukuran halaman, landscape, tabel, numbering, gambar, page break, heading untuk TOC, tracked changes, comments, dan validasi output. Dokumen yang dibuat perlu dirender ke PDF dan gambar untuk pemeriksaan visual.',
    en: 'This skill chooses an approach by task: use docx-js to create new documents, unzip and edit XML for existing documents, and pandoc to read content. It covers page sizing, landscape orientation, tables, numbering, images, page breaks, TOC headings, tracked changes, comments, and output validation. Created documents should be rendered to PDF and images for visual inspection.',
  },
  useWhen: {
    id: [
      'Membuat, membaca, mengedit, atau memformat file Word .docx atau template .dotx.',
      'Menghasilkan report, memo, surat, template, atau dokumen profesional dalam format Word.',
      'Mengelola gambar, find-and-replace, tracked changes, comments, atau struktur XML dokumen.',
    ],
    en: [
      'Creating, reading, editing, or formatting Word .docx files or .dotx templates.',
      'Producing reports, memos, letters, templates, or professional Word documents.',
      'Handling images, find-and-replace, tracked changes, comments, or document XML structure.',
    ],
  },
  avoidWhen: {
    id: [
      'Deliverable utamanya PDF, spreadsheet, Google Docs, atau tugas coding umum yang tidak menghasilkan dokumen Word.',
    ],
    en: [
      'The primary deliverable is a PDF, spreadsheet, Google Docs file, or unrelated coding task.',
    ],
  },
  howItWorks: {
    id: [
      'Tentukan apakah tugas membuat dokumen baru, mengedit dokumen yang ada, atau membaca isinya.',
      'Gunakan docx-js untuk pembuatan, atau unzip lalu edit word/document.xml untuk dokumen existing.',
      'Terapkan aturan format seperti built-in HeadingLevel untuk TOC, numbering untuk bullet, dan lebar DXA ganda pada tabel.',
      'Render dengan scripts/office/soffice.py dan pdftoppm, lalu validasi hasil visual dan struktural.',
    ],
    en: [
      'Determine whether the task creates a new document, edits an existing one, or reads its contents.',
      'Use docx-js for creation, or unzip and edit word/document.xml for an existing document.',
      'Apply formatting rules such as built-in HeadingLevel for TOCs, numbering for bullets, and dual DXA widths for tables.',
      'Render with scripts/office/soffice.py and pdftoppm, then validate visual and structural output.',
    ],
  },
  coreRules: {
    id: [
      'Jangan gunakan literal bullet, newline, atau tabel sebagai horizontal rule; gunakan API dan struktur dokumen yang sesuai.',
      'Untuk edit existing, coalesce fragmented runs dengan merge_runs.py dan jangan pretty-print document.xml.',
      'Validasi dokumen hasil edit dengan scripts/office/validate.py, terutama saat menangani tracked changes.',
    ],
    en: [
      'Do not use literal bullets, newlines, or tables as horizontal rules; use the appropriate document APIs and structure.',
      'When editing existing files, coalesce fragmented runs with merge_runs.py and never pretty-print document.xml.',
      'Validate edited documents with scripts/office/validate.py, especially when handling tracked changes.',
    ],
  },
  tips: {
    id: [
      'docx sudah preinstalled; jalankan npm install hanya jika require(\'docx\') gagal.',
      'Untuk US Letter, tentukan ukuran DXA secara eksplisit karena default halaman adalah A4.',
    ],
    en: [
      'docx is preinstalled; run npm install only if require(\'docx\') fails.',
      'For US Letter, specify DXA dimensions explicitly because the default page size is A4.',
    ],
  },
  pairsWellWith: ['pdf', 'pptx', 'xlsx'],
  sourcePath: 'skills/docx/SKILL.md',
},


{
  name: 'pdf',
  category: 'document-creation',
  invocation: 'user',
  description: {
    id: 'Proses PDF: buat, baca, ekstrak, gabung, pecah, rotasi, watermark, OCR, formulir, dan enkripsi.',
    en: 'Process PDFs: create, read, extract, merge, split, rotate, watermark, OCR, fill forms, and encrypt.',
  },
  detailedDescription: {
    id: 'Skill ini menyediakan workflow berbasis Python dan command-line tools untuk operasi PDF. Gunakan pypdf untuk operasi dasar seperti membaca halaman, merge, split, metadata, rotasi, watermark, dan password protection; pdfplumber untuk ekstraksi teks serta tabel; dan reportlab untuk membuat PDF. Panduan juga mencakup pdftotext, qpdf, pdftk, pdfimages, serta OCR dengan pytesseract dan pdf2image.',
    en: 'This skill provides Python and command-line workflows for PDF operations. Use pypdf for basic tasks such as reading pages, merging, splitting, metadata, rotation, watermarks, and password protection; pdfplumber for text and table extraction; and reportlab for PDF creation. It also covers pdftotext, qpdf, pdftk, pdfimages, and OCR with pytesseract and pdf2image.',
  },
  useWhen: {
    id: [
      'Membuat atau mengedit file PDF, termasuk merge, split, rotasi, watermark, dan enkripsi.',
      'Mengekstrak teks, tabel, metadata, atau gambar dari PDF.',
      'Menjalankan OCR pada PDF hasil scan atau mengisi formulir PDF.',
    ],
    en: [
      'Creating or editing PDFs, including merging, splitting, rotating, watermarking, and encryption.',
      'Extracting text, tables, metadata, or images from PDFs.',
      'Running OCR on scanned PDFs or filling PDF forms.',
    ],
  },
  avoidWhen: {
    id: [
      'Deliverable utamanya dokumen Word, presentation deck, atau spreadsheet.',
      'Membutuhkan fitur PDF lanjutan yang hanya dijelaskan di REFERENCE.md atau FORMS.md tetapi referensi tersebut belum dibaca.',
    ],
    en: [
      'The primary deliverable is a Word document, presentation deck, or spreadsheet.',
      'Advanced PDF features are needed but REFERENCE.md or FORMS.md has not been consulted.',
    ],
  },
  howItWorks: {
    id: [
      'Klasifikasikan tugas sebagai create, extract, transform, OCR, form, atau security operation.',
      'Pilih library atau CLI yang sesuai: pypdf, pdfplumber, reportlab, pdftotext, qpdf, atau pdfimages.',
      'Untuk PDF scan, konversi halaman menjadi gambar dengan pdf2image lalu ekstrak teks menggunakan pytesseract.',
      'Periksa hasil teks, jumlah halaman, tabel, atau output file setelah operasi selesai.',
    ],
    en: [
      'Classify the task as a create, extract, transform, OCR, form, or security operation.',
      'Choose the appropriate library or CLI: pypdf, pdfplumber, reportlab, pdftotext, qpdf, or pdfimages.',
      'For scanned PDFs, convert pages to images with pdf2image and extract text with pytesseract.',
      'Check extracted text, page counts, tables, or the output file after the operation completes.',
    ],
  },
  coreRules: {
    id: [
      'Jangan gunakan karakter Unicode subscript atau superscript di ReportLab; gunakan markup <sub>/<super> pada Paragraph.',
      'Gunakan library yang sesuai dengan jenis operasi dan jangan menganggap ekstraksi teks mempertahankan layout secara sempurna.',
      'Untuk password protection, tambahkan userpassword dan ownerpassword melalui PdfWriter.encrypt().',
    ],
    en: [
      'Do not use Unicode subscript or superscript characters in ReportLab; use <sub>/<super> markup in Paragraph.',
      'Use the tool appropriate to the operation and do not assume text extraction perfectly preserves layout.',
      'For password protection, add userpassword and ownerpassword through PdfWriter.encrypt().',
    ],
  },
  tips: {
    id: [
      'Gunakan pdfplumber dengan extract_tables() untuk data tabular dan pandas untuk menggabungkan hasilnya ke Excel.',
      'Gunakan qpdf untuk operasi command-line yang ringkas seperti merge, split, rotate, dan decrypt.',
    ],
    en: [
      'Use pdfplumber with extract_tables() for tabular data and pandas to combine results into Excel.',
      'Use qpdf for concise command-line operations such as merge, split, rotate, and decrypt.',
    ],
  },
  pairsWellWith: ['docx', 'pptx', 'xlsx'],
  sourcePath: 'skills/pdf/SKILL.md',
},


{
  name: 'pptx',
  category: 'document-creation',
  invocation: 'user',
  description: {
    id: 'Buat, baca, edit, dan analisis presentation deck, slide, serta template .pptx atau .potx.',
    en: 'Create, read, edit, and analyze presentation decks, slides, and .pptx or .potx templates.',
  },
  detailedDescription: {
    id: 'Skill ini memakai pptxgenjs untuk membuat deck baru, XML package editing untuk deck atau template existing, dan markitdown untuk membaca isi slide. Panduan mencakup slide layout, chart native, speaker notes, template bookkeeping, validasi OOXML, serta visual QA melalui LibreOffice dan pdftoppm. Ia juga menetapkan aturan desain seperti palette yang spesifik terhadap topik, visual element pada setiap slide, safe fonts, margin, dan pencegahan overflow.',
    en: 'This skill uses pptxgenjs for new decks, XML package editing for existing decks or templates, and markitdown for reading slide content. It covers slide layouts, native charts, speaker notes, template bookkeeping, OOXML validation, and visual QA through LibreOffice and pdftoppm. It also sets design rules for topic-specific palettes, a visual element on every slide, safe fonts, margins, and overflow prevention.',
  },
  useWhen: {
    id: [
      'Membuat, membaca, mengedit, atau memperbarui file .pptx atau .potx.',
      'Membuat slide deck, pitch deck, presentation, chart, speaker notes, atau komentar.',
      'Menggabungkan, memecah, memilih layout template, atau memeriksa visual slide.',
    ],
    en: [
      'Creating, reading, editing, or updating .pptx or .potx files.',
      'Creating slide decks, pitch decks, presentations, charts, speaker notes, or comments.',
      'Combining, splitting, selecting template layouts, or visually inspecting slides.',
    ],
  },
  avoidWhen: {
    id: [
      'Deliverable utamanya Word document, PDF mandiri, atau spreadsheet.',
      'Deck tidak perlu disentuh dan hanya membutuhkan ringkasan teks umum.',
    ],
    en: [
      'The primary deliverable is a Word document, standalone PDF, or spreadsheet.',
      'The deck does not need to be touched and only a general text summary is needed.',
    ],
  },
  howItWorks: {
    id: [
      'Tentukan apakah deck dibuat dari nol, diedit dari package XML, atau dibaca dengan markitdown.',
      'Untuk deck baru, set pres.layout sebelum menambah slide dan gunakan satu instance pptxgenjs per output.',
      'Untuk template, buat thumbnail dengan scripts/thumbnail.py, lakukan structural work sebelum content editing, lalu gunakan add_slide.py dan clean.py bila diperlukan.',
      'Setelah writeFile(), jalankan validate.py, konversi ke PDF dengan soffice.py, lalu gunakan pdftoppm untuk visual QA setiap slide.',
    ],
    en: [
      'Determine whether the deck is built from scratch, edited through package XML, or read with markitdown.',
      'For new decks, set pres.layout before adding slides and use one pptxgenjs instance per output.',
      'For templates, create thumbnails with scripts/thumbnail.py, finish structural work before content editing, then use add_slide.py and clean.py when needed.',
      'After writeFile(), run validate.py, convert to PDF with soffice.py, then use pdftoppm for visual QA of every slide.',
    ],
  },
  coreRules: {
    id: [
      'Gunakan hex color tanpa # dan tanpa 8 digit; gunakan transparency atau opacity pada properti yang benar.',
      'Gunakan addChart() untuk chart native dan addNotes() untuk speaker notes, bukan text box di slide.',
      'Jangan mengirim deck sebelum validate.py dan visual QA selesai serta overflow, placeholder, dan overlap diperbaiki.',
    ],
    en: [
      'Use hex colors without # and without 8 digits; use transparency or opacity on the correct properties.',
      'Use addChart() for native charts and addNotes() for speaker notes, not a text box on the slide.',
      'Do not ship a deck before validate.py and visual QA are complete and overflow, placeholders, and overlaps are fixed.',
    ],
  },
  tips: {
    id: [
      'Gunakan safe fonts seperti Arial, Calibri, Cambria, Times New Roman, atau Bookman Old Style untuk QA yang lebih dapat dipercaya.',
      'Berikan margin minimal 0.5 inch, variasikan layout, dan tambahkan image, chart, icon, atau shape pada setiap slide.',
    ],
    en: [
      'Use safe fonts such as Arial, Calibri, Cambria, Times New Roman, or Bookman Old Style for more reliable QA.',
      'Use at least 0.5-inch margins, vary layouts, and add an image, chart, icon, or shape to every slide.',
    ],
  },
  pairsWellWith: ['docx', 'pdf', 'xlsx'],
  sourcePath: 'skills/pptx/SKILL.md',
},


{
  name: 'xlsx',
  category: 'document-creation',
  invocation: 'user',
  description: {
    id: 'Buat, baca, edit, dan analisis spreadsheet .xlsx, .xlsm, .xltx, .csv, dan .tsv.',
    en: 'Create, read, edit, and analyze .xlsx, .xlsm, .xltx, .csv, and .tsv spreadsheets.',
  },
  detailedDescription: {
    id: 'Skill ini menggunakan openpyxl untuk workbook dengan formula dan formatting, pandas untuk bulk data, serta markitdown untuk quick look per sheet. Panduan menekankan formula, font profesional, dokumentasi asumsi, preservasi macro, pemeriksaan formula dan cached values, serta recalc.py berbasis LibreOffice. Ia juga menjelaskan batasan fungsi Excel yang dapat dievaluasi LibreOffice dan gotcha seperti merged cells, external references, dan data_only=True.',
    en: 'This skill uses openpyxl for workbooks with formulas and formatting, pandas for bulk data, and markitdown for a quick per-sheet view. It emphasizes formulas, professional fonts, documenting assumptions, preserving macros, checking formulas and cached values, and LibreOffice-based recalc.py. It also explains LibreOffice formula limitations and gotchas involving merged cells, external references, and data_only=True.',
  },
  useWhen: {
    id: [
      'Membuat, membaca, mengedit, atau memperbaiki spreadsheet sebagai deliverable utama.',
      'Membersihkan data tabular, menambah kolom, formula, formatting, chart, atau mengonversi format tabular.',
      'Bekerja dengan file .xlsx, .xlsm, .xltx, .csv, atau .tsv.',
    ],
    en: [
      'Creating, reading, editing, or fixing a spreadsheet as the primary deliverable.',
      'Cleaning tabular data, adding columns, formulas, formatting, charts, or converting tabular formats.',
      'Working with .xlsx, .xlsm, .xltx, .csv, or .tsv files.',
    ],
  },
  avoidWhen: {
    id: [
      'Deliverable utamanya Word document, HTML report, standalone Python script, database pipeline, atau Google Sheets API integration.',
      'Data tabular hanya menjadi isi pendukung dan bukan file spreadsheet yang diminta.',
    ],
    en: [
      'The primary deliverable is a Word document, HTML report, standalone Python script, database pipeline, or Google Sheets API integration.',
      'Tabular data is only supporting content and no spreadsheet file is requested.',
    ],
  },
  howItWorks: {
    id: [
      'Pilih openpyxl untuk formula dan formatting, pandas untuk bulk data, atau markitdown untuk inspeksi cepat.',
      'Untuk model, lakukan dua load_workbook pass: satu default untuk formula dan satu data_only=True untuk cached values.',
      'Tulis formula, bukan hasil hardcoded; dokumentasikan asumsi dan angka hardcoded pada cell comment atau cell terdekat.',
      'Jika workbook berisi formula, jalankan python scripts/recalc.py output.xlsx dan periksa status serta total_errors.',
    ],
    en: [
      'Choose openpyxl for formulas and formatting, pandas for bulk data, or markitdown for a quick inspection.',
      'For models, use two load_workbook passes: one default for formulas and one with data_only=True for cached values.',
      'Write formulas rather than hardcoded results; document assumptions and hardcoded numbers in a cell comment or adjacent cell.',
      'When formulas exist, run python scripts/recalc.py output.xlsx and inspect status and total_errors.',
    ],
  },
  coreRules: {
    id: [
      'Jangan ship workbook dengan formula error; recalc.py harus menunjukkan status success dan total_errors nol.',
      'Gunakan formula, bukan hasil hitungan Python yang di-hardcode, agar workbook menghitung ulang saat input berubah.',
      'Saat mengedit existing workbook, ikuti konvensi file, tulis hanya pada designated input cells, dan jangan mengubah formula existing.',
    ],
    en: [
      'Never ship a workbook with formula errors; recalc.py must report status success and zero total_errors.',
      'Use formulas rather than hardcoded Python-computed results so the workbook recalculates when inputs change.',
      'When editing an existing workbook, follow its conventions, write only to designated input cells, and leave existing formulas untouched.',
    ],
  },
  tips: {
    id: [
      'Gunakan INDEX/MATCH sebagai pengganti XLOOKUP, dan lakukan sort, filter, serta deduplicate di Python sebelum menulis cell.',
      'Untuk .xlsm, gunakan keep_vba=True; untuk merged cells, hanya tulis ke top-left anchor.',
    ],
    en: [
      'Use INDEX/MATCH instead of XLOOKUP, and sort, filter, and deduplicate in Python before writing cells.',
      'For .xlsm, use keep_vba=True; for merged cells, write only to the top-left anchor.',
    ],
  },
  pairsWellWith: ['docx', 'pdf', 'pptx'],
  sourcePath: 'skills/xlsx/SKILL.md',
},
{
    name: 'frontend-design',
    category: 'design-brand',
    invocation: 'model',
    description: {
      id: 'Panduan membuat UI yang khas dan disengaja melalui pilihan visual, tipografi, layout, motion, dan copy yang spesifik terhadap brief.',
      en: 'Guidance for distinctive, intentional UI through brief-specific visual choices, typography, layout, motion, and copy.',
    },
    detailedDescription: {
      id: 'Skill ini memosisikan agen sebagai design lead yang menghindari hasil templated dan membuat keputusan visual berdasarkan subject matter, audience, serta tujuan produk. Prosesnya mencakup design plan dengan token warna, type, layout, dan prinsip; review terhadap brief; implementasi; lalu self-critique. Fokusnya meliputi hero, typography, information-bearing structure, restrained motion, responsive behavior, keyboard focus, reduced motion, dan accessible color.',
      en: 'This skill treats the agent as a design lead who avoids templated output and bases visual decisions on the subject matter, audience, and product goal. Its process covers a design plan with color, type, layout, and principle tokens; review against the brief; implementation; and self-critique. It addresses hero treatment, typography, information-bearing structure, restrained motion, responsive behavior, keyboard focus, reduced motion, and accessible color.',
    },
    useWhen: {
      id: [
        'Membangun UI atau halaman web baru yang perlu memiliki visual identity yang khas.',
        'Merevisi desain yang terasa generik, templated, atau terlalu mirip SaaS default.',
        'Menentukan arah typography, palette, layout, motion, dan interface copy berdasarkan brief.',
      ],
      en: [
        'Building a new UI or web page that needs a distinctive visual identity.',
        'Reworking a design that feels generic, templated, or like a default SaaS kit.',
        'Defining typography, palette, layout, motion, and interface copy from a brief.',
      ],
    },
    avoidWhen: {
      id: [
        'Pekerjaan utamanya adalah menghasilkan static art atau generative art, bukan UI.',
        'Brief secara eksplisit mewajibkan visual direction tertentu; ikuti brief tersebut, bukan default skill.',
      ],
      en: [
        'The primary task is static or generative art rather than UI.',
        'The brief explicitly requires a particular visual direction; follow the brief instead of the skill defaults.',
      ],
    },
    howItWorks: {
      id: [
        'Identifikasi subject matter, audience, dan primary job; ajukan concrete direction bila brief belum lengkap.',
        'Buat design plan ringkas berisi 4–6 warna bernama, typefaces, layout concept, alignment, dan prinsip pembeda.',
        'Review plan terhadap brief dan revisi elemen yang terasa seperti generic default sebelum menulis code.',
        'Implementasikan dengan responsive layout, readable copy, visible keyboard focus, reduced motion, dan self-critique terhadap hasil.',
      ],
      en: [
        'Identify the subject matter, audience, and primary job; propose a concrete direction when the brief is incomplete.',
        'Create a concise design plan with 4–6 named colors, typefaces, a layout concept, alignment, and differentiating principles.',
        'Review the plan against the brief and revise anything that reads like a generic default before writing code.',
        'Implement responsive layout, readable copy, visible keyboard focus, reduced motion, and self-critique.',
      ],
    },
    coreRules: {
      id: [
        'Buat pilihan palette, typography, dan layout yang spesifik terhadap brief, bukan default yang diulang.',
        'Habiskan boldness pada satu memorable element dan pertahankan elemen lain tetap disciplined.',
        'Motion non-user-triggered harus sparing dan intentional; jangan menambahkan efek generik pada setiap section atau card.',
      ],
      en: [
        'Make palette, typography, and layout choices specific to the brief rather than repeating defaults.',
        'Spend boldness on one memorable element and keep everything else disciplined.',
        'Non-user-triggered motion must be sparse and intentional; do not add generic effects to every section or card.',
      ],
    },
    tips: {
      id: [
        'Gunakan ASCII wireframe untuk membandingkan beberapa layout sebelum implementasi.',
        'Tulis copy dari perspektif user dengan active voice, sentence case, dan satu tujuan jelas per elemen.',
      ],
      en: [
        'Use ASCII wireframes to compare layout options before implementation.',
        'Write from the user perspective with active voice, sentence case, and one clear job per element.',
      ],
    },
    pairsWellWith: ['webapp-testing', 'brand-guidelines', 'theme-factory'],
    sourcePath: 'skills/frontend-design/SKILL.md',
  },
  {
    name: 'canvas-design',
    category: 'design-brand',
    invocation: 'user',
    description: {
      id: 'Membuat visual art original pada canvas sebagai file .png atau .pdf, diawali visual philosophy dan disempurnakan dengan craftsmanship tinggi.',
      en: 'Creates original visual art as .png or .pdf artifacts, beginning with a visual philosophy and refined through careful craftsmanship.',
    },
    detailedDescription: {
      id: 'Skill ini memisahkan pekerjaan menjadi dua tahap: menulis visual philosophy sebagai aesthetic movement dalam file .md, lalu mengekspresikannya pada satu canvas visual berupa .pdf atau .png. Filosofi diterjemahkan melalui form, space, color, composition, pattern, serta minimal text; referensi konseptual harus subtil dan tidak literal. Hasil akhir harus original, visual-first, contained di dalam canvas, tidak overlap, dan dipoles melalui second pass.',
      en: 'This skill separates the work into two stages: writing a visual philosophy as an aesthetic movement in an .md file, then expressing it on a single visual canvas as a .pdf or .png. The philosophy is translated through form, space, color, composition, pattern, and minimal text; the conceptual reference should be subtle rather than literal. The final artifact must be original, visual-first, contained within the canvas, free of overlap, and refined through a second pass.',
    },
    useWhen: {
      id: [
        'Pengguna meminta poster, artwork, static design, atau visual canvas.',
        'Membuat art object satu halaman dengan komposisi, pattern, dan typography minimal.',
        'Membutuhkan output visual .png atau .pdf yang berasal dari design philosophy tertentu.',
      ],
      en: [
        'The user requests a poster, artwork, static design, or visual canvas.',
        'Creating a one-page art object with composition, patterns, and minimal typography.',
        'Producing a .png or .pdf visual artifact from a specific design philosophy.',
      ],
    },
    avoidWhen: {
      id: [
        'Pengguna membutuhkan UI interaktif atau generative art yang berjalan sebagai code.',
        'Menyalin karya atau gaya artist tertentu; skill ini mengharuskan desain original.',
      ],
      en: [
        'The user needs interactive UI or generative art running as code.',
        'Copying an existing artist or artwork; the skill requires original design.',
      ],
    },
    howItWorks: {
      id: [
        'Buat nama movement satu-dua kata dan visual philosophy 4–6 paragraf tentang form, space, color, scale, rhythm, composition, dan hierarchy.',
        'Deduplikasi subtle conceptual thread dari request tanpa menjadikannya referensi literal atau penjelasan panjang.',
        'Ekspresikan philosophy pada satu canvas yang 90% visual dan 10% essential text, memakai komposisi serta palette yang intentional.',
        'Periksa margin, overlap, readability, containment, font yang tersedia di ./canvas-fonts, lalu lakukan second pass untuk refinement.',
      ],
      en: [
        'Name the movement in one or two words and write a 4–6 paragraph visual philosophy covering form, space, color, scale, rhythm, composition, and hierarchy.',
        'Deduce a subtle conceptual thread from the request without making it literal or text-heavy.',
        'Express the philosophy on one canvas that is 90% visual and 10% essential text, with an intentional composition and palette.',
        'Check margins, overlap, readability, containment, and fonts available in ./canvas-fonts, then perform a refinement pass.',
      ],
    },
    coreRules: {
      id: [
        'Text harus sparse, essential, dan menjadi bagian dari visual—not paragraphs yang menjelaskan artwork.',
        'Jangan menyalin karya existing; buat visual design yang original.',
        'Semua elemen harus berada di dalam canvas dengan breathing room, separation, dan tanpa overlap.',
      ],
      en: [
        'Text must be sparse, essential, and part of the visual—not paragraphs explaining the artwork.',
        'Never copy existing work; create an original visual design.',
        'Every element must remain within the canvas with breathing room, separation, and no overlap.',
      ],
    },
    tips: {
      id: [
        'Gunakan repetition, systematic marks, dan limited palette untuk membangun depth tanpa menambah banyak elemen.',
        'Saat refinement, poles komposisi yang ada terlebih dahulu daripada otomatis menambahkan graphic baru.',
      ],
      en: [
        'Use repetition, systematic marks, and a limited palette to build depth without adding many elements.',
        'During refinement, polish the existing composition before automatically adding new graphics.',
      ],
    },
    pairsWellWith: ['pdf', 'brand-guidelines', 'theme-factory'],
    sourcePath: 'skills/canvas-design/SKILL.md',
  },
  {
    name: 'brand-guidelines',
    category: 'design-brand',
    invocation: 'model',
    description: {
      id: 'Menerapkan visual identity resmi Anthropic melalui palette warna, typography Poppins/Lora, fallback font, dan accent colors.',
      en: 'Applies Anthropic visual identity through its color palette, Poppins/Lora typography, fallback fonts, and accent colors.',
    },
    detailedDescription: {
      id: 'Skill ini menyediakan aturan styling Anthropic untuk artifact yang membutuhkan corporate identity, brand colors, atau visual formatting yang konsisten. Main colors-nya mencakup dark #141413, light #faf9f5, mid gray #b0aea5, dan light gray #e8e6dc; accent colors-nya orange #d97757, blue #6a9bcc, dan green #788c5d. Heading menggunakan Poppins dengan Arial fallback, sedangkan body text menggunakan Lora dengan Georgia fallback.',
      en: 'This skill provides Anthropic styling rules for artifacts that need corporate identity, brand colors, or consistent visual formatting. Main colors include dark #141413, light #faf9f5, mid gray #b0aea5, and light gray #e8e6dc; accents are orange #d97757, blue #6a9bcc, and green #788c5d. Headings use Poppins with an Arial fallback, while body text uses Lora with a Georgia fallback.',
    },
    useWhen: {
      id: [
        'Artifact harus mengikuti Anthropic look-and-feel atau official brand identity.',
        'Membutuhkan penerapan warna brand dan typography yang konsisten pada visual artifact.',
        'Membuat heading, body text, shape, dan accent dengan smart fallback saat font custom tidak tersedia.',
      ],
      en: [
        'An artifact must follow the Anthropic look and feel or official brand identity.',
        'Applying consistent brand colors and typography to a visual artifact.',
        'Styling headings, body text, shapes, and accents with fallbacks when custom fonts are unavailable.',
      ],
    },
    avoidWhen: {
      id: [
        'Brand brief meminta identity selain Anthropic atau membutuhkan eksplorasi brand-neutral.',
        'Pekerjaan tidak memiliki kebutuhan visual formatting atau brand styling.',
      ],
      en: [
        'The brief requires a brand identity other than Anthropic or a brand-neutral exploration.',
        'The work has no need for visual formatting or brand styling.',
      ],
    },
    howItWorks: {
      id: [
        'Gunakan main colors Anthropic untuk background, text, dan secondary surfaces sesuai kebutuhan artifact.',
        'Terapkan Poppins pada heading 24pt ke atas dan Lora pada body text, dengan Arial/Georgia sebagai fallback.',
        'Gunakan orange, blue, dan green secara bergantian untuk non-text shapes dan accents.',
        'Pastikan contrast, readability, hierarchy, dan color fidelity tetap terjaga pada seluruh artifact.',
      ],
      en: [
        'Use Anthropic main colors for backgrounds, text, and secondary surfaces as appropriate for the artifact.',
        'Apply Poppins to headings 24pt and larger and Lora to body text, with Arial/Georgia as fallbacks.',
        'Cycle orange, blue, and green for non-text shapes and accents.',
        'Preserve contrast, readability, hierarchy, and color fidelity across the artifact.',
      ],
    },
    coreRules: {
      id: [
        'Pertahankan nilai warna brand secara presisi, termasuk #141413, #faf9f5, #d97757, #6a9bcc, dan #788c5d.',
        'Heading dan body text harus memiliki typography role yang jelas dengan fallback yang sesuai.',
        'Jangan mengorbankan readability ketika menerapkan brand colors atau font.',
      ],
      en: [
        'Preserve brand color values precisely, including #141413, #faf9f5, #d97757, #6a9bcc, and #788c5d.',
        'Headings and body text must have clear typography roles with appropriate fallbacks.',
        'Do not sacrifice readability when applying brand colors or fonts.',
      ],
    },
    tips: {
      id: [
        'Pre-install Poppins dan Lora bila environment mendukung untuk hasil typography terbaik.',
        'Gunakan RGB color values saat tool artifact membutuhkannya, seperti python-pptx.',
      ],
      en: [
        'Pre-install Poppins and Lora when the environment supports it for the best typography results.',
        'Use RGB color values when the artifact tool requires them, such as python-pptx.',
      ],
    },
    pairsWellWith: ['pptx', 'pdf', 'docx', 'theme-factory'],
    sourcePath: 'skills/brand-guidelines/SKILL.md',
  },
  {
    name: 'theme-factory',
    category: 'design-brand',
    invocation: 'user',
    description: {
      id: 'Toolkit untuk memilih atau membuat theme dengan cohesive color palette, font pairing, dan visual identity bagi slides, docs, reports, atau HTML.',
      en: 'A toolkit for selecting or creating themes with cohesive palettes, font pairings, and visual identity for slides, docs, reports, or HTML.',
    },
    detailedDescription: {
      id: 'Theme Factory menyediakan 10 preset theme, masing-masing dengan color palette, complementary font pairing, dan visual identity untuk berbagai konteks. Alur pemakaian mengharuskan showcase PDF ditampilkan tanpa modifikasi, pengguna memilih theme secara eksplisit, lalu theme file dibaca dan diterapkan konsisten. Jika tidak ada preset yang cocok, skill dapat membuat custom theme, menampilkannya untuk review, dan baru kemudian menerapkannya.',
      en: 'Theme Factory provides 10 preset themes, each with a color palette, complementary font pairing, and visual identity for different contexts. Its workflow requires showing the unmodified theme showcase PDF, getting an explicit user choice, then reading and applying the selected theme consistently. If no preset fits, it can create a custom theme, show it for review, and only then apply it.',
    },
    useWhen: {
      id: [
        'Memilih visual theme untuk slide deck atau artifact yang sudah ada.',
        'Membutuhkan konsistensi warna dan font di seluruh presentation, document, report, atau HTML landing page.',
        'Tidak ada preset yang cocok dan pengguna perlu custom theme yang direview sebelum diterapkan.',
      ],
      en: [
        'Choosing a visual theme for an existing slide deck or artifact.',
        'Maintaining consistent colors and fonts across a presentation, document, report, or HTML landing page.',
        'No preset fits and the user needs a custom theme reviewed before application.',
      ],
    },
    avoidWhen: {
      id: [
        'Pengguna belum melihat showcase atau belum memberi explicit confirmation atas theme pilihan.',
        'Tugas membutuhkan brand identity resmi yang fixed, bukan pilihan theme umum.',
      ],
      en: [
        'The user has not seen the showcase or explicitly confirmed a theme choice.',
        'The task requires a fixed official brand identity rather than a general theme choice.',
      ],
    },
    howItWorks: {
      id: [
        'Tampilkan theme-showcase.pdf tanpa memodifikasinya.',
        'Minta pengguna memilih salah satu dari 10 preset theme dan tunggu explicit confirmation.',
        'Baca specification theme yang dipilih dari themes/ lalu terapkan colors dan fonts secara konsisten.',
        'Pastikan contrast, readability, dan visual identity tetap terjaga pada seluruh artifact.',
      ],
      en: [
        'Show theme-showcase.pdf without modifying it.',
        'Ask the user to choose one of the 10 preset themes and wait for explicit confirmation.',
        'Read the selected theme specification from themes/ and apply its colors and fonts consistently.',
        'Ensure contrast, readability, and the visual identity remain consistent across the artifact.',
      ],
    },
    coreRules: {
      id: [
        'Jangan menerapkan theme sebelum pengguna mengonfirmasi pilihan secara eksplisit.',
        'Theme harus diterapkan konsisten pada palette dan font pairing seluruh artifact.',
        'Showcase PDF hanya untuk viewing dan tidak boleh dimodifikasi.',
      ],
      en: [
        'Never apply a theme before the user explicitly confirms the choice.',
        'Apply the theme consistently to the palette and font pairing across the artifact.',
        'The showcase PDF is for viewing only and must not be modified.',
      ],
    },
    tips: {
      id: [
        'Gunakan nama theme dan konteksnya untuk membantu pengguna mempersempit pilihan.',
        'Untuk kebutuhan khusus, buat custom theme yang tetap memiliki nama deskriptif dan review visual.',
      ],
      en: [
        'Use each theme name and context to help the user narrow the choice.',
        'For special requirements, create a custom theme with a descriptive name and visual review.',
      ],
    },
    pairsWellWith: ['pptx', 'docx', 'pdf', 'brand-guidelines'],
    sourcePath: 'skills/theme-factory/SKILL.md',
  },
  {
    name: 'algorithmic-art',
    category: 'design-brand',
    invocation: 'user',
    description: {
      id: 'Membuat generative art original dengan p5.js, seeded randomness, parameter exploration, dan interactive HTML viewer.',
      en: 'Creates original generative art with p5.js, seeded randomness, parameter exploration, and an interactive HTML viewer.',
    },
    detailedDescription: {
      id: 'Skill ini mengubah request menjadi algorithmic philosophy lalu mengekspresikannya sebagai p5.js generative art. Implementasi harus memakai seeded randomness, parameter yang berasal dari filosofi, dan template viewer.html sebagai literal starting point dengan struktur, Anthropic branding, seed controls, serta action controls tetap dipertahankan. Output utamanya adalah philosophy dan satu self-contained HTML artifact yang dapat langsung berjalan di browser atau claude.ai.',
      en: 'This skill turns a request into an algorithmic philosophy and expresses it as p5.js generative art. The implementation must use seeded randomness, philosophy-derived parameters, and viewer.html as the literal starting point while preserving its structure, Anthropic branding, seed controls, and action controls. Its main outputs are the philosophy and one self-contained HTML artifact that runs directly in a browser or claude.ai.',
    },
    useWhen: {
      id: [
        'Pengguna meminta generative art, algorithmic art, flow field, particle system, atau art yang dibuat dengan code.',
        'Membangun p5.js sketch interaktif dengan parameter dan eksplorasi seed.',
        'Membutuhkan proses computational yang reproducible, emergent, dan dapat menghasilkan variasi.',
      ],
      en: [
        'The user requests generative art, algorithmic art, flow fields, particle systems, or code-created art.',
        'Building an interactive p5.js sketch with parameters and seed exploration.',
        'Needing a reproducible computational process that produces emergent variation.',
      ],
    },
    avoidWhen: {
      id: [
        'Pengguna hanya meminta static visual tanpa algorithmic behavior atau interactive viewer.',
        'Membuat ulang karya artist tertentu; hasil harus original, bukan copy.',
      ],
      en: [
        'The user only needs a static visual without algorithmic behavior or an interactive viewer.',
        'Recreating a specific artist’s work; the result must be original.',
      ],
    },
    howItWorks: {
      id: [
        'Tulis algorithmic philosophy 4–6 paragraf yang menjelaskan process, emergence, mathematical relationships, randomness, dan parameter variation.',
        'Deduplikasi subtle conceptual seed dari request untuk menjadi DNA algoritma tanpa referensi literal.',
        'Baca templates/viewer.html terlebih dahulu dan pertahankan fixed layout, branding, seed controls, serta actions.',
        'Ganti hanya algorithm, parameter controls, dan optional colors; gunakan randomSeed/noiseSeed, regenerate/reset/download, lalu verifikasi performa.',
      ],
      en: [
        'Write a 4–6 paragraph algorithmic philosophy covering process, emergence, mathematical relationships, randomness, and parameter variation.',
        'Derive a subtle conceptual seed from the request to become the algorithm’s DNA without a literal reference.',
        'Read templates/viewer.html first and preserve its fixed layout, branding, seed controls, and actions.',
        'Replace only the algorithm, parameter controls, and optional colors; use randomSeed/noiseSeed, regenerate/reset/download, and verify performance.',
      ],
    },
    coreRules: {
      id: [
        'Selalu gunakan seed untuk reproducibility; seed yang sama harus menghasilkan output identik.',
        'Algoritma harus mengungkapkan philosophy melalui process, forces, behaviors, dan emergence—bukan sekadar pattern acak.',
        'Jangan membuat HTML dari scratch; gunakan templates/viewer.html sebagai literal foundation dan pertahankan fixed sections.',
      ],
      en: [
        'Always use a seed for reproducibility; the same seed must produce identical output.',
        'The algorithm must express the philosophy through process, forces, behaviors, and emergence—not arbitrary random patterns.',
        'Do not create HTML from scratch; use templates/viewer.html as the literal foundation and preserve its fixed sections.',
      ],
    },
    tips: {
      id: [
        'Rancang parameter berdasarkan kualitas sistem yang perlu dituning—quantity, scale, speed, probability, ratio, angle, atau threshold.',
        'Jaga balance antara complexity dan visual noise, order dan rigidity, serta smooth execution untuk artwork real-time.',
      ],
      en: [
        'Design parameters around system qualities that need tuning—quantity, scale, speed, probability, ratio, angle, or threshold.',
        'Balance complexity with visual noise, order with rigidity, and smooth execution for real-time artwork.',
      ],
    },
    pairsWellWith: ['canvas-design', 'brand-guidelines', 'webapp-testing'],
    sourcePath: 'skills/algorithmic-art/SKILL.md',
  },
{
    name: 'skill-creator', category: 'agent-development', invocation: 'user',
    description: { id: 'Membuat, menguji, dan mengiterasi skills Claude.', en: 'Create, test, and iteratively improve Claude skills.' },
    detailedDescription: { id: 'Panduan end-to-end untuk menangkap intent, menulis draft SKILL.md, lalu menguji skill dengan prompt realistis. Workflow ini membandingkan run with-skill dan baseline, mengumpulkan feedback, serta memperbaiki triggering dan isi secara iteratif.', en: 'An end-to-end workflow for capturing intent, drafting SKILL.md, and testing a skill with realistic prompts. It compares with-skill runs against baselines, collects feedback, and iterates on triggering and content.' },
    useWhen: { id: ['Membuat skill baru dari nol.', 'Mengubah atau memperbaiki skill yang sudah ada.', 'Menjalankan eval, benchmark, atau optimasi deskripsi skill.'], en: ['Creating a new skill from scratch.', 'Modifying or improving an existing skill.', 'Running skill evals, benchmarks, or description-trigger optimization.'] },
    avoidWhen: { id: ['Tugas tidak berkaitan dengan pembuatan atau evaluasi skills.'], en: ['The task is unrelated to creating or evaluating skills.'] },
    howItWorks: { id: ['Tangkap intent, trigger, output, dan kriteria sukses.', 'Tulis draft SKILL.md dan eval prompts.', 'Jalankan with-skill dan baseline secara paralel, lalu grade serta agregasikan hasil.', 'Gunakan feedback untuk iterasi dan perluas test set.'], en: ['Capture intent, triggers, output, and success criteria.', 'Write the SKILL.md draft and eval prompts.', 'Run with-skill and baseline cases in parallel, then grade and aggregate results.', 'Use feedback to iterate and expand the test set.'] },
    coreRules: { id: ['Letakkan informasi triggering di description dan buat trigger spesifik.', 'Gunakan progressive disclosure; jaga SKILL.md tetap ringkas dan referensial.', 'Bandingkan hasil dengan baseline, bukan hanya menilai skill secara terisolasi.'], en: ['Put triggering information in the description and make triggers specific.', 'Use progressive disclosure; keep SKILL.md concise and referential.', 'Compare results with a baseline rather than judging the skill in isolation.'] },
    tips: { id: ['Mulai dari 2-3 test prompt realistis.', 'Bundel helper yang berulang ke scripts/ daripada menulis ulang.'], en: ['Start with 2-3 realistic test prompts.', 'Bundle repeated helpers in scripts/ instead of reinventing them.'] },
    pairsWellWith: ['mcp-builder', 'webapp-testing'], sourcePath: 'skills/skill-creator/SKILL.md'
  },
  {
    name: 'mcp-builder', category: 'agent-development', invocation: 'user',
    description: { id: 'Membangun server MCP berkualitas tinggi dengan integrasi API yang andal.', en: 'Build high-quality MCP servers with reliable API integrations.' },
    detailedDescription: { id: 'Skill ini memandu perancangan MCP server dari riset API dan pemilihan tools hingga implementasi, testing, dan evaluasi kualitas. Fokusnya adalah tool yang jelas, error handling yang baik, pagination, autentikasi, serta output yang berguna bagi model.', en: 'This skill guides MCP server design from API research and tool selection through implementation, testing, and quality evaluation. It emphasizes clear tools, robust error handling, pagination, authentication, and model-useful outputs.' },
    useWhen: { id: ['Membangun MCP server baru.', 'Membungkus REST API atau layanan eksternal menjadi tools MCP.', 'Mereview kualitas desain tools MCP.'], en: ['Building a new MCP server.', 'Wrapping a REST API or external service as MCP tools.', 'Reviewing MCP tool design quality.'] },
    avoidWhen: { id: ['Hanya membutuhkan client MCP atau integrasi tanpa membuat server.'], en: ['You only need an MCP client or an integration without building a server.'] },
    howItWorks: { id: ['Riset API, use case, autentikasi, dan batasan layanan.', 'Pilih tool yang task-oriented dengan schema input yang ketat.', 'Implementasikan server, pagination, error handling, dan konfigurasi.', 'Uji fungsionalitas serta evaluasi kualitas dan discoverability tools.'], en: ['Research the API, use cases, authentication, and service limits.', 'Choose task-oriented tools with strict input schemas.', 'Implement the server, pagination, error handling, and configuration.', 'Test functionality and evaluate tool quality and discoverability.'] },
    coreRules: { id: ['Jangan membuat satu tool generik yang memaksa model memahami API mentah.', 'Validasi input dan sampaikan error yang actionable.', 'Kembalikan konteks secukupnya agar model dapat menyelesaikan task.'], en: ['Do not make one generic tool that forces the model to understand the raw API.', 'Validate inputs and return actionable errors.', 'Return enough context for the model to complete the task.'] },
    tips: { id: ['Gunakan nama dan deskripsi tool yang berorientasi task.', 'Sertakan pagination dan rate-limit awareness sejak awal.'], en: ['Use task-oriented tool names and descriptions.', 'Include pagination and rate-limit awareness from the start.'] },
    pairsWellWith: ['skill-creator', 'claude-api'], sourcePath: 'skills/mcp-builder/SKILL.md'
  },
  {
    name: 'claude-api', category: 'agent-development', invocation: 'model',
    description: { id: 'Referensi Claude API dan SDK resmi dengan mekanisme trigger: dibaca sebelum membuka file target, jangan pernah dari memori.', en: 'Claude API and official SDK reference with a trigger mechanism: read before opening the target file, never from memory.' },
    detailedDescription: { id: 'Referensi trigger-first untuk model ids, pricing, params, streaming, tool use, MCP, agents, caching, token counting, dan migrasi model lintas SDK. Mekanisme TRIGGER mewajibkan membaca referensi yang tepat (sesuai bahasa dan fitur) sebelum membuka file target dan melarang menjawab dari memori; aturan SKIP mengecualikan task provider lain seperti OpenAI, Gemini, atau Ollama.', en: 'A trigger-first reference for model ids, pricing, params, streaming, tool use, MCP, agents, caching, token counting, and model migration across SDKs. Its TRIGGER mechanism requires reading the matching reference (by language and feature) before opening the target file and forbids answering from memory; SKIP rules exclude other-provider tasks such as OpenAI, Gemini, or Ollama.' },
    useWhen: { id: ['Mengintegrasikan Claude API atau SDK Anthropic.', 'Membangun agent dengan tools, MCP, atau caching.', 'Menggunakan batches, files API, token counting, atau migrasi model.'], en: ['Integrating the Claude API or Anthropic SDK.', 'Building an agent with tools, MCP, or caching.', 'Using batches, the Files API, token counting, or model migration.'] },
    avoidWhen: { id: ['Task memakai provider lain (OpenAI, Gemini, Ollama); aturan SKIP berlaku.', 'Tidak ada integrasi LLM atau SDK yang dikerjakan.'], en: ['The task uses another provider (OpenAI, Gemini, Ollama); SKIP rules apply.', 'No LLM or SDK integration is involved.'] },
    howItWorks: { id: ['Deteksi bahasa dan fitur yang diperlukan.', 'Baca README SDK terlebih dahulu lalu referensi fitur terkait.', 'Implementasikan dengan tipe SDK resmi dan pola error handling yang tepat.', 'Verifikasi dukungan model, beta header, dan parameter API.'], en: ['Detect the language and required feature.', 'Read the SDK README first, then the relevant feature reference.', 'Implement with official SDK types and appropriate error handling.', 'Verify model support, beta headers, and API parameters.'] },
    coreRules: { id: ['Baca referensi DULU sebelum membuka file target; jangan pernah menjawab dari memori.', 'Gunakan API surface dan helper SDK resmi, bukan reimplementasi.', 'Jangan memotong input diam-diam.'], en: ['Read the reference FIRST before opening the target file; never answer from memory.', 'Use the official API surface and SDK helpers rather than reimplementing them.', 'Never silently truncate input.'] },
    tips: { id: ['Gunakan streaming untuk output besar atau timeout panjang.', 'Key hasil batch dengan custom_id karena urutan hasil tidak dijamin.'], en: ['Use streaming for large output or long timeouts.', 'Key batch results by custom_id because result order is not guaranteed.'] },
    pairsWellWith: ['mcp-builder', 'web-artifacts-builder'], sourcePath: 'skills/claude-api/SKILL.md'
  },
  {
    name: 'webapp-testing', category: 'agent-development', invocation: 'user',
    description: { id: 'Testing web app lokal dengan Playwright untuk verifikasi UI dan perilaku.', en: 'Test local web apps with Playwright to verify UI and behavior.' },
    detailedDescription: { id: 'Gunakan native Python Playwright untuk menguji web app statis maupun dinamis. Workflow membedakan server yang sudah berjalan, memakai with_server.py bila perlu, lalu melakukan reconnaissance DOM sebelum action.', en: 'Use native Python Playwright to test static and dynamic web apps. The workflow distinguishes already-running servers, uses with_server.py when needed, and performs DOM reconnaissance before actions.' },
    useWhen: { id: ['Memverifikasi frontend atau UI web app lokal.', 'Debugging perilaku browser dan mengambil screenshot atau browser logs.', 'Menjalankan automation Playwright pada app dinamis.'], en: ['Verifying a local web app frontend or UI.', 'Debugging browser behavior and capturing screenshots or browser logs.', 'Running Playwright automation against a dynamic app.'] },
    avoidWhen: { id: ['Tugas bukan testing atau automation web app.'], en: ['The task is not web-app testing or automation.'] },
    howItWorks: { id: ['Cek apakah HTML statis atau app dinamis.', 'Untuk app dinamis, start server dengan scripts/with_server.py --help bila belum berjalan.', 'Navigate, tunggu networkidle, inspect DOM, lalu pilih selectors.', 'Jalankan actions dan tutup browser.'], en: ['Determine whether the HTML is static or the app is dynamic.', 'For a dynamic app, run scripts/with_server.py --help and use it if no server is running.', 'Navigate, wait for networkidle, inspect the DOM, then choose selectors.', 'Run actions and close the browser.'] },
    coreRules: { id: ['Selalu tunggu networkidle sebelum inspect app dinamis.', 'Gunakan selector yang ditemukan dari rendered state.', 'Jalankan helper scripts sebagai black box dan coba --help lebih dahulu.'], en: ['Always wait for networkidle before inspecting a dynamic app.', 'Use selectors discovered from the rendered state.', 'Run helper scripts as black boxes and try --help first.'] },
    tips: { id: ['Gunakan headless Chromium dan descriptive selectors.', 'Pisahkan reconnaissance dari action.'], en: ['Use headless Chromium and descriptive selectors.', 'Separate reconnaissance from action.'] },
    pairsWellWith: ['web-artifacts-builder', 'skill-creator'], sourcePath: 'skills/webapp-testing/SKILL.md'
  },
  {
    name: 'web-artifacts-builder', category: 'agent-development', invocation: 'user',
    description: { id: 'Membangun HTML artifact kompleks berbasis React, Tailwind, dan shadcn/ui.', en: 'Build complex HTML artifacts with React, Tailwind, and shadcn/ui.' },
    detailedDescription: { id: 'Skill ini menyediakan workflow untuk membuat artifact multi-komponen dengan React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, dan Parcel. Proyek diinisialisasi, dikembangkan, dibundle menjadi satu HTML mandiri, lalu dibagikan dan opsional diuji.', en: 'This skill provides a workflow for multi-component artifacts using React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, and Parcel. Initialize the project, develop it, bundle it into one self-contained HTML file, then share it and optionally test it.' },
    useWhen: { id: ['Membuat artifact HTML kompleks untuk claude.ai.', 'Membutuhkan state management, routing, atau banyak shadcn/ui components.', 'Membundle frontend React menjadi satu file HTML.'], en: ['Creating a complex HTML artifact for claude.ai.', 'Needing state management, routing, or many shadcn/ui components.', 'Bundling a React frontend into one HTML file.'] },
    avoidWhen: { id: ['Artifact sederhana single-file HTML/JSX yang tidak membutuhkan stack ini.'], en: ['A simple single-file HTML/JSX artifact that does not need this stack.'] },
    howItWorks: { id: ['Inisialisasi dengan bash scripts/init-artifact.sh <project-name>.', 'Edit generated React/TypeScript project dan bangun UI.', 'Bundle dengan bash scripts/bundle-artifact.sh.', 'Bagikan bundle.html dan test hanya bila perlu.'], en: ['Initialize with bash scripts/init-artifact.sh <project-name>.', 'Edit the generated React/TypeScript project and build the UI.', 'Bundle with bash scripts/bundle-artifact.sh.', 'Share bundle.html and test only when needed.'] },
    coreRules: { id: ['Gunakan workflow init, develop, bundle; jangan memakai skill ini untuk artifact sederhana.', 'Hindari excessive centered layouts, purple gradients, uniform rounded corners, dan Inter font.', 'Bundle harus self-contained dengan asset inline.'], en: ['Follow the init, develop, bundle workflow; do not use this for simple artifacts.', 'Avoid excessive centered layouts, purple gradients, uniform rounded corners, and Inter font.', 'The bundle must be self-contained with inlined assets.'] },
    tips: { id: ['Pastikan index.html ada sebelum bundling.', 'Testing/visualizing bersifat opsional dan dilakukan setelah artifact siap.'], en: ['Ensure index.html exists before bundling.', 'Testing/visualization is optional and can happen after the artifact is ready.'] },
    pairsWellWith: ['webapp-testing', 'claude-api'], sourcePath: 'skills/web-artifacts-builder/SKILL.md'
  },
{
    name: 'doc-coauthoring', category: 'writing-comms', invocation: 'user',
    description: { id: 'Workflow kolaboratif untuk menulis dokumentasi terstruktur bersama.', en: 'A collaborative workflow for writing structured documentation.' },
    detailedDescription: { id: 'Skill ini memandu pembuatan proposal, spec, RFC, dan decision doc melalui tiga tahap: Context Gathering, Refinement & Structure, dan Reader Testing. Claude mengumpulkan konteks, menyusun dokumen secara iteratif, lalu menguji apakah pembaca baru dapat memahaminya.', en: 'This skill guides proposals, specs, RFCs, and decision docs through Context Gathering, Refinement & Structure, and Reader Testing. Claude gathers context, iteratively builds the document, then tests whether a fresh reader can understand it.' },
    useWhen: { id: ['Menulis proposal, technical spec, RFC, atau decision doc.', 'Memulai dokumentasi substantial dengan banyak konteks.', 'Menguji apakah dokumen mudah dipahami pembaca.'], en: ['Writing a proposal, technical spec, RFC, or decision doc.', 'Starting substantial documentation with substantial context.', 'Testing whether a document works for readers.'] },
    avoidWhen: { id: ['Pengguna menginginkan freeform writing atau tugas kecil yang tidak memerlukan workflow bertahap.'], en: ['The user wants freeform writing or a small task that does not need a staged workflow.'] },
    howItWorks: { id: ['Tawarkan tiga tahap dan minta persetujuan.', 'Kumpulkan tipe dokumen, audiens, dampak, template, constraint, lalu minta info dump dan klarifikasi.', 'Bangun tiap section lewat pertanyaan, brainstorming, kurasi, drafting, dan refinement.', 'Prediksi pertanyaan pembaca dan uji dokumen dengan Claude fresh, lalu perbaiki gap.'], en: ['Offer the three stages and ask for consent.', 'Gather document type, audience, impact, template, constraints, then request an info dump and clarifications.', 'Build each section through questions, brainstorming, curation, drafting, and refinement.', 'Predict reader questions and test the document with a fresh Claude, then fix gaps.'] },
    coreRules: { id: ['Berikan agency: jika workflow ditolak, lanjutkan secara freeform.', 'Jangan melewati reader testing pada dokumen yang akan dipakai orang lain.', 'Gunakan pertanyaan dan edit iteratif, bukan langsung menulis seluruh dokumen tanpa konteks.'], en: ['Preserve user agency: if the workflow is declined, work freeform.', 'Do not skip reader testing for documents others will use.', 'Use questions and iterative edits rather than drafting everything without context.'] },
    tips: { id: ['Mulai dari section dengan unknowns terbanyak; summary biasanya terakhir.', 'Setelah tiga iterasi tanpa perubahan besar, tanyakan apa yang bisa dihapus.'], en: ['Start with the section containing the most unknowns; leave summaries until last.', 'After three iterations without substantial change, ask what can be removed.'] },
    pairsWellWith: ['internal-comms', 'discernment-nudge'], sourcePath: 'skills/doc-coauthoring/SKILL.md'
  },
  {
    name: 'internal-comms', category: 'writing-comms', invocation: 'user',
    description: { id: 'Panduan menulis berbagai komunikasi internal sesuai format organisasi.', en: 'Guidance for writing internal communications in the organization’s preferred formats.' },
    detailedDescription: { id: 'Skill ini membantu menulis 3P updates, newsletter perusahaan, FAQ, status report, leadership update, project update, dan incident report. Workflow-nya mengidentifikasi tipe komunikasi lalu memuat guideline yang sesuai dari direktori examples.', en: 'This skill supports 3P updates, company newsletters, FAQs, status reports, leadership updates, project updates, and incident reports. Its workflow identifies the communication type and loads the matching guideline from the examples directory.' },
    useWhen: { id: ['Menulis 3P update Progress, Plans, Problems.', 'Membuat newsletter, FAQ, status, leadership, atau project update.', 'Menulis incident report atau internal company comms.'], en: ['Writing a Progress, Plans, Problems (3P) update.', 'Creating a newsletter, FAQ, status, leadership, or project update.', 'Writing an incident report or other internal company comms.'] },
    avoidWhen: { id: ['Komunikasi eksternal atau format yang tidak memerlukan guideline internal.'], en: ['External communications or a format that does not call for internal guidelines.'] },
    howItWorks: { id: ['Identifikasi communication type dari request.', 'Load guideline yang tepat: 3P, newsletter, FAQ, atau general comms.', 'Ikuti instruksi format, tone, dan content gathering; minta klarifikasi jika tidak ada kecocokan.'], en: ['Identify the communication type from the request.', 'Load the appropriate 3P, newsletter, FAQ, or general-comms guideline.', 'Follow its formatting, tone, and content-gathering instructions; ask for clarification when no guideline fits.'] },
    coreRules: { id: ['Jangan menulis sebelum memilih guideline yang sesuai.', 'Jika tipe tidak cocok dengan guideline, minta format atau konteks tambahan.'], en: ['Choose the matching guideline before writing.', 'If the type matches no guideline, ask for the desired format or more context.'] },
    tips: { id: ['Gunakan keyword 3P updates, company newsletter, weekly update, atau internal comms untuk mengenali intent.', 'Bedakan general comms dari format khusus agar struktur tetap konsisten.'], en: ['Use keywords such as 3P updates, company newsletter, weekly update, or internal comms to identify intent.', 'Distinguish general comms from specialized formats to keep structure consistent.'] },
    pairsWellWith: ['doc-coauthoring', 'discernment-nudge'], sourcePath: 'skills/internal-comms/SKILL.md'
  },
  {
    name: 'slack-gif-creator', category: 'writing-comms', invocation: 'user',
    description: { id: 'Toolkit membuat animated GIF yang optimal untuk Slack.', en: 'A toolkit for creating animated GIFs optimized for Slack.' },
    detailedDescription: { id: 'Skill ini menyediakan constraint Slack, GIFBuilder, validators, easing, frame helpers, dan konsep animasi berbasis PIL. Ia mendukung emoji GIF 128x128 dan message GIF 480x480, dengan perhatian pada FPS, warna, durasi, dan optimasi ukuran.', en: 'This skill provides Slack constraints, GIFBuilder, validators, easing, frame helpers, and PIL-based animation concepts. It supports 128x128 emoji GIFs and 480x480 message GIFs while accounting for FPS, colors, duration, and file-size optimization.' },
    useWhen: { id: ['Membuat animated GIF untuk Slack.', 'Mengubah uploaded image menjadi animasi atau memakainya sebagai inspirasi.', 'Memvalidasi atau mengoptimalkan GIF Slack.'], en: ['Creating an animated GIF for Slack.', 'Animating an uploaded image or using it as inspiration.', 'Validating or optimizing a Slack GIF.'] },
    avoidWhen: { id: ['Membuat aset non-animated atau output untuk platform yang bukan Slack.'], en: ['Creating non-animated assets or output for a platform other than Slack.'] },
    howItWorks: { id: ['Pilih dimensi dan parameter Slack yang sesuai.', 'Buat frame dengan PIL primitives atau uploaded image, lalu tambahkan ke GIFBuilder.', 'Simpan dengan palette/optimization yang diminta dan validasi memakai validate_gif atau is_slack_ready.', 'Gunakan easing dan konsep seperti bounce, pulse, spin, fade, slide, atau zoom untuk motion.'], en: ['Choose the appropriate Slack dimensions and parameters.', 'Create frames with PIL primitives or an uploaded image, then add them to GIFBuilder.', 'Save with the requested palette/optimization and validate with validate_gif or is_slack_ready.', 'Use easing and concepts such as bounce, pulse, spin, fade, slide, or zoom for motion.'] },
    coreRules: { id: ['Emoji GIF recommended 128x128, 10–30 FPS, dan di bawah 3 detik.', 'Jangan gunakan emoji fonts atau mengasumsikan pre-packaged graphics tersedia.', 'Utamakan garis tebal, visual depth, contrast, dan composition polished.'], en: ['Emoji GIFs are recommended at 128x128, 10–30 FPS, and under 3 seconds.', 'Do not use emoji fonts or assume pre-packaged graphics exist.', 'Prioritize thick lines, visual depth, contrast, and polished composition.'] },
    tips: { id: ['Kurangi frames, colors, dimensions, atau duplicate frames hanya ketika ukuran file memang diminta diperkecil.', 'Install pillow, imageio, dan numpy untuk dependencies toolkit.'], en: ['Reduce frames, colors, dimensions, or duplicate frames only when smaller size is requested.', 'Install pillow, imageio, and numpy for the toolkit dependencies.'] },
    pairsWellWith: ['doc-coauthoring', 'internal-comms'], sourcePath: 'skills/slack-gif-creator/SKILL.md'
  },
  {
    name: 'discernment-nudge', category: 'writing-comms', invocation: 'model',
    description: { id: 'Nudge singkat agar pengguna memeriksa fakta, reasoning, dan konteks yang hilang.', en: 'A concise nudge to check facts, reasoning, and missing context.' },
    detailedDescription: { id: 'Skill ini dipakai sebelum finalisasi jawaban substantive yang mungkin ditindaklanjuti pengguna. Setelah jawaban, ia menambahkan 2–3 pertanyaan spesifik untuk memeriksa klaim, asumsi, atau konteks; maksimal sekali per conversation.', en: 'Use this skill before finalizing a substantive answer the user may act on. After the answer, it adds 2–3 specific questions about claims, assumptions, or missing context, at most once per conversation.' },
    useWhen: { id: ['Memberi estimates, advice consequential, factual claims yang akan dipakai, atau analysis.', 'Menyusun plan, pitch, proposal, email, atau artifact substantive.', 'Ada asumsi konkret yang perlu diperiksa sebelum bertindak.'], en: ['Giving estimates, consequential advice, actionable factual claims, or analysis.', 'Drafting a substantive plan, pitch, proposal, email, or artifact.', 'A concrete assumption should be checked before acting.'] },
    avoidWhen: { id: ['Creative writing, casual chat, simple lookup, purely educational explanation, code yang akan dijalankan, atau pengguna sudah meminta verify/cite/review.'], en: ['Creative writing, casual chat, simple lookups, purely educational explanations, executable code, or when the user already asked to verify, cite, or review.'] },
    howItWorks: { id: ['Jawab lengkap terlebih dahulu.', 'Pilih 2–3 pertanyaan yang merujuk angka, reasoning step, atau missing context secara spesifik.', 'Tambahkan setelah blank line dengan lead-in exact “A few things worth a second look:” dan plain bullets.', 'Skip jika sudah pernah dinudge dalam conversation.'], en: ['Answer completely first.', 'Choose 2–3 questions tied specifically to a number, reasoning step, or missing context.', 'Append them after a blank line using the exact lead-in “A few things worth a second look:” and plain bullets.', 'Skip if a nudge was already given in the conversation.'] },
    coreRules: { id: ['Nudge maksimal sekali per conversation.', 'Setiap prompt harus conversational, first-person, spesifik, dan sekitar di bawah 120 karakter.', 'Jangan menambahkan framing atau teks setelah nudge.'], en: ['Nudge at most once per conversation.', 'Each prompt must be conversational, first-person, specific, and roughly under 120 characters.', 'Add no extra framing or text after the nudge.'] },
    tips: { id: ['Gunakan pertanyaan yang bisa langsung dikirim balik sebagai follow-up.', 'Silence lebih baik daripada nudge generik ketika tidak ada hal konkret untuk diperiksa.'], en: ['Phrase questions so the user could send them back verbatim.', 'Silence is better than a generic nudge when nothing concrete merits checking.'] },
    pairsWellWith: ['doc-coauthoring', 'internal-comms'], sourcePath: 'skills/discernment-nudge/SKILL.md'
  },
  {
    name: 'academy-guide', category: 'writing-comms', invocation: 'model',
    description: { id: 'Panduan memilih course, tutorial, atau use case Claude Academy yang benar-benar relevan.', en: 'Guidance for choosing a genuinely relevant Claude Academy course, tutorial, or use case.' },
    detailedDescription: { id: 'Skill ini memeriksa apakah pertanyaan pengguna tentang cara memakai Claude atau produknya memiliki strong match di Claude Academy. Jawaban langsung tetap diberikan lebih dulu, lalu rekomendasi singkat dari catalog yang fresh ditambahkan bila cocok; jika catalog tidak tersedia, gunakan product hub atau resources library.', en: 'This skill checks whether a user asking how to use Claude or a Claude product has a strong match in Claude Academy. Give the direct answer first, then add a brief recommendation from a fresh catalog when appropriate; if the catalog is unavailable, use a product hub or resources library.' },
    useWhen: { id: ['Menjawab “how do I”, “getting started”, atau “what can Claude do”.', 'Menjelaskan artifacts, projects, skills, plugins, connectors, MCP, atau rollout Claude.', 'Pengguna meminta training materials, onboarding, course, tutorial, atau learning resources.'], en: ['Answering “how do I”, “getting started”, or “what can Claude do” questions.', 'Explaining artifacts, projects, skills, plugins, connectors, MCP, or Claude rollout.', 'The user requests training materials, onboarding, courses, tutorials, or learning resources.'] },
    avoidWhen: { id: ['Pengguna sedang meminta tugas diselesaikan, bukan belajar memakai feature; atau match Academy hanya tangential.'], en: ['The user is asking to complete a task rather than learn a feature, or the Academy match is merely tangential.'] },
    howItWorks: { id: ['Jawab pertanyaan produk terlebih dahulu.', 'Cari strong intent match di catalog JSON yang belum stale.', 'Rekomendasikan maksimal 1–2 item dengan title dan URL exact dari catalog, atau hub/resources bila item tidak tersedia.', 'Jangan mengarang content, title, atau URL; gunakan phrasing natural dan tidak pushy.'], en: ['Answer the product question first.', 'Look for a strong intent match in the non-stale JSON catalog.', 'Recommend at most 1–2 items with exact catalog titles and URLs, or a hub/resources page when no item is available.', 'Never invent content, titles, or URLs; use natural, non-pushy phrasing.'] },
    coreRules: { id: ['Strong match berbasis intent, bukan sekadar topic; silence lebih baik daripada rekomendasi lemah.', 'Item URL harus disalin verbatim dari catalog dan hanya di bawah academy.claude.com.', 'Jika visibility gated, sebutkan bahwa Academy sign-in diperlukan.'], en: ['Require a strong intent match, not just topical overlap; silence beats a weak recommendation.', 'Copy item URLs verbatim from the catalog and only use academy.claude.com URLs.', 'Mention when a gated item requires an Academy sign-in.'] },
    tips: { id: ['Pilih satu rekomendasi terbaik; jangan membuat daftar panjang.', 'Gunakan product hub Claude, Claude Code, Claude Cowork, AI Fluency, atau developer platform untuk eksplorasi luas.'], en: ['Choose one best recommendation rather than a long list.', 'Use the Claude, Claude Code, Claude Cowork, AI Fluency, or developer platform hub for broad exploration.'] },
    pairsWellWith: ['doc-coauthoring', 'discernment-nudge'], sourcePath: 'skills/academy-guide/SKILL.md'
  }
]
