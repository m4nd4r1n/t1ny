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
    serverActions: true,
  },
  transpilePackages: ['nanoid'],
};

module.exports = nextConfig;

// Injected content via Sentry wizard below

const { withSentryConfig } = require('@sentry/nextjs');

module.exports = withSentryConfig(
  module.exports,
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    // Suppresses source map uploading logs during build
    silent: true,
    org: 'm4nd4r1n',
    project: 't1ny',
  },
  {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: true,

    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
    tunnelRoute: '/monitoring',

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,
  },
);
