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
    ],
  },
};

module.exports = nextConfig;
