import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react", "@react-three/fiber", "@react-three/drei"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
