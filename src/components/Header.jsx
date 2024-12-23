import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? 'text-red-500' : '';

  return (
    <div className="py-4 border-b">
      <div className="container max-w-5xl mx-auto flex justify-between items-center px-8">
        <a href="/" className='flex items-center space-x-2'>
          <img className='w-6' src='/assets/Logo.png' alt='Logo' />
          <div className='text-lg font-semibold'>SIMS PPOB</div>
        </a>
        <div className="text-sm space-x-8">
          <Link to="/topup" className={`font-semibold ${isActive('/topup')}`}>Top up</Link>
          <Link to="/transaction" className={`font-semibold ${isActive('/transaction')}`}>Transaksi</Link>
          <Link to="/profile" className={`font-semibold ${isActive('/profile')}`}>Akun</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
