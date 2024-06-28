/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['fitnest-bucket.s3.amazonaws.com'],
  },
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
  },
};


export default nextConfig;