import { MdMoney } from "react-icons/md";
import MainLayout from "../layouts/MainLayout";
import DashboardHeader from '../components/DashboardHeader';
import { useState } from 'react';
import { formatRupiah } from "../utils";
import { useDispatch } from "react-redux";
import { topUp } from "../features/transaction/transactionApi";
import Swal from "sweetalert2";

const Topup = () => {
  const [nominal, setNominal] = useState('');
  const dispatch = useDispatch();

  const handleNominalClick = (value) => {
    setNominal(value);
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const cleanedValue = inputValue.replace(/[^\d]/g, '');
    setNominal(cleanedValue);
  };

  const handleTopUp = () => {
    Swal.fire({
      text: `Anda yakin untuk Top Up sebesar ${formatRupiah(nominal)}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#d1d5db",
      confirmButtonText: "Ya, lanjutkan Top Up",
      cancelButtonText: "Batalkan"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(topUp({ top_up_amount: parseInt(nominal) }))
        .unwrap()
        .then(() => {
          Swal.fire({
            text: "Top up berhasil!",
            icon: "success",
            confirmButtonColor: "#ef4444",
            confirmButtonText: "Kembali"
          });
        })
        .catch(() => {
          Swal.fire({
            text: "Top up gagal!",
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
          <div>Silahkan masukan</div>
          <div className='text-2xl font-semibold'>Nominal Top Up</div>
        </div>

        <div className="flex space-x-4">
          <div className="w-2/3 space-y-4">
            <div className='w-full'>
              <div className='relative group'>
                <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 group-focus-within:text-gray-700 transition-colors duration-300'>
                  <MdMoney />
                </span>
                <input
                  type='text'
                  value={nominal ? formatRupiah(nominal) : ''}
                  onChange={handleInputChange}
                  className='w-full bg-transparent placeholder:text-gray-400 text-gray-700 text-sm border border-gray-200 rounded-sm pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-gray-400 hover:border-gray-400 shadow-sm focus:shadow-md'
                  placeholder='Masukkan nominal Top Up'
                />
              </div>
            </div>
            <button
              className={`w-full py-2 rounded-sm text-sm text-white ${nominal ? 'bg-red-500' : 'bg-gray-300'}`}
              onClick={handleTopUp}
              disabled={!nominal}
            >
              Top Up
            </button>
          </div>
          <div className="w-1/3 grid grid-cols-3 gap-x-2 gap-y-4 text-xs text-center">
            <div
              className="p-2 border rounded cursor-pointer"
              onClick={() => handleNominalClick('10000')}
            >
              Rp 10.000
            </div>
            <div
              className="p-2 border rounded cursor-pointer"
              onClick={() => handleNominalClick('20000')}
            >
              Rp 20.000
            </div>
            <div
              className="p-2 border rounded cursor-pointer"
              onClick={() => handleNominalClick('50000')}
            >
              Rp 50.000
            </div>
            <div
              className="p-2 border rounded cursor-pointer"
              onClick={() => handleNominalClick('100000')}
            >
              Rp 100.000
            </div>
            <div
              className="p-2 border rounded cursor-pointer"
              onClick={() => handleNominalClick('250000')}
            >
              Rp 250.000
            </div>
            <div
              className="p-2 border rounded cursor-pointer"
              onClick={() => handleNominalClick('500000')}
            >
              Rp 500.000
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Topup;
