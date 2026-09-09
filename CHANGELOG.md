# Changelog

All notable changes to MarginMaster. Dates are release order; the project ships as a single `index.html` with a headless self-test suite (`tests/selftest.mjs`) run in CI.

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
