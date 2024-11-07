/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  modularizeImports: {
    '@firebase/(.*)': {
      transform: '@firebase/$1',
    },
  }
}

module.exports = nextConfig 