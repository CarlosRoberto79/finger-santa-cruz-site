import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "finger.ind.br",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
