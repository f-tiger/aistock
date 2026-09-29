// v2: pure, testable rules. Dates are UTC ISO dates of completed US daily bars.
export const METHOD_VERSION = '13f-next-session-v2';
export const tag = (xml, name) => (xml.match(new RegExp('<(?:\\w+:)?' + name + '(?:\\s[^>]*)?>([^<]*)<', 'i')) || [])[1]?.trim() || '';

export function equityPositions(xml, resolveTicker) {
  const blocks = xml.match(/<(?:\w+:)?infoTable(?:\s[^>]*)?>[\s\S]*?<\/(?:\w+:)?infoTable>/gi) || [];
  const positions = new Map();
  let excludedOptions = 0;
  for (const block of blocks) {
    if (tag(block, 'putCall')) { excludedOptions++; continue; }
    if (tag(block, 'sshPrnamtType').toUpperCase() === 'PRN') continue;
    const cusip = tag(block, 'cusip').toUpperCase();
    const ticker = cusip === '02079K107' ? 'GOOG' : cusip === '02079K305' ? 'GOOGL' : resolveTicker(tag(block, 'nameOfIssuer'));
    const value = Number(tag(block, 'value'));
    if (ticker && Number.isFinite(value) && value > 0) positions.set(ticker, (positions.get(ticker) || 0) + value);
  }
  const total = [...positions.values()].reduce((a, b) => a + b, 0);
  return { weights: [...positions].map(([t, v]) => ({ t, w: v / total })), excludedOptions };
}

export function nextSession(calendar, filed) {
  return [...calendar.keys()].filter(day => day > filed).sort()[0] || null;
}

export function calculateLeg(weights, prices, benchmark, filedFrom, filedTo) {
  const entryDate = nextSession(benchmark, filedFrom), exitDate = nextSession(benchmark, filedTo);
  if (!entryDate || !exitDate || entryDate >= exitDate) throw new Error('missing completed execution sessions');
  const qa = benchmark.get(entryDate), qz = benchmark.get(exitDate);
  if (![qa, qz].every(x => Number.isFinite(x) && x > 0)) throw new Error('missing benchmark');
  let ret = 0, coverage = 0;
  const missing = [];
  for (const { t, w } of weights) {
    const map = prices.get(t), a = map?.get(entryDate), z = map?.get(exitDate);
    if (![a, z].every(x => Number.isFinite(x) && x > 0)) { missing.push(t); continue; }
    if (!Number.isFinite(w) || w < 0) throw new Error('invalid weight');
    ret += w * (z / a - 1); coverage += w;
  }
  if (missing.length || Math.abs(coverage - 1) > 1e-8) throw new Error('incomplete prices: ' + missing.join(','));
  return { from: filedFrom, to: filedTo, entryDate, exitDate, ret, holdings: weights.length, coverage: 100, bench: qz / qa - 1 };
}

export function summarizeLegs(legs) {
  if (!legs.length) throw new Error('no legs');
  for (let i = 1; i < legs.length; i++) if (legs[i - 1].exitDate !== legs[i].entryDate) throw new Error('gap in backtest');
  return {
    cumulativeReturn: Math.round((legs.reduce((v, l) => v * (1 + l.ret), 1) - 1) * 1000) / 10,
    benchmarkQQQ: Math.round((legs.reduce((v, l) => v * (1 + l.bench), 1) - 1) * 1000) / 10,
  };
}
