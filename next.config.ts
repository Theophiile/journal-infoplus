import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hwsifskvamfjxebuxqtv.supabase.co",
      },
    ],
  },
};

export default nextConfig;
