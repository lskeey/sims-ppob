import { transactions } from "@/data/transaction";
import TransactionsItem from "./transaction-item";

export default function TransactionsList() {
  return (
    <div className="space-y-3">
      <div>
        <h2 className="font-medium">Transaction History</h2>
      </div>
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <TransactionsItem
            key={transaction.invoice_number}
            transaction={transaction}
          />
        ))}
      </div>
    </div>
  );
}
