'use client';

import { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { BMCProvider, useBMC } from '@/context/BMCContext';
import BMCForm from '@/components/BMCForm';
import BMCCanvas from '@/components/BMCCanvas';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import ExportButtons from '@/components/ExportButtons';
import GuideModal from '@/components/GuideModal';

// ─── Inner app (needs context) ────────────────────────────────────────────────
function AppInner() {
  const { theme } = useBMC();
  const [guideOpen, setGuideOpen] = useState(false);

  const isHijau = theme.id === 'hijau';
  const isNeo = theme.id === 'neobrutalism';
  const isCorp = theme.id === 'corporate';

  const pandanBtnStyle: React.CSSProperties = isHijau
    ? {
        background: '#AC7B2E',
        color: '#fff',
        border: 'none',
        padding: '5px 14px',
        fontSize: '12px',
        fontWeight: 700,
        borderRadius: 4,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
      }
    : isNeo
    ? {
        background: '#fde047',
        color: '#000',
        border: '2px solid #fde047',
        padding: '5px 14px',
        fontSize: '12px',
        fontWeight: 900,
        fontFamily: 'monospace',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
      }
    : isCorp
    ? {
        background: '#3b82f6',
        color: '#fff',
        border: 'none',
        padding: '5px 14px',
        fontSize: '12px',
        fontWeight: 700,
        borderRadius: 2,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
      }
    : {
        background: '#3b82f6',
        color: '#fff',
        border: 'none',
        padding: '5px 14px',
        fontSize: '12px',
        fontWeight: 600,
        borderRadius: 6,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
      };

  return (
    <div className={`flex flex-col h-screen overflow-hidden ${theme.pageBg} ${theme.fontClass}`}>
      {/* ── Top header bar ── */}
      <header
        className={`flex items-center justify-between px-4 py-2.5 flex-shrink-0 z-10 ${theme.headerBg}`}
        style={{
          boxShadow: isHijau
            ? '0 2px 8px rgba(19,54,34,0.4)'
            : isNeo
            ? '0 4px 0 #000'
            : isCorp
            ? '0 1px 8px rgba(0,0,0,0.3)'
            : '0 1px 4px rgba(0,0,0,0.06)',
        }}
      >
        {/* Logo + title */}
        <div className="flex items-center gap-3">
          <div
            className="w-7 h-7 flex items-center justify-center text-sm font-black flex-shrink-0"
            style={{
              background: isHijau ? '#50918B' : isNeo ? '#fde047' : isCorp ? '#3b82f6' : '#3b82f6',
              color: isHijau ? '#fff' : isNeo ? '#000' : '#fff',
              borderRadius: isNeo ? 0 : 4,
              border: isNeo ? '2px solid #fde047' : 'none',
            }}
          >
            B
          </div>
          <div>
            <div className={theme.headerTitle}>BMC Generator</div>
            <div className={theme.headerSubtitle}>Rancang · Visualisasi · Ekspor</div>
          </div>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          {/* Panduan button */}
          <button
            onClick={() => setGuideOpen(true)}
            style={pandanBtnStyle}
            title="Buka panduan pengisian BMC"
          >
            <BookOpen size={13} strokeWidth={2} />
            Panduan
          </button>

          {/* Theme switcher */}
          <ThemeSwitcher />
        </div>
      </header>

      {/* ── Main split layout ── */}
      <main className="flex flex-1 overflow-hidden min-h-0">
        {/* ── Left panel: Form ── */}
        <aside
          className={`w-80 xl:w-96 flex-shrink-0 flex flex-col overflow-hidden ${theme.sidebarBg} ${theme.sidebarBorder}`}
        >
          <BMCForm />
        </aside>

        {/* ── Right panel: Canvas preview + export ── */}
        <section className="flex-1 flex flex-col overflow-hidden min-w-0">
          {/* Export toolbar */}
          <ExportButtons />

          {/* Canvas preview (scrollable if needed) */}
          <div className="flex-1 overflow-auto min-h-0">
            <div className="min-w-[900px] h-full">
              <BMCCanvas />
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer
        className="px-4 py-1.5 text-center text-[10px] flex-shrink-0 border-t"
        style={{
          background: isHijau ? '#133622' : isNeo ? '#000' : isCorp ? '#0f172a' : '#fff',
          color: isHijau ? '#50918B' : isNeo ? '#fde047' : isCorp ? '#475569' : '#9ca3af',
          borderColor: isHijau ? '#1a4a2e' : isNeo ? '#000' : isCorp ? '#1e293b' : '#f3f4f6',
          fontFamily: isNeo ? 'monospace' : 'inherit',
        }}
      >
        Business Model Canvas · Alexander Osterwalder &amp; Yves Pigneur · WBI Politeknik — WBIIC Business Initiative Center
      </footer>

      {/* ── Panduan Modal ── */}
      <GuideModal open={guideOpen} onClose={() => setGuideOpen(false)} />
    </div>
  );
}

// ─── Root page ────────────────────────────────────────────────────────────────
export default function Page() {
  return (
    <BMCProvider>
      <AppInner />
    </BMCProvider>
  );
}
