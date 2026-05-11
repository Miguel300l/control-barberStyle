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
    loading: true,

    login: async (correo, password) => {
        set({ loading: true });

        try {
            await api.post(
                "/api/auth/signin",
                { correo, password },
                { withCredentials: true }
            );

            const res = await api.get("/api/auth/me", {
                withCredentials: true
            });

            set({
                user: res.data.user,
                loading: false
            });

        } catch (error) {
            set({
                user: null,
                loading: false
            });
            throw error;
        }
    },

    loadUser: async () => {
        set({ loading: true });

        try {
            const res = await api.get("/api/auth/me", {
                withCredentials: true
            });

            set({
                user: res.data.user,
                loading: false
            });

        } catch (error: any) {

            if (error.response?.status !== 401) {
                console.error("Error en loadUser:", error);
            }

            set({
                user: null,
                loading: false
            });
        }
    },

    logout: async () => {
        try {
            await api.post(
                "/api/auth/logout",
                {},
                { withCredentials: true }
            );

            set({ user: null });

        } catch (error) {
            console.log(error);
        }
    }

}));