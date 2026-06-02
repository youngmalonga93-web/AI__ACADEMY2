import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.optimization = {
      ...config.optimization,
      moduleIds: "deterministic",
      chunkIds: "deterministic",
    };

    config.experiments = {
      ...config.experiments,
      cacheUnaffected: true,
    };

    return config;
  },
};

export default nextConfig;
