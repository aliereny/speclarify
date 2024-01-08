import create from "zustand";
import { axiosClient } from "@/data/axiosClient";
import { persist } from "zustand/middleware";

interface AuthStore {
  accessToken: string | null;
  setToken: (token: string) => void;
  login: (username: string, password: string) => Promise<string>;
  logout: () => void;
}

export const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      accessToken: null,
      setToken: (token) => set({ accessToken: token }),
      login: async (username, password) => {
        try {
          const response = await axiosClient.post("/login", {
            username,
            password,
          });
          const { accessToken } = response.data;
          set({ accessToken });
          return accessToken;
        } catch (error: any) {
          throw new Error(
            error.response?.data?.message || "An error occurred during login.",
          );
        }
      },
      logout: () => set({ accessToken: null }),
    }),
    {
      name: "auth-storage",
    },
  ),
);
