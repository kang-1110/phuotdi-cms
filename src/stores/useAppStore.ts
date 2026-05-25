import { create } from "zustand";

interface AppStoreState {
    isAuthenticated: boolean;
    token: string | null;
    userInfo: any | null;
    assetUrl: string;
}

interface AppStoreAction {
    login: (token: string, userInfo: any | null) => void;
    logout: () => void;
    setUserInfo: (info?: any | null) => void;
    setAssetUrl: (url: string) => void;
}

export const useAppStore = create<AppStoreState & AppStoreAction>((set) => ({
    isAuthenticated: !!localStorage.getItem("token"),
    token: localStorage.getItem("token"),
    userInfo: null,
    assetUrl: "",
    login: (token: string, userInfo: any | null) => {
        localStorage.setItem("token", token);
        set({ isAuthenticated: true, userInfo });
    },
    logout: () => {
        localStorage.removeItem("token");
        set({
            isAuthenticated: false,
            userInfo: null
        });
    },
    setUserInfo: (newInfo?: any | null) => set({ userInfo: newInfo }),
    setAssetUrl: (url: string) => set({ assetUrl: url })
}));