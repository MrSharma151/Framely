/**
 * - Next.js Config for Framely-Customer
 * - Enforces strict mode for dev hygiene
 * - Adds trailing slash for consistent routing
 * - Enables styled-components compiler support
 */

const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;