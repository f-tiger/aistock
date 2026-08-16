#!/usr/bin/env node
// EDGAR 逐笔 13F 可达性与解析验证。
//
// 背景:会话沙箱的出网代理屏蔽 sec.gov / data.sec.gov / efts.sec.gov(连测三天全 000),
// 导致 13F 季度更新只能靠媒体转述——而硬规则要求持仓必须来自逐笔申报原文。
// GitHub runner 能否直连是这条死结能不能解开的唯一变量,本脚本就是去证伪它。
//
// 不做「能 ping 通就算成功」的弱验证:一路走到 informationTable.xml 并数出持仓条数,
// 拿不到逐笔数据就等于没解开。
//
// SEC 要求带可识别联系方式的 User-Agent,否则 403。

const UA = { 'User-Agent': 'AGI Scorecard Research (contact: https://agiscorecard.com/about)' };
const CIKS = [
  { name: 'ARK Investment Management', cik: '0001697748' },
  { name: 'Berkshire Hathaway',        cik: '0001067983' },
];

const get = async (url, json = false) => {
  const r = await fetch(url, { headers: UA, signal: AbortSignal.timeout(20000) });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return json ? r.json() : r.text();
};

let ok = 0, fail = 0;
for (const { name, cik } of CIKS) {
  try {
    // 1) 申报索引
    const sub = await get(`https://data.sec.gov/submissions/CIK${cik}.json`, true);
    const rec = sub.filings.recent;
    const i = rec.form.findIndex((f) => f === '13F-HR');
    if (i < 0) throw new Error('no 13F-HR in recent filings');
    const acc = rec.accessionNumber[i].replace(/-/g, '');
    const filed = rec.filingDate[i];
    const period = rec.reportDate[i];

    // 2) 该次申报的文件清单 → 找 informationTable
    const dir = `https://www.sec.gov/Archives/edgar/data/${Number(cik)}/${acc}`;
    const idx = await get(`${dir}/index.json`, true);
    const infoFile = idx.directory.item.find((x) => /informationtable.*\.xml$/i.test(x.name) || /info.*table/i.test(x.name));
    if (!infoFile) throw new Error('informationTable not found in filing index');

    // 3) 逐笔持仓
    const xml = await get(`${dir}/${infoFile.name}`);
    const rows = (xml.match(/<(?:\w+:)?infoTable>/gi) || []).length;
    const first = (xml.match(/<(?:\w+:)?nameOfIssuer>([^<]+)</i) || [])[1];

    console.log(`✅ ${name}: 申报 ${filed} · 期末 ${period} · 逐笔持仓 ${rows} 条 · 首条 ${first}`);
    ok++;
  } catch (e) {
    console.log(`❌ ${name}: ${e.message}`);
    fail++;
  }
}
console.log(`\n结论: ${ok}/${CIKS.length} 家拿到逐笔持仓${ok ? ' —— runner 可直连 EDGAR,死结可解' : ' —— runner 同样被挡,维持外部阻塞状态'}`);
process.exit(0);
