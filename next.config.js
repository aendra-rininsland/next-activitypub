/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      { source: "/actor", destination: "/api/actor" },
      { source: "/.well-known/webfinger", destination: "/api/webfinger" },
      {
        source: "/inbox",
        destination: "/api/inbox",
        has: [{ type: "query", key: "resource" }],
      },
    ];
  },
};

module.exports = nextConfig;
