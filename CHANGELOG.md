# Changelog

All notable changes to MarginMaster. Dates are release order; the project ships as a single `index.html` with a headless self-test suite (`tests/selftest.mjs`) run in CI.

## 1.8.0
- Copy results summary — one-click plain-text summary to the clipboard for chat/notes.

## 1.7.1
- Per-product notes — annotate saved products (📝), shown and editable in the compare table.

## 1.7.0
- Return-rate impact — expected net after returns (each return forgoes the sale plus a lost unit + sunk FBA fee).

## 1.6.0
- Multipack helper — pack size × per-single cost → pack product cost, with net profit per single unit.

## 1.5.0
- Competitor price check — match a rival's price and see your net, margin, and a profitable/below-breakeven verdict.

## 1.4.1
- Discount room — how far price can fall before breakeven (coupon/deal/price-war headroom), as a result tile.

## 1.4.0
- Portfolio summary bar — total monthly profit, revenue, and capital-in-stock across all saved products.

## 1.3.1
- Duplicate action on compare rows — clone a product as "<name> (copy)" for quick variants.

## 1.3.0
- Quick FBA fee presets — pick a typical item class (small/large standard weight bands, oversize) to drop a fulfillment fee in without dimensions.

## 1.2.1
- PDF sourcing sheet now includes inventory-velocity rows (turns/year, annualized ROI, profit/day) when a cash cycle is set.

## 1.2.0
- Keyboard shortcuts: `/` focus price, `s` save product, `d` toggle dark mode.

## 1.1.1
- "↺ Reset inputs" button — restore inputs to defaults while keeping saved products and marketplace.

## 1.1.0
- Added India (INR ₹, 18% GST) and UAE (AED, 5% VAT) marketplaces — now 9 markets.

## 1.0.0 — first stable release

MarginMaster is a complete, offline-first Amazon FBA profitability tool in one file. Highlights consolidated from the 0.x line:

### Core economics
- Net profit/unit, margin %, ROI %, breakeven price, monthly profit & revenue, cost-breakdown waterfall.
- **PPC/ACOS breakeven** — max ad spend per unit and breakeven ACOS %.
- **Referral-fee accuracy** — per-item minimum floor and tiered US apparel presets.
- **VAT/GST aware** (UK/EU/AU/JP) — ex-tax revenue, referral on gross, margin on real revenue.
- **Plain-English insights** — flags thin margins, high fees, floor-binding, low ad headroom; praises strong candidates.

### Planning tools
- **Target-price solver** — solve the price for a target margin %, ROI %, or net $/unit.
- **FBA fee estimator** — size tier + dimensional weight → fulfillment fee.
- **Storage-fee estimator** — unit ft³ × standard/peak rates, auto-detects peak season.
- **Fixed-cost break-even** and **inventory velocity** (turns/year, annualized ROI, profit/day).
- **Purchase-order planner** and **profit-goal planner**.

### Compare & data
- Save & compare products (localStorage) with best-margin ⭐, sortable ranked table, and a red→green **margin heatmap**.
- **Bulk CSV import** with flexible headers and dimension→FBA-fee auto-estimate; **CSV export** and a downloadable **template**.

### Visualize
- Live **profit-vs-price chart** (breakeven + current markers) and a **sensitivity matrix** (price × cost ±10/20%).

### Share & output
- **Shareable links** (single product, with marketplace/VAT/fixed context) and **whole-list bundle links** — all client-side.
- **PDF sourcing sheet** with verdict and embedded chart.

### Markets, UX & quality
- **7 marketplaces** — US, CA, UK, EU, MX, AU, JP (currency symbols, decimals, tax, min fees, category presets).
- **Dark mode**, **sticky section nav** with active highlighting, **glossary tooltips**, first-visit onboarding, and accessibility (aria-live result, labeled controls, keyboard-operable sorting).
- **White-label** via `?brand=` and `?color=` URL params.
- Headless **self-test suite** (14 checks) run in **GitHub Actions CI** on every push.

Runs 100% in the browser — no signup, no backend, nothing leaves the device.
