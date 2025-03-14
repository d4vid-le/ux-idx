/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
    // Vercel handles image optimization automatically
    unoptimized: false,
  },
}

module.exports = nextConfig
