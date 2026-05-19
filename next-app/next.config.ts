import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: "dist",
  output: process.env.DOCKER ? "standalone" : undefined,
};

export default nextConfig;
