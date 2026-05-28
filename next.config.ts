import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/sitemap/*": ["./public/books_final.json"],
  },
};

export default nextConfig;
