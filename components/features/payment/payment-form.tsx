"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatNumber } from "@/lib/utils";
import { TransactionRequest } from "@/services/transaction/types";
import { useServicesStore } from "@/stores/serviceStore";
import { useTransactionStore } from "@/stores/transaction";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

export default function PaymentForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    services,
    fetchServices,
    loading: servicesLoading,
    error: servicesError,
  } = useServicesStore();
  const {
    makeTransaction,
    loading: transactionLoading,
    error: transactionError,
  } = useTransactionStore();

  const [formError, setFormError] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<{
    service_name: string;
    service_tariff: number;
    service_icon: string;
    service_code: string;
  } | null>(null);

  const serviceCodeFromQuery = searchParams.get("service_code") || "";

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  useEffect(() => {
    if (services && serviceCodeFromQuery) {
      const service = services.find(
        (s) => s.service_code === serviceCodeFromQuery
      );
      setSelectedService(service || null);
      if (!service) {
        setFormError("Invalid service code.");
      } else {
        setFormError(null);
      }
    } else if (!serviceCodeFromQuery) {
      setFormError("Service code not found in URL.");
      setSelectedService(null);
    }
  }, [services, serviceCodeFromQuery]);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setFormError(null);

      if (!selectedService) {
        setFormError("Invalid service selected. Please try again.");
        return;
      }

      const transactionData: TransactionRequest = {
        service_code: selectedService.service_code,
      };

      try {
        await makeTransaction(transactionData);
      } catch (err) {
        let errorMessage = "An unexpected error occurred. Please try again.";
        if (err instanceof Error) {
          errorMessage = err.message;
        }

        if (errorMessage.includes("401")) {
          setFormError("Unauthorized access. Please log in again.");
          router.push("/auth/login");
        } else {
          setFormError(errorMessage);
        }
      }
    },
    [makeTransaction, router, selectedService]
  );

  const currentError = servicesError || transactionError || formError;

  if (servicesLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={32} color="#ef4444" aria-label="Loading Services" />
      </div>
    );
  }

  if (currentError) {
    return (
      <div className="text-center p-6" role="alert" aria-live="assertive">
        <p className="text-red-500">{currentError}</p>
      </div>
    );
  }

  if (!selectedService) {
    return (
      <div className="text-center p-6">
        <p className="text-gray-600">
          No service selected. Please go back and choose a service.
        </p>
      </div>
    );
  }

  return (
    <div className="min-w-max space-y-10">
      <div>
        <h2 className="text-sm lg:text-md">Payments</h2>
        <div className="flex items-center gap-2 text-lg lg:text-xl font-medium">
          <div className="w-10 h-10">
            <Image
              src={selectedService.service_icon}
              alt={selectedService.service_name + " service icon"}
              width={500}
              height={500}
              className="object-cover object-center"
              priority
            />
          </div>
          <span>{selectedService.service_name}</span>
        </div>
      </div>
      <div className="">
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <div>
              <Label htmlFor="payment_amount">Payment Amount</Label>
              <Input
                id="payment_amount"
                type="text"
                value={formatNumber(selectedService.service_tariff)}
                className="text-sm rounded-xs no-spin-buttons"
                disabled
              />
            </div>
            <Button
              type="submit"
              className="w-full rounded-sm bg-red-500 hover:bg-red-600 cursor-pointer"
              disabled={transactionLoading}
            >
              {transactionLoading ? (
                <ClipLoader size={16} color="#fff" />
              ) : (
                "Pay"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
