'use client';

import { useState, useEffect } from 'react';
import {
  X, AlertTriangle, ClipboardList, FolderOpen, CheckSquare,
  ChevronLeft, ChevronRight, BookOpen,
} from 'lucide-react';
import { useBMC } from '@/context/BMCContext';
import { blockMeta } from '@/lib/defaultData';
import BlockIcon from '@/components/icons/BlockIcon';
import {
  blockGuides,
  fillOrderSummary,
  fillOrderSteps,
  generalPrinciples,
  strategies,
  commonMistakes,
} from '@/lib/guide';
import { BMCBlockKey } from '@/lib/types';

interface Props {
  open: boolean;
  onClose: () => void;
  initialBlock?: BMCBlockKey | null;
}

type Tab = 'prinsip' | 'blok' | 'strategi';

export default function GuideModal({ open, onClose, initialBlock }: Props) {
  const { theme } = useBMC();
  const [tab, setTab] = useState<Tab>(initialBlock ? 'blok' : 'prinsip');
  const [selectedBlock, setSelectedBlock] = useState<BMCBlockKey>(
    initialBlock ?? 'customerSegments'
  );

  // Sync when opened with a specific block
  useEffect(() => {
    if (open && initialBlock) {
      setTab('blok');
      setSelectedBlock(initialBlock);
    }
  }, [open, initialBlock]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;

  const guide = blockGuides[selectedBlock];
  const meta = blockMeta.find((b) => b.key === selectedBlock)!;

  // ── Color helpers ──────────────────────────────────────────────────────────
  const isHijau = theme.id === 'hijau';
  const isNeo = theme.id === 'neobrutalism';
  const isCorp = theme.id === 'corporate';
  const isNotion = theme.id === 'notion';

  const accentColor = isHijau ? '#50918B' : isNeo ? '#000' : isCorp ? '#1d4ed8' : theme.id === 'blueprint' ? '#67e8f9' : theme.id === 'paper' ? '#8b6b4a' : theme.id === 'playfulEducation' ? '#8b5cf6' : theme.id === 'notion' ? '#2383e2' : theme.id === 'startupPitchDeck' ? '#d946ef' : '#3b82f6';
  const headerBg = isHijau ? '#133622' : isNeo ? '#000' : isCorp ? '#1e3a5f' : theme.id === 'blueprint' ? '#082f49' : theme.id === 'paper' ? '#f7f1e3' : theme.id === 'playfulEducation' ? '#8b5cf6' : theme.id === 'notion' ? '#ffffff' : theme.id === 'startupPitchDeck' ? '#111827' : '#1e293b';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.55)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[88vh] flex flex-col overflow-hidden rounded-lg"
        style={{
          background: '#fff',
          boxShadow: isNeo ? '8px 8px 0 #000' : isNotion ? '0 18px 48px rgba(15,23,42,0.08)' : '0 24px 64px rgba(0,0,0,0.25)',
          border: isNeo ? '3px solid #000' : isNotion ? '1px solid #efeeeb' : 'none',
          borderRadius: isNeo ? '0' : isNotion ? '12px' : '8px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div
          style={{ background: headerBg, padding: '14px 20px', flexShrink: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <div
              style={{
                color: theme.id === 'paper' ? '#5b4631' : isNotion ? '#37352f' : '#fff',
                fontWeight: 800,
                fontSize: '15px',
                letterSpacing: isNeo ? '0.1em' : '0.02em',
                textTransform: isNeo ? 'uppercase' : 'none',
                fontFamily: isNeo ? 'monospace' : 'inherit',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><BookOpen size={16} strokeWidth={2} /> Panduan Mengisi BMC</span>
            </div>
              <div style={{ color: theme.id === 'paper' ? '#8b7355' : isNotion ? '#9b9995' : '#94a3b8', fontSize: '11px', marginTop: 2 }}>
                Baca panduan ini sebelum mengisi setiap blok
              </div>
            </div>
          <button
            onClick={onClose}
            style={{
              color: theme.id === 'paper' ? '#8b7355' : isNotion ? '#9b9995' : '#94a3b8',
              fontSize: '20px',
              lineHeight: 1,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px 8px',
            }}
            aria-label="Tutup panduan"
          >
            <X size={16} />
          </button>
        </div>

        {/* ── Tabs ── */}
        <div
          style={{
            display: 'flex',
            borderBottom: `1px solid ${isNotion ? '#efeeeb' : '#e5e7eb'}`,
              background: theme.id === 'blueprint' ? '#082f49' : theme.id === 'paper' ? '#fffaf0' : theme.id === 'playfulEducation' ? '#faf5ff' : theme.id === 'notion' ? '#f7f6f3' : theme.id === 'startupPitchDeck' ? '#111827' : '#f9fafb',
            flexShrink: 0,
          }}
        >
          {(['prinsip', 'blok', 'strategi'] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding: '10px 20px',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                background: 'none',
                border: 'none',
                borderBottom: tab === t ? `2px solid ${accentColor}` : '2px solid transparent',
                color: tab === t ? accentColor : '#9ca3af',
                transition: 'all 0.15s',
                fontFamily: isNeo ? 'monospace' : 'inherit',
              }}
            >
              {t === 'prinsip' ? 'Prinsip Umum' : t === 'blok' ? 'Per Blok' : 'Strategi'}
            </button>
          ))}
        </div>

        {/* ── Content ── */}
        <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>

          {/* Tab A: Prinsip Umum */}
          {tab === 'prinsip' && (
            <div style={{ padding: '20px 24px' }}>
              <div
                style={{
                  marginBottom: 16,
                  padding: '16px',
                  borderRadius: isNeo ? 0 : 8,
                  border: isNeo ? '2px solid #000' : `1px solid ${isHijau ? '#c5ddd9' : isNotion ? '#efeeeb' : '#bfdbfe'}`,
                  background: isHijau ? '#f0faf5' : isNotion ? '#fbfbfa' : '#eff6ff',
                }}
              >
                <div
                  style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    color: accentColor,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    marginBottom: 8,
                  }}
                >
                  Urutan pengisian yang disarankan
                </div>
                <p style={{ fontSize: '12px', color: isNotion ? '#5f5e5b' : '#334155', marginBottom: 12, lineHeight: 1.6 }}>
                  {fillOrderSummary}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {fillOrderSteps.map((step, i) => (
                    <div
                      key={step.title}
                      style={{
                        display: 'flex',
                        gap: 10,
                        alignItems: 'flex-start',
                        padding: '10px 12px',
                        borderRadius: isNeo ? 0 : 6,
                        background: '#fff',
                        border: isNeo ? '2px solid #000' : `1px solid ${isNotion ? '#efeeeb' : '#dbeafe'}`,
                      }}
                    >
                      <div
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: isNeo ? 0 : '50%',
                          background: accentColor,
                          color: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '10px',
                          fontWeight: 800,
                          flexShrink: 0,
                        }}
                      >
                        {i + 1}
                      </div>
                      <div>
                        <div style={{ fontSize: '12px', fontWeight: 700, color: isNotion ? '#37352f' : '#1e293b', marginBottom: 3 }}>
                          {step.title}
                        </div>
                        <div style={{ fontSize: '11px', color: isNotion ? '#787774' : '#64748b', lineHeight: 1.5 }}>
                          {step.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <p style={{ fontSize: '13px', color: isNotion ? '#5f5e5b' : '#475569', marginBottom: 16, lineHeight: 1.6 }}>
                Setelah mengikuti urutan di atas, pastikan kamu memahami prinsip-prinsip berikut ini agar hasil canvas-mu
                berkualitas dan dapat dipertanggungjawabkan.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {generalPrinciples.map((p, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      gap: 14,
                      padding: '14px 16px',
                      borderRadius: isNeo ? 0 : 8,
                      border: isNeo ? '2px solid #000' : `1px solid ${isNotion ? '#efeeeb' : '#e2e8f0'}`,
                      background: isNotion ? '#fbfbfa' : '#f8fafc',
                    }}
                  >
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: isNeo ? 0 : '50%',
                        background: accentColor,
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '13px',
                        fontWeight: 800,
                        flexShrink: 0,
                      }}
                    >
                      {i + 1}
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: isNotion ? '#37352f' : '#1e293b', marginBottom: 4 }}>
                        {p.title}
                      </div>
                      <div style={{ fontSize: '12px', color: isNotion ? '#787774' : '#64748b', lineHeight: 1.6 }}>
                        {p.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Kesalahan umum */}
              <div style={{ marginTop: 24 }}>
                <div
                  style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    color: '#ef4444',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    marginBottom: 10,
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><AlertTriangle size={12} strokeWidth={2} /> Kesalahan yang Sering Terjadi</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {commonMistakes.map((m, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        gap: 10,
                        alignItems: 'flex-start',
                        padding: '10px 14px',
                        background: '#fef2f2',
                        borderRadius: isNeo ? 0 : 6,
                        border: isNeo ? '2px solid #ef4444' : '1px solid #fecaca',
                      }}
                    >
                      <X size={12} strokeWidth={2.5} style={{ color: '#ef4444', flexShrink: 0, marginTop: 1 }} />
                      <span style={{ fontSize: '12px', color: '#7f1d1d', lineHeight: 1.5 }}>{m}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab B: Per Blok */}
          {tab === 'blok' && (
            <div style={{ display: 'flex', height: '100%' }}>
              {/* Block list sidebar */}
              <div
                style={{
                  width: 180,
                  flexShrink: 0,
                  borderRight: '1px solid #e5e7eb',
                  overflowY: 'auto',
                  background: isNotion ? '#fbfbfa' : '#f8fafc',
                  padding: '8px 0',
                }}
              >
                {blockMeta.map((b) => (
                  <button
                    key={b.key}
                    onClick={() => setSelectedBlock(b.key as BMCBlockKey)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      width: '100%',
                      padding: '9px 14px',
                      textAlign: 'left',
                      background: selectedBlock === b.key ? (isNotion ? '#f1f1ef' : accentColor) : 'transparent',
                      color: selectedBlock === b.key ? (isNotion ? '#37352f' : '#fff') : '#374151',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '11px',
                      fontWeight: selectedBlock === b.key ? (isNotion ? 600 : 700) : 500,
                      fontFamily: isNeo ? 'monospace' : 'inherit',
                      transition: 'all 0.15s',
                    }}
                  >
                    <BlockIcon blockKey={b.key as import('@/lib/types').BMCBlockKey} size={12} />
                    <span style={{ lineHeight: 1.3 }}>{b.title}</span>
                  </button>
                ))}
              </div>

              {/* Block guide detail */}
              <div style={{ flex: 1, padding: '20px 24px', overflowY: 'auto' }}>
                {/* Block header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      background: isNotion ? '#f7f6f3' : accentColor,
                      borderRadius: isNeo ? 0 : isNotion ? 10 : 8,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '18px',
                      border: isNeo ? '2px solid #000' : isNotion ? '1px solid #efeeeb' : 'none',
                    }}
                  >
                    <BlockIcon blockKey={selectedBlock} size={18} color={isNotion ? '#6f6e69' : accentColor} />
                  </div>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: 800, color: '#111827' }}>
                      {meta.title}
                    </div>
                    <div style={{ fontSize: '11px', color: '#6b7280', marginTop: 1 }}>
                      {meta.description}
                    </div>
                  </div>
                </div>

                {/* Steps */}
                <div style={{ marginBottom: 16 }}>
                  <div
                    style={{
                      fontSize: '10px',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: accentColor,
                      marginBottom: 10,
                      fontFamily: isNeo ? 'monospace' : 'inherit',
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><ClipboardList size={11} strokeWidth={2} /> Langkah-langkah</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {guide.steps.map((step, i) => (
                      <div
                        key={i}
                        style={{
                          display: 'flex',
                          gap: 12,
                          alignItems: 'flex-start',
                          padding: '10px 14px',
                          background: isNotion ? '#fbfbfa' : '#f0fdf4',
                          borderRadius: isNeo ? 0 : isNotion ? 8 : 6,
                          border: `1px solid ${isNeo ? '#000' : isNotion ? '#efeeeb' : '#bbf7d0'}`,
                        }}
                      >
                        <span
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: isNeo ? 0 : '50%',
                            background: accentColor,
                            color: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '10px',
                            fontWeight: 800,
                            flexShrink: 0,
                          }}
                        >
                          {i + 1}
                        </span>
                        <span style={{ fontSize: '12px', color: isNotion ? '#37352f' : '#166534', lineHeight: 1.6 }}>
                          {step}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Evidence */}
                <div>
                  <div
                    style={{
                      fontSize: '10px',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: isHijau ? '#AC7B2E' : isNotion ? '#6f6e69' : '#d97706',
                      marginBottom: 10,
                      fontFamily: isNeo ? 'monospace' : 'inherit',
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><FolderOpen size={11} strokeWidth={2} /> Bukti yang Perlu Disiapkan</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {guide.evidence.map((ev, i) => (
                      <div
                        key={i}
                        style={{
                          display: 'flex',
                          gap: 10,
                          alignItems: 'flex-start',
                          padding: '10px 14px',
                          background: isNotion ? '#fbfbfa' : '#fffbeb',
                          borderRadius: isNeo ? 0 : isNotion ? 8 : 6,
                          border: `1px solid ${isNeo ? '#000' : isNotion ? '#efeeeb' : '#fde68a'}`,
                        }}
                      >
                        <CheckSquare size={12} strokeWidth={2} style={{ color: isNotion ? '#9b9995' : '#d97706', flexShrink: 0, marginTop: 1 }} />
                        <span style={{ fontSize: '12px', color: isNotion ? '#5f5e5b' : '#92400e', lineHeight: 1.6 }}>
                          {ev}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Navigate between blocks */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: 24,
                    paddingTop: 16,
                    borderTop: `1px solid ${isNotion ? '#efeeeb' : '#e5e7eb'}`,
                  }}
                >
                  {(() => {
                    const keys = blockMeta.map((b) => b.key as BMCBlockKey);
                    const idx = keys.indexOf(selectedBlock);
                    const prev = keys[idx - 1];
                    const next = keys[idx + 1];
                    return (
                      <>
                        <button
                          onClick={() => prev && setSelectedBlock(prev)}
                          disabled={!prev}
                          style={{
                            fontSize: '11px',
                            fontWeight: 700,
                            color: prev ? accentColor : '#cbd5e1',
                            background: 'none',
                            border: prev ? `1px solid ${accentColor}` : '1px solid #e2e8f0',
                            padding: '6px 14px',
                            cursor: prev ? 'pointer' : 'default',
                            borderRadius: isNeo ? 0 : isNotion ? 8 : 4,
                          }}
                        >
                          <ChevronLeft size={13} /> Sebelumnya
                        </button>
                        <button
                          onClick={() => next && setSelectedBlock(next)}
                          disabled={!next}
                          style={{
                            fontSize: '11px',
                            fontWeight: 700,
                            color: next ? '#fff' : '#cbd5e1',
                            background: next ? accentColor : '#e2e8f0',
                            border: 'none',
                            padding: '6px 14px',
                            cursor: next ? 'pointer' : 'default',
                            borderRadius: isNeo ? 0 : isNotion ? 8 : 4,
                          }}
                        >
                          Berikutnya <ChevronRight size={13} />
                        </button>
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>
          )}

          {/* Tab C: Strategi */}
          {tab === 'strategi' && (
            <div style={{ padding: '20px 24px' }}>
              <p style={{ fontSize: '13px', color: '#475569', marginBottom: 16, lineHeight: 1.6 }}>
                Ikuti 5 strategi ini untuk membangun BMC yang kuat, meyakinkan, dan siap dipresentasikan.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
                {strategies.map((s, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      gap: 14,
                      padding: '14px 16px',
                      borderRadius: isNeo ? 0 : 8,
                      border: isNeo ? '2px solid #000' : '1px solid #e2e8f0',
                      background: '#f8fafc',
                    }}
                  >
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: isNeo ? 0 : '50%',
                        background: isHijau ? '#AC7B2E' : '#d97706',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '13px',
                        fontWeight: 800,
                        flexShrink: 0,
                      }}
                    >
                      {i + 1}
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b', marginBottom: 4 }}>
                        {s.title}
                      </div>
                      <div style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.6 }}>
                        {s.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
