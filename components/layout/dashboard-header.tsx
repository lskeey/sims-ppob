import BalanceCard from "../features/profile/balance-card";
import ProfileCard from "../features/profile/profile-card";

export default function DashboardHeader() {
  return (
    <div className="flex flex-col gap-3 lg:flex-row">
      <div className="w-full lg:w-5/12">
        <ProfileCard />
      </div>
      <div className="w-full lg:w-7/12">
        <BalanceCard />
      </div>
    </div>
  );
}
