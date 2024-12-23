import MainLayout from "../layouts/MainLayout";
import Services from "../components/Services"
import Banners from "../components/Banners"
import DashboardHeader from "../components/DashboardHeader";


const Home = () => {  
  return (
    <MainLayout>
      <DashboardHeader />

      <Services />

      <h3 className='text-sm font-semibold mb-4'>Temukan promo menarik</h3>
      <Banners />
    </MainLayout>
  )
}

export default Home