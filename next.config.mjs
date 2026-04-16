import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbopack: false,   // Turbopack完全無効（これで安定）
  },
  optimizePackageImports: ['@base-ui/react', 'lucide-react'],
};

export default nextConfig;
