// Regression self-test for MarginMaster.
// Extracts the app's real <script> from index.html, evaluates it against a
// minimal browser stub, and asserts the pure logic (compute, estimateFBA,
// parseCSV, decodeState) still behaves. Run: `node tests/selftest.mjs`.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');

// --- minimal DOM / browser stub so the app script can initialise headless ---
function el() {
  const e = {
    value: '', checked: false, textContent: '', innerHTML: '', disabled: false,
    style: {}, dataset: {},
    classList: { add() {}, remove() {}, toggle() {} },
    addEventListener() {}, removeEventListener() {},
    appendChild() {}, remove() {}, click() {}, focus() {},
    setAttribute(k, v) { e['__' + k] = v; }, getAttribute(k) { return e['__' + k] ?? null; },
    querySelector() { return null; }, querySelectorAll() { return []; },
    cloneNode() { return el(); },
  };
  return e;
}
const ids = {};
globalThis.document = {
  getElementById(id) { return ids[id] || (ids[id] = el()); },
  createElement() { return el(); },
  querySelectorAll() { return []; },
  querySelector() { return null; },
  addEventListener() {}, removeEventListener() {},
  documentElement: el(),
};
globalThis.localStorage = (() => { const m = {}; return {
  getItem: k => (k in m ? m[k] : null), setItem: (k, v) => { m[k] = String(v); }, removeItem: k => { delete m[k]; },
}; })();
globalThis.location = { hash: '', origin: '', pathname: '' };
globalThis.window = { matchMedia: () => ({ matches: false }), scrollTo() {}, history: { replaceState() {} }, location: globalThis.location };
globalThis.matchMedia = globalThis.window.matchMedia;
globalThis.history = globalThis.window.history;
try { Object.defineProperty(globalThis, 'navigator', { value: { clipboard: { writeText: () => Promise.resolve() } }, configurable: true }); } catch { /* navigator already present */ }
globalThis.alert = () => {};
globalThis.confirm = () => false;
globalThis.FileReader = function () {};
globalThis.Blob = function () {};
globalThis.URL = { createObjectURL: () => '', revokeObjectURL() {} };

// pick the largest <script> block (the app; the other is the tiny theme init)
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
const js = scripts.sort((a, b) => b.length - a.length)[0];
const wrapped = js + `
;globalThis.__t = {
  compute, estimateFBA, parseCSV, decodeState, darken, annualizeRoi,
  encodeBundleArr, decodeBundleStr, insights, poPlan, heat, goalPlan, portfolioTotals, matchCheck,
  setVAT: (o, r) => { VAT_ON = o; VAT_RATE = r; },
  setMIN: m => { MIN_REF = m; },
};`;
// direct eval keeps the appended hook in the same scope as the declarations
eval(wrapped);
const t = globalThis.__t;

let n = 0;
const check = (name, fn) => { fn(); n++; console.log('  ok -', name); };

const base = { price: 29.99, cost: 7.5, refpct: 15, fba: 4.75, inbound: 0.6, other: 0.5, units: 300 };

check('compute: net / margin / ROI / breakeven ACOS', () => {
  const r = t.compute(base);
  assert.ok(Math.abs(r.net - 12.14) < 0.01, 'net ' + r.net);
  assert.ok(Math.abs(r.margin - 40.48) < 0.1, 'margin ' + r.margin);
  assert.ok(Math.abs(r.acosBE - 40.48) < 0.1, 'acosBE ' + r.acosBE);
  // discount room = (price - breakeven)/price; breakeven ~15.71 -> ~47.6%
  assert.ok(Math.abs(r.discountRoom - 47.6) < 0.5, 'discountRoom ' + r.discountRoom);
});
check('compute: breakeven price where net = 0', () => {
  const r = t.compute(base);
  const atBe = t.compute({ ...base, price: r.be });
  assert.ok(Math.abs(atBe.net) < 0.01, 'net at breakeven ' + atBe.net);
});
check('referral floor applies at low price', () => {
  t.setMIN(0.30);
  const r = t.compute({ ...base, price: 1.5 });
  assert.ok(Math.abs(r.referral - 0.30) < 1e-9, 'referral ' + r.referral);
});
check('VAT deducts from revenue, referral stays on gross', () => {
  t.setVAT(true, 20);
  const r = t.compute(base);
  assert.ok(Math.abs(r.rev - 24.99) < 0.01, 'rev ' + r.rev);
  assert.ok(Math.abs(r.vat - 5.00) < 0.01, 'vat ' + r.vat);
  assert.ok(Math.abs(r.referral - 4.4985) < 0.001, 'referral on gross ' + r.referral);
  t.setVAT(false, 0);
});
check('estimateFBA size tiers', () => {
  assert.equal(t.estimateFBA(6, 4, 0.5, 0.5).fee, 3.33);
  assert.equal(t.estimateFBA(9, 6, 2, 0.8).fee, 4.55);
  assert.equal(t.estimateFBA(30, 20, 18, 25).fee, null); // oversize -> manual
});
check('parseCSV handles quoted fields with commas', () => {
  assert.deepEqual(t.parseCSV('a,b\n"x,y",2'), [['a', 'b'], ['x,y', '2']]);
});
check('decodeState: new meta hash + old back-compat + garbage', () => {
  const b64url = s => Buffer.from(s, 'utf8').toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  const withMeta = t.decodeState(b64url('Board|29.99~7.5~15~4.75~0.6~0.5~300|mkt=UK;vat=1;vr=20;fx=1000'));
  assert.equal(withMeta.state.price, 29.99);
  assert.equal(withMeta.meta.mkt, 'UK');
  const old = t.decodeState(b64url('Board|29.99~7.5~15~4.75~0.6~0.5~300'));
  assert.equal(old.state.units, 300);
  assert.equal(old.meta, null);
  assert.equal(t.decodeState('!!!not-valid'), null);
});

check('darken: valid hex, expands shorthand, clamps channels', () => {
  assert.match(t.darken('#FF6100', 0.12), /^#[0-9a-f]{6}$/);
  assert.equal(t.darken('#ffffff', 0.5), '#808080');
  assert.equal(t.darken('#f00', 0), '#ff0000'); // shorthand expands, 0% = unchanged
  assert.equal(t.darken('#000000', 0.3), '#000000');
});

check('annualizeRoi: per-unit ROI × turns/year', () => {
  assert.equal(t.annualizeRoi(10, 365), 10);   // one turn/year
  assert.ok(Math.abs(t.annualizeRoi(10, 30) - 121.67) < 0.1); // ~12 turns
  assert.equal(t.annualizeRoi(10, 0), 0);       // guard
});

check('bundle codec: round-trips a compare list, rejects garbage', () => {
  const arr = [
    { name: 'A | one', state: { price: 29.99, cost: 7.5, refpct: 15, fba: 4.75, inbound: 0.6, other: 0.5, units: 300 } },
    { name: 'B', state: { price: 10, cost: 2, refpct: 8, fba: 3, inbound: 0.4, other: 0.3, units: 100 } },
  ];
  const back = t.decodeBundleStr(t.encodeBundleArr(arr));
  assert.equal(back.length, 2);
  assert.equal(back[0].state.price, 29.99);
  assert.equal(back[1].state.units, 100);
  assert.equal(back[0].name, 'A - one'); // pipe sanitized
  assert.equal(t.decodeBundleStr('###nope'), null);
});

check('insights: praises strong candidate, flags a loss', () => {
  const good = t.insights(base);
  assert.equal(good[0].level, 'good');
  const bad = t.insights({ ...base, price: 10, cost: 8, fba: 4, inbound: 0.5, other: 0.5 });
  assert.equal(bad[0].level, 'bad');
  assert.deepEqual(t.insights({ ...base, price: 0 }), []); // no price -> no hints
});

check('poPlan: outlay, profit, ROI, sell-through months', () => {
  const p = t.poPlan(base, 500); // invest = 7.5+0.6+0.5 = 8.6, net = 12.14, units/mo = 300
  assert.ok(Math.abs(p.outlay - 4300) < 0.5, 'outlay ' + p.outlay);
  assert.ok(Math.abs(p.profit - 6070) < 1, 'profit ' + p.profit);
  assert.ok(Math.abs(p.roi - 141.16) < 0.5, 'roi ' + p.roi);
  assert.ok(Math.abs(p.months - 1.667) < 0.01, 'months ' + p.months);
});

check('heat: red at/below 0, green at/above 35%, clamped', () => {
  assert.equal(t.heat(-5), 'hsla(0,72%,50%,0.16)');
  assert.equal(t.heat(0), 'hsla(0,72%,50%,0.16)');
  assert.equal(t.heat(35), 'hsla(130,72%,50%,0.16)');
  assert.equal(t.heat(100), 'hsla(130,72%,50%,0.16)'); // clamped
  assert.equal(t.heat(17.5), 'hsla(65,72%,50%,0.16)'); // midpoint
});

check('goalPlan: units & sales to hit a monthly profit target', () => {
  const g = t.goalPlan(base, 5000); // net 12.14 -> ceil(5000/12.14) = 412 units
  assert.equal(g.units, 412);
  assert.ok(Math.abs(g.revenue - 412 * 29.99) < 0.5);
  const loss = t.goalPlan({ ...base, price: 10, cost: 8, fba: 4, inbound: 0.5, other: 0.5 }, 5000);
  assert.equal(loss.units, Infinity); // unprofitable -> unreachable
});

check('portfolioTotals: sums monthly profit/revenue/capital', () => {
  const arr = [
    { name: 'A', state: base },                         // net 12.14 × 300 = 3642, cap 8.6×300=2580
    { name: 'B', state: { ...base, units: 100 } },      // net 12.14 × 100 = 1214, cap 8.6×100=860
  ];
  const tt = t.portfolioTotals(arr);
  assert.equal(tt.count, 2);
  assert.ok(Math.abs(tt.profit - (3642 + 1214)) < 2, 'profit ' + tt.profit);
  assert.ok(Math.abs(tt.capital - (2580 + 860)) < 1, 'capital ' + tt.capital);
});

check('matchCheck: profitable above breakeven, loss below', () => {
  const ok = t.matchCheck(base, 24.99);
  assert.equal(ok.ok, true);
  assert.ok(ok.net > 0);
  const bad = t.matchCheck(base, 12); // below ~15.71 breakeven
  assert.equal(bad.ok, false);
  assert.ok(bad.net < 0);
});

console.log(`\n${n} checks passed.`);
