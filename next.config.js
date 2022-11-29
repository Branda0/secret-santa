const { hostname } = require("os");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "3foisrien.shop",
        // port: "",
        pathname: "/wp-content/**",
      },
    ],
  },
};

module.exports = nextConfig;
