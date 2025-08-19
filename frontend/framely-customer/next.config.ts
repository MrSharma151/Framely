/**
 * - Next.js Config for Framely-Customer
 * - Enforces strict mode for dev hygiene
 * - Adds trailing slash for consistent routing
 * - Enables styled-components compiler support
 * - Configures external image hostnames for Next.js Image component
 */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'framelystorage.blob.core.windows.net',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  transpilePackages: ['react-icons'],
};

module.exports = withBundleAnalyzer(nextConfig);