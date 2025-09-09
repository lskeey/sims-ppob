import { services } from "@/data/service";
import Image from "next/image";

export default function ServicesGrid() {
  return (
    <div className="grid grid-flow-col grid-rows-2 lg:grid-rows-1 gap-4 justify-between">
      {services.map((service, i) => (
        <div key={i} className="flex flex-col gap-2 w-12 items-center">
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
