/** @type {import('next').NextConfig} */
// reactStrictMode disabled — GSAP ScrollTrigger + Lenis break in dev when
// React double-invokes useEffect (Strict Mode mount→unmount→remount).
// Production (Vercel) never double-mounts so it works fine there.
// Disabling here makes the dev experience match production exactly.
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'm-bank.mn',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
