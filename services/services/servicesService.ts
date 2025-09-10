import { APIResponse } from "../../types/common";
import { apiFetch } from "../utils/apiClients";
import { ServicesResponse } from "./types";

export async function getServices(): Promise<APIResponse<ServicesResponse>> {
  return apiFetch<ServicesResponse>("/services", { method: "GET" }, true);
}
