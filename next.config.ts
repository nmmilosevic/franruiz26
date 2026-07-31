import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // Prevent Next from picking a parent lockfile as the workspace root on local machines.
  turbopack: {
    root: projectRoot,
  },
  // Vercel provides Next.js Image Optimization for local /public assets.
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
