/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Performance optimizations
  swcMinify: true,

  // Image optimization
  images: {
    domains: ['images.pexels.com', 'images.unsplash.com'],
    formats: ['image/avif', 'image/webp'],
  },

  // Compression
  compress: true,

  // Production optimizations
  productionBrowserSourceMaps: false,

  // Experimental features for better performance
  experimental: {
    optimizeCss: true,
  },
};

module.exports = nextConfig;
