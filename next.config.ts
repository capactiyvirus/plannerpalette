import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export', // ← Comment out or remove
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  distDir: 'out',
  reactStrictMode: true
};

export default nextConfig;