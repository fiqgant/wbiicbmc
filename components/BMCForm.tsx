'use client';

import { useState, KeyboardEvent, useRef } from 'react';
import { X, Plus, ChevronDown, ChevronUp, ClipboardList, FolderOpen, CheckSquare } from 'lucide-react';
import { useBMC } from '@/context/BMCContext';
import { blockMeta, getRandomSampleBMCWorkspace, sampleBMCWorkspaces } from '@/lib/defaultData';
import { BMCBlockKey } from '@/lib/types';
import { blockGuides, fillOrderSteps, fillOrderSummary } from '@/lib/guide';
import BlockIcon from '@/components/icons/BlockIcon';

function BlockInput({ blockKey }: { blockKey: BMCBlockKey }) {
  const { data, addItem, removeItem, theme, activeFormBlock, setActiveFormBlock } = useBMC();
  const meta    = blockMeta.find((b) => b.key === blockKey)!;
  const items   = data[blockKey];
  const [inputVal, setInputVal] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const isActive = activeFormBlock === blockKey;

  const accentColor =
    theme.id === 'hijau' ? '#50918B' :
    theme.id === 'neobrutalism' ? '#000' :
    theme.id === 'corporate' ? '#1d4ed8' : '#3b82f6';

  const handleAdd = () => {
    if (!inputVal.trim()) return;
    addItem(blockKey, inputVal);
    setInputVal('');
    inputRef.current?.focus();
  };

  return (
    <div
      className={[
        'mb-2 cursor-pointer transition-all overflow-hidden',
        theme.formSectionBorder,
        theme.formSectionBg,
        isActive ? 'ring-2 ring-offset-1' : '',
        theme.id === 'hijau'        ? 'ring-[#50918B]' :
        theme.id === 'minimalist'   ? 'ring-blue-500'  :
        theme.id === 'corporate'    ? 'ring-blue-700'  : 'ring-yellow-400',
      ].join(' ')}
      onClick={() => setActiveFormBlock(isActive ? null : blockKey)}
    >
      {/* Header row */}
      <div className="flex items-center gap-2 px-3 py-2.5">
        <span style={{ color: accentColor, flexShrink: 0 }}>
          <BlockIcon blockKey={blockKey} size={14} />
        </span>
        <span className={`flex-1 ${theme.formSectionTitle}`}>{meta.title}</span>
        {items.length > 0 && (
          <span
            style={{
              background: accentColor,
              color: theme.id === 'neobrutalism' ? '#fde047' : '#fff',
              fontSize: '10px',
              fontWeight: 700,
              padding: '1px 7px',
              borderRadius: theme.id === 'neobrutalism' ? 0 : 99,
              fontFamily: theme.id === 'neobrutalism' ? 'monospace' : 'inherit',
            }}
          >
            {items.length}
          </span>
        )}
        <span style={{ color: '#9ca3af', flexShrink: 0 }}>
          {isActive ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        </span>
      </div>

      {/* Expanded area */}
      {isActive && (
        <div onClick={(e) => e.stopPropagation()} className="px-3 pb-3">
          {/* Description */}
          <p className={`${theme.formDescription} mb-2`}>{meta.description}</p>

          {/* Items list */}
          {items.length > 0 && (
            <ul className="flex flex-col gap-1 mb-2.5">
              {items.map((item, idx) => (
                <li key={idx} className={theme.formItemChip}>
                  <span
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: theme.id === 'neobrutalism' ? 0 : '50%',
                      background: accentColor,
                      flexShrink: 0,
                      marginTop: 1,
                      border: theme.id === 'neobrutalism' ? `1.5px solid ${accentColor}` : 'none',
                      display: 'inline-block',
                    }}
                  />
                  <span className={`${theme.formItemText} flex-1`}>{item}</span>
                  <button
                    className={theme.formRemoveBtn}
                    onClick={() => removeItem(blockKey, idx)}
                    aria-label="Hapus item"
                  >
                    <X size={12} strokeWidth={2.5} />
                  </button>
                </li>
              ))}
            </ul>
          )}

          {/* Input row */}
          <div className="flex flex-col gap-1.5 sm:flex-row">
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleAdd()}
              placeholder={meta.placeholders[items.length % meta.placeholders.length]}
              className={theme.formInput}
            />
            <button onClick={handleAdd} className={`${theme.formAddBtn} justify-center`} aria-label="Tambah item">
              <Plus size={13} strokeWidth={2.5} />
              Tambah
            </button>
          </div>

          {/* Inline guide */}
          <div
            className="mt-3 overflow-hidden"
            style={{
              border: `1px solid ${
                theme.id === 'hijau' ? '#50918B' :
                theme.id === 'neobrutalism' ? '#000' :
                theme.id === 'corporate' ? '#93c5fd' : '#bfdbfe'
              }`,
              borderRadius: theme.id === 'neobrutalism' ? 0 : 6,
            }}
          >
            {/* Steps header */}
            <div
              style={{
                padding: '5px 10px',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontSize: '10px',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.07em',
                background:
                  theme.id === 'hijau' ? '#133622' :
                  theme.id === 'neobrutalism' ? '#000' :
                  theme.id === 'corporate' ? '#1e3a5f' : '#1e40af',
                color:
                  theme.id === 'hijau' ? '#7fba9a' :
                  theme.id === 'neobrutalism' ? '#fde047' : '#bfdbfe',
                fontFamily: theme.id === 'neobrutalism' ? 'monospace' : 'inherit',
              }}
            >
              <ClipboardList size={11} />
              Langkah Pengisian
            </div>
            <div style={{ padding: '8px 10px', background: theme.id === 'hijau' ? '#f0faf5' : '#eff6ff', display: 'flex', flexDirection: 'column', gap: 5 }}>
              {blockGuides[blockKey].steps.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 7, alignItems: 'flex-start' }}>
                  <span
                    style={{
                      width: 16, height: 16, borderRadius: theme.id === 'neobrutalism' ? 0 : '50%',
                      background: accentColor, color: theme.id === 'neobrutalism' ? '#fde047' : '#fff',
                      fontSize: '8px', fontWeight: 800,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, marginTop: 1,
                    }}
                  >
                    {i + 1}
                  </span>
                  <span style={{ fontSize: '11px', lineHeight: 1.5, color: theme.id === 'hijau' ? '#133622' : '#1e3a5f', fontFamily: theme.id === 'neobrutalism' ? 'monospace' : 'inherit' }}>
                    {step}
                  </span>
                </div>
              ))}
            </div>

            {/* Evidence header */}
            <div
              style={{
                padding: '5px 10px',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontSize: '10px',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.07em',
                background: theme.id === 'hijau' ? '#6b4c1a' : '#92400e',
                color: theme.id === 'hijau' ? '#f5d08a' : '#fde68a',
                fontFamily: theme.id === 'neobrutalism' ? 'monospace' : 'inherit',
              }}
            >
              <FolderOpen size={11} />
              Bukti yang Disiapkan
            </div>
            <div style={{ padding: '8px 10px', background: '#fffbeb', display: 'flex', flexDirection: 'column', gap: 4 }}>
              {blockGuides[blockKey].evidence.map((ev, i) => (
                <div key={i} style={{ display: 'flex', gap: 7, alignItems: 'flex-start' }}>
                  <CheckSquare size={12} strokeWidth={2} style={{ color: theme.id === 'hijau' ? '#AC7B2E' : '#d97706', flexShrink: 0, marginTop: 1 }} />
                  <span style={{ fontSize: '11px', lineHeight: 1.5, color: '#78350f', fontFamily: theme.id === 'neobrutalism' ? 'monospace' : 'inherit' }}>
                    {ev}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BMCForm() {
  const { theme, loadWorkspace, resetData, companyName, setCompanyName, teamName, setTeamName } = useBMC();
  const [lastLoadedSampleId, setLastLoadedSampleId] = useState<string | null>(null);

  const isHijau = theme.id === 'hijau';
  const isNeo   = theme.id === 'neobrutalism';
  const isCorp  = theme.id === 'corporate';

  const sectionLabelClass = [
    'text-[10px] font-bold uppercase tracking-widest mb-2 px-1 flex items-center gap-1.5',
    isHijau ? 'text-[#50918B]' : isNeo ? 'text-black font-mono' : isCorp ? 'text-slate-400' : 'text-gray-400',
  ].join(' ');

  return (
    <div className={`flex h-full min-h-0 flex-col ${theme.fontClass}`}>
      {/* ── Nama Usaha ── */}
      <div
        className="px-4 py-3 border-b flex-shrink-0"
        style={{
          background: isHijau ? '#133622' : isNeo ? '#000' : isCorp ? '#0f172a' : '#fff',
          borderColor: isHijau ? '#1a4a2e' : isNeo ? '#000' : isCorp ? '#1e293b' : '#e5e7eb',
        }}
      >
        <label
          className="block text-[10px] font-bold uppercase tracking-widest mb-1.5"
          style={{ color: isHijau ? '#7fba9a' : isNeo ? '#fde047' : isCorp ? '#94a3b8' : '#9ca3af' }}
        >
          Nama Usaha / Business Name
        </label>
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Contoh: Warung Kopi Pak Budi"
          className="w-full px-3 py-2 text-sm font-semibold focus:outline-none"
          style={{
            background: isHijau ? '#1a4a2e' : isNeo ? '#1a1a1a' : isCorp ? '#1e293b' : '#f9fafb',
            border: `1px solid ${isHijau ? '#50918B' : isNeo ? '#fde047' : isCorp ? '#334155' : '#e5e7eb'}`,
            color: isHijau ? '#fff' : isNeo ? '#fde047' : isCorp ? '#f1f5f9' : '#111827',
            borderRadius: isNeo ? 0 : 4,
            fontFamily: isNeo ? 'monospace' : 'inherit',
          }}
        />
        <label
          className="block text-[10px] font-bold uppercase tracking-widest mt-3 mb-1.5"
          style={{ color: isHijau ? '#7fba9a' : isNeo ? '#fde047' : isCorp ? '#94a3b8' : '#9ca3af' }}
        >
          Nama Tim
        </label>
        <input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="Contoh: Tim Inovasi WBI"
          className="w-full px-3 py-2 text-sm font-semibold focus:outline-none"
          style={{
            background: isHijau ? '#1a4a2e' : isNeo ? '#1a1a1a' : isCorp ? '#1e293b' : '#f9fafb',
            border: `1px solid ${isHijau ? '#50918B' : isNeo ? '#fde047' : isCorp ? '#334155' : '#e5e7eb'}`,
            color: isHijau ? '#fff' : isNeo ? '#fde047' : isCorp ? '#f1f5f9' : '#111827',
            borderRadius: isNeo ? 0 : 4,
            fontFamily: isNeo ? 'monospace' : 'inherit',
          }}
        />
      </div>

      {/* ── Toolbar ── */}
      <div
        className="flex flex-col gap-2 px-4 py-2 border-b flex-shrink-0 sm:flex-row sm:items-center sm:justify-between"
        style={{
          background: isHijau ? '#f0faf5' : isNeo ? '#fffde7' : isCorp ? '#f8fafc' : '#f9fafb',
          borderColor: isHijau ? '#c5ddd9' : isNeo ? '#000' : isCorp ? '#e2e8f0' : '#f0f0f0',
        }}
      >
        <span
          className="text-xs font-semibold uppercase tracking-wider"
          style={{ color: isHijau ? '#133622' : isNeo ? '#000' : isCorp ? '#64748b' : '#9ca3af', fontFamily: isNeo ? 'monospace' : 'inherit' }}
        >
          Isi Canvas Kamu
        </span>
        <div className="flex flex-wrap gap-2 sm:items-center">
          <button
            onClick={() => {
              const randomSample = getRandomSampleBMCWorkspace(lastLoadedSampleId);
              loadWorkspace(randomSample);
              setLastLoadedSampleId(randomSample.id);
            }}
            className="text-xs px-2 py-1 transition-colors"
            style={{
              border: `1px solid ${isHijau ? '#50918B' : isNeo ? '#000' : isCorp ? '#cbd5e1' : '#e5e7eb'}`,
              color: isHijau ? '#133622' : isNeo ? '#000' : isCorp ? '#475569' : '#6b7280',
              background: 'transparent',
              borderRadius: isNeo ? 0 : 4,
              fontFamily: isNeo ? 'monospace' : 'inherit',
              fontWeight: isNeo ? 900 : 500,
            }}
          >
            Muat Contoh Acak
          </button>
          <button
            onClick={resetData}
            className="text-xs px-2 py-1 transition-colors"
            style={{
              border: '1px solid #fca5a5',
              color: '#dc2626',
              background: 'transparent',
              borderRadius: isNeo ? 0 : 4,
              fontFamily: isNeo ? 'monospace' : 'inherit',
              fontWeight: isNeo ? 900 : 500,
            }}
          >
            Reset
          </button>
        </div>
      </div>

      <div
        className="px-4 py-2 border-b flex-shrink-0"
        style={{
          background: isHijau ? '#f0faf5' : isNeo ? '#fffde7' : isCorp ? '#f8fafc' : '#f9fafb',
          borderColor: isHijau ? '#c5ddd9' : isNeo ? '#000' : isCorp ? '#e2e8f0' : '#f0f0f0',
        }}
      >
        <p
          className="text-[11px] leading-5"
          style={{
            color: isHijau ? '#133622' : isNeo ? '#000' : isCorp ? '#475569' : '#6b7280',
            fontFamily: isNeo ? 'monospace' : 'inherit',
          }}
        >
          {lastLoadedSampleId
            ? `Contoh terakhir: ${sampleBMCWorkspaces.find((sample) => sample.id === lastLoadedSampleId)?.label} — ${sampleBMCWorkspaces.find((sample) => sample.id === lastLoadedSampleId)?.summary}`
            : `Tersedia ${sampleBMCWorkspaces.length} studi kasus detail. Klik "Muat Contoh Acak" untuk langsung mengisi canvas dengan salah satu contoh.`}
        </p>
      </div>

      <div
        className="px-4 py-3 border-b flex-shrink-0"
        style={{
          background: isHijau ? '#f7fbf9' : isNeo ? '#fffde7' : isCorp ? '#f8fafc' : '#f8fbff',
          borderColor: isHijau ? '#c5ddd9' : isNeo ? '#000' : isCorp ? '#dbe4f0' : '#dbeafe',
        }}
      >
        <div
          className="text-[10px] font-bold uppercase tracking-widest mb-1.5"
          style={{
            color: isHijau ? '#50918B' : isNeo ? '#000' : isCorp ? '#475569' : '#1d4ed8',
            fontFamily: isNeo ? 'monospace' : 'inherit',
          }}
        >
          Urutan isi yang disarankan
        </div>
        <p
          className="text-xs leading-5"
          style={{
            color: isHijau ? '#133622' : isNeo ? '#000' : isCorp ? '#334155' : '#1e3a5f',
            fontFamily: isNeo ? 'monospace' : 'inherit',
          }}
        >
          {fillOrderSummary}
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {fillOrderSteps.map((step, index) => (
            <span
              key={step.title}
              className="text-[10px] font-semibold px-2 py-1"
              style={{
                border: `1px solid ${isHijau ? '#50918B' : isNeo ? '#000' : isCorp ? '#cbd5e1' : '#93c5fd'}`,
                background: '#fff',
                color: isHijau ? '#133622' : isNeo ? '#000' : isCorp ? '#334155' : '#1e3a5f',
                borderRadius: isNeo ? 0 : 999,
                fontFamily: isNeo ? 'monospace' : 'inherit',
              }}
              title={step.desc}
            >
              {index + 1}. {step.title}
            </span>
          ))}
        </div>
      </div>

      {/* ── Scrollable form area ── */}
      <div className={`flex-1 overflow-visible px-3 py-3 lg:overflow-y-auto ${theme.sidebarBg}`} style={{ scrollbarWidth: 'thin' }}>

        <div className={sectionLabelClass}>Mulai dari Kanan</div>
        <BlockInput blockKey="customerSegments" />

        <div className={`${sectionLabelClass} mt-4`}>Proposisi Nilai</div>
        <BlockInput blockKey="valuePropositions" />

        <div className={`${sectionLabelClass} mt-4`}>Interaksi Pelanggan</div>
        <BlockInput blockKey="channels" />
        <BlockInput blockKey="customerRelationships" />

        <div className={`${sectionLabelClass} mt-4`}>Monetisasi</div>
        <BlockInput blockKey="revenueStreams" />

        <div className={`${sectionLabelClass} mt-4`}>Infrastruktur</div>
        <BlockInput blockKey="keyResources" />
        <BlockInput blockKey="keyActivities" />
        <BlockInput blockKey="keyPartnerships" />

        <div className={`${sectionLabelClass} mt-4`}>Keuangan</div>
        <BlockInput blockKey="costStructure" />

        <div className="h-6" />
      </div>
    </div>
  );
}
