import { convictionIndex } from '@/lib/data/score';

// A live, embeddable SVG badge of the AI Conviction Index — drop it into a blog,
// README, or forum post via <img src=".../badge.svg">. Each embed is a backlink
// and a branded impression. Regenerated every deploy (weekly ops + quarterly 13F),
// so it stays current. Same static-export pattern as /llms.txt.
export const dynamic = 'force-static';

const BAND_COLOR: Record<string, string> = {
  high: '#34d399',
  balanced: '#38bdf8',
  cautious: '#fbbf24',
};

export function GET() {
  const c = convictionIndex();
  const color = BAND_COLOR[c.band] ?? '#38bdf8';
  const n = String(c.index);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="64" viewBox="0 0 320 64" role="img" aria-label="AI Conviction Index ${n} of 100">
  <rect x="0.5" y="0.5" width="319" height="63" rx="10" fill="#0b1220" stroke="rgba(255,255,255,0.12)"/>
  <text x="16" y="27" fill="#cbd5e1" font-family="system-ui,Segoe UI,Roboto,sans-serif" font-size="14" font-weight="700">AI Conviction Index</text>
  <text x="16" y="46" fill="#64748b" font-family="system-ui,Segoe UI,Roboto,sans-serif" font-size="10.5">ai-investing-compass.pages.dev</text>
  <text x="304" y="30" text-anchor="end" fill="${color}" font-family="ui-monospace,Menlo,monospace" font-size="30" font-weight="800">${n}<tspan fill="#64748b" font-size="14" font-weight="600">/100</tspan></text>
  <text x="304" y="48" text-anchor="end" fill="#64748b" font-family="system-ui,sans-serif" font-size="10">updated quarterly</text>
</svg>`;

  return new Response(svg, {
    headers: {
      'content-type': 'image/svg+xml; charset=utf-8',
      'cache-control': 'public, max-age=3600',
    },
  });
}
