'use client';

import { useState, KeyboardEvent, useRef, ChangeEvent } from 'react';
import { X, Plus, ChevronDown, ChevronUp, ClipboardList, FolderOpen, CheckSquare } from 'lucide-react';
import { useBMC } from '@/context/BMCContext';
import { blockMeta, getRandomSampleBMCWorkspace, sampleBMCWorkspaces } from '@/lib/defaultData';
import { DEFAULT_BUSINESS_LOGO_SRC } from '@/lib/branding';
import { BMCBlockKey } from '@/lib/types';
import { blockGuides } from '@/lib/guide';
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
    theme.id === 'corporate' ? '#1d4ed8' :
    theme.id === 'blueprint' ? '#67e8f9' :
    theme.id === 'paper' ? '#8b6b4a' :
    theme.id === 'playfulEducation' ? '#8b5cf6' :
    theme.id === 'notion' ? '#2383e2' :
    theme.id === 'startupPitchDeck' ? '#d946ef' :
    '#3b82f6';

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
        theme.id === 'corporate'    ? 'ring-blue-700'  :
        theme.id === 'blueprint'    ? 'ring-cyan-300'  :
        theme.id === 'paper'        ? 'ring-[#b08968]' :
        theme.id === 'playfulEducation' ? 'ring-violet-500' :
        theme.id === 'notion'       ? 'ring-[#2383e2]' :
        theme.id === 'startupPitchDeck' ? 'ring-fuchsia-500' : 'ring-yellow-400',
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
               fontWeight: theme.id === 'notion' ? 600 : 700,
              padding: '1px 7px',
               borderRadius: theme.id === 'neobrutalism' ? 0 : theme.id === 'notion' ? 6 : 99,
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
                theme.id === 'corporate' ? '#93c5fd' :
                theme.id === 'blueprint' ? '#0ea5e9' :
                theme.id === 'paper' ? '#d7c5a9' :
                theme.id === 'playfulEducation' ? '#c4b5fd' :
                theme.id === 'notion' ? '#e9e7e3' :
                theme.id === 'startupPitchDeck' ? '#f0abfc' : '#bfdbfe'
              }`,
              borderRadius: theme.id === 'neobrutalism' ? 0 : theme.id === 'notion' ? 10 : 6,
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
                  theme.id === 'corporate' ? '#1e3a5f' :
                  theme.id === 'blueprint' ? '#082f49' :
                  theme.id === 'paper' ? '#8b6b4a' :
                  theme.id === 'playfulEducation' ? '#8b5cf6' :
                  theme.id === 'notion' ? '#f7f6f3' :
                  theme.id === 'startupPitchDeck' ? '#111827' : '#1e40af',
                color:
                  theme.id === 'hijau' ? '#7fba9a' :
                  theme.id === 'neobrutalism' ? '#fde047' :
                  theme.id === 'blueprint' ? '#bae6fd' :
                  theme.id === 'paper' ? '#fffaf0' :
                  theme.id === 'playfulEducation' ? '#ede9fe' :
                  theme.id === 'notion' ? '#6f6e69' :
                  theme.id === 'startupPitchDeck' ? '#f9a8d4' : '#bfdbfe',
                fontFamily: theme.id === 'neobrutalism' ? 'monospace' : 'inherit',
              }}
            >
              <ClipboardList size={11} />
              Langkah Pengisian
            </div>
            <div style={{ padding: '8px 10px', background: theme.id === 'hijau' ? '#f0faf5' : theme.id === 'blueprint' ? '#082f49' : theme.id === 'paper' ? '#fffaf0' : theme.id === 'playfulEducation' ? '#faf5ff' : theme.id === 'notion' ? '#ffffff' : theme.id === 'startupPitchDeck' ? '#faf5ff' : '#eff6ff', display: 'flex', flexDirection: 'column', gap: 5 }}>
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
                  <span style={{ fontSize: '11px', lineHeight: 1.5, color: theme.id === 'hijau' ? '#133622' : theme.id === 'blueprint' ? '#e0f2fe' : theme.id === 'paper' ? '#5b4631' : theme.id === 'playfulEducation' ? '#5b21b6' : theme.id === 'notion' ? '#37352f' : theme.id === 'startupPitchDeck' ? '#701a75' : '#1e3a5f', fontFamily: theme.id === 'neobrutalism' ? 'monospace' : 'inherit' }}>
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
                background: theme.id === 'hijau' ? '#6b4c1a' : theme.id === 'blueprint' ? '#0f172a' : theme.id === 'paper' ? '#b08968' : theme.id === 'playfulEducation' ? '#f59e0b' : theme.id === 'notion' ? '#f7f6f3' : theme.id === 'startupPitchDeck' ? '#9a3412' : '#92400e',
                color: theme.id === 'hijau' ? '#f5d08a' : theme.id === 'blueprint' ? '#fde68a' : theme.id === 'paper' ? '#fffaf0' : theme.id === 'playfulEducation' ? '#fff7ed' : theme.id === 'notion' ? '#6f6e69' : theme.id === 'startupPitchDeck' ? '#ffedd5' : '#fde68a',
                fontFamily: theme.id === 'neobrutalism' ? 'monospace' : 'inherit',
              }}
            >
              <FolderOpen size={11} />
              Bukti yang Disiapkan
            </div>
            <div style={{ padding: '8px 10px', background: theme.id === 'notion' ? '#ffffff' : '#fffbeb', display: 'flex', flexDirection: 'column', gap: 4 }}>
              {blockGuides[blockKey].evidence.map((ev, i) => (
                <div key={i} style={{ display: 'flex', gap: 7, alignItems: 'flex-start' }}>
                  <CheckSquare size={12} strokeWidth={2} style={{ color: theme.id === 'hijau' ? '#AC7B2E' : theme.id === 'blueprint' ? '#fbbf24' : theme.id === 'paper' ? '#8b6b4a' : theme.id === 'playfulEducation' ? '#d97706' : theme.id === 'notion' ? '#9b9995' : theme.id === 'startupPitchDeck' ? '#fb923c' : '#d97706', flexShrink: 0, marginTop: 1 }} />
                  <span style={{ fontSize: '11px', lineHeight: 1.5, color: theme.id === 'blueprint' ? '#7c2d12' : theme.id === 'paper' ? '#5b4631' : theme.id === 'playfulEducation' ? '#7c2d12' : theme.id === 'notion' ? '#5f5e5b' : theme.id === 'startupPitchDeck' ? '#7c2d12' : '#78350f', fontFamily: theme.id === 'neobrutalism' ? 'monospace' : 'inherit' }}>
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
  const { theme, loadWorkspace, resetData, companyName, setCompanyName, teamName, setTeamName, logoDataUrl, setLogoDataUrl } = useBMC();
  const [lastLoadedSampleId, setLastLoadedSampleId] = useState<string | null>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const isHijau = theme.id === 'hijau';
  const isNeo   = theme.id === 'neobrutalism';
  const isCorp  = theme.id === 'corporate';
  const isNotion = theme.id === 'notion';

  const sectionLabelClass = [
    'text-[10px] font-bold uppercase tracking-widest mb-2 px-1 flex items-center gap-1.5',
    isHijau ? 'text-[#50918B]' : isNeo ? 'text-black font-mono' : isCorp ? 'text-slate-400' : isNotion ? 'text-[#9b9995]' : 'text-gray-400',
  ].join(' ');

  const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('File logo harus berupa gambar.');
      e.target.value = '';
      return;
    }

    if (file.size > 2_500_000) {
      alert('Ukuran logo maksimal 2.5MB.');
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === 'string') {
        setLogoDataUrl(result);
      }
      e.target.value = '';
    };
    reader.onerror = () => {
      alert('Logo gagal dibaca. Coba file lain.');
      e.target.value = '';
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={`flex h-full min-h-0 flex-col ${theme.fontClass}`}>
      {/* ── Nama Usaha ── */}
      <div
        className="px-4 py-3 border-b flex-shrink-0"
        style={{
          background: isHijau ? '#133622' : isNeo ? '#000' : isCorp ? '#0f172a' : theme.id === 'blueprint' ? '#082f49' : theme.id === 'paper' ? '#f7f1e3' : theme.id === 'playfulEducation' ? '#ffffff' : theme.id === 'notion' ? '#fbfbfa' : theme.id === 'startupPitchDeck' ? '#111827' : '#fff',
          borderColor: isHijau ? '#1a4a2e' : isNeo ? '#000' : isCorp ? '#1e293b' : theme.id === 'blueprint' ? '#0ea5e9' : theme.id === 'paper' ? '#d9c8ad' : theme.id === 'playfulEducation' ? '#ddd6fe' : theme.id === 'notion' ? '#eceae5' : theme.id === 'startupPitchDeck' ? '#1f2937' : '#e5e7eb',
        }}
      >
        <label
          className="block text-[10px] font-bold uppercase tracking-widest mb-1.5"
          style={{ color: isHijau ? '#7fba9a' : isNeo ? '#fde047' : isCorp ? '#94a3b8' : theme.id === 'blueprint' ? '#bae6fd' : theme.id === 'paper' ? '#8b7355' : theme.id === 'playfulEducation' ? '#7c3aed' : theme.id === 'notion' ? '#9b9995' : theme.id === 'startupPitchDeck' ? '#f0abfc' : '#9ca3af' }}
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
            background: isHijau ? '#1a4a2e' : isNeo ? '#1a1a1a' : isCorp ? '#1e293b' : theme.id === 'blueprint' ? '#0c4a6e' : theme.id === 'paper' ? '#fffdf8' : theme.id === 'playfulEducation' ? '#f8fafc' : theme.id === 'notion' ? '#ffffff' : theme.id === 'startupPitchDeck' ? '#1f2937' : '#f9fafb',
            border: `1px solid ${isHijau ? '#50918B' : isNeo ? '#fde047' : isCorp ? '#334155' : theme.id === 'blueprint' ? '#38bdf8' : theme.id === 'paper' ? '#d7c5a9' : theme.id === 'playfulEducation' ? '#c4b5fd' : theme.id === 'notion' ? '#e6e4e0' : theme.id === 'startupPitchDeck' ? '#374151' : '#e5e7eb'}`,
            color: isHijau ? '#fff' : isNeo ? '#fde047' : isCorp ? '#f1f5f9' : theme.id === 'blueprint' ? '#e0f2fe' : theme.id === 'paper' ? '#5b4631' : theme.id === 'playfulEducation' ? '#111827' : theme.id === 'notion' ? '#111827' : theme.id === 'startupPitchDeck' ? '#f8fafc' : '#111827',
            borderRadius: isNeo ? 0 : isNotion ? 8 : 4,
            fontFamily: isNeo ? 'monospace' : 'inherit',
          }}
        />
        <label
          className="block text-[10px] font-bold uppercase tracking-widest mt-3 mb-1.5"
          style={{ color: isHijau ? '#7fba9a' : isNeo ? '#fde047' : isCorp ? '#94a3b8' : theme.id === 'blueprint' ? '#bae6fd' : theme.id === 'paper' ? '#8b7355' : theme.id === 'playfulEducation' ? '#7c3aed' : theme.id === 'notion' ? '#9b9995' : theme.id === 'startupPitchDeck' ? '#f0abfc' : '#9ca3af' }}
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
            background: isHijau ? '#1a4a2e' : isNeo ? '#1a1a1a' : isCorp ? '#1e293b' : theme.id === 'blueprint' ? '#0c4a6e' : theme.id === 'paper' ? '#fffdf8' : theme.id === 'playfulEducation' ? '#f8fafc' : theme.id === 'notion' ? '#ffffff' : theme.id === 'startupPitchDeck' ? '#1f2937' : '#f9fafb',
            border: `1px solid ${isHijau ? '#50918B' : isNeo ? '#fde047' : isCorp ? '#334155' : theme.id === 'blueprint' ? '#38bdf8' : theme.id === 'paper' ? '#d7c5a9' : theme.id === 'playfulEducation' ? '#c4b5fd' : theme.id === 'notion' ? '#e6e4e0' : theme.id === 'startupPitchDeck' ? '#374151' : '#e5e7eb'}`,
            color: isHijau ? '#fff' : isNeo ? '#fde047' : isCorp ? '#f1f5f9' : theme.id === 'blueprint' ? '#e0f2fe' : theme.id === 'paper' ? '#5b4631' : theme.id === 'playfulEducation' ? '#111827' : theme.id === 'notion' ? '#111827' : theme.id === 'startupPitchDeck' ? '#f8fafc' : '#111827',
            borderRadius: isNeo ? 0 : isNotion ? 8 : 4,
            fontFamily: isNeo ? 'monospace' : 'inherit',
          }}
        />
        <div className="mt-3 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <label
              className="block text-[10px] font-bold uppercase tracking-widest"
              style={{ color: isHijau ? '#7fba9a' : isNeo ? '#fde047' : isCorp ? '#94a3b8' : theme.id === 'blueprint' ? '#bae6fd' : theme.id === 'paper' ? '#8b7355' : theme.id === 'playfulEducation' ? '#7c3aed' : theme.id === 'notion' ? '#9b9995' : theme.id === 'startupPitchDeck' ? '#f0abfc' : '#9ca3af' }}
            >
              Logo Usaha
            </label>
          </div>
          <div className="flex items-center gap-2 shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoDataUrl || DEFAULT_BUSINESS_LOGO_SRC}
            alt="Preview logo usaha"
            crossOrigin="anonymous"
            className="h-10 w-10 rounded-full object-cover"
            style={{
              border: `1px solid ${isHijau ? '#50918B' : isNeo ? '#fde047' : isCorp ? '#cbd5e1' : theme.id === 'blueprint' ? '#67e8f9' : theme.id === 'paper' ? '#d7c5a9' : theme.id === 'playfulEducation' ? '#c4b5fd' : theme.id === 'notion' ? '#e9e7e3' : theme.id === 'startupPitchDeck' ? '#374151' : '#e5e7eb'}`,
              background: '#fff',
              padding: 2,
            }}
          />
          <div className="flex flex-col gap-1.5 sm:flex-row">
            <button
              type="button"
              onClick={() => logoInputRef.current?.click()}
              className="text-[11px] px-2 py-1 transition-colors whitespace-nowrap"
              style={{
                border: `1px solid ${isHijau ? '#50918B' : isNeo ? '#000' : isCorp ? '#cbd5e1' : theme.id === 'blueprint' ? '#67e8f9' : theme.id === 'paper' ? '#8b6b4a' : theme.id === 'playfulEducation' ? '#c4b5fd' : theme.id === 'notion' ? '#e9e7e3' : theme.id === 'startupPitchDeck' ? '#d946ef' : '#e5e7eb'}`,
                color: isHijau ? '#133622' : isNeo ? '#000' : isCorp ? '#475569' : theme.id === 'blueprint' ? '#082f49' : theme.id === 'paper' ? '#5b4631' : theme.id === 'playfulEducation' ? '#7c3aed' : theme.id === 'notion' ? '#37352f' : theme.id === 'startupPitchDeck' ? '#fff' : '#6b7280',
                background: theme.id === 'startupPitchDeck' ? '#d946ef' : '#ffffff',
                borderRadius: isNeo ? 0 : isNotion ? 8 : 4,
                fontFamily: isNeo ? 'monospace' : 'inherit',
                fontWeight: isNeo ? 900 : 500,
              }}
            >
              Upload Logo
            </button>
            <button
              type="button"
              onClick={() => setLogoDataUrl('')}
              className="text-[11px] px-2 py-1 transition-colors whitespace-nowrap"
              style={{
                border: `1px solid ${isHijau ? '#c5ddd9' : isNeo ? '#000' : isCorp ? '#cbd5e1' : theme.id === 'blueprint' ? '#38bdf8' : theme.id === 'paper' ? '#d7c5a9' : theme.id === 'playfulEducation' ? '#ddd6fe' : theme.id === 'notion' ? '#e9e7e3' : theme.id === 'startupPitchDeck' ? '#374151' : '#e5e7eb'}`,
                color: isHijau ? '#50918B' : isNeo ? '#fde047' : isCorp ? '#64748b' : theme.id === 'blueprint' ? '#bae6fd' : theme.id === 'paper' ? '#8b7355' : theme.id === 'playfulEducation' ? '#7c3aed' : theme.id === 'notion' ? '#787774' : theme.id === 'startupPitchDeck' ? '#e9d5ff' : '#6b7280',
                background: isNeo ? '#000' : 'transparent',
                borderRadius: isNeo ? 0 : isNotion ? 8 : 4,
                fontFamily: isNeo ? 'monospace' : 'inherit',
                fontWeight: isNeo ? 900 : 500,
              }}
            >
              Pakai Logo WBI
            </button>
          </div>
        </div>
        </div>
        <input
          ref={logoInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleLogoChange}
        />
      </div>

      {/* ── Toolbar ── */}
      <div
        className="flex flex-col gap-2 px-4 py-2 border-b flex-shrink-0 sm:flex-row sm:items-center sm:justify-between"
        style={{
          background: isHijau ? '#f0faf5' : isNeo ? '#fffde7' : isCorp ? '#f8fafc' : theme.id === 'blueprint' ? '#082f49' : theme.id === 'paper' ? '#fffaf0' : theme.id === 'playfulEducation' ? '#faf5ff' : theme.id === 'notion' ? '#fbfbfa' : theme.id === 'startupPitchDeck' ? '#111827' : '#f9fafb',
          borderColor: isHijau ? '#c5ddd9' : isNeo ? '#000' : isCorp ? '#e2e8f0' : theme.id === 'blueprint' ? '#0ea5e9' : theme.id === 'paper' ? '#d7c5a9' : theme.id === 'playfulEducation' ? '#ddd6fe' : theme.id === 'notion' ? '#eceae5' : theme.id === 'startupPitchDeck' ? '#1f2937' : '#f0f0f0',
        }}
      >
        <span
          className="text-xs font-semibold uppercase tracking-wider"
          style={{ color: isHijau ? '#133622' : isNeo ? '#000' : isCorp ? '#64748b' : theme.id === 'blueprint' ? '#bae6fd' : theme.id === 'paper' ? '#8b7355' : theme.id === 'playfulEducation' ? '#7c3aed' : theme.id === 'notion' ? '#787774' : theme.id === 'startupPitchDeck' ? '#f0abfc' : '#9ca3af', fontFamily: isNeo ? 'monospace' : 'inherit' }}
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
              border: `1px solid ${isHijau ? '#50918B' : isNeo ? '#000' : isCorp ? '#cbd5e1' : theme.id === 'blueprint' ? '#67e8f9' : theme.id === 'paper' ? '#8b6b4a' : theme.id === 'playfulEducation' ? '#c4b5fd' : theme.id === 'notion' ? '#d6d3d1' : theme.id === 'startupPitchDeck' ? '#d946ef' : '#e5e7eb'}`,
              color: isHijau ? '#133622' : isNeo ? '#000' : isCorp ? '#475569' : theme.id === 'blueprint' ? '#082f49' : theme.id === 'paper' ? '#fffaf0' : theme.id === 'playfulEducation' ? '#7c3aed' : theme.id === 'notion' ? '#37352f' : theme.id === 'startupPitchDeck' ? '#fff' : '#6b7280',
              background: theme.id === 'blueprint' ? '#67e8f9' : theme.id === 'paper' ? '#8b6b4a' : theme.id === 'playfulEducation' ? '#ffffff' : theme.id === 'notion' ? '#ffffff' : theme.id === 'startupPitchDeck' ? '#d946ef' : 'transparent',
              borderRadius: isNeo ? 0 : isNotion ? 8 : 4,
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
               borderRadius: isNeo ? 0 : isNotion ? 8 : 4,
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
          background: isHijau ? '#f0faf5' : isNeo ? '#fffde7' : isCorp ? '#f8fafc' : theme.id === 'blueprint' ? '#0c4a6e' : theme.id === 'paper' ? '#fdf6ea' : theme.id === 'playfulEducation' ? '#f5f3ff' : theme.id === 'notion' ? '#f7f6f3' : theme.id === 'startupPitchDeck' ? '#1f2937' : '#f9fafb',
          borderColor: isHijau ? '#c5ddd9' : isNeo ? '#000' : isCorp ? '#e2e8f0' : theme.id === 'blueprint' ? '#38bdf8' : theme.id === 'paper' ? '#e6d7bf' : theme.id === 'playfulEducation' ? '#ddd6fe' : theme.id === 'notion' ? '#eceae5' : theme.id === 'startupPitchDeck' ? '#374151' : '#f0f0f0',
        }}
      >
        <p
          className="text-[11px] leading-5"
          style={{
            color: isHijau ? '#133622' : isNeo ? '#000' : isCorp ? '#475569' : theme.id === 'blueprint' ? '#e0f2fe' : theme.id === 'paper' ? '#6b5a45' : theme.id === 'playfulEducation' ? '#6d28d9' : theme.id === 'notion' ? '#787774' : theme.id === 'startupPitchDeck' ? '#e9d5ff' : '#6b7280',
            fontFamily: isNeo ? 'monospace' : 'inherit',
          }}
        >
          {lastLoadedSampleId
            ? `Contoh terakhir: ${sampleBMCWorkspaces.find((sample) => sample.id === lastLoadedSampleId)?.label} — ${sampleBMCWorkspaces.find((sample) => sample.id === lastLoadedSampleId)?.summary}`
            : `Tersedia ${sampleBMCWorkspaces.length} studi kasus detail. Klik "Muat Contoh Acak" untuk langsung mengisi canvas dengan salah satu contoh.`}
        </p>
      </div>

      {/* ── Scrollable form area ── */}
      <div className={`flex-1 overflow-visible px-3 py-3 lg:overflow-y-auto ${theme.sidebarBg}`} style={{ scrollbarWidth: 'thin' }}>

        <div className={sectionLabelClass}>Mulai dari Kanan</div>
        <BlockInput blockKey="customerSegments" />

        <div className={`${sectionLabelClass} mt-4`}>Proposisi Nilai</div>
        <BlockInput blockKey="valuePropositions" />

        <div className={`${sectionLabelClass} mt-4`}>Interaksi Pelanggan</div>
        <BlockInput blockKey="customerRelationships" />
        <BlockInput blockKey="channels" />

        <div className={`${sectionLabelClass} mt-4`}>Infrastruktur</div>
        <BlockInput blockKey="keyActivities" />
        <BlockInput blockKey="keyResources" />
        <BlockInput blockKey="keyPartnerships" />

        <div className={`${sectionLabelClass} mt-4`}>Keuangan</div>
        <BlockInput blockKey="revenueStreams" />
        <BlockInput blockKey="costStructure" />

        <div className="h-6" />
      </div>
    </div>
  );
}
