import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: process.env.DOCKER ? "dist" : undefined,
  output: process.env.DOCKER ? "standalone" : undefined,
};

export default nextConfig;
