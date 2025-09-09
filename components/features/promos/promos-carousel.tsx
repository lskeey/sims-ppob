import { promotions } from "@/data/promotion";
import Image from "next/image";

export default function PromosCarousel() {
  return (
    <div className="space-y-2">
      <div>
        <h2 className="font-medium">Discover Exclusive Promos</h2>
      </div>
      <div className="flex gap-4 overflow-x-scroll">
        {promotions.map((promotion, i) => (
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
