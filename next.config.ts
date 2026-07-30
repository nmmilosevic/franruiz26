import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The local Cloudflare preview does not expose the production ASSETS
  // binding used by vinext's image optimizer. Serve the already optimized
  // project media directly in both development and production.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
