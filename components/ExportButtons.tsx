'use client';

import { useRef } from 'react';
import { useBMC } from '@/context/BMCContext';
import { exportAsJSON, parseJSONFile } from '@/lib/storage';

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
      const imgW = pageW - margin * 2;
      const imgH = pageH - margin * 2;

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
      const offsetY = margin + (imgH - finalH) / 2;

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
