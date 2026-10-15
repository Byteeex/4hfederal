import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  outputFileTracingRoot: process.cwd(),
  output: "export",
  trailingSlash: true,
  basePath: process.env.GITHUB_ACTIONS ? "/4hfederal" : "",
  images: { unoptimized: true },
};

export default nextConfig;
