import { test } from 'node:test';
import assert from 'node:assert/strict';
import { equityPositions, nextSession, calculateLeg, summarizeLegs } from './homework-method.mjs';
const q = new Map([['2026-09-04', 100], ['2026-09-08', 105], ['2026-09-09', 110], ['2026-09-10', 115]]);
test('filing close is excluded; weekend and market holiday use next actual session', () => {
  assert.equal(nextSession(q, '2026-09-04'), '2026-09-08');
  assert.equal(nextSession(q, '2026-09-05'), '2026-09-08');
  assert.equal(nextSession(q, '2026-09-10'), null);
});
test('options and principal securities are excluded, both Alphabet classes retain their own ticker', () => {
  const row = (c, v, extra = '') => `<ns:infoTable><ns:nameOfIssuer>ALPHABET</ns:nameOfIssuer><ns:cusip>${c}</ns:cusip><ns:value>${v}</ns:value>${extra}</ns:infoTable>`;
  const r = equityPositions(row('02079K107', 100) + row('02079K305', 300) + row('02079K305', 900, '<ns:putCall>Put</ns:putCall>') + row('02079K305', 900, '<ns:putCall>Call</ns:putCall>') + row('X', 900, '<ns:sshPrnamtType>PRN</ns:sshPrnamtType>'), () => 'GOOGL');
  assert.deepEqual(r.weights, [{ t: 'GOOG', w: .25 }, { t: 'GOOGL', w: .75 }]);
  assert.equal(r.excludedOptions, 2);
});
test('stock and QQQ share exactly the same execution dates', () => {
  const p = new Map([['A', new Map([['2026-09-08', 200], ['2026-09-09', 220]])]]);
  const l = calculateLeg([{ t: 'A', w: 1 }], p, q, '2026-09-04', '2026-09-08');
  assert.equal(l.entryDate, '2026-09-08'); assert.equal(l.exitDate, '2026-09-09');
  assert.ok(Math.abs(l.ret - .1) < 1e-12); assert.ok(Math.abs(l.bench - (110 / 105 - 1)) < 1e-12);
});
test('missing prices cannot silently renormalize the surviving half of a portfolio', () => {
  assert.throws(() => calculateLeg([{ t: 'A', w: .5 }, { t: 'B', w: .5 }], new Map([['A', q]]), q, '2026-09-04', '2026-09-08'), /incomplete/);
});
test('missing execution day cannot borrow a later stock price', () => {
  assert.throws(() => calculateLeg([{ t: 'A', w: 1 }], new Map([['A', new Map([['2026-09-09', 200], ['2026-09-10', 220]])]]), q, '2026-09-04', '2026-09-08'), /incomplete/);
});
test('strategy and benchmark compound over identical contiguous legs', () => {
  const legs = [{ entryDate: 'a', exitDate: 'b', ret: .1, bench: .04 }, { entryDate: 'b', exitDate: 'c', ret: -.1, bench: -.04 }];
  assert.deepEqual(summarizeLegs(legs), { cumulativeReturn: -1, benchmarkQQQ: -.2 });
  assert.throws(() => summarizeLegs([{ ...legs[0], exitDate: 'missing' }, legs[1]]), /gap/);
});
