/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: 'https://www.riser.co.il/start',
        permanent: true,
        has: [
          {
            type: 'host',
            value: 'start.riser.co.il',
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
    ],
  }
};

export default nextConfig;