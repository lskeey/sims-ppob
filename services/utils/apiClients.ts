import { APIResponse } from "@/types/common";
import Cookies from "js-cookie";

const BASE_URL = "https://take-home-test-api.nutech-integrasi.com";

function getAuthToken(): string | null {
  const cookieValue = Cookies.get("auth-token");

  if (cookieValue) {
    try {
      const authObject = JSON.parse(cookieValue);
      return authObject.state.token || null;
    } catch (error) {
      console.error("Failed to parse auth cookie:", error);
      return null;
    }
  }

  return null;
}

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
  requiresAuth: boolean = false
): Promise<APIResponse<T>> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (options.headers) {
    Object.assign(headers, options.headers);
  }

  if (requiresAuth) {
    const token = getAuthToken();
    if (!token) {
      throw new Error("No auth token found");
    }
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "API request failed");
  }

  return data as APIResponse<T>;
}
