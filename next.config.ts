import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "admin.pasuhealth.com",
          },
        ],
        headers: [
          {
            key: "x-admin-domain",
            value: "true",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
