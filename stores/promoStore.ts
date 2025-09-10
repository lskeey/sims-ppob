import { create } from "zustand";
import { APIResponse } from "../types/common";
import { BannerResponse } from "@/services/promo/types";
import { getBanners } from "@/services/promo/promoService";

interface BannerState {
  banners: BannerResponse | null;
  loading: boolean;
  error: string | null;
  fetchBanners: () => Promise<APIResponse<BannerResponse>>;
}

export const useBannerStore = create<BannerState>((set) => ({
  banners: null,
  loading: false,
  error: null,
  fetchBanners: async () => {
    set({ loading: true, error: null });
    try {
      const response = await getBanners();
      set({ banners: response.data });
      return response;
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message.includes("Network")
            ? "Failed to connect to server. Please try again."
            : err.message
          : "Unknown error";
      set({ error: errorMessage });
      throw err;
    } finally {
      set({ loading: false });
    }
  },
}));
