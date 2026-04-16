import { BMCBlockKey } from './types';

export interface BlockGuide {
  steps: string[];
  evidence: string[];
}

export interface GeneralPrinciple {
  title: string;
  desc: string;
}

export interface Strategy {
  title: string;
  desc: string;
}

export interface FillOrderStep {
  title: string;
  desc: string;
}

export interface CommonMistake {
  point: string;
}

export const fillOrderSummary =
  'Mengikuti saran Alexander Osterwalder, isi BMC sebaiknya dimulai dari sisi kanan agar kamu lebih jelas menentukan siapa pelanggan, nilai yang ditawarkan, dan alasan mereka mau membayar sebelum melengkapi sisi kiri canvas.';

export const fillOrderSteps: FillOrderStep[] = [
  {
    title: 'Customer Segments',
    desc: 'Mulai dari segmen pelanggan inti, jobs-to-be-done, pain, dan gain mereka.',
  },
  {
    title: 'Value Propositions',
    desc: 'Rumuskan nilai yang benar-benar menjawab kebutuhan segmen tadi.',
  },
  {
    title: 'Channels & Customer Relationships',
    desc: 'Tentukan cara menjangkau pelanggan dan bagaimana menjaga hubungan dengan mereka.',
  },
  {
    title: 'Revenue Streams',
    desc: 'Validasi untuk nilai apa pelanggan bersedia membayar dan bagaimana uang masuk.',
  },
  {
    title: 'Sisi Kiri Canvas',
    desc: 'Baru lengkapi Key Resources, Key Activities, dan Key Partnerships untuk mendukung nilai tadi.',
  },
  {
    title: 'Cost Structure',
    desc: 'Tutup dengan biaya agar model bisnisnya tetap realistis secara finansial.',
  },
];

// ─── Prinsip Umum (Bagian A) ─────────────────────────────────────────────────
export const generalPrinciples: GeneralPrinciple[] = [
  {
    title: 'Mulai dari Sisi Kanan Canvas',
    desc: 'Ikuti urutan Alexander Osterwalder: mulai dari Customer Segments, lanjut ke Value Propositions, lalu hubungan/channel pelanggan sebelum mengisi sisi kiri BMC.',
  },
  {
    title: 'Gunakan Bahasa yang Jelas dan Ringkas',
    desc: 'Tulis setiap blok dengan kalimat sederhana (1–3 kalimat utama) yang langsung menjawab inti pertanyaan.',
  },
  {
    title: 'Selalu Sertakan Bukti Nyata',
    desc: 'Jangan hanya menulis asumsi. Gunakan hasil wawancara, data uji, atau contoh nyata untuk mendukung setiap poin.',
  },
  {
    title: 'Fokus pada Konsistensi Antarblok',
    desc: 'Pastikan segmen pelanggan, proposisi nilai, saluran, dan pendapatan saling terhubung secara logis.',
  },
  {
    title: 'Gunakan Format Tabel atau Visual',
    desc: 'Susun BMC dengan rapi, gunakan warna atau simbol untuk membedakan mana yang asumsi dan mana yang sudah terbukti.',
  },
];

// ─── Panduan Per-Blok (Bagian B) ─────────────────────────────────────────────
export const blockGuides: Record<BMCBlockKey, BlockGuide> = {
  keyPartnerships: {
    steps: [
      'Identifikasi mitra strategis yang bisa mempercepat validasi (kampus, komunitas, supplier, mentor).',
      'Jelaskan alasan memilih mitra tersebut: akses pasar, teknologi, atau distribusi.',
    ],
    evidence: [
      'Screenshot chat/email dengan mitra.',
      'MoU atau kesepakatan awal yang sudah ditandatangani.',
    ],
  },
  keyActivities: {
    steps: [
      'Daftar aktivitas inti yang benar-benar membuat produk berjalan (membuat konten, mengembangkan aplikasi, menjaga server, memproduksi, mengemas, memasarkan, dll.).',
      'Prioritaskan aktivitas yang paling krusial untuk keberhasilan di fase awal.',
    ],
    evidence: [
      'Timeline atau roadmap kerja sederhana.',
      'Dokumentasi proses kerja (SOP singkat, foto aktivitas).',
    ],
  },
  keyResources: {
    steps: [
      'Tulis sumber daya yang paling penting: orang, teknologi, aset, data, atau merek.',
      'Identifikasi mana yang paling krusial untuk keberhasilan di awal peluncuran.',
    ],
    evidence: [
      'CV atau kompetensi tim inti.',
      'Akses ke teknologi/sumber daya (software, lisensi, data, peralatan, studio).',
    ],
  },
  valuePropositions: {
    steps: [
      'Tuliskan solusi dalam bentuk hasil, bukan fitur. Contoh: "Menghemat waktu belajar 30% dengan ringkasan otomatis."',
      'Hubungkan langsung dengan pain/gain yang ditemukan dari riset pelanggan.',
      'Bandingkan dengan alternatif lain yang sudah ada (kompetitor atau solusi saat ini).',
    ],
    evidence: [
      'Foto, mockup produk, atau prototipe yang sudah bisa dipakai.',
      'Umpan balik dari 5–10 calon pengguna nyata (bukan keluarga/teman dekat).',
    ],
  },
  customerRelationships: {
    steps: [
      'Tentukan bagaimana menjaga hubungan pelanggan: personal, komunitas, otomatisasi, atau co-creation.',
      'Rancang strategi retensi sederhana: reminder via WhatsApp, newsletter, program referral, atau loyalty program.',
    ],
    evidence: [
      'Contoh desain komunikasi (template pesan, email, poster komunitas).',
      'Data retention awal (berapa % pengguna kembali lagi setelah pertama kali?).',
    ],
  },
  channels: {
    steps: [
      'Jelaskan saluran pada setiap tahap: menemukan produk (awareness), mencoba (acquisition), menggunakan (onboarding), dan mendapat dukungan.',
      'Bedakan saluran organik (komunitas, media sosial gratis) dan saluran berbayar (iklan, kerja sama kampus).',
    ],
    evidence: [
      'Data uji channel: CTR dari iklan, jumlah pendaftar dari poster kampus.',
      'Screenshot performa konten atau iklan yang sudah pernah dijalankan.',
    ],
  },
  customerSegments: {
    steps: [
      'Tentukan satu segmen inti yang jelas. Contoh: "mahasiswa semester awal di kota besar."',
      'Buat deskripsi singkat: usia, lokasi, pekerjaan, kebiasaan, dan kebutuhan utama.',
      'Identifikasi jobs-to-be-done — pekerjaan/tugas utama yang ingin mereka selesaikan.',
      'Tulis pain (masalah/hambatan) dan gain (manfaat/keuntungan) dari sudut pandang pelanggan.',
    ],
    evidence: [
      'Ringkasan minimal 10 wawancara singkat dengan target pelanggan nyata.',
      'Data kecil yang relevan: jumlah populasi segmen, statistik pasar, atau survei.',
    ],
  },
  costStructure: {
    steps: [
      'Identifikasi biaya tetap (gaji, sewa, langganan) dan biaya variabel (bahan baku, komisi, ongkir).',
      'Kelompokkan biaya: akuisisi pelanggan, operasional, produksi, dan dukungan pelanggan.',
      'Buat estimasi sederhana kapan bisnis bisa break-even (balik modal).',
    ],
    evidence: [
      'Tabel biaya bulanan sederhana (spreadsheet atau estimasi tertulis).',
      'Kuitansi, invoice, atau penawaran harga dari supplier.',
    ],
  },
  revenueStreams: {
    steps: [
      'Jelaskan model pendapatan: langganan bulanan, biaya sekali pakai, komisi, iklan, atau freemium.',
      'Cantumkan harga awal (contoh: Rp50.000/bulan) beserta alasan penetapan harga tersebut.',
    ],
    evidence: [
      'Data willingness to pay (WTP) dari survei atau wawancara pelanggan.',
      'Bukti minat beli nyata: pra-pemesanan, daftar tunggu, atau pernyataan bersedia membayar.',
    ],
  },
};

// ─── Strategi (Bagian C) ──────────────────────────────────────────────────────
export const strategies: Strategy[] = [
  {
    title: 'Mulai dengan Data Nyata',
    desc: 'Jangan mengarang. Lakukan minimal 10 wawancara pelanggan untuk memahami kebutuhan mereka sebelum mengisi BMC.',
  },
  {
    title: 'Gunakan Visual',
    desc: 'Sertakan gambar, grafik, atau prototipe agar ide lebih mudah dipahami oleh penilai dan investor.',
  },
  {
    title: 'Keterhubungan Antarblok',
    desc: 'Pastikan setiap blok BMC saling mendukung secara logis sehingga model bisnis konsisten dan meyakinkan.',
  },
  {
    title: 'Angka Lebih Meyakinkan',
    desc: 'Gunakan persentase, estimasi sederhana, atau data kecil untuk memperkuat setiap argumen.',
  },
  {
    title: 'Buat Versi Iterasi',
    desc: 'Tunjukkan bahwa BMC berkembang dari hasil uji coba. Bisnis yang makin realistis dan adaptif lebih dinilai tinggi.',
  },
];

// ─── Kesalahan Umum ───────────────────────────────────────────────────────────
export const commonMistakes: string[] = [
  'Mahasiswa hanya menyalin contoh tanpa melakukan uji lapangan sendiri.',
  'Blok ditulis generik dan tidak spesifik pada konteks bisnis sendiri.',
  'Tidak ada keterhubungan yang logis antarblok BMC.',
];
