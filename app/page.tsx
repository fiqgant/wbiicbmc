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

  const pandanBtnStyle: React.CSSProperties =
    theme.id === "hijau"
      ? { background: "#AC7B2E", color: "#fff", border: "none", padding: "5px 14px", fontSize: "12px", fontWeight: 700, borderRadius: 4, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }
      : theme.id === "neobrutalism"
        ? { background: "#fde047", color: "#000", border: "2px solid #fde047", padding: "5px 14px", fontSize: "12px", fontWeight: 900, fontFamily: "monospace", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }
        : theme.id === "corporate"
          ? { background: "#3b82f6", color: "#fff", border: "none", padding: "5px 14px", fontSize: "12px", fontWeight: 700, borderRadius: 2, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }
          : theme.id === "blueprint"
            ? { background: "#67e8f9", color: "#082f49", border: "1px solid #67e8f9", padding: "5px 14px", fontSize: "12px", fontWeight: 800, borderRadius: 2, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontFamily: "monospace" }
            : theme.id === "paper"
              ? { background: "#8b6b4a", color: "#fffaf0", border: "none", padding: "5px 14px", fontSize: "12px", fontWeight: 700, borderRadius: 999, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }
              : theme.id === "playfulEducation"
                ? { background: "#8b5cf6", color: "#fff", border: "none", padding: "5px 14px", fontSize: "12px", fontWeight: 800, borderRadius: 999, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }
                : theme.id === "notion"
                  ? { background: "#191919", color: "#fff", border: "1px solid #191919", padding: "5px 14px", fontSize: "12px", fontWeight: 600, borderRadius: 6, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }
                  : theme.id === "glassmorphism"
                    ? { background: "rgba(255,255,255,0.18)", color: "#fff", border: "1px solid rgba(255,255,255,0.28)", padding: "5px 14px", fontSize: "12px", fontWeight: 700, borderRadius: 999, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, backdropFilter: "blur(10px)" }
                    : theme.id === "startupPitchDeck"
                      ? { background: "#d946ef", color: "#fff", border: "none", padding: "5px 14px", fontSize: "12px", fontWeight: 800, borderRadius: 8, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }
                      : { background: "#3b82f6", color: "#fff", border: "none", padding: "5px 14px", fontSize: "12px", fontWeight: 600, borderRadius: 6, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 };

  const headerShadow =
    theme.id === "hijau"
      ? "0 2px 8px rgba(19,54,34,0.4)"
      : theme.id === "neobrutalism"
        ? "0 4px 0 #000"
        : theme.id === "corporate"
          ? "0 1px 8px rgba(0,0,0,0.3)"
          : theme.id === "blueprint"
            ? "0 2px 16px rgba(14,165,233,0.18)"
            : theme.id === "paper"
              ? "0 1px 8px rgba(91,70,49,0.1)"
              : theme.id === "playfulEducation"
                ? "0 10px 24px rgba(124,58,237,0.16)"
                : theme.id === "glassmorphism"
                  ? "0 8px 28px rgba(15,23,42,0.22)"
                  : theme.id === "startupPitchDeck"
                    ? "0 12px 30px rgba(217,70,239,0.18)"
                    : "0 1px 4px rgba(0,0,0,0.06)";

  const badgeStyle: React.CSSProperties =
    theme.id === "hijau"
      ? { background: "#50918B", color: "#fff", borderRadius: 4, border: "none" }
      : theme.id === "neobrutalism"
        ? { background: "#fde047", color: "#000", borderRadius: 0, border: "2px solid #fde047" }
        : theme.id === "corporate"
          ? { background: "#3b82f6", color: "#fff", borderRadius: 4, border: "none" }
          : theme.id === "blueprint"
            ? { background: "#67e8f9", color: "#082f49", borderRadius: 2, border: "1px solid #67e8f9" }
            : theme.id === "paper"
              ? { background: "#d1b08a", color: "#5b4631", borderRadius: 6, border: "1px solid #d1b08a" }
              : theme.id === "playfulEducation"
                ? { background: "#8b5cf6", color: "#fff", borderRadius: 10, border: "none" }
                : theme.id === "notion"
                  ? { background: "#191919", color: "#fff", borderRadius: 4, border: "none" }
                  : theme.id === "glassmorphism"
                    ? { background: "rgba(255,255,255,0.18)", color: "#fff", borderRadius: 10, border: "1px solid rgba(255,255,255,0.28)" }
                    : { background: "#d946ef", color: "#fff", borderRadius: 8, border: "none" };

  const footerStyle: React.CSSProperties =
    theme.id === "hijau"
      ? { background: "#133622", color: "#50918B", borderColor: "#1a4a2e", fontFamily: "inherit" }
      : theme.id === "neobrutalism"
        ? { background: "#000", color: "#fde047", borderColor: "#000", fontFamily: "monospace" }
        : theme.id === "corporate"
          ? { background: "#0f172a", color: "#475569", borderColor: "#1e293b", fontFamily: "inherit" }
          : theme.id === "blueprint"
            ? { background: "#082f49", color: "#7dd3fc", borderColor: "#0c4a6e", fontFamily: "monospace" }
            : theme.id === "paper"
              ? { background: "#f7f1e3", color: "#8b7355", borderColor: "#d9c8ad", fontFamily: "Georgia, serif" }
              : theme.id === "playfulEducation"
                ? { background: "#ffffff", color: "#7c3aed", borderColor: "#ddd6fe", fontFamily: "inherit" }
                : theme.id === "notion"
                  ? { background: "#fbfbfa", color: "#787774", borderColor: "#eceae5", fontFamily: "inherit" }
                  : theme.id === "glassmorphism"
                    ? { background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.72)", borderColor: "rgba(255,255,255,0.12)", fontFamily: "inherit", backdropFilter: "blur(12px)" }
                    : { background: "#111827", color: "#c4b5fd", borderColor: "#1f2937", fontFamily: "inherit" };

  return (
    <div
      className={`flex min-h-screen flex-col overflow-x-hidden lg:h-screen lg:overflow-hidden ${theme.pageBg} ${theme.fontClass}`}
    >
      {/* ── Top header bar ── */}
      <header
        className={`z-10 flex flex-shrink-0 flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between ${theme.headerBg}`}
        style={{ boxShadow: headerShadow }}
      >
        {/* Logo + title */}
        <div className="flex items-center gap-3">
          <div
            className="w-7 h-7 flex items-center justify-center text-sm font-black flex-shrink-0"
            style={badgeStyle}
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
        style={footerStyle}
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
