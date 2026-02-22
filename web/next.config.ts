import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // If your repository is not at the root (e.g., github.com/user/repo), 
  // you might need to add:
  basePath: '/Marketplace-App',
  assetPrefix: '/Marketplace-App/',
};

export default nextConfig;
