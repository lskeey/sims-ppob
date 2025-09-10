import { z } from "zod";
import { APIResponse } from "../../types/common";
import { TopupRequest, TopupResponse } from "./types";
import { apiFetch } from "../utils/apiClients";

const topupSchema = z.object({
  top_up_amount: z
    .number()
    .min(10000, "Amount must be at least 10,000")
    .max(1000000, "Amount cannot exceed 1,000,000")
    .multipleOf(10000, "Amount must be a multiple of 10,000"),
});

export async function topup(
  data: TopupRequest
): Promise<APIResponse<TopupResponse>> {
  const validatedData = topupSchema.parse(data);
  return apiFetch<TopupResponse>(
    "/topup",
    {
      method: "POST",
      body: JSON.stringify(validatedData),
    },
    true
  );
}
