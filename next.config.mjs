/** @type {import('next').NextConfig} */
// Production-ready Balkan Food Store configuration
const nextConfig = {
  images: {
    unoptimized: true,
  },
  serverExternalPackages: ['sqlite3'],
}

export default nextConfig
