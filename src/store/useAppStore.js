import { create } from 'zustand';

export const useAppStore = create((set) => ({
  // Theme state
  theme: 'system', // 'light', 'dark', 'system'
  setTheme: (theme) => {
    set({ theme });
    if (typeof window !== 'undefined') {
      localStorage.setItem('agrovision-theme', theme);
      if (theme === 'system') {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
      } else {
        document.documentElement.setAttribute('data-theme', theme);
      }
    }
  },
  
  // Location state
  location: null,
  setLocation: (location) => set({ location }),


  // Upload state
  recentUploads: {
    soil: null,
    disease: null,
    crop: {}, // indexed by block id
  },
  
  setSoilUpload: (fileData) => set((state) => ({
    recentUploads: { ...state.recentUploads, soil: fileData }
  })),
  
  soilReportId: null,
  setSoilReportId: (id) => set({ soilReportId: id }),
  
  setDiseaseUpload: (fileData) => set((state) => ({
    recentUploads: { ...state.recentUploads, disease: fileData }
  })),
  
  diseaseReportId: null,
  setDiseaseReportId: (id) => set({ diseaseReportId: id }),
  
  setCropUpload: (blockId, fileData) => set((state) => ({
    recentUploads: { 
      ...state.recentUploads, 
      crop: { ...state.recentUploads.crop, [blockId]: fileData }
    }
  })),

  clearUploads: () => set({
    recentUploads: { soil: null, disease: null, crop: {} }
  }),
}));
