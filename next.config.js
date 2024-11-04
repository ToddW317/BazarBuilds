/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    missingSuspenseWithCSRInDEV: false,
  },
  swcMinify: true,
  modularizeImports: {
    '@firebase/(.*)': {
      transform: '@firebase/$1',
    },
  }
}

module.exports = nextConfig 