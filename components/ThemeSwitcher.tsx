'use client';

import { Leaf, Square, Zap, Building2 } from 'lucide-react';
import { useBMC } from '@/context/BMCContext';
import { themes, themeOrder } from '@/lib/themes';
import { ThemeId } from '@/lib/types';

const themeIcons: Record<ThemeId, React.ReactNode> = {
  hijau:        <Leaf        size={11} strokeWidth={2.5} />,
  minimalist:   <Square      size={11} strokeWidth={2.5} />,
  neobrutalism: <Zap         size={11} strokeWidth={2.5} />,
  corporate:    <Building2   size={11} strokeWidth={2.5} />,
};

export default function ThemeSwitcher() {
  const { themeId, setThemeId } = useBMC();

  const isHijau = themeId === 'hijau';
  const isNeo   = themeId === 'neobrutalism';
  const isCorp  = themeId === 'corporate';

  const activeStyle = (id: ThemeId): React.CSSProperties => {
    const sel = id === themeId;
    if (isHijau)
      return sel
        ? { background: '#AC7B2E', color: '#fff', border: '1.5px solid #AC7B2E' }
        : { background: 'transparent', color: '#7fba9a', border: '1.5px solid #3a6648' };
    if (isNeo)
      return sel
        ? { background: '#fde047', color: '#000', border: '2px solid #fde047' }
        : { background: 'transparent', color: '#a3a3a3', border: '2px solid #525252' };
    if (isCorp)
      return sel
        ? { background: '#3b82f6', color: '#fff', border: '1px solid #3b82f6' }
        : { background: 'transparent', color: '#64748b', border: '1px solid #334155' };
    return sel
      ? { background: '#3b82f6', color: '#fff', border: '1px solid #3b82f6' }
      : { background: 'transparent', color: '#6b7280', border: '1px solid #d1d5db' };
  };

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span
        className="text-xs mr-0.5"
        style={{
          color: isHijau ? '#7fba9a' : isNeo ? '#a3a3a3' : isCorp ? '#64748b' : '#9ca3af',
        }}
        >
          Tema:
        </span>
      <div className="flex flex-wrap gap-1">
        {themeOrder.map((id) => (
          <button
            key={id}
            onClick={() => setThemeId(id)}
            title={themes[id].name}
            style={{
              padding: '4px 10px',
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer',
              borderRadius: isNeo ? 0 : 4,
              transition: 'all 0.15s',
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              ...activeStyle(id),
            }}
          >
            {themeIcons[id]}
            {themes[id].name}
          </button>
        ))}
      </div>
    </div>
  );
}
