import TransactionsList from "@/components/features/transactions/transaction-list";
import DashboardHeader from "@/components/layout/dashboard-header";

export default function Transactions() {
  return (
    <>
      <DashboardHeader />
      <TransactionsList />
    </>
  );
}
