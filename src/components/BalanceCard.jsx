import { useState } from 'react';
import { FaCircle } from 'react-icons/fa';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';

const BalanceCard = ({ balance }) => {
  const [isHidden, setIsHidden] = useState(true);

  const toggleBalanceVisibility = () => {
    setIsHidden(!isHidden);
  };

  return (
    <div className="w-full flex flex-col justify-between p-4 rounded-xl text-white bg-red-600">
      <div className="text-sm">Saldo anda</div>
      <div className="text-2xl font-semibold flex items-center gap-2">
        <div>Rp</div>
        {isHidden ? (
          <div className="flex space-x-2 text-[8px]">
            {[...Array(7)].map((_, index) => (
              <FaCircle key={index} />
            ))}
          </div>
        ) : (
          balance && <div>{balance.toLocaleString('id-ID')}</div>
        )}
      </div>
      <button
        className="flex items-center gap-2 text-xs"
        onClick={toggleBalanceVisibility}
      >
        {isHidden ? 'Lihat Saldo' : 'Tutup Saldo'}
        {isHidden ? <IoEyeOutline /> : <IoEyeOffOutline />}
      </button>
    </div>
  );
};

export default BalanceCard;
