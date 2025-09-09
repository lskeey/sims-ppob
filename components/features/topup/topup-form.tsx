"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatNumber, formatRupiah } from "@/lib/utils";
import { useState } from "react";

interface TopUpFormProps {
  onSubmit?: (amount: number) => void;
}

export default function TopUpForm({ onSubmit }: TopUpFormProps) {
  const amounts = [10000, 20000, 50000, 100000, 250000, 500000];
  const [topUpAmount, setTopUpAmount] = useState<string>("");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [displayAmount, setDisplayAmount] = useState<string>("");
  const handleAmountSelect = (amount: number): void => {
    setTopUpAmount(amount.toString());
    setDisplayAmount(formatNumber(amount));
    setSelectedAmount(amount);
  };
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = event.target.value.replace(/[^0-9]/g, "");
    setTopUpAmount(value);
    setDisplayAmount(formatNumber(value));
    // Reset selected amount if input doesn't match any preset amount
    const numericValue = parseInt(value, 10);
    if (amounts.includes(numericValue)) {
      setSelectedAmount(numericValue);
    } else {
      setSelectedAmount(null);
    }
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const amount = parseInt(topUpAmount, 10);

    if (amount > 0) {
      onSubmit?.(amount);
    }
  };
  return (
    <div className="min-w-max space-y-10">
      <div>
        <h2 className="text-sm lg:text-md">Please Enter Your</h2>
        <span className="text-xl lg:text-2xl font-medium">Top Up Amount</span>
      </div>
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        <div className="w-full lg:w-4/12 lg:order-2 grid grid-flow-col grid-rows-2 gap-x-2 gap-y-4">
          {amounts.map((amount, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleAmountSelect(amount)}
              className={`flex justify-center p-2 border rounded-sm text-sm transition-colors
                hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer
                ${
                  selectedAmount === amount
                    ? "border-red-500 bg-red-50 text-red-700"
                    : "border-gray-200 text-gray-700"
                }
              `}
              aria-label={`Select ${formatRupiah(amount)}`}
            >
              {formatRupiah(amount)}
            </button>
          ))}
        </div>
        <form className="w-full lg:w-8/12 lg:order-1" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <div>
              <Label htmlFor="top_up_amount" hidden>
                Top Up Amount
              </Label>
              <Input
                id="top_up_amount"
                type="text"
                placeholder="Enter Top Up Amount"
                className="text-sm rounded-xs no-spin-buttons"
                value={displayAmount}
                onChange={handleInputChange}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full rounded-sm bg-red-500 hover:bg-red-600 cursor-pointer"
              disabled={!topUpAmount || parseInt(topUpAmount, 10) <= 0}
            >
              Top Up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
