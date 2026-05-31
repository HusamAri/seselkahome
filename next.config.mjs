/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Legacy vanilla site is archived in /legacy and excluded from the build.
  pageExtensions: ['ts', 'tsx'],
};

export default nextConfig;
