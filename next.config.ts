import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Keep Turbopack explicit so webpack-only PWA plugins are not required.
  turbopack: {},
};

export default nextConfig;
