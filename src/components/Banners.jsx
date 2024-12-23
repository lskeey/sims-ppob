import { useEffect, useState } from "react";
import apiClient from "../api/client";

const RowBanners = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBanners = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get('/banner');
      setBanners(response.data.data);
    } catch (err) {
      setError('Failed to fetch banners');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  return (
    <div className="flex space-x-6 whitespace-nowrap overflow-x-scroll scrollbar-hide">
      {banners.map((banner, index) => (
        <img
          key={index}
          src={banner.banner_image}
          alt={banner.banner_name || `Banner ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default RowBanners;
