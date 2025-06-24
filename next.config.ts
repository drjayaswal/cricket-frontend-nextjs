import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    // remotePatterns: ["shadcnbcwlocks.com", "images.unsplash.com"], // Add the domain here
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'shadcnbcwlocks.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'onrender.com',
      },
      {
        protocol: 'https',
        hostname: 'cricket-frontend-nextjs.onrender.com',
      },
    ], // Add the domain here
  },
};

export default nextConfig;
