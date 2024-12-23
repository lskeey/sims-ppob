import { useEffect, useState } from "react";
import apiClient from "../api/client";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get('/services');
      setServices(response.data.data);
    } catch (err) {
      setError('Failed to fetch services');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const navigate = useNavigate();

  const handleServiceClick = (service) => {
    navigate('/payment', { state: service });
  };
  

  return (
    <div className='flex space-x-8 mb-12 whitespace-nowrap overflow-x-scroll scrollbar-hide'>
      {services.map((service, index) => (
        <div
          key={index}
          className='w-12 flex flex-col items-center text-center space-y-2 whitespace-normal cursor-pointer'
          onClick={() => handleServiceClick(service)}
        >
          <div className="w-12">
            <img src={service.service_icon} alt={`${service.service_name} Icon`} />
          </div>
          <span className='text-[10px]'>{service.service_name}</span>
        </div>
      ))}
    </div>
  )
}

export default Services