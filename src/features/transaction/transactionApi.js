import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../api/client";

// Read Balance
export const fetchBalance = createAsyncThunk('transactions/fetchBalance', async () => {
  const response = await apiClient.get('/balance');
  return response.data;
});

// Read Transaction History
export const fetchTransactionHistory = createAsyncThunk(
  'transactions/fetchTransactionHistory',
  async ({ offset = 0, limit = 5 }) => {
    const response = await apiClient.get(`/transaction/history?offset=${offset}&limit=${limit}`);
    return response.data;
  }
);

// Top Up
export const topUp = createAsyncThunk(
  'transactions/topUp',
  async ({ top_up_amount }) => {
    const response = await apiClient.post('/topup', { top_up_amount });
    return response.data;
  }
);

// Service Transaction
export const serviceTransaction = createAsyncThunk(
  'transactions/serviceTransaction',
  async ({ service_code }) => {
    const response = await apiClient.post('/transaction', { service_code });
    return response.data;
  }
);
