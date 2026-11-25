import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
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
  experimental: {
    cpus: 2,
  },
};

export default nextConfig;
