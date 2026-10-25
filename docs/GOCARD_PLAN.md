# GoCard POS — conversion plan

GoCard POS is a fork of [Nodedr OrderRestro](https://github.com/Raktim94/nodedr-restaurant-pos)
(AGPL-3.0). It stays under AGPL-3.0: every GoCard build, hosted or installed,
must offer its complete source to its users. Upstream copyright notices stay in
place; see [`NOTICE`](../NOTICE).

Target market: **Bangladesh first** (taka, Bangla, bKash, SSLCommerz, VAT),
then the **United States** (Stripe, US dollars, sales tax).

## What upstream already gives us

- Self-hosted stack: NestJS + Prisma + PostgreSQL 16 API, Next.js web app,
  Socket.IO live updates, Docker Compose, Windows/CasaOS/.deb packaging.
- POS billing, tables and floors, KDS, menu with modifiers and combos, QR menu,
  kiosk, reservations and waitlist, inventory and recipes, attendance and
  payroll, accounting, reports, CRM and loyalty, gift cards, delivery, webhooks.
- Multi-region groundwork: `Branch.country`, `Restaurant.currency`, tax presets
  (`TaxRegime`: India GST, US sales tax, EU VAT, Spain IVA, custom), inclusive
  or exclusive tax, two-decimal money (`Decimal(12,2)`) that fits BDT and USD.
- A small i18n system (`apps/web/lib/i18n`, en/es/fr, 109 keys) used by the
  navigation, guest QR ordering and kiosk only.

## Phases

### Phase 0 — fork and rebrand (done in the first pass)
- Fork to `enmedia100-web/gocard-pos`, `upstream` remote kept for merges.
- Rebrand visible name, logos, metadata, Docker image and container names,
  updater targets and install packages to GoCard.
- `NOTICE` with upstream attribution; a "Source code" link in the app (AGPL §13).

### Phase 1 — Bangladesh basics
- Country preset `BD`: currency `BDT` (৳, two decimals), time zone
  Asia/Dhaka, phone format +880 1XXXXXXXXX, Bangla number formatting option.
- Tax regime `BD_VAT`: VAT label "VAT", BIN (business identification number)
  as the tax id, configurable rate (restaurants commonly 5–15%; set per branch,
  never hard-coded), inclusive or exclusive, supplementary duty field for
  later; Mushak-6.3-style receipt layout as a follow-up.
- Payment methods: add `BKASH`, `NAGAD`, `ROCKET` (recorded manually at the
  counter); `UPI` hidden outside India.
- Default seed and onboarding for a Bangladesh restaurant; India-only docs
  and Spain Verifactu screens hidden unless the branch is in those countries.

### Phase 2 — Bangla
- `bn` dictionary; move the staff screens' hard-coded English (about 160
  components) into the dictionaries, screen group by screen group.
- Bangla font (Hind Siliguri) in the web app.
- Receipts and KOTs in Bangla: most ESC/POS printers have no Bangla glyphs, so
  Bangla receipts print as raster images; English text printing stays.

### Phase 3 — online payments (provider-agnostic)
- One `PaymentGateway` interface: create checkout, verify callback/IPN
  server-side, query status, refund. Amounts and currency always computed on
  the server.
- Adapters: **SSLCommerz** (cards, MFS, net banking) and **bKash tokenized
  checkout**, both sandbox first. Used by QR ordering, kiosk and reservations
  deposits.
- **Stripe** is the next adapter on the same interface (Checkout + webhooks),
  enabled when the branch currency is USD.

### Phase 4 — GoCard NFC and hosting
- GoCard tables: an NFC tag written with the table's existing QR-order URL
  (`Table.qrToken`), so tap and scan open the same menu.
- Hosting options: restaurant's own PC/mini-server (upstream model) or a
  GoCard-managed VPS per restaurant; updates come only from GoCard images.

### Phase 5 — United States
- Stripe live, USD, US sales tax preset (exists), English default,
  US receipt format, card-present terminals evaluated separately.

## Needed from the owner
- SSLCommerz sandbox store ID and password; bKash sandbox credentials
  (app key, app secret, username, password).
- Later: Stripe account, domain, hosting choice.

## Local development (Windows, no Docker)
- Postgres 16: `D:\ClaudeData\GoCard\.devdb` (embedded-postgres, started
  with `pg_ctl`, port 54329, database `gocard_pos`).
- `apps/backend/.env` (git-ignored) holds `DATABASE_URL`, `JWT_SECRET`,
  `PORT=4001`. Seed: `npx ts-node prisma/seed.ts` (demo login in the seed).
- Web: `pnpm --dir apps/web dev` on port 3000 (proxies `/api` to 4001).
