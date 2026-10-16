import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Allowed quality values for next/image. 90 is used for profile photos.
    qualities: [75, 90],
  },
};

export default nextConfig;
