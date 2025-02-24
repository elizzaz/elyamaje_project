import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL, // Exposé côté client
  },
  images: {
    domains: ['store.storeimages.cdn-apple.com'],
  },
};

export default nextConfig;
