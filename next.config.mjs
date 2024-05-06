import { withSentryConfig } from '@sentry/nextjs';

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
      { hostname: 'gravatar.com' },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ['puppeteer-core'],
  },
  transpilePackages: ['nanoid'],
};

export default withSentryConfig(
  nextConfig,
  {
    org: 'm4nd4r1n',
    project: 't1ny',
    authToken: process.env.SENTRY_AUTH_TOKEN,
    silent: true,
  },
  {
    widenClientFileUpload: true,
    transpileClientSDK: true,
    tunnelRoute: '/monitoring',
    hideSourceMaps: true,
    disableLogger: true,
    automaticVercelMonitors: true,
  },
);
