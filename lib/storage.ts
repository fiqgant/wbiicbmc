import { BMCData } from './types';
import { defaultBMCData } from './defaultData';

const STORAGE_KEY = 'bmc_data_v1';
const THEME_KEY = 'bmc_theme_v1';
const COMPANY_KEY = 'bmc_company_v1';

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

export function exportAsJSON(data: BMCData, filename = 'bmc-canvas.json'): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function parseJSONFile(file: File): Promise<BMCData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target?.result as string) as Partial<BMCData>;
        resolve({ ...defaultBMCData, ...parsed });
      } catch {
        reject(new Error('Invalid JSON file'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}
