import { BMCData, BMCWorkspace, BlockMeta } from './types';

export const blockMeta: BlockMeta[] = [
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
    key: 'revenueStreams',
    title: 'Revenue Streams',
    description: 'For what value are customers willing to pay?',
    placeholders: [
      'Monthly subscription ($29–$299/mo)',
      'Transaction fees (2% per payment)',
      'Professional services & training',
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

export function getRandomSampleBMCWorkspace(previousId?: string | null): SampleBMCWorkspace {
  const pool =
    previousId && sampleBMCWorkspaces.length > 1
      ? sampleBMCWorkspaces.filter((sample) => sample.id !== previousId)
      : sampleBMCWorkspaces;

  return pool[Math.floor(Math.random() * pool.length)];
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
        'Supplier sayur dan lauk pasar Johar dengan kontrak mingguan, harga tetap, dan jadwal kirim pukul 05.00 setiap hari kerja',
        'GoFood dan GrabFood sebagai kanal pesan-antar utama dengan status merchant aktif dan promo ongkir mingguan',
        'Komunitas mahasiswa kampus untuk promosi word-of-mouth, booth event, dan akses ke grup angkatan',
        'Pemilik kos besar di sekitar kampus sebagai titik distribusi brosur dan program referral pelanggan baru',
      ],
      keyActivities: [
        'Memasak dan mengemas 50-80 porsi makan siang setiap hari kerja dengan menu rotasi 10 hari',
        'Mengelola pesanan harian via WhatsApp dan aplikasi delivery mulai pukul 06.00-09.00',
        'Mempublikasikan menu harian, testimoni, dan stok terbatas di Instagram dan TikTok setiap pagi',
        'Mencatat repeat order, menu favorit, dan komplain pelanggan untuk perbaikan menu mingguan',
      ],
      keyResources: [
        'Dapur rumahan bersertifikat PIRT lengkap dengan freezer, kompor besar, dan meja prep stainless',
        '2 tenaga masak paruh waktu dari mahasiswa jurusan Gizi dan 1 admin operasional untuk order',
        'Motor operasional untuk antar pesanan radius 3 km dan box thermal agar makanan tetap hangat',
        'Database pelanggan tetap, template konten, dan SOP persiapan menu harian',
      ],
      valuePropositions: [
        'Membantu mahasiswa hemat Rp15.000-20.000 per hari dibanding beli makan di kantin atau pesan makanan satuan',
        'Pesanan diantar langsung ke kos atau kelas dalam 30 menit tanpa perlu keluar saat jam sibuk',
        'Menu bergizi seimbang yang dirancang bersama pendamping ahli gizi, lengkap dengan info kalori sederhana',
        'Pilihan paket langganan membuat mahasiswa tidak perlu bingung cari makan setiap hari kerja',
      ],
      customerRelationships: [
        'Grup WhatsApp pelanggan tetap untuk update menu, promo, dan voting lauk minggu depan',
        'Program langganan mingguan dengan diskon 10% untuk pembeli rutin dan prioritas slot pre-order',
        'Pengumpulan testimoni dan feedback setiap Jumat dengan reward topping atau minuman gratis',
        'CS respons cepat di WhatsApp untuk komplain, perubahan alamat, dan request menu khusus',
      ],
      channels: [
        'GoFood dan GrabFood untuk awareness, transaksi cepat, dan promo bundling jam makan siang',
        'Instagram @dapurkos_ untuk konten menu harian, testimoni pelanggan, dan behind-the-scenes dapur',
        'Broadcast WhatsApp ke grup angkatan di 3 fakultas dan grup kos besar sekitar kampus',
        'Poster fisik di area kos, kampus, dan koperasi mahasiswa dengan QR order',
      ],
      customerSegments: [
        'Mahasiswa kos semester 1-4 di sekitar kampus, usia 18-22 tahun, dengan uang makan bulanan terbatas',
        'Butuh makan siang bergizi tanpa harus masak, antre di kantin, atau keluar kos saat jadwal kuliah padat',
        'Pain: kantin antri panjang, harga naik, pilihan lauk monoton, dan informasi gizi tidak jelas',
        'Gain: hemat waktu 30 menit per hari, hemat uang makan hingga Rp400.000 per bulan, dan makan lebih teratur',
      ],
      costStructure: [
        'Bahan baku harian sekitar Rp350.000-425.000 per hari tergantung menu protein',
        'Upah 2 tenaga masak masing-masing Rp800.000 per bulan dan admin Rp600.000 per bulan',
        'Komisi platform delivery 20% per transaksi dan biaya promo aplikasi 5-10% saat campaign',
        'Kemasan, stiker, sendok, dan tisu sekitar Rp750 per porsi',
        'Biaya gas, listrik, dan maintenance dapur sekitar Rp900.000 per bulan',
      ],
      revenueStreams: [
        'Penjualan per porsi Rp12.000 harga normal dan Rp13.500 untuk order aplikasi delivery',
        'Paket langganan mingguan Rp55.000 untuk 5 porsi dan Rp105.000 untuk 10 porsi',
        'Pesanan grup atau rapat minimal 20 porsi dengan harga khusus Rp10.000 per porsi',
        'Add-on minuman atau buah potong dengan margin tambahan Rp2.000-3.000 per transaksi',
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
        'Dinas lingkungan hidup untuk akses edukasi, agenda kampanye, dan legitimasi program lingkungan',
        'Pengepul dan pabrik daur ulang sebagai pembeli hasil sortir dengan harga per kategori material',
        'RT/RW dan pengelola perumahan untuk aktivasi wilayah jemput serta edukasi rutin warga',
        'Sekolah dan minimarket lokal sebagai titik drop-off tambahan untuk area padat',
      ],
      keyActivities: [
        'Mengelola penjadwalan penjemputan sampah lewat aplikasi dan WhatsApp dengan slot pickup per area',
        'Menyortir sampah anorganik berdasarkan kategori bernilai jual seperti plastik PET, kardus, kaleng, dan minyak jelantah',
        'Menjalankan edukasi rumah tangga, demo pemilahan, dan kampanye tantangan lingkungan antar-komunitas',
        'Mencatat berat setoran, nilai poin, dan histori penukaran saldo untuk tiap nasabah',
      ],
      keyResources: [
        'Aplikasi operasional penjemputan, dashboard admin, dan pencatatan poin nasabah',
        'Tim lapangan 3 orang, gudang sortir skala kecil, dan alat timbang digital',
        'Jaringan pengepul aktif, database komunitas warga, dan SOP sortir material',
        'Motor roda tiga atau pickup ringan untuk area jemput dengan volume tinggi',
      ],
      valuePropositions: [
        'Warga tidak perlu membawa sendiri sampah ke bank sampah karena ada layanan jemput terjadwal',
        'Setiap setoran tercatat digital dan langsung dikonversi menjadi poin atau saldo yang transparan',
        'Lingkungan perumahan jadi lebih bersih sekaligus menghasilkan nilai ekonomi dari sampah rumah tangga',
        'Komunitas bisa melihat ranking kontribusi lingkungan sehingga partisipasi warga lebih konsisten',
      ],
      customerRelationships: [
        'Dashboard poin dan riwayat setoran untuk tiap nasabah, lengkap dengan kategori material yang disetor',
        'Program tantangan bulanan antar-komunitas dengan hadiah sederhana dan leaderboard lingkungan',
        'Admin WhatsApp untuk konfirmasi jadwal jemput, edukasi lanjutan, dan penanganan komplain',
        'Notifikasi otomatis saat saldo bisa dicairkan atau ditukar voucher belanja',
      ],
      channels: [
        'Sosialisasi offline di perumahan, sekolah, dan pengajian warga sebagai akuisisi awal',
        'WhatsApp Business untuk akuisisi cepat, pengingat jemput, dan layanan pelanggan harian',
        'Instagram dan TikTok untuk edukasi pemilahan sampah serta kampanye tantangan bulanan',
        'Landing page sederhana untuk daftar area baru dan cek jadwal pickup',
      ],
      customerSegments: [
        'Rumah tangga urban dan perumahan menengah yang rutin menghasilkan sampah anorganik setiap minggu',
        'Butuh solusi praktis untuk membuang sampah terpilah tanpa repot ke lokasi bank sampah',
        'Pain: jadwal setor ribet, hasil penimbangan tidak transparan, dan motivasi warga cepat turun',
        'Gain: rumah lebih rapi, ada insentif poin atau saldo, dan kontribusi lingkungan lebih nyata',
      ],
      costStructure: [
        'Biaya armada jemput, bahan bakar mingguan, dan perawatan kendaraan operasional',
        'Sewa gudang sortir, alat timbang, karung besar, dan rak penyimpanan material',
        'Gaji tim operasional lapangan, admin, dan insentif berbasis volume setoran',
        'Pengembangan aplikasi, biaya server, dan maintenance sistem notifikasi',
        'Biaya edukasi lapangan seperti spanduk, brosur, dan alat demo pemilahan',
      ],
      revenueStreams: [
        'Margin penjualan hasil sortir ke pengepul atau pabrik daur ulang berdasarkan kategori material',
        'Biaya layanan jemput untuk area premium, kantor, sekolah, atau event komunitas',
        'Sponsorship program edukasi dari brand peduli lingkungan dan CSR perusahaan',
        'Biaya dashboard pelaporan sampah untuk perumahan atau institusi yang ingin data bulanan',
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
        'Sekolah SMK untuk akses siswa, ruang promosi, dan izin kegiatan tryout bersama',
        'Praktisi industri sebagai mentor tamu, penguji simulasi interview, dan penyusun materi proyek',
        'Platform meeting online untuk kelas hybrid, mentoring, dan kelas rekaman',
        'Komunitas alumni kampus dan HR lokal untuk referral mentor serta peluang magang',
      ],
      keyActivities: [
        'Menyusun modul ujian, proyek portofolio, dan latihan interview berbasis kebutuhan siswa SMK',
        'Mengadakan kelas hybrid sore hari, klinik tugas praktik, dan sesi konsultasi mingguan',
        'Memonitor progres belajar, hasil tryout, dan kehadiran siswa setiap minggu',
        'Menjaga komunikasi dengan orang tua melalui laporan progres dan rekomendasi perbaikan',
      ],
      keyResources: [
        'Tutor inti dari alumni berprestasi, guru tamu, dan praktisi industri aktif',
        'Bank soal, modul digital, sistem tryout online, dan rekaman kelas pendukung',
        'Komunitas alumni untuk testimoni, referral siswa baru, dan studi kasus nyata',
        'Template CV, materi interview, dan contoh portofolio siap pakai',
      ],
      valuePropositions: [
        'Siswa SMK mendapat bimbel yang relevan dengan ujian sekaligus kebutuhan kerja dan magang',
        'Kelas kecil membuat pendampingan lebih personal, progres terpantau, dan siswa lebih berani bertanya',
        'Jadwal hybrid fleksibel sehingga cocok untuk siswa yang juga PKL, organisasi, atau kerja paruh waktu',
        'Materi tidak hanya teori, tetapi langsung dikaitkan dengan tugas praktik, CV, dan simulasi interview',
      ],
      customerRelationships: [
        'Grup belajar per angkatan untuk diskusi, pengingat tugas, dan sharing lowongan lomba atau magang',
        'Laporan progres bulanan untuk siswa dan orang tua berisi nilai tryout, disiplin, dan rekomendasi belajar',
        'Sesi coaching singkat untuk target nilai, rencana karier, dan pilihan kuliah atau kerja',
        'Jam konsultasi cepat via WhatsApp untuk tanya tugas, materi, atau jadwal kelas',
      ],
      channels: [
        'Presentasi langsung di sekolah, komunitas siswa, dan forum wali murid',
        'Konten edukasi di Instagram, TikTok, dan YouTube Shorts dengan tema soal cepat dan tips kerja',
        'Referral dari alumni, siswa aktif, dan guru BK',
        'Landing page pendaftaran dengan trial class gratis dan form konsultasi',
      ],
      customerSegments: [
        'Siswa SMK kelas 11-12 yang ingin naik nilai, lolos ujian, dan siap masuk kerja atau kuliah',
        'Butuh bimbel yang tidak terlalu teoritis, relevan dengan tugas praktik, dan punya mentor yang mudah diakses',
        'Pain: materi sekolah terlalu cepat, les umum kurang relevan, dan sulit cari mentor industri',
        'Gain: nilai lebih baik, portofolio siap, performa interview meningkat, dan rasa percaya diri bertambah',
      ],
      costStructure: [
        'Honor tutor inti, mentor tamu, dan evaluator tryout setiap bulan',
        'Biaya platform pembelajaran online, produksi modul, dan rekaman kelas',
        'Promosi digital, materi cetak untuk sekolah, dan insentif referral siswa',
        'Sewa ruang kelas saat sesi offline serta konsumsi untuk workshop intensif',
        'Biaya operasional admin, customer service, dan tools CRM sederhana',
      ],
      revenueStreams: [
        'Biaya langganan kelas bulanan reguler dan paket premium dengan mentoring tambahan',
        'Paket tryout intensif menjelang ujian sekolah, SNBT, atau tes kerja dasar',
        'Kelas workshop khusus seperti CV, interview, portofolio, dan public speaking',
        'Program kerja sama sekolah untuk kelas pendampingan satu angkatan',
      ],
    },
  },
];
