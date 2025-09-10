import { z } from "zod";
import { APIResponse } from "../../types/common";
import {
  TransactionHistoryResponse,
  TransactionRequest,
  TransactionResponse,
} from "./types";
import { apiFetch } from "../utils/apiClients";

const transactionSchema = z.object({
  service_code: z.string().min(1, "Service code is required"),
});

export async function transaction(
  data: TransactionRequest
): Promise<APIResponse<TransactionResponse>> {
  const validatedData = transactionSchema.parse(data);
  return apiFetch<TransactionResponse>(
    "/transaction",
    {
      method: "POST",
      body: JSON.stringify(validatedData),
    },
    true
  );
}

export async function getTransactionHistory(
  offset: number = 0,
  limit: number = 10
): Promise<APIResponse<TransactionHistoryResponse>> {
  return apiFetch<TransactionHistoryResponse>(
    `/transaction/history?offset=${offset}&limit=${limit}`,
    {
      method: "GET",
    },
    true
  );
}
