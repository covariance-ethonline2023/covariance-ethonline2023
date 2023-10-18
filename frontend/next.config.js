/** @type {import('next').NextConfig} */
const nextConfig = {
 async redirects() {
    return [
      {
        source: '/dasboard',
        destination: '/dashboard/my-campaigns',
        permanent: true,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

module.exports = nextConfig
