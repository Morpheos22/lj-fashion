import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    // Allow optimization of all image formats
    formats: ["image/avif", "image/webp"],
    // Device sizes used by next/image — these are the breakpoints at which
    // images are generated. Higher values = sharper images on large screens.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Image sizes (smaller breakpoints)
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Minimum cache TTL in seconds (60 days)
    minimumCacheTTL: 5184000,
  },
};

export default nextConfig;
