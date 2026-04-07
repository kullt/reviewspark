# Build succeeded. Fixing tsconfig.json for vercel deployment.

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
