import { BMCData, BMCWorkspace, BlockMeta } from './types';

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

export interface SampleBMCWorkspace extends BMCWorkspace {
  id: string;
  label: string;
  summary: string;
}

export const sampleBMCWorkspaces: SampleBMCWorkspace[] = [
  {
    id: 'dapurkos',
    label: 'DapurKos - Katering Sehat Mahasiswa',
    companyName: 'DapurKos',
    teamName: 'Tim DapurKos',
    summary:
      'Layanan katering makan siang sehat untuk mahasiswa kos yang butuh makanan bergizi, cepat, dan terjangkau di sekitar kampus.',
    data: {
      keyPartnerships: [
        'Supplier sayur & lauk pasar Johar dengan kontrak mingguan',
        'GoFood & GrabFood sebagai kanal pesan-antar utama',
        'Komunitas mahasiswa kampus untuk promosi word-of-mouth',
      ],
      keyActivities: [
        'Memasak dan mengemas 50-80 porsi makan siang setiap hari kerja',
        'Mengelola pesanan harian via WhatsApp dan aplikasi delivery',
        'Mempublikasikan menu harian di Instagram dan TikTok setiap pagi',
      ],
      keyResources: [
        'Dapur rumahan bersertifikat PIRT',
        '2 tenaga masak paruh waktu dari mahasiswa jurusan Gizi',
        'Motor operasional untuk antar pesanan radius 3 km',
      ],
      valuePropositions: [
        'Membantu mahasiswa hemat Rp15.000-20.000 per hari dibanding beli makan di kantin',
        'Pesanan diantar langsung ke kos dalam 30 menit tanpa perlu keluar',
        'Menu bergizi seimbang yang dirancang bersama pendamping ahli gizi',
      ],
      customerRelationships: [
        'Grup WhatsApp pelanggan tetap untuk update menu dan promo',
        'Program langganan mingguan dengan diskon 10% untuk pembeli rutin',
        'Pengumpulan testimoni dan feedback setiap Jumat',
      ],
      channels: [
        'GoFood dan GrabFood untuk awareness dan transaksi',
        'Instagram @dapurkos_ untuk konten menu harian',
        'Broadcast WhatsApp ke grup angkatan di 3 fakultas',
      ],
      customerSegments: [
        'Mahasiswa kos semester 1-4 di sekitar kampus, usia 18-22 tahun',
        'Butuh makan siang bergizi tanpa harus masak atau keluar kos saat jadwal padat',
        'Pain: kantin antri panjang, harga naik, dan informasi gizi tidak jelas',
        'Gain: hemat waktu 30 menit per hari dan hemat uang makan hingga Rp400.000 per bulan',
      ],
      costStructure: [
        'Bahan baku harian sekitar Rp350.000 per hari',
        'Upah 2 tenaga masak masing-masing Rp800.000 per bulan',
        'Komisi platform delivery 20% per transaksi',
        'Kemasan dan stiker Rp500 per porsi',
      ],
      revenueStreams: [
        'Penjualan per porsi Rp12.000 harga normal',
        'Paket langganan mingguan Rp55.000 untuk 5 porsi',
        'Pesanan grup atau rapat minimal 20 porsi',
      ],
    },
  },
  {
    id: 'sampahku',
    label: 'SampahKu - Bank Sampah Digital',
    companyName: 'SampahKu',
    teamName: 'Tim Sirkular',
    summary:
      'Platform bank sampah digital yang memudahkan warga menjemput, memilah, dan menukar sampah anorganik menjadi poin serta pendapatan tambahan.',
    data: {
      keyPartnerships: [
        'Dinas lingkungan hidup untuk akses edukasi dan komunitas warga',
        'Pengepul dan pabrik daur ulang sebagai pembeli hasil sortir',
        'RT/RW dan pengelola perumahan untuk aktivasi wilayah jemput',
      ],
      keyActivities: [
        'Mengelola penjadwalan penjemputan sampah lewat aplikasi dan WhatsApp',
        'Menyortir sampah anorganik berdasarkan kategori bernilai jual',
        'Menjalankan edukasi rumah tangga dan kampanye pemilahan sampah',
      ],
      keyResources: [
        'Aplikasi operasional penjemputan dan pencatatan poin nasabah',
        'Tim lapangan dan gudang sortir skala kecil',
        'Jaringan pengepul dan mitra komunitas aktif',
      ],
      valuePropositions: [
        'Warga tidak perlu membawa sendiri sampah ke bank sampah karena ada layanan jemput',
        'Setiap setoran tercatat digital dan langsung dikonversi menjadi poin atau saldo',
        'Lingkungan perumahan jadi lebih bersih sekaligus menghasilkan nilai ekonomi',
      ],
      customerRelationships: [
        'Dashboard poin dan riwayat setoran untuk tiap nasabah',
        'Program tantangan bulanan antar-komunitas dengan hadiah sederhana',
        'Admin WhatsApp untuk konfirmasi jadwal jemput dan edukasi lanjutan',
      ],
      channels: [
        'Sosialisasi offline di perumahan dan sekolah',
        'WhatsApp Business untuk akuisisi cepat dan pengingat jemput',
        'Instagram dan TikTok untuk edukasi pemilahan sampah',
      ],
      customerSegments: [
        'Rumah tangga urban dan perumahan menengah yang rutin menghasilkan sampah anorganik',
        'Butuh solusi praktis untuk membuang sampah terpilah tanpa repot ke lokasi bank sampah',
        'Pain: jadwal setor ribet, hasil tidak transparan, dan motivasi warga cepat turun',
        'Gain: rumah lebih rapi, ada insentif poin, dan kontribusi lingkungan lebih nyata',
      ],
      costStructure: [
        'Biaya armada jemput dan bahan bakar mingguan',
        'Sewa gudang sortir dan alat timbang',
        'Gaji tim operasional lapangan dan admin',
        'Pengembangan aplikasi dan biaya server',
      ],
      revenueStreams: [
        'Margin penjualan hasil sortir ke pengepul atau pabrik daur ulang',
        'Biaya layanan jemput untuk area premium atau korporat',
        'Sponsorship program edukasi dari brand peduli lingkungan',
      ],
    },
  },
  {
    id: 'kelaslancar',
    label: 'KelasLancar - Bimbel Hybrid SMK',
    companyName: 'KelasLancar',
    teamName: 'Tim KelasLancar',
    summary:
      'Bimbingan belajar hybrid untuk siswa SMK yang fokus pada persiapan ujian, skill industri, dan pendampingan karier dengan kelas kecil dan jadwal fleksibel.',
    data: {
      keyPartnerships: [
        'Sekolah SMK untuk akses siswa dan ruang promosi',
        'Praktisi industri sebagai mentor tamu dan penyusun materi',
        'Platform meeting online untuk kelas hybrid dan mentoring',
      ],
      keyActivities: [
        'Menyusun modul ujian dan proyek portofolio berbasis kebutuhan siswa SMK',
        'Mengadakan kelas hybrid sore hari dan sesi konsultasi tugas',
        'Memonitor progres belajar dan hasil tryout setiap minggu',
      ],
      keyResources: [
        'Tutor inti dari alumni berprestasi dan praktisi industri',
        'Bank soal, modul digital, dan sistem tryout online',
        'Komunitas alumni untuk testimoni dan referral',
      ],
      valuePropositions: [
        'Siswa SMK mendapat bimbel yang relevan dengan ujian sekaligus kebutuhan kerja',
        'Kelas kecil membuat pendampingan lebih personal dan progres lebih terpantau',
        'Jadwal hybrid fleksibel sehingga cocok untuk siswa yang juga PKL atau organisasi',
      ],
      customerRelationships: [
        'Grup belajar per angkatan untuk diskusi dan pengingat tugas',
        'Laporan progres bulanan untuk siswa dan orang tua',
        'Sesi coaching singkat untuk target nilai dan rencana karier',
      ],
      channels: [
        'Presentasi langsung di sekolah dan komunitas siswa',
        'Konten edukasi di Instagram, TikTok, dan YouTube Shorts',
        'Referral dari alumni dan siswa aktif',
      ],
      customerSegments: [
        'Siswa SMK kelas 11-12 yang ingin naik nilai dan siap masuk kerja atau kuliah',
        'Butuh bimbel yang tidak terlalu teoritis dan bisa membantu tugas praktik',
        'Pain: materi sekolah terlalu cepat, les umum kurang relevan, dan sulit cari mentor',
        'Gain: nilai lebih baik, portofolio siap, dan rasa percaya diri meningkat',
      ],
      costStructure: [
        'Honor tutor dan mentor tamu',
        'Biaya platform pembelajaran online dan produksi modul',
        'Promosi digital serta materi cetak untuk sekolah',
        'Sewa ruang kelas saat sesi offline',
      ],
      revenueStreams: [
        'Biaya langganan kelas bulanan',
        'Paket tryout intensif menjelang ujian',
        'Kelas workshop khusus seperti CV, interview, atau portofolio',
      ],
    },
  },
];

export const sampleBMCData: BMCData = sampleBMCWorkspaces[0].data;
