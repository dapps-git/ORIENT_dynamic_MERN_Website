import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'orientenergyco.com',
      },
      {
        protocol: 'https',
        hostname: 'www.orientenergyco.com',
      },
      {
        protocol: 'https',
        hostname: 'admin.orientenergyco.com',
      },
    ],
  },
};

export default nextConfig;
