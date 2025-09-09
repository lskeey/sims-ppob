import { APIResponse } from "../../types/common";
import { apiFetch } from "../utils/apiClients";
import { updateProfileSchema } from "@/schemas";
import { ProfileResponse, UpdateProfileRequest } from "./types";

// Get user profile
export async function getProfile(): Promise<APIResponse<ProfileResponse>> {
  return apiFetch<ProfileResponse>("/profile", { method: "GET" }, true);
}

// Update user profile
export async function updateProfile(
  data: UpdateProfileRequest
): Promise<APIResponse<ProfileResponse>> {
  const validatedData = updateProfileSchema.parse(data);
  return apiFetch<ProfileResponse>(
    "/profile/update",
    {
      method: "PUT",
      body: JSON.stringify(validatedData),
    },
    true
  );
}
