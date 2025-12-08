import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: 'standalone',
  experimental: {
    turbopackFileSystemCacheForDev: true,
    // Disable cacheComponents to avoid prerendering issues
    cacheComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8080',
        pathname: '/uploads/**',
      },
    ],
    dangerouslyAllowSVG: true,
    unoptimized: true,
  },
  // Skip static generation during build
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
