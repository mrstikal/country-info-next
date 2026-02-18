import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "www.oorsprong.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.oorsprong.org",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
