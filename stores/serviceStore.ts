import { create } from "zustand";
import { getServices } from "../services/services/servicesService";
import { APIResponse } from "../types/common";
import { ServicesResponse } from "../services/services/types";

interface ServicesState {
  services: ServicesResponse | null;
  loading: boolean;
  error: string | null;
  fetchServices: () => Promise<APIResponse<ServicesResponse>>;
}

export const useServicesStore = create<ServicesState>((set) => ({
  services: null,
  loading: false,
  error: null,
  fetchServices: async () => {
    set({ loading: true, error: null });
    try {
      const response = await getServices();
      set({ services: response.data });
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      set({ error: errorMessage });
      throw err;
    } finally {
      set({ loading: false });
    }
  },
}));
