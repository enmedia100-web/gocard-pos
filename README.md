<div align="center">

<img src="apps/web/public/brand-lockup.png" alt="GoCard POS" width="420">

**Restaurant POS and management for Bangladesh** — billing, tables, kitchen
display, QR and NFC ordering, reservations, inventory, staff, accounting and
reports. Runs on the restaurant's own computer or server, keeps working when
the internet drops.

[![License: AGPL v3](https://img.shields.io/badge/license-AGPL--3.0-blue.svg)](./LICENSE)

</div>

## What this is

GoCard POS is a fork of [Nodedr OrderRestro](https://github.com/Raktim94/nodedr-restaurant-pos)
by Nodedr Infotech Private Limited and Raktim Ranjit, rebranded and being
adapted for Bangladesh first (taka, Bangla, bKash, SSLCommerz, VAT) and the
United States later (Stripe, US dollars, sales tax).

The full plan and its phases are in [`docs/GOCARD_PLAN.md`](docs/GOCARD_PLAN.md).
Upstream's original README, with its feature tour and screenshots, is kept at
[`docs/UPSTREAM_README.md`](docs/UPSTREAM_README.md); its architecture,
tutorial and design-system documents are still accurate for the code.

## Status

| Area | State |
|---|---|
| Rebrand to GoCard, updates and images from this repo | Done |
| Taka, Bangladesh VAT, bKash/Nagad/Rocket counter payments | Done |
| Bangla interface and receipts | Next |
| Online payments: SSLCommerz, bKash checkout, then Stripe | Planned |

## Quick start (Docker)

```bash
cp .env.example .env   # set POSTGRES_PASSWORD and JWT_SECRET
docker compose up -d
```

Open `http://<this machine's IP>:1995`. Every till, tablet and kitchen screen
on the same network uses that address.

## Development

Node 22+, pnpm 11, PostgreSQL 16.

```bash
pnpm install
# apps/backend/.env: DATABASE_URL, JWT_SECRET, PORT=4001
pnpm --dir apps/backend exec prisma migrate deploy
pnpm --dir apps/backend exec ts-node prisma/seed.ts
pnpm --dir apps/backend run dev   # API on :4001
pnpm --dir apps/web run dev       # web on :3000, proxies /api to :4001
```

## Licence

GNU Affero General Public License v3.0 — see [`LICENSE`](LICENSE) and
[`NOTICE`](NOTICE). If you run a modified GoCard POS for others over a
network, you must offer them its complete source code. The app's
"Source code" link points to this repository.
