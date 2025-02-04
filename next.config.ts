import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  distDir: 'out',
  // Explicitly tell Next.js about the src directory
  reactStrictMode: true
};

export default nextConfig;