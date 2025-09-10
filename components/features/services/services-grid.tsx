"use client";

import { useServicesStore } from "@/stores/serviceStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { ClipLoader } from "react-spinners";

export default function ServicesGrid() {
  const router = useRouter();
  const { services, fetchServices, loading, error } = useServicesStore();

  const handleServiceClick = useCallback(
    (serviceCode: string) => {
      router.push(`/transactions/payment?service_code=${serviceCode}`);
    },
    [router]
  );

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={32} color="#ef4444" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-6">
        <p className="text-red-500" aria-live="polite">
          {error}
        </p>
      </div>
    );
  }

  if (!services || services.length === 0) {
    return (
      <div className="text-center p-6">
        <p className="text-muted-foreground">No services available.</p>
      </div>
    );
  }
  return (
    <div className="grid grid-flow-col grid-rows-2 lg:grid-rows-1 gap-4 justify-between">
      {services.map((service, i) => (
        <div
          key={i}
          className="flex flex-col gap-2 w-12 items-center cursor-pointer"
          onClick={() => handleServiceClick(service.service_code)}
        >
          <div className="w-full h-12 flex-none">
            <Image
              src={service.service_icon}
              alt={service.service_name + "Icon"}
              width={500}
              height={500}
              className="object-cover object-center"
              priority
            />
          </div>
          <span className="flex-1 text-xs text-center">
            {service.service_name}
          </span>
        </div>
      ))}
    </div>
  );
}
