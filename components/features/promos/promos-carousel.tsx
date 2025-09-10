"use client";

import { useBannerStore } from "@/stores/promoStore";
import Image from "next/image";
import { useEffect } from "react";
import { ClipLoader } from "react-spinners";

export default function PromosCarousel() {
  const { banners, fetchBanners, loading, error } = useBannerStore();

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

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

  if (!banners || banners.length === 0) {
    return (
      <div className="text-center p-6">
        <p className="text-muted-foreground">No banners available.</p>
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
