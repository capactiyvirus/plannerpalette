import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  distDir: 'out',
  reactStrictMode: true
};

export default nextConfig;