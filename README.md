# BMC Generator

Aplikasi **Business Model Canvas Generator** berbasis **Next.js** untuk membantu menyusun, memvisualisasikan, dan mengekspor canvas bisnis secara cepat. Proyek ini menampilkan editor 9 blok BMC, preview canvas real-time, panduan pengisian, pilihan tema visual, serta ekspor ke **PNG**, **PDF**, dan **JSON**.

## Fitur Utama

- Editor untuk 9 blok Business Model Canvas
- Preview canvas real-time
- Input nama usaha
- Panduan pengisian BMC per blok
- Tema tampilan: **WBI**, **Minimalist**, **Neobrutalism**, dan **Corporate**
- Ekspor hasil ke **PNG** dan **PDF**
- Simpan dan muat data canvas dalam format **JSON**
- Penyimpanan otomatis data, tema, dan nama usaha ke `localStorage`

## Stack

- Next.js 15
- React 18
- TypeScript
- Tailwind CSS
- `html-to-image`
- `jspdf`
- `lucide-react`

## Menjalankan Proyek

```bash
npm install
npm run dev
```

Lalu buka `http://localhost:3000`.

## Build Produksi

```bash
npm run build
npm run start
```

## Struktur Singkat

```text
app/         Halaman utama Next.js App Router
components/  Form, canvas, export, modal panduan, theme switcher
context/     State global Business Model Canvas
lib/         Tipe, tema, data default, storage, panduan
public/      Asset statis seperti logo
```

## Tujuan Proyek

Proyek ini ditujukan untuk mendukung proses perancangan model bisnis yang lebih terstruktur, visual, dan mudah didokumentasikan, khususnya pada konteks **WBI Politeknik / WBIIC Business Initiative Center**.
