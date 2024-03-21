/** @type {import('next').NextConfig} */
const path = require("path");

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
  experimental: {
    outputFileTracingRoot: path.join(__dirname, "../../"),
  },
};
