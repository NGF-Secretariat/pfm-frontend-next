/** @type {import('next').NextConfig} */
const nextConfig = {
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
