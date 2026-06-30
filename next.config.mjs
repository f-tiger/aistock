/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export — produces ./out, deployable as-is to Cloudflare Pages
  // (build command: `next build`, output dir: `out`). No server runtime required.
  output: 'export',
  // Static export cannot use the Next image optimization server.
  images: { unoptimized: true },
  // Emit /path/index.html so Cloudflare Pages serves clean URLs reliably.
  trailingSlash: true,
};

export default nextConfig;
