/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEAR_NO_LOGS: true,
  },
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
