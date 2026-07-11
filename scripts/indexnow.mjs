// Submit every URL in the built sitemap to IndexNow (Bing/Yandex/Seznam/Naver),
// cutting indexing latency from weeks to hours. Runs in CI after each deploy.
// Protocol: https://www.indexnow.org/documentation
import { readFileSync } from 'node:fs';

const HOST = 'ai-investing-compass.pages.dev';
const KEY = '8b43c7b04531396479c2d5ad2da4073f'; // must match public/<key>.txt
const KEY_URL = `https://${HOST}/${KEY}.txt`;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const xml = readFileSync('out/sitemap.xml', 'utf8');
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (urls.length === 0) {
  console.error('No URLs found in out/sitemap.xml');
  process.exit(1);
}

// Pre-flight: the engines validate by fetching the key file; if the CDN hasn't
// propagated it yet, submitting now would cache a failed validation (403).
let keyOk = false;
for (let attempt = 1; attempt <= 3; attempt++) {
  try {
    const res = await fetch(KEY_URL, { cache: 'no-store' });
    const body = (await res.text()).trim();
    keyOk = res.status === 200 && body === KEY;
    console.log(`Key check (attempt ${attempt}): ${KEY_URL} → HTTP ${res.status}, match=${keyOk}`);
    if (keyOk) break;
  } catch (e) {
    console.log(`Key check (attempt ${attempt}) failed: ${e.message}`);
  }
  await sleep(10_000);
}
if (!keyOk) {
  console.warn('Key file not publicly reachable — skipping submission (will retry on next deploy).');
  process.exit(0);
}

// Submit, with one delayed retry on transient/validation-cache errors.
for (let attempt = 1; attempt <= 2; attempt++) {
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_URL, urlList: urls.slice(0, 10000) }),
  });
  console.log(`IndexNow (attempt ${attempt}): submitted ${urls.length} URLs → HTTP ${res.status}`);
  if ([200, 202].includes(res.status)) process.exit(0);
  console.warn(await res.text().catch(() => ''));
  if (attempt === 1) await sleep(30_000);
}
// Best-effort by design: never fail the deploy over indexing.
console.warn('IndexNow submission not accepted this run; will retry on next deploy.');
