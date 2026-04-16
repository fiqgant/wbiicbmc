'use client';

import { useRef } from 'react';
import { useBMC } from '@/context/BMCContext';
import { exportAsJSON, parseJSONFile } from '@/lib/storage';
import { BMCData } from '@/lib/types';

export default function ExportButtons() {
  const { theme, canvasRef, data, companyName, teamName, loadWorkspace } = useBMC();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const exportPng = async () => {
    const node = canvasRef.current;
    if (!node) return;
    try {
      // Dynamic import to avoid SSR issues
      const { toPng } = await import('html-to-image');
      const dataUrl = await toPng(node, {
        pixelRatio: 2.5,
        cacheBust: true,
        backgroundColor:
          theme.id === 'neobrutalism' ? '#fffcf2' : theme.id === 'corporate' ? '#ffffff' : '#ffffff',
        style: {
          // Ensure fonts render correctly in export
          fontFamily:
            theme.id === 'neobrutalism'
              ? '"Courier New", monospace'
              : theme.id === 'corporate'
              ? 'Georgia, serif'
              : 'system-ui, sans-serif',
        },
      });
      const link = document.createElement('a');
      link.download = 'business-model-canvas.png';
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('PNG export failed:', err);
      alert('PNG export failed. Please try again.');
    }
  };

  const exportPdf = async () => {
    const node = canvasRef.current;
    if (!node) return;
    try {
      const { toPng } = await import('html-to-image');
      const { jsPDF } = await import('jspdf');
      const [wbiLogo, wbiicLogo] = await Promise.all([
        imageUrlToDataUrl('/wbi.png'),
        imageUrlToDataUrl('/wbiic.png'),
      ]);

      const dataUrl = await toPng(node, {
        pixelRatio: 2,
        cacheBust: true,
        backgroundColor:
          theme.id === 'neobrutalism' ? '#fffcf2' : '#ffffff',
      });

      // A4 landscape: 297mm × 210mm
      const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const margin = 10;
      const accentColor =
        theme.id === 'hijau' ? '#50918B' : theme.id === 'neobrutalism' ? '#000000' : theme.id === 'corporate' ? '#1d4ed8' : '#3b82f6';
      const headerH = 26;
      const summaryH = 24;
      const contentTop = margin + headerH + summaryH + 6;
      const imgW = pageW - margin * 2;
      const imgH = pageH - contentTop - margin;

      // Get the canvas element dimensions to preserve aspect ratio
      const canvasW = node.offsetWidth;
      const canvasH = node.offsetHeight;
      const ratio = canvasW / canvasH;

      let finalW = imgW;
      let finalH = imgW / ratio;
      if (finalH > imgH) {
        finalH = imgH;
        finalW = imgH * ratio;
      }

      const offsetX = margin + (imgW - finalW) / 2;
      const offsetY = contentTop + (imgH - finalH) / 2;

      pdf.setFillColor(accentColor);
      pdf.rect(margin, margin, pageW - margin * 2, 2.5, 'F');

      if (wbiLogo) pdf.addImage(wbiLogo, 'PNG', margin, margin + 5, 18, 18);
      if (wbiicLogo) pdf.addImage(wbiicLogo, 'PNG', margin + 21, margin + 6, 22, 14);

      pdf.setTextColor('#111827');
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(18);
      pdf.text('Business Model Canvas', margin + 48, margin + 12);

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9.5);
      pdf.setTextColor('#475569');
      pdf.text(`Nama Usaha: ${companyName || '-'}`, margin + 48, margin + 18);
      pdf.text(`Nama Tim: ${teamName || '-'}`, margin + 48, margin + 23);
      pdf.text(`Tanggal: ${formatExportDate(new Date())}`, pageW - margin, margin + 18, { align: 'right' });

      pdf.setDrawColor('#dbe4f0');
      pdf.setFillColor('#f8fafc');
      pdf.roundedRect(margin, margin + headerH, pageW - margin * 2, summaryH, 2, 2, 'FD');
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(10);
      pdf.setTextColor(accentColor);
      pdf.text('Ringkasan Usaha', margin + 4, margin + headerH + 6);

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9.5);
      pdf.setTextColor('#334155');
      const summaryLines = pdf.splitTextToSize(buildBusinessSummary(data, companyName), pageW - margin * 2 - 8);
      pdf.text(summaryLines, margin + 4, margin + headerH + 12);

      pdf.addImage(dataUrl, 'PNG', offsetX, offsetY, finalW, finalH);
      pdf.save('business-model-canvas.pdf');
    } catch (err) {
      console.error('PDF export failed:', err);
      alert('PDF export failed. Please try again.');
    }
  };

  const handleSaveJSON = () => {
    exportAsJSON({ data, companyName, teamName });
  };

  const handleLoadJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    parseJSONFile(file)
      .then((parsed) => loadWorkspace(parsed))
      .catch(() => alert('Failed to load file. Make sure it is a valid BMC JSON file.'))
      .finally(() => {
        // Reset file input so same file can be re-loaded
        if (fileInputRef.current) fileInputRef.current.value = '';
      });
  };

  return (
    <div
      className={[
        'flex flex-col gap-2 px-3 py-2 border-b sm:flex-row sm:flex-wrap sm:items-center',
        theme.id === 'hijau'
          ? 'border-[#50918B] bg-[#f0faf5]'
          : theme.id === 'neobrutalism'
          ? 'border-black bg-yellow-100'
          : theme.id === 'corporate'
          ? 'border-slate-200 bg-slate-50'
          : 'border-gray-200 bg-white',
      ].join(' ')}
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
        <span
          className={[
            'text-xs font-semibold uppercase tracking-wider mr-1',
            theme.id === 'hijau'
              ? 'text-[#133622] font-bold'
              : theme.id === 'neobrutalism'
              ? 'text-black font-black font-mono'
              : theme.id === 'corporate'
              ? 'text-slate-600'
              : 'text-gray-400',
          ].join(' ')}
        >
          Ekspor:
        </span>

        <div className="flex flex-wrap gap-2">
          <button onClick={exportPng} className={theme.btnPng} title="Ekspor sebagai gambar PNG resolusi tinggi">
            <PngIcon />
            Ekspor PNG
          </button>

          <button onClick={exportPdf} className={theme.btnPdf} title="Ekspor sebagai PDF A4 landscape">
            <PdfIcon />
            Ekspor PDF
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
        <span
          className={[
            'text-xs font-semibold uppercase tracking-wider mr-1',
            theme.id === 'hijau' ? 'text-[#133622] font-bold' : theme.id === 'neobrutalism' ? 'text-black font-black font-mono' : theme.id === 'corporate' ? 'text-slate-600' : 'text-gray-400',
          ].join(' ')}
        >
          Data JSON:
        </span>

        <div className="flex flex-wrap gap-2">
          <button onClick={handleSaveJSON} className={theme.btnSave} title="Save canvas as JSON">
            <SaveIcon />
            Simpan JSON
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className={theme.btnLoad}
            title="Muat canvas dari file JSON"
          >
            <LoadIcon />
            Muat JSON
          </button>
        </div>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json,application/json"
        className="hidden"
        onChange={handleLoadJSON}
      />
    </div>
  );
}

function buildBusinessSummary(data: BMCData, companyName: string): string {
  const subject = companyName || 'Usaha ini';
  const segment = data.customerSegments[0] ?? 'segmen pelanggan yang sudah ditentukan';
  const proposition = data.valuePropositions[0] ?? 'nilai utama yang ditawarkan';
  const channel = data.channels[0] ?? 'kanal utama yang dipilih';
  const revenue = data.revenueStreams[0] ?? 'sumber pendapatan utama';

  return `${subject} melayani ${segment}. Nilai utama yang ditawarkan adalah ${proposition}. Pelanggan dijangkau melalui ${channel}. Pendapatan utama berasal dari ${revenue}.`;
}

function formatExportDate(date: Date): string {
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

async function imageUrlToDataUrl(url: string): Promise<string | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    const blob = await response.blob();

    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(typeof reader.result === 'string' ? reader.result : null);
      reader.onerror = () => reject(new Error(`Failed to convert ${url} to data URL`));
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

function PngIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </svg>
  );
}

function PdfIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14,2 14,8 20,8" />
      <line x1="9" y1="15" x2="15" y2="15" />
    </svg>
  );
}

function SaveIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
      <polyline points="17,21 17,13 7,13 7,21" />
      <polyline points="7,3 7,8 15,8" />
    </svg>
  );
}

function LoadIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17,8 12,3 7,8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}
