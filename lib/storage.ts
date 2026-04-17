import { BMCData, BMCWorkspace } from './types';
import { defaultBMCData } from './defaultData';

const STORAGE_KEY = 'bmc_data_v1';
const THEME_KEY = 'bmc_theme_v1';
const COMPANY_KEY = 'bmc_company_v1';
const TEAM_KEY = 'bmc_team_v1';
const LOGO_KEY = 'bmc_logo_v1';

export function loadFromStorage(): BMCData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultBMCData;
    const parsed = JSON.parse(raw) as Partial<BMCData>;
    // Merge with defaults to handle any missing keys from schema changes
    return { ...defaultBMCData, ...parsed };
  } catch {
    return defaultBMCData;
  }
}

export function saveToStorage(data: BMCData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Ignore storage errors (private browsing, quota exceeded, etc.)
  }
}

export function loadThemeFromStorage(): string | null {
  try {
    return localStorage.getItem(THEME_KEY);
  } catch {
    return null;
  }
}

export function saveThemeToStorage(themeId: string): void {
  try {
    localStorage.setItem(THEME_KEY, themeId);
  } catch {
    // Ignore
  }
}

export function loadCompanyNameFromStorage(): string {
  try {
    return localStorage.getItem(COMPANY_KEY) ?? '';
  } catch {
    return '';
  }
}

export function saveCompanyNameToStorage(name: string): void {
  try {
    localStorage.setItem(COMPANY_KEY, name);
  } catch {
    // Ignore
  }
}

export function loadTeamNameFromStorage(): string {
  try {
    return localStorage.getItem(TEAM_KEY) ?? '';
  } catch {
    return '';
  }
}

export function saveTeamNameToStorage(name: string): void {
  try {
    localStorage.setItem(TEAM_KEY, name);
  } catch {
    // Ignore
  }
}

export function loadLogoFromStorage(): string {
  try {
    return localStorage.getItem(LOGO_KEY) ?? '';
  } catch {
    return '';
  }
}

export function saveLogoToStorage(logoDataUrl: string): void {
  try {
    localStorage.setItem(LOGO_KEY, logoDataUrl);
  } catch {
    // Ignore
  }
}

export function exportAsJSON(workspace: BMCWorkspace, filename = 'bmc-canvas.json'): void {
  const blob = new Blob([JSON.stringify(workspace, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function normalizeWorkspacePayload(parsed: unknown): BMCWorkspace {
  const maybeWorkspace = parsed as Partial<BMCWorkspace> | Partial<BMCData>;
  const maybeData = 'data' in (maybeWorkspace ?? {}) ? (maybeWorkspace as Partial<BMCWorkspace>).data : maybeWorkspace;

  return {
    data: { ...defaultBMCData, ...(maybeData as Partial<BMCData>) },
    companyName:
      'companyName' in (maybeWorkspace ?? {}) && typeof (maybeWorkspace as Partial<BMCWorkspace>).companyName === 'string'
        ? (maybeWorkspace as Partial<BMCWorkspace>).companyName ?? ''
        : '',
    teamName:
      'teamName' in (maybeWorkspace ?? {}) && typeof (maybeWorkspace as Partial<BMCWorkspace>).teamName === 'string'
        ? (maybeWorkspace as Partial<BMCWorkspace>).teamName ?? ''
        : '',
    logoDataUrl:
      'logoDataUrl' in (maybeWorkspace ?? {}) && typeof (maybeWorkspace as Partial<BMCWorkspace>).logoDataUrl === 'string'
        ? (maybeWorkspace as Partial<BMCWorkspace>).logoDataUrl ?? ''
        : '',
  };
}

export function parseJSONFile(file: File): Promise<BMCWorkspace> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target?.result as string) as unknown;
        resolve(normalizeWorkspacePayload(parsed));
      } catch {
        reject(new Error('Invalid JSON file'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}
