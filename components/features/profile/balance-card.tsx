"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { formatNumber } from "@/lib/utils";
import { useBalanceStore } from "@/stores/balanceStore";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";

export default function BalanceCard() {
  const { balance, fetchBalance, loading, error } = useBalanceStore();
  const [showBalance, setShowBalance] = useState<boolean>(true);

  useEffect(() => {
    if (balance === null && !loading && !error) {
      fetchBalance();
    }
  }, [balance, loading, error, fetchBalance]);

  const toggleBalance = (): void => {
    setShowBalance(!showBalance);
  };

  const hiddenBalance = (
    <span className="flex items-center gap-1.5 ml-2">
      {Array.from({ length: 6 }).map((_, index) => (
        <span key={index} className="w-2 h-2 rounded-full bg-white"></span>
      ))}
    </span>
  );

  const renderBalance = () => {
    if (loading) {
      return <Skeleton className="w-54 h-6 bg-black/20" />;
    }

    if (error) {
      return;
    }

    if (balance) {
      return (
        <>
          <span className="text-lg">Rp</span>
          <span className="text-3xl">
            {showBalance ? formatNumber(balance) : hiddenBalance}
          </span>
        </>
      );
    }
  };

  return (
    <div className="flex flex-col justify-between h-32 text-background bg-red-500 p-3 lg:p-4 rounded-xl min-w-max">
      <div>
        {loading ? (
          <Skeleton className="w-20 h-4 bg-black/20 rounded-sm" />
        ) : (
          <h2 className="text-sm">Balance</h2>
        )}
      </div>
      <div>
        <span className="flex items-center font-semibold">
          {renderBalance()}
        </span>
      </div>
      <div>
        {loading ? (
          <Skeleton className="w-24 h-4 bg-black/20 rounded-sm" />
        ) : (
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
        )}
      </div>
    </div>
  );
}
