import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { userToken } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = userToken || localStorage.getItem('userToken');
    if (!token) {
      navigate('/login');
    }
  }, [userToken, navigate]);

  return <Outlet />;
};

export default ProtectedRoute;
