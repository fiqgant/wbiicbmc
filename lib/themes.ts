import { ThemeConfig, ThemeId } from './types';

const minimalist: ThemeConfig = {
  id: 'minimalist',
  name: 'Minimalist',
  // Page
  pageBg: 'bg-gray-50',
  // Header
  headerBg: 'bg-white border-b border-gray-200',
  headerTitle: 'text-gray-900 font-bold text-lg tracking-tight',
  headerSubtitle: 'text-gray-400 text-xs',
  // Sidebar
  sidebarBg: 'bg-white',
  sidebarBorder: 'border-r border-gray-200',
  // Form
  formLabel: 'text-sm font-semibold text-gray-700',
  formDescription: 'text-xs text-gray-400 mt-0.5 mb-2',
  formInput:
    'w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow',
  formAddBtn:
    'bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded-md transition-colors flex items-center gap-1',
  formRemoveBtn: 'text-gray-300 hover:text-red-500 transition-colors ml-1 flex-shrink-0',
  formSectionBg: 'bg-white hover:bg-blue-50/40 transition-colors',
  formSectionBorder: 'border border-gray-100 rounded-lg',
  formSectionTitle: 'text-sm font-semibold text-gray-800',
  formItemChip:
    'flex items-center gap-1 bg-gray-50 border border-gray-200 rounded px-2 py-1 text-xs text-gray-700 group',
  formItemText: 'text-xs text-gray-700 flex-1',
  // Canvas
  canvasOuterBg: 'bg-gray-100',
  canvasWrapperBg: 'bg-white',
  canvasWrapperBorder: 'border border-gray-200',
  canvasWrapperShadow: 'shadow-xl',
  canvasTitle: 'text-gray-500 font-medium text-xs uppercase tracking-widest',
  // Block
  blockBorder: 'border-gray-200',
  blockTitleBg: '#f3f4f6',
  blockTitleText: '#374151',
  blockTitleExtra: 'font-semibold text-[10px] uppercase tracking-widest',
  blockContentBg: '#ffffff',
  blockContentText: '#374151',
  blockItemColor: '#374151',
  blockBullet: '#9ca3af',
  blockShadow: 'none',
  blockRadius: '0px',
  blockBg: {
    keyPartnerships: '#f8fafc',
    keyActivities: '#fafafa',
    keyResources: '#fafafa',
    valuePropositions: '#eff6ff',
    customerRelationships: '#fdf4ff',
    channels: '#f0f9ff',
    customerSegments: '#fff7ed',
    costStructure: '#fef2f2',
    revenueStreams: '#f0fdf4',
  },
  // Export buttons
  btnPng: 'bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5',
  btnPdf: 'bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5',
  btnSave: 'bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5',
  btnLoad: 'bg-gray-600 hover:bg-gray-700 text-white text-xs font-semibold px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5',
  fontClass: 'font-sans',
  dividerColor: '#e5e7eb',
};

const neobrutalism: ThemeConfig = {
  id: 'neobrutalism',
  name: 'Neobrutalism',
  // Page
  pageBg: 'bg-yellow-50',
  // Header
  headerBg: 'bg-black',
  headerTitle: 'text-yellow-300 font-black text-lg uppercase tracking-widest',
  headerSubtitle: 'text-yellow-500 text-xs font-mono',
  // Sidebar
  sidebarBg: 'bg-yellow-50',
  sidebarBorder: 'border-r-4 border-black',
  // Form
  formLabel: 'text-xs font-black text-black uppercase tracking-widest',
  formDescription: 'text-xs text-gray-600 mt-0.5 mb-2 font-mono',
  formInput:
    'w-full border-2 border-black px-3 py-2 text-sm font-mono text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white',
  formAddBtn:
    'bg-black hover:bg-gray-800 text-yellow-300 text-xs font-black px-3 py-1.5 border-2 border-black transition-colors flex items-center gap-1',
  formRemoveBtn: 'text-gray-400 hover:text-red-600 transition-colors ml-1 flex-shrink-0 font-black',
  formSectionBg: 'bg-yellow-50',
  formSectionBorder: 'border-2 border-black',
  formSectionTitle: 'text-xs font-black text-black uppercase',
  formItemChip:
    'flex items-center gap-1 bg-white border-2 border-black px-2 py-1 text-xs text-black font-mono group',
  formItemText: 'text-xs text-black font-mono flex-1',
  // Canvas
  canvasOuterBg: 'bg-yellow-50',
  canvasWrapperBg: 'bg-yellow-50',
  canvasWrapperBorder: 'border-4 border-black',
  canvasWrapperShadow: 'shadow-[8px_8px_0px_#000]',
  canvasTitle: 'text-black font-black text-xs uppercase tracking-widest font-mono',
  // Block
  blockBorder: '#000000',
  blockTitleBg: '#000000',
  blockTitleText: '#fefce8',
  blockTitleExtra: 'font-black text-[10px] uppercase tracking-widest font-mono',
  blockContentBg: '#fffcf2',
  blockContentText: '#000000',
  blockItemColor: '#000000',
  blockBullet: '#000000',
  blockShadow: '3px 3px 0px #000',
  blockRadius: '0px',
  blockBg: {
    keyPartnerships: '#ffd6e0',
    keyActivities: '#fff3b0',
    keyResources: '#d4f5d4',
    valuePropositions: '#c8e6ff',
    customerRelationships: '#ead5ff',
    channels: '#ffd8a8',
    customerSegments: '#ffd6e0',
    costStructure: '#ffcccc',
    revenueStreams: '#ccf5cc',
  },
  // Export buttons
  btnPng: 'bg-green-400 hover:bg-green-300 text-black text-xs font-black px-3 py-1.5 border-2 border-black transition-colors flex items-center gap-1.5',
  btnPdf: 'bg-blue-400 hover:bg-blue-300 text-black text-xs font-black px-3 py-1.5 border-2 border-black transition-colors flex items-center gap-1.5',
  btnSave: 'bg-yellow-400 hover:bg-yellow-300 text-black text-xs font-black px-3 py-1.5 border-2 border-black transition-colors flex items-center gap-1.5',
  btnLoad: 'bg-gray-200 hover:bg-gray-100 text-black text-xs font-black px-3 py-1.5 border-2 border-black transition-colors flex items-center gap-1.5',
  fontClass: 'font-mono',
  dividerColor: '#000000',
};

const corporate: ThemeConfig = {
  id: 'corporate',
  name: 'Corporate',
  // Page
  pageBg: 'bg-slate-100',
  // Header
  headerBg: 'bg-slate-900',
  headerTitle: 'text-white font-bold text-lg tracking-tight',
  headerSubtitle: 'text-slate-400 text-xs',
  // Sidebar
  sidebarBg: 'bg-white',
  sidebarBorder: 'border-r border-slate-200',
  // Form
  formLabel: 'text-sm font-semibold text-slate-700',
  formDescription: 'text-xs text-slate-400 mt-0.5 mb-2',
  formInput:
    'w-full border border-slate-300 px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition-shadow rounded-sm',
  formAddBtn:
    'bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold px-3 py-1.5 rounded-sm transition-colors flex items-center gap-1',
  formRemoveBtn: 'text-slate-300 hover:text-red-500 transition-colors ml-1 flex-shrink-0',
  formSectionBg: 'bg-white hover:bg-blue-50/40 transition-colors',
  formSectionBorder: 'border border-slate-200 rounded-sm',
  formSectionTitle: 'text-sm font-semibold text-slate-800',
  formItemChip:
    'flex items-center gap-1 bg-slate-50 border border-slate-200 px-2 py-1 text-xs text-slate-700 group rounded-sm',
  formItemText: 'text-xs text-slate-700 flex-1',
  // Canvas
  canvasOuterBg: 'bg-slate-200',
  canvasWrapperBg: 'bg-white',
  canvasWrapperBorder: 'border border-slate-300',
  canvasWrapperShadow: 'shadow-2xl',
  canvasTitle: 'text-slate-500 font-semibold text-xs uppercase tracking-widest',
  // Block
  blockBorder: '#cbd5e1',
  blockTitleBg: '#1e3a5f',
  blockTitleText: '#ffffff',
  blockTitleExtra: 'font-bold text-[10px] uppercase tracking-widest',
  blockContentBg: '#ffffff',
  blockContentText: '#334155',
  blockItemColor: '#334155',
  blockBullet: '#3b82f6',
  blockShadow: '0 1px 4px rgba(0,0,0,0.10)',
  blockRadius: '2px',
  blockBg: {
    keyPartnerships: '#dbeafe',
    keyActivities: '#dcfce7',
    keyResources: '#f3e8ff',
    valuePropositions: '#dbeafe',
    customerRelationships: '#fce7f3',
    channels: '#fef3c7',
    customerSegments: '#e0f7fa',
    costStructure: '#fce4ec',
    revenueStreams: '#dcfce7',
  },
  // Export buttons
  btnPng: 'bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold px-3 py-1.5 rounded-sm transition-colors flex items-center gap-1.5',
  btnPdf: 'bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold px-3 py-1.5 rounded-sm transition-colors flex items-center gap-1.5',
  btnSave: 'bg-amber-700 hover:bg-amber-800 text-white text-xs font-semibold px-3 py-1.5 rounded-sm transition-colors flex items-center gap-1.5',
  btnLoad: 'bg-slate-600 hover:bg-slate-700 text-white text-xs font-semibold px-3 py-1.5 rounded-sm transition-colors flex items-center gap-1.5',
  fontClass: 'font-serif',
  dividerColor: '#cbd5e1',
};

// ─── Hijau / Brand Theme ──────────────────────────────────────────────────────
// Primary:   #50918B (teal)
// Dark:      #133622 (forest green)
// Accent:    #AC7B2E (gold amber)
const hijau: ThemeConfig = {
  id: 'hijau',
  name: 'WBI',
  // Page
  pageBg: 'bg-[#f0f5f2]',
  // Header
  headerBg: 'bg-[#133622]',
  headerTitle: 'text-white font-bold text-lg tracking-tight',
  headerSubtitle: 'text-[#7fba9a] text-xs',
  // Sidebar
  sidebarBg: 'bg-white',
  sidebarBorder: 'border-r-2 border-[#50918B]',
  // Form
  formLabel: 'text-sm font-semibold text-[#133622]',
  formDescription: 'text-xs text-[#50918B] mt-0.5 mb-2',
  formInput:
    'w-full border border-[#50918B] rounded px-3 py-2 text-sm text-[#133622] placeholder-[#a0b8b5] focus:outline-none focus:ring-2 focus:ring-[#AC7B2E] focus:border-transparent transition-shadow bg-white',
  formAddBtn:
    'bg-[#133622] hover:bg-[#1a4a2e] text-white text-xs font-semibold px-3 py-1.5 rounded transition-colors flex items-center gap-1',
  formRemoveBtn: 'text-[#a0b8b5] hover:text-red-500 transition-colors ml-1 flex-shrink-0',
  formSectionBg: 'bg-white hover:bg-[#f0faf5] transition-colors',
  formSectionBorder: 'border border-[#c5ddd9] rounded',
  formSectionTitle: 'text-sm font-semibold text-[#133622]',
  formItemChip:
    'flex items-center gap-1 bg-[#f0faf5] border border-[#c5ddd9] rounded px-2 py-1 text-xs text-[#133622] group',
  formItemText: 'text-xs text-[#133622] flex-1',
  // Canvas
  canvasOuterBg: 'bg-[#e8f0ec]',
  canvasWrapperBg: 'bg-white',
  canvasWrapperBorder: 'border-2 border-[#50918B]',
  canvasWrapperShadow: 'shadow-2xl',
  canvasTitle: 'text-[#50918B] font-semibold text-xs uppercase tracking-widest',
  // Block
  blockBorder: '#50918B',
  blockTitleBg: '#133622',
  blockTitleText: '#ffffff',
  blockTitleExtra: 'font-bold text-[10px] uppercase tracking-widest',
  blockContentBg: '#ffffff',
  blockContentText: '#1a3322',
  blockItemColor: '#1a3322',
  blockBullet: '#50918B',
  blockShadow: 'none',
  blockRadius: '0px',
  blockBg: {
    keyPartnerships: '#e8f4f2',
    keyActivities: '#eef7ee',
    keyResources: '#f5f0e8',
    valuePropositions: '#e8f4f0',
    customerRelationships: '#f5eee8',
    channels: '#eef0f5',
    customerSegments: '#f0e8f0',
    costStructure: '#fdf0e8',
    revenueStreams: '#e8f5ee',
  },
  // Export buttons
  btnPng:
    'bg-[#50918B] hover:bg-[#3d7a74] text-white text-xs font-semibold px-3 py-1.5 rounded transition-colors flex items-center gap-1.5',
  btnPdf:
    'bg-[#133622] hover:bg-[#1a4a2e] text-white text-xs font-semibold px-3 py-1.5 rounded transition-colors flex items-center gap-1.5',
  btnSave:
    'bg-[#AC7B2E] hover:bg-[#96691f] text-white text-xs font-semibold px-3 py-1.5 rounded transition-colors flex items-center gap-1.5',
  btnLoad:
    'bg-white hover:bg-[#f0faf5] text-[#133622] border border-[#50918B] text-xs font-semibold px-3 py-1.5 rounded transition-colors flex items-center gap-1.5',
  fontClass: 'font-sans',
  dividerColor: '#50918B',
};

export const themes: Record<ThemeId, ThemeConfig> = {
  hijau,
  minimalist,
  neobrutalism,
  corporate,
};

export const themeOrder: ThemeId[] = ['hijau', 'minimalist', 'neobrutalism', 'corporate'];
