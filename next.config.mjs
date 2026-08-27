/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.NODE_ENV === 'production' || process.env.NEXT_EXPORT === 'true' ? 'export' : undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/blog',
        destination: '/blog-post',
        permanent: true,
      },
      {
        source: '/blog/:slug',
        destination: '/blog-post/:slug',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
