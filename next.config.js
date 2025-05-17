/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/systemapp',      // ✅ ระบุโฟลเดอร์ย่อยใน URL
  assetPrefix: '/systemapp/',  // ✅ สำหรับโหลด static asset
  env: {
    API_BASE_URL: process.env.API_BASE_URL || 'https://systemappbackend-production.up.railway.app',
  },
};

module.exports = nextConfig;
