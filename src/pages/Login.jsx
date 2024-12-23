import { useEffect, useState } from 'react';
import { HiOutlineAtSymbol, HiOutlineExclamation } from 'react-icons/hi';
import { MdOutlineLock } from 'react-icons/md';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/auth/authApi';
import { FaExclamationTriangle } from 'react-icons/fa';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { loading, userInfo, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm();

  // redirect authenticated user to home screen
  useEffect(() => {
    if (userInfo) {
      navigate('/')
    }
  }, [navigate, userInfo])
  
  const submitForm = (data) => {
    dispatch(loginUser(data))
    .unwrap()
    .then(() => {
      navigate("/")
    })
    .catch(() => {
      Swal.fire({
        text: "Login gagal!",
        icon: "error",
        confirmButtonColor: "#ef4444",
        confirmButtonText: "Kembali"
      });
    });
  };

  return (
    <div className='flex h-screen'>
      <div className='w-full flex justify-center'>
        <div className='flex flex-col justify-center items-center space-y-6'>

          <div className='flex items-center space-x-2'>
            <img className='w-6' src='/assets/Logo.png' alt='Logo' />
            <div className='text-lg font-semibold'>SIMS PPOB</div>
          </div>
          <div className='w-2/3 text-center text-xl font-semibold'>Lengkapi data untuk membuat akun</div>

          <form onSubmit={handleSubmit(submitForm)} className='w-full'>
            <div className='space-y-3 mb-6'>
              {/* Email Input */}
              <div className='w-full'>
                <div className={`relative group ${errors.email ? 'text-red-500' : 'text-gray-400 group-focus-within:text-gray-700'}`}>
                  <span
                    className={`absolute inset-y-0 left-0 flex items-center pl-3 transition-colors duration-300 ${
                      errors.email ? 'text-red-500' : 'text-gray-400 group-focus-within:text-gray-700'
                    }`}
                  >
                    <HiOutlineAtSymbol />
                  </span>
                  <input
                    type='email'
                    className={`w-full bg-transparent placeholder:text-gray-400 text-sm border rounded-sm pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none hover:border-gray-400 shadow-sm focus:shadow-md mb-1 ${
                      errors.email ? 'border-red-500 text-red-500' : 'border-gray-200 text-gray-700 focus:border-gray-400'
                    }`}
                    placeholder='masukan email anda'
                    {...register('email', {
                      required: "Email wajib diisi",
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Format email tidak valid",
                      },
                    })}
                  />
                </div>
                {errors.email && <p className='text-xs text-red-500'>{errors.email.message}</p>}
              </div>

              {/* Password Input */}
              <div className='w-full'>
                <div className={`relative group ${errors.password ? 'text-red-500' : 'text-gray-400 group-focus-within:text-gray-700'}`}>
                  <span
                    className={`absolute inset-y-0 left-0 flex items-center pl-3 transition-colors duration-300 ${
                      errors.password ? 'text-red-500' : 'text-gray-400 group-focus-within:text-gray-700'
                    }`}
                  >
                    <MdOutlineLock />
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className={`w-full bg-transparent placeholder:text-gray-400 text-sm border rounded-sm pl-10 pr-10 py-2 transition duration-300 ease focus:outline-none hover:border-gray-400 shadow-sm focus:shadow-md mb-1 ${
                      errors.password ? 'border-red-500 text-red-500' : 'border-gray-200 text-gray-700 focus:border-gray-400'
                    }`}
                    placeholder='buat password'
                    {...register('password', {
                      required: "Password wajib diisi",
                      minLength: {
                        value: 8,
                        message: "Password minimal 8 karakter",
                      },
                    })}
                  />
                  <span
                    className={`absolute inset-y-0 right-0 flex items-center pr-3 transition-colors duration-300 cursor-pointer ${
                      errors.password ? 'text-red-500' : 'text-gray-400 group-focus-within:text-gray-700'
                    }`}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                  </span>
                </div>
                {errors.password && <p className='text-xs text-red-500'>{errors.password.message}</p>}
              </div>
            </div>

            {error && (
            <div className='w-full flex items-center gap-2 border border-red-500 rounded-sm bg-red-100 text-red-500 text-xs p-3 mb-6'>
              <FaExclamationTriangle />
              {error}
            </div>
            )}

            {/* Login Button */}
            <button type='submit' disabled={loading} className='w-full py-2 rounded-sm text-sm text-white bg-red-500 hover:bg-red-700 transition-colors duration-300 mb-3'>
              Masuk
            </button>

            <div className='text-center'>
              <span className='text-xs'>belum punya akun? registrasi <Link to='/register' className='font-semibold text-red-500 hover:underline'>di sini</Link></span>
            </div>
          </form>
        </div>
      </div>
      <div className='w-full'>
        <img className='w-full h-full object-cover' src='/assets/Illustrasi Login.png' alt='Illustrasi Login' />
      </div>
    </div>
  );
};

export default Login;
