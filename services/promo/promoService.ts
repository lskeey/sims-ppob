import { APIResponse } from "../../types/common";
import { apiFetch } from "../utils/apiClients";
import { BannerResponse } from "./types";

export async function getBanners(): Promise<APIResponse<BannerResponse>> {
  return apiFetch<BannerResponse>("/banner", { method: "GET" }, false);
}
