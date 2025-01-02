import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';
/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.contento.io',
        pathname: '**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

 if (process.env.NODE_ENV === 'development') {
   await setupDevPlatform();
 }
module.exports = nextConfig