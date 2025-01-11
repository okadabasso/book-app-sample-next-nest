import { create } from 'zustand';

// 型定義
interface StoreState {
    isLoggedIn: boolean;
    user: string | null;
    theme: 'light' | 'dark';
    feature: string;

    login: (user: string) => void;
    logout: () => void;
    setTheme: (theme: 'light' | 'dark') => void;
    setFeature: (feature: string) => void;
}

// Zustandストア
export const useGlobalStore = create<StoreState>((set) => ({
    isLoggedIn: false,
    user: null,
    theme: 'light',
    feature: 'feature1',
    login: (user) => set({ isLoggedIn: true, user }),
    logout: () => set({ isLoggedIn: false, user: null }),
    setTheme: (theme) => set({ theme }),
    setFeature: (feature) => set({ feature }),
}));
