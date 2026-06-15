import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AppState {
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  location: any;
  setLocation: (location: any) => void;
  recentUploads: { soil: any; disease: any; crop: Record<string, any> };
  setSoilUpload: (fileData: any) => void;
  soilReportId: string | null;
  setSoilReportId: (id: string | null) => void;
  setDiseaseUpload: (fileData: any) => void;
  diseaseReportId: string | null;
  setDiseaseReportId: (id: string | null) => void;
  setCropUpload: (blockId: string, fileData: any) => void;
  clearUploads: () => void;
  userToken: string | null;
  setUserToken: (token: string | null) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: 'system',
      setTheme: (theme) => set({ theme }),
      
      location: null,
      setLocation: (location) => set({ location }),

      recentUploads: { soil: null, disease: null, crop: {} },
      
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

      userToken: null,
      setUserToken: (token) => set({ userToken: token }),
    }),
    {
      name: 'agrovision-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ theme: state.theme, userToken: state.userToken }),
    }
  )
);
