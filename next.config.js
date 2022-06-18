/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    accessKey: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
    secretKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY,
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
