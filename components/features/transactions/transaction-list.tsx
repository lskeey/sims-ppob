"use client";

import { transactions } from "@/data/transaction";
import TransactionsItem from "./transaction-item";
import { useHistoryStore } from "@/stores/transaction";
import { useCallback, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { useRouter } from "next/navigation";

export default function TransactionsList() {
  const router = useRouter();
  const { history, fetchHistory, loading, error } = useHistoryStore();

  const loadHistory = useCallback(() => {
    fetchHistory();
  }, [fetchHistory]);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={32} color="#ef4444" />
      </div>
    );
  }

  if (error) {
    if (error.includes("401")) {
      router.push("/auth/login");
    }
    return (
      <div className="text-center p-6">
        <p className="text-red-500" aria-live="polite">
          {error}
        </p>
      </div>
    );
  }

  if (!history || history.records.length === 0) {
    return (
      <div className="text-center p-6">
        <p className="text-muted-foreground">
          No transaction history available.
        </p>
      </div>
    );
  }
  return (
    <div className="space-y-3">
      <div>
        <h2 className="font-medium">Transaction History</h2>
      </div>
      <div className="space-y-4">
        {history.records.map((transaction) => (
          <TransactionsItem
            key={transaction.invoice_number}
            transaction={transaction}
          />
        ))}
      </div>
    </div>
  );
}
