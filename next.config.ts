import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Remove basePath for custom domain; add if deploying to user/org.github.io
};

export default nextConfig;
