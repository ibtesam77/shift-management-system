/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "flowbite.com",
      },
    ],
  },
};

module.exports = nextConfig;
