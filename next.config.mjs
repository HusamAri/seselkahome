/** @type {import('next').NextConfig} */

// Served from the root of the custom domain (seselkahome.com), so no basePath.
const nextConfig = {
  // Fully static export so GitHub Pages can serve it (no Node server).
  output: 'export',
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx'],
  // Directory-style URLs (/koleksiyon/ -> index.html) for static hosting.
  trailingSlash: true,
  // next/image optimization needs a server; static export must opt out.
  images: { unoptimized: true },
};

export default nextConfig;
