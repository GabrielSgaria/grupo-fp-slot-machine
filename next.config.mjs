import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    output: 'standalone',
    images: {
      remotePatterns: [
          {
              protocol: 'https',
              hostname: 'www.facebook.com',
              pathname: '/**',
          },
          {
              protocol: 'https',
              hostname: 'sa-east-1.graphassets.com',
              pathname: '/**',
          },
          {
              protocol: 'https',
              hostname: 'imagedelivery.net',
              pathname: '/**'
          },
          {
              protocol: 'https',
              hostname: 'api.cloudflare.com',
              pathname: '/**'
          }
      ],
      formats: ['image/webp', 'image/avif'],
      minimumCacheTTL: 60 * 60 * 24, // 1 dia
  },
    headers: async () => [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'X-Content-Type-Options',
              value: 'nosniff',
            },
            {
              key: 'X-Frame-Options',
              value: 'DENY',
            },
            {
              key: 'X-XSS-Protection',
              value: '1; mode=block',
            },
          ],
        },
        {
          source: '/_next/static/:path*',
          headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
        },
        {
          source: '/static/:path*',
          headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
        },
    ],
    webpack: (config, { dev, isServer }) => {
        if (!dev && !isServer) {
            config.plugins = config.plugins.filter(
                (plugin) => plugin.constructor.name !== 'GenerateSWPlugin'
            );
        }
        return config;
    },
};

const withPWAConfig = withPWA({
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    register: true,
    skipWaiting: true,
});

export default withPWAConfig(nextConfig);

