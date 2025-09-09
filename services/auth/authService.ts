import { APIResponse } from "../../types/common";
import {
  RegisterRequest,
  RegisterResponse,
  LoginRequest,
  LoginResponse,
} from "./types";
import { apiFetch } from "../utils/apiClients";
import { loginSchema, registerSchema } from "@/schemas";

export async function register(
  data: RegisterRequest
): Promise<APIResponse<RegisterResponse>> {
  const validatedData = registerSchema.parse(data);
  return apiFetch<RegisterResponse>(
    "/registration",
    {
      method: "POST",
      body: JSON.stringify(validatedData),
    },
    false
  );
}

export async function login(
  data: LoginRequest
): Promise<APIResponse<LoginResponse>> {
  const validatedData = loginSchema.parse(data);
  return apiFetch<LoginResponse>(
    "/login",
    {
      method: "POST",
      body: JSON.stringify(validatedData),
    },
    false
  );
}
