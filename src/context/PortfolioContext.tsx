import React, { createContext, useContext, useState, useEffect } from 'react';
import { PortfolioData, Language, ThemeMode, Project } from '../types/portfolio';
import { defaultPortfolioData } from '../data/defaultPortfolio';

interface PortfolioContextType {
  data: PortfolioData;
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  updateProfile: (profile: Partial<PortfolioData['profile']>) => void;
  addProject: (project: Project) => void;
  updateProject: (id: string, updated: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  resetToDefaults: () => void;
  exportDataAsJson: () => void;
  isCustomizerOpen: boolean;
  setIsCustomizerOpen: (open: boolean) => void;
  isGuideOpen: boolean;
  setIsGuideOpen: (open: boolean) => void;
  activeShowreel: boolean;
  setActiveShowreel: (open: boolean) => void;
  selectedProject: Project | null;
  setSelectedProject: (proj: Project | null) => void;
}

const STORAGE_KEY = 'creative_portfolio_data_v14';
const LANG_STORAGE_KEY = 'creative_portfolio_lang_v1';
const THEME_STORAGE_KEY = 'creative_portfolio_theme_v1';

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Clean out any old dummy placeholder projects
        const cleanedProjects = Array.isArray(parsed.projects)
          ? parsed.projects.filter(
              (p: Project) =>
                !['proj-1', 'proj-2', 'proj-4', 'proj-6', 'proj-8'].includes(p.id) &&
                !(p.videoUrl && p.videoUrl.includes('mixkit'))
            )
          : defaultPortfolioData.projects;

        // Ensure the real YouTube project is present if not already added
        const hasNasifProject = cleanedProjects.some((p: Project) => p.id === 'proj-yt-nasif-sir' || p.videoUrl?.includes('6CmNNb7WE8c'));
        const finalProjects = hasNasifProject
          ? cleanedProjects
          : [defaultPortfolioData.projects[0], ...cleanedProjects];

        return {
          ...defaultPortfolioData,
          ...parsed,
          profile: {
            ...defaultPortfolioData.profile,
            ...(parsed.profile || {}),
            showreelUrl: parsed.profile?.showreelUrl?.includes('mixkit')
              ? defaultPortfolioData.profile.showreelUrl
              : (parsed.profile?.showreelUrl || defaultPortfolioData.profile.showreelUrl),
            avatarUrl: parsed.profile?.avatarUrl || defaultPortfolioData.profile.avatarUrl,
          },
          projects: finalProjects,
        };
      }
    } catch {
      // Fallback
    }
    return defaultPortfolioData;
  });

  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const savedLang = localStorage.getItem(LANG_STORAGE_KEY) as Language;
      if (savedLang === 'bn' || savedLang === 'en') return savedLang;
    } catch {
      // Default
    }
    return 'bn'; // Default to Bengali as requested by the user
  });

  const [theme, setThemeState] = useState<ThemeMode>(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode;
      if (savedTheme === 'dark' || savedTheme === 'light') return savedTheme;
    } catch {
      // ignore
    }
    return 'dark'; // Default to sleek dark mode
  });

  useEffect(() => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // ignore
    }

    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
      root.setAttribute('data-theme', 'dark');
    }
  }, [theme]);

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [activeShowreel, setActiveShowreel] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // ignore
    }
  }, [data]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch {
      // ignore
    }
  };

  const updateProfile = (profileUpdate: Partial<PortfolioData['profile']>) => {
    setData((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        ...profileUpdate,
      },
    }));
  };

  const addProject = (project: Project) => {
    setData((prev) => ({
      ...prev,
      projects: [project, ...prev.projects],
    }));
  };

  const updateProject = (id: string, updated: Partial<Project>) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, ...updated } : p)),
    }));
  };

  const deleteProject = (id: string) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
  };

  const resetToDefaults = () => {
    setData(defaultPortfolioData);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const exportDataAsJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `portfolio-config-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        language,
        setLanguage,
        theme,
        setTheme,
        toggleTheme,
        updateProfile,
        addProject,
        updateProject,
        deleteProject,
        resetToDefaults,
        exportDataAsJson,
        isCustomizerOpen,
        setIsCustomizerOpen,
        isGuideOpen,
        setIsGuideOpen,
        activeShowreel,
        setActiveShowreel,
        selectedProject,
        setSelectedProject,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
