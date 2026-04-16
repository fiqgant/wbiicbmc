import { BMCData, BlockMeta } from './types';

export const blockMeta: BlockMeta[] = [
  {
    key: 'keyPartnerships',
    title: 'Key Partnerships',
    description: 'Who are our key partners and suppliers?',
    placeholders: [
      'Strategic alliance with Tech Corp',
      'Joint venture with Distributor',
      'Supplier agreement for materials',
    ],
  },
  {
    key: 'keyActivities',
    title: 'Key Activities',
    description: 'What key activities does our value proposition require?',
    placeholders: [
      'Software development & maintenance',
      'Customer acquisition campaigns',
      'Quality assurance processes',
    ],
  },
  {
    key: 'keyResources',
    title: 'Key Resources',
    description: 'What key resources does our value proposition require?',
    placeholders: [
      'Proprietary technology & IP',
      'Engineering and design team',
      'Financial capital & brand equity',
    ],
  },
  {
    key: 'valuePropositions',
    title: 'Value Propositions',
    description: 'What value do we deliver to the customer?',
    placeholders: [
      'Solves specific customer pain point',
      'Reduces cost by 40% vs alternatives',
      'Best-in-class user experience',
    ],
  },
  {
    key: 'customerRelationships',
    title: 'Customer Relationships',
    description: 'What type of relationship does each segment expect?',
    placeholders: [
      'Self-service via platform',
      'Dedicated account management',
      'Community forums & support',
    ],
  },
  {
    key: 'channels',
    title: 'Channels',
    description: 'How do we reach our customer segments?',
    placeholders: [
      'Direct sales team',
      'Online marketplace & App Store',
      'Partner reseller network',
    ],
  },
  {
    key: 'customerSegments',
    title: 'Customer Segments',
    description: 'For whom are we creating value?',
    placeholders: [
      'SMBs with 10–200 employees',
      'Enterprise CTOs and tech leads',
      'Early adopter tech enthusiasts',
    ],
  },
  {
    key: 'costStructure',
    title: 'Cost Structure',
    description: 'What are the most important costs in our business model?',
    placeholders: [
      'Infrastructure and cloud hosting',
      'Salaries and personnel costs',
      'Marketing & customer acquisition',
    ],
  },
  {
    key: 'revenueStreams',
    title: 'Revenue Streams',
    description: 'For what value are customers willing to pay?',
    placeholders: [
      'Monthly subscription ($29–$299/mo)',
      'Transaction fees (2% per payment)',
      'Professional services & training',
    ],
  },
];

export const defaultBMCData: BMCData = {
  keyPartnerships: [],
  keyActivities: [],
  keyResources: [],
  valuePropositions: [],
  customerRelationships: [],
  channels: [],
  customerSegments: [],
  costStructure: [],
  revenueStreams: [],
};

// Contoh: Katering Makan Siang Sehat "DapurKos" untuk mahasiswa
// Mengikuti panduan BMC: VP berbasis hasil, CS spesifik + pain/gain, angka konkret
export const sampleBMCData: BMCData = {
  keyPartnerships: [
    'Supplier sayur & lauk pasar Johar (kontrak mingguan, sudah MoU)',
    'GoFood & GrabFood sebagai platform pesan-antar utama',
    'Komunitas mahasiswa kampus sebagai mitra promosi word-of-mouth',
  ],
  keyActivities: [
    'Memasak & mengemas 50–80 porsi makan siang setiap hari kerja',
    'Mengelola pesanan harian via WhatsApp & GoFood (pukul 06.00–09.00)',
    'Posting konten menu harian di Instagram & TikTok setiap pagi',
  ],
  keyResources: [
    'Dapur rumahan bersertifikat PIRT (izin produksi sudah diurus)',
    '2 tenaga masak paruh waktu (mahasiswa jurusan Gizi)',
    'Motor untuk antar pesanan radius 3 km dari dapur',
  ],
  valuePropositions: [
    'Mahasiswa hemat Rp15.000–20.000/hari vs beli di kantin (bukti: survei 40 mahasiswa)',
    'Tidak perlu keluar kos saat jam makan — antar langsung ke pintu dalam 30 menit',
    'Menu bergizi seimbang yang dirancang ahli gizi, cocok untuk mahasiswa aktif',
    '3x lebih murah dari katering sejenis di area kampus (Rp12.000/porsi vs Rp30.000+)',
  ],
  customerRelationships: [
    'Grup WhatsApp pelanggan tetap untuk update menu & promo harian',
    'Sistem langganan mingguan dengan diskon 10% untuk pembeli rutin',
    'Minta testimoni & feedback tiap Jumat — sudah terkumpul 28 ulasan positif',
  ],
  channels: [
    'GoFood & GrabFood (awareness + transaksi) — sudah live, 15 order/hari',
    'Instagram @dapurkos_ (konten menu harian, 380 followers organik)',
    'Broadcast WhatsApp ke grup angkatan mahasiswa di 3 fakultas',
  ],
  customerSegments: [
    // Siapa: segmen inti spesifik
    'Mahasiswa kos semester 1–4 di sekitar kampus, usia 18–22 tahun',
    // Jobs-to-be-done
    'Ingin makan siang bergizi tanpa harus masak atau keluar kos saat jadwal padat',
    // Pain
    'Pain: kantin antri panjang, harga naik, tidak tahu kandungan gizinya',
    // Gain
    'Gain: hemat waktu 30 menit/hari + hemat uang makan hingga Rp400.000/bulan',
  ],
  costStructure: [
    'Bahan baku harian: ±Rp350.000/hari (±55% dari total biaya)',
    'Upah 2 tenaga masak: Rp800.000/bulan masing-masing',
    'Komisi platform GoFood/GrabFood: 20% per transaksi',
    'Kemasan & stiker: Rp500/porsi — estimasi BEP di 60 porsi/hari',
  ],
  revenueStreams: [
    'Penjualan per porsi: Rp12.000 (normal) / Rp10.000 (paket langganan 5 hari)',
    'Paket mingguan: Rp55.000/5 porsi — sudah ada 12 pelanggan tetap',
    'Catering pesanan grup (acara/rapat): Rp10.000/porsi min. 20 porsi',
  ],
};
