'use client';

import { Leaf, Square, Zap, Building2, Compass, FileText, GraduationCap, BookOpen, Gem, BarChart3 } from 'lucide-react';
import { useBMC } from '@/context/BMCContext';
import { themes, themeOrder } from '@/lib/themes';
import { ThemeId } from '@/lib/types';

const themeIcons: Record<ThemeId, React.ReactNode> = {
  hijau:        <Leaf        size={11} strokeWidth={2.5} />,
  minimalist:   <Square      size={11} strokeWidth={2.5} />,
  neobrutalism: <Zap         size={11} strokeWidth={2.5} />,
  corporate:    <Building2   size={11} strokeWidth={2.5} />,
  blueprint:    <Compass     size={11} strokeWidth={2.5} />,
  paper:        <FileText    size={11} strokeWidth={2.5} />,
  playfulEducation: <GraduationCap size={11} strokeWidth={2.5} />,
  notion:       <BookOpen    size={11} strokeWidth={2.5} />,
  glassmorphism:<Gem         size={11} strokeWidth={2.5} />,
  startupPitchDeck: <BarChart3 size={11} strokeWidth={2.5} />,
};

export default function ThemeSwitcher() {
  const { themeId, setThemeId } = useBMC();

  const activeStyle = (id: ThemeId): React.CSSProperties => {
    const sel = id === themeId;
    switch (themeId) {
      case 'hijau':
        return sel
          ? { background: '#AC7B2E', color: '#fff', border: '1.5px solid #AC7B2E' }
          : { background: 'transparent', color: '#7fba9a', border: '1.5px solid #3a6648' };
      case 'neobrutalism':
        return sel
          ? { background: '#fde047', color: '#000', border: '2px solid #fde047' }
          : { background: 'transparent', color: '#a3a3a3', border: '2px solid #525252' };
      case 'corporate':
        return sel
          ? { background: '#3b82f6', color: '#fff', border: '1px solid #3b82f6' }
          : { background: 'transparent', color: '#64748b', border: '1px solid #334155' };
      case 'blueprint':
        return sel
          ? { background: '#67e8f9', color: '#082f49', border: '1px solid #67e8f9' }
          : { background: 'transparent', color: '#bae6fd', border: '1px solid #0ea5e9' };
      case 'paper':
        return sel
          ? { background: '#8b6b4a', color: '#fffaf0', border: '1px solid #8b6b4a' }
          : { background: 'transparent', color: '#8b7355', border: '1px solid #d7c5a9' };
      case 'playfulEducation':
        return sel
          ? { background: '#8b5cf6', color: '#fff', border: '1px solid #8b5cf6' }
          : { background: 'transparent', color: '#7c3aed', border: '1px solid #c4b5fd' };
      case 'notion':
        return sel
          ? { background: '#191919', color: '#fff', border: '1px solid #191919' }
          : { background: 'transparent', color: '#787774', border: '1px solid #d6d3d1' };
      case 'glassmorphism':
        return sel
          ? { background: 'rgba(255,255,255,0.22)', color: '#fff', border: '1px solid rgba(255,255,255,0.28)' }
          : { background: 'transparent', color: 'rgba(255,255,255,0.75)', border: '1px solid rgba(255,255,255,0.18)' };
      case 'startupPitchDeck':
        return sel
          ? { background: '#d946ef', color: '#fff', border: '1px solid #d946ef' }
          : { background: 'transparent', color: '#c4b5fd', border: '1px solid #7c3aed' };
      default:
        return sel
          ? { background: '#3b82f6', color: '#fff', border: '1px solid #3b82f6' }
          : { background: 'transparent', color: '#6b7280', border: '1px solid #d1d5db' };
    }
  };

  const labelColor =
    themeId === 'hijau'
      ? '#7fba9a'
      : themeId === 'neobrutalism'
      ? '#a3a3a3'
      : themeId === 'corporate'
      ? '#64748b'
      : themeId === 'blueprint'
      ? '#bae6fd'
      : themeId === 'paper'
      ? '#8b7355'
      : themeId === 'playfulEducation'
      ? '#ede9fe'
      : themeId === 'notion'
      ? '#787774'
      : themeId === 'glassmorphism'
      ? 'rgba(255,255,255,0.78)'
      : '#c4b5fd';

  const isNeo = themeId === 'neobrutalism';

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span
        className="text-xs mr-0.5"
        style={{ color: labelColor }}
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
