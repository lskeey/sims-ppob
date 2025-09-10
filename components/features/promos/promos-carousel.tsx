"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useBannerStore } from "@/stores/promoStore";
import { CircleAlert } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

export default function PromosCarousel() {
  const { banners, fetchBanners, loading, error } = useBannerStore();

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  const handleRetry = () => {
    fetchBanners();
  };

  if (loading || banners === null) {
    return (
      <div className="space-y-2">
        <div>
          <h2 className="font-medium">Discover Exclusive Promos</h2>
        </div>
        <div className="flex gap-4 overflow-x-scroll">
          {Array(5)
            .fill(null)
            .map((_, i) => (
              <div key={i} className="w-56 flex-none">
                <Skeleton className="h-28 bg-black/10" />
              </div>
            ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center px-8 py-6 text-center space-y-3">
        <CircleAlert strokeWidth={1.5} className="size-16" color="#fb2c36" />
        <p className="text-sm">
          Something went wrong. Couldn't load the promo.
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

  if (banners.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-8 py-6 text-center space-y-4">
        <Image
          src="/images/empty-pana.svg"
          alt="No promos"
          width={500}
          height={500}
          className="size-64 mb-4"
        />
        <h3 className="text-lg font-semibold">No Promos Available Right Now</h3>
        <p className="text-sm">Check back later for more exciting offers.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div>
        <h2 className="font-medium">Discover Exclusive Promos</h2>
      </div>
      <div className="flex gap-4 overflow-x-scroll">
        {banners.map((promotion, i) => (
          <div key={i} className="w-56 flex-none">
            <Image
              src={promotion.banner_image}
              alt={promotion.banner_name}
              width={500}
              height={500}
              priority
            />
          </div>
        ))}
      </div>
    </div>
  );
}
