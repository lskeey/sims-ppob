import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { login, register } from "../services/auth/authService";
import { APIResponse } from "../types/common";
import Cookies from "js-cookie";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "../services/auth/types";

const cookieStorage = {
  getItem: (name: string) => {
    const value = Cookies.get(name);
    return value ? JSON.parse(value) : null;
  },
  setItem: (name: string, value: string) => {
    Cookies.set(name, value, { expires: 7 });
  },
  removeItem: (name: string) => {
    Cookies.remove(name);
  },
};

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (data: LoginRequest) => Promise<APIResponse<LoginResponse>>;
  register: (data: RegisterRequest) => Promise<APIResponse<RegisterResponse>>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      isAuthenticated: false,
      loading: false,
      error: null,
      login: async (data: LoginRequest) => {
        set({ loading: true, error: null });
        try {
          const response = await login(data);
          set({ token: response.data.token, isAuthenticated: true });
          return response;
        } catch (err) {
          const errorMessage =
            err instanceof Error
              ? err.message.includes("Username atau password salah")
                ? "Invalid email or password"
                : err.message
              : "Unknown error";
          set({ error: errorMessage });
          throw new Error(errorMessage);
        } finally {
          set({ loading: false });
        }
      },
      register: async (data: RegisterRequest) => {
        set({ loading: true, error: null });
        try {
          const response = await register(data);
          return response;
        } catch (err) {
          const errorMessage =
            err instanceof Error
              ? err.message.includes("Email sudah terdaftar")
                ? "Email is already registered"
                : err.message
              : "Unknown error";
          set({ error: errorMessage });
          throw new Error(errorMessage);
        } finally {
          set({ loading: false });
        }
      },
      logout: () => {
        set({ token: null, isAuthenticated: false, error: null });
        Cookies.remove("auth-token");
      },
    }),
    {
      name: "auth-token",
      storage: createJSONStorage(() => cookieStorage),
    }
  )
);
