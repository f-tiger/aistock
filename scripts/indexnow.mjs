// Submit every URL in the built sitemap to IndexNow (Bing/Yandex/Seznam/Naver),
// cutting indexing latency from weeks to hours. Runs in CI after each deploy.
// Protocol: https://www.indexnow.org/documentation
import { readFileSync } from 'node:fs';

const HOST = 'ai-investing-compass.pages.dev';
const KEY = '8b43c7b04531396479c2d5ad2da4073f'; // must match public/<key>.txt

const xml = readFileSync('out/sitemap.xml', 'utf8');
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

if (urls.length === 0) {
  console.error('No URLs found in out/sitemap.xml');
  process.exit(1);
}

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList: urls.slice(0, 10000),
  }),
});

console.log(`IndexNow: submitted ${urls.length} URLs → HTTP ${res.status}`);
// 200 = ok, 202 = accepted (key validation pending). Anything else is a warning,
// not a failure — indexing is best-effort and must never break the deploy.
if (![200, 202].includes(res.status)) {
  console.warn(await res.text().catch(() => ''));
}
