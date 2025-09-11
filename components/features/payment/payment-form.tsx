"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatNumber, formatRupiah } from "@/lib/utils";
import { Service } from "@/services/services/types";
import { TransactionRequest } from "@/services/transaction/types";
import { useBalanceStore } from "@/stores/balanceStore";
import { useServicesStore } from "@/stores/serviceStore";
import { useTransactionStore } from "@/stores/transaction";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { IoMdWallet } from "react-icons/io";
import { SyncLoader } from "react-spinners";
import { toast } from "sonner";

export default function PaymentForm() {
  const searchParams = useSearchParams();

  const { balance, setBalance } = useBalanceStore();

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

  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const serviceCodeFromQuery = searchParams.get("service_code") || "";

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  useEffect(() => {
    if (!serviceCodeFromQuery) {
      setSelectedService(null);
      setFormError("Service code not found in URL.");
      return;
    }

    if (!services) {
      setSelectedService(null);
      setFormError("Services not available.");
      return;
    }

    const service = services.find(
      (s) => s.service_code === serviceCodeFromQuery
    );
    setSelectedService(service || null);
    setFormError(service ? null : "Invalid service code.");
  }, [services, serviceCodeFromQuery]);

  const handleSubmit = useCallback(async () => {
    setFormError(null);

    if (!selectedService || balance === null) {
      setFormError("Service or balance is not available. Please try again.");
      return;
    }

    const transactionData: TransactionRequest = {
      service_code: selectedService.service_code,
    };

    try {
      await makeTransaction(transactionData);
      const newBalance = balance - selectedService.service_tariff;
      setBalance(newBalance);
      toast("Payment successful.", {
        style: {
          backgroundColor: "#00bc7d",
          color: "#fff",
        },
      });
    } catch (err) {
      console.log(err);
    }
  }, [makeTransaction, selectedService]);

  const currentError = servicesError || transactionError || formError;

  if (servicesLoading) {
    return (
      <div
        className="flex justify-center items-center"
        style={{ height: "calc(100vh - 28rem)" }}
      >
        <SyncLoader size={16} color="#ef4444" aria-label="Loading Services" />
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
        <form className="w-full">
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
            <AlertDialog>
              <AlertDialogTrigger asChild>
                {balance && (
                  <Button
                    className="w-full rounded-sm bg-red-500 hover:bg-red-600 cursor-pointer"
                    disabled={selectedService.service_tariff > balance}
                  >
                    Pay
                  </Button>
                )}
              </AlertDialogTrigger>
              <AlertDialogContent className="w-sm space-y-6">
                <AlertDialogHeader>
                  <div className="w-min self-center p-3 bg-red-500 rounded-full mb-4">
                    <IoMdWallet className="self-center size-8 text-background" />
                  </div>
                  <AlertDialogTitle className="text-center">
                    Confirm Payment
                    <AlertDialogDescription className="text-center">
                      You are about to pay{" "}
                      <span className="text-red-500">
                        {formatRupiah(selectedService.service_tariff)}
                      </span>{" "}
                      for <span>{selectedService.service_name}</span>
                    </AlertDialogDescription>
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <div className="flex gap-6">
                    <AlertDialogCancel className="flex-1 cursor-pointer">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="flex-1 bg-red-500 hover:bg-red-600 cursor-pointer"
                      onClick={handleSubmit}
                    >
                      Confirm
                    </AlertDialogAction>
                  </div>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </form>
      </div>
    </div>
  );
}
