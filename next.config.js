/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  env: {
    accessKey: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
    secretKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY,
  },
  nextConfig,
  typescript: {
    ignoreBuildErrors: true,
  },
};
