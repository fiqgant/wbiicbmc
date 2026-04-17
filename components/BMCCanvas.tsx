'use client';

import { useBMC } from '@/context/BMCContext';
import { DEFAULT_BUSINESS_LOGO_SRC } from '@/lib/branding';
import { blockMeta } from '@/lib/defaultData';
import { BMCBlockKey, ThemeConfig } from '@/lib/types';
import BlockIcon from '@/components/icons/BlockIcon';

// ─── Grid position map ───────────────────────────────────────────────────────
// 10-column grid, 3 rows (row 3 = bottom financial strip)
const BLOCK_GRID: Record<BMCBlockKey, { col: string; row: string }> = {
  keyPartnerships:       { col: '1 / 3',  row: '1 / 3' },
  keyActivities:         { col: '3 / 5',  row: '1 / 2' },
  keyResources:          { col: '3 / 5',  row: '2 / 3' },
  valuePropositions:     { col: '5 / 7',  row: '1 / 3' },
  customerRelationships: { col: '7 / 9',  row: '1 / 2' },
  channels:              { col: '7 / 9',  row: '2 / 3' },
  customerSegments:      { col: '9 / 11', row: '1 / 3' },
  costStructure:         { col: '1 / 6',  row: '3 / 4' },
  revenueStreams:        { col: '6 / 11', row: '3 / 4' },
};

// ─── Single block ─────────────────────────────────────────────────────────────
function CanvasBlock({
  blockKey,
  theme,
  items,
  isHighlighted,
}: {
  blockKey: BMCBlockKey;
  theme: ThemeConfig;
  items: string[];
  isHighlighted: boolean;
}) {
  const meta = blockMeta.find((b) => b.key === blockKey)!;
  const pos = BLOCK_GRID[blockKey];
  const isVP = blockKey === 'valuePropositions';
  const isBottom = blockKey === 'costStructure' || blockKey === 'revenueStreams';
  const watermarkColor =
    theme.id === 'hijau'
      ? '#50918B'
      : theme.id === 'neobrutalism'
      ? '#000000'
      : theme.id === 'corporate'
      ? '#1d4ed8'
      : theme.id === 'blueprint'
      ? '#67e8f9'
      : theme.id === 'paper'
      ? '#8b6b4a'
      : theme.id === 'playfulEducation'
      ? '#8b5cf6'
      : theme.id === 'notion'
      ? '#9b9995'
      : theme.id === 'startupPitchDeck'
      ? '#d946ef'
      : '#64748b';
  const watermarkOpacity = isHighlighted
    ? theme.id === 'neobrutalism'
      ? 0.14
      : 0.18
    : theme.id === 'neobrutalism'
    ? 0.08
    : 0.1;
  const watermarkSize = isBottom ? 40 : isVP ? 72 : 56;

  const borderStyle =
    theme.id === 'neobrutalism'
      ? { border: `3px solid ${theme.blockBorder}`, boxShadow: theme.blockShadow }
      : { border: `1px solid ${theme.blockBorder}`, boxShadow: theme.blockShadow };

  return (
    <div
      style={{
        gridColumn: pos.col,
        gridRow: pos.row,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        borderRadius: theme.blockRadius,
        background: theme.blockBg[blockKey],
        outline: isHighlighted ? `2px solid ${theme.id === 'neobrutalism' ? '#facc15' : theme.id === 'blueprint' ? '#67e8f9' : theme.id === 'paper' ? '#b08968' : theme.id === 'playfulEducation' ? '#8b5cf6' : theme.id === 'notion' ? '#2383e2' : theme.id === 'startupPitchDeck' ? '#d946ef' : '#3b82f6'}` : 'none',
        outlineOffset: '-2px',
        transition: 'outline 0.15s',
        ...borderStyle,
      }}
    >
      {/* Block title bar */}
      <div
        style={{
          background: theme.blockTitleBg,
          color: theme.blockTitleText,
          padding: isBottom ? '5px 10px' : '6px 10px',
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          flexShrink: 0,
          ...(isVP && {
            borderBottom: `2px solid ${theme.blockBorder}`,
          }),
        }}
      >
        <BlockIcon blockKey={blockKey} size={10} color={theme.blockTitleText} />
        <span
          className={theme.blockTitleExtra}
          style={{
            fontWeight: theme.id === 'neobrutalism' ? 900 : 700,
            fontSize: isVP ? '10px' : '9px',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            color: theme.blockTitleText,
          }}
        >
          {meta.title}
        </span>
      </div>

      {/* Block content */}
      <div
        style={{
          flex: 1,
          padding: '8px 10px',
          overflowY: 'auto',
          background: theme.blockBg[blockKey],
          position: 'relative',
          display: 'flex',
          flexDirection: isBottom ? 'row' : 'column',
          flexWrap: isBottom ? 'wrap' : 'nowrap',
          gap: isBottom ? '6px 16px' : '4px',
          alignContent: 'flex-start',
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: isBottom ? '10px' : '8px',
            bottom: isBottom ? '6px' : '8px',
            opacity: watermarkOpacity,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        >
          <BlockIcon blockKey={blockKey} size={watermarkSize} color={watermarkColor} strokeWidth={1.4} />
        </div>

        {items.length === 0 ? (
          <span
            style={{
              position: 'relative',
              zIndex: 1,
              fontSize: '10px',
              color: theme.id === 'neobrutalism' ? '#555' : theme.id === 'blueprint' ? '#bae6fd' : theme.id === 'paper' ? '#8b7355' : theme.id === 'playfulEducation' ? '#7c3aed' : theme.id === 'notion' ? '#9b9995' : theme.id === 'startupPitchDeck' ? '#a78bfa' : '#9ca3af',
              fontStyle: theme.id === 'neobrutalism' ? 'normal' : 'italic',
              fontFamily: theme.id === 'neobrutalism' ? 'monospace' : 'inherit',
            }}
          >
            {meta.placeholders[0]}…
          </span>
        ) : (
          items.map((item, idx) => (
            <div
              key={idx}
              style={{
                position: 'relative',
                zIndex: 1,
                display: 'flex',
                alignItems: 'flex-start',
                gap: '5px',
                fontSize: isVP ? '11px' : '10px',
                lineHeight: '1.45',
                color: theme.blockItemColor,
                fontWeight: isVP ? 500 : 400,
                fontFamily: theme.id === 'neobrutalism' ? 'monospace' : 'inherit',
              }}
            >
              <span
                style={{
                  flexShrink: 0,
                  width: theme.id === 'neobrutalism' ? '10px' : '6px',
                  height: theme.id === 'neobrutalism' ? '10px' : '6px',
                  borderRadius: theme.id === 'neobrutalism' ? '0' : '50%',
                  background: theme.blockBullet,
                  marginTop: theme.id === 'neobrutalism' ? '3px' : '4px',
                  border: theme.id === 'neobrutalism' ? '2px solid #000' : 'none',
                }}
              />
              <span style={{ flex: 1 }}>{item}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ─── BMC Canvas Legend strip ───────────────────────────────────────────────
function CanvasLegend({ theme }: { theme: ThemeConfig }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '5px 12px',
        borderBottom: `1px solid ${theme.dividerColor}`,
        background: theme.id === 'hijau' ? '#1a4a2e' : theme.id === 'neobrutalism' ? '#000' : theme.id === 'corporate' ? '#1e3a5f' : theme.id === 'blueprint' ? '#082f49' : theme.id === 'paper' ? '#fdf6ea' : theme.id === 'playfulEducation' ? '#faf5ff' : theme.id === 'notion' ? '#ffffff' : theme.id === 'startupPitchDeck' ? '#111827' : '#f9fafb',
        flexShrink: 0,
      }}
    >
      {/* Left label */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span
          style={{
            fontSize: '9px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: theme.id === 'hijau' ? '#7fba9a' : theme.id === 'neobrutalism' ? '#facc15' : theme.id === 'corporate' ? '#93c5fd' : theme.id === 'blueprint' ? '#bae6fd' : theme.id === 'paper' ? '#8b7355' : theme.id === 'playfulEducation' ? '#8b5cf6' : theme.id === 'notion' ? '#9b9995' : theme.id === 'startupPitchDeck' ? '#f0abfc' : '#9ca3af',
          }}
        >
          Infrastruktur
        </span>
      </div>
      {/* Center */}
      <div style={{ textAlign: 'center' }}>
        <span
          style={{
            fontSize: '9px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: theme.id === 'hijau' ? '#7fba9a' : theme.id === 'neobrutalism' ? '#facc15' : theme.id === 'corporate' ? '#93c5fd' : theme.id === 'blueprint' ? '#bae6fd' : theme.id === 'paper' ? '#8b7355' : theme.id === 'playfulEducation' ? '#8b5cf6' : theme.id === 'notion' ? '#9b9995' : theme.id === 'startupPitchDeck' ? '#f0abfc' : '#9ca3af',
          }}
        >
          Proposisi Nilai
        </span>
      </div>
      {/* Right label */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, textAlign: 'right' }}>
        <span
          style={{
            fontSize: '9px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: theme.id === 'hijau' ? '#7fba9a' : theme.id === 'neobrutalism' ? '#facc15' : theme.id === 'corporate' ? '#93c5fd' : theme.id === 'blueprint' ? '#bae6fd' : theme.id === 'paper' ? '#8b7355' : theme.id === 'playfulEducation' ? '#8b5cf6' : theme.id === 'notion' ? '#9b9995' : theme.id === 'startupPitchDeck' ? '#f0abfc' : '#9ca3af',
          }}
        >
          Pelanggan
        </span>
      </div>
    </div>
  );
}

// ─── Main BMC Canvas ──────────────────────────────────────────────────────────
export default function BMCCanvas() {
  const { data, theme, canvasRef, activeFormBlock, companyName, logoDataUrl } = useBMC();

  const allKeys = Object.keys(BLOCK_GRID) as BMCBlockKey[];

  return (
    <div
      className={`flex h-full w-full min-h-0 flex-col ${theme.canvasOuterBg} ${theme.fontClass}`}
      style={{ padding: theme.id === 'neobrutalism' ? '14px' : '10px' }}
    >
      {/* Wrapper card */}
      <div
        ref={canvasRef}
        className={[
          theme.canvasWrapperBorder,
          theme.canvasWrapperShadow,
          'overflow-hidden flex-1 flex flex-col',
        ].join(' ')}
        style={{
          background: theme.id === 'neobrutalism'
            ? '#fffcf2'
            : theme.id === 'blueprint'
            ? '#082f49'
            : theme.id === 'paper'
            ? '#fffaf0'
            : theme.id === 'playfulEducation'
            ? '#ffffff'
            : theme.id === 'notion'
            ? '#ffffff'
            : theme.id === 'startupPitchDeck'
            ? '#ffffff'
            : theme.canvasWrapperBg === 'bg-white'
            ? '#ffffff'
            : '#f8fafc',
          minHeight: 0,
        }}
      >
        {/* Canvas header */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            alignItems: 'center',
            gap: '12px',
            padding: '8px 14px',
              background:
                theme.id === 'hijau'
                  ? '#133622'
                : theme.id === 'neobrutalism'
                  ? '#000'
                : theme.id === 'corporate'
                  ? '#1e3a5f'
                : theme.id === 'blueprint'
                  ? '#082f49'
                : theme.id === 'paper'
                  ? '#f7f1e3'
                : theme.id === 'playfulEducation'
                  ? '#8b5cf6'
                 : theme.id === 'notion'
                   ? '#ffffff'
                : theme.id === 'startupPitchDeck'
                  ? '#111827'
                : '#ffffff',
            borderBottom: `2px solid ${theme.dividerColor}`,
            flexShrink: 0,
          }}
        >
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontSize: '13px',
                fontWeight: theme.id === 'neobrutalism' ? 900 : 700,
                letterSpacing: theme.id === 'neobrutalism' ? '0.12em' : '0.02em',
                textTransform: theme.id === 'neobrutalism' ? 'uppercase' : 'none',
                color:
                  theme.id === 'hijau'
                    ? '#ffffff'
                    : theme.id === 'neobrutalism'
                    ? '#fef08a'
                    : theme.id === 'corporate'
                    ? '#ffffff'
                    : theme.id === 'blueprint'
                    ? '#e0f2fe'
                    : theme.id === 'paper'
                    ? '#5b4631'
                    : theme.id === 'playfulEducation'
                    ? '#ffffff'
                    : theme.id === 'notion'
                    ? '#37352f'
                    : theme.id === 'startupPitchDeck'
                    ? '#ffffff'
                    : '#111827',
                fontFamily: theme.id === 'neobrutalism' ? 'monospace' : theme.id === 'corporate' || theme.id === 'paper' ? 'Georgia, serif' : 'inherit',
              }}
            >
              Business Model Canvas
            </div>
            <div
              style={{
                fontSize: companyName ? '11px' : '9px',
                fontWeight: companyName ? (theme.id === 'neobrutalism' ? 900 : 600) : 400,
                color: companyName
                  ? theme.id === 'hijau'
                    ? '#AC7B2E'
                    : theme.id === 'neobrutalism'
                    ? '#fde047'
                    : theme.id === 'corporate'
                    ? '#bfdbfe'
                    : theme.id === 'blueprint'
                    ? '#67e8f9'
                    : theme.id === 'paper'
                    ? '#8b6b4a'
                    : theme.id === 'playfulEducation'
                    ? '#ddd6fe'
                    : theme.id === 'notion'
                    ? '#787774'
                    : theme.id === 'startupPitchDeck'
                    ? '#f0abfc'
                    : '#374151'
                  : theme.id === 'hijau'
                  ? '#3a6648'
                  : theme.id === 'neobrutalism'
                  ? '#6b7280'
                  : theme.id === 'corporate'
                  ? '#64748b'
                  : theme.id === 'blueprint'
                  ? '#7dd3fc'
                  : theme.id === 'paper'
                  ? '#a38b6d'
                  : theme.id === 'playfulEducation'
                  ? '#c4b5fd'
                  : theme.id === 'notion'
                  ? '#9b9995'
                  : theme.id === 'startupPitchDeck'
                  ? '#a78bfa'
                  : '#d1d5db',
                letterSpacing: companyName ? '0.03em' : '0.06em',
                textTransform: companyName ? 'none' : 'uppercase',
                fontStyle: companyName ? 'normal' : 'italic',
                fontFamily: theme.id === 'neobrutalism' ? 'monospace' : theme.id === 'corporate' || theme.id === 'paper' ? 'Georgia, serif' : 'inherit',
                transition: 'all 0.2s ease',
              }}
            >
              {companyName || 'nama usaha belum diisi…'}
            </div>
          </div>
          <div
            style={{
              justifySelf: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 60,
              height: 60,
              borderRadius: '50%',
              background: '#ffffff',
              border: `2px solid ${theme.id === 'hijau' ? '#50918B' : theme.id === 'neobrutalism' ? '#fde047' : theme.id === 'corporate' ? '#cbd5e1' : theme.id === 'blueprint' ? '#67e8f9' : theme.id === 'paper' ? '#d7c5a9' : theme.id === 'playfulEducation' ? '#ddd6fe' : theme.id === 'notion' ? '#efeeeb' : theme.id === 'startupPitchDeck' ? '#374151' : '#e5e7eb'}`,
              overflow: 'hidden',
              boxShadow: theme.id === 'notion' ? '0 4px 14px rgba(15,23,42,0.06)' : 'none',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoDataUrl || DEFAULT_BUSINESS_LOGO_SRC}
              alt="Logo usaha"
              crossOrigin="anonymous"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          {/* WBI Logos — pojok kanan atas canvas dengan background putih */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 10,
              justifySelf: 'end',
              background: '#ffffff',
              borderRadius: theme.id === 'notion' ? 8 : 4,
              padding: '5px 10px',
              border: theme.id === 'notion' ? '1px solid #efeeeb' : '1px solid rgba(255,255,255,0.15)',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/wbi.png" alt="WBI Politeknik" style={{ height: 28, width: 'auto', display: 'block' }} />
            <div style={{ width: 1, height: 24, background: '#e5e7eb', flexShrink: 0 }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/wbiic.png" alt="WBIIC" style={{ height: 22, width: 'auto', display: 'block' }} />
          </div>
        </div>

        {/* Legend */}
        <CanvasLegend theme={theme} />

        {/* 10-column BMC Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(10, 1fr)',
            gridTemplateRows: '1fr 1fr 0.62fr',
            flex: 1,
            minHeight: 0,
            gap: theme.id === 'neobrutalism' ? '0px' : '0px',
          }}
        >
          {allKeys.map((key) => (
            <CanvasBlock
              key={key}
              blockKey={key}
              theme={theme}
              items={data[key]}
              isHighlighted={activeFormBlock === key}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
