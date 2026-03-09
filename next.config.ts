import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? "/donsnote.github.io" : "",
  assetPrefix: isProd ? "/donsnote.github.io/" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
