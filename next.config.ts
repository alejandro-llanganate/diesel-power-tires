import type { NextConfig } from "next";

const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const repoOwner = process.env.GITHUB_REPOSITORY_OWNER;
const isUserOrgSite =
  Boolean(repoName && repoOwner) &&
  repoName === `${repoOwner}.github.io`;

/** En GitHub Pages (proyecto): `/nombre-repo`. En local o sitio usuario: vacío. */
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ??
  (process.env.GITHUB_PAGES === "true" && repoName && !isUserOrgSite
    ? `/${repoName}`
    : "");

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath || undefined,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "interborders.com" },
    ],
  },
};

export default nextConfig;
