import { FaRegUser } from "react-icons/fa6";
import { HiOutlineAtSymbol } from "react-icons/hi";
import { MdEdit } from "react-icons/md";
import MainLayout from "../layouts/MainLayout";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, updateProfile } from "../features/profile/profileApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
import Swal from "sweetalert2";

const Profile = () => {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);

  const [data, setData] = useState({
    first_name: '',
    last_name: '',
  });
  
  useEffect(() => {
    if (user) {
      setData({
        first_name: user.firstName || '',
        last_name: user.lastName || '',
      });
    }
  }, [user]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogout = () => {
    Swal.fire({
      text: "Apakah anda yakin untuk Log Out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#d1d5db",
      confirmButtonText: "Ya, saya yakin",
      cancelButtonText: "Batal"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logout());
        navigate("/login");
      }
    });
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    dispatch(updateProfile(data))
    .unwrap()
    .then(() => {
      Swal.fire({
        text: "Update profile berhasil!",
        icon: "success",
        confirmButtonColor: "#ef4444",
        confirmButtonText: "Kembali"
      });
      setIsEditing(false)
    })
    .catch(() => {
      Swal.fire({
        text: "Update profile gagal!",
        icon: "error",
        confirmButtonColor: "#ef4444",
        confirmButtonText: "Kembali"
      });
    });
  };

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto">
        <div className="flex flex-col items-center py-8">
          <div className="flex flex-col items-center space-y-4 mb-8">
            <div className="relative">
              <div className="w-24 aspect-square rounded-full overflow-hidden border">
                <img
                  className="w-full h-full object-cover"
                  src="/assets/Profile Photo.png"
                  alt="Profile Photo"
                />
              </div>
              {/* <button className="absolute -right-1 -bottom-1 bg-white border rounded-full p-1">
                <MdEdit />
              </button> */}
            </div>
            <div className="text-2xl font-semibold">{user.firstName} {user.lastName}</div>
          </div>
          <div className="w-full">
            <div className="w-full space-y-4 mb-8">
              <div className="w-full">
                <label className="block text-xs font-medium text-gray-700 mb-2">Email</label>
                <div className="relative group">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 group-focus-within:text-gray-700 transition-colors duration-300">
                    <HiOutlineAtSymbol />
                  </span>
                  <input
                    type="text"
                    className="w-full bg-transparent placeholder:text-gray-400 text-gray-700 text-xs border border-gray-200 rounded-sm pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-gray-400 shadow-sm focus:shadow-md"
                    placeholder="masukan email anda"
                    disabled
                    value={user.email}
                  />
                </div>
              </div>
              <div className="w-full">
                <label className="block text-xs font-medium text-gray-700 mb-2">Nama Depan</label>
                <div className="relative group">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 group-focus-within:text-gray-700 transition-colors duration-300">
                    <FaRegUser />
                  </span>
                  <input
                    type="text"
                    className="w-full bg-transparent placeholder:text-gray-400 text-gray-700 text-xs border border-gray-200 rounded-sm pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-gray-400 hover:border-gray-400 shadow-sm focus:shadow-md"
                    placeholder="nama depan"
                    name="first_name"
                    defaultValue={user.firstName}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div className="w-full">
                <label className="block text-xs font-medium text-gray-700 mb-2">Nama Belakang</label>
                <div className="relative group">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 group-focus-within:text-gray-700 transition-colors duration-300">
                    <FaRegUser />
                  </span>
                  <input
                    type="text"
                    className="w-full bg-transparent placeholder:text-gray-400 text-gray-700 text-xs border border-gray-200 rounded-sm pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-gray-400 hover:border-gray-400 shadow-sm focus:shadow-md"
                    placeholder="nama belakang"
                    name="last_name"
                    defaultValue={user.lastName }
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              {isEditing ? (
                <button
                  className="w-full py-3 rounded-sm text-xs text-white bg-red-500"
                  onClick={handleSave}
                >
                  Simpan
                </button>
              ) : (
                <>
                  <button
                    className="w-full py-3 rounded-sm text-xs text-red-500 border border-red-500"
                    onClick={handleEdit}
                  >
                    Edit Profile
                  </button>
                  <button
                    className="w-full py-3 rounded-sm text-xs text-white bg-red-500"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
