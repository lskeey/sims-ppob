import { MdMoney } from "react-icons/md";
import MainLayout from "../layouts/MainLayout"
import DashboardHeader from "../components/DashboardHeader"
import { useLocation } from "react-router-dom";
import { formatRupiah } from "../utils/index"
import { useDispatch } from "react-redux";
import { serviceTransaction } from "../features/transaction/transactionApi";
import Swal from "sweetalert2";


const Pembayaran = () => {
  const location = useLocation();
  const service = location.state;
  const dispatch = useDispatch();

  const handlePayment = () => {
    Swal.fire({
      text: `Bayar ${service.service_name} senilai ${formatRupiah(service.service_tariff)}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#d1d5db",
      confirmButtonText: "Ya, lanjutkan Bayar",
      cancelButtonText: "Batalkan"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(serviceTransaction({ service_code: service.service_code }))
        .unwrap()
        .then(() => {
          Swal.fire({
            text: "Pembayaran berhasil!",
            icon: "success",
            confirmButtonColor: "#ef4444",
            confirmButtonText: "Kembali"
          });
        })
        .catch(() => {
          Swal.fire({
            text: "Pembayaran gagal!",
            icon: "error",
            confirmButtonColor: "#ef4444",
            confirmButtonText: "Kembali"
          });
        });
      }
    });
  };

  return (
    <MainLayout>
      <DashboardHeader />
      
      <div>
        <div className="mb-12">
          <div>Pembayaran</div>
          <div className='flex items-center space-x-2'>
            <div className='w-8'>
              <img src={service.service_icon} alt="Listrik icon" />
            </div>
            <div className='font-semibold'>{service.service_name}</div>
          </div>
        </div>

        <div className="w-full space-y-4">
          <div className='w-full'>
            <div className='relative group'>
              <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 group-focus-within:text-gray-700 transition-colors duration-300'>
                <MdMoney />
              </span>
              <input
                type='text'
                className='w-full bg-transparent placeholder:text-gray-400 text-gray-700 text-sm border border-gray-200 rounded-sm pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-gray-400 hover:border-gray-400 shadow-sm focus:shadow-md'
                placeholder='masukan nominal Top Up'
                value={formatRupiah(service.service_tariff)}
                disabled
              />
            </div>
          </div>
          <button
            className="w-full py-2 rounded-sm text-sm text-white bg-red-600"
            onClick={handlePayment}
          >
            Bayar
          </button>
        </div>
      </div>
    </MainLayout>
  )
}

export default Pembayaran