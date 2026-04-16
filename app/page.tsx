"use client";

import { useState } from "react";
import { BookOpen } from "lucide-react";
import { BMCProvider, useBMC } from "@/context/BMCContext";
import BMCForm from "@/components/BMCForm";
import BMCCanvas from "@/components/BMCCanvas";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import ExportButtons from "@/components/ExportButtons";
import GuideModal from "@/components/GuideModal";

// ─── Inner app (needs context) ────────────────────────────────────────────────
function AppInner() {
  const { theme } = useBMC();
  const [guideOpen, setGuideOpen] = useState(false);

  const isHijau = theme.id === "hijau";
  const isNeo = theme.id === "neobrutalism";
  const isCorp = theme.id === "corporate";

  const pandanBtnStyle: React.CSSProperties = isHijau
    ? {
        background: "#AC7B2E",
        color: "#fff",
        border: "none",
        padding: "5px 14px",
        fontSize: "12px",
        fontWeight: 700,
        borderRadius: 4,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 6,
      }
    : isNeo
      ? {
          background: "#fde047",
          color: "#000",
          border: "2px solid #fde047",
          padding: "5px 14px",
          fontSize: "12px",
          fontWeight: 900,
          fontFamily: "monospace",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 6,
        }
      : isCorp
        ? {
            background: "#3b82f6",
            color: "#fff",
            border: "none",
            padding: "5px 14px",
            fontSize: "12px",
            fontWeight: 700,
            borderRadius: 2,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }
        : {
            background: "#3b82f6",
            color: "#fff",
            border: "none",
            padding: "5px 14px",
            fontSize: "12px",
            fontWeight: 600,
            borderRadius: 6,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6,
          };

  return (
    <div
      className={`flex min-h-screen flex-col overflow-x-hidden lg:h-screen lg:overflow-hidden ${theme.pageBg} ${theme.fontClass}`}
    >
      {/* ── Top header bar ── */}
      <header
        className={`z-10 flex flex-shrink-0 flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between ${theme.headerBg}`}
        style={{
          boxShadow: isHijau
            ? "0 2px 8px rgba(19,54,34,0.4)"
            : isNeo
              ? "0 4px 0 #000"
              : isCorp
                ? "0 1px 8px rgba(0,0,0,0.3)"
                : "0 1px 4px rgba(0,0,0,0.06)",
        }}
      >
        {/* Logo + title */}
        <div className="flex items-center gap-3">
          <div
            className="w-7 h-7 flex items-center justify-center text-sm font-black flex-shrink-0"
            style={{
              background: isHijau
                ? "#50918B"
                : isNeo
                  ? "#fde047"
                  : isCorp
                    ? "#3b82f6"
                    : "#3b82f6",
              color: isHijau ? "#fff" : isNeo ? "#000" : "#fff",
              borderRadius: isNeo ? 0 : 4,
              border: isNeo ? "2px solid #fde047" : "none",
            }}
          >
            B
          </div>
          <div>
            <div className={theme.headerTitle}>BMC Generator</div>
            <div className={theme.headerSubtitle}>
              Rancang · Visualisasi · Ekspor
            </div>
          </div>
        </div>

        {/* Right controls */}
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center sm:justify-end">
          {/* Panduan button */}
          <button
            onClick={() => setGuideOpen(true)}
            style={pandanBtnStyle}
            title="Buka panduan pengisian BMC"
            className="w-full justify-center sm:w-auto"
          >
            <BookOpen size={13} strokeWidth={2} />
            Panduan
          </button>

          {/* Theme switcher */}
          <ThemeSwitcher />
        </div>
      </header>

      {/* ── Main split layout ── */}
      <main className="flex min-h-0 flex-1 flex-col overflow-visible lg:flex-row lg:overflow-hidden">
        {/* ── Left panel: Form ── */}
        <aside
          className={`flex w-full flex-shrink-0 flex-col overflow-visible lg:w-80 lg:overflow-hidden xl:w-96 ${theme.sidebarBg} ${theme.sidebarBorder}`}
        >
          <BMCForm />
        </aside>

        {/* ── Right panel: Canvas preview + export ── */}
        <section className="flex min-w-0 flex-1 flex-col overflow-visible lg:overflow-hidden">
          {/* Export toolbar */}
          <ExportButtons />

          {/* Canvas preview (scrollable if needed) */}
          <div className="min-h-0 flex-1 overflow-x-auto overflow-y-visible lg:overflow-auto">
            <div className="h-[560px] min-w-[820px] sm:h-[680px] sm:min-w-[900px] lg:h-full">
              <BMCCanvas />
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer
        className="border-t px-4 py-2 text-center text-[10px] leading-relaxed flex-shrink-0"
        style={{
          background: isHijau
            ? "#133622"
            : isNeo
              ? "#000"
              : isCorp
                ? "#0f172a"
                : "#fff",
          color: isHijau
            ? "#50918B"
            : isNeo
              ? "#fde047"
              : isCorp
                ? "#475569"
                : "#9ca3af",
          borderColor: isHijau
            ? "#1a4a2e"
            : isNeo
              ? "#000"
              : isCorp
                ? "#1e293b"
                : "#f3f4f6",
          fontFamily: isNeo ? "monospace" : "inherit",
        }}
      >
        Business Model Canvas · Alexander Osterwalder &amp; Yves Pigneur ·
        Politeknik WBI — WBI Business Initiative Center
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
