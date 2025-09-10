import { create } from "zustand";
import { topup } from "../services/topup/topupService";
import { APIResponse } from "../types/common";
import { TopupRequest, TopupResponse } from "../services/topup/types";
import { useAuthStore } from "./authStore";

interface TopupState {
  balance: number | null;
  loading: boolean;
  error: string | null;
  topup: (data: TopupRequest) => Promise<APIResponse<TopupResponse>>;
}

export const useTopupStore = create<TopupState>((set) => ({
  balance: null,
  loading: false,
  error: null,
  topup: async (data: TopupRequest) => {
    set({ loading: true, error: null });
    try {
      const response = await topup(data);
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
}));
