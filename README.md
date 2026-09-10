# MarginMaster 🟠

**The true-profit calculator for Amazon FBA sellers.** Type your numbers, see your real net profit, margin, ROI, and breakeven price instantly. Runs 100% in the browser — no signup, no backend, works offline.

![version](https://img.shields.io/badge/version-2.6.0-FF6100) ![status](https://img.shields.io/badge/status-live-FF6100) ![type](https://img.shields.io/badge/stack-single--file-232F3E) [![CI](https://github.com/awictor/margin-master/actions/workflows/ci.yml/badge.svg)](https://github.com/awictor/margin-master/actions/workflows/ci.yml)

## Why

Most sellers eyeball their margins and get burned by referral fees, FBA fulfillment, inbound shipping, and returns reserve. MarginMaster does the full stack of Amazon costs in one screen so you know a product is worth sourcing *before* you commit cash.

## Features

- ✅ Full FBA cost model: referral %, fulfillment fee, inbound, product + other cost
- ✅ Category presets that auto-fill the US referral fee %
- ✅ Live **net profit / unit, margin %, ROI %, breakeven price**
- ✅ **Product score** — a 0–100 quality score (margin, ROI, discount room, ad headroom) with a Strong/Solid/Fair/Weak verdict
- ✅ **Plain-English insights** — flags high FBA/referral fees, thin margins, min-fee floors, and low ad headroom (and calls out strong candidates)
- ✅ Monthly profit + revenue projection
- ✅ Cost breakdown waterfall
- ✅ **Save & compare products** — side-by-side margin table, best-margin ⭐ highlighting, one-click load, CSV export (localStorage, stays private)
- ✅ **Share the whole list** — one link reopens your entire compare list on any device (encoded in the URL hash, still 100% client-side)
- ✅ **Margin heatmap** — compare-table margin cells shade red→amber→green so the winners pop at a glance
- ✅ **Portfolio summary** — running totals of monthly profit, revenue, and capital-in-stock across every saved product
- ✅ **Bulk CSV import + ranking** — drop a supplier/research CSV, auto-map columns, rank by any metric with sortable headers; if the file has Length/Width/Height/Weight columns and no FBA fee, it estimates the fee per row automatically
- ✅ **Target-price solver** — solve the exact sale price to hit a target margin %, ROI %, or net $/unit, then one-click apply it
- ✅ **Competitor price check** — enter a rival's price to see your net, margin, and whether matching it still profits
- ✅ **Deal / promo simulator** — model a % off + flat deal fee over expected units to decide if a Lightning Deal is worth running
- ✅ **Multipack helper** — turn a per-single cost + pack size into the pack product cost and see net profit per single unit
- ✅ **FBA vs FBM** — enter a self-fulfilled ship cost to compare net/unit and see which fulfillment method wins
- ✅ **FBA fee estimator** — dimensions + weight → US size tier → estimated fulfillment fee (dimensional-weight aware), one-click apply; plus quick-pick presets for common item classes when you don't know the dimensions
- ✅ **Shareable links** — copy a link that reopens the exact numbers *and* marketplace, VAT, and fixed-cost context (URL hash, nothing sent to a server; older links stay valid)
- ✅ **PDF sourcing sheet** — one-click clean, printable one-pager with a sourcing verdict and the profit-vs-price chart (print → Save as PDF)
- ✅ **Copy summary** — one click puts a plain-text results summary on your clipboard for Slack, notes, or supplier chats
- ✅ **Dark mode** — toggle that persists and respects your system preference (no flash on load)
- ✅ **Multi-marketplace** — US / CA / UK / EU / MX / AU / JP / IN / AE fee sets with the right currency symbol (yen & rupee show no decimals), tax rate, minimum referral, and per-region category presets (remembers your choice)
- ✅ **Storage-fee estimator** — unit volume (ft³) from your dimensions × standard and Oct–Dec peak rates, auto-highlights the current season and adds the in-season figure to costs
- ✅ **PPC / ACOS breakeven** — max ad spend per unit and breakeven ACOS % before the sale loses money (shown in results + PDF)
- ✅ **Discount room** — how far you can cut price (coupons, deals, price wars) before breaking even
- ✅ **Return-rate impact** — enter an estimated return % to see expected net after returns (lost unit + sunk FBA fee per return)
- ✅ **Accurate referral fees** — per-item minimum floor ($0.30 US / £0.25 UK etc.) and tiered US apparel presets (5% ≤$15, 10%, 17%)
- ✅ **Fixed-cost break-even** — enter monthly fixed costs (tools, VA, subscriptions) to see units/month needed to cover them and profit after fixed
- ✅ **Inventory velocity** — enter days-to-sell to get turns/year, annualized cash-on-cash ROI, and profit/day, so a fast thin-margin product beats a slow fat one on the numbers
- ✅ **Working capital** — estimate the cash locked in inventory + pending Amazon payouts at any time
- ✅ **Restock planner** — lead time + safety stock + velocity → reorder point, days of cover, and a reorder-now signal
- ✅ **Purchase-order planner** — enter an order quantity to see total cash outlay, profit if sold through, return on the order, and sell-through time at your velocity
- ✅ **Profit-goal planner** — set a target monthly profit and see the units/month and sales/month you'd need to hit it
- ✅ **Budget order sizing** — enter available capital to see how many units you can afford and the profit if that order sells through
- ✅ **12-month projection** — apply a monthly growth rate to see year-1 cumulative profit, month-12 run-rate, and total units
- ✅ **Profit-vs-price chart** — inline SVG curve of net profit as the price sweeps, with breakeven and current-price markers (redraws live, themed)
- ✅ **Sensitivity matrix** — net profit/unit across sale price × product cost each ±10/20%, color-coded, so you see how fragile a margin is to a price drop or cost bump
- ✅ **VAT-aware (UK/EU)** — treat the sale price as VAT-inclusive; VAT is stripped from revenue before profit, referral still charged on gross, margin shown on real ex-VAT revenue
- ✅ **Share-ready** — Open Graph / Twitter cards, inline SVG favicon, theme-color, and SEO metadata for a clean link preview
- ✅ **Accessible** — screen-reader labels on every control, live-announced profit result, and keyboard-operable sortable columns
- ✅ Zero dependencies — one `index.html`, opens anywhere, private by design

## Run

Open `index.html` in any browser. That's it. Or host it free on GitHub Pages / Netlify / Cloudflare Pages.

## Importing products

Click **CSV template** to download a sample file with the exact columns Import accepts: `Product, Price, Cost, Referral%, FBA, Inbound, Other, Units, Length, Width, Height, Weight`. Leave `FBA` blank and fill the dimensions and the fee is estimated for you.

## Test

The pure logic (profit model, FBA/storage fees, CSV parsing, share-link codec) is covered by a headless regression suite that runs the app's real code:

```
node tests/selftest.mjs
```

CI runs it on every push via GitHub Actions.

## Roadmap

- [x] Save & compare multiple products (localStorage) — CSV export included
- [x] Bulk CSV import + best-margin ranking — flexible header mapping, sortable columns
- [x] Repricing / target-margin solver — margin %, ROI %, or net $/unit
- [x] Size-tier → FBA fee auto-estimate — small/large standard, dimensional weight
- [x] Shareable read-only result links — state encoded in URL hash
- [x] PDF export for sourcing decisions — print-friendly one-pager with verdict

## Disclaimer

Fee percentages are common US defaults and are user-editable. Always verify against your Seller Central fee preview before sourcing decisions.

## License

MIT © Alex Wictor
