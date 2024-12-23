// transactionSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchBalance, fetchTransactionHistory, serviceTransaction, topUp } from "./transactionApi";

const initialState = {
  balance: null,
  history: [],
  status: 'idle',
  error: null,
};

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetchBalance
      .addCase(fetchBalance.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.balance = action.payload.data.balance;
      })
      .addCase(fetchBalance.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Handle fetchTransactionHistory
      .addCase(fetchTransactionHistory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTransactionHistory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.history = action.payload.data.records;
      })
      .addCase(fetchTransactionHistory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Handle topUp
      .addCase(topUp.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(topUp.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.balance = action.payload.data.balance;
      })
      .addCase(topUp.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Handle serviceTransaction
      .addCase(serviceTransaction.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(serviceTransaction.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.balance -= action.payload.data.total_amount;
        state.history = [action.payload.data.transaction, ...state.history];
      })
      .addCase(serviceTransaction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default transactionSlice.reducer;
