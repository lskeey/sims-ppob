"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useServicesStore } from "@/stores/serviceStore";
import { CircleAlert } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

export default function ServicesGrid() {
  const router = useRouter();
  const { services, fetchServices, loading, error } = useServicesStore();

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const handleServiceClick = useCallback(
    (serviceCode: string) => {
      router.push(`/transactions/payment?service_code=${serviceCode}`);
    },
    [router]
  );

  const handleRetry = () => {
    fetchServices();
  };

  if (loading || services === null) {
    return (
      <div className="grid grid-flow-col grid-rows-2 lg:grid-rows-1 gap-4 justify-between">
        {Array(12)
          .fill(null)
          .map((_, i) => (
            <div key={i} className="flex flex-col gap-2 w-12 items-center">
              <div className="w-full h-12 flex-none">
                <Skeleton className="w-full h-full bg-black/10" />
              </div>
              <Skeleton className="w-full h-2 bg-black/10" />
            </div>
          ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center px-8 py-6 text-center space-y-3">
        <CircleAlert strokeWidth={1.5} className="size-16" color="#fb2c36" />
        <p className="text-sm">
          Something went wrong. Couldn't load the service.
        </p>
        <button
          onClick={handleRetry}
          className="flex items-center gap-2 bg-red-500 text-background px-2 py-1 rounded-sm cursor-pointer hover:bg-red-600"
        >
          Retry
        </button>
      </div>
    );
  }

  if (services.length === 0) {
    return;
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
