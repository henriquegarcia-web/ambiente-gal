/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost", "api.wolfypay.com", "192.168.200.23"],
  },
  staticPageGenerationTimeout: 300,
  swcMinify: true,
};

module.exports = nextConfig;
