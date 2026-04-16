export type BMCBlockKey =
  | 'keyPartnerships'
  | 'keyActivities'
  | 'keyResources'
  | 'valuePropositions'
  | 'customerRelationships'
  | 'channels'
  | 'customerSegments'
  | 'costStructure'
  | 'revenueStreams';

export type BMCData = Record<BMCBlockKey, string[]>;

export interface BMCWorkspace {
  data: BMCData;
  companyName: string;
  teamName: string;
}

export type ThemeId =
  | 'hijau'
  | 'minimalist'
  | 'neobrutalism'
  | 'corporate'
  | 'blueprint'
  | 'paper'
  | 'playfulEducation'
  | 'notion'
  | 'startupPitchDeck';

export interface BlockMeta {
  key: BMCBlockKey;
  title: string;
  description: string;
  placeholders: string[];
}

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  // Page
  pageBg: string;
  // Header
  headerBg: string;
  headerTitle: string;
  headerSubtitle: string;
  // Sidebar / form panel
  sidebarBg: string;
  sidebarBorder: string;
  // Form elements
  formLabel: string;
  formDescription: string;
  formInput: string;
  formAddBtn: string;
  formRemoveBtn: string;
  formSectionBg: string;
  formSectionBorder: string;
  formSectionTitle: string;
  formItemChip: string;
  formItemText: string;
  // Canvas wrapper
  canvasOuterBg: string;
  canvasWrapperBg: string;
  canvasWrapperBorder: string;
  canvasWrapperShadow: string;
  canvasTitle: string;
  // Block styles
  blockBorder: string;
  blockTitleBg: string;
  blockTitleText: string;
  blockTitleExtra: string;
  blockContentBg: string;
  blockContentText: string;
  blockItemColor: string;
  blockBullet: string;
  blockShadow: string;
  blockRadius: string;
  // Per-block background overrides
  blockBg: Record<BMCBlockKey, string>;
  // Export buttons
  btnPng: string;
  btnPdf: string;
  btnSave: string;
  btnLoad: string;
  // Font
  fontClass: string;
  // Misc
  dividerColor: string;
}
