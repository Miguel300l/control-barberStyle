import { create } from "zustand";
import api from "../axios/axios";

interface AuthState {
    user: any;
    loading: boolean;

    login: (correo: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    loadUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({

    user: null,
    loading: false,

    login: async (correo, password) => {
        try {

            await api.post("/api/auth/signin", {
                correo,
                password
            });

            const res = await api.get("/api/auth/me");

            set({ user: res.data.user });

        } catch (error) {

            throw error;

        }
    },

    loadUser: async () => {

        try {

            const res = await api.get("/api/auth/me");

            set({ user: res.data.user });

        } catch {
            set({ user: null });
        }
    },

    logout: async () => {

        await api.post("/api/auth/logout");

        set({ user: null });
    }

}));