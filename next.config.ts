import type { NextConfig } from "next";

/**
 * When building for GitHub Pages (GITHUB_PAGES=true) we emit a fully static
 * export served from a repository sub-path. Local `next dev` / `next build`
 * are unaffected.
 */
const isPages = process.env.GITHUB_PAGES === "true";
const repo = "nachi-tekneka";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  ...(isPages
    ? {
        output: "export",
        basePath: `/${repo}`,
        assetPrefix: `/${repo}/`,
        images: { unoptimized: true },
        trailingSlash: true,
      }
    : {}),
};

export default nextConfig;
