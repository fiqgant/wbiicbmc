'use client';

import { useBMC } from '@/context/BMCContext';
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
        outline: isHighlighted ? `2px solid ${theme.id === 'neobrutalism' ? '#facc15' : '#3b82f6'}` : 'none',
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
          display: 'flex',
          flexDirection: isBottom ? 'row' : 'column',
          flexWrap: isBottom ? 'wrap' : 'nowrap',
          gap: isBottom ? '6px 16px' : '4px',
          alignContent: 'flex-start',
        }}
      >
        {items.length === 0 ? (
          <span
            style={{
              fontSize: '10px',
              color: theme.id === 'neobrutalism' ? '#555' : '#9ca3af',
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
        background: theme.id === 'hijau' ? '#1a4a2e' : theme.id === 'neobrutalism' ? '#000' : theme.id === 'corporate' ? '#1e3a5f' : '#f9fafb',
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
            color: theme.id === 'hijau' ? '#7fba9a' : theme.id === 'neobrutalism' ? '#facc15' : theme.id === 'corporate' ? '#93c5fd' : '#9ca3af',
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
            color: theme.id === 'hijau' ? '#7fba9a' : theme.id === 'neobrutalism' ? '#facc15' : theme.id === 'corporate' ? '#93c5fd' : '#9ca3af',
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
            color: theme.id === 'hijau' ? '#7fba9a' : theme.id === 'neobrutalism' ? '#facc15' : theme.id === 'corporate' ? '#93c5fd' : '#9ca3af',
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
  const { data, theme, canvasRef, activeFormBlock, companyName } = useBMC();

  const allKeys = Object.keys(BLOCK_GRID) as BMCBlockKey[];

  return (
    <div
      className={`flex flex-col h-full w-full ${theme.canvasOuterBg} ${theme.fontClass}`}
      style={{ padding: theme.id === 'neobrutalism' ? '16px' : '12px' }}
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
          background: theme.canvasWrapperBg === 'bg-white' ? '#ffffff' : theme.id === 'neobrutalism' ? '#fffcf2' : '#f8fafc',
          minHeight: 0,
        }}
      >
        {/* Canvas header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 14px',
            background:
              theme.id === 'hijau'
                ? '#133622'
                : theme.id === 'neobrutalism'
                ? '#000'
                : theme.id === 'corporate'
                ? '#1e3a5f'
                : '#ffffff',
            borderBottom: `2px solid ${theme.dividerColor}`,
            flexShrink: 0,
          }}
        >
          <div>
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
                    : '#111827',
                fontFamily: theme.id === 'neobrutalism' ? 'monospace' : theme.id === 'corporate' ? 'Georgia, serif' : 'inherit',
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
                    : '#374151'
                  : theme.id === 'hijau'
                  ? '#3a6648'
                  : theme.id === 'neobrutalism'
                  ? '#6b7280'
                  : theme.id === 'corporate'
                  ? '#64748b'
                  : '#d1d5db',
                letterSpacing: companyName ? '0.03em' : '0.06em',
                textTransform: companyName ? 'none' : 'uppercase',
                fontStyle: companyName ? 'normal' : 'italic',
                fontFamily: theme.id === 'neobrutalism' ? 'monospace' : theme.id === 'corporate' ? 'Georgia, serif' : 'inherit',
                transition: 'all 0.2s ease',
              }}
            >
              {companyName || 'nama usaha belum diisi…'}
            </div>
          </div>
          {/* WBI Logos — pojok kanan atas canvas dengan background putih */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              background: '#ffffff',
              borderRadius: 4,
              padding: '5px 10px',
              border: '1px solid rgba(255,255,255,0.15)',
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
