"use client";

import { formatNumber } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function BalanceCard() {
  const [showBalance, setShowBalance] = useState<boolean>(true);
  const toggleBalance = (): void => {
    setShowBalance(!showBalance);
  };
  const balance = <span className="text-3xl">{formatNumber(1000000000)}</span>;
  const hiddenBalance = (
    <span className="flex items-center gap-1.5 ml-2">
      {Array.from({ length: 6 }).map((_, index) => (
        <span key={index} className="w-2 h-2 rounded-full bg-white"></span>
      ))}
    </span>
  );
  return (
    <div className="flex flex-col justify-between h-32 text-background bg-red-500 p-3 lg:p-4 rounded-xl min-w-max">
      <div className="">
        <h2 className="text-sm">Balance</h2>
      </div>
      <div className="">
        <p className="flex items-center font-semibold">
          <span className="text-lg">Rp</span>
          {showBalance ? balance : hiddenBalance}
        </p>
      </div>
      <div className="">
        <button
          onClick={toggleBalance}
          className="flex items-center gap-1 text-xs cursor-pointer"
          aria-expanded={showBalance ? "true" : "false"}
          aria-label="Toggle balance visibility"
        >
          <span>{showBalance ? "Hide Balance" : "Show Balance"}</span>
          <span>
            {showBalance ? (
              <EyeOff strokeWidth={1.5} size={16} />
            ) : (
              <Eye strokeWidth={1.5} size={16} />
            )}
          </span>
        </button>
      </div>
    </div>
  );
}
