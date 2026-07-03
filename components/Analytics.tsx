/**
 * Cloudflare Web Analytics — privacy-friendly (no cookies), free, and the
 * funnel's measurement layer. Renders nothing unless NEXT_PUBLIC_CF_ANALYTICS_TOKEN
 * is set at build time (Cloudflare dashboard → Web Analytics → add site → copy token).
 */
export default function Analytics() {
  const token = process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN;
  if (!token) return null;
  return (
    <script
      defer
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={JSON.stringify({ token })}
    />
  );
}
