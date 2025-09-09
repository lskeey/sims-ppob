import { Transaction } from "@/data/transaction";
import { formatDateToWIB, formatRupiah } from "@/lib/utils";

interface TransactionsItemProps {
  transaction: Transaction;
}

export default function TransactionsItem({
  transaction,
}: TransactionsItemProps) {
  const { total_amount, created_on, description, transaction_type } =
    transaction;
  const amountColorClass =
    transaction_type === "TOPUP" ? "text-emerald-400" : "text-red-400";
  const amountSign = transaction_type === "TOPUP" ? "+" : "-";
  return (
    <div className="flex min-w-72 justify-between p-3 gap-2 border rounded-sm">
      <div>
        <div className="flex flex-col justify-between gap-1.5">
          <span
            className={`text-md lg:text-lg font-semibold ${amountColorClass}`}
          >
            {amountSign + " "}
            {formatRupiah(total_amount)}
          </span>
          <span className="text-xs text-black/40">
            {formatDateToWIB(created_on)}
          </span>
        </div>
      </div>
      <div className="text-end">
        <span className="text-xs text-black/95">{description}</span>
      </div>
    </div>
  );
}
