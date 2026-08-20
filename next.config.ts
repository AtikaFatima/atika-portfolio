import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGitHubPages ? (process.env.NEXT_PUBLIC_BASE_PATH ?? "") : "";

const nextConfig: NextConfig = {
  output: isGitHubPages ? "export" : undefined,
  trailingSlash: isGitHubPages,
  basePath,
  assetPrefix: basePath || undefined,
  // Netlify serves each deploy behind long-lived CDN caches. Version every
  // asset request so a returning browser cannot mix chunks from two builds.
  deploymentId:
    process.env.DEPLOY_ID ?? process.env.BUILD_ID ?? process.env.COMMIT_REF,
  images: {
    // Next 16 requires explicit qualities. Default is [75]; we use 90 for
    // project screenshots and 92 for the hero portrait.
    qualities: [75, 90, 92],
    unoptimized: isGitHubPages,
  },
};

export default nextConfig;
