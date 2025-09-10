import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "minio.nutech-integrasi.com",
        pathname: "/take-home-test/**",
      },
    ],
  },
};

export default nextConfig;
