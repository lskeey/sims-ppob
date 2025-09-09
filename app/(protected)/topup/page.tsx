"use client";

import TopUpForm from "@/components/features/topup/topup-form";
import DashboardHeader from "@/components/layout/dashboard-header";

export default function TopUp() {
  return (
    <>
      <DashboardHeader />
      <TopUpForm onSubmit={(amount) => console.log(`Top up: ${amount}`)} />
    </>
  );
}
