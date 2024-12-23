import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../features/profile/profileApi";
import BalanceCard from "./BalanceCard";
import { fetchBalance } from "../features/transaction/transactionApi";

const DashboardHeader = () => {
  const { user } = useSelector((state) => state.profile);
  const { balance } = useSelector((state) => state.transaction);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchBalance());
  }, []); 

  return (
    <div className='flex mb-12'>
      <div className='w-full'>
        <div className="w-12 aspect-square rounded-full overflow-hidden border mb-2">
          <img
            className="w-full h-full object-cover"
            src="./public/assets/Profile Photo.png"
            alt="Profile Photo"
          />
        </div>
        <div>
          <div>Selamat datang,</div>
          <div className='text-2xl font-semibold'>{user.firstName} {user.lastName}</div>
        </div>
      </div>
      <BalanceCard balance={balance} />
    </div>
  )
}

export default DashboardHeader