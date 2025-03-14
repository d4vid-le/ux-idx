/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
    unoptimized: true,
  },
  output: 'export',
  basePath: '/ux-idx',
  assetPrefix: '/ux-idx/',
  trailingSlash: true,
}

module.exports = nextConfig
