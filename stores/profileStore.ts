import { create } from "zustand";
import { getProfile, updateProfile } from "../services/profile/profileService";
import { APIResponse } from "../types/common";
import {
  ProfileResponse,
  UpdateProfileRequest,
} from "../services/profile/types";

interface ProfileState {
  profile: ProfileResponse | null;
  loading: boolean;
  error: string | null;
  fetchProfile: () => Promise<APIResponse<ProfileResponse>>;
  updateProfile: (
    data: UpdateProfileRequest
  ) => Promise<APIResponse<ProfileResponse>>;
}

export const useProfileStore = create<ProfileState>((set) => ({
  profile: null,
  loading: false,
  error: null,
  fetchProfile: async () => {
    set({ loading: true, error: null });
    try {
      const response = await getProfile();
      set({ profile: response.data });
      return response;
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message.includes("401")
            ? "Unauthorized access. Please log in again."
            : err.message
          : "Unknown error";
      set({ error: errorMessage });
      throw err;
    } finally {
      set({ loading: false });
    }
  },
  updateProfile: async (data: UpdateProfileRequest) => {
    set({ loading: true, error: null });
    try {
      const response = await updateProfile(data);
      set({ profile: response.data });
      return response;
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message.includes("401")
            ? "Unauthorized access. Please log in again."
            : err.message
          : "Unknown error";
      set({ error: errorMessage });
      throw err;
    } finally {
      set({ loading: false });
    }
  },
}));
