import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: false,
  },
  reactStrictMode: false,
  images: {
    qualities: [100, 85, 75],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.image2url.com",
      },
      {
        protocol: "https",
        hostname: "**.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "**.imgix.net",
      },
    ],
  },
};

export default nextConfig;
