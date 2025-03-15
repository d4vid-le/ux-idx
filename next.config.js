/** @type {import('next').NextConfig} */
const nextConfig = {
  // For static exports if needed
  // output: 'export',
  
  images: {
    domains: ['images.unsplash.com'],
    // Vercel handles image optimization automatically
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  
  // Disable React StrictMode for production to avoid double-rendering issues
  reactStrictMode: process.env.NODE_ENV === 'development',
  
  // Improve build performance
  swcMinify: true,
  
  // For handling trailing slashes consistently
  trailingSlash: false,
}

module.exports = nextConfig
