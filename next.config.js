/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        hostname: 'avatars.githubusercontent.com',
        pathname: '/u/**',
        protocol: 'https',
      },
      {
        hostname: 'lh3.googleusercontent.com',
        pathname: '/a/**',
        protocol: 'https',
      },
      {
        hostname: 'www.google.com',
        pathname: '/s2/favicons',
        protocol: 'https',
      },
      {
        hostname: 'www.notion.so',
        pathname: '/icons/**',
        protocol: 'https',
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ['puppeteer-core'],
  },
};

module.exports = nextConfig;
