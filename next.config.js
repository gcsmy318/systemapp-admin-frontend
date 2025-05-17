/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export', // ✅ เพิ่มบรรทัดนี้
  images: {
    unoptimized: true, // ✅ ถ้าคุณใช้ <Image> component จาก next/image
  },
  env: {
    API_BASE_URL: process.env.API_BASE_URL || 'https://systemappbackend-production.up.railway.app',
  },
};

module.exports = nextConfig;
