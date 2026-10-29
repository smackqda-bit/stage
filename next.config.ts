import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Самодостаточная сборка в .next/standalone — её ждут Layero и другие PaaS (и Docker)
  output: 'standalone',
  poweredByHeader: false,
  cacheComponents: true,
  partialPrefetching: true,
};

export default nextConfig;
