/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',           // Vercel最適化
  env: {
    NEXT_PUBLIC_WORKER_URL: process.env.NEXT_PUBLIC_WORKER_URL,
  },
  images: {
    unoptimized: true,            // Vercel無料枠で安心
  },
};

module.exports = nextConfig;
