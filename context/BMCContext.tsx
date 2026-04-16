'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  ReactNode,
} from 'react';
import { BMCData, BMCBlockKey, BMCWorkspace, ThemeId, ThemeConfig } from '@/lib/types';
import { defaultBMCData } from '@/lib/defaultData';
import { themes } from '@/lib/themes';
import {
  loadFromStorage,
  saveToStorage,
  loadThemeFromStorage,
  saveThemeToStorage,
  loadCompanyNameFromStorage,
  saveCompanyNameToStorage,
  loadTeamNameFromStorage,
  saveTeamNameToStorage,
} from '@/lib/storage';

interface BMCContextValue {
  data: BMCData;
  setBlock: (key: BMCBlockKey, items: string[]) => void;
  addItem: (key: BMCBlockKey, text: string) => void;
  removeItem: (key: BMCBlockKey, index: number) => void;
  loadData: (data: BMCData) => void;
  loadWorkspace: (workspace: BMCWorkspace) => void;
  resetData: () => void;
  themeId: ThemeId;
  setThemeId: (id: ThemeId) => void;
  theme: ThemeConfig;
  canvasRef: React.RefObject<HTMLDivElement>;
  activeFormBlock: BMCBlockKey | null;
  setActiveFormBlock: (key: BMCBlockKey | null) => void;
  companyName: string;
  setCompanyName: (name: string) => void;
  teamName: string;
  setTeamName: (name: string) => void;
}

const BMCContext = createContext<BMCContextValue | null>(null);

export function BMCProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<BMCData>(defaultBMCData);
  const [themeId, setThemeIdState] = useState<ThemeId>('hijau');
  const [activeFormBlock, setActiveFormBlock] = useState<BMCBlockKey | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [companyName, setCompanyNameState] = useState('');
  const [teamName, setTeamNameState] = useState('');
  const canvasRef = useRef<HTMLDivElement>(null);

  // Load persisted state after mount
  useEffect(() => {
    const storedData = loadFromStorage();
    const storedTheme = loadThemeFromStorage();
    setData(storedData);
    if (storedTheme && storedTheme in themes) {
      setThemeIdState(storedTheme as ThemeId);
    }
    const storedName = loadCompanyNameFromStorage();
    if (storedName) setCompanyNameState(storedName);
    const storedTeamName = loadTeamNameFromStorage();
    if (storedTeamName) setTeamNameState(storedTeamName);
    setHydrated(true);
  }, []);

  // Persist data changes (debounced via useRef)
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const persistData = useCallback((newData: BMCData) => {
    if (!hydrated) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => saveToStorage(newData), 400);
  }, [hydrated]);

  const setBlock = useCallback((key: BMCBlockKey, items: string[]) => {
    setData((prev) => {
      const next = { ...prev, [key]: items };
      persistData(next);
      return next;
    });
  }, [persistData]);

  const addItem = useCallback((key: BMCBlockKey, text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setData((prev) => {
      const next = { ...prev, [key]: [...prev[key], trimmed] };
      persistData(next);
      return next;
    });
  }, [persistData]);

  const removeItem = useCallback((key: BMCBlockKey, index: number) => {
    setData((prev) => {
      const next = { ...prev, [key]: prev[key].filter((_, i) => i !== index) };
      persistData(next);
      return next;
    });
  }, [persistData]);

  const loadData = useCallback((newData: BMCData) => {
    setData(newData);
    persistData(newData);
  }, [persistData]);

  const loadWorkspace = useCallback((workspace: BMCWorkspace) => {
    setData(workspace.data);
    setCompanyNameState(workspace.companyName);
    setTeamNameState(workspace.teamName);
    persistData(workspace.data);
    saveCompanyNameToStorage(workspace.companyName);
    saveTeamNameToStorage(workspace.teamName);
  }, [persistData]);

  const resetData = useCallback(() => {
    setData(defaultBMCData);
    persistData(defaultBMCData);
  }, [persistData]);

  const setThemeId = useCallback((id: ThemeId) => {
    setThemeIdState(id);
    saveThemeToStorage(id);
  }, []);

  const setCompanyName = useCallback((name: string) => {
    setCompanyNameState(name);
    saveCompanyNameToStorage(name);
  }, []);

  const setTeamName = useCallback((name: string) => {
    setTeamNameState(name);
    saveTeamNameToStorage(name);
  }, []);

  const theme = themes[themeId];

  return (
    <BMCContext.Provider
      value={{
        data,
        setBlock,
        addItem,
        removeItem,
        loadData,
        loadWorkspace,
        resetData,
        themeId,
        setThemeId,
        theme,
        canvasRef,
        activeFormBlock,
        setActiveFormBlock,
        companyName,
        setCompanyName,
        teamName,
        setTeamName,
      }}
    >
      {children}
    </BMCContext.Provider>
  );
}

export function useBMC(): BMCContextValue {
  const ctx = useContext(BMCContext);
  if (!ctx) throw new Error('useBMC must be used inside BMCProvider');
  return ctx;
}
