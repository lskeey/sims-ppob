import { create } from "zustand";
import { APIResponse } from "../types/common";
import { useAuthStore } from "./authStore";
import { BalanceResponse } from "@/services/profile/types";
import { getBalance } from "@/services/profile/profileService";

interface BalanceState {
  balance: number | null;
  loading: boolean;
  error: string | null;
  fetchBalance: () => Promise<APIResponse<BalanceResponse>>;
  setBalance: (balance: number) => void;
}

export const useBalanceStore = create<BalanceState>((set) => ({
  balance: null,
  loading: false,
  error: null,
  fetchBalance: async () => {
    set({ loading: true, error: null });
    try {
      const response = await getBalance();
      set({ balance: response.data.balance });
      return response;
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message.includes("401")
            ? "Unauthorized access. Please log in again."
            : err.message
          : "Unknown error";
      set({ error: errorMessage });
      if (err instanceof Error && err.message.includes("401")) {
        useAuthStore.getState().logout();
      }
      throw err;
    } finally {
      set({ loading: false });
    }
  },
  setBalance: (newBalance) => set({ balance: newBalance }),
}));
