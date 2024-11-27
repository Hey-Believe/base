import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }

    return {
      ...config,
      ignoreWarnings: [
        { module: /node_modules/ },
        { message: /Critical dependency/ },
        { message: /Failed to parse source map/ },
        { message: /controlled input/ },
      ],
    };
  },
};

export default nextConfig;
