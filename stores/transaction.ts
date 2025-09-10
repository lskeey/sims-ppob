import { create } from "zustand";
import {
  getTransactionHistory,
  transaction,
} from "../services/transaction/transactionService";
import { APIResponse } from "../types/common";
import {
  TransactionHistoryResponse,
  TransactionRequest,
  TransactionResponse,
} from "../services/transaction/types";
import { useAuthStore } from "./authStore";

interface TransactionState {
  transaction: TransactionResponse | null;
  loading: boolean;
  error: string | null;
  makeTransaction: (
    data: TransactionRequest
  ) => Promise<APIResponse<TransactionResponse>>;
}

export const useTransactionStore = create<TransactionState>((set) => ({
  transaction: null,
  loading: false,
  error: null,
  makeTransaction: async (data: TransactionRequest) => {
    set({ loading: true, error: null });
    try {
      const response = await transaction(data);
      set({ transaction: response.data });
      return response;
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message.includes("401")
            ? "Unauthorized access. Please log in again."
            : err.message
          : "Unknown error";
      set({ error: errorMessage });
      if (err instanceof Error && err.message.includes("401")) {
        useAuthStore.getState().logout();
      }
      throw err;
    } finally {
      set({ loading: false });
    }
  },
}));

interface HistoryState {
  history: TransactionHistoryResponse | null;
  loading: boolean;
  error: string | null;
  fetchHistory: (
    offset?: number,
    limit?: number
  ) => Promise<APIResponse<TransactionHistoryResponse>>;
}

export const useHistoryStore = create<HistoryState>((set) => ({
  history: null,
  loading: false,
  error: null,
  fetchHistory: async (offset = 0, limit = 10) => {
    set({ loading: true, error: null });
    try {
      const response = await getTransactionHistory(offset, limit);
      set({ history: response.data });
      return response;
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message.includes("401")
            ? "Unauthorized access. Please log in again."
            : err.message
          : "Unknown error";
      set({ error: errorMessage });
      if (err instanceof Error && err.message.includes("401")) {
        useAuthStore.getState().logout();
      }
      throw err;
    } finally {
      set({ loading: false });
    }
  },
}));
