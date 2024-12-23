import { useEffect, useState } from 'react';
import { HiOutlineAtSymbol } from 'react-icons/hi';
import { FaRegUser, FaSpinner } from 'react-icons/fa6';
import { MdOutlineLock } from 'react-icons/md';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import { Link, redirect, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../features/auth/authApi';
import { FaExclamationTriangle } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const { loading, error } = useSelector((state) => state.auth)
  const dispatch = useDispatch();

  const {
    register,
    formState: { errors },
    setError,
    handleSubmit
  } = useForm();

  const navigate = useNavigate()

  const handleRegister = (data) => {
    if (data.password !== data.confirmPassword) {
      setError('confirmPassword', {
        message: 'Konfirmasi password tidak cocok',
      });
      return;
    }
    const { confirmPassword, ...submittedData } = data;


    dispatch(registerUser(submittedData))
    .unwrap()
    .then(() => {
      Swal.fire({
        text: "Registrasi berhasil!",
        icon: "success",
        confirmButtonColor: "#ef4444",
        confirmButtonText: "Kembali"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login');
        }
      });
    })
    .catch(() => {
      Swal.fire({
        text: "Registrasi gagal!",
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

          <form onSubmit={handleSubmit(handleRegister)} className='w-full'>
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

              {/* Nama Depan Input */}
              <div className='w-full'>
                <div className={`relative group ${errors.first_name ? 'text-red-500' : 'text-gray-400 group-focus-within:text-gray-700'}`}>
                  <span
                    className={`absolute inset-y-0 left-0 flex items-center pl-3 transition-colors duration-300 ${
                      errors.first_name ? 'text-red-500' : 'text-gray-400 group-focus-within:text-gray-700'
                    }`}
                  >
                    <FaRegUser />
                  </span>
                  <input
                    type='text'
                    className={`w-full bg-transparent placeholder:text-gray-400 text-sm border rounded-sm pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none hover:border-gray-400 shadow-sm focus:shadow-md mb-1 ${
                      errors.first_name ? 'border-red-500 text-red-500' : 'border-gray-200 text-gray-700 focus:border-gray-400'
                    }`}
                    placeholder='nama depan'
                    {...register('first_name', {
                      required: "Nama depan wajib diisi",
                    })}
                  />
                </div>
                {errors.first_name && <p className='text-xs text-red-500'>{errors.first_name.message}</p>}
              </div>

              {/* Nama Belakang Input */}
              <div className='w-full'>
                <div className={`relative group ${errors.last_name ? 'text-red-500' : 'text-gray-400 group-focus-within:text-gray-700'}`}>
                  <span
                    className={`absolute inset-y-0 left-0 flex items-center pl-3 transition-colors duration-300 ${
                      errors.last_name ? 'text-red-500' : 'text-gray-400 group-focus-within:text-gray-700'
                    }`}
                  >
                    <FaRegUser />
                  </span>
                  <input
                    type='text'
                    className={`w-full bg-transparent placeholder:text-gray-400 text-sm border rounded-sm pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none hover:border-gray-400 shadow-sm focus:shadow-md mb-1 ${
                      errors.last_name ? 'border-red-500 text-red-500' : 'border-gray-200 text-gray-700 focus:border-gray-400'
                    }`}
                    placeholder='nama belakang'
                    {...register('last_name', {
                      required: "Nama belakang wajib diisi",
                    })}
                  />
                </div>
                {errors.last_name && <p className='text-xs text-red-500'>{errors.last_name.message}</p>}
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

              {/* Konfirmasi Password Input */}
              <div className='w-full'>
                <div className={`relative group ${errors.confirmPassword ? 'text-red-500' : 'text-gray-400 group-focus-within:text-gray-700'}`}>
                  <span
                    className={`absolute inset-y-0 left-0 flex items-center pl-3 transition-colors duration-300 ${
                      errors.confirmPassword ? 'text-red-500' : 'text-gray-400 group-focus-within:text-gray-700'
                    }`}
                  >
                    <MdOutlineLock />
                  </span>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    className={`w-full bg-transparent placeholder:text-gray-400 text-sm border rounded-sm pl-10 pr-10 py-2 transition duration-300 ease focus:outline-none hover:border-gray-400 shadow-sm focus:shadow-md mb-1 ${
                      errors.confirmPassword ? 'border-red-500 text-red-500' : 'border-gray-200 text-gray-700 focus:border-gray-400'
                    }`}
                    placeholder='konfirmasi password'
                    {...register('confirmPassword', {
                      required: "Konfirmasi Password wajib diisi"
                    })}
                  />
                  <span
                    className={`absolute inset-y-0 right-0 flex items-center pr-3 transition-colors duration-300 cursor-pointer ${
                      errors.confirmPassword ? 'text-red-500' : 'text-gray-400 group-focus-within:text-gray-700'
                    }`}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                  </span>
                </div>
                {errors.confirmPassword && <p className='text-xs text-red-500'>{errors.confirmPassword.message}</p>}
              </div>
            </div>

            {error && (
            <div className='w-full flex items-center gap-2 border border-red-500 rounded-sm bg-red-100 text-red-500 text-xs p-3 mb-6'>
              <FaExclamationTriangle />
              {error}
            </div>
            )}

            {/* Register Button */}
            <button type='submit' disabled={loading} className='w-full py-2 rounded-sm text-sm text-white bg-red-500 hover:bg-red-700 transition-colors duration-300 mb-3'>
              Registrasi
            </button>

            <div className='text-center'>
              <span className='text-xs'>sudah punya akun? login <Link to='/login' className='font-semibold text-red-500 hover:underline'>di sini</Link></span>
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

export default Register;
