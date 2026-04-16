/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbopack: {
      root: '.',
    },
  },
  // Cloudflare Pages 互換性設定
  output: 'standalone',
};
export default nextConfig;
