/** @type {import('next').NextConfig} */

// GitHub Pages project site is served from /<repo>/.
const repo = 'seselkahome';
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  // Fully static export so GitHub Pages can serve it (no Node server).
  output: 'export',
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx'],
  // Directory-style URLs (/seselka-lab/ -> seselka-lab/index.html) for static hosting.
  trailingSlash: true,
  // next/image optimization needs a server; static export must opt out.
  images: { unoptimized: true },
  // Subpath the whole app lives under on Pages (skipped in dev for localhost:3000).
  basePath: isProd ? `/${repo}` : undefined,
  assetPrefix: isProd ? `/${repo}/` : undefined,
};

export default nextConfig;
