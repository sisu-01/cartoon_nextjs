/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.dcinside.co.kr'
      },
      {
        protocol: 'https',
        hostname: 'www.dcinside.com'
      }
    ]
  }
};

export default nextConfig;
