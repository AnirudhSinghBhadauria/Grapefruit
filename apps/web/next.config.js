/** @type {import('next').NextConfig} */

module.exports = {
  transpilePackages: ["@repo/ui, @chat/drizzle, @chat/types"],
  images: {
    remotePatterns: [
      {
        hostname: "res.cloudinary.com",
      },
    ],
  },
  output: "standalone",
};
