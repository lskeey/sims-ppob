import MainLayout from "../layouts/MainLayout";
import HistoryTransaction from "../components/HistoryTransaction";
import DashboardHeader from "../components/DashboardHeader";

const Transaction = () => {
  return (
    <MainLayout>
        <DashboardHeader />

        <div>
          <h3 className="mb-4">Semua Transaksi</h3>
          <HistoryTransaction />
        </div>
    </MainLayout>
  )
}

export default Transaction