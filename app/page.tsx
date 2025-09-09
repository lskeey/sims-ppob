import PromosCarousel from "@/components/features/promos/promos-carousel";
import ServicesGrid from "@/components/features/services/services-grid";
import DashboardHeader from "@/components/layout/dashboard-header";
import Header from "@/components/layout/header";

export default function Home() {
  return (
    <div className="font-sans h-screen">
      <Header />
      <main className="container max-w-2xl lg:max-w-4xl mx-auto px-3 space-y-8 pt-22">
        <DashboardHeader />
        <div className="overflow-x-auto">
          <ServicesGrid />
        </div>
        <div>
          <PromosCarousel />
        </div>
      </main>
    </div>
  );
}
